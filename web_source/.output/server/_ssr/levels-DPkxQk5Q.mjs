import { r as __toESM } from "../_runtime.mjs";
import { i as loadProgress, n as defaultProgress } from "./storage-BVLI00iQ.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as WORLDS, t as LEVELS } from "./levels-BcMdrIfU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/levels-DPkxQk5Q.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/web_source/src/routes/levels.tsx?tsr-split=component";
function LevelsPage() {
	const [p, setP] = (0, import_react.useState)(defaultProgress());
	(0, import_react.useEffect)(() => setP(loadProgress()), []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
		className: "min-h-screen bg-paper text-ink px-4 py-6",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md mx-auto",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					className: "btn-ink small",
					children: "←"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 11,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "font-hand text-4xl font-bold",
					children: "BÖLÜMLER"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 12,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 10,
				columnNumber: 9
			}, this), WORLDS.map((w) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-hand text-2xl font-bold border-b-2 border-ink/20 pb-1",
					children: [
						"DÜNYA ",
						w.id,
						" · ",
						w.name
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 16,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid grid-cols-5 gap-2 mt-3",
					children: LEVELS.filter((l) => l.world === w.id).map((l) => {
						const locked = l.id > p.unlocked;
						const stars = p.levels[l.id]?.stars ?? 0;
						if (locked) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "level-tile locked",
							"aria-label": `Bölüm ${l.id} kilitli`,
							children: "🔒"
						}, l.id, false, {
							fileName: _jsxFileName,
							lineNumber: 24,
							columnNumber: 22
						}, this);
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/play/$id",
							params: { id: String(l.id) },
							className: "level-tile",
							"aria-label": `Bölüm ${l.id}: ${l.name}`,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xl font-bold",
								children: l.id
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 31,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[10px] leading-none",
								children: ["★".repeat(stars), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "opacity-20",
									children: "★".repeat(3 - stars)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 34,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 32,
								columnNumber: 21
							}, this)]
						}, l.id, true, {
							fileName: _jsxFileName,
							lineNumber: 28,
							columnNumber: 20
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 19,
					columnNumber: 13
				}, this)]
			}, w.id, true, {
				fileName: _jsxFileName,
				lineNumber: 15,
				columnNumber: 26
			}, this))]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 9,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 8,
		columnNumber: 10
	}, this);
}
//#endregion
export { LevelsPage as component };
