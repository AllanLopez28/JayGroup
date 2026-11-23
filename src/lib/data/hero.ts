import { siteConfig } from "@/lib/data/site";
import type { HeroClip, NavItem } from "@/lib/types";

export const heroClips: HeroClip[] = [
  {
    id: "the-fleet-01",
    src: "/videos/TheFleetBrooklyn.mp4",
    buildingId: "the-fleet",
  },
  {
    id: "99-fleet-01",
    src: "/videos/99FleetPl.mp4",
    buildingId: "99-fleet",
  },
  {
    id: "the-fleet-02",
    src: "/videos/TheFleetBrooklyn0.mp4",
    buildingId: "the-fleet",
  },
];

export const heroContent = {
  headline: {
    line1Bold: "Built",
    line1Italic: "for",
    line2Italic: "New",
    line2Bold: "YORK.",
  },
  description: siteConfig.description,
  primaryCta: {
    label: "View Portfolio",
    href: "#figures",
  } satisfies NavItem,
  secondaryCta: {
    label: "Brokers",
    href: "/broker-portal",
  } satisfies NavItem,
  scrollTarget: "#story",
} as const;
