import type { GameEngine } from "./engine";
import { WORLD_HEIGHT } from "./levels";
import { hatch, roughCircle, roughLine, roughRect, seeded } from "./rough";

export const INK = "#111111";
export const GREEN = "#1f9d55";
export const RED = "#d8322c";
export const BLUE = "#2f6fd0";
export const YELLOW = "#e3b21b";

export interface Camera {
  scale: number;
  x: number;
  y: number;
}

export function computeCamera(cssW: number, cssH: number, targetX: number, levelWidth: number): Camera {
  const scale = Math.min(cssH / WORLD_HEIGHT, cssW / 620);
  const viewW = cssW / scale;
  const viewH = cssH / scale;
  let camX: number;
  if (viewW >= levelWidth) {
    camX = -(viewW - levelWidth) / 2;
  } else {
    camX = targetX - viewW * 0.42;
    camX = Math.max(0, Math.min(camX, levelWidth - viewW));
  }
  const camY = viewH >= WORLD_HEIGHT ? -(viewH - WORLD_HEIGHT) / 2 : 0;
  return { scale, x: camX, y: camY };
}

export function screenToWorld(cam: Camera, sx: number, sy: number) {
  return { x: sx / cam.scale + cam.x, y: sy / cam.scale + cam.y };
}

export function render(
  ctx: CanvasRenderingContext2D,
  game: GameEngine,
  cssW: number,
  cssH: number,
  drafting: { x: number; y: number }[] | null,
  outOfInk: boolean,
  focusX?: number,
) {
  const level = game.level;
  const targetX = focusX !== undefined ? focusX : game.player.position.x;
  const cam = computeCamera(cssW, cssH, targetX, level.width);

  ctx.save();
  ctx.clearRect(0, 0, cssW, cssH);
  ctx.fillStyle = "#f7f4ec";
  ctx.fillRect(0, 0, cssW, cssH);

  ctx.translate(-cam.x * cam.scale, -cam.y * cam.scale);
  ctx.scale(cam.scale, cam.scale);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // notebook grid
  ctx.strokeStyle = "rgba(17,17,17,0.06)";
  ctx.lineWidth = 1;
  const gridStart = Math.floor(cam.x / 40) * 40;
  for (let x = gridStart; x < cam.x + cssW / cam.scale + 40; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, cam.y);
    ctx.lineTo(x, cam.y + cssH / cam.scale);
    ctx.stroke();
  }
  for (let y = Math.floor(cam.y / 40) * 40; y < cam.y + cssH / cam.scale + 40; y += 40) {
    ctx.beginPath();
    ctx.moveTo(cam.x, y);
    ctx.lineTo(cam.x + cssW / cam.scale, y);
    ctx.stroke();
  }

  // ground
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2.4;
  level.ground.forEach((r, i) => {
    roughRect(ctx, r.x, r.y, r.w, r.h, i + 2, 1.8);
    ctx.strokeStyle = "rgba(17,17,17,0.35)";
    hatch(ctx, r.x + 1, r.y + 1, r.w - 2, r.h - 2, 13, i + 9);
    ctx.strokeStyle = INK;
  });

  // ice
  (level.ice ?? []).forEach((r, i) => {
    ctx.strokeStyle = BLUE;
    ctx.lineWidth = 2.4;
    roughRect(ctx, r.x, r.y, r.w, r.h, i + 30, 1.4);
    ctx.strokeStyle = "rgba(47,111,208,0.5)";
    hatch(ctx, r.x + 1, r.y + 1, r.w - 2, r.h - 2, 16, i + 40);
  });

  // falling platforms
  game.fallers.forEach((f, i) => {
    const b = f.body;
    ctx.save();
    ctx.translate(b.position.x, b.position.y);
    ctx.rotate(b.angle);
    ctx.strokeStyle = INK;
    ctx.setLineDash([9, 6]);
    ctx.lineWidth = 2.4;
    const w = b.bounds.max.x - b.bounds.min.x;
    roughRect(ctx, -w / 2, -12, w, 24, i + 50, 1.4);
    ctx.setLineDash([]);
    ctx.restore();
  });

  // moving platforms
  game.dynamics
    .filter((d) => d.kind === "mover")
    .forEach((d, i) => {
      const b = d.body;
      const w = b.bounds.max.x - b.bounds.min.x;
      const h = b.bounds.max.y - b.bounds.min.y;
      ctx.strokeStyle = INK;
      ctx.lineWidth = 2.4;
      roughRect(ctx, b.position.x - w / 2, b.position.y - h / 2, w, h, i + 60, 1.4);
      ctx.strokeStyle = "rgba(17,17,17,0.4)";
      hatch(ctx, b.position.x - w / 2, b.position.y - h / 2, w, h, 10, i + 62);
    });

  // spikes
  ctx.strokeStyle = RED;
  ctx.lineWidth = 2.2;
  (level.spikes ?? []).forEach((r, i) => {
    const teeth = Math.max(2, Math.round(r.w / 26));
    const tw = r.w / teeth;
    for (let t = 0; t < teeth; t++) {
      const x0 = r.x + t * tw;
      roughLine(ctx, x0, r.y + r.h, x0 + tw / 2, r.y, i * 13 + t, 1.1, 1);
      roughLine(ctx, x0 + tw / 2, r.y, x0 + tw, r.y + r.h, i * 17 + t, 1.1, 1);
    }
    roughLine(ctx, r.x, r.y + r.h, r.x + r.w, r.y + r.h, i + 3, 1.2, 1);
  });

  // saws
  game.dynamics
    .filter((d) => d.kind === "saw")
    .forEach((d, i) => {
      const b = d.body;
      const r = b.circleRadius ?? 28;
      ctx.strokeStyle = RED;
      ctx.lineWidth = 2.2;
      roughCircle(ctx, b.position.x, b.position.y, r, i + 70, 1);
      const spin = d.phase * 3;
      for (let t = 0; t < 8; t++) {
        const a = spin + (t / 8) * Math.PI * 2;
        roughLine(
          ctx,
          b.position.x + Math.cos(a) * r,
          b.position.y + Math.sin(a) * r,
          b.position.x + Math.cos(a) * (r + 7),
          b.position.y + Math.sin(a) * (r + 7),
          i * 5 + t,
          0.8,
          1,
        );
      }
      roughCircle(ctx, b.position.x, b.position.y, 4, i + 71, 0.6);
    });

  // checkpoints
  (level.checkpoints ?? []).forEach((c, i) => {
    const reached = game.reachedCheckpoints > i;
    ctx.strokeStyle = reached ? GREEN : "rgba(17,17,17,0.55)";
    ctx.lineWidth = 2.2;
    roughLine(ctx, c.x, c.y, c.x, c.y - 46, i + 80, 1);
    ctx.beginPath();
    ctx.moveTo(c.x, c.y - 46);
    ctx.lineTo(c.x + 26, c.y - 38);
    ctx.lineTo(c.x, c.y - 30);
    ctx.closePath();
    ctx.stroke();
  });

  // door
  drawDoor(ctx, level.door.x, level.door.y, game.state.phase === "won");

  // ink strokes
  ctx.lineWidth = 6;
  ctx.strokeStyle = INK;
  game.strokes.forEach((s, i) => {
    drawStroke(ctx, s.points, i);
  });

  if (drafting && drafting.length > 1) {
    ctx.strokeStyle = outOfInk ? RED : GREEN;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(drafting[0]!.x, drafting[0]!.y);
    for (let i = 1; i < drafting.length; i++) ctx.lineTo(drafting[i]!.x, drafting[i]!.y);
    ctx.stroke();
  }

  drawStickman(ctx, game);

  ctx.restore();
}

function drawStroke(ctx: CanvasRenderingContext2D, pts: { x: number; y: number }[], seed: number) {
  const rnd = seeded(seed * 31 + 7);
  for (let pass = 0; pass < 2; pass++) {
    ctx.beginPath();
    ctx.lineWidth = pass === 0 ? 6 : 2.5;
    ctx.strokeStyle = pass === 0 ? INK : "rgba(17,17,17,0.5)";
    ctx.moveTo(pts[0]!.x, pts[0]!.y);
    for (let i = 1; i < pts.length; i++) {
      const o = (rnd() - 0.5) * 1.6;
      ctx.lineTo(pts[i]!.x + o, pts[i]!.y + o);
    }
    ctx.stroke();
  }
}

function drawDoor(ctx: CanvasRenderingContext2D, x: number, baseY: number, open: boolean) {
  const w = 46;
  const h = 74;
  ctx.strokeStyle = GREEN;
  ctx.lineWidth = 2.8;
  roughRect(ctx, x - w / 2, baseY - h, w, h, 91, 1.3);
  if (open) {
    ctx.strokeStyle = "rgba(31,157,85,0.55)";
    hatch(ctx, x - w / 2 + 2, baseY - h + 2, w - 4, h - 4, 8, 93);
  } else {
    roughCircle(ctx, x + w / 2 - 10, baseY - h / 2, 3.4, 95, 0.5);
  }
}

function drawStickman(ctx: CanvasRenderingContext2D, game: GameEngine) {
  const p = game.player.position;
  const t = game.animPhase;
  const st = game.animState;
  const dir = game.facing;
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.strokeStyle = st === "dead" ? RED : INK;
  ctx.lineWidth = 3;
  ctx.lineCap = "round";

  const headR = 7.5;
  const headY = -13;
  const hipY = 6;
  const bob = st === "run" ? Math.sin(t * 2) * 1.2 : st === "idle" ? Math.sin(t) * 0.8 : 0;
  ctx.translate(0, bob);
  if (st === "dead") ctx.rotate(0.5 * dir);

  // head
  roughCircle(ctx, 0, headY, headR, 101, 0.7);
  // face
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.arc(-2.6 * dir + (st === "dead" ? 0 : 0), headY - 1.5, 0.9, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(2.6 * dir, headY - 1.5, 0.9, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  if (st === "win") ctx.arc(0, headY + 1.5, 3, 0.15 * Math.PI, 0.85 * Math.PI);
  else if (st === "dead") ctx.arc(0, headY + 4.5, 2.6, 1.15 * Math.PI, 1.85 * Math.PI);
  else ctx.arc(0, headY + 2, 2.2, 0.1 * Math.PI, 0.9 * Math.PI);
  ctx.stroke();

  ctx.lineWidth = 3;
  // body
  roughLine(ctx, 0, headY + headR, 0, hipY, 103, 0.5, 1);

  let armA = 0;
  let armB = 0;
  let legA = 0;
  let legB = 0;
  if (st === "run") {
    armA = Math.sin(t) * 0.9;
    armB = -armA;
    legA = Math.sin(t) * 0.85;
    legB = -legA;
  } else if (st === "jump") {
    armA = -1.5;
    armB = -1.2;
    legA = 0.5;
    legB = -0.3;
  } else if (st === "fall") {
    armA = -2;
    armB = -1.9;
    legA = 0.7;
    legB = -0.5;
  } else if (st === "win") {
    armA = -2.2;
    armB = -2.2;
  } else if (st === "dead") {
    armA = 1.4;
    armB = 2;
    legA = 1.2;
    legB = 0.6;
  } else {
    armA = 0.25;
    armB = -0.25;
    legA = 0.18;
    legB = -0.18;
  }

  const limb = (x0: number, y0: number, ang: number, len: number, seed: number) => {
    const ex = x0 + Math.sin(ang) * len * dir;
    const ey = y0 + Math.cos(ang) * len;
    roughLine(ctx, x0, y0, ex, ey, seed, 0.5, 1);
    return { x: ex, y: ey };
  };
  const shoulderY = headY + headR + 3;
  limb(0, shoulderY, Math.PI / 2 + armA, 11, 105);
  limb(0, shoulderY, Math.PI / 2 + armB + Math.PI, 11, 106);
  limb(0, hipY, legA, 12, 107);
  limb(0, hipY, legB, 12, 108);

  ctx.restore();
}
