"use client";

import { RefObject, useEffect } from "react";

const GLITCH_FRAMES: Keyframe[] = [
  {
    clipPath: "inset(0 0 0 0)",
    transform: "translateX(0) skewX(0deg) scale(1.04)",
    filter: "drop-shadow(34px 0 0 rgba(0,212,255,.95)) drop-shadow(-34px 0 0 rgba(255,31,143,.95)) brightness(1.6)",
  },
  { clipPath: "inset(6% 0 64% 0)", transform: "translateX(-26px) skewX(-10deg)", offset: 0.12 },
  { clipPath: "inset(56% 0 10% 0)", transform: "translateX(22px) skewX(8deg)", offset: 0.24 },
  { clipPath: "inset(30% 0 36% 0)", transform: "translateX(-12px) skewX(-4deg)", offset: 0.36 },
  { clipPath: "inset(0 0 0 0)", transform: "translateX(6px) skewX(0deg)", offset: 0.5 },
  {
    clipPath: "inset(0 0 0 0)",
    transform: "translateX(0) skewX(0deg) scale(1)",
    filter: "drop-shadow(3px 0 0 rgba(0,212,255,.55)) drop-shadow(-3px 0 0 rgba(255,31,143,.55)) brightness(1)",
  },
];

export function useGlitch(ref: RefObject<HTMLElement | null>, trigger: number, enabled: boolean) {
  useEffect(() => {
    const element = ref.current;
    if (!enabled || !element || trigger === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animation = element.animate(GLITCH_FRAMES, {
      duration: 440,
      delay: 110,
      easing: "cubic-bezier(0.23, 1, 0.32, 1)",
      fill: "backwards",
    });
    return () => animation.cancel();
  }, [ref, trigger, enabled]);
}
