"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { gql } from "@/lib/careers/graphql";

const EMPLOYMENT_TYPES = ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "TEMPORARY"];

const QUERY = `query($jobId: String!) {
  getJobById(jobId: $jobId) {
    jobId title description hiringOrganization location remote
    baseSalary employmentType validThrough jobBenefits
    experienceRequired educationRequired skills status
  }
}`;

const UPDATE_MUT = `mutation($jobId: String!, $input: UpdateJobInput!) {
  updateJob(jobId: $jobId, input: $input) { jobId title status }
}`;

export default function EditJobPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = use(params);
  const router = useRouter();

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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!jobId) return;
    gql<{ getJobById: any }>(QUERY, { jobId })
      .then((d) => {
        const j = d.getJobById;
        if (!j) {
          setError("Job not found");
          return;
        }
        setForm({
          title: j.title ?? "",
          description: j.description ?? "",
          hiringOrganization: j.hiringOrganization ?? "",
          location: j.location ?? "",
          remote: j.remote ?? false,
          baseSalary: j.baseSalary?.toString() ?? "",
          employmentType: j.employmentType ?? "FULL_TIME",
          validThrough: j.validThrough
            ? new Date(Number(j.validThrough)).toISOString().split("T")[0]
            : "",
          jobBenefits: j.jobBenefits ?? "",
          experienceRequired: j.experienceRequired ?? "",
          educationRequired: j.educationRequired ?? "",
          skills: j.skills ?? "",
        });
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [jobId]);

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
    setMsg("");
    setSaving(true);

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
      else input.validThrough = null;
      input.jobBenefits = form.jobBenefits || null;
      input.experienceRequired = form.experienceRequired || null;
      input.educationRequired = form.educationRequired || null;
      input.skills = form.skills || null;

      await gql(UPDATE_MUT, { jobId, input });
      setMsg("Job updated.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Link href="/careers/admin/jobs" style={{ fontSize: 13 }}>
        &larr; Back to jobs
      </Link>
      <h2>Edit Job {jobId}</h2>
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
          <input name="validThrough" type="date" value={form.validThrough} onChange={setField} />
        </label>
        <label>
          Skills <span className="optional">(optional, comma-separated)</span>
          <input name="skills" value={form.skills} onChange={setField} />
        </label>
        <label>
          Experience Required <span className="optional">(optional)</span>
          <input name="experienceRequired" value={form.experienceRequired} onChange={setField} />
        </label>
        <label>
          Education Required <span className="optional">(optional)</span>
          <input name="educationRequired" value={form.educationRequired} onChange={setField} />
        </label>
        <label>
          Benefits <span className="optional">(optional)</span>
          <textarea name="jobBenefits" value={form.jobBenefits} onChange={setField} rows={2} />
        </label>
        <button type="submit" disabled={saving} className="btn">
          {saving ? "Saving..." : "Save Changes"}
        </button>
        {msg && <p className="success">{msg}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
