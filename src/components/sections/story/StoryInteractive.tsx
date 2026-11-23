"use client";

import { Fragment } from "react";
import { useStoryCarousel } from "@/hooks/useStoryScroll";
import type { StoryContent } from "@/lib/data/story";

export interface StoryInteractiveProps {
  content: StoryContent;
}

export function StoryInteractive({ content }: StoryInteractiveProps) {
  const prefixWords = content.headlinePrefix.trim().split(/\s+/);
  const totalTitleWords = prefixWords.length + 1;
  const quoteWords = content.chapter4.quote.trim().split(/\s+/);
  const totalChapters = content.chapters.length;

  const {
    titleRef,
    deckRef,
    railRef,
    endRef,
    setTitleWordRef,
    setCardRef,
    setChipRef,
    activeIndex,
    goToChapter,
  } = useStoryCarousel(content.chapters, totalTitleWords);

  return (
    <section
      id="story"
      aria-labelledby="storyTitle"
      className="story-section"
    >
      {/* Left column / Header aside */}
      <div className="story-aside">
        <div>
          <div className="story-kicker">{content.kicker}</div>
          <h2 ref={titleRef} id="storyTitle" className="story-title">
            {prefixWords.map((word, idx) => {
              const isItalicAccent =
                content.headlineItalicWord !== undefined &&
                word.toLowerCase() ===
                  content.headlineItalicWord.toLowerCase();
              return (
                <Fragment key={`title-w-${idx}`}>
                  {isItalicAccent ? (
                    <em ref={setTitleWordRef(idx)} className="w story-em-ink">
                      {word}
                    </em>
                  ) : (
                    <span ref={setTitleWordRef(idx)} className="w">
                      {word}
                    </span>
                  )}{" "}
                </Fragment>
              );
            })}
            <em ref={setTitleWordRef(prefixWords.length)} className="w">
              {content.headlineEmphasis}
            </em>
          </h2>
        </div>

        {/* Desktop chapter index */}
        <nav aria-label="Story chapters">
          <ol className="story-index">
            {content.chapters.map((chapter, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <li key={chapter.id}>
                  <button
                    type="button"
                    aria-current={isCurrent ? "step" : undefined}
                    onClick={() => goToChapter(idx)}
                    className={isCurrent ? "on" : ""}
                  >
                    <span className="k">{chapter.code}</span>
                    <span className="t">{chapter.desktopLabel}</span>
                    <svg
                      className="a"
                      viewBox="0 0 16 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.4}
                      aria-hidden="true"
                    >
                      <path d="M1 5h13M10 1l4 4-4 4" />
                    </svg>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Mobile chapter pill rail */}
        <nav
          ref={railRef}
          aria-label="Story chapters"
          className="story-rail"
        >
          {content.chapters.map((chapter, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <button
                key={`rail-${chapter.id}`}
                ref={setChipRef(idx)}
                type="button"
                aria-current={isCurrent ? "step" : undefined}
                onClick={() => goToChapter(idx)}
                className={isCurrent ? "on" : ""}
              >
                <b>{chapter.code}</b>
                <span>{chapter.mobileLabel}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Right column: 5-card horizontal snap deck */}
      <div className="story-deck-wrap">
        <div
          ref={deckRef}
          tabIndex={0}
          aria-roledescription="carousel"
          aria-label="Our story"
          className="story-deck"
        >
          {/* Card 1: 2012 · 17 Troutman Street */}
          <article
            ref={setCardRef(0)}
            aria-label={content.chapter1.ariaLabel}
            className="story-card story-c1 live show"
          >
            <div className="story-ph">
              <div className="yr" aria-hidden="true">
                {content.chapter1.year}
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={content.chapter1.image.src}
                alt={content.chapter1.image.alt}
                draggable={false}
              />
            </div>

            <div className="story-c-body">
              <div className="story-c-tag in">{content.chapter1.tag}</div>
              <h3 className="story-c-h in">
                {content.chapter1.headingPrefix}{" "}
                <em>{content.chapter1.headingEmphasis}</em>
              </h3>
              <p className="story-c-p in">{content.chapter1.body}</p>
            </div>
          </article>

          {/* Card 2: Across New York City */}
          <article
            ref={setCardRef(1)}
            aria-label={content.chapter2.ariaLabel}
            className="story-card story-c2 show"
          >
            <div className="mosaic">
              {content.chapter2.mosaic.map((img) => (
                <div key={img.src} className="story-ph">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
            <div className="story-c-body">
              <div className="story-c-tag in">{content.chapter2.tag}</div>
              <p className="story-c-p in">{content.chapter2.body}</p>
            </div>
          </article>

          {/* Card 3: Today · 97 West Street */}
          <article
            ref={setCardRef(2)}
            aria-label={content.chapter3.ariaLabel}
            className="story-card story-c3"
          >
            <div className="story-ph">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={content.chapter3.image.src}
                alt={content.chapter3.image.alt}
                loading="lazy"
                draggable={false}
              />
            </div>
            <div className="story-c-body">
              <div className="story-c-tag in">{content.chapter3.tag}</div>
              <h3 className="story-c-h in">
                {content.chapter3.headingPrefix}{" "}
                <em>{content.chapter3.headingEmphasis}</em>
              </h3>
              <div className="story-big in">
                <b
                  data-count={content.chapter3.statCount}
                  data-count-steps={content.chapter3.statSteps?.join(",")}
                >
                  {content.chapter3.statCount}
                </b>
                <span>
                  {content.chapter3.statLine1}
                  <br />
                  {content.chapter3.statLine2}
                </span>
              </div>
              <p className="story-c-p in">{content.chapter3.body}</p>
            </div>
          </article>

          {/* Card 4: What drives us */}
          <article
            ref={setCardRef(3)}
            aria-label={content.chapter4.ariaLabel}
            className="story-card story-c4"
          >
            <div className="story-c-body">
              <div className="story-c-tag in">{content.chapter4.tag}</div>
              
              <p className="quote">
                {quoteWords.map((word, idx) => (
                  <Fragment key={`quote-w-${idx}`}>
                    <span
                      className="w"
                      style={{
                        transitionDelay: `${(0.18 + idx * 0.06).toFixed(2)}s`,
                      }}
                    >
                      {word}
                    </span>
                    {idx < quoteWords.length - 1 ? " " : null}
                  </Fragment>
                ))}
              </p>
              <div className="strip in">
                {content.chapter4.strip.map((img) => (
                  <div key={img.src} className="story-ph">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
              <p className="story-c-p in">{content.chapter4.body}</p>
            </div>
          </article>

          {/* Card 5: Our commitment */}
          <article
            ref={setCardRef(4)}
            aria-label={content.chapter5.ariaLabel}
            className="story-card story-c5"
          >
            <div className="story-c-body">
              <div className="story-c-tag in">{content.chapter5.tag}</div>
              <p className="close in">
                {content.chapter5.statementBefore}{" "}
                <em>{content.chapter5.statementEmphasis}</em>{" "}
              </p>
            </div>
            <div className="story-c5-media">
              <div className="story-ph">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={content.chapter5.image.src}
                  alt={content.chapter5.image.alt}
                  loading="lazy"
                  draggable={false}
                />
              </div>
            </div>
          </article>

          {/* End of deck reset button (desktop) */}
          <div
            ref={endRef}
            className={`story-end ${
              activeIndex === totalChapters - 1 ? "on" : ""
            }`.trim()}
          >
            <button
              type="button"
              className="story-again"
              onClick={() => goToChapter(0)}
            >
              <span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 12a8 8 0 1 0 2.6-5.9M4 4v4.5h4.5" />
                </svg>
              </span>
              {content.resetLabel}
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}
