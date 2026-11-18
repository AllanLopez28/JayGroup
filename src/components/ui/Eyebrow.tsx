import type { ReactNode } from "react";

export interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return <p className={`eyebrow ${className}`.trim()}>{children}</p>;
}
