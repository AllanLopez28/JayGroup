"use client";

import { useId, useState } from "react";
import type { FormEvent, RefObject } from "react";
import { useCapsLock } from "@/hooks/useCapsLock";

export interface PasswordFieldProps {
  inputRef: RefObject<HTMLInputElement | null>;
  label: string;
  placeholder: string;
  showPasswordLabel: string;
  hidePasswordLabel: string;
  capsLockWarning: string;
  error?: string;
  readOnly?: boolean;
  onInputChange?: (value: string) => void;
}

export function PasswordField({
  inputRef,
  label,
  placeholder,
  showPasswordLabel,
  hidePasswordLabel,
  capsLockWarning,
  error,
  readOnly = false,
  onInputChange,
}: PasswordFieldProps) {
  const inputId = useId();
  const errorId = useId();
  const capsId = useId();

  const [showPassword, setShowPassword] = useState(false);
  const { isCapsLockOn, onKeyDown, onKeyUp, onBlur } = useCapsLock();

  const hasError = Boolean(error);
  const describedBy =
    [hasError ? errorId : null, isCapsLockOn ? capsId : null]
      .filter(Boolean)
      .join(" ") || undefined;

  const handleToggleVisibility = () => {
    setShowPassword((prev) => !prev);
    inputRef.current?.focus();
  };

  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    onInputChange?.(event.currentTarget.value);
  };

  return (
    <div className={`flex flex-col gap-2${hasError ? " login-field-bad" : ""}`}>
      <label
        htmlFor={inputId}
        className="text-xs uppercase tracking-[0.12em] text-portal-slate"
      >
        {label}
      </label>

      <div className="relative">
        <input
          ref={inputRef}
          id={inputId}
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          placeholder={placeholder}
          readOnly={readOnly}
          aria-invalid={hasError}
          aria-describedby={describedBy}
          onInput={handleInput}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onBlur={onBlur}
          className="login-input !pr-14"
        />
        <span aria-hidden="true" className="login-focus-line" />

        <button
          type="button"
          aria-label={showPassword ? hidePasswordLabel : showPasswordLabel}
          aria-pressed={showPassword}
          onClick={handleToggleVisibility}
          className="absolute right-[5px] top-1/2 -mt-[22px] grid h-11 w-11 cursor-pointer place-items-center rounded-[4px] border-0 bg-transparent text-portal-slate transition-colors duration-300 hover:bg-portal-bg hover:text-portal-night"
        >
          {showPassword ? (
            <svg
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              aria-hidden="true"
            >
              <path d="M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4M6.6 6.6C3.8 8.4 2 12 2 12s3.6 7 10 7a9.6 9.6 0 0 0 4.4-1M9.9 9.9a3 3 0 0 0 4.2 4.2" />
            </svg>
          ) : (
            <svg
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              aria-hidden="true"
            >
              <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>

      {hasError && (
        <div
          id={errorId}
          role="alert"
          className="login-err-msg text-[13px] text-danger"
        >
          {error}
        </div>
      )}

      <div
        id={capsId}
        aria-live="polite"
        className={`text-[13px] text-brass-dark${isCapsLockOn ? " block" : " hidden"}`}
      >
        {isCapsLockOn ? capsLockWarning : ""}
      </div>
    </div>
  );
}
