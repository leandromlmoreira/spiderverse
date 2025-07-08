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

export default async function Hero(props: { params: { id: string } }) {
  const { params } = await props;
  const heroes = await getHeroesData();
  return <Carousel heroes={heroes.data} activeId={params.id} />;
}

