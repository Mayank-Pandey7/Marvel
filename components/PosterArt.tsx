import React from "react";
import { Film, Tv, Sparkles } from "lucide-react";
import type { MCUEntry } from "@/data/mcu";

const TYPE_ICON = { movie: Film, series: Tv, special: Sparkles } as const;

export default function PosterArt({ entry, size = "normal" }: { entry: MCUEntry; size?: "normal" | "wide" }) {
  const hue = (entry.phase * 47) % 360;
  return (
    <div
      className={`relative w-full ${size === "normal" ? "aspect-[2/3]" : "aspect-[16/9]"} overflow-hidden`}
      style={{ background: `linear-gradient(160deg, hsl(${hue} 45% 12%), #0a0908 70%)` }}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        {React.createElement(TYPE_ICON[entry.type] || Film, { size: 48, color: "#fff" })}
      </div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.75), transparent 55%)" }} />
      {entry.status === "upcoming" && (
        <span className="absolute top-2 left-2 text-[9px] tracking-[0.15em] uppercase bg-blood-deep text-white px-2 py-0.5">Upcoming</span>
      )}
    </div>
  );
}
