import Matter from "matter-js";
import type { LevelDef, Phase, Vec } from "./types";
import { WORLD_HEIGHT } from "./levels";
import { playSfx } from "./audio";

const { Engine, World, Bodies, Body, Composite, Query } = Matter;

export interface Stroke {
  points: Vec[];
  bodies: Matter.Body[];
  length: number;
}

export interface GameState {
  phase: Phase;
  lives: number;
  time: number;
  inkUsed: number;
  inkBudget: number;
  attempts: number;
  message: string | null;
}

export interface DynamicEntity {
  body: Matter.Body;
  origin: Vec;
  ax: number;
  ay: number;
  speed: number;
  phase: number;
  kind: "saw" | "mover";
}

export interface FallerEntity {
  body: Matter.Body;
  timer: number;
  falling: boolean;
  origin: Vec;
}

const PLAYER_W = 18;
const PLAYER_H = 34;
const RUN_SPEED = 3.1;

export class GameEngine {
  level: LevelDef;
  engine: Matter.Engine;
  player!: Matter.Body;
  strokes: Stroke[] = [];
  dynamics: DynamicEntity[] = [];
  fallers: FallerEntity[] = [];
  hazards = new Set<number>();
  door!: Matter.Body;
  solids: Matter.Body[] = [];
  state: GameState;
  respawn: Vec;
  reachedCheckpoints = 0;
  grounded = false;
  facing = 1;
  animPhase = 0;
  animState: "idle" | "run" | "jump" | "fall" | "dead" | "win" = "idle";
  onChange: (s: GameState) => void = () => {};
  private accumulator = 0;
  private deadTimer = 0;
  private groundBody: Matter.Body | null = null;
  private lastGroundPos: Vec | null = null;
  private stepSfx = 0;

  constructor(level: LevelDef) {
    this.level = level;
    this.engine = Engine.create({ gravity: { x: 0, y: level.gravity, scale: 0.001 } });
    this.respawn = { ...level.start };
    this.state = {
      phase: "ready",
      lives: 3,
      time: 0,
      inkUsed: 0,
      inkBudget: level.ink,
      attempts: 0,
      message: null,
    };
    this.build();
  }

  private emit() {
    this.onChange({ ...this.state });
  }

  private build() {
    const l = this.level;
    const w = this.engine.world;
    const statics: Matter.Body[] = [];

    for (const r of l.ground) {
      statics.push(
        Bodies.rectangle(r.x + r.w / 2, r.y + r.h / 2, r.w, r.h, {
          isStatic: true,
          friction: 0.9,
          label: "ground",
        }),
      );
    }
    for (const r of l.ice ?? []) {
      statics.push(
        Bodies.rectangle(r.x + r.w / 2, r.y + r.h / 2, r.w, r.h, {
          isStatic: true,
          friction: 0.002,
          frictionStatic: 0.002,
          label: "ice",
        }),
      );
    }
    for (const r of l.spikes ?? []) {
      const b = Bodies.rectangle(r.x + r.w / 2, r.y + r.h / 2, r.w, r.h, {
        isStatic: true,
        isSensor: true,
        label: "spike",
      });
      this.hazards.add(b.id);
      statics.push(b);
    }
    for (const s of l.saws ?? []) {
      const b = Bodies.circle(s.x, s.y, s.r, { isStatic: true, isSensor: true, label: "saw" });
      this.hazards.add(b.id);
      statics.push(b);
      this.dynamics.push({
        body: b,
        origin: { x: s.x, y: s.y },
        ax: s.ax ?? 0,
        ay: s.ay ?? 0,
        speed: s.speed ?? 1,
        phase: 0,
        kind: "saw",
      });
    }
    for (const m of l.movers ?? []) {
      const b = Bodies.rectangle(m.x + m.w / 2, m.y + m.h / 2, m.w, m.h, {
        isStatic: true,
        friction: 0.9,
        label: "mover",
      });
      statics.push(b);
      this.dynamics.push({
        body: b,
        origin: { x: m.x + m.w / 2, y: m.y + m.h / 2 },
        ax: m.ax ?? 0,
        ay: m.ay ?? 0,
        speed: m.speed ?? 1,
        phase: 0,
        kind: "mover",
      });
    }
    for (const f of l.fallers ?? []) {
      const b = Bodies.rectangle(f.x + f.w / 2, f.y + f.h / 2, f.w, f.h, {
        isStatic: true,
        friction: 0.9,
        label: "faller",
      });
      statics.push(b);
      this.fallers.push({ body: b, timer: 0, falling: false, origin: { x: f.x + f.w / 2, y: f.y + f.h / 2 } });
    }

    this.door = Bodies.rectangle(l.door.x, l.door.y - 36, 46, 72, {
      isStatic: true,
      isSensor: true,
      label: "door",
    });
    statics.push(this.door);

    // side walls so the runner cannot leave the level
    statics.push(Bodies.rectangle(-30, WORLD_HEIGHT / 2, 60, WORLD_HEIGHT * 3, { isStatic: true, label: "bound" }));
    statics.push(
      Bodies.rectangle(l.width + 30, WORLD_HEIGHT / 2, 60, WORLD_HEIGHT * 3, { isStatic: true, label: "bound" }),
    );

    this.player = Bodies.rectangle(l.start.x, l.start.y, PLAYER_W, PLAYER_H, {
      friction: 0.02,
      frictionStatic: 0.05,
      frictionAir: 0.008,
      restitution: 0,
      label: "player",
    });
    Body.setInertia(this.player, Infinity);

    Composite.add(w, [...statics, this.player]);
    this.solids = statics.filter((b) => !b.isSensor);
  }

  /* ---------------- drawing ---------------- */

  get inkLeft() {
    return Math.max(0, this.state.inkBudget - this.state.inkUsed);
  }

  addStroke(raw: Vec[]): boolean {
    const pts = simplify(raw, 4);
    if (pts.length < 2) return false;
    let length = 0;
    for (let i = 1; i < pts.length; i++) length += dist(pts[i - 1]!, pts[i]!);
    if (length < 6) return false;
    if (length > this.inkLeft) return false;

    const bodies: Matter.Body[] = [];
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1]!;
      const b = pts[i]!;
      const len = dist(a, b);
      if (len < 2) continue;
      const body = Bodies.rectangle((a.x + b.x) / 2, (a.y + b.y) / 2, len + 6, 9, {
        isStatic: true,
        friction: 0.85,
        frictionStatic: 1,
        angle: Math.atan2(b.y - a.y, b.x - a.x),
        label: "ink",
      });
      bodies.push(body);
    }
    if (!bodies.length) return false;
    Composite.add(this.engine.world, bodies);
    this.solids.push(...bodies);
    this.strokes.push({ points: pts, bodies, length });
    this.state.inkUsed += length;
    this.emit();
    return true;
  }

  undo() {
    const s = this.strokes.pop();
    if (!s) return;
    World.remove(this.engine.world, s.bodies);
    this.solids = this.solids.filter((b) => !s.bodies.includes(b));
    this.state.inkUsed = Math.max(0, this.state.inkUsed - s.length);
    this.emit();
  }

  clearStrokes() {
    for (const s of this.strokes) World.remove(this.engine.world, s.bodies);
    this.solids = this.solids.filter((b) => b.label !== "ink");
    this.strokes = [];
    this.state.inkUsed = 0;
    this.emit();
  }

  /* ---------------- flow ---------------- */

  start() {
    if (this.state.phase !== "ready") return;
    this.state.phase = "running";
    this.state.message = null;
    this.emit();
  }

  private die(reason: string) {
    if (this.state.phase !== "running") return;
    playSfx("fall");
    this.state.phase = "dead";
    this.state.lives -= 1;
    this.state.attempts += 1;
    this.state.message = reason;
    this.animState = "dead";
    this.deadTimer = 0;
    if (this.state.lives <= 0) this.state.phase = "gameover";
    this.emit();
  }

  retry() {
    this.state.phase = "ready";
    this.state.message = null;
    this.animState = "idle";
    Body.setPosition(this.player, { ...this.respawn });
    Body.setVelocity(this.player, { x: 0, y: 0 });
    for (const f of this.fallers) {
      if (f.falling) {
        Body.setStatic(f.body, true);
        Body.setPosition(f.body, { ...f.origin });
        Body.setVelocity(f.body, { x: 0, y: 0 });
        f.falling = false;
        f.timer = 0;
      }
    }
    this.emit();
  }

  fullRestart() {
    this.clearStrokes();
    this.state.lives = 3;
    this.state.time = 0;
    this.state.attempts = 0;
    this.reachedCheckpoints = 0;
    this.respawn = { ...this.level.start };
    this.retry();
  }

  /* ---------------- simulation ---------------- */

  private probe(x: number, y: number): Matter.Body | null {
    const hits = Query.point(this.solids, { x, y });
    return hits.length ? hits[0]! : null;
  }

  private surfaceTop(x: number, fromY: number, maxDepth = 60): number | null {
    for (let d = 0; d <= maxDepth; d += 3) {
      if (this.probe(x, fromY + d)) return fromY + d;
    }
    return null;
  }

  update(dtMs: number) {
    const dt = Math.min(dtMs, 50);
    this.accumulator += dt;
    let steps = 0;
    while (this.accumulator >= 16.666 && steps < 4) {
      this.step(16.666);
      this.accumulator -= 16.666;
      steps++;
    }
    if (steps === 0 && this.accumulator > 0) {
      // keep entities smooth on very high refresh displays
    }
  }

  private step(ms: number) {
    const p = this.player;
    const running = this.state.phase === "running";

    // moving hazards & platforms
    for (const d of this.dynamics) {
      d.phase += (ms / 1000) * d.speed;
      const prev = { x: d.body.position.x, y: d.body.position.y };
      const nx = d.origin.x + Math.sin(d.phase) * d.ax;
      const ny = d.origin.y + Math.sin(d.phase) * d.ay;
      Body.setPosition(d.body, { x: nx, y: ny });
      if (d.kind === "mover" && this.groundBody === d.body) {
        Body.setPosition(p, { x: p.position.x + (nx - prev.x), y: p.position.y + (ny - prev.y) });
      }
    }

    // falling traps
    for (const f of this.fallers) {
      if (!f.falling && this.groundBody === f.body) {
        f.timer += ms;
        if (f.timer > 450) {
          Body.setStatic(f.body, false);
          this.solids = this.solids.filter((b) => b !== f.body);
          f.falling = true;
        }
      }
    }

    // ground detection
    const footY = p.position.y + PLAYER_H / 2;
    const under =
      this.probe(p.position.x, footY + 3) ??
      this.probe(p.position.x - 6, footY + 3) ??
      this.probe(p.position.x + 6, footY + 3);
    this.grounded = !!under && p.velocity.y >= -0.5;
    this.groundBody = this.grounded ? under : null;

    if (running) {
      this.state.time += ms / 1000;
      const dir = Math.sign(this.level.door.x - p.position.x) || 1;
      this.facing = dir;

      if (this.grounded) {
        // follow the slope of whatever surface we are standing on
        const back = this.surfaceTop(p.position.x - 9, footY - 14, 26);
        const front = this.surfaceTop(p.position.x + 9 * dir, footY - 14, 26);
        let slope = 0;
        if (back != null && front != null) slope = clamp((front - back) / 18, -1.3, 1.3);
        const norm = Math.sqrt(1 + slope * slope);
        Body.setVelocity(p, {
          x: (dir * RUN_SPEED) / norm,
          y: slope < 0 ? (RUN_SPEED * slope) / norm : p.velocity.y,
        });

        // small automatic hop over low ledges
        const aheadLow = this.probe(p.position.x + dir * 13, footY - 6);
        if (aheadLow) {
          const top = this.surfaceTop(p.position.x + dir * 13, footY - 42, 44);
          if (top != null && footY - top <= 34) {
            Body.setVelocity(p, { x: dir * RUN_SPEED, y: -7.2 });
            playSfx("jump");
            this.animState = "jump";
          }
        }
        this.stepSfx += ms;
        if (this.stepSfx > 260 && Math.abs(p.velocity.x) > 1) {
          this.stepSfx = 0;
          playSfx("step");
        }
      } else if (Math.abs(p.velocity.x) < RUN_SPEED * 0.9) {
        Body.setVelocity(p, { x: dir * RUN_SPEED * 0.9, y: p.velocity.y });
      }
    } else if (this.state.phase === "ready") {
      Body.setVelocity(p, { x: 0, y: p.velocity.y });
    }

    Engine.update(this.engine, ms);

    // animation state
    if (this.state.phase === "won") this.animState = "win";
    else if (this.state.phase === "dead" || this.state.phase === "gameover") this.animState = "dead";
    else if (!this.grounded) this.animState = p.velocity.y < -0.4 ? "jump" : "fall";
    else if (running) this.animState = "run";
    else this.animState = "idle";
    this.animPhase += (ms / 1000) * (this.animState === "run" ? 9 : 2.4);

    if (!running) {
      if (this.state.phase === "dead" || this.state.phase === "gameover") this.deadTimer += ms;
      return;
    }

    // checkpoints
    const cps = this.level.checkpoints ?? [];
    for (let i = this.reachedCheckpoints; i < cps.length; i++) {
      const cp = cps[i]!;
      if (p.position.x > cp.x) {
        this.reachedCheckpoints = i + 1;
        this.respawn = { x: cp.x, y: cp.y - 20 };
        this.state.message = "CHECKPOINT!";
        playSfx("star");
        this.emit();
        setTimeout(() => {
          if (this.state.message === "CHECKPOINT!") {
            this.state.message = null;
            this.emit();
          }
        }, 1200);
      }
    }

    // hazards
    for (const id of this.hazards) {
      const body = Composite.allBodies(this.engine.world).find((b) => b.id === id);
      if (!body) continue;
      if (overlaps(p, body)) {
        this.die("OOOPS!");
        return;
      }
    }

    // fall out of the world
    if (p.position.y > WORLD_HEIGHT + 120) {
      this.die("OOOPS!");
      return;
    }

    // time limit
    if (this.level.timeLimit && this.state.time > this.level.timeLimit) {
      this.die("SÜRE BİTTİ!");
      return;
    }

    // reached the door
    if (overlaps(p, this.door)) {
      this.state.phase = "won";
      this.animState = "win";
      playSfx("door");
      playSfx("win");
      this.emit();
    }
  }

  destroy() {
    World.clear(this.engine.world, false);
    Engine.clear(this.engine);
  }
}

/* ---------------- helpers ---------------- */

function overlaps(a: Matter.Body, b: Matter.Body) {
  return (
    a.bounds.min.x < b.bounds.max.x &&
    a.bounds.max.x > b.bounds.min.x &&
    a.bounds.min.y < b.bounds.max.y &&
    a.bounds.max.y > b.bounds.min.y
  );
}

const dist = (a: Vec, b: Vec) => Math.hypot(a.x - b.x, a.y - b.y);
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

/** Ramer-Douglas-Peucker – keeps the physics body count low. */
export function simplify(points: Vec[], epsilon: number): Vec[] {
  if (points.length < 3) return points.slice();
  let maxD = 0;
  let index = 0;
  const first = points[0]!;
  const last = points[points.length - 1]!;
  for (let i = 1; i < points.length - 1; i++) {
    const d = perpDist(points[i]!, first, last);
    if (d > maxD) {
      maxD = d;
      index = i;
    }
  }
  if (maxD > epsilon) {
    const left = simplify(points.slice(0, index + 1), epsilon);
    const right = simplify(points.slice(index), epsilon);
    return left.slice(0, -1).concat(right);
  }
  return [first, last];
}

function perpDist(p: Vec, a: Vec, b: Vec) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const den = Math.hypot(dx, dy);
  if (den === 0) return Math.hypot(p.x - a.x, p.y - a.y);
  return Math.abs(dy * p.x - dx * p.y + b.x * a.y - b.y * a.x) / den;
}

export function scoreFor(level: LevelDef, time: number, ink: number, stars: number, lives: number, attempts: number) {
  const base = 500;
  const timeBonus = Math.max(0, Math.round((level.starTime * 2 - time) * 12));
  const inkBonus = Math.max(0, Math.round((level.ink - ink) * 0.5));
  return Math.max(100, base + timeBonus + inkBonus + stars * 200 + lives * 100 - attempts * 50);
}

export function starsFor(level: LevelDef, time: number, ink: number) {
  let s = 1;
  if (ink <= level.starInk) s++;
  if (time <= level.starTime) s++;
  return s;
}
