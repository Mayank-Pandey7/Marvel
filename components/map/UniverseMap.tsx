"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { UNIFIED_MCU_TREE, PHASES_CONFIG, type MovieNode } from "@/data/movies";
import { useTimelineState } from "@/context/TimelineStateContext";
import NodeArtwork from "./NodeArtwork";
import PhaseSpine from "./PhaseSpine";
import SearchInvestigation from "./SearchInvestigation";
import DeepMovieDetail from "./DeepMovieDetail";
import SlideNavMenu from "@/components/dark/SlideNavMenu";
import { Search, ZoomIn, ZoomOut, RotateCcw, ArrowLeft, Globe } from "lucide-react";

export default function UniverseMap({
  onReturn,
  initialPhase = 1,
  targetMovieId,
}: {
  onReturn?: () => void;
  initialPhase?: number;
  targetMovieId?: string;
}) {
  const { currentPhase, setCurrentPhase } = useTimelineState();
  const [activePhase, setActivePhase] = useState<number>(initialPhase || currentPhase || 1);

  // Universe Camera State (Pan & Zoom on a 2000px wide by 10500px tall vertical cosmic tree)
  const [camera, setCamera] = useState({ x: 0, y: 0, scale: 0.58 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Selected & Hovered Movie Nodes
  const [selectedMovie, setSelectedMovie] = useState<MovieNode | null>(null);
  const [hoveredMovieId, setHoveredMovieId] = useState<string | null>(null);

  // Modals & Navigation
  const [searchOpen, setSearchOpen] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [isFullOverview, setIsFullOverview] = useState(false);

  // Direct ready state for instantaneous loading
  const [introStep, setIntroStep] = useState<"initial" | "centered" | "revealing" | "ready">("ready");

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sync with timeline context
  useEffect(() => {
    if (currentPhase && currentPhase !== activePhase) {
      setActivePhase(currentPhase);
    }
  }, [currentPhase]);

  // Current active Phase metadata
  const currentPhaseMeta = useMemo(() => {
    return PHASES_CONFIG.find((p) => p.id === activePhase) || PHASES_CONFIG[0];
  }, [activePhase]);

  // Global Keyboard Shortcuts (Press "/" or "Ctrl+K" for search, "Escape" to deselect)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !searchOpen) {
        e.preventDefault();
        setSearchOpen(true);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        if (selectedMovie) setSelectedMovie(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen, selectedMovie]);

  // DIRECT TO SPECIFIC PHASE (Frames comfortably with timeline tree trunk centered in viewport)
  const directToPhase = useCallback((phaseNum: number) => {
    const width = containerRef.current?.clientWidth || (typeof window !== "undefined" ? window.innerWidth : 1400);
    const targetMeta = PHASES_CONFIG.find((p) => p.id === phaseNum) || PHASES_CONFIG[0];
    
    const targetScale = 0.58;
    // Exactly center the 2000px wide timeline tree (trunk at X=1000) in middle of screen
    const targetX = width / 2 - 1000 * targetScale;
    // Frame so the Phase Heading banner is clearly visible right at the top
    const targetY = 120 - targetMeta.startY * targetScale;

    setCamera({ x: targetX, y: targetY, scale: targetScale });
    setActivePhase(phaseNum);
    setCurrentPhase(phaseNum);
    setSelectedMovie(null);
    setIsFullOverview(false);
  }, [setCurrentPhase]);

  // EARTH-616 FULL TIMELINE OVERVIEW (Shows the entire vertical tree)
  const showFullEarth616Timeline = useCallback(() => {
    const width = containerRef.current?.clientWidth || (typeof window !== "undefined" ? window.innerWidth : 1400);
    const height = containerRef.current?.clientHeight || (typeof window !== "undefined" ? window.innerHeight : 900);
    
    const scaleX = width / 2200;
    const scaleY = height / 10600;
    const targetScale = Math.min(scaleX, scaleY) * 0.96;

    const targetX = width / 2 - 1000 * targetScale;
    const targetY = height / 2 - 5200 * targetScale;

    setCamera({ x: targetX, y: targetY, scale: Math.max(targetScale, 0.08) });
    setSelectedMovie(null);
    setIsFullOverview(true);
  }, []);

  // Frame Timeline Tree Perfectly Centered in Viewport on Initial Entry from Home/Continue
  useEffect(() => {
    const width = containerRef.current?.clientWidth || (typeof window !== "undefined" ? window.innerWidth : 1400);
    const targetScale = 0.58;
    const targetX = width / 2 - 1000 * targetScale;

    if (targetMovieId) {
      const targetMovie = UNIFIED_MCU_TREE.find((m) => m.id === targetMovieId);
      if (targetMovie) {
        const targetY = 220 - targetMovie.y * targetScale;
        setCamera({ x: targetX, y: targetY, scale: targetScale });
        setActivePhase(targetMovie.phase);
        setCurrentPhase(targetMovie.phase);
        setSelectedMovie(null); // Keep modal closed so the tree section is visible!
        setIsFullOverview(false);
        return;
      }
    }

    const targetMeta = PHASES_CONFIG.find((p) => p.id === (initialPhase || 1)) || PHASES_CONFIG[0];
    const targetY = 120 - targetMeta.startY * targetScale;
    setCamera({ x: targetX, y: targetY, scale: targetScale });
    setActivePhase(initialPhase || 1);
    setCurrentPhase(initialPhase || 1);
    setSelectedMovie(null);
    setIsFullOverview(false);
  }, [initialPhase, targetMovieId, setCurrentPhase]);

  // Pan Camera to Center onto a Target Movie Node
  const focusOnMovie = useCallback((movie: MovieNode) => {
    setActivePhase(movie.phase);
    setCurrentPhase(movie.phase);

    if (!containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    const targetScale = 0.85;
    
    const targetX = clientWidth / 2 - movie.x * targetScale;
    const targetY = clientHeight / 2 - movie.y * targetScale;

    setCamera({ x: targetX, y: targetY, scale: targetScale });
    setSelectedMovie(movie);
    setIsFullOverview(false);
  }, [setCurrentPhase]);

  // Ambient Star Dust / Micro-Particle Canvas Animation
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

    const particles = Array.from({ length: 48 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
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

  // Mouse & Touch Pan Handling
  const touchStartRef = useRef<{ x: number; y: number; dist?: number }>({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button, a, input, aside, nav, header, [role='button'], .movie-detail-card, .no-map-drag")) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - camera.x, y: e.clientY - camera.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setCamera((prev) => ({
      ...prev,
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    }));
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest("button, a, input, aside, nav, header, [role='button'], .movie-detail-card, .no-map-drag")) return;
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX - camera.x, y: e.touches[0].clientY - camera.y });
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartRef.current = {
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
        dist,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      setCamera((prev) => ({
        ...prev,
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      }));
    } else if (e.touches.length === 2 && touchStartRef.current.dist) {
      const currentDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = currentDist / touchStartRef.current.dist;
      const newScale = Math.min(Math.max(camera.scale * factor, 0.08), 2.2);
      setCamera((prev) => ({
        ...prev,
        scale: newScale,
      }));
      touchStartRef.current.dist = currentDist;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    touchStartRef.current.dist = undefined;
  };

  const handleWheel = (e: React.WheelEvent) => {
    // If scrolling over an interactive panel (e.g. movie detail drawer, sidebar), don't zoom the background universe map
    if ((e.target as HTMLElement).closest("aside, nav, header, .movie-detail-card, .no-map-drag, [data-scrollable]")) {
      return;
    }
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    const newScale = Math.min(Math.max(camera.scale * zoomFactor, 0.08), 2.2);

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const newX = mouseX - (mouseX - camera.x) * (newScale / camera.scale);
    const newY = mouseY - (mouseY - camera.y) * (newScale / camera.scale);

    setCamera({ x: newX, y: newY, scale: newScale });
    setIsFullOverview(false);
  };

  // Set of connected movie IDs for highlighting
  const activeConnectedIds = useMemo(() => {
    const activeMovie = selectedMovie || (hoveredMovieId ? UNIFIED_MCU_TREE.find((m) => m.id === hoveredMovieId) : null);
    if (!activeMovie) return new Set<string>();

    const set = new Set<string>([activeMovie.id]);
    activeMovie.connections.forEach((c) => set.add(c.toId));
    UNIFIED_MCU_TREE.forEach((m) => {
      if (m.connections.some((c) => c.toId === activeMovie.id)) {
        set.add(m.id);
      }
    });
    return set;
  }, [selectedMovie, hoveredMovieId]);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onWheel={handleWheel}
      className="fixed inset-0 w-screen h-screen bg-[#020204] text-stone-300 select-none overflow-hidden font-sans cursor-grab active:cursor-grabbing touch-none"
    >
      {/* 1. Star Dust & Atmosphere Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,2,4,0.92)_100%)] pointer-events-none z-0" />

      {/* TOP AMBIENT FADING BLUR BACKGROUND MASK (TIGHT & COMPACT) */}
      <div
        className="fixed top-0 inset-x-0 h-20 pointer-events-none z-20 bg-gradient-to-b from-[#020204]/90 to-transparent backdrop-blur-sm [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] transition-opacity duration-700"
        aria-hidden="true"
      />

      {/* CINEMATIC ASCENDING BRAND TITLE (Preserved 100% on desktop, hidden on small screens) */}
      <div
        className="fixed z-40 pointer-events-none transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] hidden md:flex flex-col items-center justify-center text-center w-full max-w-full px-4"
        style={{
          left: "50%",
          top: "22px",
          transform: "translate(-50%, 0) scale(1, 1)",
          opacity: 1,
        }}
      >
        <h1
          className="font-mono uppercase text-stone-100 font-light drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] inline-block text-xs sm:text-sm md:text-base tracking-[0.45em] sm:tracking-[0.6em]"
        >
          M A R V E L &nbsp; C I N E M A T I C &nbsp; U N I V E R S E
        </h1>

        <p
          className="font-mono uppercase text-[9px] sm:text-[10px] tracking-[0.25em] text-stone-400 font-bold mt-1"
        >
          {isFullOverview
            ? "EARTH-616 SACRED TIMELINE TREE"
            : `PHASE ${currentPhaseMeta.roman} · ${currentPhaseMeta.title} (${currentPhaseMeta.years})`}
        </p>
      </div>

      {/* 2. TOP HEADER (LEFT & RIGHT CONTROLS) */}
      <header className="fixed top-0 inset-x-0 z-30 px-3 sm:px-6 md:px-10 py-3 sm:py-4 flex items-center justify-between pointer-events-none transition-opacity duration-1000">
        {/* Left: Minimalist Menu & Return Button */}
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          <button
            onClick={() => setNavMenuOpen(true)}
            className="text-stone-400 hover:text-white transition-colors p-2 cursor-pointer group flex items-center gap-2.5 rounded-full bg-black/50 border border-stone-800/80 hover:border-white/40 backdrop-blur-md shadow-lg"
            aria-label="Open Universe Navigation"
            title="Open Universe Navigation"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className="h-[1.5px] w-5 bg-current block group-hover:w-6 transition-all" />
              <span className="h-[1.5px] w-3.5 bg-current block group-hover:w-5 transition-all" />
            </div>
          </button>

          {onReturn && (
            <button
              onClick={onReturn}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-black/40 md:bg-transparent border border-stone-800/80 md:border-transparent hover:bg-white/5 text-stone-400 hover:text-white text-[10px] font-mono tracking-widest uppercase transition-all group cursor-pointer backdrop-blur-md md:backdrop-blur-none"
              title="Return to Timeline Selector"
            >
              <ArrowLeft size={12} className="text-stone-400 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">RETURN</span>
            </button>
          )}
        </div>

        {/* Mobile Center Brand (shown only on mobile <md) */}
        <div className="flex md:hidden flex-col items-center justify-center text-center pointer-events-auto">
          <span className="text-[11px] font-mono font-bold tracking-[0.4em] uppercase text-white">
            MARVEL
          </span>
          <span className="text-[8px] font-mono tracking-[0.2em] uppercase text-stone-400">
            {isFullOverview ? "TIMELINE TREE" : `PHASE ${currentPhaseMeta.roman}`}
          </span>
        </div>

        {/* Center Space Reserved for Ascending Title on Desktop */}
        <div className="hidden md:block w-1" />

        {/* Right: Search Button */}
        <button
          onClick={() => setSearchOpen(true)}
          className="pointer-events-auto inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-black/50 border border-stone-800/80 hover:border-white/50 text-stone-300 hover:text-white text-[10px] font-mono tracking-widest uppercase transition-all group cursor-pointer backdrop-blur-md shadow-lg"
          title="Search All Timeline Nodes (/ or Ctrl+K)"
        >
          <Search size={12} className="text-stone-400 group-hover:text-white transition-colors" />
          <span className="hidden sm:inline">SEARCH</span>
          <kbd className="hidden sm:inline-block text-[9px] font-mono px-1.5 py-0.2 bg-stone-900 border border-stone-800 rounded text-stone-400 ml-1">
            /
          </kbd>
        </button>
      </header>

      {/* 3. Phase Spine Side Indicator (With Earth-616 Root at Top and All MCU Earths Catalogue) */}
      <PhaseSpine
        currentPhase={activePhase}
        isFullOverview={isFullOverview}
        onSelectPhase={(p) => directToPhase(p)}
        onSelectEarth616={showFullEarth616Timeline}
      />

      {/* 4. Bottom Left Minimalist Controls (Zoom, Pan, Earth-616 Full Tree) */}
      <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-10 z-30 flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
        <button
          onClick={() => setCamera((prev) => ({ ...prev, scale: Math.min(prev.scale * 1.2, 2.2) }))}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 border border-stone-800 hover:border-white/60 text-stone-400 hover:text-white flex items-center justify-center text-xs transition-colors backdrop-blur-md cursor-pointer shadow-lg"
          title="Zoom In"
        >
          <ZoomIn size={13} />
        </button>
        <button
          onClick={() => setCamera((prev) => ({ ...prev, scale: Math.max(prev.scale * 0.8, 0.08) }))}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 border border-stone-800 hover:border-white/60 text-stone-400 hover:text-white flex items-center justify-center text-xs transition-colors backdrop-blur-md cursor-pointer shadow-lg"
          title="Zoom Out"
        >
          <ZoomOut size={13} />
        </button>
        <button
          onClick={showFullEarth616Timeline}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center text-xs transition-all backdrop-blur-md cursor-pointer shadow-lg ${
            isFullOverview
              ? "bg-white text-black border-white"
              : "bg-black/60 border-stone-800 hover:border-white/60 text-stone-400 hover:text-white"
          }`}
          title="Earth-616 Full Timeline Overview"
        >
          <Globe size={12} />
        </button>
        <button
          onClick={() => directToPhase(1)}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 border border-stone-800 hover:border-white/60 text-stone-400 hover:text-white flex items-center justify-center text-xs transition-colors backdrop-blur-md cursor-pointer shadow-lg"
          title="Direct to Phase I"
        >
          <RotateCcw size={12} />
        </button>
      </div>

      {/* 5. Bottom Right Timeline Status */}
      {/* Desktop text */}
      <div className="hidden md:block fixed bottom-6 right-10 z-30 pointer-events-none text-right font-mono text-[10px] text-stone-400 tracking-[0.25em] uppercase">
        <span className="text-white font-bold">
          {isFullOverview ? "EARTH-616 TIMELINE TREE" : `PHASE ${currentPhaseMeta.roman}`}
        </span>
        <span className="mx-2">•</span>
        <span>{isFullOverview ? "2008 — 2027" : currentPhaseMeta.years}</span>
        <span className="mx-2">•</span>
        <span className="text-stone-300 font-semibold">{UNIFIED_MCU_TREE.length} MOVIES ON TREE</span>
      </div>

      {/* Mobile compact badge */}
      <div className="md:hidden fixed bottom-4 right-4 z-30 pointer-events-none font-mono text-[8.5px] text-stone-400 tracking-wider uppercase bg-black/70 px-2.5 py-1 rounded-full border border-stone-800/80 backdrop-blur-md">
        <span className="text-white font-bold">
          {isFullOverview ? "ALL PHASES" : `PHASE ${currentPhaseMeta.roman}`}
        </span>
        <span className="mx-1.5">•</span>
        <span>{isFullOverview ? "2008–27" : currentPhaseMeta.years}</span>
      </div>

      {/* 6. CINEMATIC OPENING BACKGROUND DISSOLVE */}
      {introStep !== "ready" && (
        <div
          className={`fixed inset-0 z-30 pointer-events-none transition-opacity duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            introStep === "revealing" ? "opacity-0" : "opacity-100 bg-[#020204]"
          }`}
        />
      )}

      {/* 7. MASTER SPATIAL VERTICAL UNIVERSE CANVAS (2000px Wide by 10500px Tall) */}
      <div
        className="absolute top-0 left-0 w-[2000px] h-[10500px] pointer-events-none transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top-left"
        style={{
          transform: `translate3d(${camera.x}px, ${camera.y}px, 0) scale(${camera.scale})`,
        }}
      >
        {/* SVG Network: ONLY Interrelated Movie-to-Movie Narrative Threads & Phase Markers */}
        <svg
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
          viewBox="0 0 2000 10500"
        >
          <defs>
            <filter id="universe-line-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <style>{`
              @keyframes timelineFlow {
                0% { stroke-dashoffset: 60; }
                100% { stroke-dashoffset: 0; }
              }
              .flowing-connection {
                animation: timelineFlow 3s linear infinite;
              }
              .faint-connection {
                animation: timelineFlow 8s linear infinite;
              }
            `}</style>
          </defs>

          {/* Phase Era Pill Banners (Clickable to Direct to that Phase) */}
          {PHASES_CONFIG.map((p) => (
            <g
              key={`phase-divider-${p.id}`}
              onClick={() => directToPhase(p.id)}
              className="cursor-pointer pointer-events-auto group phase-banner"
            >
              <rect
                x="760"
                y={p.startY - 18}
                width="480"
                height="36"
                rx="18"
                fill="#05050a"
                stroke={activePhase === p.id && !isFullOverview ? "#ffffff" : "rgba(255, 255, 255, 0.25)"}
                strokeWidth={activePhase === p.id && !isFullOverview ? "1.8" : "1"}
                className="transition-all duration-300 group-hover:stroke-white group-hover:fill-[#0c0c14]"
              />

              <text
                x="1000"
                y={p.startY + 4}
                textAnchor="middle"
                fill={activePhase === p.id && !isFullOverview ? "#ffffff" : "#d4d4d8"}
                fontSize="12"
                fontFamily="monospace"
                fontWeight="bold"
                letterSpacing="0.25em"
                className="select-none transition-colors group-hover:fill-white"
              >
                PHASE {p.roman} · {p.title} ({p.years})
              </text>
            </g>
          ))}

          {/* ONLY INTERRELATED MOVIE-TO-MOVIE NARRATIVE THREADS */}
          {UNIFIED_MCU_TREE.flatMap((fromMovie) =>
            fromMovie.connections.map((conn) => {
              const toMovie = UNIFIED_MCU_TREE.find((m) => m.id === conn.toId);
              if (!toMovie) return null;

              const isDirectlyConnected =
                (selectedMovie && (selectedMovie.id === fromMovie.id || selectedMovie.id === toMovie.id)) ||
                (hoveredMovieId && (hoveredMovieId === fromMovie.id || hoveredMovieId === toMovie.id));

              const isDimmed =
                (selectedMovie || hoveredMovieId) && !isDirectlyConnected;

              // Organic smooth curved arc flowing directly between the two interrelated movies
              const midX = (fromMovie.x + toMovie.x) / 2 + (fromMovie.x < 1000 ? -60 : 60);
              const midY = (fromMovie.y + toMovie.y) / 2;

              const pathD = `M ${fromMovie.x} ${fromMovie.y} Q ${midX} ${midY} ${toMovie.x} ${toMovie.y}`;

              return (
                <g key={`conn-${fromMovie.id}-${toMovie.id}`}>
                  {isDirectlyConnected && (
                    <path
                      d={pathD}
                      fill="none"
                      stroke={fromMovie.color || "#ffffff"}
                      strokeWidth="3.5"
                      opacity="0.9"
                      filter="url(#universe-line-glow)"
                      strokeDasharray="6 6"
                      className="flowing-connection transition-all duration-500"
                    />
                  )}

                  <path
                    d={pathD}
                    fill="none"
                    stroke={
                      isDirectlyConnected
                        ? "#ffffff"
                        : isDimmed
                        ? "rgba(255, 255, 255, 0.04)"
                        : "rgba(255, 255, 255, 0.28)"
                    }
                    strokeWidth={isDirectlyConnected ? "2" : "1.2"}
                    strokeDasharray={isDirectlyConnected ? "4 4" : "3 5"}
                    className={`${isDirectlyConnected ? "flowing-connection" : "faint-connection"} transition-all duration-500`}
                  />
                </g>
              );
            })
          )}
        </svg>

        {/* Interactive Movie Nodes Positioned Vertically in Space */}
        {UNIFIED_MCU_TREE.map((movie) => {
          const isSelected = selectedMovie?.id === movie.id;
          const isHovered = hoveredMovieId === movie.id;
          const isConnected = activeConnectedIds.has(movie.id);
          const isFaded = (selectedMovie || hoveredMovieId) && !isConnected;

          return (
            <div
              key={movie.id}
              onClick={() => focusOnMovie(movie)}
              onMouseEnter={() => setHoveredMovieId(movie.id)}
              onMouseLeave={() => setHoveredMovieId(null)}
              className={`absolute cursor-pointer -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-all duration-500 pointer-events-auto movie-node-card ${
                isFaded ? "opacity-25 filter blur-[0.5px]" : "opacity-100"
              }`}
              style={{
                left: `${movie.x}px`,
                top: `${movie.y}px`,
              }}
            >
              {/* Circular Universe Node Core */}
              <div
                className={`relative rounded-full flex items-center justify-center transition-all duration-500 ${
                  isSelected
                    ? "w-28 h-28 sm:w-32 sm:h-32 shadow-[0_0_50px_rgba(255,255,255,0.4)] scale-110"
                    : isHovered
                    ? "w-24 h-24 sm:w-28 sm:h-28 shadow-[0_0_35px_rgba(255,255,255,0.25)] scale-105"
                    : "w-20 h-20 sm:w-24 sm:h-24 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                }`}
              >
                {/* Clean Glowing Aura Ring when Selected or Hovered */}
                {(isSelected || isHovered) && (
                  <span className="absolute -inset-2 rounded-full border border-white/60 animate-[spin_8s_linear_infinite]" />
                )}

                {/* Node Artwork Emblem */}
                <div className="w-full h-full rounded-full border border-stone-800 group-hover:border-white/80 transition-colors p-1 bg-black/80 backdrop-blur-md overflow-hidden">
                  <NodeArtwork movieId={movie.id} isActive={isSelected || isHovered} />
                </div>

                {/* Release Year Badge */}
                <div className="absolute -bottom-2 bg-black/90 border border-stone-800 px-2 py-0.5 rounded-full text-[9px] font-mono text-stone-300 group-hover:text-white group-hover:border-white/40 transition-colors shadow-md">
                  {movie.year}
                </div>
              </div>

              {/* Node Title & Hero Metadata */}
              <div
                className={`mt-4 flex flex-col items-center text-center transition-all duration-300 ${
                  isSelected ? "scale-105" : ""
                }`}
              >
                <h3
                  className={`font-mono text-xs sm:text-sm uppercase tracking-[0.2em] font-bold transition-colors ${
                    isSelected || isHovered ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" : "text-stone-300"
                  }`}
                >
                  {movie.title}
                </h3>
                <span className="text-[10px] font-mono text-stone-500 tracking-wider mt-0.5">
                  PHASE {movie.phase} · {movie.heroAlias}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 8. Deep Contextual Movie Detail Panel */}
      {selectedMovie && (
        <DeepMovieDetail
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onNavigateToConnectedMovie={(target) => focusOnMovie(target)}
        />
      )}

      {/* 9. Investigation Search Overlay Modal */}
      <SearchInvestigation
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectMovie={(movie) => focusOnMovie(movie)}
      />

      {/* 10. Slide-Out Navigation Menu */}
      <SlideNavMenu isOpen={navMenuOpen} onClose={() => setNavMenuOpen(false)} />
    </div>
  );
}
