"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { UNIFIED_MCU_TREE, PHASES_CONFIG, MCU_MAJOR_EVENTS, MCU_EARTHS, type MovieNode, type MCUMajorEvent, type MCUEarth } from "@/data/movies";
import { useTimelineState } from "@/context/TimelineStateContext";
import { MCU_POSTER_MAP } from "./NodeArtwork";
import SearchInvestigation from "./SearchInvestigation";
import DeepMovieDetail from "./DeepMovieDetail";
import SlideNavMenu from "@/components/dark/SlideNavMenu";
import Link from "next/link";
import { useDoomsdayTransition } from "@/components/doomsday/DoomsdayTransition";
import { Search, Plus, Minus, RotateCcw, ArrowLeft, Menu, Crosshair, Star, MousePointer2, Lightbulb, PlusCircle } from "lucide-react";

export default function UniverseMap({
  onReturn,
  onSwitchToFamilyTree,
  initialPhase = 1,
  targetMovieId,
}: {
  onReturn?: () => void;
  onSwitchToFamilyTree?: () => void;
  initialPhase?: number;
  targetMovieId?: string;
}) {
  const { currentPhase, setCurrentPhase } = useTimelineState();
  const { triggerDoomsdayTransition } = useDoomsdayTransition();
  const [activePhase, setActivePhase] = useState<number>(initialPhase || currentPhase || 1);
  const [selectedEarthId, setSelectedEarthId] = useState<string>("earth-616");

  // Favorite Starred Movie IDs
  const [starredMovieIds, setStarredMovieIds] = useState<Set<string>>(new Set(["the-avengers", "endgame", "infinity-war"]));

  // High-Performance GPU Direct Matrix Transform Engine
  const contentLayerRef = useRef<HTMLDivElement | null>(null);
  const camRef = useRef({ x: 260, y: 15, scale: 0.92 });
  const targetCamRef = useRef({ x: 260, y: 15, scale: 0.92 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const animFrameIdRef = useRef<number | null>(null);

  const applyTransform = useCallback((x: number, y: number, scale: number) => {
    if (contentLayerRef.current) {
      contentLayerRef.current.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
    }
  }, []);

  const runSmoothGlide = useCallback(() => {
    if (animFrameIdRef.current !== null) return;

    const tick = () => {
      const cam = camRef.current;
      const tgt = targetCamRef.current;

      const dx = tgt.x - cam.x;
      const dy = tgt.y - cam.y;
      const ds = tgt.scale - cam.scale;

      const isSettled = Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1 && Math.abs(ds) < 0.0005;

      if (isSettled && !isDraggingRef.current) {
        cam.x = tgt.x;
        cam.y = tgt.y;
        cam.scale = tgt.scale;
        applyTransform(cam.x, cam.y, cam.scale);
        animFrameIdRef.current = null;
        return;
      }

      cam.x += dx * 0.22;
      cam.y += dy * 0.22;
      cam.scale += ds * 0.22;

      applyTransform(cam.x, cam.y, cam.scale);
      animFrameIdRef.current = requestAnimationFrame(tick);
    };

    animFrameIdRef.current = requestAnimationFrame(tick);
  }, [applyTransform]);

  const updateCameraTransform = useCallback(
    (newCamera: { x: number; y: number; scale: number }, isSmooth: boolean = false) => {
      targetCamRef.current = { ...newCamera };
      if (!isSmooth) {
        camRef.current = { ...newCamera };
        applyTransform(newCamera.x, newCamera.y, newCamera.scale);
      } else {
        runSmoothGlide();
      }
    },
    [applyTransform, runSmoothGlide]
  );

  // Selected & Hovered Movie Nodes
  const [selectedMovie, setSelectedMovie] = useState<MovieNode | null>(null);
  const [hoveredMovieId, setHoveredMovieId] = useState<string | null>(null);

  // Modals & Navigation
  const [searchOpen, setSearchOpen] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [isTreeVisible, setIsTreeVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Direct Phase Navigation (Horizontal glide)
  const directToPhase = useCallback(
    (phaseId: number) => {
      setActivePhase(phaseId);
      setCurrentPhase(phaseId);

      const targetPhase = PHASES_CONFIG.find((p) => p.id === phaseId) || PHASES_CONFIG[0];
      if (!containerRef.current) return;

      const targetScale = 0.92;
      const phaseStartX = targetPhase.startX;
      // Offset accounting for left sidebar width (~240px)
      const newX = 260 - phaseStartX * targetScale;
      const newY = 15;

      updateCameraTransform({ x: newX, y: newY, scale: targetScale }, true);
    },
    [setCurrentPhase, updateCameraTransform]
  );

  // Focus on specific movie
  const focusOnMovie = useCallback(
    (movie: MovieNode) => {
      setSelectedMovie(movie);
      setActivePhase(movie.phase);
      setCurrentPhase(movie.phase);

      if (!containerRef.current) return;
      const viewportWidth = containerRef.current.clientWidth;
      const viewportHeight = containerRef.current.clientHeight;
      const targetScale = 1.0;

      const newX = viewportWidth / 2 - movie.x * targetScale;
      const newY = viewportHeight / 2 - movie.y * targetScale;

      updateCameraTransform({ x: newX, y: newY, scale: targetScale }, true);
    },
    [setCurrentPhase, updateCameraTransform]
  );

  // Initial Mount centering
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTreeVisible(true);
      directToPhase(initialPhase || 1);
    }, 60);
    return () => clearTimeout(timer);
  }, [directToPhase, initialPhase]);

  // Current active Phase metadata
  const currentPhaseMeta = useMemo(() => {
    return PHASES_CONFIG.find((p) => p.id === activePhase) || PHASES_CONFIG[0];
  }, [activePhase]);

  // Active connected movie IDs
  const activeConnectedIds = useMemo(() => {
    const activeId = selectedMovie?.id || hoveredMovieId;
    if (!activeId) return new Set<string>();

    const connected = new Set<string>([activeId]);
    const current = UNIFIED_MCU_TREE.find((m) => m.id === activeId);

    if (current) {
      current.connections.forEach((conn) => connected.add(conn.toId));
      UNIFIED_MCU_TREE.forEach((m) => {
        if (m.connections.some((c) => c.toId === activeId)) {
          connected.add(m.id);
        }
      });
    }

    return connected;
  }, [selectedMovie, hoveredMovieId]);

  // Toggle favorite
  const toggleStarMovie = (e: React.MouseEvent, movieId: string) => {
    e.stopPropagation();
    setStarredMovieIds((prev) => {
      const next = new Set(prev);
      if (next.has(movieId)) next.delete(movieId);
      else next.add(movieId);
      return next;
    });
  };

  // Drag Event Listeners
  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest(".interactive-node, button, a")) return;
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX - targetCamRef.current.x,
      y: e.clientY - targetCamRef.current.y,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const newX = e.clientX - dragStartRef.current.x;
    const newY = e.clientY - dragStartRef.current.y;
    updateCameraTransform({ x: newX, y: newY, scale: targetCamRef.current.scale }, false);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (!containerRef.current) return;

    const zoomFactor = e.deltaY < 0 ? 1.12 : 0.9;
    const nextScale = Math.min(Math.max(targetCamRef.current.scale * zoomFactor, 0.35), 1.5);

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const scaleRatio = nextScale / targetCamRef.current.scale;
    const newX = mouseX - (mouseX - targetCamRef.current.x) * scaleRatio;
    const newY = mouseY - (mouseY - targetCamRef.current.y) * scaleRatio;

    updateCameraTransform({ x: newX, y: newY, scale: nextScale }, true);
  };

  // Expanded Universes List
  const UNIVERSES_LIST = [
    { id: "earth-616", name: "EARTH-616", subtitle: "Sacred Timeline" },
    { id: "earth-838", name: "EARTH-838", subtitle: "Doctor Strange 2" },
    { id: "earth-10005", name: "EARTH-10005", subtitle: "X-Men Universe" },
    { id: "earth-96283", name: "EARTH-96283", subtitle: "Spider-Verse" },
    { id: "earth-trn414", name: "EARTH-TRN414", subtitle: "The Batman Universe" },
  ];

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onWheel={handleWheel}
      className="relative w-screen h-screen overflow-hidden bg-[#040406] text-stone-100 select-none cursor-grab active:cursor-grabbing touch-none font-mono"
    >
      {/* 1. TOP MAIN HEADER */}
      <header className="fixed top-0 inset-x-0 z-40 px-4 sm:px-6 py-3 flex items-center justify-between pointer-events-none">
        {/* Left: View Mode Switcher */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={() => setNavMenuOpen(true)}
            className="text-stone-400 hover:text-white transition-colors cursor-pointer p-1"
            aria-label="Open Universe Navigation"
          >
            <Menu size={16} />
          </button>

          <div className="hidden sm:flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase">
            {onSwitchToFamilyTree && (
              <button
                onClick={onSwitchToFamilyTree}
                className="text-stone-400 hover:text-white transition-colors cursor-pointer"
              >
                FAMILY TREE
              </button>
            )}
            <span className="text-stone-600">/</span>
            <span className="text-white font-bold">TIMELINE MAP</span>
          </div>
        </div>

        {/* Center: MARVEL | DOOMSDAY Brand Header */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-auto flex items-center justify-center gap-2 sm:gap-2.5">
          <span className="text-xs sm:text-sm font-bold tracking-[0.4em] uppercase text-white select-none cursor-default">
            MARVEL
          </span>
          <span className="text-stone-600 text-xs select-none">|</span>
          <button
            onClick={triggerDoomsdayTransition}
            className="text-xs sm:text-sm font-bold tracking-[0.4em] uppercase text-[#10b981] hover:text-[#34d399] drop-shadow-[0_0_12px_rgba(16,185,129,0.5)] select-none cursor-pointer bg-transparent border-none"
            title="Initialize Road to Doomsday Incursion"
          >
            DOOMSDAY
          </button>
        </div>

        {/* Right: Search */}
        <div className="flex items-center gap-3 pointer-events-auto">
          {onReturn && (
            <button
              onClick={onReturn}
              className="hidden sm:inline-flex items-center gap-1.5 text-stone-400 hover:text-white text-[10px] tracking-[0.2em] uppercase transition-colors cursor-pointer"
            >
              <ArrowLeft size={12} />
              <span>RETURN</span>
            </button>
          )}

          <button
            onClick={() => setSearchOpen(true)}
            className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white text-[10px] tracking-[0.2em] uppercase transition-colors cursor-pointer p-1"
          >
            <Search size={13} />
            <span className="hidden sm:inline">SEARCH</span>
            <kbd className="hidden md:inline-block text-[9px] text-stone-500 ml-0.5">/</kbd>
          </button>
        </div>
      </header>

      {/* 2. LEFT SIDEBAR ("UNIVERSES") */}
      <aside className="fixed top-14 bottom-4 left-4 z-40 w-44 sm:w-48 bg-[#06060a]/90 border border-stone-800/90 rounded-2xl p-3 sm:p-4 backdrop-blur-xl shadow-2xl flex flex-col justify-between pointer-events-auto">
        <div className="flex flex-col gap-3">
          <span className="text-[9px] tracking-[0.25em] text-[#10b981] uppercase font-bold pl-1">
            UNIVERSES
          </span>

          <div className="flex flex-col gap-2.5">
            {UNIVERSES_LIST.map((u) => {
              const isSelected = selectedEarthId === u.id;
              return (
                <button
                  key={u.id}
                  onClick={() => setSelectedEarthId(u.id)}
                  className={`flex items-start gap-2.5 p-2 rounded-xl text-left transition-all duration-300 cursor-pointer border ${
                    isSelected
                      ? "bg-[#0b1d16] border-[#10b981]/90 text-white shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                      : "bg-transparent border-transparent text-stone-400 hover:text-stone-200 hover:bg-white/5"
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded-full mt-0.5 flex items-center justify-center shrink-0 border ${
                    isSelected ? "border-[#10b981]" : "border-stone-600"
                  }`}>
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />}
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-[10px] font-bold tracking-wider ${isSelected ? "text-white" : "text-stone-300"}`}>
                      {u.name}
                    </span>
                    <span className="text-[8px] text-stone-500 tracking-wide mt-0.5">
                      {u.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Add Universe Button */}
        <button
          onClick={() => alert("Multiverse portal registration active. Connect external timeline reality.")}
          className="w-full py-2 px-3 rounded-xl border border-[#10b981]/60 text-[#34d399] hover:bg-[#10b981]/10 text-[9px] tracking-widest uppercase font-bold flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.15)]"
        >
          <span>+ ADD UNIVERSE</span>
        </button>
      </aside>

      {/* 3. TOP PHASE TAB BAR (Horizontal Segmented Tabs) */}
      <div className="fixed top-13 left-52 sm:left-56 right-64 sm:right-72 z-30 flex items-center gap-2.5 overflow-x-auto no-scrollbar pointer-events-auto py-1">
        {PHASES_CONFIG.map((phase) => {
          const isActive = activePhase === phase.id;
          return (
            <button
              key={`phase-tab-${phase.id}`}
              onClick={() => directToPhase(phase.id)}
              className={`px-5 py-2 rounded-xl text-[10px] tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap cursor-pointer flex flex-col items-center justify-center shrink-0 border ${
                isActive
                  ? "bg-[#0b1d16] border-[#10b981] text-[#34d399] shadow-[0_0_20px_rgba(16,185,129,0.3)] font-bold"
                  : "bg-[#07070b]/80 border-stone-800 text-stone-400 hover:text-white hover:border-stone-600 backdrop-blur-md"
              }`}
            >
              <span className="text-[8.5px] opacity-80">PHASE {phase.roman}</span>
              <span className={isActive ? "text-white font-bold" : ""}>{phase.subtitle || phase.title}</span>
            </button>
          );
        })}
      </div>

      {/* 4. MASTER HORIZONTAL SPATIAL CANVAS (10,500px Wide) */}
      <div
        ref={contentLayerRef}
        className={`absolute top-0 left-0 w-[10500px] h-[1200px] pointer-events-none origin-top-left transform-gpu [backface-visibility:hidden] will-change-transform transition-opacity duration-500 ${
          isTreeVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* SVG Horizontal Spine Line & Connectors */}
        <svg
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
          viewBox="0 0 10500 1200"
          shapeRendering="optimizeSpeed"
        >
          <defs>
            <filter id="spine-glow-teal" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="spine-glow-purple" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Continuous Horizontal Timeline Mainline Spine */}
          <line
            x1="80"
            y1="230"
            x2="10350"
            y2="230"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="2.5"
          />

          {/* Spine Nodes & Drop Stems */}
          {UNIFIED_MCU_TREE.map((movie) => {
            const isAvengersHub = movie.id === "the-avengers" || movie.id === "avengers-aou" || movie.id === "infinity-war" || movie.id === "endgame" || movie.id === "avengers-doomsday" || movie.id === "avengers-secret-wars" || movie.id === "spiderman-no-way-home";
            const isConnected = activeConnectedIds.has(movie.id);

            // Skip rendering spine dot for secondary stacked rows (e.g. Captain America 2011)
            if (movie.id === "captain-america") {
              return (
                <g key={`spine-node-${movie.id}`}>
                  {/* Branch line from 2011 Thor column down to Captain America */}
                  <path
                    d={`M 880 430 H 880 V 680`}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.35)"
                    strokeWidth="1.5"
                  />
                </g>
              );
            }

            return (
              <g key={`spine-node-${movie.id}`}>
                {/* Year Label above spine */}
                <text
                  x={movie.x}
                  y="185"
                  textAnchor="middle"
                  fill={isAvengersHub ? "#ffffff" : "rgba(255, 255, 255, 0.7)"}
                  fontSize={isAvengersHub ? "15" : "13"}
                  fontWeight="bold"
                  letterSpacing="0.15em"
                  className="select-none"
                >
                  {movie.year}
                </text>

                {/* Spine Node Dot */}
                <circle
                  cx={movie.x}
                  cy="230"
                  r={isAvengersHub ? "7.5" : "5.5"}
                  fill="#030306"
                  stroke={isAvengersHub ? "#c084fc" : "#2dd4bf"}
                  strokeWidth="2.5"
                  filter={isAvengersHub ? "url(#spine-glow-purple)" : "url(#spine-glow-teal)"}
                />

                {/* Vertical Stem dropping from spine dot to card */}
                <line
                  x1={movie.x}
                  y1="237"
                  x2={movie.x}
                  y2="280"
                  stroke={isAvengersHub ? "#c084fc" : "rgba(255, 255, 255, 0.35)"}
                  strokeWidth="1.5"
                />

                {/* Multi-release 2011 branch connector */}
                {movie.id === "thor" && (
                  <path
                    d="M 880 340 H 880 V 580"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.35)"
                    strokeWidth="1.5"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* 5. HANGING MOVIE POSTER CARDS */}
        {UNIFIED_MCU_TREE.map((movie) => {
          const isSelected = selectedMovie?.id === movie.id;
          const isHovered = hoveredMovieId === movie.id;
          const isConnected = activeConnectedIds.has(movie.id);
          const isFaded = (selectedMovie || hoveredMovieId) && !isConnected;
          const isStarred = starredMovieIds.has(movie.id);
          const isAvengersHub = movie.id === "the-avengers" || movie.id === "avengers-aou" || movie.id === "infinity-war" || movie.id === "endgame" || movie.id === "avengers-doomsday" || movie.id === "avengers-secret-wars" || movie.id === "spiderman-no-way-home";

          // Major Event connected below
          const majorEvent = MCU_MAJOR_EVENTS.find((ev) => ev.connectedMovieId === movie.id);

          return (
            <React.Fragment key={`movie-card-group-${movie.id}`}>
              {/* Primary Movie Poster Card */}
              <div
                onClick={() => focusOnMovie(movie)}
                onMouseEnter={() => setHoveredMovieId(movie.id)}
                onMouseLeave={() => setHoveredMovieId(null)}
                className={`interactive-node absolute -translate-x-1/2 cursor-pointer pointer-events-auto transition-all duration-300 flex flex-col items-center ${
                  isFaded ? "opacity-25 filter blur-[0.6px]" : "opacity-100"
                } ${isSelected || isHovered ? "scale-105 z-30" : "z-10"}`}
                style={{
                  left: `${movie.x}px`,
                  top: `${movie.y - 100}px`,
                  width: "135px",
                }}
              >
                <div
                  className={`w-full rounded-2xl bg-[#09090f] overflow-hidden border transition-all duration-300 flex flex-col shadow-2xl ${
                    isAvengersHub
                      ? "border-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.45)]"
                      : isSelected || isHovered
                      ? "border-white shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                      : "border-stone-800/90 hover:border-stone-600"
                  }`}
                >
                  {/* Poster Image */}
                  <div className="w-full aspect-[2/3] relative bg-stone-900 overflow-hidden">
                    <img
                      src={MCU_POSTER_MAP[movie.id]?.poster || movie.posterUrl || ""}
                      alt={movie.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06060a] via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="p-2 pt-1 flex flex-col items-center text-center bg-[#06060a]">
                    <span className="text-[9.5px] font-bold tracking-widest text-[#38bdf8]">
                      {movie.year}
                    </span>
                    <h4 className="text-[10px] font-bold tracking-wider text-white uppercase line-clamp-1 mt-0.5">
                      {movie.shortTitle || movie.title}
                    </h4>

                    {/* Star Button */}
                    <button
                      onClick={(e) => toggleStarMovie(e, movie.id)}
                      className={`mt-1 text-xs transition-colors p-0.5 cursor-pointer ${
                        isStarred ? "text-yellow-400" : "text-stone-600 hover:text-stone-300"
                      }`}
                      title={isStarred ? "Favorited" : "Add to favorites"}
                    >
                      <Star size={11} fill={isStarred ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Major Event Connected Sub-Card (Gold border + Diamond node) */}
              {majorEvent && (
                <div
                  className="interactive-node absolute -translate-x-1/2 pointer-events-auto flex flex-col items-center z-10"
                  style={{
                    left: `${movie.x}px`,
                    top: `${movie.y + 160}px`,
                    width: "135px",
                  }}
                >
                  {/* Connector Diamond Node */}
                  <div className="w-2.5 h-2.5 bg-amber-400 rotate-45 mb-1.5 shadow-[0_0_10px_rgba(251,191,36,0.7)]" />

                  {/* Major Event Card */}
                  <div className="w-full rounded-2xl bg-[#0d0d12] overflow-hidden border border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.35)] flex flex-col">
                    <div className="w-full aspect-[16/10] relative bg-stone-900 overflow-hidden">
                      <img
                        src={majorEvent.image}
                        alt={majorEvent.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#09090e] via-transparent to-transparent pointer-events-none" />
                    </div>
                    <div className="p-2 pt-1 flex flex-col items-center text-center bg-[#09090e]">
                      <span className="text-[9px] font-bold tracking-widest text-amber-400">
                        {majorEvent.year}
                      </span>
                      <h4 className="text-[9.5px] font-bold tracking-wider text-white uppercase line-clamp-1">
                        {majorEvent.shortTitle}
                      </h4>
                      <span className="text-[7.5px] tracking-widest text-amber-400 uppercase mt-0.5 font-bold">
                        MAJOR EVENT
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* 6. RIGHT-SIDE HUD PANEL ("NOW VIEWING") */}
      <aside className="fixed top-13 right-4 sm:right-6 z-40 w-56 sm:w-60 bg-[#06060a]/90 border border-stone-800/90 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-2xl flex flex-col gap-3.5 pointer-events-auto">
        {/* Header section */}
        <div>
          <span className="text-[8.5px] tracking-[0.25em] text-[#10b981] uppercase font-bold">
            NOW VIEWING
          </span>
          <h2 className="text-base sm:text-lg font-black text-white tracking-widest uppercase mt-0.5">
            EARTH-616
          </h2>
          <span className="text-[9px] tracking-[0.2em] text-stone-400 uppercase">
            SACRED TIMELINE
          </span>
        </div>

        {/* Amber accent divider */}
        <div className="w-10 h-0.5 bg-amber-500/90 rounded-full" />

        {/* Phase Info */}
        <div className="flex flex-col gap-0.5">
          <span className="text-[9.5px] tracking-widest text-[#10b981] font-bold uppercase">
            PHASE {currentPhaseMeta.roman}
          </span>
          <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
            {currentPhaseMeta.title}
          </h3>
          <span className="text-[9.5px] text-stone-400 mt-0.5">
            {currentPhaseMeta.years}
          </span>
          <div className="mt-2 flex flex-col gap-0.5 text-[9.5px]">
            <span className="text-stone-300 font-semibold">{currentPhaseMeta.count} FILMS</span>
            <span className="text-purple-400 font-bold">{currentPhaseMeta.majorEvents || 1} MAJOR EVENT</span>
          </div>
        </div>

        {/* Timeline Navigation Controls */}
        <div className="pt-2 border-t border-stone-800 flex flex-col gap-1.5">
          <span className="text-[8px] tracking-[0.2em] text-[#10b981] uppercase font-bold">
            TIMELINE NAVIGATION
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                const nextScale = Math.max(targetCamRef.current.scale * 0.82, 0.35);
                updateCameraTransform({ ...targetCamRef.current, scale: nextScale }, true);
              }}
              className="flex-1 py-1.5 bg-stone-900/90 border border-stone-700 hover:border-white rounded-lg flex items-center justify-center text-xs text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <Minus size={13} />
            </button>
            <button
              onClick={() => {
                const nextScale = Math.min(targetCamRef.current.scale * 1.22, 1.5);
                updateCameraTransform({ ...targetCamRef.current, scale: nextScale }, true);
              }}
              className="flex-1 py-1.5 bg-stone-900/90 border border-stone-700 hover:border-white rounded-lg flex items-center justify-center text-xs text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="Zoom In"
            >
              <Plus size={13} />
            </button>
            <button
              onClick={() => directToPhase(activePhase)}
              className="flex-1 py-1.5 bg-stone-900/90 border border-stone-700 hover:border-white rounded-lg flex items-center justify-center text-xs text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="Center Active Phase"
            >
              <Crosshair size={13} />
            </button>
            <button
              onClick={() => directToPhase(1)}
              className="flex-1 py-1.5 bg-stone-900/90 border border-stone-700 hover:border-white rounded-lg flex items-center justify-center text-xs text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="Reset to Phase 1"
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>
      </aside>

      {/* 7. BOTTOM-RIGHT TIMELINE OVERVIEW (Scrubber Bar with Wave Lines) */}
      <div className="fixed bottom-4 right-4 sm:right-6 z-40 bg-[#06060a]/90 border border-stone-800/90 rounded-2xl px-4 py-2.5 backdrop-blur-xl shadow-2xl flex flex-col gap-1.5 pointer-events-auto w-60 sm:w-68">
        <div className="flex items-center justify-between text-[8px] tracking-widest text-stone-400 uppercase">
          <span>2008</span>
          <span className="text-[#10b981] font-bold">TIMELINE OVERVIEW</span>
          <span>2027</span>
        </div>

        {/* Visual Frequency / Timeline Waves */}
        <div className="relative h-6 w-full flex items-center justify-between gap-1 overflow-hidden cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickRatio = (e.clientX - rect.left) / rect.width;
            const phaseIndex = Math.min(Math.floor(clickRatio * 6) + 1, 6);
            directToPhase(phaseIndex);
          }}
        >
          {Array.from({ length: 32 }).map((_, i) => {
            const height = ((i * 7) % 16) + 6;
            const isPhaseSelected = Math.floor((i / 32) * 6) + 1 === activePhase;
            return (
              <div
                key={`wave-${i}`}
                className={`w-[2px] rounded-full transition-all duration-300 ${
                  isPhaseSelected ? "bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.8)]" : "bg-stone-700"
                }`}
                style={{ height: `${height}px` }}
              />
            );
          })}

          {/* Active Viewport Window Indicator */}
          <div
            className="absolute inset-y-0 border-2 border-[#10b981] rounded-lg pointer-events-none transition-all duration-300"
            style={{
              left: `${((activePhase - 1) / 6) * 100}%`,
              width: "16.66%",
            }}
          />
        </div>

        <span className="text-[7.5px] text-stone-500 tracking-wider text-center mt-0.5">
          👆 DRAG TO NAVIGATE
        </span>
      </div>

      {/* 8. BOTTOM LEGEND BAR */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none hidden md:flex items-center gap-6 bg-[#06060a]/90 border border-stone-800 px-5 py-2 rounded-full backdrop-blur-md text-[8.5px] tracking-wider uppercase text-stone-400">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full border-2 border-[#2dd4bf]" />
          <span>MOVIE</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full border-2 border-[#c084fc]" />
          <span>MAJOR EVENT</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 bg-amber-400 rotate-45" />
          <span>HISTORICAL EVENT</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-stone-500">------</span>
          <span>CONNECTION</span>
        </div>
      </div>

      {/* 9. BOTTOM-LEFT INTERACTIVE HELPER */}
      <div className="fixed bottom-4 left-52 sm:left-56 z-30 pointer-events-none flex items-center gap-2 text-[8.5px] tracking-[0.2em] uppercase text-stone-400 bg-black/60 px-3 py-1.5 rounded-full border border-stone-800/80 backdrop-blur-md">
        <MousePointer2 size={11} className="text-[#10b981]" />
        <span>HOVER ON A MOVIE TO SEE CONNECTIONS</span>
      </div>

      {/* 10. BOTTOM CENTER TIP */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden lg:flex items-center gap-1.5 text-[8px] tracking-wider uppercase text-stone-500">
        <Lightbulb size={10} className="text-stone-400" />
        <span>TIP: CLICK ON ANY MOVIE TO VIEW DETAILS, CAST, CONNECTIONS AND MORE.</span>
      </div>

      {/* 11. DEEP CONTEXTUAL MOVIE DETAIL PANEL */}
      {selectedMovie && (
        <DeepMovieDetail
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onNavigateToConnectedMovie={(target) => focusOnMovie(target)}
        />
      )}

      {/* 12. SEARCH MODAL */}
      <SearchInvestigation
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectMovie={(movie) => focusOnMovie(movie)}
      />

      {/* 13. SLIDE NAVIGATION MENU */}
      <SlideNavMenu
        isOpen={navMenuOpen}
        onClose={() => setNavMenuOpen(false)}
      />
    </div>
  );
}
