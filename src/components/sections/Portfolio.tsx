import { PortfolioInteractive } from "@/components/sections/portfolio/PortfolioInteractive";
import {
  buildings,
  nextProjectSkyline,
  portfolioContent,
  portfolioStats,
  skylineOrder,
} from "@/lib/data/buildings";

export function Portfolio() {
  return (
    <PortfolioInteractive
      eyebrow={portfolioContent.eyebrow}
      titlePrefix={portfolioContent.titlePrefix}
      titleEmphasis={portfolioContent.titleEmphasis}
      description={portfolioContent.description}
      desktopHint={portfolioContent.desktopHint}
      mobileHint={portfolioContent.mobileHint}
      stats={portfolioStats}
      buildings={buildings}
      skylineOrder={skylineOrder}
      nextProject={nextProjectSkyline}
    />
  );
}
