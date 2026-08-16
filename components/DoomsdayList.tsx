"use client";

import Link from "next/link";
import { ShieldAlert, Flame, Zap, ArrowRight, Skull } from "lucide-react";
import { MCU, DOOMSDAY_ESSENTIALS } from "@/data/mcu";
import Reveal from "./Reveal";

export default function DoomsdayList() {
  const items = MCU.filter((m) => DOOMSDAY_ESSENTIALS.includes(m.id));

  return (
    <div className="relative max-w-5xl mx-auto text-left">
      <Reveal>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-mono tracking-widest uppercase mb-3">
          <Skull size={12} />
          <span>INCURSION HORIZON WARNING</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight">
          AVENGERS: DOOMSDAY
        </h1>
        <p className="mt-2 text-stone-400 text-sm font-mono">
          «All universes die. The question is what survives in the fire of Victor von Doom.»
        </p>
      </Reveal>

      {/* Narrative Incursion Briefing */}
      <Reveal delay={100}>
        <div className="mt-8 bg-black/60 border border-stone-800 rounded-xl p-6">
          <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-amber-300 mb-2">
            Multiversal Convergence Protocol:
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            As multiversal boundaries deteriorate following dreamwalking incursions, time-heist paradoxes, and the unravelling of the Sacred Timeline, universes are drawn on fatal collision courses. The emergence of Victor von Doom signals the collapse of the existing multiverse hierarchy toward Battleworld.
          </p>
        </div>
      </Reveal>

      {/* Critical Narrative Anchor Points */}
      <Reveal delay={200}>
        <div className="mt-8">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-400 mb-4 flex items-center gap-2">
            <Zap size={14} className="text-amber-400" />
            Essential Prelude Chapters ({items.length} Narrative Foundations)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {items.map((m, idx) => (
              <Link
                key={m.id}
                href={`/movie/${m.id}`}
                className="p-4 rounded-xl bg-black/50 border border-stone-800/80 hover:border-red-500/50 transition-all flex flex-col justify-between group hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 mb-1">
                    <span>#{idx + 1} · Phase {m.phase}</span>
                    <span>{m.year}</span>
                  </div>
                  <h4 className="text-sm font-bold text-stone-200 group-hover:text-amber-300 transition-colors">
                    {m.title}
                  </h4>
                  <p className="text-[11px] text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                    {m.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-800/60 flex items-center justify-between text-[10px] font-mono text-stone-500">
                  <span>{m.type.toUpperCase()}</span>
                  <span className="text-red-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Inspect Entry <ArrowRight size={10} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Reveal>

      <p className="mt-10 text-[11px] font-mono text-stone-600 max-w-2xl leading-relaxed border-t border-stone-800/60 pt-4">
        Narrative setup based on confirmed Marvel Studios timeline milestones. Character affiliations and secret appearances for Avengers: Doomsday & Secret Wars remain classified.
      </p>
    </div>
  );
}
