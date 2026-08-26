"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ArrowRight, Play, ExternalLink, Film, Calendar, Clock } from "lucide-react";
import PageShell from "@/components/PageShell";
import { UNIFIED_MCU_TREE, type MovieNode } from "@/data/movies";
import { MCU_POSTER_MAP } from "@/components/map/NodeArtwork";

const PHASE_FILTERS = [
  { id: "all", label: "ALL MOVIES & SERIES" },
  { id: "1", label: "PHASE 1" },
  { id: "2", label: "PHASE 2" },
  { id: "3", label: "PHASE 3" },
  { id: "4", label: "PHASE 4" },
  { id: "5", label: "PHASE 5" },
  { id: "6", label: "PHASE 6" },
];

function MoviesContent() {
  const searchParams = useSearchParams();
  const paramPhase = searchParams.get("phase");
  const paramQuery = searchParams.get("q");

  const [searchQuery, setSearchQuery] = useState(paramQuery || "");
  const [selectedPhase, setSelectedPhase] = useState(paramPhase || "all");

  useEffect(() => {
    if (paramPhase) {
      setSelectedPhase(paramPhase);
    } else {
      setSelectedPhase("all");
    }
    if (paramQuery !== null) {
      setSearchQuery(paramQuery);
    }
  }, [paramPhase, paramQuery]);

  const allMovies = useMemo(() => {
    const moviesMap = new Map<string, MovieNode>();
    for (const m of UNIFIED_MCU_TREE) {
      if (!moviesMap.has(m.id)) {
        moviesMap.set(m.id, m);
      }
    }
    return Array.from(moviesMap.values());
  }, []);

  const filteredMovies = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return allMovies.filter((m) => {
      if (q) {
        const titleMatch = m.title.toLowerCase().includes(q);
        const directorMatch = m.director.toLowerCase().includes(q);
        const leadMatch = m.leadCharacter ? m.leadCharacter.toLowerCase().includes(q) : false;
        const descMatch = m.description.toLowerCase().includes(q);
        const yearMatch = m.year.toString().includes(q);

        if (!titleMatch && !directorMatch && !leadMatch && !descMatch && !yearMatch) {
          return false;
        }
      }

      if (selectedPhase !== "all") {
        if (m.phase.toString() !== selectedPhase) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (!q) {
        if (a.phase !== b.phase) return a.phase - b.phase;
        return a.year - b.year;
      }

      const aStart = a.title.toLowerCase().startsWith(q);
      const bStart = b.title.toLowerCase().startsWith(q);
      if (aStart && !bStart) return -1;
      if (!aStart && bStart) return 1;
      return 0;
    });
  }, [allMovies, searchQuery, selectedPhase]);

  return (
    <PageShell backHref="/timeline" backLabel="TIMELINE">
      <div className="relative min-h-[calc(100vh-80px)] w-full bg-[#000000] text-stone-300 font-sans selection:bg-white selection:text-black">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 flex flex-col gap-8">

          <div className="flex flex-col gap-5 pb-2">
            <div className="relative flex items-center bg-white/[0.03] border border-white/5 px-4 py-2.5 sm:py-3 rounded-full focus-within:border-white/20 transition-all">
              <Search size={14} className="text-stone-500 shrink-0 mr-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH MCU MOVIES, HEROES, DIRECTORS..."
                className="w-full bg-transparent text-[11px] sm:text-xs font-mono tracking-[0.16em] uppercase text-stone-100 placeholder:text-stone-600 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-stone-500 hover:text-stone-300 text-[9.5px] font-mono tracking-widest px-2 py-0.5 uppercase cursor-pointer"
                >
                  CLEAR
                </button>
              )}
            </div>

            <div className="flex flex-nowrap overflow-x-auto pb-1.5 px-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap items-center gap-4 sm:gap-6 text-[11px] sm:text-xs font-mono tracking-wider uppercase">
              {PHASE_FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedPhase(f.id)}
                  className={`transition-colors cursor-pointer py-1 shrink-0 whitespace-nowrap ${
                    selectedPhase === f.id
                      ? "text-white font-bold"
                      : "text-stone-500 hover:text-stone-300"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {filteredMovies.length === 0 ? (
            <div className="text-center py-28">
              <h3 className="text-sm font-mono tracking-[0.3em] uppercase text-stone-300 font-bold">
                NO MOVIES FOUND
              </h3>
              <p className="text-xs font-mono tracking-wide text-stone-500 mt-1.5 max-w-sm mx-auto">
                No chapter matches the active search query or filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedPhase("all");
                }}
                className="mt-5 text-stone-300 hover:text-white text-[10px] font-mono tracking-widest uppercase cursor-pointer"
              >
                RESET FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {filteredMovies.map((movie) => {
                const posterUrl = MCU_POSTER_MAP[movie.id]?.poster || "";

                return (
                  <div
                    key={movie.id}
                    className="group relative flex flex-col gap-2.5 transition-all duration-300 ease-out"
                  >
                    <Link
                      href={`/timeline?phase=${movie.phase}&movie=${encodeURIComponent(movie.id)}`}
                      className="relative w-full aspect-[2/3] overflow-hidden bg-stone-950 rounded-xl border border-white/10 shadow-xl group-hover:border-white/30 transition-all block"
                    >
                      {posterUrl ? (
                        <img
                          src={posterUrl}
                          alt={movie.title}
                          loading="lazy"
                          className="w-full h-full object-cover object-center filter brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-500 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center p-3 text-center bg-stone-900 text-stone-400 font-mono text-xs">
                          {movie.title}
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 pointer-events-none">
                        <span className="text-[9px] font-mono tracking-widest uppercase text-white flex items-center gap-1">
                          <span>INSPECT IN TIMELINE</span>
                          <ArrowRight size={10} />
                        </span>
                      </div>

                      <div className="absolute top-2.5 left-2.5">
                        <span className="text-[8.5px] font-mono font-bold tracking-widest uppercase bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/15 text-stone-300">
                          PHASE {movie.phase}
                        </span>
                      </div>
                    </Link>

                    <div className="flex flex-col gap-1">
                      <Link
                        href={`/timeline?phase=${movie.phase}&movie=${encodeURIComponent(movie.id)}`}
                        className="text-xs sm:text-[13px] font-mono font-bold tracking-wider uppercase text-white group-hover:text-amber-300 transition-colors line-clamp-1"
                        title={movie.title}
                      >
                        {movie.title}
                      </Link>

                      <div className="flex items-center gap-1.5 text-[9.5px] font-mono text-stone-500 uppercase tracking-widest">
                        <span>{movie.year}</span>
                        <span>•</span>
                        <span>{movie.runtime} MIN</span>
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

export default function MoviesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <MoviesContent />
    </Suspense>
  );
}
