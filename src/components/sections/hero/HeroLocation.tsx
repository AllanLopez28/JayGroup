"use client";

import type { Building } from "@/lib/types";

export interface HeroLocationProps {
  building: Building;
  activeIndex: number;
  totalClips: number;
  isPlaying: boolean;
  hasBuildingChanged: boolean;
  onSelectClip: (index: number) => void;
  onTogglePlay: () => void;
  setProgressRef: (index: number) => (node: HTMLSpanElement | null) => void;
}

export function HeroLocation({
  building,
  activeIndex,
  totalClips,
  isPlaying,
  hasBuildingChanged,
  onSelectClip,
  onTogglePlay,
  setProgressRef,
}: HeroLocationProps) {
  return (
    <div className="group flex flex-col items-end text-right">
      <div className="hero-building-pill overflow-hidden">
        <div
          key={
            hasBuildingChanged ? `${building.id}-${activeIndex}` : building.id
          }
          className={hasBuildingChanged ? "clip-mask-enter" : ""}
        >
          {building.url ? (
            <a
              href={building.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-live="polite"
              className="hero-building-title block transition-colors hover:text-brass"
            >
              {building.name}
            </a>
          ) : (
            <p aria-live="polite" className="hero-building-title">
              {building.name}
            </p>
          )}
        </div>
      </div>

      {/* Interactive video reel controls: reveal on hover or keyboard focus */}
      <div className="mt-0.5 flex items-center justify-end gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-within:opacity-100">
        <div
          role="group"
          aria-label="Hero video clips"
          className="flex w-20 items-center gap-1.5"
        >
          {Array.from({ length: totalClips }).map((_, idx) => (
            <button
              key={`seg-${idx}`}
              type="button"
              aria-label={`Play clip ${idx + 1} of ${totalClips}`}
              aria-current={idx === activeIndex ? "true" : undefined}
              onClick={() => onSelectClip(idx)}
              className="flex min-h-11 flex-1 cursor-pointer items-center"
            >
              <span className="relative block h-px w-full overflow-hidden bg-line-dark">
                <span
                  ref={setProgressRef(idx)}
                  className="block h-full w-full origin-left scale-x-0 bg-mist"
                />
              </span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onTogglePlay}
          aria-label={
            isPlaying ? "Pause background video" : "Play background video"
          }
          className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line-dark bg-night/45 text-mist transition-colors hover:border-brass hover:text-brass">
            {isPlaying ? (
              <svg
                viewBox="0 0 12 12"
                fill="currentColor"
                aria-hidden="true"
                className="h-2.5 w-2.5"
              >
                <rect x="2.5" y="2" width="2.2" height="8" />
                <rect x="7.3" y="2" width="2.2" height="8" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 12 12"
                fill="currentColor"
                //aria-hidden="true"
                className="h-2.5 w-2.5 translate-x-[0.5px]"
              >
                <path d="M3 2l7 4-7 4V2z" />
              </svg>
            )}
          </span>
        </button>
      </div>
    </div>
  );
}
