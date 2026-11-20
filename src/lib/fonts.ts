import {
  EB_Garamond,
  Playfair_Display,
  Plus_Jakarta_Sans,
} from "next/font/google";

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-eb-garamond",
  display: "swap",
});

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-jakarta",
  display: "swap",
});

export const fontVariables = `${playfairDisplay.variable} ${ebGaramond.variable} ${plusJakartaSans.variable}`;
