"use client";

import React from "react";
import Link from "next/link";
import { TopTierVillain } from "@/data/topTierVillains";

export default function StampTopTierCard({
  villain,
}: {
  villain: TopTierVillain;
}) {
  const displayRank = String(villain.rank).padStart(2, "0");

  return (
    <div className="w-full select-none">
      <Link
        href={`/characters/${villain.characterId}`}
        className="group relative block w-full cursor-pointer rounded-none transform-gpu will-change-transform transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2 hover:scale-[1.03] active:scale-[0.97]"
      >
        {/* 1. PERFORATED STAMP TICKET CONTAINER (Crisp 90-Degree Square Corners with Real Transparent Notches) */}
        <div className="relative bg-white stamp-card-perforated p-2 sm:p-2.5 rounded-none transition-shadow duration-200">
          {/* 2. INNER CARD BODY */}
          <div className="relative flex flex-col gap-2 bg-white rounded-none">

            {/* 3. TOP ART WINDOW WITH SHARP SQUARE EDGES */}
            <div
              className="relative w-full aspect-[3/4] rounded-none overflow-hidden bg-stone-900 flex items-center justify-center"
            >
              {/* Character Artwork */}
              <img
                src={villain.image}
                alt={villain.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-top filter brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-500 ease-out"
              />

              {/* Floating Top Rank Pill */}
              <div className="absolute top-2 left-2 z-10 pointer-events-none">
                <span className="px-2 py-0.5 bg-black/85 backdrop-blur-xs text-white text-[9.5px] font-mono font-black tracking-widest uppercase border border-white/20 rounded-xs shadow-sm">
                  #{displayRank}
                </span>
              </div>

              {/* Subtle Gradient Overlays for Depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
            </div>

            {/* 4. TICKET BOTTOM SECTION */}
            <div className="flex flex-col items-center justify-center px-1.5 py-2">
              {/* Villain Name - Full Visibility */}
              <h3 className="text-[11.5px] sm:text-[13px] font-black font-sans uppercase text-stone-900 tracking-tight leading-tight line-clamp-2 min-h-[2.3em] flex items-center justify-center text-center group-hover:text-black">
                {villain.name}
              </h3>
            </div>

          </div>

        </div>
      </Link>
    </div>
  );
}
