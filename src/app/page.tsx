import HeroesList from "./components/HeroesList";
import { IHeroData } from "./interfaces/heroes";
import styles from "./page.module.scss";

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

type HeroPageProps = {
  params: { id: string };
};

export default async function Home() {
  const { data: heroes } = await getHeroesData();
  return (
    <main className={styles.main}>
      <HeroesList heroes={heroes} />
    </main>
  );
}
