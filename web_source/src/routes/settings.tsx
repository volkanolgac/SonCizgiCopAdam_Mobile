import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { loadProgress, saveProgress, defaultProgress, type Progress } from "../game/storage";
import { setSoundEnabled, playSfx } from "../game/audio";
import { LANGUAGES, t } from "../game/i18n";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Ayarlar — ÇÖP ADAM: SON ÇİZGİ" },
      { name: "description", content: "Ses ayarları, dil seçimi ve ilerleme sıfırlama." },
      { property: "og:title", content: "Ayarlar — ÇÖP ADAM: SON ÇİZGİ" },
      { property: "og:description", content: "Ses ayarları, dil seçimi ve ilerleme sıfırlama." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [p, setP] = useState<Progress>(defaultProgress());
  const [confirm, setConfirm] = useState(false);
  const [searchLang, setSearchLang] = useState("");
  const [isLangOpen, setIsLangOpen] = useState(false);

  const lang = p.lang || "tr";

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

  const selectLanguage = (code: string) => {
    const next = { ...p, lang: code };
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
    fresh.lang = p.lang; // retain chosen language
    setP(fresh);
    saveProgress(fresh);
    setConfirm(false);
    playSfx("error");
  };

  const filteredLanguages = useMemo(() => {
    const q = searchLang.trim().toLowerCase();
    if (!q) return LANGUAGES;
    return LANGUAGES.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.trName.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q)
    );
  }, [searchLang]);

  const currentLangObj = useMemo(
    () => LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0]!,
    [lang]
  );

  return (
    <main className="min-h-screen bg-paper text-ink px-4 py-6 landscape:py-4">
      <div className="max-w-md landscape:max-w-xl mx-auto">
        <div className="flex items-center gap-3">
          <Link to="/" className="btn-ink small">←</Link>
          <h1 className="font-hand text-4xl font-bold">{t("settings", lang)}</h1>
        </div>

        {/* Language Selection Card */}
        <div className="paper-card mt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-hand text-2xl font-bold">{t("language", lang)}</p>
              <p className="font-hand opacity-60 text-sm">{t("language_desc", lang)} ({LANGUAGES.length} dil)</p>
            </div>
            <button
              className="btn-ink flex items-center gap-2"
              onClick={() => setIsLangOpen(!isLangOpen)}
            >
              <span>{currentLangObj.flag}</span>
              <span className="font-hand font-bold">{currentLangObj.name}</span>
              <span className="text-xs">{isLangOpen ? "▲" : "▼"}</span>
            </button>
          </div>

          {isLangOpen && (
            <div className="mt-4 pt-4 border-t-2 border-ink/20">
              <input
                type="text"
                placeholder={t("search_language", lang)}
                value={searchLang}
                onChange={(e) => setSearchLang(e.target.value)}
                className="w-full bg-[#fdfaf3] border-2 border-ink rounded-xl px-3 py-2 font-hand text-lg focus:outline-none focus:ring-2 focus:ring-ink/30 mb-3"
              />
              <div className="max-h-60 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredLanguages.map((l) => {
                  const isSelected = l.code === lang;
                  return (
                    <button
                      key={l.code}
                      onClick={() => selectLanguage(l.code)}
                      className={`text-left px-3 py-2 rounded-xl border-2 font-hand flex items-center justify-between transition-all ${
                        isSelected
                          ? "bg-ink text-[#f7f4ec] border-ink font-bold shadow-sm"
                          : "bg-[#fdfaf3] border-ink/30 hover:border-ink hover:bg-white text-ink"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-xl">{l.flag}</span>
                        <span className="truncate">{l.name}</span>
                      </div>
                      <span className={`text-xs ml-2 opacity-70 truncate ${isSelected ? "text-white" : "text-ink/60"}`}>
                        {l.trName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sound Effects */}
        <div className="paper-card mt-4 flex items-center justify-between">
          <div>
            <p className="font-hand text-2xl font-bold">{t("sound_effects", lang)}</p>
            <p className="font-hand opacity-60 text-sm">{t("sound_desc", lang)}</p>
          </div>
          <button className="btn-ink" onClick={toggleSound}>
            {p.sound ? t("on", lang) : t("off", lang)}
          </button>
        </div>

        {/* Reset Progress */}
        <div className="paper-card mt-4 flex items-center justify-between">
          <div>
            <p className="font-hand text-2xl font-bold">{t("reset_progress", lang)}</p>
            <p className="font-hand opacity-60 text-sm">{t("reset_desc", lang)}</p>
          </div>
          <button className="btn-ink danger" onClick={resetAll}>
            {confirm ? t("confirm_reset", lang) : t("reset_btn", lang)}
          </button>
        </div>

        {/* How to Play */}
        <div className="paper-card mt-4">
          <p className="font-hand text-2xl font-bold">{t("how_to_play", lang)}</p>
          <ul className="font-hand text-lg mt-2 space-y-1 list-disc list-inside opacity-80">
            <li>{t("how_step1", lang)}</li>
            <li>{t("how_step2", lang)}</li>
            <li>{t("how_step3", lang)}</li>
            <li>{t("how_step4", lang)}</li>
            <li>{t("how_step5", lang)}</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
