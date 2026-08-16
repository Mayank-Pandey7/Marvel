"use client";

import { useMemo, useState } from "react";
import MovieCard from "./MovieCard";
import { MCU } from "@/data/mcu";

const TABS = [
  { id: "all", label: "All Projects" },
  { id: "movies", label: "Feature Films" },
  { id: "series", label: "Series & Specials" },
  { id: "phase1-3", label: "Infinity Saga (Ph 1-3)" },
  { id: "phase4-6", label: "Multiverse Saga (Ph 4-6)" },
] as const;

export default function WatchlistGrid() {
  const [tab, setTab] = useState<string>("all");
  const [sort, setSort] = useState<"release" | "alpha" | "phase">("release");

  const filtered = useMemo(() => {
    let list = [...MCU];
    if (tab === "movies") list = list.filter((m) => m.type === "movie");
    if (tab === "series") list = list.filter((m) => m.type !== "movie");
    if (tab === "phase1-3") list = list.filter((m) => m.phase <= 3);
    if (tab === "phase4-6") list = list.filter((m) => m.phase >= 4);

    if (sort === "release") list.sort((a, b) => a.year - b.year);
    if (sort === "alpha") list.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "phase") list.sort((a, b) => a.phase - b.phase);
    return list;
  }, [tab, sort]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-lg border transition-colors ${
                tab === t.id
                  ? "bg-amber-500/20 border-amber-500 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                  : "bg-black/40 border-stone-800 text-stone-400 hover:text-white hover:border-stone-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="bg-stone-900 border border-stone-800 text-xs font-mono text-stone-300 px-3 py-1.5 rounded-lg outline-none"
        >
          <option value="release">Sort: Chronological Year</option>
          <option value="alpha">Sort: Alphabetical</option>
          <option value="phase">Sort: Phase Sequence</option>
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 transition-all duration-300">
        {filtered.map((e) => (
          <MovieCard key={e.id} entry={e} />
        ))}
        {filtered.length === 0 && (
          <p className="text-stone-500 text-sm col-span-full py-12 text-center font-mono">
            No entries recorded in this chronological sequence.
          </p>
        )}
      </div>
    </>
  );
}
