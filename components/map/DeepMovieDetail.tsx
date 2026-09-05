"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { MovieNode, UNIFIED_MCU_TREE } from "../../data/movies";
import { MCU_POSTER_MAP } from "./NodeArtwork";


export const MCU_BACKDROP_MAP: Record<string, string> = {
  
  "iron-man": "/images/backdrops/iron-man.jpg",
  "the-incredible-hulk": "/images/backdrops/the-incredible-hulk.jpg",
  "hulk": "/images/backdrops/the-incredible-hulk.jpg",
  "iron-man-2": "/images/backdrops/iron-man-2.jpg",
  "thor": "/images/backdrops/thor.jpg",
  "captain-america-the-first-avenger": "/images/backdrops/captain-america-first-avenger.jpg",
  "cap-first-avenger": "/images/backdrops/captain-america-first-avenger.jpg",
  "captain-america": "/images/backdrops/captain-america-first-avenger.jpg",
  "the-avengers": "/images/backdrops/the-avengers.jpg",
  "avengers": "/images/backdrops/the-avengers.jpg",

  
  "iron-man-3": "/images/backdrops/iron-man-3.jpg",
  "thor-the-dark-world": "/images/backdrops/thor-dark-world.jpg",
  "thor-dark-world": "/images/backdrops/thor-dark-world.jpg",
  "captain-america-the-winter-soldier": "/images/backdrops/cap-winter-soldier.jpg",
  "cap-winter-soldier": "/images/backdrops/cap-winter-soldier.jpg",
  "captain-america-winter-soldier": "/images/backdrops/cap-winter-soldier.jpg",
  "guardians-of-the-galaxy": "/images/backdrops/gotg.jpg",
  "gotg": "/images/backdrops/gotg.jpg",
  "avengers-age-of-ultron": "/images/backdrops/avengers-age-of-ultron.jpg",
  "avengers-aou": "/images/backdrops/avengers-age-of-ultron.jpg",
  "ant-man": "/images/backdrops/ant-man.jpg",

  
  "captain-america-civil-war": "/images/backdrops/cap-civil-war.jpg",
  "cap-civil-war": "/images/backdrops/cap-civil-war.jpg",
  "doctor-strange": "/images/backdrops/doctor-strange.jpg",
  "guardians-of-the-galaxy-vol-2": "/images/backdrops/gotg2.jpg",
  "gotg2": "/images/backdrops/gotg2.jpg",
  "spider-man-homecoming": "/images/backdrops/spider-man-homecoming.jpg",
  "spiderman-homecoming": "/images/backdrops/spider-man-homecoming.jpg",
  "thor-ragnarok": "/images/backdrops/thor-ragnarok.jpg",
  "black-panther": "/images/backdrops/black-panther.jpg",
  "avengers-infinity-war": "/images/backdrops/infinity-war.jpg",
  "infinity-war": "/images/backdrops/infinity-war.jpg",
  "ant-man-and-the-wasp": "/images/backdrops/ant-man-and-the-wasp.jpg",
  "ant-man-wasp": "/images/backdrops/ant-man-and-the-wasp.jpg",
  "captain-marvel": "/images/backdrops/captain-marvel.jpg",
  "avengers-endgame": "/images/backdrops/endgame.jpg",
  "endgame": "/images/backdrops/endgame.jpg",
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
  "thor-love-and-thunder": "/images/backdrops/thor-love-thunder.jpg",
  "thor-love-thunder": "/images/backdrops/thor-love-thunder.jpg",
  "she-hulk-attorney-at-law": "/images/backdrops/she-hulk.jpg",
  "she-hulk": "/images/backdrops/she-hulk.jpg",
  "black-panther-wakanda-forever": "/images/backdrops/black-panther-wakanda-forever.jpg",
  "black-panther-wakanda": "/images/backdrops/black-panther-wakanda-forever.jpg",
  "the-guardians-of-the-galaxy-holiday-special": "/images/backdrops/guardians-holiday.jpg",
  "guardians-holiday": "/images/backdrops/guardians-holiday.jpg",

  
  "ant-man-and-the-wasp-quantumania": "/images/backdrops/ant-man-quantumania.jpg",
  "ant-man-quantumania": "/images/backdrops/ant-man-quantumania.jpg",
  "guardians-of-the-galaxy-vol-3": "/images/backdrops/guardians-vol3.jpg",
  "guardians-vol3": "/images/backdrops/guardians-vol3.jpg",
  "secret-invasion": "/images/backdrops/secret-invasion.jpg",
  "loki-season-2": "/images/backdrops/loki-s2.jpg",
  "loki-s2": "/images/backdrops/loki-s2.jpg",
  "the-marvels": "/images/backdrops/the-marvels.jpg",
  "echo": "/images/backdrops/echo.jpg",
  "deadpool-and-wolverine": "/images/backdrops/deadpool-and-wolverine.jpg",
  "deadpool-wolverine": "/images/backdrops/deadpool-and-wolverine.jpg",
  "agatha-all-along": "/images/backdrops/agatha-all-along.jpg",
  "captain-america-brave-new-world": "/images/backdrops/cap-brave-new-world.jpg",
  "cap-brave-new-world": "/images/backdrops/cap-brave-new-world.jpg",
  "daredevil-born-again": "/images/backdrops/daredevil-born-again.jpg",
  "thunderbolts": "/images/backdrops/thunderbolts.jpg",

  
  "the-fantastic-four-first-steps": "/images/backdrops/fantastic-four.jpg",
  "fantastic-four": "/images/backdrops/fantastic-four.jpg",
  "blade": "/images/backdrops/blade.jpg",
  "spiderman-brand-new-day": "/images/backdrops/spiderman-brand-new-day.jpg",
  "spider-man-brand-new-day": "/images/backdrops/spiderman-brand-new-day.jpg",
  "avengers-doomsday": "/images/backdrops/avengers-doomsday.jpg",
  "avengers-secret-wars": "/images/backdrops/battleworld.jpg",
  "battleworld": "/images/backdrops/battleworld.jpg",
  "x-men": "/images/backdrops/x-men.jpg",
  "x-men-2000": "/images/backdrops/x-men-2000.jpg",
  "x2": "/images/backdrops/x2.jpg",
  "x2-2003": "/images/backdrops/x2-2003.jpg",
  "spider-man-2002": "/images/backdrops/spider-man-2002.jpg",
  "spider-man-2": "/images/backdrops/spider-man-2.jpg",
  "spider-man-3": "/images/backdrops/spider-man-3.jpg",
  "the-amazing-spider-man": "/images/backdrops/the-amazing-spider-man.jpg",
  "the-amazing-spider-man-2": "/images/backdrops/the-amazing-spider-man-2.jpg",
  "fantastic-four-2005": "/images/backdrops/fantastic-four-2005.jpg",
  "fantastic-four-rise-of-the-silver-surfer": "/images/backdrops/fantastic-four-rise-of-the-silver-surfer.jpg",
  "f4-rise-of-the-silver-surfer": "/images/backdrops/fantastic-four-rise-of-the-silver-surfer.jpg",
  "logan": "/images/backdrops/logan.jpg",
  "x-men-the-last-stand": "/images/backdrops/x-men-the-last-stand.jpg",
  "x-men-origins-wolverine": "/images/backdrops/x-men-origins-wolverine.jpg",
  "x-men-first-class": "/images/backdrops/x-men-first-class.jpg",
  "the-wolverine": "/images/backdrops/the-wolverine.jpg",
  "x-men-days-of-future-past": "/images/backdrops/x-men-days-of-future-past.jpg",
  "deadpool": "/images/backdrops/deadpool.jpg",
  "x-men-apocalypse": "/images/backdrops/x-men-apocalypse.jpg",
  "deadpool-2": "/images/backdrops/deadpool-2.jpg",
  "dark-phoenix": "/images/backdrops/dark-phoenix.jpg",
  "the-new-mutants": "/images/backdrops/the-new-mutants.jpg",
  "what-if-s1": "https://image.tmdb.org/t/p/original/jnzoh5qoxRLFRIQAxnl6D3RStPC.jpg",
  "what-if-s2": "https://image.tmdb.org/t/p/original/jnzoh5qoxRLFRIQAxnl6D3RStPC.jpg",
  "what-if-s3": "https://image.tmdb.org/t/p/original/jnzoh5qoxRLFRIQAxnl6D3RStPC.jpg",
  "marvel-zombies": "https://image.tmdb.org/t/p/original/lxQMxqao3vs2ehxESrkQU6acU86.jpg",
  "venom-2018": "https://image.tmdb.org/t/p/original/hNsYUryiwxcdeTMkaBcPF3iEg0p.jpg",
  "venom": "https://image.tmdb.org/t/p/original/hNsYUryiwxcdeTMkaBcPF3iEg0p.jpg",
  "venom-1": "https://image.tmdb.org/t/p/original/hNsYUryiwxcdeTMkaBcPF3iEg0p.jpg",
  "venom-let-there-be-carnage": "https://image.tmdb.org/t/p/original/eENEf62tMXbhyVvdcXlnQz2wcuT.jpg",
  "venom-2": "https://image.tmdb.org/t/p/original/eENEf62tMXbhyVvdcXlnQz2wcuT.jpg",
  "venom-the-last-dance": "https://image.tmdb.org/t/p/original/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
  "venom-last-dance": "https://image.tmdb.org/t/p/original/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
  "venom-3": "https://image.tmdb.org/t/p/original/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
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
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={backdropSrc}
          alt={movie.title}
          onError={(e) => {
            if (posterSrc && (e.target as HTMLImageElement).src !== posterSrc) {
              (e.target as HTMLImageElement).src = posterSrc;
            }
          }}
          className={`w-full h-full object-cover object-center filter brightness-100 contrast-[1.05] transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isExpanded ? "scale-105 opacity-100" : "scale-125 opacity-0"
          }`}
        />

        <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 w-full px-4 sm:px-8 py-4 sm:py-6 min-h-[58px] sm:min-h-[72px] flex items-center justify-between z-50 bg-transparent pointer-events-none transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isExpanded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="flex items-center pointer-events-auto">
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/90 text-stone-200 hover:text-white border border-white/20 hover:border-white/50 backdrop-blur-md shadow-lg transition-all duration-200 cursor-pointer active:scale-95 group"
            title="Close Dossier"
            aria-label="Close Dossier"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
          </button>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto">
          <span className="text-xs sm:text-sm md:text-base font-mono font-bold tracking-[0.45em] sm:tracking-[0.55em] uppercase text-white select-none whitespace-nowrap pl-[0.45em] sm:pl-[0.55em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            MARVEL
          </span>
        </div>

        <div className="w-8 sm:w-9" />
      </header>

      <main className="relative z-20 flex-1 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 pt-16 pb-8 sm:pb-12 md:pb-14 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 lg:gap-16 xl:gap-20 overflow-y-auto w-full min-h-[calc(100vh-80px)] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-stone-800 [&::-webkit-scrollbar-thumb]:rounded-full">
        <div
          className={`flex-1 max-w-5xl lg:max-w-6xl flex flex-col sm:flex-row items-start sm:items-end gap-6 sm:gap-8 w-full transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-100 ${
            isExpanded ? "opacity-100 translate-x-0 translate-y-0 blur-0" : "opacity-0 -translate-x-12 translate-y-4 blur-sm"
          }`}
        >
          <div className="w-44 xs:w-48 sm:w-56 md:w-64 lg:w-72 aspect-[2/3] rounded-2xl overflow-hidden border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.95)] shrink-0 bg-stone-900 group relative self-start">
            <img
              src={posterSrc}
              alt={movie.title}
              loading="eager"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                const fallback = MCU_POSTER_MAP[movie.id]?.poster || `/images/posters/${movie.id}.jpg`;
                if (target.src !== fallback && !target.src.endsWith(fallback)) {
                  target.src = fallback;
                }
              }}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />
          </div>

          <div className="flex-1 flex flex-col justify-end min-w-0 pb-1 text-left items-start w-full">
            <h2
              className={`font-mono font-semibold ${
                movie.id === "doctor-strange-multiverse" ||
                movie.title.toLowerCase().includes("multiverse of madness") ||
                movie.id === "guardians-holiday" ||
                movie.title.toLowerCase().includes("holiday special") ||
                movie.id === "shang-chi" ||
                movie.title.toLowerCase().includes("shang-chi")
                  ? "text-2xl xs:text-3xl sm:text-3xl md:text-4xl lg:text-5xl"
                  : movie.title.length > 28
                  ? "text-2xl xs:text-3xl sm:text-3xl md:text-4xl lg:text-5xl"
                  : movie.title.length > 18
                  ? "text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-6xl"
                  : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
              } text-white uppercase leading-tight mt-1 ${
                movie.id === "doctor-strange-multiverse" ||
                movie.title.toLowerCase().includes("multiverse of madness") ||
                movie.id === "guardians-holiday" ||
                movie.title.toLowerCase().includes("holiday special") ||
                movie.id === "shang-chi" ||
                movie.title.toLowerCase().includes("shang-chi")
                  ? ""
                  : "sm:whitespace-nowrap"
              } drop-shadow-[0_0_35px_rgba(255,255,255,0.3)] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-150 ${
                isExpanded
                  ? `${movie.title.length > 18 ? "tracking-[0.05em] sm:tracking-[0.08em]" : "tracking-[0.08em] sm:tracking-[0.12em]"} opacity-100 scale-100`
                  : "tracking-[0.35em] opacity-0 scale-95"
              }`}
            >
              {movie.id === "doctor-strange-multiverse" || movie.title.toLowerCase().includes("multiverse of madness") ? (
                <>
                  <span className="block">DOCTOR STRANGE</span>
                  <span className="block text-[0.82em] sm:text-[0.88em] text-stone-100 tracking-normal sm:tracking-[0.05em] mt-0.5">
                    IN THE MULTIVERSE OF MADNESS
                  </span>
                </>
              ) : movie.id === "guardians-holiday" || movie.title.toLowerCase().includes("holiday special") ? (
                <>
                  <span className="block">THE GUARDIANS OF THE GALAXY</span>
                  <span className="block text-[0.82em] sm:text-[0.88em] text-stone-100 tracking-normal sm:tracking-[0.05em] mt-0.5">
                    HOLIDAY SPECIAL
                  </span>
                </>
              ) : movie.id === "shang-chi" || movie.title.toLowerCase().includes("shang-chi") ? (
                <>
                  <span className="block">SHANG-CHI</span>
                  <span className="block text-[0.82em] sm:text-[0.88em] text-stone-100 tracking-normal sm:tracking-[0.05em] mt-0.5">
                    AND THE LEGEND OF THE TEN RINGS
                  </span>
                </>
              ) : movie.title.includes(":") ? (
                movie.title.split(":").map((chunk, i, arr) => (
                  <React.Fragment key={i}>
                    {chunk}
                    {i < arr.length - 1 && (
                      <span className="font-sans font-normal mx-1.5 opacity-90 inline-block align-middle text-[0.8em] tracking-normal">
                        :
                      </span>
                    )}
                  </React.Fragment>
                ))
              ) : (
                movie.title
              )}
            </h2>

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
                      {movie.heroAlias && movie.heroAlias !== movie.leadCharacter && (
                        <span className="border border-white/20 rounded-full px-3 py-0.5 text-stone-300">
                          {movie.heroAlias}
                        </span>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            {movie.quote && (
              <div className="mt-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md relative max-w-lg shadow-lg overflow-hidden">
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

            <div className="mt-4 flex items-center flex-wrap gap-2.5 text-[11px] font-mono tracking-[0.25em] text-stone-400 uppercase font-semibold">
              {(!movie.earthDesignation || movie.earthDesignation === "Earth-616") && movie.phase <= 6 ? (
                <>
                  <span className="px-2.5 py-0.5 rounded bg-white/10 text-white font-bold">PHASE {movie.phase}</span>
                  <span className="text-stone-600">•</span>
                </>
              ) : movie.earthDesignation ? (
                <>
                  <span className="px-2.5 py-0.5 rounded bg-white/10 text-white font-bold">{movie.earthDesignation}</span>
                  <span className="text-stone-600">•</span>
                </>
              ) : null}
              <span className="text-stone-300">{movie.year}</span>
              <span className="text-stone-600">•</span>
              <span className="text-stone-400">{movie.runtime} MIN</span>
              <span className="text-stone-600">•</span>
              <span className="text-stone-300">{movie.director}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
