"use client";

import React, { useState, useMemo, useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import {
  X,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Menu
} from "lucide-react";
import { ARTIFACTS, getArtifact } from "@/data/artifacts";
import { MCU } from "@/data/mcu";
import { MCU_POSTER_MAP } from "@/components/map/NodeArtwork";
import SlideNavMenu from "@/components/dark/SlideNavMenu";
import BackgroundStarfield from "@/components/ui/BackgroundStarfield";

export default function ArtifactDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const artifact = getArtifact(params.id);
  if (!artifact) notFound();

  const handleBack = () => {
    router.push("/artifacts");
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

    // Direct mapping for iconic artifacts like Space Stone / Tesseract
    const explicitMap: Record<string, string[]> = {
      "space-stone": ["captain-america-first-avenger", "the-avengers", "thor-dark-world", "thor-ragnarok", "infinity-war", "endgame", "captain-marvel"],
      "mind-stone": ["the-avengers", "age-of-ultron", "captain-america-civil-war", "infinity-war", "endgame", "wandavision"],
      "reality-stone": ["thor-dark-world", "infinity-war", "endgame"],
      "power-stone": ["gotg", "infinity-war", "endgame"],
      "time-stone": ["doctor-strange", "thor-ragnarok", "infinity-war", "endgame", "doctor-strange-multiverse"],
      "soul-stone": ["infinity-war", "endgame"],
      "ten-rings": ["iron-man", "shang-chi"],
      "mjolnir": ["thor", "the-avengers", "thor-dark-world", "age-of-ultron", "thor-ragnarok", "endgame", "thor-love-thunder"],
      "stormbreaker": ["infinity-war", "endgame", "thor-love-thunder"],
      "cloak-of-levitation": ["doctor-strange", "thor-ragnarok", "infinity-war", "endgame", "spiderman-no-way-home", "doctor-strange-multiverse"],
      "eye-of-agamotto": ["doctor-strange", "thor-ragnarok", "infinity-war", "endgame", "spiderman-no-way-home", "doctor-strange-multiverse"],
      "the-darkhold": ["wandavision", "doctor-strange-multiverse"],
      "book-of-vishanti": ["doctor-strange-multiverse"]
    };

    if (explicitMap[artifact.id]) {
      const targetIds = new Set(explicitMap[artifact.id].map(normalize));
      return MCU.filter((m) => {
        const mIdNorm = normalize(m.id);
        return targetIds.has(mIdNorm);
      });
    }

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
    }).slice(0, 10);
  }, [artifact]);

  const primaryOrigin = artifact.origin.split("/")[0].trim();
  const categoryLabel = artifact.category.replace(/_/g, " ");
  const artifactFacePortrait = artifact.backdrop || `/images/artifacts/${artifact.id}.jpg`;

  return (
    <div className="relative min-h-screen w-full bg-[#000000] text-stone-200 font-sans selection:bg-white selection:text-black overflow-x-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <BackgroundStarfield />

      <div className="navbar-blur-fade" aria-hidden="true" />

      {/* HEADER */}
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

        <Link
          href="/artifacts"
          className="text-stone-300 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer pointer-events-auto select-none outline-none focus:outline-none"
          title="Return to Relics Archive (Esc)"
        >
          <X size={18} strokeWidth={1.5} />
        </Link>
      </header>

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[90vh] sm:min-h-[95vh] flex flex-col justify-end pt-28 sm:pt-36 pb-10 sm:pb-16 px-4 sm:px-12 md:px-16 overflow-hidden">
        
        {/* Standalone Poster Frame on Right (Fixed in viewport, matching Doctor Strange / Character layout) */}
        <div
          className="fixed top-24 sm:top-28 right-6 sm:right-16 md:right-24 lg:right-32 xl:right-40 w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px] aspect-[2/3] z-30 overflow-hidden rounded-2xl border border-white/15 bg-stone-950 shadow-[0_25px_70px_rgba(0,0,0,0.95)] pointer-events-none hidden sm:block transition-all duration-300"
        >
          <img
            src={artifactFacePortrait}
            alt={artifact.name}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Mobile Background Fallback */}
        <div className="sm:hidden absolute top-0 right-0 w-full h-[50vh] z-0 overflow-hidden pointer-events-none">
          <img
            src={artifactFacePortrait}
            alt={artifact.name}
            className="w-full h-full object-contain object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        {/* Hero Bio Container (Fixed at bottom-left exactly as requested) */}
        <div className="relative z-20 max-w-2xl lg:max-w-3xl xl:max-w-4xl flex flex-col gap-3.5 sm:gap-5 mt-auto pt-6 sm:pt-12">

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

          {/* Artifact Name (Single Line Scaling) */}
          <h1 className={`font-mono font-bold uppercase text-white leading-tight drop-shadow-2xl whitespace-nowrap ${
            artifact.name.length > 22
              ? "text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.02em] sm:tracking-[0.04em]"
              : artifact.name.length > 14
              ? "text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.04em] sm:tracking-[0.06em]"
              : "text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.06em] sm:tracking-[0.1em]"
          }`}>
            {artifact.name}
          </h1>

          {/* Overview Lore */}
          <p className="text-xs sm:text-sm md:text-base font-mono tracking-wide text-stone-300 leading-relaxed max-w-xl">
            {artifact.description}
          </p>

          {/* Summary Metric Stats */}
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
              <span className="text-stone-200">{artifact.history.length} RECORDED ERAS</span>
            </div>
          </div>

          {/* Smooth Scroll Cue */}
          <div className="pt-4 sm:pt-6 flex items-center gap-2 text-[9.5px] sm:text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase text-stone-500 animate-pulse">
            <span>SCROLL FOR MCU TIMELINE CHRONOLOGY</span>
            <ChevronDown size={14} />
          </div>

        </div>

      </section>

      {/* CHRONOLOGICAL WIELDER PROVENANCE TIMELINE */}
      <section className="relative z-10 w-full max-w-6xl px-4 sm:px-12 md:px-16 py-10 sm:py-16 flex flex-col gap-8 sm:gap-12">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 max-w-4xl">
          <h2 className="text-base sm:text-xl font-mono font-bold tracking-[0.16em] uppercase text-white">
            MCU CHRONOLOGICAL TIMELINE
          </h2>
          <span className="text-[9.5px] sm:text-[10px] font-mono tracking-widest uppercase text-stone-500">
            {artifact.history.length} RECORDED ERAS
          </span>
        </div>

        <div className="relative border-l border-white/10 ml-2 sm:ml-4 pl-6 sm:pl-10 flex flex-col gap-12 sm:gap-14 max-w-4xl">
          {artifact.history.map((h, idx) => (
            <div key={idx} className="relative flex flex-col gap-3 group">

              {/* Glowing Node Dot */}
              <span
                className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-black border-2 transition-colors"
                style={{ borderColor: artifact.iconColor || "#fff" }}
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

              {/* Wielder / Era Title */}
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

      {/* CANON MCU FILMOGRAPHY */}
      {movieEntries.length > 0 && (
        <section className="relative z-10 w-full max-w-6xl px-6 sm:px-12 md:px-16 py-12 flex flex-col gap-8">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 max-w-4xl">
            <h2 className="text-base sm:text-xl font-mono font-bold tracking-[0.16em] uppercase text-white">
              MCU CINEMATIC FILMOGRAPHY
            </h2>
            <span className="text-[9.5px] sm:text-[10px] font-mono tracking-widest uppercase text-stone-500">
              {movieEntries.length} CANON TITLES
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 max-w-4xl">
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

      {/* FOOTER NAVIGATION (PREVIOUS / NEXT RELIC - Left aligned to max-w-4xl) */}
      <footer className="relative z-10 w-full max-w-4xl px-4 sm:px-12 md:px-16 py-12 sm:py-16 flex flex-col gap-8 items-start">
        <div className="w-full flex items-center justify-between gap-4 border-t border-white/10 pt-8">
          {/* Previous Relic */}
          <Link
            href={`/artifacts/${prevArtifact.id}`}
            className="group flex items-center gap-2 sm:gap-3 text-stone-400 hover:text-white transition-colors max-w-[48%]"
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
            className="group flex items-center justify-end gap-2 sm:gap-3 text-stone-400 hover:text-white transition-colors text-right max-w-[48%]"
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
      </footer>

      {/* Global Slide Menu */}
      <SlideNavMenu isOpen={navMenuOpen} onClose={() => setNavMenuOpen(false)} />

    </div>
  );
}
