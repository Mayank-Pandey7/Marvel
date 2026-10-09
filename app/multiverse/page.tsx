"use client";

import React, { useState, useMemo, useEffect, useCallback, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ArrowRight, ArrowLeft, X, Zap } from "lucide-react";
import PageShell from "@/components/PageShell";
import { UNIVERSES, type UniverseDimension, type UniverseCategory } from "@/data/universes";
import StampUniverseCard from "@/components/multiverse/StampUniverseCard";
import { LineNav, type LineNavItem } from "@/components/line-nav";
import SlideNavMenu from "@/components/dark/SlideNavMenu";

const CATEGORIES = [
  { id: "all", title: "ALL REALITIES", badge: "MULTIVERSAL ARCHIVE" },
  { id: "sacred", title: "SACRED & PRIME", badge: "EARTH-616 & PRIME" },
  { id: "alternate", title: "ALTERNATE EARTHS", badge: "BRANCHED CONTINUITIES" },
  { id: "void", title: "VOID & TIMELESS", badge: "END OF TIME" },
  { id: "incursion", title: "INCURSION THREATS", badge: "CATACLYSM COLLISION" },
  { id: "whatif", title: "WHAT IF & ANIMATED", badge: "DIVERGENT NEXUS" },
];

function MultiverseContent() {
  const searchParams = useSearchParams();
  const paramCat = searchParams.get("category");
  const paramQuery = searchParams.get("q");
  const paramUniverse = searchParams.get("universe");

  const [searchQuery, setSearchQuery] = useState(paramQuery || "");
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const catParam = urlParams.get("category");
      if (catParam && CATEGORIES.some((c) => c.id === catParam)) {
        return catParam;
      }
      try {
        const savedCat = localStorage.getItem("mcu_multiverse_category_filter");
        if (savedCat && CATEGORIES.some((c) => c.id === savedCat)) {
          return savedCat;
        }
      } catch {}
    }
    return "all";
  });

  const [activeUniverseId, setActiveUniverseId] = useState<string | null>(paramUniverse || null);
  const [stage, setStage] = useState<"entering" | "expanded" | "closing">("entering");
  const [navMenuOpen, setNavMenuOpen] = useState(false);

  useEffect(() => {
    if (activeUniverseId) {
      setStage("entering");
      const t = setTimeout(() => {
        setStage("expanded");
      }, 40);
      return () => clearTimeout(t);
    }
  }, [activeUniverseId]);

  useEffect(() => {
    if (paramCat && CATEGORIES.some((c) => c.id === paramCat)) {
      setSelectedCategory(paramCat);
    } else if (paramCat === "all" || !paramCat) {
      setSelectedCategory("all");
    }
    if (paramQuery !== null) setSearchQuery(paramQuery);
    if (paramUniverse) setActiveUniverseId(paramUniverse);
  }, [paramCat, paramQuery, paramUniverse]);

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    try {
      localStorage.setItem("mcu_multiverse_category_filter", categoryId);
      const url = new URL(window.location.href);
      if (categoryId === "all") {
        url.searchParams.delete("category");
      } else {
        url.searchParams.set("category", categoryId);
      }
      window.history.replaceState({}, "", url.toString());
    } catch {}
  };

  const universeNavItems: LineNavItem[] = useMemo(() => {
    return CATEGORIES.map((c) => {
      return {
        title: c.title,
        href: `#${c.id}`,
      };
    });
  }, []);

  const filteredUniverses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return UNIVERSES.filter((u) => {
      if (q) {
        const nameLower = u.name.toLowerCase();
        const desigLower = u.designation.toLowerCase();
        const descLower = u.description.toLowerCase();
        const govLower = u.governingForce.toLowerCase();
        const anchorLower = u.anchorBeing.toLowerCase();

        const nameMatch = nameLower.includes(q);
        const desigMatch = desigLower.includes(q);
        const descMatch = descLower.includes(q);
        const govMatch = govLower.includes(q);
        const anchorMatch = anchorLower.includes(q);

        const inhabitantMatch = u.keyInhabitants.some((inh) =>
          inh.toLowerCase().includes(q)
        );

        if (!nameMatch && !desigMatch && !descMatch && !govMatch && !anchorMatch && !inhabitantMatch) {
          return false;
        }
      }

      if (selectedCategory !== "all") {
        if (u.category !== selectedCategory) return false;
      }

      return true;
    }).sort((a, b) => {
      if (!q) return 0;
      const aNameStart = a.name.toLowerCase().startsWith(q);
      const bNameStart = b.name.toLowerCase().startsWith(q);
      if (aNameStart && !bNameStart) return -1;
      if (!aNameStart && bNameStart) return 1;
      return 0;
    });
  }, [searchQuery, selectedCategory]);

  const activeCategoryMeta = useMemo(() => {
    const item = CATEGORIES.find((c) => c.id === selectedCategory);
    return item || CATEGORIES[0];
  }, [selectedCategory]);

  const activeIndex = useMemo(() => {
    if (!activeUniverseId) return 0;
    const idx = filteredUniverses.findIndex((u) => u.id === activeUniverseId);
    return idx >= 0 ? idx : 0;
  }, [activeUniverseId, filteredUniverses]);

  const currentUniverse = filteredUniverses[activeIndex] || filteredUniverses[0] || UNIVERSES[0];

  const handleClose = () => {
    setStage("closing");
    setTimeout(() => {
      setActiveUniverseId(null);
      try {
        const url = new URL(window.location.href);
        url.searchParams.delete("universe");
        window.history.replaceState({}, "", url.toString());
      } catch {}
    }, 450);
  };

  const handleNext = useCallback(() => {
    if (activeIndex < filteredUniverses.length - 1) {
      setActiveUniverseId(filteredUniverses[activeIndex + 1].id);
    }
  }, [activeIndex, filteredUniverses]);

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) {
      setActiveUniverseId(filteredUniverses[activeIndex - 1].id);
    }
  }, [activeIndex, filteredUniverses]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeUniverseId) handleClose();
      }
      if (activeUniverseId) {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") handleNext();
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeUniverseId, handleNext, handlePrev]);

  // Fullscreen Reality Dossier View (matching /thor DeepMovieDetail experience)
  if (activeUniverseId && currentUniverse) {
    const isExpanded = stage === "expanded";
    const isClosing = stage === "closing";

    return (
      <div
        onMouseDown={(e) => e.stopPropagation()}
        onMouseMove={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        className={`fixed inset-0 w-screen h-screen z-50 flex flex-col justify-between select-none bg-black/65 backdrop-blur-2xl text-stone-300 overflow-hidden font-sans transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isClosing
            ? "opacity-0 scale-98 pointer-events-none filter blur-sm"
            : isExpanded
            ? "opacity-100 scale-100"
            : "opacity-0 scale-105 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={currentUniverse.backdrop}
            alt={currentUniverse.name}
            className={`w-full h-full object-cover object-center filter brightness-100 contrast-[1.05] transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isExpanded ? "scale-105 opacity-100" : "scale-125 opacity-0"
            }`}
          />

          <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
        </div>

        <header
          className={`fixed top-0 left-0 right-0 w-full px-4 sm:px-8 py-4 sm:py-6 min-h-[58px] sm:min-h-[72px] flex items-center justify-between z-50 bg-transparent pointer-events-none transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isExpanded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={handleClose}
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/90 text-stone-200 hover:text-white border border-white/20 hover:border-white/50 backdrop-blur-md shadow-lg transition-all duration-200 cursor-pointer active:scale-95 group"
              title="Close Reality Dossier"
              aria-label="Close Reality Dossier"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
            </button>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto">
            <span className="text-xs sm:text-sm md:text-base font-mono font-bold tracking-[0.45em] sm:tracking-[0.55em] uppercase text-white select-none whitespace-nowrap pl-[0.45em] sm:pl-[0.55em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              MARVEL
            </span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/90 text-stone-200 hover:text-white border border-white/20 hover:border-white/50 backdrop-blur-md shadow-lg transition-all duration-200 cursor-pointer active:scale-95 ${
                activeIndex === 0 ? "opacity-30 cursor-not-allowed" : ""
              }`}
              title="Previous Reality"
            >
              <ArrowLeft size={14} />
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === filteredUniverses.length - 1}
              className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/90 text-stone-200 hover:text-white border border-white/20 hover:border-white/50 backdrop-blur-md shadow-lg transition-all duration-200 cursor-pointer active:scale-95 ${
                activeIndex === filteredUniverses.length - 1 ? "opacity-30 cursor-not-allowed" : ""
              }`}
              title="Next Reality"
            >
              <ArrowRight size={14} />
            </button>
          </div>
        </header>

        <main className="relative z-20 flex-1 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 pt-16 pb-8 sm:pb-12 md:pb-14 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 lg:gap-16 xl:gap-20 overflow-y-auto w-full min-h-[calc(100vh-80px)] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-stone-800 [&::-webkit-scrollbar-thumb]:rounded-full">
          <div
            className={`flex-1 max-w-5xl lg:max-w-6xl flex flex-col sm:flex-row items-start sm:items-end gap-6 sm:gap-8 w-full transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-100 ${
              isExpanded ? "opacity-100 translate-x-0 translate-y-0 blur-0" : "opacity-0 -translate-x-12 translate-y-4 blur-sm"
            }`}
          >
            <div className="w-44 xs:w-48 sm:w-56 md:w-64 lg:w-72 aspect-[2/3] rounded-2xl overflow-hidden border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.95)] shrink-0 bg-stone-900 group relative self-start">
              <img
                src={currentUniverse.backdrop}
                alt={currentUniverse.name}
                loading="eager"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />
            </div>

            <div className="flex-1 flex flex-col justify-end min-w-0 pb-1 text-left items-start w-full">
              <h2
                className={`font-mono font-semibold ${
                  currentUniverse.name.length > 28
                    ? "text-2xl xs:text-3xl sm:text-3xl md:text-4xl lg:text-5xl"
                    : currentUniverse.name.length > 18
                    ? "text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-6xl"
                    : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                } text-white uppercase leading-tight mt-1 drop-shadow-[0_0_35px_rgba(255,255,255,0.3)] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-150 ${
                  isExpanded
                    ? `${currentUniverse.name.length > 18 ? "tracking-[0.05em] sm:tracking-[0.08em]" : "tracking-[0.08em] sm:tracking-[0.12em]"} opacity-100 scale-100`
                    : "tracking-[0.35em] opacity-0 scale-95"
                }`}
              >
                {currentUniverse.name}
              </h2>

              <div className="mt-4 text-sm text-stone-300 font-sans font-light leading-relaxed">
                <p>{currentUniverse.description}</p>
                {currentUniverse.keyInhabitants && currentUniverse.keyInhabitants.length > 0 && (
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-mono text-stone-300">
                    <span className="text-stone-500 uppercase tracking-widest text-[10px]">
                      KEY INHABITANTS:
                    </span>
                    {currentUniverse.keyInhabitants.slice(0, 6).map((inh: string) => (
                      <span key={inh} className="border border-white/30 rounded-full px-2.5 py-0.5 text-white font-medium text-[11px]">
                        {inh}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {currentUniverse.incursionVector && (
                <div className="mt-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md relative max-w-lg shadow-lg overflow-hidden">
                  <div
                    className="absolute top-0 left-0 bottom-0 w-1"
                    style={{ background: `linear-gradient(to bottom, ${currentUniverse.color || "#fff"}dd, ${currentUniverse.color || "#fff"}22)` }}
                  />
                  <p className="text-xs font-sans italic text-stone-100 leading-relaxed pl-2 font-normal">
                    &ldquo;{currentUniverse.incursionVector}&rdquo;
                  </p>
                  <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest mt-1 pl-2 font-bold">
                    — INCURSION VECTOR • {currentUniverse.threatLevel.replace("_", " ")}
                  </p>
                </div>
              )}

              <div className="mt-4 flex items-center flex-wrap gap-2.5 text-[11px] font-mono tracking-[0.25em] text-stone-400 uppercase font-semibold">
                <span className="px-2.5 py-0.5 rounded bg-white/10 text-white font-bold">{currentUniverse.designation.split("/")[0].trim()}</span>
                <span className="text-stone-600">•</span>
                <span className="text-stone-300">ANCHOR: {currentUniverse.anchorBeing.split("(")[0].trim()}</span>
                <span className="text-stone-600">•</span>
                <span className="text-stone-400">GOVERNING: {currentUniverse.governingForce}</span>
                <span className="text-stone-600">•</span>
                <span className="text-stone-300">DIMENSION {activeIndex + 1} OF {filteredUniverses.length}</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Main Archives Grid View (Synchronized with /artifacts and /characters/heroes)
  return (
    <PageShell backHref="/timeline" backLabel="TIMELINE">
      {/* Top-Right Floating SELECT REALITIES List matching /artifacts styling */}
      <div
        className="fixed top-14 sm:top-20 right-3 sm:right-8 z-40 pointer-events-none flex flex-col items-end gap-1.5 origin-top-right scale-[0.82] sm:scale-100"
      >
        {/* SELECT REALITIES pill */}
        <div className="pointer-events-none flex gap-0.5 rounded-full p-0.5 bg-black/85 backdrop-blur-md border border-white/15 shadow-xl whitespace-nowrap">
          <span className="rounded-full px-2.5 sm:px-3 py-1 text-[8px] sm:text-[9.5px] font-mono tracking-wider uppercase text-stone-400">
            SELECT REALITIES
          </span>
        </div>

        {/* Reality Category LineNav */}
        <div className="pointer-events-auto">
          <LineNav
            align="right"
            className="w-auto"
            items={universeNavItems}
            activeHref={`#${selectedCategory}`}
            scrollActiveIntoView={false}
            onItemClick={(item) => {
              const key = item.href.replace("#", "");
              handleSelectCategory(key);
            }}
          />
        </div>
      </div>

      <div className="relative min-h-[calc(100vh-80px)] w-full bg-transparent text-stone-300 font-sans selection:bg-white selection:text-black">
        <div className="relative z-10 mx-auto flex flex-col gap-10 max-w-5xl px-3 sm:px-6 md:px-8 pt-10 sm:pt-12 pb-24">
          {/* Search and Overview Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 w-full">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-xs font-mono tracking-[0.25em] text-stone-400 uppercase font-bold">
                ARCHIVES · {filteredUniverses.length} REALITIES &amp; DIMENSIONS
              </span>
              <span className="text-stone-600 font-mono text-xs">•</span>
              <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-amber-400/90 uppercase font-semibold">
                {activeCategoryMeta.title}
              </span>
            </div>

            <div className="relative w-full sm:w-72 md:w-80 flex items-center bg-white/[0.04] border border-white/10 px-4 py-2 rounded-full focus-within:border-white/30 transition-all">
              <Search size={14} className="text-stone-400 shrink-0 mr-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH REALITIES..."
                className="w-full bg-transparent text-[11px] sm:text-xs font-mono tracking-[0.16em] uppercase text-stone-100 placeholder:text-stone-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-stone-400 hover:text-stone-200 text-[9.5px] font-mono tracking-widest px-2 py-0.5 uppercase cursor-pointer"
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>

          {/* Empty State or Sections */}
          {filteredUniverses.length === 0 ? (
            <div className="text-center py-28 w-full flex flex-col items-center justify-center animate-in fade-in duration-300">
              <h3 className="text-sm font-mono tracking-[0.25em] uppercase text-stone-300 font-bold">
                NO RECORDS FOUND
              </h3>
              <p className="text-xs font-mono tracking-wide text-stone-500 mt-1.5 max-w-sm mx-auto">
                No multiverse dimension matches the active category or search query.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  handleSelectCategory("all");
                }}
                className="mt-5 text-stone-300 hover:text-white text-[10px] font-mono tracking-widest uppercase cursor-pointer bg-white/5 border border-white/10 px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors"
              >
                RESET FILTERS
              </button>
            </div>
          ) : selectedCategory === "all" && !searchQuery ? (
            <div className="flex flex-col gap-14 animate-in fade-in-0 slide-in-from-bottom-8 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
              {CATEGORIES.filter((c) => c.id !== "all").map((cat) => {
                const items = UNIVERSES.filter((u) => u.category === cat.id);
                if (items.length === 0) return null;
                return (
                  <section
                    key={`category-section-${cat.id}`}
                    id={`category-section-${cat.id}`}
                    className="flex flex-col gap-6 scroll-mt-36 sm:scroll-mt-28"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3 border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span className="text-[10.5px] sm:text-xs font-mono font-bold tracking-[0.2em] text-white uppercase bg-white/10 px-2.5 py-1 rounded shrink-0">
                          {cat.badge}
                        </span>
                        <span className="text-xs sm:text-sm font-mono tracking-[0.15em] text-stone-300 uppercase font-semibold">
                          {cat.title}
                        </span>
                      </div>
                      <span className="text-[9.5px] sm:text-[10.5px] font-mono text-stone-500 uppercase tracking-widest pl-0.5 sm:pl-0">
                        {items.length} {items.length === 1 ? "REALITY" : "REALITIES"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6">
                      {items.map((universe, index) => (
                        <StampUniverseCard
                          key={universe.id}
                          universe={universe}
                          index={index}
                          onClick={() => setActiveUniverseId(universe.id)}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col gap-14 animate-in fade-in-0 slide-in-from-bottom-8 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <section
                key={`category-section-${selectedCategory}`}
                className="flex flex-col gap-6 scroll-mt-36 sm:scroll-mt-28"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="text-[10.5px] sm:text-xs font-mono font-bold tracking-[0.2em] text-white uppercase bg-white/10 px-2.5 py-1 rounded shrink-0">
                      {searchQuery ? "SEARCH RESULTS" : activeCategoryMeta.badge}
                    </span>
                    <span className="text-xs sm:text-sm font-mono tracking-[0.15em] text-stone-300 uppercase font-semibold">
                      {searchQuery ? `QUERY: "${searchQuery.toUpperCase()}"` : activeCategoryMeta.title}
                    </span>
                  </div>
                  <span className="text-[9.5px] sm:text-[10.5px] font-mono text-stone-500 uppercase tracking-widest pl-0.5 sm:pl-0">
                    {filteredUniverses.length} {filteredUniverses.length === 1 ? "REALITY" : "REALITIES"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6">
                  {filteredUniverses.map((universe, index) => (
                    <StampUniverseCard
                      key={universe.id}
                      universe={universe}
                      index={index}
                      onClick={() => setActiveUniverseId(universe.id)}
                    />
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}

export default function MultiversePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <MultiverseContent />
    </Suspense>
  );
}
