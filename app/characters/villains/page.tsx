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

  return (
    <PageShell backHref="/timeline" backLabel="TIMELINE">
      <div className="relative min-h-[calc(100vh-80px)] w-full bg-[#000000] text-stone-300 font-sans selection:bg-white selection:text-black">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 flex flex-col gap-8">

          {/* Main Top Mode Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800/90 pb-4">
            <div className="flex items-center gap-6 sm:gap-8">
              <button
                onClick={() => router.push("/characters/villains")}
                className={`text-xs sm:text-sm font-mono tracking-[0.2em] uppercase transition-all cursor-pointer ${
                  activeTab === "mcu-villains"
                    ? "text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                    : "text-stone-500 hover:text-stone-300"
                }`}
              >
                MCU Villains Archives
              </button>

              <button
                onClick={() => router.push("/characters/villains?tab=top-tier")}
                className={`text-xs sm:text-sm font-mono tracking-[0.2em] uppercase transition-all cursor-pointer ${
                  activeTab === "top-tier"
                    ? "text-purple-400 font-bold drop-shadow-[0_0_12px_rgba(192,132,252,0.4)]"
                    : "text-stone-500 hover:text-stone-300"
                }`}
              >
                Top-Tier Power Hierarchy
              </button>
            </div>
          </div>

          {/* Active Tab View */}
          {activeTab === "top-tier" ? (
            <TopTierVillainsView />
          ) : (
            <CharactersContent
              defaultFaction="villains"
              titleOverride="ARCHIVES · MCU VILLAINS & THREATS"
              embedded={true}
            />
          )}

        </div>
      </div>
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

