"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import styles from "./universeDial.module.scss";

import { IHeroData } from "@/app/interfaces/heroes";
import { getHeroArt } from "@/app/data/heroArt";

interface IProps {
  heroes: IHeroData[];
  index: number;
  onSelect: (index: number) => void;
  onStep: (delta: number) => void;
}

function Arrow({ flip }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

export default function UniverseDial({ heroes, index, onSelect, onStep }: IProps) {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const active = list?.children[index] as HTMLElement | undefined;
    if (!list || !active || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: active.offsetLeft - (list.clientWidth - active.clientWidth) / 2, behavior: "smooth" });
  }, [index]);

  return (
    <nav className={styles.dial} aria-label="Universos">
      <button type="button" className={styles.arrow} onClick={() => onStep(-1)} aria-label="Universo anterior">
        <Arrow flip />
      </button>
      <ol ref={listRef} className={styles.list}>
        {heroes.map((hero, position) => {
          const active = position === index;
          const art = getHeroArt(hero.id);
          return (
            <li key={hero.id}>
              <button
                type="button"
                className={styles.chip}
                data-active={active}
                aria-current={active}
                onClick={() => onSelect(position)}
              >
                {active && <motion.span layoutId="dial-active" className={styles.highlight} transition={{ type: "spring", duration: 0.5, bounce: 0.18 }} />}
                <span className={styles.thumb}>
                  {art && <Image src={art.figure} alt="" sizes="40px" />}
                </span>
                <span className={styles.text}>
                  <small>Terra</small>
                  {hero.universe}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <button type="button" className={styles.arrow} onClick={() => onStep(1)} aria-label="Próximo universo">
        <Arrow />
      </button>
    </nav>
  );
}
