"use client";

import { useId, useState } from "react";
import type { CSSProperties, FormEvent, KeyboardEvent } from "react";
import { Pill } from "@/components/sections/resident-portal/dashboard/Pill";
import { PortalIcon } from "@/components/sections/resident-portal/dashboard/PortalIcon";
import { SplitWords } from "@/components/sections/resident-portal/dashboard/SplitWords";
import { useToast } from "@/components/sections/resident-portal/dashboard/ToastProvider";
import { submitResidentFeedback } from "@/lib/portal/actions";

export interface FeedbackFormProps {
  title: string;
  lead: string;
  ratingLabel: string;
  defaultRating: number;
  topicLabel: string;
  topics: readonly string[];
  defaultTopic: string;
  messageLabel: string;
  messagePlaceholder: string;
  messageRequiredError: string;
  anonymousLabel: string;
  submitLabel: string;
  toastMessage: string;
}

const TOTAL_STARS = 5;

export function FeedbackForm({
  title,
  lead,
  ratingLabel,
  defaultRating,
  topicLabel,
  topics,
  defaultTopic,
  messageLabel,
  messagePlaceholder,
  messageRequiredError,
  anonymousLabel,
  submitLabel,
  toastMessage,
}: FeedbackFormProps) {
  const { showToast } = useToast();
  const topicId = useId();
  const messageId = useId();
  const messageErrorId = useId();

  const [rating, setRating] = useState(defaultRating);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [poppedStar, setPoppedStar] = useState<{
    value: number;
    seq: number;
  } | null>(null);
  const [topic, setTopic] = useState(defaultTopic);
  const [message, setMessage] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const displayedRating = hoveredRating ?? rating;

  const selectStar = (value: number) => {
    setRating(value);
    setPoppedStar((prev) => ({ value, seq: (prev?.seq ?? 0) + 1 }));
  };

  const handleStarKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    value: number
  ) => {
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      selectStar(Math.min(TOTAL_STARS, value + 1));
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      selectStar(Math.max(1, value - 1));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) {
      setErrorMessage(messageRequiredError);
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);
    try {
      await submitResidentFeedback({
        rating,
        topic,
        message: trimmed,
        anonymous,
      });
      setMessage("");
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
        className="flex flex-wrap gap-9 rounded-[4px] border border-portal-line bg-white p-[clamp(24px,3vw,40px)]"
      >
        <div className="flex min-w-0 flex-[2] basis-[280px] flex-col gap-3.5">
          <SplitWords className="dash-h1" segments={[{ text: title }]} />
          <p
            className="dash-st m-0 text-[15px] leading-[1.6] text-portal-slate"
            style={{ "--i": 3 } as CSSProperties}
          >
            {lead}
          </p>

          <div
            role="radiogroup"
            aria-label={ratingLabel}
            onMouseLeave={() => setHoveredRating(null)}
            style={{ "--i": 4 } as CSSProperties}
            className="dash-st mt-1.5 flex gap-1.5"
          >
            {Array.from({ length: TOTAL_STARS }, (_, idx) => {
              const starValue = idx + 1;
              const isLit = starValue <= displayedRating;
              const isSelected = starValue === rating;
              const isPopping = poppedStar?.value === starValue;

              return (
                <button
                  key={
                    isPopping
                      ? `star-${starValue}-${poppedStar.seq}`
                      : `star-${starValue}`
                  }
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={`${starValue} of ${TOTAL_STARS}`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => selectStar(starValue)}
                  onMouseEnter={() => setHoveredRating(starValue)}
                  onKeyDown={(event) => handleStarKeyDown(event, starValue)}
                  className={`dash-star-btn grid h-11 w-11 cursor-pointer place-items-center border-0 bg-transparent p-0 ${
                    isLit ? "text-brass" : "text-[#c5cad6]"
                  } ${isPopping ? "dash-star-pop" : ""}`}
                >
                  <PortalIcon name="star" size={30} filled={isLit} />
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex min-w-0 flex-[3] basis-[320px] flex-col gap-3.5">
          <div
            className="dash-st flex flex-col gap-2"
            style={{ "--i": 3 } as CSSProperties}
          >
            <label
              htmlFor={topicId}
              className="text-xs uppercase tracking-[0.12em] text-portal-slate"
            >
              {topicLabel}
            </label>
            <select
              id={topicId}
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              className="dash-field-control min-h-[48px] rounded-[4px] border border-portal-line-2 bg-white px-3.5 text-portal-night transition-[border-color,box-shadow] duration-300 focus:border-navy focus:shadow-[0_0_0_3px_rgba(22,36,75,0.12)] focus:outline-none"
            >
              {topics.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div
            className="dash-st flex flex-col gap-2"
            style={{ "--i": 4 } as CSSProperties}
          >
            <label
              htmlFor={messageId}
              className="text-xs uppercase tracking-[0.12em] text-portal-slate"
            >
              {messageLabel}
            </label>
            <textarea
              id={messageId}
              rows={5}
              required
              value={message}
              aria-invalid={Boolean(errorMessage)}
              aria-describedby={errorMessage ? messageErrorId : undefined}
              onChange={(event) => {
                setMessage(event.target.value);
                if (errorMessage) {
                  setErrorMessage("");
                }
              }}
              placeholder={messagePlaceholder}
              className="dash-field-control resize-y rounded-[4px] border border-portal-line-2 bg-white px-3.5 py-3 leading-[1.55] text-portal-night placeholder:text-portal-slate/70 transition-[border-color,box-shadow] duration-300 focus:border-navy focus:shadow-[0_0_0_3px_rgba(22,36,75,0.12)] focus:outline-none"
            />
            {errorMessage && (
              <p
                id={messageErrorId}
                role="alert"
                className="m-0 text-xs font-medium text-brass-dark"
              >
                {errorMessage}
              </p>
            )}
          </div>

          <div
            className="dash-st flex flex-wrap items-center justify-between gap-3"
            style={{ "--i": 5 } as CSSProperties}
          >
            <label className="flex min-h-[44px] cursor-pointer items-center gap-2.5 text-sm text-portal-slate">
              <input
                type="checkbox"
                checked={anonymous}
                onChange={(event) => setAnonymous(event.target.checked)}
                className="h-[18px] w-[18px] accent-navy"
              />
              <span>{anonymousLabel}</span>
            </label>

            <Pill type="submit" variant="dark" disabled={isSubmitting}>
              {submitLabel}
            </Pill>
          </div>
        </div>
      </form>
    </section>
  );
}
