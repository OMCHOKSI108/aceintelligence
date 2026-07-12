import winston from "winston";

const isProduction = process.env.NODE_ENV === "production";

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
    return `${timestamp} ${level}: ${message}${metaStr}`;
  }),
);

const jsonFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.json(),
);

const logger = winston.createLogger({
  level: isProduction ? "info" : "debug",
  defaultMeta: { service: "jobserver" },
  transports: [
    new winston.transports.Console({
      format: isProduction ? jsonFormat : consoleFormat,
    }),
  ],
});

// ── Morgan Stream (pipes morgan output into winston) ───────

export const morganStream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

// ── Audit Logger ───────────────────────────────────────────

export function auditLog(event: string, details: Record<string, unknown>): void {
  logger.info("AUDIT", { event, ...details });
}

// ── Security Logger ────────────────────────────────────────

export function securityLog(event: string, details: Record<string, unknown>): void {
  logger.warn("SECURITY", { event, ...details });
}

// ── Error Logger ───────────────────────────────────────────

export function errorLog(message: string, error?: unknown): void {
  if (error instanceof Error) {
    logger.error(message, { error: error.message, stack: error.stack });
  } else {
    logger.error(message, { error: String(error) });
  }
}

export default logger;
