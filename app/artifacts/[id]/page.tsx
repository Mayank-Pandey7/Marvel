"use client";

import React, { useState, useMemo, useEffect } from "react";
import { notFound } from "next/navigation";
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
  Crown
} from "lucide-react";
import { ARTIFACTS, getArtifact } from "@/data/artifacts";
import { MCU } from "@/data/mcu";
import { MCU_POSTER_MAP } from "@/components/map/NodeArtwork";
import SlideNavMenu from "@/components/dark/SlideNavMenu";

export default function ArtifactDetailPage({ params }: { params: { id: string } }) {
  const artifact = getArtifact(params.id);
  if (!artifact) notFound();

  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentIndex = ARTIFACTS.findIndex((a) => a.id === artifact.id);
  const prevArtifact = currentIndex > 0 ? ARTIFACTS[currentIndex - 1] : ARTIFACTS[ARTIFACTS.length - 1];
  const nextArtifact = currentIndex < ARTIFACTS.length - 1 ? ARTIFACTS[currentIndex + 1] : ARTIFACTS[0];

  
  const movieEntries = useMemo(() => {
    const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
    const artifactIdNorm = normalize(artifact.id);
    const artifactNameNorm = normalize(artifact.name);
    const holderNames = (artifact.history || []).map((h) => normalize(h.holderName));
    const locations = (artifact.history || []).map((h) => normalize(h.location));

    return MCU.filter((m) => {
      const mIdNorm = normalize(m.id);
      const mTitleNorm = normalize(m.title);

      const keyRelics = (m as { keyRelics?: string[] }).keyRelics;
      const titleMatch =
        mTitleNorm.includes(artifactIdNorm) ||
        (keyRelics && keyRelics.some((r: string) => normalize(r).includes(artifactIdNorm) || artifactNameNorm.includes(normalize(r))));

      const holderMatch =
        (m.characters || []).some((c) => holderNames.some((hn) => hn.includes(normalize(c)))) ||
        (artifact.history || []).some((h) => {
          const year = parseInt(h.year, 10);
          return !isNaN(year) && m.year === year && (h.phase === m.phase);
        });

      return titleMatch || holderMatch;
    }).slice(0, 8);
  }, [artifact]);

  const primaryOrigin = artifact.origin.split("/")[0].trim();
  const categoryLabel = artifact.category.replace(/_/g, " ");

  return (
    <div className="relative min-h-screen w-full bg-[#000000] text-stone-200 font-sans selection:bg-white selection:text-black overflow-x-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

      <div
        className="fixed top-0 inset-x-0 h-20 sm:h-26 pointer-events-none z-40 bg-transparent backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)] transition-opacity duration-700"
        aria-hidden="true"
      />

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
          href="/artifacts"
          className="text-stone-300 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer pointer-events-auto"
          title="Return to Relics Archive (Esc)"
        >
          <X size={18} strokeWidth={1.5} />
        </Link>
      </header>

      <section className="relative w-full min-h-[90vh] sm:min-h-[95vh] flex flex-col justify-end pt-[52vh] sm:pt-48 pb-10 sm:pb-16 px-4 sm:px-12 md:px-16 overflow-hidden bg-[#000000]">

        <div
          className="absolute top-0 right-0 left-0 sm:left-auto w-full sm:w-[80%] md:w-[70%] lg:w-[62%] h-[44vh] sm:h-[65vh] lg:h-full z-0 overflow-hidden flex items-start sm:items-center justify-center sm:justify-end pointer-events-none [mask-image:linear-gradient(to_bottom,black_30%,transparent_100%)] sm:[mask-image:radial-gradient(ellipse_75%_80%_at_65%_45%,black_15%,transparent_80%)]"
        >
          <img
            src={artifact.backdrop}
            alt={artifact.name}
            className="w-full h-full object-cover object-top sm:object-[right_top] md:object-[right_top] filter brightness-95 contrast-105"
          />
          <div
            className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none"
            style={{
              background: `radial-gradient(circle at 60% 40%, ${artifact.iconColor || "#fff"} 0%, transparent 65%)`
            }}
          />
        </div>

        {/* Hero Narrative Info */}
        <div className="relative z-20 max-w-2xl lg:max-w-3xl flex flex-col gap-3.5 sm:gap-5 mt-auto pt-6 sm:pt-12">

          {/* Breadcrumb Tags */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[9px] sm:text-[11px] font-mono tracking-wider uppercase text-stone-400">
            <span className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ backgroundColor: artifact.iconColor || "#fff" }}
              />
              {primaryOrigin}
            </span>
            <span className="text-stone-600">/</span>
            <span>{categoryLabel}</span>
            <span className="text-stone-600">/</span>
            <span className="text-white font-semibold">PHASE {artifact.phaseIntroduced}</span>
          </div>

          {/* Massive Artifact Title */}
          <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-mono font-bold tracking-[0.08em] xs:tracking-[0.12em] uppercase text-white leading-tight drop-shadow-2xl">
            {artifact.name}
          </h1>

          {/* Overview Lore */}
          <p className="text-xs sm:text-sm md:text-base font-mono tracking-wide text-stone-300 leading-relaxed max-w-xl">
            {artifact.description}
          </p>

          {/* Metadata Quick Strip */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-1 sm:pt-2 text-[11px] sm:text-xs font-mono text-stone-400">
            <div>
              <span className="text-[8.5px] sm:text-[9px] uppercase tracking-widest text-stone-500 mr-1.5">CATEGORY:</span>
              <span className="text-stone-200 uppercase">{categoryLabel}</span>
            </div>
            <div>
              <span className="text-[8.5px] sm:text-[9px] uppercase tracking-widest text-stone-500 mr-1.5">INTRODUCED:</span>
              <span className="text-stone-200">PHASE {artifact.phaseIntroduced}</span>
            </div>
            <div>
              <span className="text-[8.5px] sm:text-[9px] uppercase tracking-widest text-stone-500 mr-1.5">PROVENANCE:</span>
              <span className="text-stone-200">{artifact.history.length} WIELDERS</span>
            </div>
          </div>

          {/* Scroll Prompt */}
          <div className="pt-4 sm:pt-6 flex items-center gap-2 text-[9.5px] sm:text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase text-stone-500 animate-pulse">
            <span>SCROLL FOR CAPABILITIES & PROVENANCE</span>
            <ChevronDown size={14} />
          </div>

        </div>

      </section>

      {/* 2. COSMIC CAPABILITIES CALLOUT BANNER */}
      <section className="relative z-10 w-full max-w-6xl px-4 sm:px-12 md:px-16 py-6">
        <div
          className="relative p-5 sm:p-7 bg-[#070709] border-l-4 rounded-r-2xl border border-stone-800/80 flex flex-col gap-2 max-w-4xl shadow-2xl"
          style={{ borderLeftColor: artifact.iconColor || "#fff" }}
        >
          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase text-stone-400">
            <Sparkles size={14} style={{ color: artifact.iconColor || "#fff" }} />
            <span>COSMIC CAPABILITIES & REALITY INFLUENCE</span>
          </div>
          <p className="text-xs sm:text-sm md:text-base font-mono text-stone-100 leading-relaxed">
            {artifact.power}
          </p>
        </div>
      </section>

      {/* 3. CHRONOLOGICAL WIELDER PROVENANCE TIMELINE */}
      <section className="relative z-10 w-full max-w-6xl px-4 sm:px-12 md:px-16 py-10 sm:py-16 flex flex-col gap-8 sm:gap-12">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 max-w-4xl">
          <h2 className="text-base sm:text-xl font-mono font-bold tracking-[0.16em] uppercase text-white">
            CHRONOLOGICAL WIELDER PROVENANCE
          </h2>
          <span className="text-[9.5px] sm:text-[10px] font-mono tracking-widest uppercase text-stone-500">
            {artifact.history.length} RECORDED BEARERS
          </span>
        </div>

        {/* Timeline Tree */}
        <div className="relative border-l border-white/10 ml-2 sm:ml-4 pl-6 sm:pl-10 flex flex-col gap-12 max-w-4xl">
          {artifact.history.map((h, idx) => (
            <div key={idx} className="relative flex flex-col gap-2.5 group">

              {/* Glowing Node Dot */}
              <span
                className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-black transition-transform group-hover:scale-125"
                style={{ backgroundColor: artifact.iconColor || "#fff" }}
              />

              {/* Metadata Tag */}
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] uppercase">
                <span className="text-stone-300 font-bold">
                  PHASE {h.phase}
                </span>
                <span className="text-stone-600">/</span>
                <span className="text-stone-400">{h.year}</span>
                <span className="text-stone-600">/</span>
                <span className="text-stone-500">{h.location}</span>
              </div>

              {/* Wielder Name */}
              <h3 className="text-xl sm:text-2xl font-mono font-bold tracking-wider text-white uppercase leading-snug">
                {h.holderName}
              </h3>

              {/* Event Description */}
              <p className="text-xs sm:text-sm font-mono tracking-wide text-stone-300 leading-relaxed max-w-3xl">
                {h.event}
              </p>

            </div>
          ))}
        </div>

      </section>

      {/* 4. CANON MCU APPEARANCES (If applicable) */}
      {movieEntries.length > 0 && (
        <section className="relative z-10 w-full max-w-6xl px-6 sm:px-12 md:px-16 py-12 flex flex-col gap-8">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 max-w-4xl">
            <h2 className="text-base sm:text-xl font-mono font-bold tracking-[0.16em] uppercase text-white">
              CANON MCU APPEARANCES
            </h2>
            <span className="text-[9.5px] sm:text-[10px] font-mono tracking-widest uppercase text-stone-500">
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
                    src={m.poster || MCU_POSTER_MAP[m.id]?.poster || `/images/posters/${m.id}.jpg`}
                    alt={m.title}
                    onError={(e) => {
                      const fallback = MCU_POSTER_MAP[m.id]?.poster || "https://image.tmdb.org/t/p/w780/78lPtwv72eTNqFW9COBYI0dWDJa.jpg";
                      if ((e.target as HTMLImageElement).src !== fallback) {
                        (e.target as HTMLImageElement).src = fallback;
                      }
                    }}
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

      {/* 5. FOOTER NAVIGATION (PREVIOUS / NEXT RELIC) */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 py-12 sm:py-16 flex flex-col gap-6 items-center">

        <div className="w-full flex items-center justify-between gap-4">
          {/* Previous Relic */}
          <Link
            href={`/artifacts/${prevArtifact.id}`}
            className="group flex items-center gap-2 sm:gap-3 text-stone-400 hover:text-white transition-colors max-w-[45%]"
          >
            <div className="p-2 sm:p-2.5 rounded-full bg-white/[0.03] border border-white/5 group-hover:border-white/20 transition-all shrink-0">
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-stone-500 truncate">PREVIOUS RELIC</span>
              <span className="text-[11px] sm:text-sm font-mono font-bold uppercase text-stone-200 group-hover:text-white truncate">{prevArtifact.name}</span>
            </div>
          </Link>

          {/* Next Relic */}
          <Link
            href={`/artifacts/${nextArtifact.id}`}
            className="group flex items-center justify-end gap-2 sm:gap-3 text-stone-400 hover:text-white transition-colors text-right max-w-[45%]"
          >
            <div className="flex flex-col min-w-0">
              <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-stone-500 truncate">NEXT RELIC</span>
              <span className="text-[11px] sm:text-sm font-mono font-bold uppercase text-stone-200 group-hover:text-white truncate">{nextArtifact.name}</span>
            </div>
            <div className="p-2 sm:p-2.5 rounded-full bg-white/[0.03] border border-white/5 group-hover:border-white/20 transition-all shrink-0">
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>

        {/* View All Relics */}
        <Link
          href="/artifacts"
          className="font-mono text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-stone-500 hover:text-white transition-colors cursor-pointer py-1"
        >
          VIEW ALL RELICS & ARTIFACTS
        </Link>

      </footer>

      {/* Global Slide Menu */}
      <SlideNavMenu isOpen={navMenuOpen} onClose={() => setNavMenuOpen(false)} />

    </div>
  );
}
