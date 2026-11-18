"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BuildingDialog } from "@/components/sections/portfolio/BuildingDialog";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type {
  Building,
  NextProjectSkyline,
  PortfolioStat,
} from "@/lib/types";

export interface PortfolioInteractiveProps {
  eyebrow: string;
  titlePrefix: string;
  titleEmphasis: string;
  description: string;
  desktopHint: string;
  mobileHint: string;
  stats: PortfolioStat[];
  buildings: Building[];
  skylineOrder: readonly Building["id"][];
  nextProject: NextProjectSkyline;
}

function formatStatNumber(
  value: number,
  decimals: number,
  useSeparator: boolean
): string {
  const fixed = value.toFixed(decimals);
  if (!useSeparator) {
    return fixed;
  }
  return fixed.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function PortfolioInteractive({
  eyebrow,
  titlePrefix,
  titleEmphasis,
  description,
  desktopHint,
  mobileHint,
  stats,
  buildings,
  skylineOrder,
  nextProject,
}: PortfolioInteractiveProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [isDimmed, setIsDimmed] = useState(false);
  const [isScrollAtEnd, setIsScrollAtEnd] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [dialogOrigin, setDialogOrigin] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const setStatRef = useCallback(
    (index: number) => (node: HTMLSpanElement | null) => {
      statRefs.current[index] = node;
    },
    []
  );

  const orderedSkyline = skylineOrder
    .map((id) => {
      const indexInAll = buildings.findIndex((b) => b.id === id);
      if (indexInAll === -1) {
        return null;
      }
      return {
        building: buildings[indexInAll],
        indexInAll,
      };
    })
    .filter(
      (item): item is { building: Building; indexInAll: number } =>
        item !== null && Boolean(item.building.cutout)
    );

  const nextColumnFr = (nextProject.aspectRatio * nextProject.lift).toFixed(3);
  const buildingColumnsFr = orderedSkyline
    .map((item) => `${item.building.cutoutAspectRatio ?? 0.6}fr`)
    .join(" ");
  const gridTemplateColumns = `${nextColumnFr}fr 0.16fr ${buildingColumnsFr}`;

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl || typeof window === "undefined") {
      return;
    }

    const checkScrollEnd = () => {
      const atEnd =
        scrollEl.scrollLeft + scrollEl.clientWidth >= scrollEl.scrollWidth - 4;
      setIsScrollAtEnd(atEnd);
    };

    checkScrollEnd();
    scrollEl.addEventListener("scroll", checkScrollEnd, { passive: true });
    window.addEventListener("resize", checkScrollEnd, { passive: true });

    return () => {
      scrollEl.removeEventListener("scroll", checkScrollEnd);
      window.removeEventListener("resize", checkScrollEnd);
    };
  }, []);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl || typeof window === "undefined") {
      return;
    }

    if (prefersReducedMotion) {
      sectionEl.querySelectorAll<HTMLElement>(".rv").forEach((el) => {
        el.classList.remove("wait");
      });
      return;
    }

    const animateStat = (statIndex: number) => {
      const stat = stats[statIndex];
      const node = statRefs.current[statIndex];
      if (!stat || !node) {
        return;
      }

      const decimals = stat.decimals ?? 0;
      const prefix = stat.prefix ?? "";
      const useSep = Boolean(stat.useSeparator);
      let startTime: number | null = null;

      const step = (timestamp: number) => {
        if (startTime === null) {
          startTime = timestamp;
        }
        const progress = Math.min((timestamp - startTime) / 1600, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        node.textContent =
          prefix + formatStatNumber(stat.value * eased, decimals, useSep);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    };

    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.remove("wait");
          const statAttr = entry.target.getAttribute("data-stat-idx");
          if (statAttr !== null) {
            animateStat(Number(statAttr));
          }
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );

    const vh = window.innerHeight;
    sectionEl.querySelectorAll<HTMLElement>(".rv").forEach((el) => {
      if (el.getBoundingClientRect().top > vh) {
        el.classList.add("wait");
        observer.observe(el);
      } else {
        const statAttr = el.getAttribute("data-stat-idx");
        if (statAttr !== null) {
          animateStat(Number(statAttr));
        }
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [prefersReducedMotion, stats]);

  const handleOpenBuilding = (
    indexInAll: number,
    targetEl: HTMLElement | null
  ) => {
    if (typeof window !== "undefined") {
      const rect = targetEl
        ? targetEl.getBoundingClientRect()
        : {
            left: window.innerWidth / 2,
            top: window.innerHeight / 2,
            width: 0,
            height: 0,
          };
      const cx = Math.min(
        Math.max(rect.left + rect.width / 2, 0),
        window.innerWidth
      );
      const cy = Math.min(
        Math.max(rect.top + rect.height / 2, 0),
        window.innerHeight
      );
      setDialogOrigin({ x: cx, y: cy });
    }
    setSelectedIndex(indexInAll);
  };

  const handleNextProjectClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    const targetId = nextProject.href.replace(/^#/, "");
    const nextSection = document.getElementById(targetId);
    if (nextSection) {
      event.preventDefault();
      nextSection.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  const skylineGridStyle = {
    "--tpl": gridTemplateColumns,
  } as React.CSSProperties;

  return (
    <>
      <section
        ref={sectionRef}
        id="figures"
        aria-label="Featured developments"
        className="figs"
      >
        <Container>
          <div className="figs-head rv">
            <div>
              <Eyebrow>{eyebrow}</Eyebrow>
              <h2 className="h-l mt-5">
                {titlePrefix} <em>{titleEmphasis}</em>
              </h2>
            </div>
            <p>{description}</p>
          </div>

          <div className="stats">
            {stats.map((stat, idx) => (
              <div
                key={stat.id}
                data-stat-idx={idx}
                className="stat rv"
              >
                <div className="n">
                  <span ref={setStatRef(idx)}>{stat.displayValue}</span>
                  {stat.superscript && <sup>{stat.superscript}</sup>}
                </div>
                <div className="l">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="sky rv">
            <div className="sky-top">
              <span />
              <span className="sky-hint-d">{desktopHint}</span>
              <span className="sky-hint-m" aria-hidden="true">
                {mobileHint}
              </span>
            </div>

            <div
              ref={scrollRef}
              className={`sky-scroll ${isScrollAtEnd ? "end" : ""}`.trim()}
            >
              <div className="sky-in">
                <div
                  style={skylineGridStyle}
                  className={`sky-row ${isDimmed ? "dim" : ""}`.trim()}
                >
                  {/* Next Project on the far left */}
                  <a
                    href={nextProject.href}
                    aria-label={`${nextProject.name}, ${nextProject.hood}. Our next project, opening ${nextProject.year}. See details`}
                    onClick={handleNextProjectClick}
                    onMouseEnter={() => setIsDimmed(true)}
                    onMouseLeave={() => setIsDimmed(false)}
                    onFocus={() => setIsDimmed(true)}
                    onBlur={() => setIsDimmed(false)}
                    className="bld nx"
                  >
                    <span className="nx-tag">
                      <small>{nextProject.tagLabel}</small>
                      <em>{nextProject.year}</em>
                    </span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={nextProject.cutout}
                      alt=""
                      draggable={false}
                    />
                  </a>

                  {/* Vertical dashed brass divider */}
                  <div className="sky-div" aria-hidden="true" />

                  {/* 6 Featured Buildings */}
                  {orderedSkyline.map(({ building, indexInAll }) => (
                    <button
                      key={building.id}
                      type="button"
                      aria-label={`${building.name}, ${building.hood}. Open details`}
                      onClick={(event) =>
                        handleOpenBuilding(
                          indexInAll,
                          event.currentTarget.querySelector("img")
                        )
                      }
                      onMouseEnter={() => setIsDimmed(true)}
                      onMouseLeave={() => setIsDimmed(false)}
                      onFocus={() => setIsDimmed(true)}
                      onBlur={() => setIsDimmed(false)}
                      className="bld"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={building.cutout}
                        alt=""
                        draggable={false}
                      />
                    </button>
                  ))}
                </div>

                <div className="sky-ground" aria-hidden="true" />

                <div style={skylineGridStyle} className="sky-names">
                  <div className="nx-name">
                    <b>{nextProject.name}</b>
                    <span>
                      {nextProject.statusLabel}
                      <br />
                      {nextProject.homesLabel}
                    </span>
                  </div>

                  <div aria-hidden="true" />

                  {orderedSkyline.map(({ building }) => (
                    <div key={`name-${building.id}`}>
                      <b>{building.name}</b>
                      <span>
                        {building.stories} stories
                        <br />
                        {building.units} units
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <BuildingDialog
        buildings={buildings}
        selectedIndex={selectedIndex}
        origin={dialogOrigin}
        onSelectIndex={setSelectedIndex}
      />
    </>
  );
}
