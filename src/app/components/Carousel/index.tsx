"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { IHeroData } from "../../interfaces/heroes";
import HeroDetails from "../HeroDetails";
import HeroPicture from "../HeroPicture";

import styles from "./carousel.module.scss";

enum enPosition {
  FRONT = 0,
  MIDDLE = 1,
  BACK = 2,
}

interface IProps {
  heroes: IHeroData[];
  activeId: string;
}

export default function Carousel({ heroes, activeId }: IProps) {
  const [visibleItems, setVisibleItems] = useState<IHeroData[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(
    heroes.findIndex((hero) => hero.id === activeId) - 1
  );
  const [startInteractionPosition, setStartInteractionPosition] = useState<number | null>(null);

  const transitionAudio = useMemo(() => {
    if (typeof window === "undefined") return null;
    return new Audio("/songs/transition.mp3");
  }, []);

  const voicesAudio: Record<string, HTMLAudioElement> = useMemo(() => {
    if (typeof window === "undefined") return {} as Record<string, HTMLAudioElement>;
    return {
      "spider-man-616": new Audio("/songs/spider-man-616.mp3"),
      "mulher-aranha-65": new Audio("/songs/mulher-aranha-65.mp3"),
      "spider-man-1610": new Audio("/songs/spider-man-1610.mp3"),
      "sp-dr-14512": new Audio("/songs/sp-dr-14512.mp3"),
      "spider-ham-8311": new Audio("/songs/spider-ham-8311.mp3"),
      "spider-man-90214": new Audio("/songs/spider-man-90214.mp3"),
      "spider-man-928": new Audio("/songs/spider-man-928.mp3"),
    };
  }, []);

  useEffect(() => {
    const indexInArrayScope = ((activeIndex % heroes.length) + heroes.length) % heroes.length;
    const visibleItems = [...heroes, ...heroes].slice(indexInArrayScope, indexInArrayScope + 3);
    setVisibleItems(visibleItems);
  }, [heroes, activeIndex]);

  useEffect(() => {
    const htmlEl = document.querySelector("html")

    if (!htmlEl || !visibleItems) {
      return;
    }

    if (visibleItems.length > enPosition.MIDDLE) {
      const currentHeroId = visibleItems[enPosition.MIDDLE].id;

      htmlEl.style.backgroundImage = `url("/spiders/${currentHeroId}-background.png")`;
      htmlEl.classList.add("hero-page");
    }

    return () => {
      htmlEl.classList.remove("hero-page");
    }
  }, [visibleItems]);

  useEffect(() => {
    if (!visibleItems || visibleItems.length <= enPosition.MIDDLE) {
      return;
    }

    if (transitionAudio) {
      transitionAudio.play();
    }

    const voiceAudio = voicesAudio[visibleItems[enPosition.MIDDLE].id];

    if (!voiceAudio) {
      return;
    }

    voiceAudio.volume = 0.3;
    voiceAudio.play();

  }, [visibleItems, transitionAudio, voicesAudio]);

  const handleChangeDrag = (endX: number) => {
    if (startInteractionPosition === null) return;
    const diff = endX - startInteractionPosition;
    // Threshold para não acionar com pequenos movimentos
    if (Math.abs(diff) < 30) return;

    const newDirection = diff > 0 ? -1 : 1; // direita->volta, esquerda->avança
    handleChangeActiveIndex(newDirection);
    setStartInteractionPosition(null);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setDragImage(new Image(), 0, 0);
    setStartInteractionPosition(e.clientX);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    handleChangeDrag(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartInteractionPosition(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.changedTouches && e.changedTouches.length) {
      handleChangeDrag(e.changedTouches[0].clientX);
    }
  };

  const handleChangeActiveIndex = (newDirection: number) => {
    setActiveIndex((prevActiveIndex) => prevActiveIndex + newDirection);
  };

  if (!visibleItems.length) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.carousel}>
        <div
          className={styles.wrapper}
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item, position) => (
              <motion.div
                key={item.id}
                className={styles.hero}
                initial={{ x: -1500, scale: 0.75 }}
                animate={{ x: 0, ...getItemStyles(position) }}
                exit={{ x: 0, opacity: 0, scale: 1, left: "-20%" }}
                transition={{ duration: 0.8 }}
              >
                <HeroPicture hero={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <motion.div className={styles.details} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 2 }}>
        <HeroDetails data={visibleItems[enPosition.MIDDLE]} />
      </motion.div>
    </div>
  );
}

const getItemStyles = (position: enPosition) => {
  if (position === enPosition.FRONT) {
    return {
      zIndex: 3,
      filter: "blur(10px)",
      scale: 1.2,
    };
  }

  if (position === enPosition.MIDDLE) {
    return {
      zIndex: 2,
      left: 300,
      scale: 0.8,
      top: "-10%",
    }
  }

  if (position === enPosition.BACK) {
    return {
      zIndex: 1,
      filter: "blur(10px)",
      left: 160,
      top: "-20%",
      scale: 0.6,
      opacity: 0.8,
    }
  }
};