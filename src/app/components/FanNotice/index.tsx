import styles from "./fanNotice.module.scss";

export default function FanNotice({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <p className={`${styles.notice} ${className ?? ""}`} data-tone={tone}>
      Projeto de fã, sem fins comerciais. Personagens © Marvel / Sony.
    </p>
  );
}
