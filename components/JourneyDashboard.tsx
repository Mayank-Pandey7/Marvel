"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import { MCU } from "@/data/mcu";
import { useWatched } from "@/context/WatchedContext";
import { getProgress, getContinueItem } from "@/lib/progress";

export default function JourneyDashboard() {
  const { watched } = useWatched();
  const { total, watchedCount, pct } = getProgress(watched);
  const continueItem = getContinueItem(watched);

  const movies = MCU.filter((m) => m.type === "movie");
  const series = MCU.filter((m) => m.type !== "movie");

  return (
    <section id="journey" className="px-4 sm:px-8 py-24 max-w-5xl mx-auto scroll-mt-20">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] text-blood uppercase mb-2">Your MCU Journey</p>
        <h2 className="text-3xl sm:text-4xl font-display font-black text-white mb-8">
          {watchedCount} / {total} WATCHED
        </h2>
      </Reveal>

      <Reveal delay={100}>
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-2">
          <div className="h-full bg-blood rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-xs text-stone-500 tabular-nums mb-10">{pct.toFixed(1)}% complete</p>
      </Reveal>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          ["Watched", watchedCount],
          ["Remaining", total - watchedCount],
          ["Movies watched", `${movies.filter((m) => watched.has(m.id)).length} / ${movies.length}`],
          ["Series watched", `${series.filter((m) => watched.has(m.id)).length} / ${series.length}`],
        ].map(([label, val]) => (
          <div key={label as string} className="border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xl font-bold text-white">{val}</p>
            <p className="text-[10px] tracking-wider uppercase text-stone-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {continueItem && (
        <Reveal delay={150}>
          <div className="border border-red-900/40 bg-gradient-to-r from-red-950/30 to-transparent p-5 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-blood mb-1">Continue Watching</p>
              <p className="text-white font-semibold">{continueItem.title}</p>
              <p className="text-xs text-stone-500 mt-0.5">Phase {continueItem.phase} · {continueItem.year}</p>
            </div>
            <Link
              href={`/movie/${continueItem.id}`}
              className="px-5 py-2.5 bg-white text-black text-xs tracking-[0.15em] uppercase font-medium hover:bg-stone-200 transition-colors"
            >
              Continue Journey
            </Link>
          </div>
        </Reveal>
      )}
    </section>
  );
}
