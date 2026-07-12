import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

export enum ProfileStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export interface ProfileData {
  name?: string;
  email?: string;
  phone?: string;
  summary?: string;
  skills?: string[];
  experience?: Array<{
    title?: string;
    company?: string;
    duration?: string;
    description?: string;
  }>;
  education?: Array<{
    degree?: string;
    institution?: string;
    year?: string;
  }>;
  certifications?: string[];
  projects?: Array<{
    name?: string;
    description?: string;
    url?: string;
  }>;
  linkedIn?: string;
  github?: string;
}

export class CandidateProfile extends Model {
  declare id: string;
  declare resumeFileId: string | null;
  declare candidateId: string | null;
  declare applicationId: string | null;
  declare uploadedBy: string;
  declare fileName: string;
  declare mimeType: string;
  declare size: number;
  declare rawExtractedText: string | null;
  declare profileData: ProfileData | null;
  declare status: ProfileStatus;
  declare processedAt: Date | null;
  declare errorMessage: string | null;
  declare createdAt: Date;
  declare updatedAt: Date;
}

CandidateProfile.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    resumeFileId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    candidateId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    applicationId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    uploadedBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mimeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rawExtractedText: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    profileData: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(ProfileStatus)),
      defaultValue: ProfileStatus.PENDING,
    },
    processedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    errorMessage: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "CandidateProfile",
    tableName: "candidate_profiles",
    timestamps: true,
  },
);
