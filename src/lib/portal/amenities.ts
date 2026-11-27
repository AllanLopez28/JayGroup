import type {
  AmenityPricing,
  AmenityQuote,
  AmenitySpace,
} from "@/lib/types";

const wholeDollarFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const centsDollarFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const nyDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/New_York",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function formatCurrency(cents: number): string {
  const dollars = cents / 100;
  return cents % 100 === 0
    ? wholeDollarFormatter.format(dollars)
    : centsDollarFormatter.format(dollars);
}

export function formatHour(hour24: number): string {
  const hh = hour24 % 12 || 12;
  const period = hour24 < 12 || hour24 === 24 ? "AM" : "PM";
  return `${hh}:00 ${period}`;
}

export function formatShortHour(hour24: number): string {
  const hh = hour24 % 12 || 12;
  const period = hour24 < 12 || hour24 === 24 ? "AM" : "PM";
  return `${hh} ${period}`;
}

export function getAvailableDurations(
  pricing: AmenityPricing,
  startHour: number
): number[] {
  return pricing.durationOptions.filter(
    (duration) => startHour + duration <= pricing.closeHour
  );
}

export function normalizeSelection(
  space: AmenitySpace,
  selection: { startHour: number; hours: number }
): { startHour: number; hours: number } {
  if (!space.pricing) {
    return selection;
  }

  const available = getAvailableDurations(space.pricing, selection.startHour);
  if (available.includes(selection.hours)) {
    return selection;
  }

  const fallbackHours = available.includes(space.pricing.minHours)
    ? space.pricing.minHours
    : (available[0] ?? space.pricing.minHours);

  return {
    startHour: selection.startHour,
    hours: fallbackHours,
  };
}

export function quoteBooking(
  space: AmenitySpace,
  hours: number
): AmenityQuote | null {
  if (!space.pricing) {
    return null;
  }

  const rentalCents = space.pricing.hourlyRateCents * hours;
  const cleaningCents = space.pricing.cleaningFeeCents;
  return {
    rentalCents,
    cleaningCents,
    totalCents: rentalCents + cleaningCents,
  };
}

export function formatDateLabel(isoDate: string): string | null {
  if (!isoDate || !ISO_DATE_PATTERN.test(isoDate)) {
    return null;
  }

  const parsed = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function todayInNewYork(): string {
  return nyDateFormatter.format(new Date());
}
