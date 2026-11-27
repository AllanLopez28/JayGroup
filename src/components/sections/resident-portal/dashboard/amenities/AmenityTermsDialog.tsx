"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Pill } from "@/components/sections/resident-portal/dashboard/Pill";
import { PortalIcon } from "@/components/sections/resident-portal/dashboard/PortalIcon";
import { requestAmenityBooking } from "@/lib/portal/actions";
import { formatCurrency, formatHour } from "@/lib/portal/amenities";
import type { AmenityQuote, AmenitySpace } from "@/lib/types";

export interface AmenityTermsDialogCopy {
  eyebrow: string;
  title: string;
  closeAriaLabel: string;
  recapLabels: {
    space: string;
    date: string;
    time: string;
    guests: string;
    estimatedTotal: string;
  };
  fallbackTermsPlaceholder: string;
  fallbackConsentLabel: string;
  downloadButtonLabel: string;
  cancelLabel: string;
  confirmLabel: string;
  confirmingLabel: string;
  genericError: string;
}

export interface AmenityTermsDialogProps {
  open: boolean;
  space: AmenitySpace;
  date: string;
  formattedDate: string;
  startHour: number;
  hours: number;
  guestOptionId: string;
  guestLabel: string;
  quote: AmenityQuote | null;
  copy: AmenityTermsDialogCopy;
  onClose: () => void;
  onConfirmed: () => void;
}

export function AmenityTermsDialog({
  open,
  space,
  date,
  formattedDate,
  startHour,
  hours,
  guestOptionId,
  guestLabel,
  quote,
  copy,
  onClose,
  onConfirmed,
}: AmenityTermsDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const closingRef = useRef(false);

  const headingId = useId();
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const finalizeClose = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog && dialog.open) {
      dialog.close();
    }
    document.body.style.overflow = "";
    closingRef.current = false;
    setAgreed(false);
    setErrorMessage("");
    setIsSubmitting(false);
    onClose();
    previousFocusRef.current?.focus();
    previousFocusRef.current = null;
  }, [onClose]);

  const requestClose = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || !dialog.open || closingRef.current) {
      return;
    }

    closingRef.current = true;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      dialog.classList.remove("is-open");
      finalizeClose();
      return;
    }

    dialog.classList.remove("is-open");

    const panel = panelRef.current;
    let settled = false;
    const finish = () => {
      if (settled) {
        return;
      }
      settled = true;
      panel?.removeEventListener("transitionend", onEnd);
      window.clearTimeout(fallbackTimer);
      finalizeClose();
    };

    const onEnd = (event: TransitionEvent) => {
      if (event.target === panel && event.propertyName === "transform") {
        finish();
      }
    };

    const fallbackTimer = window.setTimeout(finish, 650);
    panel?.addEventListener("transitionend", onEnd);
  }, [finalizeClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (open) {
      closingRef.current = false;
      previousFocusRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;

      if (!dialog.open) {
        dialog.showModal();
      }
      document.body.style.overflow = "hidden";
      if (bodyRef.current) {
        bodyRef.current.scrollTop = 0;
      }

      const raf1 = window.requestAnimationFrame(() => {
        dialog.classList.add("is-open");
      });
      const focusTimer = window.setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);

      return () => {
        window.cancelAnimationFrame(raf1);
        window.clearTimeout(focusTimer);
      };
    }

    if (dialog.open && !closingRef.current) {
      dialog.classList.remove("is-open");
      dialog.close();
      document.body.style.overflow = "";
    }
  }, [open]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleConfirm = async () => {
    if (!agreed || isSubmitting) {
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);
    try {
      const result = await requestAmenityBooking({
        spaceId: space.id,
        date,
        startHour,
        hours,
        guestOptionId,
        agreedToTerms: agreed,
      });

      if (!result.ok) {
        setErrorMessage(result.error);
        return;
      }

      onConfirmed();
      requestClose();
    } catch {
      setErrorMessage(copy.genericError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeRange = space.pricing
    ? `${formatHour(startHour)} – ${formatHour(startHour + hours)}`
    : formatHour(startHour);

  const agreement = space.agreement;
  const consentLabel = agreement
    ? agreement.consentLabel
    : copy.fallbackConsentLabel;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={headingId}
      onCancel={(event) => {
        event.preventDefault();
        if (!isSubmitting) {
          requestClose();
        }
      }}
      className="dash-am-dialog"
    >
      <div
        aria-hidden="true"
        className="dash-am-scrim"
        onClick={() => {
          if (!isSubmitting) {
            requestClose();
          }
        }}
      />

      <div ref={panelRef} className="dash-am-panel">
        <div className="dash-am-head flex justify-between gap-4 border-b border-portal-line px-[30px] pb-5 pt-7">
          <div>
            <div className="text-[11.5px] uppercase tracking-[0.16em] text-brass-dark">
              {copy.eyebrow}
            </div>
            <h2
              id={headingId}
              className="mt-2 font-display text-[clamp(30px,3.4vw,40px)] font-normal leading-none tracking-[0.01em]"
            >
              {copy.title}
            </h2>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            aria-label={copy.closeAriaLabel}
            disabled={isSubmitting}
            onClick={requestClose}
            className="dash-am-close grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full border border-portal-line-2 bg-white text-portal-night disabled:cursor-not-allowed disabled:opacity-50"
          >
            <PortalIcon name="close" size={16} strokeWidth={1.8} />
          </button>
        </div>

        <div
          ref={bodyRef}
          className="dash-am-body flex flex-col gap-[22px] overflow-y-auto px-[30px] py-[22px]"
        >
          <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-px overflow-hidden rounded-[4px] border border-portal-line bg-portal-line">
            <div className="flex flex-col gap-1 bg-portal-bg px-4 py-3.5">
              <small className="text-[10.5px] uppercase tracking-[0.14em] text-portal-slate">
                {copy.recapLabels.space}
              </small>
              <b className="text-[14.5px] font-semibold">{space.name}</b>
            </div>

            <div className="flex flex-col gap-1 bg-portal-bg px-4 py-3.5">
              <small className="text-[10.5px] uppercase tracking-[0.14em] text-portal-slate">
                {copy.recapLabels.date}
              </small>
              <b className="text-[14.5px] font-semibold">{formattedDate}</b>
            </div>

            <div className="flex flex-col gap-1 bg-portal-bg px-4 py-3.5">
              <small className="text-[10.5px] uppercase tracking-[0.14em] text-portal-slate">
                {copy.recapLabels.time}
              </small>
              <b className="text-[14.5px] font-semibold">{timeRange}</b>
            </div>

            <div className="flex flex-col gap-1 bg-portal-bg px-4 py-3.5">
              <small className="text-[10.5px] uppercase tracking-[0.14em] text-portal-slate">
                {copy.recapLabels.guests}
              </small>
              <b className="text-[14.5px] font-semibold">{guestLabel}</b>
            </div>

            {quote && (
              <div className="flex flex-col gap-1 bg-portal-night px-4 py-3.5 text-white">
                <small className="text-[10.5px] uppercase tracking-[0.14em] text-brass">
                  {copy.recapLabels.estimatedTotal}
                </small>
                <b className="text-[14.5px] font-semibold">
                  {formatCurrency(quote.totalCents)}
                </b>
              </div>
            )}
          </div>

          {agreement ? (
            <div className="flex flex-col gap-[22px]">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="m-0 text-[15px] font-bold">
                  {agreement.documentTitle}
                </h3>
                <span className="text-[12.5px] text-portal-slate">
                  {agreement.documentSubtitle}
                </span>
              </div>

              <div className="flex flex-col rounded-[4px] border border-portal-line">
                {agreement.clauses.map((clause) => (
                  <div
                    key={clause.number}
                    className="dash-am-clause-row grid grid-cols-[44px_1fr] gap-x-3.5 gap-y-1 px-[18px] py-4"
                  >
                    <span className="font-display text-[20px] leading-[1.1] text-brass-dark">
                      {clause.number}
                    </span>
                    <b className="text-[12.5px] uppercase tracking-[0.12em]">
                      {clause.title}
                    </b>
                    <p className="dash-am-clause-body col-start-2 m-0 mt-1 text-sm leading-[1.65]">
                      {clause.body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-1.5 text-[11.5px] uppercase tracking-[0.16em] text-portal-slate">
                {agreement.riderTitle}
              </div>

              <div className="flex flex-col rounded-[4px] border border-portal-line">
                {agreement.riderClauses.map((clause) => (
                  <div
                    key={clause.number}
                    className="dash-am-clause-row grid grid-cols-[44px_1fr] gap-x-3.5 gap-y-1 px-[18px] py-4"
                  >
                    <span className="font-display text-[20px] leading-[1.1] text-brass-dark">
                      {clause.number}
                    </span>
                    <b className="text-[12.5px] uppercase tracking-[0.12em]">
                      {clause.title}
                    </b>
                    <p className="dash-am-clause-body col-start-2 m-0 mt-1 text-sm leading-[1.65]">
                      {clause.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col rounded-[4px] border border-portal-line">
              <div className="dash-am-clause-row grid grid-cols-[44px_1fr] gap-x-3.5 gap-y-1 px-[18px] py-4">
                <span className="font-display text-[20px] leading-[1.1] text-brass-dark">
                  —
                </span>
                <b className="text-[12.5px] uppercase tracking-[0.12em]">
                  {space.name}
                </b>
                <p className="dash-am-clause-body col-start-2 m-0 mt-1 text-sm leading-[1.65]">
                  {copy.fallbackTermsPlaceholder}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="dash-am-foot flex flex-col gap-4 border-t border-portal-line bg-white px-[30px] pb-6 pt-[18px]">
          <label className="dash-am-agree dash-am-clause-body flex cursor-pointer items-start gap-3 text-sm leading-[1.5]">
            <input
              type="checkbox"
              checked={agreed}
              disabled={isSubmitting}
              onChange={(event) => {
                setAgreed(event.target.checked);
                if (errorMessage) {
                  setErrorMessage("");
                }
              }}
              className="mt-px h-5 w-5 shrink-0"
            />
            <span>{consentLabel}</span>
          </label>

          {errorMessage && (
            <p
              role="alert"
              className="m-0 text-sm font-medium text-danger"
            >
              {errorMessage}
            </p>
          )}

          <div className="dash-am-actions flex flex-wrap items-center justify-between gap-3">
            {agreement ? (
              <Pill
                variant="ghost"
                href={agreement.pdfUrl}
                download={agreement.pdfFilename}
              >
                <PortalIcon name="download" size={16} strokeWidth={1.8} />
                {copy.downloadButtonLabel}
              </Pill>
            ) : (
              <span aria-hidden="true" />
            )}

            <div className="flex flex-wrap gap-2.5">
              <Pill
                type="button"
                variant="ghost"
                disabled={isSubmitting}
                onClick={requestClose}
              >
                {copy.cancelLabel}
              </Pill>
              <Pill
                type="button"
                variant="dark"
                disabled={!agreed || isSubmitting}
                aria-busy={isSubmitting}
                onClick={handleConfirm}
              >
                {isSubmitting ? copy.confirmingLabel : copy.confirmLabel}
              </Pill>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
