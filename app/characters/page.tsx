"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import { CHARACTERS, type Character } from "@/data/characters";
import StampCharacterCard from "@/components/character/StampCharacterCard";

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
            fac.includes("threat") ||
            fac.includes("cabal") ||
            fac.includes("hand") ||
            c.id.includes("thanos") ||
            c.id.includes("loki") ||
            c.id.includes("kang") ||
            c.id.includes("ultron") ||
            c.id.includes("hela") ||
            c.id.includes("killmonger") ||
            c.id.includes("gor") ||
            c.id.includes("mysterio") ||
            c.id.includes("vulture") ||
            c.id.includes("green-goblin") ||
            c.id.includes("doc-ock") ||
            c.id.includes("dormammu") ||
            c.id.includes("wenwu") ||
            c.id.includes("kingpin") ||
            c.id.includes("high-evolutionary") ||
            c.id.includes("cassandra-nova");
          if (!isVillain) return false;
        }
        if (
          selectedFaction === "cosmic" &&
          !fac.includes("cosmic") &&
          !fac.includes("tva") &&
          !fac.includes("asgard") &&
          !fac.includes("nova") &&
          !fac.includes("eternals") &&
          !fac.includes("space") &&
          !role.includes("god") &&
          !role.includes("cosmic") &&
          !role.includes("watcher")
        )
          return false;
      }

      return true;
    });
  }, [searchQuery, selectedFaction]);

  return (
    <PageShell backHref="/timeline" backLabel="TIMELINE">
      <div className="relative min-h-[calc(100vh-80px)] w-full bg-[#000000] text-stone-300 font-sans selection:bg-white selection:text-black">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 flex flex-col gap-8">

          {/* 1. TOP SEARCH & CONTROLS */}
          <div className="flex flex-col gap-5 pb-2">

            {/* Top Bar: Title & Search Input */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 w-full">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono tracking-[0.25em] text-stone-400 uppercase font-bold">
                  ARCHIVES · {filteredCharacters.length} HEROES & VILLAINS
                </span>
              </div>

              {/* Fixed-length Search Input Bar */}
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

          {/* 2. CHARACTER TICKET CARDS GRID */}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
              {filteredCharacters.map((character, index) => (
                <StampCharacterCard
                  key={character.id}
                  character={character}
                  index={index}
                />
              ))}
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
