"use client";

import { AnimatePresence, MotionValue, motion, useSpring, useTransform } from "framer-motion";

import styles from "./universeNumber.module.scss";

interface IProps {
  value: number;
  direction: 1 | -1;
  pointerX: MotionValue<number>;
  dragX: MotionValue<number>;
}

export default function UniverseNumber({ value, direction, pointerX, dragX }: IProps) {
  const spring = useSpring(pointerX, { stiffness: 50, damping: 20 });
  const x = useTransform(() => spring.get() * -30 + dragX.get() * -0.35);

  return (
    <motion.div className={styles.wrap} style={{ x }} aria-hidden>
      <span className={styles.label}>Terra</span>
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        <motion.span
          key={value}
          className={styles.number}
          custom={direction}
          variants={{
            enter: (dir: number) => ({ opacity: 0, transform: `translateX(${dir * 18}%) skewX(${dir * -12}deg)` }),
            center: { opacity: 1, transform: "translateX(0%) skewX(0deg)" },
            exit: (dir: number) => ({ opacity: 0, transform: `translateX(${dir * -14}%) skewX(${dir * 10}deg)` }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}
