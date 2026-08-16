"use client";

import React from "react";
import Link from "next/link";
import PosterArt from "./PosterArt";
import Reveal from "./Reveal";
import type { MCUEntry } from "@/data/mcu";

export default function MovieCard({ entry }: { entry: MCUEntry }) {
  return (
    <Reveal className="group relative flex-shrink-0 w-40 sm:w-48">
      <Link href={`/movie/${entry.id}`} className="block">
        <div className="relative overflow-hidden border border-stone-800 rounded-xl group-hover:border-amber-500/50 transition-colors shadow-lg">
          <div className="transition-transform duration-500 group-hover:scale-105">
            <PosterArt entry={entry} />
          </div>
          <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] font-mono text-amber-300 border border-stone-800">
            PHASE {entry.phase}
          </div>
        </div>
        <p className="mt-2 text-xs font-semibold text-white leading-snug line-clamp-1 group-hover:text-amber-300 transition-colors">
          {entry.title}
        </p>
        <p className="text-[10px] font-mono text-stone-500 mt-0.5">
          {entry.year} · {entry.type.toUpperCase()}
        </p>
      </Link>
    </Reveal>
  );
}
