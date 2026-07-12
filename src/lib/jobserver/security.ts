import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import { auditLog, securityLog } from "./logger";

// ── Rate Limiters ──────────────────────────────────────────

/** Login: 5 attempts per 15 min per IP */
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { errors: [{ message: "Too many login attempts. Try again in 15 minutes." }] },
  keyGenerator: (req: any) => ipKeyGenerator(req.ip || req.socket?.remoteAddress || "unknown"),
});

/** Register: 3 accounts per hour per IP */
export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: { errors: [{ message: "Too many registrations. Try again later." }] },
  keyGenerator: (req: any) => ipKeyGenerator(req.ip || req.socket?.remoteAddress || "unknown"),
});

/** Password change: 3 attempts per hour per user */
export const passwordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: { errors: [{ message: "Too many password change attempts. Try again later." }] },
  keyGenerator: (req: any) => ipKeyGenerator(req.ip || req.socket?.remoteAddress || "unknown"),
});

/** General API: 100 requests per minute per IP */
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { errors: [{ message: "Too many requests. Slow down." }] },
  keyGenerator: (req: any) => ipKeyGenerator(req.ip || req.socket?.remoteAddress || "unknown"),
});

// ── Account Lockout ────────────────────────────────────────

interface FailedAttempt {
  count: number;
  firstAttempt: number;
  lockedUntil: number | null;
}

const failedLogins = new Map<string, FailedAttempt>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 30 * 60 * 1000;
const ATTEMPT_WINDOW = 15 * 60 * 1000;

export function isLockedOut(identifier: string): boolean {
  const record = failedLogins.get(identifier);
  if (!record) return false;

  if (record.lockedUntil) {
    if (Date.now() < record.lockedUntil) return true;
    failedLogins.delete(identifier);
    return false;
  }

  if (Date.now() - record.firstAttempt > ATTEMPT_WINDOW) {
    failedLogins.delete(identifier);
    return false;
  }

  return false;
}

export function recordFailedAttempt(identifier: string): { locked: boolean; remaining: number } {
  const now = Date.now();
  let record = failedLogins.get(identifier);

  if (!record || now - record.firstAttempt > ATTEMPT_WINDOW) {
    record = { count: 1, firstAttempt: now, lockedUntil: null };
    failedLogins.set(identifier, record);
    return { locked: false, remaining: MAX_ATTEMPTS - 1 };
  }

  record.count++;

  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_DURATION;
    failedLogins.set(identifier, record);
    securityLog("ACCOUNT_LOCKED", { identifier, attempts: record.count });
    return { locked: true, remaining: 0 };
  }

  failedLogins.set(identifier, record);
  return { locked: false, remaining: MAX_ATTEMPTS - record.count };
}

export function clearFailedAttempts(identifier: string): void {
  failedLogins.delete(identifier);
}

// ── Input Sanitization ─────────────────────────────────────

export function sanitize(input: string): string {
  return input
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .replace(/style\s*=/gi, "")
    .trim();
}

export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (password.length < 8) return { valid: false, error: "Password must be at least 8 characters" };
  if (!/[A-Z]/.test(password))
    return { valid: false, error: "Password must contain an uppercase letter" };
  if (!/[a-z]/.test(password))
    return { valid: false, error: "Password must contain a lowercase letter" };
  if (!/[0-9]/.test(password)) return { valid: false, error: "Password must contain a number" };
  return { valid: true };
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Safe Error Handler ─────────────────────────────────────

export function safeError(err: unknown): string {
  const message = err instanceof Error ? err.message : "Unknown error";

  const blocked = [
    "ECONNREFUSED",
    "ENOTFOUND",
    "SQL",
    "sequelize",
    "database",
    "passwordHash",
    "JWT_SECRET",
    "dotenv",
  ];

  const lower = message.toLowerCase();
  for (const word of blocked) {
    if (lower.includes(word.toLowerCase())) {
      return "An internal error occurred. Please try again later.";
    }
  }

  return message;
}
