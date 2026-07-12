"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { gql } from "@/lib/careers/graphql";

const MUTATION = `mutation($token: String!) {
  candidateVerify(token: $token)
}`;

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setMsg("No verification token found.");
      return;
    }

    gql(MUTATION, { token })
      .then(() => {
        setStatus("done");
        setMsg("Email verified! You can now log in.");
      })
      .catch((err: any) => {
        setStatus("error");
        setMsg(err.message);
      });
  }, []);

  return (
    <div className="login-box">
      <h2>Email Verification</h2>
      {status === "loading" && <p>Verifying...</p>}
      {status === "done" && (
        <>
          <p style={{ margin: "12px 0", color: "#060" }}>{msg}</p>
          <Link href="/careers/candidate/login">Go to Login</Link>
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
