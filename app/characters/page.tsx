import type { Metadata } from "next";
import Link from "next/link";
import { Users, Compass, Gem, ShieldAlert, Sparkles } from "lucide-react";
import PageShell from "@/components/PageShell";
import { CHARACTERS } from "@/data/characters";

export const metadata: Metadata = {
  title: "Character Dossiers — MCUVERSE Entanglement Guide",
  description: "Investigative profiles of MCU characters, multiversal variants, timeline incarnations, and relational threads.",
};

export default function CharactersPage() {
  return (
    <PageShell>
      <section className="px-4 sm:px-8 py-12 max-w-6xl mx-auto">
        <div className="flex flex-col gap-2 mb-8 pb-6 border-b border-stone-800">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-mono tracking-widest uppercase w-fit">
            <Users size={11} />
            <span>Personnel & Multiversal Entities Database</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            CHARACTER DOSSIERS
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 max-w-2xl">
            Trace the chronological evolution, multiversal branches, and relational bonds of every key figure in the Marvel Cinematic Universe.
          </p>
        </div>

        {/* Character Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CHARACTERS.map((c) => (
            <Link
              key={c.id}
              href={`/characters/${c.id}`}
              className="bg-black/60 border border-stone-800/80 hover:border-amber-500/50 rounded-xl p-5 flex flex-col justify-between group transition-all hover:scale-[1.01] hover:shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: c.color }}
                    />
                    <span className="text-[10px] font-mono uppercase text-stone-400">
                      {c.universe}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {c.eras.length} Timeline Era{c.eras.length > 1 ? "s" : ""}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {c.name}
                </h2>
                <p className="text-xs text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                  {c.role}
                </p>

                {c.aliases.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {c.aliases.slice(0, 2).map((a) => (
                      <span key={a} className="text-[9px] font-mono bg-stone-900 text-stone-400 px-1.5 py-0.5 rounded border border-stone-800">
                        {a}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-stone-800/60 flex items-center justify-between text-[11px] font-mono text-stone-500">
                <span>{c.faction}</span>
                <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform">
                  Inspect Dossier →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
