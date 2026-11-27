"use client";

import { useId, useState } from "react";
import type { CSSProperties, FormEvent, KeyboardEvent } from "react";
import { Pill } from "@/components/sections/resident-portal/dashboard/Pill";
import { SplitWords } from "@/components/sections/resident-portal/dashboard/SplitWords";
import { useToast } from "@/components/sections/resident-portal/dashboard/ToastProvider";
import { submitAmenityReservation } from "@/lib/portal/actions";
import type { AmenitySpace } from "@/lib/types";

export interface AmenityBookingProps {
  title: string;
  subtitlePrefix: string;
  buildingName: string;
  spacesGroupLabel: string;
  spaces: readonly AmenitySpace[];
  dateLabel: string;
  pickDatePlaceholder: string;
  guestsLabel: string;
  guestOptions: readonly string[];
  defaultGuests: string;
  timeLabel: string;
  timeGroupLabel: string;
  timeSlots: readonly string[];
  defaultTimeSlot: string;
  submitLabel: string;
  toastMessage: string;
  dateRequiredError: string;
}

function formatBookingDate(dateValue: string, fallback: string): string {
  if (!dateValue) {
    return fallback;
  }
  const parsed = new Date(`${dateValue}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return fallback;
  }
  return parsed.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function AmenityBooking({
  title,
  subtitlePrefix,
  buildingName,
  spacesGroupLabel,
  spaces,
  dateLabel,
  pickDatePlaceholder,
  guestsLabel,
  guestOptions,
  defaultGuests,
  timeLabel,
  timeGroupLabel,
  timeSlots,
  defaultTimeSlot,
  submitLabel,
  toastMessage,
  dateRequiredError,
}: AmenityBookingProps) {
  const { showToast } = useToast();
  const dateId = useId();
  const guestsId = useId();
  const timeLabelId = useId();
  const dateErrorId = useId();

  const [selectedSpace, setSelectedSpace] = useState(
    spaces[0]?.name ?? "Rooftop terrace"
  );
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(defaultGuests);
  const [timeSlot, setTimeSlot] = useState(defaultTimeSlot);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formattedDate = formatBookingDate(date, pickDatePlaceholder);
  const summaryKey = `${selectedSpace}|${formattedDate}|${timeSlot}|${guests}`;

  const handleSpaceKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    idx: number
  ) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      const next = spaces[(idx + 1) % spaces.length];
      if (next) {
        setSelectedSpace(next.name);
      }
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      const prev = spaces[(idx - 1 + spaces.length) % spaces.length];
      if (prev) {
        setSelectedSpace(prev.name);
      }
    }
  };

  const handleSlotKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    idx: number
  ) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      const next = timeSlots[(idx + 1) % timeSlots.length];
      if (next) {
        setTimeSlot(next);
      }
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      const prev = timeSlots[(idx - 1 + timeSlots.length) % timeSlots.length];
      if (prev) {
        setTimeSlot(prev);
      }
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!date) {
      setErrorMessage(dateRequiredError);
      return;
    }
    setErrorMessage("");
    setIsSubmitting(true);
    try {
      await submitAmenityReservation({
        space: selectedSpace,
        date,
        guests,
        timeSlot,
      });
      showToast(toastMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section aria-label={title}>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-6 rounded-[4px] border border-portal-line bg-white p-[clamp(24px,3vw,40px)]"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <SplitWords className="dash-h1" segments={[{ text: title }]} />
          <span
            className="dash-st text-sm text-portal-slate"
            style={{ "--i": 1 } as CSSProperties}
          >
            {subtitlePrefix} {buildingName}
          </span>
        </div>

        <div
          role="radiogroup"
          aria-label={spacesGroupLabel}
          className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-3"
        >
          {spaces.map((space, idx) => {
            const isSelected = space.name === selectedSpace;
            return (
              <button
                key={space.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setSelectedSpace(space.name)}
                onKeyDown={(event) => handleSpaceKeyDown(event, idx)}
                style={{ "--i": idx + 2 } as CSSProperties}
                className={`dash-space-card dash-st flex min-h-[120px] cursor-pointer flex-col items-start gap-4 rounded-[4px] border-[1.5px] p-4 text-left ${
                  isSelected
                    ? "border-navy text-white"
                    : "border-portal-line bg-[#f8f9fb] text-portal-night hover:border-[#c5cad6]"
                }`}
              >
                <small
                  className={`text-[11px] uppercase tracking-[0.12em] ${
                    isSelected ? "text-cream" : "text-portal-slate"
                  }`}
                >
                  {space.category}
                </small>
                <b className="text-base font-semibold leading-[1.25]">
                  {space.name}
                </b>
                <span
                  className={`text-[12.5px] ${
                    isSelected ? "text-cream" : "text-portal-slate"
                  }`}
                >
                  {space.hours}
                </span>
              </button>
            );
          })}
        </div>

        <div
          className="dash-st grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3"
          style={{ "--i": 6 } as CSSProperties}
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor={dateId}
              className="text-xs uppercase tracking-[0.12em] text-portal-slate"
            >
              {dateLabel}
            </label>
            <input
              id={dateId}
              type="date"
              required
              value={date}
              aria-invalid={Boolean(errorMessage)}
              aria-describedby={errorMessage ? dateErrorId : undefined}
              onChange={(event) => {
                setDate(event.target.value);
                if (errorMessage) {
                  setErrorMessage("");
                }
              }}
              className="dash-field-control min-h-[48px] rounded-[4px] border border-portal-line-2 bg-white px-3.5 text-portal-night transition-[border-color,box-shadow] duration-300 focus:border-navy focus:shadow-[0_0_0_3px_rgba(22,36,75,0.12)] focus:outline-none"
            />
            {errorMessage && (
              <p
                id={dateErrorId}
                role="alert"
                className="m-0 text-xs font-medium text-brass-dark"
              >
                {errorMessage}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor={guestsId}
              className="text-xs uppercase tracking-[0.12em] text-portal-slate"
            >
              {guestsLabel}
            </label>
            <select
              id={guestsId}
              value={guests}
              onChange={(event) => setGuests(event.target.value)}
              className="dash-field-control min-h-[48px] rounded-[4px] border border-portal-line-2 bg-white px-3.5 text-portal-night transition-[border-color,box-shadow] duration-300 focus:border-navy focus:shadow-[0_0_0_3px_rgba(22,36,75,0.12)] focus:outline-none"
            >
              {guestOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div
          className="dash-st flex flex-col gap-2"
          style={{ "--i": 7 } as CSSProperties}
        >
          <span
            id={timeLabelId}
            className="text-xs uppercase tracking-[0.12em] text-portal-slate"
          >
            {timeLabel}
          </span>
          <div
            role="radiogroup"
            aria-label={timeGroupLabel}
            aria-labelledby={timeLabelId}
            className="flex flex-wrap gap-2"
          >
            {timeSlots.map((slot, idx) => {
              const isSelected = slot === timeSlot;
              return (
                <button
                  key={slot}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setTimeSlot(slot)}
                  onKeyDown={(event) => handleSlotKeyDown(event, idx)}
                  className={`min-h-[44px] cursor-pointer rounded-full border px-[18px] text-[13.5px] font-semibold transition-[background-color,color,border-color,transform] duration-350 ease-soft active:scale-[0.96] ${
                    isSelected
                      ? "border-navy bg-navy text-white"
                      : "border-portal-line-2 bg-white text-portal-night hover:border-navy/40"
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="dash-st flex flex-wrap items-center justify-between gap-3.5 border-t border-[#eef0f4] pt-[18px] text-sm text-portal-slate"
          style={{ "--i": 8 } as CSSProperties}
        >
          <span key={summaryKey} className="dash-crumb-swap">
            <strong className="font-semibold text-portal-night">
              {selectedSpace}
            </strong>{" "}
            · {formattedDate} · {timeSlot} · {guests}
          </span>

          <Pill
            type="submit"
            variant="dark"
            disabled={!date || isSubmitting}
          >
            {submitLabel}
          </Pill>
        </div>
      </form>
    </section>
  );
}
