"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import { CHARACTERS, type Character } from "@/data/characters";
import StampCharacterCard from "@/components/character/StampCharacterCard";


export const VILLAIN_IDS = new Set([
  
  "thanos", "ultron", "hela", "killmonger", "mysterio", "vulture",
  "green-goblin", "doc-ock", "namor", "kang-the-conqueror", "kang",
  "high-evolutionary", "wenwu", "ronan", "red-skull", "gorr", "gor",
  "alexander-pierce", "kaecilius", "dormammu", "malekith", "yellowjacket",
  "obadiah-stane", "iron-monger", "aldrich-killian", "justin-hammer",
  "whiplash", "abomination", "dar-benn", "gravik", "titania", "ego",
  "dreykov", "crossbones", "arnim-zola", "ebony-maw", "corvus-glaive",
  "proxima-midnight", "cull-obsidian",

  
  "doctor-doom", "galactus", "cassandra-nova", "magneto", "kingpin",
  "agatha-harkness", "red-hulk", "zemo", "mystique", "bullseye",
  "sabretooth", "juggernaut", "pyro", "toad", "electro", "sandman",
  "lizard", "baron-mordo", "infinity-ultron", "zombie-thanos",
  "zombie-scarlet-witch", "kro", "supreme-intelligence", "yon-rogg",
  "loki" 
]);


export const HERO_IDS = new Set([
  "iron-man", "captain-america", "thor", "hulk", "black-widow", "hawkeye",
  "wanda", "doctor-strange", "spider-man", "spider-man-maguire", "spider-man-garfield",
  "deadpool", "wolverine", "reed-richards", "sue-storm", "johnny-storm", "ben-grimm",
  "professor-x", "gambit", "x-23", "beast", "daredevil", "punisher",
  "star-lord", "rocket-raccoon", "gamora", "groot", "drax", "nebula",
  "mantis", "yondu", "adam-warlock", "cosmo", "kraglin", "yelena-belova",
  "bucky-barnes", "sam-wilson", "shuri", "shang-chi", "captain-marvel",
  "ant-man", "wasp", "wong", "america-chavez", "vision", "moon-knight",
  "ms-marvel", "the-watcher", "she-hulk", "kate-bishop", "monica-rambeau",
  "blade", "elektra", "cyclops", "storm", "jean-grey", "rogue", "colossus",
  "nightcrawler", "quicksilver", "echo", "jessica-jones", "luke-cage",
  "iron-fist", "clea", "sentry", "us-agent", "red-guardian"
]);

export function isVillainCharacter(c: Character): boolean {
  const id = c.id.toLowerCase();
  if (HERO_IDS.has(id)) return false;
  if (VILLAIN_IDS.has(id)) return true;

  const role = c.role.toLowerCase();
  const fac = c.faction.toLowerCase();

  return (
    role.includes("villain") ||
    role.includes("warlord") ||
    role.includes("mastermind") ||
    role.includes("tyrant") ||
    role.includes("zealot") ||
    role.includes("threat") ||
    role.includes("conqueror") ||
    fac.includes("hydra") ||
    fac.includes("black order") ||
    fac.includes("council of kangs") ||
    fac.includes("latveria") ||
    fac.includes("brotherhood")
  );
}

const HERO_FACTIONS = [
  { id: "heroes", label: "ALL HEROES" },
  { id: "avengers", label: "AVENGERS" },
  { id: "guardians", label: "GUARDIANS" },
  { id: "xmen", label: "MUTANTS & X-MEN" },
  { id: "multiverse", label: "MULTIVERSE & FANTASTIC FOUR" },
  { id: "street", label: "STREET LEVEL" },
  { id: "thunderbolts", label: "THUNDERBOLTS*" },
  { id: "cosmic", label: "COSMIC & TVA" },
];

const VILLAIN_FACTIONS = [
  { id: "villains", label: "ALL VILLAINS" },
  { id: "cosmic", label: "COSMIC & TVA THREATS" },
  { id: "multiverse", label: "MULTIVERSE & INCURSIONS" },
  { id: "xmen", label: "MUTANT THREATS" },
  { id: "street", label: "STREET & CRIME" },
  { id: "avengers", label: "AVENGERS ADVERSARIES" },
];

const ALL_FACTIONS = [
  { id: "all", label: "ALL" },
  { id: "heroes", label: "HEROES" },
  { id: "villains", label: "VILLAINS & THREATS" },
  { id: "avengers", label: "AVENGERS" },
  { id: "guardians", label: "GUARDIANS" },
  { id: "xmen", label: "MUTANTS & X-MEN" },
  { id: "multiverse", label: "MULTIVERSE & FANTASTIC FOUR" },
  { id: "street", label: "STREET LEVEL" },
  { id: "thunderbolts", label: "THUNDERBOLTS*" },
  { id: "cosmic", label: "COSMIC & TVA" },
];

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

  const filteredCharacters = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return CHARACTERS.filter((c) => {
      const isVillain = isVillainCharacter(c);

      
      if (isHeroesOnlyMode && isVillain) {
        return false;
      }
      if (isVillainsOnlyMode && !isVillain) {
        return false;
      }

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
        const id = c.id.toLowerCase();

        if (selectedFaction === "heroes") {
          if (isVillain) return false;
        } else if (selectedFaction === "villains") {
          if (!isVillain) return false;
        } else if (selectedFaction === "avengers") {
          const isAvenger =
            fac.includes("avenger") ||
            fac.includes("stark industries") ||
            fac.includes("s.h.i.e.l.d.") ||
            id === "iron-man" ||
            id === "captain-america" ||
            id === "thor" ||
            id === "hulk" ||
            id === "black-widow" ||
            id === "hawkeye" ||
            id === "wanda" ||
            id === "doctor-strange" ||
            id === "spider-man" ||
            id === "war-machine" ||
            id === "falcon" ||
            id === "ant-man" ||
            id === "wasp" ||
            id === "shang-chi" ||
            id === "captain-marvel" ||
            id === "vision" ||
            id === "black-panther" ||
            id === "shuri" ||
            id === "monica-rambeau" ||
            id === "she-hulk" ||
            (isVillainsOnlyMode && (id === "thanos" || id === "ultron" || id === "loki" || id === "kang-the-conqueror" || id === "zemo" || id === "red-skull"));
          if (!isAvenger) return false;
        } else if (selectedFaction === "guardians") {
          const isGuardian =
            fac.includes("guardian") ||
            id === "star-lord" ||
            id === "gamora" ||
            id === "rocket-raccoon" ||
            id === "groot" ||
            id === "drax" ||
            id === "mantis" ||
            id === "nebula" ||
            id === "adam-warlock" ||
            id === "yondu" ||
            id === "cosmo" ||
            id === "kraglin";
          if (!isGuardian) return false;
        } else if (selectedFaction === "xmen") {
          const isMutantOrXMen =
            fac.includes("x-men") ||
            fac.includes("x-force") ||
            fac.includes("brotherhood") ||
            fac.includes("xavier") ||
            fac.includes("mutant") ||
            role.includes("mutant") ||
            id === "deadpool" ||
            id === "wolverine" ||
            id === "professor-x" ||
            id === "magneto" ||
            id === "gambit" ||
            id === "x-23" ||
            id === "beast" ||
            id === "cyclops" ||
            id === "storm" ||
            id === "jean-grey" ||
            id === "rogue" ||
            id === "colossus" ||
            id === "mystique" ||
            id === "nightcrawler" ||
            id === "quicksilver" ||
            id === "cassandra-nova" ||
            id === "blade" ||
            id === "elektra" ||
            id === "sabretooth" ||
            id === "juggernaut" ||
            id === "pyro" ||
            id === "toad";
          if (!isMutantOrXMen) return false;
        } else if (selectedFaction === "multiverse") {
          const isMultiverseOrF4 =
            fac.includes("fantastic four") ||
            fac.includes("illuminati") ||
            fac.includes("spider-hero") ||
            fac.includes("void") ||
            role.includes("multivers") ||
            role.includes("variant") ||
            uni.includes("838") ||
            uni.includes("10005") ||
            uni.includes("96283") ||
            uni.includes("120703") ||
            uni.includes("alternate") ||
            (uni.includes("earth-") && uni !== "earth-616") ||
            id.includes("spider-man-maguire") ||
            id.includes("spider-man-garfield") ||
            id.includes("reed-richards") ||
            id.includes("sue-storm") ||
            id.includes("johnny-storm") ||
            id.includes("ben-grimm") ||
            id.includes("captain-carter") ||
            id.includes("deadpool") ||
            id.includes("wolverine") ||
            id.includes("america-chavez") ||
            id.includes("green-goblin") ||
            id.includes("doc-ock") ||
            id.includes("electro") ||
            id.includes("sandman") ||
            id.includes("lizard") ||
            id.includes("cassandra-nova");
          if (!isMultiverseOrF4) return false;
        } else if (selectedFaction === "street") {
          const isStreet =
            fac.includes("defender") ||
            fac.includes("fisk") ||
            fac.includes("independent") ||
            fac.includes("nelson") ||
            id === "daredevil" ||
            id === "punisher" ||
            id === "kingpin" ||
            id === "bullseye" ||
            id === "jessica-jones" ||
            id === "luke-cage" ||
            id === "iron-fist" ||
            id === "echo" ||
            id === "moon-knight" ||
            id === "kate-bishop" ||
            id === "ms-marvel" ||
            id === "maya-lopez";
          if (!isStreet) return false;
        } else if (selectedFaction === "thunderbolts") {
          const isThunderbolt =
            fac.includes("thunderbolts") ||
            id === "yelena-belova" ||
            id === "bucky-barnes" ||
            id === "red-guardian" ||
            id === "us-agent" ||
            id === "john-walker" ||
            id === "ghost" ||
            id === "taskmaster" ||
            id === "sentry" ||
            id === "val-allegra" ||
            id === "val";
          if (!isThunderbolt) return false;
        } else if (selectedFaction === "cosmic") {
          const isCosmic =
            fac.includes("cosmic") ||
            fac.includes("tva") ||
            fac.includes("asgard") ||
            fac.includes("nova") ||
            fac.includes("eternals") ||
            fac.includes("space") ||
            fac.includes("celestial") ||
            fac.includes("yggdrasil") ||
            role.includes("god") ||
            role.includes("cosmic") ||
            role.includes("watcher") ||
            role.includes("eternal") ||
            role.includes("celestial") ||
            id === "thor" ||
            id === "loki" ||
            id === "galactus" ||
            id === "mobius" ||
            id === "hunter-b15" ||
            id === "ouroboros" ||
            id === "oub" ||
            id === "watcher" ||
            id === "captain-marvel" ||
            id === "silver-surfer" ||
            id === "adam-warlock" ||
            id === "ikaris" ||
            id === "sersi" ||
            id === "thena" ||
            id === "gilgamesh" ||
            id === "makkari" ||
            id === "druig" ||
            id === "phastos" ||
            id === "kingo" ||
            id === "sprite" ||
            id === "arisham" ||
            id === "grandmaster" ||
            id === "collector" ||
            id === "dormammu" ||
            id === "gor" ||
            id === "gorr" ||
            id === "ego" ||
            id === "ronan" ||
            id === "malekith";
          if (!isCosmic) return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedFaction, isHeroesOnlyMode, isVillainsOnlyMode]);

  const pageTitle = useMemo(() => {
    if (titleOverride) {
      return `${titleOverride} · ${filteredCharacters.length}`;
    }
    if (isHeroesOnlyMode) {
      return `ARCHIVES · ${filteredCharacters.length} HEROES & ALLIES`;
    }
    if (isVillainsOnlyMode) {
      return `ARCHIVES · ${filteredCharacters.length} VILLAINS & THREATS`;
    }
    return `ARCHIVES · ${filteredCharacters.length} HEROES & VILLAINS`;
  }, [titleOverride, filteredCharacters.length, isHeroesOnlyMode, isVillainsOnlyMode]);

  const innerContent = (
    <div className="flex flex-col gap-8">
      {/* 1. TOP SEARCH & CONTROLS */}
      <div className="flex flex-col gap-5 pb-2">

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 w-full pb-4 border-b border-stone-800/80">
          <div className="flex items-center gap-3">
            {topHeaderSlot ? (
              topHeaderSlot
            ) : (
              <span className="text-xs font-mono tracking-[0.25em] text-stone-400 uppercase font-bold">
                {pageTitle}
              </span>
            )}
          </div>

          <div className="relative w-full sm:w-80 md:w-96 flex items-center bg-white/[0.04] border border-white/10 px-4 py-2 sm:py-2.5 rounded-full focus-within:border-white/30 transition-all">
            <Search size={14} className="text-stone-400 shrink-0 mr-3" />
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

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-nowrap overflow-x-auto pb-1.5 px-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap items-center gap-4 sm:gap-6 text-[11px] sm:text-xs font-mono tracking-wider uppercase">
            {availableFactions.map((f) => (
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
              setSelectedFaction(defaultFaction);
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
  );

  if (embedded) {
    return innerContent;
  }

  return (
    <PageShell backHref="/timeline" backLabel="TIMELINE">
      <div className="relative min-h-[calc(100vh-80px)] w-full bg-[#000000] text-stone-300 font-sans selection:bg-white selection:text-black">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
          {innerContent}
        </div>
      </div>
    </PageShell>
  );
}

export default CharactersContent;

