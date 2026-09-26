"use client";

import { MotionValue, PanInfo, motion, useSpring, useTransform } from "framer-motion";

import StageFigure from "./StageFigure";
import styles from "./heroStage.module.scss";

import { IHeroData } from "@/app/interfaces/heroes";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";

interface IProps {
  heroes: IHeroData[];
  index: number;
  shift: number;
  onStep: (delta: number) => void;
  dragX: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}

const SWIPE_DISTANCE = 64;
const SWIPE_VELOCITY = 420;

function relativeOffset(position: number, active: number, total: number) {
  const half = Math.floor(total / 2);
  return ((((position - active) % total) + total + half) % total) - half;
}

export default function HeroStage({ heroes, index, shift, onStep, dragX, pointerX, pointerY }: IProps) {
  const compact = useMediaQuery("(max-width: 768px)");
  const springX = useSpring(pointerX, { stiffness: 80, damping: 20 });
  const springY = useSpring(pointerY, { stiffness: 80, damping: 20 });
  const tiltX = useTransform(springX, (value) => value * 16);
  const tiltY = useTransform(springY, (value) => value * 10);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) onStep(1);
    else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) onStep(-1);
  };

  return (
    <motion.div
      className={styles.stage}
      drag="x"
      dragSnapToOrigin
      dragElastic={0.22}
      dragTransition={{ bounceStiffness: 380, bounceDamping: 32 }}
      onDragEnd={handleDragEnd}
      style={{ x: dragX }}
    >
      <motion.div className={styles.parallax} style={{ x: tiltX, y: tiltY }}>
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
