"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import Panel from "./Panel";
import styles from "./powerCard.module.scss";

import { IHeroData } from "@/app/interfaces/heroes";
import { IHeroLore, powerScore } from "@/app/data/lore";
import { getHeroArt } from "@/app/data/heroArt";
import { cx } from "@/app/lib/cx";
import { padIssue } from "@/app/lib/format";

interface IProps {
  hero: IHeroData;
  lore: IHeroLore;
  number: number;
  total: number;
  monochrome?: boolean;
}

export default function PowerCard({ hero, lore, number, total, monochrome }: IProps) {
  const art = getHeroArt(hero.id);
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const score = powerScore(lore.powers);

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card || reduceMotion || event.pointerType !== "mouse") return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    card.style.setProperty("--rx", `${(0.5 - y) * 14}deg`);
    card.style.setProperty("--ry", `${(x - 0.5) * 18}deg`);
    card.style.setProperty("--mx", `${x * 100}%`);
    card.style.setProperty("--my", `${y * 100}%`);
  };

  const handleLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  return (
    <Panel area="card" order={3} tone="ink" label="Carta de poder" from="left" className={styles.panel}>
      <div className={styles.rays} aria-hidden />
      <div className={styles.scene} onPointerMove={handleMove} onPointerLeave={handleLeave}>
        <div ref={cardRef} className={styles.card}>
          <div className={styles.foil} aria-hidden />
          <header className={styles.head}>
            <h2 className={styles.title}>{hero.name}</h2>
            <p className={styles.score} aria-label={`Poder geral ${score}`}>
              <small>PWR</small>
              {score}
            </p>
          </header>
          <div className={cx(styles.art, monochrome && styles.mono)}>
            {art && <Image src={art.figure} alt="" sizes="320px" />}
            <span className={styles.type}>
              Terra-{hero.universe} · {lore.archetype}
            </span>
          </div>
          <ul className={styles.stats}>
            {lore.powers.map((power, position) => (
              <li key={power.label}>
                <span className={styles.statLabel} title={power.label}>
                  {power.short}
                </span>
                <span className={styles.track} aria-hidden>
                  <motion.i
                    variants={{
                      hidden: { transform: "scaleX(0)" },
                      shown: {
                        transform: `scaleX(${power.value / 100})`,
                        transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.9 + position * 0.08 },
                      },
                    }}
                  />
                </span>
                <strong>
                  <span className="sr-only">{power.label}: </span>
                  {power.value}
                </strong>
              </li>
            ))}
          </ul>
          <ul className={styles.abilities} aria-label="Habilidades">
            {lore.abilities.map((ability) => (
              <li key={ability}>{ability}</li>
            ))}
          </ul>
          <footer className={styles.foot}>
            <span>Aranhaverso</span>
            <span>
              {padIssue(number)}/{padIssue(total)}
            </span>
          </footer>
        </div>
      </div>
    </Panel>
  );
}
