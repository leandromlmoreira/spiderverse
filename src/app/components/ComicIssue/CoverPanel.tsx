"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import Panel from "./Panel";
import styles from "./coverPanel.module.scss";

import { IHeroData } from "@/app/interfaces/heroes";
import { getHeroArt } from "@/app/data/heroArt";

export default function CoverPanel({ hero }: { hero: IHeroData }) {
  const art = getHeroArt(hero.id);

  return (
    <Panel area="cover" order={5} tone="yellow" label="Primeira aparição" from="right" className={styles.panel}>
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
      <p className={styles.note}>
        Colecionável
        <strong>#1</strong>
      </p>
    </Panel>
  );
}
