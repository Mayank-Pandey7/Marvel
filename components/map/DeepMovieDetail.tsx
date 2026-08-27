"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, X, ChevronDown, Sparkles, User, Film, Play, ExternalLink } from "lucide-react";
import { UNIFIED_MCU_TREE, type MovieNode } from "@/data/movies";
import { MCU } from "@/data/mcu";
import { CHARACTERS } from "@/data/characters";
import NodeArtwork, { MCU_POSTER_MAP } from "./NodeArtwork";

export const MCU_BACKDROP_MAP: Record<string, string> = {

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
    }, 400);
  };

  const mcuEntry = useMemo(() => {
    if (!movie) return null;
    return MCU.find(
      (m) =>
        m.id === movie.id ||
        m.id.toLowerCase() === movie.id.toLowerCase() ||
        m.id.replace(/-/g, "") === movie.id.replace(/-/g, "")
    );
  }, [movie?.id]);

  const featuredCharacters = useMemo(() => {
    if (!movie) return [];
    const charIds = mcuEntry?.characters || [];
    const matched = CHARACTERS.filter(
      (c) =>
        charIds.includes(c.id) ||
        c.entries.includes(movie.id) ||
        (movie.leadCharacter && c.name.toLowerCase().includes(movie.leadCharacter.toLowerCase()))
    );
    return matched.slice(0, 8);
  }, [mcuEntry, movie]);

  if (!movie) return null;

  const connectedMovies = (movie.connections || [])
    .map((conn) => {
      const target = UNIFIED_MCU_TREE.find((m) => m.id === (typeof conn === "string" ? conn : conn.toId));
      return target ? { target, relationship: (conn as any).relationship || "Narrative Continuation", type: (conn as any).type || "Narrative" } : null;
    })
    .filter(Boolean);

  const currentIndex = UNIFIED_MCU_TREE.findIndex((m) => m.id === movie.id);
  const prevMovie = currentIndex > 0 ? UNIFIED_MCU_TREE[currentIndex - 1] : UNIFIED_MCU_TREE[UNIFIED_MCU_TREE.length - 1];
  const nextMovie = currentIndex < UNIFIED_MCU_TREE.length - 1 ? UNIFIED_MCU_TREE[currentIndex + 1] : UNIFIED_MCU_TREE[0];

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
  const sagaName = movie.phase <= 3 ? "The Infinity Saga" : "The Multiverse Saga";

  return (
    <div
      onMouseDown={(e) => e.stopPropagation()}
      onMouseMove={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
      className={`fixed inset-0 w-screen h-screen z-50 flex flex-col justify-start select-none bg-[#000000] text-stone-200 overflow-y-auto md:overflow-hidden font-sans transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
        isClosing
          ? "opacity-0 scale-98 pointer-events-none filter blur-sm"
          : isExpanded
          ? "opacity-100 scale-100"
          : "opacity-0 scale-105 pointer-events-none"
      }`}
    >
      {}
      {}
      {}
      <div className="hidden md:flex flex-col justify-between w-full h-full relative overflow-hidden bg-black/65 backdrop-blur-2xl text-stone-300">

        {}
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

          {}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/75" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.75)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.5)_0%,transparent_25%,transparent_70%,rgba(0,0,0,0.9)_100%)]" />
        </div>

        {}
        <header
          className={`relative z-20 w-full px-10 md:px-20 py-6 flex items-center justify-between pointer-events-auto transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isExpanded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}
        >
          {}
          <div className="w-10" />

          {}
          <div className="flex-1 flex items-center justify-center">
            <h1 className="text-sm font-mono font-medium tracking-[0.55em] uppercase text-white hover:text-white/80 transition-opacity select-none pl-[0.55em]">
              MARVEL
            </h1>
          </div>

          {}
          <div className="w-28 flex items-center justify-end">
            <button
              onClick={handleClose}
              className="text-stone-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              title="Close Dossier (Esc)"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>
        </header>

        {}
        <main className="relative z-20 flex-1 px-10 md:px-14 lg:px-20 py-6 flex flex-row items-center justify-between gap-12 lg:gap-16 overflow-y-auto w-full max-w-[1700px] mx-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

          {}
          <div
            className={`flex-1 flex flex-row items-start gap-8 lg:gap-10 min-w-0 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-100 ${
              isExpanded ? "opacity-100 translate-x-0 blur-0" : "opacity-0 -translate-x-12 blur-sm"
            }`}
          >
            {}
            <div className="w-48 sm:w-52 md:w-60 aspect-[2/3] rounded-2xl overflow-hidden border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.95)] shrink-0 bg-stone-900 group relative">
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

            {}
            <div className="flex-1 flex flex-col justify-center min-w-0 text-left">
              {}
              <div className="flex items-center justify-start flex-wrap gap-2 text-[11px] font-mono tracking-[0.3em] text-stone-400 uppercase font-semibold">
                <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">PHASE {movie.phase}</span>
                <span>•</span>
                <span className="text-stone-300">{movie.year}</span>
                <span>•</span>
                <span className="text-stone-400">{movie.runtime} MIN</span>
                <span>•</span>
                <span className="text-stone-300">{movie.director}</span>
              </div>

              {}
              <h2
                className={`font-mono font-light text-3xl sm:text-4xl md:text-5xl text-white uppercase leading-tight mt-3 drop-shadow-[0_0_35px_rgba(255,255,255,0.25)] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-150 ${
                  isExpanded
                    ? "tracking-[0.15em] opacity-100 scale-100"
                    : "tracking-[0.3em] opacity-0 scale-95"
                }`}
              >
                {movie.title}
              </h2>

              {}
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

              {}
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

              {}
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

          {}
          <div
            className={`w-[380px] lg:w-[400px] xl:w-[420px] flex flex-col shrink-0 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-200 ${
              isExpanded ? "opacity-100 translate-x-0 blur-0" : "opacity-0 translate-x-12 blur-sm"
            }`}
          >
            <div className="w-full bg-transparent p-0">
              <div className="flex items-center justify-between mb-3 pb-1 h-6">
                <div className="flex items-center gap-2">
                  <Film size={13} className="text-stone-400" />
                  <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-stone-200 font-bold">
                    DIRECT CONNECTIONS
                  </span>
                </div>
                <span className="text-[9px] font-mono font-semibold uppercase tracking-widest text-stone-400">
                  {connectedMovies.length} THREAD{connectedMovies.length === 1 ? "" : "S"}
                </span>
              </div>

              <div className="flex flex-col gap-2 max-h-[380px] overflow-y-auto pr-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
                        {}
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

                        {}
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

      {}
      {}
      {}
      <div className="flex md:hidden flex-col w-full min-h-screen">
        {}
        <div
          className="fixed top-0 inset-x-0 h-20 pointer-events-none z-40 bg-gradient-to-b from-[#000000]/90 to-transparent backdrop-blur-sm [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]"
          aria-hidden="true"
        />

        {}
        <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between pointer-events-none bg-transparent">
          <div className="w-8" />

          <div className="text-xs font-mono font-medium tracking-[0.45em] uppercase text-white pl-[0.45em] pointer-events-auto">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              MARVEL
            </Link>
          </div>

          <button
            onClick={handleClose}
            className="text-stone-300 hover:text-white p-1.5 rounded-full hover:bg-white/10 cursor-pointer pointer-events-auto"
            title="Close Dossier (Esc)"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </header>

        {}
        <section className="relative w-full min-h-[92vh] flex flex-col justify-end pt-16 pb-8 px-4 bg-[#000000] overflow-hidden">

          {}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src={posterSrc}
              alt={movie.title}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes("image.tmdb.org")) {
                  target.src = "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg";
                }
              }}
              className="w-full h-[68vh] object-cover object-top filter brightness-[0.80] contrast-[1.1]"
            />
            {}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent via-40% to-[#000000]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/95 via-45% to-transparent" />
          </div>

          {}
          <div className="relative z-10 flex flex-col gap-3.5 mt-auto pt-[36vh] xs:pt-[40vh]">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[9px] font-mono tracking-wider uppercase text-stone-400">
              <span>PHASE {movie.phase}</span>
              <span className="text-stone-600">/</span>
              <span>{movie.year}</span>
              <span className="text-stone-600">/</span>
              <span>{movie.runtime} MIN</span>
              <span className="text-stone-600">/</span>
              <span className="text-white font-semibold">{movie.director}</span>
            </div>

            <h1 className="text-3xl xs:text-4xl font-mono font-bold tracking-[0.08em] uppercase text-white leading-tight drop-shadow-2xl">
              {movie.title}
            </h1>

            <p className="text-xs font-mono tracking-wide text-stone-300 leading-relaxed">
              {movie.description}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1 text-[11px] font-mono text-stone-400">
              <div>
                <span className="text-[8.5px] uppercase tracking-widest text-stone-500 mr-1.5">SAGA:</span>
                <span className="text-stone-200">{sagaName}</span>
              </div>
              <div>
                <span className="text-[8.5px] uppercase tracking-widest text-stone-500 mr-1.5">DIRECTOR:</span>
                <span className="text-stone-200">{movie.director}</span>
              </div>
              {movie.leadCharacter && (
                <div>
                  <span className="text-[8.5px] uppercase tracking-widest text-stone-500 mr-1.5">LEAD:</span>
                  <span className="text-stone-200">{movie.leadCharacter}</span>
                </div>
              )}
            </div>

            {movie.quote && (
              <div className="pt-2 text-stone-400 font-mono text-xs italic">
                <span className="text-stone-200 font-sans font-normal">&ldquo;{movie.quote}&rdquo;</span>
                {movie.speaker && (
                  <span className="text-[10px] text-stone-500 uppercase not-italic tracking-wider ml-2">
                    — {movie.speaker}
                  </span>
                )}
              </div>
            )}
          </div>
        </section>

        {}
        {featuredCharacters.length > 0 && (
          <section className="w-full px-4 py-6 flex flex-col gap-3">
            <h2 className="text-sm font-mono font-bold tracking-[0.16em] uppercase text-white">
              FEATURED HEROES & OPERATIVES
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {featuredCharacters.map((char) => (
                <Link
                  key={char.id}
                  href={`/characters/${char.id}`}
                  className="group flex items-center gap-2.5 p-0 bg-transparent text-left hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-center justify-center shrink-0 text-stone-500 group-hover:text-white transition-colors">
                    <User size={13} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-mono font-bold text-stone-200 group-hover:text-white uppercase truncate">
                      {char.name}
                    </span>
                    <span className="text-[8.5px] font-mono text-stone-500 truncate">
                      {char.aliases[0] || char.role.split(",")[0]}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {}
        {connectedMovies.length > 0 && (
          <section className="w-full px-4 py-6 flex flex-col gap-4">
            <h2 className="text-sm font-mono font-bold tracking-[0.16em] uppercase text-white">
              MCU NARRATIVE THREADS
            </h2>
            <div className="flex flex-col gap-4">
              {connectedMovies.map((conn) => {
                if (!conn) return null;
                const { target, relationship } = conn;
                const targetPoster = MCU_POSTER_MAP[target.id]?.poster || "";

                return (
                  <button
                    key={target.id}
                    onClick={() => onNavigateToConnectedMovie(target)}
                    className="group flex gap-3 p-0 bg-transparent text-left cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <div className="w-12 aspect-[2/3] rounded-lg overflow-hidden shrink-0 bg-stone-900">
                      <img
                        src={targetPoster || MCU_BACKDROP_MAP[target.id]}
                        alt={target.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-xs font-mono font-bold text-stone-200 group-hover:text-white uppercase truncate transition-colors">
                        {target.title}
                      </span>
                      <span className="text-[9px] font-mono text-stone-500">
                        PHASE {target.phase} · {target.year}
                      </span>
                      <p className="text-[10px] font-mono text-stone-400 mt-1 line-clamp-2">
                        {relationship}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {}
        <footer className="w-full px-4 py-10 flex flex-col gap-6 items-center">
          <div className="w-full flex items-center justify-between gap-4">
            {prevMovie && (
              <button
                onClick={() => onNavigateToConnectedMovie(prevMovie)}
                className="flex items-center gap-2 text-stone-400 text-left max-w-[45%]"
              >
                <div className="p-2 rounded-full bg-white/[0.03] border border-white/5 shrink-0">
                  <ArrowLeft size={13} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[8px] font-mono uppercase text-stone-500 truncate">PREV</span>
                  <span className="text-[11px] font-mono font-bold uppercase text-stone-200 truncate">{prevMovie.title}</span>
                </div>
              </button>
            )}

            {nextMovie && (
              <button
                onClick={() => onNavigateToConnectedMovie(nextMovie)}
                className="flex items-center justify-end gap-2 text-stone-400 text-right max-w-[45%]"
              >
                <div className="flex flex-col min-w-0">
                  <span className="text-[8px] font-mono uppercase text-stone-500 truncate">NEXT</span>
                  <span className="text-[11px] font-mono font-bold uppercase text-stone-200 truncate">{nextMovie.title}</span>
                </div>
                <div className="p-2 rounded-full bg-white/[0.03] border border-white/5 shrink-0">
                  <ArrowRight size={13} />
                </div>
              </button>
            )}
          </div>

          <button
            onClick={handleClose}
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone-500 hover:text-white transition-colors"
          >
            RETURN TO SACRED TIMELINE
          </button>
        </footer>
      </div>
    </div>
  );
}
