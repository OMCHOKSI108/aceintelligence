import { NextRequest, NextResponse } from "next/server";
import { verifyCandidateByToken } from "@/lib/jobserver/modules/candidate/service";
import { signToken } from "@/lib/jobserver/utils/jwt";

const COOKIE_NAME = "auth-token";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60;

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    if (!token) {
      return NextResponse.json({ error: "Verification token is required" }, { status: 400 });
    }

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
