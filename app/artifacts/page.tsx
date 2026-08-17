"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ArrowRight, X, Sparkles, MapPin, Calendar, Shield, ArrowUpRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import { ARTIFACTS, type Artifact } from "@/data/artifacts";

const CATEGORIES = [
  { id: "all", label: "ALL RELICS" },
  { id: "infinity_stone", label: "INFINITY STONES" },
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

  // Handle ESC key to close modal
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
      // 1. Precision Search Query Filter
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

      // 2. Category Filter
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
    <PageShell backHref="/timeline" backLabel="TIMELINE">
      <div className="relative min-h-[calc(100vh-80px)] w-full bg-[#000000] text-stone-300 font-sans selection:bg-white selection:text-black">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 flex flex-col gap-8">
          
          {/* OPEN SPATIAL SEARCH & TEXT FILTERS */}
          <div className="flex flex-col gap-6 pb-2">
            
            {/* Search Input with Clean Borderless Surface */}
            <div className="relative flex items-center bg-stone-950/60 px-4 py-3 rounded-none focus-within:bg-stone-900/60 transition-colors">
              <Search size={15} className="text-stone-500 shrink-0 mr-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH (RELIC, POWER, WIELDER, ORIGIN)..."
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
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono tracking-widest uppercase">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`transition-colors cursor-pointer py-1 ${
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

          {/* OPEN SPATIAL CINEMATIC GALLERY */}
          {filteredArtifacts.length === 0 ? (
            <div className="text-center py-28">
              <h3 className="text-sm font-mono tracking-[0.3em] uppercase text-stone-300 font-bold">
                NO RELICS FOUND
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredArtifacts.map((artifact) => {
                const latestHistory = artifact.history[artifact.history.length - 1];
                const backdropUrl = artifact.backdrop || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2560&auto=format&fit=crop";

                return (
                  <div
                    key={artifact.id}
                    onClick={() => setActiveArtifact(artifact)}
                    className="group relative flex flex-col gap-3 transition-all duration-300 ease-out cursor-pointer"
                  >
                    
                    {/* FULL BLEED IMAGE WITH CINEMATIC GRADIENT */}
                    <div className="relative w-full aspect-[16/11] overflow-hidden bg-stone-950">
                      <img
                        src={backdropUrl}
                        alt={artifact.name}
                        className="w-full h-full object-cover object-center filter brightness-85 group-hover:brightness-105 group-hover:scale-105 transition-all duration-700 ease-out"
                      />

                      {/* Smooth Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

                      {/* Category in Bottom Left of Image */}
                      <div className="absolute bottom-2.5 left-3 max-w-[85%]">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-stone-300 line-clamp-1">
                          {artifact.origin.split("/")[0].trim()}
                        </span>
                      </div>
                    </div>

                    {/* OPEN TEXT AREA */}
                    <div className="flex flex-col gap-1">
                      
                      {/* Name */}
                      <h2 className="text-base font-mono font-bold tracking-[0.16em] uppercase text-white group-hover:text-stone-200 transition-colors">
                        {artifact.name}
                      </h2>

                      {/* Power / Description */}
                      <p className="text-[11px] font-mono tracking-wide text-stone-400 line-clamp-2 leading-relaxed">
                        {artifact.power}
                      </p>

                      {/* Bearer & Action Link */}
                      <div className="pt-1.5 flex items-center justify-between text-[10px] font-mono tracking-[0.2em] uppercase text-stone-500 group-hover:text-white transition-colors">
                        <span className="truncate max-w-[170px] text-stone-400">
                          {latestHistory ? latestHistory.holderName : "Singularity"}
                        </span>
                        <div className="flex items-center gap-1 shrink-0">
                          <span>PROVENANCE</span>
                          <ArrowRight size={11} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

      {/* STATE-OF-THE-ART CINEMATIC PROVENANCE MODAL */}
      {activeArtifact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none">
          
          {/* Backdrop Click Dismiss */}
          <div 
            className="fixed inset-0"
            onClick={() => setActiveArtifact(null)}
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-3xl bg-[#070709] border border-stone-800/80 sm:rounded-2xl flex flex-col max-h-screen sm:max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            
            {/* 1. CINEMATIC HERO IMAGE BANNER */}
            <div className="relative w-full h-56 sm:h-72 shrink-0 bg-stone-950 overflow-hidden">
              <img
                src={activeArtifact.backdrop || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2560&auto=format&fit=crop"}
                alt={activeArtifact.name}
                className="w-full h-full object-cover object-center filter brightness-90"
              />
              
              {/* Radial Aura Glow */}
              <div 
                className="absolute inset-0 opacity-25 mix-blend-screen pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${activeArtifact.iconColor || "#fff"} 0%, transparent 70%)`
                }}
              />

              {/* Bottom Fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/40 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setActiveArtifact(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-stone-300 hover:text-white backdrop-blur-md transition-all cursor-pointer"
                title="Close (Esc)"
              >
                <X size={18} />
              </button>

              {/* Title & Origin Floating in Hero */}
              <div className="absolute bottom-4 left-6 right-6 flex flex-col gap-1 z-10">
                <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-stone-400">
                  <span 
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ backgroundColor: activeArtifact.iconColor || "#fff" }}
                  />
                  <span>{activeArtifact.origin}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-mono font-bold tracking-[0.14em] uppercase text-white drop-shadow-md">
                  {activeArtifact.name}
                </h2>
              </div>
            </div>

            {/* 2. SCROLLABLE LORE & PROVENANCE CONTENT */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 flex flex-col gap-6 scrollbar-thin scrollbar-thumb-stone-800">
              
              {/* SPECIFICATION PILLARS */}
              <div className="grid grid-cols-3 gap-3 py-3 border-y border-stone-800/60 text-center font-mono uppercase">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] tracking-[0.25em] text-stone-500">PHASE INTRODUCED</span>
                  <span className="text-xs font-bold text-stone-200">PHASE {activeArtifact.phaseIntroduced}</span>
                </div>
                <div className="flex flex-col gap-0.5 border-x border-stone-800/60">
                  <span className="text-[9px] tracking-[0.25em] text-stone-500">CATEGORY</span>
                  <span className="text-xs font-bold text-stone-200">{activeArtifact.category.replace(/_/g, " ")}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] tracking-[0.25em] text-stone-500">RECORDED WIELDERS</span>
                  <span className="text-xs font-bold text-stone-200">{activeArtifact.history.length} ENTITIES</span>
                </div>
              </div>

              {/* Narrative Lore */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-stone-400">
                  ARCHIVAL OVERVIEW
                </span>
                <p className="text-xs sm:text-sm font-mono tracking-wide text-stone-300 leading-relaxed">
                  {activeArtifact.description}
                </p>
              </div>

              {/* Capabilities & Power Matrix */}
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

              {/* Chronological Provenance Stream */}
              <div className="flex flex-col gap-4 pt-2">
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-stone-400">
                  CHRONOLOGICAL WIELDER PROVENANCE
                </span>

                <div className="relative pl-6 space-y-6 border-l border-stone-800/80">
                  {activeArtifact.history.map((h, index) => (
                    <div key={index} className="relative flex flex-col gap-1 font-mono text-xs">
                      
                      {/* Timeline Node Point */}
                      <span 
                        className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full border-2 border-[#070709]"
                        style={{ backgroundColor: activeArtifact.iconColor || "#fff" }}
                      />

                      {/* Header Row: Holder & Time/Location */}
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

                      {/* Event Context */}
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
