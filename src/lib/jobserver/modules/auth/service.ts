import { User, Role } from "../../models/User";
import { Client } from "../../models/Client";
import { Op } from "sequelize";
import { verifyPassword } from "../../utils/password";
import { signToken } from "../../utils/jwt";
import {
  isLockedOut,
  recordFailedAttempt,
  clearFailedAttempts,
  sanitize,
  validatePassword,
  validateEmail,
  safeError,
} from "../../security";
import { auditLog, securityLog } from "../../logger";

export async function login(loginId: string, password: string) {
  const identifier = loginId.trim().toLowerCase();

  if (isLockedOut(identifier)) {
    securityLog("LOGIN_LOCKED", { identifier });
    throw new Error(
      "Account temporarily locked due to too many failed attempts. Try again in 30 minutes.",
    );
  }

  const isEmail = identifier.includes("@");

  let user: User | null = null;
  let client: Client | null = null;
  let role = "";

  if (isEmail) {
    user = await User.findOne({
      where: {
        email: identifier,
        role: { [Op.in]: [Role.SUPER_ADMIN, Role.ADMIN] },
      },
    });
    if (!user) {
      client = await Client.findOne({
        where: { email: identifier },
      });
      if (client) {
        role = Role.CLIENT;
      } else {
        auditLog("LOGIN_FAIL", { identifier, reason: "email_not_found" });
        throw new Error("Invalid credentials");
      }
    } else {
      role = user.role;
    }
  } else {
    user = await User.findOne({
      where: { loginId },
    });
    if (user) {
      role = user.role;
    } else {
      client = await Client.findOne({
        where: { loginId },
      });
      if (client) {
        role = Role.CLIENT;
      } else {
        auditLog("LOGIN_FAIL", { identifier, reason: "user_not_found" });
        throw new Error("Invalid credentials");
      }
    }
  }

  const passwordHash = user ? user.passwordHash : client!.passwordHash;
  const valid = await verifyPassword(password, passwordHash);
  if (!valid) {
    const result = recordFailedAttempt(identifier);
    auditLog("LOGIN_FAIL", { identifier, reason: "wrong_password", remaining: result.remaining });
    if (result.locked) {
      throw new Error("Account locked due to too many failed attempts. Try again in 30 minutes.");
    }
    throw new Error(`Invalid credentials. ${result.remaining} attempts remaining.`);
  }

  clearFailedAttempts(identifier);

  const userId = user ? user.id : client!.id;
  const loginIdValue = user ? user.loginId : client!.loginId;
  const email = user ? user.email : client!.email;
  const name = user ? user.name : client!.name;

  auditLog("LOGIN_SUCCESS", { userId, role });

  const token = signToken({ userId, role });

  return {
    token,
    user: {
      id: userId,
      loginId: loginIdValue,
      email,
      role,
      name,
    },
  };
}
