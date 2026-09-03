import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LEVELS, WORLDS } from "../game/levels";
import { loadProgress, type Progress, defaultProgress } from "../game/storage";

export const Route = createFileRoute("/levels")({
  head: () => ({
    meta: [
      { title: "Bölümler — ÇÖP ADAM: SON ÇİZGİ" },
      { name: "description", content: "13 dünya, 100 bölüm. Her bölümde kendi çözümünü çiz." },
      { property: "og:title", content: "Bölümler — ÇÖP ADAM: SON ÇİZGİ" },
      { property: "og:description", content: "13 dünya, 100 bölüm. Her bölümde kendi çözümünü çiz." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LevelsPage,
});

function LevelsPage() {
  const [p, setP] = useState<Progress>(defaultProgress());
  useEffect(() => setP(loadProgress()), []);

  return (
    <main className="min-h-screen bg-paper text-ink px-4 py-6 landscape:py-4">
      <div className="max-w-md landscape:max-w-2xl mx-auto">
        <div className="flex items-center gap-3">
          <Link to="/" className="btn-ink small">←</Link>
          <h1 className="font-hand text-4xl font-bold">BÖLÜMLER</h1>
        </div>

        {WORLDS.map((w) => (
          <section key={w.id} className="mt-6 landscape:mt-4">
            <h2 className="font-hand text-2xl font-bold border-b-2 border-ink/20 pb-1">
              DÜNYA {w.id} · {w.name}
            </h2>
            <div className="grid grid-cols-5 gap-2 mt-3">
              {LEVELS.filter((l) => l.world === w.id).map((l) => {
                const locked = l.id > p.unlocked;
                const stars = p.levels[l.id]?.stars ?? 0;
                if (locked) {
                  return (
                    <div key={l.id} className="level-tile locked" aria-label={`Bölüm ${l.id} kilitli`}>
                      🔒
                    </div>
                  );
                }
                return (
                  <Link
                    key={l.id}
                    to="/play/$id"
                    params={{ id: String(l.id) }}
                    className="level-tile"
                    aria-label={`Bölüm ${l.id}: ${l.name}`}
                  >
                    <span className="text-xl font-bold">{l.id}</span>
                    <span className="text-[10px] leading-none">
                      {"★".repeat(stars)}
                      <span className="opacity-20">{"★".repeat(3 - stars)}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
