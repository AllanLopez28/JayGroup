import { Fragment } from "react";
import type { CSSProperties } from "react";

export interface SplitWordSegment {
  text: string;
  emphasis?: boolean;
  breakAfter?: boolean;
}

export interface SplitWordsProps {
  segments: readonly SplitWordSegment[];
  className?: string;
}

export function SplitWords({ segments, className }: SplitWordsProps) {
  let wordIndex = 0;

  return (
    <h1 className={className}>
      {segments.map((segment, segIdx) => {
        const words = segment.text.trim().split(/\s+/).filter(Boolean);
        const isLastSegment = segIdx === segments.length - 1;

        return (
          <Fragment key={`seg-${segIdx}`}>
            {words.map((word, wIdx) => {
              const currentIndex = wordIndex++;
              const isLastWordInSegment = wIdx === words.length - 1;
              const wordStyle = {
                "--wi": currentIndex,
              } as CSSProperties;

              return (
                <Fragment key={`word-${segIdx}-${wIdx}`}>
                  <span
                    className={`dash-word${segment.emphasis ? " text-cream" : ""}`}
                    style={wordStyle}
                  >
                    <span>{word}</span>
                  </span>
                  {!isLastWordInSegment ||
                  (!isLastSegment && !segment.breakAfter)
                    ? " "
                    : null}
                </Fragment>
              );
            })}
            {segment.breakAfter ? <br /> : null}
          </Fragment>
        );
      })}
    </h1>
  );
}
