import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { loadProgress } from "../game/storage";
import { LEVELS, WORLDS } from "../game/levels";
import { t } from "../game/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ÇÖP ADAM: SON ÇİZGİ — Çiz, Oyna, Kurtar" },
      {
        name: "description",
        content:
          "Çizdiğin çizgiler gerçek fizik nesnelerine dönüşür! Çöp adamı uçurumlardan, testerelerden ve tuzaklardan kendi çizgilerinle kurtar. 13 dünya, 100 bölüm.",
      },
      { property: "og:title", content: "ÇÖP ADAM: SON ÇİZGİ" },
      {
        property: "og:description",
        content: "Oyuncu dünyayı çiziyor. Çizdiğin her çizgi oyunun fiziksel dünyasının parçası olur.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [unlocked, setUnlocked] = useState(1);
  const [lang, setLang] = useState("tr");

  useEffect(() => {
    const p = loadProgress();
    setUnlocked(p.unlocked);
    setLang(p.lang || "tr");
  }, []);

  const done = Object.keys(loadProgressSafe().levels).length;

  return (
    <main className="min-h-screen bg-paper flex flex-col items-center justify-center px-4 py-6 landscape:py-3 text-ink">
      <div className="w-full max-w-md text-center">
        <p className="font-hand text-lg landscape:text-base opacity-60 tracking-widest">
          {lang === "tr" ? "OYUNCU DÜNYAYI ÇİZİYOR" : "DRAW YOUR WORLD"}
        </p>
        <h1 className="font-hand text-5xl landscape:text-4xl sm:text-6xl font-bold leading-none mt-1">
          {t("app_title_1", lang)}
          <span className="block text-2xl landscape:text-xl sm:text-3xl mt-1 border-y-4 border-ink py-1">
            {t("app_title_2", lang)}
          </span>
        </h1>

        <div className="flex justify-center my-3 landscape:my-1">
          <img
            src="./splash_artwork.jpg"
            alt="Çöp Adam: Son Çizgi"
            className="w-28 h-28 landscape:w-20 landscape:h-20 rounded-2xl border-2 border-ink shadow-md object-cover"
          />
        </div>

        <div className="paper-card mt-2 landscape:mt-1 text-left py-3 px-4 landscape:py-2">
          <p className="font-hand text-lg landscape:text-base leading-snug">
            {t("home_intro", lang)}
          </p>
        </div>

        <div className="flex flex-col gap-2.5 mt-5 landscape:mt-2.5">
          <Link
            to="/play/$id"
            params={{ id: String(Math.min(unlocked, LEVELS.length)) }}
            className="btn-ink big landscape:py-1.5 landscape:text-xl"
          >
            ▶ {unlocked > 1
              ? t("continue_level", lang, { num: unlocked })
              : t("start_game", lang)}
          </Link>
          <Link to="/levels" className="btn-ink ghost big landscape:py-1.5 landscape:text-xl">
            {t("levels", lang)}
          </Link>
          <div className="flex gap-2">
            <Link to="/achievements" className="btn-ink ghost flex-1 landscape:py-1">
              🏆 {t("achievements", lang)}
            </Link>
            <Link to="/settings" className="btn-ink ghost flex-1 landscape:py-1">
              ⚙ {t("settings", lang)}
            </Link>
          </div>
        </div>

        {/* Level & World Progress summary */}
        <p className="font-hand opacity-60 mt-4 landscape:mt-2 text-sm">
          {t("completed_summary", lang, {
            done,
            total: LEVELS.length,
            worlds: WORLDS.length,
          })}
        </p>

        {/* Multilingual Notice */}
        <div className="mt-2 text-center select-none px-2">
          <p className="font-hand text-xs text-ink/70 leading-tight">
            Şimdilik 55 dilde Çöp Adam Son Çizgisini çiziyor...
          </p>
          <p className="font-hand text-[11px] text-ink/45 leading-tight mt-0.5">
            (Currently, Stickman is drawing his Last Line in 55 languages...)
          </p>
        </div>
      </div>
    </main>
  );
}

function loadProgressSafe() {
  try {
    return loadProgress();
  } catch {
    return { levels: {} as Record<number, never> };
  }
}
