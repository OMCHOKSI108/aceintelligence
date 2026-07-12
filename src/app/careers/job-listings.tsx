"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { gql } from "@/lib/careers/graphql";
import { Search, ArrowRight } from "lucide-react";

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

export default function JobListings() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    gql<{ listJobs: Job[] }>(QUERY)
      .then((d) => setJobs(d.listJobs))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto rounded-2xl border border-slate-200 bg-white shadow-sm p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
          <Search size={26} className="text-slate-400 animate-pulse" />
        </div>
        <h3 className="text-2xl font-semibold text-slate-900 mb-3">Loading positions...</h3>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="max-w-2xl mx-auto rounded-2xl border border-slate-200 bg-white shadow-sm p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
          <Search size={26} className="text-slate-400" />
        </div>
        <h3 className="text-2xl font-semibold text-slate-900 mb-3">No open roles currently</h3>
        <p className="text-slate-600 text-sm leading-relaxed max-w-md mx-auto">
          We are not actively hiring today. You can still share your profile, portfolio, GitHub, LinkedIn, or project work with us for future opportunities.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-6 mb-8">
          {["Future roles", "Internships", "Freelance", "Full-time", "Remote-friendly"].map(
            (tag) => (
              <span
                key={tag}
                className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200"
              >
                {tag}
              </span>
            ),
          )}
        </div>
        <a
          href={process.env.NEXT_PUBLIC_CAREERS_FORM_URL || "mailto:omchoksi.pro@gmail.com?subject=Future Opportunity at Ace Intelligence"}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white rounded-lg transition-all duration-300 hover:opacity-90"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          Join Talent Network
          <ArrowRight size={16} />
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="text-left text-xs font-semibold tracking-wide text-slate-500 uppercase px-6 py-3">Title</th>
              <th className="text-left text-xs font-semibold tracking-wide text-slate-500 uppercase px-6 py-3">Location</th>
              <th className="text-left text-xs font-semibold tracking-wide text-slate-500 uppercase px-6 py-3">Type</th>
              <th className="text-left text-xs font-semibold tracking-wide text-slate-500 uppercase px-6 py-3">Posted</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((j) => (
              <tr key={j.jobId} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <Link href={`/careers/${j.jobId}`} className="text-sm font-medium text-slate-900 hover:text-blue-600 transition-colors">
                    {j.title}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{j.location}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                    {j.employmentType.replace("_", " ")}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {new Date(Number(j.datePosted)).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <Link href={`/careers/${j.jobId}`} className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
