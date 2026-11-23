import { Anton, Libre_Bodoni, Plus_Jakarta_Sans } from "next/font/google";

export const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

export const libreBodoni = Libre_Bodoni({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre-bodoni",
  display: "swap",
});

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-jakarta",
  display: "swap",
});

export const fontVariables = `${anton.variable} ${libreBodoni.variable} ${plusJakartaSans.variable}`;
