"use client";

import styles from "./glitchFlash.module.scss";

export default function GlitchFlash({ shift, direction }: { shift: number; direction: 1 | -1 }) {
  if (shift === 0) return null;

  return (
    <div key={shift} className={styles.flash} data-direction={direction} aria-hidden>
      <span className={styles.lines} />
      <span className={styles.burst} />
      <span className={`${styles.tear} ${styles.cyan}`} />
      <span className={`${styles.tear} ${styles.magenta}`} />
      <span className={`${styles.tear} ${styles.yellow}`} />
      <span className={`${styles.tear} ${styles.cyanThin}`} />
      <span className={styles.scan} />
    </div>
  );
}
