"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { UNIFIED_MCU_TREE, PHASES_CONFIG, type MovieNode } from "@/data/movies";
import { useTimelineState } from "@/context/TimelineStateContext";
import NodeArtwork, { MCU_POSTER_MAP } from "./NodeArtwork";
import PhaseSpine from "./PhaseSpine";
import SearchInvestigation from "./SearchInvestigation";
import DeepMovieDetail from "./DeepMovieDetail";
import SlideNavMenu from "@/components/dark/SlideNavMenu";
import Link from "next/link";
import { useDoomsdayTransition } from "@/components/doomsday/DoomsdayTransition";
import { Search, ZoomIn, ZoomOut, RotateCcw, ArrowLeft, Globe, Menu, Users } from "lucide-react";

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

    // High-Performance GPU Direct Matrix Transform Engine (Zero Virtual DOM Overhead)
  const contentLayerRef = useRef<HTMLDivElement | null>(null);
  const camRef = useRef({ x: 0, y: 0, scale: 0.58 });
  const targetCamRef = useRef({ x: 0, y: 0, scale: 0.58 });
  const isDraggingRef = useRef(false);
  const isPinchingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const touchStartRef = useRef<{
    dist?: number;
    initialScale?: number;
    midX?: number;
    midY?: number;
    initialCamX?: number;
    initialCamY?: number;
  }>({});
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

      if (isSettled && !isDraggingRef.current && !isPinchingRef.current) {
        cam.x = tgt.x;
        cam.y = tgt.y;
        cam.scale = tgt.scale;
        applyTransform(cam.x, cam.y, cam.scale);
        animFrameIdRef.current = null;
        return;
      }

      cam.x += dx * 0.28;
      cam.y += dy * 0.28;
      cam.scale += ds * 0.28;

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
  const [isFullOverview, setIsFullOverview] = useState(false);

  // Direct ready state so title never overlaps the timeline tree
  const [introStep, setIntroStep] = useState<"ready">("ready");
  const [isTreeVisible, setIsTreeVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Smooth Cinematic Tree Entrance on Mount
  useEffect(() => {
    const timer = setTimeout(() => setIsTreeVisible(true), 50);
    if (contentLayerRef.current) {
      contentLayerRef.current.style.transform = `translate3d(${camRef.current.x}px, ${camRef.current.y}px, 0) scale(${camRef.current.scale})`;
    }
    return () => clearTimeout(timer);
  }, []);

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

  // Global Keyboard Shortcuts & Browser Page Zoom Interceptor
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent whole-page browser zoom on Ctrl + / Ctrl - / Ctrl 0
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "+" || e.key === "-" || e.key === "=" || e.key === "0" || e.key === "_")
      ) {
        e.preventDefault();
      }

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

    const handleWheelZoomPrevent = (e: WheelEvent) => {
      // Prevent browser whole-page zoom on Ctrl + Wheel
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheelZoomPrevent, { passive: false });
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheelZoomPrevent);
    };
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

    updateCameraTransform({ x: targetX, y: targetY, scale: targetScale }, true);
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

    updateCameraTransform({ x: targetX, y: targetY, scale: Math.max(targetScale, 0.08) }, true);
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
        updateCameraTransform({ x: targetX, y: targetY, scale: targetScale }, true);
        setActivePhase(targetMovie.phase);
        setCurrentPhase(targetMovie.phase);
        setSelectedMovie(null); // Keep modal closed so the tree section is visible!
        setIsFullOverview(false);
        return;
      }
    }

    const targetMeta = PHASES_CONFIG.find((p) => p.id === (initialPhase || 1)) || PHASES_CONFIG[0];
    const targetY = 120 - targetMeta.startY * targetScale;
    updateCameraTransform({ x: targetX, y: targetY, scale: targetScale }, true);
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

    updateCameraTransform({ x: targetX, y: targetY, scale: targetScale }, true);
    setSelectedMovie(movie);
    setIsFullOverview(false);
  }, [setCurrentPhase]);

  // Ambient Star Dust / Micro-Particle Canvas Animation
  

      // Ultra-Fast Hardware Pointer Engine for 120-240Hz zero-latency pan & zoom
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isPointerDown = false;
    let startX = 0;
    let startY = 0;
    let activePointerId: number | null = null;

    const onPointerDown = (e: PointerEvent) => {
      if (
        (e.target as HTMLElement).closest(
          "button, a, input, aside, nav, header, [role='button'], .movie-detail-card, .no-map-drag, .search-modal-container"
        )
      ) {
        return;
      }
      isPointerDown = true;
      activePointerId = e.pointerId;
      startX = e.clientX - camRef.current.x;
      startY = e.clientY - camRef.current.y;
      try {
        container.setPointerCapture(e.pointerId);
      } catch (_) {}
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isPointerDown) return;
      const newX = e.clientX - startX;
      const newY = e.clientY - startY;

      camRef.current.x = newX;
      camRef.current.y = newY;
      targetCamRef.current.x = newX;
      targetCamRef.current.y = newY;

      if (contentLayerRef.current) {
        contentLayerRef.current.style.transform = `translate3d(${newX.toFixed(1)}px, ${newY.toFixed(1)}px, 0) scale(${camRef.current.scale.toFixed(4)})`;
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (activePointerId === e.pointerId || isPointerDown) {
        isPointerDown = false;
        activePointerId = null;
        try {
          container.releasePointerCapture(e.pointerId);
        } catch (_) {}
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (
        (e.target as HTMLElement).closest(
          "aside, nav, header, .movie-detail-card, .no-map-drag, [data-scrollable], .search-modal-container"
        )
      ) {
        return;
      }
      e.preventDefault();

      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const currentScale = camRef.current.scale;
      const worldX = (mouseX - camRef.current.x) / currentScale;
      const worldY = (mouseY - camRef.current.y) / currentScale;

      const delta = Math.max(Math.min(e.deltaY, 100), -100);
      const zoomFactor = Math.exp(-delta * 0.0018);
      const nextScale = Math.min(Math.max(currentScale * zoomFactor, 0.08), 2.2);

      const nextX = mouseX - worldX * nextScale;
      const nextY = mouseY - worldY * nextScale;

      camRef.current = { x: nextX, y: nextY, scale: nextScale };
      targetCamRef.current = { x: nextX, y: nextY, scale: nextScale };

      if (contentLayerRef.current) {
        contentLayerRef.current.style.transform = `translate3d(${nextX.toFixed(1)}px, ${nextY.toFixed(1)}px, 0) scale(${nextScale.toFixed(4)})`;
      }
    };

    container.addEventListener("pointerdown", onPointerDown, { passive: true });
    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerup", onPointerUp, { passive: true });
    container.addEventListener("pointercancel", onPointerUp, { passive: true });
    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);
      container.removeEventListener("wheel", onWheel);
    };
  }, []);

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).closest(
        "button, a, input, aside, nav, header, [role='button'], .movie-detail-card, .phase-banner"
      )
    ) {
      return;
    }
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const currentScale = camRef.current.scale;
    const worldX = (mouseX - camRef.current.x) / currentScale;
    const worldY = (mouseY - camRef.current.y) / currentScale;

    const nextScale = Math.min(currentScale * 1.5, 2.2);
    const nextX = mouseX - worldX * nextScale;
    const nextY = mouseY - worldY * nextScale;

    updateCameraTransform({ x: nextX, y: nextY, scale: nextScale }, true);
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
      
      
      
      
      
      
      
      
      
      onDoubleClick={handleDoubleClick}
      className="fixed inset-0 w-screen h-screen bg-[#000000] text-stone-300 select-none overflow-hidden font-sans cursor-grab active:cursor-grabbing touch-none"
    >
      {/* 1. Star Dust & Atmosphere Canvas Layer */}
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.95)_100%)] pointer-events-none z-0" />

      {/* TOP AMBIENT FADING BLUR BACKGROUND MASK (TIGHT & COMPACT) */}
      <div
        className="fixed top-0 inset-x-0 h-20 pointer-events-none z-20 bg-gradient-to-b from-[#000000]/90 to-transparent backdrop-blur-sm [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] transition-opacity duration-700"
        aria-hidden="true"
      />



      {/* 2. TOP HEADER (LEFT & RIGHT CONTROLS) */}
      {/* ------------------------------------------------------------- */}
      {/* TOP HEADER: RESPONSIVE MATCH WITH DARKFAMILYTREE              */}
      {/* ------------------------------------------------------------- */}
      <header className="fixed top-0 inset-x-0 z-30 px-3 sm:px-8 py-2.5 sm:py-4 flex items-center justify-between pointer-events-none transition-opacity duration-1000">
        {/* Left: Minimalist Menu & Mode Switcher (Matching RETURN typography) */}
        <div className="flex items-center gap-3 sm:gap-4 pointer-events-auto">
          <button
            onClick={() => setNavMenuOpen(true)}
            className="text-stone-400 hover:text-white transition-colors cursor-pointer p-1"
            aria-label="Open Universe Navigation"
            title="Open Universe Navigation"
          >
            <Menu size={16} />
          </button>

          {/* View Mode Switcher (Matching RETURN style: borderless, font-mono tracking-widest) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {onSwitchToFamilyTree && (
              <button
                onClick={onSwitchToFamilyTree}
                className="text-[9.5px] sm:text-[11px] font-mono tracking-[0.15em] sm:tracking-[0.25em] uppercase text-stone-400 hover:text-white transition-colors cursor-pointer"
                title="Switch to Sacred Family Tree Lineage View"
              >
                FAMILY TREE
              </button>
            )}
            <span className="text-stone-600 font-mono text-[9.5px] sm:text-[11px]">/</span>
            <button
              className="text-[9.5px] sm:text-[11px] font-mono tracking-[0.15em] sm:tracking-[0.25em] uppercase text-white font-bold transition-colors cursor-pointer"
              title="Sacred Timeline Map View"
            >
              TIMELINE MAP
            </button>
          </div>
        </div>

        {/* Center: Mathematically Exact Centered MARVEL | DOOMSDAY Brand Header */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-auto flex items-center justify-center gap-2 sm:gap-3">
          <Link 
            href="/timeline" 
            className="text-[11px] sm:text-xs md:text-sm font-mono font-bold tracking-[0.35em] sm:tracking-[0.45em] uppercase text-white hover:text-white/80 transition-opacity select-none"
            title="MCU Timeline Map"
          >
            MARVEL
          </Link>
          <span className="text-stone-600 font-mono text-xs select-none">|</span>
          <button
            onClick={triggerDoomsdayTransition}
            className="text-[11px] sm:text-xs md:text-sm font-mono font-bold tracking-[0.35em] sm:tracking-[0.45em] uppercase text-emerald-400 hover:text-emerald-300 drop-shadow-[0_0_12px_rgba(52,211,153,0.5)]  select-none cursor-pointer bg-transparent border-none"
            title="Initialize Road to Doomsday Incursion"
          >
            DOOMSDAY
          </button>
        </div>

        {/* Right: Return + Search Button */}
        <div className="flex items-center gap-2 sm:gap-4 pointer-events-auto">
          {onReturn && (
            <button
              onClick={onReturn}
              className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white text-[9.5px] sm:text-[11px] font-mono tracking-[0.15em] sm:tracking-[0.25em] uppercase transition-colors group cursor-pointer"
              title="Return to Timeline Selector"
            >
              <ArrowLeft size={11} className="text-stone-500 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">RETURN</span>
            </button>
          )}

          <button
            onClick={() => setSearchOpen(true)}
            className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white text-[9.5px] sm:text-[11px] font-mono tracking-[0.15em] sm:tracking-[0.25em] uppercase transition-colors group cursor-pointer p-1"
            title="Search All Timeline Nodes (/ or Ctrl+K)"
          >
            <Search size={13} className="text-stone-500 group-hover:text-white transition-colors" />
            <span className="hidden sm:inline">SEARCH</span>
            <kbd className="hidden md:inline-block text-[9px] font-mono text-stone-500 ml-0.5">
              /
            </kbd>
          </button>
        </div>
      </header>

      {/* 3. Phase Spine Side Indicator (With Earth-616 Root at Top and All MCU Earths Catalogue) */}
      <PhaseSpine
        currentPhase={activePhase}
        isFullOverview={isFullOverview}
        onSelectPhase={(p) => directToPhase(p)}
        onSelectEarth616={showFullEarth616Timeline}
      />

      {/* 4. Bottom Controls (Zoom In/Out, Earth-616 Overview, Reset) - Positioned safely away from left PhaseSpine */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-10 z-30 flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
        <button
          onClick={() => {
            const nextScale = Math.min(targetCamRef.current.scale * 1.35, 2.2);
            if (!containerRef.current) return;
            const cx = containerRef.current.clientWidth / 2;
            const cy = containerRef.current.clientHeight / 2;
            const scaleRatio = nextScale / targetCamRef.current.scale;
            const newX = cx - (cx - targetCamRef.current.x) * scaleRatio;
            const newY = cy - (cy - targetCamRef.current.y) * scaleRatio;
            updateCameraTransform({ x: newX, y: newY, scale: nextScale }, true);
          }}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/80 border border-stone-800 hover:border-white/60 text-stone-400 hover:text-white flex items-center justify-center text-xs transition-colors backdrop-blur-md cursor-pointer shadow-lg"
          title="Zoom In"
        >
          <ZoomIn size={13} />
        </button>
        <button
          onClick={() => {
            const nextScale = Math.max(targetCamRef.current.scale * 0.72, 0.08);
            if (!containerRef.current) return;
            const cx = containerRef.current.clientWidth / 2;
            const cy = containerRef.current.clientHeight / 2;
            const scaleRatio = nextScale / targetCamRef.current.scale;
            const newX = cx - (cx - targetCamRef.current.x) * scaleRatio;
            const newY = cy - (cy - targetCamRef.current.y) * scaleRatio;
            updateCameraTransform({ x: newX, y: newY, scale: nextScale }, true);
          }}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/80 border border-stone-800 hover:border-white/60 text-stone-400 hover:text-white flex items-center justify-center text-xs transition-colors backdrop-blur-md cursor-pointer shadow-lg"
          title="Zoom Out"
        >
          <ZoomOut size={13} />
        </button>
        <button
          onClick={showFullEarth616Timeline}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center text-xs  backdrop-blur-md cursor-pointer shadow-lg ${
            isFullOverview
              ? "bg-white text-black border-white"
              : "bg-black/80 border-stone-800 hover:border-white/60 text-stone-400 hover:text-white"
          }`}
          title="Earth-616 Full Timeline Overview"
        >
          <Globe size={12} />
        </button>
        <button
          onClick={() => directToPhase(1)}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/80 border border-stone-800 hover:border-white/60 text-stone-400 hover:text-white flex items-center justify-center text-xs transition-colors backdrop-blur-md cursor-pointer shadow-lg"
          title="Direct to Phase I"
        >
          <RotateCcw size={12} />
        </button>
      </div>

      {/* 5. Bottom Timeline Status (Shifted safely above or next to controls) */}
      <div className="hidden lg:block fixed bottom-16 right-10 z-30 pointer-events-none text-right font-mono text-[9.5px] text-stone-400 tracking-[0.25em] uppercase">
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

      {/* 7. MASTER SPATIAL VERTICAL UNIVERSE CANVAS (2000px Wide by 10500px Tall) */}
      <div
        ref={contentLayerRef}
        className={`absolute top-0 left-0 w-[2000px] h-[10500px] pointer-events-none origin-top-left transform-gpu [backface-visibility:hidden] will-change-transform transition-opacity duration-500 ${
          isTreeVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* SVG Network: ONLY Interrelated Movie-to-Movie Narrative Threads & Phase Markers */}
        <svg
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none transform-gpu"
          viewBox="0 0 2000 10500"
          shapeRendering="optimizeSpeed"
        >
          <defs>
            <filter id="universe-line-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            
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
                className=" group-hover:stroke-white group-hover:fill-[#0c0c14]"
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
                      vectorEffect="non-scaling-stroke"
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
                    className={`${isDirectlyConnected ? "flowing-connection" : "faint-connection"} `}
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
              className={`absolute cursor-pointer -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group  pointer-events-auto movie-node-card ${
                isFaded ? "opacity-25 filter blur-[0.6px]" : "opacity-100"
              }`}
              style={{
                left: `${movie.x}px`,
                top: `${movie.y}px`,
                zIndex: isSelected ? 45 : isHovered ? 40 : 10,
              }}
            >
              {/* Minimalist TVA Cinematic Dossier Popover on Hover */}
              {isHovered && !isSelected && (
                <div className="absolute bottom-[115%] left-1/2 -translate-x-1/2 mb-3 w-[340px] pointer-events-none z-50 animate-in fade-in zoom-in-95 duration-200 ease-out">
                  <div className="p-3.5 rounded-2xl bg-[#09090b]/95 border border-white/15 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_25px_rgba(255,255,255,0.06)] flex gap-3.5 text-left">
                    {/* Official Movie Poster Thumbnail */}
                    <div className="w-20 aspect-[2/3] rounded-xl overflow-hidden bg-stone-900 shrink-0 shadow-xl border border-white/15 relative">
                      <img
                        src={MCU_POSTER_MAP[movie.id]?.poster || ""}
                        alt={movie.title}
                        loading="eager"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none" />
                    </div>

                    {/* Movie Information Column */}
                    <div className="flex flex-col justify-between min-w-0 flex-1 py-0.5">
                      {/* Header Row: Phase Badge + Year + Runtime */}
                      <div className="flex items-center justify-between text-[9px] font-mono tracking-wider uppercase">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-full bg-white/10 text-white font-bold border border-white/10">
                            PHASE {movie.phase}
                          </span>
                          <span className="text-stone-400 font-semibold">{movie.year}</span>
                        </div>
                        <span className="text-stone-500 font-medium">{movie.runtime} MIN</span>
                      </div>

                      {/* Title & Protagonist */}
                      <div className="my-1.5">
                        <h4 className="font-mono text-xs sm:text-sm font-bold text-white uppercase tracking-wider leading-tight line-clamp-1 drop-shadow-sm">
                          {movie.title}
                        </h4>
                        <p className="text-[9.5px] font-mono tracking-wide uppercase text-stone-400 line-clamp-1 mt-0.5">
                          {movie.heroAlias} {movie.leadCharacter && `· ${movie.leadCharacter}`}
                        </p>
                      </div>

                      {/* Tagline / Narrative Quote */}
                      <p className="text-[10px] font-sans italic text-stone-300 line-clamp-2 leading-snug">
                        &ldquo;{movie.tagline || movie.quote || movie.description}&rdquo;
                      </p>

                      {/* Footer: Links & Action Prompt */}
                      <div className="pt-2 mt-1 border-t border-white/10 flex items-center justify-between text-[8.5px] font-mono tracking-widest uppercase">
                        <span className="text-stone-400 font-medium">
                          {movie.connections.length} {movie.connections.length === 1 ? "CONNECTION" : "CONNECTIONS"}
                        </span>
                        <span className="text-white font-bold flex items-center gap-1">
                          EXPLORE <span className="text-[10px]">→</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Clean Subtle Glow Tip */}
                  <div className="w-3 h-3 bg-[#09090b]/95 border-r border-b border-white/15 rotate-45 mx-auto -mt-1.5 shadow-lg" />
                </div>
              )}

              {/* Circular Universe Node Core (Clean Minimal Monochrome) */}
              <div
                className={`relative rounded-full flex items-center justify-center  ${
                  isSelected
                    ? "w-28 h-28 sm:w-32 sm:h-32 scale-110 shadow-[0_0_40px_rgba(255,255,255,0.7)]"
                    : isHovered
                    ? "w-24 h-24 sm:w-28 sm:h-28 scale-110 shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                    : "w-20 h-20 sm:w-24 sm:h-24 shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                }`}
              >
                {/* Clean Dotted Orbit Ring on Hover or Select */}
                {(isSelected || isHovered) && (
                  <span className="absolute -inset-2 rounded-full border border-dotted border-white/70 animate-[spin_8s_linear_infinite]" />
                )}

                {/* Node Artwork Emblem */}
                <div
                  className={`w-full h-full rounded-full border transition-colors p-0.5 bg-black overflow-hidden ${
                    isSelected || isHovered ? "border-white" : "border-stone-800"
                  }`}
                >
                  <NodeArtwork movieId={movie.id} isActive={isSelected || isHovered} />
                </div>

                {/* Release Year Badge */}
                <div
                  className={`absolute -bottom-2 bg-black/95 border px-2 py-0.5 rounded-full text-[9px] font-mono transition-colors shadow-md ${
                    isSelected || isHovered ? "border-white text-white font-bold" : "border-stone-800 text-stone-400"
                  }`}
                >
                  {movie.year}
                </div>
              </div>

              {/* Node Title & Hero Metadata */}
              <div
                className={`mt-4 flex flex-col items-center text-center  ${
                  isSelected || isHovered ? "scale-105" : ""
                }`}
              >
                <h3
                  className={`font-mono text-xs uppercase tracking-[0.2em] font-bold transition-colors ${
                    isSelected || isHovered
                      ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                      : "text-stone-300"
                  }`}
                >
                  {movie.title}
                </h3>
                <span className="text-[9px] font-mono text-stone-500 tracking-wider mt-0.5 uppercase">
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
