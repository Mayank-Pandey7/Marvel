"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Sparkles, Compass } from "lucide-react";
import { UNIFIED_MCU_TREE, type MovieNode } from "@/data/movies";
import NodeArtwork, { MCU_POSTER_MAP } from "./NodeArtwork";

// High-Resolution 100% Verified TMDB Cinematic Backdrop Images for Every MCU Movie
export const MCU_BACKDROP_MAP: Record<string, string> = {
  // Phase 1
  "iron-man": "/images/backdrops/iron-man.jpg",
  "the-incredible-hulk": "/images/backdrops/the-incredible-hulk.jpg",
  "hulk": "/images/backdrops/the-incredible-hulk.jpg",
  "iron-man-2": "/images/backdrops/iron-man-2.jpg",
  "thor": "/images/backdrops/thor.jpg",
  "captain-america": "/images/backdrops/captain-america.jpg",
  "captain-america-the-first-avenger": "/images/backdrops/captain-america-first-avenger.jpg",
  "captain-america-first-avenger": "/images/backdrops/captain-america-first-avenger.jpg",
  "cap-first-avenger": "/images/backdrops/captain-america-first-avenger.jpg",
  "the-avengers": "/images/backdrops/the-avengers.jpg",
  "avengers": "/images/backdrops/the-avengers.jpg",

  // Phase 2
  "iron-man-3": "/images/backdrops/iron-man-3.jpg",
  "thor-the-dark-world": "/images/backdrops/thor-the-dark-world.jpg",
  "thor-dark-world": "/images/backdrops/thor-dark-world.jpg",
  "captain-america-the-winter-soldier": "/images/backdrops/captain-america-the-winter-soldier.jpg",
  "captain-america-winter-soldier": "/images/backdrops/captain-america-winter-soldier.jpg",
  "cap-winter-soldier": "/images/backdrops/captain-america-winter-soldier.jpg",
  "guardians-of-the-galaxy": "/images/backdrops/guardians-of-the-galaxy.jpg",
  "gotg": "/images/backdrops/guardians-of-the-galaxy.jpg",
  "avengers-age-of-ultron": "/images/backdrops/avengers-age-of-ultron.jpg",
  "avengers-aou": "/images/backdrops/avengers-age-of-ultron.jpg",
  "ant-man": "/images/backdrops/ant-man.jpg",

  // Phase 3
  "captain-america-civil-war": "/images/backdrops/captain-america-civil-war.jpg",
  "cap-civil-war": "/images/backdrops/captain-america-civil-war.jpg",
  "doctor-strange": "/images/backdrops/doctor-strange.jpg",
  "guardians-of-the-galaxy-vol-2": "/images/backdrops/guardians-of-the-galaxy-vol-2.jpg",
  "gotg2": "/images/backdrops/guardians-of-the-galaxy-vol-2.jpg",
  "spider-man-homecoming": "/images/backdrops/spider-man-homecoming.jpg",
  "spiderman-homecoming": "/images/backdrops/spider-man-homecoming.jpg",
  "thor-ragnarok": "/images/backdrops/thor-ragnarok.jpg",
  "black-panther": "/images/backdrops/black-panther.jpg",
  "avengers-infinity-war": "/images/backdrops/avengers-infinity-war.jpg",
  "infinity-war": "/images/backdrops/avengers-infinity-war.jpg",
  "ant-man-and-the-wasp": "/images/backdrops/ant-man-and-the-wasp.jpg",
  "ant-man-wasp": "/images/backdrops/ant-man-and-the-wasp.jpg",
  "captain-marvel": "/images/backdrops/captain-marvel.jpg",
  "avengers-endgame": "/images/backdrops/avengers-endgame.jpg",
  "endgame": "/images/backdrops/avengers-endgame.jpg",
  "spider-man-far-from-home": "/images/backdrops/spider-man-far-from-home.jpg",
  "spiderman-far-from-home": "/images/backdrops/spider-man-far-from-home.jpg",

  // Phase 4
  "wandavision": "/images/backdrops/wandavision.jpg",
  "the-falcon-and-the-winter-soldier": "/images/backdrops/the-falcon-and-the-winter-soldier.jpg",
  "falcon-winter-soldier": "/images/backdrops/the-falcon-and-the-winter-soldier.jpg",
  "loki": "/images/backdrops/loki.jpg",
  "loki-season-1": "/images/backdrops/loki.jpg",
  "loki-1": "/images/backdrops/loki.jpg",
  "loki-s1": "/images/backdrops/loki.jpg",
  "black-widow": "/images/backdrops/black-widow.jpg",
  "shang-chi": "/images/backdrops/shang-chi.jpg",
  "shang-chi-and-the-legend-of-the-ten-rings": "/images/backdrops/shang-chi.jpg",
  "eternals": "/images/backdrops/eternals.jpg",
  "hawkeye": "/images/backdrops/hawkeye.jpg",
  "spider-man-no-way-home": "/images/backdrops/spider-man-no-way-home.jpg",
  "spiderman-no-way-home": "/images/backdrops/spider-man-no-way-home.jpg",
  "moon-knight": "/images/backdrops/moon-knight.jpg",
  "doctor-strange-in-the-multiverse-of-madness": "/images/backdrops/doctor-strange-multiverse.jpg",
  "doctor-strange-multiverse-of-madness": "/images/backdrops/doctor-strange-multiverse.jpg",
  "doctor-strange-multiverse": "/images/backdrops/doctor-strange-multiverse.jpg",
  "ms-marvel": "/images/backdrops/ms-marvel.jpg",
  "thor-love-and-thunder": "/images/backdrops/thor-love-and-thunder.jpg",
  "thor-love-thunder": "/images/backdrops/thor-love-and-thunder.jpg",
  "she-hulk-attorney-at-law": "/images/backdrops/she-hulk-attorney-at-law.jpg",
  "she-hulk": "/images/backdrops/she-hulk.jpg",
  "black-panther-wakanda-forever": "/images/backdrops/black-panther-wakanda-forever.jpg",
  "black-panther-wakanda": "/images/backdrops/black-panther-wakanda-forever.jpg",
  "the-guardians-of-the-galaxy-holiday-special": "/images/backdrops/the-guardians-of-the-galaxy-holiday-special.jpg",
  "guardians-holiday": "/images/backdrops/the-guardians-of-the-galaxy-holiday-special.jpg",

  // Phase 5
  "ant-man-and-the-wasp-quantumania": "/images/backdrops/ant-man-and-the-wasp-quantumania.jpg",
  "ant-man-quantumania": "/images/backdrops/ant-man-and-the-wasp-quantumania.jpg",
  "guardians-of-the-galaxy-vol-3": "/images/backdrops/guardians-of-the-galaxy-vol-3.jpg",
  "guardians-vol3": "/images/backdrops/guardians-of-the-galaxy-vol-3.jpg",
  "secret-invasion": "/images/backdrops/secret-invasion.jpg",
  "loki-season-2": "/images/backdrops/loki.jpg",
  "loki-s2": "/images/backdrops/loki.jpg",
  "the-marvels": "/images/backdrops/the-marvels.jpg",
  "echo": "/images/backdrops/echo.jpg",
  "deadpool-and-wolverine": "/images/backdrops/deadpool-and-wolverine.jpg",
  "deadpool-wolverine": "/images/backdrops/deadpool-and-wolverine.jpg",
  "agatha-all-along": "/images/backdrops/agatha-all-along.jpg",
  "captain-america-brave-new-world": "/images/backdrops/captain-america-brave-new-world.jpg",
  "cap-brave-new-world": "/images/backdrops/captain-america-brave-new-world.jpg",
  "daredevil-born-again": "/images/backdrops/daredevil-born-again.jpg",
  "thunderbolts": "/images/backdrops/thunderbolts.jpg",

  // Phase 6 & Multiverse
  "the-fantastic-four-first-steps": "/images/backdrops/the-fantastic-four-first-steps.jpg",
  "fantastic-four": "/images/backdrops/the-fantastic-four-first-steps.jpg",
  "blade": "/images/backdrops/blade.jpg",
  "spiderman-brand-new-day": "/images/backdrops/spiderman-brand-new-day.jpg",
  "avengers-doomsday": "/images/backdrops/avengers-doomsday.jpg",
  "avengers-secret-wars": "/images/backdrops/avengers-secret-wars.jpg",
  "battleworld": "/images/backdrops/battleworld.jpg",
  "x-men": "/images/backdrops/x-men.jpg",
  "x-men-2000": "/images/backdrops/x-men-2000.jpg",
  "x2": "/images/backdrops/x2.jpg",
  "x2-2003": "/images/backdrops/x2-2003.jpg",
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
  const connectedMovies = (movie.connections || [])
    .map((conn) => {
      const target = UNIFIED_MCU_TREE.find((m) => m.id === (typeof conn === "string" ? conn : conn.toId));
      return target ? { target, relationship: (conn as any).relationship || "Related Storyline", type: (conn as any).type || "Narrative" } : null;
    })
    .filter(Boolean);

  const posterCandidate = (movie as any).posterUrl;
  const isPosterCandidateValid = posterCandidate && !posterCandidate.startsWith("/posters/");

  const posterSrc =
    (isPosterCandidateValid ? posterCandidate : null) ||
    MCU_POSTER_MAP[movie.id]?.poster ||
    MCU_POSTER_MAP[movie.id.toLowerCase()]?.poster ||
    MCU_POSTER_MAP[movie.id.replace(/_/g, "-")]?.poster ||
    "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg";

  const backdropCandidate = (movie as any).backdropUrl;
  const isBackdropCandidateValid = backdropCandidate && !backdropCandidate.startsWith("/backdrops/");

  const backdropSrc =
    (isBackdropCandidateValid ? backdropCandidate : null) ||
    MCU_BACKDROP_MAP[movie.id] ||
    MCU_BACKDROP_MAP[movie.id.toLowerCase()] ||
    MCU_BACKDROP_MAP[movie.id.replace(/_/g, "-")] ||
    posterSrc;

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
      {/* 1. CINEMATIC AMBIENT BACKDROP IMAGE (CLEAR & VIBRANT) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={backdropSrc}
          alt={movie.title}
          onError={(e) => {
            if (posterSrc && (e.target as HTMLImageElement).src !== posterSrc) {
              (e.target as HTMLImageElement).src = posterSrc;
            }
          }}
          className={`w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.15] transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isExpanded ? "scale-105 opacity-70" : "scale-125 opacity-0"
          }`}
        />

        {/* Cinematic Vignette & Atmospheric Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.75)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.5)_0%,transparent_25%,transparent_70%,rgba(0,0,0,0.9)_100%)]" />
      </div>

      {/* 2. MINIMALIST TOP HEADER */}
      <header
        className={`relative z-20 w-full px-6 sm:px-12 py-6 flex items-center justify-between pointer-events-auto transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isExpanded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
        }`}
      >
        {/* Left: Clean Borderless Return Button */}
        <button
          onClick={handleClose}
          className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-transparent hover:bg-white/10 text-stone-400 hover:text-white text-[10px] font-mono tracking-widest uppercase transition-all cursor-pointer"
        >
          <ArrowLeft size={13} className="text-stone-400 group-hover:-translate-x-1 transition-transform" />
          <span>RETURN</span>
        </button>

        {/* Center: Brand Title */}
        <div className="text-center pointer-events-none">
          <h1 className="font-mono uppercase text-stone-200 font-light text-xs sm:text-sm tracking-[0.7em] drop-shadow-[0_0_18px_rgba(255,255,255,0.4)]">
            M A R V E L
          </h1>
        </div>

        {/* Right side: Empty for clean balanced look */}
        <div className="w-16 sm:w-20" />
      </header>

      {/* 3. MAIN DOSSIER STAGE (DARK CINEMATIC LAYOUT WITH OFFICIAL POSTER) */}
      <main className="relative z-20 flex-1 px-6 sm:px-12 md:px-16 py-4 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 overflow-y-auto max-w-7xl mx-auto w-full [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-stone-800 [&::-webkit-scrollbar-thumb]:rounded-full">
        
        {/* LEFT COLUMN: OFFICIAL POSTER + NARRATIVE DOSSIER */}
        <div
          className={`flex-1 flex flex-col sm:flex-row items-center sm:items-start gap-8 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-100 ${
            isExpanded ? "opacity-100 translate-x-0 translate-y-0 blur-0" : "opacity-0 -translate-x-12 translate-y-4 blur-sm"
          }`}
        >
          {/* OFFICIAL HIGH-RES THEATRICAL MOVIE POSTER */}
          <div className="w-44 sm:w-52 md:w-60 aspect-[2/3] rounded-2xl overflow-hidden border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.95)] shrink-0 bg-stone-900 group relative">
            <img
              src={posterSrc}
              alt={movie.title}
              loading="eager"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes("image.tmdb.org")) {
                  target.src = "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg";
                }
              }}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />
          </div>

          {/* NARRATIVE INFORMATION */}
          <div className="flex-1 flex flex-col justify-center min-w-0">
            {/* Phase & Era Designation */}
            <div className="flex items-center flex-wrap gap-2.5 text-[11px] font-mono tracking-[0.3em] text-stone-400 uppercase font-semibold">
              <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">PHASE {movie.phase}</span>
              <span>•</span>
              <span className="text-stone-300">{movie.year}</span>
              <span>•</span>
              <span className="text-stone-400">{movie.runtime} MIN</span>
              <span>•</span>
              <span className="text-stone-300">{movie.director}</span>
            </div>

            {/* Large Cinematic Title */}
            <h2
              className={`font-mono font-light text-3xl sm:text-4xl md:text-5xl text-white uppercase leading-tight mt-3 drop-shadow-[0_0_35px_rgba(255,255,255,0.25)] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-150 ${
                isExpanded
                  ? "tracking-[0.15em] opacity-100 scale-100"
                  : "tracking-[0.35em] opacity-0 scale-95"
              }`}
            >
              {movie.title}
            </h2>

            {/* Narrative Synopsis */}
            <div className="mt-4 text-sm text-stone-300 font-sans font-light leading-relaxed">
              <p>{movie.description}</p>
              {((movie as any).keyCharacters?.length > 0 || movie.leadCharacter) && (
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-mono text-stone-300">
                  <span className="text-stone-500 uppercase tracking-widest text-[10px]">
                    {(movie as any).keyCharacters?.length > 1 ? "KEY CHARACTERS:" : "LEAD CHARACTER:"}
                  </span>
                  {(movie as any).keyCharacters?.length > 0 ? (
                    (movie as any).keyCharacters.slice(0, 4).map((char: string) => (
                      <span key={char} className="border border-white/30 rounded-full px-2.5 py-0.5 text-white font-medium text-[11px]">
                        {char}
                      </span>
                    ))
                  ) : (
                    <>
                      {movie.leadCharacter && (
                        <span className="border border-white/40 rounded-full px-3 py-0.5 text-white font-semibold shadow-sm">
                          {movie.leadCharacter}
                        </span>
                      )}
                      {movie.heroAlias && (
                        <span className="border border-white/20 rounded-full px-3 py-0.5 text-stone-300">
                          {movie.heroAlias}
                        </span>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Famous Quote Glass Card */}
            {movie.quote && (
              <div className="mt-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md relative max-w-lg shadow-lg">
                <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-white/80 to-white/10" />
                <p className="text-xs font-sans italic text-stone-100 leading-relaxed pl-2 font-normal">
                  &ldquo;{movie.quote}&rdquo;
                </p>
                {movie.speaker && (
                  <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest mt-1 pl-2 font-bold">
                    — {movie.speaker}
                  </p>
                )}
              </div>
            )}

            {/* Key Relics & Artifacts (Clean Borderless & Backgroundless) */}
            {movie.keyRelics && movie.keyRelics.length > 0 && (
              <div className="mt-4">
                <span className="text-[10px] font-mono tracking-[0.3em] text-stone-400 uppercase block mb-2 font-bold">
                  KEY RELICS & ARTIFACTS
                </span>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                  {movie.keyRelics.map((relic) => (
                    <span
                      key={relic}
                      className="inline-flex items-center gap-1.5 text-[11px] font-mono text-stone-300 hover:text-white transition-colors"
                    >
                      <Sparkles size={11} className="text-stone-500" />
                      <span>{relic}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: FLOATING VERTICAL TIMELINE NODE & DIRECT CONNECTIONS */}
        <div
          className={`w-full lg:w-[420px] flex flex-col items-center lg:items-end shrink-0 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-200 ${
            isExpanded ? "opacity-100 translate-x-0 blur-0" : "opacity-0 translate-x-12 blur-sm"
          }`}
        >
          {/* Vertical Timeline Pin */}
          <div className="flex flex-col items-center mb-5">
            <span className="text-[10.5px] font-mono tracking-[0.35em] uppercase text-stone-400 font-bold mb-1">
              {movie.heroAlias}
            </span>
            <span className="text-base text-white animate-spin [animation-duration:16s]">✹</span>
            <div className="w-[1.5px] h-7 bg-gradient-to-b from-white/80 to-white/20" />
            <span className="text-xs font-mono font-bold text-white tracking-widest bg-black/70 px-2.5 py-0.5 rounded-full mt-1 shadow-md">
              {movie.year}
            </span>
          </div>

          {/* Direct Connections Narrative Card List (No Glow, No Boundaries) */}
          <div className="w-full bg-transparent p-0">
            <div className="flex items-center justify-between mb-3 pb-1">
              <div className="flex items-center gap-2">
                <Compass size={14} className="text-stone-400" />
                <span className="text-[10.5px] font-mono tracking-[0.25em] uppercase text-stone-200 font-bold">
                  DIRECT CONNECTIONS
                </span>
              </div>
              <span className="text-[9px] font-mono font-semibold uppercase tracking-widest text-stone-400">
                {connectedMovies.length} THREAD{connectedMovies.length === 1 ? "" : "S"}
              </span>
            </div>

            <div className="flex flex-col gap-2 max-h-80 overflow-y-auto pr-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {connectedMovies.map((conn) => {
                if (!conn) return null;
                const { target, relationship } = conn;
                const targetPoster = MCU_POSTER_MAP[target.id]?.poster || "";

                return (
                  <button
                    key={target.id}
                    onClick={() => onNavigateToConnectedMovie(target)}
                    className="group w-full flex items-center justify-between p-2 rounded-xl bg-transparent hover:bg-white/[0.05] transition-colors duration-200 text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {/* Mini Theatrical Poster */}
                      <div className="w-11 h-15 aspect-[2/3] rounded-lg overflow-hidden shrink-0 bg-stone-900 shadow-sm relative">
                        {targetPoster ? (
                          <img
                            src={targetPoster}
                            alt={target.title}
                            loading="lazy"
                            className="w-full h-full object-cover object-center"
                          />
                        ) : (
                          <NodeArtwork movieId={target.id} rounded="rounded-lg" />
                        )}
                      </div>

                      {/* Movie Information */}
                      <div className="flex flex-col min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-stone-200 group-hover:text-white uppercase tracking-wider line-clamp-1 transition-colors">
                            {target.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-[8.5px] font-mono text-stone-400 uppercase tracking-widest mt-0.5 group-hover:text-stone-300 transition-colors">
                          <span>PHASE {target.phase}</span>
                          <span>•</span>
                          <span>{target.year}</span>
                        </div>

                        <p className="text-[11px] font-sans text-stone-300 leading-snug line-clamp-2 mt-1 group-hover:text-stone-100 transition-colors">
                          {relationship}
                        </p>
                      </div>
                    </div>

                    <ArrowRight size={13} className="text-stone-500 group-hover:text-stone-300 transition-colors pl-2 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
