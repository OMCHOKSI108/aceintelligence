import mammoth from "mammoth";
import { CandidateProfile, ProfileStatus, type ProfileData } from "../../models/CandidateProfile";
import { ResumeFile } from "../../models/ResumeFile";
import { parseResume } from "./parser";
import { auditLog, errorLog } from "../../logger";
import logger from "../../logger";

// ── Text Extraction ────────────────────────────────────────

async function extractFromPdf(buffer: Buffer): Promise<string> {
  const { PDFParse } = await import("pdf-parse");
  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText();
  await parser.destroy();
  return result.text;
}

async function extractFromDocx(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

async function extractFromImage(buffer: Buffer, mimeType: string): Promise<string> {
  const Tesseract = await import("tesseract.js");
  const lang = "eng";
  const result = await Tesseract.recognize(buffer, lang);
  return result.data.text;
}

async function extractText(buffer: Buffer, mimeType: string): Promise<string> {
  switch (mimeType) {
    case "application/pdf":
      return extractFromPdf(buffer);
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return extractFromDocx(buffer);
    case "image/jpeg":
    case "image/jpg":
    case "image/png":
      return extractFromImage(buffer, mimeType);
    default:
      throw new Error(`Unsupported file type: ${mimeType}`);
  }
}

// ── Processing Pipeline ────────────────────────────────────

export async function processResume(profileId: string): Promise<void> {
  const profile = await CandidateProfile.findByPk(profileId);
  if (!profile) throw new Error("Profile not found");

  try {
    await profile.update({ status: ProfileStatus.PROCESSING });
    logger.info("RESUME_PROCESSING_START", { profileId, fileName: profile.fileName });

    // Get the file buffer from ResumeFile if linked
    let buffer: Buffer;
    if (profile.resumeFileId) {
      const resumeFile = await ResumeFile.findByPk(profile.resumeFileId);
      if (!resumeFile) throw new Error("Resume file not found");
      buffer = resumeFile.file;
    } else {
      throw new Error("No resume file linked to this profile");
    }

    // Extract text
    const rawText = await extractText(buffer, profile.mimeType);
    if (!rawText || rawText.trim().length < 10) {
      throw new Error("Could not extract meaningful text from the resume");
    }

    // Parse structured data
    const profileData: ProfileData = parseResume(rawText);

    // Update profile with results
    await profile.update({
      rawExtractedText: rawText,
      profileData,
      status: ProfileStatus.COMPLETED,
      processedAt: new Date(),
    });

    auditLog("RESUME_PROCESSED", { profileId, fileName: profile.fileName });
    logger.info("RESUME_PROCESSING_COMPLETE", {
      profileId,
      name: profileData.name,
      skills: profileData.skills?.length || 0,
    });
  } catch (err: any) {
    errorLog("Resume processing failed", err);
    await profile.update({
      status: ProfileStatus.FAILED,
      errorMessage: err.message || "Processing failed",
      processedAt: new Date(),
    });
  }
}

// ── Create Profile from Upload ─────────────────────────────

export async function createProfileFromUpload(opts: {
  fileName: string;
  mimeType: string;
  size: number;
  fileBuffer: Buffer;
  uploadedBy: string;
  candidateId?: string;
  applicationId?: string;
}): Promise<CandidateProfile> {
  // Store the file
  const resumeFile = await ResumeFile.create({
    applicationId: opts.applicationId || "00000000-0000-0000-0000-000000000000",
    fileName: opts.fileName,
    mimeType: opts.mimeType,
    size: opts.size,
    file: opts.fileBuffer,
  });

  // Create profile record
  const profile = await CandidateProfile.create({
    resumeFileId: resumeFile.id,
    candidateId: opts.candidateId || null,
    applicationId: opts.applicationId || null,
    uploadedBy: opts.uploadedBy,
    fileName: opts.fileName,
    mimeType: opts.mimeType,
    size: opts.size,
    status: ProfileStatus.PENDING,
  });

  // Kick off async processing (fire and forget)
  processResume(profile.id).catch((err) => {
    errorLog("Background resume processing failed", err);
  });

  return profile;
}

// ── GraphQL Resolvers ──────────────────────────────────────

export async function getProfile(id: string) {
  return CandidateProfile.findByPk(id);
}

export async function listProfiles(opts: {
  search?: string;
  status?: ProfileStatus;
  skills?: string;
  limit?: number;
  offset?: number;
}) {
  const where: any = {};
  if (opts.status) where.status = opts.status;

  const profiles = await CandidateProfile.findAll({
    where,
    order: [["createdAt", "DESC"]],
    limit: opts.limit || 50,
    offset: opts.offset || 0,
  });

  let filtered = profiles;

  // Post-query filtering for JSONB skills search and text search
  if (opts.skills || opts.search) {
    const searchLower = opts.search?.toLowerCase();
    const skillsFilter = opts.skills
      ?.toLowerCase()
      .split(",")
      .map((s) => s.trim());

    filtered = profiles.filter((p) => {
      const data = p.profileData as ProfileData | null;
      if (!data) return false;

      if (skillsFilter && skillsFilter.length > 0) {
        const profileSkills = (data.skills || []).map((s) => s.toLowerCase());
        const hasAll = skillsFilter.every((sf) => profileSkills.some((ps) => ps.includes(sf)));
        if (!hasAll) return false;
      }

      if (searchLower) {
        const searchable = [
          data.name,
          data.email,
          data.summary,
          ...(data.skills || []),
          ...(data.experience || []).map((e) => `${e.title} ${e.company}`),
          ...(data.education || []).map((e) => `${e.degree} ${e.institution}`),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!searchable.includes(searchLower)) return false;
      }

      return true;
    });
  }

  return filtered;
}

export async function getProfileStats() {
  const total = await CandidateProfile.count();
  const completed = await CandidateProfile.count({ where: { status: ProfileStatus.COMPLETED } });
  const processing = await CandidateProfile.count({ where: { status: ProfileStatus.PROCESSING } });
  const pending = await CandidateProfile.count({ where: { status: ProfileStatus.PENDING } });
  const failed = await CandidateProfile.count({ where: { status: ProfileStatus.FAILED } });

  return { total, completed, processing, pending, failed };
}

export async function deleteProfile(id: string) {
  const profile = await CandidateProfile.findByPk(id);
  if (!profile) throw new Error("Profile not found");

  // Delete the linked resume file
  if (profile.resumeFileId) {
    await ResumeFile.destroy({ where: { id: profile.resumeFileId } });
  }

  await profile.destroy();
  return true;
}

export async function reprocessProfile(id: string) {
  const profile = await CandidateProfile.findByPk(id);
  if (!profile) throw new Error("Profile not found");
  if (!profile.resumeFileId) throw new Error("No resume file linked");

  await profile.update({
    status: ProfileStatus.PENDING,
    errorMessage: null,
    rawExtractedText: null,
    profileData: null,
    processedAt: null,
  });

  processResume(profile.id).catch((err) => {
    errorLog("Background resume reprocessing failed", err);
  });

  return profile;
}
