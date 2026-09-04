"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";
import { IronManHero } from "./IronManHero";
import { IronManCinematicReveal } from "./IronManCinematicReveal";
import { CHARACTERS, getCharacter } from "@/data/characters";
import { MCU } from "@/data/mcu";
import { getCharacterBackdrop } from "@/data/characterBackdrops";
import { MCU_POSTER_MAP } from "@/components/map/NodeArtwork";

export function TonyStarkExperience() {
  const router = useRouter();
  const character = getCharacter("iron-man") || CHARACTERS[0];

  const handleBack = () => {
    if (typeof window !== "undefined") {
      const savedRoute = sessionStorage.getItem("mcu_last_character_route");
      const currentPath = window.location.pathname + window.location.search;
      if (savedRoute && savedRoute !== currentPath && !savedRoute.startsWith("/characters/iron-man")) {
        router.push(savedRoute);
        return;
      }
      if (window.history.length > 1) {
        router.back();
        return;
      }
    }
    router.push("/characters/heros");
  };

  const movieEntries = useMemo(() => {
    return MCU.filter(
      (m) =>
        character.entries.includes(m.id) ||
        m.characters.includes(character.id)
    );
  }, [character]);

  const currentIndex = CHARACTERS.findIndex((c) => c.id === character.id);
  const prevCharacter = currentIndex > 0 ? CHARACTERS[currentIndex - 1] : CHARACTERS[CHARACTERS.length - 1];
  const nextCharacter = currentIndex < CHARACTERS.length - 1 ? CHARACTERS[currentIndex + 1] : CHARACTERS[0];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-black">
      <Navbar />
      <main>
        <IronManHero />
        <IronManCinematicReveal />

        {movieEntries.length > 0 && (
          <section className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-12 md:px-16 py-16 flex flex-col gap-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
              <h2 className="text-xl sm:text-2xl font-mono font-bold tracking-[0.16em] uppercase text-white">
                MCU CINEMATIC FILMOGRAPHY
              </h2>
              <span className="text-xs font-mono tracking-widest uppercase text-accent">
                {movieEntries.length} CANON TITLES
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {movieEntries.map((m) => (
                <Link
                  key={m.id}
                  href={`/movie/${m.id}`}
                  className="group flex flex-col gap-2.5 cursor-pointer"
                >
                  <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-stone-950 border border-white/10 shadow-lg group-hover:border-accent group-hover:shadow-[0_0_20px_rgba(212,162,47,0.3)] transition-all duration-300">
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
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-[9px] font-mono font-bold text-accent border border-accent/30">
                      P{m.phase}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-mono font-bold text-stone-200 group-hover:text-accent uppercase truncate transition-colors">
                      {m.title}
                    </span>
                    <span className="text-[10px] font-mono text-stone-500">
                      {m.year} &middot; {m.type.toUpperCase()}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Footer Navigation */}
        <footer className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 py-16 flex flex-col gap-8 items-center border-t border-white/10 mt-8">
          <div className="w-full flex items-center justify-between gap-4">
            <Link
              href={`/characters/${prevCharacter.id}`}
              className="group flex items-center gap-3 text-stone-400 hover:text-white transition-colors max-w-[45%]"
            >
              <div className="p-2.5 rounded-full bg-white/[0.03] border border-white/10 group-hover:border-accent transition-all shrink-0">
                <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform text-accent" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] font-mono uppercase tracking-widest text-stone-500 truncate">PREVIOUS</span>
                <span className="text-xs sm:text-sm font-mono font-bold uppercase text-stone-200 group-hover:text-white truncate">{prevCharacter.name}</span>
              </div>
            </Link>

            <Link
              href={`/characters/${nextCharacter.id}`}
              className="group flex items-center justify-end gap-3 text-stone-400 hover:text-white transition-colors text-right max-w-[45%]"
            >
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] font-mono uppercase tracking-widest text-stone-500 truncate">NEXT</span>
                <span className="text-xs sm:text-sm font-mono font-bold uppercase text-stone-200 group-hover:text-white truncate">{nextCharacter.name}</span>
              </div>
              <div className="p-2.5 rounded-full bg-white/[0.03] border border-white/10 group-hover:border-accent transition-all shrink-0">
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform text-accent" />
              </div>
            </Link>
          </div>

          <button
            onClick={handleBack}
            className="font-mono text-xs tracking-[0.25em] uppercase text-stone-500 hover:text-accent transition-colors cursor-pointer py-1"
          >
            RETURN TO ARCHIVE
          </button>
        </footer>
      </main>
    </div>
  );
}

export default TonyStarkExperience;
