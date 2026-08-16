"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Sparkles, Compass } from "lucide-react";
import { UNIFIED_MCU_TREE, type MovieNode } from "@/data/movies";
import NodeArtwork, { MCU_POSTER_MAP } from "./NodeArtwork";

// High-Resolution TMDB Cinematic Backdrop Images for Every MCU Movie
export const MCU_BACKDROP_MAP: Record<string, string> = {
  // Phase 1
  "iron-man": "https://image.tmdb.org/t/p/original/cyecb78cfwB1iC1tYcrX6R8pWcl.jpg",
  "the-incredible-hulk": "https://image.tmdb.org/t/p/original/xfBnQ4mgB1R0tz5p0D81oN06hZ7.jpg",
  "iron-man-2": "https://image.tmdb.org/t/p/original/6WBeq4jjqCmjXugQ0VPUtiV1d8L.jpg",
  "thor": "https://image.tmdb.org/t/p/original/cDJ61O1STtbRGsFuTXqlMrb1Kyf.jpg",
  "captain-america": "https://image.tmdb.org/t/p/original/vSNxAJTlD0r02V9sPYFSpLxg2uj.jpg",
  "the-avengers": "https://image.tmdb.org/t/p/original/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg",

  // Phase 2
  "iron-man-3": "https://image.tmdb.org/t/p/original/qhPtAc1TKbMPqNvcdXS46su7Q5q.jpg",
  "thor-dark-world": "https://image.tmdb.org/t/p/original/wp6OxE4poJ4G7c0U2ZIXas09g4P.jpg",
  "captain-america-winter-soldier": "https://image.tmdb.org/t/p/original/tVFRpFw3xTed5nGQqW0sdKGx84U.jpg",
  "guardians-of-the-galaxy": "https://image.tmdb.org/t/p/original/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
  "avengers-age-of-ultron": "https://image.tmdb.org/t/p/original/8I37NtDffNV7AZlDa7uDvvqhovU.jpg",
  "ant-man": "https://image.tmdb.org/t/p/original/8c4QgB2Kd4576P6oY8ePps1qgQy.jpg",

  // Phase 3
  "captain-america-civil-war": "https://image.tmdb.org/t/p/original/rAGiXaUfPzY7CDEyNKUofk3Kw2e.jpg",
  "doctor-strange": "https://image.tmdb.org/t/p/original/tFI8OxPuvJGhviEzq97W3FLv24g.jpg",
  "guardians-of-the-galaxy-vol-2": "https://image.tmdb.org/t/p/original/y4MBh0EjBlMuOzv9axM4qJmLRbF.jpg",
  "spider-man-homecoming": "https://image.tmdb.org/t/p/original/t5zCBSAJWToOl04Up0IRUp69BiM.jpg",
  "thor-ragnarok": "https://image.tmdb.org/t/p/original/kaIfm5ryEOwYg8visqR3QI398Hn.jpg",
  "black-panther": "https://image.tmdb.org/t/p/original/b6ZJZHUytAnAOK4f10R0v4s8Y.jpg",
  "avengers-infinity-war": "https://image.tmdb.org/t/p/original/lmZFxVIzGkIf3NYe3pk7yQYK2p1.jpg",
  "ant-man-and-the-wasp": "https://image.tmdb.org/t/p/original/rv1AWImgx386ULjcf62VdpWziME.jpg",
  "captain-marvel": "https://image.tmdb.org/t/p/original/AtsgWhDnHTq68L0lLsUrCnM7Tgp.jpg",
  "avengers-endgame": "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1z9q9v8t6s5a4.jpg",
  "spider-man-far-from-home": "https://image.tmdb.org/t/p/original/4q2hz2mYflgYOpVLyGuhiz0yYAW.jpg",

  // Phase 4
  "wandavision": "https://image.tmdb.org/t/p/original/glKDrtVTGhZk1b645nGUMMu9wmm.jpg",
  "loki-season-1": "https://image.tmdb.org/t/p/original/kEl2t3OhXc39gTuSmIpne78o1OY.jpg",
  "black-widow": "https://image.tmdb.org/t/p/original/keI7VicFRmKOQEUx2G5oA96uquf.jpg",
  "shang-chi": "https://image.tmdb.org/t/p/original/cinER0ESG0eJ499bmEjSTfjQIYt.jpg",
  "eternals": "https://image.tmdb.org/t/p/original/c6H7Z4u73UpNJ4iKi599d08Conf.jpg",
  "spider-man-no-way-home": "https://image.tmdb.org/t/p/original/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
  "doctor-strange-multiverse-of-madness": "https://image.tmdb.org/t/p/original/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
  "thor-love-and-thunder": "https://image.tmdb.org/t/p/original/pIkRyD18kl4F0b6PpHmhoEwMGPX.jpg",
  "black-panther-wakanda-forever": "https://image.tmdb.org/t/p/original/yYrvN5WFePslRiIhn63BE0FefW.jpg",

  // Phase 5
  "ant-man-and-the-wasp-quantumania": "https://image.tmdb.org/t/p/original/qnqGbB22YJ7dSs4o6M7exTpNxPz.jpg",
  "guardians-of-the-galaxy-vol-3": "https://image.tmdb.org/t/p/original/r2J02Z2OpNTctfOSN2Ydgii51I3.jpg",
  "secret-invasion": "https://image.tmdb.org/t/p/original/f5f3TEXdVIUFUG59ap3MbdfZsTV.jpg",
  "loki-season-2": "https://image.tmdb.org/t/p/original/voHUmluYmKyleFk9a3xgHyKvIgH.jpg",
  "the-marvels": "https://image.tmdb.org/t/p/original/9GBhzXMFjgcZ3FdR9w3bUMMTps5.jpg",
  "deadpool-and-wolverine": "https://image.tmdb.org/t/p/original/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
  "captain-america-brave-new-world": "https://image.tmdb.org/t/p/original/7vPtYFqK3jW7Q3Hn0qZ9mQo4VqZ.jpg",

  // Phase 6
  "thunderbolts": "https://image.tmdb.org/t/p/original/mKOB2v1lWn0W09G6i0V0UuE8hJg.jpg",
  "the-fantastic-four-first-steps": "https://image.tmdb.org/t/p/original/bcCBq9N1EMo3daNIjWJ1kYNAyAH.jpg",
  "blade": "https://image.tmdb.org/t/p/original/gKzYx79y0AQTL4UAk1cBQJ3nvrm.jpg",
  "avengers-doomsday": "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
  "avengers-secret-wars": "https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
};

export default function DeepMovieDetail({
  movie,
  onClose,
  onNavigateToConnectedMovie,
}: {
  movie: MovieNode | null;
  onClose: () => void;
  onNavigateToConnectedMovie: (targetMovie: MovieNode) => void;
}) {
  const [stage, setStage] = useState<"entering" | "expanded" | "closing">("entering");

  useEffect(() => {
    // Cinematic entrance sequence
    setStage("entering");
    const t = setTimeout(() => {
      setStage("expanded");
    }, 40);
    return () => clearTimeout(t);
  }, [movie?.id]);

  const handleClose = () => {
    setStage("closing");
    setTimeout(() => {
      onClose();
    }, 450);
  };

  if (!movie) return null;

  // Resolve connected movie objects across all phases
  const connectedMovies = movie.connections
    .map((conn) => {
      const target = UNIFIED_MCU_TREE.find((m) => m.id === conn.toId);
      return target ? { target, relationship: conn.relationship, type: conn.type } : null;
    })
    .filter(Boolean);

  const backdropSrc =
    MCU_BACKDROP_MAP[movie.id] ||
    MCU_POSTER_MAP[movie.id]?.poster ||
    "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1z9q9v8t6s5a4.jpg";

  const isExpanded = stage === "expanded";
  const isClosing = stage === "closing";

  return (
    <div
      onMouseDown={(e) => e.stopPropagation()}
      onMouseMove={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
      className={`fixed inset-0 w-screen h-screen z-50 flex flex-col justify-between select-none bg-[#020204] text-stone-100 overflow-hidden font-sans transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isClosing
          ? "opacity-0 scale-98 pointer-events-none filter blur-sm"
          : isExpanded
          ? "opacity-100 scale-100"
          : "opacity-0 scale-105 pointer-events-none"
      }`}
    >
      {/* 1. FULLSCREEN CINEMATIC BACKDROP IMAGE */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={backdropSrc}
          alt={movie.title}
          className={`w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.08] transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isExpanded ? "scale-105 blur-0 opacity-100" : "scale-125 blur-lg opacity-0"
          }`}
        />

        {/* Ambient Dark Atmospheric Gradient & Radial Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020204]/95 via-[#020204]/75 to-[#020204]/45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(2,2,4,0.85)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,2,4,0.92)_0%,transparent_25%,transparent_75%,rgba(2,2,4,0.95)_100%)]" />
      </div>

      {/* 2. MINIMALIST TOP HEADER */}
      <header
        className={`relative z-20 w-full px-6 sm:px-12 py-6 flex items-center justify-between pointer-events-auto transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isExpanded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
        }`}
      >
        {/* Left: Clean Return Button (No Border, Plain Text with Arrow) */}
        <button
          onClick={handleClose}
          className="group inline-flex items-center gap-2 px-0 py-1 bg-transparent hover:text-white text-stone-300 text-xs font-mono tracking-widest uppercase transition-all cursor-pointer"
          title="Return to Universe Map"
        >
          <ArrowLeft size={15} className="text-stone-400 group-hover:text-white group-hover:-translate-x-1 transition-transform" />
          <span>RETURN</span>
        </button>

        {/* Center: Brand Title */}
        <div className="text-center pointer-events-none">
          <h1 className="font-sans uppercase text-white font-black text-sm sm:text-base tracking-[0.6em] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
            M A R V E L
          </h1>
        </div>

        {/* Right: Clean Spacer (No Icons / No Words on Right) */}
        <div className="w-16" />
      </header>

      {/* 3. MAIN DOSSIER STAGE */}
      <main className="relative z-20 flex-1 px-6 sm:px-16 md:px-20 py-6 flex flex-col lg:flex-row items-center justify-between gap-10 overflow-y-auto max-w-7xl mx-auto w-full [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-stone-800 [&::-webkit-scrollbar-thumb]:rounded-full">
        
        {/* LEFT COLUMN: TITLE & NARRATIVE DOSSIER IN SOLID FROSTED GLASS CARD */}
        <div
          className={`flex-1 max-w-2xl bg-[#06060a]/85 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.95)] flex flex-col justify-center transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-100 ${
            isExpanded ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 -translate-x-12 translate-y-4"
          }`}
        >
          {/* Phase & Era Designation */}
          <div className="flex items-center gap-3 text-xs font-mono tracking-wider text-stone-300 uppercase font-semibold">
            <span className="text-white font-bold">PHASE {movie.phase}</span>
            <span className="text-stone-500">•</span>
            <span className="text-white font-bold">{movie.year}</span>
            <span className="text-stone-500">•</span>
            <span>{movie.runtime} MIN</span>
            <span className="text-stone-500">•</span>
            <span className="text-amber-300">{movie.director}</span>
          </div>

          {/* Large Cinematic Title */}
          <h2 className="font-sans font-black text-2xl sm:text-4xl md:text-5xl text-white uppercase leading-tight mt-3 tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,1)]">
            {movie.title}
          </h2>

          {/* Narrative Synopsis */}
          <div className="mt-5 text-sm sm:text-base text-stone-200 font-sans leading-relaxed">
            <p className="font-normal">{movie.description}</p>
            
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-stone-400 font-mono uppercase tracking-wider text-[11px] font-bold">LEAD:</span>
              <span className="bg-white/10 border border-white/40 rounded-full px-3.5 py-1 text-white font-semibold">
                {movie.leadCharacter}
              </span>
              <span className="bg-black/50 border border-white/20 rounded-full px-3.5 py-1 text-stone-300">
                {movie.heroAlias}
              </span>
            </div>
          </div>

          {/* Famous Quote Glass Card */}
          {movie.quote && (
            <div className="mt-5 p-4 rounded-2xl bg-black/60 border border-white/15 relative shadow-md">
              <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-amber-400 rounded-l-2xl" />
              <p className="text-sm font-sans italic text-stone-100 leading-relaxed pl-2 font-normal">
                &ldquo;{movie.quote}&rdquo;
              </p>
              {movie.speaker && (
                <p className="text-xs font-mono text-amber-300 uppercase tracking-wider mt-1.5 pl-2 font-bold">
                  — {movie.speaker}
                </p>
              )}
            </div>
          )}

          {/* Key Relics & Artifacts */}
          {movie.keyRelics && movie.keyRelics.length > 0 && (
            <div className="mt-5">
              <span className="text-xs font-mono tracking-wider text-stone-400 uppercase block mb-2 font-bold">
                KEY RELICS & ARTIFACTS
              </span>
              <div className="flex flex-wrap gap-2">
                {movie.keyRelics.map((relic) => (
                  <span
                    key={relic}
                    className="inline-flex items-center gap-1.5 text-xs font-sans px-3.5 py-1.5 rounded-full bg-white/10 border border-white/25 text-white font-medium shadow-sm hover:border-white/60 transition-colors"
                  >
                    <Sparkles size={12} className="text-amber-400" />
                    <span>{relic}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: FLOATING VERTICAL TIMELINE NODE & DIRECT CONNECTIONS */}
        <div
          className={`w-full lg:w-96 flex flex-col items-center lg:items-end shrink-0 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-200 ${
            isExpanded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          }`}
        >
          {/* Vertical Timeline Pin */}
          <div className="flex flex-col items-center mb-6">
            <span className="text-xs font-mono tracking-widest uppercase text-stone-200 font-bold mb-1 drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
              {movie.heroAlias}
            </span>
            <span className="text-base text-white animate-spin [animation-duration:16s]">✹</span>
            <div className="w-[1.5px] h-8 bg-gradient-to-b from-white to-white/30" />
            <span className="text-xs font-mono font-bold text-white tracking-widest bg-black/90 px-3 py-1 rounded-full border border-white/30 mt-1 shadow-xl">
              {movie.year}
            </span>
          </div>

          {/* Direct Connections Card List */}
          <div className="w-full bg-[#06060a]/90 border border-white/15 rounded-3xl p-5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.95)]">
            <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-white/15">
              <div className="flex items-center gap-2">
                <Compass size={14} className="text-amber-400" />
                <span className="text-xs font-mono tracking-wider uppercase text-white font-bold">
                  DIRECT CONNECTIONS
                </span>
              </div>
              <span className="text-[10px] font-mono text-stone-400">
                {connectedMovies.length} LINKS
              </span>
            </div>

            <div className="flex flex-col gap-2.5 max-h-56 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-stone-700">
              {connectedMovies.map((conn) => {
                if (!conn) return null;
                const { target, relationship } = conn;

                return (
                  <button
                    key={target.id}
                    onClick={() => onNavigateToConnectedMovie(target)}
                    className="group w-full flex items-center justify-between p-2.5 rounded-2xl border border-white/10 hover:border-white/50 bg-white/[0.04] hover:bg-white/[0.1] transition-all text-left cursor-pointer shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl border border-white/20 group-hover:border-white/60 transition-colors overflow-hidden shrink-0 bg-black p-0.5 shadow-md">
                        <NodeArtwork movieId={target.id} rounded="rounded-lg" />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs font-sans font-bold text-white group-hover:text-amber-300 transition-colors">
                          {target.title}
                        </span>
                        <span className="text-[11px] font-sans text-stone-300 line-clamp-1">
                          {relationship}
                        </span>
                      </div>
                    </div>

                    <ArrowRight size={14} className="text-stone-400 group-hover:text-white group-hover:translate-x-1 transition-all pl-1 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Coordinates */}
          <div className="mt-4 text-[10px] font-mono text-stone-400 tracking-wider uppercase">
            COSMIC POSITION: X:{movie.x} · Y:{movie.y}
          </div>
        </div>
      </main>
    </div>
  );
}
