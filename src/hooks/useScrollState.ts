import { useEffect, useRef, useState } from "react";

export interface ScrollState {
  isSolid: boolean;
}

export interface UseScrollStateOptions {
  solidThreshold?: number;
}

export function useScrollState({
  solidThreshold = 40,
}: UseScrollStateOptions = {}): ScrollState {
  const [state, setState] = useState<ScrollState>({
    isSolid: false,
  });

  const stateRef = useRef<ScrollState>({ isSolid: false });
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const evaluateScroll = () => {
      rafIdRef.current = null;
      const currentY = Math.max(0, window.scrollY);
      const nextSolid = currentY > solidThreshold;

      if (stateRef.current.isSolid !== nextSolid) {
        const nextState: ScrollState = {
          isSolid: nextSolid,
        };
        stateRef.current = nextState;
        setState(nextState);
      }
    };

    const handleScroll = () => {
      if (rafIdRef.current === null) {
        rafIdRef.current = window.requestAnimationFrame(evaluateScroll);
      }
    };

    evaluateScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [solidThreshold]);

  return state;
}
