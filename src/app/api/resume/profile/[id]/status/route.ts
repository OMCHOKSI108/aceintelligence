import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jobserver/utils/jwt";
import { CandidateProfile } from "@/lib/jobserver/models";
import { errorLog } from "@/lib/jobserver/logger";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authHeader = _request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    try {
      verifyToken(authHeader.slice(7));
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { id } = await params;

    if (!UUID_RE.test(id)) {
      return NextResponse.json({ error: "Invalid profile ID" }, { status: 400 });
    }

    const profile = await CandidateProfile.findByPk(id);
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: profile.id,
      status: profile.status,
      processedAt: profile.processedAt,
      errorMessage: profile.errorMessage,
    });
  } catch (err) {
    errorLog("Profile status check failed", err);
    return NextResponse.json(
      { error: "Failed to check status" },
      { status: 500 },
    );
  }
}
