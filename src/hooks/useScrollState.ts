import { useEffect, useRef, useState } from "react";

export interface ScrollState {
  isSolid: boolean;
  isHidden: boolean;
}

export interface UseScrollStateOptions {
  solidThreshold?: number;
  directionDeadzone?: number;
}

export function useScrollState({
  solidThreshold = 40,
  directionDeadzone = 4,
}: UseScrollStateOptions = {}): ScrollState {
  const [state, setState] = useState<ScrollState>({
    isSolid: false,
    isHidden: false,
  });

  const lastYRef = useRef<number>(0);
  const stateRef = useRef<ScrollState>({ isSolid: false, isHidden: false });
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    lastYRef.current = window.scrollY;

    const evaluateScroll = () => {
      rafIdRef.current = null;
      const currentY = Math.max(0, window.scrollY);
      const delta = currentY - lastYRef.current;

      const heroEl = document.querySelector<HTMLElement>(
        'section[aria-label="Introduction"]'
      );
      const heroThreshold = heroEl
        ? Math.max(480, heroEl.offsetHeight - 84)
        : Math.max(620, window.innerHeight * 0.85);

      const nextSolid = currentY > solidThreshold;
      let nextHidden = stateRef.current.isHidden;

      if (currentY <= heroThreshold) {
        nextHidden = false;
      } else if (delta > directionDeadzone) {
        nextHidden = true;
      } else if (delta < -directionDeadzone) {
        nextHidden = false;
      }

      lastYRef.current = currentY;

      if (
        stateRef.current.isSolid !== nextSolid ||
        stateRef.current.isHidden !== nextHidden
      ) {
        const nextState: ScrollState = {
          isSolid: nextSolid,
          isHidden: nextHidden,
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
  }, [solidThreshold, directionDeadzone]);

  return state;
}
