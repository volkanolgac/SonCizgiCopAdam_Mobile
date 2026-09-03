import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { loadProgress } from "../game/storage";
import { LEVELS, WORLDS } from "../game/levels";

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
  useEffect(() => {
    setUnlocked(loadProgress().unlocked);
  }, []);
  const done = Object.keys(loadProgressSafe().levels).length;

  return (
    <main className="min-h-screen bg-paper flex flex-col items-center justify-center px-4 py-6 landscape:py-3 text-ink">
      <div className="w-full max-w-md text-center">
        <p className="font-hand text-lg landscape:text-base opacity-60 tracking-widest">OYUNCU DÜNYAYI ÇİZİYOR</p>
        <h1 className="font-hand text-5xl landscape:text-4xl sm:text-6xl font-bold leading-none mt-1">
          ÇÖP ADAM
          <span className="block text-2xl landscape:text-xl sm:text-3xl mt-1 border-y-4 border-ink py-1">SON ÇİZGİ</span>
        </h1>

        <div className="paper-card mt-4 landscape:mt-2 text-left py-3 px-4 landscape:py-2">
          <p className="font-hand text-lg landscape:text-base leading-snug">
            ✏️ Çizdiğin her çizgi <b>gerçek bir fizik nesnesine</b> dönüşür. Çöp adam senin
            çizgilerinle koşar, tırmanır ve son çizgiye ulaşır.
          </p>
        </div>

        <div className="flex flex-col gap-2.5 mt-5 landscape:mt-2.5">
          <Link to="/play/$id" params={{ id: String(Math.min(unlocked, LEVELS.length)) }} className="btn-ink big landscape:py-1.5 landscape:text-xl">
            ▶ {unlocked > 1 ? `DEVAM ET — BÖLÜM ${unlocked}` : "OYUNA BAŞLA"}
          </Link>
          <Link to="/levels" className="btn-ink ghost big landscape:py-1.5 landscape:text-xl">BÖLÜMLER</Link>
          <div className="flex gap-2">
            <Link to="/achievements" className="btn-ink ghost flex-1 landscape:py-1">🏆 BAŞARILAR</Link>
            <Link to="/settings" className="btn-ink ghost flex-1 landscape:py-1">⚙ AYARLAR</Link>
          </div>
        </div>

        <p className="font-hand opacity-50 mt-4 landscape:mt-2 text-sm">
          {done} / {LEVELS.length} bölüm tamamlandı · {WORLDS.length} dünya
        </p>
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
