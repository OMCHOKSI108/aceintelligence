"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/careers/auth";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");
  const [msg, setMsg] = useState("");
  const [returnTo, setReturnTo] = useState("/careers/profile");

  useEffect(() => {
    const token = searchParams.get("token");
    const nextPath = searchParams.get("returnTo") || "/careers/profile";
    setReturnTo(nextPath);
    if (!token) {
      setStatus("error");
      setMsg("No verification token found.");
      return;
    }

    fetch("/api/auth/candidate-verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          throw new Error(`Server returned ${res.status} instead of JSON. Check deployment logs.`);
        }

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Verification failed");
        login(data.user);
        setStatus("done");
        setMsg("Email verified. You are logged in now.");
        setTimeout(() => router.replace(nextPath), 1200);
      })
      .catch((err: any) => {
        setStatus("error");
        setMsg(err.message);
      });
  }, [login, router, searchParams]);

  return (
    <div className="login-box">
      <h2>Email Verification</h2>
      {status === "loading" && <p>Verifying...</p>}
      {status === "done" && (
        <>
          <p style={{ margin: "12px 0", color: "#060" }}>{msg}</p>
          <p className="muted">Taking you back to your application...</p>
          <Link href={returnTo}>Continue</Link>
        </>
      )}
      {status === "error" && (
        <>
          <p className="error" style={{ margin: "12px 0" }}>
            {msg}
          </p>
          <Link href="/careers/register">Create Account</Link>
        </>
      )}
    </div>
  );
}
