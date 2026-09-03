type Sfx = "draw" | "jump" | "star" | "win" | "fall" | "error" | "door" | "step" | "click";

let ctx: AudioContext | null = null;
let enabled = true;

export function setSoundEnabled(v: boolean) {
  enabled = v;
}

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(freq: number, dur: number, type: OscillatorType, gain = 0.06, slideTo?: number) {
  const c = getCtx();
  if (!c) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, c.currentTime);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, c.currentTime + dur);
  g.gain.setValueAtTime(gain, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
  o.connect(g).connect(c.destination);
  o.start();
  o.stop(c.currentTime + dur + 0.02);
}

let lastDraw = 0;

export function playSfx(name: Sfx) {
  if (!enabled) return;
  switch (name) {
    case "draw": {
      const now = Date.now();
      if (now - lastDraw < 70) return;
      lastDraw = now;
      tone(220 + Math.random() * 120, 0.05, "triangle", 0.02);
      break;
    }
    case "step":
      tone(120, 0.04, "square", 0.015);
      break;
    case "jump":
      tone(320, 0.16, "square", 0.04, 620);
      break;
    case "star":
      tone(880, 0.12, "triangle", 0.05, 1320);
      break;
    case "win":
      [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => tone(f, 0.22, "triangle", 0.05), i * 110));
      break;
    case "door":
      tone(400, 0.2, "sine", 0.05, 800);
      break;
    case "fall":
      tone(400, 0.4, "sawtooth", 0.04, 90);
      break;
    case "error":
      tone(180, 0.25, "sawtooth", 0.05, 70);
      break;
    case "click":
      tone(520, 0.05, "square", 0.03);
      break;
  }
}

if (typeof window !== "undefined") {
  const unlock = () => {
    if (ctx && ctx.state === "suspended") {
      void ctx.resume();
    }
  };
  window.addEventListener("pointerdown", unlock, { passive: true });
  window.addEventListener("touchstart", unlock, { passive: true });
  window.addEventListener("click", unlock, { passive: true });
  (window as any).__resumeAudio = unlock;
}
