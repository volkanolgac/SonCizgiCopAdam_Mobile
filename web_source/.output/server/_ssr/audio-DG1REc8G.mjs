//#region node_modules/.nitro/vite/services/ssr/assets/audio-DG1REc8G.js
var ctx = null;
var enabled = true;
function setSoundEnabled(v) {
	enabled = v;
}
function getCtx() {
	if (typeof window === "undefined") return null;
	if (!ctx) {
		const AC = window.AudioContext || window.webkitAudioContext;
		if (!AC) return null;
		ctx = new AC();
	}
	if (ctx.state === "suspended") ctx.resume();
	return ctx;
}
function tone(freq, dur, type, gain = .06, slideTo) {
	const c = getCtx();
	if (!c) return;
	const o = c.createOscillator();
	const g = c.createGain();
	o.type = type;
	o.frequency.setValueAtTime(freq, c.currentTime);
	if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, c.currentTime + dur);
	g.gain.setValueAtTime(gain, c.currentTime);
	g.gain.exponentialRampToValueAtTime(1e-4, c.currentTime + dur);
	o.connect(g).connect(c.destination);
	o.start();
	o.stop(c.currentTime + dur + .02);
}
var lastDraw = 0;
function playSfx(name) {
	if (!enabled) return;
	switch (name) {
		case "draw": {
			const now = Date.now();
			if (now - lastDraw < 70) return;
			lastDraw = now;
			tone(220 + Math.random() * 120, .05, "triangle", .02);
			break;
		}
		case "step":
			tone(120, .04, "square", .015);
			break;
		case "jump":
			tone(320, .16, "square", .04, 620);
			break;
		case "star":
			tone(880, .12, "triangle", .05, 1320);
			break;
		case "win":
			[
				523,
				659,
				784,
				1046
			].forEach((f, i) => setTimeout(() => tone(f, .22, "triangle", .05), i * 110));
			break;
		case "door":
			tone(400, .2, "sine", .05, 800);
			break;
		case "fall":
			tone(400, .4, "sawtooth", .04, 90);
			break;
		case "error":
			tone(180, .25, "sawtooth", .05, 70);
			break;
		case "click": tone(520, .05, "square", .03);
	}
}
//#endregion
export { setSoundEnabled as n, playSfx as t };
