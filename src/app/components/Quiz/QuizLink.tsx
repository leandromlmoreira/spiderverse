import TransitionLink from "../PageTransition/TransitionLink";
import WebIcon from "../Wordmark/WebIcon";

import styles from "./quizLink.module.scss";

export default function QuizLink({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <TransitionLink href="/quiz/" label="Quiz!" className={`${styles.link} ${className ?? ""}`} data-tone={tone}>
      <span className={styles.icon} aria-hidden>
        <WebIcon />
      </span>
      Qual Aranha é você?
    </TransitionLink>
  );
}
