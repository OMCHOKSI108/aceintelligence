import { User, Role } from "../../models/User";
import { sendAdminEmail } from "../../email/send";
import { adminCredentials, adminRemoved } from "../../email/templates";
import { verifyPassword, hashPassword } from "../../utils/password";
import { sanitize, validatePassword, validateEmail } from "../../security";
import { auditLog } from "../../logger";

export async function generateLoginId(): Promise<string> {
  const last = await User.unscoped().findOne({
    where: { role: Role.ADMIN },
    order: [["loginId", "DESC"]],
    attributes: ["loginId"],
  });

  let next = 1;
  if (last) {
    const num = parseInt(last.loginId.replace("ADM-", ""), 10);
    if (!isNaN(num)) next = num + 1;
  }

  return `ADM-${String(next).padStart(4, "0")}`;
}

export async function createAdmin(input: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  bio?: string;
  profilePhoto?: string;
}) {
  const pwCheck = validatePassword(input.password);
  if (!pwCheck.valid) throw new Error(pwCheck.error!);

  if (!validateEmail(input.email)) throw new Error("Invalid email address");

  const name = sanitize(input.name);
  const email = input.email.trim().toLowerCase();
  const phone = input.phone ? sanitize(input.phone) : null;
  const bio = input.bio ? sanitize(input.bio) : null;

  const loginId = await generateLoginId();
  const passwordHash = await hashPassword(input.password);

  const admin = await User.create({
    loginId,
    email,
    passwordHash,
    role: Role.ADMIN,
    name,
    phone,
    bio,
    profilePhoto: input.profilePhoto ?? null,
  });

  auditLog("ADMIN_CREATED", { loginId, email });

  const { subject, html } = adminCredentials(name, loginId, input.password);
  await sendAdminEmail(email, subject, html);

  return admin;
}

export async function listAdmins() {
  return User.findAll({ where: { role: Role.ADMIN }, order: [["createdAt", "DESC"]] });
}

export async function getAdminById(id: string) {
  return User.findOne({ where: { id, role: Role.ADMIN } });
}

export async function updateAdmin(
  id: string,
  input: { name?: string; phone?: string; bio?: string; profilePhoto?: string },
) {
  const user = await User.findOne({ where: { id, role: Role.ADMIN } });
  if (!user) throw new Error("Admin not found");

  const updates: Record<string, unknown> = {};
  if (input.name !== undefined) updates.name = sanitize(input.name);
  if (input.phone !== undefined) updates.phone = input.phone ? sanitize(input.phone) : null;
  if (input.bio !== undefined) updates.bio = input.bio ? sanitize(input.bio) : null;
  if (input.profilePhoto !== undefined) updates.profilePhoto = input.profilePhoto;

  await user.update(updates);
  auditLog("ADMIN_UPDATED", { id, fields: Object.keys(updates) });
  return user;
}

export async function deleteAdmin(id: string) {
  const user = await User.findOne({ where: { id, role: Role.ADMIN } });
  if (!user) throw new Error("Admin not found");

  const { name, loginId, email } = user;

  await user.destroy();

  auditLog("ADMIN_DELETED", { id, loginId, email });

  const { subject, html } = adminRemoved(name, loginId);
  await sendAdminEmail(email, subject, html);

  return true;
}

export async function updateOwnProfile(
  userId: string,
  input: { name?: string; phone?: string; bio?: string; profilePhoto?: string },
) {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");

  const updates: Record<string, unknown> = {};
  if (input.name !== undefined) updates.name = sanitize(input.name);
  if (input.phone !== undefined) updates.phone = input.phone ? sanitize(input.phone) : null;
  if (input.bio !== undefined) updates.bio = input.bio ? sanitize(input.bio) : null;
  if (input.profilePhoto !== undefined) updates.profilePhoto = input.profilePhoto;

  await user.update(updates);
  auditLog("PROFILE_UPDATED", { userId });
  return user;
}

export async function changePassword(userId: string, oldPassword: string, newPassword: string) {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");

  const pwCheck = validatePassword(newPassword);
  if (!pwCheck.valid) throw new Error(pwCheck.error!);

  const valid = await verifyPassword(oldPassword, user.passwordHash);
  if (!valid) {
    auditLog("PASSWORD_CHANGE_FAIL", { userId, reason: "wrong_password" });
    throw new Error("Current password is incorrect");
  }

  const newHash = await hashPassword(newPassword);
  await user.update({ passwordHash: newHash });

  auditLog("PASSWORD_CHANGED", { userId });
  return true;
}
