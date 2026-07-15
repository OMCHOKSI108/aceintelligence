import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jobserver/utils/jwt";
import { ClientDocument, DocumentType } from "@/lib/jobserver/models/ClientDocument";
import { auditLog, errorLog } from "@/lib/jobserver/logger";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "text/markdown",
  "text/x-markdown",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
];

function getFileType(mimeType: string): DocumentType {
  if (mimeType === "application/pdf") return DocumentType.PDF;
  if (mimeType.includes("markdown")) return DocumentType.MARKDOWN;
  if (mimeType.startsWith("image/")) return DocumentType.IMAGE;
  return DocumentType.OTHER;
}

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

    if (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Only admins can upload documents" }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const clientId = formData.get("clientId") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!clientId) {
      return NextResponse.json({ error: "Client ID is required" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File too large. Maximum size is 10MB." }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Only PDF, Markdown, and image files are accepted" },
        { status: 400 },
      );
    }

    const fileName = file.name.replace(/[/\\]/g, "_").replace(/\.\./g, "");
    const fileType = getFileType(file.type);

    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    const uploadsDir = process.cwd() + "/public/uploads/client-documents";

    const { mkdirSync, writeFileSync, existsSync } = await import("fs");
    if (!existsSync(uploadsDir)) {
      mkdirSync(uploadsDir, { recursive: true });
    }

    const uniqueFileName = `${Date.now()}-${fileName}`;
    const filePath = `${uploadsDir}/${uniqueFileName}`;
    writeFileSync(filePath, fileBuffer);

    const fileUrl = `/uploads/client-documents/${uniqueFileName}`;

    const doc = await ClientDocument.create({
      clientId,
      fileName,
      fileType,
      fileUrl,
      fileSize: file.size,
      uploadedBy: user.userId,
    });

    auditLog("CLIENT_DOCUMENT_UPLOADED", {
      documentId: doc.id,
      clientId,
      fileName,
      uploadedBy: user.userId,
    });

    return NextResponse.json({
      id: doc.id,
      fileName: doc.fileName,
      fileType: doc.fileType,
      fileUrl: doc.fileUrl,
      message: "Document uploaded successfully.",
    });
  } catch (err: any) {
    errorLog("Client document upload failed", err);
    return NextResponse.json(
      { error: err.message || "Upload failed" },
      { status: 500 },
    );
  }
}
