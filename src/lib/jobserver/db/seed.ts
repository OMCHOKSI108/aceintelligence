import sequelize from "../db";
import { User, Role } from "../models/User";
import { Job } from "../models/Job";
import { Application } from "../models/Application";
import { Candidate } from "../models/Candidate";
import { CandidateProfile } from "../models/CandidateProfile";
import { ResumeFile } from "../models/ResumeFile";
import { Interview } from "../models/Interview";
import { hashPassword } from "../utils/password";

export interface SeedResult {
  created: boolean;
  loginId: string;
  message: string;
}

export async function seedSuperAdminIfEmpty(): Promise<SeedResult> {
  await sequelize.authenticate();

  // Sync all models to create tables if they don't exist
  await sequelize.sync();

  const existing = await User.findOne({ where: { role: Role.SUPER_ADMIN } });
  if (existing) {
    return {
      created: false,
      loginId: existing.loginId,
      message: "Super Admin already exists",
    };
  }

  const passwordHash = await hashPassword("OMchoksi@108");

  const admin = await User.create({
    loginId: "SUP-0001",
    email: "omchoksi99@gmail.com",
    passwordHash,
    role: Role.SUPER_ADMIN,
    name: "Om Choksi",
  });

  return {
    created: true,
    loginId: admin.loginId,
    message: "Super Admin seeded successfully",
  };
}
