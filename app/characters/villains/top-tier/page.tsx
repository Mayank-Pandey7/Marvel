"use client";

import React, { Suspense } from "react";
import PageShell from "@/components/PageShell";
import TopTierVillainsView from "@/components/villains/TopTierVillainsView";
import Link from "next/link";
import { Flame } from "lucide-react";

export default function TopTierPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <PageShell backHref="/characters/villains" backLabel="VILLAINS">
        <div className="relative min-h-[calc(100vh-80px)] w-full bg-[#000000] text-stone-300 font-sans selection:bg-white selection:text-black">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 flex flex-col gap-8">
            <div className="flex items-center justify-between border-b border-stone-800/90 pb-4">
              <div className="flex items-center gap-6 sm:gap-8">
                <Link
                  href="/characters/villains"
                  className="text-xs sm:text-sm font-mono tracking-[0.2em] uppercase transition-all text-stone-500 hover:text-stone-300 cursor-pointer"
                >
                  MCU Villains Archives
                </Link>

                <div className="text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-purple-400 font-bold drop-shadow-[0_0_12px_rgba(192,132,252,0.4)]">
                  Top-Tier Power Hierarchy
                </div>
              </div>
            </div>

            <TopTierVillainsView />
          </div>
        </div>
      </PageShell>
    </Suspense>
  );
}
