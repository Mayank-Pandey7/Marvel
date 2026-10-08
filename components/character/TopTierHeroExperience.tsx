"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  X,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Menu,
  Sparkles,
  Shield,
  Zap,
  Flame,
  Star
} from "lucide-react";
import { TopTierHero, TOP_TIER_HEROES } from "@/data/topTierHeroes";
import { getCharacterAvatar } from "@/data/characterBackdrops";
import SlideNavMenu from "@/components/dark/SlideNavMenu";
import BackgroundStarfield from "@/components/ui/BackgroundStarfield";

interface TopTierHeroExperienceProps {
  hero: TopTierHero;
}

export function TopTierHeroExperience({ hero }: TopTierHeroExperienceProps) {
  const router = useRouter();
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleBack = () => {
    if (typeof window !== "undefined") {
      const savedRoute = sessionStorage.getItem("mcu_last_character_route");
      const currentPath = window.location.pathname + window.location.search;
      if (savedRoute && savedRoute !== currentPath && !savedRoute.startsWith(`/characters/${hero.characterId}`)) {
        router.push(savedRoute);
        return;
      }
      if (window.history.length > 1) {
        router.back();
        return;
      }
    }
    router.push("/characters/heros?tab=top-tier");
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

  const currentIndex = TOP_TIER_HEROES.findIndex((h) => h.characterId === hero.characterId || h.name === hero.name);
  const prevHero = currentIndex > 0 ? TOP_TIER_HEROES[currentIndex - 1] : TOP_TIER_HEROES[TOP_TIER_HEROES.length - 1];
  const nextHero = currentIndex < TOP_TIER_HEROES.length - 1 ? TOP_TIER_HEROES[currentIndex + 1] : TOP_TIER_HEROES[0];

  const characterFacePortrait = hero.image || getCharacterAvatar(hero.characterId);

  return (
    <div className="relative min-h-screen w-full bg-[#000000] text-stone-200 font-sans selection:bg-white selection:text-black overflow-x-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {/* Background Alien X Starfield */}
      <BackgroundStarfield />

      {/* Radiant Cosmic Aura Halo */}
      <div 
        className="fixed top-0 right-0 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] rounded-full pointer-events-none z-0 opacity-15 blur-[120px]"
        style={{
          background: `radial-gradient(circle, ${hero.tierColor} 0%, transparent 70%)`
        }}
        aria-hidden="true"
      />

      <div className="navbar-blur-fade" aria-hidden="true" />

      {/* Header Navigation */}
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
        
        {/* Standalone Poster Frame on Right (Fixed in viewport) */}
        <div
          className="fixed top-24 sm:top-28 right-6 sm:right-16 md:right-24 lg:right-32 xl:right-40 w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px] aspect-[2/3] z-30 overflow-hidden rounded-2xl border border-white/15 bg-stone-950 shadow-[0_25px_70px_rgba(0,0,0,0.95)] pointer-events-none hidden sm:block transition-all duration-300"
        >
          <img
            src={characterFacePortrait}
            alt={hero.name}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Mobile Background Fallback */}
        <div className="sm:hidden absolute top-0 right-0 w-full h-[50vh] z-0 overflow-hidden pointer-events-none">
          <img
            src={characterFacePortrait}
            alt={hero.name}
            className="w-full h-full object-contain object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        {/* Hero Bio Container (Fixed at bottom-left) */}
        <div className="relative z-20 max-w-2xl lg:max-w-3xl xl:max-w-4xl flex flex-col gap-3.5 sm:gap-5 mt-auto pt-6 sm:pt-12">
          
          {/* Cosmic Hierarchy Badges */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[9px] sm:text-[11px] font-mono tracking-wider uppercase text-stone-400">
            <span 
              className="font-bold tracking-widest"
              style={{ color: hero.tierColor }}
            >
              RANK #{hero.rank}
            </span>
          </div>

          {/* Character Name & Sub-Alias */}
          <div className="space-y-1">
            <h1 className={`font-mono font-bold uppercase text-white leading-tight drop-shadow-2xl whitespace-nowrap ${
              hero.name.length > 20
                ? "text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.02em] sm:tracking-[0.04em]"
                : hero.name.length > 14
                ? "text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.04em] sm:tracking-[0.06em]"
                : "text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.06em] sm:tracking-[0.1em]"
            }`}>
              {hero.name}
            </h1>
            {hero.alias && hero.alias !== hero.name && (
              <p className="text-xs sm:text-sm font-mono tracking-widest text-stone-400 uppercase">
                {hero.alias}
              </p>
            )}
          </div>

          {/* In-depth Character Overview */}
          <p className="text-xs sm:text-sm md:text-base font-mono tracking-wide text-stone-300 leading-relaxed max-w-xl">
            {hero.description}
          </p>

          {/* Summary Metric Stats */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-1 sm:pt-2 text-[11px] sm:text-xs font-mono text-stone-400">
            <div>
              <span className="text-[8.5px] sm:text-[9px] uppercase tracking-widest text-stone-500 mr-1.5">CLASSIFICATION:</span>
              <span className="text-stone-200 font-semibold">{hero.potentialPower.classification}</span>
            </div>
            <div>
              <span className="text-[8.5px] sm:text-[9px] uppercase tracking-widest text-stone-500 mr-1.5">ENERGY SOURCE:</span>
              <span className="text-stone-200">{hero.potentialPower.energySource}</span>
            </div>
          </div>

          {/* Smooth Scroll Cue */}
          <div className="pt-4 sm:pt-6 flex items-center gap-2 text-[9.5px] sm:text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase text-stone-500 animate-pulse">
            <span>EXPLORE POTENTIAL POWER & COSMIC LORE</span>
            <ChevronDown size={14} />
          </div>

        </div>

      </section>

      {/* SECTION 1: POTENTIAL POWER & POWER SCALE */}
      <section className="relative z-10 w-full max-w-6xl px-4 sm:px-12 md:px-16 py-10 sm:py-14 flex flex-col gap-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 max-w-4xl border-b border-white/10">
          <h2 className="text-base sm:text-xl font-mono font-bold tracking-[0.16em] uppercase text-white">
            POTENTIAL POWER & COSMIC SCALE
          </h2>
          <span className="text-[9.5px] sm:text-[10px] font-mono tracking-widest uppercase text-stone-500">
            {hero.potentialPower.scale}
          </span>
        </div>

        {/* Executive Power Analysis */}
        <div className="max-w-4xl flex flex-col gap-3">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-stone-500 font-bold">
            EXECUTIVE POWER ANALYSIS:
          </span>
          <p className="text-sm sm:text-base font-mono text-stone-200 leading-relaxed max-w-3xl">
            {hero.potentialPower.summary}
          </p>
        </div>

        {/* Attributes Breakdown */}
        {hero.potentialPower.attributes && hero.potentialPower.attributes.length > 0 && (
          <div className="max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 pt-3">
            {hero.potentialPower.attributes.map((attr, i) => (
              <div
                key={i}
                className="flex items-baseline justify-between gap-4 py-2 border-b border-white/10 text-[10.5px] sm:text-xs font-mono tracking-wider uppercase"
              >
                <span className="text-stone-400 font-semibold">{attr.label}</span>
                <span className="text-white font-bold text-right">{attr.value}</span>
              </div>
            ))}
          </div>
        )}

      </section>

      {/* SECTION 2: WHAT THEY HAVE DONE (Feats Record) */}
      <section className="relative z-10 w-full max-w-6xl px-4 sm:px-12 md:px-16 py-10 sm:py-14 flex flex-col gap-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 max-w-4xl border-b border-white/10">
          <h2 className="text-base sm:text-xl font-mono font-bold tracking-[0.16em] uppercase text-white">
            LORE RECORD: WHAT THEY HAVE DONE
          </h2>
          <span className="text-[9.5px] sm:text-[10px] font-mono tracking-widest uppercase text-stone-500">
            {hero.whatTheyHaveDone.length} MONUMENTAL FEATS
          </span>
        </div>

        {/* Feats List */}
        <div className="relative border-l border-white/10 ml-2 sm:ml-4 pl-6 sm:pl-10 flex flex-col gap-10 max-w-4xl">
          {hero.whatTheyHaveDone.map((feat, idx) => (
            <div key={idx} className="relative flex flex-col gap-2.5 group">
              {/* Timeline Indicator Dot */}
              <span 
                className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-black border-2 transition-colors"
                style={{ borderColor: hero.tierColor }}
              />

              {/* Event Subtitle */}
              <div className="flex items-center gap-2 text-[10.5px] sm:text-[11px] font-mono tracking-[0.2em] uppercase">
                <span className="text-stone-400 font-bold">
                  {feat.eraOrEvent}
                </span>
              </div>

              {/* Feat Title */}
              <h3 className="text-sm sm:text-base md:text-lg font-mono font-bold uppercase text-white group-hover:text-stone-200 transition-colors">
                {feat.title}
              </h3>

              {/* Feat Narrative Description */}
              <p className="text-xs sm:text-sm font-mono text-stone-300 leading-relaxed max-w-3xl">
                {feat.description}
              </p>

              {/* Impact / Outcome */}
              <div className="text-[11px] sm:text-xs font-mono text-stone-400 flex items-start gap-1.5 pt-1">
                <span className="text-[9px] uppercase tracking-widest text-stone-500 shrink-0 font-bold">IMPACT:</span>
                <span className="text-stone-300">{feat.impact}</span>
              </div>

              {/* Iconic Quote */}
              {feat.quote && (
                <blockquote className="mt-2 pl-3 border-l-2 border-white/20 italic text-xs font-mono text-stone-400">
                  &ldquo;{feat.quote}&rdquo;
                </blockquote>
              )}
            </div>
          ))}
        </div>

      </section>

      {/* SECTION 3: WHAT THEY CAN DO (Potential Capabilities) */}
      <section className="relative z-10 w-full max-w-6xl px-4 sm:px-12 md:px-16 py-10 sm:py-14 flex flex-col gap-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 max-w-4xl border-b border-white/10">
          <h2 className="text-base sm:text-xl font-mono font-bold tracking-[0.16em] uppercase text-white">
            POTENTIAL CAPABILITIES: WHAT THEY CAN DO
          </h2>
          <span className="text-[9.5px] sm:text-[10px] font-mono tracking-widest uppercase text-stone-500">
            {hero.whatTheyCanDo.length} HIGHER-TIER POWERS
          </span>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          {hero.whatTheyCanDo.map((cap, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col gap-2.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[9.5px] sm:text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  {cap.scale}
                </span>
                <Sparkles size={13} className="text-stone-500" />
              </div>
              <h3 className="text-xs sm:text-sm font-mono font-bold uppercase text-white">
                {cap.title}
              </h3>
              <p className="text-[11.5px] sm:text-xs font-mono text-stone-300 leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>

      </section>

      {/* FOOTER: PREVIOUS & NEXT NAVIGATION */}
      <footer className="relative z-10 w-full max-w-4xl px-4 sm:px-12 md:px-16 py-12 sm:py-16 flex flex-col gap-6 items-start">
        
        <div className="w-full flex items-center justify-between gap-4">
          <Link
            href={`/characters/${prevHero.characterId}`}
            className="group flex items-center gap-2 sm:gap-3 text-stone-400 hover:text-white transition-colors max-w-[48%]"
          >
            <div className="p-2 sm:p-2.5 rounded-full bg-white/[0.03] border border-white/5 group-hover:border-white/20 transition-all shrink-0">
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-stone-500 truncate">
                PREVIOUS HERO
              </span>
              <span className="text-[11px] sm:text-sm font-mono font-bold uppercase text-stone-200 group-hover:text-white truncate">
                #{prevHero.rank} {prevHero.name}
              </span>
            </div>
          </Link>

          <Link
            href={`/characters/${nextHero.characterId}`}
            className="group flex items-center justify-end gap-2 sm:gap-3 text-stone-400 hover:text-white transition-colors text-right max-w-[48%]"
          >
            <div className="flex flex-col min-w-0">
              <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-stone-500 truncate">
                NEXT HERO
              </span>
              <span className="text-[11px] sm:text-sm font-mono font-bold uppercase text-stone-200 group-hover:text-white truncate">
                #{nextHero.rank} {nextHero.name}
              </span>
            </div>
            <div className="p-2 sm:p-2.5 rounded-full bg-white/[0.03] border border-white/5 group-hover:border-white/20 transition-all shrink-0">
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>

      </footer>

      {/* Slide Navigation Menu Drawer */}
      <SlideNavMenu isOpen={navMenuOpen} onClose={() => setNavMenuOpen(false)} />
    </div>
  );
}
