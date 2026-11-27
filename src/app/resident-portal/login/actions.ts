"use server";

import { redirect } from "next/navigation";
import { getAuthProvider } from "@/lib/auth/provider";
import {
  clearSession,
  createSession,
  getSessionId,
} from "@/lib/auth/session";
import type { SignInActionState } from "@/lib/auth/types";
import { validateSignIn } from "@/lib/auth/validation";

const DEFAULT_DASHBOARD_PATH = "/resident-portal/dashboard";
const INVALID_CREDENTIALS_MESSAGE = "Email or password is incorrect.";
const UNAVAILABLE_MESSAGE =
  "We couldn't sign you in right now. Please try again.";

function sanitizeNextPath(raw: FormDataEntryValue | null): string {
  if (typeof raw !== "string") {
    return DEFAULT_DASHBOARD_PATH;
  }

  const trimmed = raw.trim();
  if (
    !trimmed.startsWith(DEFAULT_DASHBOARD_PATH) ||
    trimmed.startsWith("//") ||
    trimmed.includes("//") ||
    trimmed.includes("\\") ||
    /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)
  ) {
    return DEFAULT_DASHBOARD_PATH;
  }

  return trimmed;
}

export async function signInAction(
  prevState: SignInActionState,
  formData: FormData
): Promise<SignInActionState> {
  const nextSeq = prevState.status === "error" ? prevState.seq + 1 : 1;

  const emailRaw = formData.get("email");
  const passwordRaw = formData.get("password");
  const remember = formData.get("remember") === "on";
  const nextRaw = formData.get("next");

  const validation = validateSignIn({
    email: typeof emailRaw === "string" ? emailRaw : "",
    password: typeof passwordRaw === "string" ? passwordRaw : "",
  });

  if (!validation.valid) {
    return {
      status: "error",
      fieldErrors: validation.fieldErrors,
      seq: nextSeq,
    };
  }

  // TODO: rate limiting

  try {
    const provider = getAuthProvider();
    const result = await provider.signIn({
      email: validation.email,
      password: validation.password,
      remember,
    });

    if (!result.ok) {
      // TODO: audit log (failed sign-in attempt, without logging password)
      if (result.error === "invalid_input" && result.fieldErrors) {
        return {
          status: "error",
          fieldErrors: result.fieldErrors,
          seq: nextSeq,
        };
      }

      if (result.error === "invalid_credentials") {
        return {
          status: "error",
          message: INVALID_CREDENTIALS_MESSAGE,
          seq: nextSeq,
        };
      }

      return {
        status: "error",
        message: UNAVAILABLE_MESSAGE,
        seq: nextSeq,
      };
    }

    await createSession(result.session, remember);

    // TODO: audit log (successful sign-in)

    return {
      status: "success",
      redirectTo: sanitizeNextPath(nextRaw),
    };
  } catch {
    return {
      status: "error",
      message: UNAVAILABLE_MESSAGE,
      seq: nextSeq,
    };
  }
}

export async function signOutAction(): Promise<void> {
  const id = await getSessionId();
  if (id) {
    try {
      const provider = getAuthProvider();
      await provider.signOut(id);
    } catch {
      // Proceed to clear local cookie even if provider sign-out fails.
    }
  }

  await clearSession();
  redirect("/resident-portal/login");
}
