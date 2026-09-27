import type { Metadata, Viewport } from "next";

import "./globals.scss";

import { displayFont, textFont } from "./fonts";
import TransitionProvider from "./components/PageTransition/TransitionProvider";
import SoundProvider from "./components/Sound/SoundProvider";

export const metadata: Metadata = {
  title: "Aranhaverso — Índice do Multiverso",
  description:
    "Uma revista em quadrinhos interativa com os heróis do Aranhaverso: palco com parallax, glitch dimensional, uma edição para cada universo e o quiz Qual Aranha é você?",
};

export const viewport: Viewport = {
  themeColor: "#07070c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${displayFont.variable} ${textFont.variable}`}>
      <body>
        <SoundProvider>
          <TransitionProvider>{children}</TransitionProvider>
        </SoundProvider>
      </body>
    </html>
  );
}
