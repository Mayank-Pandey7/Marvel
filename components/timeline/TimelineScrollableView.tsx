"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import TimelineDoomsdayLayout from "@/components/timeline/TimelineDoomsdayLayout";
import MovieScene from "@/components/MovieScene";
import {
  Search,
  Menu,
  X,
  ExternalLink,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Layers,
} from "lucide-react";
import { UNIFIED_MCU_TREE, type MovieNode } from "@/data/movies";
import { useTimelineState } from "@/context/TimelineStateContext";
import SlideNavMenu from "@/components/dark/SlideNavMenu";
import SearchOverlay from "@/components/SearchOverlay";
import AmbientAudio from "@/components/dark/AmbientAudio";

// Configuration for Phase Eras
const TIMELINE_PHASES = [
  { id: 1, roman: "I", label: "PHASE I", title: "THE INFINITY SAGA — ORIGINS", years: "2008 — 2012", desc: "The birth of heroes, the formation of the Avengers, and the defense of New York." },
  { id: 2, roman: "II", label: "PHASE II", title: "THE INFINITY SAGA — ESCALATION", years: "2013 — 2015", desc: "Cosmic expansion, the fall of S.H.I.E.L.D., and the dawn of Ultron." },
  { id: 3, roman: "III", label: "PHASE III", title: "THE INFINITY SAGA — RECKONING", years: "2016 — 2019", desc: "Civil conflict, the Mad Titan's conquest, and the desperate Time Heist." },
  { id: 4, roman: "IV", label: "PHASE IV", title: "THE MULTIVERSE SAGA — NEW VOICES", years: "2021 — 2022", desc: "Multiversal ruptures, cosmic gods, and the rise of a new generation." },
  { id: 5, roman: "V", label: "PHASE V", title: "THE MULTIVERSE SAGA — FRACTURES", years: "2023 — 2025", desc: "Quantum realm incursions, temporal fraying, and anti-hero alliances." },
  { id: 6, roman: "VI", label: "PHASE VI", title: "THE MULTIVERSE SAGA — CONVERGENCE", years: "2025 — 2027", desc: "Battleworld approaches. Doom ascends as the multiverse collides." },
];

const PHASE_FILTERS = [
  { id: "all", label: "ALL PHASES (44)" },
  { id: 1, label: "PHASE I" },
  { id: 2, label: "PHASE II" },
  { id: 3, label: "PHASE III" },
  { id: 4, label: "PHASE IV" },
  { id: 5, label: "PHASE V" },
  { id: 6, label: "PHASE VI" },
];

import { MCU_POSTER_MAP } from "@/components/map/NodeArtwork";
import { MCU } from "@/data/mcu";

export function getMoviePoster(node: { id: string; posterUrl?: string }) {
  const posterEntry =
    MCU_POSTER_MAP[node.id] ||
    MCU_POSTER_MAP[node.id.toLowerCase()] ||
    MCU_POSTER_MAP[node.id.replace(/-/g, "")] ||
    MCU_POSTER_MAP[node.id.replace(/_/g, "-")];

  let poster = posterEntry?.poster || node.posterUrl || "";

  if (!poster || poster === "/images/posters/the-avengers.jpg") {
    if (node.id === "avengers" || node.id === "the-avengers") {
      return "https://image.tmdb.org/t/p/w780/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg";
    }
    const mcuItem = MCU.find((m) => m.id === node.id);
    if (mcuItem?.poster) poster = mcuItem.poster;
  }

  if (!poster) return "https://image.tmdb.org/t/p/w780/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg";

  // Automatically upgrade TMDB images to high-resolution w780
  if (poster.includes("image.tmdb.org/t/p/w500/")) {
    return poster.replace("/t/p/w500/", "/t/p/w780/");
  }
  if (poster.includes("image.tmdb.org/t/p/w300/")) {
    return poster.replace("/t/p/w300/", "/t/p/w780/");
  }

  return poster;
}

export default function TimelineScrollableView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentPhase, setCurrentPhase } = useTimelineState();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [activePhaseFilter, setActivePhaseFilter] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<MovieNode | null>(null);
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [layoutMode, setLayoutMode] = useState<'path' | 'wheel' | 'grid'>('path');

  // Synchronize Phase and Selected Movie from URL Query Params or State Context
  useEffect(() => {
    const phaseParam = searchParams.get("phase");
    const movieParam = searchParams.get("movie");

    if (phaseParam) {
      const p = parseInt(phaseParam, 10);
      if (p >= 1 && p <= 6) {
        setActivePhaseFilter(p);
        setCurrentPhase(p);
      }
    }

    if (movieParam) {
      const timer = setTimeout(() => {
        const target =
          document.getElementById(`movie-node-${movieParam}`) ||
          document.querySelector(`[data-movie-id="${movieParam}"]`) ||
          document.querySelector(`[href*="${movieParam}"]`);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [searchParams, setCurrentPhase]);

  // Global Keyboard Shortcuts for / and Ctrl+K / Cmd+K Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === "/" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setSearchOpen(true);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Animated starfield particles matching Family Tree background
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

  // All 44 canonical movies sorted by chronological phase & release order (1 to 44)
  const allMovies = useMemo(() => {
    return [...UNIFIED_MCU_TREE].sort((a, b) => {
      if (a.phase !== b.phase) return a.phase - b.phase;
      return a.order - b.order;
    });
  }, []);

  // Filtered movies
  const filteredMovies = useMemo(() => {
    let list = allMovies;
    if (activePhaseFilter !== "all") {
      list = list.filter((m) => m.phase === activePhaseFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.leadCharacter.toLowerCase().includes(q) ||
          m.heroAlias.toLowerCase().includes(q) ||
          String(m.year).includes(q)
      );
    }
    return list;
  }, [allMovies, activePhaseFilter, searchQuery]);

  // Group filtered movies by phase
  const moviesByPhase = useMemo(() => {
    const map = new Map<number, MovieNode[]>();
    TIMELINE_PHASES.forEach((p) => map.set(p.id, []));
    filteredMovies.forEach((m) => {
      const p = m.phase || 1;
      const arr = map.get(p) || [];
      arr.push(m);
      map.set(p, arr);
    });
    return map;
  }, [filteredMovies]);

  // Scroll to a specific Phase section
  const handleSelectPhase = (phaseId: number | "all") => {
    setActivePhaseFilter(phaseId);
    if (phaseId !== "all") {
      setCurrentPhase(phaseId);
      const el = document.getElementById(`phase-section-${phaseId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#000000] text-stone-300 font-sans selection:bg-white selection:text-black">
      {/* Background Starfield Canvas & Dark Vignette (Identical to Family Tree) */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.95)_100%)] pointer-events-none z-0" />

      {/* Header Backdrop (Balanced Subtle Transparent Blur - No Black Bar) */}
      <div
        className="fixed top-0 inset-x-0 h-20 sm:h-26 pointer-events-none z-40 bg-transparent backdrop-blur-xs sm:backdrop-blur-sm [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] transition-opacity duration-700"
        aria-hidden="true"
      />

      {/* 1. SYNCHRONIZED GLOBAL HEADER NAVBAR (INCREASED HEIGHT) */}
      <header className="fixed top-0 left-0 right-0 w-full px-4 sm:px-8 py-4 sm:py-6 min-h-[58px] sm:min-h-[72px] flex items-center justify-between z-50 bg-transparent pointer-events-none">
        {/* Left Side: Navigation Menu & Title Switcher */}
        <div className="flex items-center gap-2 sm:gap-4 pointer-events-auto">
          <button
            onClick={() => setNavMenuOpen(true)}
            className="text-stone-400 hover:text-white transition-colors cursor-pointer p-1.5"
            title="Open Universe Navigation"
            aria-label="Open Universe Navigation"
          >
            <Menu size={18} />
          </button>

          {/* Title Header */}
          <div className="hidden md:flex items-center gap-2 sm:gap-3">
            <span className="text-[10.5px] sm:text-[12px] font-mono tracking-[0.18em] sm:tracking-[0.28em] uppercase text-white font-bold select-none">
              TIMELINE
            </span>
            <span className="text-stone-600 font-mono text-[10.5px] sm:text-[12px]">/</span>
            <Link
              href="/familytree"
              className="text-[10.5px] sm:text-[12px] font-mono tracking-[0.18em] sm:tracking-[0.28em] uppercase text-stone-400 hover:text-white transition-colors cursor-pointer"
              title="Switch to Character Family Tree"
            >
              FAMILY TREE
            </Link>
          </div>
        </div>

        {/* Center: Brand Logo & DOOMSDAY Trigger */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-auto flex items-center justify-center gap-2 sm:gap-3.5">
          <Link
            href="/timeline"
            className="text-xs sm:text-sm md:text-base font-mono font-bold tracking-[0.3em] xs:tracking-[0.4em] sm:tracking-[0.5em] uppercase text-white hover:text-stone-300 transition-colors select-none cursor-pointer"
            title="Sacred Timeline"
          >
            MARVEL
          </Link>
          <span className="text-stone-600 font-mono text-sm select-none">|</span>
          <Link
            href="/doomsday"
            className="text-[11px] sm:text-xs md:text-sm font-mono font-bold tracking-[0.3em] xs:tracking-[0.4em] sm:tracking-[0.5em] uppercase text-emerald-400/80 hover:text-emerald-300 hover:scale-105 drop-shadow-[0_0_12px_rgba(52,211,153,0.35)] transition-all select-none cursor-pointer bg-transparent border-none"
            title="Explore Road to Doomsday"
          >
            DOOMSDAY
          </Link>
        </div>

        {/* Right Side: Phase Jump Switcher, Return & Search */}
        <div className="flex items-center gap-3 sm:gap-5 pointer-events-auto">
          {/* Phase Direct Jump Switcher */}
          <div className="hidden md:flex items-center gap-2 sm:gap-2.5">
            <span className="text-[10px] sm:text-[11.5px] font-mono tracking-[0.18em] sm:tracking-[0.28em] uppercase text-stone-500">
              PHASE:
            </span>
            <div className="flex items-center gap-1 sm:gap-1.5">
              {[1, 2, 3, 4, 5, 6].map((p) => (
                <button
                  key={p}
                  onClick={() => handleSelectPhase(p)}
                  className={`text-[10px] sm:text-[11.5px] font-mono tracking-[0.15em] transition-colors cursor-pointer px-1 py-0.5 ${
                    activePhaseFilter === p
                      ? "text-white font-bold"
                      : "text-stone-400 hover:text-white"
                  }`}
                  title={`Jump to Phase ${p}`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => handleSelectPhase("all")}
                className={`text-[10px] sm:text-[11.5px] font-mono tracking-[0.15em] transition-colors cursor-pointer px-1.5 py-0.5 ${
                  activePhaseFilter === "all"
                    ? "text-white font-bold"
                    : "text-stone-400 hover:text-white"
                }`}
                title="Show All Phases"
              >
                ALL
              </button>
            </div>
          </div>

          <button
            onClick={() => setSearchOpen(true)}
            className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white text-[10px] sm:text-[11.5px] font-mono tracking-[0.18em] sm:tracking-[0.28em] uppercase transition-colors group cursor-pointer p-1.5"
            title="Search MCU (Ctrl+K or /)"
          >
            <Search size={14} className="text-stone-500 group-hover:text-white transition-colors" />
            <span className="hidden sm:inline">SEARCH</span>
            <kbd className="hidden md:inline-block text-[9.5px] font-mono text-stone-500 ml-0.5">
              /
            </kbd>
          </button>
        </div>
      </header>

      {/* Fixed View Layout Mode Switcher with Smooth Sliding Indicator (Top-Right) */}
      <div className="fixed top-14 sm:top-20 right-4 sm:right-8 z-40 pointer-events-none">
        <div className="relative flex items-center bg-black/80 backdrop-blur-md border border-white/15 rounded-full p-1 text-[9px] sm:text-[10px] font-mono tracking-wider uppercase shadow-xl pointer-events-auto">
          <button
            onClick={() => setLayoutMode("path")}
            className={`relative z-10 px-3 py-1 rounded-full transition-all duration-300 cursor-pointer ${
              layoutMode === "path"
                ? "bg-white text-black font-bold shadow-md scale-100"
                : "text-stone-400 hover:text-white"
            }`}
            title="Sacred Timeline Snake-Path View"
          >
            PATH VIEW
          </button>
          <button
            onClick={() => setLayoutMode("wheel")}
            className={`relative z-10 px-3 py-1 rounded-full transition-all duration-300 cursor-pointer ${
              layoutMode === "wheel"
                ? "bg-white text-black font-bold shadow-md scale-100"
                : "text-stone-400 hover:text-white"
            }`}
            title="3D Scroll Wheel View"
          >
            3D WHEEL
          </button>
          <button
            onClick={() => setLayoutMode("grid")}
            className={`relative z-10 px-3 py-1 rounded-full transition-all duration-300 cursor-pointer ${
              layoutMode === "grid"
                ? "bg-white text-black font-bold shadow-md scale-100"
                : "text-stone-400 hover:text-white"
            }`}
            title="Grid View"
          >
            GRID VIEW
          </button>
        </div>
      </div>

      {/* 2. MAIN CONTAINER */}
      <div
        className={`relative z-10 mx-auto flex flex-col gap-4 transition-all duration-500 ease-out ${
          layoutMode === "wheel"
            ? "w-full max-w-none px-0 pt-16 sm:pt-20 min-h-[calc(100vh-80px)] justify-center"
            : "max-w-5xl px-3 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-20"
        }`}
      >

        {/* 3. TIMELINE MOVIES LIST (ALL 44 ENTRIES) */}
        {filteredMovies.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center animate-in fade-in duration-300">
            <h3 className="text-sm font-mono tracking-[0.25em] uppercase text-stone-300 font-bold">
              NO TIMELINE MOVIES FOUND
            </h3>
            <p className="text-xs font-mono tracking-wide text-stone-500 mt-1.5 max-w-sm mx-auto">
              No movie records match the active search query or filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActivePhaseFilter("all");
              }}
              className="mt-5 text-stone-300 hover:text-white text-[10px] font-mono tracking-widest uppercase cursor-pointer bg-white/5 border border-white/10 px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors"
            >
              RESET FILTERS
            </button>
          </div>
        ) : layoutMode === "wheel" ? (
          <div
            key="view-wheel"
            className="relative w-full overflow-hidden bg-transparent border-0 shadow-none flex items-center justify-center animate-in fade-in-0 slide-in-from-bottom-8 zoom-in-95 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            <MovieScene movies={filteredMovies} />
          </div>
        ) : layoutMode === "grid" ? (
          <div
            key="view-grid"
            className="flex flex-col gap-14 animate-in fade-in-0 slide-in-from-bottom-8 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            {TIMELINE_PHASES.map((phase) => {
              const movies = moviesByPhase.get(phase.id) || [];
              if (movies.length === 0) return null;
              return (
                <section
                  key={`phase-section-${phase.id}`}
                  id={`phase-section-${phase.id}`}
                  className="flex flex-col gap-6 scroll-mt-28"
                >
                  {/* Phase Era Header Banner */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] text-white uppercase bg-white/10 px-2.5 py-1 rounded">
                        PHASE {phase.roman}
                      </span>
                      <span className="text-xs sm:text-sm font-mono tracking-[0.15em] text-stone-300 uppercase font-semibold">
                        {phase.title}
                      </span>
                    </div>
                    <span className="text-[10.5px] font-mono text-stone-500 uppercase tracking-widest">
                      {phase.years} • {movies.length} {movies.length === 1 ? "MOVIE" : "MOVIES"}
                    </span>
                  </div>
                  {/* Movies Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                    {movies.map((movie) => {
                      const posterUrl = getMoviePoster(movie);
                      const globalOrderIndex = UNIFIED_MCU_TREE.findIndex((m) => m.id === movie.id);
                      const displayNumber = globalOrderIndex >= 0 ? globalOrderIndex + 1 : movie.order;

                      return (
                        <Link
                          key={movie.id}
                          href={`/timeline/${movie.id}`}
                          className="group relative flex flex-col gap-2.5 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1.5"
                        >
                          {/* Poster Container */}
                          <div className="relative w-full aspect-[2/3] overflow-hidden bg-stone-950 rounded-xl border border-white/10 group-hover:border-white/30 shadow-xl transition-all block">
                            <img
                              src={posterUrl}
                              alt={movie.title}
                              loading="lazy"
                              className="w-full h-full object-cover object-center filter brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-500 ease-out"
                            />
                            {/* Badges */}
                            <div className="absolute top-2.5 left-2.5 flex items-center gap-1">
                              <span className="text-[8.5px] font-mono font-bold tracking-widest uppercase bg-black/85 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/15 text-white">
                                #{String(displayNumber).padStart(2, "0")}
                              </span>
                              <span className="text-[8px] font-mono font-bold tracking-widest uppercase bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded-full border border-white/15 text-stone-300">
                                P{movie.phase}
                              </span>
                            </div>
                            {/* Release Year */}
                            <div className="absolute bottom-2.5 right-2.5">
                              <span className="text-[8.5px] font-mono tracking-widest uppercase bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded text-stone-300 border border-white/10">
                                {movie.year}
                              </span>
                            </div>
                          </div>
                          {/* Metadata */}
                          <div className="flex flex-col gap-1">
                            <h3
                              className="text-xs sm:text-[13px] font-mono font-bold tracking-wider uppercase text-white group-hover:text-white transition-colors line-clamp-1"
                              title={movie.title}
                            >
                              {movie.title}
                            </h3>
                            <div className="flex items-center gap-1.5 text-[9.5px] font-mono text-stone-500 uppercase tracking-widest line-clamp-1">
                              <span className="text-stone-400">{movie.heroAlias}</span>
                              <span>•</span>
                              <span>{movie.runtime} MIN</span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div
            key="view-path"
            className="animate-in fade-in-0 slide-in-from-bottom-8 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            <TimelineDoomsdayLayout movies={filteredMovies} />
          </div>
        )}
      </div>

      {/* 4. GLOBAL NAVIGATION MODALS */}
      <SlideNavMenu isOpen={navMenuOpen} onClose={() => setNavMenuOpen(false)} />
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      <AmbientAudio />
    </div>
  );
}
