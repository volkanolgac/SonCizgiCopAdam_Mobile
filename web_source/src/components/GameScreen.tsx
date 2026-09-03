import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { GameEngine, scoreFor, starsFor } from "../game/engine";
import { render, computeCamera, screenToWorld, type Camera } from "../game/render";
import { LEVELS } from "../game/levels";
import type { Vec } from "../game/types";
import { playSfx, setSoundEnabled } from "../game/audio";
import { loadProgress, saveProgress, evaluateAchievements } from "../game/storage";
import type { GameState } from "../game/engine";

interface Props {
  levelId: number;
}

interface PreviewState {
  active: boolean;
  startTime: number;
  durationToDoor: number;
  pauseAtDoor: number;
  durationToStart: number;
  startX: number;
  doorX: number;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
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
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [mode, setMode] = useState<"draw" | "pan">("draw");
  const [isPanning, setIsPanning] = useState(false);
  const [isReturningToStart, setIsReturningToStart] = useState(false);

  const manualFocusXRef = useRef<number | null>(null);
  const isPanningRef = useRef(false);
  const panStartXRef = useRef(0);
  const panStartFocusRef = useRef(0);

  const returnToStartRef = useRef<{
    active: boolean;
    startTime: number;
    duration: number;
    fromX: number;
    toX: number;
  }>({
    active: false,
    startTime: 0,
    duration: 0,
    fromX: 0,
    toX: 0,
  });

  const previewRef = useRef<PreviewState>({
    active: false,
    startTime: 0,
    durationToDoor: 2000,
    pauseAtDoor: 600,
    durationToStart: 2000,
    startX: 0,
    doorX: 0,
  });
  const userInteractedRef = useRef(false);
  const autoPreviewTimerRef = useRef<number | null>(null);
  const currentCamRef = useRef<Camera | null>(null);

  const stopPreview = useCallback(() => {
    previewRef.current.active = false;
    setIsPreviewing(false);
  }, []);

  const startPreview = useCallback(() => {
    const eng = engineRef.current;
    if (!eng) return;
    const startX = eng.player.position.x;
    const doorX = level.door.x;
    const dist = Math.abs(doorX - startX);
    const travelTime = Math.max(1600, Math.min(2400, dist * 1.8));

    previewRef.current = {
      active: true,
      startTime: performance.now(),
      durationToDoor: travelTime,
      pauseAtDoor: 700,
      durationToStart: travelTime,
      startX,
      doorX,
    };
    setIsPreviewing(true);
  }, [level]);

  const cancelPreviewOnAction = useCallback(() => {
    userInteractedRef.current = true;
    if (autoPreviewTimerRef.current) {
      clearTimeout(autoPreviewTimerRef.current);
      autoPreviewTimerRef.current = null;
    }
    if (previewRef.current.active) {
      stopPreview();
    }
  }, [stopPreview]);

  // build engine once per level
  useEffect(() => {
    const eng = new GameEngine(level);
    engineRef.current = eng;
    setState({ ...eng.state });
    setResult(null);
    manualFocusXRef.current = null;
    isPanningRef.current = false;
    setIsPanning(false);
    returnToStartRef.current.active = false;
    setIsReturningToStart(false);
    setMode("draw");
    eng.onChange = (s) => setState({ ...s });
    return () => eng.destroy();
  }, [level]);

  // auto-preview timer: trigger 2 seconds after level load if user hasn't drawn or pressed start
  useEffect(() => {
    userInteractedRef.current = false;
    stopPreview();
    if (autoPreviewTimerRef.current) {
      clearTimeout(autoPreviewTimerRef.current);
    }
    autoPreviewTimerRef.current = window.setTimeout(() => {
      const eng = engineRef.current;
      if (
        !userInteractedRef.current &&
        eng &&
        eng.state.phase === "ready" &&
        eng.strokes.length === 0 &&
        !draftingRef.current &&
        manualFocusXRef.current === null
      ) {
        startPreview();
      }
    }, 2000);

    return () => {
      if (autoPreviewTimerRef.current) {
        clearTimeout(autoPreviewTimerRef.current);
      }
    };
  }, [levelId, startPreview, stopPreview]);

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

          // update preview camera or returning-to-start camera if active
          let focusX: number | undefined = undefined;
          const ret = returnToStartRef.current;
          const prev = previewRef.current;

          if (ret.active) {
            const elapsed = now - ret.startTime;
            if (elapsed < ret.duration) {
              const p = easeInOutCubic(elapsed / ret.duration);
              focusX = ret.fromX + (ret.toX - ret.fromX) * p;
              manualFocusXRef.current = focusX;
            } else {
              ret.active = false;
              manualFocusXRef.current = null;
              setIsReturningToStart(false);
              focusX = ret.toX;
              // Now character starts walking!
              engineRef.current?.start();
            }
          } else if (prev.active) {
            const elapsed = now - prev.startTime;
            const t1 = prev.durationToDoor;
            const t2 = t1 + prev.pauseAtDoor;
            const t3 = t2 + prev.durationToStart;

            if (elapsed < t1) {
              const p = easeInOutCubic(elapsed / t1);
              focusX = prev.startX + (prev.doorX - prev.startX) * p;
            } else if (elapsed < t2) {
              focusX = prev.doorX;
            } else if (elapsed < t3) {
              const p = easeInOutCubic((elapsed - t2) / prev.durationToStart);
              focusX = prev.doorX + (prev.startX - prev.doorX) * p;
            } else {
              prev.active = false;
              setIsPreviewing(false);
              focusX = prev.startX;
              manualFocusXRef.current = null;
            }
          } else if (eng.state.phase === "ready" && manualFocusXRef.current !== null) {
            focusX = manualFocusXRef.current;
          } else {
            focusX = eng.player.position.x;
          }

          const activeCam = computeCamera(w, h, focusX ?? eng.player.position.x, eng.level.width);
          currentCamRef.current = activeCam;

          render(ctx, eng, w, h, draftingRef.current, eng.inkLeft <= 0, focusX);
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
    const cam = currentCamRef.current ?? computeCamera(wrap.clientWidth, wrap.clientHeight, manualFocusXRef.current ?? eng.player.position.x, eng.level.width);
    return screenToWorld(cam, e.clientX - rect.left, e.clientY - rect.top);
  }, []);

  const selectMode = (newMode: "draw" | "pan") => {
    playSfx("click");
    cancelPreviewOnAction();
    if (returnToStartRef.current.active) {
      returnToStartRef.current.active = false;
      setIsReturningToStart(false);
    }
    setMode(newMode);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const eng = engineRef.current;
    if (!eng || eng.state.phase === "won" || eng.state.phase === "gameover" || returnToStartRef.current.active) return;
    cancelPreviewOnAction();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    if (mode === "pan") {
      isPanningRef.current = true;
      setIsPanning(true);
      panStartXRef.current = e.clientX;
      panStartFocusRef.current = manualFocusXRef.current ?? eng.player.position.x;
      return;
    }

    const p = toWorld(e);
    draftingRef.current = [p];
    setDrafting([p]);
    setOutOfInk(false);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const eng = engineRef.current;
    if (!eng) return;

    if (mode === "pan") {
      if (!isPanningRef.current) return;
      const dx = e.clientX - panStartXRef.current;
      const scale = currentCamRef.current?.scale || 1;
      let nextFocus = panStartFocusRef.current - dx / scale;
      nextFocus = Math.max(0, Math.min(nextFocus, eng.level.width));
      manualFocusXRef.current = nextFocus;
      return;
    }

    if (!draftingRef.current) return;
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

  const onPointerUpOrCancel = () => {
    if (isPanningRef.current) {
      isPanningRef.current = false;
      setIsPanning(false);
    }
    finishStroke();
  };

  const start = () => {
    cancelPreviewOnAction();
    playSfx("click");
    const eng = engineRef.current;
    if (!eng || eng.state.phase !== "ready" || returnToStartRef.current.active) return;

    const startX = eng.player.position.x;
    const currentFocus = manualFocusXRef.current ?? startX;
    const dist = Math.abs(currentFocus - startX);

    // If screen was panned away from start, smoothly pan camera back to start first!
    if (dist > 25) {
      setMode("draw");
      setIsReturningToStart(true);
      const duration = Math.max(650, Math.min(1500, dist * 1.35));
      returnToStartRef.current = {
        active: true,
        startTime: performance.now(),
        duration,
        fromX: currentFocus,
        toX: startX,
      };
    } else {
      manualFocusXRef.current = null;
      setMode("draw");
      eng.start();
    }
  };

  const togglePreview = () => {
    playSfx("click");
    userInteractedRef.current = true;
    if (autoPreviewTimerRef.current) {
      clearTimeout(autoPreviewTimerRef.current);
      autoPreviewTimerRef.current = null;
    }
    if (returnToStartRef.current.active) {
      returnToStartRef.current.active = false;
      setIsReturningToStart(false);
    }
    if (previewRef.current.active) {
      stopPreview();
    } else {
      startPreview();
    }
  };

  const handleUndo = () => {
    playSfx("click");
    cancelPreviewOnAction();
    engineRef.current?.undo();
  };

  const handleClear = () => {
    playSfx("click");
    cancelPreviewOnAction();
    engineRef.current?.clearStrokes();
  };

  const handleRetry = () => {
    playSfx("click");
    cancelPreviewOnAction();
    manualFocusXRef.current = null;
    isPanningRef.current = false;
    setIsPanning(false);
    returnToStartRef.current.active = false;
    setIsReturningToStart(false);
    setMode("draw");
    engineRef.current?.retry();
  };

  const handleFullRestart = () => {
    playSfx("click");
    cancelPreviewOnAction();
    manualFocusXRef.current = null;
    isPanningRef.current = false;
    setIsPanning(false);
    returnToStartRef.current.active = false;
    setIsReturningToStart(false);
    setMode("draw");
    engineRef.current?.fullRestart();
  };

  const inkPct = state ? Math.round((1 - state.inkUsed / state.inkBudget) * 100) : 100;
  const phase = state?.phase ?? "ready";

  return (
    <div className="fixed inset-0 flex flex-col bg-[#f7f4ec] select-none" style={{ touchAction: "none" }}>
      {/* HUD */}
      <div className="flex items-center gap-2 px-3 py-2 landscape:py-1 z-10">
        <Link to="/levels" className="btn-ink small" aria-label="Bölümler" onClick={cancelPreviewOnAction}>
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
      <div className="mx-3 h-2.5 rounded-full border-2 border-ink bg-paper overflow-hidden landscape:mx-4 landscape:h-2">
        <div
          className={`h-full transition-[width] ${inkPct < 20 ? "bg-[#d8322c]" : "bg-ink"}`}
          style={{ width: `${inkPct}%` }}
        />
      </div>

      {/* canvas */}
      <div ref={wrapRef} className="relative flex-1 overflow-hidden">
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full ${
            mode === "pan" ? (isPanning ? "cursor-grabbing" : "cursor-grab") : "cursor-crosshair"
          }`}
          style={{ touchAction: "none" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUpOrCancel}
          onPointerCancel={onPointerUpOrCancel}
        />

        {/* Mode toolbar (under ink bar, top-left) */}
        <div className="absolute top-2 left-2 flex flex-col gap-2 z-10">
          <button
            className={`btn-ink small !bg-[#111111] !border-[#111111] text-white flex items-center justify-center transition-all ${
              mode === "draw"
                ? "ring-2 ring-[#111111] ring-offset-2 ring-offset-[#f7f4ec] scale-105 shadow-md"
                : "opacity-60 hover:opacity-100"
            }`}
            onClick={() => selectMode("draw")}
            aria-label="Çizgi Çizme Modu (Kalem)"
            title="Çizgi Modu (Kalem)"
          >
            {/* White pencil SVG icon */}
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
          </button>
          <button
            className={`btn-ink small !bg-[#111111] !border-[#111111] text-white flex items-center justify-center transition-all ${
              mode === "pan"
                ? "ring-2 ring-[#111111] ring-offset-2 ring-offset-[#f7f4ec] scale-105 shadow-md"
                : "opacity-60 hover:opacity-100"
            }`}
            onClick={() => selectMode("pan")}
            aria-label="Ekran Kaydırma Modu (El)"
            title="Kaydırma Modu (El)"
          >
            {/* White hand drag SVG icon */}
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 11V6a2 2 0 0 0-4 0v4" />
              <path d="M14 10V4a2 2 0 0 0-4 0v6" />
              <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
              <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
            </svg>
          </button>
        </div>

        {/* toolbar */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
          <button className="btn-ink small" onClick={handleUndo} aria-label="Geri al" title="Geri Al">↩</button>
          <button className="btn-ink small" onClick={handleClear} aria-label="Temizle" title="Temizle">✕</button>
          <button className="btn-ink small" onClick={handleRetry} aria-label="Yeniden dene" title="Yeniden Dene">⟲</button>
          <button
            className={`btn-ink small transition-colors ${isPreviewing ? "bg-ink text-[#f7f4ec]" : ""}`}
            onClick={togglePreview}
            aria-label="Parkuru Önizle"
            title="Parkuru Önizle"
          >
            👁
          </button>
        </div>

        {/* preview banner indicator */}
        {isPreviewing && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <div className="paper-card py-1 px-3 flex items-center gap-2 bg-[#fffdf7]/95 shadow-md">
              <span className="text-base animate-pulse">👁</span>
              <span className="font-hand text-lg font-bold tracking-wide">PARKUR ÖNİZLEMESİ</span>
              <span className="font-hand text-xs opacity-60 hidden sm:inline">· Dokunarak geç</span>
            </div>
          </div>
        )}

        {/* returning to start banner indicator */}
        {isReturningToStart && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <div className="paper-card py-1 px-3 flex items-center gap-2 bg-[#fffdf7]/95 shadow-md animate-pulse">
              <span className="text-base">⏳</span>
              <span className="font-hand text-lg font-bold tracking-wide">BAŞLANGIÇA DÖNÜLÜYOR...</span>
            </div>
          </div>
        )}

        {/* pan mode indicator */}
        {mode === "pan" && phase === "ready" && !isPreviewing && !isReturningToStart && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <div className="paper-card py-1 px-3 flex items-center gap-2 bg-[#fffdf7]/95 shadow-md">
              <span className="text-base">✋</span>
              <span className="font-hand text-lg font-bold tracking-wide">KAYDIRMA MODU</span>
              <span className="font-hand text-xs opacity-60 hidden sm:inline">· Sağa/sola sürükle, çizmek için ✏️ seç</span>
            </div>
          </div>
        )}

        {/* ready overlay */}
        {phase === "ready" && (
          <div className="absolute inset-x-0 bottom-3 landscape:bottom-2 flex flex-col items-center justify-end pointer-events-none px-4 z-10">
            <div className="paper-card max-w-xs landscape:max-w-sm w-full text-center pointer-events-auto py-2.5 px-4 landscape:py-1.5 landscape:px-3">
              <button
                className={`btn-ink big landscape:py-1.5 landscape:text-xl w-full ${
                  isReturningToStart ? "opacity-75 cursor-wait" : ""
                }`}
                onClick={start}
                disabled={isReturningToStart}
              >
                {isReturningToStart ? "⏳ BAŞLIYOR..." : "▶ BAŞLA"}
              </button>
              <p className="font-hand text-xl landscape:text-lg mt-1">{level.hint}</p>
              <p className="font-hand text-sm landscape:text-xs opacity-60 mt-0.5">
                {mode === "pan" ? "Parkuru incele, çizmek için ✏️ seç!" : "Parmağınla çiz, sonra başlat!"}
              </p>
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
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 p-4">
            <div className="paper-card text-center max-h-[95vh] overflow-y-auto">
              <p className="font-hand text-4xl font-bold">{state?.message ?? "OOOPS!"}</p>
              <p className="font-hand opacity-60 mt-1">Kalan can: {state?.lives}</p>
              <div className="flex gap-2 mt-3">
                <button className="btn-ink flex-1" onClick={handleRetry}>TEKRAR DENE</button>
              </div>
            </div>
          </div>
        )}

        {/* game over */}
        {phase === "gameover" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/15 p-4">
            <div className="paper-card text-center max-h-[95vh] overflow-y-auto">
              <p className="font-hand text-4xl font-bold">OYUN BİTTİ</p>
              <p className="font-hand opacity-60 mt-1">Çöp adam son çizgiye ulaşamadı…</p>
              <div className="flex flex-col gap-2 mt-3">
                <button className="btn-ink" onClick={handleFullRestart}>BAŞTAN BAŞLA</button>
                <Link to="/levels" className="btn-ink ghost" onClick={cancelPreviewOnAction}>BÖLÜMLER</Link>
              </div>
            </div>
          </div>
        )}

        {/* win overlay */}
        {phase === "won" && result && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 p-4">
            <div className="paper-card text-center min-w-64 max-h-[95vh] overflow-y-auto">
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
                  <Link to="/achievements" className="btn-ink" onClick={cancelPreviewOnAction}>OYUNU BİTİRDİN! 🏆</Link>
                )}
                <button className="btn-ink ghost" onClick={handleFullRestart}>TEKRAR OYNA</button>
                <Link to="/levels" className="btn-ink ghost" onClick={cancelPreviewOnAction}>BÖLÜMLER</Link>
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
