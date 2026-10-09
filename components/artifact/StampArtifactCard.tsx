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
    <div className="w-full select-none">
      <Link
        href={`/artifacts/${artifact.id}`}
        className="group relative block w-full cursor-pointer rounded-none transform-gpu will-change-transform transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2 hover:scale-[1.03] active:scale-[0.97]"
      >
        {/* 1. PERFORATED STAMP TICKET CONTAINER (Crisp 90-Degree Square Corners) */}
        <div className="relative bg-white shadow-[0_12px_28px_rgba(0,0,0,0.6)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.85)] p-2 sm:p-2.5 rounded-none transition-shadow duration-200">
          
          {/* Scalloped Perforation Punch-Out Teeth along Top Edge */}
          <div className="absolute -top-1.5 inset-x-2 flex justify-between pointer-events-none z-30">
            {Array.from({ length: 13 }).map((_, i) => (
              <span key={`top-${i}`} className="w-2.5 h-2.5 rounded-full bg-black block shrink-0" />
            ))}
          </div>

          {/* Scalloped Perforation Punch-Out Teeth along Bottom Edge */}
          <div className="absolute -bottom-1.5 inset-x-2 flex justify-between pointer-events-none z-30">
            {Array.from({ length: 13 }).map((_, i) => (
              <span key={`bot-${i}`} className="w-2.5 h-2.5 rounded-full bg-black block shrink-0" />
            ))}
          </div>

          {/* Scalloped Perforation Punch-Out Teeth along Left Edge */}
          <div className="absolute -left-1.5 inset-y-2 flex flex-col justify-between pointer-events-none z-30">
            {Array.from({ length: 18 }).map((_, i) => (
              <span key={`left-${i}`} className="w-2.5 h-2.5 rounded-full bg-black block shrink-0" />
            ))}
          </div>

          {/* Scalloped Perforation Punch-Out Teeth along Right Edge */}
          <div className="absolute -right-1.5 inset-y-2 flex flex-col justify-between pointer-events-none z-30">
            {Array.from({ length: 18 }).map((_, i) => (
              <span key={`right-${i}`} className="w-2.5 h-2.5 rounded-full bg-black block shrink-0" />
            ))}
          </div>

          {/* 2. INNER CARD BODY */}
          <div className="relative flex flex-col gap-1.5 bg-white rounded-none">

            {/* 3. TOP ART WINDOW WITH SHARP SQUARE EDGES */}
            <div className={`relative w-full aspect-[3/4] rounded-none overflow-hidden bg-stone-950 flex items-center justify-center ${artifact.category === "ironman_armor" ? "p-2" : ""}`}>
              <img
                src={artifact.backdrop}
                alt={artifact.name}
                loading="lazy"
                className={
                  artifact.category === "ironman_armor"
                    ? "w-full h-full object-contain object-center filter brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-500 ease-out drop-shadow-md"
                    : "absolute inset-0 w-full h-full object-cover object-top filter brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-500 ease-out"
                }
              />

              {/* Subtle Gradient Overlays for Depth */}
              <div
                className={
                  artifact.category === "ironman_armor"
                    ? "absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none"
                    : "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15 pointer-events-none"
                }
              />
            </div>

            {/* 4. TICKET BOTTOM SECTION */}
            <div className="flex flex-col gap-1 px-1 pt-1.5 pb-0.5">
              <div className="flex flex-col min-w-0">
                {/* Artifact Name */}
                <h3 className="text-[11.5px] sm:text-[13px] font-black font-sans uppercase text-stone-900 tracking-tight leading-tight line-clamp-2 min-h-[2.3em] flex items-center group-hover:text-black">
                  {artifact.name}
                </h3>
              </div>

              {/* Provenance Subtitle */}
              <div className="flex items-center justify-between gap-1.5 pt-0.5 text-[8.5px] sm:text-[9px] font-mono font-bold text-stone-500 uppercase tracking-wider">
                <span className="truncate">PHASE {artifact.phaseIntroduced}</span>
                <span className="shrink-0 text-stone-400 font-mono">{artifact.history.length} WIELDERS</span>
              </div>
            </div>

          </div>

        </div>
      </Link>
    </div>
  );
}
