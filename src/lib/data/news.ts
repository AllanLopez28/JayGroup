export type NewsCategory = "all" | "residential" | "commercial" | "sales";

export interface NewsFilterOption {
  id: NewsCategory;
  label: string;
}

export interface NewsArticle {
  slug: string;
  category: Exclude<NewsCategory, "all">;
  categoryLabel: string;
  buildingTag: string;
  neighborhood: string;
  featured?: boolean;
  title: string;
  excerpt: string;
  author?: string;
  publication: string;
  credit: string;
  date: string;
  image: {
    src: string;
    alt: string;
    objectPosition?: string;
  };
  body: readonly string[];
  externalUrl: string;
}

export interface NewsSectionContent {
  sectionId: string;
  kicker: string;
  headlinePrefix: string;
  headlineEmphasis: string;
  readStoryLabel: string;
  readFullArticleLabel: string;
  backToNewsLabel: string;
  moreNewsTitle: string;
  footerDisclaimer: string;
  mediaInquiryLabel: string;
  filters: readonly NewsFilterOption[];
}

export const newsSectionContent: NewsSectionContent = {
  sectionId: "news",
  kicker: "Press",
  headlinePrefix: "News",
  headlineEmphasis: "",
  readStoryLabel: "Read the story",
  readFullArticleLabel: "Read Full Article",
  backToNewsLabel: "Back to news",
  moreNewsTitle: "More press",
  footerDisclaimer:
    "Coverage from independent publications. Original articles open on the publisher’s site.",
  mediaInquiryLabel: "Media inquiries:",
  filters: [
    { id: "all", label: "All" },
    { id: "residential", label: "Residential" },
    { id: "commercial", label: "Commercial" },
    { id: "sales", label: "Sales" },
  ],
};

export const newsArticles: readonly NewsArticle[] = [
  {
    slug: "affinius-300m-refi-102-fleet",
    category: "residential",
    categoryLabel: "Residential",
    buildingTag: "102 Fleet",
    neighborhood: "Downtown Brooklyn",
    featured: true,
    title:
      "Affinius Provides $300M to Refi 102 Fleet Street in Downtown Brooklyn",
    excerpt:
      "The $300 million loan will carry the 495-unit Downtown Brooklyn tower through completion and lease-up.",
    author: "Brian Pascus",
    publication: "Commercial Observer",
    credit: "Brian Pascus | Commercial Observer",
    date: "March 24, 2026",
    image: {
      src: "/images/story/102-fleet-place.webp",
      alt: "102 Fleet Place residential tower in Downtown Brooklyn",
      objectPosition: "50% 22%",
    },
    body: [
      "The Jay Group has secured a $300 million loan from Affinius Capital to refinance 102 Fleet, a 30-story, 495-unit luxury rental tower off Flatbush Avenue Extension in Downtown Brooklyn. The proceeds will fund the remaining construction and carry the property through lease-up to stabilization. Henry Bodek of Galaxy Capital arranged the financing.",
      "The tower offers 108 studios, 97 one-bedrooms, 262 two-bedrooms and 28 three-bedrooms, along with 3,700 square feet of ground-floor retail. Amenities include a rooftop pool, a fitness center, coworking space, a pet spa, an indoor climbing wall and pickleball courts.",
      "The deal marks the fourth financing between Affinius and The Jay Group, which acquired the site in 2024 for $62.5 million. Affinius senior vice president Perry Katz pointed to the building's amenities, its \"ideal Downtown Brooklyn location\" and the sponsor's experience. Across the street, The Jay Group recently completed 101 Fleet Place, a 21-story, 294-unit rental building.",
    ],
    externalUrl: "https://commercialobserver.com/?p=564318",
  },
  {
    slug: "morgan-stanley-130m-refi-inwood-living",
    category: "residential",
    categoryLabel: "Residential",
    buildingTag: "Inwood Living",
    neighborhood: "Inwood",
    title:
      "Jay Group, partners sign $130M refi with Morgan Stanley for 273-unit rental in Inwood",
    excerpt:
      "One year after completion, Inwood Living moves from construction debt to a $130 million refinancing from Morgan Stanley.",
    publication: "PincusCo",
    credit: "PincusCo",
    date: "June 25, 2026",
    image: {
      src: "/images/story/401-w-207th-st.webp",
      alt: "Inwood Living residential building at 3880 Ninth Avenue in Upper Manhattan",
    },
    body: [
      "The Jay Group and partners Jacob Aini and Paul Gagliardi have closed a $130 million refinancing from Morgan Stanley for Inwood Living, a 273-unit rental building at 3880 Ninth Avenue in Upper Manhattan. The loan closed on June 15, 2026.",
      "The loan was placed in the BANK5 2026-5YR23 commercial mortgage securitization. According to its offering documents, the property was appraised at $198 million as of March 2026, a 65.7 percent loan-to-value ratio. Proceeds repaid $111.1 million of existing debt and returned $13.3 million of equity to the sponsors.",
      "Completed in June 2025, Inwood Living sits steps from the 207th Street station on the 1 train. Its ground-floor commercial space is leased to Crunch Fitness, Ponce Bank, Dyckman Beer Company and Golden Era Day Care.",
    ],
    externalUrl:
      "https://www.pincusco.com/jay-group-partners-sign-130m-refi-with-morgan-stanley-for-273-unit-rental-in-inwood/",
  },
  {
    slug: "dyckman-beer-company-inwood-living",
    category: "commercial",
    categoryLabel: "Commercial",
    buildingTag: "Inwood Living",
    neighborhood: "Inwood",
    title: "Beer Company Takes 6K-SF Brewing and Event Space in Inwood",
    excerpt:
      "Dyckman Beer Company will open a brewery, tasting room and event space at the base of The Jay Group's Inwood Living.",
    author: "Larry Getlen",
    publication: "Commercial Observer",
    credit: "Larry Getlen | Commercial Observer",
    date: "October 23, 2025",
    image: {
      src: "/images/buildings/inwood.webp",
      alt: "Inwood Living ground-floor retail and residential facade at 401 West 207th Street",
    },
    body: [
      "Dyckman Beer Company has signed a lease for 6,103 square feet at Inwood Living, The Jay Group's rental building at 401 West 207th Street, where it plans to open a brewery, tasting room and event space. The asking rent was $75 per square foot. Eli Yadid and Rafael Benor of KSR represented The Jay Group, and Chris Ventura and Jordan Gosin of Newmark represented the tenant.",
      "The brewery joins Crunch Fitness, which signed a 20-year lease for 20,000 square feet in 2024, along with Ponce Bank and Golden Era Day Care. KSR has leased more than 30,000 square feet of retail at the property, with about 5,000 square feet still available.",
      "Founded by Juan Camilo, Dyckman Beer Company distributes its beers to 150 locations in New York City and 25 in the Dominican Republic. Inwood Living, completed in June 2025, has 273 apartments, 20,000 square feet of ground-floor commercial space and a 41-car garage.",
    ],
    externalUrl: "https://commercialobserver.com/?p=552307",
  },
  {
    slug: "camber-property-group-2886-atlantic-avenue",
    category: "sales",
    categoryLabel: "Building Sale",
    buildingTag: "2886 Atlantic Ave",
    neighborhood: "Cypress Hills",
    title: "Camber Property Group Buys Brooklyn Multifamily Property for $72M",
    excerpt:
      "The Jay Group sold its newly completed 183-unit building in Cypress Hills to an affordable housing developer.",
    author: "Amanda Schiavo",
    publication: "Commercial Observer",
    credit: "Amanda Schiavo | Commercial Observer",
    date: "May 23, 2025",
    image: {
      src: "/images/buildings/2886AtlanticAve.jpg",
      alt: "2886 Atlantic Avenue residential building in Cypress Hills, Brooklyn",
    },
    body: [
      "Camber Property Group has acquired 2886 Atlantic Avenue, a newly built 183-unit rental building in the Cypress Hills section of Brooklyn, from The Jay Group for $72 million. The 10-story property, completed in 2023, also includes about 5,200 square feet of commercial space and 56 parking spaces.",
      "Camber, which focuses on affordable and supportive housing, will run the building as affordable housing in partnership with the New York City Department of Social Services and the Institute for Community Living. Aaron Jungreis, Ben Khakshoor and Alex Fuchs of Rosewood Realty Group represented both sides of the deal, and Scott Dweck of Latitude Property Group also worked on the transaction.",
      "The building replaced a single-story transportation and utility facility within the area covered by the 2016 East New York rezoning. It opened in October 2025 with 182 affordable apartments, the first Brooklyn community in the city's Affordable Housing Services program.",
    ],
    externalUrl:
      "https://commercialobserver.com/2025/05/camber-property-group-2886-atlantic-avenue/",
  },
];

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug);
}
