"use client";

import type { ReactNode } from "react";
import { HeroLocation } from "@/components/sections/hero/HeroLocation";
import { Container } from "@/components/ui/Container";
import { type ResolvedHeroClip, useHeroReel } from "@/hooks/useHeroReel";

export interface HeroReelProps {
  clips: ResolvedHeroClip[];
  children: ReactNode;
}

export function HeroReel({ clips, children }: HeroReelProps) {
  const {
    sectionRef,
    setVideoRef,
    setProgressRef,
    activeIndex,
    isPlaying,
    preloadedUpTo,
    prefersReducedMotion,
    hasBuildingChanged,
    selectClip,
    togglePlay,
    handleTimeUpdate,
    handleEnded,
    handleError,
  } = useHeroReel(clips);

  const activeClip = clips[activeIndex] ?? clips[0];

  return (
    <section
      ref={sectionRef}
      aria-label="Introduction"
      className="relative flex min-h-[max(620px,100svh)] flex-col justify-between overflow-hidden bg-night"
    >
      {/* Background video layer */}
      <div className="absolute inset-0">
        {clips.map((clip, index) => {
          const isActive = index === activeIndex;
          const preloadMode =
            index <= preloadedUpTo ? "auto" : "metadata";

          return (
            <video
              key={clip.id}
              ref={setVideoRef(index)}
              src={clip.src}
              poster={clip.poster}
              muted
              playsInline
              autoPlay={index === 0 && !prefersReducedMotion}
              preload={preloadMode}
              disablePictureInPicture
              aria-hidden="true"
              onTimeUpdate={() => handleTimeUpdate(index)}
              onEnded={() => handleEnded(index)}
              onError={() => handleError(index)}
              className={`absolute inset-0 block h-full w-full object-cover object-center transition-opacity duration-[1400ms] ease-soft ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            />
          );
        })}
      </div>

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        className="hero-overlay pointer-events-none absolute inset-0"
      />

      {/* Top row: building title on the top-right beneath the navbar */}
      <Container className="relative z-10 flex w-full justify-end pt-[108px] sm:pt-[124px]">
        {activeClip && (
          <HeroLocation
            building={activeClip.building}
            activeIndex={activeIndex}
            totalClips={clips.length}
            isPlaying={isPlaying}
            hasBuildingChanged={hasBuildingChanged}
            onSelectClip={selectClip}
            onTogglePlay={togglePlay}
            setProgressRef={setProgressRef}
          />
        )}
      </Container>

      {/* Bottom row: server-rendered hero headline, copy, CTA, and scroll cue */}
      <Container className="hero-meta-safe relative z-10 w-full pt-10">
        {children}
      </Container>
    </section>
  );
}
