import { cookies } from "next/headers";
import { getAuthProvider } from "@/lib/auth/provider";
import type { Session } from "@/lib/auth/types";

export const SESSION_COOKIE_NAME = "jg_session";
const REMEMBER_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
const COOKIE_PATH = "/resident-portal";

export async function createSession(
  session: Session,
  remember: boolean
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, session.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: COOKIE_PATH,
    ...(remember ? { maxAge: REMEMBER_MAX_AGE_SECONDS } : {}),
  });
}

export async function getSessionId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value ?? null;
}

export async function getSession(): Promise<Session | null> {
  const id = await getSessionId();
  if (!id) {
    return null;
  }

  const provider = getAuthProvider();
  return provider.verifySession(id);
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete({
    name: SESSION_COOKIE_NAME,
    path: COOKIE_PATH,
  });
}
