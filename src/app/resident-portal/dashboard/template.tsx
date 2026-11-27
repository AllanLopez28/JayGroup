"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function ResidentDashboardTemplate({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window.scrollY > 0) {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  }, [prefersReducedMotion]);

  return <>{children}</>;
}
