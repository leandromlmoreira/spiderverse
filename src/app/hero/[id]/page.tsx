import Carousel from "@/app/components/Carousel";
import { IHeroData } from "@/app/interfaces/heroes";

async function getHeroesData(): Promise<{ data: IHeroData[] }> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/heroes`);
    if (res.ok) return res.json();
  } catch { }
  const local = (await import("@/app/api/heroes/heroes.json")).default as IHeroData[];
  return { data: local };
}

export async function generateStaticParams() {
  const heroes = (await import("@/app/api/heroes/heroes.json")).default as IHeroData[];
  return heroes.map((hero) => ({ id: hero.id }));
}

export default async function Hero({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const heroes = await getHeroesData();
  return <Carousel heroes={heroes.data} activeId={id} />;
}
