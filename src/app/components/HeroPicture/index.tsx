import Image, { StaticImageData } from "next/image";

import spiderMan616 from "@/public/spiders/spider-man-616.png";
import mulherAranha65 from "@/public/spiders/mulher-aranha-65.png";
import spiderMan1610 from "@/public/spiders/spider-man-1610.png";
import spDr14512 from "@/public/spiders/sp-dr-14512.png";
import spiderHam8311 from "@/public/spiders/spider-ham-8311.png";
import spiderMan90214 from "@/public/spiders/spider-man-90214.png";
import spiderMan928 from "@/public/spiders/spider-man-928.png";
import { IHeroData } from "@/app/interfaces/heroes";

const heroesImage: Record<string, StaticImageData> = {
  "spider-man-616": spiderMan616,
  "mulher-aranha-65": mulherAranha65,
  "spider-man-1610": spiderMan1610,
  "sp-dr-14512": spDr14512,
  "spider-ham-8311": spiderHam8311,
  "spider-man-90214": spiderMan90214,
  "spider-man-928": spiderMan928,
}

interface IProps {
  hero: IHeroData;
}

export default function HeroPicture({ hero }: IProps) {
  return (
    <Image
      src={heroesImage[hero.id]}
      alt={`${hero.name} (Universo-${hero.universe})`}
      priority
    />
  );
}
