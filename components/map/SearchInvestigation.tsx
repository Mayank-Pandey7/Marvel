"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { Search, X, Film, ChevronRight } from "lucide-react";
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
    const q = query.toLowerCase();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      {/* Dark Dim Backdrop */}
      <div
        className="fixed inset-0 bg-[#020204]/90 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Investigation Modal Container */}
      <div className="relative z-10 w-full max-w-2xl bg-[#07070b]/95 border border-stone-800/90 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col gap-6 animate-in zoom-in-95 duration-300">
        
        {/* Search Input Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-3 flex-1">
            <Search size={18} className="text-stone-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search across all 6 Phases: Iron Man, Thanos, Loki, Doom, Secret Wars..."
              className="w-full bg-transparent text-sm sm:text-base font-mono text-white placeholder-stone-600 focus:outline-none tracking-wider"
            />
          </div>

          <button
            onClick={onClose}
            className="text-stone-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5 cursor-pointer ml-2"
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results Stream */}
        <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto pr-1">
          <div className="text-[10px] font-mono tracking-[0.25em] text-stone-500 uppercase px-2 mb-1">
            {filteredMovies.length} MATCHING CHRONOLOGY ENTRIES
          </div>

          {filteredMovies.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono text-stone-500 tracking-wider">
              No anomaly or entry found in Sacred Timeline coordinates.
            </div>
          ) : (
            filteredMovies.map((movie) => (
              <button
                key={movie.id}
                onClick={() => {
                  onSelectMovie(movie);
                  onClose();
                }}
                className="group w-full flex items-center justify-between p-3.5 rounded-xl border border-stone-900/60 hover:border-white/40 bg-stone-950/40 hover:bg-white/5 transition-all text-left cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  {/* Miniature Node Icon */}
                  <div className="w-10 h-10 shrink-0 rounded-full border border-stone-800 group-hover:border-white/50 transition-colors overflow-hidden p-0.5">
                    <NodeArtwork movieId={movie.id} />
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-mono font-bold text-white group-hover:text-white tracking-wider">
                        {movie.title}
                      </span>
                      <span className="text-[10px] font-mono text-stone-400 bg-stone-900 border border-stone-800 px-1.5 py-0.2 rounded">
                        PHASE {movie.phase} · {movie.year}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-stone-500 group-hover:text-stone-400 transition-colors mt-0.5 line-clamp-1">
                      {movie.heroAlias} · &ldquo;{movie.quote}&rdquo;
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-stone-600 group-hover:text-white transition-colors">
                  <span className="text-[9px] font-mono uppercase tracking-widest hidden sm:inline">
                    JUMP TO NODE
                  </span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer Hint */}
        <div className="pt-3 border-t border-stone-900 flex items-center justify-between text-[10px] font-mono text-stone-500 tracking-wider">
          <div className="flex items-center gap-1.5">
            <span>PRESS</span>
            <kbd className="px-1.5 py-0.5 bg-stone-900 border border-stone-800 rounded text-stone-400">ESC</kbd>
            <span>TO CLOSE</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span>PRESS</span>
            <kbd className="px-1.5 py-0.5 bg-stone-900 border border-stone-800 rounded text-stone-400">/</kbd>
            <span>TO SEARCH ANYWHERE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
