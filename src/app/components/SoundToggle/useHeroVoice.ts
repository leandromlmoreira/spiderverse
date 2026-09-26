"use client";

import { useEffect, useRef } from "react";

import { basePath } from "@/app/basePath";

function play(audio: HTMLAudioElement, volume: number) {
  audio.currentTime = 0;
  audio.volume = volume;
  audio.play().catch(() => {});
}

export function useHeroVoice(heroId: string, enabled: boolean) {
  const cache = useRef<Map<string, HTMLAudioElement>>(new Map());

  useEffect(() => {
    if (!enabled) return;
    const load = (name: string) => {
      const existing = cache.current.get(name);
      if (existing) return existing;
      const audio = new Audio(`${basePath}/songs/${name}.mp3`);
      cache.current.set(name, audio);
      return audio;
    };
    play(load("transition"), 0.5);
    play(load(heroId), 0.35);
  }, [heroId, enabled]);

  useEffect(() => {
    const audios = cache.current;
    return () => audios.forEach((audio) => audio.pause());
  }, []);
}
