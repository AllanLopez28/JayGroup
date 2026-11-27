"use client";

import { useId, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import { SplitWords } from "@/components/sections/resident-portal/dashboard/SplitWords";
import { useToast } from "@/components/sections/resident-portal/dashboard/ToastProvider";
import { AmenityTermsDialog } from "@/components/sections/resident-portal/dashboard/amenities/AmenityTermsDialog";
import type { AmenityTermsDialogCopy } from "@/components/sections/resident-portal/dashboard/amenities/AmenityTermsDialog";
import { AmenityTermsGlance } from "@/components/sections/resident-portal/dashboard/amenities/AmenityTermsGlance";
import { BookingSummary } from "@/components/sections/resident-portal/dashboard/amenities/BookingSummary";
import { SpaceOption } from "@/components/sections/resident-portal/dashboard/amenities/SpaceOption";
import {
  formatDateLabel,
  formatHour,
  getAvailableDurations,
  normalizeSelection,
  quoteBooking,
} from "@/lib/portal/amenities";
import type { AmenitySpace, GuestOption } from "@/lib/types";

export interface AmenityBookingProps {
  title: string;
  subtitlePrefix: string;
  buildingName: string;
  spacesGroupLabel: string;
  spaces: readonly AmenitySpace[];
  defaultSpaceId: string;
  dateLabel: string;
  minDate: string;
  pickDatePlaceholder: string;
  guestsLabel: string;
  guestOptions: readonly GuestOption[];
  defaultGuestOptionId: string;
  durationLabel: string;
  durationGroupLabel: string;
  defaultDurationHours: number;
  startTimeLabel: string;
  startTimeGroupLabel: string;
  startHours: readonly number[];
  defaultStartHour: number;
  submitLabel: string;
  summaryEstimatePrefix: string;
  summaryRentalSuffix: string;
  summaryCleaningSuffix: string;
  dialogCopy: AmenityTermsDialogCopy;
  toastDurationMs: number;
}

export function AmenityBooking({
  title,
  subtitlePrefix,
  buildingName,
  spacesGroupLabel,
  spaces,
  defaultSpaceId,
  dateLabel,
  minDate,
  pickDatePlaceholder,
  guestsLabel,
  guestOptions,
  defaultGuestOptionId,
  durationLabel,
  durationGroupLabel,
  defaultDurationHours,
  startTimeLabel,
  startTimeGroupLabel,
  startHours,
  defaultStartHour,
  submitLabel,
  summaryEstimatePrefix,
  summaryRentalSuffix,
  summaryCleaningSuffix,
  dialogCopy,
  toastDurationMs,
}: AmenityBookingProps) {
  const { showToast } = useToast();
  const headingId = useId();
  const dateId = useId();
  const guestsId = useId();
  const durationLabelId = useId();
  const startTimeLabelId = useId();

  const [selectedSpaceId, setSelectedSpaceId] = useState(defaultSpaceId);
  const [date, setDate] = useState("");
  const [guestOptionId, setGuestOptionId] = useState(defaultGuestOptionId);
  const [startHour, setStartHour] = useState(defaultStartHour);
  const [hours, setHours] = useState(defaultDurationHours);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const selectedSpace =
    spaces.find((s) => s.id === selectedSpaceId) ?? spaces[0];
  const selectedGuestOption =
    guestOptions.find((g) => g.id === guestOptionId) ?? guestOptions[0];

  const availableDurations = selectedSpace.pricing
    ? getAvailableDurations(selectedSpace.pricing, startHour)
    : [];
  const quote = quoteBooking(selectedSpace, hours);
  const formattedDate = formatDateLabel(date);

  const selectSpace = (nextSpace: AmenitySpace) => {
    setSelectedSpaceId(nextSpace.id);
    const normalized = normalizeSelection(nextSpace, { startHour, hours });
    setHours(normalized.hours);
  };

  const selectStartHour = (nextStartHour: number) => {
    setStartHour(nextStartHour);
    const normalized = normalizeSelection(selectedSpace, {
      startHour: nextStartHour,
      hours,
    });
    setHours(normalized.hours);
  };

  const handleSpaceKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    idx: number
  ) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      const next = spaces[(idx + 1) % spaces.length];
      if (next) {
        selectSpace(next);
      }
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      const prev = spaces[(idx - 1 + spaces.length) % spaces.length];
      if (prev) {
        selectSpace(prev);
      }
    }
  };

  const handleDurationKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentDuration: number
  ) => {
    if (availableDurations.length <= 1) {
      return;
    }
    const currentIndex = availableDurations.indexOf(currentDuration);
    if (currentIndex === -1) {
      return;
    }
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      const next =
        availableDurations[(currentIndex + 1) % availableDurations.length];
      if (next !== undefined) {
        setHours(next);
      }
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      const prev =
        availableDurations[
          (currentIndex - 1 + availableDurations.length) %
            availableDurations.length
        ];
      if (prev !== undefined) {
        setHours(prev);
      }
    }
  };

  const handleSlotKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    idx: number
  ) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      const next = startHours[(idx + 1) % startHours.length];
      if (next !== undefined) {
        selectStartHour(next);
      }
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      const prev =
        startHours[(idx - 1 + startHours.length) % startHours.length];
      if (prev !== undefined) {
        selectStartHour(prev);
      }
    }
  };

  const handleConfirmed = () => {
    const label = formattedDate ?? date;
    showToast(
      `Request sent for ${selectedSpace.name} on ${label}. Pending management approval.`,
      toastDurationMs
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <section
        aria-labelledby={headingId}
        className="flex flex-col gap-[22px] rounded-[4px] border border-portal-line bg-white p-[clamp(24px,3vw,40px)]"
      >
        <div
          className="dash-st flex flex-wrap items-baseline justify-between gap-3"
          style={{ "--i": 0 } as CSSProperties}
        >
          <SplitWords
            id={headingId}
            className="dash-h1"
            segments={[{ text: title }]}
          />
          <span className="text-[13px] text-portal-slate">
            {subtitlePrefix} {buildingName}
          </span>
        </div>

        <div
          role="radiogroup"
          aria-label={spacesGroupLabel}
          className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-3"
        >
          {spaces.map((space, idx) => (
            <SpaceOption
              key={space.id}
              space={space}
              selected={space.id === selectedSpace.id}
              index={idx}
              onSelect={() => selectSpace(space)}
              onKeyDown={(event) => handleSpaceKeyDown(event, idx)}
            />
          ))}
        </div>

        <div
          className="dash-st grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3"
          style={{ "--i": 5 } as CSSProperties}
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
              min={minDate}
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="dash-field-control min-h-[48px] rounded-[4px] border border-portal-line-2 bg-white px-3.5 text-portal-night transition-[border-color,box-shadow] duration-300 focus:border-navy focus:shadow-[0_0_0_3px_rgba(22,36,75,0.12)] focus:outline-none"
            />
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
              value={guestOptionId}
              onChange={(event) => setGuestOptionId(event.target.value)}
              className="dash-field-control min-h-[48px] rounded-[4px] border border-portal-line-2 bg-white px-3.5 text-portal-night transition-[border-color,box-shadow] duration-300 focus:border-navy focus:shadow-[0_0_0_3px_rgba(22,36,75,0.12)] focus:outline-none"
            >
              {guestOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {selectedSpace.pricing && (
            <div className="flex flex-col gap-2">
              <span
                id={durationLabelId}
                className="text-xs uppercase tracking-[0.12em] text-portal-slate"
              >
                {durationLabel}
              </span>
              <div
                role="radiogroup"
                aria-label={durationGroupLabel}
                aria-labelledby={durationLabelId}
                className="flex flex-wrap gap-2"
              >
                {selectedSpace.pricing.durationOptions.map((duration) => {
                  const isDisabled = !availableDurations.includes(duration);
                  const isSelected = !isDisabled && duration === hours;
                  return (
                    <button
                      key={duration}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      disabled={isDisabled}
                      tabIndex={isSelected ? 0 : -1}
                      onClick={() => setHours(duration)}
                      onKeyDown={(event) =>
                        handleDurationKeyDown(event, duration)
                      }
                      className={`min-h-[44px] cursor-pointer rounded-full border px-[18px] text-[13.5px] font-semibold transition-[background-color,color,border-color,transform,opacity] duration-350 ease-soft active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-35 ${
                        isSelected
                          ? "border-navy bg-navy text-white"
                          : "border-portal-line-2 bg-white text-portal-night hover:border-navy/40"
                      }`}
                    >
                      {duration} hrs
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div
          className="dash-st flex flex-col gap-2"
          style={{ "--i": 6 } as CSSProperties}
        >
          <span
            id={startTimeLabelId}
            className="text-xs uppercase tracking-[0.12em] text-portal-slate"
          >
            {startTimeLabel}
          </span>
          <div
            role="radiogroup"
            aria-label={startTimeGroupLabel}
            aria-labelledby={startTimeLabelId}
            className="flex flex-wrap gap-2"
          >
            {startHours.map((slot, idx) => {
              const isSelected = slot === startHour;
              return (
                <button
                  key={slot}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => selectStartHour(slot)}
                  onKeyDown={(event) => handleSlotKeyDown(event, idx)}
                  className={`min-h-[44px] cursor-pointer rounded-full border px-[18px] text-[13.5px] font-semibold transition-[background-color,color,border-color,transform] duration-350 ease-soft active:scale-[0.96] ${
                    isSelected
                      ? "border-navy bg-navy text-white"
                      : "border-portal-line-2 bg-white text-portal-night hover:border-navy/40"
                  }`}
                >
                  {formatHour(slot)}
                </button>
              );
            })}
          </div>
        </div>

        <BookingSummary
          space={selectedSpace}
          formattedDate={formattedDate}
          pickDatePlaceholder={pickDatePlaceholder}
          startHour={startHour}
          hours={hours}
          guestLabel={selectedGuestOption.label}
          quote={quote}
          estimatePrefix={summaryEstimatePrefix}
          rentalSuffix={summaryRentalSuffix}
          cleaningSuffix={summaryCleaningSuffix}
          submitLabel={submitLabel}
          onReserve={() => {
            if (formattedDate) {
              setIsDialogOpen(true);
            }
          }}
        />
      </section>

      {selectedSpace.agreement && (
        <AmenityTermsGlance agreement={selectedSpace.agreement} />
      )}

      <AmenityTermsDialog
        open={isDialogOpen}
        space={selectedSpace}
        date={date}
        formattedDate={formattedDate ?? ""}
        startHour={startHour}
        hours={hours}
        guestOptionId={selectedGuestOption.id}
        guestLabel={selectedGuestOption.label}
        quote={quote}
        copy={dialogCopy}
        onClose={() => setIsDialogOpen(false)}
        onConfirmed={handleConfirmed}
      />
    </div>
  );
}
