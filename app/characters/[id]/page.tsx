"use client";

import React, { useState, useMemo, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  ChevronDown
} from "lucide-react";
import { CHARACTERS, getCharacter } from "@/data/characters";
import { MCU } from "@/data/mcu";
import { getCharacterAvatar, getCharacterBackdrop } from "@/data/characterBackdrops";
import SlideNavMenu from "@/components/dark/SlideNavMenu";

export default function CharacterDetailPage({ params }: { params: { id: string } }) {
  const character = getCharacter(params.id);
  if (!character) notFound();

  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const movieEntries = useMemo(() => {
    return MCU.filter(
      (m) =>
        character.entries.includes(m.id) ||
        m.characters.includes(character.id)
    );
  }, [character]);

  // Find previous and next characters in archive
  const currentIndex = CHARACTERS.findIndex((c) => c.id === character.id);
  const prevCharacter = currentIndex > 0 ? CHARACTERS[currentIndex - 1] : CHARACTERS[CHARACTERS.length - 1];
  const nextCharacter = currentIndex < CHARACTERS.length - 1 ? CHARACTERS[currentIndex + 1] : CHARACTERS[0];

  const characterFacePortrait = getCharacterAvatar(character.id);

  return (
    <div className="relative min-h-screen w-full bg-[#000000] text-stone-200 font-sans selection:bg-white selection:text-black overflow-x-hidden">
      
      {/* 1. TOP FIXED HEADER (MATCHING /TIMELINE NAVBAR BLUR BEHAVIOR) */}
      <header className={`fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 md:px-16 flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "py-3 backdrop-blur-md border-b border-white/5 bg-black/20"
          : "py-5 backdrop-blur-none border-b border-transparent bg-transparent"
      }`}>
        {/* Left: Drawer Toggle */}
        <button
          onClick={() => setNavMenuOpen(true)}
          className="text-stone-300 hover:text-white transition-colors cursor-pointer p-1 group"
          title="Open Universe Menu"
          aria-label="Open Universe Menu"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className="h-[1.5px] w-5 bg-current block group-hover:w-6 transition-all" />
            <span className="h-[1.5px] w-3.5 bg-current block group-hover:w-5 transition-all" />
          </div>
        </button>

        {/* Center: Spaced MARVEL Logo */}
        <div className="text-xs sm:text-sm font-mono font-medium tracking-[0.55em] uppercase text-white pl-[0.55em]">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            MARVEL
          </Link>
        </div>

        {/* Right: Return to Characters Index */}
        <Link
          href="/characters"
          className="text-stone-300 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          title="Return to Characters Archive (Esc)"
        >
          <X size={18} strokeWidth={1.5} />
        </Link>
      </header>

      {/* 2. CINEMATIC HERO SECTION (FEATHERED SEAMLESS BLEND INTO BLACK) */}
      <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-end pt-28 pb-16 px-6 sm:px-12 md:px-16 overflow-hidden bg-[#000000]">
        
        {/* Right-Side Character Face with Feathered Radial Mask (Zero Hard Edges) */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-full sm:w-[80%] md:w-[70%] lg:w-[62%] z-0 overflow-hidden flex items-center justify-end pointer-events-none [mask-image:radial-gradient(ellipse_75%_80%_at_65%_45%,black_15%,transparent_80%)] [-webkit-mask-image:radial-gradient(ellipse_75%_80%_at_65%_45%,black_15%,transparent_80%)]"
        >
          <img
            src={characterFacePortrait}
            alt={character.name}
            className="w-full h-full object-contain md:object-cover object-right md:object-[center_20%] filter brightness-95 contrast-105"
          />
        </div>

        {/* Left Side: Pure Black Grounding for Text Legibility */}
        <div className="relative z-20 max-w-2xl lg:max-w-3xl flex flex-col gap-5">
          
          {/* Subtitle Badges (Clean Monospace Text, No Boxes) */}
          <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase text-stone-400">
            <span>{character.universe.split("/")[0].trim()}</span>
            <span className="text-stone-600">·</span>
            <span>{character.faction.split(",")[0].trim()}</span>
            <span className="text-stone-600">·</span>
            <span>{character.aliases[0] || character.role.split(",")[0] || "OPERATIVE"}</span>
          </div>

          {/* Character Main Headline Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-mono font-bold tracking-[0.12em] uppercase text-white leading-tight drop-shadow-2xl">
            {character.name}
          </h1>

          {/* Overview Narrative */}
          <p className="text-xs sm:text-sm md:text-base font-mono tracking-wide text-stone-300 leading-relaxed max-w-xl">
            {character.overview}
          </p>

          {/* Specification Metrics (Clean Minimal Text, No Box Backgrounds) */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs font-mono text-stone-400">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-stone-500 mr-1.5">ROLE:</span>
              <span className="text-stone-200">{character.role}</span>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-widest text-stone-500 mr-1.5">FIRST SEEN:</span>
              <span className="text-stone-200">{character.firstAppearance}</span>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-widest text-stone-500 mr-1.5">APPEARANCES:</span>
              <span className="text-stone-200">{movieEntries.length} MCU TITLES</span>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="pt-6 flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] uppercase text-stone-500 animate-pulse">
            <span>SCROLL FOR MCU TIMELINE CHRONOLOGY</span>
            <ChevronDown size={14} />
          </div>

        </div>

      </section>

      {/* 3. CONTINUOUS TIMELINE CHRONOLOGY & ERAS (LEFT-ALIGNED, NO DIVIDER LINES) */}
      <section className="relative z-10 w-full max-w-6xl px-6 sm:px-12 md:px-16 py-16 flex flex-col gap-12">
        
        {/* Section Heading */}
        <div className="flex items-center justify-between pb-2 max-w-4xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-stone-400" />
            <h2 className="text-lg sm:text-xl font-mono font-bold tracking-[0.18em] uppercase text-white">
              MCU CHRONOLOGICAL TIMELINE
            </h2>
          </div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-stone-500">
            {character.eras.length} RECORDED ERAS
          </span>
        </div>

        {/* Eras Timeline Spine (Aligned from the Left with Clean Minimalist Styling) */}
        <div className="relative border-l border-white/10 ml-2 sm:ml-4 pl-6 sm:pl-10 flex flex-col gap-16 max-w-4xl">
          {character.eras.map((era, idx) => {
            const eraBackdrop = getCharacterBackdrop(character.id, era.eraId, era.phase);

            return (
              <div key={era.eraId || idx} className="relative flex flex-col gap-4 group">
                
                {/* Timeline Node */}
                <span className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-black border-2 border-stone-500 group-hover:border-white transition-colors" />

                {/* Phase & Year Header (Clean Minimal Monospace Text, No Neon Background) */}
                <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] uppercase">
                  <span className="text-stone-300 font-bold">
                    PHASE {era.phase}
                  </span>
                  <span className="text-stone-600">·</span>
                  <span className="text-stone-400">{era.year}</span>
                </div>

                {/* Era Title */}
                <h3 className="text-2xl sm:text-3xl font-mono font-bold tracking-wider text-white uppercase leading-snug">
                  {era.title}
                </h3>

                {/* Distinct In-Movie Era Visual */}
                <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden bg-stone-950 border border-white/10 shadow-2xl my-2">
                  <img
                    src={eraBackdrop}
                    alt={era.title}
                    className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>

                {/* Narrative Description */}
                <p className="text-xs sm:text-sm font-mono tracking-wide text-stone-300 leading-relaxed max-w-3xl">
                  {era.description}
                </p>

                {/* Catalyst Moments (Clean Unboxed List) */}
                {era.keyMoments && era.keyMoments.length > 0 && (
                  <div className="mt-2 space-y-2 max-w-2xl">
                    <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-stone-500 block mb-1">
                      CATALYST MOMENTS:
                    </span>
                    {era.keyMoments.map((moment, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs font-mono text-stone-300">
                        <span className="w-1 h-1 rounded-full mt-2 shrink-0 bg-stone-400" />
                        <span>{moment}</span>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </section>

      {/* 4. MCU FILMOGRAPHY & APPEARANCES (LEFT-ALIGNED, NO DIVIDER LINE) */}
      {movieEntries.length > 0 && (
        <section className="relative z-10 w-full max-w-6xl px-6 sm:px-12 md:px-16 py-12 flex flex-col gap-8">
          
          <div className="flex items-center justify-between max-w-4xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-stone-400" />
              <h2 className="text-lg sm:text-xl font-mono font-bold tracking-[0.18em] uppercase text-white">
                MCU CINEMATIC FILMOGRAPHY
              </h2>
            </div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-stone-500">
              {movieEntries.length} CANON TITLES
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 max-w-5xl">
            {movieEntries.map((m) => (
              <Link
                key={m.id}
                href={`/movie/${m.id}`}
                className="group flex flex-col gap-2 cursor-pointer"
              >
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-stone-950 border border-white/10 shadow-lg group-hover:border-white/40 transition-all">
                  <img
                    src={m.poster || `/images/posters/${m.id}.jpg`}
                    alt={m.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-[8.5px] font-mono font-bold text-white border border-white/10">
                    P{m.phase}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-mono font-bold text-stone-200 group-hover:text-white uppercase truncate">
                    {m.title}
                  </span>
                  <span className="text-[9px] font-mono text-stone-500">
                    {m.year} · {m.type.toUpperCase()}
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </section>
      )}

      {/* 5. PREVIOUS / NEXT CHARACTER JUMP FOOTER (NO DIVIDER LINE) */}
      <footer className="relative z-10 w-full max-w-6xl px-6 sm:px-12 md:px-16 py-16 mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Previous Character */}
        <Link
          href={`/characters/${prevCharacter.id}`}
          className="group flex items-center gap-3 text-stone-400 hover:text-white transition-colors"
        >
          <div className="p-2.5 rounded-full bg-stone-900 border border-stone-800 group-hover:border-white/30 transition-all">
            <ArrowLeft size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-mono uppercase tracking-widest text-stone-500">PREVIOUS OPERATIVE</span>
            <span className="text-xs sm:text-sm font-mono font-bold uppercase">{prevCharacter.name}</span>
          </div>
        </Link>

        {/* Back to Characters Button (Clean Text Link, No Heavy Background) */}
        <Link
          href="/characters"
          className="font-mono text-xs tracking-[0.2em] uppercase text-stone-400 hover:text-white transition-colors cursor-pointer py-2"
        >
          VIEW ALL CHARACTERS
        </Link>

        {/* Next Character */}
        <Link
          href={`/characters/${nextCharacter.id}`}
          className="group flex items-center gap-3 text-stone-400 hover:text-white transition-colors text-right"
        >
          <div className="flex flex-col">
            <span className="text-[9px] font-mono uppercase tracking-widest text-stone-500">NEXT OPERATIVE</span>
            <span className="text-xs sm:text-sm font-mono font-bold uppercase">{nextCharacter.name}</span>
          </div>
          <div className="p-2.5 rounded-full bg-stone-900 border border-stone-800 group-hover:border-white/30 transition-all">
            <ArrowRight size={16} />
          </div>
        </Link>

      </footer>

      {/* Slide Navigation Drawer */}
      <SlideNavMenu isOpen={navMenuOpen} onClose={() => setNavMenuOpen(false)} />

    </div>
  );
}
