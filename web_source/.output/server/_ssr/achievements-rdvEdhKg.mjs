import { r as __toESM } from "../_runtime.mjs";
import { i as loadProgress, n as defaultProgress, t as ACHIEVEMENTS } from "./storage-BVLI00iQ.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/achievements-rdvEdhKg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/web_source/src/routes/achievements.tsx?tsr-split=component";
function AchievementsPage() {
	const [p, setP] = (0, import_react.useState)(defaultProgress());
	(0, import_react.useEffect)(() => setP(loadProgress()), []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
		className: "min-h-screen bg-paper text-ink px-4 py-6",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md mx-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						className: "btn-ink small",
						children: "←"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 10,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "font-hand text-4xl font-bold",
						children: "BAŞARILAR"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 11,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 9,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "font-hand opacity-60 mt-1",
					children: [
						p.achievements.length,
						" / ",
						ACHIEVEMENTS.length,
						" kazanıldı · Toplam çizgi: ",
						Math.round(p.totalInk)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 13,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col gap-3 mt-5",
					children: ACHIEVEMENTS.map((a) => {
						const got = p.achievements.includes(a.id);
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: `paper-card flex items-center gap-3 ${got ? "" : "opacity-40"}`,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-3xl",
								children: got ? "🏆" : "🔒"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 20,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "font-hand text-xl font-bold leading-none",
								children: a.name
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 22,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "font-hand opacity-70",
								children: a.desc
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 23,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 21,
								columnNumber: 17
							}, this)]
						}, a.id, true, {
							fileName: _jsxFileName,
							lineNumber: 19,
							columnNumber: 18
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 16,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 8,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 7,
		columnNumber: 10
	}, this);
}
//#endregion
export { AchievementsPage as component };
