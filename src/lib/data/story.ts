export interface StoryImage {
  src: string;
  alt: string;
}

export interface StoryChapterNav {
  id: string;
  number: string;
  code: string;
  desktopLabel: string;
  mobileLabel: string;
  ghostText: string;
}

export interface StoryContent {
  kicker: string;
  headlinePrefix: string;
  headlineEmphasis: string;
  chapters: readonly StoryChapterNav[];
  chapter1: {
    ariaLabel: string;
    year: string;
    image: StoryImage;
    badgeCount: number;
    badgeLabel: string;
    tag: string;
    headingPrefix: string;
    headingEmphasis: string;
    body: string;
  };
  chapter2: {
    ariaLabel: string;
    mosaic: readonly [StoryImage, StoryImage, StoryImage];
    tag: string;
    body: string;
    standards: readonly string[];
  };
  chapter3: {
    ariaLabel: string;
    image: StoryImage;
    tag: string;
    headingPrefix: string;
    headingEmphasis: string;
    statCount: number;
    statSteps?: readonly number[];
    statLine1: string;
    statLine2: string;
    body: string;
  };
  chapter4: {
    ariaLabel: string;
    tag: string;
    lead: string;
    quote: string;
    strip: readonly [StoryImage, StoryImage];
    body: string;
  };
  chapter5: {
    ariaLabel: string;
    tag: string;
    statementBefore: string;
    statementEmphasis: string;
    statementAfter: string;
    image: StoryImage;
    ctaLabel: string;
    ctaHref: string;
  };
  resetLabel: string;
}

export const storyContent: StoryContent = {
  kicker: "Our Story · Since 2012",
  headlinePrefix: "From a single brownstone to a full city block on the",
  headlineEmphasis: "waterfront.",
  chapters: [
    {
      id: "2012",
      number: "01",
      code: "2012",
      desktopLabel: "Where it began",
      mobileLabel: "The start",
      ghostText: "2012",
    },
    {
      id: "nyc",
      number: "02",
      code: "NYC",
      desktopLabel: "Across New York City",
      mobileLabel: "The portfolio",
      ghostText: "NYC",
    },
    {
      id: "now",
      number: "03",
      code: "Now",
      desktopLabel: "97 West Street",
      mobileLabel: "97 West St",
      ghostText: "Today",
    },
    {
      id: "why",
      number: "04",
      code: "Why",
      desktopLabel: "What drives us",
      mobileLabel: "Our belief",
      ghostText: "Belief",
    },
    {
      id: "next",
      number: "05",
      code: "Next",
      desktopLabel: "Our commitment",
      mobileLabel: "Excellence",
      ghostText: "Next",
    },
  ],
  chapter1: {
    ariaLabel: "Chapter 1 of 5, 2012",
    year: "2012",
    image: {
      src: "/images/story/construction.jpg",
      alt: "17 Troutman Street, Brooklyn",
    },
    badgeCount: 8,
    badgeLabel: "modern homes",
    tag: "Where it began",
    headingPrefix: "17 Troutman Street,",
    headingEmphasis: "Brooklyn",
    body: "In 2012, The Jay Group transformed a neglected brownstone at 17 Troutman Street in Brooklyn into eight modern residences. That first project set the standard for everything that followed.",
  },
  chapter2: {
    ariaLabel: "Chapter 2 of 5, the portfolio",
    mosaic: [
      {
        src: "/images/story/the-fleet.jpg",
        alt: "102 Fleet Place, Downtown Brooklyn",
      },
      {
        src: "/images/story/401-w-207th-st.webp",
        alt: "401 West 207th Street, Inwood",
      },
      {
        src: "/images/story/210-greenpoint-ave.jpg",
        alt: "210 Greenpoint Avenue, Greenpoint",
      },
    ],
    tag: "Across New York City",
    body: "Over the years, our work has expanded into a portfolio of residential and mixed-use developments throughout New York City. Whether revitalizing overlooked properties or reimagining complex sites as thriving destinations, we hold every project to the same standard:",
    standards: [
      "Quality",
      "Thoughtful design",
      "Meticulous execution",
      "Long-term value",
    ],
  },
  chapter3: {
    ariaLabel: "Chapter 3 of 5, 97 West Street",
    image: {
      src: "/images/story/97-west-st-empire.webp",
      alt: "Two towers at 97 West Street framing the Empire State Building, rendering",
    },
    tag: "Today",
    headingPrefix: "Reaching new heights at 97 West Street,",
    headingEmphasis: "Greenpoint",
    statCount: 800,
    statSteps: [100, 200, 600, 800],
    statLine1: "rental residences",
    statLine2: "on the East River",
    body: "Envisioned as a landmark development on the Greenpoint waterfront, across two towers overlooking the Manhattan skyline.",
  },
  chapter4: {
    ariaLabel: "Chapter 4 of 5, what drives us",
    tag: "What drives us",
    lead: "From eight homes to an entirely new waterfront destination, our journey reflects a simple belief:",
    quote: "great development goes beyond building structures.",
    strip: [
      {
        src: "/images/story/401_W_207th_St_Living_Dining_6_Correctecd_3.jpg",
        alt: "401 West 207th Street, Living & Dining interior",
      },
      {
        src: "/images/story/401_W_207th_St_Living_Dining_7_Corrected (1).jpg",
        alt: "401 West 207th Street, Living & Dining view",
      },
    ],
    body: "It means creating meaningful places, strengthening communities, and delivering quality that stands the test of time.",
  },
  chapter5: {
    ariaLabel: "Chapter 5 of 5, our commitment",
    tag: "Our commitment",
    statementBefore: "Every project is an opportunity to build something",
    statementEmphasis: "exceptional",
    statementAfter: "and every detail reflects our commitment to excellence.",
    image: {
      src: "/images/story/97-west-st-waterfront.webp",
      alt: "Twin towers above the Greenpoint waterfront, rendering",
    },
    ctaLabel: "View our portfolio",
    ctaHref: "#figures",
  },
  resetLabel: "Back to 2012",
};
