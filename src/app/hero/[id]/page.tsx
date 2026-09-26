import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ComicIssue from "@/app/components/ComicIssue";
import { findIssue, getHeroIds, getHeroes } from "@/app/data/heroes";

interface IProps {
  params: Promise<{ id: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getHeroIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const { id } = await params;
  const issue = findIssue(await getHeroes(), id);
  if (!issue) return {};
  return {
    title: `${issue.hero.name} · Terra-${issue.hero.universe} — Aranhaverso`,
    description: `Edição #${issue.hero.universe}: ficha de ${issue.hero.details.fullName}, primeira aparição e muito mais.`,
  };
}

export default async function HeroPage({ params }: IProps) {
  const { id } = await params;
  const issue = findIssue(await getHeroes(), id);
  if (!issue) notFound();
  return <ComicIssue issue={issue} />;
}
