"use client";

import { useEffect, useState } from "react";
import type { RefObject } from "react";

export function useInView(
  ref: RefObject<Element | null>,
  threshold = 0.2
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      const rafId = window.requestAnimationFrame(() => {
        setInView(true);
      });
      return () => window.cancelAnimationFrame(rafId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, threshold, inView]);

  return inView;
}
