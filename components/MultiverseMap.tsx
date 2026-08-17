"use client";

import { useState } from "react";
import { UNIVERSES, type UniverseDimension } from "@/data/universes";
import { Globe, AlertTriangle, ShieldCheck, Flame, GitBranch, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function MultiverseMap() {
  const [activeUniverseId, setActiveUniverseId] = useState<string>("earth-616");

  const activeUniverse = UNIVERSES.find((u) => u.id === activeUniverseId) || UNIVERSES[0];

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Central Reality Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
        {UNIVERSES.map((u) => {
          const isSelected = u.id === activeUniverse.id;

          return (
            <button
              key={u.id}
              onClick={() => setActiveUniverseId(u.id)}
              className={`p-3.5 rounded-xl border flex flex-col items-center text-center gap-1.5 transition-all ${
                isSelected
                  ? "bg-amber-500/20 border-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.25)] scale-105 z-10"
                  : "bg-black/50 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700"
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: u.color }}
              />
              <span className="text-xs font-bold font-mono tracking-wider">{u.name}</span>
              <span className="text-[9px] font-mono uppercase text-stone-500">
                {u.threatLevel.replace("_", " ")}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Reality Deep Profile */}
      <div className="bg-[#08080d] border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-400">
                {activeUniverse.designation}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide flex items-center gap-3">
              {activeUniverse.name}
              <span
                className="w-3.5 h-3.5 rounded-full inline-block"
                style={{ backgroundColor: activeUniverse.color }}
              />
            </h2>
            <p className="text-xs text-amber-300/80 font-mono mt-1">
              Governing Force: {activeUniverse.governingForce}
            </p>
          </div>

          <div>
            <div className="text-[10px] font-mono uppercase text-stone-500 text-right mb-1">
              Incursion Threat Level
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                activeUniverse.threatLevel === "STABLE"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                  : activeUniverse.threatLevel === "DESTABILIZED"
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                  : activeUniverse.threatLevel === "INCURSION_IMMINENT"
                  ? "bg-red-500/10 text-red-400 border border-red-500/30 animate-pulse"
                  : "bg-purple-500/10 text-purple-400 border border-purple-500/30"
              }`}
            >
              {activeUniverse.threatLevel.replace("_", " ")}
            </span>
          </div>
        </div>

        {/* Narrative description */}
        <p className="text-sm text-stone-300 my-6 leading-relaxed">
          {activeUniverse.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-stone-800">
          
          {/* Key Inhabitants */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-400 mb-2.5">
              Key Recorded Beings & Variants:
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {activeUniverse.keyInhabitants.map((inh) => (
                <span
                  key={inh}
                  className="px-2.5 py-1 rounded bg-stone-950 border border-stone-800 text-xs text-stone-300 font-mono"
                >
                  {inh}
                </span>
              ))}
            </div>
          </div>

          {/* Connected Nexus Events */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-400 mb-2.5">
              Catalyst Nexus Incidents:
            </h3>
            {activeUniverse.keyNexusEvents.length === 0 ? (
              <p className="text-xs text-stone-500 italic">No registered nexus breaches in this sector.</p>
            ) : (
              <div className="space-y-1.5">
                {activeUniverse.keyNexusEvents.map((ne) => (
                  <div
                    key={ne}
                    className="p-2 rounded bg-black/60 border border-stone-800/80 text-xs font-mono text-stone-300 flex items-center justify-between"
                  >
                    <span>{ne}</span>
                    <span className="text-[10px] text-amber-400">Breached</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        <div className="mt-8 pt-4 border-t border-stone-800 flex items-center justify-between text-xs font-mono">
          <span className="text-stone-500">Sacred Multiverse Coordinate Mapping</span>
          <Link
            href="/timeline"
            className="text-amber-400 hover:text-amber-300 flex items-center gap-1 uppercase tracking-wider"
          >
            Explore in Timeline Tree →
          </Link>
        </div>
      </div>
    </div>
  );
}
