import type { SignInFieldErrors } from "@/lib/auth/types";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const EMAIL_MAX_LENGTH = 254;
export const PASSWORD_MAX_LENGTH = 256;

export const EMAIL_ERROR_MESSAGE = "Enter a valid email address.";
export const PASSWORD_ERROR_MESSAGE = "Enter your password.";

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function isValidEmail(value: string): boolean {
  const normalized = normalizeEmail(value);
  return (
    normalized.length > 0 &&
    normalized.length <= EMAIL_MAX_LENGTH &&
    EMAIL_REGEX.test(normalized)
  );
}

export function isValidPassword(value: string): boolean {
  return value.length > 0 && value.length <= PASSWORD_MAX_LENGTH;
}

export interface SignInValidationResult {
  valid: boolean;
  email: string;
  password: string;
  fieldErrors: SignInFieldErrors;
}

export function validateSignIn(input: {
  email: string;
  password: string;
}): SignInValidationResult {
  const email = normalizeEmail(input.email);
  const password = input.password;
  const fieldErrors: SignInFieldErrors = {};

  if (!isValidEmail(email)) {
    fieldErrors.email = EMAIL_ERROR_MESSAGE;
  }

  if (!isValidPassword(password)) {
    fieldErrors.password = PASSWORD_ERROR_MESSAGE;
  }

  return {
    valid: Object.keys(fieldErrors).length === 0,
    email,
    password,
    fieldErrors,
  };
}
