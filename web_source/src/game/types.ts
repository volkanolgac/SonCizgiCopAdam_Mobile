export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Vec {
  x: number;
  y: number;
}

export interface Saw {
  x: number;
  y: number;
  r: number;
  /** oscillation amplitude */
  ax?: number;
  ay?: number;
  speed?: number;
}

export interface Mover extends Rect {
  ax?: number;
  ay?: number;
  speed?: number;
}

export interface LevelDef {
  id: number;
  world: number;
  name: string;
  width: number;
  gravity: number;
  ink: number;
  starInk: number;
  starTime: number;
  timeLimit?: number;
  start: Vec;
  door: Vec;
  ground: Rect[];
  ice?: Rect[];
  spikes?: Rect[];
  saws?: Saw[];
  movers?: Mover[];
  fallers?: Rect[];
  checkpoints?: Vec[];
  hint: string;
}

export interface WorldDef {
  id: number;
  name: string;
  accent: string;
  levels: [number, number];
}

export type Phase = "ready" | "running" | "won" | "dead" | "gameover";

export interface LevelResult {
  stars: number;
  score: number;
  time: number;
  ink: number;
}
