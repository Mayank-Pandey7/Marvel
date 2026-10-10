"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CharactersContent } from "@/components/character/CharactersContent";
import TopTierVillainsView from "@/components/villains/TopTierVillainsView";
import PageShell from "@/components/PageShell";
import { ShieldAlert, Flame } from "lucide-react";

function VillainsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") === "top-tier" ? "top-tier" : "mcu-villains";

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("mcu_last_character_route", window.location.pathname + window.location.search);
    }
  }, [activeTab]);

  const tabHeader = (
    <div className="flex items-center gap-4 sm:gap-6">
      <button
        onClick={() => router.push("/characters/villains")}
        className={`relative text-xs sm:text-sm font-mono tracking-[0.2em] uppercase transition-all cursor-pointer py-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] ${
          activeTab === "mcu-villains"
            ? "text-white font-bold underline underline-offset-8 decoration-white decoration-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
            : "text-stone-300 hover:text-white font-semibold hover:underline hover:underline-offset-8 hover:decoration-white/40"
        }`}
      >
        MCU Villains Archives
      </button>

      <span className="w-px h-3.5 bg-white/30 shrink-0 select-none pointer-events-none" aria-hidden="true" />

      <button
        onClick={() => router.push("/characters/villains?tab=top-tier")}
        className={`relative text-xs sm:text-sm font-mono tracking-[0.2em] uppercase transition-all cursor-pointer py-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] ${
          activeTab === "top-tier"
            ? "text-purple-300 font-bold underline underline-offset-8 decoration-purple-400 decoration-2 drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]"
            : "text-stone-300 hover:text-white font-semibold hover:underline hover:underline-offset-8 hover:decoration-white/40"
        }`}
      >
        Top-Tier Power Hierarchy
      </button>
    </div>
  );

  return (
    <PageShell backHref="/timeline" backLabel="TIMELINE">
      {activeTab === "top-tier" ? (
        <TopTierVillainsView topHeaderSlot={tabHeader} />
      ) : (
        <CharactersContent
          defaultFaction="villains"
          titleOverride="ARCHIVES · MCU VILLAINS & THREATS"
          embedded={true}
          topHeaderSlot={tabHeader}
        />
      )}
    </PageShell>
  );
}

export default function VillainsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <VillainsPageContent />
    </Suspense>
  );
}

