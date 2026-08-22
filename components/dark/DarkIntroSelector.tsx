"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useTimelineState } from "@/context/TimelineStateContext";
import { PHASES, MCU, MCUEntry } from "@/data/mcu";
import SlideNavMenu from "./SlideNavMenu";
import { MCU_POSTER_MAP } from "@/components/map/NodeArtwork";

// Edge-to-Edge Non-Overlapping Betel Leaf Geometry
const EDGE_JOINED_BETEL_PATH = "M 100 100 Q 88 80 78 62 C 78 44, 90 28, 100 20 C 110 28, 122 44, 122 62 Q 112 80 100 100 Z";

const BETEL_LEAVES = [
  { phase: 1, angle: 0, textX: 100, textY: 54 },
  { phase: 2, angle: 60, textX: 139.8, textY: 77 },
  { phase: 3, angle: 120, textX: 139.8, textY: 123 },
  { phase: 4, angle: 180, textX: 100, textY: 146 },
  { phase: 5, angle: 240, textX: 60.2, textY: 123 },
  { phase: 6, angle: 300, textX: 60.2, textY: 77 },
];

export default function DarkIntroSelector({
  onContinue,
}: {
  onContinue: (phase?: number, movieId?: string) => void;
}) {
  const { setCurrentPhase } = useTimelineState();
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState<number>(0);
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);
  const [hoveredMovieIndex, setHoveredMovieIndex] = useState<number | null>(null);
  const [navOpen, setNavOpen] = useState(false);

  // Cinematic opening sequence stages: initial -> centered -> ascending -> ready
  const [introStage, setIntroStage] = useState<"initial" | "centered" | "ascending" | "ready">("initial");

  useEffect(() => {
    const t1 = setTimeout(() => setIntroStage("centered"), 150);
    const t2 = setTimeout(() => setIntroStage("ascending"), 1350);
    const t3 = setTimeout(() => setIntroStage("ready"), 2350);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Dynamic bounds for smooth continuous SLIDE animation of capsule and selector circle
  const [pillBounds, setPillBounds] = useState<{ left: number; width: number; height: number }>({ left: 0, width: 0, height: 0 });
  const [activeBtnBounds, setActiveBtnBounds] = useState<{ left: number; top: number; width: number; height: number }>({ left: 0, top: 0, width: 0, height: 0 });
  
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Movies for the currently CLICKED active phase
  const currentPhaseMovies: MCUEntry[] = useMemo(() => {
    if (!activePhase) return [];
    return MCU.filter((m) => m.phase === activePhase);
  }, [activePhase]);

  // Recalculate progress capsule and sliding selector circle bounding box
  useEffect(() => {
    const updateBounds = () => {
      const container = containerRef.current;
      const firstBtn = buttonRefs.current[0];
      const activeBtn = buttonRefs.current[selectedMovieIndex];

      if (container && firstBtn && activeBtn) {
        const cRect = container.getBoundingClientRect();
        const fRect = firstBtn.getBoundingClientRect();
        const aRect = activeBtn.getBoundingClientRect();

        // Progressive Capsule Pill bounds [1 .. active]
        const pLeft = fRect.left - cRect.left - 4;
        const pWidth = aRect.right - fRect.left + 8;
        const pHeight = Math.max(fRect.height, aRect.height) + 6;
        setPillBounds({ left: pLeft, width: pWidth, height: pHeight });

        // Continuous Sliding Circle indicator bounds
        const bLeft = aRect.left - cRect.left - 3;
        const bTop = aRect.top - cRect.top - 3;
        const bWidth = aRect.width + 6;
        const bHeight = aRect.height + 6;
        setActiveBtnBounds({ left: bLeft, top: bTop, width: bWidth, height: bHeight });
      }
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, [selectedMovieIndex, activePhase, currentPhaseMovies.length]);

  const handleSelectPhase = (p: number) => {
    setActivePhase(p);
    setCurrentPhase(p);
    setSelectedMovieIndex(0);
  };

  const handleSelectMovie = (idx: number) => {
    setSelectedMovieIndex(idx);
  };

  // Ambient misty particle canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const clouds = Array.from({ length: 24 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      radius: Math.random() * 160 + 80,
      baseOpacity: Math.random() * 0.03 + 0.01,
      phase: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      clouds.forEach((c) => {
        c.x += c.vx;
        c.y += c.vy;
        if (c.x < -160) c.x = width + 160;
        if (c.x > width + 160) c.x = -160;
        if (c.y < -160) c.y = height + 160;
        if (c.y > height + 160) c.y = -160;

        const dynamicOpacity = c.baseOpacity * (1 + 0.25 * Math.sin(time + c.phase));
        const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.radius);
        grad.addColorStop(0, `rgba(255, 255, 255, ${dynamicOpacity})`);
        grad.addColorStop(0.5, `rgba(180, 190, 210, ${dynamicOpacity * 0.4})`);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const currentPhaseMeta = activePhase ? PHASES[activePhase - 1] || PHASES[0] : null;
  const activeMovie = activePhase && currentPhaseMovies.length > 0 ? currentPhaseMovies[selectedMovieIndex] || currentPhaseMovies[0] : null;

  const handleContinue = () => {
    if (activePhase) {
      setCurrentPhase(activePhase);
    }
    onContinue(activePhase || 1, activeMovie?.id);
  };

  return (
    <div
      className="fixed inset-0 w-screen h-screen max-h-screen z-50 flex flex-col justify-between select-none bg-[#000000] text-stone-300 overflow-hidden font-sans"
    >
      {/* Cinematic Background Doctor Doom Live Video Layer */}
      <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none transition-opacity duration-1000 ${
        introStage === "ready" ? "opacity-100" : "opacity-0"
      }`}>
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/doomsday-bg.jpg"
          className="absolute inset-0 w-full h-full object-cover object-[center_25%] opacity-90 filter brightness-105 contrast-110 select-none"
        >
          <source src="/trailers/doctor-doom.3840x2160.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-[#000000]/25" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#000000_90%)]" />
      </div>

      {/* Dynamic Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[1]" />

      {/* TOP AMBIENT FADING BLUR BACKGROUND MASK */}
      <div
        className={`fixed top-0 inset-x-0 h-32 pointer-events-none z-20 bg-gradient-to-b from-[#020204]/90 via-[#020204]/60 to-transparent backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)] transition-opacity duration-1000 ${
          introStage === "ready" ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* CINEMATIC ASCENDING BRAND TITLE (Original proportion with increased vertical letter height) */}
      <div
        className="fixed z-40 pointer-events-none transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center text-center w-full max-w-full px-2 sm:px-4"
        style={{
          left: "50%",
          top: introStage === "initial" || introStage === "centered" ? "50%" : "26px",
          transform:
            introStage === "initial"
              ? "translate(-50%, -50%) scale(0.92, 1.3)"
              : introStage === "centered"
              ? "translate(-50%, -50%) scale(1.05, 1.45)"
              : "translate(-50%, 0) scale(1, 1)",
          opacity: introStage === "initial" ? 0 : 1,
        }}
      >
        <h1
          className={`font-mono uppercase text-stone-100 font-light drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] inline-block whitespace-nowrap ${
            introStage === "centered"
              ? "text-[8px] xs:text-[9.5px] sm:text-sm md:text-lg tracking-[0.18em] xs:tracking-[0.32em] sm:tracking-[0.55em] md:tracking-[0.75em]"
              : "text-[7px] xs:text-[8px] sm:text-xs md:text-sm tracking-[0.14em] xs:tracking-[0.24em] sm:tracking-[0.45em] md:tracking-[0.6em]"
          }`}
        >
          M A R V E L &nbsp; C I N E M A T I C &nbsp; U N I V E R S E
        </h1>
      </div>

      {/* TOP BAR */}
      <header className={`relative z-10 w-full px-4 sm:px-14 py-4 sm:py-6 flex items-center justify-between transition-opacity duration-1000 ${
        introStage === "ready" ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}>
        <button
          onClick={() => setNavOpen(true)}
          className="text-stone-400 hover:text-white transition-colors p-1.5 cursor-pointer group flex items-center"
          aria-label="Open Navigation Menu"
          title="Open Navigation Menu"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className="h-[1px] w-5 bg-current block group-hover:w-6 transition-all" />
            <span className="h-[1px] w-3.5 bg-current block group-hover:w-5 transition-all" />
          </div>
        </button>

        {/* Empty placeholder to balance flex container while ascending title docks above */}
        <div className="invisible text-[7px] xs:text-[8px] sm:text-xs md:text-sm font-mono tracking-[0.14em] xs:tracking-[0.24em] sm:tracking-[0.45em] md:tracking-[0.6em] uppercase whitespace-nowrap">
          M A R V E L &nbsp; C I N E M A T I C &nbsp; U N I V E R S E
        </div>

        {/* Spacer to keep center title balanced */}
        <div className="w-6" />
      </header>

      {/* BOTTOM-DOCKED INTERACTIVE CONTROLS */}
      <main className={`relative z-20 flex flex-col items-center justify-end w-full max-w-4xl mx-auto px-2 xs:px-4 mt-auto mb-3 overflow-visible transition-opacity duration-1000 ${
        introStage === "ready" ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}>
        
        {/* CONDITIONAL CONTROLS */}
        {activePhase === null ? (
          /* UNSELECTED PHASE PROMPT — click to directly show Phase 1 with trailer, flower & movies */
          <div className="flex flex-col items-center justify-center my-3 text-center px-4 animate-in fade-in duration-1000 min-h-[44px] transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] translate-y-4 sm:translate-y-6 mb-6">
            <button
              onClick={() => handleSelectPhase(1)}
              className="group relative text-xs sm:text-sm font-mono tracking-[0.35em] sm:tracking-[0.45em] text-stone-100 uppercase font-light drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] leading-relaxed py-1 px-4 cursor-pointer bg-transparent border-none outline-none hover:text-white transition-colors hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.7)]"
            >
              SELECT PHASE &amp; MOVIE
            </button>
          </div>
        ) : (
          /* SELECTED PHASE: FLOWER + MOVIE TRACK */
          <div className="flex flex-col items-center w-full animate-in fade-in zoom-in-95 duration-700 delay-200">
            {/* Flower with increased size and animated glowing effects */}
            <div className="relative w-40 h-40 xs:w-48 xs:h-48 sm:w-52 sm:h-52 md:w-56 md:h-56 flex items-center justify-center my-1 transition-transform duration-700 ease-out hover:scale-105">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 200">
                <defs>
                  <filter id="dark-triquetra-glow-sel" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <radialGradient id="smoky-leaf-sel" cx="50%" cy="28%" r="75%">
                    <stop offset="0%" stopColor="rgba(160, 160, 175, 0.55)" />
                    <stop offset="48%" stopColor="rgba(90, 90, 105, 0.28)" />
                    <stop offset="100%" stopColor="rgba(10, 10, 15, 0.0)" />
                  </radialGradient>
                  <style>{`
                    @keyframes flowDotsClockwise {
                      0% { stroke-dashoffset: 0; }
                      100% { stroke-dashoffset: 50; }
                    }
                    @keyframes petalBreathe {
                      0%, 100% { opacity: 0.9; }
                      50% { opacity: 1; filter: drop-shadow(0 0 14px rgba(255, 255, 255, 0.7)); }
                    }
                    .flowing-dots {
                      animation: flowDotsClockwise 8s linear infinite;
                    }
                    .flowing-dots-active {
                      animation: flowDotsClockwise 4.5s linear infinite, petalBreathe 3s ease-in-out infinite;
                    }
                  `}</style>
                </defs>
                {BETEL_LEAVES.map((leaf) => {
                  const isSelected = leaf.phase === activePhase;
                  const isHovered = leaf.phase === hoveredPhase;
                  return (
                    <g
                      key={leaf.phase}
                      onClick={() => handleSelectPhase(leaf.phase)}
                      onMouseEnter={() => setHoveredPhase(leaf.phase)}
                      onMouseLeave={() => setHoveredPhase(null)}
                      className="cursor-pointer group"
                    >
                      <path
                        d={EDGE_JOINED_BETEL_PATH}
                        transform={`rotate(${leaf.angle} 100 100)`}
                        fill={isSelected ? "url(#smoky-leaf-sel)" : isHovered ? "rgba(255, 255, 255, 0.12)" : "transparent"}
                        stroke={isSelected ? "#ffffff" : isHovered ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.35)"}
                        strokeWidth={isSelected ? "1.8" : isHovered ? "1.4" : "1.0"}
                        strokeDasharray={isSelected ? "2.5, 3.5" : "1.8, 2.8"}
                        filter={isSelected ? "url(#dark-triquetra-glow-sel)" : undefined}
                        className={`transition-all duration-300 ${isSelected ? "flowing-dots-active" : "flowing-dots"}`}
                      />
                      <text
                        x={leaf.textX}
                        y={leaf.textY}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill={isSelected ? "#ffffff" : isHovered ? "#ffffff" : "#8e8e93"}
                        fontSize={isSelected ? "15" : "13"}
                        fontFamily="sans-serif"
                        fontWeight={isSelected ? "600" : "400"}
                        className="select-none pointer-events-none transition-all drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"
                      >
                        {leaf.phase}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* DYNAMIC PROGRESS CAPSULE TRACK — Touch-scrollable on mobile */}
            <div className="flex items-center justify-center my-1.5 select-none w-full max-w-full px-2 overflow-x-auto overflow-y-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div ref={containerRef} className="relative inline-flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 px-3 py-1.5 overflow-visible">
                {/* 1. Dynamic Progress Capsule Pill */}
                {pillBounds.width > 0 && (
                  <div
                    className="absolute rounded-full border border-dotted border-white/80 bg-white/[0.04] backdrop-blur-[2px] pointer-events-none z-0 transition-[width,left] duration-[750ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      left: `${pillBounds.left}px`,
                      width: `${pillBounds.width}px`,
                      height: `${pillBounds.height}px`,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />
                )}

                {/* 2. Sliding Active Circle Ring */}
                {activeBtnBounds.width > 0 && (
                  <div
                    className="absolute pointer-events-none z-10 rounded-full border border-dotted border-white/90 bg-white/[0.09] shadow-[0_0_16px_rgba(255,255,255,0.25)] transition-[left,top,width,height] duration-[750ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      left: `${activeBtnBounds.left}px`,
                      top: `${activeBtnBounds.top}px`,
                      width: `${activeBtnBounds.width}px`,
                      height: `${activeBtnBounds.height}px`,
                    }}
                  />
                )}

                {/* Movie Number Buttons */}
                {currentPhaseMovies.map((movie, idx) => {
                  const isSelected = idx === selectedMovieIndex;
                  const isHovered = idx === hoveredMovieIndex;
                  const movieNum = idx + 1;

                  return (
                    <button
                      key={movie.id}
                      ref={(el) => { buttonRefs.current[idx] = el; }}
                      onClick={() => handleSelectMovie(idx)}
                      onMouseEnter={() => setHoveredMovieIndex(idx)}
                      onMouseLeave={() => setHoveredMovieIndex(null)}
                      className={`relative z-20 shrink-0 w-6 h-6 xs:w-7 xs:h-7 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-mono transition-all duration-300 overflow-visible bg-transparent ${
                        isSelected
                          ? "text-white font-bold scale-110"
                          : isHovered
                          ? "text-white font-semibold scale-110 shadow-[inset_0_0_12px_rgba(255,255,255,0.5)]"
                          : "text-stone-400 hover:text-stone-200"
                      }`}
                      title={movie.title}
                    >
                      {movieNum}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ACTIVE / HOVERED MOVIE CHRONOLOGY SUBTITLE */}
            {(() => {
              const displayIndex = hoveredMovieIndex !== null ? hoveredMovieIndex : selectedMovieIndex;
              const displayMovie = currentPhaseMovies[displayIndex] || currentPhaseMovies[0];

              return (
                <div className="text-center my-0.5 min-h-[34px] flex flex-col items-center justify-center px-4 transition-all duration-200">
                  <div className="text-[11px] sm:text-xs font-mono tracking-[0.2em] text-stone-100 uppercase font-bold flex items-center gap-2">
                    <span>
                      {String(displayIndex + 1).padStart(2, "0")} · {displayMovie?.title?.toUpperCase() || currentPhaseMeta?.title}
                    </span>
                    <span className="text-stone-500 font-normal">
                      ({displayMovie?.year || currentPhaseMeta?.years})
                    </span>
                  </div>
                  <div className="text-[10px] text-stone-400 font-mono tracking-wider max-w-md line-clamp-1 mt-0.5">
                    PHASE {currentPhaseMeta?.roman} · {currentPhaseMeta?.title}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* MINIMALIST 'C O N T I N U E' ACTION BUTTON (Only shown when a phase is actively selected) */}
        {activePhase !== null && (
          <div className="mt-1.5 mb-1 animate-in fade-in duration-700 delay-500">
            <button
              onClick={handleContinue}
              className="group relative px-6 py-2 text-[11px] font-mono tracking-[0.45em] sm:tracking-[0.55em] uppercase text-stone-300 hover:text-white transition-all flex items-center justify-center cursor-pointer"
            >
              <span className="relative z-10 transition-transform group-hover:scale-105 font-light drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                C O N T I N U E
              </span>
            </button>
          </div>
        )}

      </main>

      {/* BOTTOM FOOTER BAR (Only visible when a phase is actively selected) */}
      <footer className={`relative z-10 w-full px-6 sm:px-14 py-3 sm:py-4 flex items-center justify-end text-[9px] sm:text-[10px] font-mono tracking-[0.25em] uppercase text-stone-500 transition-all duration-700 ${
        introStage === "ready" && activePhase !== null ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-4"
      }`}>
        <div className="flex items-center gap-2 text-stone-400 select-none">
          <span className="tracking-[0.25em] font-mono text-[9px] sm:text-[10px] text-stone-400 font-bold uppercase">
            THE SACRED TIMELINE
          </span>
        </div>
      </footer>

      {/* Slide-out Navigation Drawer Menu */}
      <SlideNavMenu isOpen={navOpen} onClose={() => setNavOpen(false)} />
    </div>
  );
}
