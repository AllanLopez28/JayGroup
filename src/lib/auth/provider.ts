import { mockAuthProvider } from "@/lib/auth/providers/mock";
import type { AuthProvider } from "@/lib/auth/types";

export function isDemoAuthMode(): boolean {
  const mode = process.env.AUTH_MODE;
  return !mode || mode === "mock";
}

export function getAuthProvider(): AuthProvider {
  const mode = process.env.AUTH_MODE;

  // TODO: require explicit AUTH_MODE in production once the real auth provider is connected.
  if (!mode || mode === "mock") {
    return mockAuthProvider;
  }

  throw new Error(
    `Unsupported AUTH_MODE ("${mode}"). Set AUTH_MODE=mock for demo mode or configure a registered auth provider.`
  );
}
