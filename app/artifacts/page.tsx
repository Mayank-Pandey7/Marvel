"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ArrowRight, X, Sparkles } from "lucide-react";
import PageShell from "@/components/PageShell";
import { ARTIFACTS, type Artifact } from "@/data/artifacts";
import StampArtifactCard from "@/components/artifact/StampArtifactCard";

const CATEGORIES = [
  { id: "all", label: "ALL" },
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
    <PageShell backHref="/timeline" backLabel="TIMELINE">
      <div className="relative min-h-[calc(100vh-80px)] w-full bg-[#000000] text-stone-300 font-sans selection:bg-white selection:text-black">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 flex flex-col gap-8">

          <div className="flex flex-col gap-5 pb-2">

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 w-full">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono tracking-[0.25em] text-stone-400 uppercase font-bold">
                  ARCHIVES · {filteredArtifacts.length} RELICS & ARTIFACTS
                </span>
              </div>

              <div className="relative w-full sm:w-80 md:w-96 flex items-center bg-white/[0.04] border border-white/10 px-4 py-2 sm:py-2.5 rounded-full focus-within:border-white/30 transition-all">
                <Search size={14} className="text-stone-400 shrink-0 mr-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH ARTIFACTS..."
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

          {/* 2. ARTIFACT TICKET CARDS GRID */}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
              {filteredArtifacts.map((artifact, index) => (
                <StampArtifactCard
                  key={artifact.id}
                  artifact={artifact}
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

      {/* 3. ARTIFACT DETAIL MODAL REMOVED - Navigates to /artifacts/[id] */}

export default function ArtifactsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <ArtifactsContent />
    </Suspense>
  );
}
