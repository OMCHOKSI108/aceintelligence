"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { gql } from "@/lib/careers/graphql";

const MUTATION = `mutation($input: CreateAdminInput!) {
  createAdmin(input: $input) { id loginId name email }
}`;

export default function CreateAdminPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function setField(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const input: Record<string, string> = { ...form };
      if (!input.phone) delete input.phone;
      if (!input.bio) delete input.bio;

      await gql(MUTATION, { input });
      router.push("/careers/admin");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Create Admin</h2>
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
          />
        </label>
        <label>
          Phone <span className="optional">(optional)</span>
          <input name="phone" value={form.phone} onChange={setField} />
        </label>
        <label>
          Bio <span className="optional">(optional)</span>
          <textarea name="bio" value={form.bio} onChange={setField} rows={3} />
        </label>
        <button type="submit" disabled={loading} className="btn">
          {loading ? "Creating..." : "Create Admin"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
