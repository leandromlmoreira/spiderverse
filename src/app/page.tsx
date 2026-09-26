import Multiverse from "./components/Multiverse";
import { getHeroes } from "./data/heroes";

export default async function Home() {
  const heroes = await getHeroes();
  return <Multiverse heroes={heroes} />;
}
