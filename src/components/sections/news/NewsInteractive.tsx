"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type {
  NewsArticle,
  NewsCategory,
  NewsSectionContent,
} from "@/lib/data/news";

export interface NewsInteractiveProps {
  content: NewsSectionContent;
  articles: readonly NewsArticle[];
  mediaEmail: string;
  mediaEmailHref: string;
}

export function NewsInteractive({
  content,
  articles,
  mediaEmail,
  mediaEmailHref,
}: NewsInteractiveProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeFilter, setActiveFilter] = useState<NewsCategory>("all");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const filterTimerRef = useRef<number | null>(null);

  const counts = useMemo(() => {
    const map: Record<NewsCategory, number> = {
      all: articles.length,
      residential: 0,
      commercial: 0,
      sales: 0,
    };
    articles.forEach((article) => {
      map[article.category] += 1;
    });
    return map;
  }, [articles]);

  const featuredArticle = useMemo(
    () => articles.find((article) => article.featured) ?? articles[0],
    [articles]
  );

  const gridArticles = useMemo(
    () => articles.filter((article) => article.slug !== featuredArticle?.slug),
    [articles, featuredArticle]
  );

  const isVisible = useCallback(
    (article: NewsArticle) =>
      activeFilter === "all" || article.category === activeFilter,
    [activeFilter]
  );

  const setItemRef = useCallback(
    (index: number) => (node: HTMLAnchorElement | null) => {
      itemRefs.current[index] = node;
    },
    []
  );

  const handleFilterClick = useCallback(
    (nextFilter: NewsCategory) => {
      if (nextFilter === activeFilter) {
        return;
      }
      if (filterTimerRef.current !== null) {
        window.clearTimeout(filterTimerRef.current);
      }

      if (prefersReducedMotion) {
        setActiveFilter(nextFilter);
        return;
      }

      setIsTransitioning(true);
      filterTimerRef.current = window.setTimeout(() => {
        setActiveFilter(nextFilter);
        window.requestAnimationFrame(() => {
          setIsTransitioning(false);
        });
      }, 240);
    },
    [activeFilter, prefersReducedMotion]
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const titleEl = titleRef.current;
    const cards = itemRefs.current.filter(
      (node): node is HTMLAnchorElement => node !== null
    );

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      titleEl?.classList.add("in");
      cards.forEach((card) => card.classList.add("in"));
      return;
    }

    const cleanupTimers: number[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          const el = entry.target as HTMLElement;
          if (el === titleEl) {
            el.classList.add("in");
            observer.unobserve(el);
            return;
          }

          const idx = Number(el.dataset.revealIdx ?? "0");
          el.style.transitionDelay = `${(idx % 3) * 0.1}s`;
          el.classList.add("in");
          observer.unobserve(el);
          const timerId = window.setTimeout(() => {
            el.style.transitionDelay = "";
          }, 1100);
          cleanupTimers.push(timerId);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );

    if (titleEl) {
      observer.observe(titleEl);
    }
    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
      cleanupTimers.forEach((id) => window.clearTimeout(id));
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    return () => {
      if (filterTimerRef.current !== null) {
        window.clearTimeout(filterTimerRef.current);
      }
    };
  }, []);

  const showFeatured = featuredArticle ? isVisible(featuredArticle) : false;

  return (
    <section
      id={content.sectionId}
      aria-labelledby="newsTitle"
      className="news-section"
    >
      <div className="news-wrap">
        <header className="news-head">
          <div>
            <div className="news-kick">{content.kicker}</div>
            <h2 ref={titleRef} id="newsTitle" className="news-title">
              <span className="m">
                <span>{content.headlinePrefix}</span>
              </span>
              {content.headlineEmphasis ? (
                <>
                  {" "}
                  <span className="m">
                    <span>
                      <em>{content.headlineEmphasis}</em>
                    </span>
                  </span>
                </>
              ) : null}
            </h2>
          </div>

          <div
            className="news-filters"
            role="group"
            aria-label="Filter stories by category"
          >
            {content.filters.map((filter) => {
              const isOn = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={isOn}
                  onClick={() => handleFilterClick(filter.id)}
                  className={isOn ? "on" : ""}
                >
                  {filter.label}
                  <sup>{counts[filter.id]}</sup>
                </button>
              );
            })}
          </div>
        </header>

        {featuredArticle && (
          <Link
            ref={setItemRef(0)}
            href={`/news/${featuredArticle.slug}`}
            data-reveal-idx="0"
            hidden={!showFeatured}
            className={`news-feat news-rv${isTransitioning ? " out" : ""}`}
          >
            <div className="news-ph">
              <Image
                src={featuredArticle.image.src}
                alt={featuredArticle.image.alt}
                fill
                sizes="(max-width: 760px) 100vw, 55vw"
                style={{
                  objectPosition:
                    featuredArticle.image.objectPosition ?? "center",
                }}
                className="news-ph-img"
              />
            </div>

            <div>
              <div className="news-meta">
                <b>{featuredArticle.credit}</b>
                <span className="news-tag">{featuredArticle.buildingTag}</span>
              </div>
              <h3>{featuredArticle.title}</h3>
              <p>{featuredArticle.excerpt}</p>
              <span className="news-read">
                {content.readStoryLabel}
                <i aria-hidden="true">
                  <svg
                    width="16"
                    height="10"
                    viewBox="0 0 16 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  >
                    <path d="M1 5h13M10 1l4 4-4 4" />
                  </svg>
                </i>
              </span>
            </div>
          </Link>
        )}

        <div className="news-grid">
          {gridArticles.map((article, idx) => {
            const visible = isVisible(article);
            return (
              <Link
                key={article.slug}
                ref={setItemRef(idx + 1)}
                href={`/news/${article.slug}`}
                data-reveal-idx={String(idx)}
                hidden={!visible}
                className={`news-card news-rv${isTransitioning ? " out" : ""}`}
              >
                <div className="news-ph">
                  <Image
                    src={article.image.src}
                    alt={article.image.alt}
                    fill
                    sizes="(max-width: 760px) 100vw, (max-width: 1024px) 48vw, 31vw"
                    className="news-ph-img"
                  />
                </div>

                <div className="news-meta">
                  <b>{article.credit}</b>
                  <span className="news-tag">{article.buildingTag}</span>
                </div>

                <div className="news-hl">
                  <h3>{article.title}</h3>
                  <svg
                    className="news-arr"
                    viewBox="0 0 38 12"
                    aria-hidden="true"
                  >
                    <path d="M0 6h36M31 1l5 5-5 5" />
                  </svg>
                </div>

                <p>{article.excerpt}</p>
              </Link>
            );
          })}
        </div>

        <div className="news-foot">
          <span>{content.footerDisclaimer}</span>
          <span>
            {content.mediaInquiryLabel}{" "}
            <a href={mediaEmailHref} className="news-foot-link">
              {mediaEmail}
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}
