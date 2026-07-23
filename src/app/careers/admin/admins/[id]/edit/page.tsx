"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { gql } from "@/lib/careers/graphql";
import { useAuth } from "@/lib/careers/auth";

const QUERY = `query($id: ID!) {
  getAdminById(id: $id) { id name email phone bio profilePhoto }
}`;

const UPDATE_MUT = `mutation($id: ID!, $input: UpdateAdminInput!) {
  updateAdmin(id: $id, input: $input) { id name email phone bio }
}`;

export default function EditAdminPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (authLoading) return;
    if (user?.role === "ADMIN") {
      router.replace("/careers/admin/jobs");
      return;
    }
    if (user?.role !== "SUPER_ADMIN") {
      setLoading(false);
      return;
    }
    if (!id) return;
    gql<{ getAdminById: any }>(QUERY, { id })
      .then((d) => {
        const a = d.getAdminById;
        if (!a) {
          setError("Admin not found");
          return;
        }
        setForm({ name: a.name ?? "", phone: a.phone ?? "", bio: a.bio ?? "" });
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [authLoading, id, router, user?.role]);

  function setField(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMsg("");
    setSaving(true);

    try {
      const input: Record<string, string> = { name: form.name };
      if (form.phone) input.phone = form.phone;
      if (form.bio) input.bio = form.bio;

      await gql(UPDATE_MUT, { id, input });
      setMsg("Admin updated.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (authLoading || loading) return <p>Loading...</p>;
  if (user?.role !== "SUPER_ADMIN") return <p className="error">Super Admin access required.</p>;

  return (
    <div>
      <Link href="/careers/admin" style={{ fontSize: 13 }}>
        &larr; Back to admins
      </Link>
      <h2>Edit Admin</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Name <span className="req">*</span>
          <input name="name" value={form.name} onChange={setField} required />
        </label>
        <label>
          Phone <span className="optional">(optional)</span>
          <input name="phone" value={form.phone} onChange={setField} />
        </label>
        <label>
          Bio <span className="optional">(optional)</span>
          <textarea name="bio" value={form.bio} onChange={setField} rows={3} />
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
