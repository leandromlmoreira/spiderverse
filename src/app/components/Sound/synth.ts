export type Cue = "swoosh" | "pop" | "page" | "stamp" | "tick";

function noiseBuffer(context: AudioContext, seconds: number) {
  const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * seconds), context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let index = 0; index < data.length; index += 1) data[index] = Math.random() * 2 - 1;
  return buffer;
}

function envelope(context: AudioContext, peak: number, attack: number, release: number) {
  const gain = context.createGain();
  const now = context.currentTime;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(peak, now + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + attack + release);
  return gain;
}

function sweep(context: AudioContext, output: AudioNode, from: number, to: number, seconds: number, peak: number) {
  const source = context.createBufferSource();
  source.buffer = noiseBuffer(context, seconds);
  const filter = context.createBiquadFilter();
  filter.type = "bandpass";
  filter.Q.value = 1.6;
  filter.frequency.setValueAtTime(from, context.currentTime);
  filter.frequency.exponentialRampToValueAtTime(to, context.currentTime + seconds);
  const gain = envelope(context, peak, seconds * 0.35, seconds * 0.65);
  source.connect(filter).connect(gain).connect(output);
  source.start();
}

function tone(context: AudioContext, output: AudioNode, from: number, to: number, seconds: number, peak: number, type: OscillatorType) {
  const oscillator = context.createOscillator();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(from, context.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(to, context.currentTime + seconds);
  const gain = envelope(context, peak, 0.005, seconds);
  oscillator.connect(gain).connect(output);
  oscillator.start();
  oscillator.stop(context.currentTime + seconds + 0.05);
}

export function playCue(context: AudioContext, output: AudioNode, cue: Cue) {
  if (cue === "swoosh") {
    sweep(context, output, 300, 4200, 0.32, 0.5);
    tone(context, output, 90, 45, 0.22, 0.35, "sine");
  }
  if (cue === "pop") tone(context, output, 620, 1240, 0.09, 0.25, "triangle");
  if (cue === "tick") tone(context, output, 1800, 1400, 0.04, 0.12, "square");
  if (cue === "page") sweep(context, output, 2400, 700, 0.28, 0.45);
  if (cue === "stamp") {
    tone(context, output, 160, 50, 0.3, 0.6, "sine");
    sweep(context, output, 1800, 400, 0.18, 0.4);
  }
}
