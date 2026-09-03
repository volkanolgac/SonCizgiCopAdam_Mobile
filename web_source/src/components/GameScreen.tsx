import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { GameEngine, scoreFor, starsFor } from "../game/engine";
import { render, computeCamera, screenToWorld } from "../game/render";
import { LEVELS } from "../game/levels";
import type { Vec } from "../game/types";
import { playSfx, setSoundEnabled } from "../game/audio";
import { loadProgress, saveProgress, evaluateAchievements } from "../game/storage";
import type { GameState } from "../game/engine";

interface Props {
  levelId: number;
}

export function GameScreen({ levelId }: Props) {
  const navigate = useNavigate();
  const level = LEVELS.find((l) => l.id === levelId) ?? LEVELS[0]!;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const draftingRef = useRef<Vec[] | null>(null);
  const [drafting, setDrafting] = useState<Vec[] | null>(null);
  const [outOfInk, setOutOfInk] = useState(false);
  const [state, setState] = useState<GameState | null>(null);
  const [result, setResult] = useState<{ stars: number; score: number } | null>(null);

  // build engine once per level
  useEffect(() => {
    const eng = new GameEngine(level);
    engineRef.current = eng;
    setState({ ...eng.state });
    setResult(null);
    eng.onChange = (s) => setState({ ...s });
    return () => eng.destroy();
  }, [level]);

  // record win
  useEffect(() => {
    if (state?.phase !== "won" || result) return;
    const eng = engineRef.current;
    if (!eng) return;
    const stars = starsFor(level, state.time, state.inkUsed);
    const score = scoreFor(level, state.time, state.inkUsed, stars, state.lives, state.attempts);
    setResult({ stars, score });
    const p = loadProgress();
    const prev = p.levels[level.id];
    if (!prev || stars > prev.stars || score > prev.score) {
      p.levels[level.id] = {
        stars: Math.max(stars, prev?.stars ?? 0),
        score: Math.max(score, prev?.score ?? 0),
        time: state.time,
        ink: state.inkUsed,
      };
    }
    p.totalInk += state.inkUsed;
    p.unlocked = Math.max(p.unlocked, Math.min(level.id + 1, LEVELS.length));
    p.achievements = evaluateAchievements(p);
    saveProgress(p);
  }, [state?.phase]); // eslint-disable-line react-hooks/exhaustive-deps

  // sound setting
  useEffect(() => {
    setSoundEnabled(loadProgress().sound);
  }, []);

  // main loop
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const eng = engineRef.current;
      const canvas = canvasRef.current;
      const wrap = wrapRef.current;
      if (eng && canvas && wrap) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = wrap.clientWidth;
        const h = wrap.clientHeight;
        if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
          canvas.width = w * dpr;
          canvas.height = h * dpr;
        }
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          eng.update(now - last);
          render(ctx, eng, w, h, draftingRef.current, eng.inkLeft <= 0);
        }
      }
      last = now;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const toWorld = useCallback((e: { clientX: number; clientY: number }): Vec => {
    const canvas = canvasRef.current!;
    const wrap = wrapRef.current!;
    const eng = engineRef.current!;
    const rect = canvas.getBoundingClientRect();
    const cam = computeCamera(wrap.clientWidth, wrap.clientHeight, eng.player.position.x, eng.level.width);
    return screenToWorld(cam, e.clientX - rect.left, e.clientY - rect.top);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    const eng = engineRef.current;
    if (!eng || eng.state.phase === "won" || eng.state.phase === "gameover") return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    const p = toWorld(e);
    draftingRef.current = [p];
    setDrafting([p]);
    setOutOfInk(false);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const eng = engineRef.current;
    if (!eng || !draftingRef.current) return;
    const p = toWorld(e);
    const pts = draftingRef.current;
    const last = pts[pts.length - 1]!;
    if (Math.hypot(p.x - last.x, p.y - last.y) > 3) {
      let used = eng.state.inkUsed;
      for (let i = 1; i < pts.length; i++) used += Math.hypot(pts[i]!.x - pts[i - 1]!.x, pts[i]!.y - pts[i - 1]!.y);
      if (used + 6 > eng.state.inkBudget) {
        setOutOfInk(true);
        finishStroke();
        return;
      }
      pts.push(p);
      setDrafting([...pts]);
      playSfx("draw");
    }
  };

  const finishStroke = () => {
    const eng = engineRef.current;
    const pts = draftingRef.current;
    draftingRef.current = null;
    setDrafting(null);
    if (!eng || !pts) return;
    if (!eng.addStroke(pts)) playSfx("error");
  };

  const start = () => {
    playSfx("click");
    engineRef.current?.start();
  };

  const inkPct = state ? Math.round((1 - state.inkUsed / state.inkBudget) * 100) : 100;
  const phase = state?.phase ?? "ready";

  return (
    <div className="fixed inset-0 flex flex-col bg-[#f7f4ec] select-none" style={{ touchAction: "none" }}>
      {/* HUD */}
      <div className="flex items-center gap-2 px-3 py-2 z-10">
        <Link to="/levels" className="btn-ink small" aria-label="Bölümler">
          ☰
        </Link>
        <div className="font-hand text-lg leading-none">
          <span className="opacity-60">BÖLÜM {level.id}</span> · {level.name}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="font-hand text-lg" aria-label="can">
            {"♥".repeat(Math.max(0, state?.lives ?? 3))}
            <span className="opacity-25">{"♥".repeat(Math.max(0, 3 - (state?.lives ?? 3)))}</span>
          </span>
          <span className="font-hand text-lg tabular-nums">{(state?.time ?? 0).toFixed(1)}s</span>
        </div>
      </div>

      {/* ink bar */}
      <div className="mx-3 h-3 rounded-full border-2 border-ink bg-paper overflow-hidden">
        <div
          className={`h-full transition-[width] ${inkPct < 20 ? "bg-[#d8322c]" : "bg-ink"}`}
          style={{ width: `${inkPct}%` }}
        />
      </div>

      {/* canvas */}
      <div ref={wrapRef} className="relative flex-1 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-crosshair"
          style={{ touchAction: "none" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={finishStroke}
          onPointerCancel={finishStroke}
        />

        {/* toolbar */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
          <button className="btn-ink small" onClick={() => { playSfx("click"); engineRef.current?.undo(); }} aria-label="Geri al">↩</button>
          <button className="btn-ink small" onClick={() => { playSfx("click"); engineRef.current?.clearStrokes(); }} aria-label="Temizle">✕</button>
          <button className="btn-ink small" onClick={() => { playSfx("click"); engineRef.current?.retry(); }} aria-label="Yeniden dene">⟲</button>
        </div>

        {/* ready overlay */}
        {phase === "ready" && (
          <div className="absolute inset-x-0 bottom-4 flex flex-col items-center justify-end pointer-events-none px-4 z-10">
            <div className="paper-card max-w-xs w-full text-center pointer-events-auto">
              <button className="btn-ink big w-full" onClick={start}>▶ BAŞLA</button>
              <p className="font-hand text-xl mt-2">{level.hint}</p>
              <p className="font-hand text-sm opacity-60 mt-1">Parmağınla çiz, sonra başlat!</p>
            </div>
          </div>
        )}

        {/* message toast */}
        {state?.message && phase === "running" && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 font-hand text-3xl font-bold">
            {state.message}
          </div>
        )}

        {/* dead overlay */}
        {phase === "dead" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="paper-card text-center">
              <p className="font-hand text-4xl font-bold">{state?.message ?? "OOOPS!"}</p>
              <p className="font-hand opacity-60 mt-1">Kalan can: {state?.lives}</p>
              <div className="flex gap-2 mt-3">
                <button className="btn-ink flex-1" onClick={() => { playSfx("click"); engineRef.current?.retry(); }}>TEKRAR DENE</button>
              </div>
            </div>
          </div>
        )}

        {/* game over */}
        {phase === "gameover" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/15">
            <div className="paper-card text-center">
              <p className="font-hand text-4xl font-bold">OYUN BİTTİ</p>
              <p className="font-hand opacity-60 mt-1">Çöp adam son çizgiye ulaşamadı…</p>
              <div className="flex flex-col gap-2 mt-3">
                <button className="btn-ink" onClick={() => { playSfx("click"); engineRef.current?.fullRestart(); }}>BAŞTAN BAŞLA</button>
                <Link to="/levels" className="btn-ink ghost">BÖLÜMLER</Link>
              </div>
            </div>
          </div>
        )}

        {/* win overlay */}
        {phase === "won" && result && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="paper-card text-center min-w-64">
              <p className="font-hand text-4xl font-bold">SON ÇİZGİ!</p>
              <p className="text-3xl mt-1" aria-label={`${result.stars} yıldız`}>
                {"★".repeat(result.stars)}
                <span className="opacity-20">{"★".repeat(3 - result.stars)}</span>
              </p>
              <p className="font-hand mt-1 opacity-70">
                Süre {state?.time.toFixed(1)}s · Çizgi {Math.round(state?.inkUsed ?? 0)}
              </p>
              <p className="font-hand text-2xl font-bold mt-1">SKOR {result.score}</p>
              <div className="flex flex-col gap-2 mt-3">
                {level.id < LEVELS.length ? (
                  <button className="btn-ink" onClick={() => navigate({ to: "/play/$id", params: { id: String(level.id + 1) } })}>
                    SONRAKİ BÖLÜM ▶
                  </button>
                ) : (
                  <Link to="/achievements" className="btn-ink">OYUNU BİTİRDİN! 🏆</Link>
                )}
                <button className="btn-ink ghost" onClick={() => { playSfx("click"); engineRef.current?.fullRestart(); }}>TEKRAR OYNA</button>
                <Link to="/levels" className="btn-ink ghost">BÖLÜMLER</Link>
              </div>
            </div>
          </div>
        )}

        {outOfInk && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-hand text-lg bg-paper border-2 border-ink rounded-xl px-3 py-1">
            MÜREKKEP BİTTİ!
          </div>
        )}
      </div>
    </div>
  );
}
