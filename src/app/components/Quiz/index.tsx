"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";

import Wordmark from "../Wordmark";
import SoundToggle from "../Sound/SoundToggle";
import { useSound } from "../Sound/SoundProvider";
import FanNotice from "../FanNotice";
import TransitionLink from "../PageTransition/TransitionLink";

import QuizIntro from "./QuizIntro";
import QuizQuestion from "./QuizQuestion";
import QuizResult from "./QuizResult";
import styles from "./quiz.module.scss";

import { QUIZ, scoreQuiz } from "@/app/data/quiz";
import { getUniverseTheme } from "@/app/data/universes";
import { IHeroData } from "@/app/interfaces/heroes";

interface IProps {
  heroes: IHeroData[];
}

type Stage = "intro" | "question" | "result";

const HASH_PREFIX = "#r=";

function parseAnswers(hash: string): number[] | null {
  if (!hash.startsWith(HASH_PREFIX)) return null;
  const digits = hash.slice(HASH_PREFIX.length).split("").map(Number);
  const valid =
    digits.length === QUIZ.length &&
    digits.every((value, index) => Number.isInteger(value) && value >= 0 && value < QUIZ[index].options.length);
  return valid ? digits : null;
}

export default function QuizGame({ heroes }: IProps) {
  const { cue } = useSound();
  const [stage, setStage] = useState<Stage>("intro");
  const [answers, setAnswers] = useState<number[]>([]);
  const [shared, setShared] = useState(false);

  const heroIds = useMemo(() => heroes.map((hero) => hero.id), [heroes]);
  const matches = useMemo(() => (stage === "result" ? scoreQuiz(answers, heroIds) : []), [stage, answers, heroIds]);
  const winner = heroes.find((hero) => hero.id === matches[0]?.heroId);
  const theme = getUniverseTheme(winner?.id ?? "");

  useEffect(() => {
    const fromHash = parseAnswers(window.location.hash);
    if (!fromHash) return;
    setAnswers(fromHash);
    setShared(true);
    setStage("result");
  }, []);

  const start = useCallback(() => {
    cue("pop");
    setAnswers([]);
    setShared(false);
    setStage("question");
    window.history.replaceState(null, "", window.location.pathname);
  }, [cue]);

  const answer = useCallback(
    (choice: number) => {
      const next = [...answers, choice];
      setAnswers(next);
      if (next.length < QUIZ.length) {
        cue("tick");
        return;
      }
      cue("stamp");
      window.history.replaceState(null, "", `${window.location.pathname}${HASH_PREFIX}${next.join("")}`);
      setStage("result");
    },
    [answers, cue]
  );

  const themeStyle = winner
    ? ({
        "--primary": theme.primary,
        "--secondary": theme.secondary,
        "--glow": theme.glow,
        "--base": theme.base,
      } as React.CSSProperties)
    : undefined;

  return (
    <main className={styles.page} style={themeStyle} data-stage={stage}>
      <div className={styles.backdrop} aria-hidden />
      <header className={styles.topbar}>
        <Wordmark href="/" />
        <div className={styles.topbarEnd}>
          <TransitionLink href="/" label="Multiverso!" className={styles.back} aria-label="Voltar ao multiverso">
            <svg viewBox="0 0 20 20" aria-hidden>
              <path d="M16 10H5M9 5l-5 5 5 5" />
            </svg>
            <span>Multiverso</span>
          </TransitionLink>
          <SoundToggle />
        </div>
      </header>

      <div className={styles.stage}>
        <AnimatePresence mode="wait">
          {stage === "intro" && <QuizIntro key="intro" heroes={heroes} onStart={start} />}
          {stage === "question" && (
            <QuizQuestion
              key={`question-${answers.length}`}
              index={answers.length}
              question={QUIZ[answers.length]}
              total={QUIZ.length}
              onAnswer={answer}
            />
          )}
          {stage === "result" && winner && (
            <QuizResult
              key="result"
              hero={winner}
              heroes={heroes}
              matches={matches}
              shared={shared}
              onRestart={start}
            />
          )}
        </AnimatePresence>
      </div>

      <footer className={styles.footer}>
        <FanNotice />
      </footer>
    </main>
  );
}
