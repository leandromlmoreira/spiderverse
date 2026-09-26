import Panel from "./Panel";
import styles from "./quotePanel.module.scss";

import { IHeroData } from "@/app/interfaces/heroes";

interface IProps {
  hero: IHeroData;
  tagline: string;
}

export default function QuotePanel({ hero, tagline }: IProps) {
  return (
    <Panel area="quote" order={2} tone="accent" from="top">
      <blockquote className={styles.bubble}>
        <p>{tagline}</p>
      </blockquote>
      <p className={styles.speaker}>— {hero.details.fullName}</p>
    </Panel>
  );
}
