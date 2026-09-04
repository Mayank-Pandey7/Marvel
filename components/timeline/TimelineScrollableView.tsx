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
  Route,
  Disc3,
  LayoutGrid,
} from "lucide-react";
import { LineNav } from "@/components/line-nav";
import { IconSwap, IconSwapItem } from "@/components/icon-swap";
import { UNIFIED_MCU_TREE, type MovieNode } from "@/data/movies";
import { useTimelineState } from "@/context/TimelineStateContext";
import SlideNavMenu from "@/components/dark/SlideNavMenu";
import SearchOverlay from "@/components/SearchOverlay";
import AmbientAudio from "@/components/dark/AmbientAudio";

// --- CONFIGURATION ---
const TIMELINE_PHASES = [
  { id: 1, roman: "I", label: "PHASE I", title: "THE INFINITY SAGA — ORIGINS", years: "2008 — 2012", desc: "The birth of heroes, the formation of the Avengers, and the defense of New York." },
  { id: 2, roman: "II", label: "PHASE II", title: "THE INFINITY SAGA — ESCALATION", years: "2013 — 2015", desc: "Cosmic expansion, the fall of S.H.I.E.L.D., and the dawn of Ultron." },
  { id: 3, roman: "III", label: "PHASE III", title: "THE INFINITY SAGA — RECKONING", years: "2016 — 2019", desc: "Civil conflict, the Mad Titan's conquest, and the desperate Time Heist." },
  { id: 4, roman: "IV", label: "PHASE IV", title: "THE MULTIVERSE SAGA — NEW VOICES", years: "2021 — 2022", desc: "Multiversal ruptures, cosmic gods, and the rise of a new generation." },
  { id: 5, roman: "V", label: "PHASE V", title: "THE MULTIVERSE SAGA — FRACTURES", years: "2023 — 2025", desc: "Quantum realm incursions, temporal fraying, and anti-hero alliances." },
  { id: 6, roman: "VI", label: "PHASE VI", title: "THE MULTIVERSE SAGA — CONVERGENCE", years: "2025 — 2027", desc: "Battleworld approaches. Doom ascends as the multiverse collides." },
  { id: 7, roman: "∞", label: "MULTIVERSE", title: "LEGACY MULTIVERSE — EXPANDED CANON", years: "2000 — 2020", desc: "The legendary origins of Spider-Man, the X-Men, Deadpool, and Wolverine across parallel realities." },
];

const PHASE_FILTERS = [
  { id: "all", label: "ALL TITLES (64)" },
  { id: 1, label: "PHASE I" },
  { id: 2, label: "PHASE II" },
  { id: 3, label: "PHASE III" },
  { id: 4, label: "PHASE IV" },
  { id: 5, label: "PHASE V" },
  { id: 6, label: "PHASE VI" },
  { id: 7, label: "MULTIVERSE" },
];

const VIEW_ICONS = {
  path: Route,
  wheel: Disc3,
  grid: LayoutGrid,
} as const;

type LayoutModeKey = keyof typeof VIEW_ICONS;

const VIEW_LABELS: Record<LayoutModeKey, string> = {
  path: "PATH VIEW",
  wheel: "3D WHEEL",
  grid: "GRID VIEW",
};

export const EARTH_FILTER_OPTIONS = [
  { key: "Earth-616", label: "EARTH-616", shortLabel: "616", count: 44, title: "The Sacred Timeline (MCU)" },
  { key: "Earth-10005", label: "EARTH-10005", shortLabel: "10005", count: 13, title: "Fox Mutant Universe (X-Men / Wolverine)" },
  { key: "Earth-96283", label: "EARTH-96283", shortLabel: "96283", count: 3, title: "Sam Raimi Spider-Man Trilogy" },
  { key: "Earth-120703", label: "EARTH-120703", shortLabel: "120703", count: 2, title: "The Amazing Spider-Man Duology" },
  { key: "Earth-121698", label: "EARTH-121698", shortLabel: "121698", count: 2, title: "Tim Story Fantastic Four Duology" },
  { key: "Earth-82111", label: "EARTH-82111", shortLabel: "82111", count: 3, title: "What If...? Animated Multiverse" },
  { key: "Earth-2149", label: "EARTH-2149", shortLabel: "2149", count: 1, title: "Marvel Zombies Apocalypse" },
  { key: "all", label: "ALL REALITIES", shortLabel: "ALL", count: 68, title: "All Multiverse Timelines" },
] as const;

export const EARTH_NAV_ITEMS = [
  { title: "EARTH-616 • SACRED TIMELINE", href: "#Earth-616", count: 44 },
  { title: "EARTH-10005 • MUTANT UNIVERSE", href: "#Earth-10005", count: 13 },
  { title: "EARTH-96283 • RAIMI-VERSE", href: "#Earth-96283", count: 3 },
  { title: "EARTH-120703 • WEBB-VERSE", href: "#Earth-120703", count: 2 },
  { title: "EARTH-121698 • FANTASTIC FOUR", href: "#Earth-121698", count: 2 },
  { title: "EARTH-82111 • WHAT IF...?", href: "#Earth-82111", count: 3 },
  { title: "EARTH-2149 • MARVEL ZOMBIES", href: "#Earth-2149", count: 1 },
  { title: "ALL REALITIES", href: "#all", count: 68 },
];

import { MCU_POSTER_MAP } from "@/components/map/NodeArtwork";
import { MCU } from "@/data/mcu";

// --- POSTER RESOLUTION ---
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

  if (poster.includes("image.tmdb.org/t/p/")) {
    return poster.replace(/\/t\/p\/[^/]+\//, "/t/p/w780/");
  }

  return poster;
}

export function formatDuration(minutes?: number): string {
  if (!minutes) return "";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
}

// --- TIMELINE VIEW COMPONENT ---
export default function TimelineScrollableView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentPhase, setCurrentPhase } = useTimelineState();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [activePhaseFilter, setActivePhaseFilter] = useState<number | "all">(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const phaseParam = urlParams.get("phase");
      if (phaseParam === "all") return "all";
      if (phaseParam) {
        if (phaseParam.toUpperCase() === "X") return 7;
        const p = parseInt(phaseParam, 10);
        if (p >= 1 && p <= 7) return p;
      }
    }
    return "all";
  });
  const [activeEarthFilter, setActiveEarthFilter] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const earthParam = urlParams.get("earth");
      if (earthParam && EARTH_FILTER_OPTIONS.some((o) => o.key === earthParam)) {
        return earthParam;
      }
      const movieParam = urlParams.get("movie");
      if (movieParam) {
        const found = UNIFIED_MCU_TREE.find((m) => m.id === movieParam);
        if (found?.earthDesignation) return found.earthDesignation;
        return "Earth-616";
      }
      const phaseParam = urlParams.get("phase");
      if (phaseParam) {
        if (phaseParam.toUpperCase() === "X" || phaseParam === "7") return "all";
        return "Earth-616";
      }
      try {
        const savedEarth = localStorage.getItem("mcu_timeline_earth_filter");
        if (savedEarth && EARTH_FILTER_OPTIONS.some((o) => o.key === savedEarth)) {
          return savedEarth;
        }
      } catch {}
    }
    return "Earth-616";
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<MovieNode | null>(null);
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isPhaseDrawerOpen, setIsPhaseDrawerOpen] = useState(false);
  const [layoutMode, setLayoutMode] = useState<LayoutModeKey>(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const urlView = urlParams.get("view") as LayoutModeKey | null;
      if (urlView && (urlView === "path" || urlView === "wheel" || urlView === "grid")) {
        return urlView;
      }
      try {
        const savedView = localStorage.getItem("mcu_timeline_view_mode") as LayoutModeKey | null;
        if (savedView && (savedView === "path" || savedView === "wheel" || savedView === "grid")) {
          return savedView;
        }
      } catch {}
    }
    return "path";
  });

  useEffect(() => {
    const viewParam = searchParams.get("view") as LayoutModeKey | null;
    if (viewParam && (viewParam === "path" || viewParam === "wheel" || viewParam === "grid")) {
      setLayoutMode(viewParam);
      try {
        localStorage.setItem("mcu_timeline_view_mode", viewParam);
      } catch {}
    } else {
      try {
        const savedView = localStorage.getItem("mcu_timeline_view_mode") as LayoutModeKey | null;
        if (savedView && (savedView === "path" || savedView === "wheel" || savedView === "grid")) {
          setLayoutMode(savedView);
        }
      } catch {}
    }
  }, [searchParams]);

  const handleSelectViewMode = (key: LayoutModeKey) => {
    setLayoutMode(key);
    try {
      localStorage.setItem("mcu_timeline_view_mode", key);
      const url = new URL(window.location.href);
      url.searchParams.set("view", key);
      window.history.replaceState({}, "", url.toString());
    } catch {}
  };

  const handleSelectEarth = (earthKey: string) => {
    setActiveEarthFilter(earthKey);
    try {
      localStorage.setItem("mcu_timeline_earth_filter", earthKey);
      const url = new URL(window.location.href);
      if (earthKey === "all") {
        url.searchParams.delete("earth");
      } else {
        url.searchParams.set("earth", earthKey);
      }
      if (earthKey !== "all" && earthKey !== "Earth-616") {
        url.searchParams.delete("phase");
        setActivePhaseFilter("all");
      }
      window.history.replaceState({}, "", url.toString());
    } catch {}
  };

  // --- STATE SYNCHRONIZATION ---
  useEffect(() => {
    const earthParam = searchParams.get("earth");
    const phaseParam = searchParams.get("phase");
    const movieParam = searchParams.get("movie");

    if (earthParam && EARTH_FILTER_OPTIONS.some((o) => o.key === earthParam)) {
      setActiveEarthFilter(earthParam);
    } else if (movieParam) {
      const found = UNIFIED_MCU_TREE.find((m) => m.id === movieParam);
      if (found?.earthDesignation) {
        setActiveEarthFilter(found.earthDesignation);
      } else {
        setActiveEarthFilter("Earth-616");
      }
    } else if (phaseParam) {
      if (phaseParam.toUpperCase() === "X" || phaseParam === "7") {
        setActiveEarthFilter("all");
      } else {
        setActiveEarthFilter("Earth-616");
      }
    }

    if (phaseParam) {
      if (phaseParam === "all") {
        setActivePhaseFilter("all");
      } else if (phaseParam.toUpperCase() === "X") {
        setActivePhaseFilter(7);
        setCurrentPhase(7);
      } else {
        const p = parseInt(phaseParam, 10);
        if (p >= 1 && p <= 7) {
          setActivePhaseFilter(p);
          setCurrentPhase(p);
        }
      }
    } else if (movieParam) {
      const found = UNIFIED_MCU_TREE.find((m) => m.id === movieParam);
      if (found?.phase) {
        setActivePhaseFilter(found.phase);
        setCurrentPhase(found.phase);
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
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [searchParams, setCurrentPhase]);

  // --- KEYBOARD SHORTCUTS ---
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

  // --- STARFIELD PARTICLES ---
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

    const starCount = 180;
    const particles = Array.from({ length: starCount }, () => {
      const isLarge = Math.random() > 0.85;
      const isMedium = Math.random() > 0.5;
      const radius = isLarge
        ? Math.random() * 1.2 + 1.5
        : isMedium
        ? Math.random() * 0.7 + 0.8
        : Math.random() * 0.5 + 0.4;
      const baseAlpha = isLarge
        ? Math.random() * 0.4 + 0.45
        : isMedium
        ? Math.random() * 0.3 + 0.25
        : Math.random() * 0.25 + 0.15;

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        radius,
        baseAlpha,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        color:
          Math.random() > 0.8
            ? "210, 230, 255"
            : Math.random() > 0.9
            ? "255, 240, 220"
            : "255, 255, 255",
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        p.twinklePhase += p.twinkleSpeed;
        const currentAlpha = Math.max(
          0.08,
          Math.min(1, p.baseAlpha + Math.sin(p.twinklePhase) * 0.25)
        );

        ctx.fillStyle = `rgba(${p.color}, ${currentAlpha})`;
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

  // --- MOVIE DATA LISTS ---
  const allMovies = useMemo(() => {
    return [...UNIFIED_MCU_TREE].sort((a, b) => {
      if (a.phase !== b.phase) return a.phase - b.phase;
      return a.order - b.order;
    });
  }, []);

  // Filtered movies
  const filteredMovies = useMemo(() => {
    let list = allMovies;
    if (activeEarthFilter !== "all") {
      if (activeEarthFilter === "Earth-616") {
        list = list.filter((m) => !m.earthDesignation || m.earthDesignation === "Earth-616");
      } else {
        list = list.filter((m) => m.earthDesignation === activeEarthFilter);
      }
    }
    const isPhaseApplicable = activeEarthFilter === "all" || activeEarthFilter === "Earth-616";
    if (isPhaseApplicable && activePhaseFilter !== "all") {
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
  }, [allMovies, activeEarthFilter, activePhaseFilter, searchQuery]);

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

  // Filter timeline to ONLY show the selected Phase (or ALL)
  const handleSelectPhase = (phaseId: number | "all") => {
    setIsPhaseDrawerOpen(false);
    setActivePhaseFilter(phaseId);
    if (phaseId === "all") {
      setCurrentPhase(1);
      try {
        const url = new URL(window.location.href);
        url.searchParams.delete("phase");
        url.searchParams.delete("movie");
        window.history.replaceState({}, "", url.toString());
      } catch {}
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setCurrentPhase(phaseId);
      try {
        const url = new URL(window.location.href);
        url.searchParams.set("phase", phaseId === 7 ? "X" : String(phaseId));
        url.searchParams.delete("movie");
        window.history.replaceState({}, "", url.toString());
      } catch {}
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#000000] text-stone-300 font-sans selection:bg-white selection:text-black">
      {/* Background Starfield Canvas & Dark Vignette (Identical to Family Tree) */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.95)_100%)] pointer-events-none z-0" />

      <div
        className="fixed top-0 inset-x-0 h-20 sm:h-26 pointer-events-none z-40 bg-transparent backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)] transition-opacity duration-700"
        aria-hidden="true"
      />

      <header className="fixed top-0 left-0 right-0 w-full px-4 sm:px-8 py-4 sm:py-6 min-h-[58px] sm:min-h-[72px] flex items-center justify-between z-50 bg-transparent pointer-events-none">
        <div className="flex items-center gap-2 sm:gap-4 pointer-events-auto">
          <button
            onClick={() => setNavMenuOpen(true)}
            className="text-stone-400 hover:text-white transition-colors cursor-pointer p-1.5"
            title="Open Universe Navigation"
            aria-label="Open Universe Navigation"
          >
            <Menu size={18} />
          </button>

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

        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-auto flex items-center justify-center gap-1.5 sm:gap-3.5 md:gap-4 whitespace-nowrap">
          <Link
            href="/timeline"
            className="text-[11px] sm:text-base md:text-lg font-mono font-bold tracking-[0.2em] sm:tracking-[0.45em] md:tracking-[0.55em] uppercase text-white hover:text-stone-300 transition-colors select-none cursor-pointer -mr-0.5 sm:-mr-1.5"
            title="Sacred Timeline"
          >
            MARVEL
          </Link>
          <span className="text-stone-600 font-mono text-[11px] sm:text-base md:text-lg select-none">|</span>
          <Link
            href="/doomsday"
            className="text-[11px] sm:text-base md:text-lg font-mono font-bold tracking-[0.2em] sm:tracking-[0.45em] md:tracking-[0.55em] uppercase text-emerald-400/90 hover:text-emerald-300 hover:scale-105 drop-shadow-[0_0_15px_rgba(52,211,153,0.45)] transition-all select-none cursor-pointer bg-transparent border-none"
            title="Explore Road to Doomsday"
          >
            DOOMSDAY
          </Link>
        </div>

        <div className="flex items-center gap-3 sm:gap-5 pointer-events-auto">
          {(activeEarthFilter === "all" || activeEarthFilter === "Earth-616") && (
          <div className="hidden md:flex items-center gap-2 sm:gap-2.5">
            <span className="text-[10px] sm:text-[11.5px] font-mono tracking-[0.18em] sm:tracking-[0.28em] uppercase text-stone-500">
              PHASE:
            </span>
            <div className="flex items-center gap-1 sm:gap-1.5">
              {[1, 2, 3, 4, 5, 6].map((p) => {
                const isSelected = activePhaseFilter === p;
                return (
                  <button
                    key={p}
                    onClick={() => handleSelectPhase(p)}
                    className={`text-[10px] sm:text-[11.5px] font-mono tracking-[0.15em] transition-colors cursor-pointer px-1 py-0.5 ${
                      isSelected
                        ? "text-white font-bold underline underline-offset-4 decoration-white/60"
                        : "text-stone-400 hover:text-white"
                    }`}
                    title={`Show Phase ${p} Only`}
                  >
                    {p}
                  </button>
                );
              })}
              {activeEarthFilter === "all" && (
                <button
                  onClick={() => handleSelectPhase(7)}
                  className={`text-[10px] sm:text-[11.5px] font-mono tracking-[0.15em] transition-colors cursor-pointer px-1 py-0.5 ${
                    activePhaseFilter === 7
                      ? "text-white font-bold underline underline-offset-4 decoration-white/60"
                      : "text-stone-400 hover:text-white"
                  }`}
                  title="Show Phase X — Legacy Multiverse"
                >
                  X
                </button>
              )}
              <button
                onClick={() => handleSelectPhase("all")}
                className={`text-[10px] sm:text-[11.5px] font-mono tracking-[0.15em] transition-colors cursor-pointer px-1.5 py-0.5 ${
                  activePhaseFilter === "all"
                    ? "text-white font-bold underline underline-offset-4 decoration-white/60"
                    : "text-stone-400 hover:text-white"
                }`}
                title="Show All Phases"
              >
                ALL
              </button>
            </div>
          </div>
          )}

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

      {(activeEarthFilter === "all" || activeEarthFilter === "Earth-616") && (
        <div className="fixed left-3 top-16 sm:top-20 z-30 md:hidden flex items-center gap-1.5">
          <button
            onClick={() => setIsPhaseDrawerOpen((prev) => !prev)}
            className="px-3 py-1 rounded-full bg-black/80 text-stone-300 text-[9px] font-mono tracking-widest uppercase backdrop-blur-md shadow-lg flex items-center cursor-pointer active:scale-95 transition-transform border border-white/10"
          >
            <span>{activePhaseFilter === "all" ? "ALL PHASES" : activePhaseFilter === 7 ? "PHASE X" : `PHASE ${activePhaseFilter}`}</span>
          </button>
        </div>
      )}

      {/* Mobile Phase Drawer Modal */}
      {isPhaseDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex select-none animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsPhaseDrawerOpen(false)}
          />
          <aside className="relative z-10 w-full max-w-[320px] bg-[#000000] border-r border-stone-900 h-full p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-300 shadow-[20px_0_50px_rgba(0,0,0,0.9)]">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-900 mb-6">
                <span className="text-xs font-mono font-bold tracking-[0.35em] uppercase text-white">
                  SACRED TIMELINE
                </span>
                <button
                  onClick={() => setIsPhaseDrawerOpen(false)}
                  className="text-stone-400 hover:text-white transition-colors p-1 cursor-pointer"
                  aria-label="Close Phase Drawer"
                >
                  <X size={16} strokeWidth={1.5} />
                </button>
              </div>

              {/* Phase Selection */}
              <div className="border-b border-stone-900/80 pb-6 mb-6">
                <div className="font-mono text-[11px] tracking-[0.25em] uppercase text-stone-300 font-bold mb-3.5">
                  FILTER BY PHASE
                </div>

                <div className="flex flex-col gap-2.5">
                  <button
                    onClick={() => handleSelectPhase("all")}
                    className={`w-full text-[10px] font-mono tracking-[0.18em] uppercase hover:translate-x-1 transition-all py-1.5 flex items-center justify-between group cursor-pointer ${
                      activePhaseFilter === "all"
                        ? "text-white font-bold"
                        : "text-stone-400 hover:text-white"
                    }`}
                  >
                    <span>ALL PHASES (44)</span>
                    {activePhaseFilter === "all" ? (
                      <span className="text-[8px] font-mono tracking-widest text-stone-400 uppercase">ACTIVE</span>
                    ) : (
                      <span className="text-[8.5px] text-stone-500 font-normal">COMPLETE SAGA</span>
                    )}
                  </button>
                  {TIMELINE_PHASES.map((p) => {
                    const isActive = p.id === activePhaseFilter;
                    return (
                      <button
                        key={p.id}
                        onClick={() => handleSelectPhase(p.id)}
                        className={`w-full text-[10px] font-mono tracking-[0.18em] uppercase hover:translate-x-1 transition-all py-1.5 flex items-center justify-between group cursor-pointer ${
                          isActive
                            ? "text-white font-bold"
                            : "text-stone-400 hover:text-white"
                        }`}
                      >
                        <span>Phase {p.roman}</span>
                        {isActive ? (
                          <span className="text-[8px] font-mono tracking-widest text-stone-400 uppercase">ACTIVE</span>
                        ) : (
                          <span className="text-[8.5px] text-stone-500 font-normal">
                            {p.years}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Info */}
              <div>
                <div className="font-mono text-[11px] tracking-[0.25em] uppercase text-stone-300 font-bold mb-2">
                  PHASE ERA
                </div>
                <p className="text-[9.5px] font-mono text-stone-500 leading-relaxed">
                  {activePhaseFilter === "all"
                    ? "Viewing all 44 canonical MCU films from Phase I to Phase VI in chronological order."
                    : TIMELINE_PHASES.find((p) => p.id === activePhaseFilter)?.desc}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-stone-900 flex items-center justify-between text-[9px] font-mono tracking-[0.25em] text-stone-500 uppercase">
              <span>{filteredMovies.length} MOVIES VISIBLE</span>
              <span>{activePhaseFilter === "all" ? "ALL PHASES" : `PHASE ${activePhaseFilter}`}</span>
            </div>
          </aside>
        </div>
      )}

      <div
        className="fixed top-14 sm:top-20 right-3 sm:right-8 z-40 pointer-events-none flex flex-col items-end gap-1.5 origin-top-right scale-[0.82] sm:scale-100"
      >
        {/* Layout View Switcher (PATH | 3D WHEEL | GRID) */}
        <div className="flex gap-0.5 rounded-full p-0.5 bg-black/85 backdrop-blur-md border border-white/15 shadow-xl pointer-events-auto whitespace-nowrap">
          {(Object.keys(VIEW_ICONS) as LayoutModeKey[]).map((key) => (
            <button
              key={key}
              onClick={() => handleSelectViewMode(key)}
              className={`rounded-full border-none px-2.5 sm:px-3 py-1 text-[8px] sm:text-[9.5px] font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                layoutMode === key
                  ? "bg-white text-black font-bold shadow-md"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              {VIEW_LABELS[key]}
            </button>
          ))}
        </div>

        {/* SELECT REALITY pill — same container as PATH VIEW */}
        <div className="pointer-events-none flex gap-0.5 rounded-full p-0.5 bg-black/85 backdrop-blur-md border border-white/15 shadow-xl whitespace-nowrap">
          <span className="rounded-full px-2.5 sm:px-3 py-1 text-[8px] sm:text-[9.5px] font-mono tracking-wider uppercase text-stone-400">
            SELECT REALITY
          </span>
        </div>

        {/* Earth LineNav — right-aligned with lines on the right */}
        <div className="pointer-events-auto">
          <LineNav
            align="right"
            className="w-auto"
            items={EARTH_NAV_ITEMS}
            activeHref={`#${activeEarthFilter}`}
            scrollActiveIntoView={false}
            onItemClick={(item) => {
              const key = item.href.replace("#", "");
              handleSelectEarth(key);
            }}
          />
        </div>
      </div>

      <div
        className={`relative z-10 mx-auto flex flex-col gap-4 transition-all duration-500 ease-out ${
          layoutMode === "wheel"
            ? "w-full max-w-none px-0 pt-28 sm:pt-24 min-h-[calc(100vh-80px)] justify-center"
            : "max-w-5xl px-3 sm:px-6 md:px-8 pt-32 sm:pt-28 pb-20"
        }`}
      >
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
                  className="flex flex-col gap-6 scroll-mt-36 sm:scroll-mt-28"
                >
                  {phase.id !== 7 && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className="text-[10.5px] sm:text-xs font-mono font-bold tracking-[0.2em] text-white uppercase bg-white/10 px-2.5 py-1 rounded shrink-0">
                        PHASE {phase.roman}
                      </span>
                      <span className="text-xs sm:text-sm font-mono tracking-[0.15em] text-stone-300 uppercase font-semibold">
                        {phase.title}
                      </span>
                    </div>
                    <span className="text-[9.5px] sm:text-[10.5px] font-mono text-stone-500 uppercase tracking-widest pl-0.5 sm:pl-0">
                      {phase.years} • {movies.length} {movies.length === 1 ? "MOVIE" : "MOVIES"}
                    </span>
                  </div>
                  )}

                  {phase.id === 7 ? (
                    <div className="flex flex-col gap-8">
                      {[
                        { key: "Earth-96283", name: "Sam Raimi Spider-Man Trilogy", badge: "EARTH-96283" },
                        { key: "Earth-120703", name: "The Amazing Spider-Man Duology", badge: "EARTH-120703" },
                        { key: "Earth-10005", name: "Fox Mutant Universe & Wolverine Saga", badge: "EARTH-10005" },
                        { key: "Earth-121698", name: "Tim Story Fantastic Four Duology", badge: "EARTH-121698" },
                        { key: "Earth-82111", name: "What If...? Animated Multiverse", badge: "EARTH-82111" },
                        { key: "Earth-2149", name: "Marvel Zombies Apocalypse", badge: "EARTH-2149" },
                      ].map((earth) => {
                        const earthMovies = movies.filter((m) => m.earthDesignation === earth.key);
                        if (earthMovies.length === 0) return null;
                        return (
                          <div key={earth.key} className="flex flex-col gap-4">
                            <div className="flex items-center gap-2.5 pb-2 border-b border-white/5">
                              <span className="text-[9.5px] sm:text-[10px] font-mono font-bold tracking-[0.2em] text-white uppercase bg-white/10 px-2 py-0.5 rounded">
                                {earth.badge}
                              </span>
                              <span className="text-xs sm:text-[13px] font-mono tracking-[0.12em] text-stone-300 uppercase font-medium">
                                {earth.name}
                              </span>
                              <span className="text-stone-600 font-mono text-[10px]">•</span>
                              <span className="text-[9.5px] font-mono text-stone-500 uppercase tracking-widest">
                                {earthMovies.length} {earthMovies.length === 1 ? "MOVIE" : "MOVIES"}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                              {earthMovies.map((movie) => {
                                const posterUrl = getMoviePoster(movie);
                                return (
                                  <Link
                                    key={movie.id}
                                    id={`movie-node-${movie.id}`}
                                    data-movie-id={movie.id}
                                    href={`/timeline/${movie.id}?view=${layoutMode}&phase=${movie.phase === 7 ? "X" : movie.phase}&earth=${activeEarthFilter}`}
                                    className="group relative flex flex-col gap-2 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1.5"
                                  >
                                    <div className="relative w-full aspect-[2/3] overflow-hidden bg-stone-950 rounded-xl border border-white/10 group-hover:border-white/30 shadow-xl transition-all block">
                                      <img
                                        src={posterUrl}
                                        alt={movie.title}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover object-center filter brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-500 ease-out [image-rendering:-webkit-optimize-contrast]"
                                        onError={(e) => {
                                          (e.target as HTMLImageElement).src =
                                            "https://image.tmdb.org/t/p/w780/78lPtwv72eTNqFW9COBYI0dWDJa.jpg";
                                        }}
                                      />
                                    </div>
                                    <div className="flex flex-col gap-0.5 min-w-0">
                                      <h3
                                        className="text-xs sm:text-[13px] font-mono font-bold tracking-wider uppercase text-white group-hover:text-white transition-colors truncate"
                                        title={movie.title}
                                      >
                                        {movie.title}
                                      </h3>
                                      <div className="flex items-center gap-1.5 text-[9px] sm:text-[9.5px] font-mono uppercase tracking-wider text-stone-500">
                                        <span>{movie.year}</span>
                                        {movie.runtime ? (
                                          <>
                                            <span className="text-stone-700">•</span>
                                            <span>{formatDuration(movie.runtime)}</span>
                                          </>
                                        ) : null}
                                      </div>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                      {movies.map((movie) => {
                        const posterUrl = getMoviePoster(movie);
                        return (
                          <Link
                            key={movie.id}
                            id={`movie-node-${movie.id}`}
                            data-movie-id={movie.id}
                            href={`/timeline/${movie.id}?view=${layoutMode}&phase=${movie.phase === 7 ? "X" : movie.phase}&earth=${activeEarthFilter}`}
                            className="group relative flex flex-col gap-2 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1.5"
                          >
                            <div className="relative w-full aspect-[2/3] overflow-hidden bg-stone-950 rounded-xl border border-white/10 group-hover:border-white/30 shadow-xl transition-all block">
                              <img
                                src={posterUrl}
                                alt={movie.title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover object-center filter brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-500 ease-out [image-rendering:-webkit-optimize-contrast]"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "https://image.tmdb.org/t/p/w780/78lPtwv72eTNqFW9COBYI0dWDJa.jpg";
                                }}
                              />
                            </div>
                            <div className="flex flex-col gap-0.5 min-w-0">
                              <h3
                                className="text-xs sm:text-[13px] font-mono font-bold tracking-wider uppercase text-white group-hover:text-white transition-colors truncate"
                                title={movie.title}
                              >
                                {movie.title}
                              </h3>
                              <div className="flex items-center gap-1.5 text-[9px] sm:text-[9.5px] font-mono uppercase tracking-wider text-stone-500">
                                <span>{movie.year}</span>
                                {movie.runtime ? (
                                  <>
                                    <span className="text-stone-700">•</span>
                                    <span>{formatDuration(movie.runtime)}</span>
                                  </>
                                ) : null}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        ) : (
          <div
            key="view-path"
            className="animate-in fade-in-0 slide-in-from-bottom-8 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            <TimelineDoomsdayLayout movies={filteredMovies} viewMode={layoutMode} earth={activeEarthFilter} />
          </div>
        )}
      </div>

      <SlideNavMenu isOpen={navMenuOpen} onClose={() => setNavMenuOpen(false)} />
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      <AmbientAudio />
    </div>
  );
}
