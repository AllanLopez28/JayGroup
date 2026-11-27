"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { ResidentPortalWelcomeContent } from "@/lib/data/residents";
import { siteConfig } from "@/lib/data/site";

export interface ResidentPortalWelcomeProps {
  content: ResidentPortalWelcomeContent;
}

export function ResidentPortalWelcome({ content }: ResidentPortalWelcomeProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const hasActions = Boolean(content.actions?.length);
  const barRef = useRef<HTMLElement | null>(null);
  const doneRef = useRef(false);
  const pausedRef = useRef(false);
  const elapsedRef = useRef(0);
  const lastFrameRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const redirectTimerRef = useRef<number | null>(null);

  const initialSeconds = Math.max(1, Math.ceil(content.durationMs / 1000));
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isPaused, setIsPaused] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const cancelRedirect = useCallback(() => {
    doneRef.current = true;
    if (rafIdRef.current !== null) {
      window.cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    if (redirectTimerRef.current !== null) {
      window.clearTimeout(redirectTimerRef.current);
      redirectTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (hasActions) {
      return;
    }

    doneRef.current = false;
    elapsedRef.current = 0;
    lastFrameRef.current = null;
    pausedRef.current = document.hidden;

    const triggerLeave = () => {
      if (doneRef.current) {
        return;
      }
      doneRef.current = true;
      if (barRef.current) {
        barRef.current.style.transform = "scaleX(1)";
      }
      setIsLeaving(true);
      redirectTimerRef.current = window.setTimeout(
        () => {
          window.location.replace(content.portalUrl);
        },
        prefersReducedMotion ? 0 : 520
      );
    };

    const tick = (timestamp: number) => {
      if (doneRef.current) {
        return;
      }
      if (lastFrameRef.current === null) {
        lastFrameRef.current = timestamp;
      }
      if (!pausedRef.current) {
        elapsedRef.current += timestamp - lastFrameRef.current;
      }
      lastFrameRef.current = timestamp;

      const progress = Math.min(1, elapsedRef.current / content.durationMs);
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      }

      const nextSeconds = Math.max(
        1,
        Math.ceil((content.durationMs - elapsedRef.current) / 1000)
      );
      setSecondsLeft((prev) => (prev === nextSeconds ? prev : nextSeconds));

      if (progress >= 1) {
        triggerLeave();
        return;
      }
      rafIdRef.current = window.requestAnimationFrame(tick);
    };

    rafIdRef.current = window.requestAnimationFrame(tick);

    const handleVisibilityChange = () => {
      const hidden = document.hidden;
      pausedRef.current = hidden;
      setIsPaused(hidden);
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) {
        return;
      }
      cancelRedirect();
      doneRef.current = false;
      elapsedRef.current = 0;
      lastFrameRef.current = null;
      pausedRef.current = document.hidden;
      setIsPaused(document.hidden);
      setIsLeaving(false);
      setSecondsLeft(Math.max(1, Math.ceil(content.durationMs / 1000)));
      rafIdRef.current = window.requestAnimationFrame(tick);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      cancelRedirect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [
    cancelRedirect,
    content.durationMs,
    content.portalUrl,
    hasActions,
    prefersReducedMotion,
  ]);

  return (
    <>
      <main
        className={`wel${isPaused ? " paused" : ""}${isLeaving ? " leaving" : ""}`}
      >
        <div className="wel-bg" aria-hidden="true">
          <Image
            src={content.backgroundImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="wel-bg-img"
          />
        </div>

        <header className="wel-top">
          <Link
            href="/"
            aria-label={siteConfig.logo.ariaLabel}
            onClick={cancelRedirect}
            className="wel-logo-link"
          >
            <Image
              src={siteConfig.logo.src}
              alt={siteConfig.logo.alt}
              width={siteConfig.logo.width}
              height={siteConfig.logo.height}
              priority
              className="wel-logo"
            />
          </Link>

          <Link
            href={content.backHref}
            onClick={cancelRedirect}
            className="wel-back"
          >
            <svg viewBox="0 0 16 10" aria-hidden="true">
              <path d="M15 5H2M6 1L2 5l4 4" />
            </svg>
            <span>{content.backLabel}</span>
          </Link>
        </header>

        <section className="wel-mid" aria-labelledby="wel-heading">
          <div className="wel-kick">{content.kicker}</div>
          <h1 className="wel-h" id="wel-heading">
            <span className="wel-m">
              <span>{content.headlinePrefix}</span>
            </span>{" "}
            <span className="wel-m">
              <span>
                <em>{content.headlineEmphasis}</em>
              </span>
            </span>
          </h1>
          <p className="wel-sub">{content.subtitle}</p>

          {hasActions ? (
            <div className="wel-status">
              <div className="flex flex-wrap items-center gap-4">
                {content.actions!.map((action) => {
                  const className = `btn ${
                    action.variant === "solid" ? "btn-solid" : "btn-outline"
                  }`;

                  return action.external ? (
                    <a
                      key={action.label}
                      href={action.href}
                      className={className}
                    >
                      <span>{action.label}</span>
                      {action.hasArrow && <ArrowIcon className="btn-arrow" />}
                    </a>
                  ) : (
                    <Link
                      key={action.label}
                      href={action.href}
                      className={className}
                    >
                      <span>{action.label}</span>
                      {action.hasArrow && <ArrowIcon className="btn-arrow" />}
                    </Link>
                  );
                })}
              </div>
              {content.note && <p className="wel-note">{content.note}</p>}
            </div>
          ) : (
            <div className="wel-status" role="status" aria-live="polite">
              <div className="wel-st-row">
                <span className="wel-lbl">{content.statusLabel}</span>
                <b>{secondsLeft}</b>
              </div>
              <div className="wel-bar" aria-hidden="true">
                <i ref={barRef} />
              </div>
              <p className="wel-note">{content.note}</p>
            </div>
          )}
        </section>
      </main>
      <div className="wel-veil" aria-hidden="true" />
    </>
  );
}
