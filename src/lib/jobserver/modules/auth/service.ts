import { User, Role } from "../../models/User";
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

  let user: User | null;

  if (isEmail) {
    user = await User.findOne({
      where: {
        email: identifier,
        role: { [Op.in]: [Role.SUPER_ADMIN, Role.ADMIN] },
      },
    });
    if (!user) {
      auditLog("LOGIN_FAIL", { identifier, reason: "email_not_found" });
      throw new Error("Invalid credentials");
    }
  } else {
    user = await User.findOne({
      where: { loginId },
    });
    if (!user) {
      auditLog("LOGIN_FAIL", { identifier, reason: "user_not_found" });
      throw new Error("Invalid credentials");
    }
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    const result = recordFailedAttempt(identifier);
    auditLog("LOGIN_FAIL", { identifier, reason: "wrong_password", remaining: result.remaining });
    if (result.locked) {
      throw new Error("Account locked due to too many failed attempts. Try again in 30 minutes.");
    }
    throw new Error(`Invalid credentials. ${result.remaining} attempts remaining.`);
  }

  clearFailedAttempts(identifier);
  auditLog("LOGIN_SUCCESS", { userId: user.id, role: user.role });

  const token = signToken({ userId: user.id, role: user.role });

  return {
    token,
    user: {
      id: user.id,
      loginId: user.loginId,
      email: user.email,
      role: user.role,
      name: user.name,
    },
  };
}
