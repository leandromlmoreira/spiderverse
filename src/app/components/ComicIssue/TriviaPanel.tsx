"use client";

import { motion } from "framer-motion";

import Panel from "./Panel";
import styles from "./triviaPanel.module.scss";

export default function TriviaPanel({ trivia }: { trivia: string[] }) {
  return (
    <Panel area="trivia" order={4} tone="white" label="Você sabia?" from="right" className={styles.panel}>
      <ol className={styles.strip}>
        {trivia.map((fact, position) => (
          <motion.li
            key={fact}
            className={styles.item}
            variants={{
              hidden: { opacity: 0, y: 24 },
              shown: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.8 + position * 0.14 },
              },
            }}
          >
            <div className={styles.fact}>
              <span className={styles.number} aria-hidden>
                {position + 1}
              </span>
              <p>{fact}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </Panel>
  );
}
