import { Bangers, Barlow_Condensed } from "next/font/google";

export const displayFont = Bangers({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

export const textFont = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-text",
});
