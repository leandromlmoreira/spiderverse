"use client";

import { motion, useReducedMotion } from "framer-motion";

import styles from "./panel.module.scss";

import { cx } from "@/app/lib/cx";

interface IProps {
  area: string;
  order: number;
  tone?: "paper" | "white" | "ink" | "theme" | "accent" | "yellow";
  label?: string;
  className?: string;
  from?: "left" | "right" | "top" | "bottom";
  children: React.ReactNode;
}

const HIDDEN: Record<NonNullable<IProps["from"]>, string> = {
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
  top: "inset(0% 0% 100% 0%)",
  bottom: "inset(100% 0% 0% 0%)",
};

const SHOWN = "inset(-40% -10% -10% -10%)";

export default function Panel({ area, order, tone = "white", label, className, from = "left", children }: IProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      className={styles.slot}
      style={{ gridArea: area }}
      initial={reduceMotion ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.div
        className={cx(styles.panel, styles[tone], className)}
        variants={{ hidden: { clipPath: HIDDEN[from] }, shown: { clipPath: SHOWN } }}
        transition={{ duration: 0.75, ease: [0.77, 0, 0.175, 1], delay: 0.1 + order * 0.08 }}
      >
        {label && <p className={styles.label}>{label}</p>}
        {children}
      </motion.div>
    </motion.section>
  );
}
