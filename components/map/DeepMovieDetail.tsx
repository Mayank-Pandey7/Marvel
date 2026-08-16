"use client";

import React from "react";
import { ArrowLeft, Clock, Calendar, Sparkles, ArrowRight, Compass, Shield, Award } from "lucide-react";
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
    <div className="fixed inset-x-0 bottom-0 top-0 z-40 flex items-center justify-end pointer-events-none p-4 sm:p-6 md:p-10 select-none">
      {/* Right Drawer Card / Overlay Panel (Isolated from Map Pan/Zoom) */}
      <aside
        onMouseDown={(e) => e.stopPropagation()}
        onMouseMove={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="relative pointer-events-auto w-full max-w-xl bg-[#06060b]/95 border border-stone-800/90 rounded-[28px] p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.95)] flex flex-col justify-between overflow-y-auto max-h-[92vh] animate-in slide-in-from-right-8 fade-in duration-500 movie-detail-card no-map-drag [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-stone-700/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
      >
        <div>
          {/* Top Control Bar: Back & Phase Badge */}
          <div className="flex items-center justify-between pb-5 border-b border-stone-800/80">
            <button
              onClick={onClose}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/15 hover:border-white/50 text-stone-300 hover:text-white text-[10px] font-mono tracking-widest uppercase transition-all cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.04)]"
            >
              <ArrowLeft size={13} className="text-stone-400 group-hover:-translate-x-1 transition-transform" />
              <span>RETURN TO UNIVERSE MAP</span>
            </button>

            <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-stone-300 font-semibold">
              PHASE {movie.phase} · ENTRY #{movie.order}
            </span>
          </div>

          {/* Hero Poster & Title Header */}
          <div className="flex flex-col sm:flex-row items-start gap-5 mt-6">
            {/* Portrait Movie Poster */}
            <div className="w-24 h-36 sm:w-28 sm:h-40 shrink-0 rounded-2xl border border-white/20 bg-black/80 p-1 shadow-[0_0_30px_rgba(0,0,0,0.8)] relative group overflow-hidden">
              <NodeArtwork movieId={movie.id} rounded="rounded-xl" className="w-full h-full" />
            </div>

            {/* Title & Metadata */}
            <div className="flex flex-col justify-center flex-1">
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-1.5">
                <span className="text-stone-300 font-bold">{movie.year}</span>
                <span>•</span>
                <span>{movie.runtime} MIN</span>
                <span>•</span>
                <span className="text-stone-300">{movie.director}</span>
              </div>

              {/* Clean, Readable, Crisp Movie Title */}
              <h2 className="text-xl sm:text-2xl md:text-[26px] font-sans font-bold text-white tracking-normal leading-snug uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                {movie.title}
              </h2>

              {/* Lead Character & Alias */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-mono text-stone-300 font-semibold">
                  {movie.heroAlias}
                </span>
                <span className="text-stone-600">•</span>
                <span className="text-xs font-mono text-stone-400">
                  {movie.leadCharacter}
                </span>
              </div>
            </div>
          </div>

          {/* Glassmorphic Quote Block */}
          {movie.quote && (
            <div className="mt-6 p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-white/70 to-white/10" />
              <p className="text-xs sm:text-sm font-sans italic text-stone-100 leading-relaxed pl-2 font-normal">
                &ldquo;{movie.quote}&rdquo;
              </p>
              {movie.speaker && (
                <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest mt-1.5 pl-2 font-bold">
                  — {movie.speaker}
                </p>
              )}
            </div>
          )}

          {/* Mission Briefing / Plot Summary */}
          <div className="mt-6">
            <span className="text-[10px] font-mono tracking-[0.25em] text-stone-400 uppercase block mb-2 font-bold">
              MISSION BRIEFING
            </span>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans font-light">
              {movie.description}
            </p>
          </div>

          {/* Key Relics & Artifacts */}
          {movie.keyRelics && movie.keyRelics.length > 0 && (
            <div className="mt-6 pt-5 border-t border-stone-800/80">
              <span className="text-[10px] font-mono tracking-[0.25em] text-stone-400 uppercase block mb-2.5 font-bold">
                KEY RELICS & ARTIFACTS
              </span>
              <div className="flex flex-wrap gap-2">
                {movie.keyRelics.map((relic) => (
                  <span
                    key={relic}
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/15 text-stone-200 hover:border-white/40 transition-colors shadow-sm"
                  >
                    <Sparkles size={11} className="text-stone-400" />
                    <span>{relic}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* DIRECT CONNECTIONS SECTION */}
          {connectedMovies.length > 0 && (
            <div className="mt-6 pt-5 border-t border-stone-800/80">
              <div className="flex items-center gap-2 mb-3">
                <Compass size={13} className="text-white animate-spin [animation-duration:12s]" />
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white font-bold">
                  DIRECT CONNECTIONS ({connectedMovies.length})
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
                      className="group w-full flex items-center justify-between p-3.5 rounded-2xl border border-white/10 hover:border-white/40 bg-white/[0.02] hover:bg-white/[0.06] transition-all duration-300 text-left cursor-pointer shadow-sm"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl border border-white/20 group-hover:border-white/60 transition-colors overflow-hidden shrink-0 bg-black/60 p-0.5">
                          <NodeArtwork movieId={target.id} rounded="rounded-lg" />
                        </div>

                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-sans font-semibold text-stone-100 group-hover:text-white transition-colors">
                              {target.title}
                            </span>
                            <span className="text-[9px] font-mono text-stone-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                              PHASE {target.phase} · {target.year}
                            </span>
                          </div>
                          <span className="text-[11px] font-sans text-stone-400 mt-0.5 line-clamp-1 group-hover:text-stone-300 transition-colors">
                            {relationship}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-stone-400 group-hover:text-white transition-colors pl-3 shrink-0">
                        <span className="text-[9px] font-mono uppercase tracking-widest hidden sm:inline">
                          TRAVEL
                        </span>
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform text-white" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Info: Coordinates */}
        <div className="mt-8 pt-4 border-t border-stone-800/80 flex items-center justify-between text-[9px] font-mono text-stone-500 tracking-widest uppercase">
          <span>COSMIC MAP COORDINATE</span>
          <span className="text-stone-400 font-semibold">X:{movie.x} · Y:{movie.y}</span>
        </div>
      </aside>
    </div>
  );
}
