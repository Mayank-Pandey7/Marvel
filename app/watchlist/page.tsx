import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import WatchlistGrid from "@/components/WatchlistGrid";
import { Film } from "lucide-react";

export const metadata: Metadata = {
  title: "Chronological Logbook — MCUVERSE",
  description: "Explore every MCU film, series, and special across the Infinity and Multiverse Sagas.",
};

export default function WatchlistPage() {
  return (
    <PageShell>
      <section className="px-4 sm:px-8 py-12 max-w-6xl mx-auto">
        <div className="mb-8 pb-6 border-b border-stone-800">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-mono tracking-widest uppercase mb-2">
            <Film size={11} />
            <span>SACRED CHRONOLOGY ARCHIVE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            PROJECT LOGBOOK
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-2xl">
            Filter, sort, and inspect every canonical film, television series, and special presentation across all six phases.
          </p>
        </div>
        <WatchlistGrid />
      </section>
    </PageShell>
  );
}
