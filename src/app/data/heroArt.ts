import { StaticImageData } from "next/image";

import spiderMan616 from "@/public/spiders/spider-man-616.webp";
import mulherAranha65 from "@/public/spiders/mulher-aranha-65.webp";
import spiderMan1610 from "@/public/spiders/spider-man-1610.webp";
import spDr14512 from "@/public/spiders/sp-dr-14512.webp";
import spiderHam8311 from "@/public/spiders/spider-ham-8311.webp";
import spiderMan90214 from "@/public/spiders/spider-man-90214.webp";
import spiderMan928 from "@/public/spiders/spider-man-928.webp";
import cover616 from "@/public/spiders/spider-man-616-comic-book.png";
import cover65 from "@/public/spiders/mulher-aranha-65-comic-book.png";
import cover1610 from "@/public/spiders/spider-man-1610-comic-book.png";
import cover14512 from "@/public/spiders/sp-dr-14512-comic-book.png";
import cover8311 from "@/public/spiders/spider-ham-8311-comic-book.png";
import cover90214 from "@/public/spiders/spider-man-90214-comic-book.png";
import cover928 from "@/public/spiders/spider-man-928-comic-book.png";

interface IHeroArt {
  figure: StaticImageData;
  cover: StaticImageData;
}

const art: Record<string, IHeroArt> = {
  "spider-man-616": { figure: spiderMan616, cover: cover616 },
  "mulher-aranha-65": { figure: mulherAranha65, cover: cover65 },
  "spider-man-1610": { figure: spiderMan1610, cover: cover1610 },
  "sp-dr-14512": { figure: spDr14512, cover: cover14512 },
  "spider-ham-8311": { figure: spiderHam8311, cover: cover8311 },
  "spider-man-90214": { figure: spiderMan90214, cover: cover90214 },
  "spider-man-928": { figure: spiderMan928, cover: cover928 },
};

export function getHeroArt(heroId: string): IHeroArt | null {
  return art[heroId] ?? null;
}
