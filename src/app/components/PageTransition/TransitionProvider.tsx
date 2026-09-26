"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useReducedMotion } from "framer-motion";

import TransitionCurtain from "./TransitionCurtain";

type Phase = "idle" | "covering" | "covered" | "revealing";

interface ITransitionContext {
  navigate: (href: string, label: string) => void;
}

const TransitionContext = createContext<ITransitionContext>({ navigate: () => {} });

export function usePageTransition() {
  return useContext(TransitionContext);
}

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [label, setLabel] = useState("");
  const target = useRef<string | null>(null);
  const departedFrom = useRef(pathname);

  const navigate = useCallback(
    (href: string, nextLabel: string) => {
      if (phase !== "idle") return;
      if (reduceMotion) {
        router.push(href);
        return;
      }
      target.current = href;
      departedFrom.current = pathname;
      setLabel(nextLabel);
      setPhase("covering");
    },
    [phase, pathname, reduceMotion, router]
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
        onCovered={handleCovered}
        onRevealed={() => setPhase("idle")}
      />
    </TransitionContext.Provider>
  );
}
