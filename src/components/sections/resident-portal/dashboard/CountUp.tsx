"use client";

import { formatCurrencyValue, useCountUp } from "@/hooks/useCountUp";

export interface CountUpProps {
  target: number;
  prefix?: string;
  decimals?: number;
  durationMs?: number;
  className?: string;
}

export function CountUp({
  target,
  prefix = "$",
  decimals = 2,
  durationMs = 1100,
  className,
}: CountUpProps) {
  const ref = useCountUp({ target, prefix, decimals, durationMs });

  return (
    <div ref={ref} className={className}>
      {formatCurrencyValue(target, prefix, decimals)}
    </div>
  );
}
