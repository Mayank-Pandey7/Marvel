"use client";

import { useState } from "react";
import { UNIVERSES, type UniverseDimension } from "@/data/universes";
import { Globe, Zap, ShieldCheck, Flame, GitBranch, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function MultiverseMap() {
  const [activeUniverseId, setActiveUniverseId] = useState<string>("earth-616");

  const activeUniverse = UNIVERSES.find((u) => u.id === activeUniverseId) || UNIVERSES[0];

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Central Reality Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2.5">
        {UNIVERSES.map((u) => {
          const isSelected = u.id === activeUniverse.id;

          return (
            <button
              key={u.id}
              onClick={() => setActiveUniverseId(u.id)}
              className={`p-3 rounded-xl border flex flex-col items-center text-center gap-1.5 transition-all cursor-pointer ${
                isSelected
                  ? "bg-stone-900 border-white text-white shadow-xl scale-105 z-10"
                  : "bg-black/60 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700"
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: u.color }}
              />
              <span className="text-[11px] font-bold font-mono tracking-wider line-clamp-1">{u.name.split("(")[0].trim()}</span>
              <span className="text-[8.5px] font-mono uppercase text-stone-500 line-clamp-1">
                {u.threatLevel.replace("_", " ")}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Reality Deep Profile */}
      <div className="bg-[#070709] border border-stone-800 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Banner with local backdrop */}
        <div className="relative w-full h-48 sm:h-64 bg-stone-950 overflow-hidden">
          <img
            src={activeUniverse.backdrop}
            alt={activeUniverse.name}
            className="w-full h-full object-cover object-center filter brightness-85"
          />
          <div 
            className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${activeUniverse.color || "#fff"} 0%, transparent 70%)`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/40 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-stone-300">
                {activeUniverse.designation}
              </span>
              <h2 className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-wide flex items-center gap-3 mt-1">
                {activeUniverse.name}
                <span
                  className="w-3 h-3 rounded-full inline-block"
                  style={{ backgroundColor: activeUniverse.color }}
                />
              </h2>
            </div>

            <span
              className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/10"
              style={{ color: activeUniverse.color }}
            >
              {activeUniverse.threatLevel.replace("_", " ")}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 flex flex-col gap-6">
          {/* Narrative description */}
          <p className="text-xs sm:text-sm font-mono text-stone-300 leading-relaxed">
            {activeUniverse.description}
          </p>

          {/* Incursion Matrix */}
          <div 
            className="p-4 bg-black/40 border-l-2 flex flex-col gap-1 rounded-r-lg"
            style={{ borderColor: activeUniverse.color }}
          >
            <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-stone-400">
              <Zap size={11} style={{ color: activeUniverse.color }} />
              <span>INCURSION COLLISION VECTOR</span>
            </div>
            <p className="text-xs font-mono text-stone-200">
              {activeUniverse.incursionVector}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-800/80">
            {/* Key Inhabitants */}
            <div>
              <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400 mb-2.5">
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
              <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400 mb-2.5">
                Catalyst Nexus Incidents:
              </h3>
              {activeUniverse.keyNexusEvents.length === 0 ? (
                <p className="text-xs text-stone-500 font-mono italic">No registered nexus breaches in this sector.</p>
              ) : (
                <div className="space-y-1.5">
                  {activeUniverse.keyNexusEvents.map((ne) => (
                    <div
                      key={ne}
                      className="p-2 rounded bg-black/60 border border-stone-800/80 text-xs font-mono text-stone-300 flex items-center justify-between"
                    >
                      <span>{ne}</span>
                      <span className="text-[10px] text-amber-400 uppercase tracking-widest">Breached</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-stone-800 flex items-center justify-between text-xs font-mono">
            <span className="text-stone-500">Trans-Dimensional Coordinate Mapping</span>
            <Link
              href="/timeline"
              className="text-stone-300 hover:text-white flex items-center gap-1 uppercase tracking-wider transition-colors"
            >
              <span>Explore in Timeline Tree</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
