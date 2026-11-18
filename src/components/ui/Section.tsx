import type { ReactNode } from "react";

export type SectionTone = "dark" | "light" | "paper";

export interface SectionProps {
  id?: string;
  ariaLabel?: string;
  tone?: SectionTone;
  className?: string;
  children: ReactNode;
}

const toneClasses: Record<SectionTone, string> = {
  dark: "bg-night text-mist",
  light: "bg-mist text-navy",
  paper: "bg-paper text-navy",
};

export function Section({
  id,
  ariaLabel,
  tone = "dark",
  className = "",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`min-h-[60vh] py-20 ${toneClasses[tone]} ${className}`.trim()}
    >
      {children}
    </section>
  );
}
