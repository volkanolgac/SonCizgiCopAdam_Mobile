import { r as __toESM } from "../_runtime.mjs";
import { a as loadProgress, s as t } from "./i18n-CFUr_Ty5.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as WORLDS, t as LEVELS } from "./levels-Ddb60ziF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B_XGNJJf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/web_source/src/routes/index.tsx?tsr-split=component";
function Index() {
	const [unlocked, setUnlocked] = (0, import_react.useState)(1);
	const [lang, setLang] = (0, import_react.useState)("tr");
	(0, import_react.useEffect)(() => {
		const p = loadProgress();
		setUnlocked(p.unlocked);
		setLang(p.lang || "tr");
	}, []);
	const done = Object.keys(loadProgressSafe().levels).length;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
		className: "min-h-screen bg-paper flex flex-col items-center justify-center px-4 py-6 landscape:py-3 text-ink",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "w-full max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "font-hand text-lg landscape:text-base opacity-60 tracking-widest",
					children: lang === "tr" ? "OYUNCU DÜNYAYI ÇİZİYOR" : "DRAW YOUR WORLD"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 17,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "font-hand text-5xl landscape:text-4xl sm:text-6xl font-bold leading-none mt-1",
					children: [t("app_title_1", lang), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "block text-2xl landscape:text-xl sm:text-3xl mt-1 border-y-4 border-ink py-1",
						children: t("app_title_2", lang)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 22,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 20,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex justify-center my-3 landscape:my-1",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: "./splash_artwork.jpg",
						alt: "Çöp Adam: Son Çizgi",
						className: "w-28 h-28 landscape:w-20 landscape:h-20 rounded-2xl border-2 border-ink shadow-md object-cover"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 28,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 27,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "paper-card mt-2 landscape:mt-1 text-left py-3 px-4 landscape:py-2",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-hand text-lg landscape:text-base leading-snug",
						children: t("home_intro", lang)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 32,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 31,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col gap-2.5 mt-5 landscape:mt-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/play/$id",
							params: { id: String(Math.min(unlocked, LEVELS.length)) },
							className: "btn-ink big landscape:py-1.5 landscape:text-xl",
							children: ["▶ ", unlocked > 1 ? t("continue_level", lang, { num: unlocked }) : t("start_game", lang)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 38,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/levels",
							className: "btn-ink ghost big landscape:py-1.5 landscape:text-xl",
							children: t("levels", lang)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 45,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/achievements",
								className: "btn-ink ghost flex-1 landscape:py-1",
								children: ["🏆 ", t("achievements", lang)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 49,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/settings",
								className: "btn-ink ghost flex-1 landscape:py-1",
								children: ["⚙ ", t("settings", lang)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 52,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 48,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 37,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "font-hand opacity-60 mt-4 landscape:mt-2 text-sm",
					children: t("completed_summary", lang, {
						done,
						total: LEVELS.length,
						worlds: WORLDS.length
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 59,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-2 text-center select-none px-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-hand text-xs text-ink/70 leading-tight",
						children: "Şimdilik 55 dilde Çöp Adam Son Çizgisini çiziyor..."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 69,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-hand text-[11px] text-ink/45 leading-tight mt-0.5",
						children: "(Currently, Stickman is drawing his Last Line in 55 languages...)"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 72,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 68,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 16,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 15,
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
