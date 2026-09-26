"use client";

import { motion } from "framer-motion";

import styles from "./transition.module.scss";

type Phase = "idle" | "covering" | "covered" | "revealing";

interface IProps {
  phase: Phase;
  label: string;
  onCovered: () => void;
  onRevealed: () => void;
}

const STRIPES = ["cyan", "magenta", "yellow", "ink"] as const;
const EASE = [0.77, 0, 0.175, 1] as const;

function stripeTarget(phase: Phase) {
  if (phase === "idle") return "translateX(-120%) skewX(-14deg)";
  if (phase === "revealing") return "translateX(120%) skewX(-14deg)";
  return "translateX(0%) skewX(-14deg)";
}

export default function TransitionCurtain({ phase, label, onCovered, onRevealed }: IProps) {
  const active = phase !== "idle";

  return (
    <div className={styles.curtain} data-active={active} aria-hidden={!active}>
      {STRIPES.map((tone, index) => {
        const isLast = index === STRIPES.length - 1;
        return (
          <motion.div
            key={tone}
            className={`${styles.stripe} ${styles[tone]}`}
            initial={false}
            animate={{ transform: stripeTarget(phase) }}
            transition={
              phase === "idle"
                ? { duration: 0 }
                : { duration: 0.5, ease: EASE, delay: index * 0.06 }
            }
            onAnimationComplete={() => {
              if (!isLast) return;
              if (phase === "covering") onCovered();
              if (phase === "revealing") onRevealed();
            }}
          />
        );
      })}
      <motion.p
        className={styles.label}
        initial={false}
        animate={
          phase === "covering" || phase === "covered"
            ? { opacity: 1, transform: "scale(1) rotate(-4deg)" }
            : { opacity: 0, transform: "scale(0.86) rotate(-8deg)" }
        }
        transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1], delay: phase === "covering" ? 0.28 : 0 }}
      >
        {label}
      </motion.p>
    </div>
  );
}
