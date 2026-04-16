import { cookies } from "next/headers";
import type { SessionUser } from "./types";

const COOKIE_NAME = "jobtap-session";

const DEMO_CREDENTIALS = {
  email: "admin@jobtap.com",
  password: "admin123",
  user: {
    id: "usr_admin_001",
    email: "admin@jobtap.com",
    name: "Admin User",
    role: "admin",
  } satisfies SessionUser,
};

// In-memory session store (demo purposes only)
const sessions = new Map<string, SessionUser>();

export function validateCredentials(
  email: string,
  password: string
): SessionUser | null {
  if (
    email === DEMO_CREDENTIALS.email &&
    password === DEMO_CREDENTIALS.password
  ) {
    return DEMO_CREDENTIALS.user;
  }
  return null;
}

export async function createSession(user: SessionUser): Promise<string> {
  const token = crypto.randomUUID();
  sessions.set(token, user);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return token;
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return null;
  return sessions.get(token) ?? null;
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (token) {
    sessions.delete(token);
  }

  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
