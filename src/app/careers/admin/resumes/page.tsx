"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { gql } from "@/lib/careers/graphql";

const QUERY = `query($search: String, $status: ProfileStatus, $skills: String, $limit: Int, $offset: Int) {
  candidateProfiles(search: $search, status: $status, skills: $skills, limit: $limit, offset: $offset) {
    id fileName mimeType status processedAt createdAt
    profileData { name email phone skills experience { title company } }
  }
}`;

const STATS_QUERY = `query { profileStats { total completed processing pending failed } }`;

const STATUS_COLORS: Record<string, string> = {
  COMPLETED: "#060",
  PROCESSING: "#e8a000",
  PENDING: "#888",
  FAILED: "#c00",
};

export default function CandidateProfilesPage() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [skillsFilter, setSkillsFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    loadProfiles();
    loadStats();
  }, [statusFilter]);

  async function loadProfiles() {
    setLoading(true);
    try {
      const data = await gql<{ candidateProfiles: any[] }>(
        QUERY,
        {
          search: search || undefined,
          status: statusFilter || undefined,
          skills: skillsFilter || undefined,
          limit: 50,
          offset: 0,
        },
      );
      setProfiles(data.candidateProfiles);
    } catch (err: any) {
      console.error("Failed to load profiles:", err);
    }
    setLoading(false);
  }

  async function loadStats() {
    try {
      const data = await gql<{ profileStats: any }>(STATS_QUERY);
      setStats(data.profileStats);
    } catch {
      // stats are non-critical
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    loadProfiles();
  }

  return (
    <div>
      <div className="page-header">
        <h2>Candidate Profiles</h2>
        <Link href="/careers/admin/resumes/upload" className="btn">
          + Upload Resume
        </Link>
      </div>

      {stats && (
        <div style={{ display: "flex", gap: 16, fontSize: 13, marginBottom: 12, color: "#555" }}>
          <span>
            Total: <strong>{stats.total}</strong>
          </span>
          <span>
            Completed: <strong style={{ color: STATUS_COLORS.COMPLETED }}>{stats.completed}</strong>
          </span>
          <span>
            Processing:{" "}
            <strong style={{ color: STATUS_COLORS.PROCESSING }}>{stats.processing}</strong>
          </span>
          <span>
            Pending: <strong style={{ color: STATUS_COLORS.PENDING }}>{stats.pending}</strong>
          </span>
          <span>
            Failed: <strong style={{ color: STATUS_COLORS.FAILED }}>{stats.failed}</strong>
          </span>
        </div>
      )}

      <form onSubmit={handleSearch} className="inline-form" style={{ marginBottom: 12 }}>
        <label>
          Search
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="name, email, keyword..."
          />
        </label>
        <label>
          Skills
          <input
            value={skillsFilter}
            onChange={(e) => setSkillsFilter(e.target.value)}
            placeholder="react, python..."
          />
        </label>
        <label>
          Status
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All</option>
            <option value="COMPLETED">Completed</option>
            <option value="PROCESSING">Processing</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
          </select>
        </label>
        <button type="submit" className="btn">
          Search
        </button>
      </form>

      {loading ? (
        <p style={{ fontSize: 14, color: "#888" }}>Loading...</p>
      ) : profiles.length === 0 ? (
        <p style={{ fontSize: 14, color: "#888" }}>No profiles found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Skills</th>
              <th>Experience</th>
              <th>Status</th>
              <th>Uploaded</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((p) => {
              const data = p.profileData;
              return (
                <tr key={p.id}>
                  <td>{data?.name || p.fileName}</td>
                  <td>{data?.email || "\u2014"}</td>
                  <td style={{ maxWidth: 200, fontSize: 13 }}>
                    {(data?.skills || []).slice(0, 3).join(", ")}
                    {(data?.skills || []).length > 3 && ` +${data.skills.length - 3}`}
                  </td>
                  <td style={{ fontSize: 13 }}>
                    {(data?.experience || []).length > 0
                      ? `${data.experience.length} role${data.experience.length > 1 ? "s" : ""}`
                      : "\u2014"}
                  </td>
                  <td>
                    <span
                      style={{
                        color: STATUS_COLORS[p.status] || "#333",
                        fontWeight: "bold",
                        fontSize: 13,
                      }}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td style={{ fontSize: 13, color: "#888" }}>
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <Link href={`/careers/admin/resumes/${p.id}`} className="link-btn">
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
