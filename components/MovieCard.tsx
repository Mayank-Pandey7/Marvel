"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PosterArt from "./PosterArt";
import Reveal from "./Reveal";
import type { MCUEntry } from "@/data/mcu";

const IMPORTANCE_CONFIG = {
  essential: { label: "ESSENTIAL", border: "border-stone-700", text: "text-stone-200" },
  recommended: { label: "RECOMMENDED", border: "border-stone-800", text: "text-stone-400" },
  optional: { label: "OPTIONAL", border: "border-stone-800/60", text: "text-stone-500" },
} as const;

export default function MovieCard({ entry }: { entry: MCUEntry }) {
  const importance = IMPORTANCE_CONFIG[entry.importance] || IMPORTANCE_CONFIG.recommended;

  return (
    <Reveal className="group relative flex-shrink-0 w-40 sm:w-48 transition-all duration-300 ease-out">
      <Link href={`/movie/${entry.id}`} className="block">
        {}
        <div className="relative overflow-hidden bg-[#06060a] border border-stone-800/90 rounded-xl group-hover:border-stone-600 transition-all duration-300 shadow-xl group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.95),0_0_20px_rgba(255,255,255,0.06)] group-hover:-translate-y-1.5 group-hover:scale-[1.02]">

          {}
          <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out" />

          {}
          <div className="transition-transform duration-500 ease-out group-hover:scale-105">
            <PosterArt entry={entry} />
          </div>

          {}
          <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10 pointer-events-none">
            <div className="bg-black/90 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-mono tracking-widest font-semibold text-stone-300 border border-stone-800 shadow-md">
              PHASE {entry.phase}
            </div>

            <div className={`bg-black/90 backdrop-blur-md px-1.5 py-0.5 rounded text-[8px] font-mono tracking-widest border ${importance.border} ${importance.text} shadow-md`}>
              {importance.label}
            </div>
          </div>

          {}
          <div className="absolute inset-x-0 bottom-0 z-10 p-3 bg-gradient-to-t from-black via-black/95 to-transparent translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-250 ease-out flex flex-col justify-end">
            <p className="text-[10px] text-stone-400 line-clamp-2 leading-relaxed font-mono">
              {entry.description}
            </p>
            <div className="mt-2 flex items-center justify-between text-[9px] font-mono tracking-widest uppercase text-stone-300 group-hover:text-white pt-1.5 border-t border-stone-800">
              <span>EXPLORE DOSSIER</span>
              <ArrowUpRight size={11} className="text-stone-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {}
        <div className="mt-2.5 px-0.5">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-stone-200 leading-snug line-clamp-1 group-hover:text-white transition-colors">
            {entry.title}
          </p>
          <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-stone-500 mt-0.5">
            <span>{entry.year}</span>
            <span>·</span>
            <span className="uppercase text-stone-400">{entry.type}</span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
