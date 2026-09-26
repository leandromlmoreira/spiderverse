"use client";

import { useCallback, useEffect, useState } from "react";
import { useMotionValue } from "framer-motion";

import Wordmark from "../Wordmark";
import SoundToggle from "../SoundToggle";
import { useHeroVoice } from "../SoundToggle/useHeroVoice";

import Backdrop from "./Backdrop";
import HeroStage from "./HeroStage";
import HeroIntro from "./HeroIntro";
import UniverseDial from "./UniverseDial";
import UniverseNumber from "./UniverseNumber";
import GlitchFlash from "./GlitchFlash";
import SfxPop from "./SfxPop";
import styles from "./multiverse.module.scss";

import { padIssue } from "@/app/lib/format";
import { getUniverseTheme } from "@/app/data/universes";
import { IHeroData } from "@/app/interfaces/heroes";

interface IProps {
  heroes: IHeroData[];
}

interface IView {
  index: number;
  direction: 1 | -1;
  shift: number;
}

function wrap(value: number, total: number) {
  return ((value % total) + total) % total;
}

export default function Multiverse({ heroes }: IProps) {
  const total = heroes.length;
  const [view, setView] = useState<IView>({ index: 0, direction: 1, shift: 0 });
  const [soundOn, setSoundOn] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const dragX = useMotionValue(0);

  const hero = heroes[view.index];
  const theme = getUniverseTheme(hero.id);

  const step = useCallback(
    (delta: number) =>
      setView((current) => ({
        index: wrap(current.index + delta, total),
        direction: delta > 0 ? 1 : -1,
        shift: current.shift + 1,
      })),
    [total]
  );

  const select = useCallback(
    (index: number) =>
      setView((current) =>
        index === current.index
          ? current
          : { index, direction: index > current.index ? 1 : -1, shift: current.shift + 1 }
      ),
    []
  );

  useEffect(() => {
    const fromHash = heroes.findIndex((item) => `#${item.id}` === window.location.hash);
    if (fromHash > 0) setView({ index: fromHash, direction: 1, shift: 0 });
  }, [heroes]);

  useEffect(() => {
    if (view.shift === 0) return;
    window.history.replaceState(null, "", `#${hero.id}`);
  }, [hero.id, view.shift]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  useHeroVoice(hero.id, soundOn);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    pointerX.set((event.clientX / window.innerWidth - 0.5) * 2);
    pointerY.set((event.clientY / window.innerHeight - 0.5) * 2);
  };

  const themeStyle = {
    "--primary": theme.primary,
    "--secondary": theme.secondary,
    "--glow": theme.glow,
    "--base": theme.base,
  } as React.CSSProperties;

  return (
    <main className={styles.page} style={themeStyle} onPointerMove={handlePointerMove}>
      <Backdrop heroId={hero.id} theme={theme} pointerX={pointerX} pointerY={pointerY} />

      <header className={styles.topbar}>
        <Wordmark href="/" />
        <div className={styles.topbarEnd}>
          <p className={styles.counter}>
            <span>Nº</span> {padIssue(view.index + 1)}
            <small>/ {padIssue(total)}</small>
          </p>
          <SoundToggle enabled={soundOn} onToggle={() => setSoundOn((value) => !value)} />
        </div>
      </header>

      <section className={styles.stageArea} aria-label="Carrossel de heróis">
        <UniverseNumber value={hero.universe} direction={view.direction} pointerX={pointerX} dragX={dragX} />
        <HeroStage
          heroes={heroes}
          index={view.index}
          shift={view.shift}
          onStep={step}
          dragX={dragX}
          pointerX={pointerX}
          pointerY={pointerY}
        />
        <SfxPop heroId={hero.id} word={theme.sfx} color={theme.primary} pointerX={pointerX} />
      </section>

      <HeroIntro hero={hero} tagline={theme.tagline} />

      <UniverseDial heroes={heroes} index={view.index} onSelect={select} onStep={step} />

      <GlitchFlash shift={view.shift} />
      <p className="sr-only" aria-live="polite">
        {hero.name}, Terra-{hero.universe}
      </p>
    </main>
  );
}
