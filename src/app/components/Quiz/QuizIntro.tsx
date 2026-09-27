"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import Starburst from "../Starburst";

import styles from "./quiz.module.scss";

import { QUIZ } from "@/app/data/quiz";
import { getHeroArt } from "@/app/data/heroArt";
import { IHeroData } from "@/app/interfaces/heroes";

interface IProps {
  heroes: IHeroData[];
  onStart: () => void;
}

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function QuizIntro({ heroes, onStart }: IProps) {
  return (
    <motion.section
      className={styles.intro}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -60, rotate: -2, transition: { duration: 0.25 } }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
    >
      <div className={styles.lineup} aria-hidden>
        {heroes.map((hero, position) => {
          const art = getHeroArt(hero.id);
          return (
            <motion.span
              key={hero.id}
              className={styles.silhouette}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: EASE_OUT,
                delay: 0.15 + position * 0.06,
              }}
            >
              {art && <Image src={art.figure} alt="" sizes="120px" />}
            </motion.span>
          );
        })}
        <Starburst word="?!" fill="var(--yellow)" className={styles.introBurst} />
      </div>
      <div className={styles.introCopy}>
        <p className={styles.kicker}>Teste do multiverso</p>
        <h1 className={styles.title}>
          Qual Aranha
          <br />é você?
        </h1>
        <p className={styles.lead}>
          {QUIZ.length} perguntas, {heroes.length} universos e um resultado para compartilhar com a sua equipe aranha.
        </p>
        <button type="button" className={styles.start} onClick={onStart}>
          Começar o teste
          <span className={styles.startIcon} aria-hidden>
            <svg viewBox="0 0 20 20">
              <path d="M4 10h11M11 5l5 5-5 5" />
            </svg>
          </span>
        </button>
      </div>
    </motion.section>
  );
}
