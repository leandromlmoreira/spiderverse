"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import styles from "./heroStage.module.scss";

import { IHeroData } from "@/app/interfaces/heroes";
import { getHeroArt } from "@/app/data/heroArt";
import { getUniverseTheme } from "@/app/data/universes";
import { useGlitch } from "@/app/hooks/useGlitch";
import { cx } from "@/app/lib/cx";

interface IProps {
  hero: IHeroData;
  offset: number;
  shift: number;
  compact: boolean;
}

interface ISlot {
  x: number;
  scale: number;
  opacity: number;
  blur: number;
  brightness: number;
  zIndex: number;
}

function slotFor(offset: number, compact: boolean): ISlot {
  const distance = Math.abs(offset);
  const side = Math.sign(offset);
  if (distance === 0) return { x: 0, scale: 1, opacity: 1, blur: 0, brightness: 1, zIndex: 5 };
  if (distance === 1)
    return { x: side * (compact ? 50 : 44), scale: 0.56, opacity: compact ? 0.7 : 0.8, blur: 2.5, brightness: 0.45, zIndex: 3 };
  return { x: side * (compact ? 110 : 80), scale: 0.38, opacity: 0, blur: 6, brightness: 0.3, zIndex: 1 };
}

export default function StageFigure({ hero, offset, shift, compact }: IProps) {
  const art = getHeroArt(hero.id);
  const theme = getUniverseTheme(hero.id);
  const innerRef = useRef<HTMLDivElement>(null);
  const isCenter = offset === 0;
  const slot = slotFor(offset, compact);

  useGlitch(innerRef, shift, isCenter);

  return (
    <motion.div
      className={styles.figure}
      initial={false}
      animate={{
        transform: `translateX(${slot.x}%) scale(${slot.scale})`,
        opacity: slot.opacity,
        filter: `blur(${slot.blur}px) brightness(${slot.brightness})`,
      }}
      transition={{ duration: 0.85, ease: [0.77, 0, 0.175, 1] }}
      style={{ zIndex: slot.zIndex }}
      aria-hidden={!isCenter}
    >
      <div
        ref={innerRef}
        className={cx(styles.figureInner, isCenter && styles.registered, theme.monochrome && styles.mono)}
        style={{ height: `${theme.scale * 100}%` }}
      >
        {art ? (
          <Image
            src={art.figure}
            alt={isCenter ? `${hero.name} da Terra-${hero.universe}` : ""}
            priority={Math.abs(offset) <= 1}
            draggable={false}
            sizes="(max-width: 768px) 80vw, 40vw"
          />
        ) : (
          <div className={styles.silhouette} />
        )}
      </div>
    </motion.div>
  );
}
