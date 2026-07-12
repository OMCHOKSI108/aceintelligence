import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

export enum InterviewMode {
  ONLINE = "ONLINE",
  IN_PERSON = "IN_PERSON",
}

export class Interview extends Model {
  declare id: string;
  declare applicationId: string;
  declare scheduledAt: Date;
  declare mode: InterviewMode;
  declare location: string;
  declare interviewerName: string;
  declare notes: string | null;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Interview.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    applicationId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    scheduledAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    mode: {
      type: DataTypes.ENUM(...Object.values(InterviewMode)),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    interviewerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Interview",
    tableName: "interviews",
    timestamps: true,
  },
);
