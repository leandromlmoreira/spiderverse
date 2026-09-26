"use client";

import { AnimatePresence, MotionValue, motion, useSpring, useTransform } from "framer-motion";

import Starburst from "../Starburst";

import styles from "./sfxPop.module.scss";

interface IProps {
  heroId: string;
  word: string;
  color: string;
  pointerX: MotionValue<number>;
}

export default function SfxPop({ heroId, word, color, pointerX }: IProps) {
  const spring = useSpring(pointerX, { stiffness: 70, damping: 16 });
  const x = useTransform(spring, (value) => value * 34);

  return (
    <motion.div className={styles.anchor} style={{ x }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={heroId}
          initial={{ opacity: 0, scale: 0.55, rotate: -24 }}
          animate={{ opacity: 1, scale: 1, rotate: -6 }}
          exit={{ opacity: 0, scale: 0.8, rotate: 6, transition: { duration: 0.14 } }}
          transition={{ type: "spring", duration: 0.55, bounce: 0.45, delay: 0.45 }}
        >
          <Starburst word={word} fill={color} className={styles.burst} />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
