"use client";

import styles from "./glitchFlash.module.scss";

export default function GlitchFlash({ shift }: { shift: number }) {
  if (shift === 0) return null;

  return (
    <div key={shift} className={styles.flash} aria-hidden>
      <span className={styles.cyan} />
      <span className={styles.magenta} />
      <span className={styles.yellow} />
      <span className={styles.scan} />
    </div>
  );
}
