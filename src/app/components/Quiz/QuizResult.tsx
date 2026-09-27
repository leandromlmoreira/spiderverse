"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import Starburst from "../Starburst";
import TransitionLink from "../PageTransition/TransitionLink";

import { renderShareCard } from "./shareCard";
import styles from "./result.module.scss";

import { IQuizMatch } from "@/app/data/quiz";
import { getHeroArt } from "@/app/data/heroArt";
import { getHeroLore } from "@/app/data/lore";
import { getUniverseTheme } from "@/app/data/universes";
import { IHeroData } from "@/app/interfaces/heroes";
import { cx } from "@/app/lib/cx";

interface IProps {
  hero: IHeroData;
  heroes: IHeroData[];
  matches: IQuizMatch[];
  shared: boolean;
  onRestart: () => void;
}

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const rise = {
  hidden: { opacity: 0, y: 26 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

export default function QuizResult({ hero, heroes, matches, shared, onRestart }: IProps) {
  const [status, setStatus] = useState("");
  const art = getHeroArt(hero.id);
  const lore = getHeroLore(hero.id);
  const theme = getUniverseTheme(hero.id);
  const top = matches.slice(0, 3);
  const percent = matches[0]?.percent ?? 0;

  const share = async () => {
    const url = window.location.href;
    const text = `Fiz o teste do Aranhaverso e deu ${hero.name} (Terra-${hero.universe}). Qual Aranha é você?`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Qual Aranha é você?", text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text} ${url}`);
      setStatus("Link copiado! Cole onde quiser.");
    } catch {
      setStatus("Não deu para compartilhar agora. Copie o endereço da página.");
    }
  };

  const download = async () => {
    if (!art) return;
    setStatus("Desenhando o seu card...");
    try {
      const blob = await renderShareCard({
        name: hero.name,
        universe: hero.universe,
        archetype: lore.archetype,
        percent,
        figureSrc: art.figure.src,
        theme,
      });
      if (!blob) throw new Error("empty");
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `aranhaverso-${hero.id}.png`;
      link.click();
      URL.revokeObjectURL(link.href);
      setStatus("Card salvo! Agora é só postar.");
    } catch {
      setStatus("Não foi possível gerar o card agora.");
    }
  };

  return (
    <motion.section
      className={styles.result}
      initial="hidden"
      animate="shown"
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      variants={{ shown: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } } }}
      aria-labelledby="quiz-result"
    >
      <div className={styles.splash}>
        <div className={styles.rays} aria-hidden />
        <div className={styles.dots} aria-hidden />
        {art && (
          <motion.div
            className={cx(styles.figure, theme.monochrome && styles.mono)}
            style={{ height: `${Math.min(theme.scale + 0.12, 1) * 100}%` }}
            initial={{ opacity: 0, y: "12%", scale: 0.9 }}
            animate={{ opacity: 1, y: "0%", scale: 1 }}
            transition={{ type: "spring", duration: 0.9, bounce: 0.3, delay: 0.1 }}
          >
            <Image src={art.figure} alt={`${hero.name} da Terra-${hero.universe}`} priority sizes="(max-width: 768px) 90vw, 45vw" />
          </motion.div>
        )}
        <motion.div
          className={styles.sfx}
          initial={{ opacity: 0, scale: 0.3, rotate: -40 }}
          animate={{ opacity: 1, scale: 1, rotate: -8 }}
          transition={{ type: "spring", duration: 0.6, bounce: 0.55, delay: 0.55 }}
        >
          <Starburst word={theme.sfx} fill={theme.primary} className={styles.burst} splitLetters />
        </motion.div>
      </div>

      <div className={styles.copy}>
        <motion.p className={styles.kicker} variants={rise}>
          {shared ? "Resultado compartilhado" : "Seu resultado"}
        </motion.p>
        <motion.h1 id="quiz-result" className={styles.name} variants={rise}>
          <small>Você é</small>
          {hero.name}
        </motion.h1>
        <motion.p className={styles.meta} variants={rise}>
          Terra-{hero.universe} · {lore.archetype} · {hero.details.fullName}
        </motion.p>
        <motion.p className={styles.blurb} variants={rise}>
          {lore.quizBlurb}
        </motion.p>

        <motion.ol className={styles.matches} variants={rise} aria-label="Compatibilidade">
          {top.map((match, position) => {
            const matchHero = heroes.find((item) => item.id === match.heroId);
            const matchArt = getHeroArt(match.heroId);
            if (!matchHero) return null;
            return (
              <li key={match.heroId} data-first={position === 0}>
                <span className={styles.thumb}>{matchArt && <Image src={matchArt.figure} alt="" sizes="40px" />}</span>
                <span className={styles.matchName}>{matchHero.name}</span>
                <span className={styles.track} aria-hidden>
                  <motion.i
                    initial={{ transform: "scaleX(0)" }}
                    animate={{ transform: `scaleX(${match.percent / 100})` }}
                    transition={{ duration: 1, ease: EASE_OUT, delay: 0.7 + position * 0.12 }}
                  />
                </span>
                <strong>{match.percent}%</strong>
              </li>
            );
          })}
        </motion.ol>

        <motion.div className={styles.actions} variants={rise}>
          <button type="button" className={styles.primary} onClick={share}>
            Compartilhar resultado
          </button>
          <button type="button" className={styles.secondary} onClick={download}>
            Baixar card
          </button>
          <TransitionLink href={`/hero/${hero.id}/`} label={`Edição #${hero.universe}`} className={styles.secondary}>
            Ler a edição
          </TransitionLink>
          <button type="button" className={styles.ghost} onClick={onRestart}>
            {shared ? "Fazer o teste" : "Refazer"}
          </button>
        </motion.div>
        <p className={styles.status} role="status">
          {status}
        </p>
      </div>
    </motion.section>
  );
}
