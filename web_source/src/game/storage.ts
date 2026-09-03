export interface LevelProgress {
  stars: number;
  score: number;
  time: number;
  ink: number;
}

export interface Progress {
  unlocked: number;
  levels: Record<number, LevelProgress>;
  achievements: string[];
  totalInk: number;
  sound: boolean;
  music: boolean;
}

const KEY = "cop-adam-son-cizgi-v1";

export const defaultProgress = (): Progress => ({
  unlocked: 1,
  levels: {},
  achievements: [],
  totalInk: 0,
  sound: true,
  music: true,
});

export function loadProgress(): Progress {
  if (typeof window === "undefined") return defaultProgress();
  try {
    let raw = window.localStorage.getItem(KEY);
    if (!raw && typeof (window as any).AndroidBridge?.loadProgress === "function") {
      raw = (window as any).AndroidBridge.loadProgress();
    }
    if (!raw) return defaultProgress();
    return { ...defaultProgress(), ...(JSON.parse(raw) as Progress) };
  } catch {
    return defaultProgress();
  }
}

export function saveProgress(p: Progress) {
  if (typeof window === "undefined") return;
  const serialized = JSON.stringify(p);
  try {
    window.localStorage.setItem(KEY, serialized);
  } catch {
    /* storage full / disabled */
  }
  try {
    if (typeof (window as any).AndroidBridge?.saveProgress === "function") {
      (window as any).AndroidBridge.saveProgress(serialized);
    }
  } catch {
    /* bridge error */
  }
  window.dispatchEvent(new CustomEvent("cop-adam-progress"));
}

export interface Achievement {
  id: string;
  name: string;
  desc: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first", name: "İLK ÇİZGİ", desc: "İlk bölümü tamamla." },
  { id: "ink-master", name: "ÇİZGİ USTASI", desc: "Toplam 5000 birim çiz." },
  { id: "minimalist", name: "MİNİMALİST", desc: "Bir bölümü çok az çizgiyle bitir." },
  { id: "speedster", name: "HIZLI ÇÖP ADAM", desc: "5 bölümü rekor sürede tamamla." },
  { id: "perfect10", name: "MÜKEMMEL ÇÖZÜM", desc: "10 bölümü 3 yıldızla tamamla." },
  { id: "worlds", name: "DÜNYA ÇİZERİ", desc: "Tüm dünyaların kilidini aç." },
  { id: "final", name: "SON ÇİZGİ", desc: "Final bölümünü tamamla." },
];

export function evaluateAchievements(p: Progress): string[] {
  const got = new Set(p.achievements);
  const entries = Object.entries(p.levels);
  if (p.levels[1]) got.add("first");
  if (p.totalInk >= 5000) got.add("ink-master");
  if (entries.some(([, l]) => l.stars >= 2)) got.add("minimalist");
  if (entries.filter(([, l]) => l.stars >= 3).length >= 5) got.add("speedster");
  if (entries.filter(([, l]) => l.stars === 3).length >= 10) got.add("perfect10");
  if (p.unlocked >= 26) got.add("worlds");
  if (p.levels[30]) got.add("final");
  return [...got];
}
