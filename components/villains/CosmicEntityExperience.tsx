"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  X,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Menu
} from "lucide-react";
import { TopTierVillain, TOP_TIER_VILLAINS } from "@/data/topTierVillains";
import { getCharacterAvatar } from "@/data/characterBackdrops";
import SlideNavMenu from "@/components/dark/SlideNavMenu";

interface CosmicEntityExperienceProps {
  entity: TopTierVillain;
}

export function CosmicEntityExperience({ entity }: CosmicEntityExperienceProps) {
  const router = useRouter();
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleBack = () => {
    if (typeof window !== "undefined") {
      const savedRoute = sessionStorage.getItem("mcu_last_character_route");
      const currentPath = window.location.pathname + window.location.search;
      if (savedRoute && savedRoute !== currentPath && !savedRoute.startsWith(`/characters/${entity.characterId}`)) {
        router.push(savedRoute);
        return;
      }
      if (window.history.length > 1) {
        router.back();
        return;
      }
    }
    router.push("/characters/villains?tab=top-tier");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleBack();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentIndex = TOP_TIER_VILLAINS.findIndex((v) => v.characterId === entity.characterId);
  const prevEntity = currentIndex > 0 ? TOP_TIER_VILLAINS[currentIndex - 1] : TOP_TIER_VILLAINS[TOP_TIER_VILLAINS.length - 1];
  const nextEntity = currentIndex < TOP_TIER_VILLAINS.length - 1 ? TOP_TIER_VILLAINS[currentIndex + 1] : TOP_TIER_VILLAINS[0];

  const characterFacePortrait = getCharacterAvatar(entity.characterId) || entity.image;

  return (
    <div className="relative min-h-screen w-full bg-[#000000] text-stone-200 font-sans selection:bg-white selection:text-black overflow-x-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

      <div 
        className="fixed top-0 right-0 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] rounded-full pointer-events-none z-0 opacity-15 blur-[120px]"
        style={{
          background: `radial-gradient(circle, ${entity.tierColor} 0%, transparent 70%)`
        }}
        aria-hidden="true"
      />

      <div className="navbar-blur-fade" aria-hidden="true" />

      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 sm:py-6 min-h-[58px] sm:min-h-[72px] flex items-center justify-between pointer-events-none bg-transparent">
        <button
          onClick={() => setNavMenuOpen(true)}
          className="text-stone-300 hover:text-white transition-colors cursor-pointer p-1.5 pointer-events-auto select-none outline-none focus:outline-none"
          title="Open Universe Menu"
          aria-label="Open Universe Menu"
        >
          <Menu size={18} strokeWidth={1.5} />
        </button>

        <div className="text-xs sm:text-sm md:text-base font-mono font-bold tracking-[0.45em] sm:tracking-[0.55em] uppercase text-white pl-[0.45em] sm:pl-[0.55em] pointer-events-auto select-none">
          <Link href="/" className="hover:opacity-80 transition-opacity select-none">
            MARVEL
          </Link>
        </div>

        <button
          onClick={handleBack}
          className="text-stone-300 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer pointer-events-auto flex items-center gap-1.5 text-xs font-mono select-none outline-none focus:outline-none"
          title="Return to Hierarchy / Archives (Esc)"
        >
          <span className="hidden sm:inline text-[10px] tracking-wider text-stone-400 select-none">RETURN</span>
          <X size={18} strokeWidth={1.5} />
        </button>
      </header>

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[90vh] sm:min-h-[95vh] flex flex-col justify-end pt-28 sm:pt-36 pb-10 sm:pb-16 px-4 sm:px-12 md:px-16 overflow-hidden">
        
        {/* Standalone Poster Frame on Right (Fixed in viewport, does not scroll upward with slide) */}
        <div
          className="fixed top-24 sm:top-28 right-6 sm:right-16 md:right-24 lg:right-32 xl:right-40 w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px] aspect-[2/3] z-30 overflow-hidden rounded-2xl border border-white/15 bg-stone-950 shadow-[0_25px_70px_rgba(0,0,0,0.95)] pointer-events-none hidden sm:block transition-all duration-300"
        >
          <img
            src={characterFacePortrait}
            alt={entity.name}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Mobile Background Fallback */}
        <div className="sm:hidden absolute top-0 right-0 w-full h-[50vh] z-0 overflow-hidden pointer-events-none">
          <img
            src={characterFacePortrait}
            alt={entity.name}
            className="w-full h-full object-contain object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        {/* Hero Bio Container (Fixed at bottom-left exactly as requested) */}
        <div className="relative z-20 max-w-xl lg:max-w-2xl flex flex-col gap-3.5 sm:gap-5 mt-auto pt-6 sm:pt-12">
          
          {/* Cosmic Hierarchy Badges */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[9px] sm:text-[11px] font-mono tracking-wider uppercase text-stone-400">
            <span 
              className="font-bold tracking-widest"
              style={{ color: entity.tierColor }}
            >
              RANK #{entity.rank}
            </span>
            <span className="text-stone-600">/</span>
            <span className="text-stone-300 font-semibold">
              {entity.tier}
            </span>
            <span className="text-stone-600">/</span>
            <span>
              {entity.domain}
            </span>
            <span className="text-stone-600">/</span>
            <span className="text-amber-400 font-semibold">{entity.threatLevel}</span>
          </div>

          {/* Character Name & Sub-Alias */}
          <div className="space-y-1">
            <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-mono font-bold tracking-[0.08em] xs:tracking-[0.12em] uppercase text-white leading-tight drop-shadow-2xl">
              {entity.name}
            </h1>
            {entity.alias && entity.alias !== entity.name && (
              <p className="text-xs sm:text-sm font-mono tracking-widest text-stone-400 uppercase">
                {entity.alias}
              </p>
            )}
          </div>

          {/* In-depth Character Overview */}
          <p className="text-xs sm:text-sm md:text-base font-mono tracking-wide text-stone-300 leading-relaxed max-w-xl">
            {entity.description}
          </p>

          {/* Summary Metric Stats */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-1 sm:pt-2 text-[11px] sm:text-xs font-mono text-stone-400">
            <div>
              <span className="text-[8.5px] sm:text-[9px] uppercase tracking-widest text-stone-500 mr-1.5">CLASSIFICATION:</span>
              <span className="text-stone-200 font-semibold">{entity.potentialPower.classification}</span>
            </div>
            <div>
              <span className="text-[8.5px] sm:text-[9px] uppercase tracking-widest text-stone-500 mr-1.5">ENERGY SOURCE:</span>
              <span className="text-stone-200">{entity.potentialPower.energySource}</span>
            </div>
          </div>

          {/* Smooth Scroll Cue */}
          <div className="pt-4 sm:pt-6 flex items-center gap-2 text-[9.5px] sm:text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase text-stone-500 animate-pulse">
            <span>EXPLORE POTENTIAL POWER & COSMIC LORE</span>
            <ChevronDown size={14} />
          </div>

        </div>

      </section>

      {/* SECTION 1: POTENTIAL POWER & POWER SCALE (Clean open layout, no enclosing box) */}
      <section className="relative z-10 w-full max-w-6xl px-4 sm:px-12 md:px-16 py-10 sm:py-14 flex flex-col gap-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 max-w-4xl border-b border-white/10">
          <h2 className="text-base sm:text-xl font-mono font-bold tracking-[0.16em] uppercase text-white">
            POTENTIAL POWER & COSMIC SCALE
          </h2>
          <span className="text-[9.5px] sm:text-[10px] font-mono tracking-widest uppercase text-stone-500">
            {entity.potentialPower.scale}
          </span>
        </div>

        {/* Open Text Narrative (No card box) */}
        <div className="max-w-4xl flex flex-col gap-3">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-stone-500 font-bold">
            EXECUTIVE POWER ANALYSIS:
          </span>
          <p className="text-sm sm:text-base font-mono text-stone-200 leading-relaxed max-w-3xl">
            {entity.potentialPower.summary}
          </p>
        </div>

      </section>

      {/* SECTION 2: WHAT THEY HAVE DONE (Clean open chronicle, no icons in header) */}
      <section className="relative z-10 w-full max-w-6xl px-4 sm:px-12 md:px-16 py-10 sm:py-14 flex flex-col gap-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 max-w-4xl border-b border-white/10">
          <h2 className="text-base sm:text-xl font-mono font-bold tracking-[0.16em] uppercase text-white">
            LORE RECORD: WHAT THEY HAVE DONE
          </h2>
          <span className="text-[9.5px] sm:text-[10px] font-mono tracking-widest uppercase text-stone-500">
            {entity.whatTheyHaveDone.length} MONUMENTAL FEATS
          </span>
        </div>

        {/* Feats List */}
        <div className="relative border-l border-white/10 ml-2 sm:ml-4 pl-6 sm:pl-10 flex flex-col gap-10 max-w-4xl">
          {entity.whatTheyHaveDone.map((feat, idx) => (
            <div key={idx} className="relative flex flex-col gap-2.5 group">
              {/* Timeline Indicator Dot */}
              <span 
                className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-black border-2 transition-colors"
                style={{ borderColor: entity.tierColor }}
              />

              {/* Event Subtitle */}
              <div className="flex items-center gap-2 text-[10.5px] sm:text-[11px] font-mono tracking-[0.2em] uppercase">
                <span className="text-stone-400 font-bold">
                  {feat.eraOrEvent}
                </span>
              </div>

              {/* Feat Title */}
              <h3 className="text-xl sm:text-2xl font-mono font-bold tracking-wide text-white uppercase leading-snug group-hover:text-amber-200 transition-colors">
                {feat.title}
              </h3>

              {/* Feat Narrative */}
              <p className="text-xs sm:text-sm font-mono tracking-wide text-stone-300 leading-relaxed max-w-3xl">
                {feat.description}
              </p>

              {/* Iconic Quote */}
              {feat.quote && (
                <div className="border-l-2 border-stone-600 pl-3.5 py-1 text-xs font-mono italic text-stone-400 my-1">
                  &ldquo;{feat.quote}&rdquo;
                </div>
              )}

              {/* Multiversal Impact Box */}
              <div className="flex items-start gap-2 pt-1 text-xs font-mono text-stone-400">
                <span className="text-[9px] uppercase tracking-widest text-amber-500/90 font-bold shrink-0 mt-0.5">
                  [IMPACT]
                </span>
                <span className="text-stone-300">{feat.impact}</span>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* SECTION 3: WHAT THEY CAN POTENTIALLY DO (Clean open columns without boxes or icons) */}
      <section className="relative z-10 w-full max-w-6xl px-4 sm:px-12 md:px-16 py-10 sm:py-14 flex flex-col gap-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 max-w-4xl border-b border-white/10">
          <h2 className="text-base sm:text-xl font-mono font-bold tracking-[0.16em] uppercase text-white">
            POTENTIAL CAPABILITIES: WHAT THEY CAN DO
          </h2>
          <span className="text-[9.5px] sm:text-[10px] font-mono tracking-widest uppercase text-stone-500">
            THEORETICAL CEILING & THREAT HORIZON
          </span>
        </div>

        {/* Clean Open Grid (No card boxes, no enclosing background borders) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 max-w-4xl">
          {entity.whatTheyCanDo.map((cap, idx) => (
            <div 
              key={idx}
              className="flex flex-col gap-2.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span 
                  className="text-[9.5px] font-mono uppercase font-bold tracking-widest"
                  style={{ color: entity.tierColor }}
                >
                  {cap.scale}
                </span>
                <span className="text-[9.5px] font-mono text-stone-600 font-bold">0{idx + 1}</span>
              </div>

              <h4 className="text-base sm:text-lg font-mono font-bold text-white uppercase leading-snug">
                {cap.title}
              </h4>

              <p className="text-xs sm:text-sm font-mono text-stone-300 leading-relaxed pt-1">
                {cap.description}
              </p>
            </div>
          ))}
        </div>

      </section>

      {/* FOOTER NAVIGATION (Aligned perfectly with above content) */}
      <footer className="relative z-10 w-full max-w-6xl px-4 sm:px-12 md:px-16 pb-16 pt-8">
        
        {/* Divider line and navigation matching max-w-4xl width */}
        <div className="w-full max-w-4xl border-t border-white/10 pt-8 flex items-center justify-between gap-4">
          <Link
            href={`/characters/${prevEntity.characterId}`}
            className="group flex items-center gap-2 sm:gap-3 text-stone-400 hover:text-white transition-colors max-w-[48%]"
          >
            <div className="p-2 sm:p-2.5 rounded-full bg-white/[0.03] border border-white/5 group-hover:border-white/20 transition-all shrink-0">
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-stone-500 truncate">PREVIOUS ENTITY</span>
              <span className="text-[11px] sm:text-sm font-mono font-bold uppercase text-stone-200 group-hover:text-white truncate">
                #{prevEntity.rank} {prevEntity.name}
              </span>
            </div>
          </Link>

          <Link
            href={`/characters/${nextEntity.characterId}`}
            className="group flex items-center justify-end gap-2 sm:gap-3 text-stone-400 hover:text-white transition-colors text-right max-w-[48%]"
          >
            <div className="flex flex-col min-w-0">
              <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-stone-500 truncate">NEXT ENTITY</span>
              <span className="text-[11px] sm:text-sm font-mono font-bold uppercase text-stone-200 group-hover:text-white truncate">
                #{nextEntity.rank} {nextEntity.name}
              </span>
            </div>
            <div className="p-2 sm:p-2.5 rounded-full bg-white/[0.03] border border-white/5 group-hover:border-white/20 transition-all shrink-0">
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>

        <button
          onClick={handleBack}
          className="font-mono text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-stone-500 hover:text-white transition-colors cursor-pointer py-1"
        >
          RETURN TO ARCHIVE
        </button>
      </footer>

      <SlideNavMenu isOpen={navMenuOpen} onClose={() => setNavMenuOpen(false)} />

    </div>
  );
}
