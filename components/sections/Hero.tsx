"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { HudFrame } from "@/components/ui/HudFrame";
import { DIALOGUES, FRAME_COUNT, HERO_TEXT_FADE_END, framePath, type Dialogue } from "@/lib/hero";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const beat1Ref = useRef<HTMLDivElement | null>(null);
  const beat2Ref = useRef<HTMLDivElement | null>(null);
  const beat3Ref = useRef<HTMLDivElement | null>(null);
  const beat4Ref = useRef<HTMLDivElement | null>(null);
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

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let img = framesRef.current[index];
    if (!img || !img.complete || !img.naturalWidth) {
      for (let offset = 1; offset < FRAME_COUNT; offset++) {
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
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;

    let drawW: number;
    let drawH: number;
    if (canvasRatio > imgRatio) {
      drawW = cw;
      drawH = cw / imgRatio;
    } else {
      drawH = ch;
      drawW = ch * imgRatio;
    }

    if (window.innerWidth <= 768) {
      drawW *= 1.3;
      drawH *= 1.3;
    }

    const drawX = (cw - drawW) / 2;
    const drawY = (ch - drawH) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

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
        if (loadedCount === 1) {
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
    loadedRef.current = true;
    setLoaded(true);

    return () => {
      cancelled = true;
    };
  }, [drawFrame]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    drawFrame(lastFrameRef.current >= 0 ? lastFrameRef.current : 0);
  }, [drawFrame]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  useEffect(() => {
    drawFrame(0);
    lastFrameRef.current = 0;
  }, [drawFrame]);

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        tickingRef.current = false;
        const section = sectionRef.current;
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const scrollable = section.offsetHeight - window.innerHeight;
        const progress =
          scrollable <= 0
            ? 0
            : Math.min(1, Math.max(0, -rect.top / scrollable));

        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.floor(progress * FRAME_COUNT),
        );
        if (frameIndex !== lastFrameRef.current) {
          lastFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }

        const beats = [
          { ref: beat1Ref, start: 0.0, inEnd: 0.0, outStart: 0.16, end: 0.23 },
          { ref: beat2Ref, start: 0.25, inEnd: 0.30, outStart: 0.42, end: 0.49 },
          { ref: beat3Ref, start: 0.51, inEnd: 0.56, outStart: 0.68, end: 0.75 },
          { ref: beat4Ref, start: 0.77, inEnd: 0.83, outStart: 1.0, end: 1.0 },
        ];

        for (const b of beats) {
          if (!b.ref.current) continue;
          let op = 0;
          if (progress >= b.start && progress <= b.end) {
            if (b.inEnd > b.start && progress < b.inEnd) {
              op = (progress - b.start) / (b.inEnd - b.start);
            } else if (progress > b.outStart) {
              op = 1 - (progress - b.outStart) / (b.end - b.outStart);
            } else {
              op = 1;
            }
          }
          b.ref.current.style.opacity = String(Math.max(0, Math.min(1, op)));
          b.ref.current.style.transform = `translateY(${(1 - Math.max(0, Math.min(1, op))) * 16}px)`;
        }

        const newVisible = new Set<string>();
        for (const d of DIALOGUES) {
          if (progress >= d.show && progress <= d.hide) newVisible.add(d.id);
        }
        const newIds = [...newVisible].sort().join(",");
        if (newIds !== prevVisibleIdsRef.current) {
          prevVisibleIdsRef.current = newIds;
          setVisibleCards(newVisible);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [drawFrame]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "400vh" }}
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden bg-background"
        style={{ height: "100vh" }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 10%, transparent 30%, rgba(10,10,11,0.45) 70%, rgba(10,10,11,0.85) 100%)",
          }}
        />

        {/* Beat 1: Right Side - Iron Man */}
        <div
          ref={beat1Ref}
          className="pointer-events-none absolute inset-y-0 right-6 sm:right-10 md:right-16 lg:right-24 z-10 flex flex-col items-start justify-center text-left gap-5 max-w-lg"
          style={{ transition: "opacity 80ms linear" }}
        >
          <h1 className="font-mono text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none">
            IRON <span className="text-accent">MAN</span>
          </h1>
          <p className="max-w-[44ch] font-mono text-sm sm:text-base leading-relaxed text-zinc-300">
            Forged in the fires of captivity with a box of scraps. From reckless weapons magnate to universal savior, Tony Stark proved that heroes are crafted through pure intellect, relentless engineering, and the ultimate sacrifice.
          </p>
        </div>

        {/* Beat 2: Left Side - The Mechanic */}
        <div
          ref={beat2Ref}
          className="pointer-events-none absolute inset-y-0 left-6 sm:left-10 md:left-16 lg:left-24 z-10 hidden max-w-lg flex-col items-start justify-center text-left gap-5 md:flex"
          style={{ opacity: 0, transition: "opacity 80ms linear" }}
        >
          <h2 className="font-mono text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none">
            THE <span className="text-accent">MECHANIC</span>
          </h2>
          <p className="max-w-[44ch] font-mono text-sm sm:text-base leading-relaxed text-zinc-300">
            85 armor iterations across 11 MCU films. Armed with sheer human intellect and nanotech perfection, Tony Stark delivered the final snap that saved the entire cosmos.
          </p>
        </div>

        {/* Beat 3: Left Side - Nanotech Armor */}
        <div
          ref={beat3Ref}
          className="pointer-events-none absolute inset-y-0 left-6 sm:left-10 md:left-16 lg:left-24 z-10 hidden max-w-lg flex-col items-start justify-center text-left gap-5 md:flex"
          style={{ opacity: 0, transition: "opacity 80ms linear" }}
        >
          <h2 className="font-mono text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none">
            NANOTECH <span className="text-accent">PERFECTION</span>
          </h2>
          <p className="max-w-[44ch] font-mono text-sm sm:text-base leading-relaxed text-zinc-300">
            Billions of fluid nanoparticles deploy in milliseconds — instantaneous energy shields, heavy repulsors, and lightning re-channelers engineered for cosmic warfare.
          </p>
        </div>

        {/* Beat 4: Left Side - Final Stand */}
        <div
          ref={beat4Ref}
          className="pointer-events-none absolute inset-y-0 left-6 sm:left-10 md:left-16 lg:left-24 z-10 hidden max-w-lg flex-col items-start justify-center text-left gap-5 md:flex"
          style={{ opacity: 0, transition: "opacity 80ms linear" }}
        >
          <h2 className="font-mono text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none">
            FINAL <span className="text-accent">STAND</span>
          </h2>
          <p className="max-w-[44ch] font-mono text-sm sm:text-base leading-relaxed text-zinc-300">
            Doctor Strange&apos;s one winning timeline. Armed with all six Infinity Stones locked into his nanotech gauntlet, Tony gave humanity everything he had left.
          </p>
        </div>



      </div>
    </section>
  );
}
