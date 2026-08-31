"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ArrowRight, X, Sparkles } from "lucide-react";
import PageShell from "@/components/PageShell";
import { ARTIFACTS, type Artifact } from "@/data/artifacts";

const CATEGORIES = [
  { id: "all", label: "ALL RELICS" },
  { id: "infinity_stone", label: "INFINITY STONES" },
  { id: "ironman_armor", label: "IRON MAN ARMORY" },
  { id: "dark_magic", label: "DARK MAGIC" },
  { id: "mystic_relic", label: "MYSTIC RELICS" },
  { id: "cosmic_technology", label: "COSMIC TECH & WEAPONS" },
  { id: "asgardian_weapon", label: "ASGARDIAN RELICS" },
  { id: "wakandan_tech", label: "WAKANDAN VIBRANIUM" },
];

function ArtifactsContent() {
  const searchParams = useSearchParams();
  const paramCat = searchParams.get("category");
  const paramQuery = searchParams.get("q");

  const [searchQuery, setSearchQuery] = useState(paramQuery || "");
  const [selectedCategory, setSelectedCategory] = useState(paramCat || "all");
  const [activeArtifact, setActiveArtifact] = useState<Artifact | null>(null);

  useEffect(() => {
    if (paramCat) {
      setSelectedCategory(paramCat);
    } else {
      setSelectedCategory("all");
    }
    if (paramQuery !== null) {
      setSearchQuery(paramQuery);
    }
  }, [paramCat, paramQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveArtifact(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredArtifacts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return ARTIFACTS.filter((a) => {

      if (q) {
        const nameLower = a.name.toLowerCase();
        const originLower = a.origin.toLowerCase();
        const powerLower = a.power.toLowerCase();
        const descLower = a.description.toLowerCase();

        const nameMatch = nameLower.includes(q);
        const originMatch = originLower.includes(q);
        const powerMatch = powerLower.includes(q);
        const descMatch = descLower.includes(q);

        const holderMatch = a.history.some((h) =>
          h.holderName.toLowerCase().includes(q) || h.location.toLowerCase().includes(q)
        );

        if (!nameMatch && !originMatch && !powerMatch && !descMatch && !holderMatch) {
          return false;
        }
      }

      if (selectedCategory !== "all") {
        if (a.category !== selectedCategory) return false;
      }

      return true;
    }).sort((a, b) => {
      if (!q) return 0;
      const aNameStart = a.name.toLowerCase().startsWith(q);
      const bNameStart = b.name.toLowerCase().startsWith(q);
      if (aNameStart && !bNameStart) return -1;
      if (!aNameStart && bNameStart) return 1;
      return 0;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <PageShell backHref="/familytree" backLabel="FAMILY TREE">
      <div className="relative min-h-[calc(100vh-80px)] w-full bg-[#000000] text-stone-300 font-sans selection:bg-white selection:text-black">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 flex flex-col gap-8">

          {}
          <div className="flex flex-col gap-5 pb-2">

            {}
            <div className="relative flex items-center bg-white/[0.03] border border-white/5 px-4 py-2.5 sm:py-3 rounded-full focus-within:border-white/20 transition-all">
              <Search size={14} className="text-stone-500 shrink-0 mr-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH RELICS & ARTIFACTS..."
                className="w-full bg-transparent text-[11px] sm:text-xs font-mono tracking-[0.16em] uppercase text-stone-100 placeholder:text-stone-600 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-stone-500 hover:text-stone-300 text-[9.5px] font-mono tracking-widest px-2 py-0.5 uppercase cursor-pointer"
                >
                  CLEAR
                </button>
              )}
            </div>

            {}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-nowrap overflow-x-auto pb-1.5 px-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap items-center gap-4 sm:gap-6 text-[11px] sm:text-xs font-mono tracking-wider uppercase">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`transition-colors cursor-pointer py-1 shrink-0 whitespace-nowrap ${
                      selectedCategory === c.id
                        ? "text-white font-bold"
                        : "text-stone-500 hover:text-stone-300"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {}
          {filteredArtifacts.length === 0 ? (
            <div className="text-center py-28">
              <h3 className="text-sm font-mono tracking-[0.3em] uppercase text-stone-300 font-bold">
                NO RECORDS FOUND
              </h3>
              <p className="text-xs font-mono tracking-wide text-stone-500 mt-1.5 max-w-sm mx-auto">
                No cosmic artifact matches the active query parameters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-5 text-stone-300 hover:text-white text-[10px] font-mono tracking-widest uppercase cursor-pointer"
              >
                RESET FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {filteredArtifacts.map((artifact) => {
                const latestHistory = artifact.history[artifact.history.length - 1];
                const primaryOrigin = artifact.origin.split("/")[0].trim();

                return (
                  <div
                    key={artifact.id}
                    onClick={() => setActiveArtifact(artifact)}
                    className="group relative flex flex-col gap-2 sm:gap-3 transition-all duration-300 ease-out cursor-pointer"
                  >

                    {}
                    <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-gradient-to-b from-[#0c0c12] to-[#020204] rounded-xl border border-white/5 shadow-2xl flex items-center justify-center">
                      <img
                        src={artifact.backdrop}
                        alt={artifact.name}
                        className={`w-full h-full filter brightness-95 group-hover:brightness-110 group-hover:scale-105 transition-all duration-700 ease-out ${
                          artifact.category === "ironman_armor"
                            ? "object-contain object-center p-2 sm:p-2.5"
                            : "object-cover object-center"
                        }`}
                      />

                      {}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {}
                    <div className="flex flex-col gap-0.5 sm:gap-1">

                      {}
                      <h2 className="text-xs sm:text-[15px] font-mono font-bold tracking-[0.12em] uppercase text-white group-hover:text-stone-200 transition-colors line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] leading-snug">
                        {artifact.name}
                      </h2>

                      {}
                      <div className="text-[9px] sm:text-[10.5px] font-mono tracking-wider uppercase text-stone-400 line-clamp-1">
                        {primaryOrigin} · {artifact.category.replace(/_/g, " ")}
                      </div>

                      {}
                      <div className="pt-0.5 sm:pt-1 flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10.5px] font-mono tracking-[0.16em] sm:tracking-[0.2em] uppercase text-stone-400 group-hover:text-white transition-colors">
                        <span>EXPLORE RELIC</span>
                        <ArrowRight size={10} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

      {}
      {activeArtifact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none">

          {}
          <div
            className="fixed inset-0"
            onClick={() => setActiveArtifact(null)}
          />

          {}
          <div className="relative z-10 w-full max-w-3xl bg-[#070709] border border-stone-800/80 rounded-xl sm:rounded-2xl flex flex-col max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">

            {}
            <div className="relative w-full h-48 sm:h-72 shrink-0 bg-stone-950 overflow-hidden">
              <img
                src={activeArtifact.backdrop}
                alt={activeArtifact.name}
                className="w-full h-full object-cover object-center filter brightness-90"
              />

              {}
              <div
                className="absolute inset-0 opacity-25 mix-blend-screen pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${activeArtifact.iconColor || "#fff"} 0%, transparent 70%)`
                }}
              />

              {}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/40 to-transparent" />

              {}
              <button
                onClick={() => setActiveArtifact(null)}
                className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-stone-300 hover:text-white backdrop-blur-md transition-all cursor-pointer"
                title="Close (Esc)"
              >
                <X size={16} />
              </button>

              {}
              <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6 right-4 sm:right-6 flex flex-col gap-1 z-10">
                <div className="flex items-center gap-2 text-[9.5px] sm:text-[10px] font-mono tracking-[0.25em] sm:tracking-[0.3em] uppercase text-stone-400">
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ backgroundColor: activeArtifact.iconColor || "#fff" }}
                  />
                  <span>{activeArtifact.origin}</span>
                </div>
                <h2 className="text-xl xs:text-2xl sm:text-3xl font-mono font-bold tracking-[0.1em] sm:tracking-[0.14em] uppercase text-white drop-shadow-md leading-tight">
                  {activeArtifact.name}
                </h2>
              </div>
            </div>

            {}
            <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-4 sm:py-6 flex flex-col gap-5 sm:gap-6 scrollbar-thin scrollbar-thumb-stone-800">

              {}
              <div className="grid grid-cols-3 gap-1 xs:gap-3 py-2.5 sm:py-3 border-y border-stone-800/60 text-center font-mono uppercase">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[7.5px] xs:text-[9px] tracking-[0.15em] sm:tracking-[0.25em] text-stone-500">PHASE</span>
                  <span className="text-[10.5px] xs:text-xs font-bold text-stone-200">PHASE {activeArtifact.phaseIntroduced}</span>
                </div>
                <div className="flex flex-col gap-0.5 border-x border-stone-800/60 px-1">
                  <span className="text-[7.5px] xs:text-[9px] tracking-[0.15em] sm:tracking-[0.25em] text-stone-500 truncate">CATEGORY</span>
                  <span className="text-[10.5px] xs:text-xs font-bold text-stone-200 truncate">{activeArtifact.category.replace(/_/g, " ")}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[7.5px] xs:text-[9px] tracking-[0.15em] sm:tracking-[0.25em] text-stone-500">WIELDERS</span>
                  <span className="text-[10.5px] xs:text-xs font-bold text-stone-200">{activeArtifact.history.length} ENTITIES</span>
                </div>
              </div>

              {}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-stone-400">
                  ARCHIVAL OVERVIEW
                </span>
                <p className="text-xs sm:text-sm font-mono tracking-wide text-stone-300 leading-relaxed">
                  {activeArtifact.description}
                </p>
              </div>

              {}
              <div
                className="relative p-4 sm:p-5 bg-black/40 border-l-2 flex flex-col gap-1.5"
                style={{ borderColor: activeArtifact.iconColor || "#fff" }}
              >
                <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-[0.25em] uppercase text-stone-400">
                  <Sparkles size={12} style={{ color: activeArtifact.iconColor || "#fff" }} />
                  <span>COSMIC CAPABILITIES & REALITY INFLUENCE</span>
                </div>
                <p className="text-xs sm:text-sm font-mono text-stone-100 leading-relaxed">
                  {activeArtifact.power}
                </p>
              </div>

              {}
              <div className="flex flex-col gap-4 pt-2">
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-stone-400">
                  CHRONOLOGICAL WIELDER PROVENANCE
                </span>

                <div className="relative pl-6 space-y-6 border-l border-stone-800/80">
                  {activeArtifact.history.map((h, index) => (
                    <div key={index} className="relative flex flex-col gap-1 font-mono text-xs">

                      {}
                      <span
                        className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full border-2 border-[#070709]"
                        style={{ backgroundColor: activeArtifact.iconColor || "#fff" }}
                      />

                      {}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="font-bold text-stone-100 text-xs sm:text-sm uppercase tracking-wider">
                          {h.holderName}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] text-stone-400">
                          <span>{h.year}</span>
                          <span>•</span>
                          <span>{h.location}</span>
                        </div>
                      </div>

                      {}
                      <p className="text-stone-400 text-[11px] sm:text-xs leading-relaxed mt-0.5">
                        {h.event}
                      </p>

                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

    </PageShell>
  );
}

export default function ArtifactsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <ArtifactsContent />
    </Suspense>
  );
}
