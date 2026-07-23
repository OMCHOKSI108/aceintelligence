"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/careers/auth";
import { gql } from "@/lib/careers/graphql";

const UPDATE_MUT = `mutation($input: UpdateProfileInput!) {
  updateOwnProfile(input: $input) { id name email phone bio profilePhoto }
}`;

const CHANGE_PW_MUT = `mutation($input: ChangePasswordInput!) {
  changePassword(input: $input)
}`;

const MY_APPLICATIONS_QUERY = `{
  myApplications {
    id jobId jobTitle location employmentType stage appliedAt
  }
}`;

interface CandidateApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  location: string;
  employmentType: string;
  stage: string;
  appliedAt: string;
}

export default function ProfilePage() {
  const { user, loading: authLoading, login } = useAuth();

  const [form, setForm] = useState({
    name: user?.name ?? "",
    phone: user?.phone ?? "",
    bio: user?.bio ?? "",
  });
  const [photo, setPhoto] = useState<string | null>(user?.profilePhoto ?? null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const [pwForm, setPwForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [pwLoading, setPwLoading] = useState(false);
  const [pwMsg, setPwMsg] = useState("");
  const [pwError, setPwError] = useState("");
  const [applications, setApplications] = useState<CandidateApplication[]>([]);
  const [appsLoading, setAppsLoading] = useState(false);
  const [appsError, setAppsError] = useState("");

  useEffect(() => {
    if (!user) return;
    setForm({
      name: user.name ?? "",
      phone: user.phone ?? "",
      bio: user.bio ?? "",
    });
    setPhoto(user.profilePhoto ?? null);
  }, [user]);

  useEffect(() => {
    if (user?.role !== "CANDIDATE") return;
    setAppsLoading(true);
    gql<{ myApplications: CandidateApplication[] }>(MY_APPLICATIONS_QUERY)
      .then((data) => setApplications(data.myApplications))
      .catch((err) => setAppsError(err.message))
      .finally(() => setAppsLoading(false));
  }, [user?.role]);

  function setField(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function setPwField(e: React.ChangeEvent<HTMLInputElement>) {
    setPwForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMsg("");
    setLoading(true);

    try {
      const input: Record<string, string> = { ...form };
      if (photo) input.profilePhoto = photo;
      if (!input.phone) delete input.phone;
      if (!input.bio) delete input.bio;

      const data = await gql<{ updateOwnProfile: any }>(UPDATE_MUT, { input });

      if (user) {
        login({ ...user, ...data.updateOwnProfile });
      }

      setMsg("Profile updated.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setPwError("");
    setPwMsg("");

    if (pwForm.newPassword !== pwForm.confirmPassword) {
      setPwError("New passwords do not match.");
      return;
    }
    if (pwForm.newPassword.length < 6) {
      setPwError("New password must be at least 6 characters.");
      return;
    }

    setPwLoading(true);
    try {
      await gql(
        CHANGE_PW_MUT,
        { input: { oldPassword: pwForm.oldPassword, newPassword: pwForm.newPassword } },
      );
      setPwMsg("Password changed successfully.");
      setPwForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: any) {
      setPwError(err.message);
    } finally {
      setPwLoading(false);
    }
  }

  if (authLoading) return <p>Loading...</p>;

  if (!user) {
    return (
      <div>
        <h2>Profile</h2>
        <p>
          You need to <Link href="/careers/candidate-login">log in</Link> to view your profile.
        </p>
      </div>
    );
  }

  if (user.role === "CANDIDATE") {
    return (
      <div>
        <h2>Profile</h2>
        <div className="meta">
          <div className="meta-row">
            <span className="meta-key">Name:</span>
            <span>{user.name}</span>
          </div>
          <div className="meta-row">
            <span className="meta-key">Email:</span>
            <span>{user.email}</span>
          </div>
          {user.phone && (
            <div className="meta-row">
              <span className="meta-key">Phone:</span>
              <span>{user.phone}</span>
            </div>
          )}
        </div>

        <div className="page-header" style={{ marginTop: 24 }}>
          <h3>My Applications</h3>
          <Link href="/careers" className="btn">
            Browse Jobs
          </Link>
        </div>

        {appsLoading ? (
          <p>Loading applications...</p>
        ) : appsError ? (
          <p className="error">{appsError}</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Job</th>
                <th>Location</th>
                <th>Type</th>
                <th>Status</th>
                <th>Applied</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td>
                    <Link href={`/careers/${app.jobId}`} className="link-btn">
                      {app.jobTitle}
                    </Link>
                  </td>
                  <td>{app.location}</td>
                  <td>{app.employmentType.replace("_", " ")}</td>
                  <td>{app.stage.replace("_", " ")}</td>
                  <td>{new Date(Number(app.appliedAt)).toLocaleDateString()}</td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr>
                  <td colSpan={5}>No applications yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2>Profile</h2>
      <p style={{ fontSize: 13, marginBottom: 12 }}>
        {user?.role} &middot; {user?.loginId}
      </p>

      <form onSubmit={handleSubmit} className="form">
        <label>
          Name
          <input name="name" value={form.name} onChange={setField} required />
        </label>
        <label>
          Email
          <input value={user?.email ?? ""} disabled />
        </label>
        <label>
          Phone
          <input name="phone" value={form.phone} onChange={setField} />
        </label>
        <label>
          Bio
          <textarea name="bio" value={form.bio} onChange={setField} rows={3} />
        </label>
        <label>
          Profile Photo
          <input type="file" accept="image/*" onChange={handlePhoto} />
        </label>
        {photo && (
          <img
            src={photo}
            alt="Preview"
            style={{ width: 80, height: 80, border: "1px solid #ccc" }}
          />
        )}
        <button type="submit" disabled={loading} className="btn">
          {loading ? "Saving..." : "Save Profile"}
        </button>
        {msg && <p className="success">{msg}</p>}
        {error && <p className="error">{error}</p>}
      </form>

      <hr style={{ margin: "32px 0", border: "none", borderTop: "1px solid #e0e0e0" }} />

      <h3>Change Password</h3>
      <form onSubmit={handlePasswordChange} className="form">
        <label>
          Current Password <span className="req">*</span>
          <input
            name="oldPassword"
            type="password"
            value={pwForm.oldPassword}
            onChange={setPwField}
            required
          />
        </label>
        <label>
          New Password <span className="req">*</span>
          <input
            name="newPassword"
            type="password"
            value={pwForm.newPassword}
            onChange={setPwField}
            required
          />
        </label>
        <label>
          Confirm New Password <span className="req">*</span>
          <input
            name="confirmPassword"
            type="password"
            value={pwForm.confirmPassword}
            onChange={setPwField}
            required
          />
        </label>
        <button type="submit" disabled={pwLoading} className="btn">
          {pwLoading ? "Changing..." : "Change Password"}
        </button>
        {pwMsg && <p className="success">{pwMsg}</p>}
        {pwError && <p className="error">{pwError}</p>}
      </form>
    </div>
  );
}
