"use client";

import type { CSSProperties } from "react";
import { Pill } from "@/components/sections/resident-portal/dashboard/Pill";
import { formatCurrency, formatHour } from "@/lib/portal/amenities";
import type { AmenityQuote, AmenitySpace } from "@/lib/types";

export interface BookingSummaryProps {
  space: AmenitySpace;
  formattedDate: string | null;
  pickDatePlaceholder: string;
  startHour: number;
  hours: number;
  guestLabel: string;
  quote: AmenityQuote | null;
  estimatePrefix: string;
  rentalSuffix: string;
  cleaningSuffix: string;
  submitLabel: string;
  onReserve: () => void;
}

export function BookingSummary({
  space,
  formattedDate,
  pickDatePlaceholder,
  startHour,
  hours,
  guestLabel,
  quote,
  estimatePrefix,
  rentalSuffix,
  cleaningSuffix,
  submitLabel,
  onReserve,
}: BookingSummaryProps) {
  const timeRange = space.pricing
    ? `${formatHour(startHour)} – ${formatHour(startHour + hours)}`
    : formatHour(startHour);

  const dateText = formattedDate ?? pickDatePlaceholder;
  const summaryKey = `${space.id}|${dateText}|${timeRange}|${guestLabel}`;

  return (
    <div
      className="dash-st dash-am-sum-divider flex flex-wrap items-center justify-between gap-4 pt-[18px]"
      style={{ "--i": 7 } as CSSProperties}
    >
      <div className="flex flex-col gap-1 text-sm text-portal-slate">
        <span key={summaryKey} className="dash-crumb-swap">
          <strong className="font-semibold text-portal-night">
            {space.name}
          </strong>{" "}
          · {dateText} · {timeRange} · {guestLabel}
        </span>

        {quote && (
          <span className="text-[13px] text-portal-slate">
            {estimatePrefix}{" "}
            <b className="font-semibold text-portal-night">
              {formatCurrency(quote.rentalCents)}
            </b>{" "}
            {rentalSuffix}{" "}
            <b className="font-semibold text-portal-night">
              {formatCurrency(quote.cleaningCents)}
            </b>{" "}
            {cleaningSuffix}{" "}
            <b
              aria-live="polite"
              className="font-semibold text-portal-night"
            >
              {formatCurrency(quote.totalCents)}
            </b>
          </span>
        )}
      </div>

      <Pill
        type="button"
        variant="dark"
        disabled={!formattedDate}
        onClick={onReserve}
      >
        {submitLabel}
      </Pill>
    </div>
  );
}
