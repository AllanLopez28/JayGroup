"use client";

import { useCallback, useEffect, useRef } from "react";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { Building } from "@/lib/types";

export interface BuildingDialogProps {
  buildings: Building[];
  selectedIndex: number | null;
  origin: { x: number; y: number };
  onSelectIndex: (index: number | null) => void;
}

export function BuildingDialog({
  buildings,
  selectedIndex,
  origin,
  onSelectIndex,
}: BuildingDialogProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const unitsRef = useRef<HTMLSpanElement | null>(null);
  const storiesRef = useRef<HTMLSpanElement | null>(null);
  const invRef = useRef<HTMLDivElement | null>(null);

  const isClosingRef = useRef(false);
  const swapTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const countTimerRef = useRef<number | null>(null);
  const rafIdsRef = useRef<number[]>([]);

  const activeIndex = selectedIndex ?? 0;

  const clearCountAnimations = useCallback(() => {
    if (countTimerRef.current !== null) {
      window.clearTimeout(countTimerRef.current);
      countTimerRef.current = null;
    }
    rafIdsRef.current.forEach((id) => window.cancelAnimationFrame(id));
    rafIdsRef.current = [];
  }, []);

  const runCountTo = useCallback(
    (
      el: HTMLElement | null,
      to: number,
      decimals: number,
      prefix: string,
      suffix: string,
      durationMs: number
    ) => {
      if (!el) {
        return;
      }
      if (prefersReducedMotion) {
        el.textContent = `${prefix}${to.toFixed(decimals)}${suffix}`;
        return;
      }

      let startTime: number | null = null;
      el.textContent = `${prefix}${(0).toFixed(decimals)}${suffix}`;

      const step = (timestamp: number) => {
        if (startTime === null) {
          startTime = timestamp;
        }
        const progress = Math.min((timestamp - startTime) / durationMs, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        el.textContent = `${prefix}${(to * eased).toFixed(decimals)}${suffix}`;
        if (progress < 1 && !isClosingRef.current) {
          const id = window.requestAnimationFrame(step);
          rafIdsRef.current.push(id);
        }
      };

      const id = window.requestAnimationFrame(step);
      rafIdsRef.current.push(id);
    },
    [prefersReducedMotion]
  );

  const triggerBuildingCounters = useCallback(
    (building: Building) => {
      clearCountAnimations();
      if (unitsRef.current) {
        unitsRef.current.textContent = String(building.units);
      }
      if (storiesRef.current) {
        storiesRef.current.textContent = String(building.stories);
      }
      if (invRef.current) {
        invRef.current.textContent = building.investmentText;
      }

      if (prefersReducedMotion) {
        return;
      }

      countTimerRef.current = window.setTimeout(() => {
        runCountTo(unitsRef.current, building.units, 0, "", "", 1200);
        runCountTo(storiesRef.current, building.stories, 0, "", "", 1200);
        const invDecimals = building.investment % 1 !== 0 ? 1 : 0;
        runCountTo(
          invRef.current,
          building.investment,
          invDecimals,
          "$",
          "M",
          1600
        );
      }, 600);
    },
    [clearCountAnimations, prefersReducedMotion, runCountTo]
  );

  const handleClose = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || isClosingRef.current) {
      return;
    }

    isClosingRef.current = true;
    clearCountAnimations();
    dialog.classList.remove("swap", "show");

    const delay = prefersReducedMotion ? 0 : 700;
    closeTimerRef.current = window.setTimeout(() => {
      if (dialog.open) {
        dialog.close();
      } else {
        dialog.removeAttribute("open");
      }
      document.body.style.overflow = "";
      isClosingRef.current = false;
      onSelectIndex(null);
    }, delay);
  }, [clearCountAnimations, onSelectIndex, prefersReducedMotion]);

  const handleStep = useCallback(
    (direction: -1 | 1) => {
      const dialog = dialogRef.current;
      if (!dialog || selectedIndex === null || isClosingRef.current) {
        return;
      }

      const nextIndex =
        (selectedIndex + direction + buildings.length) % buildings.length;
      dialog.classList.add("swap");
      dialog.classList.remove("show");

      if (swapTimerRef.current !== null) {
        window.clearTimeout(swapTimerRef.current);
      }

      const delay = prefersReducedMotion ? 0 : 320;
      swapTimerRef.current = window.setTimeout(() => {
        onSelectIndex(nextIndex);
        const nextBuilding = buildings[nextIndex];
        if (nextBuilding) {
          triggerBuildingCounters(nextBuilding);
        }
        window.requestAnimationFrame(() => {
          dialog.classList.add("show");
        });
      }, delay);
    },
    [
      buildings,
      onSelectIndex,
      prefersReducedMotion,
      selectedIndex,
      triggerBuildingCounters,
    ]
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    const wrap = wrapRef.current;
    if (!dialog || !wrap || selectedIndex === null) {
      return;
    }

    const targetBuilding = buildings[selectedIndex];
    if (targetBuilding) {
      triggerBuildingCounters(targetBuilding);
    }

    if (!dialog.open) {
      isClosingRef.current = false;
      wrap.style.setProperty("--cx", `${origin.x}px`);
      wrap.style.setProperty("--cy", `${origin.y}px`);
      dialog.classList.remove("show", "swap");

      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }

      document.body.style.overflow = "hidden";
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          dialog.classList.add("show");
        });
      });
      closeBtnRef.current?.focus({ preventScroll: true });
    }
  }, [buildings, origin.x, origin.y, selectedIndex, triggerBuildingCounters]);

  useEffect(() => {
    return () => {
      clearCountAnimations();
      if (swapTimerRef.current !== null) {
        window.clearTimeout(swapTimerRef.current);
      }
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
      document.body.style.overflow = "";
    };
  }, [clearCountAnimations]);

  const currentBuilding = buildings[activeIndex] ?? buildings[0];
  if (!currentBuilding) {
    return null;
  }

  const numberLabel = String(activeIndex + 1).padStart(2, "0");
  const totalLabel = String(buildings.length).padStart(2, "0");
  const imageSrc = currentBuilding.cutout ?? currentBuilding.image;

  return (
    <dialog
      ref={dialogRef}
      className="sp"
      aria-labelledby="spName"
      onCancel={(event) => {
        event.preventDefault();
        handleClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          handleStep(1);
        } else if (event.key === "ArrowLeft") {
          handleStep(-1);
        }
      }}
    >
      <div ref={wrapRef} className="sp-wrap">
        <div className="sp-stage">
          <div className="sp-num" aria-hidden="true">
            {numberLabel}
          </div>
          {imageSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className={`sp-img ${!currentBuilding.cutout ? "photo" : ""}`.trim()}
              src={imageSrc}
              alt={`${currentBuilding.name}${
                currentBuilding.cutout ? ", illustration" : ", rendering"
              }`}
            />
          )}
          <div className="sp-ground" aria-hidden="true" />
        </div>

        <div className="sp-info">
          <div className="eyebrow">
            {numberLabel} / {totalLabel} · {currentBuilding.hood}
          </div>

          <div>
            <h3 className="sp-name" id="spName">
              {currentBuilding.name}
            </h3>
            <div className="sp-addr">{currentBuilding.address}</div>
          </div>

          {currentBuilding.tags.length > 0 && (
            <div className="sp-tags">
              {currentBuilding.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}

          <div className="sp-stats">
            <div>
              <span ref={unitsRef} className="v">
                {currentBuilding.units}
              </span>
              <span className="k">{currentBuilding.unitsLabel}</span>
            </div>
            <div>
              <span ref={storiesRef} className="v">
                {currentBuilding.stories}
              </span>
              <span className="k">Stories</span>
            </div>
            <div>
              <span className="v sm">{currentBuilding.status || "[ ]"}</span>
              <span className="k">Status</span>
            </div>
          </div>

          <div className="sp-inv">
            <div className="k">Investment</div>
            <div ref={invRef} className="v">
              {currentBuilding.investmentText}
            </div>
            {currentBuilding.investmentNote && (
              <div className="note">{currentBuilding.investmentNote}</div>
            )}
          </div>

          {currentBuilding.features.length > 0 && (
            <ul className="sp-feat">
              {currentBuilding.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          )}

          <div className="sp-act">
            {currentBuilding.url ? (
              <a
                href={currentBuilding.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-solid"
              >
                <span>Visit Website</span>
                <ArrowIcon className="btn-arrow" />
              </a>
            ) : (
              <span
                aria-disabled="true"
                title="Website [URL] to be added"
                className="btn btn-solid opacity-60"
              >
                <span>Visit Website</span>
                <ArrowIcon className="btn-arrow" />
              </span>
            )}

            <div className="sp-nav">
              <button
                type="button"
                className="rnd"
                aria-label="Previous building"
                onClick={() => handleStep(-1)}
              >
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M15 8H2M6 4L2 8l4 4" />
                </svg>
              </button>
              <button
                type="button"
                className="rnd"
                aria-label="Next building"
                onClick={() => handleStep(1)}
              >
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M1 8h13M10 4l4 4-4 4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        ref={closeBtnRef}
        type="button"
        className="rnd sp-x"
        aria-label="Close"
        onClick={handleClose}
      >
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M3 3l10 10M13 3L3 13" />
        </svg>
      </button>
    </dialog>
  );
}
