import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "auth-token";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60;

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    if (!token) {
      return NextResponse.json({ error: "Verification token is required" }, { status: 400 });
    }

    const [{ verifyCandidateByToken }, { signToken }] = await Promise.all([
      import("@/lib/jobserver/modules/candidate/service"),
      import("@/lib/jobserver/utils/jwt"),
    ]);
    const candidate = await verifyCandidateByToken(token);
    const authToken = signToken({ userId: candidate.id, role: "CANDIDATE" });
    const user = {
      id: candidate.id,
      loginId: candidate.email,
      email: candidate.email,
      role: "CANDIDATE" as const,
      name: candidate.name,
      phone: candidate.phone,
    };

    const res = NextResponse.json({ user });
    res.cookies.set(COOKIE_NAME, authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });
    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
