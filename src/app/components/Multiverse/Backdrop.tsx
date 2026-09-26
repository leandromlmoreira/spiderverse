"use client";

import { AnimatePresence, MotionValue, motion, useSpring, useTransform } from "framer-motion";

import styles from "./backdrop.module.scss";

import { IUniverseTheme } from "@/app/data/universes";

interface IProps {
  heroId: string;
  theme: IUniverseTheme;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}

export default function Backdrop({ heroId, theme, pointerX, pointerY }: IProps) {
  const springX = useSpring(pointerX, { stiffness: 60, damping: 18 });
  const springY = useSpring(pointerY, { stiffness: 60, damping: 18 });
  const dotsX = useTransform(springX, (value) => value * -18);
  const dotsY = useTransform(springY, (value) => value * -12);
  const raysX = useTransform(springX, (value) => value * 10);

  return (
    <div className={styles.backdrop} aria-hidden>
      <AnimatePresence initial={false}>
        <motion.div
          key={heroId}
          className={styles.wash}
          style={{
            background: `radial-gradient(120% 90% at 66% 40%, ${theme.glow} 0%, ${theme.base} 58%, #040406 100%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
        />
      </AnimatePresence>
      <motion.div className={styles.rays} style={{ x: raysX }} />
      <motion.div className={styles.dots} style={{ x: dotsX, y: dotsY }} />
      <div className={styles.dotsBottom} />
      <div className={styles.vignette} />
    </div>
  );
}
