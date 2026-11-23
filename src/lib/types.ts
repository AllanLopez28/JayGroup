export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Building {
  id: string;
  name: string;
  hood: string;
  boro: "Brooklyn" | "Manhattan";
  address: string;
  units: number;
  unitsLabel: string;
  stories: number;
  status: string;
  investment: number; /* millones USD */
  investmentText: string;
  investmentNote?: string;
  tags: string[];
  features: string[];
  url?: string;
  image?: string;
  cutout?: string;
  cutoutAspectRatio?: number;
}

export interface PortfolioStat {
  id: string;
  value: number;
  decimals?: number;
  prefix?: string;
  superscript?: string;
  useSeparator?: boolean;
  displayValue: string;
  label: string;
}

export interface NextProjectSkyline {
  name: string;
  hood: string;
  tagLabel: string;
  year: string;
  statusLabel: string;
  homesLabel: string;
  href: string;
  cutout: string;
  aspectRatio: number;
  lift: number;
}

export interface HeroClip {
  id: string;
  src: string;
  poster?: string;
  buildingId: Building["id"];
}

export interface DirectoryEntry {
  name: string;
  hood: string;
  boro: string;
  category: "res" | "mix" | "dev";
  footnote: string;
  image?: string;
}

export interface RetailSpace {
  name: string;
  hood: string;
  type: string;
  sqft: number;
  status: string;
  statusKind: "done" | "tbd";
  image?: string;
}
