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

  const [camera, setCamera] = useState({ x: 0, y: 0, scale: 0.58 });
  const cameraRef = useRef({ x: 0, y: 0, scale: 0.58 });
  const contentLayerRef = useRef<HTMLDivElement | null>(null);
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

  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    cameraRef.current = camera;
  }, [camera]);

  const updateCameraTransform = useCallback((newCamera: { x: number; y: number; scale: number }, isSmooth: boolean = false) => {
    cameraRef.current = newCamera;
    if (contentLayerRef.current) {
      contentLayerRef.current.style.transition = isSmooth ? "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)" : "none";
      contentLayerRef.current.style.transform = `translate3d(${newCamera.x}px, ${newCamera.y}px, 0) scale(${newCamera.scale})`;
    }
    setCamera(newCamera);
  }, []);

  const [selectedMovie, setSelectedMovie] = useState<MovieNode | null>(null);
  const [hoveredMovieId, setHoveredMovieId] = useState<string | null>(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [isFullOverview, setIsFullOverview] = useState(false);

  const [introStep, setIntroStep] = useState<"ready">("ready");
  const [isTreeVisible, setIsTreeVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsTreeVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentPhase && currentPhase !== activePhase) {
      setActivePhase(currentPhase);
    }
  }, [currentPhase]);

  const currentPhaseMeta = useMemo(() => {
    return PHASES_CONFIG.find((p) => p.id === activePhase) || PHASES_CONFIG[0];
  }, [activePhase]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {

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

  const directToPhase = useCallback((phaseNum: number) => {
    const width = containerRef.current?.clientWidth || (typeof window !== "undefined" ? window.innerWidth : 1400);
    const targetMeta = PHASES_CONFIG.find((p) => p.id === phaseNum) || PHASES_CONFIG[0];
    const isMobile = width < 768;

    const targetScale = isMobile ? Math.min(width / 720, 0.50) : 0.58;

    const targetX = width / 2 - 1000 * targetScale;

    const targetY = (isMobile ? 70 : 120) - targetMeta.startY * targetScale;

    updateCameraTransform({ x: targetX, y: targetY, scale: targetScale }, true);
    setActivePhase(phaseNum);
    setCurrentPhase(phaseNum);
    setSelectedMovie(null);
    setIsFullOverview(false);
  }, [setCurrentPhase, updateCameraTransform]);

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
  }, [updateCameraTransform]);

  useEffect(() => {
    const width = containerRef.current?.clientWidth || (typeof window !== "undefined" ? window.innerWidth : 1400);
    const isMobile = width < 768;
    const targetScale = isMobile ? Math.min(width / 720, 0.50) : 0.58;
    const targetX = width / 2 - 1000 * targetScale;

    if (targetMovieId) {
      const targetMovie = UNIFIED_MCU_TREE.find((m) => m.id === targetMovieId);
      if (targetMovie) {
        const targetY = (isMobile ? 180 : 220) - targetMovie.y * targetScale;
        updateCameraTransform({ x: targetX, y: targetY, scale: targetScale }, false);
        setActivePhase(targetMovie.phase);
        setCurrentPhase(targetMovie.phase);
        setSelectedMovie(null);
        setIsFullOverview(false);
        return;
      }
    }

    const targetMeta = PHASES_CONFIG.find((p) => p.id === (initialPhase || 1)) || PHASES_CONFIG[0];
    const targetY = (isMobile ? 70 : 120) - targetMeta.startY * targetScale;
    updateCameraTransform({ x: targetX, y: targetY, scale: targetScale }, false);
    setActivePhase(initialPhase || 1);
    setCurrentPhase(initialPhase || 1);
    setSelectedMovie(null);
    setIsFullOverview(false);
  }, [initialPhase, targetMovieId, setCurrentPhase, updateCameraTransform]);

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
  }, [setCurrentPhase, updateCameraTransform]);

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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (searchOpen || (e.target as HTMLElement).closest("button, a, input, aside, nav, header, [role='button'], .movie-detail-card, .no-map-drag, .search-modal-container")) return;
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX - cameraRef.current.x,
      y: e.clientY - cameraRef.current.y,
    };
    if (contentLayerRef.current) {
      contentLayerRef.current.style.transition = "none";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const newX = e.clientX - dragStartRef.current.x;
    const newY = e.clientY - dragStartRef.current.y;
    cameraRef.current.x = newX;
    cameraRef.current.y = newY;
    if (contentLayerRef.current) {
      contentLayerRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0) scale(${cameraRef.current.scale})`;
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setCamera({ ...cameraRef.current });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (searchOpen || (e.target as HTMLElement).closest("button, a, input, aside, nav, header, [role='button'], .movie-detail-card, .no-map-drag, .search-modal-container")) return;
    if (contentLayerRef.current) {
      contentLayerRef.current.style.transition = "none";
    }

    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      isPinchingRef.current = false;
      dragStartRef.current = {
        x: e.touches[0].clientX - cameraRef.current.x,
        y: e.touches[0].clientY - cameraRef.current.y,
      };
    } else if (e.touches.length === 2) {
      isDraggingRef.current = false;
      isPinchingRef.current = true;
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const midX = (t1.clientX + t2.clientX) / 2;
      const midY = (t1.clientY + t2.clientY) / 2;

      touchStartRef.current = {
        dist: Math.max(dist, 10),
        initialScale: cameraRef.current.scale,
        midX,
        midY,
        initialCamX: cameraRef.current.x,
        initialCamY: cameraRef.current.y,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDraggingRef.current) {
      const newX = e.touches[0].clientX - dragStartRef.current.x;
      const newY = e.touches[0].clientY - dragStartRef.current.y;
      cameraRef.current.x = newX;
      cameraRef.current.y = newY;
      if (contentLayerRef.current) {
        contentLayerRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0) scale(${cameraRef.current.scale})`;
      }
    } else if (e.touches.length === 2 && isPinchingRef.current && touchStartRef.current.dist && touchStartRef.current.initialScale !== undefined) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const currentDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const currentMidX = (t1.clientX + t2.clientX) / 2;
      const currentMidY = (t1.clientY + t2.clientY) / 2;

      const scaleRatio = currentDist / touchStartRef.current.dist;
      const nextScale = Math.min(Math.max(touchStartRef.current.initialScale * scaleRatio, 0.08), 2.2);
      const zoomFactor = nextScale / touchStartRef.current.initialScale;

      const initialMidX = touchStartRef.current.midX || currentMidX;
      const initialMidY = touchStartRef.current.midY || currentMidY;
      const initialCamX = touchStartRef.current.initialCamX || cameraRef.current.x;
      const initialCamY = touchStartRef.current.initialCamY || cameraRef.current.y;

      const newX = currentMidX - (initialMidX - initialCamX) * zoomFactor;
      const newY = currentMidY - (initialMidY - initialCamY) * zoomFactor;

      cameraRef.current = { x: newX, y: newY, scale: nextScale };
      if (contentLayerRef.current) {
        contentLayerRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0) scale(${nextScale})`;
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      isPinchingRef.current = false;
      dragStartRef.current = {
        x: e.touches[0].clientX - cameraRef.current.x,
        y: e.touches[0].clientY - cameraRef.current.y,
      };
    } else if (e.touches.length === 0) {
      isDraggingRef.current = false;
      isPinchingRef.current = false;
      touchStartRef.current = {};
      setCamera({ ...cameraRef.current });
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (
      searchOpen ||
      (e.target as HTMLElement).closest(
        "aside, nav, header, .movie-detail-card, .no-map-drag, [data-scrollable], .search-modal-container"
      )
    ) {
      return;
    }
    e.preventDefault();
    const delta = Math.max(Math.min(e.deltaY, 120), -120);
    const zoomFactor = Math.exp(-delta * 0.0016);
    const nextScale = Math.min(Math.max(cameraRef.current.scale * zoomFactor, 0.08), 2.2);

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const newX = mouseX - (mouseX - cameraRef.current.x) * (nextScale / cameraRef.current.scale);
    const newY = mouseY - (mouseY - cameraRef.current.y) * (nextScale / cameraRef.current.scale);

    cameraRef.current = { x: newX, y: newY, scale: nextScale };
    if (contentLayerRef.current) {
      contentLayerRef.current.style.transition = "none";
      contentLayerRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0) scale(${nextScale})`;
    }

    if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    wheelTimeoutRef.current = setTimeout(() => {
      setCamera({ ...cameraRef.current });
    }, 60);

    if (isFullOverview) setIsFullOverview(false);
  };

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

    const targetScale = Math.min(cameraRef.current.scale * 1.35, 2.2);
    const newX = mouseX - (mouseX - cameraRef.current.x) * (targetScale / cameraRef.current.scale);
    const newY = mouseY - (mouseY - cameraRef.current.y) * (targetScale / cameraRef.current.scale);

    updateCameraTransform({ x: newX, y: newY, scale: targetScale }, true);
    setIsFullOverview(false);
  };

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
      onDoubleClick={handleDoubleClick}
      className="fixed inset-0 w-screen h-screen bg-[#000000] text-stone-300 select-none overflow-hidden font-sans cursor-grab active:cursor-grabbing touch-none"
    >
      {}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.95)_100%)] pointer-events-none z-0" />

      {}
      <div
        className="fixed top-0 inset-x-0 h-20 pointer-events-none z-20 bg-gradient-to-b from-[#000000]/90 to-transparent backdrop-blur-sm [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] transition-opacity duration-700"
        aria-hidden="true"
      />

      {}
      {}
      {}
      <header className="fixed top-0 inset-x-0 z-30 px-3 sm:px-8 py-2.5 sm:py-4 flex items-center justify-between pointer-events-none transition-opacity duration-1000">
        {}
        <div className="flex items-center gap-2 sm:gap-4 pointer-events-auto">
          <button
            onClick={() => setNavMenuOpen(true)}
            className="text-stone-400 hover:text-stone-200 transition-colors cursor-pointer p-1"
            aria-label="Open Universe Navigation"
            title="Open Universe Navigation"
          >
            <Menu size={16} />
          </button>

          {}
          <div className="hidden md:flex items-center gap-2 sm:gap-3">
            {onSwitchToFamilyTree && (
              <button
                onClick={onSwitchToFamilyTree}
                className="text-[9.5px] sm:text-[11px] font-mono tracking-[0.15em] sm:tracking-[0.25em] uppercase text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
                title="Switch to Sacred Family Tree Lineage View"
              >
                FAMILY TREE
              </button>
            )}
            <span className="text-stone-600 font-mono text-[9.5px] sm:text-[11px]">/</span>
            <button
              className="text-[9.5px] sm:text-[11px] font-mono tracking-[0.15em] sm:tracking-[0.25em] uppercase text-stone-200 font-semibold transition-colors cursor-pointer"
              title="Sacred Timeline Map View"
            >
              TIMELINE MAP
            </button>
          </div>
        </div>

        {}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-auto flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-3">
          <Link
            href="/timeline"
            className="text-[11px] xs:text-xs sm:text-sm md:text-base font-mono font-bold tracking-[0.25em] xs:tracking-[0.35em] sm:tracking-[0.45em] uppercase text-white scale-110 transition-all select-none"
            title="MCU Timeline Map"
          >
            MARVEL
          </Link>
          <span className="text-stone-600 font-mono text-xs select-none">|</span>
          <button
            onClick={triggerDoomsdayTransition}
            className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm font-mono font-bold tracking-[0.25em] xs:tracking-[0.35em] sm:tracking-[0.45em] uppercase text-emerald-400/80 hover:text-emerald-300 hover:scale-105 drop-shadow-[0_0_12px_rgba(52,211,153,0.35)] transition-all select-none cursor-pointer bg-transparent border-none"
            title="Initialize Road to Doomsday Incursion"
          >
            DOOMSDAY
          </button>
        </div>

        {}
        <div className="flex items-center gap-2 sm:gap-4 pointer-events-auto">
          {onReturn && (
            <button
              onClick={onReturn}
              className="inline-flex items-center gap-1.5 text-stone-400 hover:text-stone-200 text-[9.5px] sm:text-[11px] font-mono tracking-[0.15em] sm:tracking-[0.25em] uppercase transition-colors group cursor-pointer"
              title="Return to Timeline Selector"
            >
              <ArrowLeft size={11} className="text-stone-500 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">RETURN</span>
            </button>
          )}

          <button
            onClick={() => setSearchOpen(true)}
            className="inline-flex items-center gap-1.5 text-stone-400 hover:text-stone-200 text-[9.5px] sm:text-[11px] font-mono tracking-[0.15em] sm:tracking-[0.25em] uppercase transition-colors group cursor-pointer p-1"
            title="Search All Timeline Nodes (/ or Ctrl+K)"
          >
            <Search size={13} className="text-stone-500 group-hover:text-stone-200 transition-colors" />
            <span className="hidden sm:inline">SEARCH</span>
            <kbd className="hidden md:inline-block text-[9px] font-mono text-stone-500 ml-0.5">
              /
            </kbd>
          </button>
        </div>
      </header>

      {}
      <PhaseSpine
        currentPhase={activePhase}
        isFullOverview={isFullOverview}
        onSelectPhase={(p) => directToPhase(p)}
        onSelectEarth616={showFullEarth616Timeline}
      />

      {}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-10 z-30 flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
        <button
          onClick={() => {
            const nextScale = Math.min(cameraRef.current.scale * 1.30, 2.2);
            if (!containerRef.current) return;
            const cx = containerRef.current.clientWidth / 2;
            const cy = containerRef.current.clientHeight / 2;
            const newX = cx - (cx - cameraRef.current.x) * (nextScale / cameraRef.current.scale);
            const newY = cy - (cy - cameraRef.current.y) * (nextScale / cameraRef.current.scale);
            updateCameraTransform({ x: newX, y: newY, scale: nextScale }, true);
            setIsFullOverview(false);
          }}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/80 hover:bg-stone-900 text-stone-400 hover:text-stone-200 flex items-center justify-center text-xs transition-colors backdrop-blur-md cursor-pointer shadow-lg"
          title="Zoom In"
        >
          <ZoomIn size={13} />
        </button>
        <button
          onClick={() => {
            const nextScale = Math.max(cameraRef.current.scale * 0.75, 0.08);
            if (!containerRef.current) return;
            const cx = containerRef.current.clientWidth / 2;
            const cy = containerRef.current.clientHeight / 2;
            const newX = cx - (cx - cameraRef.current.x) * (nextScale / cameraRef.current.scale);
            const newY = cy - (cy - cameraRef.current.y) * (nextScale / cameraRef.current.scale);
            updateCameraTransform({ x: newX, y: newY, scale: nextScale }, true);
            setIsFullOverview(false);
          }}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/80 hover:bg-stone-900 text-stone-400 hover:text-stone-200 flex items-center justify-center text-xs transition-colors backdrop-blur-md cursor-pointer shadow-lg"
          title="Zoom Out"
        >
          <ZoomOut size={13} />
        </button>
        <button
          onClick={showFullEarth616Timeline}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs transition-all backdrop-blur-md cursor-pointer shadow-lg ${
            isFullOverview
              ? "bg-white text-black font-bold"
              : "bg-black/80 hover:bg-stone-900 text-stone-400 hover:text-stone-200"
          }`}
          title="Earth-616 Full Timeline Overview"
        >
          <Globe size={12} />
        </button>
        <button
          onClick={() => directToPhase(1)}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/80 hover:bg-stone-900 text-stone-400 hover:text-stone-200 flex items-center justify-center text-xs transition-colors backdrop-blur-md cursor-pointer shadow-lg"
          title="Direct to Phase I"
        >
          <RotateCcw size={12} />
        </button>
      </div>

      {}
      <div
        ref={contentLayerRef}
        className={`absolute top-0 left-0 w-[2000px] h-[10500px] pointer-events-none origin-top-left will-change-transform ${
          isTreeVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: `translate3d(${camera.x}px, ${camera.y}px, 0) scale(${camera.scale})`,
        }}
      >
        {}
        <svg
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
          viewBox="0 0 2000 10500"
        >
          <defs>
            <style>{`
              @keyframes timelineFlow {
                0% { stroke-dashoffset: 24; }
                100% { stroke-dashoffset: 0; }
              }
              .flowing-connection {
                animation: timelineFlow 1.8s linear infinite;
              }
            `}</style>
          </defs>

          {}
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
                className="transition-all duration-300 group-hover:fill-[#0c0c14]"
              />

              <text
                x="1000"
                y={p.startY + 4}
                textAnchor="middle"
                fill={activePhase === p.id && !isFullOverview ? "rgba(228, 228, 231, 0.85)" : "#71717a"}
                fontSize="12"
                fontFamily="monospace"
                fontWeight="bold"
                letterSpacing="0.25em"
                className="select-none transition-colors group-hover:fill-stone-200"
              >
                PHASE {p.roman} · {p.title} ({p.years})
              </text>
            </g>
          ))}

          {}
          {UNIFIED_MCU_TREE.flatMap((fromMovie) =>
            fromMovie.connections.map((conn) => {
              const toMovie = UNIFIED_MCU_TREE.find((m) => m.id === conn.toId);
              if (!toMovie) return null;

              const isDirectlyConnected =
                (selectedMovie && (selectedMovie.id === fromMovie.id || selectedMovie.id === toMovie.id)) ||
                (hoveredMovieId && (hoveredMovieId === fromMovie.id || hoveredMovieId === toMovie.id));

              const isDimmed =
                (selectedMovie || hoveredMovieId) && !isDirectlyConnected;

              const midX = (fromMovie.x + toMovie.x) / 2 + (fromMovie.x < 1000 ? -60 : 60);
              const midY = (fromMovie.y + toMovie.y) / 2;

              const pathD = `M ${fromMovie.x} ${fromMovie.y} Q ${midX} ${midY} ${toMovie.x} ${toMovie.y}`;

              return (
                <g key={`conn-${fromMovie.id}-${toMovie.id}`}>
                  {isDirectlyConnected ? (
                    <>
                      <path
                        d={pathD}
                        fill="none"
                        stroke={fromMovie.color || "#ffffff"}
                        strokeWidth="2.5"
                        opacity="0.8"
                        strokeDasharray="6 6"
                        className="flowing-connection"
                      />
                      <path
                        d={pathD}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="1.8"
                        strokeDasharray="4 4"
                        className="flowing-connection"
                      />
                    </>
                  ) : (
                    <path
                      d={pathD}
                      fill="none"
                      stroke={
                        isDimmed
                          ? "rgba(255, 255, 255, 0.02)"
                          : "rgba(255, 255, 255, 0.12)"
                      }
                      strokeWidth="1"
                      strokeDasharray="3 5"
                    />
                  )}
                </g>
              );
            })
          )}
        </svg>

        {}
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
                isFaded ? "opacity-25 filter blur-[0.6px]" : "opacity-100"
              }`}
              style={{
                left: `${movie.x}px`,
                top: `${movie.y}px`,
                zIndex: isSelected ? 45 : isHovered ? 40 : 10,
              }}
            >
              {}
              {isHovered && !isSelected && (
                <div className="absolute bottom-[115%] left-1/2 -translate-x-1/2 mb-3 w-[340px] pointer-events-none z-50 animate-in fade-in zoom-in-95 duration-200 ease-out">
                  <div className="p-3.5 rounded-2xl bg-[#09090b]/95 border border-white/10 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] flex gap-3.5 text-left">
                    {}
                    <div className="w-20 aspect-[2/3] rounded-xl overflow-hidden bg-stone-900 shrink-0 shadow-xl border border-white/10 relative">
                      <img
                        src={MCU_POSTER_MAP[movie.id]?.poster || ""}
                        alt={movie.title}
                        loading="eager"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 border border-white/5 rounded-xl pointer-events-none" />
                    </div>

                    {}
                    <div className="flex flex-col justify-between min-w-0 flex-1 py-0.5">
                      {}
                      <div className="flex items-center justify-between text-[9px] font-mono tracking-wider uppercase">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-full bg-white/[0.06] text-stone-300 font-semibold border border-white/[0.08]">
                            PHASE {movie.phase}
                          </span>
                          <span className="text-stone-400">{movie.year}</span>
                        </div>
                        <span className="text-stone-500">{movie.runtime} MIN</span>
                      </div>

                      {}
                      <div className="my-1.5">
                        <h4 className="font-mono text-xs sm:text-sm font-semibold text-stone-200 uppercase tracking-wider leading-tight line-clamp-1">
                          {movie.title}
                        </h4>
                        <p className="text-[9.5px] font-mono tracking-wide uppercase text-stone-400 line-clamp-1 mt-0.5">
                          {movie.heroAlias} {movie.leadCharacter && `· ${movie.leadCharacter}`}
                        </p>
                      </div>

                      {}
                      <p className="text-[10px] font-sans italic text-stone-400 line-clamp-2 leading-snug">
                        &ldquo;{movie.tagline || movie.quote || movie.description}&rdquo;
                      </p>

                      {}
                      <div className="pt-2 mt-1 border-t border-white/10 flex items-center justify-between text-[8.5px] font-mono tracking-widest uppercase">
                        <span className="text-stone-500">
                          {movie.connections.length} {movie.connections.length === 1 ? "CONNECTION" : "CONNECTIONS"}
                        </span>
                        <span className="text-stone-300 font-semibold flex items-center gap-1">
                          EXPLORE <span className="text-[10px]">→</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {}
                  <div className="w-3 h-3 bg-[#09090b]/95 border-r border-b border-white/10 rotate-45 mx-auto -mt-1.5 shadow-lg" />
                </div>
              )}

              {}
              <div
                className={`relative rounded-full flex items-center justify-center transition-all duration-300 ${
                  isSelected
                    ? "w-28 h-28 sm:w-32 sm:h-32 scale-110 shadow-[0_0_25px_rgba(255,255,255,0.35)]"
                    : isHovered
                    ? "w-24 h-24 sm:w-28 sm:h-28 scale-110 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    : "w-20 h-20 sm:w-24 sm:h-24 shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                }`}
              >
                {}
                {(isSelected || isHovered) && (
                  <span className="absolute -inset-2 rounded-full border border-dotted border-white/35 animate-[spin_8s_linear_infinite]" />
                )}

                {}
                <div
                  className={`w-full h-full rounded-full border transition-colors p-0.5 bg-black overflow-hidden ${
                    isSelected || isHovered ? "border-white/70" : "border-stone-800"
                  }`}
                >
                  <NodeArtwork movieId={movie.id} isActive={isSelected || isHovered} />
                </div>

                {}
                <div
                  className={`absolute -bottom-2 bg-black/95 border px-2 py-0.5 rounded-full text-[9px] font-mono transition-colors shadow-md ${
                    isSelected || isHovered ? "border-white/40 text-stone-300 font-semibold" : "border-stone-800 text-stone-500"
                  }`}
                >
                  {movie.year}
                </div>
              </div>

              {}
              <div
                className={`mt-4 flex flex-col items-center text-center transition-all duration-300 ${
                  isSelected || isHovered ? "scale-105" : ""
                }`}
              >
                <h3
                  className={`font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-colors ${
                    isSelected || isHovered
                      ? "text-stone-200"
                      : "text-stone-400"
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

      {}
      {selectedMovie && (
        <DeepMovieDetail
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onNavigateToConnectedMovie={(target) => focusOnMovie(target)}
        />
      )}

      {}
      <SearchInvestigation
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectMovie={(movie) => focusOnMovie(movie)}
      />

      {}
      <SlideNavMenu isOpen={navMenuOpen} onClose={() => setNavMenuOpen(false)} />
    </div>
  );
}
