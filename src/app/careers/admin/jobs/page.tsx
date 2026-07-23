"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, X } from "lucide-react";
import { gql } from "@/lib/careers/graphql";

const EMPLOYMENT_TYPES = ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "TEMPORARY"];

const JOBS_QUERY = `{
  listJobs { jobId title status datePosted }
}`;

const CREATE_MUT = `mutation($input: CreateJobInput!) {
  createJob(input: $input) { jobId title status }
}`;

const PUBLISH_MUT = `mutation($jobId: String!) {
  publishJob(jobId: $jobId) { jobId status }
}`;

const CLOSE_MUT = `mutation($jobId: String!) {
  closeJob(jobId: $jobId) { jobId status }
}`;

export default function JobFormPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
    hiringOrganization: "",
    location: "",
    remote: false,
    baseSalary: "",
    employmentType: "FULL_TIME",
    validThrough: "",
    jobBenefits: "",
    experienceRequired: "",
    educationRequired: "",
    skills: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [closingId, setClosingId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    loadJobs();
  }, []);

  function loadJobs() {
    gql<{ listJobs: any[] }>(JOBS_QUERY)
      .then((d) => setJobs(d.listJobs))
      .catch(console.error)
      .finally(() => setLoadingJobs(false));
  }

  function setField(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value, type } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const input: Record<string, unknown> = {
        title: form.title,
        description: form.description,
        hiringOrganization: form.hiringOrganization,
        location: form.location,
        remote: form.remote,
        employmentType: form.employmentType,
      };
      if (form.baseSalary) input.baseSalary = parseInt(form.baseSalary, 10);
      if (form.validThrough) input.validThrough = new Date(form.validThrough).toISOString();
      if (form.jobBenefits) input.jobBenefits = form.jobBenefits;
      if (form.experienceRequired) input.experienceRequired = form.experienceRequired;
      if (form.educationRequired) input.educationRequired = form.educationRequired;
      if (form.skills) input.skills = form.skills;

      const created = await gql<{ createJob: { jobId: string } }>(CREATE_MUT, { input });
      const published = await gql<{ publishJob: { status: string } }>(
        PUBLISH_MUT,
        { jobId: created.createJob.jobId },
      );

      setSuccess(
        `Created and published ${created.createJob.jobId} \u2014 status: ${published.publishJob.status}`,
      );
      loadJobs();

      setForm({
        title: "",
        description: "",
        hiringOrganization: "",
        location: "",
        remote: false,
        baseSalary: "",
        employmentType: "FULL_TIME",
        validThrough: "",
        jobBenefits: "",
        experienceRequired: "",
        educationRequired: "",
        skills: "",
      });
      setShowCreateForm(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleClose(jobId: string) {
    setClosingId(jobId);
    try {
      await gql(CLOSE_MUT, { jobId });
      setJobs((prev) => prev.map((j) => (j.jobId === jobId ? { ...j, status: "closed" } : j)));
      setSuccess(`Job ${jobId} closed.`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setClosingId(null);
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Jobs</h2>
          <p className="muted">Create, publish, edit, and close job postings.</p>
        </div>
        <button
          type="button"
          className="btn icon-btn"
          onClick={() => setShowCreateForm((open) => !open)}
          aria-expanded={showCreateForm}
          aria-controls="create-job-form"
        >
          {showCreateForm ? <X size={16} /> : <Plus size={16} />}
          {showCreateForm ? "Cancel" : "Create Job"}
        </button>
      </div>

      {success && (
        <p className="success" style={{ marginBottom: 12 }}>
          {success}
        </p>
      )}
      {error && (
        <p className="error" style={{ marginBottom: 12 }}>
          {error}
        </p>
      )}

      {showCreateForm && (
        <section id="create-job-form" className="form-panel">
          <h3>Create Job</h3>
          <form onSubmit={handleSubmit} className="form">
            <label>
              Title <span className="req">*</span>
              <input name="title" value={form.title} onChange={setField} required />
            </label>
            <label>
              Description (HTML) <span className="req">*</span>
              <textarea
                name="description"
                value={form.description}
                onChange={setField}
                rows={6}
                required
              />
            </label>
            <label>
              Hiring Organization <span className="req">*</span>
              <input
                name="hiringOrganization"
                value={form.hiringOrganization}
                onChange={setField}
                required
              />
            </label>
            <label>
              Location <span className="req">*</span>
              <input name="location" value={form.location} onChange={setField} required />
            </label>
            <label className="checkbox-label">
              <input name="remote" type="checkbox" checked={form.remote} onChange={setField} />
              Remote
            </label>
            <label>
              Base Salary <span className="optional">(optional)</span>
              <input name="baseSalary" type="number" value={form.baseSalary} onChange={setField} />
            </label>
            <label>
              Employment Type <span className="req">*</span>
              <select name="employmentType" value={form.employmentType} onChange={setField}>
                {EMPLOYMENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t.replace("_", " ")}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Valid Through <span className="optional">(optional)</span>
              <input
                name="validThrough"
                type="date"
                value={form.validThrough}
                onChange={setField}
              />
            </label>
            <label>
              Skills <span className="optional">(optional, comma-separated)</span>
              <input name="skills" value={form.skills} onChange={setField} />
            </label>
            <label>
              Experience Required <span className="optional">(optional)</span>
              <input
                name="experienceRequired"
                value={form.experienceRequired}
                onChange={setField}
              />
            </label>
            <label>
              Education Required <span className="optional">(optional)</span>
              <input
                name="educationRequired"
                value={form.educationRequired}
                onChange={setField}
              />
            </label>
            <label>
              Benefits <span className="optional">(optional)</span>
              <textarea name="jobBenefits" value={form.jobBenefits} onChange={setField} rows={2} />
            </label>
            <button type="submit" disabled={loading} className="btn">
              {loading ? "Creating..." : "Create & Publish"}
            </button>
          </form>
        </section>
      )}

      <h3 style={{ marginTop: 16 }}>Existing Jobs</h3>
      {loadingJobs ? (
        <p>Loading...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((j) => (
              <tr key={j.jobId}>
                <td>{j.jobId}</td>
                <td>{j.title}</td>
                <td>{j.status}</td>
                <td className="actions">
                  <Link href={`/careers/admin/jobs/${j.jobId}/edit`} className="link-btn">
                    Edit
                  </Link>
                  <Link href={`/careers/admin/jobs/${j.jobId}/applications`} className="link-btn">
                    Applications
                  </Link>
                  {j.status !== "closed" && (
                    <button
                      className="link-btn danger"
                      disabled={closingId === j.jobId}
                      onClick={() => handleClose(j.jobId)}
                    >
                      {closingId === j.jobId ? "Closing..." : "Close"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td colSpan={4}>No jobs yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

    </div>
  );
}
