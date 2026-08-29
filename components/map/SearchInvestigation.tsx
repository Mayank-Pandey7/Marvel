"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { Search, X, ChevronRight } from "lucide-react";
import { ALL_PHASE_MOVIES, type MovieNode } from "@/data/movies";
import NodeArtwork from "./NodeArtwork";

const ALL_MOVIES_FLAT = Object.values(ALL_PHASE_MOVIES).flat();

export default function SearchInvestigation({
  isOpen,
  onClose,
  onSelectMovie,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelectMovie: (movie: MovieNode) => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredMovies = useMemo(() => {
    if (!query.trim()) return ALL_MOVIES_FLAT;
    const q = query.toLowerCase().trim();
    return ALL_MOVIES_FLAT.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.heroAlias.toLowerCase().includes(q) ||
        m.leadCharacter.toLowerCase().includes(q) ||
        m.quote.toLowerCase().includes(q) ||
        String(m.year).includes(q) ||
        `phase ${m.phase}`.includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none animate-in fade-in duration-200 no-map-drag search-modal-container"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* Transparent Dim Backdrop with Subtle Blur */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        onWheel={(e) => e.stopPropagation()}
      />

      {/* Transparent Glass Spatial Modal Container */}
      <div 
        className="relative z-10 w-full max-w-3xl bg-black/50 backdrop-blur-md p-5 sm:p-8 flex flex-col gap-6 animate-in zoom-in-95 duration-200 no-map-drag search-modal-container"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        
        {/* Borderless Search Input Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800/40">
          <div className="flex items-center gap-3.5 flex-1 mr-2">
            <Search size={16} className="text-stone-500 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH ACROSS 6 PHASES (IRON MAN, THANOS, LOKI, DOOM)..."
              className="w-full bg-transparent text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-white placeholder-stone-600 focus:outline-none"
            />
          </div>

          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-stone-500 hover:text-stone-300 text-[10px] font-mono uppercase tracking-widest mr-2 cursor-pointer transition-colors"
            >
              CLEAR
            </button>
          )}

          <button
            onClick={onClose}
            className="text-stone-500 hover:text-white transition-colors p-1 cursor-pointer"
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results Stream with Clean Custom Scrollbar & Overscroll Contain */}
        <div 
          className="flex flex-col gap-1 max-h-[60vh] overflow-y-auto overscroll-contain pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-stone-800 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.25em] text-stone-500 uppercase px-2 mb-2">
            <span>{filteredMovies.length} CHRONOLOGY ENTRIES</span>
            {query && <span>FILTERED</span>}
          </div>

          {filteredMovies.length === 0 ? (
            <div className="py-16 text-center text-xs font-mono text-stone-500 tracking-[0.2em] uppercase">
              No anomalies found for &ldquo;{query}&rdquo; in the Sacred Timeline.
            </div>
          ) : (
            filteredMovies.map((movie) => (
              <button
                key={movie.id}
                onClick={() => {
                  onSelectMovie(movie);
                  onClose();
                }}
                className="group w-full flex items-center justify-between p-3 sm:p-3.5 hover:bg-white/[0.04] transition-all text-left cursor-pointer border-b border-stone-900/40 last:border-b-0"
              >
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 pr-3">
                  {/* Miniature Node Icon */}
                  <div className="w-10 h-10 shrink-0 rounded-full border border-stone-800 group-hover:border-white/60 transition-colors overflow-hidden p-0.5 bg-black/60">
                    <NodeArtwork movieId={movie.id} />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-xs sm:text-sm font-mono font-medium text-white group-hover:text-white tracking-wider truncate">
                        {movie.title}
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-mono text-stone-400 tracking-widest uppercase">
                        PHASE {movie.phase} · {movie.year}
                      </span>
                    </div>

                    <span className="text-[10px] sm:text-[11px] font-mono text-stone-500 group-hover:text-stone-400 transition-colors mt-0.5 truncate max-w-xl">
                      {movie.heroAlias} {movie.quote ? `· "${movie.quote}"` : ""}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-stone-600 group-hover:text-white transition-colors shrink-0">
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] hidden sm:inline text-stone-500 group-hover:text-white transition-colors">
                    JUMP TO NODE
                  </span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer Hint */}
        <div className="pt-3 border-t border-stone-900/40 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-stone-500 tracking-[0.2em] uppercase">
          <div className="flex items-center gap-1.5">
            <span>PRESS</span>
            <kbd className="px-1.5 py-0.5 bg-stone-900/80 border border-stone-800 text-stone-400">ESC</kbd>
            <span>TO CLOSE</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5">
            <span>PRESS</span>
            <kbd className="px-1.5 py-0.5 bg-stone-900/80 border border-stone-800 text-stone-400">/</kbd>
            <span>TO SEARCH</span>
          </div>
        </div>
      </div>
    </div>
  );
}
