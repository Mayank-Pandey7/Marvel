"use client";

import React, { useState, useMemo } from "react";
import { Search, Layers } from "lucide-react";
import { TOP_TIER_VILLAINS } from "@/data/topTierVillains";
import StampTopTierCard from "@/components/villains/StampTopTierCard";

const TIER_FILTERS = [
  { id: "all", label: "ALL RANKS (1-20)" },
  { id: "beyond", label: "BEYOND TIER" },
  { id: "multiversal", label: "MULTIVERSAL & MULTIVERSAL+" },
  { id: "high-cosmic", label: "HIGH COSMIC" },
  { id: "cosmic", label: "COSMIC" },
  { id: "high", label: "HIGH & VARIABLE" },
];

export default function TopTierVillainsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState("all");

  const filteredVillains = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return TOP_TIER_VILLAINS.filter((v) => {
      if (q) {
        const nameMatch = v.name.toLowerCase().includes(q);
        const aliasMatch = v.alias?.toLowerCase().includes(q);
        const reasonMatch = v.reason.toLowerCase().includes(q);
        const domainMatch = v.domain.toLowerCase().includes(q);
        const tierMatch = v.tier.toLowerCase().includes(q);

        if (!nameMatch && !aliasMatch && !reasonMatch && !domainMatch && !tierMatch) {
          return false;
        }
      }

      if (selectedTier !== "all") {
        if (selectedTier === "beyond") {
          if (v.tier !== "Beyond Tier") return false;
        } else if (selectedTier === "multiversal") {
          if (v.tier !== "Multiversal" && v.tier !== "Multiversal+") return false;
        } else if (selectedTier === "high-cosmic") {
          if (v.tier !== "High Cosmic") return false;
        } else if (selectedTier === "cosmic") {
          if (v.tier !== "Cosmic") return false;
        } else if (selectedTier === "high") {
          if (v.tier !== "High" && v.tier !== "Variable / Cosmic") return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedTier]);

  return (
    <div className="flex flex-col gap-8 pb-16">
      {/* 1. FILTER & SEARCH BAR */}
      <div className="flex flex-col gap-5 bg-stone-950/60 p-4 sm:p-6 rounded-2xl border border-stone-800/80 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-stone-300">
            <Layers size={18} className="text-purple-400" />
            <span className="text-xs sm:text-sm font-mono tracking-[0.2em] uppercase font-bold text-white">
              COSMIC ENTITIES &amp; POWER HIERARCHY
            </span>
          </div>

          {/* Search Box */}
          <div className="relative flex items-center min-w-[240px] sm:min-w-[280px]">
            <Search size={14} className="absolute left-3 text-stone-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH ENTITY OR DOMAIN..."
              className="w-full bg-stone-900/90 border border-stone-800 rounded-lg pl-8 pr-3 py-1.5 text-xs font-mono text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-stone-600 tracking-wider uppercase transition-colors"
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

        {/* Tier Filter Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-nowrap overflow-x-auto pb-1.5 px-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap items-center gap-4 sm:gap-6 text-[11px] sm:text-xs font-mono tracking-wider uppercase">
            {TIER_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedTier(f.id)}
                className={`transition-colors cursor-pointer py-1 shrink-0 whitespace-nowrap ${
                  selectedTier === f.id
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
      {filteredVillains.length === 0 ? (
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
              setSelectedTier("all");
            }}
            className="mt-5 text-stone-300 hover:text-white text-[10px] font-mono tracking-widest uppercase cursor-pointer"
          >
            RESET FILTERS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
          {filteredVillains.map((villain) => (
            <StampTopTierCard
              key={villain.rank}
              villain={villain}
            />
          ))}
        </div>
      )}
    </div>
  );
}
