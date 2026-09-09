import { r as __toESM } from "../_runtime.mjs";
import { a as loadProgress, n as LANGUAGES, o as saveProgress, r as defaultProgress, s as t } from "./i18n-CFUr_Ty5.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as setSoundEnabled, t as playSfx } from "./audio-CpW1IbhL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-DAt-gv0T.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/web_source/src/routes/settings.tsx?tsr-split=component";
function SettingsPage() {
	const [p, setP] = (0, import_react.useState)(defaultProgress());
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	const [searchLang, setSearchLang] = (0, import_react.useState)("");
	const [isLangOpen, setIsLangOpen] = (0, import_react.useState)(false);
	const lang = p.lang || "tr";
	(0, import_react.useEffect)(() => {
		const lp = loadProgress();
		setP(lp);
		setSoundEnabled(lp.sound);
	}, []);
	const toggleSound = () => {
		const next = {
			...p,
			sound: !p.sound
		};
		setP(next);
		saveProgress(next);
		setSoundEnabled(next.sound);
		if (next.sound) playSfx("click");
	};
	const selectLanguage = (code) => {
		const next = {
			...p,
			lang: code
		};
		setP(next);
		saveProgress(next);
		setIsLangOpen(false);
		if (next.sound) playSfx("click");
	};
	const resetAll = () => {
		if (!confirm) {
			setConfirm(true);
			return;
		}
		const fresh = defaultProgress();
		fresh.lang = p.lang;
		setP(fresh);
		saveProgress(fresh);
		setConfirm(false);
		playSfx("error");
	};
	const filteredLanguages = (0, import_react.useMemo)(() => {
		const q = searchLang.trim().toLowerCase();
		if (!q) return LANGUAGES;
		return LANGUAGES.filter((l) => l.name.toLowerCase().includes(q) || l.trName.toLowerCase().includes(q) || l.code.toLowerCase().includes(q));
	}, [searchLang]);
	const currentLangObj = (0, import_react.useMemo)(() => LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0], [lang]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
		className: "min-h-screen bg-paper text-ink px-4 py-6 landscape:py-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md landscape:max-w-xl mx-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						className: "btn-ink small",
						children: "←"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 58,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "font-hand text-4xl font-bold",
						children: t("settings", lang)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 59,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 57,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "paper-card mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "font-hand text-2xl font-bold",
							children: t("language", lang)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 66,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "font-hand opacity-60 text-sm",
							children: [
								t("language_desc", lang),
								" (",
								LANGUAGES.length,
								" dil)"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 67,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 65,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							className: "btn-ink flex items-center gap-2",
							onClick: () => setIsLangOpen(!isLangOpen),
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: currentLangObj.flag }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 70,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-hand font-bold",
									children: currentLangObj.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 71,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs",
									children: isLangOpen ? "▲" : "▼"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 72,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 69,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 64,
						columnNumber: 11
					}, this), isLangOpen && /* @__PURE__ */ (void 0)("div", {
						className: "mt-4 pt-4 border-t-2 border-ink/20",
						children: [/* @__PURE__ */ (void 0)("input", {
							type: "text",
							placeholder: t("search_language", lang),
							value: searchLang,
							onChange: (e) => setSearchLang(e.target.value),
							className: "w-full bg-[#fdfaf3] border-2 border-ink rounded-xl px-3 py-2 font-hand text-lg focus:outline-none focus:ring-2 focus:ring-ink/30 mb-3"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 77,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "max-h-60 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 gap-2",
							children: filteredLanguages.map((l) => {
								const isSelected = l.code === lang;
								return /* @__PURE__ */ (void 0)("button", {
									onClick: () => selectLanguage(l.code),
									className: `text-left px-3 py-2 rounded-xl border-2 font-hand flex items-center justify-between transition-all ${isSelected ? "bg-ink text-[#f7f4ec] border-ink font-bold shadow-sm" : "bg-[#fdfaf3] border-ink/30 hover:border-ink hover:bg-white text-ink"}`,
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-2 truncate",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-xl",
											children: l.flag
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 83,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "truncate",
											children: l.name
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 84,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 82,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: `text-xs ml-2 opacity-70 truncate ${isSelected ? "text-white" : "text-ink/60"}`,
										children: l.trName
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 86,
										columnNumber: 23
									}, this)]
								}, l.code, true, {
									fileName: _jsxFileName,
									lineNumber: 81,
									columnNumber: 22
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 78,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 76,
						columnNumber: 26
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 63,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "paper-card mt-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-hand text-2xl font-bold",
						children: t("sound_effects", lang)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 98,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-hand opacity-60 text-sm",
						children: t("sound_desc", lang)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 99,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 97,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						className: "btn-ink",
						onClick: toggleSound,
						children: p.sound ? t("on", lang) : t("off", lang)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 101,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 96,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "paper-card mt-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-hand text-2xl font-bold",
						children: t("reset_progress", lang)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 109,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-hand opacity-60 text-sm",
						children: t("reset_desc", lang)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 110,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 108,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						className: "btn-ink danger",
						onClick: resetAll,
						children: confirm ? t("confirm_reset", lang) : t("reset_btn", lang)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 112,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 107,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "paper-card mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-hand text-2xl font-bold",
						children: t("how_to_play", lang)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 119,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
						className: "font-hand text-lg mt-2 space-y-1 list-disc list-inside opacity-80",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: t("how_step1", lang) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 121,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: t("how_step2", lang) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 122,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: t("how_step3", lang) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 123,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: t("how_step4", lang) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 124,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: t("how_step5", lang) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 125,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 120,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 118,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 56,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 55,
		columnNumber: 10
	}, this);
}
//#endregion
export { SettingsPage as component };
