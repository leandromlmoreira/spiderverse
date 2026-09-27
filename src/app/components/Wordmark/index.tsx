import TransitionLink from "../PageTransition/TransitionLink";

import WebIcon from "./WebIcon";
import styles from "./wordmark.module.scss";

interface IProps {
  href: string;
  tone?: "dark" | "light";
}

export default function Wordmark({ href, tone = "dark" }: IProps) {
  return (
    <TransitionLink href={href} label="Multiverso!" className={styles.wordmark} data-tone={tone} aria-label="Aranhaverso, voltar ao início">
      <span className={styles.mark} aria-hidden>
        <WebIcon />
      </span>
      <span className={styles.word}>
        Aranha<em>verso</em>
      </span>
    </TransitionLink>
  );
}
