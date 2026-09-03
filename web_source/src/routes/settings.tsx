import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { loadProgress, saveProgress, defaultProgress, type Progress } from "../game/storage";
import { setSoundEnabled, playSfx } from "../game/audio";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Ayarlar — ÇÖP ADAM: SON ÇİZGİ" },
      { name: "description", content: "Ses ayarları ve ilerleme sıfırlama." },
      { property: "og:title", content: "Ayarlar — ÇÖP ADAM: SON ÇİZGİ" },
      { property: "og:description", content: "Ses ayarları ve ilerleme sıfırlama." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [p, setP] = useState<Progress>(defaultProgress());
  const [confirm, setConfirm] = useState(false);
  useEffect(() => {
    const lp = loadProgress();
    setP(lp);
    setSoundEnabled(lp.sound);
  }, []);

  const toggleSound = () => {
    const next = { ...p, sound: !p.sound };
    setP(next);
    saveProgress(next);
    setSoundEnabled(next.sound);
    if (next.sound) playSfx("click");
  };

  const resetAll = () => {
    if (!confirm) {
      setConfirm(true);
      return;
    }
    const fresh = defaultProgress();
    setP(fresh);
    saveProgress(fresh);
    setConfirm(false);
    playSfx("error");
  };

  return (
    <main className="min-h-screen bg-paper text-ink px-4 py-6 landscape:py-4">
      <div className="max-w-md landscape:max-w-xl mx-auto">
        <div className="flex items-center gap-3">
          <Link to="/" className="btn-ink small">←</Link>
          <h1 className="font-hand text-4xl font-bold">AYARLAR</h1>
        </div>

        <div className="paper-card mt-6 flex items-center justify-between">
          <div>
            <p className="font-hand text-2xl font-bold">SES EFEKTLERİ</p>
            <p className="font-hand opacity-60">Çizim, zıplama ve kapı sesleri</p>
          </div>
          <button className="btn-ink" onClick={toggleSound}>{p.sound ? "AÇIK" : "KAPALI"}</button>
        </div>

        <div className="paper-card mt-4 flex items-center justify-between">
          <div>
            <p className="font-hand text-2xl font-bold">İLERLEMEYİ SIFIRLA</p>
            <p className="font-hand opacity-60">Tüm bölümler ve başarılar silinir</p>
          </div>
          <button className="btn-ink danger" onClick={resetAll}>
            {confirm ? "EMİN MİSİN?" : "SIFIRLA"}
          </button>
        </div>

        <div className="paper-card mt-4">
          <p className="font-hand text-2xl font-bold">NASIL OYNANIR?</p>
          <ul className="font-hand text-lg mt-2 space-y-1 list-disc list-inside opacity-80">
            <li>Parmağınla (veya fareyle) ekrana çizgi çiz.</li>
            <li>Çizgin gerçek bir platforma dönüşür.</li>
            <li>▶ BAŞLA ile çöp adamı koştur.</li>
            <li>Dikenlere ve testerelere dikkat!</li>
            <li>Az çizgi + hızlı bitiş = 3 yıldız.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
