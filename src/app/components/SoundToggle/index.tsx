"use client";

import styles from "./soundToggle.module.scss";

interface IProps {
  enabled: boolean;
  onToggle: () => void;
}

export default function SoundToggle({ enabled, onToggle }: IProps) {
  return (
    <button
      type="button"
      className={styles.toggle}
      aria-pressed={enabled}
      onClick={onToggle}
    >
      <span className={styles.bars} aria-hidden>
        <i />
        <i />
        <i />
        <i />
      </span>
      <span>{enabled ? "Som ligado" : "Som desligado"}</span>
    </button>
  );
}
