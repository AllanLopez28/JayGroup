import { useCallback, useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export interface UseStoryScrollReturn {
  sectionRef: React.RefObject<HTMLElement | null>;
  statementRef: React.RefObject<HTMLParagraphElement | null>;
  setWordRef: (index: number) => (node: HTMLSpanElement | null) => void;
}

export function useStoryScroll(wordCount: number): UseStoryScrollReturn {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const statementRef = useRef<HTMLParagraphElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rafIdRef = useRef<number | null>(null);

  const setWordRef = useCallback(
    (index: number) => (node: HTMLSpanElement | null) => {
      wordRefs.current[index] = node;
    },
    []
  );

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const statementEl = statementRef.current;
    if (!sectionEl || !statementEl || typeof window === "undefined") {
      return;
    }

    if (prefersReducedMotion) {
      wordRefs.current.forEach((wordEl) => {
        wordEl?.classList.add("on");
      });
      sectionEl.querySelectorAll<HTMLElement>(".rv").forEach((el) => {
        el.classList.remove("wait");
      });
      return;
    }

    const fillWords = () => {
      rafIdRef.current = null;
      const rect = statementEl.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(
        Math.max((vh * 0.92 - rect.top) / (vh * 0.62), 0),
        1
      );
      const activeWords = Math.round(progress * wordCount);

      for (let i = 0; i < wordCount; i++) {
        const wordEl = wordRefs.current[i];
        if (wordEl) {
          wordEl.classList.toggle("on", i < activeWords);
        }
      }
    };

    const scheduleFill = () => {
      if (rafIdRef.current === null) {
        rafIdRef.current = window.requestAnimationFrame(fillWords);
      }
    };

    fillWords();
    window.addEventListener("scroll", scheduleFill, { passive: true });
    window.addEventListener("resize", scheduleFill, { passive: true });

    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }
            entry.target.classList.remove("wait");
            observer?.unobserve(entry.target);
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
      );

      const vh = window.innerHeight;
      sectionEl.querySelectorAll<HTMLElement>(".rv").forEach((el) => {
        if (el.getBoundingClientRect().top > vh) {
          el.classList.add("wait");
          observer?.observe(el);
        }
      });
    }

    return () => {
      window.removeEventListener("scroll", scheduleFill);
      window.removeEventListener("resize", scheduleFill);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      observer?.disconnect();
    };
  }, [prefersReducedMotion, wordCount]);

  return {
    sectionRef,
    statementRef,
    setWordRef,
  };
}
