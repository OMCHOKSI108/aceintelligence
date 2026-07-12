"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/careers/auth";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loginId, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      login(data.user);

      const role = data.user.role;
      if (role === "SUPER_ADMIN" || role === "ADMIN") {
        router.push("/careers/admin");
      } else {
        router.push("/careers/profile");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-box">
      <h2>Admin Log In</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Login ID or Email <span className="req">*</span>
          <input
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            placeholder="SUP-0001 or admin@email.com"
            required
          />
        </label>
        <label>
          Password <span className="req">*</span>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword((s) => !s)}
              tabIndex={-1}
            >
              {showPassword ? "\u2715" : "\uD83D\uDC41"}
            </button>
          </div>
        </label>
        <button type="submit" disabled={loading} className="btn">
          {loading ? "Logging in..." : "Log In"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
