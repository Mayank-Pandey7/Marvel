"use client";

import React from "react";
import { useTimelineState } from "@/context/TimelineStateContext";
import { PHASES } from "@/data/mcu";
import { ShieldAlert, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

export default function TimelineScrubber() {
  const { currentPhase, setCurrentPhase } = useTimelineState();

  const activePhaseMeta = PHASES.find((p) => p.id === currentPhase) || PHASES[PHASES.length - 1];

  return (
    <section className="w-full border-y border-stone-800/80 bg-[#07070b]/95 backdrop-blur-md px-4 py-3.5 select-none relative z-30 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Spoiler Barrier Indicator */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] tracking-widest uppercase font-mono">
            <ShieldAlert size={12} className="text-amber-400 animate-pulse" />
            <span>Temporal Barrier</span>
          </div>
          <div>
            <div className="text-xs font-semibold text-stone-100 flex items-center gap-2">
              <span>Phase {activePhaseMeta.roman}: {activePhaseMeta.title}</span>
              <span className="text-[10px] font-mono text-stone-500">({activePhaseMeta.years})</span>
            </div>
            <p className="text-[10px] text-stone-400">
              Only narrative connections revealed up to Phase {activePhaseMeta.roman} are visible. Future events remain sealed.
            </p>
          </div>
        </div>

        {/* Center/Right: Interactive Scrubber Steps */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-center">
          <button
            onClick={() => setCurrentPhase(Math.max(1, currentPhase - 1))}
            disabled={currentPhase <= 1}
            className="p-1 rounded text-stone-500 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Step back in time"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex items-center gap-1.5 bg-black/60 p-1.5 rounded-lg border border-stone-800">
            {PHASES.map((p) => {
              const isActive = p.id === currentPhase;
              const isPast = p.id < currentPhase;

              return (
                <button
                  key={p.id}
                  onClick={() => setCurrentPhase(p.id)}
                  className={`relative px-3 py-1.5 rounded text-xs font-mono transition-all flex flex-col items-center min-w-[58px] ${
                    isActive
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.25)] font-bold scale-105 z-10"
                      : isPast
                      ? "text-stone-300 hover:text-white hover:bg-stone-800/60 border border-stone-800/60"
                      : "text-stone-600 hover:text-stone-400 border border-transparent"
                  }`}
                >
                  <span className="text-[11px] tracking-wider">PH {p.roman}</span>
                  <span className="text-[8px] opacity-70">
                    {p.id === 1 ? "'08–'12" : p.id === 2 ? "'13–'15" : p.id === 3 ? "'16–'19" : p.id === 4 ? "'21–'22" : p.id === 5 ? "'23–'25" : "'25–'27"}
                  </span>
                  {isActive && (
                    <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPhase(Math.min(6, currentPhase + 1))}
            disabled={currentPhase >= 6}
            className="p-1 rounded text-stone-500 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Step forward in time"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Right shortcut: Reveal All toggle */}
        <div className="hidden lg:flex items-center gap-2">
          {currentPhase < 6 ? (
            <button
              onClick={() => setCurrentPhase(6)}
              className="text-[10px] font-mono tracking-wider uppercase text-stone-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 border border-stone-800 px-2.5 py-1 rounded bg-stone-900/60"
            >
              <Sparkles size={11} className="text-amber-400" />
              <span>Unlock Secret Wars</span>
            </button>
          ) : (
            <span className="text-[10px] font-mono tracking-wider uppercase text-amber-500/80">
              Convergence Fully Unlocked
            </span>
          )}
        </div>

      </div>
    </section>
  );
}
