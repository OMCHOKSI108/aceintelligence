"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { gql } from "@/lib/careers/graphql";

interface Job {
  jobId: string;
  title: string;
  location: string;
  employmentType: string;
  datePosted: string;
}

const QUERY = `{
  listJobs(status: published) {
    jobId title location employmentType datePosted
  }
}`;

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    gql<{ listJobs: Job[] }>(QUERY)
      .then((d) => setJobs(d.listJobs))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2>Open Positions</h2>
        <Link href="/careers/about" className="text-sm text-blue-600 hover:underline">
          About Us
        </Link>
      </div>
      {jobs.length === 0 ? (
        <p>No open positions at this time.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Type</th>
              <th>Posted</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((j) => (
              <tr key={j.jobId}>
                <td>
                  <Link href={`/careers/${j.jobId}`}>{j.title}</Link>
                </td>
                <td>{j.location}</td>
                <td>{j.employmentType.replace("_", " ")}</td>
                <td>{new Date(Number(j.datePosted)).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
