"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ArrowLeft,
  Github,
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
  Mail,
  ExternalLink,
  Code2,
  Layers,
  Sparkles,
  Shield,
  Compass,
  Terminal,
  Globe,
  Briefcase,
  Cpu,
  CheckCircle2,
} from "lucide-react";
import SlideNavMenu from "@/components/dark/SlideNavMenu";
import BackgroundStarfield from "@/components/ui/BackgroundStarfield";

const SOCIAL_HANDLES = [
  {
    name: "Portfolio",
    handle: "mynk.is-a.dev",
    href: "https://mynk.is-a.dev",
    icon: Globe,
    color: "hover:text-emerald-400 hover:border-emerald-500/40",
    badge: "WEBSITE",
  },
  {
    name: "GitHub",
    handle: "@Mayank-Pandey7",
    href: "https://github.com/Mayank-Pandey7",
    icon: Github,
    color: "hover:text-white hover:border-white/40",
    badge: "CODE",
  },
  {
    name: "LinkedIn",
    handle: "in/mynkdev",
    href: "https://www.linkedin.com/in/mynkdev/",
    icon: Linkedin,
    color: "hover:text-sky-400 hover:border-sky-500/40",
    badge: "CONNECT",
  },
  {
    name: "X (Twitter)",
    handle: "@maynkio",
    href: "https://x.com/maynkio",
    icon: Twitter,
    color: "hover:text-stone-100 hover:border-stone-400/40",
    badge: "UPDATES",
  },
  {
    name: "YouTube",
    handle: "@nomad.mayank",
    href: "https://www.youtube.com/@nomad.mayank",
    icon: Youtube,
    color: "hover:text-rose-400 hover:border-rose-500/40",
    badge: "CONTENT",
  },
  {
    name: "Instagram",
    handle: "@mayank__pandeyy",
    href: "https://www.instagram.com/mayank__pandeyy",
    icon: Instagram,
    color: "hover:text-pink-400 hover:border-pink-500/40",
    badge: "SOCIAL",
  },
  {
    name: "Email",
    handle: "mayankpandey0717@gmail.com",
    href: "mailto:mayankpandey0717@gmail.com",
    icon: Mail,
    color: "hover:text-amber-400 hover:border-amber-500/40",
    badge: "CONTACT",
  },
];


export default function DeveloperPage() {
  const [navMenuOpen, setNavMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-[#000000] text-stone-200 font-sans selection:bg-white selection:text-black overflow-x-hidden">
      <BackgroundStarfield />
      <SlideNavMenu isOpen={navMenuOpen} onClose={() => setNavMenuOpen(false)} />

      <div className="navbar-blur-fade" aria-hidden="true" />

      {/* Synchronized Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 sm:py-6 min-h-[58px] sm:min-h-[72px] flex items-center justify-between pointer-events-none bg-transparent">
        <button
          onClick={() => setNavMenuOpen(true)}
          className="text-stone-300 hover:text-white transition-colors cursor-pointer p-1.5 pointer-events-auto"
          title="Open Universe Menu"
          aria-label="Open Universe Menu"
        >
          <Menu size={18} strokeWidth={1.5} />
        </button>

        <div className="text-xs sm:text-sm md:text-base font-mono font-bold tracking-[0.45em] sm:tracking-[0.55em] uppercase text-white pl-[0.45em] sm:pl-[0.55em] pointer-events-auto">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            MARVEL
          </Link>
        </div>

        <Link
          href="/timeline"
          className="text-stone-300 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer pointer-events-auto"
          title="Return to Timeline (Esc)"
        >
          <X size={18} strokeWidth={1.5} />
        </Link>
      </header>

      {/* Hero Header Section */}
      <section className="relative w-full pt-32 sm:pt-40 pb-12 px-4 sm:px-12 md:px-16 max-w-6xl mx-auto flex flex-col gap-6">
        <div className="flex items-center gap-2.5 text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-emerald-400 font-bold">
          <Terminal size={14} />
          <span>FULL STACK WEB DEVELOPER &bull; SYSTEM ARCHITECT</span>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-mono font-black tracking-tight uppercase text-white leading-none">
            MAYANK <span className="text-stone-500">PANDEY</span>
          </h1>
          <p className="text-xs sm:text-sm font-mono tracking-widest text-stone-400 uppercase">
            Love to build cool stuff &bull; Products that leave an impact
          </p>
        </div>

        <p className="text-sm sm:text-base font-mono text-stone-300 max-w-3xl leading-relaxed">
          Full Stack web developer passionate about building products to solve real-world problems and creating immersive digital experiences. Creator and architect of the <strong>MCUverse</strong> spatial platform &mdash; mapping the Sacred Timeline, Multiverse Realities, 100+ character genealogies, and cosmic relics.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="https://mynk.is-a.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-stone-200 transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <Globe size={14} />
            <span>mynk.is-a.dev</span>
            <ExternalLink size={12} className="opacity-60" />
          </a>

          <a
            href="https://github.com/Mayank-Pandey7/Marvel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/20 transition-all cursor-pointer active:scale-95"
          >
            <Github size={14} />
            <span>Marvel Repository</span>
            <ExternalLink size={12} className="opacity-60" />
          </a>

          <a
            href="mailto:mayankpandey0717@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider hover:bg-emerald-500/25 transition-all cursor-pointer active:scale-95"
          >
            <Mail size={14} />
            <span>Get in Touch</span>
          </a>

          <Link
            href="/timeline"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent text-stone-400 font-mono text-xs tracking-wider uppercase hover:text-white transition-colors cursor-pointer"
          >
            <span>Launch Timeline &rarr;</span>
          </Link>
        </div>
      </section>

      {/* Social & Contact Grid from mynk.is-a.dev */}
      <section className="relative w-full px-4 sm:px-12 md:px-16 max-w-6xl mx-auto py-10 border-t border-stone-900 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono tracking-[0.25em] text-stone-500 uppercase">
            CONNECT &bull; SOCIAL PROFILES
          </span>
          <h2 className="text-xl sm:text-2xl font-mono font-bold tracking-wider uppercase text-white">
            FIND ME ACROSS THE WEB
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {SOCIAL_HANDLES.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group p-4 rounded-xl bg-stone-950/80 border border-stone-900 flex items-center justify-between transition-all duration-200 cursor-pointer ${social.color}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-stone-300 group-hover:text-white group-hover:border-white/20 transition-colors shrink-0">
                    <Icon size={16} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-mono font-bold uppercase text-white group-hover:text-white transition-colors truncate">
                      {social.name}
                    </span>
                    <span className="text-[10px] font-mono text-stone-400 truncate">
                      {social.handle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-stone-400 uppercase">
                    {social.badge}
                  </span>
                  <ExternalLink size={11} className="text-stone-500 group-hover:text-white transition-colors" />
                </div>
              </a>
            );
          })}
        </div>
      </section>


      {/* MCUverse Core Modules Section */}
      <section className="relative w-full px-4 sm:px-12 md:px-16 max-w-6xl mx-auto py-10 border-t border-stone-900 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono tracking-[0.25em] text-stone-500 uppercase">
            SYSTEM ARCHITECTURE
          </span>
          <h2 className="text-xl sm:text-2xl font-mono font-bold tracking-wider uppercase text-white">
            MCUVERSE CORE MODULES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-6 rounded-xl bg-stone-950/80 border border-stone-900 flex flex-col gap-3 hover:border-stone-700 transition-colors">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 w-fit">
              <Compass size={18} />
            </div>
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
              Sacred Timeline Engine
            </h3>
            <p className="text-xs font-mono text-stone-400 leading-relaxed">
              44 canon film and series entries spanning Phases 1 through 6, dynamic path geometry, chronological ordering, and instant phase jump controls.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-stone-950/80 border border-stone-900 flex flex-col gap-3 hover:border-stone-700 transition-colors">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 w-fit">
              <Globe size={18} />
            </div>
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
              Multiverse Spatial Map
            </h3>
            <p className="text-xs font-mono text-stone-400 leading-relaxed">
              Parallel Earth designations including Earth-616, Fox Earth-10005, Raimi Earth-96283, Webb Earth-120703, and What If dimensions.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-stone-950/80 border border-stone-900 flex flex-col gap-3 hover:border-stone-700 transition-colors">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 w-fit">
              <Layers size={18} />
            </div>
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
              Character Archives
            </h3>
            <p className="text-xs font-mono text-stone-400 leading-relaxed">
              Collectible ticket cards with authentic stamp perforations, faction filters (Avengers, Mutants, Villains), and detailed chronological histories.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-stone-950/80 border border-stone-900 flex flex-col gap-3 hover:border-stone-700 transition-colors">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 w-fit">
              <Shield size={18} />
            </div>
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
              Cosmic Relics Vault
            </h3>
            <p className="text-xs font-mono text-stone-400 leading-relaxed">
              Provenance and wielder tracking for Infinity Stones, Gauntlets, Asgardian divine weapons, the Ten Rings, and the All-Black Necrosword.
            </p>
          </div>

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

      {/* Modern Web Tech Stack Section */}
      <section className="relative w-full px-4 sm:px-12 md:px-16 max-w-6xl mx-auto py-10 border-t border-stone-900 flex flex-col gap-6">
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
            <span className="text-[10px] font-mono text-stone-500 uppercase">RUNTIME &amp; CLOUD</span>
            <span className="text-sm font-mono font-bold text-white">Vercel &amp; Bun</span>
            <span className="text-[10px] font-mono text-stone-400">High-Speed Edge Delivery</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative w-full max-w-6xl mx-auto px-4 sm:px-12 md:px-16 py-12 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-stone-400 hover:text-white text-xs font-mono tracking-widest uppercase transition-colors"
        >
          <ArrowLeft size={14} />
          <span>RETURN TO PORTAL</span>
        </Link>

        <span className="text-[10px] font-mono text-stone-600 uppercase tracking-widest text-center sm:text-right">
          MCUVERSE &bull; DESIGNED &amp; ENGINEERED BY MAYANK PANDEY (<a href="https://mynk.is-a.dev" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white underline underline-offset-2">mynk.is-a.dev</a>)
        </span>
      </footer>
    </div>
  );
}
