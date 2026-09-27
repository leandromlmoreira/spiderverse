import { IUniverseTheme } from "@/app/data/universes";

interface ICardInput {
  name: string;
  universe: number;
  archetype: string;
  percent: number;
  figureSrc: string;
  theme: IUniverseTheme;
}

const WIDTH = 1080;
const HEIGHT = 1350;

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function fontFamily(variable: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return value || fallback;
}

function halftone(context: CanvasRenderingContext2D, color: string, originX: number, originY: number) {
  context.fillStyle = color;
  for (let y = 0; y < HEIGHT; y += 18) {
    for (let x = 0; x < WIDTH; x += 18) {
      const distance = Math.hypot(x - originX, y - originY) / 900;
      const radius = Math.max(0, 5 * (1 - distance));
      if (radius < 0.4) continue;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }
  }
}

function rays(context: CanvasRenderingContext2D) {
  context.save();
  context.translate(WIDTH * 0.62, HEIGHT * 0.42);
  context.fillStyle = "rgba(255,255,255,0.07)";
  for (let index = 0; index < 36; index += 1) {
    context.rotate((Math.PI * 2) / 36);
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(1600, -60);
    context.lineTo(1600, 60);
    context.closePath();
    context.fill();
  }
  context.restore();
}

function outlinedText(context: CanvasRenderingContext2D, text: string, x: number, y: number, fill: string) {
  context.lineJoin = "round";
  context.lineWidth = 16;
  context.strokeStyle = "#0d0d12";
  context.fillStyle = "#00d4ff";
  context.fillText(text, x - 8, y);
  context.fillStyle = "#ff1f8f";
  context.fillText(text, x + 8, y + 4);
  context.strokeText(text, x, y);
  context.fillStyle = fill;
  context.fillText(text, x, y);
}

function fitFont(context: CanvasRenderingContext2D, text: string, family: string, maxWidth: number, start: number) {
  let size = start;
  context.font = `${size}px ${family}`;
  while (context.measureText(text).width > maxWidth && size > 60) {
    size -= 6;
    context.font = `${size}px ${family}`;
  }
  return size;
}

export async function renderShareCard(input: ICardInput): Promise<Blob | null> {
  const display = fontFamily("--font-display", "Impact");
  const text = fontFamily("--font-text", "sans-serif");
  await Promise.all([document.fonts.load(`120px ${display}`), document.fonts.load(`700 40px ${text}`)]).catch(() => {});
  const figure = await loadImage(input.figureSrc);

  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const context = canvas.getContext("2d");
  if (!context) return null;

  const gradient = context.createRadialGradient(WIDTH * 0.62, HEIGHT * 0.4, 40, WIDTH * 0.62, HEIGHT * 0.4, 1100);
  gradient.addColorStop(0, input.theme.glow);
  gradient.addColorStop(0.55, input.theme.base);
  gradient.addColorStop(1, "#040406");
  context.fillStyle = gradient;
  context.fillRect(0, 0, WIDTH, HEIGHT);
  rays(context);
  halftone(context, `${input.theme.primary}66`, WIDTH, 0);

  const figureHeight = HEIGHT * 0.78 * Math.min(input.theme.scale + 0.15, 1);
  const figureWidth = (figure.width / figure.height) * figureHeight;
  context.save();
  if (input.theme.monochrome) context.filter = "grayscale(1) contrast(1.15)";
  context.shadowColor = "rgba(0,0,0,0.5)";
  context.shadowBlur = 40;
  context.drawImage(figure, WIDTH * 0.66 - figureWidth / 2, HEIGHT - figureHeight - 130, figureWidth, figureHeight);
  context.restore();

  const shade = context.createLinearGradient(0, HEIGHT * 0.45, 0, HEIGHT);
  shade.addColorStop(0, "rgba(4,4,6,0)");
  shade.addColorStop(1, "rgba(4,4,6,0.92)");
  context.fillStyle = shade;
  context.fillRect(0, 0, WIDTH, HEIGHT);

  context.fillStyle = "#ffe14d";
  context.fillRect(64, 72, 520, 64);
  context.strokeStyle = "#0d0d12";
  context.lineWidth = 6;
  context.strokeRect(64, 72, 520, 64);
  context.fillStyle = "#0d0d12";
  context.font = `800 30px ${text}`;
  context.textBaseline = "middle";
  context.fillText("ARANHAVERSO · QUAL ARANHA É VOCÊ?", 84, 106);

  context.textBaseline = "alphabetic";
  context.font = `700 44px ${text}`;
  context.fillStyle = "#fbfaf7";
  context.fillText("EU SOU", 72, HEIGHT - 420);

  const name = input.name.toUpperCase();
  const size = fitFont(context, name, display, WIDTH - 144, 190);
  outlinedText(context, name, 72, HEIGHT - 420 + size * 0.95, "#fbfaf7");

  context.font = `700 40px ${text}`;
  context.fillStyle = "#ffe14d";
  context.fillText(`TERRA-${input.universe} · ${input.archetype.toUpperCase()}`, 72, HEIGHT - 170);
  context.fillStyle = "#fbfaf7";
  context.fillText(`${input.percent}% DE COMPATIBILIDADE`, 72, HEIGHT - 116);

  context.font = `600 24px ${text}`;
  context.fillStyle = "rgba(251,250,247,0.6)";
  context.fillText("leandromlmoreira.github.io/spiderverse · projeto de fã", 72, HEIGHT - 60);

  return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
}
