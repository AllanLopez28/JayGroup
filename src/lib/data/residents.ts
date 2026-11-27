import { siteConfig } from "@/lib/data/site";

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

export interface ResidentPortalAction {
  label: string;
  href: string;
  variant: "solid" | "outline";
  hasArrow?: boolean;
  external?: boolean;
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
  actions?: ResidentPortalAction[];
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
  actions: [
    {
      label: "Login",
      href: "https://jaygroup.managego.com/Tenant/auth",
      variant: "solid",
      hasArrow: true,
      external: true,
    },
    {
      label: "Residential Portal",
      href: "/resident-portal/login",
      variant: "outline",
      hasArrow: true,
      external: false,
    },
  ],
};

export const brokerPortalConfig: ResidentPortalWelcomeContent = {
  portalUrl: "https://management.jaygroupny.com/auth/login?returnUrl=%2Fvacancy",
  durationMs: 4200,
  backgroundImage: "/images/broker-portal-bg.webp",
  backHref: "/#residents",
  backLabel: "Back to site",
  kicker: "Broker Portal",
  headlinePrefix: "Welcome,",
  headlineEmphasis: "brokers.",
  subtitle:
    "Live availability. Instant holds. Every status in one place, from your client’s file to move-in.",
  statusLabel: "Taking you to sign in",
  note: "You’ll sign in securely on The Jay Group broker portal.",
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
        href: "/broker-portal",
        variant: "outline",
        hasArrow: false,
        external: false,
      },
    },
  ],
};

export interface ResidentLoginAltCard {
  id: string;
  eyebrow: string;
  label: string;
  href?: string;
}

export interface ResidentLoginConfig {
  brandAriaLabel: string;
  brandLogoSrc: string;
  eyebrow: string;
  title: string;
  lead: string;
  demoNotice: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  showPasswordLabel: string;
  hidePasswordLabel: string;
  capsLockWarning: string;
  rememberLabel: string;
  forgotPassword: {
    label: string;
    href?: string;
  };
  submitIdleLabel: string;
  submitBusyLabel: string;
  submitSuccessLabel: string;
  dividerLabel: string;
  altCards: readonly ResidentLoginAltCard[];
  unavailableTooltip: string;
  helpLabel: string;
  helpPhone: string;
  helpPhoneHref: string;
  helpEmail: string;
  helpEmailHref: string;
}

export const residentLoginConfig: ResidentLoginConfig = {
  brandAriaLabel: "The Jay Group home",
  brandLogoSrc: siteConfig.logo.src,
  eyebrow: "Resident Portal",
  title: "Sign in",
  lead: "Use the email address on your lease.",
  demoNotice: "Demo mode — any email and password will sign you in.",
  emailLabel: "Email address",
  emailPlaceholder: "name@email.com",
  passwordLabel: "Password",
  passwordPlaceholder: "Your password",
  showPasswordLabel: "Show password",
  hidePasswordLabel: "Hide password",
  capsLockWarning: "Caps Lock is on.",
  rememberLabel: "Keep me signed in",
  forgotPassword: {
    label: "Forgot password?",
  },
  submitIdleLabel: "Sign in",
  submitBusyLabel: "Signing in",
  submitSuccessLabel: "Welcome back",
  dividerLabel: "New here?",
  altCards: [
    {
      id: "activate",
      eyebrow: "Already a resident?",
      label: "Activate your account",
    },
    {
      id: "apply",
      eyebrow: "Looking for a home?",
      label: "Rental application",
    },
  ],
  unavailableTooltip: "Available soon",
  helpLabel: "Need help signing in?",
  helpPhone: siteConfig.contact.phone,
  helpPhoneHref: siteConfig.contact.phoneHref,
  helpEmail: siteConfig.contact.email,
  helpEmailHref: siteConfig.contact.emailHref,
};
