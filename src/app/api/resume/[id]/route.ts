import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jobserver/utils/jwt";
import { ResumeFile } from "@/lib/jobserver/models";
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

    const { id } = await params;

    if (!UUID_RE.test(id)) {
      return NextResponse.json({ error: "Invalid file ID" }, { status: 400 });
    }

    const file = await ResumeFile.findByPk(id);
    if (!file) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    return new NextResponse(new Uint8Array(file.file), {
      headers: {
        "Content-Type": file.mimeType,
        "Content-Disposition": `inline; filename="${file.fileName}"`,
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    errorLog("Resume download failed", err);
    return NextResponse.json(
      { error: "Failed to load resume" },
      { status: 500 },
    );
  }
}
