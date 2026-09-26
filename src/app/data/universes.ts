export interface IUniverseTheme {
  base: string;
  glow: string;
  primary: string;
  secondary: string;
  sfx: string;
  tagline: string;
  scale: number;
  monochrome?: boolean;
}

const defaultTheme: IUniverseTheme = {
  base: "#0b1030",
  glow: "#3a5bff",
  primary: "#ff2d55",
  secondary: "#2dd4ff",
  sfx: "THWIP!",
  tagline: "Mais um portal aberto no multiverso.",
  scale: 1,
};

const themes: Record<string, IUniverseTheme> = {
  "spider-man-616": {
    base: "#4a0409",
    glow: "#e8202c",
    primary: "#ff3340",
    secondary: "#2f63ff",
    sfx: "THWIP!",
    tagline: "Veterano de mil batalhas e ainda tentando pagar o aluguel em dia.",
    scale: 1,
  },
  "mulher-aranha-65": {
    base: "#26082f",
    glow: "#ff4fa3",
    primary: "#ff5fae",
    secondary: "#3fe0ee",
    sfx: "BA-DUM!",
    tagline: "Baterista de dia, heroína de noite. Sempre no compasso certo.",
    scale: 1,
  },
  "spider-man-1610": {
    base: "#07070c",
    glow: "#c8102a",
    primary: "#ff2a3d",
    secondary: "#9b5cff",
    sfx: "ZAP!",
    tagline: "O novato do Brooklyn que aprendeu a saltar antes de aprender a cair.",
    scale: 1,
  },
  "sp-dr-14512": {
    base: "#0d1238",
    glow: "#ff5fb0",
    primary: "#ff6cb8",
    secondary: "#26d9c7",
    sfx: "BZZT!",
    tagline: "Pilota um robô-aranha ligado direto à mente. Sincronia total.",
    scale: 0.9,
  },
  "spider-ham-8311": {
    base: "#152078",
    glow: "#ffb81f",
    primary: "#ffd23f",
    secondary: "#ff3b30",
    sfx: "OINK!",
    tagline: "Um porco com poderes de aranha. Não pergunte como. Só aceite.",
    scale: 0.7,
  },
  "spider-man-90214": {
    base: "#0c0c0c",
    glow: "#5c5c5c",
    primary: "#f2f2f2",
    secondary: "#8f8f8f",
    sfx: "BANG!",
    tagline: "Nova York, anos 30. A justiça aqui só existe em preto e branco.",
    scale: 1,
    monochrome: true,
  },
  "spider-man-928": {
    base: "#030c2c",
    glow: "#1f6bff",
    primary: "#3d86ff",
    secondary: "#ff2a3d",
    sfx: "ZWOOM!",
    tagline: "Direto de 2099, onde cada salto entre prédios é guiado por neon.",
    scale: 1,
  },
};

export function getUniverseTheme(heroId: string): IUniverseTheme {
  return themes[heroId] ?? defaultTheme;
}
