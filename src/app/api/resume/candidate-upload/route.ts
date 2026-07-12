import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jobserver/utils/jwt";
import { createProfileFromUpload } from "@/lib/jobserver/modules/resume-processor/service";
import { auditLog, errorLog } from "@/lib/jobserver/logger";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/jpg",
  "image/png",
];

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    let user: { userId: string; role: string };
    try {
      user = verifyToken(authHeader.slice(7));
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (user.role !== "CANDIDATE") {
      return NextResponse.json(
        { error: "Only candidates can use this endpoint" },
        { status: 403 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("resume") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File too large. Maximum size is 5MB." }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Only PDF, DOCX, JPG, and PNG files are accepted" },
        { status: 400 },
      );
    }

    const fileName = file.name.replace(/[/\\]/g, "_").replace(/\.\./g, "");

    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    const profile = await createProfileFromUpload({
      fileName,
      mimeType: file.type,
      size: file.size,
      fileBuffer,
      uploadedBy: user.userId,
      candidateId: user.userId,
    });

    auditLog("CANDIDATE_RESUME_UPLOADED", {
      profileId: profile.id,
      fileName,
      candidateId: user.userId,
    });

    return NextResponse.json({
      id: profile.id,
      status: profile.status,
      fileName: profile.fileName,
      message: "Resume uploaded. Processing will begin shortly.",
    });
  } catch (err: any) {
    errorLog("Candidate resume upload failed", err);
    return NextResponse.json(
      { error: err.message || "Upload failed" },
      { status: 500 },
    );
  }
}
