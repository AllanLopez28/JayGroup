export interface NavItem {
  label: string;
  href: string;
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
