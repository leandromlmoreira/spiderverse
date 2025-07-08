import "./globals.scss";
import Image from "next/image";

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aranha Verso",
  description:
    "Criando um carrossel Parallax do Aranha Verso com React, Next.js, TypeScript e Framer Motion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <header>
          <Image
            src="/icons/menu.svg"
            alt="Opções de Menu"
            width={36}
            height={25}
          />
          <Link href="/">
          <Image
            src="/spider-logo.svg"
            alt="Spiderman"
            width={260}
            height={70}
            className="logo-animation"
          />
          </Link>
          <Image src="/icons/user.svg" alt="Login" width={36} height={25} />
        </header>
        {children}
      </body>
    </html>
  );
}
