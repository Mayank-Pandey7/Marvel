"use client";

import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { TOP_TIER_VILLAINS } from "@/data/topTierVillains";
import StampTopTierCard from "@/components/villains/StampTopTierCard";
import { LineNav, type LineNavItem } from "@/components/line-nav";

const TIER_FILTERS = [
  { id: "all", label: "ALL RANKS", badge: "ALL RANKS (1-20)", title: "TOP-TIER POWER HIERARCHY" },
  { id: "multiversal", label: "MULTIVERSAL+", badge: "MULTIVERSAL", title: "MULTIVERSAL & MULTIVERSAL+ (RANKS 1-8)" },
  { id: "high-cosmic", label: "HIGH COSMIC", badge: "HIGH COSMIC", title: "HIGH COSMIC THREATS (RANKS 9-12)" },
  { id: "cosmic", label: "COSMIC", badge: "PLANETARY / COSMIC", title: "COSMIC THREATS (RANKS 13-16)" },
  { id: "high", label: "HIGH & VARIABLE", badge: "VARIABLE", title: "HIGH & VARIABLE (RANKS 17-20)" },
];

export default function TopTierVillainsView({
  topHeaderSlot,
}: {
  topHeaderSlot?: React.ReactNode;
} = {}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState("all");

  const tierNavItems: LineNavItem[] = useMemo(() => {
    return TIER_FILTERS.map((f) => ({
      title: f.label,
      href: `#${f.id}`,
    }));
  }, []);

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
        if (selectedTier === "multiversal") {
          if (v.tier !== "Multiversal" && v.tier !== "Multiversal+") return false;
        } else if (selectedTier === "high-cosmic") {
          if (v.tier !== "High Cosmic") return false;
        } else if (selectedTier === "cosmic") {
          if (v.tier !== "Cosmic") return false;
        } else if (selectedTier === "high") {
          if (v.tier !== "High") return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedTier]);

  const activeTierMeta = useMemo(() => {
    const item = TIER_FILTERS.find((f) => f.id === selectedTier);
    return item || TIER_FILTERS[0];
  }, [selectedTier]);

  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full bg-transparent text-stone-300 font-sans selection:bg-white selection:text-black">
      {/* Top-Right Floating LineNav */}
      <div
        className="fixed top-14 sm:top-20 right-3 sm:right-8 z-40 pointer-events-none flex flex-col items-end gap-1.5 origin-top-right scale-[0.82] sm:scale-100"
      >
        {/* SELECT pill — matching /timeline SELECT REALITY styling */}
        <div className="pointer-events-none flex gap-0.5 rounded-full p-0.5 bg-white/[0.08] backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] whitespace-nowrap">
          <span className="rounded-full px-2.5 sm:px-3 py-1 text-[8px] sm:text-[9.5px] font-mono tracking-wider uppercase text-stone-300">
            SELECT RANK
          </span>
        </div>

        {/* LineNav */}
        <div className="pointer-events-auto">
          <LineNav
            align="right"
            className="w-auto"
            items={tierNavItems}
            activeHref={`#${selectedTier}`}
            scrollActiveIntoView={false}
            onItemClick={(item) => {
              const key = item.href.replace("#", "");
              setSelectedTier(key);
            }}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex flex-col gap-10 max-w-5xl px-3 sm:px-6 md:px-8 pt-10 sm:pt-12 pb-24">
        {/* Search and Overview Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 w-full">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {topHeaderSlot ? (
              topHeaderSlot
            ) : (
              <>
                <span className="text-xs font-mono tracking-[0.25em] text-white uppercase font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  ALL-TIME POWERFUL CHARACTERS · MARVEL COMICS · {filteredVillains.length}
                </span>
                <span className="text-white/40 font-mono text-xs">•</span>
                <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-purple-300 font-bold uppercase drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                  {activeTierMeta.title}
                </span>
              </>
            )}
          </div>

          <div className="relative w-full sm:w-72 md:w-80 flex items-center bg-white/[0.06] hover:bg-white/[0.09] backdrop-blur-2xl border border-white/15 focus-within:border-white/35 px-4 py-2 rounded-full transition-all">
            <Search size={14} className="text-stone-200 shrink-0 mr-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH ENTITY OR DOMAIN..."
              className="w-full bg-transparent text-[11px] sm:text-xs font-mono tracking-[0.16em] uppercase text-white placeholder:text-stone-300 font-medium focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-stone-300 hover:text-white text-[9.5px] font-mono tracking-widest px-2 py-0.5 uppercase cursor-pointer transition-colors"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Content Body: Empty State or Grid */}
        {filteredVillains.length === 0 ? (
          <div className="text-center py-28 w-full flex flex-col items-center justify-center animate-in fade-in duration-300">
            <h3 className="text-sm font-mono tracking-[0.25em] uppercase text-white font-bold drop-shadow">
              NO RECORDS FOUND
            </h3>
            <p className="text-xs font-mono tracking-wide text-stone-300 mt-1.5 max-w-sm mx-auto">
              No entity matches the active search query or tier filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTier("all");
              }}
              className="mt-5 text-stone-200 hover:text-white text-[10px] font-mono tracking-widest uppercase cursor-pointer bg-white/10 border border-white/20 px-4 py-1.5 rounded-full hover:bg-white/20 transition-colors"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-14 animate-in fade-in-0 slide-in-from-bottom-8 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <section className="flex flex-col gap-6 scroll-mt-36 sm:scroll-mt-28">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3 border-b border-white/15 pb-3">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span className="text-[10.5px] sm:text-xs font-mono font-bold tracking-[0.2em] text-white uppercase bg-white/15 border border-white/10 px-2.5 py-1 rounded shrink-0 drop-shadow">
                    {activeTierMeta.badge}
                  </span>
                  <span className="text-xs sm:text-sm font-mono tracking-[0.15em] text-white uppercase font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    {activeTierMeta.title}
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-mono text-stone-300 font-medium uppercase tracking-widest pl-0.5 sm:pl-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {filteredVillains.length} ENTITIES
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredVillains.map((villain) => (
                  <StampTopTierCard
                    key={villain.rank}
                    villain={villain}
                  />
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

