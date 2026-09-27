"use client";

import { useEffect, useRef } from "react";
import { MotionValue, PanInfo, animate, motion, useSpring, useTransform, useVelocity } from "framer-motion";

import StageFigure from "./StageFigure";
import styles from "./heroStage.module.scss";

import { IHeroData } from "@/app/interfaces/heroes";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";

interface IProps {
  heroes: IHeroData[];
  index: number;
  shift: number;
  ready: boolean;
  onStep: (delta: number) => void;
  dragX: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}

const SWIPE_VELOCITY = 380;

function relativeOffset(position: number, active: number, total: number) {
  const half = Math.floor(total / 2);
  return ((((position - active) % total) + total + half) % total) - half;
}

export default function HeroStage({ heroes, index, shift, ready, onStep, dragX, pointerX, pointerY }: IProps) {
  const compact = useMediaQuery("(max-width: 768px)");
  const stageRef = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const springX = useSpring(pointerX, { stiffness: 80, damping: 20 });
  const springY = useSpring(pointerY, { stiffness: 80, damping: 20 });
  const tiltX = useTransform(springX, (value) => value * 16);
  const tiltY = useTransform(springY, (value) => value * 10);
  const turnY = useTransform(springX, (value) => value * 5);
  const turnX = useTransform(springY, (value) => value * -3);
  const velocity = useVelocity(dragX);
  const skew = useSpring(useTransform(velocity, [-2400, 0, 2400], [9, 0, -9], { clamp: true }), {
    stiffness: 300,
    damping: 30,
  });

  useEffect(() => {
    if (!compact || !ready || shift > 0) return;
    const timer = window.setTimeout(() => {
      if (touched.current) return;
      animate(dragX, [0, -46, 0], { duration: 1.1, ease: [0.45, 0, 0.2, 1], times: [0, 0.4, 1] });
    }, 900);
    return () => window.clearTimeout(timer);
  }, [compact, ready, shift, dragX]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const width = stageRef.current?.clientWidth ?? 400;
    const distance = Math.min(80, width * 0.16);
    const delta =
      info.offset.x < -distance || info.velocity.x < -SWIPE_VELOCITY
        ? 1
        : info.offset.x > distance || info.velocity.x > SWIPE_VELOCITY
          ? -1
          : 0;
    if (delta === 0) return;
    if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate?.(8);
    onStep(delta);
  };

  return (
    <motion.div
      ref={stageRef}
      className={styles.stage}
      drag="x"
      dragDirectionLock
      dragSnapToOrigin
      dragElastic={0.28}
      dragMomentum={false}
      dragTransition={{ bounceStiffness: 420, bounceDamping: 34 }}
      onDragStart={() => {
        touched.current = true;
      }}
      onDragEnd={handleDragEnd}
      style={{ x: dragX }}
    >
      <motion.div className={styles.parallax} style={{ x: tiltX, y: tiltY, rotateY: turnY, rotateX: turnX, skewX: skew }}>
        <div className={styles.floor} />
        {heroes.map((hero, position) => (
          <StageFigure
            key={hero.id}
            hero={hero}
            offset={relativeOffset(position, index, heroes.length)}
            shift={shift}
            compact={compact}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
