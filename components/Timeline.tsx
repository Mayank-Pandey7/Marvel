"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Share2 } from "lucide-react";
import Reveal from "./Reveal";
import MovieCard from "./MovieCard";
import { PHASES, MCU } from "@/data/mcu";
import { useWatched } from "@/context/WatchedContext";

export default function Timeline() {
  const { watched, order } = useWatched();

  const entries = useMemo(() => {
    // Chronological order is approximated by in-story year; a simplification of true saga chronology.
    if (order === "chronological") return [...MCU].sort((a, b) => a.year - b.year);
    return MCU;
  }, [order]);

  const grouped = useMemo(() => {
    const m = new Map<number, typeof MCU>();
    PHASES.forEach((p) => m.set(p.id, []));
    entries.forEach((e) => m.get(e.phase)?.push(e));
    return m;
  }, [entries]);

  return (
    <section id="timeline" className="px-4 sm:px-8 py-16 max-w-6xl mx-auto scroll-mt-20">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] text-blood uppercase mb-2">The Saga</p>
        <h2 className="text-3xl sm:text-4xl font-display font-black text-white mb-14">PHASE TIMELINE</h2>
      </Reveal>

      <div className="relative border-l border-white/10 ml-2 sm:ml-4">
        {PHASES.map((phase) => {
          const items = grouped.get(phase.id) || [];
          const watchedCount = items.filter((e) => watched.has(e.id)).length;
          return (
            <Reveal key={phase.id} className="relative pl-8 sm:pl-12 pb-20">
              <span className="absolute -left-[5px] top-1 w-[9px] h-[9px] rounded-full bg-blood" />
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-[11px] tracking-[0.25em] text-blood uppercase">Phase {phase.roman}</p>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">{phase.title}</h3>
                  <p className="text-xs text-stone-500 mt-1">
                    {phase.years} · {items.length} stories · {watchedCount} / {items.length} watched
                  </p>
                </div>
              </div>
              <div className="flex gap-4 overflow-x-auto mt-6 pb-2 -mx-1 px-1">
                {items.map((e) => (
                  <MovieCard key={e.id} entry={e} />
                ))}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
