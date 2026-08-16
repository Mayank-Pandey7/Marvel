import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import MultiverseMap from "@/components/MultiverseMap";
import { Globe, GitBranch } from "lucide-react";

export const metadata: Metadata = {
  title: "Multiverse Dimensions & Incursions — MCUVERSE",
  description: "An interactive mapping of Marvel Cinematic Multiverse dimensions: Earth-616, Earth-838, The Void, and Yggdrasil.",
};

export default function MultiversePage() {
  return (
    <PageShell>
      <section className="px-4 sm:px-8 py-12 max-w-5xl mx-auto">
        <div className="mb-8 pb-6 border-b border-stone-800">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-mono tracking-widest uppercase mb-2">
            <Globe size={11} />
            <span>Trans-Dimensional Map</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            THE MULTIVERSE
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-2xl">
            Examine known realities, threat levels, governing forces, and impending incursion collision vectors.
          </p>
        </div>

        <MultiverseMap />
      </section>
    </PageShell>
  );
}
