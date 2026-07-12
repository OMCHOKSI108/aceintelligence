"use client";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import { gql } from "@/lib/careers/graphql";

interface Job {
  jobId: string;
  title: string;
  description: string;
  hiringOrganization: string;
  location: string;
  remote: boolean;
  datePosted: string;
  baseSalary: number | null;
  employmentType: string;
  validThrough: string | null;
  jobBenefits: string | null;
  experienceRequired: string | null;
  educationRequired: string | null;
  skills: string | null;
  status: string;
}

const QUERY = `query($jobId: String!) {
  getJobById(jobId: $jobId) {
    jobId title description hiringOrganization location remote
    datePosted baseSalary employmentType validThrough
    jobBenefits experienceRequired educationRequired skills status
  }
}`;

export default function JobDetailPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = use(params);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!jobId) return;
    gql<{ getJobById: Job }>(QUERY, { jobId })
      .then((d) => setJob(d.getJobById))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [jobId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!job) return <p>Job not found.</p>;

  const rows: [string, string][] = [
    ["Organization", job.hiringOrganization],
    ["Location", job.location + (job.remote ? " (Remote)" : "")],
    ["Type", job.employmentType.replace("_", " ")],
    ["Posted", new Date(Number(job.datePosted)).toLocaleDateString()],
    ["Status", job.status],
  ];
  if (job.baseSalary) rows.push(["Salary", `\u20B9${job.baseSalary.toLocaleString()}`]);
  if (job.validThrough)
    rows.push(["Valid Through", new Date(Number(job.validThrough)).toLocaleDateString()]);
  if (job.experienceRequired) rows.push(["Experience", job.experienceRequired]);
  if (job.educationRequired) rows.push(["Education", job.educationRequired]);
  if (job.skills) rows.push(["Skills", job.skills]);
  if (job.jobBenefits) rows.push(["Benefits", job.jobBenefits]);

  return (
    <div>
      <h2>{job.title}</h2>
      <div className="meta">
        {rows.map(([k, v]) => (
          <div className="meta-row" key={k}>
            <span className="meta-key">{k}:</span>
            <span>{v}</span>
          </div>
        ))}
      </div>
      <div className="description" dangerouslySetInnerHTML={{ __html: job.description }} />
      <div style={{ marginTop: 16 }}>
        <Link href={`/careers/${job.jobId}/apply`} className="btn">
          Apply
        </Link>
      </div>
    </div>
  );
}
