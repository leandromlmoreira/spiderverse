"use client";

import Wordmark from "../Wordmark";
import TransitionLink from "../PageTransition/TransitionLink";

import SplashPanel from "./SplashPanel";
import ProfilePanel from "./ProfilePanel";
import QuotePanel from "./QuotePanel";
import HeightPanel from "./HeightPanel";
import WeightPanel from "./WeightPanel";
import CoverPanel from "./CoverPanel";
import IssueNav from "./IssueNav";
import styles from "./comicIssue.module.scss";

import { padIssue } from "@/app/lib/format";
import { getUniverseTheme } from "@/app/data/universes";
import { IHeroIssue } from "@/app/data/heroes";

interface IProps {
  issue: IHeroIssue;
}

export default function ComicIssue({ issue }: IProps) {
  const { hero, previous, next, number, total } = issue;
  const theme = getUniverseTheme(hero.id);
  const themeStyle = {
    "--primary": theme.primary,
    "--secondary": theme.secondary,
    "--glow": theme.glow,
    "--base": theme.base,
  } as React.CSSProperties;

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
        <TransitionLink href={`/#${hero.id}`} label="Multiverso!" className={styles.back}>
          <svg viewBox="0 0 20 20" aria-hidden>
            <path d="M16 10H5M9 5l-5 5 5 5" />
          </svg>
          Voltar ao multiverso
        </TransitionLink>
      </header>

      <div className={styles.grid}>
        <SplashPanel hero={hero} theme={theme} />
        <ProfilePanel hero={hero} />
        <QuotePanel hero={hero} tagline={theme.tagline} />
        <HeightPanel height={hero.details.height} />
        <WeightPanel weight={hero.details.weight} />
        <CoverPanel hero={hero} />
        <IssueNav previous={previous} next={next} />
      </div>

      <footer className={styles.footer}>
        <span>Aranhaverso</span>
        <span>Índice do multiverso · Nº {padIssue(number)}</span>
      </footer>
    </main>
  );
}
