import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jobserver/utils/jwt";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value;
  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const payload = verifyToken(token);
    return NextResponse.json({
      user: {
        id: payload.userId,
        role: payload.role,
      },
    });
  } catch {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
