"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, X } from "lucide-react";
import { gql } from "@/lib/careers/graphql";

const WORK_STATUSES = ["NOT_STARTED", "IN_PROGRESS", "REVIEW", "COMPLETED", "ON_HOLD"];

const CLIENTS_QUERY = `{
  listClients { id loginId email name companyName workStatus createdAt }
}`;

const CREATE_MUT = `mutation($input: CreateClientInput!) {
  createClient(input: $input) { id loginId email name }
}`;

const STATUS_MUT = `mutation($id: ID!, $status: WorkStatus!) {
  updateClientWorkStatus(id: $id, status: $status) { id workStatus }
}`;

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    companyName: "",
    googleChatLink: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    loadClients();
  }, []);

  function loadClients() {
    gql<{ listClients: any[] }>(CLIENTS_QUERY)
      .then((d) => setClients(d.listClients))
      .catch(console.error)
      .finally(() => setLoadingClients(false));
  }

  function setField(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const input: Record<string, unknown> = {
        name: form.name,
        email: form.email,
        password: form.password,
      };
      if (form.phone) input.phone = form.phone;
      if (form.companyName) input.companyName = form.companyName;
      if (form.googleChatLink) input.googleChatLink = form.googleChatLink;
      if (form.notes) input.notes = form.notes;

      const created = await gql<{ createClient: { id: string; loginId: string } }>(
        CREATE_MUT,
        { input },
      );

      setSuccess(
        `Client created — ${created.createClient.loginId}. Welcome email sent to ${form.email}`,
      );
      loadClients();

      setForm({
        name: "",
        email: "",
        password: "",
        phone: "",
        companyName: "",
        googleChatLink: "",
        notes: "",
      });
      setShowCreateForm(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id: string, status: string) {
    try {
      await gql<{ updateClientWorkStatus: { workStatus: string } }>(STATUS_MUT, {
        id,
        status,
      });
      setClients((prev) =>
        prev.map((c) => (c.id === id ? { ...c, workStatus: status } : c)),
      );
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Clients</h2>
          <p className="muted">Manage client accounts and project status.</p>
        </div>
        <button
          type="button"
          className="btn icon-btn"
          onClick={() => setShowCreateForm((open) => !open)}
          aria-expanded={showCreateForm}
        >
          {showCreateForm ? <X size={16} /> : <Plus size={16} />}
          {showCreateForm ? "Cancel" : "Add Client"}
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
        <section className="form-panel">
          <h3>Create Client</h3>
          <form onSubmit={handleSubmit} className="form">
            <label>
              Name <span className="req">*</span>
              <input name="name" value={form.name} onChange={setField} required />
            </label>
            <label>
              Email <span className="req">*</span>
              <input name="email" type="email" value={form.email} onChange={setField} required />
            </label>
            <label>
              Password <span className="req">*</span>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={setField}
                required
                minLength={8}
              />
            </label>
            <label>
              Phone <span className="optional">(optional)</span>
              <input name="phone" value={form.phone} onChange={setField} />
            </label>
            <label>
              Company <span className="optional">(optional)</span>
              <input name="companyName" value={form.companyName} onChange={setField} />
            </label>
            <label>
              Google Chat Link <span className="optional">(optional)</span>
              <input name="googleChatLink" value={form.googleChatLink} onChange={setField} />
            </label>
            <label>
              Notes <span className="optional">(optional)</span>
              <textarea name="notes" value={form.notes} onChange={setField} rows={3} />
            </label>
            <button type="submit" disabled={loading} className="btn">
              {loading ? "Creating..." : "Create Client"}
            </button>
          </form>
        </section>
      )}

      <h3 style={{ marginTop: 16 }}>All Clients</h3>
      {loadingClients ? (
        <p>Loading...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Login ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id}>
                <td>{c.loginId}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.companyName || "—"}</td>
                <td>
                  <select
                    value={c.workStatus}
                    onChange={(e) => handleStatusChange(c.id, e.target.value)}
                    className="status-select"
                  >
                    {WORK_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="actions">
                  <Link href={`/careers/admin/clients/${c.id}/edit`} className="link-btn">
                    Edit
                  </Link>
                  <Link href={`/careers/admin/clients/${c.id}/documents`} className="link-btn">
                    Documents
                  </Link>
                </td>
              </tr>
            ))}
            {clients.length === 0 && (
              <tr>
                <td colSpan={6}>No clients yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
