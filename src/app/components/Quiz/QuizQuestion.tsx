"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import Starburst from "../Starburst";

import styles from "./question.module.scss";

import { IQuizQuestion } from "@/app/data/quiz";

interface IProps {
  index: number;
  total: number;
  question: IQuizQuestion;
  onAnswer: (choice: number) => void;
}

const LETTERS = ["A", "B", "C", "D"];
const PICK_DELAY = 420;

export default function QuizQuestion({ index, total, question, onAnswer }: IProps) {
  const [picked, setPicked] = useState<number | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (picked === null) return;
    const timer = window.setTimeout(() => onAnswer(picked), PICK_DELAY);
    return () => window.clearTimeout(timer);
  }, [picked, onAnswer]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (picked !== null || event.altKey || event.ctrlKey || event.metaKey) return;
      const byNumber = Number(event.key) - 1;
      const byLetter = LETTERS.indexOf(event.key.toUpperCase());
      const choice = byNumber >= 0 && byNumber < question.options.length ? byNumber : byLetter;
      if (choice >= 0 && choice < question.options.length) setPicked(choice);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [picked, question.options.length]);

  return (
    <motion.section
      className={styles.wrap}
      initial={{ opacity: 0, x: 80, rotate: 2 }}
      animate={{ opacity: 1, x: 0, rotate: 0 }}
      exit={{ opacity: 0, x: -80, rotate: -2, transition: { duration: 0.22, ease: [0.55, 0, 1, 0.45] } }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      aria-labelledby="quiz-question"
    >
      <div className={styles.progress}>
        <p>
          Pergunta <strong>{index + 1}</strong> de {total}
        </p>
        <span className={styles.bar} aria-hidden>
          {Array.from({ length: total }, (_, position) => (
            <i key={position} data-done={position < index} data-current={position === index} />
          ))}
        </span>
      </div>

      <div className={styles.panel}>
        <motion.div
          className={styles.sfx}
          initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 8 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.5, delay: 0.2 }}
        >
          <Starburst word={question.sfx} fill="var(--magenta)" className={styles.burst} />
        </motion.div>
        <h1 id="quiz-question" ref={headingRef} tabIndex={-1} className={styles.prompt}>
          {question.prompt}
        </h1>
        <ol className={styles.options}>
          {question.options.map((option, position) => (
            <motion.li
              key={option.text}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1], delay: 0.12 + position * 0.06 }}
            >
              <button
                type="button"
                className={styles.option}
                data-picked={picked === position}
                data-dimmed={picked !== null && picked !== position}
                disabled={picked !== null}
                onClick={() => setPicked(position)}
              >
                <span className={styles.letter} aria-hidden>
                  {LETTERS[position]}
                </span>
                <span className={styles.text}>{option.text}</span>
              </button>
            </motion.li>
          ))}
        </ol>
        <p className={styles.hint} aria-hidden>
          Dica: use as teclas <kbd>A</kbd> a <kbd>D</kbd>
        </p>
      </div>
    </motion.section>
  );
}
