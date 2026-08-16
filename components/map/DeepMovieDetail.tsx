"use client";

import React from "react";
import { ArrowLeft, Clock, Calendar, Film, Sparkles, ArrowRight, Compass } from "lucide-react";
import { UNIFIED_MCU_TREE, type MovieNode } from "@/data/movies";
import NodeArtwork from "./NodeArtwork";

export default function DeepMovieDetail({
  movie,
  onClose,
  onNavigateToConnectedMovie,
}: {
  movie: MovieNode | null;
  onClose: () => void;
  onNavigateToConnectedMovie: (targetMovie: MovieNode) => void;
}) {
  if (!movie) return null;

  // Resolve connected movie objects across all phases
  const connectedMovies = movie.connections
    .map((conn) => {
      const target = UNIFIED_MCU_TREE.find((m) => m.id === conn.toId);
      return target ? { target, relationship: conn.relationship, type: conn.type } : null;
    })
    .filter(Boolean);

  return (
    <div className="fixed inset-x-0 bottom-0 top-0 z-40 flex items-center justify-end pointer-events-none p-4 sm:p-8 md:p-12 select-none">
      {/* Right Drawer Card / Overlay Panel */}
      <aside className="relative pointer-events-auto w-full max-w-lg bg-[#050508]/92 border border-stone-800/90 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-y-auto max-h-[90vh] animate-in slide-in-from-right-8 fade-in duration-500">
        
        {/* Top Control: Back to Universe */}
        <div>
          <div className="flex items-center justify-between pb-5 border-b border-stone-800/80">
            <button
              onClick={onClose}
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/20 hover:border-white/60 text-stone-300 hover:text-white text-[10px] font-mono tracking-widest uppercase transition-all cursor-pointer shadow-[0_0_12px_rgba(255,255,255,0.05)]"
            >
              <ArrowLeft size={12} className="text-stone-400 group-hover:-translate-x-1 transition-transform" />
              <span>RETURN TO UNIVERSE MAP</span>
            </button>

            <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded bg-white/5 border border-stone-800 text-stone-400">
              PHASE {movie.phase} · ENTRY #{movie.order}
            </span>
          </div>

          {/* Hero Emblem & Title Showcase */}
          <div className="flex items-start gap-4 mt-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl border border-stone-700/80 bg-black/60 p-1 shadow-xl">
              <NodeArtwork movieId={movie.id} />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-1">
                <span>{movie.year}</span>
                <span>•</span>
                <span>{movie.runtime} MIN</span>
                <span>•</span>
                <span>{movie.director}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight leading-none">
                {movie.title}
              </h2>

              <p className="text-xs font-mono text-stone-400 mt-1">
                {movie.heroAlias} · {movie.leadCharacter}
              </p>
            </div>
          </div>

          {/* Famous Quote Banner */}
          <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-stone-900/90 via-stone-950/80 to-transparent border-l-2 border-white/80 border-y border-r border-stone-900">
            <p className="text-xs sm:text-sm font-mono text-white italic tracking-wide">
              &ldquo;{movie.quote}&rdquo;
            </p>
            <p className="text-[10px] font-mono text-stone-500 uppercase tracking-widest mt-1">
              — {movie.speaker}
            </p>
          </div>

          {/* Narrative Description */}
          <div className="mt-5">
            <p className="text-xs text-stone-300 leading-relaxed font-sans font-light">
              {movie.description}
            </p>
          </div>

          {/* Key Relics & Technology */}
          {movie.keyRelics && movie.keyRelics.length > 0 && (
            <div className="mt-5 pt-4 border-t border-stone-900">
              <span className="text-[10px] font-mono tracking-[0.25em] text-stone-500 uppercase block mb-2">
                KEY RELICS & ARTIFACTS
              </span>
              <div className="flex flex-wrap gap-1.5">
                {movie.keyRelics.map((relic) => (
                  <span
                    key={relic}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-stone-900/80 border border-stone-800 text-stone-300"
                  >
                    {relic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* DIRECT CONNECTIONS SECTION */}
          <div className="mt-6 pt-5 border-t border-stone-800/80">
            <div className="flex items-center gap-2 mb-3">
              <Compass size={13} className="text-white animate-spin [animation-duration:12s]" />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white font-bold">
                DIRECT CONNECTIONS
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {connectedMovies.map((conn) => {
                if (!conn) return null;
                const { target, relationship } = conn;

                return (
                  <button
                    key={target.id}
                    onClick={() => onNavigateToConnectedMovie(target)}
                    className="group w-full flex items-center justify-between p-3 rounded-xl border border-stone-900 hover:border-white/50 bg-black/40 hover:bg-white/5 transition-all text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border border-stone-800 group-hover:border-white/50 transition-colors overflow-hidden p-0.5 shrink-0">
                        <NodeArtwork movieId={target.id} />
                      </div>

                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-stone-200 group-hover:text-white transition-colors">
                            {target.title}
                          </span>
                          <span className="text-[9px] font-mono text-stone-400 bg-stone-900 px-1 py-0.2 rounded border border-stone-800">
                            PHASE {target.phase} · {target.year}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-stone-400 mt-0.5 line-clamp-1">
                          {relationship}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-stone-500 group-hover:text-white transition-colors pl-2">
                      <span className="text-[9px] font-mono uppercase tracking-widest hidden sm:inline">
                        TRAVEL
                      </span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-stone-900 flex items-center justify-between text-[9px] font-mono text-stone-500 tracking-widest uppercase">
          <span>COSMIC MAP COORDINATE</span>
          <span>X:{movie.x} · Y:{movie.y}</span>
        </div>
      </aside>
    </div>
  );
}
