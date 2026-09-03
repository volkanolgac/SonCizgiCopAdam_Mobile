/** Deterministic pseudo-random used for the hand-drawn wobble. */
export function seeded(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function roughLine(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  seed = 1,
  wobble = 1.6,
  passes = 2,
) {
  const rnd = seeded(seed * 7919 + 13);
  for (let p = 0; p < passes; p++) {
    const o = () => (rnd() - 0.5) * wobble * 2;
    ctx.beginPath();
    ctx.moveTo(x1 + o(), y1 + o());
    const mx = (x1 + x2) / 2 + o() * 1.4;
    const my = (y1 + y2) / 2 + o() * 1.4;
    ctx.quadraticCurveTo(mx, my, x2 + o(), y2 + o());
    ctx.stroke();
  }
}

export function roughRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  seed = 1,
  wobble = 1.6,
) {
  roughLine(ctx, x, y, x + w, y, seed, wobble);
  roughLine(ctx, x + w, y, x + w, y + h, seed + 1, wobble);
  roughLine(ctx, x + w, y + h, x, y + h, seed + 2, wobble);
  roughLine(ctx, x, y + h, x, y, seed + 3, wobble);
}

/** Diagonal pencil hatching used for rock / ground fills. */
export function hatch(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  step = 12,
  seed = 5,
) {
  const rnd = seeded(seed);
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.lineWidth = 1;
  for (let i = -h; i < w; i += step) {
    const j = (rnd() - 0.5) * 3;
    ctx.beginPath();
    ctx.moveTo(x + i + j, y);
    ctx.lineTo(x + i + h + j, y + h);
    ctx.stroke();
  }
  ctx.restore();
}

export function roughCircle(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  seed = 3,
  wobble = 1.2,
) {
  const rnd = seeded(seed);
  for (let p = 0; p < 2; p++) {
    ctx.beginPath();
    const steps = 14;
    for (let i = 0; i <= steps; i++) {
      const a = (i / steps) * Math.PI * 2;
      const rr = r + (rnd() - 0.5) * wobble * 2;
      const px = cx + Math.cos(a) * rr;
      const py = cy + Math.sin(a) * rr;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }
}
