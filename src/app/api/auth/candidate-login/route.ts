import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "auth-token";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60;

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "email and password are required" }, { status: 400 });
    }

    const { candidateLogin } = await import("@/lib/jobserver/modules/candidate/service");
    const result = await candidateLogin(email, password);

    const user = {
      id: result.candidate.id,
      loginId: result.candidate.email,
      email: result.candidate.email,
      role: "CANDIDATE" as const,
      name: result.candidate.name,
      phone: result.candidate.phone,
    };

    const res = NextResponse.json({ user });
    res.cookies.set(COOKIE_NAME, result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });
    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
