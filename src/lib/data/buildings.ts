import type { Building } from "@/lib/types";

export const buildings: Building[] = [
  {
    id: "99-fleet",
    name: "99 Fleet Place",
    hood: "Downtown Brooklyn",
    boro: "Brooklyn",
    address: "99 Fleet Place, Brooklyn, NY",
    units: 294,
    unitsLabel: "Units",
    stories: 21,
    status: "Completed",
    investment: 160,
    investmentText: "$160M",
    investmentNote: "Financing secured · Affinius Capital · 2024",
    tags: ["Young professionals", "Couples", "Families"],
    features: [
      "Mixed-use, with ground-floor commercial space",
      "Near the DeKalb Av station (B, Q, R)",
    ],
    url: "https://99fleetnyc.com",
  },
  {
    id: "the-fleet",
    name: "The Fleet Brooklyn",
    hood: "Downtown Brooklyn",
    boro: "Brooklyn",
    address: "102 Fleet Place, Brooklyn, NY",
    units: 495,
    unitsLabel: "Units",
    stories: 30,
    status: "Now leasing",
    investment: 300,
    investmentText: "$300M",
    investmentNote: "Refinancing · Affinius Capital · 2026",
    tags: ["Professionals", "Couples", "Families"],
    features: [
      "Rooftop pool, gym and coworking space",
      "Pet spa, indoor climbing wall and pickleball courts",
      "108 studios · 97 one-bed · 262 two-bed · 28 three-bed",
    ],
    url: "https://www.thefleetbk.com/",
  },
];

export function getBuildingById(id: Building["id"]): Building | undefined {
  return buildings.find((building) => building.id === id);
}
