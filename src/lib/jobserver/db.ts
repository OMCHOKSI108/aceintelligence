import { Sequelize } from "sequelize";
import pg from "pg";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

const globalForSequelize = globalThis as unknown as {
  sequelize: Sequelize | undefined;
};

function createSequelize(): Sequelize {
  return new Sequelize(DATABASE_URL!, {
    dialect: "postgres",
    dialectModule: pg,
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    pool: {
      max: 2,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
}

export const sequelize = globalForSequelize.sequelize ?? createSequelize();

if (process.env.NODE_ENV !== "production") {
  globalForSequelize.sequelize = sequelize;
}

export default sequelize;
