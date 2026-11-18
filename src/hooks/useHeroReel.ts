import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { Building, HeroClip } from "@/lib/types";

export interface ResolvedHeroClip extends HeroClip {
  building: Building;
}

export interface UseHeroReelReturn {
  sectionRef: React.RefObject<HTMLElement | null>;
  setVideoRef: (index: number) => (node: HTMLVideoElement | null) => void;
  setProgressRef: (index: number) => (node: HTMLSpanElement | null) => void;
  activeIndex: number;
  isPlaying: boolean;
  preloadedUpTo: number;
  prefersReducedMotion: boolean;
  hasBuildingChanged: boolean;
  selectClip: (index: number) => void;
  togglePlay: () => void;
  handleTimeUpdate: (index: number) => void;
  handleEnded: (index: number) => void;
  handleError: (index: number) => void;
}

const CROSSFADE_LEAD_SECONDS = 1.4;
const CROSSFADE_DURATION_MS = 1400;

export function useHeroReel(clips: ResolvedHeroClip[]): UseHeroReelReturn {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousBuildingId, setPreviousBuildingId] = useState<string>(
    clips[0]?.building.id ?? ""
  );
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const [preloadedUpTo, setPreloadedUpTo] = useState(0);
  const [isInView, setIsInView] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);

  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const progressRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rafIdRef = useRef<number | null>(null);
  const pauseTimerRef = useRef<number | null>(null);
  const transitioningRef = useRef(false);
  const activeIndexRef = useRef(0);

  const isPausedByUser = userPaused ?? prefersReducedMotion;
  const shouldPlay = !isPausedByUser && isInView && isTabVisible;

  const setVideoRef = useCallback(
    (index: number) => (node: HTMLVideoElement | null) => {
      videoRefs.current[index] = node;
    },
    []
  );

  const setProgressRef = useCallback(
    (index: number) => (node: HTMLSpanElement | null) => {
      progressRefs.current[index] = node;
    },
    []
  );

  const updateProgressDom = useCallback((currentActive: number) => {
    const activeVideo = videoRefs.current[currentActive];
    const duration = activeVideo?.duration ?? 0;
    const currentTime = activeVideo?.currentTime ?? 0;
    const ratio =
      Number.isFinite(duration) && duration > 0
        ? Math.min(1, Math.max(0, currentTime / duration))
        : 0;

    progressRefs.current.forEach((bar, idx) => {
      if (!bar) {
        return;
      }
      if (idx < currentActive) {
        bar.style.transform = "scaleX(1)";
      } else if (idx > currentActive) {
        bar.style.transform = "scaleX(0)";
      } else {
        bar.style.transform = `scaleX(${ratio.toFixed(4)})`;
      }
    });
  }, []);

  const switchToClip = useCallback(
    (nextIndex: number) => {
      if (clips.length === 0) {
        return;
      }
      const normalized =
        ((nextIndex % clips.length) + clips.length) % clips.length;
      const currentIdx = activeIndexRef.current;
      if (normalized === currentIdx && !transitioningRef.current) {
        return;
      }

      transitioningRef.current = true;
      const currentBuildingId = clips[currentIdx]?.building.id ?? "";
      setPreviousBuildingId(currentBuildingId);
      activeIndexRef.current = normalized;
      setActiveIndex(normalized);
      setPreloadedUpTo((prev) => Math.max(prev, normalized));

      const outgoingVideo = videoRefs.current[currentIdx];
      const nextVideo = videoRefs.current[normalized];
      if (nextVideo) {
        try {
          nextVideo.currentTime = 0;
        } catch {
          // Ignore seek errors before metadata is loaded.
        }
        if (!isPausedByUser && isInView && isTabVisible) {
          const playPromise = nextVideo.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {});
          }
        }
      }

      if (pauseTimerRef.current !== null) {
        window.clearTimeout(pauseTimerRef.current);
      }
      pauseTimerRef.current = window.setTimeout(() => {
        if (outgoingVideo && activeIndexRef.current !== currentIdx) {
          outgoingVideo.pause();
        }
        transitioningRef.current = false;
        pauseTimerRef.current = null;
      }, CROSSFADE_DURATION_MS + 100);

      updateProgressDom(normalized);
    },
    [clips, isInView, isPausedByUser, isTabVisible, updateProgressDom]
  );

  const selectClip = useCallback(
    (index: number) => {
      transitioningRef.current = false;
      switchToClip(index);
    },
    [switchToClip]
  );

  const togglePlay = useCallback(() => {
    setUserPaused((prev) => {
      const currentPaused = prev ?? prefersReducedMotion;
      return !currentPaused;
    });
  }, [prefersReducedMotion]);

  const handleTimeUpdate = useCallback(
    (index: number) => {
      if (index !== activeIndexRef.current) {
        return;
      }
      const video = videoRefs.current[index];
      if (!video) {
        return;
      }
      const { currentTime, duration } = video;
      if (!Number.isFinite(duration) || duration <= 0) {
        return;
      }

      if (currentTime >= duration * 0.5) {
        setPreloadedUpTo((prev) =>
          Math.max(prev, Math.min(clips.length - 1, index + 1))
        );
      }

      if (
        !transitioningRef.current &&
        duration > CROSSFADE_LEAD_SECONDS * 1.5 &&
        duration - currentTime <= CROSSFADE_LEAD_SECONDS
      ) {
        switchToClip((index + 1) % clips.length);
      }
    },
    [clips.length, switchToClip]
  );

  const handleEnded = useCallback(
    (index: number) => {
      if (index !== activeIndexRef.current) {
        return;
      }
      switchToClip((index + 1) % clips.length);
    },
    [clips.length, switchToClip]
  );

  const handleError = useCallback(
    (index: number) => {
      if (index === activeIndexRef.current && clips.length > 1) {
        switchToClip((index + 1) % clips.length);
      }
    },
    [clips.length, switchToClip]
  );

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsInView(entry.isIntersecting);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) {
        return;
      }
      if (idx === activeIndex && shouldPlay) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      } else if (!shouldPlay) {
        video.pause();
      }
    });
  }, [activeIndex, shouldPlay]);

  useEffect(() => {
    return () => {
      if (pauseTimerRef.current !== null) {
        window.clearTimeout(pauseTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    updateProgressDom(activeIndex);

    if (!shouldPlay) {
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      return;
    }

    const tick = () => {
      updateProgressDom(activeIndexRef.current);
      rafIdRef.current = window.requestAnimationFrame(tick);
    };

    rafIdRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [activeIndex, shouldPlay, updateProgressDom]);

  const currentBuildingId = clips[activeIndex]?.building.id ?? "";
  const hasBuildingChanged = currentBuildingId !== previousBuildingId;

  return {
    sectionRef,
    setVideoRef,
    setProgressRef,
    activeIndex,
    isPlaying: shouldPlay,
    preloadedUpTo,
    prefersReducedMotion,
    hasBuildingChanged,
    selectClip,
    togglePlay,
    handleTimeUpdate,
    handleEnded,
    handleError,
  };
}
