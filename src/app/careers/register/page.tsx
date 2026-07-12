"use client";
import { useState } from "react";
import Link from "next/link";
import { gql } from "@/lib/careers/graphql";

const MUTATION = `mutation($email: String!, $password: String!, $name: String!, $phone: String) {
  candidateRegister(email: $email, password: $password, name: $name, phone: $phone) { id email name }
}`;

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  function setField(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const input: Record<string, string> = { ...form };
      if (!input.phone) delete input.phone;
      await gql(MUTATION, input);
      setStatus("done");
      setMsg("Account created! Check your email for a verification link.");
    } catch (err: any) {
      setStatus("error");
      setMsg(err.message);
    }
  }

  if (status === "done") {
    return (
      <div className="login-box">
        <h2>Check Your Email</h2>
        <p style={{ margin: "12px 0" }}>{msg}</p>
        <Link href="/careers/candidate/login">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="login-box">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Full Name <span className="req">*</span>
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
            minLength={6}
          />
        </label>
        <label>
          Phone <span className="optional">(optional)</span>
          <input name="phone" value={form.phone} onChange={setField} />
        </label>
        <button type="submit" disabled={status === "loading"} className="btn">
          {status === "loading" ? "Creating..." : "Create Account"}
        </button>
        {status === "error" && <p className="error">{msg}</p>}
        <p style={{ fontSize: 13, marginTop: 8 }}>
          Already have an account? <Link href="/careers/candidate/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}
