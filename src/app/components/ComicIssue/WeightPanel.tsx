"use client";

import { motion } from "framer-motion";

import Panel from "./Panel";
import styles from "./statPanel.module.scss";

import { formatDecimal } from "@/app/lib/format";

const SCALE_MAX = 120;
const CENTER = 60;
const TICKS = Array.from({ length: 13 }, (_, index) => index / 12);

function arcPoint(ratio: number, radius: number) {
  const angle = Math.PI * (1 - ratio);
  return { x: CENTER + radius * Math.cos(angle), y: CENTER - radius * Math.sin(angle) };
}

export default function WeightPanel({ weight }: { weight: number }) {
  const ratio = Math.min(weight / SCALE_MAX, 1);
  const start = arcPoint(0, 50);
  const end = arcPoint(1, 50);

  return (
    <Panel area="weight" order={6} tone="ink" label="Peso" from="bottom">
      <div className={styles.body}>
        <p className={styles.value}>
          {formatDecimal(weight)}
          <small>kg</small>
        </p>
        <div className={styles.gauge} aria-hidden>
          <svg viewBox="0 0 120 64">
            <path d={`M ${start.x} ${start.y} A 50 50 0 0 1 ${end.x} ${end.y}`} className={styles.arc} />
            {TICKS.map((tick) => {
              const inner = arcPoint(tick, 42);
              const outer = arcPoint(tick, 50);
              return <line key={tick} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} className={styles.tick} />;
            })}
          </svg>
          <motion.span
            className={styles.needle}
            variants={{
              hidden: { transform: "rotate(-90deg)" },
              shown: {
                transform: `rotate(${-90 + ratio * 180}deg)`,
                transition: { type: "spring", duration: 1.4, bounce: 0.35, delay: 0.9 },
              },
            }}
          />
          <span className={styles.hub} />
        </div>
      </div>
    </Panel>
  );
}
