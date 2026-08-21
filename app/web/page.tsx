import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import ConnectionsWeb from "@/components/ConnectionsWeb";
import { defaultFocusId, resolveNode } from "@/lib/graph";
import { Network, Sparkles, Share2 } from "lucide-react";

export const metadata: Metadata = {
  title: "The Web — Quantum Synapse Network — MCUVERSE",
  description: "Everything is connected — jump between phases, movies, and characters in one living quantum network.",
};

export default function WebPage({ searchParams }: { searchParams: { focus?: string } }) {
  const requested = searchParams?.focus;
  const focus = requested && resolveNode(requested) ? requested : defaultFocusId();

  return (
    <PageShell backHref="/timeline" backLabel="TIMELINE">
      <div className="relative min-h-[calc(100vh-80px)] w-full bg-[#000000] text-stone-300 font-sans selection:bg-white selection:text-black overflow-x-hidden">
        
        {/* Subtle Ambient Cosmic Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)] pointer-events-none" />

        <section className="relative z-10 px-4 sm:px-8 py-10 sm:py-14 max-w-6xl mx-auto flex flex-col items-center">
          
          {/* Header Section */}
          <div className="text-center mb-10 max-w-2xl flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900/80 border border-white/10 text-stone-400 text-[10px] font-mono tracking-[0.25em] uppercase mb-3 shadow-inner">
              <Share2 size={11} className="text-amber-400" />
              <span>QUANTUM SYNAPSE MATRIX</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-mono font-bold text-white tracking-[0.16em] uppercase drop-shadow-md">
              THE MCU WEB
            </h1>
            
            <p className="text-xs sm:text-sm font-mono tracking-wide text-stone-400 mt-2.5 max-w-lg leading-relaxed">
              Every story, hero, and milestone is entangled. Click any node to re-center the web and trace multiversal causality.
            </p>
          </div>

          {/* Interactive Quantum Connections Web */}
          <ConnectionsWeb initialFocus={focus} />

        </section>

      </div>
    </PageShell>
  );
}
