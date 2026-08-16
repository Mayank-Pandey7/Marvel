"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useTimelineState } from "@/context/TimelineStateContext";
import { PHASES, MCU, MCUEntry } from "@/data/mcu";
import { Volume2, VolumeX } from "lucide-react";
import SlideNavMenu from "./SlideNavMenu";

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

// Exact Video Sources, Start Times & Marvel Studios Logo Stop Times
export const PHASE_TRAILERS: Record<number, {
  title: string;
  year: number;
  sources: string[];
  startTime: number;
  logoEndTime: number;
}> = {
  1: {
    title: "Avengers: Endgame (2019)",
    year: 2019,
    sources: [
      "/trailers/avengers-endgame.mp4",
      "/trailers/endgame-intro.mp4",
      "/media/trailers/avengers-endgame.mp4",
      "/media/trailers/Avengers_ Endgame _ Marvel Intro _ 2019 _ HD(1080P_60FPS).mp4",
    ],
    startTime: 2.0,
    logoEndTime: 36.2, // Marvel Studios Logo resolution
  },
  2: {
    title: "Avengers: Age of Ultron (2015)",
    year: 2015,
    sources: [
      "/trailers/Avengers_ Age of Ultron _ Marvel Intro _ 2015 _ HD(1080P_60FPS).mp4",
      "/media/trailers/Avengers_ Age of Ultron _ Marvel Intro _ 2015 _ HD(1080P_60FPS).mp4",
      "/trailers/avengers-age-of-ultron.mp4",
      "/media/trailers/avengers-age-of-ultron.mp4",
    ],
    startTime: 2.0,
    logoEndTime: 31.0, // Marvel Studios Logo resolution
  },
  3: {
    title: "Avengers: Infinity War (2018)",
    year: 2018,
    sources: [
      "/trailers/Avengers_ Infinity War _ Marvel Intro _ 2018 _ HD(1080P_60FPS).mp4",
      "/media/trailers/Avengers_ Infinity War _ Marvel Intro _ 2018 _ HD(1080P_60FPS).mp4",
      "/trailers/avengers-infinity-war.mp4",
      "/media/trailers/avengers-infinity-war.mp4",
    ],
    startTime: 2.0,
    logoEndTime: 35.0, // Marvel Studios Logo resolution
  },
  4: {
    title: "Black Panther: Wakanda Forever (2022)",
    year: 2022,
    sources: [
      "/trailers/Black Panther_ Wakanda Forever _ Marvel Intro _ 2022 _ 4K(1080P_60FPS).mp4",
      "/media/trailers/Black Panther_ Wakanda Forever _ Marvel Intro _ 2022 _ 4K(1080P_60FPS).mp4",
      "/trailers/black-panther.mp4",
      "/media/trailers/black-panther.mp4",
    ],
    startTime: 7.0, // Starts from 0:07
    logoEndTime: 35.0, // Marvel Studios Logo resolution
  },
  5: {
    title: "Thunderbolts* (2025)",
    year: 2025,
    sources: [
      "/trailers/Thunderbolts_ _ The New Avengers _ Marvel Intro _ 2025 _ HD(1080P_60FPS).mp4",
      "/media/trailers/Thunderbolts_ _ The New Avengers _ Marvel Intro _ 2025 _ HD(1080P_60FPS).mp4",
      "/trailers/thunderbolts.mp4",
      "/media/trailers/thunderbolts.mp4",
    ],
    startTime: 2.0,
    logoEndTime: 36.8, // Marvel Studios Logo resolution
  },
  6: {
    title: "Avengers: Endgame (2019)",
    year: 2019,
    sources: [
      "/trailers/avengers-endgame.mp4",
      "/trailers/endgame-intro.mp4",
      "/media/trailers/Avengers_ Endgame _ Marvel Intro _ 2019 _ HD(1080P_60FPS).mp4",
      "/media/trailers/avengers-endgame.mp4",
    ],
    startTime: 2.0,
    logoEndTime: 36.2, // Marvel Studios Logo resolution
  },
};

export default function DarkIntroSelector({
  onContinue,
}: {
  onContinue: (phase?: number, movieId?: string) => void;
}) {
  const { currentPhase, setCurrentPhase, toggleSound } = useTimelineState();
  const [activePhase, setActivePhase] = useState<number>(currentPhase || 1);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState<number>(0);
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);
  const [hoveredMovieIndex, setHoveredMovieIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState<boolean>(true);
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
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (currentPhase) {
      setActivePhase(currentPhase);
    }
  }, [currentPhase]);

  // Movies for the currently CLICKED active phase
  const currentPhaseMovies: MCUEntry[] = useMemo(() => {
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

  // Switch phase trailer video when clicked and play with audio
  const handleSelectPhase = (p: number) => {
    setActivePhase(p);
    setCurrentPhase(p);
    setSelectedMovieIndex(0);

    const config = PHASE_TRAILERS[p] || PHASE_TRAILERS[6];
    const targetStart = config.startTime ?? 2.0;

    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.currentTime = targetStart;
      videoRef.current.muted = false;
      videoRef.current.volume = 1.0;
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      });
    }
  };

  const handleToggleAudio = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextState = !isAudioActive;
    setIsAudioActive(nextState);
    if (videoRef.current) {
      videoRef.current.muted = !nextState;
      videoRef.current.volume = nextState ? 1.0 : 0.0;
      if (nextState) {
        videoRef.current.play().catch(() => {});
      }
    }
    toggleSound();
  };

  // Unmute on first user interaction anywhere
  useEffect(() => {
    const enableAudioOnInteraction = () => {
      if (videoRef.current && isAudioActive) {
        videoRef.current.muted = false;
        videoRef.current.volume = 1.0;
      }
    };
    window.addEventListener("click", enableAudioOnInteraction, { once: true });
    window.addEventListener("keydown", enableAudioOnInteraction, { once: true });
    return () => {
      window.removeEventListener("click", enableAudioOnInteraction);
      window.removeEventListener("keydown", enableAudioOnInteraction);
    };
  }, [isAudioActive]);

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

  const currentPhaseMeta = PHASES[activePhase - 1] || PHASES[5];
  const activeMovie = currentPhaseMovies[selectedMovieIndex] || currentPhaseMovies[0];
  const activeTrailerConfig = PHASE_TRAILERS[activePhase] || PHASE_TRAILERS[6];

  const handleContinue = () => {
    setIsTransitioning(true);
    setCurrentPhase(activePhase);
    setTimeout(() => {
      onContinue(activePhase, activeMovie?.id);
    }, 450);
  };

  return (
    <div
      className={`fixed inset-0 w-screen h-screen max-h-screen z-50 flex flex-col justify-between select-none bg-[#020204] text-stone-300 overflow-hidden font-sans transition-opacity duration-500 ${
        isTransitioning ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Cinematic Background Video Layer with Audio Soundtrack for Every Trailer */}
      <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none transition-opacity duration-1000 ${
        introStage === "ready" ? "opacity-100" : "opacity-0"
      }`}>
        <video
          key={activePhase}
          ref={videoRef}
          autoPlay
          loop={false}
          muted={!isAudioActive}
          playsInline
          preload="auto"
          onLoadedMetadata={(e) => {
            const vid = e.currentTarget;
            vid.currentTime = activeTrailerConfig.startTime ?? 2.0;
            vid.volume = 1.0;
          }}
          onCanPlay={(e) => {
            const vid = e.currentTarget;
            if (isAudioActive) {
              vid.muted = false;
              vid.volume = 1.0;
            }
          }}
          onEnded={(e) => {
            const vid = e.currentTarget;
            vid.pause();
            if (activeTrailerConfig.logoEndTime) {
              vid.currentTime = activeTrailerConfig.logoEndTime;
            }
          }}
          onTimeUpdate={(e) => {
            const vid = e.currentTarget;
            const targetLogoEnd = activeTrailerConfig.logoEndTime ?? (vid.duration ? vid.duration - 0.4 : 0);
            if (targetLogoEnd > 0 && vid.currentTime >= targetLogoEnd) {
              vid.pause();
              vid.currentTime = targetLogoEnd;
            }
          }}
          className="w-full h-full object-cover opacity-60 filter brightness-95 contrast-125 transition-opacity duration-700"
        >
          {activeTrailerConfig.sources.map((src) => (
            <source key={src} src={src} type="video/mp4" />
          ))}
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-transparent to-[#020204]/70" />
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

      {/* CINEMATIC ASCENDING BRAND TITLE (Fades in center, then smoothly glides up to header) */}
      <div
        className="fixed z-40 pointer-events-none transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center text-center w-full max-w-full px-4"
        style={{
          left: "50%",
          top: introStage === "initial" || introStage === "centered" ? "50%" : "26px",
          transform:
            introStage === "initial"
              ? "translate(-50%, -50%) scale(0.92)"
              : introStage === "centered"
              ? "translate(-50%, -50%) scale(1.1)"
              : "translate(-50%, 0) scale(1)",
          opacity: introStage === "initial" ? 0 : 1,
        }}
      >
        <h1
          className={`font-mono uppercase text-stone-100 font-light drop-shadow-[0_0_18px_rgba(255,255,255,0.45)] transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            introStage === "centered"
              ? "text-sm sm:text-lg md:text-xl tracking-[0.5em] sm:tracking-[0.75em]"
              : "text-xs sm:text-sm md:text-base tracking-[0.42em] sm:tracking-[0.6em]"
          }`}
        >
          M A R V E L &nbsp; C I N E M A T I C &nbsp; U N I V E R S E
        </h1>
      </div>

      {/* TOP BAR */}
      <header className={`relative z-10 w-full px-6 sm:px-14 py-4 sm:py-6 flex items-center justify-between transition-opacity duration-1000 ${
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
        <div className="invisible text-xs sm:text-sm md:text-base font-mono tracking-[0.42em] sm:tracking-[0.6em] uppercase">
          M A R V E L &nbsp; C I N E M A T I C &nbsp; U N I V E R S E
        </div>

        {/* Spacer to keep center title balanced */}
        <div className="w-6" />
      </header>

      {/* BOTTOM-DOCKED INTERACTIVE CONTROLS */}
      <main className={`relative z-20 flex flex-col items-center justify-end w-full max-w-4xl mx-auto px-4 mt-auto mb-1 overflow-hidden transition-opacity duration-1000 ${
        introStage === "ready" ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}>
        
        {/* SACRED 6-BETEL-LEAF FLOWER */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 flex items-center justify-center my-0.5">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 200 200">
            <defs>
              <filter id="dark-triquetra-glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Charcoal Gray smoke fill above number with bright glowing white border */}
              <radialGradient id="smoky-leaf" cx="50%" cy="28%" r="75%">
                <stop offset="0%" stopColor="rgba(140, 140, 150, 0.45)" />
                <stop offset="48%" stopColor="rgba(80, 80, 90, 0.22)" />
                <stop offset="100%" stopColor="rgba(10, 10, 15, 0.0)" />
              </radialGradient>

              {/* Unified Clockwise Rotating Dotted Keyframe Animations */}
              <style>{`
                @keyframes flowDotsClockwise {
                  0% { stroke-dashoffset: 0; }
                  100% { stroke-dashoffset: 50; }
                }
                .flowing-dots {
                  animation: flowDotsClockwise 8s linear infinite;
                }
                .flowing-dots-active {
                  animation: flowDotsClockwise 5s linear infinite;
                }
              `}</style>
            </defs>

            {/* Render 6 Edge-Joined Betel Leaves */}
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
                    fill={isSelected ? "url(#smoky-leaf)" : isHovered ? "rgba(255, 255, 255, 0.08)" : "transparent"}
                    stroke={isSelected ? "#ffffff" : isHovered ? "rgba(255, 255, 255, 0.85)" : "rgba(255, 255, 255, 0.35)"}
                    strokeWidth={isSelected ? "1.6" : "1.0"}
                    strokeDasharray={isSelected ? "2.5, 3.5" : "1.8, 2.8"}
                    filter={isSelected ? "url(#dark-triquetra-glow)" : undefined}
                    className={`transition-all duration-300 ${isSelected ? "flowing-dots-active" : "flowing-dots"}`}
                  />

                  {/* Upright Phase Number */}
                  <text
                    x={leaf.textX}
                    y={leaf.textY}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={isSelected ? "#ffffff" : isHovered ? "#e4e4e7" : "#8e8e93"}
                    fontSize={isSelected ? "15" : "13"}
                    fontFamily="sans-serif"
                    fontWeight={isSelected ? "600" : "400"}
                    className="select-none pointer-events-none transition-all drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                  >
                    {leaf.phase}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* DYNAMIC PROGRESS CAPSULE TRACK (Pure Smooth Hardware-Accelerated Sliding Track) */}
        <div className="flex items-center justify-center my-1.5 select-none overflow-visible w-full max-w-full px-2">
          <div ref={containerRef} className="relative inline-flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 px-3 py-1.5 overflow-visible">
            
            {/* 1. Dynamic Progress Capsule Pill spanning [1 .. active] that slides & stretches purely via CSS */}
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

            {/* 2. Sliding Active Circle Ring that smoothly glides horizontally across the numbers */}
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

            {/* Movie Number Buttons (Zero sudden scaling, smooth color transitions) */}
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
                  className={`relative z-20 shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-mono transition-colors duration-400 overflow-visible bg-transparent ${
                    isSelected
                      ? "text-white font-bold"
                      : isHovered
                      ? "text-white"
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

        {/* ACTIVE MOVIE / SAGA CHRONOLOGY SUBTITLE */}
        <div className="text-center my-0.5 min-h-[34px] flex flex-col items-center justify-center px-4">
          <div className="text-[11px] sm:text-xs font-mono tracking-[0.2em] text-stone-100 uppercase font-bold flex items-center gap-2">
            <span>{String(selectedMovieIndex + 1).padStart(2, "0")} · {activeMovie?.title?.toUpperCase() || currentPhaseMeta.title}</span>
            <span className="text-stone-500 font-normal">({activeMovie?.year || currentPhaseMeta.years})</span>
          </div>
          <div className="text-[10px] text-stone-400 font-mono tracking-wider max-w-md line-clamp-1 mt-0.5">
            PHASE {currentPhaseMeta.roman} · {currentPhaseMeta.title}
          </div>
        </div>

        {/* MINIMALIST 'C O N T I N U E' ACTION BUTTON */}
        <div className="mt-1.5 mb-1">
          <button
            onClick={handleContinue}
            className="group relative px-6 py-2 text-[11px] font-mono tracking-[0.45em] sm:tracking-[0.55em] uppercase text-stone-300 hover:text-white transition-all flex items-center justify-center cursor-pointer"
          >
            <span className="relative z-10 transition-transform group-hover:scale-105 font-light drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
              C O N T I N U E
            </span>
          </button>
        </div>

      </main>

      {/* BOTTOM FOOTER BAR */}
      <footer className={`relative z-10 w-full px-6 sm:px-14 py-3 sm:py-4 flex items-center justify-between text-[10px] font-mono tracking-[0.25em] uppercase text-stone-500 transition-opacity duration-1000 ${
        introStage === "ready" ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}>
        <div className="flex items-center gap-6">
          <button
            onClick={handleToggleAudio}
            className="flex items-center gap-2 text-stone-300 hover:text-white transition-colors cursor-pointer"
            title="Toggle Trailer Sound"
          >
            {isAudioActive ? <Volume2 size={14} className="animate-pulse text-white" /> : <VolumeX size={14} className="text-stone-500" />}
            <span className={isAudioActive ? "text-white font-semibold" : "text-stone-500"}>
              {isAudioActive ? "SOUND ON" : "SOUND MUTED"}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-stone-400">
          <span>THE SACRED TIMELINE</span>
          <div className="flex items-end gap-0.5 h-3 ml-1.5">
            <span className="w-[1px] h-2 bg-white/60 animate-pulse" />
            <span className="w-[1px] h-3.5 bg-white shadow-[0_0_6px_#ffffff]" />
            <span className="w-[1px] h-1.5 bg-white/40" />
            <span className="w-[1px] h-2.5 bg-white/80" />
          </div>
        </div>
      </footer>

      {/* Slide-out Navigation Drawer Menu */}
      <SlideNavMenu isOpen={navOpen} onClose={() => setNavOpen(false)} />
    </div>
  );
}
