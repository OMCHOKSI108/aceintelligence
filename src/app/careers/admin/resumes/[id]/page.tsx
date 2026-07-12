"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { gql } from "@/lib/careers/graphql";

const QUERY = `query($id: ID!) {
  candidateProfile(id: $id) {
    id resumeFileId candidateId uploadedBy fileName mimeType size
    rawExtractedText status processedAt errorMessage createdAt
    profileData {
      name email phone summary skills
      experience { title company duration description }
      education { degree institution year }
      certifications
      projects { name description url }
      linkedIn github
    }
  }
}`;

const DELETE_MUTATION = `mutation($profileId: ID!) {
  deleteCandidateProfile(profileId: $profileId)
}`;

const REPROCESS_MUTATION = `mutation($profileId: ID!) {
  reprocessResume(profileId: $profileId) { id status }
}`;

const STATUS_COLORS: Record<string, string> = {
  COMPLETED: "#060",
  PROCESSING: "#e8a000",
  PENDING: "#888",
  FAILED: "#c00",
};

export default function CandidateProfileDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showRawText, setShowRawText] = useState(false);

  useEffect(() => {
    if (id) loadProfile();
  }, [id]);

  async function loadProfile() {
    try {
      const data = await gql<{ candidateProfile: any }>(QUERY, { id });
      setProfile(data.candidateProfile);
    } catch (err: any) {
      console.error("Failed to load profile:", err);
    }
    setLoading(false);
  }

  async function handleDelete() {
    if (!confirm("Delete this profile permanently?")) return;
    try {
      await gql(DELETE_MUTATION, { profileId: id });
      router.push("/careers/admin/resumes");
    } catch (err: any) {
      alert(err.message);
    }
  }

  async function handleReprocess() {
    try {
      await gql(REPROCESS_MUTATION, { profileId: id });
      loadProfile();
    } catch (err: any) {
      alert(err.message);
    }
  }

  if (loading) return <p style={{ fontSize: 14, color: "#888" }}>Loading...</p>;
  if (!profile) return <p style={{ fontSize: 14, color: "#c00" }}>Profile not found.</p>;

  const data = profile.profileData;

  return (
    <div>
      <div className="page-header">
        <h2>{data?.name || profile.fileName}</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <Link href="/careers/admin/resumes" className="btn">
            Back
          </Link>
          {profile.resumeFileId && (
            <a
              href={`/api/resume/${profile.resumeFileId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              View Resume
            </a>
          )}
          {profile.status === "FAILED" && (
            <button onClick={handleReprocess} className="btn">
              Reprocess
            </button>
          )}
          <button
            onClick={handleDelete}
            className="btn"
            style={{ color: "#c00", borderColor: "#c00" }}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Status Bar */}
      <div className="meta" style={{ marginBottom: 16 }}>
        <div className="meta-row">
          <span className="meta-key">Status:</span>
          <span style={{ color: STATUS_COLORS[profile.status] || "#333", fontWeight: "bold" }}>
            {profile.status}
          </span>
        </div>
        <div className="meta-row">
          <span className="meta-key">File:</span>
          <span>
            {profile.fileName} ({profile.mimeType}, {(profile.size / 1024).toFixed(1)} KB)
          </span>
        </div>
        <div className="meta-row">
          <span className="meta-key">Uploaded:</span>
          <span>{new Date(profile.createdAt).toLocaleString()}</span>
        </div>
        {profile.processedAt && (
          <div className="meta-row">
            <span className="meta-key">Processed:</span>
            <span>{new Date(profile.processedAt).toLocaleString()}</span>
          </div>
        )}
        {profile.errorMessage && (
          <div className="meta-row">
            <span className="meta-key">Error:</span>
            <span style={{ color: "#c00" }}>{profile.errorMessage}</span>
          </div>
        )}
      </div>

      {profile.status !== "COMPLETED" && !data ? (
        <div>
          <p style={{ fontSize: 14, color: "#888" }}>
            {profile.status === "PROCESSING"
              ? "Resume is being processed..."
              : profile.status === "PENDING"
                ? "Resume is queued for processing."
                : "Processing failed. Try reprocessing."}
          </p>
        </div>
      ) : data ? (
        <div>
          {/* Contact Info */}
          <h3 style={{ marginBottom: 8 }}>Contact Information</h3>
          <div className="meta" style={{ marginBottom: 16 }}>
            {data.name && (
              <div className="meta-row">
                <span className="meta-key">Name:</span>
                <span>{data.name}</span>
              </div>
            )}
            {data.email && (
              <div className="meta-row">
                <span className="meta-key">Email:</span>
                <span>{data.email}</span>
              </div>
            )}
            {data.phone && (
              <div className="meta-row">
                <span className="meta-key">Phone:</span>
                <span>{data.phone}</span>
              </div>
            )}
            {data.linkedIn && (
              <div className="meta-row">
                <span className="meta-key">LinkedIn:</span>
                <span>{data.linkedIn}</span>
              </div>
            )}
            {data.github && (
              <div className="meta-row">
                <span className="meta-key">GitHub:</span>
                <span>{data.github}</span>
              </div>
            )}
          </div>

          {/* Summary */}
          {data.summary && (
            <>
              <h3 style={{ marginBottom: 8 }}>Summary</h3>
              <div className="description" style={{ marginBottom: 16 }}>
                {data.summary}
              </div>
            </>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <>
              <h3 style={{ marginBottom: 8 }}>Skills ({data.skills.length})</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                {data.skills.map((skill: string) => (
                  <span
                    key={skill}
                    style={{
                      border: "1px solid #ccc",
                      padding: "2px 8px",
                      fontSize: 13,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <>
              <h3 style={{ marginBottom: 8 }}>Experience ({data.experience.length})</h3>
              {data.experience.map((exp: any, i: number) => (
                <div key={i} className="meta" style={{ marginBottom: 8 }}>
                  {exp.title && (
                    <div className="meta-row">
                      <span className="meta-key">Title:</span>
                      <span>{exp.title}</span>
                    </div>
                  )}
                  {exp.company && (
                    <div className="meta-row">
                      <span className="meta-key">Company:</span>
                      <span>{exp.company}</span>
                    </div>
                  )}
                  {exp.duration && (
                    <div className="meta-row">
                      <span className="meta-key">Duration:</span>
                      <span>{exp.duration}</span>
                    </div>
                  )}
                  {exp.description && (
                    <div style={{ marginTop: 6, fontSize: 14, whiteSpace: "pre-wrap" }}>
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <>
              <h3 style={{ marginBottom: 8 }}>Education ({data.education.length})</h3>
              {data.education.map((edu: any, i: number) => (
                <div key={i} className="meta" style={{ marginBottom: 8 }}>
                  {edu.degree && (
                    <div className="meta-row">
                      <span className="meta-key">Degree:</span>
                      <span>{edu.degree}</span>
                    </div>
                  )}
                  {edu.institution && (
                    <div className="meta-row">
                      <span className="meta-key">Institution:</span>
                      <span>{edu.institution}</span>
                    </div>
                  )}
                  {edu.year && (
                    <div className="meta-row">
                      <span className="meta-key">Year:</span>
                      <span>{edu.year}</span>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <>
              <h3 style={{ marginBottom: 8 }}>Certifications ({data.certifications.length})</h3>
              <ul style={{ marginBottom: 16, paddingLeft: 20, fontSize: 15 }}>
                {data.certifications.map((cert: string, i: number) => (
                  <li key={i}>{cert}</li>
                ))}
              </ul>
            </>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <>
              <h3 style={{ marginBottom: 8 }}>Projects ({data.projects.length})</h3>
              {data.projects.map((proj: any, i: number) => (
                <div key={i} className="meta" style={{ marginBottom: 8 }}>
                  {proj.name && (
                    <div className="meta-row">
                      <span className="meta-key">Name:</span>
                      <span>{proj.name}</span>
                    </div>
                  )}
                  {proj.url && (
                    <div className="meta-row">
                      <span className="meta-key">URL:</span>
                      <span>{proj.url}</span>
                    </div>
                  )}
                  {proj.description && (
                    <div style={{ marginTop: 6, fontSize: 14, whiteSpace: "pre-wrap" }}>
                      {proj.description}
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {/* Raw Text Toggle */}
          <div style={{ marginTop: 16 }}>
            <button
              onClick={() => setShowRawText(!showRawText)}
              className="link-btn"
              style={{ fontSize: 13 }}
            >
              {showRawText ? "Hide" : "Show"} Raw Extracted Text
            </button>
            {showRawText && profile.rawExtractedText && (
              <pre
                style={{
                  marginTop: 8,
                  border: "1px solid #ccc",
                  padding: 12,
                  fontSize: 13,
                  whiteSpace: "pre-wrap",
                  maxHeight: 400,
                  overflow: "auto",
                }}
              >
                {profile.rawExtractedText}
              </pre>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
