"use client";

import { AnimatePresence, MotionValue, motion, useSpring, useTransform } from "framer-motion";

import Starburst from "../Starburst";

import styles from "./sfxPop.module.scss";

import { SfxMotion } from "@/app/data/universes";

interface IProps {
  heroId: string;
  word: string;
  motionStyle: SfxMotion;
  color: string;
  pointerX: MotionValue<number>;
}

export default function SfxPop({ heroId, word, motionStyle, color, pointerX }: IProps) {
  const spring = useSpring(pointerX, { stiffness: 70, damping: 16 });
  const x = useTransform(spring, (value) => value * 34);

  return (
    <motion.div className={styles.anchor} style={{ x }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={heroId}
          initial={{ opacity: 0, scale: 0.4, rotate: -28 }}
          animate={{ opacity: 1, scale: 1, rotate: -6 }}
          exit={{ opacity: 0, scale: 1.3, rotate: 8, filter: "blur(6px)", transition: { duration: 0.12 } }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.5, delay: 0.3 }}
        >
          <div className={styles.loop} data-motion={motionStyle}>
            <span className={styles.streaks} aria-hidden />
            <Starburst word={word} fill={color} className={styles.burst} splitLetters />
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
