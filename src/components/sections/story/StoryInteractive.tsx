"use client";

import { Fragment } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useStoryScroll } from "@/hooks/useStoryScroll";
import type { StoryContent } from "@/lib/data/story";

export interface StoryInteractiveProps {
  content: StoryContent;
}

export function StoryInteractive({ content }: StoryInteractiveProps) {
  const words = content.statement.trim().split(/\s+/);
  const { sectionRef, statementRef, setWordRef } = useStoryScroll(words.length);

  return (
    <section ref={sectionRef} id="story" className="story-section">
      <Container className="story-grid">
        <Eyebrow className="rv">{content.eyebrow}</Eyebrow>

        <div>
          <p ref={statementRef} className="story-statement">
            {words.map((word, index) => (
              <Fragment key={`${word}-${index}`}>
                <span ref={setWordRef(index)} className="story-word">
                  {word}
                </span>
                {index < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </p>

          <div className="story-two">
            {content.columns.map((paragraphs, colIndex) => (
              <div key={`story-col-${colIndex}`} className="rv">
                {paragraphs.map((paragraph, pIndex) => (
                  <p key={`story-p-${colIndex}-${pIndex}`}>{paragraph}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
