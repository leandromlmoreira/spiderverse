import Image from "next/image";

import TransitionLink from "../PageTransition/TransitionLink";

import Panel from "./Panel";
import styles from "./issueNav.module.scss";

import { IHeroData } from "@/app/interfaces/heroes";
import { getHeroArt } from "@/app/data/heroArt";
import { getUniverseTheme } from "@/app/data/universes";

interface IProps {
  previous: IHeroData;
  next: IHeroData;
}

function IssueLink({ hero, direction }: { hero: IHeroData; direction: "previous" | "next" }) {
  const art = getHeroArt(hero.id);
  const theme = getUniverseTheme(hero.id);

  return (
    <TransitionLink
      href={`/hero/${hero.id}`}
      label={`Edição #${hero.universe}`}
      className={styles.link}
      data-direction={direction}
      style={{ "--hover": theme.primary } as React.CSSProperties}
    >
      <span className={styles.thumb}>{art && <Image src={art.figure} alt="" sizes="72px" />}</span>
      <span className={styles.text}>
        <small>{direction === "previous" ? "Edição anterior" : "Próxima edição"}</small>
        <strong>{hero.name}</strong>
        <em>Terra-{hero.universe}</em>
      </span>
    </TransitionLink>
  );
}

export default function IssueNav({ previous, next }: IProps) {
  return (
    <Panel area="nav" order={6} tone="white" className={styles.panel} from="left">
      <IssueLink hero={previous} direction="previous" />
      <p className={styles.continues} aria-hidden>
        Continua...
      </p>
      <IssueLink hero={next} direction="next" />
    </Panel>
  );
}
