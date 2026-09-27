"use client";

import { AnimatePresence, motion } from "framer-motion";

import styles from "./issueCounter.module.scss";

import { padIssue } from "@/app/lib/format";

interface IProps {
  index: number;
  total: number;
  direction: 1 | -1;
}

function Digit({ value, direction }: { value: string; direction: 1 | -1 }) {
  return (
    <span className={styles.digit}>
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        <motion.span
          key={value}
          custom={direction}
          variants={{
            enter: (dir: number) => ({ transform: `translateY(${dir * 90}%)`, opacity: 0 }),
            center: { transform: "translateY(0%)", opacity: 1 },
            exit: (dir: number) => ({ transform: `translateY(${dir * -90}%)`, opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function IssueCounter({ index, total, direction }: IProps) {
  const digits = padIssue(index + 1).split("");

  return (
    <div className={styles.counter} aria-label={`Universo ${index + 1} de ${total}`} role="img">
      <span className={styles.badge}>
        <span className={styles.label}>Nº</span>
        {digits.map((digit, position) => (
          <Digit key={position} value={digit} direction={direction} />
        ))}
        <span className={styles.total}>/{padIssue(total)}</span>
      </span>
      <span className={styles.segments} aria-hidden>
        {Array.from({ length: total }, (_, position) => (
          <i key={position} data-active={position === index} data-past={position < index} />
        ))}
      </span>
    </div>
  );
}
