import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

export enum DocumentType {
  PDF = "PDF",
  MARKDOWN = "MARKDOWN",
  IMAGE = "IMAGE",
  OTHER = "OTHER",
}

export class ClientDocument extends Model {
  declare id: string;
  declare clientId: string;
  declare fileName: string;
  declare fileType: DocumentType;
  declare fileUrl: string;
  declare fileSize: number;
  declare uploadedBy: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

ClientDocument.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "clients",
        key: "id",
      },
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileType: {
      type: DataTypes.ENUM(...Object.values(DocumentType)),
      allowNull: false,
    },
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    uploadedBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ClientDocument",
    tableName: "client_documents",
    timestamps: true,
  },
);
