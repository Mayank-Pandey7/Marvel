"use client";

import React, { useState } from "react";
import { useTimelineState } from "@/context/TimelineStateContext";
import { ARTIFACTS, type Artifact } from "@/data/artifacts";
import { Gem, Shield, Sparkles, Flame, Clock } from "lucide-react";

export default function ArtifactsVault() {
  const { currentPhase, setSelectedNodeId } = useTimelineState();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const visibleArtifacts = ARTIFACTS.filter((a) => a.phaseIntroduced <= currentPhase);

  const filtered = selectedCategory === "all"
    ? visibleArtifacts
    : visibleArtifacts.filter((a) => a.category === selectedCategory);

  return (
    <div className="w-full bg-[#060609] border border-stone-900 rounded-2xl p-6 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
              <Gem size={11} />
              COSMIC RELICS & INFINITY ARTIFACTS
            </span>
            <span className="text-[10px] font-mono text-stone-500">
              Unlocked: {visibleArtifacts.length} / {ARTIFACTS.length}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-wide">
            Artifacts of Power & Relic Provenance
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Trace the path of singularities, ancient tomes, and reality-altering devices through the hands of heroes and conquerors.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-black/60 p-1.5 rounded-lg border border-stone-800">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
              selectedCategory === "all" ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" : "text-stone-400 hover:text-white"
            }`}
          >
            All Relics
          </button>
          <button
            onClick={() => setSelectedCategory("infinity_stone")}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
              selectedCategory === "infinity_stone" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40" : "text-stone-400 hover:text-white"
            }`}
          >
            Infinity Stones
          </button>
          <button
            onClick={() => setSelectedCategory("dark_magic")}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
              selectedCategory === "dark_magic" ? "bg-red-500/20 text-red-300 border border-red-500/40" : "text-stone-400 hover:text-white"
            }`}
          >
            Dark Magic
          </button>
          <button
            onClick={() => setSelectedCategory("cosmic_technology")}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
              selectedCategory === "cosmic_technology" ? "bg-purple-500/20 text-purple-300 border border-purple-500/40" : "text-stone-400 hover:text-white"
            }`}
          >
            Cosmic Tech
          </button>
        </div>
      </div>

      {/* Relics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {filtered.map((artifact) => {
          const visibleHistory = artifact.history.filter((h) => h.phase <= currentPhase);
          const currentBearer = visibleHistory[visibleHistory.length - 1];

          return (
            <div
              key={artifact.id}
              onClick={() => setSelectedNodeId(`artifact:${artifact.id}`)}
              className="bg-black/60 border border-stone-800/80 hover:border-stone-700 rounded-xl p-4.5 flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.01] hover:shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="w-3 h-3 rounded-full shadow-[0_0_10px_currentColor]"
                    style={{ backgroundColor: artifact.iconColor, color: artifact.iconColor }}
                  />
                  <span className="text-[10px] font-mono text-stone-500 uppercase">
                    Phase {artifact.phaseIntroduced}
                  </span>
                </div>

                <h3 className="text-base font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                  {artifact.name}
                </h3>
                <p className="text-[11px] text-amber-400/80 font-mono mt-0.5">
                  {artifact.origin}
                </p>

                <p className="text-xs text-stone-400 my-3 line-clamp-2 leading-relaxed">
                  {artifact.description}
                </p>
              </div>

              {/* Current Bearer at Chosen Phase */}
              <div className="pt-3 border-t border-stone-800/60 mt-2">
                <div className="text-[9px] font-mono uppercase text-stone-500 mb-0.5">
                  Bearer @ Phase {currentPhase}:
                </div>
                <div className="text-xs font-semibold text-stone-200 flex items-center justify-between">
                  <span>{currentBearer ? currentBearer.holderName : "Location Obscured"}</span>
                  <span className="text-[10px] font-mono text-stone-500">
                    {currentBearer ? currentBearer.year : ""}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
