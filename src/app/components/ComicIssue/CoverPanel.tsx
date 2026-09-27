"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import Panel from "./Panel";
import styles from "./coverPanel.module.scss";

import { IHeroData } from "@/app/interfaces/heroes";
import { IHeroLore } from "@/app/data/lore";
import { getHeroArt } from "@/app/data/heroArt";

export default function CoverPanel({ hero, lore }: { hero: IHeroData; lore: IHeroLore }) {
  const art = getHeroArt(hero.id);

  return (
    <Panel area="cover" order={6} tone="yellow" label="Primeira aparição" from="right" className={styles.panel}>
      <div className={styles.rays} aria-hidden />
      {art ? (
        <motion.figure
          className={styles.cover}
          variants={{
            hidden: { opacity: 0, transform: "translateY(24px) rotate(-10deg)" },
            shown: {
              opacity: 1,
              transform: "translateY(0px) rotate(4deg)",
              transition: { type: "spring", duration: 0.9, bounce: 0.3, delay: 0.9 },
            },
          }}
        >
          <Image src={art.cover} alt={`Capa da primeira aparição de ${hero.name}`} sizes="160px" />
        </motion.figure>
      ) : (
        <p className={styles.missing}>Capa perdida entre universos.</p>
      )}
      <div className={styles.info}>
        <p className={styles.issue}>{lore.firstAppearance}</p>
        <p className={styles.creators}>
          <span>Criação</span>
          {lore.creators}
        </p>
      </div>
    </Panel>
  );
}
