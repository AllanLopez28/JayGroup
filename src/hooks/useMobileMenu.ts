import { useCallback, useEffect, useRef, useState } from "react";

export interface UseMobileMenuReturn {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  burgerRef: React.RefObject<HTMLButtonElement | null>;
  firstLinkRef: React.RefObject<HTMLAnchorElement | null>;
}

const LG_MEDIA_QUERY = "(min-width: 1024px)";

export function useMobileMenu(): UseMobileMenuReturn {
  const [isOpen, setIsOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const wasOpenRef = useRef(false);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(LG_MEDIA_QUERY);
    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleBreakpointChange);
    return () => {
      mediaQuery.removeEventListener("change", handleBreakpointChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!isOpen) {
      if (wasOpenRef.current) {
        wasOpenRef.current = false;
        burgerRef.current?.focus();
      }
      return;
    }

    wasOpenRef.current = true;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const focusTimer = window.requestAnimationFrame(() => {
      firstLinkRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [isOpen]);

  return {
    isOpen,
    toggle,
    close,
    burgerRef,
    firstLinkRef,
  };
}
