"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useReducedMotion } from "framer-motion";

import { useSound } from "../Sound/SoundProvider";

import TransitionCurtain, { Phase, Variant } from "./TransitionCurtain";

export interface INavigateOptions {
  variant?: Variant;
  direction?: 1 | -1;
}

interface ITransitionContext {
  navigate: (href: string, label: string, options?: INavigateOptions) => void;
}

const TransitionContext = createContext<ITransitionContext>({ navigate: () => {} });

export function usePageTransition() {
  return useContext(TransitionContext);
}

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const { cue } = useSound();
  const [phase, setPhase] = useState<Phase>("idle");
  const [label, setLabel] = useState("");
  const [variant, setVariant] = useState<Variant>("curtain");
  const [direction, setDirection] = useState<1 | -1>(1);
  const target = useRef<string | null>(null);
  const departedFrom = useRef(pathname);

  const navigate = useCallback(
    (href: string, nextLabel: string, options: INavigateOptions = {}) => {
      if (phase !== "idle") return;
      if (reduceMotion) {
        router.push(href);
        return;
      }
      const nextVariant = options.variant ?? "curtain";
      target.current = href;
      departedFrom.current = pathname;
      setLabel(nextLabel);
      setVariant(nextVariant);
      setDirection(options.direction ?? 1);
      setPhase("covering");
      cue(nextVariant === "page" ? "page" : "swoosh");
    },
    [phase, pathname, reduceMotion, router, cue]
  );

  const handleCovered = useCallback(() => {
    if (!target.current) return;
    setPhase("covered");
    router.push(target.current);
    target.current = null;
  }, [router]);

  useEffect(() => {
    if (phase !== "covered") return;
    if (pathname !== departedFrom.current) {
      window.scrollTo(0, 0);
      setPhase("revealing");
      return;
    }
    const timeout = window.setTimeout(() => setPhase("revealing"), 1600);
    return () => window.clearTimeout(timeout);
  }, [pathname, phase]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <TransitionCurtain
        phase={phase}
        label={label}
        variant={variant}
        direction={direction}
        onCovered={handleCovered}
        onRevealed={() => setPhase("idle")}
      />
    </TransitionContext.Provider>
  );
}
