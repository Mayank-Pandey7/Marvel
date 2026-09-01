"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Sparkles, Film } from "lucide-react";
import type { MCUEarth } from "@/data/movies";

const EARTH_BACKDROPS: Record<string, string> = {
  "earth-616": "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1z9q9v8t6s5a4.jpg",
  "earth-838": "https://image.tmdb.org/t/p/original/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
  "earth-10005": "https://image.tmdb.org/t/p/original/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
  "earth-96283": "https://image.tmdb.org/t/p/original/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
  "earth-120703": "https://image.tmdb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
  "earth-688": "https://image.tmdb.org/t/p/original/4q2hz2mYflgYOpVLyGuhiz0yYAW.jpg",
  "battleworld": "https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
};

export default function EarthDossierPage({
  earth,
  onClose,
}: {
  earth: MCUEarth | null;
  onClose: () => void;
}) {
  const [stage, setStage] = useState<"entering" | "expanded" | "closing">("entering");

  useEffect(() => {
    setStage("entering");
    const t = setTimeout(() => setStage("expanded"), 40);
    return () => clearTimeout(t);
  }, [earth?.id]);

  const handleClose = () => {
    setStage("closing");
    setTimeout(() => {
      onClose();
    }, 450);
  };

  if (!earth) return null;

  const backdropSrc =
    EARTH_BACKDROPS[earth.id] ||
    "https://image.tmdb.org/t/p/original/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg";

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
      {/* 1. FULLSCREEN CINEMATIC BACKDROP IMAGE */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={backdropSrc}
          alt={earth.name}
          className={`w-full h-full object-cover object-center filter brightness-[0.55] contrast-[1.10] transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isExpanded ? "scale-105 blur-0 opacity-100" : "scale-125 blur-lg opacity-0"
          }`}
        />

        {/* Cinematic Vignette & Atmospheric Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020204]/90 via-[#020204]/55 to-[#020204]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(2,2,4,0.92)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,2,4,0.85)_0%,transparent_30%,transparent_70%,rgba(2,2,4,0.95)_100%)]" />
      </div>

      {/* Top Navbar Blur (Transparent Subtle Blur - No Black Bar) */}
      <div
        className="fixed top-0 inset-x-0 h-20 sm:h-26 pointer-events-none z-40 bg-transparent backdrop-blur-xs sm:backdrop-blur-sm [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] transition-opacity duration-700"
        aria-hidden="true"
      />

      {/* 2. MINIMALIST TOP HEADER (Matching Global Standard) */}
      <header
        className={`fixed top-0 left-0 right-0 w-full px-4 sm:px-8 py-4 sm:py-6 min-h-[58px] sm:min-h-[72px] flex items-center justify-between z-50 bg-transparent pointer-events-none transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isExpanded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        {/* Left: Close button */}
        <div className="flex items-center pointer-events-auto">
          <button
            onClick={handleClose}
            className="text-stone-400 hover:text-white transition-colors cursor-pointer p-1.5"
            title="Close Reality Dossier"
            aria-label="Close Reality Dossier"
          >
            <ArrowLeft size={18} />
          </button>
        </div>

        {/* Center: Exact Centered MARVEL (Never wraps) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto">
          <span className="text-xs sm:text-sm md:text-base font-mono font-bold tracking-[0.45em] sm:tracking-[0.55em] uppercase text-white select-none whitespace-nowrap pl-[0.45em] sm:pl-[0.55em]">
            MARVEL
          </span>
        </div>

        {/* Right side spacer for centered balance */}
        <div className="w-8" />
      </header>

      {/* 3. MAIN MULTIVERSE DOSSIER STAGE (BOTTOM-ANCHORED EXPANSIVE STAGE) */}
      <main className="relative z-20 flex-1 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-16 pb-8 sm:pb-12 md:pb-14 flex flex-col lg:flex-row items-end justify-between gap-8 lg:gap-12 overflow-y-auto w-full min-h-[calc(100vh-80px)] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-stone-800 [&::-webkit-scrollbar-thumb]:rounded-full">
        
        {/* LEFT COLUMN: TITLE & NARRATIVE BRIEFING (ANCHORED TOWARDS BOTTOM-LEFT) */}
        <div
          className={`flex-1 max-w-2xl flex flex-col justify-end transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-100 ${
            isExpanded ? "opacity-100 translate-x-0 translate-y-0 blur-0" : "opacity-0 -translate-x-12 translate-y-4 blur-sm"
          }`}
        >
          {/* Status Tag */}
          <div className="flex items-center gap-3 text-[11px] font-mono tracking-[0.35em] text-stone-400 uppercase font-semibold">
            <span>MULTIVERSE CONTINUITY</span>
            <span>•</span>
            <span style={{ color: earth.color || "#ffffff" }}>
              {earth.status.replace("_", " ").toUpperCase()}
            </span>
          </div>

          {/* Large Cinematic Title */}
          <h2
            className={`font-mono font-light text-3xl sm:text-5xl md:text-6xl text-white uppercase leading-tight mt-3 drop-shadow-[0_0_35px_rgba(255,255,255,0.25)] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-150 ${
              isExpanded
                ? "tracking-[0.15em] sm:tracking-[0.2em] opacity-100 scale-100"
                : "tracking-[0.35em] opacity-0 scale-95"
            }`}
          >
            {earth.name}
          </h2>

          <div className="mt-1 text-sm font-mono tracking-widest text-stone-400 uppercase">
            DESIGNATION: <span className="text-white font-bold">{earth.designation}</span>
          </div>

          {/* Description */}
          <div className="mt-6 text-sm sm:text-base text-stone-300 font-sans font-light leading-relaxed">
            <p>{earth.description}</p>
          </div>

          {/* Notable Inhabitants & Heroes */}
          <div className="mt-6">
            <span className="text-[10px] font-mono tracking-[0.3em] text-stone-400 uppercase block mb-2.5 font-bold">
              NOTABLE INHABITANTS & ENTANGLED HEROES
            </span>
            <div className="flex flex-wrap gap-2">
              {earth.notableCharacters.map((hero) => (
                <span
                  key={hero}
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/20 text-stone-200 shadow-sm hover:border-white/50 transition-colors"
                >
                  <Sparkles size={11} className="text-stone-400" />
                  <span>{hero}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: REALITY PIN & FEATURED PRODUCTIONS */}
        <div
          className={`w-full lg:w-96 flex flex-col items-center lg:items-end shrink-0 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-200 ${
            isExpanded ? "opacity-100 translate-x-0 blur-0" : "opacity-0 translate-x-12 blur-sm"
          }`}
        >
          {/* Vertical Reality Pin */}
          <div className="flex flex-col items-center mb-6">
            <span className="text-[11px] font-mono tracking-[0.35em] uppercase text-stone-400 font-bold mb-1">
              {earth.designation}
            </span>
            <span className="text-base text-white animate-spin [animation-duration:16s]">✹</span>
            <div className="w-[1.5px] h-8 bg-gradient-to-b from-white/80 to-white/20" />
            <span className="text-xs font-mono font-bold text-white tracking-widest bg-black/60 px-2.5 py-0.5 rounded border border-white/20 mt-1 shadow-md uppercase">
              {earth.status.replace("_", " ")}
            </span>
          </div>

          {/* Featured MCU Productions List */}
          <div className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Film size={13} className="text-white" />
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white font-bold">
                  FEATURED IN MCU
                </span>
              </div>
              <span className="text-[9px] font-mono text-stone-400">
                {earth.featuredMovies.length} ENTRIES
              </span>
            </div>

            <div className="flex flex-col gap-2.5 max-h-56 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-stone-700">
              {earth.featuredMovies.map((movie) => (
                <div
                  key={movie}
                  className="p-3 rounded-xl border border-white/10 bg-white/[0.02] text-left"
                >
                  <span className="text-xs font-sans font-semibold text-stone-200 block">
                    {movie}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Multiversal Coordinates */}
          <div className="mt-4 text-[9px] font-mono text-stone-500 tracking-[0.25em] uppercase">
            MULTIVERSE CONTINUITY DOMAIN: {earth.id.toUpperCase()}
          </div>
        </div>
      </main>
    </div>
  );
}
