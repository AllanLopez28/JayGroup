export interface StoryContent {
  eyebrow: string;
  statement: string;
  columns: readonly [readonly string[], readonly string[]];
}

export const storyContent: StoryContent = {
  eyebrow: "Our Story · Since 2011",
  statement:
    "From a single brownstone to a full city block on the waterfront.",
  columns: [
    [
      "In 2012, The Jay Group transformed a neglected brownstone at 17 Troutman Street in Brooklyn into eight modern residences. That first project set the standard for everything that followed.",
      "Over the years, our work has expanded into a portfolio of residential and mixed-use developments throughout New York City. Whether revitalizing overlooked properties or reimagining complex sites as thriving destinations, we hold every project to the same standard: quality, thoughtful design, meticulous execution, and long-term value.",
    ],
    [
      "Today, we are reaching new heights at 97 West Street on the Greenpoint waterfront. Envisioned as a landmark development, it will bring 590 rental residences to the East River across two towers overlooking the Manhattan skyline.",
      "From eight homes to an entirely new waterfront destination, our journey reflects a simple belief: great development goes beyond building structures. It means creating meaningful places, strengthening communities, and delivering quality that stands the test of time.",
      "Every project is an opportunity to build something exceptional, and every detail reflects our commitment to excellence.",
    ],
  ],
};
