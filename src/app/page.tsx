import { IHeroData } from "./interfaces/heroes";
import Carousel from "./components/Carousel";

async function getHeroesData(): Promise<{ data: IHeroData[] }> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/heroes`);
    if (res.ok) {
      return res.json();
    }
  } catch (e) {
    // ignore and use local JSON
  }
  const local = (await import("@/app/api/heroes/heroes.json")).default as IHeroData[];
  return { data: local };
}

// A home não tem parâmetro de rota: abre o carrossel no primeiro herói da lista.
export default async function Home() {
  const heroes = await getHeroesData();
  return <Carousel heroes={heroes.data} activeId={heroes.data[0]?.id} />;
}
