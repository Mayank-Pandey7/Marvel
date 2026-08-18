"use client";

import React, { useState } from "react";
import { Film, Tv, Sparkles } from "lucide-react";
import type { MCUEntry } from "@/data/mcu";
import { MCU_POSTER_MAP } from "./map/NodeArtwork";

const TYPE_ICON = { movie: Film, series: Tv, special: Sparkles } as const;

export default function PosterArt({ entry, size = "normal" }: { entry: MCUEntry; size?: "normal" | "wide" }) {
  const [imgError, setImgError] = useState(false);
  const posterData = MCU_POSTER_MAP[entry.id];
  const posterUrl = entry.poster || posterData?.poster;
  const hue = (entry.phase * 47) % 360;

  return (
    <div
      className={`relative w-full ${size === "normal" ? "aspect-[2/3]" : "aspect-[16/9]"} overflow-hidden bg-black`}
      style={{ background: `linear-gradient(160deg, hsl(${hue} 45% 12%), #0a0908 70%)` }}
    >
      {posterUrl && !imgError ? (
        <img
          src={posterUrl}
          alt={entry.title}
          onError={() => setImgError(true)}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center opacity-25">
          {React.createElement(TYPE_ICON[entry.type] || Film, { size: 48, color: "#fff" })}
        </div>
      )}

      {/* Gradient vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

      {entry.status === "upcoming" && (
        <span className="absolute top-2 right-2 text-[9px] font-mono tracking-[0.15em] uppercase bg-amber-500/90 text-black font-bold px-2 py-0.5 rounded shadow-md z-10">
          Upcoming
        </span>
      )}
    </div>
  );
}
