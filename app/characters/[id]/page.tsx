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
import { CHARACTERS, getCharacter } from "@/data/characters";
import { MCU } from "@/data/mcu";
import { getCharacterAvatar, getCharacterBackdrop } from "@/data/characterBackdrops";
import { MCU_POSTER_MAP } from "@/components/map/NodeArtwork";
import SlideNavMenu from "@/components/dark/SlideNavMenu";
import { TonyStarkExperience } from "@/components/ironman/TonyStarkExperience";
import { CosmicEntityExperience } from "@/components/villains/CosmicEntityExperience";
import { getTopTierVillain } from "@/data/topTierVillains";

function StandardCharacterDetail({ characterId }: { characterId: string }) {
  const router = useRouter();
  const character = getCharacter(characterId);
  if (!character) notFound();

  const handleBack = () => {
    if (typeof window !== "undefined") {
      const savedRoute = sessionStorage.getItem("mcu_last_character_route");
      if (savedRoute) {
        router.push(savedRoute);
        return;
      }
      if (window.history.length > 1) {
        router.back();
        return;
      }
    }
    router.push("/characters");
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

  const movieEntries = useMemo(() => {
    const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
    const charEntriesNorm = (character.entries || []).map(normalize);
    const charIdNorm = normalize(character.id);

    return MCU.filter((m) => {
      const mIdNorm = normalize(m.id);
      const mTitleNorm = normalize(m.title);
      const directMatch = charEntriesNorm.some(
        (e) => e === mIdNorm || mIdNorm.includes(e) || e.includes(mIdNorm) || e === mTitleNorm
      );
      const characterMatch = (m.characters || []).some(
        (c) => normalize(c) === charIdNorm || normalize(c).includes(charIdNorm) || charIdNorm.includes(normalize(c))
      );
      return directMatch || characterMatch;
    });
  }, [character]);

  const currentIndex = CHARACTERS.findIndex((c) => c.id === character.id);
  const prevCharacter = currentIndex > 0 ? CHARACTERS[currentIndex - 1] : CHARACTERS[CHARACTERS.length - 1];
  const nextCharacter = currentIndex < CHARACTERS.length - 1 ? CHARACTERS[currentIndex + 1] : CHARACTERS[0];

  const characterFacePortrait = getCharacterAvatar(character.id);

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

        <button
          onClick={handleBack}
          className="text-stone-300 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer pointer-events-auto"
          title="Return to Characters Archive (Esc)"
        >
          <X size={18} strokeWidth={1.5} />
        </button>
      </header>

      <section className="relative w-full min-h-[90vh] sm:min-h-[95vh] flex flex-col justify-end pt-28 sm:pt-36 pb-10 sm:pb-16 px-4 sm:px-12 md:px-16 overflow-hidden">
        
        <div
          className="fixed top-24 sm:top-28 right-6 sm:right-16 md:right-24 lg:right-32 xl:right-40 w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px] aspect-[2/3] z-30 overflow-hidden rounded-2xl border border-white/15 bg-stone-950 shadow-[0_25px_70px_rgba(0,0,0,0.95)] pointer-events-none hidden sm:block transition-all duration-300"
        >
          <img
            src={characterFacePortrait}
            alt={character.name}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="sm:hidden absolute top-0 right-0 w-full h-[50vh] z-0 overflow-hidden pointer-events-none">
          <img
            src={characterFacePortrait}
            alt={character.name}
            className="w-full h-full object-contain object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-20 max-w-xl lg:max-w-2xl flex flex-col gap-3.5 sm:gap-5 mt-auto pt-6 sm:pt-12">

          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[9px] sm:text-[11px] font-mono tracking-wider uppercase text-stone-400">
            <span>{character.universe.split("/")[0].trim()}</span>
            <span className="text-stone-600">/</span>
            <span>{character.faction.split(",")[0].trim()}</span>
            <span className="text-stone-600">/</span>
            <span className="text-white font-semibold">{character.aliases[0] || character.role.split(",")[0] || "OPERATIVE"}</span>
          </div>

          <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-mono font-bold tracking-[0.08em] xs:tracking-[0.12em] uppercase text-white leading-tight drop-shadow-2xl">
            {character.name}
          </h1>

          <p className="text-xs sm:text-sm md:text-base font-mono tracking-wide text-stone-300 leading-relaxed max-w-xl">
            {character.overview}
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-1 sm:pt-2 text-[11px] sm:text-xs font-mono text-stone-400">
            <div>
              <span className="text-[8.5px] sm:text-[9px] uppercase tracking-widest text-stone-500 mr-1.5">ROLE:</span>
              <span className="text-stone-200">{character.role}</span>
            </div>
            <div>
              <span className="text-[8.5px] sm:text-[9px] uppercase tracking-widest text-stone-500 mr-1.5">FIRST SEEN:</span>
              <span className="text-stone-200">{character.firstAppearance}</span>
            </div>
            <div>
              <span className="text-[8.5px] sm:text-[9px] uppercase tracking-widest text-stone-500 mr-1.5">APPEARANCES:</span>
              <span className="text-stone-200">{movieEntries.length} MCU TITLES</span>
            </div>
          </div>

          <div className="pt-4 sm:pt-6 flex items-center gap-2 text-[9.5px] sm:text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase text-stone-500 animate-pulse">
            <span>SCROLL FOR MCU TIMELINE CHRONOLOGY</span>
            <ChevronDown size={14} />
          </div>

        </div>

      </section>

      <section className="relative z-10 w-full max-w-6xl px-4 sm:px-12 md:px-16 py-10 sm:py-16 flex flex-col gap-8 sm:gap-12">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 max-w-4xl">
          <h2 className="text-base sm:text-xl font-mono font-bold tracking-[0.16em] uppercase text-white">
            MCU CHRONOLOGICAL TIMELINE
          </h2>
          <span className="text-[9.5px] sm:text-[10px] font-mono tracking-widest uppercase text-stone-500">
            {character.eras.length} RECORDED ERAS
          </span>
        </div>

        <div className="relative border-l border-white/10 ml-2 sm:ml-4 pl-6 sm:pl-10 flex flex-col gap-16 max-w-4xl">
          {character.eras.map((era, idx) => {
            const eraBackdrop = getCharacterBackdrop(character.id, era.eraId, era.phase);

            return (
              <div key={era.eraId || idx} className="relative flex flex-col gap-4 group">

                <span className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-black border-2 border-stone-500 group-hover:border-white transition-colors" />

                <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] uppercase">
                  <span className="text-stone-300 font-bold">
                    PHASE {era.phase}
                  </span>
                  <span className="text-stone-600">/</span>
                  <span className="text-stone-400">{era.year}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-mono font-bold tracking-wider text-white uppercase leading-snug">
                  {era.title}
                </h3>

                <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden bg-stone-950 border border-white/10 shadow-2xl my-2">
                  <img
                    src={eraBackdrop}
                    alt={era.title}
                    className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>

                <p className="text-xs sm:text-sm font-mono tracking-wide text-stone-300 leading-relaxed max-w-3xl">
                  {era.description}
                </p>

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

      <footer className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 py-12 sm:py-16 flex flex-col gap-6 items-center">

        <div className="w-full flex items-center justify-between gap-4">
          <Link
            href={`/characters/${prevCharacter.id}`}
            className="group flex items-center gap-2 sm:gap-3 text-stone-400 hover:text-white transition-colors max-w-[45%]"
          >
            <div className="p-2 sm:p-2.5 rounded-full bg-white/[0.03] border border-white/5 group-hover:border-white/20 transition-all shrink-0">
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-stone-500 truncate">PREVIOUS</span>
              <span className="text-[11px] sm:text-sm font-mono font-bold uppercase text-stone-200 group-hover:text-white truncate">{prevCharacter.name}</span>
            </div>
          </Link>

          <Link
            href={`/characters/${nextCharacter.id}`}
            className="group flex items-center justify-end gap-2 sm:gap-3 text-stone-400 hover:text-white transition-colors text-right max-w-[45%]"
          >
            <div className="flex flex-col min-w-0">
              <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-stone-500 truncate">NEXT</span>
              <span className="text-[11px] sm:text-sm font-mono font-bold uppercase text-stone-200 group-hover:text-white truncate">{nextCharacter.name}</span>
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

export default function CharacterDetailPage({ params }: { params: { id: string } }) {
  const topTierEntity = getTopTierVillain(params.id);
  if (topTierEntity) {
    return <CosmicEntityExperience entity={topTierEntity} />;
  }

  if (params.id === "iron-man" || params.id === "tony-stark") {
    return <TonyStarkExperience />;
  }

  return <StandardCharacterDetail characterId={params.id} />;
}
