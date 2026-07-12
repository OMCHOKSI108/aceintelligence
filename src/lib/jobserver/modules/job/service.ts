import { Job, JobStatus, EmploymentType } from "../../models/Job";
import { User } from "../../models/User";
import { sendEmail } from "../../email/send";
import { newJobPosted } from "../../email/templates";

export async function generateJobId(): Promise<string> {
  const last = await Job.findOne({
    order: [["jobId", "DESC"]],
    attributes: ["jobId"],
  });

  let next = 1;
  if (last) {
    const num = parseInt(last.jobId.replace("JOB-", ""), 10);
    if (!isNaN(num)) next = num + 1;
  }

  return `JOB-${String(next).padStart(4, "0")}`;
}

export async function createJob(
  createdBy: string,
  input: {
    title: string;
    description: string;
    hiringOrganization: string;
    location: string;
    remote?: boolean;
    baseSalary?: number;
    employmentType: EmploymentType;
    validThrough?: string;
    jobBenefits?: string;
    experienceRequired?: string;
    educationRequired?: string;
    skills?: string;
  },
) {
  const jobId = await generateJobId();

  return Job.create({
    jobId,
    title: input.title,
    description: input.description,
    hiringOrganization: input.hiringOrganization,
    location: input.location,
    remote: input.remote ?? false,
    baseSalary: input.baseSalary ?? null,
    employmentType: input.employmentType,
    validThrough: input.validThrough ? new Date(input.validThrough) : null,
    jobBenefits: input.jobBenefits ?? null,
    experienceRequired: input.experienceRequired ?? null,
    educationRequired: input.educationRequired ?? null,
    skills: input.skills ?? null,
    status: JobStatus.DRAFT,
    createdBy,
  });
}

export async function publishJob(jobId: string) {
  const job = await Job.findOne({ where: { jobId } });
  if (!job) throw new Error("Job not found");

  job.status = JobStatus.PUBLISHED;
  await job.save();

  const creator = await User.findByPk(job.createdBy);
  if (creator) {
    const { subject, html } = newJobPosted(job.title, job.hiringOrganization, job.location);
    await sendEmail(creator.email, subject, html);
  }

  return job;
}

export async function listJobs(status?: JobStatus) {
  const where = status ? { status } : {};
  return Job.findAll({ where, order: [["datePosted", "DESC"]] });
}

export async function getJobById(jobId: string) {
  const job = await Job.findOne({ where: { jobId } });
  if (!job) throw new Error("Job not found");
  return job;
}

export async function updateJob(
  jobId: string,
  input: {
    title?: string;
    description?: string;
    hiringOrganization?: string;
    location?: string;
    remote?: boolean;
    baseSalary?: number;
    employmentType?: EmploymentType;
    validThrough?: string;
    jobBenefits?: string;
    experienceRequired?: string;
    educationRequired?: string;
    skills?: string;
  },
) {
  const job = await Job.findOne({ where: { jobId } });
  if (!job) throw new Error("Job not found");

  const updates: Record<string, unknown> = {};
  if (input.title !== undefined) updates.title = input.title;
  if (input.description !== undefined) updates.description = input.description;
  if (input.hiringOrganization !== undefined) updates.hiringOrganization = input.hiringOrganization;
  if (input.location !== undefined) updates.location = input.location;
  if (input.remote !== undefined) updates.remote = input.remote;
  if (input.baseSalary !== undefined) updates.baseSalary = input.baseSalary;
  if (input.employmentType !== undefined) updates.employmentType = input.employmentType;
  if (input.validThrough !== undefined)
    updates.validThrough = input.validThrough ? new Date(input.validThrough) : null;
  if (input.jobBenefits !== undefined) updates.jobBenefits = input.jobBenefits;
  if (input.experienceRequired !== undefined) updates.experienceRequired = input.experienceRequired;
  if (input.educationRequired !== undefined) updates.educationRequired = input.educationRequired;
  if (input.skills !== undefined) updates.skills = input.skills;

  await job.update(updates);
  return job;
}

export async function closeJob(jobId: string) {
  const job = await Job.findOne({ where: { jobId } });
  if (!job) throw new Error("Job not found");

  job.status = JobStatus.CLOSED;
  await job.save();
  return job;
}
