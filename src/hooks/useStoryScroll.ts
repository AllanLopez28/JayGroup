import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { StoryChapterNav } from "@/lib/data/story";

export interface UseStoryCarouselReturn {
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  deckRef: React.RefObject<HTMLDivElement | null>;
  railRef: React.RefObject<HTMLElement | null>;
  endRef: React.RefObject<HTMLDivElement | null>;
  ghostRef: React.RefObject<HTMLDivElement | null>;
  dragCurRef: React.RefObject<HTMLDivElement | null>;
  hintRef: React.RefObject<HTMLDivElement | null>;
  progDesktopRef: React.RefObject<HTMLElement | null>;
  progMobileRef: React.RefObject<HTMLElement | null>;
  setTitleWordRef: (index: number) => (node: HTMLElement | null) => void;
  setCardRef: (index: number) => (node: HTMLElement | null) => void;
  setChipRef: (index: number) => (node: HTMLButtonElement | null) => void;
  activeIndex: number;
  goToChapter: (index: number) => void;
}

export function useStoryCarousel(
  chapters: readonly StoryChapterNav[],
  titleWordCount: number
): UseStoryCarouselReturn {
  const prefersReducedMotion = usePrefersReducedMotion();
  const totalChapters = chapters.length;

  const [activeIndex, setActiveIndex] = useState(0);

  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const deckRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const dragCurRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);
  const progDesktopRef = useRef<HTMLElement | null>(null);
  const progMobileRef = useRef<HTMLElement | null>(null);

  const titleWordRefs = useRef<(HTMLElement | null)[]>([]);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndexRef = useRef(-1);
  const countedRef = useRef<Record<number, boolean>>({});
  const ghostTimerRef = useRef<number | null>(null);
  const titleTimersRef = useRef<number[]>([]);
  const countRafsRef = useRef<number[]>([]);
  const countTimersRef = useRef<number[]>([]);

  const setTitleWordRef = useCallback(
    (index: number) => (node: HTMLElement | null) => {
      titleWordRefs.current[index] = node;
    },
    []
  );

  const setCardRef = useCallback(
    (index: number) => (node: HTMLElement | null) => {
      cardRefs.current[index] = node;
    },
    []
  );

  const setChipRef = useCallback(
    (index: number) => (node: HTMLButtonElement | null) => {
      chipRefs.current[index] = node;
    },
    []
  );

  const countUpNode = useCallback(
    (el: HTMLElement) => {
      const target = Number(el.getAttribute("data-count") ?? "0");
      if (prefersReducedMotion) {
        el.textContent = String(target);
        return;
      }

      const stepsAttr = el.getAttribute("data-count-steps");
      if (stepsAttr) {
        const steps = stepsAttr
          .split(",")
          .map((value) => Number(value.trim()))
          .filter((value) => !Number.isNaN(value));

        if (steps.length > 0) {
          const stepDelayMs = 360;
          el.textContent = String(steps[0]);
          steps.slice(1).forEach((value, idx) => {
            const timerId = window.setTimeout(() => {
              el.textContent = String(value);
            }, stepDelayMs * (idx + 1));
            countTimersRef.current.push(timerId);
          });
          return;
        }
      }

      let startTime: number | null = null;
      const duration = 1800;

      const step = (timestamp: number) => {
        if (startTime === null) {
          startTime = timestamp;
        }
        const progress = Math.min(1, (timestamp - startTime) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = String(Math.round(target * eased));
        if (progress < 1) {
          const rafId = window.requestAnimationFrame(step);
          countRafsRef.current.push(rafId);
        }
      };

      const rafId = window.requestAnimationFrame(step);
      countRafsRef.current.push(rafId);
    },
    [prefersReducedMotion]
  );

  const applyActiveChapter = useCallback(
    (nextIdx: number) => {
      if (nextIdx === activeIndexRef.current) {
        return;
      }
      const isInitial = activeIndexRef.current === -1;
      activeIndexRef.current = nextIdx;
      setActiveIndex(nextIdx);

      cardRefs.current.forEach((card, j) => {
        if (!card) {
          return;
        }
        card.classList.toggle("live", j === nextIdx);
        if (j <= nextIdx + 1) {
          card.classList.add("show");
        }
      });

      const rail = railRef.current;
      const activeChip = chipRefs.current[nextIdx];
      if (rail && activeChip && !isInitial) {
        const targetLeft =
          activeChip.offsetLeft -
          (rail.clientWidth - activeChip.offsetWidth) / 2;
        rail.scrollTo({
          left: targetLeft,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      }

      const activeCard = cardRefs.current[nextIdx];
      if (activeCard && !countedRef.current[nextIdx]) {
        countedRef.current[nextIdx] = true;
        activeCard
          .querySelectorAll<HTMLElement>("[data-count]")
          .forEach(countUpNode);
      }

      const ghostEl = ghostRef.current;
      const ghostWord = chapters[nextIdx]?.ghostText ?? "";
      if (ghostEl) {
        if (ghostTimerRef.current !== null) {
          window.clearTimeout(ghostTimerRef.current);
        }
        if (isInitial || prefersReducedMotion) {
          ghostEl.textContent = ghostWord;
          ghostEl.classList.remove("swap");
        } else {
          ghostEl.classList.add("swap");
          ghostTimerRef.current = window.setTimeout(() => {
            ghostEl.textContent = ghostWord;
            ghostEl.classList.remove("swap");
          }, 420);
        }
      }
    },
    [chapters, countUpNode, prefersReducedMotion]
  );

  const goToChapter = useCallback(
    (targetIdx: number) => {
      const deck = deckRef.current;
      const firstCard = cardRefs.current[0];
      const clamped = Math.max(0, Math.min(totalChapters - 1, targetIdx));
      const targetCard = cardRefs.current[clamped];
      if (!deck || !firstCard || !targetCard) {
        return;
      }

      deck.scrollTo({
        left: targetCard.offsetLeft - firstCard.offsetLeft,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    },
    [prefersReducedMotion, totalChapters]
  );

  // Word-by-word headline reveal on IntersectionObserver
  useEffect(() => {
    const titleEl = titleRef.current;
    if (!titleEl || typeof window === "undefined") {
      return;
    }

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      titleWordRefs.current.forEach((w) => w?.classList.add("on"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) {
          return;
        }
        titleWordRefs.current.forEach((wordEl, idx) => {
          const timerId = window.setTimeout(() => {
            wordEl?.classList.add("on");
          }, 90 * idx);
          titleTimersRef.current.push(timerId);
        });
        observer.disconnect();
      },
      { threshold: 0.35 }
    );

    observer.observe(titleEl);

    return () => {
      observer.disconnect();
      titleTimersRef.current.forEach((id) => window.clearTimeout(id));
      titleTimersRef.current = [];
    };
  }, [prefersReducedMotion, titleWordCount]);

  // Deck scroll, tail spacing, keyboard navigation, and mouse drag
  useEffect(() => {
    const deck = deckRef.current;
    if (!deck || typeof window === "undefined") {
      return;
    }

    const updateTail = () => {
      const firstCard = cardRefs.current[0];
      const lastCard = cardRefs.current[totalChapters - 1];
      const endEl = endRef.current;
      if (!firstCard || !lastCard) {
        return;
      }

      const isMobileLayout = window.matchMedia("(max-width: 980px)").matches;
      if (isMobileLayout) {
        if (endEl) {
          endEl.style.width = "0px";
        }
        const pad = firstCard.offsetLeft - deck.offsetLeft;
        const margin = Math.max(
          0,
          deck.clientWidth - lastCard.offsetWidth - pad * 2
        );
        lastCard.style.marginRight = `${margin}px`;
      } else {
        lastCard.style.marginRight = "0px";
        if (endEl) {
          const cs = window.getComputedStyle(deck);
          const padRight = parseFloat(cs.paddingRight) || 0;
          const gap = parseFloat(cs.columnGap) || 20;
          const width = Math.max(
            0,
            deck.clientWidth - lastCard.offsetWidth - padRight - gap
          );
          endEl.style.width = `${width}px`;
        }
      }
    };

    let ticking = false;
    const evaluateScroll = () => {
      ticking = false;
      const firstCard = cardRefs.current[0];
      const secondCard = cardRefs.current[1];
      if (!firstCard || !secondCard) {
        return;
      }

      const step = secondCard.offsetLeft - firstCard.offsetLeft;
      if (step <= 0) {
        return;
      }

      const pos = deck.scrollLeft / step;

      cardRefs.current.forEach((card, j) => {
        if (!card) {
          return;
        }
        if (prefersReducedMotion) {
          card.style.setProperty("--s", "1");
          card.style.setProperty("--o", "1");
          return;
        }
        const d = pos - j;
        const ad = Math.min(1.5, Math.abs(d));
        const scale = (1 - Math.min(1, ad) * 0.05).toFixed(4);
        const opacity = (
          d > 0 ? 1 - Math.min(1, d) * 0.8 : 1 - Math.min(1, ad) * 0.35
        ).toFixed(4);
        card.style.setProperty("--s", scale);
        card.style.setProperty("--o", opacity);
      });

      const progressValue = Math.min(1, (pos + 1) / totalChapters).toFixed(4);
      progDesktopRef.current?.style.setProperty("--p", progressValue);
      progMobileRef.current?.style.setProperty("--p", progressValue);

      if (deck.scrollLeft > 8) {
        hintRef.current?.classList.add("gone");
      }

      const bestIdx = Math.max(
        0,
        Math.min(totalChapters - 1, Math.round(pos))
      );
      applyActiveChapter(bestIdx);
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(evaluateScroll);
      }
    };

    const handleResize = () => {
      updateTail();
      evaluateScroll();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToChapter(activeIndexRef.current + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToChapter(activeIndexRef.current - 1);
      }
    };

    // Mouse drag with floating cursor
    let dragState: {
      x: number;
      left: number;
      moved: boolean;
    } | null = null;

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return;
      }
      const targetEl = event.target as HTMLElement | null;
      const overInteractive = Boolean(targetEl?.closest("a,button"));
      const curEl = dragCurRef.current;
      if (curEl) {
        curEl.style.setProperty("--x", `${event.clientX}px`);
        curEl.style.setProperty("--y", `${event.clientY}px`);
        curEl.classList.toggle("on", !overInteractive || Boolean(dragState));
      }

      if (!dragState) {
        return;
      }
      const dx = event.clientX - dragState.x;
      if (Math.abs(dx) > 4) {
        dragState.moved = true;
        deck.classList.add("drag");
      }
      deck.scrollLeft = dragState.left - dx;
    };

    const handlePointerLeave = () => {
      if (!dragState) {
        dragCurRef.current?.classList.remove("on");
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      const targetEl = event.target as HTMLElement | null;
      if (
        event.pointerType !== "mouse" ||
        event.button !== 0 ||
        targetEl?.closest("a,button")
      ) {
        return;
      }
      dragState = {
        x: event.clientX,
        left: deck.scrollLeft,
        moved: false,
      };
      deck.setPointerCapture(event.pointerId);
      dragCurRef.current?.classList.add("down");
    };

    const endDrag = (event: PointerEvent) => {
      if (!dragState) {
        return;
      }
      const firstCard = cardRefs.current[0];
      const secondCard = cardRefs.current[1];
      const step =
        firstCard && secondCard
          ? secondCard.offsetLeft - firstCard.offsetLeft
          : 1;
      const dx = event.clientX - dragState.x;
      const base = dragState.left / step;
      let target = Math.round(deck.scrollLeft / step);

      if (Math.abs(dx) > 40 && Math.abs(dx) < step / 2) {
        target = Math.round(base) + (dx < 0 ? 1 : -1);
      }

      deck.classList.remove("drag");
      dragCurRef.current?.classList.remove("down");
      dragState = null;
      goToChapter(target);
    };

    updateTail();
    applyActiveChapter(0);
    evaluateScroll();

    const hintTimer = window.setTimeout(() => {
      hintRef.current?.classList.add("gone");
    }, 5200);

    deck.addEventListener("scroll", handleScroll, { passive: true });
    deck.addEventListener("keydown", handleKeyDown);
    deck.addEventListener("pointermove", handlePointerMove);
    deck.addEventListener("pointerleave", handlePointerLeave);
    deck.addEventListener("pointerdown", handlePointerDown);
    deck.addEventListener("pointerup", endDrag);
    deck.addEventListener("pointercancel", endDrag);
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.clearTimeout(hintTimer);
      deck.removeEventListener("scroll", handleScroll);
      deck.removeEventListener("keydown", handleKeyDown);
      deck.removeEventListener("pointermove", handlePointerMove);
      deck.removeEventListener("pointerleave", handlePointerLeave);
      deck.removeEventListener("pointerdown", handlePointerDown);
      deck.removeEventListener("pointerup", endDrag);
      deck.removeEventListener("pointercancel", endDrag);
      window.removeEventListener("resize", handleResize);
    };
  }, [applyActiveChapter, goToChapter, prefersReducedMotion, totalChapters]);

  useEffect(() => {
    const rafs = countRafsRef;
    const timers = countTimersRef;
    return () => {
      if (ghostTimerRef.current !== null) {
        window.clearTimeout(ghostTimerRef.current);
      }
      rafs.current.forEach((id) => window.cancelAnimationFrame(id));
      timers.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return {
    titleRef,
    deckRef,
    railRef,
    endRef,
    ghostRef,
    dragCurRef,
    hintRef,
    progDesktopRef,
    progMobileRef,
    setTitleWordRef,
    setCardRef,
    setChipRef,
    activeIndex,
    goToChapter,
  };
}
