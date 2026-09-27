"use client";

import { motion } from "framer-motion";

import Panel from "./Panel";
import styles from "./statPanel.module.scss";

import { formatDecimal } from "@/app/lib/format";

const SCALE_MAX = 2.2;
const TICKS = [2, 1.5, 1, 0.5, 0];

export default function HeightPanel({ height }: { height: number }) {
  const ratio = Math.min(height / SCALE_MAX, 1);

  return (
    <Panel area="height" order={5} tone="paper" label="Altura" from="left">
      <div className={styles.body}>
        <p className={styles.value}>
          {formatDecimal(height)}
          <small>m</small>
        </p>
        <div className={styles.ruler} aria-hidden>
          <div className={styles.ticks}>
            {TICKS.map((tick) => (
              <span key={tick} style={{ bottom: `${(tick / SCALE_MAX) * 100}%` }}>
                {tick.toLocaleString("pt-BR")}
              </span>
            ))}
          </div>
          <div className={styles.track}>
            <motion.div
              className={styles.fill}
              variants={{
                hidden: { transform: "scaleY(0)" },
                shown: {
                  transform: `scaleY(${ratio})`,
                  transition: { duration: 1.1, ease: [0.23, 1, 0.32, 1], delay: 0.8 },
                },
              }}
            />
          </div>
        </div>
      </div>
    </Panel>
  );
}
