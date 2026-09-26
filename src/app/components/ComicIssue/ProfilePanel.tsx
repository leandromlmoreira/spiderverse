import Panel from "./Panel";
import styles from "./profilePanel.module.scss";

import { IHeroData } from "@/app/interfaces/heroes";
import { formatBirthday } from "@/app/lib/format";

export default function ProfilePanel({ hero }: { hero: IHeroData }) {
  const rows = [
    { label: "Identidade", value: hero.details.fullName },
    { label: "Nascimento", value: formatBirthday(hero.details.birthday) },
    { label: "Terra natal", value: hero.details.homeland },
    { label: "Universo", value: `Terra-${hero.universe}` },
  ];

  return (
    <Panel area="profile" order={1} tone="white" label="Ficha secreta" from="right">
      <dl className={styles.list}>
        {rows.map((row) => (
          <div key={row.label} className={styles.row}>
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
      <span className={styles.stamp} aria-hidden>
        Confidencial
      </span>
    </Panel>
  );
}
