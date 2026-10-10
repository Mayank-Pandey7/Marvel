"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CharactersContent } from "@/components/character/CharactersContent";
import TopTierHeroesView from "@/components/character/TopTierHeroesView";
import PageShell from "@/components/PageShell";

function HeroesPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") === "top-tier" || searchParams.get("tab") === "power-hierarchy" ? "top-tier" : "mcu-heroes";

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("mcu_last_character_route", window.location.pathname + window.location.search);
    }
  }, [activeTab]);

  const tabHeader = (
    <div className="flex items-center gap-4 sm:gap-6">
      <button
        onClick={() => router.push("/characters/heros")}
        className={`relative text-xs sm:text-sm font-mono tracking-[0.2em] uppercase transition-all cursor-pointer py-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] ${
          activeTab === "mcu-heroes"
            ? "text-white font-bold underline underline-offset-8 decoration-white decoration-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
            : "text-stone-300 hover:text-white font-semibold hover:underline hover:underline-offset-8 hover:decoration-white/40"
        }`}
      >
        MCU Heroes &amp; Allies
      </button>

      <span className="w-px h-3.5 bg-white/30 shrink-0 select-none pointer-events-none" aria-hidden="true" />

      <button
        onClick={() => router.push("/characters/heros?tab=top-tier")}
        className={`relative text-xs sm:text-sm font-mono tracking-[0.2em] uppercase transition-all cursor-pointer py-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] ${
          activeTab === "top-tier"
            ? "text-sky-300 font-bold underline underline-offset-8 decoration-sky-400 decoration-2 drop-shadow-[0_0_12px_rgba(56,189,248,0.6)]"
            : "text-stone-300 hover:text-white font-semibold hover:underline hover:underline-offset-8 hover:decoration-white/40"
        }`}
      >
        All-Time Powerful Heroes (Comics)
      </button>
    </div>
  );

  return (
    <PageShell backHref="/timeline" backLabel="TIMELINE">
      {activeTab === "top-tier" ? (
        <TopTierHeroesView topHeaderSlot={tabHeader} />
      ) : (
        <CharactersContent
          defaultFaction="heroes"
          titleOverride="ARCHIVES · HEROES & ALLIES"
          embedded={true}
          topHeaderSlot={tabHeader}
        />
      )}
    </PageShell>
  );
}

export default function HeroesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <HeroesPageContent />
    </Suspense>
  );
}
