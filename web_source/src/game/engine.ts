import Matter from "matter-js";
import type { LevelDef, Phase, Vec } from "./types";
import { WORLD_HEIGHT } from "./levels";
import { playSfx } from "./audio";

const { Engine, World, Bodies, Body, Composite, Query } = Matter;

export interface StrokeSegment {
  a: Vec;
  b: Vec;
  body: Matter.Body;
}

export interface Stroke {
  points: Vec[];
  segments: StrokeSegment[];
  length: number;
}

export interface DebrisParticle {
  body: Matter.Body;
  w: number;
  h: number;
  life: number;
  maxLife: number;
  rotSpeed: number;
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
  debris: DebrisParticle[] = [];
  doorState: "closed" | "opening" | "open" | "closing" = "closed";
  doorOpenAmount = 0;
  doorEntering = false;
  doorAnimTimer = 0;
  playerHidden = false;
  state: GameState;
  respawn: Vec;
  reachedCheckpoints = 0;
  grounded = false;
  onIce = false;
  facing = 1;
  animPhase = 0;
  animState: "idle" | "run" | "jump" | "fall" | "dead" | "win" | "slide" = "idle";
  onChange: (s: GameState) => void = () => {};
  private accumulator = 0;
  private deadTimer = 0;
  private groundBody: Matter.Body | null = null;
  private lastGroundPos: Vec | null = null;
  private stepSfx = 0;
  private slideSfx = 200;
  private lastCutSound = 0;
  private stuckTimer = 0;
  private lastPosX = 0;
  private coyoteTimer = 0;

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
      chamfer: { radius: 5 },
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

    const segments: StrokeSegment[] = [];
    const numSegments = pts.length - 1;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1]!;
      const b = pts[i]!;
      const len = dist(a, b);
      if (len < 2) continue;

      const isStart = i === 1;
      const isEnd = i === numSegments;
      // Extra length to bridge gaps between interior segments, minimal at ends to prevent blunt vertical steps
      const extra = isStart && isEnd ? 0 : !isStart && !isEnd ? 3 : 1.5;
      const angle = Math.atan2(b.y - a.y, b.x - a.x);

      let midX = (a.x + b.x) / 2;
      let midY = (a.y + b.y) / 2;
      // Shift center slightly towards interior for end segments so stroke start/end does not form an artificial ledge
      if (isStart && !isEnd) {
        midX += Math.cos(angle) * 1.5;
        midY += Math.sin(angle) * 1.5;
      } else if (isEnd && !isStart) {
        midX -= Math.cos(angle) * 1.5;
        midY -= Math.sin(angle) * 1.5;
      }

      const body = Bodies.rectangle(midX, midY, len + extra, 7, {
        chamfer: { radius: 2.5 },
        isStatic: true,
        friction: 0.85,
        frictionStatic: 1,
        angle,
        label: "ink",
      });
      segments.push({ a, b, body });
    }
    if (!segments.length) return false;
    const bodies = segments.map((s) => s.body);
    Composite.add(this.engine.world, bodies);
    this.solids.push(...bodies);
    this.strokes.push({ points: pts, segments, length });
    this.state.inkUsed += length;
    this.emit();
    return true;
  }

  undo() {
    const s = this.strokes.pop();
    if (!s) return;
    for (const seg of s.segments) {
      World.remove(this.engine.world, seg.body);
      this.solids = this.solids.filter((b) => b !== seg.body);
    }
    this.state.inkUsed = Math.max(0, this.state.inkUsed - s.length);
    this.emit();
  }

  clearStrokes() {
    for (const s of this.strokes) {
      for (const seg of s.segments) World.remove(this.engine.world, seg.body);
    }
    for (const d of this.debris) World.remove(this.engine.world, d.body);
    this.debris = [];
    this.solids = this.solids.filter((b) => b.label !== "ink");
    this.strokes = [];
    this.state.inkUsed = 0;
    this.emit();
  }

  /* ---------------- flow ---------------- */

  start() {
    if (this.state.phase !== "ready") return;
    this.stuckTimer = 0;
    this.coyoteTimer = 0;
    this.lastPosX = this.player.position.x;
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
    this.doorState = "closed";
    this.doorOpenAmount = 0;
    this.doorEntering = false;
    this.doorAnimTimer = 0;
    this.playerHidden = false;
    this.stuckTimer = 0;
    this.coyoteTimer = 0;
    Body.setPosition(this.player, { ...this.respawn });
    Body.setVelocity(this.player, { x: 0, y: 0 });
    this.lastPosX = this.player.position.x;
    for (const d of this.debris) World.remove(this.engine.world, d.body);
    this.debris = [];
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
    for (let d = 0; d <= maxDepth; d += 2) {
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

    // saw cuts on drawn lines
    this.processSawStrokeCollisions();

    // update debris particles
    const activeDebris: DebrisParticle[] = [];
    for (const deb of this.debris) {
      deb.life += ms / 1000;
      Body.setAngle(deb.body, deb.body.angle + deb.rotSpeed);
      if (deb.life < deb.maxLife && deb.body.position.y < WORLD_HEIGHT + 150) {
        activeDebris.push(deb);
      } else {
        World.remove(this.engine.world, deb.body);
      }
    }
    this.debris = activeDebris;

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
      this.probe(p.position.x + 6, footY + 3) ??
      this.probe(p.position.x + 8 * this.facing, footY + 3) ??
      this.probe(p.position.x - 8 * this.facing, footY + 3) ??
      this.probe(p.position.x, footY + 5);
    this.grounded = !!under && p.velocity.y >= -0.5;
    this.groundBody = this.grounded ? under : null;
    this.onIce = this.grounded && under?.label === "ice";

    if (this.grounded) {
      this.coyoteTimer = 100;
    } else {
      this.coyoteTimer = Math.max(0, this.coyoteTimer - ms);
    }

    if (running) {
      this.state.time += ms / 1000;
      const dir = Math.sign(this.level.door.x - p.position.x) || 1;
      this.facing = dir;
      const moveSpeed = this.onIce ? RUN_SPEED * 1.8 : RUN_SPEED;

      if (this.grounded) {
        // follow the slope of whatever surface we are standing on
        const back = this.surfaceTop(p.position.x - 9, footY - 14, 26);
        const front = this.surfaceTop(p.position.x + 9 * dir, footY - 14, 26);
        let slope = 0;
        if (back != null && front != null) slope = clamp((front - back) / 18, -1.3, 1.3);
        const norm = Math.sqrt(1 + slope * slope);
        Body.setVelocity(p, {
          x: (dir * moveSpeed) / norm,
          y: slope < 0 ? (moveSpeed * slope) / norm : p.velocity.y,
        });

        // 1. Smooth Step-Up assistance for small lips & line starting edges (1px to 7px)
        const checkFrontX = p.position.x + dir * 10;
        const frontTop = this.surfaceTop(checkFrontX, footY - 10, 16);
        if (frontTop != null) {
          const stepUp = footY - frontTop;
          if (stepUp > 0.5 && stepUp <= 7) {
            Body.setPosition(p, { x: p.position.x + dir * 0.5, y: frontTop - PLAYER_H / 2 });
            Body.setVelocity(p, { x: dir * moveSpeed, y: Math.min(p.velocity.y, -0.5) });
          }
        }

        // 2. Multi-height hop over ledges, walls and drawn lines (7px to 36px)
        const checkHopX = p.position.x + dir * 13;
        const obstacleAhead =
          this.probe(checkHopX, footY - 4) ??
          this.probe(checkHopX, footY - 8) ??
          this.probe(checkHopX, footY - 16) ??
          this.probe(p.position.x + dir * 9, footY - 4) ??
          this.probe(p.position.x + dir * 9, footY - 8);

        if (obstacleAhead && obstacleAhead.label !== "player") {
          const top = this.surfaceTop(checkHopX, footY - 42, 46);
          if (top != null) {
            const obstacleH = footY - top;
            if (obstacleH > 6 && obstacleH <= 36) {
              Body.setVelocity(p, { x: dir * moveSpeed, y: -7.2 });
              playSfx("jump");
              this.animState = "jump";
            }
          }
        }

        if (this.onIce) {
          this.slideSfx += ms;
          if (this.slideSfx >= 200 && Math.abs(p.velocity.x) > 1) {
            this.slideSfx = 0;
            playSfx("slide");
          }
        } else {
          this.slideSfx = 200;
          this.stepSfx += ms;
          if (this.stepSfx > 260 && Math.abs(p.velocity.x) > 1) {
            this.stepSfx = 0;
            playSfx("step");
          }
        }
      } else if (Math.abs(p.velocity.x) < RUN_SPEED * 0.9) {
        Body.setVelocity(p, { x: dir * RUN_SPEED * 0.9, y: p.velocity.y });

        // Mid-air coyote hop if stepped off a ledge right in front of an obstacle
        if (this.coyoteTimer > 0) {
          const checkHopX = p.position.x + dir * 13;
          const obstacleAhead =
            this.probe(checkHopX, footY - 4) ??
            this.probe(checkHopX, footY - 10);
          if (obstacleAhead && obstacleAhead.label !== "player") {
            const top = this.surfaceTop(checkHopX, footY - 42, 46);
            if (top != null && footY - top <= 36) {
              Body.setVelocity(p, { x: dir * moveSpeed, y: -7.2 });
              playSfx("jump");
              this.animState = "jump";
              this.coyoteTimer = 0;
            }
          }
        }
      }

      // 3. Anti-stuck safeguard: If forward movement is blocked by line start or corner
      const movedX = Math.abs(p.position.x - this.lastPosX);
      if (this.grounded && movedX < 0.2) {
        this.stuckTimer += ms;
        if (this.stuckTimer >= 100) {
          this.stuckTimer = 0;
          const blockedFront =
            this.probe(p.position.x + dir * 9, footY - 2) ??
            this.probe(p.position.x + dir * 9, footY - 8) ??
            this.probe(p.position.x + dir * 12, footY - 4) ??
            this.probe(p.position.x + dir * 12, footY - 12);

          if (blockedFront && blockedFront.label !== "player") {
            Body.setVelocity(p, { x: dir * moveSpeed, y: -7.2 });
            playSfx("jump");
            this.animState = "jump";
          }
        }
      } else {
        this.stuckTimer = Math.max(0, this.stuckTimer - ms * 0.5);
      }
      this.lastPosX = p.position.x;
    } else if (this.state.phase === "ready") {
      Body.setVelocity(p, { x: 0, y: p.velocity.y });
    }

    Engine.update(this.engine, ms);

    // animation state
    if (this.state.phase === "won") this.animState = "win";
    else if (this.state.phase === "dead" || this.state.phase === "gameover") this.animState = "dead";
    else if (!this.grounded) this.animState = p.velocity.y < -0.4 ? "jump" : "fall";
    else if (running) this.animState = this.onIce ? "slide" : "run";
    else this.animState = "idle";
    this.animPhase += (ms / 1000) * (this.animState === "run" ? 9 : this.animState === "slide" ? 6 : 2.4);

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

    // door entering animation sequence
    if (this.doorEntering) {
      Body.setVelocity(p, { x: 0, y: 0 });
      this.doorAnimTimer += ms;

      if (this.doorAnimTimer < 300) {
        // Door opening
        this.doorState = "opening";
        this.doorOpenAmount = Math.min(1, this.doorAnimTimer / 250);
      } else if (this.doorAnimTimer < 750) {
        // Door open, stickman steps inside
        this.doorState = "open";
        this.doorOpenAmount = 1.0;
        p.position.x += (this.level.door.x - p.position.x) * 0.15;
        p.position.y += (this.level.door.y - PLAYER_H / 2 - p.position.y) * 0.15;
      } else if (this.doorAnimTimer < 1050) {
        // Stickman is inside, door closing behind him
        if (this.doorState !== "closing") {
          this.doorState = "closing";
          this.playerHidden = true;
          playSfx("doorClose");
        }
        this.doorOpenAmount = Math.max(0, 1 - (this.doorAnimTimer - 750) / 250);
      } else {
        // Animation finished! Door closed, stickman disappeared inside.
        this.doorState = "closed";
        this.doorOpenAmount = 0;
        this.doorEntering = false;
        this.state.phase = "won";
        this.animState = "win";
        playSfx("win");
        this.emit();
      }
      return;
    }

    // reached the door
    if (overlaps(p, this.door) && !this.doorEntering) {
      this.doorEntering = true;
      this.doorAnimTimer = 0;
      this.doorState = "opening";
      this.doorOpenAmount = 0;
      playSfx("doorOpen");
    }
  }

  private processSawStrokeCollisions() {
    const saws = this.dynamics.filter((d) => d.kind === "saw");
    if (!saws.length || !this.strokes.length) return;

    let didCut = false;

    for (const saw of saws) {
      const cx = saw.body.position.x;
      const cy = saw.body.position.y;
      const sawR = (saw.body.circleRadius ?? 28) + 8; // circle radius + outer teeth
      const sawRSq = sawR * sawR;

      for (const stroke of this.strokes) {
        const remainingSegments: StrokeSegment[] = [];
        for (const seg of stroke.segments) {
          const dSq = distToSegmentSq({ x: cx, y: cy }, seg.a, seg.b);

          if (dSq <= sawRSq) {
            // Cut this segment!
            didCut = true;
            World.remove(this.engine.world, seg.body);
            this.solids = this.solids.filter((b) => b !== seg.body);

            // Spawn falling debris particles
            const proj = projectPointToSegment({ x: cx, y: cy }, seg.a, seg.b);
            this.spawnDebris(proj.x, proj.y, cx, cy);
          } else {
            remainingSegments.push(seg);
          }
        }
        stroke.segments = remainingSegments;
      }
    }

    if (didCut) {
      const now = Date.now();
      if (now - this.lastCutSound > 100) {
        this.lastCutSound = now;
        playSfx("cut");
      }
      this.emit();
    }

    // Filter out empty strokes
    this.strokes = this.strokes.filter((s) => s.segments.length > 0);
  }

  private spawnDebris(x: number, y: number, cx: number, cy: number) {
    const count = 2 + Math.floor(Math.random() * 2);
    const angle = Math.atan2(y - cy, x - cx);

    for (let i = 0; i < count; i++) {
      const dw = 4 + Math.random() * 5;
      const dh = 4 + Math.random() * 5;
      const px = x + (Math.random() - 0.5) * 8;
      const py = y + (Math.random() - 0.5) * 8;

      const body = Bodies.rectangle(px, py, dw, dh, {
        isStatic: false,
        isSensor: true,
        frictionAir: 0.015,
        restitution: 0.3,
        label: "debris",
      });

      // Saw teeth throw direction
      const tangX = -Math.sin(angle) * 4;
      const tangY = Math.cos(angle) * 4;
      const outX = Math.cos(angle) * 2.5;
      const outY = Math.sin(angle) * 2.5;

      Body.setVelocity(body, {
        x: tangX + outX + (Math.random() - 0.5) * 3,
        y: tangY + outY - Math.random() * 2.5,
      });

      World.add(this.engine.world, body);

      this.debris.push({
        body,
        w: dw,
        h: dh,
        life: 0,
        maxLife: 1.5 + Math.random() * 1.0,
        rotSpeed: (Math.random() - 0.5) * 0.4,
      });
    }
  }

  destroy() {
    World.clear(this.engine.world, false);
    Engine.clear(this.engine);
  }
}

/* ---------------- helpers ---------------- */

function distToSegmentSq(p: Vec, a: Vec, b: Vec): number {
  const l2 = (b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y);
  if (l2 === 0) return (p.x - a.x) * (p.x - a.x) + (p.y - a.y) * (p.y - a.y);
  let t = ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  const projX = a.x + t * (b.x - a.x);
  const projY = a.y + t * (b.y - a.y);
  const dx = p.x - projX;
  const dy = p.y - projY;
  return dx * dx + dy * dy;
}

function projectPointToSegment(p: Vec, a: Vec, b: Vec): Vec {
  const l2 = (b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y);
  if (l2 === 0) return { x: a.x, y: a.y };
  let t = ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  return { x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) };
}

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
