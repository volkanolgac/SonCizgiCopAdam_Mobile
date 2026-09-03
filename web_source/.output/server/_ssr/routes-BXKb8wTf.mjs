import { r as __toESM } from "../_runtime.mjs";
import { i as loadProgress } from "./storage-BVLI00iQ.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as LEVELS } from "./levels-BcMdrIfU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BXKb8wTf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/web_source/src/routes/index.tsx?tsr-split=component";
function Index() {
	const [unlocked, setUnlocked] = (0, import_react.useState)(1);
	(0, import_react.useEffect)(() => {
		setUnlocked(loadProgress().unlocked);
	}, []);
	const done = Object.keys(loadProgressSafe().levels).length;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
		className: "min-h-screen bg-paper flex flex-col items-center justify-center px-6 py-10 text-ink",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "w-full max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "font-hand text-xl opacity-60 tracking-widest",
					children: "OYUNCU DÜNYAYI ÇİZİYOR"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 13,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "font-hand text-6xl font-bold leading-none mt-2",
					children: ["ÇÖP ADAM", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "block text-3xl mt-2 border-y-4 border-ink py-2",
						children: "SON ÇİZGİ"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 16,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 14,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "paper-card mt-8 text-left",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-hand text-lg leading-snug",
						children: [
							"✏️ Çizdiğin her çizgi ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", { children: "gerçek bir fizik nesnesine" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 21,
								columnNumber: 35
							}, this),
							" dönüşür. Çöp adam senin çizgilerinle koşar, tırmanır ve son çizgiye ulaşır."
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 20,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 19,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col gap-3 mt-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/play/$id",
							params: { id: String(Math.min(unlocked, LEVELS.length)) },
							className: "btn-ink big",
							children: ["▶ ", unlocked > 1 ? `DEVAM ET — BÖLÜM ${unlocked}` : "OYUNA BAŞLA"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 27,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/levels",
							className: "btn-ink ghost big",
							children: "BÖLÜMLER"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 32,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/achievements",
								className: "btn-ink ghost flex-1",
								children: "🏆 BAŞARILAR"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 34,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/settings",
								className: "btn-ink ghost flex-1",
								children: "⚙ AYARLAR"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 35,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 33,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 26,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "font-hand opacity-50 mt-8",
					children: [
						done,
						" / ",
						LEVELS.length,
						" bölüm tamamlandı · 6 dünya"
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 39,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 12,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 11,
		columnNumber: 10
	}, this);
}
function loadProgressSafe() {
	try {
		return loadProgress();
	} catch {
		return { levels: {} };
	}
}
//#endregion
export { Index as component };
