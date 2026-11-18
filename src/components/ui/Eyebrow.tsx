import type { ReactNode } from "react";

export interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <p
      className={`inline-flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.12em] before:block before:h-px before:w-[28px] before:bg-brass ${className}`.trim()}
    >
      {children}
    </p>
  );
}
