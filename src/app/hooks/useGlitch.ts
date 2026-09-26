"use client";

import { RefObject, useEffect } from "react";

const GLITCH_FRAMES: Keyframe[] = [
  { clipPath: "inset(0 0 0 0)", transform: "translateX(0) skewX(0deg)", filter: "drop-shadow(26px 0 0 rgba(0,212,255,.9)) drop-shadow(-26px 0 0 rgba(255,31,143,.9))" },
  { clipPath: "inset(8% 0 62% 0)", transform: "translateX(-18px) skewX(-8deg)", offset: 0.14 },
  { clipPath: "inset(58% 0 12% 0)", transform: "translateX(16px) skewX(6deg)", offset: 0.28 },
  { clipPath: "inset(28% 0 38% 0)", transform: "translateX(-8px) skewX(-3deg)", offset: 0.42 },
  { clipPath: "inset(0 0 0 0)", transform: "translateX(4px) skewX(0deg)", offset: 0.58 },
  { clipPath: "inset(0 0 0 0)", transform: "translateX(0) skewX(0deg)", filter: "drop-shadow(3px 0 0 rgba(0,212,255,.55)) drop-shadow(-3px 0 0 rgba(255,31,143,.55))" },
];

export function useGlitch(ref: RefObject<HTMLElement | null>, trigger: number, enabled: boolean) {
  useEffect(() => {
    const element = ref.current;
    if (!enabled || !element || trigger === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animation = element.animate(GLITCH_FRAMES, {
      duration: 620,
      delay: 260,
      easing: "cubic-bezier(0.23, 1, 0.32, 1)",
      fill: "backwards",
    });
    return () => animation.cancel();
  }, [ref, trigger, enabled]);
}
