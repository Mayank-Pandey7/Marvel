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
          className={`w-full h-full object-cover object-center filter brightness-[0.70] contrast-[1.10] transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isExpanded ? "scale-105 blur-0 opacity-100" : "scale-125 blur-lg opacity-0"
          }`}
        />

        {/* Focused Contrast Scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020204]/96 via-[#020204]/80 to-[#020204]/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(2,2,4,0.85)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,2,4,0.90)_0%,transparent_25%,transparent_75%,rgba(2,2,4,0.95)_100%)]" />
      </div>

      {/* 2. TOP HEADER */}
      <header
        className={`relative z-20 w-full px-6 sm:px-12 py-6 flex items-center justify-between pointer-events-auto transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isExpanded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
        }`}
      >
        {/* Left: Return */}
        <button
          onClick={handleClose}
          className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 border border-white/20 hover:border-white/70 text-stone-200 hover:text-white text-[10px] font-mono tracking-widest uppercase transition-all cursor-pointer backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.8)]"
        >
          <ArrowLeft size={13} className="text-stone-400 group-hover:-translate-x-1 transition-transform" />
          <span>RETURN TO UNIVERSE MAP</span>
        </button>

        {/* Center: Brand */}
        <div className="text-center pointer-events-none">
          <h1 className="font-mono uppercase text-stone-100 font-light text-xs sm:text-sm tracking-[0.7em] drop-shadow-[0_0_18px_rgba(255,255,255,0.6)]">
            M A R V E L
          </h1>
        </div>

        {/* Right: Earth Designation & Triquetra */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1 rounded-full bg-black/60 border border-white/20 text-stone-200 font-mono text-[10px] tracking-widest uppercase backdrop-blur-md shadow-md">
            {earth.designation}
          </div>

          <div
            className="w-8 h-8 rounded-full border border-white/20 bg-black/60 flex items-center justify-center text-stone-300 backdrop-blur-md"
            title="Multiverse Continuity"
          >
            <span className="text-xs font-serif">⎊</span>
          </div>
        </div>
      </header>

      {/* 3. MAIN MULTIVERSE DOSSIER STAGE */}
      <main className="relative z-20 flex-1 px-6 sm:px-16 md:px-20 py-8 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-y-auto max-w-7xl mx-auto w-full [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-stone-800 [&::-webkit-scrollbar-thumb]:rounded-full">
        
        {/* LEFT COLUMN: TITLE & NARRATIVE BRIEFING */}
        <div
          className={`flex-1 max-w-2xl flex flex-col justify-center transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-100 ${
            isExpanded ? "opacity-100 translate-x-0 translate-y-0 blur-0" : "opacity-0 -translate-x-12 translate-y-4 blur-sm"
          }`}
        >
          {/* Status Tag */}
          <div className="flex items-center gap-3 text-[11px] font-mono tracking-[0.35em] text-stone-300 uppercase font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            <span className="text-white">MULTIVERSE CONTINUITY</span>
            <span className="text-stone-500">•</span>
            <span style={{ color: earth.color || "#ffffff" }} className="drop-shadow-[0_0_8px_currentColor]">
              {earth.status.replace("_", " ").toUpperCase()}
            </span>
          </div>

          {/* Large Cinematic Title */}
          <h2
            className={`font-mono font-light text-2xl sm:text-4xl md:text-5xl text-white uppercase leading-tight mt-3 drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-150 ${
              isExpanded
                ? "tracking-[0.15em] sm:tracking-[0.2em] opacity-100 scale-100"
                : "tracking-[0.35em] opacity-0 scale-95"
            }`}
          >
            {earth.name}
          </h2>

          <div className="mt-1 text-sm font-mono tracking-widest text-stone-300 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            DESIGNATION: <span className="text-white font-bold">{earth.designation}</span>
          </div>

          {/* Description */}
          <div className="mt-6 text-sm sm:text-base text-stone-100 font-sans font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            <p className="bg-black/40 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
              {earth.description}
            </p>
          </div>

          {/* Notable Inhabitants & Heroes */}
          <div className="mt-6">
            <span className="text-[10px] font-mono tracking-[0.3em] text-stone-300 uppercase block mb-2.5 font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              NOTABLE INHABITANTS & ENTANGLED HEROES
            </span>
            <div className="flex flex-wrap gap-2">
              {earth.notableCharacters.map((hero) => (
                <span
                  key={hero}
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono px-3.5 py-1.5 rounded-full bg-black/60 border border-white/25 text-stone-100 shadow-md hover:border-white/60 transition-colors backdrop-blur-md"
                >
                  <Sparkles size={11} className="text-stone-300" />
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
            <span className="text-[11px] font-mono tracking-[0.35em] uppercase text-stone-200 font-bold mb-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
              {earth.designation}
            </span>
            <span className="text-base text-white animate-spin [animation-duration:16s] drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">✹</span>
            <div className="w-[1.5px] h-8 bg-gradient-to-b from-white to-white/30" />
            <span className="text-xs font-mono font-bold text-white tracking-widest bg-black/80 px-3 py-1 rounded-full border border-white/30 mt-1 shadow-xl uppercase">
              {earth.status.replace("_", " ")}
            </span>
          </div>

          {/* Featured MCU Productions List */}
          <div className="w-full bg-black/75 border border-white/20 rounded-2xl p-4 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/15">
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
                  className="p-3 rounded-xl border border-white/15 bg-black/50 text-left shadow-sm"
                >
                  <span className="text-xs font-sans font-bold text-white block">
                    {movie}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Multiversal Coordinates */}
          <div className="mt-4 text-[9px] font-mono text-stone-400 tracking-[0.25em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            MULTIVERSE CONTINUITY DOMAIN: {earth.id.toUpperCase()}
          </div>
        </div>
      </main>
    </div>
  );
}
