import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ACHIEVEMENTS, loadProgress, type Progress, defaultProgress } from "../game/storage";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: "Başarılar — ÇÖP ADAM: SON ÇİZGİ" },
      { name: "description", content: "Kazandığın başarılar ve kupalar." },
      { property: "og:title", content: "Başarılar — ÇÖP ADAM: SON ÇİZGİ" },
      { property: "og:description", content: "Kazandığın başarılar ve kupalar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AchievementsPage,
});

function AchievementsPage() {
  const [p, setP] = useState<Progress>(defaultProgress());
  useEffect(() => setP(loadProgress()), []);

  return (
    <main className="min-h-screen bg-paper text-ink px-4 py-6 landscape:py-4">
      <div className="max-w-md landscape:max-w-xl mx-auto">
        <div className="flex items-center gap-3">
          <Link to="/" className="btn-ink small">←</Link>
          <h1 className="font-hand text-4xl font-bold">BAŞARILAR</h1>
        </div>
        <p className="font-hand opacity-60 mt-1">
          {p.achievements.length} / {ACHIEVEMENTS.length} kazanıldı · Toplam çizgi: {Math.round(p.totalInk)}
        </p>
        <div className="flex flex-col gap-3 mt-5">
          {ACHIEVEMENTS.map((a) => {
            const got = p.achievements.includes(a.id);
            return (
              <div key={a.id} className={`paper-card flex items-center gap-3 ${got ? "" : "opacity-40"}`}>
                <span className="text-3xl">{got ? "🏆" : "🔒"}</span>
                <div>
                  <p className="font-hand text-xl font-bold leading-none">{a.name}</p>
                  <p className="font-hand opacity-70">{a.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
