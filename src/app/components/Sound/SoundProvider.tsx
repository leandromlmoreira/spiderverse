"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

import { Cue, playCue } from "./synth";

const STORAGE_KEY = "aranhaverso:sound";

interface ISoundContext {
  enabled: boolean;
  toggle: () => void;
  cue: (name: Cue) => void;
}

const SoundContext = createContext<ISoundContext>({ enabled: false, toggle: () => {}, cue: () => {} });

export function useSound() {
  return useContext(SoundContext);
}

function readPreference() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "on";
  } catch {
    return false;
  }
}

function writePreference(enabled: boolean) {
  try {
    window.localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
  } catch {}
}

export default function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const audio = useRef<{ context: AudioContext; output: GainNode } | null>(null);

  useEffect(() => {
    if (readPreference()) setEnabled(true);
  }, []);

  const ensureContext = useCallback(() => {
    if (audio.current) return audio.current;
    const AudioContextClass = window.AudioContext;
    if (!AudioContextClass) return null;
    const context = new AudioContextClass();
    const output = context.createGain();
    output.gain.value = 0.55;
    output.connect(context.destination);
    audio.current = { context, output };
    return audio.current;
  }, []);

  const cue = useCallback(
    (name: Cue) => {
      if (!enabled) return;
      const engine = ensureContext();
      if (!engine) return;
      if (engine.context.state === "suspended") engine.context.resume().catch(() => {});
      playCue(engine.context, engine.output, name);
    },
    [enabled, ensureContext]
  );

  const toggle = useCallback(() => {
    setEnabled((current) => {
      writePreference(!current);
      return !current;
    });
  }, []);

  const value = useMemo(() => ({ enabled, toggle, cue }), [enabled, toggle, cue]);

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}
