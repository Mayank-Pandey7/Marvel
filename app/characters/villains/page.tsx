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
        className={`text-xs sm:text-sm font-mono tracking-[0.2em] uppercase transition-colors cursor-pointer ${
          activeTab === "mcu-villains"
            ? "text-white font-bold"
            : "text-stone-500 hover:text-stone-300"
        }`}
      >
        MCU Villains Archives
      </button>

      <span className="w-px h-3 bg-stone-800 shrink-0 select-none pointer-events-none" aria-hidden="true" />

      <button
        onClick={() => router.push("/characters/villains?tab=top-tier")}
        className={`text-xs sm:text-sm font-mono tracking-[0.2em] uppercase transition-colors cursor-pointer ${
          activeTab === "top-tier"
            ? "text-purple-400 font-bold"
            : "text-stone-500 hover:text-stone-300"
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

