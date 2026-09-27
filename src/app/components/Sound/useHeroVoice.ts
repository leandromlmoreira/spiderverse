"use client";

import { useEffect, useRef } from "react";

import { useSound } from "./SoundProvider";

import { basePath } from "@/app/basePath";

function play(audio: HTMLAudioElement, volume: number) {
  audio.currentTime = 0;
  audio.volume = volume;
  audio.play().catch(() => {});
}

export function useHeroVoice(heroId: string, shift: number) {
  const { enabled, cue } = useSound();
  const cache = useRef<Map<string, HTMLAudioElement>>(new Map());

  useEffect(() => {
    if (!enabled) return;
    const existing = cache.current.get(heroId);
    const audio = existing ?? new Audio(`${basePath}/songs/${heroId}.mp3`);
    if (!existing) cache.current.set(heroId, audio);
    if (shift > 0) cue("swoosh");
    play(audio, 0.35);
  }, [heroId, shift, enabled, cue]);

  useEffect(() => {
    const audios = cache.current;
    return () => audios.forEach((audio) => audio.pause());
  }, []);
}
