import Link from "next/link";
import { HeroReel } from "@/components/sections/hero/HeroReel";
import { Button } from "@/components/ui/Button";
import type { ResolvedHeroClip } from "@/hooks/useHeroReel";
import { buildings, getBuildingById } from "@/lib/data/buildings";
import { heroClips, heroContent } from "@/lib/data/hero";
import { headerCta } from "@/lib/data/site";

export function Hero() {
  const fallbackBuilding = buildings[0];
  const resolvedClips: ResolvedHeroClip[] = heroClips
    .map((clip) => {
      const building = getBuildingById(clip.buildingId) ?? fallbackBuilding;
      if (!building) {
        return null;
      }
      return {
        ...clip,
        building,
      };
    })
    .filter((clip): clip is ResolvedHeroClip => clip !== null);

  return (
    <HeroReel clips={resolvedClips}>
      <div className="grid grid-cols-1 gap-y-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-x-10">
        <div>
          <h1 className="hero-h1">
            <span className="hero-line">
              <span className="hero-line-inner">
                <span className="hero-anton">
                  {heroContent.headline.line1Bold}
                </span>{" "}
                <em>{heroContent.headline.line1Italic}</em>
              </span>
            </span>
            <span className="hero-line">
              <span className="hero-line-inner hero-line-delay">
                <em>{heroContent.headline.line2Italic}</em>{" "}
                <span className="hero-anton">
                  {heroContent.headline.line2Bold}
                </span>
              </span>
            </span>
          </h1>

          <div className="hero-fade mt-5 max-w-[460px]">
            <p className="hero-lead">{heroContent.description}</p>
          </div>
        </div>

        <div className="hero-fade flex flex-col items-start justify-end gap-5 md:items-end">
          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            <Button href={heroContent.secondaryCta.href} variant="outline">
              {heroContent.secondaryCta.label}
            </Button>
            <Button href={headerCta.href} variant="outline" withArrow>
              {headerCta.label}
            </Button>
          </div>

          <Link
            href={heroContent.scrollTarget}
            className="inline-flex items-center gap-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-fog transition-colors hover:text-mist"
          >
            <span aria-hidden="true" className="scroll-cue-line !h-4" />
            <span>Scroll</span>
          </Link>
        </div>
      </div>
    </HeroReel>
  );
}
