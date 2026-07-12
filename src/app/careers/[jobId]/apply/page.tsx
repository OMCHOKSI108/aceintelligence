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

  const [phone, setPhone] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  if (!user || user.role !== "CANDIDATE") {
    return (
      <div>
        <h2>Apply for this position</h2>
        <p style={{ margin: "12px 0" }}>
          You need an account to apply. <Link href="/careers/register">Create one</Link> or{" "}
          <Link href="/careers/candidate/login">log in</Link>.
        </p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !jobId) return;

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
      <form onSubmit={handleSubmit} className="form">
        <label>
          Phone <span className="req">*</span>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </label>
        <label>
          Resume <span className="req">*</span> <span className="optional">(PDF, max 5MB)</span>
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
