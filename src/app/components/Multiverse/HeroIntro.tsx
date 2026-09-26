"use client";

import { AnimatePresence, motion } from "framer-motion";

import TransitionLink from "../PageTransition/TransitionLink";

import styles from "./heroIntro.module.scss";

import { IHeroData } from "@/app/interfaces/heroes";

interface IProps {
  hero: IHeroData;
  tagline: string;
}

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const item = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE_OUT } },
  exit: { opacity: 0, y: -12, filter: "blur(4px)", transition: { duration: 0.16 } },
};

export default function HeroIntro({ hero, tagline }: IProps) {
  return (
    <section className={styles.intro}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={hero.id}
          className={styles.content}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.18 } } }}
        >
          <motion.p className={styles.eyebrow} variants={item}>
            <span className={styles.dot} />
            Terra-{hero.universe} · {hero.details.homeland}
          </motion.p>
          <motion.h1 className={styles.name} variants={item}>
            {hero.name}
          </motion.h1>
          <motion.p className={styles.caption} variants={item}>
            <strong>{hero.details.fullName}.</strong> {tagline}
          </motion.p>
          <motion.div className={styles.actions} variants={item}>
            <TransitionLink href={`/hero/${hero.id}`} label={`Edição #${hero.universe}`} className={styles.cta}>
              Ler a edição
              <span className={styles.ctaIcon} aria-hidden>
                <svg viewBox="0 0 20 20">
                  <path d="M4 10h11M11 5l5 5-5 5" />
                </svg>
              </span>
            </TransitionLink>
            <p className={styles.hint}>
              <kbd>←</kbd>
              <kbd>→</kbd>
              <span>ou arraste para trocar de universo</span>
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
