import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

export class Candidate extends Model {
  declare id: string;
  declare email: string;
  declare passwordHash: string;
  declare name: string;
  declare phone: string | null;
  declare verified: boolean;
  declare verifyToken: string | null;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Candidate.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verifyToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Candidate",
    tableName: "candidates",
    timestamps: true,
  },
);
