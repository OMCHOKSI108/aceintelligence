import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export class ResumeFile extends Model {
  declare id: string;
  declare applicationId: string;
  declare fileName: string;
  declare mimeType: string;
  declare size: number;
  declare file: Buffer;
  declare createdAt: Date;
}

ResumeFile.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    applicationId: {
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
      validate: { max: MAX_FILE_SIZE },
    },
    file: {
      type: DataTypes.BLOB("long"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ResumeFile",
    tableName: "resume_files",
    timestamps: false,
  },
);

export { MAX_FILE_SIZE };
