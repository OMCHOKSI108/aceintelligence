"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/careers/auth";

export default function CandidateLoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/candidate-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      login(data.user);
      router.push("/careers");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-box">
      <h2>Candidate Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Email <span className="req">*</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password <span className="req">*</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading} className="btn">
          {loading ? "Logging in..." : "Log In"}
        </button>
        {error && <p className="error">{error}</p>}
        <p style={{ fontSize: 13, marginTop: 8 }}>
          Don&apos;t have an account? <Link href="/careers/register">Create one</Link>
        </p>
      </form>
    </div>
  );
}
