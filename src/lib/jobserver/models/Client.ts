import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

export enum WorkStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  REVIEW = "REVIEW",
  COMPLETED = "COMPLETED",
  ON_HOLD = "ON_HOLD",
}

export class Client extends Model {
  declare id: string;
  declare loginId: string;
  declare email: string;
  declare passwordHash: string;
  declare name: string;
  declare phone: string | null;
  declare companyName: string | null;
  declare workStatus: WorkStatus;
  declare googleChatLink: string | null;
  declare notes: string | null;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;
}

Client.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    loginId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    workStatus: {
      type: DataTypes.ENUM(...Object.values(WorkStatus)),
      defaultValue: WorkStatus.NOT_STARTED,
      allowNull: false,
    },
    googleChatLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Client",
    tableName: "clients",
    timestamps: true,
    paranoid: true,
  },
);
