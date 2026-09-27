"use client";

import { useCallback, useEffect, useState } from "react";
import { useMotionValue } from "framer-motion";

import Wordmark from "../Wordmark";
import SoundToggle from "../Sound/SoundToggle";
import { useHeroVoice } from "../Sound/useHeroVoice";
import Opening, { OpeningState, openingAlreadyPlayed } from "../Opening";
import FanNotice from "../FanNotice";
import QuizLink from "../Quiz/QuizLink";

import Backdrop from "./Backdrop";
import HeroStage from "./HeroStage";
import HeroIntro from "./HeroIntro";
import UniverseDial from "./UniverseDial";
import UniverseNumber from "./UniverseNumber";
import IssueCounter from "./IssueCounter";
import GlitchFlash from "./GlitchFlash";
import SfxPop from "./SfxPop";
import styles from "./multiverse.module.scss";

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
  const [opening, setOpening] = useState<OpeningState>(() => (openingAlreadyPlayed() ? "done" : "playing"));
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
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  useHeroVoice(hero.id, view.shift);

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
    <main className={styles.page} style={themeStyle} onPointerMove={handlePointerMove} data-opening={opening}>
      {opening !== "done" && <Opening onStateChange={setOpening} />}
      <Backdrop heroId={hero.id} theme={theme} pointerX={pointerX} pointerY={pointerY} />

      <header className={styles.topbar}>
        <Wordmark href="/" />
        <div className={styles.topbarEnd}>
          <QuizLink className={styles.quizTop} />
          <IssueCounter index={view.index} total={total} direction={view.direction} />
          <SoundToggle />
        </div>
      </header>

      <section className={styles.stageArea} aria-roledescription="carrossel" aria-label="Heróis do multiverso">
        <UniverseNumber value={hero.universe} direction={view.direction} pointerX={pointerX} dragX={dragX} />
        <HeroStage
          heroes={heroes}
          index={view.index}
          shift={view.shift}
          ready={opening === "done"}
          onStep={step}
          dragX={dragX}
          pointerX={pointerX}
          pointerY={pointerY}
        />
        <SfxPop
          heroId={hero.id}
          word={theme.sfx}
          motionStyle={theme.sfxMotion}
          color={theme.primary}
          pointerX={pointerX}
        />
      </section>

      <HeroIntro hero={hero} tagline={theme.tagline} />

      <UniverseDial heroes={heroes} index={view.index} onSelect={select} onStep={step} />

      <footer className={styles.footer}>
        <QuizLink className={styles.quizBottom} />
        <FanNotice />
      </footer>

      <GlitchFlash shift={view.shift} direction={view.direction} />
      <p className="sr-only" aria-live="polite">
        {hero.name}, Terra-{hero.universe}
      </p>
    </main>
  );
}
