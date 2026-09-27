import type { Metadata } from "next";

import QuizGame from "@/app/components/Quiz";
import { getHeroes } from "@/app/data/heroes";

export const metadata: Metadata = {
  title: "Qual Aranha é você? — Aranhaverso",
  description: "Seis perguntas, sete universos e um resultado para compartilhar. Descubra qual Aranha do multiverso combina com você.",
};

export default async function QuizPage() {
  const heroes = await getHeroes();
  return <QuizGame heroes={heroes} />;
}
