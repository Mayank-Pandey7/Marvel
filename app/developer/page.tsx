"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ArrowLeft,
  Github,
  ExternalLink,
  Code2,
  Layers,
  Sparkles,
  Shield,
  Compass,
  Terminal,
  Globe
} from "lucide-react";
import SlideNavMenu from "@/components/dark/SlideNavMenu";

export default function DeveloperPage() {
  const [navMenuOpen, setNavMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-[#000000] text-stone-200 font-sans selection:bg-white selection:text-black overflow-x-hidden">
      {/* Slide Navigation Menu */}
      <SlideNavMenu isOpen={navMenuOpen} onClose={() => setNavMenuOpen(false)} />

      {/* Synchronized Global Header Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 sm:py-6 min-h-[58px] sm:min-h-[72px] flex items-center justify-between pointer-events-none bg-transparent">
        {/* Left Side: Menu Trigger */}
        <button
          onClick={() => setNavMenuOpen(true)}
          className="text-stone-300 hover:text-white transition-colors cursor-pointer p-1.5 pointer-events-auto"
          title="Open Universe Menu"
          aria-label="Open Universe Menu"
        >
          <Menu size={18} strokeWidth={1.5} />
        </button>

        {/* Center: Brand Header */}
        <div className="text-xs sm:text-sm md:text-base font-mono font-bold tracking-[0.45em] sm:tracking-[0.55em] uppercase text-white pl-[0.45em] sm:pl-[0.55em] pointer-events-auto">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            MARVEL
          </Link>
        </div>

        {/* Right Side: Return Link */}
        <Link
          href="/timeline"
          className="text-stone-300 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer pointer-events-auto"
          title="Return to Timeline (Esc)"
        >
          <X size={18} strokeWidth={1.5} />
        </Link>
      </header>

      {/* 1. HERO SECTION */}
      <section className="relative w-full pt-32 sm:pt-40 pb-16 px-4 sm:px-12 md:px-16 max-w-6xl mx-auto flex flex-col gap-6">
        <div className="flex items-center gap-2.5 text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-indigo-400 font-bold">
          <Terminal size={14} />
          <span>SYSTEM ARCHITECT &bull; FULL-STACK ENGINEER</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-mono font-black tracking-tight uppercase text-white leading-none">
          MAYANK <span className="text-stone-500">PANDEY</span>
        </h1>

        <p className="text-sm sm:text-base font-mono text-stone-400 max-w-2xl leading-relaxed">
          Architect of the MCUverse platform &mdash; an immersive, spatial exploration system mapping the Sacred Timeline, Multiverse Earths, 100+ character genealogies, and 54 cosmic relics.
        </p>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <a
            href="https://github.com/Mayank-Pandey7/Marvel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-stone-200 transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <Github size={15} />
            <span>GitHub Repository</span>
            <ExternalLink size={12} className="opacity-60" />
          </a>

          <a
            href="https://github.com/Mayank-Pandey7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-stone-200 font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer active:scale-95"
          >
            <span>@Mayank-Pandey7</span>
            <ExternalLink size={12} className="opacity-60" />
          </a>

          <Link
            href="/timeline"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent text-stone-400 font-mono text-xs tracking-wider uppercase hover:text-white transition-colors cursor-pointer"
          >
            <span>Launch Timeline &rarr;</span>
          </Link>
        </div>
      </section>

      {/* 2. CORE ARCHITECTURAL MODULES */}
      <section className="relative w-full px-4 sm:px-12 md:px-16 max-w-6xl mx-auto py-12 border-t border-stone-900 flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono tracking-[0.25em] text-stone-500 uppercase">
            SYSTEM ARCHITECTURE
          </span>
          <h2 className="text-xl sm:text-2xl font-mono font-bold tracking-wider uppercase text-white">
            MCUVERSE CORE MODULES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="p-6 rounded-xl bg-stone-950/80 border border-stone-900 flex flex-col gap-3 hover:border-stone-700 transition-colors">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 w-fit">
              <Compass size={18} />
            </div>
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
              Sacred Timeline Engine
            </h3>
            <p className="text-xs font-mono text-stone-400 leading-relaxed">
              64 canon film and series entries spanning Phases 1 through 6, dynamic path geometry, chronological ordering, and instant phase jump controls.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-xl bg-stone-950/80 border border-stone-900 flex flex-col gap-3 hover:border-stone-700 transition-colors">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 w-fit">
              <Globe size={18} />
            </div>
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
              Multiverse Spatial Map
            </h3>
            <p className="text-xs font-mono text-stone-400 leading-relaxed">
              Parallel Earth designations including Earth-616, Fox Earth-10005, Raimi Earth-96283, Webb Earth-120703, and What If Earth-82111.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-xl bg-stone-950/80 border border-stone-900 flex flex-col gap-3 hover:border-stone-700 transition-colors">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 w-fit">
              <Layers size={18} />
            </div>
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
              100+ Character Archives
            </h3>
            <p className="text-xs font-mono text-stone-400 leading-relaxed">
              Collectible ticket cards with authentic stamp perforations, faction filters (Avengers, Mutants, Villains), and detailed chronological histories.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-xl bg-stone-950/80 border border-stone-900 flex flex-col gap-3 hover:border-stone-700 transition-colors">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 w-fit">
              <Shield size={18} />
            </div>
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
              54 Cosmic Relics Vault
            </h3>
            <p className="text-xs font-mono text-stone-400 leading-relaxed">
              Provenance and wielder tracking for Infinity Stones, Gauntlets, Asgardian divine weapons, the Ten Rings, and the All-Black Necrosword.
            </p>
          </div>

          {/* Card 5 */}
          <div className="p-6 rounded-xl bg-stone-950/80 border border-stone-900 flex flex-col gap-3 hover:border-stone-700 transition-colors">
            <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 w-fit">
              <Sparkles size={18} />
            </div>
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
              Tony Stark Experience
            </h3>
            <p className="text-xs font-mono text-stone-400 leading-relaxed">
              400vh canvas scroll animation sequence, 3D character carousels, and an immersive tribute to the hero who saved the universe.
            </p>
          </div>

          {/* Card 6 */}
          <div className="p-6 rounded-xl bg-stone-950/80 border border-stone-900 flex flex-col gap-3 hover:border-stone-700 transition-colors">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 w-fit">
              <Code2 size={18} />
            </div>
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
              Family Tree &amp; Dynasties
            </h3>
            <p className="text-xs font-mono text-stone-400 leading-relaxed">
              Dynamic node graph visualizing bloodlines, Asgardian royalty, mutant connections, and multiversal alliances.
            </p>
          </div>
        </div>
      </section>

      {/* 3. TECH STACK SPECIFICATIONS */}
      <section className="relative w-full px-4 sm:px-12 md:px-16 max-w-6xl mx-auto py-12 border-t border-stone-900 flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono tracking-[0.25em] text-stone-500 uppercase">
            TECHNOLOGY STACK
          </span>
          <h2 className="text-xl sm:text-2xl font-mono font-bold tracking-wider uppercase text-white">
            MODERN WEB INFRASTRUCTURE
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-stone-950 border border-stone-900 flex flex-col gap-1">
            <span className="text-[10px] font-mono text-stone-500 uppercase">FRAMEWORK</span>
            <span className="text-sm font-mono font-bold text-white">Next.js 14</span>
            <span className="text-[10px] font-mono text-stone-400">App Router &amp; SSR</span>
          </div>

          <div className="p-4 rounded-lg bg-stone-950 border border-stone-900 flex flex-col gap-1">
            <span className="text-[10px] font-mono text-stone-500 uppercase">LANGUAGE</span>
            <span className="text-sm font-mono font-bold text-white">TypeScript</span>
            <span className="text-[10px] font-mono text-stone-400">Strict Type Safety</span>
          </div>

          <div className="p-4 rounded-lg bg-stone-950 border border-stone-900 flex flex-col gap-1">
            <span className="text-[10px] font-mono text-stone-500 uppercase">STYLING</span>
            <span className="text-sm font-mono font-bold text-white">Tailwind CSS</span>
            <span className="text-[10px] font-mono text-stone-400">Dark Cinematic Theme</span>
          </div>

          <div className="p-4 rounded-lg bg-stone-950 border border-stone-900 flex flex-col gap-1">
            <span className="text-[10px] font-mono text-stone-500 uppercase">GRAPHICS</span>
            <span className="text-sm font-mono font-bold text-white">Three.js / WebGL</span>
            <span className="text-[10px] font-mono text-stone-400">GLSL Canvas Shaders</span>
          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="relative w-full max-w-6xl mx-auto px-4 sm:px-12 md:px-16 py-12 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-stone-400 hover:text-white text-xs font-mono tracking-widest uppercase transition-colors"
        >
          <ArrowLeft size={14} />
          <span>RETURN TO PORTAL</span>
        </Link>

        <span className="text-[10px] font-mono text-stone-600 uppercase tracking-widest">
          MCUVERSE &bull; DESIGNED &amp; ENGINEERED BY MAYANK PANDEY
        </span>
      </footer>
    </div>
  );
}
