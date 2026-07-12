import sequelize from "../db";
import { User, Role } from "../models/User";
import { hashPassword } from "../utils/password";

export interface SeedResult {
  created: boolean;
  loginId: string;
  message: string;
}

export async function seedSuperAdminIfEmpty(): Promise<SeedResult> {
  await sequelize.authenticate();

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
