"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { gql } from "@/lib/careers/graphql";

const WORK_STATUSES = ["NOT_STARTED", "IN_PROGRESS", "REVIEW", "COMPLETED", "ON_HOLD"];

const CLIENT_QUERY = `query($id: ID!) {
  getClientById(id: $id) {
    client { id loginId email name phone companyName workStatus googleChatLink notes createdAt }
    documents { id fileName fileType fileSize createdAt }
  }
}`;

const UPDATE_MUT = `mutation($id: ID!, $input: UpdateClientInput!) {
  updateClient(id: $id, input: $input) { id name }
}`;

const DELETE_MUT = `mutation($id: ID!) {
  deleteClient(id: $id)
}`;

const PASSWORD_MUT = `mutation($id: ID!, $input: UpdateClientPasswordInput!) {
  updateClientPassword(id: $id, input: $input)
}`;

export default function EditClientPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [client, setClient] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    companyName: "",
    workStatus: "NOT_STARTED",
    googleChatLink: "",
    notes: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  useEffect(() => {
    gql<{ getClientById: { client: any; documents: any[] } }>(CLIENT_QUERY, {
      id: params.id,
    })
      .then((d) => {
        setClient(d.getClientById.client);
        setDocuments(d.getClientById.documents);
        setForm({
          name: d.getClientById.client.name || "",
          phone: d.getClientById.client.phone || "",
          companyName: d.getClientById.client.companyName || "",
          workStatus: d.getClientById.client.workStatus || "NOT_STARTED",
          googleChatLink: d.getClientById.client.googleChatLink || "",
          notes: d.getClientById.client.notes || "",
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [params.id]);

  function setField(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      await gql(UPDATE_MUT, {
        id: params.id,
        input: {
          name: form.name,
          phone: form.phone || null,
          companyName: form.companyName || null,
          workStatus: form.workStatus,
          googleChatLink: form.googleChatLink || null,
          notes: form.notes || null,
        },
      });
      setSuccess("Client updated successfully.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handlePasswordReset() {
    if (!newPassword) return;
    setError("");
    setSuccess("");

    try {
      await gql(PASSWORD_MUT, {
        id: params.id,
        input: { newPassword },
      });
      setSuccess("Password updated successfully.");
      setNewPassword("");
      setShowPasswordReset(false);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this client?")) return;

    try {
      await gql(DELETE_MUT, { id: params.id });
      router.push("/careers/admin/clients");
    } catch (err: any) {
      setError(err.message);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (!client) return <p>Client not found.</p>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Edit Client — {client.loginId}</h2>
          <p className="muted">
            {client.email} • Created {new Date(client.createdAt).toLocaleDateString()}
          </p>
        </div>
        <button className="link-btn danger" onClick={handleDelete}>
          Delete Client
        </button>
      </div>

      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}

      <section className="form-panel">
        <h3>Client Details</h3>
        <form onSubmit={handleSave} className="form">
          <label>
            Name <span className="req">*</span>
            <input name="name" value={form.name} onChange={setField} required />
          </label>
          <label>
            Phone
            <input name="phone" value={form.phone} onChange={setField} />
          </label>
          <label>
            Company
            <input name="companyName" value={form.companyName} onChange={setField} />
          </label>
          <label>
            Work Status <span className="req">*</span>
            <select name="workStatus" value={form.workStatus} onChange={setField}>
              {WORK_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </label>
          <label>
            Google Chat Link
            <input name="googleChatLink" value={form.googleChatLink} onChange={setField} />
          </label>
          <label>
            Notes
            <textarea name="notes" value={form.notes} onChange={setField} rows={4} />
          </label>
          <button type="submit" disabled={saving} className="btn">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </section>

      <section className="form-panel" style={{ marginTop: 16 }}>
        <h3>Reset Password</h3>
        {showPasswordReset ? (
          <div className="form">
            <label>
              New Password
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                minLength={8}
              />
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn" onClick={handlePasswordReset}>
                Update Password
              </button>
              <button
                className="btn"
                style={{ background: "#666" }}
                onClick={() => {
                  setShowPasswordReset(false);
                  setNewPassword("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button className="btn" onClick={() => setShowPasswordReset(true)}>
            Reset Password
          </button>
        )}
      </section>

      <section style={{ marginTop: 16 }}>
        <h3>Uploaded Documents ({documents.length})</h3>
        {documents.length === 0 ? (
          <p className="muted">No documents uploaded yet.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>File</th>
                <th>Type</th>
                <th>Size</th>
                <th>Uploaded</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.fileName}</td>
                  <td>{doc.fileType}</td>
                  <td>{(doc.fileSize / 1024).toFixed(1)} KB</td>
                  <td>{new Date(doc.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <a
          href={`/careers/admin/clients/${params.id}/documents`}
          className="link-btn"
          style={{ marginTop: 8, display: "inline-block" }}
        >
          Manage Documents
        </a>
      </section>
    </div>
  );
}
