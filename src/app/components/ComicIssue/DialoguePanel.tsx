"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import Panel from "./Panel";
import styles from "./dialoguePanel.module.scss";

import { IHeroData } from "@/app/interfaces/heroes";
import { IHeroLore } from "@/app/data/lore";
import { getHeroArt } from "@/app/data/heroArt";
import { cx } from "@/app/lib/cx";

interface IProps {
  hero: IHeroData;
  lore: IHeroLore;
  monochrome?: boolean;
}

export default function DialoguePanel({ hero, lore, monochrome }: IProps) {
  const art = getHeroArt(hero.id);

  return (
    <Panel area="dialogue" order={2} tone="accent" from="top" className={styles.panel}>
      <div className={styles.bubbles} data-voice={lore.voice}>
        {lore.bubbles.map((bubble, position) => (
          <motion.p
            key={bubble.text}
            className={cx(styles.bubble, styles[bubble.kind])}
            variants={{
              hidden: { opacity: 0, scale: 0.6, y: 12 },
              shown: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: { type: "spring", duration: 0.55, bounce: 0.45, delay: 0.7 + position * 0.28 },
              },
            }}
          >
            <span className="sr-only">
              {bubble.kind === "thought" ? "Pensamento" : bubble.kind === "shout" ? "Grito" : "Fala"}:
            </span>
            {bubble.text}
          </motion.p>
        ))}
      </div>
      <div className={cx(styles.portrait, monochrome && styles.mono)} aria-hidden>
        {art && <Image src={art.figure} alt="" sizes="120px" />}
      </div>
      <p className={styles.speaker}>{hero.details.fullName}</p>
    </Panel>
  );
}
