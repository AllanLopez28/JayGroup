"use server";

import { getSession } from "@/lib/auth/session";
import { amenitiesContent } from "@/lib/data/residentDashboard";
import {
  formatDateLabel,
  getAvailableDurations,
  quoteBooking,
  todayInNewYork,
} from "@/lib/portal/amenities";
import type {
  AmenityBookingRequestInput,
  AmenityBookingRequestResult,
  ExtraKeyFormData,
  FeedbackFormData,
  RenewalSubmissionData,
} from "@/lib/types";

export async function submitRenewalDocuments(
  data: RenewalSubmissionData
): Promise<void> {
  // TODO: connect to ManageGo / backend
  void data;
}

export async function submitExtraKeyRequest(
  data: ExtraKeyFormData
): Promise<void> {
  // TODO: connect to ManageGo / backend
  void data;
}

export async function requestAmenityBooking(
  input: AmenityBookingRequestInput
): Promise<AmenityBookingRequestResult> {
  const session = await getSession();
  if (!session) {
    return {
      ok: false,
      error: "Your session has expired. Please sign in again to reserve a space.",
    };
  }

  const space = amenitiesContent.spaces.find((s) => s.id === input.spaceId);
  if (!space) {
    return { ok: false, error: "Selected space is not available." };
  }

  if (!input.agreedToTerms) {
    return {
      ok: false,
      error: "You must accept the terms and conditions before confirming.",
    };
  }

  const formattedDate = formatDateLabel(input.date);
  if (!formattedDate || input.date < todayInNewYork()) {
    return {
      ok: false,
      error: "Please select today or a future date.",
    };
  }

  const validStartHours: readonly number[] = amenitiesContent.startHours;
  if (!validStartHours.includes(input.startHour)) {
    return { ok: false, error: "Please select a valid start time." };
  }

  const guestOption = amenitiesContent.guestOptions.find(
    (g) => g.id === input.guestOptionId
  );
  if (!guestOption) {
    return { ok: false, error: "Please select a valid guest count." };
  }

  if (space.pricing) {
    if (guestOption.maxGuests > space.pricing.maxGuests) {
      return {
        ok: false,
        error: `Guest count exceeds the ${space.pricing.maxGuests}-guest maximum for ${space.name}.`,
      };
    }

    const availableDurations = getAvailableDurations(
      space.pricing,
      input.startHour
    );
    if (!availableDurations.includes(input.hours)) {
      return {
        ok: false,
        error: "Selected duration exceeds the closing time for this space.",
      };
    }
  }

  const quote = quoteBooking(space, input.hours);

  // TODO: persist the request and notify management (ManageGo / backend)
  return {
    ok: true,
    request: {
      id: crypto.randomUUID(),
      status: "pending_approval",
      ...(quote ? { totalCents: quote.totalCents } : {}),
    },
  };
}

export async function submitResidentFeedback(
  data: FeedbackFormData
): Promise<void> {
  // TODO: connect to ManageGo / backend
  void data;
}
