"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import Starburst from "../Starburst";

import Panel from "./Panel";
import styles from "./splashPanel.module.scss";

import { IHeroData } from "@/app/interfaces/heroes";
import { IUniverseTheme } from "@/app/data/universes";
import { getHeroArt } from "@/app/data/heroArt";
import { cx } from "@/app/lib/cx";

interface IProps {
  hero: IHeroData;
  theme: IUniverseTheme;
}

export default function SplashPanel({ hero, theme }: IProps) {
  const art = getHeroArt(hero.id);

  return (
    <Panel area="splash" order={0} tone="theme" className={styles.splash} from="bottom">
      <div className={styles.rays} aria-hidden />
      <div className={styles.dots} aria-hidden />
      <p className={styles.caption}>
        Terra-{hero.universe} · {hero.details.homeland}
      </p>
      {art && (
        <motion.div
          className={cx(styles.figure, theme.monochrome && styles.mono)}
          style={{ height: `${Math.min(theme.scale, 1) * 108}%` }}
          initial={{ opacity: 0, transform: "translateY(8%) scale(0.96)" }}
          animate={{ opacity: 1, transform: "translateY(0%) scale(1)" }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.45 }}
        >
          <Image src={art.figure} alt={`${hero.name} da Terra-${hero.universe}`} priority sizes="(max-width: 768px) 90vw, 50vw" />
        </motion.div>
      )}
      <div className={styles.scrim} aria-hidden />
      <motion.div
        className={styles.sfx}
        initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
        animate={{ opacity: 1, scale: 1, rotate: -8 }}
        transition={{ type: "spring", duration: 0.6, bounce: 0.5, delay: 0.9 }}
      >
        <Starburst word={theme.sfx} fill={theme.primary} className={styles.burst} />
      </motion.div>
      <h1 className={styles.name}>
        <span className={styles.kicker}>Edição #{hero.universe}</span>
        {hero.name}
      </h1>
    </Panel>
  );
}
