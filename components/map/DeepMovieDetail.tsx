"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Volume2, VolumeX, Sparkles, Compass, Share2 } from "lucide-react";
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
  const [isAudioMuted, setIsAudioMuted] = useState(false);

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
      className={`fixed inset-0 w-screen h-screen z-50 flex flex-col justify-between select-none bg-[#020204] text-stone-300 overflow-hidden font-sans transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isClosing
          ? "opacity-0 scale-98 pointer-events-none filter blur-sm"
          : isExpanded
          ? "opacity-100 scale-100"
          : "opacity-0 scale-105 pointer-events-none"
      }`}
    >
      {/* 1. FULLSCREEN CINEMATIC BACKDROP IMAGE WITH FILM GRAIN & VIGNETTE */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={backdropSrc}
          alt={movie.title}
          className={`w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.15] transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isExpanded ? "scale-105 blur-0 opacity-100" : "scale-125 blur-lg opacity-0"
          }`}
        />

        {/* Ambient Dark Atmospheric Gradient & Radial Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020204] via-[#020204]/75 to-[#020204]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(2,2,4,0.92)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,2,4,0.85)_0%,transparent_30%,transparent_70%,rgba(2,2,4,0.95)_100%)]" />
      </div>

      {/* 2. MINIMALIST TOP HEADER */}
      <header
        className={`relative z-20 w-full px-6 sm:px-12 py-6 flex items-center justify-between pointer-events-auto transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isExpanded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
        }`}
      >
        {/* Left: Return to Universe Map */}
        <button
          onClick={handleClose}
          className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/50 border border-white/15 hover:border-white/60 text-stone-300 hover:text-white text-[10px] font-mono tracking-widest uppercase transition-all cursor-pointer backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.6)]"
        >
          <ArrowLeft size={13} className="text-stone-400 group-hover:-translate-x-1 transition-transform" />
          <span>RETURN TO UNIVERSE MAP</span>
        </button>

        {/* Center: Brand Title */}
        <div className="text-center pointer-events-none">
          <h1 className="font-mono uppercase text-stone-200 font-light text-xs sm:text-sm tracking-[0.7em] drop-shadow-[0_0_18px_rgba(255,255,255,0.4)]">
            M A R V E L
          </h1>
        </div>

        {/* Right: Multiverse Triquetra Symbol / Quick Phase Pill */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/15 text-stone-300 font-mono text-[10px] tracking-widest uppercase backdrop-blur-md">
            PHASE {movie.phase} · ENTRY #{movie.order}
          </div>

          <div
            className="w-8 h-8 rounded-full border border-white/20 bg-black/50 flex items-center justify-center text-stone-300 backdrop-blur-md"
            title="Earth-616 Sacred Timeline"
          >
            <span className="text-xs font-serif">⎊</span>
          </div>
        </div>
      </header>

      {/* 3. MAIN DOSSIER STAGE (NETFLIX DARK INSPIRED LAYOUT WITH STAGGERED ENTRANCE) */}
      <main className="relative z-20 flex-1 px-6 sm:px-16 md:px-20 py-4 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-y-auto max-w-7xl mx-auto w-full [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-stone-800 [&::-webkit-scrollbar-thumb]:rounded-full">
        
        {/* LEFT COLUMN: TITLE & NARRATIVE DOSSIER */}
        <div
          className={`flex-1 max-w-2xl flex flex-col justify-center transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-100 ${
            isExpanded ? "opacity-100 translate-x-0 translate-y-0 blur-0" : "opacity-0 -translate-x-12 translate-y-4 blur-sm"
          }`}
        >
          {/* Phase & Era Designation */}
          <div className="flex items-center gap-3 text-[11px] font-mono tracking-[0.35em] text-stone-400 uppercase font-semibold">
            <span>PHASE {movie.phase}</span>
            <span>•</span>
            <span>{movie.year}</span>
            <span>•</span>
            <span>{movie.runtime} MIN</span>
            <span>•</span>
            <span className="text-stone-300">{movie.director}</span>
          </div>

          {/* Large Cinematic Title (Ultra-Legible, Spaced, Animated tracking) */}
          <h2
            className={`font-mono font-light text-2xl sm:text-4xl md:text-5xl text-white uppercase leading-tight mt-3 drop-shadow-[0_0_35px_rgba(255,255,255,0.25)] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-150 ${
              isExpanded
                ? "tracking-[0.15em] sm:tracking-[0.2em] opacity-100 scale-100"
                : "tracking-[0.35em] opacity-0 scale-95"
            }`}
          >
            {movie.title}
          </h2>

          {/* Narrative Synopsis with Dark-Style Circled Entities */}
          <div className="mt-6 text-sm sm:text-base text-stone-300 font-sans font-light leading-relaxed">
            <p>{movie.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-mono text-stone-300">
              <span className="text-stone-500 uppercase tracking-widest text-[10px]">LEAD CHARACTER:</span>
              <span className="border border-white/40 rounded-full px-3 py-0.5 text-white font-semibold shadow-sm">
                {movie.leadCharacter}
              </span>
              <span className="border border-white/20 rounded-full px-3 py-0.5 text-stone-300">
                {movie.heroAlias}
              </span>
            </div>
          </div>

          {/* Famous Quote Glass Card */}
          {movie.quote && (
            <div className="mt-6 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md relative max-w-lg shadow-lg">
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-white/80 to-white/10" />
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

          {/* Key Relics & Artifacts */}
          {movie.keyRelics && movie.keyRelics.length > 0 && (
            <div className="mt-6">
              <span className="text-[10px] font-mono tracking-[0.3em] text-stone-400 uppercase block mb-2 font-bold">
                KEY RELICS & ARTIFACTS
              </span>
              <div className="flex flex-wrap gap-2">
                {movie.keyRelics.map((relic) => (
                  <span
                    key={relic}
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/15 text-stone-200 shadow-sm hover:border-white/40 transition-colors"
                  >
                    <Sparkles size={11} className="text-stone-400" />
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
            isExpanded ? "opacity-100 translate-x-0 blur-0" : "opacity-0 translate-x-12 blur-sm"
          }`}
        >
          {/* Vertical Timeline Pin (Dark Aesthetic) */}
          <div className="flex flex-col items-center mb-6">
            <span className="text-[11px] font-mono tracking-[0.35em] uppercase text-stone-400 font-bold mb-1">
              {movie.heroAlias}
            </span>
            <span className="text-base text-white animate-spin [animation-duration:16s]">✹</span>
            <div className="w-[1.5px] h-8 bg-gradient-to-b from-white/80 to-white/20" />
            <span className="text-xs font-mono font-bold text-white tracking-widest bg-black/60 px-2.5 py-0.5 rounded border border-white/20 mt-1 shadow-md">
              {movie.year}
            </span>
          </div>

          {/* Direct Connections Card List */}
          <div className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Compass size={13} className="text-white" />
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white font-bold">
                  DIRECT CONNECTIONS
                </span>
              </div>
              <span className="text-[9px] font-mono text-stone-400">
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
                    className="group w-full flex items-center justify-between p-2.5 rounded-xl border border-white/10 hover:border-white/40 bg-white/[0.02] hover:bg-white/[0.08] transition-all text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg border border-white/20 group-hover:border-white/50 transition-colors overflow-hidden shrink-0 bg-black/80 p-0.5">
                        <NodeArtwork movieId={target.id} rounded="rounded-md" />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs font-sans font-semibold text-stone-200 group-hover:text-white transition-colors">
                          {target.title}
                        </span>
                        <span className="text-[10px] font-mono text-stone-400 line-clamp-1">
                          {relationship}
                        </span>
                      </div>
                    </div>

                    <ArrowRight size={13} className="text-stone-500 group-hover:text-white group-hover:translate-x-1 transition-all pl-1 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Coordinates in Cosmic Space */}
          <div className="mt-4 text-[9px] font-mono text-stone-500 tracking-[0.25em] uppercase">
            COSMIC POSITION: X:{movie.x} · Y:{movie.y}
          </div>
        </div>
      </main>

      {/* 4. BOTTOM STATUS BAR */}
      <footer
        className={`relative z-20 w-full px-6 sm:px-12 py-5 flex items-center justify-between pointer-events-auto border-t border-white/5 bg-black/20 backdrop-blur-md transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Bottom Left: Dark Atmospheric Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-4 rounded-full border border-stone-500 flex items-start justify-center p-0.5">
            <span className="w-1 h-1 bg-stone-300 rounded-full animate-bounce" />
          </div>
          <span className="text-[10px] font-mono tracking-[0.35em] text-stone-400 uppercase">
            THE SACRED TIMELINE
          </span>
        </div>

        {/* Bottom Center: Movie Tagline */}
        {movie.tagline && (
          <p className="hidden md:block text-xs font-mono text-stone-400 italic tracking-wider">
            &ldquo;{movie.tagline}&rdquo;
          </p>
        )}

        {/* Bottom Right: Audio Indicator */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors text-[10px] font-mono tracking-widest uppercase cursor-pointer"
            title="Toggle Ambient Audio"
          >
            {isAudioMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
            <span className="hidden sm:inline">{isAudioMuted ? "MUTED" : "AMBIENT"}</span>
            <div className="flex items-center gap-0.5 h-3">
              <span className={`w-0.5 bg-stone-400 rounded-full ${!isAudioMuted ? "h-3 animate-pulse" : "h-1"}`} />
              <span className={`w-0.5 bg-stone-400 rounded-full ${!isAudioMuted ? "h-2 animate-pulse [animation-delay:150ms]" : "h-1"}`} />
              <span className={`w-0.5 bg-stone-400 rounded-full ${!isAudioMuted ? "h-3.5 animate-pulse [animation-delay:300ms]" : "h-1"}`} />
              <span className={`w-0.5 bg-stone-400 rounded-full ${!isAudioMuted ? "h-2 animate-pulse [animation-delay:450ms]" : "h-1"}`} />
            </div>
          </button>
        </div>
      </footer>
    </div>
  );
}
