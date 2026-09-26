import type { Metadata, Viewport } from "next";

import "./globals.scss";

import { displayFont, textFont } from "./fonts";
import TransitionProvider from "./components/PageTransition/TransitionProvider";

export const metadata: Metadata = {
  title: "Aranhaverso — Índice do Multiverso",
  description:
    "Uma revista em quadrinhos interativa com os heróis do Aranhaverso: carrossel com parallax, glitch dimensional e uma edição para cada universo.",
};

export const viewport: Viewport = {
  themeColor: "#07070c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${displayFont.variable} ${textFont.variable}`}>
      <body>
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
