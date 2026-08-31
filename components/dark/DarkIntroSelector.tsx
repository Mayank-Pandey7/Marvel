"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useTimelineState } from "@/context/TimelineStateContext";
import { PHASES, MCU, MCUEntry } from "@/data/mcu";
import SlideNavMenu from "./SlideNavMenu";
import { MCU_POSTER_MAP } from "@/components/map/NodeArtwork";

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

  const [introStage, setIntroStage] = useState<"initial" | "centered" | "ascending" | "ready">("initial");

  useEffect(() => {
    const t1 = setTimeout(() => setIntroStage("centered"), 80);
    const t2 = setTimeout(() => setIntroStage("ascending"), 1000);
    const t3 = setTimeout(() => setIntroStage("ready"), 1950);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const [pillBounds, setPillBounds] = useState<{ left: number; width: number; height: number }>({ left: 0, width: 0, height: 0 });
  const [activeBtnBounds, setActiveBtnBounds] = useState<{ left: number; top: number; width: number; height: number }>({ left: 0, top: 0, width: 0, height: 0 });

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const currentPhaseMovies: MCUEntry[] = useMemo(() => {
    if (!activePhase) return [];
    return MCU.filter((m) => m.phase === activePhase);
  }, [activePhase]);

  useEffect(() => {
    const updateBounds = () => {
      const firstBtn = buttonRefs.current[0];
      const activeBtn = buttonRefs.current[selectedMovieIndex];

      if (firstBtn && activeBtn) {
        const btnWidth = activeBtn.offsetWidth || 28;
        const btnHeight = activeBtn.offsetHeight || 28;
        const diameter = Math.max(btnWidth, btnHeight) + 6;
        const radius = diameter / 2;

        const fc = firstBtn.offsetLeft + firstBtn.offsetWidth / 2;
        const ac = activeBtn.offsetLeft + activeBtn.offsetWidth / 2;

        setPillBounds({
          left: fc - radius,
          width: ac - fc + diameter,
          height: diameter,
        });

        setActiveBtnBounds({
          left: ac - radius,
          top: 0,
          width: diameter,
          height: diameter,
        });
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    const clouds = Array.from({ length: 12 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      radius: Math.random() * 140 + 70,
      baseOpacity: Math.random() * 0.025 + 0.008,
      phase: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < clouds.length; i++) {
        const c = clouds[i];
        c.x += c.vx;
        c.y += c.vy;
        if (c.x < -140) c.x = width + 140;
        if (c.x > width + 140) c.x = -140;
        if (c.y < -140) c.y = height + 140;
        if (c.y > height + 140) c.y = -140;

        const dynamicOpacity = c.baseOpacity * (1 + 0.2 * Math.sin(time + c.phase));
        const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.radius);
        grad.addColorStop(0, `rgba(255, 255, 255, ${dynamicOpacity})`);
        grad.addColorStop(0.6, `rgba(180, 190, 210, ${dynamicOpacity * 0.3})`);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
        ctx.fill();
      }

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
      <style>{`
        @keyframes floatPrompt {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-float-prompt {
          animation: floatPrompt 3.2s ease-in-out infinite;
        }
        .animate-float-prompt:hover {
          animation-play-state: paused;
        }
        @keyframes floatFull {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-float-full {
          animation: floatFull 3.6s ease-in-out infinite;
        }
      `}</style>
      {}
      <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none transition-opacity duration-1000 transform-gpu will-change-[opacity] ${
        introStage === "ready" ? "opacity-100" : "opacity-0"
      }`}>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-[center_25%] opacity-90 filter brightness-105 contrast-110 select-none transform-gpu"
        >
          <source src="/trailers/doctor-doom.3840x2160.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-[#000000]/25" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#000000_90%)]" />
      </div>

      {}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[1]" />

      {}
      <div
        className={`fixed top-0 inset-x-0 h-32 pointer-events-none z-20 bg-gradient-to-b from-[#020204]/90 via-[#020204]/60 to-transparent backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)] transition-opacity duration-1000 ${
          introStage === "ready" ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      {}
      <div
        className="fixed top-[22px] sm:top-[26px] left-1/2 z-40 pointer-events-none flex items-center justify-center text-center w-full max-w-full px-2 sm:px-4 will-change-transform"
        style={{
          transform:
            introStage === "initial"
              ? "translate3d(-50%, calc(50vh - 50px), 0) scale3d(0.92, 0.92, 1)"
              : introStage === "centered"
              ? "translate3d(-50%, calc(50vh - 50px), 0) scale3d(1.22, 1.22, 1)"
              : "translate3d(-50%, 0, 0) scale3d(1, 1, 1)",
          opacity: introStage === "initial" ? 0 : 1,
          transition: "transform 900ms cubic-bezier(0.16, 1, 0.3, 1), opacity 450ms ease-out",
        }}
      >
        <h1 className="font-mono uppercase text-stone-100 font-light drop-shadow-[0_0_16px_rgba(255,255,255,0.45)] inline-block whitespace-nowrap text-[7.5px] xs:text-[9px] sm:text-xs md:text-sm tracking-[0.2em] xs:tracking-[0.32em] sm:tracking-[0.5em] md:tracking-[0.65em] select-none">
          M A R V E L &nbsp; C I N E M A T I C &nbsp; U N I V E R S E
        </h1>
      </div>

      {}
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

        {}
        <div className="invisible text-[7px] xs:text-[8px] sm:text-xs md:text-sm font-mono tracking-[0.14em] xs:tracking-[0.24em] sm:tracking-[0.45em] md:tracking-[0.6em] uppercase whitespace-nowrap">
          M A R V E L &nbsp; C I N E M A T I C &nbsp; U N I V E R S E
        </div>

        {}
        <div className="w-6" />
      </header>

      {}
      <main className={`relative z-20 flex flex-col items-center justify-end w-full max-w-4xl mx-auto px-2 xs:px-4 mt-auto mb-3 overflow-visible transition-opacity duration-1000 ${
        introStage === "ready" ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}>

        {}
        {activePhase === null ? (

          <div className="relative flex flex-col items-center justify-center my-3 text-center px-4 animate-in fade-in duration-1000 min-h-[44px] transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] translate-y-4 sm:translate-y-6 mb-6">
            <button
              onClick={() => handleSelectPhase(1)}
              className="group relative animate-float-prompt text-xs sm:text-sm md:text-base font-mono tracking-[0.35em] sm:tracking-[0.45em] text-stone-200 hover:text-white uppercase font-medium hover:font-bold hover:scale-105 active:scale-95 transition-all duration-300 ease-out py-3 px-8 cursor-pointer bg-transparent border-none outline-none select-none flex items-center justify-center will-change-transform"
            >
              {/* Sketch-type hand-drawn circle / ellipse */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible opacity-50 group-hover:opacity-90 transition-opacity duration-300 scale-110 sm:scale-115"
                viewBox="0 0 340 60"
                fill="none"
                preserveAspectRatio="none"
              >
                {/* Primary organic sketched loop */}
                <path
                  d="M16 30 C 14 12, 60 5, 170 5 C 280 5, 326 14, 324 30 C 322 46, 270 55, 165 55 C 55 55, 18 45, 20 28 C 22 15, 68 7, 160 7 C 245 7, 318 16, 320 32"
                  stroke="rgba(255, 255, 255, 0.75)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Subtle sketch secondary overlay line */}
                <path
                  d="M26 34 C 24 16, 75 8, 175 8 C 275 8, 316 17, 314 32 C 312 47, 260 53, 160 53 C 65 53, 28 44, 30 30"
                  stroke="rgba(255, 255, 255, 0.35)"
                  strokeWidth="1.0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="relative z-10">SELECT PHASE &amp; MOVIE</span>
            </button>
          </div>
        ) : (

          <div className="flex flex-col items-center w-full animate-in fade-in zoom-in-95 duration-700 delay-200 animate-float-full will-change-transform">
            {}
            <div className="relative w-40 h-40 xs:w-48 xs:h-48 sm:w-52 sm:h-52 md:w-56 md:h-56 flex items-center justify-center my-1 transition-transform duration-700 ease-out hover:scale-105">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 200">
                <defs>
                  <radialGradient id="smoky-leaf-sel" cx="50%" cy="28%" r="75%">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.20)" />
                    <stop offset="60%" stopColor="rgba(255, 255, 255, 0.05)" />
                    <stop offset="100%" stopColor="rgba(0, 0, 0, 0.0)" />
                  </radialGradient>
                  <style>{`
                    @keyframes flowDotsClockwise {
                      0% { stroke-dashoffset: 0; }
                      100% { stroke-dashoffset: 50; }
                    }
                    @keyframes petalBreathe {
                      0%, 100% { opacity: 0.85; }
                      50% { opacity: 1; }
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
                        fill={isSelected ? "url(#smoky-leaf-sel)" : isHovered ? "rgba(255, 255, 255, 0.08)" : "transparent"}
                        stroke={isSelected ? "#ffffff" : isHovered ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.35)"}
                        strokeWidth={isSelected ? "1.8" : isHovered ? "1.4" : "1.0"}
                        strokeDasharray={isSelected ? "2.5, 3.5" : "1.8, 2.8"}
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
                        className="select-none pointer-events-none transition-all"
                      >
                        {leaf.phase}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {}
            <div className="flex items-center justify-center my-1.5 select-none w-full max-w-full px-2 overflow-x-auto overflow-y-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div ref={containerRef} className="relative inline-flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 px-3 py-1.5 overflow-visible">
                {}
                {pillBounds.width > 0 && (
                  <div
                    className="absolute rounded-full border border-dotted border-white/60 bg-white/[0.04] pointer-events-none z-0 transition-[width,left] duration-[750ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      left: `${pillBounds.left}px`,
                      width: `${pillBounds.width}px`,
                      height: `${pillBounds.height}px`,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />
                )}

                {}
                {activeBtnBounds.width > 0 && (
                  <div
                    className="absolute pointer-events-none z-10 rounded-full border border-dotted border-white/95 bg-white/[0.12] transition-[left,width,height] duration-[750ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      left: `${activeBtnBounds.left}px`,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: `${activeBtnBounds.width}px`,
                      height: `${activeBtnBounds.height}px`,
                    }}
                  />
                )}

                {}
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
                      className={`relative z-20 shrink-0 w-6 h-6 xs:w-7 xs:h-7 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-mono transition-colors duration-200 overflow-visible bg-transparent ${
                        isSelected
                          ? "text-white font-bold"
                          : isHovered
                          ? "text-white font-semibold"
                          : "text-stone-400 hover:text-stone-200"
                      }`}
                      title={movie.title}
                    >
                      <span className={`inline-flex items-center justify-center transition-transform duration-200 ${isSelected || isHovered ? "scale-110" : "scale-100"}`}>
                        {movieNum}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {}
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

            {/* CONTINUE CTA with Sketch Circle */}
            <div className="mt-2 mb-1 animate-in fade-in duration-700 delay-500 flex justify-center">
              <button
                onClick={handleContinue}
                className="group relative text-xs sm:text-sm font-mono tracking-[0.45em] sm:tracking-[0.55em] text-stone-200 hover:text-white uppercase font-medium hover:font-bold hover:scale-105 active:scale-95 transition-all duration-300 ease-out py-3 px-8 cursor-pointer bg-transparent border-none outline-none select-none flex items-center justify-center will-change-transform"
              >
                {/* Sketch-type hand-drawn circle / ellipse */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none overflow-visible opacity-50 group-hover:opacity-90 transition-opacity duration-300 scale-110 sm:scale-115"
                  viewBox="0 0 260 56"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  {/* Primary organic sketched loop */}
                  <path
                    d="M14 28 C 12 12, 45 5, 130 5 C 215 5, 248 13, 246 28 C 244 43, 205 51, 125 51 C 42 51, 15 42, 17 26 C 19 14, 52 7, 120 7 C 188 7, 242 15, 244 30"
                    stroke="rgba(255, 255, 255, 0.75)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Subtle sketch secondary overlay line */}
                  <path
                    d="M22 32 C 20 15, 58 7, 135 7 C 212 7, 240 15, 238 29 C 236 43, 195 49, 120 49 C 50 49, 23 41, 25 28"
                    stroke="rgba(255, 255, 255, 0.35)"
                    strokeWidth="1.0"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="relative z-10">C O N T I N U E</span>
              </button>
            </div>
          </div>
        )}

      </main>

      {}
      <footer className={`relative z-10 w-full px-6 sm:px-14 py-3 sm:py-4 flex items-center justify-end text-[9px] sm:text-[10px] font-mono tracking-[0.25em] uppercase text-stone-500 transition-all duration-700 ${
        introStage === "ready" && activePhase !== null ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-4"
      }`}>
        <div className="flex items-center gap-2 text-stone-400 select-none">
          <span className="tracking-[0.25em] font-mono text-[9px] sm:text-[10px] text-stone-400 font-bold uppercase">
            THE SACRED TIMELINE
          </span>
        </div>
      </footer>

      {}
      <SlideNavMenu isOpen={navOpen} onClose={() => setNavOpen(false)} />
    </div>
  );
}
