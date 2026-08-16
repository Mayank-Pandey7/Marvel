"use client";

import React, { useState } from "react";
import { useTimelineState } from "@/context/TimelineStateContext";
import { TIMELINE_BRANCHES, NEXUS_EVENTS, type TimelineBranch } from "@/data/timelineTree";
import { GitBranch, AlertTriangle, Sparkles, Activity, ShieldAlert } from "lucide-react";

export default function BranchTimelineView() {
  const { currentPhase, setSelectedNodeId } = useTimelineState();
  const [activeBranchId, setActiveBranchId] = useState<string>("sacred-timeline-616");

  const visibleBranches = TIMELINE_BRANCHES.filter((b) => b.phase <= currentPhase);
  const activeBranch = TIMELINE_BRANCHES.find((b) => b.id === activeBranchId) || visibleBranches[0];

  return (
    <div className="w-full bg-[#060609] border border-stone-900 rounded-2xl p-6 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <GitBranch size={11} />
              SACRED TIMELINE & BRANCH DYNAMICS
            </span>
            <span className="text-[10px] font-mono text-stone-500">
              Active Branches: {visibleBranches.length}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-wide">
            Multiverse Branching & Temporal Fractures
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Explore reality deviations, TVA-pruned branches, and causal paradoxes across time.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        
        {/* Left: Branch Timeline List */}
        <div className="lg:col-span-5 space-y-3">
          {visibleBranches.map((branch) => {
            const isSelected = branch.id === activeBranch.id;

            return (
              <button
                key={branch.id}
                onClick={() => setActiveBranchId(branch.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col gap-1.5 ${
                  isSelected
                    ? "bg-stone-900/90 border-amber-500/60 shadow-[0_0_18px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/40"
                    : "bg-black/50 border-stone-800/70 hover:border-stone-700 hover:bg-stone-900/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: branch.color }}
                    />
                    <span className="text-xs font-mono font-bold text-stone-200">
                      Phase {branch.phase} · {branch.year}
                    </span>
                  </div>
                  <span
                    className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded ${
                      branch.status === "active"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : branch.status === "pruned"
                        ? "bg-red-500/10 text-red-400 border border-red-500/20"
                        : branch.status === "incursion_threat"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse"
                        : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    }`}
                  >
                    {branch.status.replace("_", " ")}
                  </span>
                </div>

                <div className="text-sm font-bold text-white tracking-wide">
                  {branch.name}
                </div>

                <div className="text-[11px] text-stone-400 line-clamp-2">
                  {branch.description}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Deep Branch Inspector */}
        <div className="lg:col-span-7 bg-stone-950/80 border border-stone-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div>
                <span className="text-[10px] font-mono uppercase text-stone-500">
                  Divergence Point:
                </span>
                <div className="text-sm font-bold text-amber-300 font-mono">
                  {activeBranch.divergencePoint}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase text-stone-500">
                  Catalyst:
                </span>
                <div className="text-xs text-stone-300 font-mono">
                  {activeBranch.catalyst}
                </div>
              </div>
            </div>

            <p className="text-sm text-stone-300 my-4 leading-relaxed">
              {activeBranch.description}
            </p>

            {/* Key Temporal Milestones */}
            <div className="mt-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-400 mb-2.5 flex items-center gap-1.5">
                <Activity size={13} className="text-amber-400" />
                Key Recorded Events on this Reality Branch:
              </h4>
              <div className="space-y-2">
                {activeBranch.keyEvents.map((evt, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-black/60 border border-stone-800/80 text-xs text-stone-300 flex items-start gap-2.5"
                  >
                    <span className="text-amber-400 font-mono text-[10px] shrink-0 mt-0.5">
                      0{idx + 1}.
                    </span>
                    <span>{evt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick jump to related nexus events */}
          <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between text-xs">
            <span className="text-[10px] font-mono text-stone-500">
              Continuity: Multiverse Timeline Matrix
            </span>
            <button
              onClick={() => setSelectedNodeId("character:loki")}
              className="text-amber-400 hover:text-amber-300 font-mono text-xs uppercase tracking-wider"
            >
              Inspect Loki's Nexus Trajectory →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
