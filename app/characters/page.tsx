"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ArrowRight, Eye, EyeOff } from "lucide-react";
import PageShell from "@/components/PageShell";
import { CHARACTERS, type Character } from "@/data/characters";
import { getCharacterBackdrop } from "@/data/characterBackdrops";
import { Scene } from "@/components/Scene";

const FACTIONS = [
  { id: "all", label: "ALL" },
  { id: "avengers", label: "AVENGERS" },
  { id: "guardians", label: "GUARDIANS" },
  { id: "multiverse", label: "MULTIVERSE & MUTANTS" },
  { id: "street", label: "STREET LEVEL" },
  { id: "thunderbolts", label: "THUNDERBOLTS*" },
  { id: "villains", label: "VILLAINS & THREATS" },
  { id: "cosmic", label: "COSMIC & TVA" },
];

function CharactersContent() {
  const searchParams = useSearchParams();
  const paramFaction = searchParams.get("faction");
  const paramQuery = searchParams.get("q");

  const [searchQuery, setSearchQuery] = useState(paramQuery || "");
  const [selectedFaction, setSelectedFaction] = useState(paramFaction || "all");
  const [showSpinWheel, setShowSpinWheel] = useState(true);

  useEffect(() => {
    if (paramFaction) {
      setSelectedFaction(paramFaction);
    } else {
      setSelectedFaction("all");
    }
    if (paramQuery !== null) {
      setSearchQuery(paramQuery);
    }
  }, [paramFaction, paramQuery]);

  const filteredCharacters = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return CHARACTERS.filter((c) => {

      if (q) {
        const nameLower = c.name.toLowerCase();
        const aliasesLower = c.aliases.map((a) => a.toLowerCase());
        const idLower = c.id.toLowerCase();

        const nameMatch = nameLower.includes(q) || idLower.includes(q);
        const aliasMatch = aliasesLower.some((a) => a.includes(q));

        const queryWords = q.split(/\s+/).filter(Boolean);
        const factionWords = c.faction.toLowerCase().split(/[\s/,-]+/).filter(Boolean);
        const roleWords = c.role.toLowerCase().split(/[\s/,-]+/).filter(Boolean);

        const factionMatch = queryWords.every((qw) =>
          factionWords.some((fw) => fw.startsWith(qw) || fw === qw)
        );

        const roleMatch = queryWords.every((qw) =>
          roleWords.some((rw) => rw.startsWith(qw) || rw === qw)
        );

        if (!nameMatch && !aliasMatch && !factionMatch && !roleMatch) {
          return false;
        }
      }

      if (selectedFaction !== "all") {
        const fac = c.faction.toLowerCase();
        const role = c.role.toLowerCase();
        const uni = c.universe.toLowerCase();

        if (selectedFaction === "avengers" && !fac.includes("avenger")) return false;
        if (selectedFaction === "guardians" && !fac.includes("guardian")) return false;
        if (
          selectedFaction === "multiverse" &&
          !fac.includes("x-men") &&
          !fac.includes("spider-hero") &&
          !fac.includes("fantastic four") &&
          !fac.includes("illuminati") &&
          !fac.includes("brotherhood") &&
          !fac.includes("void") &&
          !role.includes("mutant") &&
          !role.includes("elastic") &&
          !role.includes("force field") &&
          !uni.includes("838") &&
          !uni.includes("10005") &&
          !uni.includes("96283") &&
          !uni.includes("120703") &&
          !uni.includes("alternate")
        )
          return false;
        if (
          selectedFaction === "street" &&
          !fac.includes("defender") &&
          !fac.includes("fisk") &&
          !fac.includes("independent") &&
          !c.id.includes("daredevil") &&
          !c.id.includes("punisher") &&
          !c.id.includes("kingpin")
        )
          return false;
        if (selectedFaction === "thunderbolts" && !fac.includes("thunderbolts")) return false;
        if (selectedFaction === "villains") {
          const isVillain =
            role.includes("villain") ||
            role.includes("titan") ||
            role.includes("conqueror") ||
            role.includes("warlord") ||
            role.includes("sorcer") ||
            role.includes("mastermind") ||
            role.includes("zealot") ||
            role.includes("geneticist") ||
            fac.includes("hydra") ||
            fac.includes("shadow realm") ||
            fac.includes("orgocorp") ||
            fac.includes("ten rings") ||
            fac.includes("salem") ||
            fac.includes("fisk") ||
            fac.includes("kree") ||
            fac.includes("void") ||
            fac.includes("sentries") ||
            fac.includes("black order") ||
            [
              "thanos", "kang-the-conqueror", "doctor-doom", "ultron", "green-goblin",
              "doc-ock", "hela", "killmonger", "namor", "red-skull", "gorr", "mysterio",
              "vulture", "wenwu", "agatha-harkness", "high-evolutionary", "kingpin",
              "red-hulk", "zemo", "ronan", "cassandra-nova", "dormammu", "abomination",
              "ego", "the-leader", "baron-mordo", "electro", "sandman", "lizard",
              "modok", "ebony-maw", "surtur", "bullseye", "taskmaster", "juggernaut", "pyro", "sabretooth", "black-bolt", "the-collector", "grandmaster", "proxima-midnight", "corvus-glaive", "crossbones", "arnim-zola", "justin-hammer", "malekith", "kaecilius", "he-who-remains"
            ].includes(c.id);
          if (!isVillain) return false;
        }
        if (
          selectedFaction === "cosmic" &&
          !fac.includes("tva") &&
          !fac.includes("yggdrasil") &&
          !fac.includes("watcher") &&
          !fac.includes("masters") &&
          !fac.includes("asgard") &&
          !c.id.includes("loki") &&
          !c.id.includes("watcher") &&
          !c.id.includes("america-chavez")
        )
          return false;
      }

      return true;
    }).sort((a, b) => {
      if (!q) return 0;

      const aNameStart = a.name.toLowerCase().startsWith(q) || a.aliases.some((al) => al.toLowerCase().startsWith(q));
      const bNameStart = b.name.toLowerCase().startsWith(q) || b.aliases.some((al) => al.toLowerCase().startsWith(q));
      if (aNameStart && !bNameStart) return -1;
      if (!aNameStart && bNameStart) return 1;
      return 0;
    });
  }, [searchQuery, selectedFaction]);

  return (
    <PageShell backHref="/timeline" backLabel="TIMELINE">
      <div className="relative min-h-[calc(100vh-80px)] w-full bg-[#000000] text-stone-300 font-sans selection:bg-white selection:text-black">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 flex flex-col gap-8">

          {/* 1. TOP SEARCH & CONTROLS */}
          <div className="flex flex-col gap-5 pb-2">

            {/* Top Bar: View Spin Wheel Toggle (Left) + Search Input (Right) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 w-full">
              
              {/* 3D Wheel Toggle (Left, Clean Glass UI with Eye Icon) */}
              <button
                onClick={() => setShowSpinWheel(!showSpinWheel)}
                title={showSpinWheel ? "Hide 3D Wheel" : "View 3D Wheel"}
                className={`flex items-center justify-center gap-2 bg-white/[0.04] border ${
                  showSpinWheel ? "border-white/30 text-white bg-white/[0.08]" : "border-white/10 text-stone-400"
                } hover:border-white/40 hover:bg-white/[0.10] px-4 py-2 sm:py-2.5 rounded-full transition-all text-[11px] sm:text-xs font-mono tracking-[0.16em] uppercase cursor-pointer shrink-0`}
              >
                {showSpinWheel ? (
                  <Eye size={14} className="text-stone-200" />
                ) : (
                  <EyeOff size={14} className="text-stone-500" />
                )}
                <span>3D WHEEL</span>
              </button>

              {/* Fixed-length Search Input Bar (Right) */}
              <div className="relative w-full sm:w-80 md:w-96 flex items-center bg-white/[0.04] border border-white/10 px-4 py-2 sm:py-2.5 rounded-full focus-within:border-white/30 transition-all">
                <Search size={14} className="text-stone-400 shrink-0 mr-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH CHARACTERS..."
                  className="w-full bg-transparent text-[11px] sm:text-xs font-mono tracking-[0.16em] uppercase text-stone-100 placeholder:text-stone-500 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-stone-400 hover:text-stone-200 text-[9.5px] font-mono tracking-widest px-2 py-0.5 uppercase cursor-pointer"
                  >
                    CLEAR
                  </button>
                )}
              </div>

            </div>

            {/* Faction Filter Buttons */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-nowrap overflow-x-auto pb-1.5 px-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap items-center gap-4 sm:gap-6 text-[11px] sm:text-xs font-mono tracking-wider uppercase">
                {FACTIONS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFaction(f.id)}
                    className={`transition-colors cursor-pointer py-1 shrink-0 whitespace-nowrap ${
                      selectedFaction === f.id
                        ? "text-white font-bold"
                        : "text-stone-500 hover:text-stone-300"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* 2. MAIN VIEW: EITHER 3D PERSPECTIVE WHEEL OR CHARACTER GRID CARDS */}
          {showSpinWheel ? (
            <div className="relative w-full overflow-hidden bg-black border-0 shadow-none transition-all duration-500">
              <Scene characters={filteredCharacters} />
            </div>
          ) : (
            <>
              {filteredCharacters.length === 0 ? (
                <div className="text-center py-28">
                  <h3 className="text-sm font-mono tracking-[0.3em] uppercase text-stone-300 font-bold">
                    NO RECORDS FOUND
                  </h3>
                  <p className="text-xs font-mono tracking-wide text-stone-500 mt-1.5 max-w-sm mx-auto">
                    No record matches the active query parameters.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedFaction("all");
                    }}
                    className="mt-5 text-stone-300 hover:text-white text-[10px] font-mono tracking-widest uppercase cursor-pointer"
                  >
                    RESET FILTERS
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                  {filteredCharacters.map((character) => {
                    const primaryAlias = character.aliases[0] || character.role.split(",")[0] || "OPERATIVE";
                    const backdropUrl = getCharacterBackdrop(character.id);

                    return (
                      <Link
                        key={character.id}
                        href={`/characters/${character.id}`}
                        className="group relative flex flex-col gap-2 sm:gap-3 transition-all duration-300 ease-out cursor-pointer"
                      >

                        {}
                        <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-stone-950 rounded-xl border border-white/5 shadow-2xl">
                          <img
                            src={backdropUrl}
                            alt={character.name}
                            className="w-full h-full object-cover object-[center_15%] filter brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-700 ease-out"
                          />

                          {}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />
                        </div>

                        {}
                        <div className="flex flex-col gap-0.5 sm:gap-1">

                          {}
                          <h2 className="text-xs sm:text-base font-mono font-bold tracking-wider uppercase text-white group-hover:text-stone-200 transition-colors line-clamp-1">
                            {character.name}
                          </h2>

                          {}
                          <div className="text-[9px] sm:text-[10px] font-mono tracking-wider uppercase text-stone-400 line-clamp-1">
                            {primaryAlias !== character.name ? `${primaryAlias} · ` : ""}{character.faction.split("/")[0].trim()}
                          </div>

                          {}
                          <div className="pt-0.5 sm:pt-1 flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] font-mono tracking-[0.16em] sm:tracking-[0.2em] uppercase text-stone-500 group-hover:text-white transition-colors">
                            <span>EXPLORE</span>
                            <ArrowRight size={10} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                          </div>

                        </div>

                      </Link>
                    );
                  })}
                </div>
              )}
            </>
          )}

        </div>

      </div>
    </PageShell>
  );
}

export default function CharactersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <CharactersContent />
    </Suspense>
  );
}
