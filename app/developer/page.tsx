"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  X,
  Menu,
  ChevronDown,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
  Mail,
  ExternalLink,
  Terminal,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import SlideNavMenu from "@/components/dark/SlideNavMenu";
import BackgroundStarfield from "@/components/ui/BackgroundStarfield";

const SOCIAL_HANDLES = [
  {
    name: "Portfolio",
    handle: "mynk.is-a.dev",
    href: "https://mynk.is-a.dev",
    icon: Globe,
    badge: "WEBSITE",
    scale: "PRIMARY PORTAL",
    desc: "Personal portfolio displaying production applications, design systems, and creative projects.",
  },
  {
    name: "GitHub",
    handle: "@Mayank-Pandey7",
    href: "https://github.com/Mayank-Pandey7",
    icon: Github,
    badge: "CODE",
    scale: "OPEN SOURCE",
    desc: "Architect and maintainer of MCUverse and various open source web applications.",
  },
  {
    name: "LinkedIn",
    handle: "in/mynkdev",
    href: "https://www.linkedin.com/in/mynkdev/",
    icon: Linkedin,
    badge: "CONNECT",
    scale: "PROFESSIONAL",
    desc: "Connecting with software engineers, designers, and tech leaders worldwide.",
  },
  {
    name: "X (Twitter)",
    handle: "@maynkio",
    href: "https://x.com/maynkio",
    icon: Twitter,
    badge: "UPDATES",
    scale: "BROADCAST",
    desc: "Real-time updates, engineering breakdowns, and insights on modern frontend stacks.",
  },
  {
    name: "YouTube",
    handle: "@nomad.mayank",
    href: "https://www.youtube.com/@nomad.mayank",
    icon: Youtube,
    badge: "CONTENT",
    scale: "MEDIA",
    desc: "Tech showcases, travel vlogs, and engineering walkthroughs.",
  },
  {
    name: "Instagram",
    handle: "@mayank__pandeyy",
    href: "https://www.instagram.com/mayank__pandeyy",
    icon: Instagram,
    badge: "SOCIAL",
    scale: "COMMUNITY",
    desc: "Personal life, photography, and behind-the-scenes snapshots of coding sessions.",
  },
  {
    name: "Direct Email",
    handle: "mayankpandey0717@gmail.com",
    href: "mailto:mayankpandey0717@gmail.com",
    icon: Mail,
    badge: "CONTACT",
    scale: "COMMUNICATION",
    desc: "Direct communication line for collaborations, contract inquiries, and discussions.",
  },
];

const FEATS = [
  {
    eraOrEvent: "TEMPORAL CANON ARCHITECTURE",
    title: "The Sacred Timeline Engine",
    description:
      "Constructed a high-performance temporal engine indexing 44 canon Marvel Cinematic Universe film and series entries spanning Phases 1 through 6, with dynamic path geometry, chronological ordering, and instant phase jump controls.",
    quote: "Time is a canvas. Every film and narrative beat mapped into an unbroken, interactive continuum.",
    impact: "Zero-latency navigation across 20+ years of MCU cinematic history with sub-second filtering.",
  },
  {
    eraOrEvent: "DIMENSIONAL MULTIVERSE REALITY",
    title: "Multiverse Spatial Map",
    description:
      "Engineered parallel Earth designations including Earth-616, Fox Earth-10005, Raimi Earth-96283, Webb Earth-120703, and What If dimension matrices with interactive node clustering.",
    quote: "The multiverse is a concept about which we know frighteningly little — until now.",
    impact: "Unified branching timelines and alternative comic realities under a single spatial coordinate system.",
  },
  {
    eraOrEvent: "CHARACTER GENEALOGIES & ROSTERS",
    title: "Character Archives & Dynasties",
    description:
      "Built collectible ticket cards with authentic stamp perforations, faction filters (Avengers, Mutants, Villains), dynamic genealogy graphs visualizing bloodlines, Asgardian royalty, and multiversal alliances.",
    quote: "A hero is defined by what they stand for — and the legacy they leave behind.",
    impact: "Over 100 character dossiers rendered with custom comic-accurate typography and deep lore histories.",
  },
  {
    eraOrEvent: "COSMIC RELICS & DIVINE WEAPONS",
    title: "Cosmic Relics Vault",
    description:
      "Created provenance and wielder tracking for Infinity Stones, Gauntlets, Asgardian divine weapons, the Ten Rings, and the All-Black Necrosword with interactive 3D perspective inspect modes.",
    quote: "With all six stones, I could simply snap my fingers. They would all cease to exist.",
    impact: "Full cosmic inventory database tracking power origins, destruction events, and current wielder status.",
  },
  {
    eraOrEvent: "IMMERSIVE SEQUENCER ENGINE",
    title: "Tony Stark Tribute Experience",
    description:
      "Architected a 400vh canvas scroll animation sequence, 3D character carousels, and an immersive tribute to the hero who saved the universe, optimized with hardware-accelerated transforms.",
    quote: "I love you 3000.",
    impact: "Smooth 60 FPS viewport interpolation with zero layout shifts across desktop and mobile viewports.",
  },
];

const TECH_STACK = [
  { label: "FRAMEWORK", value: "Next.js 14", desc: "App Router & React Server Components" },
  { label: "LANGUAGE", value: "TypeScript", desc: "Strict End-to-End Type Safety" },
  { label: "STYLING", value: "Tailwind CSS", desc: "Cinematic Dark Theme & Responsive Grids" },
  { label: "RUNTIME & CLOUD", value: "Vercel & Bun", desc: "Global Edge Network & Sub-Millisecond SSR" },
];

export default function DeveloperPage() {
  const router = useRouter();
  const [navMenuOpen, setNavMenuOpen] = useState(false);

  const handleBack = () => {
    if (typeof window !== "undefined") {
      if (window.history.length > 1) {
        router.back();
        return;
      }
    }
    router.push("/timeline");
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

  const developerPortrait = "https://github.com/Mayank-Pandey7.png";

  return (
    <div className="relative min-h-screen w-full bg-[#000000] text-stone-200 font-sans selection:bg-white selection:text-black overflow-x-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <BackgroundStarfield />

      {/* Ambient Radial Aura */}
      <div
        className="fixed top-0 right-0 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] rounded-full pointer-events-none z-0 opacity-15 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #38bdf8 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="navbar-blur-fade" aria-hidden="true" />

      {/* Top Header Navigation */}
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
          title="Return to Timeline (Esc)"
        >
          <span className="hidden sm:inline text-[10px] tracking-wider text-stone-400 select-none">RETURN</span>
          <X size={18} strokeWidth={1.5} />
        </button>
      </header>

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[90vh] sm:min-h-[95vh] flex flex-col justify-end pt-28 sm:pt-36 pb-10 sm:pb-16 px-4 sm:px-12 md:px-16 overflow-hidden">
        
        {/* Standalone Poster Frame on Right (Fixed in viewport, matching /the-beyonder) */}
        <div
          className="fixed top-24 sm:top-28 right-6 sm:right-16 md:right-24 lg:right-32 xl:right-40 w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px] aspect-[2/3] z-30 overflow-hidden rounded-2xl border border-white/15 bg-stone-950 shadow-[0_25px_70px_rgba(0,0,0,0.95)] pointer-events-none hidden sm:block transition-all duration-300"
        >
          <img
            src={developerPortrait}
            alt="Mayank Pandey"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Mobile Background Fallback */}
        <div className="sm:hidden absolute top-0 right-0 w-full h-[50vh] z-0 overflow-hidden pointer-events-none">
          <img
            src={developerPortrait}
            alt="Mayank Pandey"
            className="w-full h-full object-contain object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        {/* Bio Container (Fixed at bottom-left exactly as /the-beyonder) */}
        <div className="relative z-20 max-w-2xl lg:max-w-3xl xl:max-w-4xl flex flex-col gap-3.5 sm:gap-5 mt-auto pt-6 sm:pt-12">
          
          {/* Hierarchy Badge */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[9px] sm:text-[11px] font-mono tracking-wider uppercase text-stone-400">
            <span 
              className="font-bold tracking-widest text-sky-400"
            >
              ARCHIVES &bull; SYSTEM ARCHITECT
            </span>
          </div>

          {/* Character Name & Sub-Alias */}
          <div className="space-y-1">
            <h1 className="font-mono font-bold uppercase text-white leading-tight drop-shadow-2xl whitespace-nowrap text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.06em] sm:tracking-[0.1em]">
              MAYANK PANDEY
            </h1>
            <p className="text-xs sm:text-sm font-mono tracking-widest text-stone-400 uppercase">
              Love to build cool stuff &bull; Products that leave an impact
            </p>
          </div>

          {/* In-depth Overview */}
          <p className="text-xs sm:text-sm md:text-base font-mono tracking-wide text-stone-300 leading-relaxed max-w-xl">
            Full Stack web developer passionate about building products to solve real-world problems and creating immersive digital experiences. Creator and architect of the <strong>MCUverse</strong> spatial platform &mdash; mapping the Sacred Timeline, Multiverse Realities, 100+ character genealogies, and cosmic relics.
          </p>

          {/* Summary Metric Stats */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-1 sm:pt-2 text-[11px] sm:text-xs font-mono text-stone-400">
            <div>
              <span className="text-[8.5px] sm:text-[9px] uppercase tracking-widest text-stone-500 mr-1.5">CLASSIFICATION:</span>
              <span className="text-stone-200 font-semibold">FULL STACK DEVELOPER</span>
            </div>
            <div>
              <span className="text-[8.5px] sm:text-[9px] uppercase tracking-widest text-stone-500 mr-1.5">SPECIALIZATION:</span>
              <span className="text-stone-200 font-semibold">SPATIAL UI &amp; DISTRIBUTED ARCHITECTURE</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://mynk.is-a.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-stone-200 transition-all cursor-pointer shadow-lg active:scale-95"
            >
              <Globe size={13} />
              <span>mynk.is-a.dev</span>
              <ExternalLink size={11} className="opacity-60" />
            </a>

            <a
              href="https://github.com/Mayank-Pandey7/Marvel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/15 text-stone-200 font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/15 hover:text-white transition-all cursor-pointer active:scale-95"
            >
              <Github size={13} />
              <span>Marvel Repository</span>
              <ExternalLink size={11} className="opacity-60" />
            </a>

            <a
              href="mailto:mayankpandey0717@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-stone-300 font-mono text-xs tracking-wider uppercase hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            >
              <Mail size={13} />
              <span>Contact</span>
            </a>
          </div>

          {/* Smooth Scroll Cue */}
          <div className="pt-4 sm:pt-6 flex items-center gap-2 text-[9.5px] sm:text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase text-stone-500 animate-pulse">
            <span>EXPLORE SYSTEM ARCHITECTURE &amp; FEATS</span>
            <ChevronDown size={14} />
          </div>

        </div>

      </section>

      {/* SECTION 1: POTENTIAL POWER & POWER SCALE (Clean open layout matching /the-beyonder) */}
      <section className="relative z-10 w-full max-w-6xl px-4 sm:px-12 md:px-16 py-10 sm:py-14 flex flex-col gap-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 max-w-4xl border-b border-white/10">
          <h2 className="text-base sm:text-xl font-mono font-bold tracking-[0.16em] uppercase text-white">
            POTENTIAL ARCHITECTURE &amp; SYSTEM SCALE
          </h2>
          <span className="text-[9.5px] sm:text-[10px] font-mono tracking-widest uppercase text-sky-400">
            PRODUCTION READY &bull; HIGH CONCURRENCY
          </span>
        </div>

        {/* Open Text Narrative */}
        <div className="max-w-4xl flex flex-col gap-3">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-stone-500 font-bold">
            EXECUTIVE ARCHITECTURE ANALYSIS:
          </span>
          <p className="text-sm sm:text-base font-mono text-stone-200 leading-relaxed max-w-3xl">
            Architected MCUverse as a unified spatial universe interface combining React Server Components, client-side hardware-accelerated canvas renderers, zero-layout-shift timelines, and deep relational genealogies. Built with sub-millisecond edge routing and complete offline resilience.
          </p>
        </div>

      </section>

      {/* SECTION 2: WHAT THEY HAVE DONE (Feats Lore Record) */}
      <section className="relative z-10 w-full max-w-6xl px-4 sm:px-12 md:px-16 py-10 sm:py-14 flex flex-col gap-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 max-w-4xl border-b border-white/10">
          <h2 className="text-base sm:text-xl font-mono font-bold tracking-[0.16em] uppercase text-white">
            LORE RECORD: WHAT WAS BUILT
          </h2>
          <span className="text-[9.5px] sm:text-[10px] font-mono tracking-widest uppercase text-stone-500">
            {FEATS.length} CORE PLATFORM ENGINES
          </span>
        </div>

        {/* Feats List */}
        <div className="relative border-l border-white/10 ml-2 sm:ml-4 pl-6 sm:pl-10 flex flex-col gap-10 max-w-4xl">
          {FEATS.map((feat, idx) => (
            <div key={idx} className="relative flex flex-col gap-2.5 group">
              {/* Timeline Indicator Dot */}
              <span 
                className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-black border-2 border-sky-400 transition-colors"
              />

              {/* Event Subtitle */}
              <div className="flex items-center gap-2 text-[10.5px] sm:text-[11px] font-mono tracking-[0.2em] uppercase">
                <span className="text-stone-400 font-bold">
                  {feat.eraOrEvent}
                </span>
              </div>

              {/* Feat Title */}
              <h3 className="text-xl sm:text-2xl font-mono font-bold tracking-wide text-white uppercase leading-snug group-hover:text-sky-300 transition-colors">
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

              {/* Multiversal Impact */}
              <div className="flex items-start gap-2 pt-1 text-xs font-mono text-stone-400">
                <span className="text-[9px] uppercase tracking-widest text-sky-400 font-bold shrink-0 mt-0.5">
                  [IMPACT]
                </span>
                <span className="text-stone-300">{feat.impact}</span>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* SECTION 3: WHAT THEY CAN POTENTIALLY DO (Social Channels & Connect) */}
      <section className="relative z-10 w-full max-w-6xl px-4 sm:px-12 md:px-16 py-10 sm:py-14 flex flex-col gap-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 max-w-4xl border-b border-white/10">
          <h2 className="text-base sm:text-xl font-mono font-bold tracking-[0.16em] uppercase text-white">
            POTENTIAL CAPABILITIES: CONNECT &amp; PROFILES
          </h2>
          <span className="text-[9.5px] sm:text-[10px] font-mono tracking-widest uppercase text-stone-500">
            {SOCIAL_HANDLES.length} PUBLIC CHANNELS
          </span>
        </div>

        {/* Clean Open Grid (Matching minimalist social cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl">
          {SOCIAL_HANDLES.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1.5 transition-colors cursor-pointer py-1"
              >
                <div className="flex items-center gap-2">
                  <Icon size={16} className="text-stone-400 group-hover:text-white transition-colors" />
                  <h4 className="text-base sm:text-lg font-mono font-bold text-white uppercase leading-snug group-hover:text-sky-300 transition-colors">
                    {social.name}
                  </h4>
                  <ExternalLink size={12} className="text-stone-500 group-hover:text-white transition-colors ml-auto" />
                </div>

                <span className="text-[11px] sm:text-xs font-mono text-stone-400 tracking-wider">
                  {social.handle}
                </span>
              </a>
            );
          })}
        </div>

      </section>

      {/* SECTION 4: SYSTEM STACK & INFRASTRUCTURE */}
      <section className="relative z-10 w-full max-w-6xl px-4 sm:px-12 md:px-16 py-10 sm:py-14 flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 max-w-4xl border-b border-white/10">
          <h2 className="text-base sm:text-xl font-mono font-bold tracking-[0.16em] uppercase text-white">
            SYSTEM STACK &amp; INFRASTRUCTURE
          </h2>
          <span className="text-[9.5px] sm:text-[10px] font-mono tracking-widest uppercase text-stone-500">
            NEXT-GEN WEB TECH
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl">
          {TECH_STACK.map((tech) => (
            <div key={tech.label} className="flex flex-col gap-1.5">
              <span className="text-[9.5px] font-mono uppercase tracking-widest text-sky-400 font-bold">
                {tech.label}
              </span>
              <h4 className="text-base font-mono font-bold text-white uppercase">
                {tech.value}
              </h4>
              <p className="text-xs font-mono text-stone-400">
                {tech.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER NAVIGATION */}
      <footer className="relative z-10 w-full max-w-6xl px-4 sm:px-12 md:px-16 pb-16 pt-8">
        <div className="w-full max-w-4xl border-t border-white/10 pt-8 flex items-center justify-between gap-4">
          <Link
            href="/timeline"
            className="group flex items-center gap-2 sm:gap-3 text-stone-400 hover:text-white transition-colors max-w-[48%]"
          >
            <div className="p-2 sm:p-2.5 rounded-full bg-white/[0.03] border border-white/5 group-hover:border-white/20 transition-all shrink-0">
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-stone-500 truncate">NAVIGATE BACK</span>
              <span className="text-[11px] sm:text-sm font-mono font-bold uppercase text-stone-200 group-hover:text-white truncate">
                SACRED TIMELINE
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="group flex items-center justify-end gap-2 sm:gap-3 text-stone-400 hover:text-white transition-colors text-right max-w-[48%]"
          >
            <div className="flex flex-col min-w-0">
              <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-stone-500 truncate">RETURN TO HOME</span>
              <span className="text-[11px] sm:text-sm font-mono font-bold uppercase text-stone-200 group-hover:text-white truncate">
                MCU PORTAL
              </span>
            </div>
            <div className="p-2 sm:p-2.5 rounded-full bg-white/[0.03] border border-white/5 group-hover:border-white/20 transition-all shrink-0">
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </footer>

      <SlideNavMenu isOpen={navMenuOpen} onClose={() => setNavMenuOpen(false)} />
    </div>
  );
}
