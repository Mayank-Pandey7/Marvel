"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Users, Search, Shield, Zap, Sparkles, Filter, X, ArrowRight, Compass, Gem } from "lucide-react";
import PageShell from "@/components/PageShell";
import { CHARACTERS, type Character } from "@/data/characters";

const CATEGORIES = [
  { id: "all", label: "All Entities" },
  { id: "avengers", label: "Avengers" },
  { id: "guardians", label: "Guardians" },
  { id: "multiverse", label: "Multiverse & Mutants" },
  { id: "street", label: "Street Level" },
  { id: "thunderbolts", label: "Thunderbolts*" },
  { id: "villains", label: "Villains & Threats" },
  { id: "cosmic", label: "Cosmic & TVA" },
];

const UNIVERSES = [
  { id: "all", label: "All Realities" },
  { id: "616", label: "Earth-616" },
  { id: "838", label: "Earth-838" },
  { id: "10005", label: "Earth-10005 (Fox)" },
  { id: "alt", label: "TVA / Citadel / Void" },
];

export default function CharactersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedUniverse, setSelectedUniverse] = useState("all");

  const filteredCharacters = useMemo(() => {
    return CHARACTERS.filter((c) => {
      // Search filter
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.aliases.some((a) => a.toLowerCase().includes(q)) ||
        c.role.toLowerCase().includes(q) ||
        c.faction.toLowerCase().includes(q) ||
        c.universe.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      // Category filter
      if (selectedCategory !== "all") {
        const fac = c.faction.toLowerCase();
        const role = c.role.toLowerCase();
        const uni = c.universe.toLowerCase();

        if (selectedCategory === "avengers" && !fac.includes("avenger")) return false;
        if (selectedCategory === "guardians" && !fac.includes("guardian")) return false;
        if (selectedCategory === "multiverse" && !fac.includes("x-men") && !fac.includes("spider-hero") && !fac.includes("fantastic four") && !uni.includes("838") && !uni.includes("10005") && !uni.includes("96283") && !uni.includes("120703")) return false;
        if (selectedCategory === "street" && !fac.includes("defender") && !fac.includes("fisk") && !fac.includes("independent") && !c.id.includes("daredevil") && !c.id.includes("punisher") && !c.id.includes("kingpin")) return false;
        if (selectedCategory === "thunderbolts" && !fac.includes("thunderbolts")) return false;
        if (selectedCategory === "villains" && !role.includes("villain") && !role.includes("titan") && !role.includes("conqueror") && !role.includes("ai") && !role.includes("death") && !role.includes("god") && !c.id.includes("thanos") && !c.id.includes("kang") && !c.id.includes("doom") && !c.id.includes("ultron") && !c.id.includes("goblin") && !c.id.includes("doc-ock") && !c.id.includes("hela") && !c.id.includes("killmonger") && !c.id.includes("namor")) return false;
        if (selectedCategory === "cosmic" && !fac.includes("tva") && !fac.includes("yggdrasil") && !fac.includes("watcher") && !fac.includes("masters") && !fac.includes("asgard") && !c.id.includes("loki") && !c.id.includes("watcher") && !c.id.includes("america-chavez")) return false;
      }

      // Universe filter
      if (selectedUniverse !== "all") {
        const uni = c.universe.toLowerCase();
        if (selectedUniverse === "616" && !uni.includes("616")) return false;
        if (selectedUniverse === "838" && !uni.includes("838")) return false;
        if (selectedUniverse === "10005" && !uni.includes("10005")) return false;
        if (selectedUniverse === "alt" && !uni.includes("tva") && !uni.includes("citadel") && !uni.includes("void") && !uni.includes("yggdrasil") && !uni.includes("nexus")) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedUniverse]);

  return (
    <PageShell>
      <section className="px-4 sm:px-8 py-10 max-w-7xl mx-auto font-sans">
        
        {/* Header Title Section */}
        <div className="flex flex-col gap-3 mb-8 pb-6 border-b border-stone-900">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-stone-400 text-[10px] font-mono tracking-[0.25em] uppercase w-fit">
            <Users size={12} className="text-stone-300" />
            <span>PERSONNEL & MULTIVERSAL ENTITIES ARCHIVE</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-5xl font-mono font-bold text-white tracking-[0.2em] uppercase">
                C H A R A C T E R S
              </h1>
              <p className="text-xs sm:text-sm font-mono text-stone-400 max-w-2xl mt-2 tracking-wide leading-relaxed">
                Investigative dossiers spanning heroes, conquerors, multiversal variants, and chronological timelines across the Marvel Cinematic Universe.
              </p>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-mono tracking-widest text-stone-500 uppercase">
                REGISTERED ENTITIES: <span className="text-stone-200 font-bold">{filteredCharacters.length}</span> / {CHARACTERS.length}
              </span>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col gap-4 mb-8 bg-[#000000] border border-stone-900 rounded-xl p-4 sm:p-5 shadow-2xl">
          
          {/* Top Row: Search Input */}
          <div className="relative flex items-center border-b border-stone-800/80 pb-3 focus-within:border-white/60 transition-colors">
            <Search size={16} className="text-stone-500 shrink-0 mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH BY NAME, ALIAS, FACTION, OR UNIVERSE..."
              className="w-full bg-transparent text-xs sm:text-sm font-mono tracking-widest uppercase text-stone-100 placeholder:text-stone-600 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-stone-500 hover:text-stone-300 text-[10px] font-mono px-2 py-1 uppercase"
              >
                Clear
              </button>
            )}
          </div>

          {/* Bottom Row: Category and Universe Pills */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
            
            {/* Categories */}
            <div className="flex flex-wrap items-center gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-[10px] font-mono tracking-wider uppercase rounded-lg border transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-white/10 text-white border-white/40 shadow-[0_0_12px_rgba(255,255,255,0.15)] font-semibold"
                      : "bg-black/40 text-stone-500 border-stone-900 hover:border-stone-700 hover:text-stone-300"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Universes */}
            <div className="flex flex-wrap items-center gap-1.5 border-t lg:border-t-0 border-stone-900 pt-3 lg:pt-0">
              <span className="text-[10px] font-mono tracking-widest text-stone-600 uppercase mr-1 hidden sm:inline">
                REALITY:
              </span>
              {UNIVERSES.map((u) => (
                <button
                  key={u.id}
                  onClick={() => setSelectedUniverse(u.id)}
                  className={`px-2.5 py-1 text-[9px] font-mono tracking-wider uppercase rounded border transition-colors cursor-pointer ${
                    selectedUniverse === u.id
                      ? "bg-stone-800 text-white border-stone-600 font-bold"
                      : "bg-transparent text-stone-500 border-stone-900 hover:border-stone-800 hover:text-stone-400"
                  }`}
                >
                  {u.label}
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* Character Card Grid */}
        {filteredCharacters.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-stone-900 rounded-2xl bg-black/40">
            <Users size={32} className="mx-auto text-stone-700 mb-3" />
            <h3 className="text-sm font-mono tracking-widest uppercase text-stone-400 font-bold">
              NO CORRESPONDING ENTITIES FOUND
            </h3>
            <p className="text-xs font-mono text-stone-600 mt-1 max-w-sm mx-auto">
              Adjust your search query or reset your category and reality filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedUniverse("all");
              }}
              className="mt-4 px-4 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 text-xs font-mono tracking-widest uppercase rounded-lg transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCharacters.map((character) => (
              <Link
                key={character.id}
                href={`/characters/${character.id}`}
                className="group relative bg-[#050508] border border-stone-900 hover:border-stone-700 rounded-xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.8)] cursor-pointer"
              >
                <div>
                  
                  {/* Card Header: Color Orb, Universe & Era Count */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0 shadow-[0_0_8px_currentColor]"
                        style={{ backgroundColor: character.color, color: character.color }}
                      />
                      <span className="text-[10px] font-mono tracking-wider uppercase text-stone-400 truncate">
                        {character.universe}
                      </span>
                    </div>

                    <span className="text-[9px] font-mono tracking-widest uppercase text-stone-400 bg-stone-900 border border-stone-800 px-2 py-0.5 rounded shrink-0">
                      {character.eras.length} ERA{character.eras.length > 1 ? "S" : ""}
                    </span>
                  </div>

                  {/* Character Name */}
                  <h2 className="text-base sm:text-lg font-mono font-bold text-white tracking-wider group-hover:text-white transition-colors">
                    {character.name}
                  </h2>

                  {/* Role Summary */}
                  <p className="text-xs font-mono text-stone-400 mt-1 line-clamp-2 leading-relaxed tracking-normal">
                    {character.role}
                  </p>

                  {/* Aliases Pills */}
                  {character.aliases.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {character.aliases.slice(0, 2).map((alias) => (
                        <span
                          key={alias}
                          className="text-[9px] font-mono tracking-wider uppercase bg-stone-950 border border-stone-900 text-stone-500 px-2 py-0.5 rounded"
                        >
                          &ldquo;{alias}&rdquo;
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Relics Indicator if present */}
                  {character.artifactsPossessed.length > 0 && (
                    <div className="flex items-center gap-1.5 mt-3 pt-2 text-[10px] font-mono text-stone-500">
                      <Gem size={11} className="text-cyan-400/80" />
                      <span>{character.artifactsPossessed.length} Cosmic Relic{character.artifactsPossessed.length > 1 ? "s" : ""}</span>
                    </div>
                  )}

                </div>

                {/* Card Footer: Faction & Action Link */}
                <div className="mt-5 pt-3 border-t border-stone-900 flex items-center justify-between text-[10px] font-mono tracking-widest uppercase">
                  <span className="text-stone-500 truncate max-w-[60%]">
                    {character.faction}
                  </span>
                  <span className="text-stone-300 group-hover:text-white flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>DOSSIER</span>
                    <ArrowRight size={11} />
                  </span>
                </div>

              </Link>
            ))}
          </div>
        )}

      </section>
    </PageShell>
  );
}
