"use client";

import { useEffect, useState } from "react";

import WebIcon from "../Wordmark/WebIcon";

import styles from "./opening.module.scss";

export type OpeningState = "playing" | "leaving" | "done";

const HOLD_MS = 1500;
const LEAVE_MS = 560;

let alreadyPlayed = false;

export function openingAlreadyPlayed() {
  return alreadyPlayed;
}

interface IProps {
  onStateChange: (state: OpeningState) => void;
}

const PLATES = ["cyan", "magenta", "yellow"] as const;

export default function Opening({ onStateChange }: IProps) {
  const [state, setState] = useState<OpeningState>("playing");

  useEffect(() => {
    alreadyPlayed = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hold = reduce ? 0 : HOLD_MS;
    const skip = () => setState((current) => (current === "playing" ? "leaving" : current));
    const timer = window.setTimeout(skip, hold);
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, []);

  useEffect(() => {
    onStateChange(state);
    if (state !== "leaving") return;
    const timer = window.setTimeout(() => setState("done"), LEAVE_MS);
    return () => window.clearTimeout(timer);
  }, [state, onStateChange]);

  if (state === "done") return null;

  return (
    <div className={styles.opening} data-state={state} aria-hidden>
      <div className={`${styles.half} ${styles.top}`} />
      <div className={`${styles.half} ${styles.bottom}`} />
      <div className={styles.slash} />
      <div className={styles.rays} />
      <div className={styles.logo}>
        <span className={styles.mark}>
          <WebIcon />
        </span>
        <p className={styles.word}>
          {PLATES.map((plate) => (
            <span key={plate} className={`${styles.plate} ${styles[plate]}`}>
              Aranhaverso
            </span>
          ))}
          <span className={styles.key}>
            Aranha<em>verso</em>
          </span>
        </p>
        <p className={styles.tagline}>
          <span>Um multiverso</span>
          <i />
          <span>Sete Aranhas</span>
        </p>
      </div>
    </div>
  );
}
