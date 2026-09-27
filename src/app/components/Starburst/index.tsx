import styles from "./starburst.module.scss";

interface IProps {
  word: string;
  fill: string;
  className?: string;
  spikes?: number;
  splitLetters?: boolean;
}

function burstPoints(spikes: number) {
  const points: string[] = [];
  for (let index = 0; index < spikes * 2; index += 1) {
    const angle = (Math.PI * index) / spikes;
    const jitter = index % 4 === 0 ? 1 : index % 3 === 0 ? 0.9 : 0.95;
    const radius = index % 2 === 0 ? 50 * jitter : 33;
    points.push(`${(50 + radius * Math.cos(angle)).toFixed(2)},${(50 + radius * Math.sin(angle)).toFixed(2)}`);
  }
  return points.join(" ");
}

export default function Starburst({ word, fill, className, spikes = 13, splitLetters = false }: IProps) {
  return (
    <div className={`${styles.burst} ${className ?? ""}`} aria-hidden>
      <svg viewBox="-4 -4 108 108" className={styles.shape}>
        <polygon points={burstPoints(spikes)} transform="translate(4 3)" className={styles.shadow} />
        <polygon points={burstPoints(spikes)} style={{ fill }} className={styles.body} />
      </svg>
      <span className={styles.word}>
        {splitLetters
          ? Array.from(word).map((letter, index) => (
              <span key={index} className={styles.letter} style={{ "--i": index } as React.CSSProperties}>
                {letter}
              </span>
            ))
          : word}
      </span>
    </div>
  );
}
