import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jobserver/utils/jwt";
import { Candidate } from "@/lib/jobserver/models/Candidate";
import { User } from "@/lib/jobserver/models/User";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value;
  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const payload = verifyToken(token);
    if (payload.role === "CANDIDATE") {
      const candidate = await Candidate.findByPk(payload.userId);
      if (!candidate) return NextResponse.json({ user: null }, { status: 401 });
      return NextResponse.json({
        user: {
          id: candidate.id,
          loginId: candidate.email,
          email: candidate.email,
          role: "CANDIDATE",
          name: candidate.name,
          phone: candidate.phone,
        },
      });
    }

    const user = await User.findByPk(payload.userId);
    if (!user) return NextResponse.json({ user: null }, { status: 401 });

    return NextResponse.json({
      user: {
        id: user.id,
        loginId: user.loginId,
        email: user.email,
        role: user.role,
        name: user.name,
        phone: user.phone,
        bio: user.bio,
        profilePhoto: user.profilePhoto,
      },
    });
  } catch {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
