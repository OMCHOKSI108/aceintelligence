import crypto from "crypto";
import { Candidate } from "../../models/Candidate";
import { hashPassword, verifyPassword } from "../../utils/password";
import { signToken } from "../../utils/jwt";
import { sendEmail } from "../../email/send";
import { emailVerification } from "../../email/templates";
import {
  sanitize,
  validatePassword,
  validateEmail,
  isLockedOut,
  recordFailedAttempt,
  clearFailedAttempts,
} from "../../security";
import { auditLog, securityLog } from "../../logger";

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

export async function candidateRegister(input: {
  email: string;
  password: string;
  name: string;
  phone?: string;
  returnTo?: string;
}) {
  const pwCheck = validatePassword(input.password);
  if (!pwCheck.valid) throw new Error(pwCheck.error!);

  if (!validateEmail(input.email)) throw new Error("Invalid email address");

  const email = input.email.trim().toLowerCase();
  const name = sanitize(input.name);
  const phone = input.phone ? sanitize(input.phone) : null;

  const existing = await Candidate.findOne({ where: { email } });
  if (existing) {
    auditLog("REGISTER_DUPLICATE", { email });
    throw new Error("An account with this email already exists");
  }

  const passwordHash = await hashPassword(input.password);
  const verifyToken = crypto.randomBytes(32).toString("hex");
  const candidate = await Candidate.create({
    email,
    passwordHash,
    name,
    phone,
    verified: false,
    verifyToken,
  });

  auditLog("CANDIDATE_REGISTERED", { email });

  const returnTo = input.returnTo || "/careers/profile";
  const params = new URLSearchParams({ token: verifyToken, returnTo });
  const verifyLink = `${CLIENT_URL}/careers/verify?${params.toString()}`;
  const { subject, html } = emailVerification(name, verifyLink);
  await sendEmail(email, subject, html);

  return candidate;
}

export async function verifyCandidateByToken(token: string) {
  if (!/^[0-9a-f]{64}$/i.test(token)) {
    throw new Error("Invalid or expired verification link");
  }

  const candidate = await Candidate.findOne({ where: { verifyToken: token } });
  if (!candidate) {
    auditLog("VERIFY_FAIL", { token: token.substring(0, 8) + "..." });
    throw new Error("Invalid or expired verification link");
  }

  candidate.verified = true;
  candidate.verifyToken = null;
  await candidate.save();

  auditLog("CANDIDATE_VERIFIED", { email: candidate.email });
  return candidate;
}

export async function candidateVerify(token: string) {
  await verifyCandidateByToken(token);
  return true;
}

export async function candidateLogin(email: string, password: string) {
  const identifier = email.trim().toLowerCase();

  if (isLockedOut(identifier)) {
    securityLog("CANDIDATE_LOGIN_LOCKED", { identifier });
    throw new Error("Account temporarily locked due to too many failed attempts.");
  }

  const candidate = await Candidate.findOne({ where: { email: identifier } });
  if (!candidate) {
    auditLog("CANDIDATE_LOGIN_FAIL", { identifier, reason: "not_found" });
    throw new Error("Invalid email or password");
  }
  if (!candidate.verified) throw new Error("Please verify your email first");

  const valid = await verifyPassword(password, candidate.passwordHash);
  if (!valid) {
    const result = recordFailedAttempt(identifier);
    auditLog("CANDIDATE_LOGIN_FAIL", {
      identifier,
      reason: "wrong_password",
      remaining: result.remaining,
    });
    if (result.locked) {
      throw new Error("Account locked due to too many failed attempts.");
    }
    throw new Error("Invalid email or password");
  }

  clearFailedAttempts(identifier);
  auditLog("CANDIDATE_LOGIN_SUCCESS", { email: identifier });

  const token = signToken({ userId: candidate.id, role: "CANDIDATE" });
  return { token, candidate };
}
