"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Sparkles, Compass } from "lucide-react";
import { UNIFIED_MCU_TREE, type MovieNode } from "@/data/movies";
import NodeArtwork, { MCU_POSTER_MAP } from "./NodeArtwork";

// High-Resolution 100% Verified TMDB Cinematic Backdrop Images for Every MCU Movie
export const MCU_BACKDROP_MAP: Record<string, string> = {
  "iron-man": "https://image.tmdb.org/t/p/w1280/cKvDv2LpwVEqbdXWoQl4XgGN6le.jpg",
  "the-incredible-hulk": "https://image.tmdb.org/t/p/w1280/jPu8yiadqgzwFPGKJmGo637ASVP.jpg",
  "hulk": "https://image.tmdb.org/t/p/w1280/jPu8yiadqgzwFPGKJmGo637ASVP.jpg",
  "iron-man-2": "https://image.tmdb.org/t/p/w1280/7lmBufEG7P7Y1HClYK3gCxYrkgS.jpg",
  "thor": "https://image.tmdb.org/t/p/w1280/cDJ61O1STtbWNBwefuqVrRe3d7l.jpg",
  "captain-america": "https://image.tmdb.org/t/p/w1280/yFuKvT4Vm3sKHdFY4eG6I4ldAnn.jpg",
  "cap-first-avenger": "https://image.tmdb.org/t/p/w1280/yFuKvT4Vm3sKHdFY4eG6I4ldAnn.jpg",
  "the-avengers": "https://image.tmdb.org/t/p/w1280/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg",
  "avengers": "https://image.tmdb.org/t/p/w1280/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg",
  "iron-man-3": "https://image.tmdb.org/t/p/w1280/iVped1djsF0tvGkvnHbzsE3ZPTF.jpg",
  "thor-dark-world": "https://image.tmdb.org/t/p/w1280/5QEOy0QEpad9QsXeMxuGHPXMale.jpg",
  "captain-america-winter-soldier": "https://image.tmdb.org/t/p/w1280/1RWLMyC9KcFfcaoViMiJGSSZzzr.jpg",
  "cap-winter-soldier": "https://image.tmdb.org/t/p/w1280/1RWLMyC9KcFfcaoViMiJGSSZzzr.jpg",
  "guardians-of-the-galaxy": "https://image.tmdb.org/t/p/w1280/uLtVbjvS1O7gXL8lUOwsFOH4man.jpg",
  "gotg": "https://image.tmdb.org/t/p/w1280/uLtVbjvS1O7gXL8lUOwsFOH4man.jpg",
  "avengers-age-of-ultron": "https://image.tmdb.org/t/p/w1280/kIBK5SKwgqIIuRKhhWrJn3XkbPq.jpg",
  "avengers-aou": "https://image.tmdb.org/t/p/w1280/kIBK5SKwgqIIuRKhhWrJn3XkbPq.jpg",
  "ant-man": "https://image.tmdb.org/t/p/w1280/1K3JmSNUN8OpjYsCjc0Hy0SYxAb.jpg",
  "captain-america-civil-war": "https://image.tmdb.org/t/p/w1280/wdwcOBMkt3zmPQuEMxB3FUtMio2.jpg",
  "cap-civil-war": "https://image.tmdb.org/t/p/w1280/wdwcOBMkt3zmPQuEMxB3FUtMio2.jpg",
  "doctor-strange": "https://image.tmdb.org/t/p/w1280/kkoiH8ZWxJ9WSAjOadGtuHUQxbm.jpg",
  "guardians-of-the-galaxy-vol-2": "https://image.tmdb.org/t/p/w1280/bW93ycPSSi3Hxx1NvlMX5qm2mQu.jpg",
  "gotg2": "https://image.tmdb.org/t/p/w1280/bW93ycPSSi3Hxx1NvlMX5qm2mQu.jpg",
  "spider-man-homecoming": "https://image.tmdb.org/t/p/w1280/fn4n6uOYcB6Uh89nbNPoU2w80RV.jpg",
  "spiderman-homecoming": "https://image.tmdb.org/t/p/w1280/fn4n6uOYcB6Uh89nbNPoU2w80RV.jpg",
  "thor-ragnarok": "https://image.tmdb.org/t/p/w1280/vLmHH8jAy8Jq8uBsLucd3592WGh.jpg",
  "black-panther": "https://image.tmdb.org/t/p/w1280/b6ZJZHUdMEFECvGiDpJjlfUWela.jpg",
  "avengers-infinity-war": "https://image.tmdb.org/t/p/w1280/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg",
  "infinity-war": "https://image.tmdb.org/t/p/w1280/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg",
  "ant-man-and-the-wasp": "https://image.tmdb.org/t/p/w1280/iYdgEUE2W2aJkgqfSjf1x3gFfuV.jpg",
  "ant-man-wasp": "https://image.tmdb.org/t/p/w1280/iYdgEUE2W2aJkgqfSjf1x3gFfuV.jpg",
  "captain-marvel": "https://image.tmdb.org/t/p/w1280/qAzYK4YPSWDc7aa4R43LcwRIAyb.jpg",
  "avengers-endgame": "https://image.tmdb.org/t/p/w1280/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
  "endgame": "https://image.tmdb.org/t/p/w1280/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
  "spider-man-far-from-home": "https://image.tmdb.org/t/p/w1280/vamhMTvh9m9zFHDoR0v1nRtf6T4.jpg",
  "spiderman-far-from-home": "https://image.tmdb.org/t/p/w1280/vamhMTvh9m9zFHDoR0v1nRtf6T4.jpg",
  "wandavision": "https://image.tmdb.org/t/p/w1280/lOr9NKxh4vMweufMOUDJjJhCRHW.jpg",
  "the-falcon-and-the-winter-soldier": "https://image.tmdb.org/t/p/w1280/aTjbqMONy77fHJrIYu14g1F0d5h.jpg",
  "falcon-winter-soldier": "https://image.tmdb.org/t/p/w1280/aTjbqMONy77fHJrIYu14g1F0d5h.jpg",
  "loki-season-1": "https://image.tmdb.org/t/p/w1280/jBGjbSDRxOEudW9rmQbWDzJUKq9.jpg",
  "loki-s1": "https://image.tmdb.org/t/p/w1280/jBGjbSDRxOEudW9rmQbWDzJUKq9.jpg",
  "loki": "https://image.tmdb.org/t/p/w1280/jBGjbSDRxOEudW9rmQbWDzJUKq9.jpg",
  "black-widow": "https://image.tmdb.org/t/p/w1280/keIxh0wPr2Ymj0Btjh4gW7JJ89e.jpg",
  "shang-chi": "https://image.tmdb.org/t/p/w1280/r7K6Xt0RX4Mw0cAbZVw5cyb1Tux.jpg",
  "eternals": "https://image.tmdb.org/t/p/w1280/c6H7Z4u73ir3cIoCteuhJh7UCAR.jpg",
  "hawkeye": "https://image.tmdb.org/t/p/w1280/9QNv2Al3GfCND8BwuLmu2GwVht7.jpg",
  "spider-man-no-way-home": "https://image.tmdb.org/t/p/w1280/uyrOU4BDm2kbVxFsMiDFIHDhc4d.jpg",
  "spiderman-no-way-home": "https://image.tmdb.org/t/p/w1280/uyrOU4BDm2kbVxFsMiDFIHDhc4d.jpg",
  "moon-knight": "https://image.tmdb.org/t/p/w1280/1uegR4uAxRxiMyX4nQnpzbXhrTw.jpg",
  "doctor-strange-multiverse-of-madness": "https://image.tmdb.org/t/p/w1280/lv3TXqhpaIxkclIHbhN2MRMOemQ.jpg",
  "doctor-strange-multiverse": "https://image.tmdb.org/t/p/w1280/lv3TXqhpaIxkclIHbhN2MRMOemQ.jpg",
  "ms-marvel": "https://image.tmdb.org/t/p/w1280/mfcLUWASJghU8MTNK38eYktfE83.jpg",
  "thor-love-and-thunder": "https://image.tmdb.org/t/p/w1280/jsoz1HlxczSuTx0mDl2h0lxy36l.jpg",
  "thor-love-thunder": "https://image.tmdb.org/t/p/w1280/jsoz1HlxczSuTx0mDl2h0lxy36l.jpg",
  "she-hulk-attorney-at-law": "https://image.tmdb.org/t/p/w1280/eljErfkQUcFUgQkI4I1soZcH8MW.jpg",
  "she-hulk": "https://image.tmdb.org/t/p/w1280/eljErfkQUcFUgQkI4I1soZcH8MW.jpg",
  "black-panther-wakanda-forever": "https://image.tmdb.org/t/p/w1280/83H0C66AcvkwpG2738VCTHMY9uv.jpg",
  "black-panther-wakanda": "https://image.tmdb.org/t/p/w1280/83H0C66AcvkwpG2738VCTHMY9uv.jpg",
  "the-guardians-of-the-galaxy-holiday-special": "https://image.tmdb.org/t/p/w1280/rfnmMYuZ6EKOBvQLp2wqP21v7sI.jpg",
  "guardians-holiday": "https://image.tmdb.org/t/p/w1280/rfnmMYuZ6EKOBvQLp2wqP21v7sI.jpg",
  "ant-man-and-the-wasp-quantumania": "https://image.tmdb.org/t/p/w1280/m8JTwHFwX7I7JY5fPe4SjqejWag.jpg",
  "ant-man-quantumania": "https://image.tmdb.org/t/p/w1280/m8JTwHFwX7I7JY5fPe4SjqejWag.jpg",
  "guardians-of-the-galaxy-vol-3": "https://image.tmdb.org/t/p/w1280/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg",
  "guardians-vol3": "https://image.tmdb.org/t/p/w1280/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg",
  "secret-invasion": "https://image.tmdb.org/t/p/w1280/kwronSXO1ogMqHHFvY2eBxfFLdn.jpg",
  "loki-season-2": "https://image.tmdb.org/t/p/w1280/jBGjbSDRxOEudW9rmQbWDzJUKq9.jpg",
  "loki-s2": "https://image.tmdb.org/t/p/w1280/jBGjbSDRxOEudW9rmQbWDzJUKq9.jpg",
  "the-marvels": "https://image.tmdb.org/t/p/w1280/feSiISwgEpVzR1v3zv2n2AU4ANJ.jpg",
  "echo": "https://image.tmdb.org/t/p/w1280/jIyEmnBrZtl6SEWyBoMO2hZnzMa.jpg",
  "deadpool-and-wolverine": "https://image.tmdb.org/t/p/w1280/by8z9Fe8y7p4jo2YlW2SZDnptyT.jpg",
  "deadpool-wolverine": "https://image.tmdb.org/t/p/w1280/by8z9Fe8y7p4jo2YlW2SZDnptyT.jpg",
  "agatha-all-along": "https://image.tmdb.org/t/p/w1280/tYLXJW1sZQU09VWY1BhSVPKGIwc.jpg",
  "captain-america-brave-new-world": "https://image.tmdb.org/t/p/w1280/ce3prrjh9ZehEl5JinNqr4jIeaB.jpg",
  "cap-brave-new-world": "https://image.tmdb.org/t/p/w1280/ce3prrjh9ZehEl5JinNqr4jIeaB.jpg",
  "daredevil-born-again": "https://image.tmdb.org/t/p/w1280/mAJ84W6I8I272Da87qplS2Dp9ST.jpg",
  "thunderbolts": "https://image.tmdb.org/t/p/w1280/rthMuZfFv4fqEU4JVbgSW9wQ8rs.jpg",
  "blade": "https://image.tmdb.org/t/p/w1280/s94NjfKkcSczZ1FembwmQZwsuwY.jpg",
  "spiderman-brand-new-day": "https://image.tmdb.org/t/p/w1280/uyrOU4BDm2kbVxFsMiDFIHDhc4d.jpg",
  "avengers-doomsday": "https://image.tmdb.org/t/p/w1280/s4v0UX1anfXm0UvloLsTTJ4v222.jpg",
  "avengers-secret-wars": "https://image.tmdb.org/t/p/w1280/rytc6Lf4447C0CDncwFa4gxe0vY.jpg",
  "battleworld": "https://image.tmdb.org/t/p/w1280/rytc6Lf4447C0CDncwFa4gxe0vY.jpg",
  "x-men": "https://image.tmdb.org/t/p/w1280/9iRRSD8dHZZ7mep9mEbgA6a4qJ5.jpg",
  "x-men-2000": "https://image.tmdb.org/t/p/w1280/9iRRSD8dHZZ7mep9mEbgA6a4qJ5.jpg",
  "x2": "https://image.tmdb.org/t/p/w1280/8I37NtDffNV7AZlDa7uYvvqJhU1.jpg",
  "x2-2003": "https://image.tmdb.org/t/p/w1280/8I37NtDffNV7AZlDa7uYvvqJhU1.jpg",
  "the-fantastic-four-first-steps": "https://image.tmdb.org/t/p/w1280/nf5qaSEvyYSNeFH0YhSs5EsBLX9.jpg",
  "fantastic-four": "https://image.tmdb.org/t/p/w1280/nf5qaSEvyYSNeFH0YhSs5EsBLX9.jpg",
  "captain-america-the-first-avenger": "https://image.tmdb.org/t/p/w1280/yFuKvT4Vm3sKHdFY4eG6I4ldAnn.jpg",
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

  const posterSrc =
    (movie as any).posterUrl ||
    MCU_POSTER_MAP[movie.id]?.poster ||
    MCU_POSTER_MAP[movie.id.toLowerCase()]?.poster ||
    MCU_POSTER_MAP[movie.id.replace(/_/g, "-")]?.poster ||
    "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg";

  const backdropSrc =
    (movie as any).backdropUrl ||
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
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-mono text-stone-300">
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

          {/* Coordinates in Cosmic Space */}
          <div className="mt-3.5 text-[9px] font-mono text-stone-500 tracking-[0.25em] uppercase">
            COSMIC POSITION: X:{movie.x} · Y:{movie.y}
          </div>
        </div>
      </main>
    </div>
  );
}
