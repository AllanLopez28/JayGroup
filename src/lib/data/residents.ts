export interface ResidentCard {
  watermark: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
    variant: "solid" | "outline";
    hasArrow?: boolean;
    external?: boolean;
  };
}

export interface ResidentsContent {
  sectionId: string;
  ariaLabel: string;
  cards: ResidentCard[];
}

export interface ResidentPortalWelcomeContent {
  portalUrl: string;
  durationMs: number;
  backgroundImage: string;
  backHref: string;
  backLabel: string;
  kicker: string;
  headlinePrefix: string;
  headlineEmphasis: string;
  subtitle: string;
  statusLabel: string;
  note: string;
}

export const residentPortalConfig: ResidentPortalWelcomeContent = {
  portalUrl: "https://jaygroup.managego.com/Tenant/auth",
  durationMs: 4200,
  backgroundImage: "/images/resident-portal-bg.webp",
  backHref: "/#residents",
  backLabel: "Back to site",
  kicker: "Resident Portal",
  headlinePrefix: "Welcome",
  headlineEmphasis: "home.",
  subtitle:
    "Pay rent, submit maintenance requests and stay in touch with your building’s team, all in one place.",
  statusLabel: "Taking you to sign in",
  note: "You’ll sign in securely on our resident portal, powered by ManageGo.",
};

export const residentsContent: ResidentsContent = {
  sectionId: "residents",
  ariaLabel: "Residents and brokers",
  cards: [
    {
      watermark: "home",
      eyebrow: "For Residents",
      title: "Your building team, one click away.",
      description:
        "Pay rent, submit maintenance requests and stay in touch with your building’s team through the resident portal.",
      cta: {
        label: "Resident Portal",
        href: "/resident-portal",
        variant: "solid",
        hasArrow: true,
        external: false,
      },
    },
    {
      watermark: "lease",
      eyebrow: "For Brokers",
      title: "Live availability. Instant holds. Every status in one place.",
      description:
        "See units in real time, submit your client’s file, reserve the unit and follow it through review, approval, lease and payment, all the way to move-in.",
      cta: {
        label: "Request Broker Access",
        href: "#contact",
        variant: "outline",
        hasArrow: false,
      },
    },
  ],
};
