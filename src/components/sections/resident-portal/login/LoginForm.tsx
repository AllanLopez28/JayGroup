"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useId, useRef, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import { signInAction } from "@/app/resident-portal/login/actions";
import { PortalIcon } from "@/components/sections/resident-portal/dashboard/PortalIcon";
import { PasswordField } from "@/components/sections/resident-portal/login/PasswordField";
import { RouteVeil } from "@/components/sections/resident-portal/login/RouteVeil";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { SignInActionState, SignInFieldErrors } from "@/lib/auth/types";
import {
  isValidEmail,
  isValidPassword,
  validateSignIn,
} from "@/lib/auth/validation";

export interface LoginFormProps {
  nextPath?: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  showPasswordLabel: string;
  hidePasswordLabel: string;
  capsLockWarning: string;
  rememberLabel: string;
  forgotPassword: {
    label: string;
    href?: string;
  };
  unavailableTooltip: string;
  submitIdleLabel: string;
  submitBusyLabel: string;
  submitSuccessLabel: string;
}

const INITIAL_STATE: SignInActionState = { status: "idle" };

export function LoginForm({
  nextPath,
  emailLabel,
  emailPlaceholder,
  passwordLabel,
  passwordPlaceholder,
  showPasswordLabel,
  hidePasswordLabel,
  capsLockWarning,
  rememberLabel,
  forgotPassword,
  unavailableTooltip,
  submitIdleLabel,
  submitBusyLabel,
  submitSuccessLabel,
}: LoginFormProps) {
  const router = useRouter();
  const prefersReducedMotion = usePrefersReducedMotion();

  const emailId = useId();
  const emailErrorId = useId();
  const formRef = useRef<HTMLFormElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [state, formAction, isPending] = useActionState(
    signInAction,
    INITIAL_STATE
  );
  const [clientErrors, setClientErrors] = useState<SignInFieldErrors>({});
  const [dismissedServerErrors, setDismissedServerErrors] = useState<{
    email?: boolean;
    password?: boolean;
  }>({});
  const [veilActive, setVeilActive] = useState(false);

  const triggerShake = () => {
    const formEl = formRef.current;
    if (!formEl || prefersReducedMotion) {
      return;
    }
    formEl.classList.remove("login-form-shake");
    void formEl.offsetWidth;
    formEl.classList.add("login-form-shake");
  };

  // Trigger shake on server error responses
  useEffect(() => {
    if (state.status !== "error") {
      return;
    }
    const formEl = formRef.current;
    if (!formEl || prefersReducedMotion) {
      return;
    }
    formEl.classList.remove("login-form-shake");
    void formEl.offsetWidth;
    formEl.classList.add("login-form-shake");
  }, [state, prefersReducedMotion]);

  // Handle success sequence: Welcome back (700ms) -> RouteVeil (650ms) -> router.replace
  useEffect(() => {
    if (state.status !== "success") {
      return;
    }

    if (prefersReducedMotion) {
      router.replace(state.redirectTo);
      return;
    }

    let navTimer: number | null = null;
    const veilTimer = window.setTimeout(() => {
      setVeilActive(true);
      navTimer = window.setTimeout(() => {
        router.replace(state.redirectTo);
      }, 650);
    }, 700);

    return () => {
      window.clearTimeout(veilTimer);
      if (navTimer !== null) {
        window.clearTimeout(navTimer);
      }
    };
  }, [state, prefersReducedMotion, router]);

  const serverFieldErrors =
    state.status === "error" ? state.fieldErrors : undefined;

  const emailError =
    clientErrors.email ??
    (!dismissedServerErrors.email ? serverFieldErrors?.email : undefined);
  const passwordError =
    clientErrors.password ??
    (!dismissedServerErrors.password ? serverFieldErrors?.password : undefined);

  const serverAlertMessage =
    state.status === "error" && state.message ? state.message : undefined;

  const isSuccess = state.status === "success";
  const isLocked = isPending || isSuccess;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const emailValue = emailRef.current?.value ?? "";
    const passwordValue = passwordRef.current?.value ?? "";

    const result = validateSignIn({
      email: emailValue,
      password: passwordValue,
    });

    if (!result.valid) {
      event.preventDefault();
      setClientErrors(result.fieldErrors);
      setDismissedServerErrors({});
      triggerShake();
      if (result.fieldErrors.email) {
        emailRef.current?.focus();
      } else if (result.fieldErrors.password) {
        passwordRef.current?.focus();
      }
      return;
    }

    setClientErrors({});
    setDismissedServerErrors({});
  };

  const handleEmailInput = (event: FormEvent<HTMLInputElement>) => {
    if (emailError && isValidEmail(event.currentTarget.value)) {
      setClientErrors((prev) => ({ ...prev, email: undefined }));
      setDismissedServerErrors((prev) => ({ ...prev, email: true }));
    }
  };

  const handlePasswordInput = (value: string) => {
    if (passwordError && isValidPassword(value)) {
      setClientErrors((prev) => ({ ...prev, password: undefined }));
      setDismissedServerErrors((prev) => ({ ...prev, password: true }));
    }
  };

  const buttonLabel = isSuccess
    ? submitSuccessLabel
    : isPending
      ? submitBusyLabel
      : submitIdleLabel;

  return (
    <>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={handleSubmit}
        noValidate
        style={{ "--i": 3 } as CSSProperties}
        className="login-st mt-8 flex flex-col gap-[18px]"
      >
        {nextPath && <input type="hidden" name="next" value={nextPath} />}

        <div
          className={`flex flex-col gap-2${emailError ? " login-field-bad" : ""}`}
        >
          <label
            htmlFor={emailId}
            className="text-xs uppercase tracking-[0.12em] text-portal-slate"
          >
            {emailLabel}
          </label>
          <div className="relative">
            <input
              ref={emailRef}
              id={emailId}
              name="email"
              type="email"
              autoComplete="username"
              inputMode="email"
              autoCapitalize="none"
              placeholder={emailPlaceholder}
              readOnly={isLocked}
              aria-invalid={Boolean(emailError)}
              aria-describedby={emailError ? emailErrorId : undefined}
              onInput={handleEmailInput}
              className="login-input"
            />
            <span aria-hidden="true" className="login-focus-line" />
          </div>
          {emailError && (
            <div
              id={emailErrorId}
              role="alert"
              className="login-err-msg text-[13px] text-danger"
            >
              {emailError}
            </div>
          )}
        </div>

        <PasswordField
          inputRef={passwordRef}
          label={passwordLabel}
          placeholder={passwordPlaceholder}
          showPasswordLabel={showPasswordLabel}
          hidePasswordLabel={hidePasswordLabel}
          capsLockWarning={capsLockWarning}
          error={passwordError}
          readOnly={isLocked}
          onInputChange={handlePasswordInput}
        />

        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <label className="flex min-h-[44px] cursor-pointer items-center gap-2.5 text-sm text-portal-slate">
            <input
              type="checkbox"
              name="remember"
              defaultChecked
              className="h-[18px] w-[18px] accent-navy"
            />
            <span>{rememberLabel}</span>
          </label>

          {forgotPassword.href ? (
            <Link
              href={forgotPassword.href}
              className="login-forgot py-3 text-sm font-semibold text-navy no-underline"
            >
              {forgotPassword.label}
            </Link>
          ) : (
            <span
              aria-disabled="true"
              title={unavailableTooltip}
              className="login-forgot cursor-not-allowed py-3 text-sm font-semibold text-navy opacity-75"
            >
              {forgotPassword.label}
            </span>
          )}
        </div>

        {serverAlertMessage && (
          <div
            role="alert"
            className="login-err-msg rounded-[4px] border border-danger/25 bg-danger/5 px-3.5 py-2.5 text-[13px] font-medium text-danger"
          >
            {serverAlertMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={isLocked}
          aria-busy={isPending}
          className={`login-go relative mt-1.5 flex min-h-[58px] w-full cursor-pointer items-center justify-between gap-4 overflow-hidden rounded-full border-0 bg-navy pl-[26px] pr-2 text-[13px] font-bold uppercase tracking-[0.12em] text-white ${
            isPending ? "is-busy" : ""
          } ${isSuccess ? "is-ok" : ""}`}
        >
          <span>{buttonLabel}</span>
          <span
            aria-hidden="true"
            className="login-go-ar grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-brass text-portal-night"
          >
            {isSuccess ? (
              <PortalIcon name="check" size={16} className="login-ck" />
            ) : isPending ? (
              <span className="login-spin block h-[18px] w-[18px] rounded-full border-2 border-portal-night/25 border-t-portal-night" />
            ) : (
              <PortalIcon name="arrow" size={16} />
            )}
          </span>
        </button>
      </form>

      <RouteVeil active={veilActive} />
    </>
  );
}
