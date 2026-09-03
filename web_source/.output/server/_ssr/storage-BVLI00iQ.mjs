//#region node_modules/.nitro/vite/services/ssr/assets/storage-BVLI00iQ.js
var KEY = "cop-adam-son-cizgi-v1";
var defaultProgress = () => ({
	unlocked: 1,
	levels: {},
	achievements: [],
	totalInk: 0,
	sound: true,
	music: true
});
function loadProgress() {
	if (typeof window === "undefined") return defaultProgress();
	try {
		const raw = window.localStorage.getItem(KEY);
		if (!raw) return defaultProgress();
		return {
			...defaultProgress(),
			...JSON.parse(raw)
		};
	} catch {
		return defaultProgress();
	}
}
function saveProgress(p) {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(KEY, JSON.stringify(p));
	} catch {}
	window.dispatchEvent(new CustomEvent("cop-adam-progress"));
}
var ACHIEVEMENTS = [
	{
		id: "first",
		name: "İLK ÇİZGİ",
		desc: "İlk bölümü tamamla."
	},
	{
		id: "ink-master",
		name: "ÇİZGİ USTASI",
		desc: "Toplam 5000 birim çiz."
	},
	{
		id: "minimalist",
		name: "MİNİMALİST",
		desc: "Bir bölümü çok az çizgiyle bitir."
	},
	{
		id: "speedster",
		name: "HIZLI ÇÖP ADAM",
		desc: "5 bölümü rekor sürede tamamla."
	},
	{
		id: "perfect10",
		name: "MÜKEMMEL ÇÖZÜM",
		desc: "10 bölümü 3 yıldızla tamamla."
	},
	{
		id: "worlds",
		name: "DÜNYA ÇİZERİ",
		desc: "Tüm dünyaların kilidini aç."
	},
	{
		id: "final",
		name: "SON ÇİZGİ",
		desc: "Final bölümünü tamamla."
	}
];
function evaluateAchievements(p) {
	const got = new Set(p.achievements);
	const entries = Object.entries(p.levels);
	if (p.levels[1]) got.add("first");
	if (p.totalInk >= 5e3) got.add("ink-master");
	if (entries.some(([, l]) => l.stars >= 2)) got.add("minimalist");
	if (entries.filter(([, l]) => l.stars >= 3).length >= 5) got.add("speedster");
	if (entries.filter(([, l]) => l.stars === 3).length >= 10) got.add("perfect10");
	if (p.unlocked >= 26) got.add("worlds");
	if (p.levels[30]) got.add("final");
	return [...got];
}
//#endregion
export { saveProgress as a, loadProgress as i, defaultProgress as n, evaluateAchievements as r, ACHIEVEMENTS as t };
