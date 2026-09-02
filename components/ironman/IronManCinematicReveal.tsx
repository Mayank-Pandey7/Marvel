"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { EyebrowBadge } from "@/components/ironman/EyebrowBadge";
import { HudFrame } from "@/components/ironman/HudFrame";
import { BEATS, CINE_FRAME_COUNT, cineFramePath } from "@/lib/ironman/cinematic";

export function IronManCinematicReveal() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const h2InevitableRef = useRef<HTMLHeadingElement | null>(null);
  const h2IronManRef = useRef<HTMLHeadingElement | null>(null);
  const outroRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const seqReadoutRef = useRef<HTMLSpanElement | null>(null);

  const framesRef = useRef<HTMLImageElement[]>([]);
  const tickingRef = useRef(false);
  const loadedRef = useRef(false);
  const lastFrameRef = useRef(-1);
  const prevVisibleIdsRef = useRef("");

  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [visibleBeats, setVisibleBeats] = useState<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 1; i <= CINE_FRAME_COUNT; i++) {
      const img = new Image();
      img.src = cineFramePath(i);
      img.onload = () => {
        if (cancelled) return;
        loadedCount++;
        setLoadProgress(loadedCount / CINE_FRAME_COUNT);
        if (!loadedRef.current && loadedCount >= 1) {
          loadedRef.current = true;
          setLoaded(true);
          drawFrame(0);
        }
      };
      img.onerror = () => {
        if (cancelled) return;
        loadedCount++;
        setLoadProgress(loadedCount / CINE_FRAME_COUNT);
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
      CINE_FRAME_COUNT - 1,
      Math.floor(rawProgress * CINE_FRAME_COUNT)
    );
    if (frameIdx !== lastFrameRef.current) {
      lastFrameRef.current = frameIdx;
      drawFrame(frameIdx);
    }

    if (h2InevitableRef.current) {
      let op = 0;
      if (rawProgress >= 0.04 && rawProgress <= 0.22) {
        op =
          rawProgress < 0.1
            ? (rawProgress - 0.04) / 0.06
            : rawProgress > 0.16
              ? 1 - (rawProgress - 0.16) / 0.06
              : 1;
      }
      h2InevitableRef.current.style.opacity = Math.max(0, Math.min(1, op)).toFixed(3);
    }

    if (h2IronManRef.current) {
      let op = 0;
      if (rawProgress >= 0.24 && rawProgress <= 0.48) {
        op =
          rawProgress < 0.3
            ? (rawProgress - 0.24) / 0.06
            : rawProgress > 0.42
              ? 1 - (rawProgress - 0.42) / 0.06
              : 1;
      }
      h2IronManRef.current.style.opacity = Math.max(0, Math.min(1, op)).toFixed(3);
    }

    if (outroRef.current) {
      const op =
        rawProgress >= 0.82
          ? Math.min(1, (rawProgress - 0.82) / 0.12)
          : 0;
      outroRef.current.style.opacity = op.toFixed(3);
      outroRef.current.style.pointerEvents = op > 0.5 ? "auto" : "none";
    }

    if (progressFillRef.current) {
      progressFillRef.current.style.transform = `scaleX(${rawProgress.toFixed(4)})`;
    }

    if (seqReadoutRef.current) {
      const frameNum = String(frameIdx + 1).padStart(3, "0");
      seqReadoutRef.current.textContent = `${frameNum} / ${CINE_FRAME_COUNT}`;
    }

    const nextVisible = new Set<string>();
    for (const b of BEATS) {
      if (rawProgress >= b.show && rawProgress < b.hide) {
        nextVisible.add(b.id);
      }
    }
    const signature = Array.from(nextVisible).sort().join(",");
    if (signature !== prevVisibleIdsRef.current) {
      prevVisibleIdsRef.current = signature;
      setVisibleBeats(nextVisible);
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
      id="cinematic"
      className="scroll-animation relative w-full bg-[#0a0a0b]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/60"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.8)_100%)]"
        />

        {/* HUD top edge ticks */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-6 top-6 z-20 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500 md:inset-x-12"
        >
          <span className="flex items-center gap-2 text-zinc-400">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            CINEMATIC // PLAYBACK
          </span>
          <span className="hidden md:inline">
            SEQUENCE: ENDGAME // 02:54:18
          </span>
          <span className="text-zinc-400">
            FRAME // <span ref={seqReadoutRef}>001 / {CINE_FRAME_COUNT}</span>
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

        {/* Big Text 01 — Inevitable */}
        <div
          ref={h2InevitableRef}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center opacity-0 transition-opacity duration-150"
        >
          <EyebrowBadge className="mb-4">THE FINAL STAND</EyebrowBadge>
          <h2 className="max-w-4xl font-sans text-4xl font-extrabold tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl">
            &ldquo;I am&hellip; inevitable.&rdquo;
          </h2>
          <span className="mt-4 font-mono text-xs uppercase tracking-[0.28em] text-zinc-500">
            Thanos &middot; Avengers: Endgame
          </span>
        </div>

        {/* Big Text 02 — Iron Man */}
        <div
          ref={h2IronManRef}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center opacity-0 transition-opacity duration-150"
        >
          <EyebrowBadge className="mb-4">THE DEFINING MOMENT</EyebrowBadge>
          <h2 className="max-w-5xl font-sans text-5xl font-black tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl">
            <span className="bg-gradient-to-b from-amber-200 via-accent to-amber-600 bg-clip-text text-transparent">
              &ldquo;AND I&hellip; AM&hellip;
              <br />
              IRON MAN.&rdquo;
            </span>
          </h2>
          <span className="mt-4 font-mono text-xs uppercase tracking-[0.28em] text-accent">
            Tony Stark &middot; 2008 &mdash; 2019
          </span>
        </div>

        {/* Story Beat Cards (Bottom Right) */}
        <div className="pointer-events-none absolute inset-x-6 bottom-12 z-20 flex justify-end md:inset-x-12 md:bottom-16">
          <div className="relative h-44 w-full max-w-md md:h-48">
            {BEATS.map((b) => {
              const isVis = visibleBeats.has(b.id);
              return (
                <div
                  key={b.id}
                  className={`card-surface absolute inset-x-0 bottom-0 flex flex-col justify-between p-6 transition-all duration-500 ease-out ${
                    isVis
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-6 opacity-0"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.26em] text-accent">
                    <span>{b.label}</span>
                    <span className="text-zinc-500">{b.film}</span>
                  </div>
                  <p className="my-2 font-sans text-lg font-medium leading-snug tracking-tight text-white md:text-xl">
                    &ldquo;{b.quote}&rdquo;
                  </p>
                  <div className="border-t border-white/10 pt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                    {b.speaker}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Outro summary text */}
        <div
          ref={outroRef}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center opacity-0 transition-opacity duration-300"
        >
          <div className="flex max-w-2xl flex-col items-center gap-5">
            <EyebrowBadge>END OF AN ERA</EyebrowBadge>
            <h3 className="font-sans text-3xl font-bold tracking-tight text-white sm:text-5xl">
              From a Cave in Afghanistan to the Center of the Cosmos.
            </h3>
            <p className="font-sans text-sm text-zinc-400 sm:text-base">
              Tony Stark built the MCU from a single spark in 2008 and gave his life to protect it eleven years later.
            </p>
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
            LOADING REVEAL FRAMES {Math.round(loadProgress * 100)}%
          </div>
        )}
      </div>
    </section>
  );
}
