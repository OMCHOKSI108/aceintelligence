import { Application, ApplicationStage } from "../../models/Application";
import { ResumeFile, MAX_FILE_SIZE } from "../../models/ResumeFile";
import { Job } from "../../models/Job";
import { sendEmail } from "../../email/send";
import { applicationReceived, stageChanged, selected } from "../../email/templates";
import { sanitize } from "../../security";
import { auditLog } from "../../logger";

/** Allowed MIME types for resume uploads */
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function submitApplication(input: {
  name: string;
  email: string;
  phone: string;
  jobId: string;
  resumeFileName: string;
  resumeMimeType: string;
  resumeBase64: string;
}) {
  // Validate and sanitize
  const name = sanitize(input.name);
  const phone = sanitize(input.phone);
  const jobId = input.jobId.trim();

  // Validate MIME type
  if (!ALLOWED_MIME_TYPES.includes(input.resumeMimeType)) {
    throw new Error("Only PDF, DOC, and DOCX files are accepted");
  }

  // Validate filename (no path traversal)
  const fileName = input.resumeFileName.replace(/[/\\]/g, "_").replace(/\.\./g, "");

  const fileBuffer = Buffer.from(input.resumeBase64, "base64");
  if (fileBuffer.length > MAX_FILE_SIZE) {
    throw new Error("Resume file exceeds 5MB limit");
  }
  if (fileBuffer.length === 0) {
    throw new Error("Resume file is empty");
  }

  const job = await Job.findByPk(jobId);
  if (!job) throw new Error("Job not found");

  const application = await Application.create({
    name,
    email: input.email.trim().toLowerCase(),
    phone,
    jobId,
    stage: ApplicationStage.RECRUITER_PHASE,
  });

  await ResumeFile.create({
    applicationId: application.id,
    fileName,
    mimeType: input.resumeMimeType,
    size: fileBuffer.length,
    file: fileBuffer,
  });

  auditLog("APPLICATION_SUBMITTED", { jobId, email: input.email });

  const { subject, html } = applicationReceived(name, job.title, job.jobId);
  await sendEmail(input.email, subject, html);

  return application;
}

async function resolveJobUuid(jobId: string): Promise<string> {
  const job = await Job.findOne({ where: { jobId }, attributes: ["id"] });
  if (!job) throw new Error("Job not found");
  return job.id;
}

export async function getApplicationsByJob(jobId: string) {
  const jobUuid = await resolveJobUuid(jobId);
  return Application.findAll({ where: { jobId: jobUuid }, order: [["appliedAt", "DESC"]] });
}

export async function listApplicationsForJob(jobId: string) {
  const jobUuid = await resolveJobUuid(jobId);
  const applications = await Application.findAll({
    where: { jobId: jobUuid },
    order: [["appliedAt", "DESC"]],
    attributes: ["id", "name", "email", "phone", "appliedAt", "stage"],
  });

  const result = await Promise.all(
    applications.map(async (app) => {
      const resume = await ResumeFile.findOne({
        where: { applicationId: app.id },
        attributes: ["id"],
      });
      return {
        id: app.id,
        name: app.name,
        email: app.email,
        phone: app.phone,
        appliedAt: app.appliedAt,
        resumeFileId: resume?.id ?? null,
        stage: app.stage,
      };
    }),
  );

  return result;
}

export async function updateApplicationStage(applicationId: string, stage: ApplicationStage) {
  const app = await Application.findByPk(applicationId);
  if (!app) throw new Error("Application not found");

  app.stage = stage;
  await app.save();

  const job = await Job.findByPk(app.jobId);
  const jobTitle = job?.title ?? "Unknown";

  if (stage === ApplicationStage.ON_HOLD) {
    // internal marker — no email
  } else if (stage === ApplicationStage.SELECTED) {
    const { subject, html } = selected(app.name, jobTitle);
    await sendEmail(app.email, subject, html);
  } else {
    const { subject, html } = stageChanged(app.name, jobTitle, stage);
    await sendEmail(app.email, subject, html);
  }

  return app;
}
