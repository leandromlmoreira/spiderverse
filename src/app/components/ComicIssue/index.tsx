"use client";

import { useEffect } from "react";

import Wordmark from "../Wordmark";
import TransitionLink from "../PageTransition/TransitionLink";
import { usePageTransition } from "../PageTransition/TransitionProvider";
import SoundToggle from "../Sound/SoundToggle";
import FanNotice from "../FanNotice";
import QuizLink from "../Quiz/QuizLink";

import SplashPanel from "./SplashPanel";
import ProfilePanel from "./ProfilePanel";
import DialoguePanel from "./DialoguePanel";
import PowerCard from "./PowerCard";
import TriviaPanel from "./TriviaPanel";
import HeightPanel from "./HeightPanel";
import WeightPanel from "./WeightPanel";
import CoverPanel from "./CoverPanel";
import IssueNav from "./IssueNav";
import styles from "./comicIssue.module.scss";

import { padIssue } from "@/app/lib/format";
import { getUniverseTheme } from "@/app/data/universes";
import { getHeroLore } from "@/app/data/lore";
import { IHeroIssue } from "@/app/data/heroes";

interface IProps {
  issue: IHeroIssue;
}

function isTyping(target: EventTarget | null) {
  return target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
}

export default function ComicIssue({ issue }: IProps) {
  const { hero, previous, next, number, total } = issue;
  const { navigate } = usePageTransition();
  const theme = getUniverseTheme(hero.id);
  const lore = getHeroLore(hero.id);
  const themeStyle = {
    "--primary": theme.monochrome ? "#8a8a8a" : theme.primary,
    "--secondary": theme.secondary,
    "--glow": theme.glow,
    "--base": theme.base,
  } as React.CSSProperties;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || isTyping(event.target)) return;
      if (event.key === "ArrowRight") navigate(`/hero/${next.id}/`, next.name, { variant: "page", direction: 1 });
      if (event.key === "ArrowLeft") navigate(`/hero/${previous.id}/`, previous.name, { variant: "page", direction: -1 });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, next, previous]);

  return (
    <main className={styles.page} style={themeStyle}>
      <header className={styles.masthead}>
        <Wordmark href={`/#${hero.id}`} tone="light" />
        <p className={styles.issueMeta}>
          <span>Edição</span>
          <strong>#{hero.universe}</strong>
          <span>
            Página {padIssue(number)} de {padIssue(total)}
          </span>
        </p>
        <div className={styles.mastEnd}>
          <SoundToggle tone="light" />
          <TransitionLink href={`/#${hero.id}`} label="Multiverso!" className={styles.back}>
            <svg viewBox="0 0 20 20" aria-hidden>
              <path d="M16 10H5M9 5l-5 5 5 5" />
            </svg>
            Voltar ao multiverso
          </TransitionLink>
        </div>
      </header>

      <div className={styles.grid}>
        <SplashPanel hero={hero} theme={theme} />
        <ProfilePanel hero={hero} />
        <DialoguePanel hero={hero} lore={lore} monochrome={theme.monochrome} />
        <PowerCard hero={hero} lore={lore} number={number} total={total} monochrome={theme.monochrome} />
        <TriviaPanel trivia={lore.trivia} />
        <HeightPanel height={hero.details.height} />
        <WeightPanel weight={hero.details.weight} />
        <CoverPanel hero={hero} lore={lore} />
        <IssueNav previous={previous} next={next} />
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerStart}>
          <span>Aranhaverso · Índice do multiverso · Nº {padIssue(number)}</span>
          <FanNotice tone="light" />
        </div>
        <div className={styles.footerEnd}>
          <span className={styles.keys} aria-hidden>
            <kbd>←</kbd>
            <kbd>→</kbd> vire a página
          </span>
          <QuizLink />
        </div>
      </footer>
    </main>
  );
}
