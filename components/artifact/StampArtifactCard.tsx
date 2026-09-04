"use client";

import React from "react";
import Link from "next/link";
import type { Artifact } from "@/data/artifacts";

export default function StampArtifactCard({
  artifact,
  index,
}: {
  artifact: Artifact;
  index: number;
}) {
  return (
    <div className="w-full max-w-[270px] mx-auto select-none">
      <Link
        href={`/artifacts/${artifact.id}`}
        className="group relative block w-full cursor-pointer rounded-none transform-gpu will-change-transform transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2.5 hover:scale-[1.04] active:scale-[0.97]"
      >
        {/* 1. PERFORATED STAMP TICKET CONTAINER (Crisp 90-Degree Square Corners) */}
        <div className="relative bg-white shadow-[0_16px_36px_rgba(0,0,0,0.65)] group-hover:shadow-[0_24px_48px_rgba(0,0,0,0.9)] p-2 rounded-none transition-shadow duration-200">
          
          {/* Scalloped Perforation Punch-Out Teeth along Top Edge */}
          <div className="absolute -top-2.5 inset-x-3 flex justify-between pointer-events-none z-30">
            {Array.from({ length: 13 }).map((_, i) => (
              <span key={`top-${i}`} className="w-4 h-4 rounded-full bg-black block shrink-0" />
            ))}
          </div>

          {/* Scalloped Perforation Punch-Out Teeth along Bottom Edge */}
          <div className="absolute -bottom-2.5 inset-x-3 flex justify-between pointer-events-none z-30">
            {Array.from({ length: 13 }).map((_, i) => (
              <span key={`bot-${i}`} className="w-4 h-4 rounded-full bg-black block shrink-0" />
            ))}
          </div>

          {/* Scalloped Perforation Punch-Out Teeth along Left Edge */}
          <div className="absolute -left-2.5 inset-y-3 flex flex-col justify-between pointer-events-none z-30">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={`left-${i}`} className="w-4 h-4 rounded-full bg-black block shrink-0" />
            ))}
          </div>

          {/* Scalloped Perforation Punch-Out Teeth along Right Edge */}
          <div className="absolute -right-2.5 inset-y-3 flex flex-col justify-between pointer-events-none z-30">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={`right-${i}`} className="w-4 h-4 rounded-full bg-black block shrink-0" />
            ))}
          </div>

          {/* 2. INNER CARD BODY */}
          <div className="relative flex flex-col gap-2 bg-white rounded-none">

            {/* 3. TOP ART WINDOW WITH SHARP SQUARE EDGES */}
            <div className="relative w-full aspect-[3/4] rounded-none overflow-hidden bg-stone-950 flex items-center justify-center">
              <img
                src={artifact.backdrop}
                alt={artifact.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-top filter brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-500 ease-out"
              />

              {/* Subtle Gradient Overlays for Depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15 pointer-events-none" />
            </div>

            {/* 4. TICKET BOTTOM SECTION */}
            <div className="flex items-end justify-between gap-2 px-1 pt-1.5 pb-0.5 border-t border-stone-100">
              <div className="flex flex-col min-w-0">
                {/* Artifact Name */}
                <h3 className="text-xs sm:text-[13.5px] font-black font-sans uppercase text-stone-900 tracking-tight leading-tight truncate group-hover:text-black">
                  {artifact.name}
                </h3>
                {/* Provenance / Category subtitle */}
                <span className="text-[9px] sm:text-[9.5px] font-mono font-semibold text-stone-500 uppercase tracking-wider mt-0.5 truncate">
                  PHASE {artifact.phaseIntroduced} · {artifact.history.length} WIELDERS
                </span>
              </div>

              {/* Black EXPLORE Button */}
              <div className="flex items-center gap-1 py-1 px-2.5 bg-black text-white text-[8.5px] sm:text-[9px] font-mono font-black tracking-wider uppercase group-hover:bg-stone-800 transition-colors shrink-0 shadow-xs">
                <span>EXPLORE &gt;</span>
              </div>
            </div>

          </div>

        </div>
      </Link>
    </div>
  );
}
