"use client";

import type { CSSProperties, KeyboardEvent } from "react";
import type { AmenitySpace } from "@/lib/types";

export interface SpaceOptionProps {
  space: AmenitySpace;
  selected: boolean;
  index: number;
  onSelect: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

export function SpaceOption({
  space,
  selected,
  index,
  onSelect,
  onKeyDown,
}: SpaceOptionProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      tabIndex={selected ? 0 : -1}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      style={{ "--i": index + 1 } as CSSProperties}
      className={`dash-space-card dash-am-space dash-st flex min-h-[120px] cursor-pointer flex-col items-start gap-4 rounded-[4px] border-[1.5px] p-4 text-left ${
        selected
          ? "border-navy text-white"
          : "border-portal-line text-portal-night"
      }`}
    >
      <small
        className={`text-[11px] uppercase tracking-[0.12em] ${
          selected ? "text-cream" : "text-portal-slate"
        }`}
      >
        {space.category}
      </small>
      <b className="text-base font-semibold leading-[1.25]">{space.name}</b>
      <span
        className={`text-[12.5px] ${
          selected ? "text-cream" : "text-portal-slate"
        }`}
      >
        {space.hoursLabel}
      </span>
      {space.badge && (
        <em className="dash-am-space-badge absolute right-3.5 top-3.5 rounded-full px-2 py-[3px] text-[10.5px] not-italic uppercase tracking-[0.1em]">
          {space.badge}
        </em>
      )}
    </button>
  );
}
