import TransitionLink from "../PageTransition/TransitionLink";

import styles from "./wordmark.module.scss";

interface IProps {
  href: string;
  tone?: "dark" | "light";
}

export default function Wordmark({ href, tone = "dark" }: IProps) {
  return (
    <TransitionLink href={href} label="Multiverso!" className={styles.wordmark} data-tone={tone} aria-label="Aranhaverso, voltar ao início">
      <span className={styles.mark} aria-hidden>
        <svg viewBox="0 0 32 32">
          <path d="M16 3v26M3 16h26M6.8 6.8l18.4 18.4M25.2 6.8 6.8 25.2" />
          <circle cx="16" cy="16" r="5" />
          <circle cx="16" cy="16" r="10" />
        </svg>
      </span>
      <span className={styles.word}>
        Aranha<em>verso</em>
      </span>
    </TransitionLink>
  );
}
