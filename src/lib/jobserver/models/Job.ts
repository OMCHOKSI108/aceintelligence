import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

export enum JobStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  CLOSED = "closed",
  EXPIRED = "expired",
}

export enum EmploymentType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CONTRACT = "CONTRACT",
  INTERNSHIP = "INTERNSHIP",
  TEMPORARY = "TEMPORARY",
}

export class Job extends Model {
  declare id: string;
  declare jobId: string;
  declare title: string;
  declare description: string;
  declare hiringOrganization: string;
  declare location: string;
  declare remote: boolean;
  declare datePosted: Date;
  declare baseSalary: number | null;
  declare employmentType: EmploymentType;
  declare validThrough: Date | null;
  declare jobBenefits: string | null;
  declare experienceRequired: string | null;
  declare educationRequired: string | null;
  declare skills: string | null;
  declare status: JobStatus;
  declare createdBy: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Job.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    jobId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    hiringOrganization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    remote: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    datePosted: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    baseSalary: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    employmentType: {
      type: DataTypes.ENUM(...Object.values(EmploymentType)),
      allowNull: false,
    },
    validThrough: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    jobBenefits: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    experienceRequired: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    educationRequired: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    skills: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(JobStatus)),
      defaultValue: JobStatus.DRAFT,
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Job",
    tableName: "jobs",
    timestamps: true,
  },
);
