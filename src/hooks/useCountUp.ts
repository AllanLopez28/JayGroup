import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export interface UseCountUpOptions {
  target: number;
  durationMs?: number;
  prefix?: string;
  decimals?: number;
}

export function formatCurrencyValue(
  value: number,
  prefix: string,
  decimals: number
): string {
  return (
    prefix +
    value.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  );
}

export function useCountUp({
  target,
  durationMs = 1100,
  prefix = "$",
  decimals = 2,
}: UseCountUpOptions): React.RefObject<HTMLDivElement | null> {
  const prefersReducedMotion = usePrefersReducedMotion();
  const valueRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = valueRef.current;
    if (!el) {
      return;
    }

    const finalFormatted = formatCurrencyValue(target, prefix, decimals);
    if (prefersReducedMotion || typeof window === "undefined") {
      el.textContent = finalFormatted;
      return;
    }

    let rafId: number | null = null;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }
      const progress = Math.min(1, (timestamp - startTime) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.textContent = formatCurrencyValue(current, prefix, decimals);

      if (progress < 1) {
        rafId = window.requestAnimationFrame(step);
      } else {
        el.textContent = finalFormatted;
      }
    };

    rafId = window.requestAnimationFrame(step);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [decimals, durationMs, prefersReducedMotion, prefix, target]);

  return valueRef;
}
