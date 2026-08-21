"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import { CHARACTERS, type Character } from "@/data/characters";
import { getCharacterBackdrop } from "@/data/characterBackdrops";

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
      // 1. Precision Search Query Filter
      if (q) {
        const nameLower = c.name.toLowerCase();
        const aliasesLower = c.aliases.map((a) => a.toLowerCase());
        const idLower = c.id.toLowerCase();

        // Direct name / alias / ID match
        const nameMatch = nameLower.includes(q) || idLower.includes(q);
        const aliasMatch = aliasesLower.some((a) => a.includes(q));

        // Word-boundary check for role & faction (so searching "gor" matches "Gorr" but NOT "Wundagore")
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

      // 2. Faction filter
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
              "modok", "ebony-maw", "surtur", "bullseye", "taskmaster"
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
      // Prioritize exact name start / match
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
          
          {/* OPEN SPATIAL SEARCH & TEXT FILTERS (NO LINES) */}
          <div className="flex flex-col gap-6 pb-2">
            
            {/* Search Input with Clean Borderless Surface */}
            <div className="relative flex items-center bg-stone-950/60 px-4 py-3 rounded-none focus-within:bg-stone-900/60 transition-colors">
              <Search size={15} className="text-stone-500 shrink-0 mr-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH (NAME, ALIAS, FACTION)..."
                className="w-full bg-transparent text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-stone-100 placeholder:text-stone-600 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-stone-500 hover:text-stone-300 text-[10px] font-mono tracking-widest px-2 py-0.5 uppercase cursor-pointer"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Clean Minimal Text Filters */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              
              {/* Factions (No numbers) */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono tracking-widest uppercase">
                {FACTIONS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFaction(f.id)}
                    className={`transition-colors cursor-pointer py-1 ${
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

          {/* OPEN SPATIAL CINEMATIC GALLERY */}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredCharacters.map((character) => {
                const primaryAlias = character.aliases[0] || character.role.split(",")[0] || "OPERATIVE";
                const backdropUrl = getCharacterBackdrop(character.id);

                return (
                  <Link
                    key={character.id}
                    href={`/characters/${character.id}`}
                    className="group relative flex flex-col gap-3 transition-all duration-300 ease-out cursor-pointer"
                  >
                    
                    {/* FULL BLEED IMAGE WITH CINEMATIC GRADIENT (PORTRAIT ORIENTED FOR PERFECT FACE FRAMING) */}
                    <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-stone-950 rounded-xl border border-white/10 shadow-lg">
                      <img
                        src={backdropUrl}
                        alt={character.name}
                        className="w-full h-full object-cover object-[center_15%] filter brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-700 ease-out"
                      />

                      {/* Smooth Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />

                      {/* Role in Bottom Left of Image */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-stone-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                          {primaryAlias}
                        </span>
                      </div>
                    </div>

                    {/* OPEN TEXT AREA */}
                    <div className="flex flex-col gap-1">
                      
                      {/* Name */}
                      <h2 className="text-base font-mono font-bold tracking-[0.16em] uppercase text-white group-hover:text-stone-200 transition-colors">
                        {character.name}
                      </h2>

                      {/* Faction / Role */}
                      <div className="text-[10px] font-mono tracking-wider uppercase text-stone-500 line-clamp-1">
                        {character.faction.split("/")[0].trim()} · {character.role.split(",")[0].trim()}
                      </div>

                      {/* Action Link */}
                      <div className="pt-1 flex items-center gap-1.5 text-[10px] font-mono tracking-[0.2em] uppercase text-stone-500 group-hover:text-white transition-colors">
                        <span>EXPLORE</span>
                        <ArrowRight size={11} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>

                    </div>

                  </Link>
                );
              })}
            </div>
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
