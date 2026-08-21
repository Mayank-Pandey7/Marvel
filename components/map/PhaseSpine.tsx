"use client";

import React, { useState } from "react";
import { PHASES_CONFIG, MCU_EARTHS, type MCUEarth } from "@/data/movies";
import { X } from "lucide-react";
import EarthDossierPage from "./EarthDossierPage";

export default function PhaseSpine({
  currentPhase = 1,
  isFullOverview = false,
  onSelectPhase,
  onSelectEarth616,
}: {
  currentPhase?: number;
  isFullOverview?: boolean;
  onSelectPhase?: (phase: number) => void;
  onSelectEarth616?: () => void;
}) {
  const [isEarth616Expanded, setIsEarth616Expanded] = useState(false);
  const [selectedEarthModal, setSelectedEarthModal] = useState<MCUEarth | null>(null);
  const [selectedEarthId, setSelectedEarthId] = useState<string>("earth-616");

  // Render centered, spacious Earth designation (No clipping)
  const renderEarthLabel = (earthId: string, designation: string) => {
    if (earthId === "battleworld") {
      return (
        <div className="flex flex-col items-center justify-center text-center select-none leading-tight pointer-events-none">
          <span className="text-[7.5px] font-mono tracking-widest text-stone-400 uppercase">BATTLE</span>
          <span className="text-[10px] font-mono font-black text-white tracking-wider">WORLD</span>
        </div>
      );
    }

    const num = designation.replace("Earth-", "");
    const numSizeClass =
      num.length <= 3
        ? "text-[12.5px] font-bold tracking-normal"
        : num.length === 5
        ? "text-[10px] font-bold tracking-tight px-1"
        : "text-[9px] font-bold tracking-tighter px-1";

    return (
      <div className="flex flex-col items-center justify-center text-center select-none leading-tight pointer-events-none w-full">
        <span className="text-[7px] font-mono tracking-[0.22em] text-stone-400 uppercase">EARTH</span>
        <span className={`font-mono text-white ${numSizeClass}`}>{num}</span>
      </div>
    );
  };

  return (
    <>
      {/* ========================================================
          VERTICAL SIDE SPINE: OVERFLOW VISIBLE (ZERO CLIPPING / CUT-OFF)
         ======================================================== */}
      <aside className="fixed left-6 sm:left-10 top-24 z-40 select-none hidden md:flex flex-col items-start pointer-events-auto overflow-visible p-2">
        {/* Spine Connecting Track Line */}
        <div className="relative flex flex-col items-center py-2 overflow-visible">
          {/* Centered vertical track line starting below the top node center */}
          <div className="absolute top-6 bottom-0 left-7 -translate-x-1/2 w-[1.5px] bg-gradient-to-b from-stone-600 via-stone-700 to-transparent z-0 pointer-events-none" />

          {/* Earths Node Track List */}
          <div className="flex flex-col gap-5 relative z-10 overflow-visible">
            {MCU_EARTHS.map((earth) => {
              const is616 = earth.id === "earth-616";
              const isSelectedEarth = selectedEarthId === earth.id;

              return (
                <React.Fragment key={earth.id}>
                  {/* Main Earth Circular Button Container */}
                  <div className="group relative flex items-center justify-center w-14 overflow-visible">
                    <button
                      onClick={() => {
                        if (is616) {
                          setSelectedEarthId("earth-616");
                          setIsEarth616Expanded((prev) => !prev);
                        } else {
                          setSelectedEarthId(earth.id);
                          setSelectedEarthModal(earth);
                        }
                      }}
                      className={`relative flex items-center justify-center transition-all duration-300 rounded-full cursor-pointer shrink-0 z-10 ${
                        is616 && isEarth616Expanded
                          ? "w-14 h-14 bg-black border border-white/60 text-white shadow-[0_0_15px_rgba(255,255,255,0.25)] scale-105"
                          : isSelectedEarth
                          ? "w-14 h-14 bg-stone-900 border border-white/50 text-white shadow-[0_0_10px_rgba(255,255,255,0.15)]"
                          : "w-14 h-14 bg-[#06060c] border border-stone-800 hover:border-white/50 text-stone-300 hover:text-white hover:scale-105 hover:shadow-[0_0_10px_rgba(255,255,255,0.15)] shadow-xl"
                      }`}
                      title={`${earth.designation} · ${earth.name}`}
                      aria-label={earth.designation}
                    >
                      {renderEarthLabel(earth.id, earth.designation)}

                      {/* Rotating Glow Ring on Active Earth-616 */}
                      {is616 && isEarth616Expanded && (
                        <span className="absolute -inset-2 rounded-full border border-dotted border-white/35 animate-[spin_8s_linear_infinite] pointer-events-none" />
                      )}
                    </button>

                    {/* Tooltip Label on Hover (Completely unclipped) */}
                    <div
                      onClick={() => {
                        if (is616) {
                          setSelectedEarthId("earth-616");
                          setIsEarth616Expanded((prev) => !prev);
                        } else {
                          setSelectedEarthId(earth.id);
                          setSelectedEarthModal(earth);
                        }
                      }}
                      className="absolute left-16 pl-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap flex flex-col cursor-pointer pointer-events-auto z-50"
                    >
                      <span className="text-[11px] font-mono tracking-[0.25em] uppercase font-bold text-white/90 drop-shadow-[0_0_6px_rgba(255,255,255,0.3)] flex items-center gap-1.5">
                        <span>{earth.designation}</span>
                      </span>
                      <span className="text-[9px] font-mono text-stone-400 mt-0.5">
                        {earth.name} {is616 ? "· 6 Phases (44 Entries)" : ""}
                      </span>
                    </div>
                  </div>

                  {/* ========================================================
                      EARTH-616 INLINE ROLL-DOWN ACCORDION (PHASE BRANCH)
                     ======================================================== */}
                  {is616 && isEarth616Expanded && (
                    <div className="relative flex flex-col items-center gap-3 my-1 w-14 overflow-visible animate-in slide-in-from-top-3 fade-in duration-300">
                      {/* Vertical connector line */}
                      <div className="w-[1.5px] h-3 bg-white/20 pointer-events-none" />

                      {/* ALL (Full Timeline Overview) Node */}
                      <div className="group relative flex items-center justify-center w-14 overflow-visible animate-in slide-in-from-top-2 fade-in duration-200">
                        <button
                          onClick={() => onSelectEarth616 && onSelectEarth616()}
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-[9px] font-bold transition-all cursor-pointer z-10 ${
                            isFullOverview
                              ? "bg-white text-black border border-white scale-110 font-black"
                              : "bg-black/90 border border-stone-800 hover:border-white/50 text-stone-400 hover:text-white hover:scale-110"
                          }`}
                          title="View Full Earth-616 Timeline Tree"
                        >
                          <span>ALL</span>
                        </button>

                        <div
                          onClick={() => onSelectEarth616 && onSelectEarth616()}
                          className="absolute left-16 pl-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap flex flex-col cursor-pointer z-50 pointer-events-auto"
                        >
                          <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-white">
                            FULL TIMELINE TREE
                          </span>
                          <span className="text-[8px] font-mono text-stone-400">All 6 Phases (2008 — 2027)</span>
                        </div>
                      </div>

                      {/* Phases I through VI Roll-Down Nodes */}
                      {PHASES_CONFIG.map((p, idx) => {
                        const isActive = p.id === currentPhase && !isFullOverview;

                        return (
                          <div
                            key={p.id}
                            className="group relative flex items-center justify-center w-14 overflow-visible animate-in slide-in-from-top-2 fade-in"
                            style={{ animationDuration: `${200 + idx * 40}ms` }}
                          >
                            <button
                              onClick={() => onSelectPhase && onSelectPhase(p.id)}
                              className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-[10.5px] font-bold transition-all cursor-pointer z-10 ${
                                isActive
                                  ? "bg-white text-black border border-white scale-110 font-black"
                                  : "bg-black/90 border border-stone-800 hover:border-white/50 text-stone-400 hover:text-white hover:scale-110"
                              }`}
                              title={`Direct to Phase ${p.roman} (${p.years})`}
                            >
                              <span>{p.roman}</span>
                            </button>

                            {/* Phase Tooltip: Float freely with clean visibility */}
                            <div
                              onClick={() => onSelectPhase && onSelectPhase(p.id)}
                              className={`absolute left-16 pl-4 transition-all duration-200 whitespace-nowrap flex flex-col cursor-pointer z-50 pointer-events-auto ${
                                isActive
                                  ? "opacity-100 translate-x-0"
                                  : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                              }`}
                            >
                              <span className={`text-[10px] font-mono tracking-widest uppercase font-bold ${
                                isActive ? "text-white" : "text-stone-300 group-hover:text-white"
                              }`}>
                                PHASE {p.roman} · {p.title}
                              </span>
                              <span className="text-[8px] font-mono text-stone-400">
                                {p.years} · {p.count} ENTRIES
                              </span>
                            </div>
                          </div>
                        );
                      })}

                      {/* Vertical connector line ending */}
                      <div className="w-[1.5px] h-3 bg-white/20 pointer-events-none" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </aside>

      {/* FULL-SCREEN MULTIVERSE REALITY DOSSIER PAGE */}
      {selectedEarthModal && (
        <EarthDossierPage
          earth={selectedEarthModal}
          onClose={() => setSelectedEarthModal(null)}
        />
      )}
    </>
  );
}
