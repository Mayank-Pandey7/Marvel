"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import { CHARACTERS, type Character } from "@/data/characters";
import StampCharacterCard from "@/components/character/StampCharacterCard";
import { LineNav, type LineNavItem } from "@/components/line-nav";

export const VILLAIN_IDS = new Set([
  "the-one-above-all", "the-beyonder", "the-one-below-all", "the-living-tribunal",
  "god-emperor-doom", "molecule-man", "knull", "king-in-black", "dormammu", "mephisto",
  "onslaught", "apocalypse", "annihilus", "galactus", "gorr", "gor", "sentry",
  "thanos", "kang-the-conqueror", "kang", "doctor-doom", "ultron", "hela", "killmonger",
  "namor", "red-skull", "mysterio", "vulture", "wenwu", "agatha-harkness",
  "high-evolutionary", "red-hulk", "zemo", "ronan", "cassandra-nova", "green-goblin",
  "doc-ock", "electro", "sandman", "lizard", "magneto", "mystique", "sabretooth",
  "juggernaut", "pyro", "toad", "kingpin", "bullseye", "alexander-pierce", "kaecilius",
  "malekith", "yellowjacket", "obadiah-stane", "iron-monger", "aldrich-killian",
  "justin-hammer", "whiplash", "abomination", "dar-benn", "gravik", "titania", "ego",
  "dreykov", "crossbones", "arnim-zola", "ebony-maw", "corvus-glaive", "proxima-midnight",
  "cull-obsidian", "infinity-ultron", "zombie-thanos", "zombie-scarlet-witch", "kro",
  "supreme-intelligence", "yon-rogg", "modok", "loki"
]);

export function isVillainCharacter(c: Character): boolean {
  return VILLAIN_IDS.has(c.id.toLowerCase());
}

export const HERO_FACTIONS = [
  { id: "heroes", label: "ALL HEROES", badge: "SACRED DEFENDERS", title: "ALL HEROES & ALLIES" },
  { id: "avengers", label: "AVENGERS", badge: "EARTH'S MIGHTIEST", title: "THE AVENGERS INITIATIVE" },
  { id: "guardians", label: "GUARDIANS", badge: "COSMIC OUTLAWS", title: "GUARDIANS OF THE GALAXY" },
  { id: "xmen", label: "MUTANTS & X-MEN", badge: "CHILDREN OF THE ATOM", title: "MUTANTS & X-MEN" },
  { id: "multiverse", label: "MULTIVERSE & F4", badge: "FIRST FAMILY & INVERSIONS", title: "FANTASTIC FOUR & MULTIVERSE" },
  { id: "street", label: "STREET LEVEL", badge: "MIDTOWN & HELL'S KITCHEN", title: "DEFENDERS & STREET HEROES" },
  { id: "thunderbolts", label: "THUNDERBOLTS*", badge: "GOVERNMENT OPERATIVES", title: "THUNDERBOLTS* & ANTI-HEROES" },
  { id: "cosmic", label: "COSMIC & TVA", badge: "TEMPORAL & CELESTIAL", title: "COSMIC GUARDIANS & TVA" },
];

export const VILLAIN_FACTIONS = [
  { id: "villains", label: "ALL VILLAINS", badge: "UNIVERSAL THREATS", title: "ALL VILLAINS & THREATS" },
  { id: "cosmic", label: "COSMIC & GODHEADS", badge: "CELESTIAL LEVEL", title: "COSMIC ENTITIES & GODHEADS" },
  { id: "multiverse", label: "MULTIVERSE & INCURSIONS", badge: "INCURSION CATACLYSM", title: "MULTIVERSE & DIMENSIONAL THREATS" },
  { id: "xmen", label: "MUTANT THREATS", badge: "BROTHERHOOD & VOID", title: "MUTANT & FOX-VERSE THREATS" },
  { id: "street", label: "STREET & UNDERWORLD", badge: "UNDERWORLD SYNDICATE", title: "STREET & SYNDICATE THREATS" },
  { id: "avengers", label: "AVENGERS ADVERSARIES", badge: "MASTERMINDS & WARLORDS", title: "AVENGERS MASTERMINDS & NEMESES" },
];

export const ALL_FACTIONS = [
  { id: "all", label: "ALL CHARACTERS", badge: "ALL ROSTERS", title: "ALL HEROES & VILLAINS" },
  { id: "avengers", label: "AVENGERS", badge: "EARTH'S MIGHTIEST", title: "THE AVENGERS INITIATIVE" },
  { id: "guardians", label: "GUARDIANS", badge: "COSMIC OUTLAWS", title: "GUARDIANS OF THE GALAXY" },
  { id: "xmen", label: "MUTANTS & X-MEN", badge: "CHILDREN OF THE ATOM", title: "MUTANTS & X-MEN" },
  { id: "multiverse", label: "MULTIVERSE & F4", badge: "FIRST FAMILY & INVERSIONS", title: "FANTASTIC FOUR & MULTIVERSE" },
  { id: "street", label: "STREET LEVEL", badge: "MIDTOWN & HELL'S KITCHEN", title: "DEFENDERS & STREET HEROES" },
  { id: "thunderbolts", label: "THUNDERBOLTS*", badge: "GOVERNMENT OPERATIVES", title: "THUNDERBOLTS* & ANTI-HEROES" },
  { id: "cosmic", label: "COSMIC & TVA", badge: "TEMPORAL & CELESTIAL", title: "COSMIC GUARDIANS & TVA" },
];

export function getCharacterPrimaryFaction(characterId: string, isVillain: boolean): string {
  const id = characterId.toLowerCase();
  if (isVillain) {
    if (
      [
        "the-one-above-all", "the-beyonder", "the-one-below-all", "the-living-tribunal",
        "god-emperor-doom", "molecule-man", "knull", "king-in-black", "dormammu",
        "mephisto", "annihilus", "galactus", "gorr", "gor", "sentry", "ego", "ronan",
        "malekith", "kro", "supreme-intelligence"
      ].includes(id)
    ) {
      return "cosmic";
    }
    if (
      [
        "kang-the-conqueror", "kang", "cassandra-nova", "green-goblin", "doc-ock",
        "electro", "sandman", "lizard", "infinity-ultron", "zombie-thanos", "zombie-scarlet-witch"
      ].includes(id)
    ) {
      return "multiverse";
    }
    if (["magneto", "onslaught", "apocalypse", "mystique", "sabretooth", "juggernaut", "pyro", "toad"].includes(id)) {
      return "xmen";
    }
    if (["kingpin", "bullseye", "titania"].includes(id)) {
      return "street";
    }
    return "avengers";
  } else {
    if (
      [
        "star-lord", "rocket-raccoon", "gamora", "groot", "drax", "nebula",
        "mantis", "yondu", "adam-warlock", "cosmo", "kraglin"
      ].includes(id)
    ) {
      return "guardians";
    }
    if (
      [
        "professor-x", "wolverine", "deadpool", "gambit", "x-23", "beast",
        "cyclops", "storm", "jean-grey", "rogue", "colossus", "nightcrawler",
        "quicksilver", "blade", "elektra"
      ].includes(id)
    ) {
      return "xmen";
    }
    if (
      [
        "reed-richards", "sue-storm", "johnny-storm", "ben-grimm",
        "spider-man-maguire", "spider-man-garfield", "america-chavez", "captain-carter"
      ].includes(id)
    ) {
      return "multiverse";
    }
    if (
      [
        "daredevil", "punisher", "jessica-jones", "luke-cage", "iron-fist",
        "moon-knight", "kate-bishop", "ms-marvel", "echo"
      ].includes(id)
    ) {
      return "street";
    }
    if (
      [
        "yelena-belova", "bucky-barnes", "red-guardian", "us-agent", "ghost",
        "taskmaster", "val-allegra"
      ].includes(id)
    ) {
      return "thunderbolts";
    }
    if (
      [
        "the-watcher", "mobius", "hunter-b15", "ouroboros", "clea", "ikaris",
        "sersi", "thena", "gilgamesh", "makkari", "druig", "phastos", "kingo", "sprite"
      ].includes(id)
    ) {
      return "cosmic";
    }
    return "avengers";
  }
}

export function CharactersContent({
  defaultFaction = "all",
  titleOverride,
  embedded = false,
  topHeaderSlot,
}: {
  defaultFaction?: string;
  titleOverride?: string;
  embedded?: boolean;
  topHeaderSlot?: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const paramFaction = searchParams.get("faction");
  const paramQuery = searchParams.get("q");

  const [searchQuery, setSearchQuery] = useState(paramQuery || "");
  const [selectedFaction, setSelectedFaction] = useState(paramFaction || defaultFaction);

  useEffect(() => {
    if (paramFaction) {
      setSelectedFaction(paramFaction);
    } else {
      setSelectedFaction(defaultFaction);
    }
    if (paramQuery !== null) {
      setSearchQuery(paramQuery);
    }
    if (typeof window !== "undefined") {
      sessionStorage.setItem("mcu_last_character_route", window.location.pathname + window.location.search);
    }
  }, [paramFaction, paramQuery, defaultFaction]);

  const isHeroesOnlyMode = defaultFaction === "heroes" || paramFaction === "heroes";
  const isVillainsOnlyMode = defaultFaction === "villains" || paramFaction === "villains";

  const availableFactions = useMemo(() => {
    if (isHeroesOnlyMode) return HERO_FACTIONS;
    if (isVillainsOnlyMode) return VILLAIN_FACTIONS;
    return ALL_FACTIONS;
  }, [isHeroesOnlyMode, isVillainsOnlyMode]);

  const handleSelectFaction = (factionId: string) => {
    setSelectedFaction(factionId);
    try {
      const url = new URL(window.location.href);
      if (factionId === defaultFaction || factionId === "all") {
        url.searchParams.delete("faction");
      } else {
        url.searchParams.set("faction", factionId);
      }
      window.history.replaceState({}, "", url.toString());
    } catch {}
  };

  const characterNavItems: LineNavItem[] = useMemo(() => {
    return availableFactions.map((f) => ({
      title: f.label,
      href: `#${f.id}`,
    }));
  }, [availableFactions]);

  const filteredCharacters = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return CHARACTERS.filter((c) => {
      const isVillain = isVillainCharacter(c);

      if (isHeroesOnlyMode && isVillain) return false;
      if (isVillainsOnlyMode && !isVillain) return false;

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

      if (selectedFaction !== "all" && selectedFaction !== "heroes" && selectedFaction !== "villains") {
        return getCharacterPrimaryFaction(c.id, isVillain) === selectedFaction;
      }

      return true;
    });
  }, [searchQuery, selectedFaction, isHeroesOnlyMode, isVillainsOnlyMode]);

  const activeFactionMeta = useMemo(() => {
    const item = availableFactions.find((f) => f.id === selectedFaction);
    return item || availableFactions[0];
  }, [availableFactions, selectedFaction]);

  const pillLabel = isHeroesOnlyMode ? "SELECT HEROES" : isVillainsOnlyMode ? "SELECT VILLAINS" : "SELECT FACTION";

  const isViewingAllMode = selectedFaction === "all" || selectedFaction === "heroes" || selectedFaction === "villains";

  const innerContent = (
    <div className="relative min-h-[calc(100vh-80px)] w-full bg-transparent text-stone-300 font-sans selection:bg-white selection:text-black">
      {/* Top-Right Floating LineNav matching /artifacts */}
      <div
        className="fixed top-14 sm:top-20 right-3 sm:right-8 z-40 pointer-events-none flex flex-col items-end gap-1.5 origin-top-right scale-[0.82] sm:scale-100"
      >
        {/* SELECT pill */}
        <div className="pointer-events-none flex gap-0.5 rounded-full p-0.5 bg-black/85 backdrop-blur-md border border-white/15 shadow-xl whitespace-nowrap">
          <span className="rounded-full px-2.5 sm:px-3 py-1 text-[8px] sm:text-[9.5px] font-mono tracking-wider uppercase text-stone-400">
            {pillLabel}
          </span>
        </div>

        {/* Faction LineNav */}
        <div className="pointer-events-auto">
          <LineNav
            align="right"
            className="w-auto"
            items={characterNavItems}
            activeHref={`#${selectedFaction}`}
            scrollActiveIntoView={false}
            onItemClick={(item) => {
              const key = item.href.replace("#", "");
              handleSelectFaction(key);
            }}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex flex-col gap-10 max-w-5xl px-3 sm:px-6 md:px-8 pt-10 sm:pt-12 pb-24">
        {/* Top Header & Search Overview Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 w-full">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {topHeaderSlot ? (
              topHeaderSlot
            ) : (
              <>
                <span className="text-xs font-mono tracking-[0.25em] text-stone-400 uppercase font-bold">
                  {titleOverride || (isHeroesOnlyMode ? `ARCHIVES · ${filteredCharacters.length} HEROES & ALLIES` : isVillainsOnlyMode ? `ARCHIVES · ${filteredCharacters.length} VILLAINS & THREATS` : `ARCHIVES · ${filteredCharacters.length} HEROES & VILLAINS`)}
                </span>
                <span className="text-stone-600 font-mono text-xs">•</span>
                <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-amber-400/90 uppercase font-semibold">
                  {activeFactionMeta.title}
                </span>
              </>
            )}
          </div>

          <div className="relative w-full sm:w-72 md:w-80 flex items-center bg-white/[0.04] border border-white/10 px-4 py-2 rounded-full focus-within:border-white/30 transition-all">
            <Search size={14} className="text-stone-400 shrink-0 mr-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isHeroesOnlyMode ? "SEARCH HEROES..." : isVillainsOnlyMode ? "SEARCH VILLAINS..." : "SEARCH CHARACTERS..."}
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

        {/* Content Body: Empty State or Grouped Sections */}
        {filteredCharacters.length === 0 ? (
          <div className="text-center py-28 w-full flex flex-col items-center justify-center animate-in fade-in duration-300">
            <h3 className="text-sm font-mono tracking-[0.25em] uppercase text-stone-300 font-bold">
              NO RECORDS FOUND
            </h3>
            <p className="text-xs font-mono tracking-wide text-stone-500 mt-1.5 max-w-sm mx-auto">
              No character record matches the active query parameters or faction filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                handleSelectFaction(defaultFaction);
              }}
              className="mt-5 text-stone-300 hover:text-white text-[10px] font-mono tracking-widest uppercase cursor-pointer bg-white/5 border border-white/10 px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors"
            >
              RESET FILTERS
            </button>
          </div>
        ) : isViewingAllMode && !searchQuery ? (
          <div className="flex flex-col gap-14 animate-in fade-in-0 slide-in-from-bottom-8 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            {availableFactions
              .filter((f) => f.id !== "all" && f.id !== "heroes" && f.id !== "villains")
              .map((faction) => {
                const factionCharacters = CHARACTERS.filter((c) => {
                  const isVillain = isVillainCharacter(c);
                  if (isHeroesOnlyMode && isVillain) return false;
                  if (isVillainsOnlyMode && !isVillain) return false;
                  return getCharacterPrimaryFaction(c.id, isVillain) === faction.id;
                });
                if (factionCharacters.length === 0) return null;
                return (
                  <section
                    key={`faction-section-${faction.id}`}
                    id={`faction-section-${faction.id}`}
                    className="flex flex-col gap-6 scroll-mt-36 sm:scroll-mt-28"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3 border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span className="text-[10.5px] sm:text-xs font-mono font-bold tracking-[0.2em] text-white uppercase bg-white/10 px-2.5 py-1 rounded shrink-0">
                          {faction.badge}
                        </span>
                        <span className="text-xs sm:text-sm font-mono tracking-[0.15em] text-stone-300 uppercase font-semibold">
                          {faction.title}
                        </span>
                      </div>
                      <span className="text-[9.5px] sm:text-[10.5px] font-mono text-stone-500 uppercase tracking-widest pl-0.5 sm:pl-0">
                        {factionCharacters.length} {isHeroesOnlyMode ? (factionCharacters.length === 1 ? "HERO" : "HEROES") : isVillainsOnlyMode ? (factionCharacters.length === 1 ? "VILLAIN" : "VILLAINS") : (factionCharacters.length === 1 ? "CHARACTER" : "CHARACTERS")}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6">
                      {factionCharacters.map((character, index) => (
                        <StampCharacterCard
                          key={character.id}
                          character={character}
                          index={index}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
          </div>
        ) : (
          <div className="flex flex-col gap-14 animate-in fade-in-0 slide-in-from-bottom-8 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <section
              key={`faction-section-${selectedFaction}`}
              className="flex flex-col gap-6 scroll-mt-36 sm:scroll-mt-28"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span className="text-[10.5px] sm:text-xs font-mono font-bold tracking-[0.2em] text-white uppercase bg-white/10 px-2.5 py-1 rounded shrink-0">
                    {searchQuery ? "SEARCH RESULTS" : activeFactionMeta.badge}
                  </span>
                  <span className="text-xs sm:text-sm font-mono tracking-[0.15em] text-stone-300 uppercase font-semibold">
                    {searchQuery ? `QUERY: "${searchQuery.toUpperCase()}"` : activeFactionMeta.title}
                  </span>
                </div>
                <span className="text-[9.5px] sm:text-[10.5px] font-mono text-stone-500 uppercase tracking-widest pl-0.5 sm:pl-0">
                  {filteredCharacters.length} {isHeroesOnlyMode ? (filteredCharacters.length === 1 ? "HERO" : "HEROES") : isVillainsOnlyMode ? (filteredCharacters.length === 1 ? "VILLAIN" : "VILLAINS") : (filteredCharacters.length === 1 ? "CHARACTER" : "CHARACTERS")}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredCharacters.map((character, index) => (
                  <StampCharacterCard
                    key={character.id}
                    character={character}
                    index={index}
                  />
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );

  if (embedded) {
    return innerContent;
  }

  return (
    <PageShell backHref="/timeline" backLabel="TIMELINE">
      {innerContent}
    </PageShell>
  );
}

export default CharactersContent;


