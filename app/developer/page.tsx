"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
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
  ArrowRight,
  Cpu,
} from "lucide-react";
import PageShell from "@/components/PageShell";
import { LineNav, type LineNavItem } from "@/components/line-nav";

const NAV_ITEMS: LineNavItem[] = [
  { title: "ARCHIVE DOSSIER", href: "#overview" },
  { title: "SOCIAL PROFILES", href: "#socials" },
  { title: "CORE ARCHITECTURE", href: "#architecture" },
  { title: "SYSTEM STACK", href: "#techstack" },
];

const SOCIAL_HANDLES = [
  {
    name: "Portfolio",
    handle: "mynk.is-a.dev",
    href: "https://mynk.is-a.dev",
    icon: Globe,
    badge: "WEBSITE",
  },
  {
    name: "GitHub",
    handle: "@Mayank-Pandey7",
    href: "https://github.com/Mayank-Pandey7",
    icon: Github,
    badge: "CODE",
  },
  {
    name: "LinkedIn",
    handle: "in/mynkdev",
    href: "https://www.linkedin.com/in/mynkdev/",
    icon: Linkedin,
    badge: "CONNECT",
  },
  {
    name: "X (Twitter)",
    handle: "@maynkio",
    href: "https://x.com/maynkio",
    icon: Twitter,
    badge: "UPDATES",
  },
  {
    name: "YouTube",
    handle: "@nomad.mayank",
    href: "https://www.youtube.com/@nomad.mayank",
    icon: Youtube,
    badge: "CONTENT",
  },
  {
    name: "Instagram",
    handle: "@mayank__pandeyy",
    href: "https://www.instagram.com/mayank__pandeyy",
    icon: Instagram,
    badge: "SOCIAL",
  },
  {
    name: "Direct Email",
    handle: "mayankpandey0717@gmail.com",
    href: "mailto:mayankpandey0717@gmail.com",
    icon: Mail,
    badge: "CONTACT",
  },
];

const ARCHITECTURE_MODULES = [
  {
    id: "timeline-engine",
    title: "Sacred Timeline Engine",
    badge: "TEMPORAL CANON",
    icon: Compass,
    color: "#10b981",
    description:
      "44 canon film and series entries spanning Phases 1 through 6, dynamic path geometry, chronological ordering, and instant phase jump controls.",
  },
  {
    id: "multiverse-map",
    title: "Multiverse Spatial Map",
    badge: "PARALLEL REALITIES",
    icon: Globe,
    color: "#06b6d4",
    description:
      "Parallel Earth designations including Earth-616, Fox Earth-10005, Raimi Earth-96283, Webb Earth-120703, and What If dimension matrices.",
  },
  {
    id: "character-archives",
    title: "Character Archives",
    badge: "ROSTERS & THREATS",
    icon: Layers,
    color: "#a855f7",
    description:
      "Collectible ticket cards with authentic stamp perforations, faction filters (Avengers, Mutants, Villains), and detailed chronological histories.",
  },
  {
    id: "cosmic-relics",
    title: "Cosmic Relics Vault",
    badge: "GALACTIC ARSENAL",
    icon: Shield,
    color: "#f59e0b",
    description:
      "Provenance and wielder tracking for Infinity Stones, Gauntlets, Asgardian divine weapons, the Ten Rings, and the All-Black Necrosword.",
  },
  {
    id: "ironman-experience",
    title: "Tony Stark Experience",
    badge: "TRIBUTE SEQUENCER",
    icon: Sparkles,
    color: "#ef4444",
    description:
      "400vh canvas scroll animation sequence, 3D character carousels, and an immersive tribute to the hero who saved the universe.",
  },
  {
    id: "family-tree",
    title: "Family Tree & Dynasties",
    badge: "GENEALOGY GRAPH",
    icon: Code2,
    color: "#6366f1",
    description:
      "Dynamic node graph visualizing bloodlines, Asgardian royalty, mutant connections, and multiversal alliances.",
  },
];

const TECH_STACK = [
  { label: "FRAMEWORK", value: "Next.js 14", desc: "App Router & SSR" },
  { label: "LANGUAGE", value: "TypeScript", desc: "Strict Type Safety" },
  { label: "STYLING", value: "Tailwind CSS", desc: "Cinematic Dark Theme" },
  { label: "RUNTIME & CLOUD", value: "Vercel & Bun", desc: "Edge Network Delivery" },
];

export default function DeveloperPage() {
  const [activeSection, setActiveSection] = useState<string>("overview");

  return (
    <PageShell backHref="/timeline" backLabel="TIMELINE">
      {/* Top-Right Floating SELECT DOSSIER List matching /artifacts & /timeline styling */}
      <div
        className="fixed top-14 sm:top-20 right-3 sm:right-8 z-40 pointer-events-none flex flex-col items-end gap-1.5 origin-top-right scale-[0.82] sm:scale-100"
      >
        {/* SELECT DOSSIER pill */}
        <div className="pointer-events-none flex gap-0.5 rounded-full p-0.5 bg-black/85 backdrop-blur-md border border-white/15 shadow-xl whitespace-nowrap">
          <span className="rounded-full px-2.5 sm:px-3 py-1 text-[8px] sm:text-[9.5px] font-mono tracking-wider uppercase text-stone-400">
            SELECT DOSSIER
          </span>
        </div>

        {/* LineNav */}
        <div className="pointer-events-auto">
          <LineNav
            align="right"
            className="w-auto"
            items={NAV_ITEMS}
            activeHref={`#${activeSection}`}
            scrollActiveIntoView={false}
            onItemClick={(item) => {
              const key = item.href.replace("#", "");
              setActiveSection(key);
              const target = document.getElementById(key);
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }}
          />
        </div>
      </div>

      <div className="relative min-h-[calc(100vh-80px)] w-full bg-transparent text-stone-300 font-sans selection:bg-white selection:text-black">
        <div className="relative z-10 mx-auto flex flex-col gap-14 max-w-5xl px-3 sm:px-6 md:px-8 pt-10 sm:pt-12 pb-24">
          
          {/* Header Overview Bar */}
          <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-xs font-mono tracking-[0.25em] text-stone-400 uppercase font-bold">
                ARCHIVES · DEVELOPER PROFILE
              </span>
              <span className="text-stone-600 font-mono text-xs">•</span>
              <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-amber-400/90 uppercase font-semibold">
                MAYANK PANDEY
              </span>
            </div>

            <span className="text-[9.5px] sm:text-[10.5px] font-mono text-stone-500 uppercase tracking-widest">
              SYSTEM ARCHITECT
            </span>
          </div>

          {/* 1. Overview / Bio */}
          <section
            id="overview"
            className="scroll-mt-36 sm:scroll-mt-28 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-[0.25em] uppercase text-emerald-400 font-bold">
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

            <p className="text-xs sm:text-sm md:text-base font-mono text-stone-300 leading-relaxed max-w-3xl">
              Full Stack web developer passionate about building products to solve real-world problems and creating immersive digital experiences. Creator and architect of the <strong>MCUverse</strong> spatial platform &mdash; mapping the Sacred Timeline, Multiverse Realities, 100+ character genealogies, and cosmic relics.
            </p>

            {/* Action Buttons */}
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

              <Link
                href="/timeline"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-transparent text-stone-400 font-mono text-xs tracking-wider uppercase hover:text-white transition-colors cursor-pointer"
              >
                <span>Launch Timeline &rarr;</span>
              </Link>
            </div>
          </section>

          {/* 2. Social Profiles Section */}
          <section
            id="socials"
            className="scroll-mt-36 sm:scroll-mt-28 flex flex-col gap-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="text-[10.5px] sm:text-xs font-mono font-bold tracking-[0.2em] text-white uppercase bg-white/10 px-2.5 py-1 rounded shrink-0">
                  CONNECT
                </span>
                <span className="text-xs sm:text-sm font-mono tracking-[0.15em] text-stone-300 uppercase font-semibold">
                  SOCIAL PROFILES &amp; CHANNELS
                </span>
              </div>
              <span className="text-[9.5px] sm:text-[10.5px] font-mono text-stone-500 uppercase tracking-widest pl-0.5 sm:pl-0">
                {SOCIAL_HANDLES.length} PROFILES
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {SOCIAL_HANDLES.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col justify-between p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/25 hover:bg-white/[0.06] transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-stone-300 group-hover:text-white group-hover:border-white/20 transition-colors">
                        <Icon size={16} />
                      </div>
                      <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-stone-400 uppercase">
                        {social.badge}
                      </span>
                    </div>

                    <div className="flex flex-col mt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-[13px] font-mono font-bold uppercase text-white group-hover:text-stone-100 transition-colors">
                          {social.name}
                        </span>
                        <ExternalLink size={11} className="text-stone-500 group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-[10px] font-mono text-stone-400 truncate mt-0.5">
                        {social.handle}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>

          {/* 3. Core Modules Section */}
          <section
            id="architecture"
            className="scroll-mt-36 sm:scroll-mt-28 flex flex-col gap-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="text-[10.5px] sm:text-xs font-mono font-bold tracking-[0.2em] text-white uppercase bg-white/10 px-2.5 py-1 rounded shrink-0">
                  SYSTEM ARCHITECTURE
                </span>
                <span className="text-xs sm:text-sm font-mono tracking-[0.15em] text-stone-300 uppercase font-semibold">
                  MCUVERSE CORE ENGINES
                </span>
              </div>
              <span className="text-[9.5px] sm:text-[10.5px] font-mono text-stone-500 uppercase tracking-widest pl-0.5 sm:pl-0">
                {ARCHITECTURE_MODULES.length} ENGINES
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ARCHITECTURE_MODULES.map((mod) => {
                const Icon = mod.icon;
                return (
                  <div
                    key={mod.id}
                    className="p-5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col gap-3 hover:border-white/20 transition-all duration-200 shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className="p-2 rounded-lg border w-fit"
                        style={{
                          backgroundColor: `${mod.color}15`,
                          borderColor: `${mod.color}30`,
                          color: mod.color,
                        }}
                      >
                        <Icon size={16} />
                      </div>
                      <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-stone-400 uppercase">
                        {mod.badge}
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-white">
                      {mod.title}
                    </h3>
                    <p className="text-[11px] font-mono text-stone-400 leading-relaxed">
                      {mod.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 4. Tech Stack Section */}
          <section
            id="techstack"
            className="scroll-mt-36 sm:scroll-mt-28 flex flex-col gap-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="text-[10.5px] sm:text-xs font-mono font-bold tracking-[0.2em] text-white uppercase bg-white/10 px-2.5 py-1 rounded shrink-0">
                  INFRASTRUCTURE
                </span>
                <span className="text-xs sm:text-sm font-mono tracking-[0.15em] text-stone-300 uppercase font-semibold">
                  MODERN WEB STACK
                </span>
              </div>
              <span className="text-[9.5px] sm:text-[10.5px] font-mono text-stone-500 uppercase tracking-widest pl-0.5 sm:pl-0">
                PRODUCTION READY
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {TECH_STACK.map((tech) => (
                <div
                  key={tech.label}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col gap-1"
                >
                  <span className="text-[9px] font-mono text-stone-500 uppercase font-bold tracking-wider">
                    {tech.label}
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-white uppercase">
                    {tech.value}
                  </span>
                  <span className="text-[9.5px] font-mono text-stone-400">
                    {tech.desc}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom Footer Note */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[10px] font-mono uppercase tracking-widest">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <span>&larr; RETURN TO PORTAL</span>
            </Link>

            <span>
              DESIGNED &amp; ARCHITECTED BY MAYANK PANDEY (<a href="https://mynk.is-a.dev" target="_blank" rel="noopener noreferrer" className="text-stone-300 hover:text-white underline underline-offset-2">mynk.is-a.dev</a>)
            </span>
          </div>

        </div>
      </div>
    </PageShell>
  );
}
