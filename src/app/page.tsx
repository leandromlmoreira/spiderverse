import HeroesList from "./components/HeroesList";
import { IHeroData } from "./interfaces/heroes";
import styles from "./page.module.scss";
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

export default async function Hero(props: { params: { id: string } }) {
  const { params } = await props;        // aguarda a Promise de props
  const heroes = await getHeroesData();
  return <Carousel heroes={heroes.data} activeId={params.id} />;
}
