"use client";

import React, { useState, useMemo, useEffect, useCallback, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ArrowRight, X, Globe, Zap, ArrowLeft, ArrowUpRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import { UNIVERSES, type UniverseDimension, type UniverseCategory } from "@/data/universes";
import SlideNavMenu from "@/components/dark/SlideNavMenu";

const CATEGORIES = [
  { id: "all", label: "ALL REALITIES" },
  { id: "sacred", label: "SACRED & PRIME" },
  { id: "alternate", label: "ALTERNATE EARTHS" },
  { id: "void", label: "VOID & TIMELESS" },
  { id: "incursion", label: "INCURSION THREATS" },
  { id: "whatif", label: "WHAT IF & MULTIVERSE" },
];

function MultiverseContent() {
  const searchParams = useSearchParams();
  const paramCat = searchParams.get("category");
  const paramQuery = searchParams.get("q");
  const paramUniverse = searchParams.get("universe");

  const [searchQuery, setSearchQuery] = useState(paramQuery || "");
  const [selectedCategory, setSelectedCategory] = useState<string>(paramCat || "all");
  const [activeUniverseId, setActiveUniverseId] = useState<string | null>(paramUniverse || null);
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [waveDirection, setWaveDirection] = useState<"next" | "prev">("next");
  const [isRippling, setIsRippling] = useState(false);

  const isScrollLocked = useRef(false);

  useEffect(() => {
    if (paramCat) setSelectedCategory(paramCat);
    else setSelectedCategory("all");
    if (paramQuery !== null) setSearchQuery(paramQuery);
    if (paramUniverse) setActiveUniverseId(paramUniverse);
  }, [paramCat, paramQuery, paramUniverse]);

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

  const activeIndex = useMemo(() => {
    if (!activeUniverseId) return 0;
    const idx = filteredUniverses.findIndex((u) => u.id === activeUniverseId);
    return idx >= 0 ? idx : 0;
  }, [activeUniverseId, filteredUniverses]);

  const currentUniverse = filteredUniverses[activeIndex] || filteredUniverses[0] || UNIVERSES[0];

  const triggerSmoothLiquidWave = useCallback(() => {
    setIsRippling(true);
    setTimeout(() => {
      setIsRippling(false);
    }, 1000);
  }, []);

  const goToUniverse = useCallback((index: number, direction?: "next" | "prev") => {
    if (index >= 0 && index < filteredUniverses.length && index !== activeIndex) {
      const dir = direction || (index > activeIndex ? "next" : "prev");
      setWaveDirection(dir);
      setActiveUniverseId(filteredUniverses[index].id);
      triggerSmoothLiquidWave();
    }
  }, [filteredUniverses, activeIndex, triggerSmoothLiquidWave]);

  const handleNext = useCallback(() => {
    if (activeIndex < filteredUniverses.length - 1) {
      setWaveDirection("next");
      triggerSmoothLiquidWave();
      setActiveUniverseId(filteredUniverses[activeIndex + 1].id);
    }
  }, [activeIndex, filteredUniverses, triggerSmoothLiquidWave]);

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) {
      setWaveDirection("prev");
      triggerSmoothLiquidWave();
      setActiveUniverseId(filteredUniverses[activeIndex - 1].id);
    }
  }, [activeIndex, filteredUniverses, triggerSmoothLiquidWave]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeUniverseId) setActiveUniverseId(null);
      }
      if (activeUniverseId) {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") handleNext();
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeUniverseId, handleNext, handlePrev]);

  useEffect(() => {
    if (!activeUniverseId) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 18) return;
      if (isScrollLocked.current) return;

      isScrollLocked.current = true;

      if (e.deltaY > 0) {
        handleNext();
      } else {
        handlePrev();
      }

      setTimeout(() => {
        isScrollLocked.current = false;
      }, 750);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeUniverseId, handleNext, handlePrev]);

  if (activeUniverseId && currentUniverse) {
    return (
      <div className="relative w-screen h-screen bg-black text-stone-200 font-sans selection:bg-white selection:text-black overflow-hidden select-none">

        {}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {filteredUniverses.map((univ, idx) => {
            const isActive = idx === activeIndex;
            const isPrev = idx < activeIndex;

            return (
              <div
                key={univ.id}
                className="absolute inset-0 w-full h-full will-change-[opacity,transform,filter]"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive
                    ? "scale(1) translateY(0) rotate(0deg)"
                    : isPrev
                    ? "scale(1.08) translateY(-24px) rotate(0.4deg)"
                    : "scale(0.96) translateY(24px) rotate(-0.4deg)",
                  filter: isActive ? "blur(0px)" : "blur(8px)",
                  transition: "opacity 1000ms cubic-bezier(0.25, 1, 0.5, 1), transform 1100ms cubic-bezier(0.16, 1, 0.3, 1), filter 1000ms cubic-bezier(0.25, 1, 0.5, 1)",
                }}
              >
                <img
                  src={univ.backdrop}
                  alt={univ.name}
                  className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
                />
              </div>
            );
          })}

          {}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/55 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50 z-10 pointer-events-none" />

          {}
          <div
            className="absolute inset-0 pointer-events-none z-15 will-change-[opacity,transform]"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${currentUniverse.color || "#fff"}22 0%, rgba(255, 255, 255, 0.04) 40%, transparent 70%)`,
              opacity: isRippling ? 1 : 0,
              transform: isRippling ? "scale(1.15) translateY(0)" : "scale(0.85) translateY(20px)",
              transition: "opacity 900ms cubic-bezier(0.22, 1, 0.36, 1), transform 1000ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </div>

        {/* Synchronized Global Header Navbar */}
        <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 sm:py-6 min-h-[58px] sm:min-h-[72px] flex items-center justify-between bg-transparent pointer-events-none">
          {/* Left Side: Drawer Menu Trigger */}
          <button
            onClick={() => setNavMenuOpen(true)}
            className="text-stone-300 hover:text-white transition-colors cursor-pointer p-1.5 group pointer-events-auto"
            title="Open Universe Menu"
            aria-label="Open Universe Menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className="h-[1.5px] w-5 bg-current block group-hover:w-6 transition-all" />
              <span className="h-[1.5px] w-3.5 bg-current block group-hover:w-5 transition-all" />
            </div>
          </button>

          {/* Center: Brand Header */}
          <div className="text-xs sm:text-sm md:text-base font-mono font-bold tracking-[0.45em] sm:tracking-[0.55em] uppercase text-white pl-[0.45em] sm:pl-[0.55em] pointer-events-auto">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              MARVEL
            </Link>
          </div>

          {/* Right Side: Close Button */}
          <button
            onClick={() => setActiveUniverseId(null)}
            className="text-stone-300 hover:text-white p-1.5 transition-colors cursor-pointer pointer-events-auto rounded-full hover:bg-white/10"
            title="Close Reality Dossier (Esc)"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </header>

        {}
        <main className="relative z-20 w-full h-full px-6 sm:px-12 md:px-16 flex flex-col justify-between pt-24 pb-12">

          {}
          <div className="h-2" />

          {}
          <div className="w-full max-w-3xl my-auto">

            <div
              key={currentUniverse.id}
              className={`flex flex-col gap-3.5 ${
                waveDirection === "next"
                  ? "animate-wave-up"
                  : "animate-wave-down"
              }`}
            >

              {/* Designation Header */}
              <div className="flex items-center gap-2.5 text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase text-stone-400">
                <span
                  className="w-2 h-2 rounded-full inline-block shrink-0"
                  style={{ backgroundColor: currentUniverse.color }}
                />
                <span>{currentUniverse.designation}</span>
              </div>

              {}
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-mono font-bold tracking-[0.14em] uppercase text-white leading-tight">
                {currentUniverse.name}
              </h1>

              {}
              <p className="text-xs sm:text-sm md:text-base font-mono tracking-wide text-stone-300 leading-relaxed max-w-2xl">
                {currentUniverse.description}
              </p>

              {}
              <div
                className="mt-2 p-3.5 sm:p-4 bg-black/50 backdrop-blur-md border-l-2 flex flex-col gap-1 max-w-2xl rounded-r-lg"
                style={{ borderColor: currentUniverse.color }}
              >
                <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-stone-400">
                  <Zap size={11} style={{ color: currentUniverse.color }} />
                  <span>INCURSION COLLISION VECTOR</span>
                </div>
                <p className="text-xs sm:text-sm font-mono text-stone-200 leading-relaxed">
                  {currentUniverse.incursionVector}
                </p>
              </div>

              {}
              <div className="mt-1 flex flex-wrap items-center gap-3 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-stone-400 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                  <span className="text-[9px] uppercase tracking-widest text-stone-500">ANCHOR:</span>
                  <span className="text-stone-200 font-bold">{currentUniverse.anchorBeing.split("(")[0].trim()}</span>
                </div>

                <div className="flex items-center gap-1.5 text-stone-400 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                  <span className="text-[9px] uppercase tracking-widest text-stone-500">GOVERNING:</span>
                  <span className="text-stone-200 font-bold truncate max-w-[240px]">{currentUniverse.governingForce}</span>
                </div>
              </div>

              {}
              {currentUniverse.keyInhabitants && currentUniverse.keyInhabitants.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1.5 max-w-2xl">
                  {currentUniverse.keyInhabitants.map((inh, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-[9.5px] font-mono tracking-wider uppercase bg-white/10 text-stone-300 rounded"
                    >
                      {inh}
                    </span>
                  ))}
                </div>
              )}

              {}
              <div className="mt-4 flex items-center justify-between text-[10px] font-mono tracking-[0.3em] uppercase text-stone-500 max-w-2xl">
                <span>DIMENSION {activeIndex + 1} OF {filteredUniverses.length}</span>
                <Link
                  href="/familytree"
                  className="text-stone-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>FAMILY TREE</span>
                  <ArrowRight size={11} />
                </Link>
              </div>

            </div>

          </div>

        </main>

        {}
        <SlideNavMenu isOpen={navMenuOpen} onClose={() => setNavMenuOpen(false)} />

        {}
        <style jsx global>{`
          @keyframes waveUp {
            0% {
              opacity: 0;
              transform: translateY(22px) scale(0.985);
              filter: blur(5px);
            }
            60% {
              filter: blur(0.5px);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0px);
            }
          }

          @keyframes waveDown {
            0% {
              opacity: 0;
              transform: translateY(-22px) scale(0.985);
              filter: blur(5px);
            }
            60% {
              filter: blur(0.5px);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0px);
            }
          }

          .animate-wave-up {
            animation: waveUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .animate-wave-down {
            animation: waveDown 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}</style>

      </div>
    );
  }

  return (
    <PageShell backHref="/timeline" backLabel="TIMELINE">
      <div className="relative min-h-[calc(100vh-80px)] w-full bg-[#000000] text-stone-300 font-sans selection:bg-white selection:text-black">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 flex flex-col gap-8">

          {}
          <div className="flex flex-col gap-6 pb-2">

            {}
            <div className="relative flex items-center bg-stone-950/60 px-4 py-3 rounded-none focus-within:bg-stone-900/60 transition-colors">
              <Search size={15} className="text-stone-500 shrink-0 mr-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH (REALITY, DESIGNATION, ANCHOR BEING, RESIDENT)..."
                className="w-full bg-transparent text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-stone-100 placeholder:text-stone-600 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-stone-500 hover:text-stone-300 text-[10px] font-mono tracking-widest px-2 py-0.5 uppercase cursor-pointer"
                >
                  CLEAR
                </button>
              )}
            </div>

            {}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono tracking-widest uppercase">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`transition-colors cursor-pointer py-1 ${
                      selectedCategory === c.id
                        ? "text-white font-bold"
                        : "text-stone-500 hover:text-stone-300"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {}
          {filteredUniverses.length === 0 ? (
            <div className="text-center py-28">
              <h3 className="text-sm font-mono tracking-[0.3em] uppercase text-stone-300 font-bold">
                NO REALITIES FOUND
              </h3>
              <p className="text-xs font-mono tracking-wide text-stone-500 mt-1.5 max-w-sm mx-auto">
                No multiverse dimension matches the active query parameters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-5 text-stone-300 hover:text-white text-[10px] font-mono tracking-widest uppercase cursor-pointer"
              >
                RESET FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredUniverses.map((universe) => {
                return (
                  <div
                    key={universe.id}
                    onClick={() => setActiveUniverseId(universe.id)}
                    className="group relative flex flex-col gap-3 transition-all duration-300 ease-out cursor-pointer"
                  >

                    {}
                    <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-stone-950 rounded-xl border border-white/10 shadow-lg">
                      <img
                        src={universe.backdrop}
                        alt={universe.name}
                        className="w-full h-full object-cover object-center filter brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-700 ease-out"
                      />

                      {/* Subtle Vignette Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {}
                    <div className="flex flex-col gap-1">

                      {}
                      <h2 className="text-sm sm:text-[15px] font-mono font-bold tracking-[0.12em] uppercase text-white group-hover:text-stone-200 transition-colors line-clamp-2 min-h-[2.5rem] leading-snug">
                        {universe.name}
                      </h2>

                      {}
                      <div className="text-[10.5px] font-mono tracking-wider uppercase text-stone-400 line-clamp-1">
                        {universe.designation.split("/")[0].trim()} · {universe.anchorBeing.split("(")[0].trim()}
                      </div>

                      {}
                      <div className="pt-1 flex items-center gap-1.5 text-[10.5px] font-mono tracking-[0.2em] uppercase text-stone-400 group-hover:text-white transition-colors">
                        <span>EXPLORE REALITY</span>
                        <ArrowRight size={11} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>

                    </div>

                  </div>
                );
              })}
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
