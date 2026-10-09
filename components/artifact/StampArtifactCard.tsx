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
        {/* 1. PERFORATED STAMP TICKET CONTAINER (Crisp 90-Degree Square Corners with Real Transparent Notches) */}
        <div className="relative bg-white stamp-card-perforated p-2 sm:p-2.5 rounded-none transition-shadow duration-200">
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
