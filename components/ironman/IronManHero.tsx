"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { EyebrowBadge } from "@/components/ironman/EyebrowBadge";
import { HudFrame } from "@/components/ironman/HudFrame";
import { DIALOGUES, FRAME_COUNT, HERO_TEXT_FADE_END, framePath } from "@/lib/ironman/hero";

export function IronManHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroTextRef = useRef<HTMLDivElement | null>(null);
  const bigLeftTextRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const powerReadoutRef = useRef<HTMLSpanElement | null>(null);

  const framesRef = useRef<HTMLImageElement[]>([]);
  const tickingRef = useRef(false);
  const loadedRef = useRef(false);
  const lastFrameRef = useRef(-1);
  const prevVisibleIdsRef = useRef("");

  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i);
      img.onload = () => {
        if (cancelled) return;
        loadedCount++;
        setLoadProgress(loadedCount / FRAME_COUNT);
        if (!loadedRef.current && loadedCount >= 1) {
          loadedRef.current = true;
          setLoaded(true);
          drawFrame(0);
        }
      };
      img.onerror = () => {
        if (cancelled) return;
        loadedCount++;
        setLoadProgress(loadedCount / FRAME_COUNT);
      };
      imgs.push(img);
    }
    framesRef.current = imgs;

    return () => {
      cancelled = true;
    };
  }, []);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Find requested frame or fallback to nearest loaded frame
    let img = framesRef.current[index];
    if (!img || !img.complete || !img.naturalWidth) {
      for (let offset = 1; offset < 20; offset++) {
        const prev = framesRef.current[index - offset];
        if (prev && prev.complete && prev.naturalWidth) {
          img = prev;
          break;
        }
        const next = framesRef.current[index + offset];
        if (next && next.complete && next.naturalWidth) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;

    // True edge-to-edge cover scaling with zero black bars
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const drawW = img.naturalWidth * scale;
    const drawH = img.naturalHeight * scale;

    const drawX = (cw - drawW) / 2;
    const drawY = (ch - drawH) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    if (lastFrameRef.current >= 0) {
      drawFrame(lastFrameRef.current);
    } else {
      drawFrame(0);
    }
  }, [drawFrame]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  useEffect(() => {
    if (loaded && lastFrameRef.current < 0) {
      lastFrameRef.current = 0;
      drawFrame(0);
    }
  }, [loaded, drawFrame]);

  const update = useCallback(() => {
    tickingRef.current = false;
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const totalDist = rect.height - window.innerHeight;
    if (totalDist <= 0) return;

    const scrolled = -rect.top;
    const rawProgress = Math.max(0, Math.min(1, scrolled / totalDist));

    const frameIdx = Math.min(
      FRAME_COUNT - 1,
      Math.floor(rawProgress * FRAME_COUNT)
    );
    if (frameIdx !== lastFrameRef.current) {
      lastFrameRef.current = frameIdx;
      drawFrame(frameIdx);
    }

    if (heroTextRef.current) {
      const heroOpacity = Math.max(
        0,
        Math.min(1, 1 - rawProgress / HERO_TEXT_FADE_END)
      );
      heroTextRef.current.style.opacity = heroOpacity.toFixed(3);
      heroTextRef.current.style.pointerEvents =
        heroOpacity < 0.05 ? "none" : "auto";
    }

    if (bigLeftTextRef.current) {
      const bltOpacity =
        rawProgress <= 0.08
          ? Math.max(0, Math.min(1, rawProgress / 0.08))
          : Math.max(0, Math.min(1, 1 - (rawProgress - 0.7) / 0.15));
      bigLeftTextRef.current.style.opacity = bltOpacity.toFixed(3);
    }

    if (progressFillRef.current) {
      progressFillRef.current.style.transform = `scaleX(${rawProgress.toFixed(4)})`;
    }

    if (powerReadoutRef.current) {
      const pct = Math.round(rawProgress * 100);
      powerReadoutRef.current.textContent = `${pct}%`;
    }

    const nextVisible = new Set<string>();
    for (const d of DIALOGUES) {
      if (rawProgress >= d.show && rawProgress < d.hide) {
        nextVisible.add(d.id);
      }
    }
    const signature = Array.from(nextVisible).sort().join(",");
    if (signature !== prevVisibleIdsRef.current) {
      prevVisibleIdsRef.current = signature;
      setVisibleCards(nextVisible);
    }
  }, [drawFrame]);

  const onScroll = useCallback(() => {
    if (!tickingRef.current) {
      tickingRef.current = true;
      requestAnimationFrame(update);
    }
  }, [update]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll, update]);

  return (
    <section
      ref={sectionRef}
      className="scroll-animation relative w-full bg-[#0a0a0b]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.75)_100%)]"
        />

        {/* HUD top edge ticks */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-6 top-6 z-20 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500 md:inset-x-12"
        >
          <span className="flex items-center gap-2 text-zinc-400">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            LIVE // TELEMETRY
          </span>
          <span className="hidden md:inline">
            ARMOR MODEL: MARK LXXXV &middot; NANO-TECH
          </span>
          <span className="text-zinc-400">
            PWR // <span ref={powerReadoutRef}>0%</span>
          </span>
        </div>

        {/* HUD Frame corners */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-4 z-20 md:inset-8"
        >
          <HudFrame
            corner="tl"
            className="absolute left-0 top-0 text-white/15"
          />
          <HudFrame
            corner="tr"
            className="absolute right-0 top-0 text-white/15"
          />
          <HudFrame
            corner="bl"
            className="absolute bottom-0 left-0 text-white/15"
          />
          <HudFrame
            corner="br"
            className="absolute bottom-0 right-0 text-white/15"
          />
        </div>

        {/* Initial Hero Text */}
        <div
          ref={heroTextRef}
          className="pointer-events-auto absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center transition-opacity duration-150"
        >
          <div className="flex max-w-3xl flex-col items-center gap-6">
            <EyebrowBadge>AVENGER PRIME // ARCHIVES</EyebrowBadge>
            <h1 className="font-sans text-5xl font-bold leading-[0.92] tracking-tighter text-white sm:text-7xl md:text-8xl lg:text-9xl">
              ANTHONY
              <br />
              <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                EDWARD STARK
              </span>
            </h1>
            <p className="max-w-xl font-sans text-base text-zinc-400 sm:text-lg">
              The genius, billionaire, playboy, philanthropist who kicked off the Marvel Cinematic Universe and saved reality itself.
            </p>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
              <span>Scroll to assemble armor</span>
              <span className="inline-block animate-bounce">&darr;</span>
            </div>
          </div>
        </div>

        {/* Big Left Watermark Text */}
        <div
          ref={bigLeftTextRef}
          aria-hidden
          className="pointer-events-none absolute bottom-12 left-6 z-10 opacity-0 transition-opacity duration-300 md:bottom-16 md:left-12"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
            ARMOR PROFILE // 01
          </span>
          <div className="font-sans text-4xl font-extrabold tracking-tighter text-white/90 sm:text-6xl md:text-7xl">
            MARK LXXXV
          </div>
        </div>

        {/* Dialogue Quote Cards */}
        <div className="pointer-events-none absolute inset-x-6 bottom-12 z-20 flex justify-end md:inset-x-12 md:bottom-16">
          <div className="relative h-44 w-full max-w-md md:h-48">
            {DIALOGUES.map((d) => {
              const isVis = visibleCards.has(d.id);
              return (
                <div
                  key={d.id}
                  className={`card-surface absolute inset-x-0 bottom-0 flex flex-col justify-between p-6 transition-all duration-500 ease-out ${
                    isVis
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-6 opacity-0"
                  }`}
                >
                  <p className="font-sans text-lg font-medium leading-snug tracking-tight text-white md:text-xl">
                    &ldquo;{d.quote}&rdquo;
                  </p>
                  <div className="flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-400">
                    <span className="font-semibold text-accent">{d.speaker}</span>
                    <span className="text-zinc-500">{d.film}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Progress Line */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-1 bg-white/5"
        >
          <div
            ref={progressFillRef}
            className="h-full w-full origin-left bg-gradient-to-r from-accent via-amber-300 to-accent"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* Preload Progress Indicator */}
        {!loaded && (
          <div className="pointer-events-none absolute bottom-6 right-6 z-30 flex items-center gap-3 rounded-full border border-white/10 bg-black/80 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-400 backdrop-blur-md">
            <span className="inline-block h-1.5 w-1.5 animate-ping rounded-full bg-accent" />
            LOADING SUIT FRAMES {Math.round(loadProgress * 100)}%
          </div>
        )}
      </div>
    </section>
  );
}
