"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/careers/auth";

export default function ResumeUploadPage() {
  const { user } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "polling" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  const [profileId, setProfileId] = useState<string | null>(null);
  const [profileStatus, setProfileStatus] = useState("");

  const isAdmin = user && (user.role === "SUPER_ADMIN" || user.role === "ADMIN");
  const isCandidate = user && user.role === "CANDIDATE";

  if (!user) {
    return (
      <div>
        <h2>Upload Resume</h2>
        <p style={{ margin: "12px 0" }}>
          You need to <Link href="/careers/candidate-login">log in</Link> to upload a resume.
        </p>
      </div>
    );
  }

  function pollStatus(id: string) {
    setStatus("polling");
    setProfileStatus("Processing...");

    const poll = async () => {
      try {
        const res = await fetch(`/api/resume/profile/${id}/status`);
        const data = await res.json();

        if (data.status === "COMPLETED") {
          setStatus("done");
          setProfileStatus("Completed");
          setMsg("Resume processed successfully!");
          return;
        }
        if (data.status === "FAILED") {
          setStatus("error");
          setProfileStatus("Failed");
          setMsg(data.errorMessage || "Processing failed");
          return;
        }

        setProfileStatus(data.status === "PROCESSING" ? "Extracting text..." : "Queued...");
        setTimeout(poll, 1500);
      } catch {
        setTimeout(poll, 2000);
      }
    };

    setTimeout(poll, 1000);
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    setStatus("uploading");
    try {
      const endpoint = isAdmin ? "/api/resume/upload" : "/api/resume/candidate-upload";
      const formData = new FormData();
      formData.append("resume", file);

      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setProfileId(data.id);
      pollStatus(data.id);
    } catch (err: any) {
      setStatus("error");
      setMsg(err.message);
    }
  }

  if (status === "done") {
    return (
      <div>
        <h2>Resume Processed</h2>
        <p className="success" style={{ margin: "12px 0" }}>
          {msg}
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
          <Link href={`/careers/admin/resumes/${profileId}`} className="btn">
            View Profile
          </Link>
          <Link href={isAdmin ? "/careers/admin/resumes" : "/careers/profile"} className="btn">
            Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>Upload Resume</h2>
      <p style={{ fontSize: 13, color: "#666", marginBottom: 12 }}>
        {isAdmin
          ? "Upload a candidate's resume for automatic parsing and profile creation."
          : "Upload your resume to build your candidate profile."}
      </p>

      <form onSubmit={handleUpload} className="form" style={{ maxWidth: 500 }}>
        <label>
          Resume <span style={{ color: "#c00" }}>*</span>{" "}
          <span style={{ color: "#888", fontWeight: "normal", fontSize: 14 }}>
            (PDF, DOCX, JPG, PNG — max 5MB)
          </span>
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            required
            disabled={status === "uploading" || status === "polling"}
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </label>

        {file && (
          <div style={{ fontSize: 13, color: "#555" }}>
            Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
          </div>
        )}

        <button
          type="submit"
          className="btn"
          disabled={!file || status === "uploading" || status === "polling"}
        >
          {status === "uploading"
            ? "Uploading..."
            : status === "polling"
              ? "Processing..."
              : "Upload Resume"}
        </button>

        {(status === "polling" || status === "uploading") && (
          <div style={{ fontSize: 13, color: "#666", marginTop: 8 }}>
            {status === "uploading" ? "Uploading file..." : profileStatus}
          </div>
        )}

        {status === "error" && <p style={{ color: "#c00", fontSize: 15 }}>{msg}</p>}
      </form>
    </div>
  );
}
