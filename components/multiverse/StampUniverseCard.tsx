"use client";

import React from "react";
import type { UniverseDimension } from "@/data/universes";

export default function StampUniverseCard({
  universe,
  index,
  onClick,
}: {
  universe: UniverseDimension;
  index: number;
  onClick?: () => void;
}) {
  const shortDesignation = universe.designation.split("/")[0].trim();
  const shortAnchor = universe.anchorBeing.split("(")[0].trim();

  return (
    <div className="w-full select-none">
      <button
        type="button"
        onClick={onClick}
        className="group relative block w-full text-left cursor-pointer rounded-none transform-gpu will-change-transform transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2 hover:scale-[1.03] active:scale-[0.97]"
      >
        {/* 1. PERFORATED STAMP TICKET CONTAINER */}
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
            <div className="relative w-full aspect-[3/4] rounded-none overflow-hidden bg-stone-950 flex items-center justify-center">
              <img
                src={universe.backdrop}
                alt={universe.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-500 ease-out"
              />

              {/* Subtle Gradient Overlays for Depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15 pointer-events-none" />

              {/* Threat Level Chip */}
              <div className="absolute top-1.5 left-1.5 z-20">
                <span
                  className="inline-block px-1.5 py-0.5 text-[7px] sm:text-[7.5px] font-mono font-bold tracking-widest uppercase rounded-xs text-white"
                  style={{ backgroundColor: universe.color || "#e11d48" }}
                >
                  {universe.threatLevel.replace("_", " ")}
                </span>
              </div>
            </div>

            {/* 4. TICKET BOTTOM SECTION */}
            <div className="flex items-end justify-between gap-1.5 px-0.5 pt-1 pb-0.5 border-t border-stone-100">
              <div className="flex flex-col min-w-0">
                {/* Universe Name */}
                <h3 className="text-[11px] sm:text-xs font-black font-sans uppercase text-stone-900 tracking-tight leading-tight truncate group-hover:text-black">
                  {universe.name}
                </h3>
                {/* Designation / Anchor Subtitle */}
                <span className="text-[7.5px] sm:text-[8px] font-mono font-semibold text-stone-500 uppercase tracking-wider mt-0.5 truncate">
                  {shortDesignation} · {shortAnchor}
                </span>
              </div>

              {/* Black EXPLORE Button */}
              <div className="flex items-center gap-0.5 py-0.5 px-2 bg-black text-white text-[7.5px] sm:text-[8px] font-mono font-black tracking-wider uppercase group-hover:bg-stone-800 transition-colors shrink-0 shadow-xs">
                <span>VIEW &gt;</span>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
