"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ArrowRight, X, Sparkles } from "lucide-react";
import PageShell from "@/components/PageShell";
import { ARTIFACTS, type Artifact, type ArtifactCategory } from "@/data/artifacts";
import StampArtifactCard from "@/components/artifact/StampArtifactCard";
import { LineNav, type LineNavItem } from "@/components/line-nav";

const CATEGORIES = [
  { id: "all", title: "ALL ARTIFACTS", badge: "ALL RELICS", countId: "all" },
  { id: "infinity_stone", title: "INFINITY STONES", badge: "COSMIC SINGULARITIES", countId: "infinity_stone" },
  { id: "ironman_armor", title: "IRON MAN ARMORY", badge: "STARK TECH", countId: "ironman_armor" },
  { id: "dark_magic", title: "DARK MAGIC", badge: "FORBIDDEN OCCULT", countId: "dark_magic" },
  { id: "mystic_relic", title: "MYSTIC RELICS", badge: "KAMAR-TAJ", countId: "mystic_relic" },
  { id: "cosmic_technology", title: "COSMIC TECH & WEAPONS", badge: "GALACTIC ARSENAL", countId: "cosmic_technology" },
  { id: "asgardian_weapon", title: "ASGARDIAN RELICS", badge: "HOUSE OF ODIN", countId: "asgardian_weapon" },
  { id: "wakandan_tech", title: "WAKANDAN VIBRANIUM", badge: "GOLDEN CITY", countId: "wakandan_tech" },
];

function ArtifactsContent() {
  const searchParams = useSearchParams();
  const paramCat = searchParams.get("category");
  const paramQuery = searchParams.get("q");

  const [searchQuery, setSearchQuery] = useState(paramQuery || "");
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const catParam = urlParams.get("category");
      if (catParam && CATEGORIES.some((c) => c.id === catParam)) {
        return catParam;
      }
      try {
        const savedCat = localStorage.getItem("mcu_artifacts_category_filter");
        if (savedCat && CATEGORIES.some((c) => c.id === savedCat)) {
          return savedCat;
        }
      } catch {}
    }
    return "all";
  });

  useEffect(() => {
    if (paramCat && CATEGORIES.some((c) => c.id === paramCat)) {
      setSelectedCategory(paramCat);
    } else if (paramCat === "all" || !paramCat) {
      setSelectedCategory("all");
    }
    if (paramQuery !== null) {
      setSearchQuery(paramQuery);
    }
  }, [paramCat, paramQuery]);

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    try {
      localStorage.setItem("mcu_artifacts_category_filter", categoryId);
      const url = new URL(window.location.href);
      if (categoryId === "all") {
        url.searchParams.delete("category");
      } else {
        url.searchParams.set("category", categoryId);
      }
      window.history.replaceState({}, "", url.toString());
    } catch {}
  };

  const artifactNavItems: LineNavItem[] = useMemo(() => {
    return CATEGORIES.map((c) => {
      const count =
        c.id === "all"
          ? ARTIFACTS.length
          : ARTIFACTS.filter((a) => a.category === c.id).length;

      return {
        title: c.title,
        href: `#${c.id}`,
        count,
      };
    });
  }, []);

  const filteredArtifacts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return ARTIFACTS.filter((a) => {
      // 1. Category filter
      if (selectedCategory !== "all") {
        if (a.category !== selectedCategory) return false;
      }

      // 2. Search query filter
      if (q) {
        const nameLower = a.name.toLowerCase();
        const originLower = a.origin.toLowerCase();
        const powerLower = a.power.toLowerCase();
        const descLower = a.description.toLowerCase();

        const nameMatch = nameLower.includes(q);
        const originMatch = originLower.includes(q);
        const powerMatch = powerLower.includes(q);
        const descMatch = descLower.includes(q);

        const holderMatch = (a.history || []).some((h) =>
          h.holderName.toLowerCase().includes(q) || h.location.toLowerCase().includes(q)
        );

        if (!nameMatch && !originMatch && !powerMatch && !descMatch && !holderMatch) {
          return false;
        }
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

  const activeCategoryMeta = useMemo(() => {
    const item = CATEGORIES.find((c) => c.id === selectedCategory);
    return item || { id: "all", title: "ALL ARTIFACTS", badge: "ALL RELICS" };
  }, [selectedCategory]);

  return (
    <PageShell backHref="/timeline" backLabel="TIMELINE">
      {/* Top-Right Floating SELECT ARTIFACTS List matching /timeline styling */}
      <div
        className="fixed top-14 sm:top-20 right-3 sm:right-8 z-40 pointer-events-none flex flex-col items-end gap-1.5 origin-top-right scale-[0.82] sm:scale-100"
      >
        {/* SELECT ARTIFACTS pill */}
        <div className="pointer-events-none flex gap-0.5 rounded-full p-0.5 bg-black/85 backdrop-blur-md border border-white/15 shadow-xl whitespace-nowrap">
          <span className="rounded-full px-2.5 sm:px-3 py-1 text-[8px] sm:text-[9.5px] font-mono tracking-wider uppercase text-stone-400">
            SELECT ARTIFACTS
          </span>
        </div>

        {/* Artifact Category LineNav */}
        <div className="pointer-events-auto">
          <LineNav
            align="right"
            className="w-auto"
            items={artifactNavItems}
            activeHref={`#${selectedCategory}`}
            scrollActiveIntoView={false}
            onItemClick={(item) => {
              const key = item.href.replace("#", "");
              handleSelectCategory(key);
            }}
          />
        </div>
      </div>

      <div className="relative min-h-[calc(100vh-80px)] w-full bg-transparent text-stone-300 font-sans selection:bg-white selection:text-black">
        <div className="relative z-10 mx-auto flex flex-col gap-10 max-w-5xl px-3 sm:px-6 md:px-8 pt-10 sm:pt-12 pb-24">

          {/* Search and Overview Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 w-full">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-xs font-mono tracking-[0.25em] text-stone-400 uppercase font-bold">
                ARCHIVES · {filteredArtifacts.length} RELICS &amp; ARTIFACTS
              </span>
              <span className="text-stone-600 font-mono text-xs">•</span>
              <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-amber-400/90 uppercase font-semibold">
                {activeCategoryMeta.title}
              </span>
            </div>

            <div className="relative w-full sm:w-72 md:w-80 flex items-center bg-white/[0.04] border border-white/10 px-4 py-2 rounded-full focus-within:border-white/30 transition-all">
              <Search size={14} className="text-stone-400 shrink-0 mr-2.5" />
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

          {/* Empty State or Sections */}
          {filteredArtifacts.length === 0 ? (
            <div className="text-center py-28 w-full flex flex-col items-center justify-center animate-in fade-in duration-300">
              <h3 className="text-sm font-mono tracking-[0.25em] uppercase text-stone-300 font-bold">
                NO RECORDS FOUND
              </h3>
              <p className="text-xs font-mono tracking-wide text-stone-500 mt-1.5 max-w-sm mx-auto">
                No cosmic artifact matches the active category or search query.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  handleSelectCategory("all");
                }}
                className="mt-5 text-stone-300 hover:text-white text-[10px] font-mono tracking-widest uppercase cursor-pointer bg-white/5 border border-white/10 px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors"
              >
                RESET FILTERS
              </button>
            </div>
          ) : selectedCategory === "all" && !searchQuery ? (
            <div className="flex flex-col gap-14 animate-in fade-in-0 slide-in-from-bottom-8 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
              {CATEGORIES.filter((c) => c.id !== "all").map((cat) => {
                const items = ARTIFACTS.filter((a) => a.category === cat.id);
                if (items.length === 0) return null;
                return (
                  <section
                    key={`category-section-${cat.id}`}
                    id={`category-section-${cat.id}`}
                    className="flex flex-col gap-6 scroll-mt-36 sm:scroll-mt-28"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3 border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span className="text-[10.5px] sm:text-xs font-mono font-bold tracking-[0.2em] text-white uppercase bg-white/10 px-2.5 py-1 rounded shrink-0">
                          {cat.badge}
                        </span>
                        <span className="text-xs sm:text-sm font-mono tracking-[0.15em] text-stone-300 uppercase font-semibold">
                          {cat.title}
                        </span>
                      </div>
                      <span className="text-[9.5px] sm:text-[10.5px] font-mono text-stone-500 uppercase tracking-widest pl-0.5 sm:pl-0">
                        {items.length} {items.length === 1 ? "ARTIFACT" : "ARTIFACTS"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6">
                      {items.map((artifact, index) => (
                        <StampArtifactCard
                          key={artifact.id}
                          artifact={artifact}
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
                key={`category-section-${selectedCategory}`}
                className="flex flex-col gap-6 scroll-mt-36 sm:scroll-mt-28"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="text-[10.5px] sm:text-xs font-mono font-bold tracking-[0.2em] text-white uppercase bg-white/10 px-2.5 py-1 rounded shrink-0">
                      {searchQuery ? "SEARCH RESULTS" : activeCategoryMeta.badge}
                    </span>
                    <span className="text-xs sm:text-sm font-mono tracking-[0.15em] text-stone-300 uppercase font-semibold">
                      {searchQuery ? `QUERY: "${searchQuery.toUpperCase()}"` : activeCategoryMeta.title}
                    </span>
                  </div>
                  <span className="text-[9.5px] sm:text-[10.5px] font-mono text-stone-500 uppercase tracking-widest pl-0.5 sm:pl-0">
                    {filteredArtifacts.length} {filteredArtifacts.length === 1 ? "ARTIFACT" : "ARTIFACTS"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6">
                  {filteredArtifacts.map((artifact, index) => (
                    <StampArtifactCard
                      key={artifact.id}
                      artifact={artifact}
                      index={index}
                    />
                  ))}
                </div>
              </section>
            </div>
          )}

        </div>
      </div>
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
