"use client";

import { useId, useState } from "react";
import type { CSSProperties, FormEvent, KeyboardEvent } from "react";
import { Pill } from "@/components/sections/resident-portal/dashboard/Pill";
import { SplitWords } from "@/components/sections/resident-portal/dashboard/SplitWords";
import { useToast } from "@/components/sections/resident-portal/dashboard/ToastProvider";
import { submitExtraKeyRequest } from "@/lib/portal/actions";
import type { KeyTypeOption } from "@/lib/types";

export interface ExtraKeyFormProps {
  titlePrefix: string;
  titleEmphasis: string;
  description: string;
  feeLabel: string;
  feeAmount: string;
  feeNote: string;
  keyTypeLabel: string;
  keyTypes: readonly KeyTypeOption[];
  quantityLabel: string;
  quantities: readonly number[];
  defaultQuantity: number;
  reasonLabel: string;
  reasonPlaceholder: string;
  submitLabel: string;
  toastMessage: string;
}

export function ExtraKeyForm({
  titlePrefix,
  titleEmphasis,
  description,
  feeLabel,
  feeAmount,
  feeNote,
  keyTypeLabel,
  keyTypes,
  quantityLabel,
  quantities,
  defaultQuantity,
  reasonLabel,
  reasonPlaceholder,
  submitLabel,
  toastMessage,
}: ExtraKeyFormProps) {
  const { showToast } = useToast();
  const groupLabelId = useId();
  const quantityId = useId();
  const reasonId = useId();

  const [selectedKeyType, setSelectedKeyType] = useState(
    keyTypes[0]?.id ?? "apartment"
  );
  const [quantity, setQuantity] = useState(defaultQuantity);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRadioKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    idx: number
  ) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      const next = keyTypes[(idx + 1) % keyTypes.length];
      if (next) {
        setSelectedKeyType(next.id);
      }
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      const prev = keyTypes[(idx - 1 + keyTypes.length) % keyTypes.length];
      if (prev) {
        setSelectedKeyType(prev.id);
      }
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await submitExtraKeyRequest({
        keyType: selectedKeyType,
        quantity,
        reason: reason.trim(),
      });
      showToast(toastMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section aria-label={`${titlePrefix} ${titleEmphasis}`}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-9 rounded-[4px] border border-portal-night bg-portal-night p-[clamp(24px,3vw,40px)] text-white"
      >
        <div className="flex min-w-0 flex-1 basis-[280px] flex-col gap-3.5">
          <SplitWords
            className="dash-h1"
            segments={[
              { text: titlePrefix },
              { text: titleEmphasis, emphasis: true },
            ]}
          />
          <p
            className="dash-st m-0 text-[15px] leading-[1.6] text-[#c9cdd8]"
            style={{ "--i": 2 } as CSSProperties}
          >
            {description}
          </p>
          <div
            className="dash-st mt-2 flex flex-col gap-1.5 rounded-[4px] bg-portal-night-2 p-[18px]"
            style={{ "--i": 3 } as CSSProperties}
          >
            <span className="text-[11px] uppercase tracking-[0.16em] text-brass">
              {feeLabel}
            </span>
            <b className="font-display text-[36px] font-normal leading-none">
              {feeAmount}
            </b>
            <span className="text-[13px] text-[#c9cdd8]">{feeNote}</span>
          </div>
        </div>

        <div className="flex min-w-0 flex-[1.4] basis-[320px] flex-col gap-[18px]">
          <div
            className="dash-st flex flex-col gap-2"
            style={{ "--i": 2 } as CSSProperties}
          >
            <span
              id={groupLabelId}
              className="text-xs uppercase tracking-[0.12em] text-[#c9cdd8]"
            >
              {keyTypeLabel}
            </span>
            <div
              role="radiogroup"
              aria-labelledby={groupLabelId}
              className="flex flex-wrap gap-2"
            >
              {keyTypes.map((option, idx) => {
                const isSelected = option.id === selectedKeyType;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => setSelectedKeyType(option.id)}
                    onKeyDown={(event) => handleRadioKeyDown(event, idx)}
                    className={`min-h-[44px] cursor-pointer rounded-full border px-[18px] text-[13.5px] font-semibold transition-[background-color,color,border-color,transform] duration-350 ease-soft active:scale-[0.96] ${
                      isSelected
                        ? "border-brass bg-brass text-portal-night"
                        : "border-mist/30 bg-transparent text-white hover:border-mist/60"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className="dash-st flex flex-col gap-2"
            style={{ "--i": 3 } as CSSProperties}
          >
            <label
              htmlFor={quantityId}
              className="text-xs uppercase tracking-[0.12em] text-[#c9cdd8]"
            >
              {quantityLabel}
            </label>
            <select
              id={quantityId}
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
              className="dash-field-control min-h-[48px] rounded-[4px] border border-mist/22 bg-portal-night-2 px-3.5 text-white transition-[border-color,box-shadow] duration-300 focus:border-brass focus:shadow-[0_0_0_3px_rgba(199,150,59,0.2)] focus:outline-none"
            >
              {quantities.map((qty) => (
                <option key={qty} value={qty} className="bg-portal-night-2">
                  {qty}
                </option>
              ))}
            </select>
          </div>

          <div
            className="dash-st flex flex-col gap-2"
            style={{ "--i": 4 } as CSSProperties}
          >
            <label
              htmlFor={reasonId}
              className="text-xs uppercase tracking-[0.12em] text-[#c9cdd8]"
            >
              {reasonLabel}
            </label>
            <textarea
              id={reasonId}
              rows={3}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder={reasonPlaceholder}
              className="dash-field-control resize-y rounded-[4px] border border-mist/22 bg-portal-night-2 px-3.5 py-3 leading-[1.55] text-white placeholder:text-mist/45 transition-[border-color,box-shadow] duration-300 focus:border-brass focus:shadow-[0_0_0_3px_rgba(199,150,59,0.2)] focus:outline-none"
            />
          </div>

          <Pill
            type="submit"
            variant="light"
            disabled={isSubmitting}
            className="dash-st self-start"
            style={{ "--i": 5 } as CSSProperties}
          >
            {submitLabel}
          </Pill>
        </div>
      </form>
    </section>
  );
}
