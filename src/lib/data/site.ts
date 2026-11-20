import type { NavItem } from "@/lib/types";

export const siteConfig = {
  name: "The Jay Group",
  tagline: "Built for New York.",
  description:
    "New-construction rental and mixed-use buildings across Brooklyn and Manhattan, developed, leased and managed by one team.",
  logo: {
    src: "/brand/blanco-12.png",
    width: 2396,
    height: 1295,
    alt: "The Jay Group",
    ariaLabel: "The Jay Group, back to top",
  },
  office: {
    street: "84 Kosciuszko St",
    cityStateZip: "Brooklyn, NY 11205",
    full: "84 Kosciuszko St, Brooklyn, NY 11205",
  },
  contact: {
    phone: "(718) 963-0536",
    phoneHref: "tel:+17189630536",
    // TODO: confirmar dominio del correo
    email: "info@jaygroupny.com",
    emailHref: "mailto:info@jaygroupny.com",
  },
  social: {
    instagram: "[INSTAGRAM]",
    facebook: "[FACEBOOK]",
  },
  copyright: "© 2026 The Jay Group. All rights reserved.",
  legalLinks: [
    { label: "Equal Housing Opportunity", href: "#" },
    { label: "Fair Housing Notice", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ] satisfies NavItem[],
} as const;

export const mainNav: NavItem[] = [
  { label: "Our Story", href: "#story" },
  { label: "Properties", href: "#figures" },
 // { label: "Commercial", href: "#retail" },
  { label: "In-Development", href: "#next" },
];

export const headerCta: NavItem = {
  label: "Residents",
  href: "#residents",
};

export const mobileNav: NavItem[] = [
  { label: "Our Story", href: "#story" },
  { label: "Properties", href: "#figures" },
  { label: "In Development", href: "#next" },
  { label: "Brokers", href: "#find" },
  { label: "Commercial", href: "#retail" },
  { label: "Locations", href: "#locations" },
  { label: "Residents", href: "#residents" },
  { label: "Contact", href: "#contact" },
];
