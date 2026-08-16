"use client";

import React from "react";
import { useTimelineState } from "@/context/TimelineStateContext";
import { NEXUS_EVENTS, type NexusEvent } from "@/data/timelineTree";
import { Zap, AlertOctagon, Sparkles, Flame, ShieldAlert } from "lucide-react";

export default function NexusEventsView() {
  const { currentPhase, setSelectedNodeId } = useTimelineState();

  const visibleEvents = NEXUS_EVENTS.filter((e) => e.phase <= currentPhase);

  return (
    <div className="w-full bg-[#060609] border border-stone-900 rounded-2xl p-6 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded bg-pink-500/10 text-pink-300 border border-pink-500/30 flex items-center gap-1">
              <Zap size={11} />
              NEXUS INCIDENTS & REALITY FRACTURES
            </span>
            <span className="text-[10px] font-mono text-stone-500">
              Recorded Events: {visibleEvents.length}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-wide">
            Causal Catalysts & Multiversal Incursions
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Key chronological points where actions tore through the space-time fabric, forcing timeline bifurcations.
          </p>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-4 mt-6">
        {visibleEvents.map((evt) => (
          <div
            key={evt.id}
            onClick={() => setSelectedNodeId(`nexus:${evt.id}`)}
            className="p-5 rounded-xl bg-black/60 border border-stone-800/80 hover:border-pink-500/50 transition-all cursor-pointer group hover:shadow-xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-pink-500/10 border border-pink-500/30 text-pink-400 font-mono text-[10px] font-bold">
                  THREAT: {evt.threatLevel}
                </span>
                <span className="text-xs font-mono text-amber-400 font-semibold">
                  Phase {evt.phase} · {evt.year}
                </span>
              </div>
              <span className="text-[10px] font-mono text-stone-500">
                Universe: {evt.universe}
              </span>
            </div>

            <h3 className="text-lg font-bold text-stone-100 group-hover:text-pink-300 transition-colors">
              {evt.title}
            </h3>
            <p className="text-xs text-stone-400 font-mono mt-0.5">
              Catalyst Agent: <span className="text-stone-300 font-semibold">{evt.culprit}</span>
            </p>

            <p className="text-sm text-stone-300 my-3 leading-relaxed">
              {evt.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-stone-800/60 mt-3">
              <div className="bg-stone-950/60 p-3 rounded-lg border border-stone-800/70">
                <div className="text-[10px] font-mono uppercase text-pink-400 mb-1">
                  Primary Multiversal Impact:
                </div>
                <p className="text-xs text-stone-300">{evt.impact}</p>
              </div>

              <div className="bg-stone-950/60 p-3 rounded-lg border border-stone-800/70">
                <div className="text-[10px] font-mono uppercase text-amber-400 mb-1">
                  Temporal Consequences:
                </div>
                <ul className="space-y-1">
                  {evt.consequences.slice(0, 2).map((c, idx) => (
                    <li key={idx} className="text-xs text-stone-300 flex items-start gap-1.5">
                      <span className="text-pink-400 text-[9px] mt-0.5">▪</span>
                      <span className="line-clamp-1">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
