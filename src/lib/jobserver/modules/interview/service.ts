import { Interview, InterviewMode } from "../../models/Interview";
import { Application, ApplicationStage } from "../../models/Application";
import { Job } from "../../models/Job";
import { sendEmail } from "../../email/send";
import { interviewInvite } from "../../email/templates";

export async function scheduleInterview(
  applicationId: string,
  input: {
    scheduledAt: string;
    mode: InterviewMode;
    location: string;
    interviewerName: string;
    notes?: string;
  },
) {
  const app = await Application.findByPk(applicationId);
  if (!app) throw new Error("Application not found");
  if (app.stage !== ApplicationStage.SHORTLISTED) {
    throw new Error("Application must be SHORTLISTED to schedule an interview");
  }

  const existing = await Interview.findOne({ where: { applicationId } });
  if (existing) throw new Error("Interview already scheduled for this application");

  const interview = await Interview.create({
    applicationId,
    scheduledAt: new Date(input.scheduledAt),
    mode: input.mode,
    location: input.location,
    interviewerName: input.interviewerName,
    notes: input.notes ?? null,
  });

  const job = await Job.findByPk(app.jobId);
  const { subject, html } = interviewInvite(
    app.name,
    job?.title ?? "Unknown",
    input.scheduledAt,
    input.mode,
    input.location,
    input.interviewerName,
  );
  await sendEmail(app.email, subject, html);

  return interview;
}

export async function getInterviewByApplication(applicationId: string) {
  return Interview.findOne({ where: { applicationId } });
}
