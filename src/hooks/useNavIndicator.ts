import { useCallback, useEffect, useRef } from "react";

export interface UseNavIndicatorReturn {
  navRef: React.RefObject<HTMLElement | null>;
  indicatorRef: React.RefObject<HTMLSpanElement | null>;
  setItemRef: (href: string) => (node: HTMLAnchorElement | null) => void;
}

const LG_MEDIA_QUERY = "(min-width: 1024px)";

export function useNavIndicator(activeHref: string): UseNavIndicatorReturn {
  const navRef = useRef<HTMLElement | null>(null);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  const setItemRef = useCallback(
    (href: string) => (node: HTMLAnchorElement | null) => {
      if (node) {
        itemRefs.current.set(href, node);
      } else {
        itemRefs.current.delete(href);
      }
    },
    []
  );

  const updateIndicator = useCallback(() => {
    const indicator = indicatorRef.current;
    const activeNode = itemRefs.current.get(activeHref);
    if (!indicator || !activeNode || typeof window === "undefined") {
      return;
    }

    const isDesktop = window.matchMedia(LG_MEDIA_QUERY).matches;
    if (isDesktop) {
      indicator.style.opacity = "1";
      indicator.style.width = "";
      indicator.style.height = `${activeNode.offsetHeight}px`;
      indicator.style.transform = `translate3d(0, ${activeNode.offsetTop}px, 0)`;
    } else {
      indicator.style.opacity = "1";
      indicator.style.height = "";
      indicator.style.width = `${activeNode.offsetWidth}px`;
      indicator.style.transform = `translate3d(${activeNode.offsetLeft}px, 0, 0)`;
    }
  }, [activeHref]);

  useEffect(() => {
    const navEl = navRef.current;
    if (!navEl || typeof window === "undefined") {
      return;
    }

    const rafId = window.requestAnimationFrame(updateIndicator);

    if (typeof ResizeObserver === "undefined") {
      return () => {
        window.cancelAnimationFrame(rafId);
      };
    }

    const observer = new ResizeObserver(() => {
      updateIndicator();
    });

    observer.observe(navEl);
    const activeNode = itemRefs.current.get(activeHref);
    if (activeNode) {
      observer.observe(activeNode);
    }

    return () => {
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [activeHref, updateIndicator]);

  return {
    navRef,
    indicatorRef,
    setItemRef,
  };
}
