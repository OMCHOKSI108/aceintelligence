import { verifyToken } from "./utils/jwt";
import { sequelize } from "./db";

export interface Context {
  user?: { userId: string; role: string };
  req: { headers: Record<string, string | undefined> };
}

function parseCookies(header: string | undefined): Record<string, string> {
  if (!header) return {};
  const out: Record<string, string> = {};
  for (const pair of header.split(";")) {
    const [key, ...rest] = pair.split("=");
    if (key) out[key.trim()] = rest.join("=").trim();
  }
  return out;
}

export async function createContext(
  req: { headers: Record<string, string | undefined> },
): Promise<Context> {
  const auth = req.headers.authorization;
  if (auth?.startsWith("Bearer ")) {
    try {
      const payload = verifyToken(auth.slice(7));
      return { req, user: payload };
    } catch {
      // invalid token — proceed without user
    }
  }

  const cookies = parseCookies(req.headers.cookie);
  const token = cookies["auth-token"];
  if (token) {
    try {
      const payload = verifyToken(token);
      return { req, user: payload };
    } catch {
      // invalid cookie token — proceed without user
    }
  }

  return { req };
}

export { sequelize };
