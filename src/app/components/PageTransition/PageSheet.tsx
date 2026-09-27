"use client";

import { motion } from "framer-motion";

import styles from "./transition.module.scss";
import type { Phase } from "./TransitionCurtain";

interface IProps {
  phase: Phase;
  label: string;
  direction: 1 | -1;
  onCovered: () => void;
  onRevealed: () => void;
}

const COVER_EASE = [0.2, 0.7, 0.3, 1] as const;
const REVEAL_EASE = [0.55, 0, 0.75, 0.2] as const;

function sheetState(phase: Phase, direction: 1 | -1) {
  const coverHinge = direction === 1 ? "100% 50%" : "0% 50%";
  const revealHinge = direction === 1 ? "0% 50%" : "100% 50%";
  if (phase === "idle") return { angle: direction * 92, origin: coverHinge, shade: 1 };
  if (phase === "revealing") return { angle: direction * -92, origin: revealHinge, shade: 1 };
  return { angle: 0, origin: phase === "covering" ? coverHinge : revealHinge, shade: 0 };
}

function timing(phase: Phase) {
  if (phase === "idle") return { duration: 0 };
  if (phase === "revealing") return { duration: 0.5, ease: REVEAL_EASE };
  return { duration: 0.46, ease: COVER_EASE };
}

export default function PageSheet({ phase, label, direction, onCovered, onRevealed }: IProps) {
  const state = sheetState(phase, direction);
  const transition = timing(phase);

  return (
    <motion.div
      className={styles.sheet}
      initial={false}
      animate={{ rotateY: state.angle }}
      style={{ transformOrigin: state.origin }}
      transition={transition}
      onAnimationComplete={() => {
        if (phase === "covering") onCovered();
        if (phase === "revealing") onRevealed();
      }}
    >
      <div className={styles.sheetPaper}>
        <p className={styles.sheetKicker}>{direction === 1 ? "Próxima edição" : "Edição anterior"}</p>
        <p className={styles.sheetLabel}>{label}</p>
        <p className={styles.sheetFoot}>Vire a página</p>
      </div>
      <motion.div
        className={styles.sheetShade}
        data-direction={direction}
        initial={false}
        animate={{ opacity: state.shade }}
        transition={transition}
      />
    </motion.div>
  );
}
