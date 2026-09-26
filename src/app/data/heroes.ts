import localHeroes from "@/app/api/heroes/heroes.json";
import { IHeroData } from "@/app/interfaces/heroes";

const fallbackHeroes = localHeroes as IHeroData[];

function isHeroList(value: unknown): value is IHeroData[] {
  return Array.isArray(value) && value.length > 0 && value.every((hero) => typeof hero?.id === "string");
}

export async function getHeroes(): Promise<IHeroData[]> {
  try {
    const response = await fetch(`${process.env.API_URL}/api/heroes`);
    if (response.ok) {
      const body = await response.json();
      if (isHeroList(body?.data)) return body.data;
    }
  } catch {}
  return fallbackHeroes;
}

export function getHeroIds(): string[] {
  return fallbackHeroes.map((hero) => hero.id);
}

export interface IHeroIssue {
  hero: IHeroData;
  previous: IHeroData;
  next: IHeroData;
  number: number;
  total: number;
}

export function findIssue(heroes: IHeroData[], id: string): IHeroIssue | null {
  const source = heroes.some((hero) => hero.id === id) ? heroes : fallbackHeroes;
  const index = source.findIndex((hero) => hero.id === id);
  if (index < 0) return null;
  const total = source.length;
  return {
    hero: source[index],
    previous: source[(index - 1 + total) % total],
    next: source[(index + 1) % total],
    number: index + 1,
    total,
  };
}
