"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Sparkles, Film } from "lucide-react";
import type { MCUEarth } from "@/data/movies";

const EARTH_BACKDROPS: Record<string, string> = {
  "earth-616": "/images/multiverse/earth-616.jpg",
  "earth-838": "/images/multiverse/earth-838.jpg",
  "earth-10005": "/images/multiverse/earth-10005.jpg",
  "earth-96283": "/images/multiverse/earth-96283.jpg",
  "earth-120703": "/images/multiverse/earth-120703.jpg",
  "earth-688": "/images/multiverse/earth-sinister.jpg",
  "battleworld": "/images/multiverse/battleworld.jpg",
  "the-void": "/images/multiverse/the-void.jpg",
  "yggdrasil": "/images/multiverse/yggdrasil.jpg",
  "quantum-realm": "/images/multiverse/quantum-realm.jpg",
  "citadel-end-of-time": "/images/multiverse/citadel-end-of-time.jpg",
  "earth-sinister": "/images/multiverse/earth-sinister.jpg",
  "earth-82111": "/images/multiverse/earth-82111.jpg",
  "earth-2149": "/images/multiverse/earth-2149.jpg",
  "gap-junction": "/images/multiverse/gap-junction.jpg",
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
    "/images/multiverse/earth-838.jpg";

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
      {/* 1. FULLSCREEN CINEMATIC HD REALITY BACKDROP */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={backdropSrc}
          alt={earth.name}
          className={`w-full h-full object-cover object-center filter brightness-[0.80] contrast-[1.06] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isExpanded ? "scale-100 blur-0 opacity-100" : "scale-110 blur-sm opacity-0"
          }`}
        />

        {/* Cinematic Crisp Vignette & Atmospheric Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020204]/85 via-[#020204]/30 to-[#020204]/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(2,2,4,0.85)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,2,4,0.70)_0%,transparent_25%,transparent_65%,rgba(2,2,4,0.92)_100%)]" />
      </div>

      {/* 2. MINIMALIST TOP HEADER */}
      <header
        className={`relative z-20 w-full px-4 sm:px-12 py-4 sm:py-6 flex items-center justify-between pointer-events-auto transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isExpanded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
        }`}
      >
        {/* Left: Clean Borderless Return Button */}
        <button
          onClick={handleClose}
          className="group inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-transparent hover:bg-white/10 text-stone-400 hover:text-white text-[9.5px] sm:text-[10px] font-mono tracking-widest uppercase transition-all cursor-pointer"
        >
          <ArrowLeft size={13} className="text-stone-400 group-hover:-translate-x-1 transition-transform" />
          <span>RETURN</span>
        </button>

        {/* Center: Brand Title */}
        <div className="text-center pointer-events-none">
          <h1 className="font-mono uppercase text-stone-200 font-light text-xs sm:text-sm tracking-[0.5em] sm:tracking-[0.7em] drop-shadow-[0_0_18px_rgba(255,255,255,0.4)]">
            M A R V E L
          </h1>
        </div>

        {/* Right side: Empty for clean balanced look */}
        <div className="w-16 sm:w-20" />
      </header>

      {/* 3. MAIN MULTIVERSE DOSSIER STAGE */}
      <main className="relative z-20 flex-1 px-4 sm:px-12 md:px-20 py-4 sm:py-6 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 overflow-y-auto max-w-7xl mx-auto w-full [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-stone-800 [&::-webkit-scrollbar-thumb]:rounded-full">
        
        {/* LEFT COLUMN: TITLE & NARRATIVE BRIEFING */}
        <div
          className={`flex-1 max-w-2xl flex flex-col justify-center transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-100 text-center lg:text-left ${
            isExpanded ? "opacity-100 translate-x-0 translate-y-0 blur-0" : "opacity-0 -translate-x-12 translate-y-4 blur-sm"
          }`}
        >
          {/* Status Tag */}
          <div className="flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] sm:tracking-[0.35em] text-stone-400 uppercase font-semibold">
            <span>MULTIVERSE CONTINUITY</span>
            <span>•</span>
            <span style={{ color: earth.color || "#ffffff" }}>
              {earth.status.replace("_", " ").toUpperCase()}
            </span>
          </div>

          {/* Large Cinematic Title */}
          <h2
            className={`font-mono font-light text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-white uppercase leading-tight mt-3 drop-shadow-[0_0_35px_rgba(255,255,255,0.25)] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-150 ${
              isExpanded
                ? "tracking-[0.1em] xs:tracking-[0.15em] sm:tracking-[0.2em] opacity-100 scale-100"
                : "tracking-[0.3em] opacity-0 scale-95"
            }`}
          >
            {earth.name}
          </h2>

          <div className="mt-1 text-xs sm:text-sm font-mono tracking-widest text-stone-400 uppercase">
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
