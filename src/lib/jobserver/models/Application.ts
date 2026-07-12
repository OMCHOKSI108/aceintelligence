import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

export enum ApplicationStage {
  RECRUITER_PHASE = "RECRUITER_PHASE",
  ON_HOLD = "ON_HOLD",
  SHORTLISTED = "SHORTLISTED",
  REJECTED = "REJECTED",
  SELECTED = "SELECTED",
}

export class Application extends Model {
  declare id: string;
  declare name: string;
  declare email: string;
  declare phone: string;
  declare jobId: string;
  declare stage: ApplicationStage;
  declare appliedAt: Date;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Application.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    stage: {
      type: DataTypes.ENUM(...Object.values(ApplicationStage)),
      defaultValue: ApplicationStage.RECRUITER_PHASE,
    },
    appliedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Application",
    tableName: "applications",
    timestamps: true,
  },
);
