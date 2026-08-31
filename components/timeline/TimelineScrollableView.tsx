"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

export function getMoviePoster(node: { id: string; posterUrl?: string }) {
  const posterEntry =
    MCU_POSTER_MAP[node.id] ||
    MCU_POSTER_MAP[node.id.toLowerCase()] ||
    MCU_POSTER_MAP[node.id.replace(/-/g, "")] ||
    MCU_POSTER_MAP[node.id.replace(/_/g, "-")];

  if (posterEntry?.poster) return posterEntry.poster;
  if (node.posterUrl) return node.posterUrl;
  return "/images/posters/the-avengers.jpg";
}

export default function TimelineScrollableView() {
  const router = useRouter();
  const { currentPhase, setCurrentPhase } = useTimelineState();

  const [activePhaseFilter, setActivePhaseFilter] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<MovieNode | null>(null);
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // All 44 canonical movies sorted by sequence order (1 to 44)
  const allMovies = useMemo(() => {
    return [...UNIFIED_MCU_TREE].sort((a, b) => a.order - b.order);
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
    <div className="min-h-screen w-full bg-[#000000] text-stone-300 font-sans selection:bg-white selection:text-black">
      {/* Background Starfield Pattern & Ambient Gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.10),rgba(255,255,255,0))] pointer-events-none" />
      <div
        className="fixed inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Header Backdrop Gradient */}
      <div
        className="fixed top-0 inset-x-0 h-20 pointer-events-none z-40 bg-gradient-to-b from-[#000000]/90 to-transparent backdrop-blur-sm [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] transition-opacity duration-700"
        aria-hidden="true"
      />

      {/* 1. SYNCHRONIZED GLOBAL HEADER NAVBAR (EXACT MATCH WITH FAMILY TREE) */}
      <header className="fixed top-0 left-0 right-0 w-full px-3 sm:px-8 py-2.5 sm:py-4 flex items-center justify-between z-50 bg-transparent pointer-events-none">
        {/* Left Side: Navigation Menu & Title Switcher */}
        <div className="flex items-center gap-2 sm:gap-4 pointer-events-auto">
          <button
            onClick={() => setNavMenuOpen(true)}
            className="text-stone-400 hover:text-white transition-colors cursor-pointer p-1"
            title="Open Universe Navigation"
            aria-label="Open Universe Navigation"
          >
            <Menu size={16} />
          </button>

          {/* Title Header */}
          <div className="hidden md:flex items-center gap-2 sm:gap-3">
            <span className="text-[9.5px] sm:text-[11px] font-mono tracking-[0.15em] sm:tracking-[0.25em] uppercase text-white font-bold select-none">
              TIMELINE
            </span>
            <span className="text-stone-600 font-mono text-[9.5px] sm:text-[11px]">/</span>
            <Link
              href="/familytree"
              className="text-[9.5px] sm:text-[11px] font-mono tracking-[0.15em] sm:tracking-[0.25em] uppercase text-stone-400 hover:text-white transition-colors cursor-pointer"
              title="Switch to Character Family Tree"
            >
              FAMILY TREE
            </Link>
          </div>
        </div>

        {/* Center: Brand Logo & DOOMSDAY Trigger */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-auto flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-3">
          <span className="text-[11px] xs:text-xs sm:text-sm md:text-base font-mono font-bold tracking-[0.25em] xs:tracking-[0.35em] sm:tracking-[0.45em] uppercase text-white scale-110 select-none cursor-default">
            MARVEL
          </span>
          <span className="text-stone-600 font-mono text-xs select-none">|</span>
          <Link
            href="/multiverse"
            className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm font-mono font-bold tracking-[0.25em] xs:tracking-[0.35em] sm:tracking-[0.45em] uppercase text-emerald-400/80 hover:text-emerald-300 hover:scale-105 drop-shadow-[0_0_12px_rgba(52,211,153,0.35)] transition-all select-none cursor-pointer bg-transparent border-none"
            title="Explore Multiverse Realities"
          >
            DOOMSDAY
          </Link>
        </div>

        {/* Right Side: Phase Jump Switcher, Return & Search */}
        <div className="flex items-center gap-3 sm:gap-5 pointer-events-auto">
          {/* Phase Direct Jump Switcher */}
          <div className="hidden md:flex items-center gap-2 sm:gap-2.5">
            <span className="text-[9.5px] sm:text-[11px] font-mono tracking-[0.15em] sm:tracking-[0.25em] uppercase text-stone-500">
              PHASE:
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {[1, 2, 3, 4, 5, 6].map((p) => (
                <button
                  key={p}
                  onClick={() => handleSelectPhase(p)}
                  className={`text-[9.5px] sm:text-[11px] font-mono tracking-[0.15em] transition-colors cursor-pointer px-1 py-0.5 ${
                    activePhaseFilter === p
                      ? "text-white font-bold"
                      : "text-stone-400 hover:text-white"
                  }`}
                  title={`Jump to Phase ${p}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <Link
            href="/familytree"
            className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white text-[9.5px] sm:text-[11px] font-mono tracking-[0.15em] sm:tracking-[0.25em] uppercase transition-colors group cursor-pointer"
          >
            <ArrowLeft size={11} className="text-stone-500 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">RETURN</span>
          </Link>

          <button
            onClick={() => setSearchOpen(true)}
            className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white text-[9.5px] sm:text-[11px] font-mono tracking-[0.15em] sm:tracking-[0.25em] uppercase transition-colors group cursor-pointer p-1"
            title="Search MCU (Ctrl+K or /)"
          >
            <Search size={13} className="text-stone-500 group-hover:text-white transition-colors" />
            <span className="hidden sm:inline">SEARCH</span>
            <kbd className="hidden md:inline-block text-[9px] font-mono text-stone-500 ml-0.5">
              /
            </kbd>
          </button>
        </div>
      </header>

      {/* 2. MAIN CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-20 sm:pt-24 pb-28 flex flex-col gap-8">
        
        {/* Top Controls: Search Bar & Phase Filters matching Movies Page */}
        <div className="flex flex-col gap-5 pb-2">
          
          {/* Top Row: Full Prominent Search Input Bar at the Top */}
          <div className="w-full">
            <div className="relative w-full flex items-center bg-white/[0.04] border border-white/10 px-4 py-2.5 sm:py-3 rounded-full focus-within:border-white/30 transition-all shadow-lg">
              <Search size={15} className="text-stone-400 shrink-0 mr-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH TIMELINE MOVIES & HEROES..."
                className="w-full bg-transparent text-xs sm:text-sm font-mono tracking-[0.16em] uppercase text-stone-100 placeholder:text-stone-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-stone-400 hover:text-stone-200 text-[10px] font-mono tracking-widest px-2.5 py-0.5 uppercase cursor-pointer"
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>

          {/* Phase Filter Tabs matching the site */}
          <div className="flex flex-nowrap overflow-x-auto pb-1.5 px-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap items-center gap-4 sm:gap-6 text-[11px] sm:text-xs font-mono tracking-wider uppercase border-b border-white/5 pt-1">
            {PHASE_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => handleSelectPhase(f.id as number | "all")}
                className={`transition-colors cursor-pointer py-1 shrink-0 whitespace-nowrap ${
                  activePhaseFilter === f.id
                    ? "text-white font-bold border-b border-white pb-2 -mb-[1px]"
                    : "text-stone-500 hover:text-stone-300 pb-2"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. TIMELINE MOVIES LIST (ALL 44 ENTRIES) */}
        {filteredMovies.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center">
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
              className="mt-5 text-stone-300 hover:text-white text-[10px] font-mono tracking-widest uppercase cursor-pointer bg-white/5 border border-white/10 px-4 py-1.5 rounded-full"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-14">
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

                  {/* Movies Grid (Matching Movies & Characters Page Card Styling) */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                    {movies.map((movie) => {
                      const posterUrl = getMoviePoster(movie);

                      return (
                        <Link
                          key={movie.id}
                          href={`/timeline/${movie.id}`}
                          className="group relative flex flex-col gap-2.5 transition-all duration-300 ease-out cursor-pointer"
                        >
                          {/* Poster Container with Glass Border & Glow */}
                          <div className="relative w-full aspect-[2/3] overflow-hidden bg-stone-950 rounded-xl border border-white/10 group-hover:border-white/30 shadow-xl transition-all block">
                            <img
                              src={posterUrl}
                              alt={movie.title}
                              loading="lazy"
                              className="w-full h-full object-cover object-center filter brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-500 ease-out"
                            />



                            {/* Top Sequence & Phase Badge */}
                            <div className="absolute top-2.5 left-2.5 flex items-center gap-1">
                              <span className="text-[8.5px] font-mono font-bold tracking-widest uppercase bg-black/85 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/15 text-white">
                                #{String(movie.order).padStart(2, "0")}
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

                          {/* Movie Metadata Details */}
                          <div className="flex flex-col gap-1">
                            <h3
                              className="text-xs sm:text-[13px] font-mono font-bold tracking-wider uppercase text-white group-hover:text-amber-300 transition-colors line-clamp-1"
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
        )}
      </div>

      {/* 4. GLOBAL NAVIGATION MODALS */}
      <SlideNavMenu isOpen={navMenuOpen} onClose={() => setNavMenuOpen(false)} />
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      <AmbientAudio />
    </div>
  );
}
