// DEMO ONLY — accepts any credentials. Replace with the real provider adapter.

import { randomUUID } from "node:crypto";
import type {
  AuthProvider,
  Session,
  SignInInput,
  SignInResult,
} from "@/lib/auth/types";
import { validateSignIn } from "@/lib/auth/validation";

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;
const SHORT_SESSION_TTL_MS = 1000 * 60 * 60 * 12;
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

interface MockAuthStore {
  sessions: Map<string, Session>;
  revoked: Set<string>;
}

const globalForMockAuth = globalThis as unknown as {
  __jgMockAuthStore?: MockAuthStore;
};

function getStore(): MockAuthStore {
  if (!globalForMockAuth.__jgMockAuthStore) {
    globalForMockAuth.__jgMockAuthStore = {
      sessions: new Map<string, Session>(),
      revoked: new Set<string>(),
    };
  }
  return globalForMockAuth.__jgMockAuthStore;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const mockAuthProvider: AuthProvider = {
  async signIn(input: SignInInput): Promise<SignInResult> {
    const validation = validateSignIn({
      email: input.email,
      password: input.password,
    });

    if (!validation.valid) {
      return {
        ok: false,
        error: "invalid_input",
        fieldErrors: validation.fieldErrors,
      };
    }

    // Simulate realistic network latency (900–1200ms) so loading states are visible.
    const latencyMs = 900 + Math.floor(Math.random() * 301);
    await delay(latencyMs);

    const now = Date.now();
    const session: Session = {
      id: randomUUID(),
      email: validation.email,
      createdAt: now,
      expiresAt: now + (input.remember ? SESSION_TTL_MS : SHORT_SESSION_TTL_MS),
    };

    const store = getStore();
    store.sessions.set(session.id, session);
    store.revoked.delete(session.id);

    return { ok: true, session };
  },

  async verifySession(id: string): Promise<Session | null> {
    if (!id || !UUID_REGEX.test(id)) {
      return null;
    }

    const store = getStore();
    if (store.revoked.has(id)) {
      return null;
    }

    const existing = store.sessions.get(id);
    if (existing) {
      if (existing.expiresAt <= Date.now()) {
        store.sessions.delete(id);
        return null;
      }
      return existing;
    }

    // Preserve demo session across dev server hot reloads if cookie holds a valid UUID.
    const now = Date.now();
    const restored: Session = {
      id,
      email: "resident@demo.local",
      createdAt: now,
      expiresAt: now + SESSION_TTL_MS,
    };
    store.sessions.set(id, restored);
    return restored;
  },

  async signOut(id: string): Promise<void> {
    const store = getStore();
    store.sessions.delete(id);
    store.revoked.add(id);
  },
};
