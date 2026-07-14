"use client";
import { useState, useRef, use } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/careers/auth";
import { gql } from "@/lib/careers/graphql";

const MUTATION = `mutation($input: SubmitApplicationInput!) {
  submitApplication(input: $input) { id name email stage }
}`;

export default function ApplyPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = use(params);
  const { user } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);

  const [mode, setMode] = useState<"manual" | "resume">("resume");
  const [phone, setPhone] = useState("");
  const [manual, setManual] = useState({
    experience: "",
    currentCompany: "",
    noticePeriod: "",
    expectedSalary: "",
    linkedin: "",
    portfolio: "",
    motivation: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  if (!user || user.role !== "CANDIDATE") {
    const returnTo = encodeURIComponent(`/careers/${jobId}/apply`);
    return (
      <div className="apply-gate">
        <p className="muted">Candidate application</p>
        <h2>Apply for this position</h2>
        <p>
          Create a candidate account or log in to continue. We will bring you straight back to this
          application.
        </p>
        <div className="apply-actions">
          <Link href={`/careers/register?returnTo=${returnTo}`} className="btn btn-primary">
            Create Account
          </Link>
          <Link href={`/careers/candidate-login?returnTo=${returnTo}`} className="btn">
            Log In
          </Link>
        </div>
        <p className="muted">Your application will stay tied to job {jobId}.</p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!jobId) return;
    if (!file) {
      setStatus("error");
      setMsg("Please upload your resume before submitting.");
      return;
    }

    setStatus("submitting");
    try {
      const buf = await file.arrayBuffer();
      const base64 = btoa(new Uint8Array(buf).reduce((s, b) => s + String.fromCharCode(b), ""));

      await gql(
        MUTATION,
        {
          input: {
            jobId,
            phone,
            resumeFileName: file.name,
            resumeMimeType: file.type,
            resumeBase64: base64,
            applicationAnswers: mode === "manual" ? JSON.stringify(manual) : undefined,
          },
        },
      );

      setStatus("done");
      setMsg("Application submitted successfully.");
    } catch (err: any) {
      setStatus("error");
      setMsg(err.message);
    }
  }

  if (status === "done") {
    return (
      <div>
        <h2>Application Submitted</h2>
        <p style={{ margin: "12px 0" }}>{msg}</p>
        <p style={{ fontSize: 13 }}>
          You&apos;ll receive a confirmation email shortly. You can track your application from your
          dashboard.
        </p>
        <Link href="/careers" style={{ display: "inline-block", marginTop: 12 }}>
          Browse more jobs
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Apply for this position</h2>
      <p style={{ fontSize: 13, marginBottom: 12 }}>
        Applying as <strong>{user.name}</strong> ({user.email})
      </p>
      <div className="apply-methods" role="tablist" aria-label="Application method">
        <button
          type="button"
          className={mode === "resume" ? "method-card active" : "method-card"}
          onClick={() => setMode("resume")}
        >
          <strong>Upload Resume</strong>
          <span>Fastest path. Attach PDF, DOC, or DOCX and submit.</span>
        </button>
        <button
          type="button"
          className={mode === "manual" ? "method-card active" : "method-card"}
          onClick={() => {
            setMode("manual");
            setFile(null);
            if (fileRef.current) fileRef.current.value = "";
          }}
        >
          <strong>Apply Manually</strong>
          <span>Answer the application fields first, then upload your resume.</span>
        </button>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Phone <span className="req">*</span>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </label>
        {mode === "manual" && (
          <fieldset className="manual-fields">
            <legend>Application Details</legend>
            <label>
              Total Experience <span className="req">*</span>
              <input
                value={manual.experience}
                onChange={(e) => setManual((f) => ({ ...f, experience: e.target.value }))}
                placeholder="Example: 2 years"
                required
              />
            </label>
            <label>
              Current Company <span className="optional">(optional)</span>
              <input
                value={manual.currentCompany}
                onChange={(e) => setManual((f) => ({ ...f, currentCompany: e.target.value }))}
              />
            </label>
            <label>
              Notice Period <span className="req">*</span>
              <input
                value={manual.noticePeriod}
                onChange={(e) => setManual((f) => ({ ...f, noticePeriod: e.target.value }))}
                placeholder="Immediate / 30 days / 60 days"
                required
              />
            </label>
            <label>
              Expected Salary <span className="req">*</span>
              <input
                value={manual.expectedSalary}
                onChange={(e) => setManual((f) => ({ ...f, expectedSalary: e.target.value }))}
                required
              />
            </label>
            <label>
              LinkedIn <span className="optional">(optional)</span>
              <input
                type="url"
                value={manual.linkedin}
                onChange={(e) => setManual((f) => ({ ...f, linkedin: e.target.value }))}
                placeholder="https://linkedin.com/in/..."
              />
            </label>
            <label>
              Portfolio / GitHub <span className="optional">(optional)</span>
              <input
                type="url"
                value={manual.portfolio}
                onChange={(e) => setManual((f) => ({ ...f, portfolio: e.target.value }))}
                placeholder="https://..."
              />
            </label>
            <label>
              Why are you interested in this role? <span className="req">*</span>
              <textarea
                value={manual.motivation}
                onChange={(e) => setManual((f) => ({ ...f, motivation: e.target.value }))}
                rows={4}
                required
              />
            </label>
          </fieldset>
        )}
        <label>
          Resume <span className="req">*</span> <span className="optional">(PDF/DOC/DOCX, max 5MB)</span>
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.doc,.docx"
            required
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </label>
        <button type="submit" disabled={status === "submitting"} className="btn">
          {status === "submitting" ? "Submitting..." : "Submit Application"}
        </button>
        {status === "error" && <p className="error">{msg}</p>}
      </form>
    </div>
  );
}
