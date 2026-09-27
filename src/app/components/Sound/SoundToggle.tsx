"use client";

import { useSound } from "./SoundProvider";
import styles from "./soundToggle.module.scss";

export default function SoundToggle({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { enabled, toggle, cue } = useSound();

  return (
    <button
      type="button"
      className={styles.toggle}
      data-tone={tone}
      aria-pressed={enabled}
      onClick={() => {
        toggle();
        cue("pop");
      }}
    >
      <span className={styles.bars} aria-hidden>
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className={styles.label}>{enabled ? "Som ligado" : "Som desligado"}</span>
    </button>
  );
}
