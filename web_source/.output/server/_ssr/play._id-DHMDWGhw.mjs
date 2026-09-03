import { r as __toESM } from "../_runtime.mjs";
import { i as performance_default } from "../_libs/h3-v2+rou3+srvx+unenv.mjs";
import { a as saveProgress, i as loadProgress, r as evaluateAchievements } from "./storage-BVLI00iQ.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as LEVELS } from "./levels-BcMdrIfU.mjs";
import { t as Route } from "./play._id-CBx_CX8w.mjs";
import { n as setSoundEnabled, t as playSfx } from "./audio-DG1REc8G.mjs";
import { t as require_matter } from "../_libs/matter-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/play._id-DHMDWGhw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var { Engine, World, Bodies, Body, Composite, Query } = (/* @__PURE__ */ __toESM(require_matter())).default;
var PLAYER_W = 18;
var PLAYER_H = 34;
var RUN_SPEED = 3.1;
var GameEngine = class {
	level;
	engine;
	player;
	strokes = [];
	dynamics = [];
	fallers = [];
	hazards = /* @__PURE__ */ new Set();
	door;
	solids = [];
	state;
	respawn;
	reachedCheckpoints = 0;
	grounded = false;
	facing = 1;
	animPhase = 0;
	animState = "idle";
	onChange = () => {};
	accumulator = 0;
	deadTimer = 0;
	groundBody = null;
	lastGroundPos = null;
	stepSfx = 0;
	constructor(level) {
		this.level = level;
		this.engine = Engine.create({ gravity: {
			x: 0,
			y: level.gravity,
			scale: .001
		} });
		this.respawn = { ...level.start };
		this.state = {
			phase: "ready",
			lives: 3,
			time: 0,
			inkUsed: 0,
			inkBudget: level.ink,
			attempts: 0,
			message: null
		};
		this.build();
	}
	emit() {
		this.onChange({ ...this.state });
	}
	build() {
		const l = this.level;
		const w = this.engine.world;
		const statics = [];
		for (const r of l.ground) statics.push(Bodies.rectangle(r.x + r.w / 2, r.y + r.h / 2, r.w, r.h, {
			isStatic: true,
			friction: .9,
			label: "ground"
		}));
		for (const r of l.ice ?? []) statics.push(Bodies.rectangle(r.x + r.w / 2, r.y + r.h / 2, r.w, r.h, {
			isStatic: true,
			friction: .002,
			frictionStatic: .002,
			label: "ice"
		}));
		for (const r of l.spikes ?? []) {
			const b = Bodies.rectangle(r.x + r.w / 2, r.y + r.h / 2, r.w, r.h, {
				isStatic: true,
				isSensor: true,
				label: "spike"
			});
			this.hazards.add(b.id);
			statics.push(b);
		}
		for (const s of l.saws ?? []) {
			const b = Bodies.circle(s.x, s.y, s.r, {
				isStatic: true,
				isSensor: true,
				label: "saw"
			});
			this.hazards.add(b.id);
			statics.push(b);
			this.dynamics.push({
				body: b,
				origin: {
					x: s.x,
					y: s.y
				},
				ax: s.ax ?? 0,
				ay: s.ay ?? 0,
				speed: s.speed ?? 1,
				phase: 0,
				kind: "saw"
			});
		}
		for (const m of l.movers ?? []) {
			const b = Bodies.rectangle(m.x + m.w / 2, m.y + m.h / 2, m.w, m.h, {
				isStatic: true,
				friction: .9,
				label: "mover"
			});
			statics.push(b);
			this.dynamics.push({
				body: b,
				origin: {
					x: m.x + m.w / 2,
					y: m.y + m.h / 2
				},
				ax: m.ax ?? 0,
				ay: m.ay ?? 0,
				speed: m.speed ?? 1,
				phase: 0,
				kind: "mover"
			});
		}
		for (const f of l.fallers ?? []) {
			const b = Bodies.rectangle(f.x + f.w / 2, f.y + f.h / 2, f.w, f.h, {
				isStatic: true,
				friction: .9,
				label: "faller"
			});
			statics.push(b);
			this.fallers.push({
				body: b,
				timer: 0,
				falling: false,
				origin: {
					x: f.x + f.w / 2,
					y: f.y + f.h / 2
				}
			});
		}
		this.door = Bodies.rectangle(l.door.x, l.door.y - 36, 46, 72, {
			isStatic: true,
			isSensor: true,
			label: "door"
		});
		statics.push(this.door);
		statics.push(Bodies.rectangle(-30, 600 / 2, 60, 1800, {
			isStatic: true,
			label: "bound"
		}));
		statics.push(Bodies.rectangle(l.width + 30, 600 / 2, 60, 1800, {
			isStatic: true,
			label: "bound"
		}));
		this.player = Bodies.rectangle(l.start.x, l.start.y, PLAYER_W, PLAYER_H, {
			friction: .02,
			frictionStatic: .05,
			frictionAir: .008,
			restitution: 0,
			label: "player"
		});
		Body.setInertia(this.player, Infinity);
		Composite.add(w, [...statics, this.player]);
		this.solids = statics.filter((b) => !b.isSensor);
	}
	get inkLeft() {
		return Math.max(0, this.state.inkBudget - this.state.inkUsed);
	}
	addStroke(raw) {
		const pts = simplify(raw, 4);
		if (pts.length < 2) return false;
		let length = 0;
		for (let i = 1; i < pts.length; i++) length += dist(pts[i - 1], pts[i]);
		if (length < 6) return false;
		if (length > this.inkLeft) return false;
		const bodies = [];
		for (let i = 1; i < pts.length; i++) {
			const a = pts[i - 1];
			const b = pts[i];
			const len = dist(a, b);
			if (len < 2) continue;
			const body = Bodies.rectangle((a.x + b.x) / 2, (a.y + b.y) / 2, len + 6, 9, {
				isStatic: true,
				friction: .85,
				frictionStatic: 1,
				angle: Math.atan2(b.y - a.y, b.x - a.x),
				label: "ink"
			});
			bodies.push(body);
		}
		if (!bodies.length) return false;
		Composite.add(this.engine.world, bodies);
		this.solids.push(...bodies);
		this.strokes.push({
			points: pts,
			bodies,
			length
		});
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
	start() {
		if (this.state.phase !== "ready") return;
		this.state.phase = "running";
		this.state.message = null;
		this.emit();
	}
	die(reason) {
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
		Body.setVelocity(this.player, {
			x: 0,
			y: 0
		});
		for (const f of this.fallers) if (f.falling) {
			Body.setStatic(f.body, true);
			Body.setPosition(f.body, { ...f.origin });
			Body.setVelocity(f.body, {
				x: 0,
				y: 0
			});
			f.falling = false;
			f.timer = 0;
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
	probe(x, y) {
		const hits = Query.point(this.solids, {
			x,
			y
		});
		return hits.length ? hits[0] : null;
	}
	surfaceTop(x, fromY, maxDepth = 60) {
		for (let d = 0; d <= maxDepth; d += 3) if (this.probe(x, fromY + d)) return fromY + d;
		return null;
	}
	update(dtMs) {
		const dt = Math.min(dtMs, 50);
		this.accumulator += dt;
		let steps = 0;
		while (this.accumulator >= 16.666 && steps < 4) {
			this.step(16.666);
			this.accumulator -= 16.666;
			steps++;
		}
		if (steps === 0 && this.accumulator > 0) {}
	}
	step(ms) {
		const p = this.player;
		const running = this.state.phase === "running";
		for (const d of this.dynamics) {
			d.phase += ms / 1e3 * d.speed;
			const prev = {
				x: d.body.position.x,
				y: d.body.position.y
			};
			const nx = d.origin.x + Math.sin(d.phase) * d.ax;
			const ny = d.origin.y + Math.sin(d.phase) * d.ay;
			Body.setPosition(d.body, {
				x: nx,
				y: ny
			});
			if (d.kind === "mover" && this.groundBody === d.body) Body.setPosition(p, {
				x: p.position.x + (nx - prev.x),
				y: p.position.y + (ny - prev.y)
			});
		}
		for (const f of this.fallers) if (!f.falling && this.groundBody === f.body) {
			f.timer += ms;
			if (f.timer > 450) {
				Body.setStatic(f.body, false);
				this.solids = this.solids.filter((b) => b !== f.body);
				f.falling = true;
			}
		}
		const footY = p.position.y + PLAYER_H / 2;
		const under = this.probe(p.position.x, footY + 3) ?? this.probe(p.position.x - 6, footY + 3) ?? this.probe(p.position.x + 6, footY + 3);
		this.grounded = !!under && p.velocity.y >= -.5;
		this.groundBody = this.grounded ? under : null;
		if (running) {
			this.state.time += ms / 1e3;
			const dir = Math.sign(this.level.door.x - p.position.x) || 1;
			this.facing = dir;
			if (this.grounded) {
				const back = this.surfaceTop(p.position.x - 9, footY - 14, 26);
				const front = this.surfaceTop(p.position.x + 9 * dir, footY - 14, 26);
				let slope = 0;
				if (back != null && front != null) slope = clamp((front - back) / 18, -1.3, 1.3);
				const norm = Math.sqrt(1 + slope * slope);
				Body.setVelocity(p, {
					x: dir * RUN_SPEED / norm,
					y: slope < 0 ? RUN_SPEED * slope / norm : p.velocity.y
				});
				if (this.probe(p.position.x + dir * 13, footY - 6)) {
					const top = this.surfaceTop(p.position.x + dir * 13, footY - 42, 44);
					if (top != null && footY - top <= 34) {
						Body.setVelocity(p, {
							x: dir * RUN_SPEED,
							y: -7.2
						});
						playSfx("jump");
						this.animState = "jump";
					}
				}
				this.stepSfx += ms;
				if (this.stepSfx > 260 && Math.abs(p.velocity.x) > 1) {
					this.stepSfx = 0;
					playSfx("step");
				}
			} else if (Math.abs(p.velocity.x) < RUN_SPEED * .9) Body.setVelocity(p, {
				x: dir * RUN_SPEED * .9,
				y: p.velocity.y
			});
		} else if (this.state.phase === "ready") Body.setVelocity(p, {
			x: 0,
			y: p.velocity.y
		});
		Engine.update(this.engine, ms);
		if (this.state.phase === "won") this.animState = "win";
		else if (this.state.phase === "dead" || this.state.phase === "gameover") this.animState = "dead";
		else if (!this.grounded) this.animState = p.velocity.y < -.4 ? "jump" : "fall";
		else if (running) this.animState = "run";
		else this.animState = "idle";
		this.animPhase += ms / 1e3 * (this.animState === "run" ? 9 : 2.4);
		if (!running) {
			if (this.state.phase === "dead" || this.state.phase === "gameover") this.deadTimer += ms;
			return;
		}
		const cps = this.level.checkpoints ?? [];
		for (let i = this.reachedCheckpoints; i < cps.length; i++) {
			const cp = cps[i];
			if (p.position.x > cp.x) {
				this.reachedCheckpoints = i + 1;
				this.respawn = {
					x: cp.x,
					y: cp.y - 20
				};
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
		for (const id of this.hazards) {
			const body = Composite.allBodies(this.engine.world).find((b) => b.id === id);
			if (!body) continue;
			if (overlaps(p, body)) {
				this.die("OOOPS!");
				return;
			}
		}
		if (p.position.y > 720) {
			this.die("OOOPS!");
			return;
		}
		if (this.level.timeLimit && this.state.time > this.level.timeLimit) {
			this.die("SÜRE BİTTİ!");
			return;
		}
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
};
function overlaps(a, b) {
	return a.bounds.min.x < b.bounds.max.x && a.bounds.max.x > b.bounds.min.x && a.bounds.min.y < b.bounds.max.y && a.bounds.max.y > b.bounds.min.y;
}
var dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
var clamp = (v, a, b) => Math.max(a, Math.min(b, v));
/** Ramer-Douglas-Peucker – keeps the physics body count low. */
function simplify(points, epsilon) {
	if (points.length < 3) return points.slice();
	let maxD = 0;
	let index = 0;
	const first = points[0];
	const last = points[points.length - 1];
	for (let i = 1; i < points.length - 1; i++) {
		const d = perpDist(points[i], first, last);
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
function perpDist(p, a, b) {
	const dx = b.x - a.x;
	const dy = b.y - a.y;
	const den = Math.hypot(dx, dy);
	if (den === 0) return Math.hypot(p.x - a.x, p.y - a.y);
	return Math.abs(dy * p.x - dx * p.y + b.x * a.y - b.y * a.x) / den;
}
function scoreFor(level, time, ink, stars, lives, attempts) {
	const base = 500;
	const timeBonus = Math.max(0, Math.round((level.starTime * 2 - time) * 12));
	const inkBonus = Math.max(0, Math.round((level.ink - ink) * .5));
	return Math.max(100, base + timeBonus + inkBonus + stars * 200 + lives * 100 - attempts * 50);
}
function starsFor(level, time, ink) {
	let s = 1;
	if (ink <= level.starInk) s++;
	if (time <= level.starTime) s++;
	return s;
}
/** Deterministic pseudo-random used for the hand-drawn wobble. */
function seeded(seed) {
	let s = seed % 2147483647;
	if (s <= 0) s += 2147483646;
	return () => {
		s = s * 16807 % 2147483647;
		return (s - 1) / 2147483646;
	};
}
function roughLine(ctx, x1, y1, x2, y2, seed = 1, wobble = 1.6, passes = 2) {
	const rnd = seeded(seed * 7919 + 13);
	for (let p = 0; p < passes; p++) {
		const o = () => (rnd() - .5) * wobble * 2;
		ctx.beginPath();
		ctx.moveTo(x1 + o(), y1 + o());
		const mx = (x1 + x2) / 2 + o() * 1.4;
		const my = (y1 + y2) / 2 + o() * 1.4;
		ctx.quadraticCurveTo(mx, my, x2 + o(), y2 + o());
		ctx.stroke();
	}
}
function roughRect(ctx, x, y, w, h, seed = 1, wobble = 1.6) {
	roughLine(ctx, x, y, x + w, y, seed, wobble);
	roughLine(ctx, x + w, y, x + w, y + h, seed + 1, wobble);
	roughLine(ctx, x + w, y + h, x, y + h, seed + 2, wobble);
	roughLine(ctx, x, y + h, x, y, seed + 3, wobble);
}
/** Diagonal pencil hatching used for rock / ground fills. */
function hatch(ctx, x, y, w, h, step = 12, seed = 5) {
	const rnd = seeded(seed);
	ctx.save();
	ctx.beginPath();
	ctx.rect(x, y, w, h);
	ctx.clip();
	ctx.lineWidth = 1;
	for (let i = -h; i < w; i += step) {
		const j = (rnd() - .5) * 3;
		ctx.beginPath();
		ctx.moveTo(x + i + j, y);
		ctx.lineTo(x + i + h + j, y + h);
		ctx.stroke();
	}
	ctx.restore();
}
function roughCircle(ctx, cx, cy, r, seed = 3, wobble = 1.2) {
	const rnd = seeded(seed);
	for (let p = 0; p < 2; p++) {
		ctx.beginPath();
		const steps = 14;
		for (let i = 0; i <= steps; i++) {
			const a = i / steps * Math.PI * 2;
			const rr = r + (rnd() - .5) * wobble * 2;
			const px = cx + Math.cos(a) * rr;
			const py = cy + Math.sin(a) * rr;
			if (i === 0) ctx.moveTo(px, py);
			else ctx.lineTo(px, py);
		}
		ctx.stroke();
	}
}
var INK = "#111111";
var GREEN = "#1f9d55";
var RED = "#d8322c";
var BLUE = "#2f6fd0";
function computeCamera(cssW, cssH, playerX, levelWidth) {
	const scale = Math.min(cssH / 600, cssW / 620);
	const viewW = cssW / scale;
	const viewH = cssH / scale;
	let camX = playerX - viewW * .42;
	camX = Math.max(0, Math.min(camX, Math.max(0, levelWidth - viewW)));
	const camY = viewH >= 600 ? -(viewH - 600) / 2 : 0;
	return {
		scale,
		x: camX,
		y: camY
	};
}
function screenToWorld(cam, sx, sy) {
	return {
		x: sx / cam.scale + cam.x,
		y: sy / cam.scale + cam.y
	};
}
function render(ctx, game, cssW, cssH, drafting, outOfInk) {
	const level = game.level;
	const cam = computeCamera(cssW, cssH, game.player.position.x, level.width);
	ctx.save();
	ctx.clearRect(0, 0, cssW, cssH);
	ctx.fillStyle = "#f7f4ec";
	ctx.fillRect(0, 0, cssW, cssH);
	ctx.translate(-cam.x * cam.scale, -cam.y * cam.scale);
	ctx.scale(cam.scale, cam.scale);
	ctx.lineCap = "round";
	ctx.lineJoin = "round";
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
	ctx.strokeStyle = INK;
	ctx.lineWidth = 2.4;
	level.ground.forEach((r, i) => {
		roughRect(ctx, r.x, r.y, r.w, r.h, i + 2, 1.8);
		ctx.strokeStyle = "rgba(17,17,17,0.35)";
		hatch(ctx, r.x + 1, r.y + 1, r.w - 2, r.h - 2, 13, i + 9);
		ctx.strokeStyle = INK;
	});
	(level.ice ?? []).forEach((r, i) => {
		ctx.strokeStyle = BLUE;
		ctx.lineWidth = 2.4;
		roughRect(ctx, r.x, r.y, r.w, r.h, i + 30, 1.4);
		ctx.strokeStyle = "rgba(47,111,208,0.5)";
		hatch(ctx, r.x + 1, r.y + 1, r.w - 2, r.h - 2, 16, i + 40);
	});
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
	game.dynamics.filter((d) => d.kind === "mover").forEach((d, i) => {
		const b = d.body;
		const w = b.bounds.max.x - b.bounds.min.x;
		const h = b.bounds.max.y - b.bounds.min.y;
		ctx.strokeStyle = INK;
		ctx.lineWidth = 2.4;
		roughRect(ctx, b.position.x - w / 2, b.position.y - h / 2, w, h, i + 60, 1.4);
		ctx.strokeStyle = "rgba(17,17,17,0.4)";
		hatch(ctx, b.position.x - w / 2, b.position.y - h / 2, w, h, 10, i + 62);
	});
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
	game.dynamics.filter((d) => d.kind === "saw").forEach((d, i) => {
		const b = d.body;
		const r = b.circleRadius ?? 28;
		ctx.strokeStyle = RED;
		ctx.lineWidth = 2.2;
		roughCircle(ctx, b.position.x, b.position.y, r, i + 70, 1);
		const spin = d.phase * 3;
		for (let t = 0; t < 8; t++) {
			const a = spin + t / 8 * Math.PI * 2;
			roughLine(ctx, b.position.x + Math.cos(a) * r, b.position.y + Math.sin(a) * r, b.position.x + Math.cos(a) * (r + 7), b.position.y + Math.sin(a) * (r + 7), i * 5 + t, .8, 1);
		}
		roughCircle(ctx, b.position.x, b.position.y, 4, i + 71, .6);
	});
	(level.checkpoints ?? []).forEach((c, i) => {
		ctx.strokeStyle = game.reachedCheckpoints > i ? GREEN : "rgba(17,17,17,0.55)";
		ctx.lineWidth = 2.2;
		roughLine(ctx, c.x, c.y, c.x, c.y - 46, i + 80, 1);
		ctx.beginPath();
		ctx.moveTo(c.x, c.y - 46);
		ctx.lineTo(c.x + 26, c.y - 38);
		ctx.lineTo(c.x, c.y - 30);
		ctx.closePath();
		ctx.stroke();
	});
	drawDoor(ctx, level.door.x, level.door.y, game.state.phase === "won");
	ctx.lineWidth = 6;
	ctx.strokeStyle = INK;
	game.strokes.forEach((s, i) => {
		drawStroke(ctx, s.points, i);
	});
	if (drafting && drafting.length > 1) {
		ctx.strokeStyle = outOfInk ? RED : GREEN;
		ctx.lineWidth = 6;
		ctx.beginPath();
		ctx.moveTo(drafting[0].x, drafting[0].y);
		for (let i = 1; i < drafting.length; i++) ctx.lineTo(drafting[i].x, drafting[i].y);
		ctx.stroke();
	}
	drawStickman(ctx, game);
	ctx.restore();
}
function drawStroke(ctx, pts, seed) {
	const rnd = seeded(seed * 31 + 7);
	for (let pass = 0; pass < 2; pass++) {
		ctx.beginPath();
		ctx.lineWidth = pass === 0 ? 6 : 2.5;
		ctx.strokeStyle = pass === 0 ? INK : "rgba(17,17,17,0.5)";
		ctx.moveTo(pts[0].x, pts[0].y);
		for (let i = 1; i < pts.length; i++) {
			const o = (rnd() - .5) * 1.6;
			ctx.lineTo(pts[i].x + o, pts[i].y + o);
		}
		ctx.stroke();
	}
}
function drawDoor(ctx, x, baseY, open) {
	const w = 46;
	const h = 74;
	ctx.strokeStyle = GREEN;
	ctx.lineWidth = 2.8;
	roughRect(ctx, x - w / 2, baseY - h, w, h, 91, 1.3);
	if (open) {
		ctx.strokeStyle = "rgba(31,157,85,0.55)";
		hatch(ctx, x - w / 2 + 2, baseY - h + 2, 42, 70, 8, 93);
	} else roughCircle(ctx, x + w / 2 - 10, baseY - h / 2, 3.4, 95, .5);
}
function drawStickman(ctx, game) {
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
	const bob = st === "run" ? Math.sin(t * 2) * 1.2 : st === "idle" ? Math.sin(t) * .8 : 0;
	ctx.translate(0, bob);
	if (st === "dead") ctx.rotate(.5 * dir);
	roughCircle(ctx, 0, headY, headR, 101, .7);
	ctx.lineWidth = 1.6;
	ctx.beginPath();
	ctx.arc(-2.6 * dir + (st === "dead" ? 0 : 0), -14.5, .9, 0, Math.PI * 2);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(2.6 * dir, -14.5, .9, 0, Math.PI * 2);
	ctx.stroke();
	ctx.beginPath();
	if (st === "win") ctx.arc(0, -11.5, 3, .15 * Math.PI, .85 * Math.PI);
	else if (st === "dead") ctx.arc(0, -8.5, 2.6, 1.15 * Math.PI, 1.85 * Math.PI);
	else ctx.arc(0, -11, 2.2, .1 * Math.PI, .9 * Math.PI);
	ctx.stroke();
	ctx.lineWidth = 3;
	roughLine(ctx, 0, -5.5, 0, hipY, 103, .5, 1);
	let armA = 0;
	let armB = 0;
	let legA = 0;
	let legB = 0;
	if (st === "run") {
		armA = Math.sin(t) * .9;
		armB = -armA;
		legA = Math.sin(t) * .85;
		legB = -legA;
	} else if (st === "jump") {
		armA = -1.5;
		armB = -1.2;
		legA = .5;
		legB = -.3;
	} else if (st === "fall") {
		armA = -2;
		armB = -1.9;
		legA = .7;
		legB = -.5;
	} else if (st === "win") {
		armA = -2.2;
		armB = -2.2;
	} else if (st === "dead") {
		armA = 1.4;
		armB = 2;
		legA = 1.2;
		legB = .6;
	} else {
		armA = .25;
		armB = -.25;
		legA = .18;
		legB = -.18;
	}
	const limb = (x0, y0, ang, len, seed) => {
		const ex = x0 + Math.sin(ang) * len * dir;
		const ey = y0 + Math.cos(ang) * len;
		roughLine(ctx, x0, y0, ex, ey, seed, .5, 1);
		return {
			x: ex,
			y: ey
		};
	};
	const shoulderY = -2.5;
	limb(0, shoulderY, Math.PI / 2 + armA, 11, 105);
	limb(0, shoulderY, Math.PI / 2 + armB + Math.PI, 11, 106);
	limb(0, hipY, legA, 12, 107);
	limb(0, hipY, legB, 12, 108);
	ctx.restore();
}
var _jsxFileName$1 = "/app/applet/web_source/src/components/GameScreen.tsx";
function GameScreen({ levelId }) {
	const navigate = useNavigate();
	const level = LEVELS.find((l) => l.id === levelId) ?? LEVELS[0];
	const canvasRef = (0, import_react.useRef)(null);
	const wrapRef = (0, import_react.useRef)(null);
	const engineRef = (0, import_react.useRef)(null);
	const draftingRef = (0, import_react.useRef)(null);
	const [drafting, setDrafting] = (0, import_react.useState)(null);
	const [outOfInk, setOutOfInk] = (0, import_react.useState)(false);
	const [state, setState] = (0, import_react.useState)(null);
	const [result, setResult] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const eng = new GameEngine(level);
		engineRef.current = eng;
		setState({ ...eng.state });
		setResult(null);
		eng.onChange = (s) => setState({ ...s });
		return () => eng.destroy();
	}, [level]);
	(0, import_react.useEffect)(() => {
		if (state?.phase !== "won" || result) return;
		if (!engineRef.current) return;
		const stars = starsFor(level, state.time, state.inkUsed);
		const score = scoreFor(level, state.time, state.inkUsed, stars, state.lives, state.attempts);
		setResult({
			stars,
			score
		});
		const p = loadProgress();
		const prev = p.levels[level.id];
		if (!prev || stars > prev.stars || score > prev.score) p.levels[level.id] = {
			stars: Math.max(stars, prev?.stars ?? 0),
			score: Math.max(score, prev?.score ?? 0),
			time: state.time,
			ink: state.inkUsed
		};
		p.totalInk += state.inkUsed;
		p.unlocked = Math.max(p.unlocked, Math.min(level.id + 1, LEVELS.length));
		p.achievements = evaluateAchievements(p);
		saveProgress(p);
	}, [state?.phase]);
	(0, import_react.useEffect)(() => {
		setSoundEnabled(loadProgress().sound);
	}, []);
	(0, import_react.useEffect)(() => {
		let raf = 0;
		let last = performance_default.now();
		const loop = (now) => {
			const eng = engineRef.current;
			const canvas = canvasRef.current;
			const wrap = wrapRef.current;
			if (eng && canvas && wrap) {
				const dpr = Math.min(window.devicePixelRatio || 1, 2);
				const w = wrap.clientWidth;
				const h = wrap.clientHeight;
				if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
					canvas.width = w * dpr;
					canvas.height = h * dpr;
				}
				const ctx = canvas.getContext("2d");
				if (ctx) {
					ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
					eng.update(now - last);
					render(ctx, eng, w, h, draftingRef.current, eng.inkLeft <= 0);
				}
			}
			last = now;
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, []);
	const toWorld = (0, import_react.useCallback)((e) => {
		const canvas = canvasRef.current;
		const wrap = wrapRef.current;
		const eng = engineRef.current;
		const rect = canvas.getBoundingClientRect();
		return screenToWorld(computeCamera(wrap.clientWidth, wrap.clientHeight, eng.player.position.x, eng.level.width), e.clientX - rect.left, e.clientY - rect.top);
	}, []);
	const onPointerDown = (e) => {
		const eng = engineRef.current;
		if (!eng || eng.state.phase === "won" || eng.state.phase === "gameover") return;
		e.target.setPointerCapture(e.pointerId);
		const p = toWorld(e);
		draftingRef.current = [p];
		setDrafting([p]);
		setOutOfInk(false);
	};
	const onPointerMove = (e) => {
		const eng = engineRef.current;
		if (!eng || !draftingRef.current) return;
		const p = toWorld(e);
		const pts = draftingRef.current;
		const last = pts[pts.length - 1];
		if (Math.hypot(p.x - last.x, p.y - last.y) > 3) {
			let used = eng.state.inkUsed;
			for (let i = 1; i < pts.length; i++) used += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
			if (used + 6 > eng.state.inkBudget) {
				setOutOfInk(true);
				finishStroke();
				return;
			}
			pts.push(p);
			setDrafting([...pts]);
			playSfx("draw");
		}
	};
	const finishStroke = () => {
		const eng = engineRef.current;
		const pts = draftingRef.current;
		draftingRef.current = null;
		setDrafting(null);
		if (!eng || !pts) return;
		if (!eng.addStroke(pts)) playSfx("error");
	};
	const start = () => {
		playSfx("click");
		engineRef.current?.start();
	};
	const inkPct = state ? Math.round((1 - state.inkUsed / state.inkBudget) * 100) : 100;
	const phase = state?.phase ?? "ready";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "fixed inset-0 flex flex-col bg-[#f7f4ec] select-none",
		style: { touchAction: "none" },
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2 px-3 py-2 z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/levels",
						className: "btn-ink small",
						"aria-label": "Bölümler",
						children: "☰"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 156,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "font-hand text-lg leading-none",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "opacity-60",
								children: ["BÖLÜM ", level.id]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 160,
								columnNumber: 11
							}, this),
							" · ",
							level.name
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 159,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "ml-auto flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-hand text-lg",
							"aria-label": "can",
							children: ["♥".repeat(Math.max(0, state?.lives ?? 3)), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "opacity-25",
								children: "♥".repeat(Math.max(0, 3 - (state?.lives ?? 3)))
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 165,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 163,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-hand text-lg tabular-nums",
							children: [(state?.time ?? 0).toFixed(1), "s"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 167,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 162,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 155,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-3 h-3 rounded-full border-2 border-ink bg-paper overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: `h-full transition-[width] ${inkPct < 20 ? "bg-[#d8322c]" : "bg-ink"}`,
					style: { width: `${inkPct}%` }
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 173,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 172,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				ref: wrapRef,
				className: "relative flex-1 overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("canvas", {
						ref: canvasRef,
						className: "absolute inset-0 w-full h-full cursor-crosshair",
						style: { touchAction: "none" },
						onPointerDown,
						onPointerMove,
						onPointerUp: finishStroke,
						onPointerCancel: finishStroke
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 181,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "absolute top-2 right-2 flex flex-col gap-2 z-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								className: "btn-ink small",
								onClick: () => {
									playSfx("click");
									engineRef.current?.undo();
								},
								"aria-label": "Geri al",
								children: "↩"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 193,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								className: "btn-ink small",
								onClick: () => {
									playSfx("click");
									engineRef.current?.clearStrokes();
								},
								"aria-label": "Temizle",
								children: "✕"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 194,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								className: "btn-ink small",
								onClick: () => {
									playSfx("click");
									engineRef.current?.retry();
								},
								"aria-label": "Yeniden dene",
								children: "⟲"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 195,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 192,
						columnNumber: 9
					}, this),
					phase === "ready" && /* @__PURE__ */ (void 0)("div", {
						className: "absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none",
						children: /* @__PURE__ */ (void 0)("div", {
							className: "paper-card max-w-xs text-center pointer-events-auto",
							children: [
								/* @__PURE__ */ (void 0)("p", {
									className: "font-hand text-xl",
									children: level.hint
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 202,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "font-hand text-sm opacity-60 mt-1",
									children: "Parmağınla çiz, sonra başlat!"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 203,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("button", {
									className: "btn-ink big mt-3 w-full",
									onClick: start,
									children: "▶ BAŞLA"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 204,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 201,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 200,
						columnNumber: 11
					}, this),
					state?.message && phase === "running" && /* @__PURE__ */ (void 0)("div", {
						className: "absolute top-4 left-1/2 -translate-x-1/2 font-hand text-3xl font-bold",
						children: state.message
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 211,
						columnNumber: 11
					}, this),
					phase === "dead" && /* @__PURE__ */ (void 0)("div", {
						className: "absolute inset-0 flex items-center justify-center bg-black/10",
						children: /* @__PURE__ */ (void 0)("div", {
							className: "paper-card text-center",
							children: [
								/* @__PURE__ */ (void 0)("p", {
									className: "font-hand text-4xl font-bold",
									children: state?.message ?? "OOOPS!"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 220,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "font-hand opacity-60 mt-1",
									children: ["Kalan can: ", state?.lives]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 221,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "flex gap-2 mt-3",
									children: /* @__PURE__ */ (void 0)("button", {
										className: "btn-ink flex-1",
										onClick: () => {
											playSfx("click");
											engineRef.current?.retry();
										},
										children: "TEKRAR DENE"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 223,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 222,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 219,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 218,
						columnNumber: 11
					}, this),
					phase === "gameover" && /* @__PURE__ */ (void 0)("div", {
						className: "absolute inset-0 flex items-center justify-center bg-black/15",
						children: /* @__PURE__ */ (void 0)("div", {
							className: "paper-card text-center",
							children: [
								/* @__PURE__ */ (void 0)("p", {
									className: "font-hand text-4xl font-bold",
									children: "OYUN BİTTİ"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 233,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "font-hand opacity-60 mt-1",
									children: "Çöp adam son çizgiye ulaşamadı…"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 234,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "flex flex-col gap-2 mt-3",
									children: [/* @__PURE__ */ (void 0)("button", {
										className: "btn-ink",
										onClick: () => {
											playSfx("click");
											engineRef.current?.fullRestart();
										},
										children: "BAŞTAN BAŞLA"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 236,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)(Link, {
										to: "/levels",
										className: "btn-ink ghost",
										children: "BÖLÜMLER"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 237,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 235,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 232,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 231,
						columnNumber: 11
					}, this),
					phase === "won" && result && /* @__PURE__ */ (void 0)("div", {
						className: "absolute inset-0 flex items-center justify-center bg-black/10",
						children: /* @__PURE__ */ (void 0)("div", {
							className: "paper-card text-center min-w-64",
							children: [
								/* @__PURE__ */ (void 0)("p", {
									className: "font-hand text-4xl font-bold",
									children: "SON ÇİZGİ!"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 247,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "text-3xl mt-1",
									"aria-label": `${result.stars} yıldız`,
									children: ["★".repeat(result.stars), /* @__PURE__ */ (void 0)("span", {
										className: "opacity-20",
										children: "★".repeat(3 - result.stars)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 250,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 248,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "font-hand mt-1 opacity-70",
									children: [
										"Süre ",
										state?.time.toFixed(1),
										"s · Çizgi ",
										Math.round(state?.inkUsed ?? 0)
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 252,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "font-hand text-2xl font-bold mt-1",
									children: ["SKOR ", result.score]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 255,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "flex flex-col gap-2 mt-3",
									children: [
										level.id < LEVELS.length ? /* @__PURE__ */ (void 0)("button", {
											className: "btn-ink",
											onClick: () => navigate({
												to: "/play/$id",
												params: { id: String(level.id + 1) }
											}),
											children: "SONRAKİ BÖLÜM ▶"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 258,
											columnNumber: 19
										}, this) : /* @__PURE__ */ (void 0)(Link, {
											to: "/achievements",
											className: "btn-ink",
											children: "OYUNU BİTİRDİN! 🏆"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 262,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("button", {
											className: "btn-ink ghost",
											onClick: () => {
												playSfx("click");
												engineRef.current?.fullRestart();
											},
											children: "TEKRAR OYNA"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 264,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)(Link, {
											to: "/levels",
											className: "btn-ink ghost",
											children: "BÖLÜMLER"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 265,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 256,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 246,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 245,
						columnNumber: 11
					}, this),
					outOfInk && /* @__PURE__ */ (void 0)("div", {
						className: "absolute bottom-3 left-1/2 -translate-x-1/2 font-hand text-lg bg-paper border-2 border-ink rounded-xl px-3 py-1",
						children: "MÜREKKEP BİTTİ!"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 272,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 180,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 153,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/web_source/src/routes/play.$id.tsx?tsr-split=component";
function PlayPage() {
	const { id } = Route.useParams();
	const levelId = Number(id);
	if (!LEVELS.find((l) => l.id === levelId)) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-paper flex flex-col items-center justify-center gap-4 text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "font-hand text-3xl",
			children: "Böyle bir bölüm yok!"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 13,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
			to: "/levels",
			className: "btn-ink",
			children: "BÖLÜMLER"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 14,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 12,
		columnNumber: 12
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GameScreen, { levelId }, levelId, false, {
		fileName: _jsxFileName,
		lineNumber: 17,
		columnNumber: 10
	}, this);
}
//#endregion
export { PlayPage as component };
