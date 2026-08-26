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

  // Render centered, spacious Earth designation with high contrast support
  const renderEarthLabel = (earthId: string, designation: string, isWhiteBg: boolean = false) => {
    if (earthId === "battleworld") {
      return (
        <div className="flex flex-col items-center justify-center text-center select-none leading-tight pointer-events-none">
          <span className={`text-[7.5px] font-mono tracking-widest uppercase ${isWhiteBg ? "text-stone-700 font-bold" : "text-stone-400"}`}>BATTLE</span>
          <span className={`text-[10px] font-mono font-black tracking-wider ${isWhiteBg ? "text-black" : "text-white"}`}>WORLD</span>
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
        <span className={`text-[7.5px] font-mono tracking-[0.22em] uppercase font-bold ${isWhiteBg ? "text-stone-700" : "text-stone-400"}`}>EARTH</span>
        <span className={`font-mono ${isWhiteBg ? "text-black font-black" : "text-white"} ${numSizeClass}`}>{num}</span>
      </div>
    );
  };

  return (
    <>
      {/* ========================================================
          MOBILE COMPACT PHASE & MULTIVERSE DRAWER TRIGGER
         ======================================================== */}
      <div className="fixed left-3 top-14 z-30 md:hidden flex items-center gap-1.5">
        <button
          onClick={() => setIsEarth616Expanded((prev) => !prev)}
          className="px-3 py-1 rounded-full bg-black/80 text-stone-300 text-[9px] font-mono tracking-widest uppercase backdrop-blur-md shadow-lg flex items-center cursor-pointer active:scale-95 transition-transform"
        >
          <span>{isFullOverview ? "ALL PHASES" : `PHASE ${currentPhase || 1}`}</span>
        </button>
      </div>

      {/* Mobile Slide-Out Phases & Multiverse Sheet */}
      {isEarth616Expanded && (
        <div className="fixed inset-0 z-50 md:hidden flex select-none animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsEarth616Expanded(false)}
          />
          <aside className="relative z-10 w-full max-w-[320px] bg-[#000000] border-r border-stone-900 h-full p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-300 shadow-[20px_0_50px_rgba(0,0,0,0.9)]">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-900 mb-6">
                <span className="text-xs font-mono font-bold tracking-[0.35em] uppercase text-white">
                  SACRED TIMELINE HUD
                </span>
                <button
                  onClick={() => setIsEarth616Expanded(false)}
                  className="text-stone-400 hover:text-white transition-colors p-1 cursor-pointer"
                  aria-label="Close HUD"
                >
                  <X size={16} strokeWidth={1.5} />
                </button>
              </div>

              {/* Earth-616 Phases */}
              <div className="border-b border-stone-900/80 pb-6 mb-6">
                <div className="font-mono text-[11px] tracking-[0.25em] uppercase text-stone-300 font-bold mb-3.5">
                  EARTH-616 PHASES
                </div>

                <div className="flex flex-col gap-2.5">
                  {/* Full Timeline Tree */}
                  <button
                    onClick={() => {
                      onSelectEarth616 && onSelectEarth616();
                      setIsEarth616Expanded(false);
                    }}
                    className={`w-full text-[10px] font-mono tracking-[0.18em] uppercase hover:translate-x-1 transition-all py-1 flex items-center justify-between group cursor-pointer ${
                      isFullOverview
                        ? "text-white font-bold"
                        : "text-stone-400 hover:text-white"
                    }`}
                  >
                    <span>Full Timeline Tree</span>
                    {isFullOverview ? (
                      <span className="text-[8px] font-mono tracking-widest text-stone-400 uppercase">ACTIVE</span>
                    ) : (
                      <span className="text-[8.5px] text-stone-500 font-normal">2008–27</span>
                    )}
                  </button>

                  {/* Individual Phases 1 - 6 */}
                  {PHASES_CONFIG.map((p) => {
                    const isActive = p.id === currentPhase && !isFullOverview;
                    return (
                      <button
                        key={p.id}
                        onClick={() => {
                          onSelectPhase && onSelectPhase(p.id);
                          setIsEarth616Expanded(false);
                        }}
                        className={`w-full text-[10px] font-mono tracking-[0.18em] uppercase hover:translate-x-1 transition-all py-1 flex items-center justify-between group cursor-pointer ${
                          isActive
                            ? "text-white font-bold"
                            : "text-stone-400 hover:text-white"
                        }`}
                      >
                        <span>Phase {p.id}</span>
                        {isActive ? (
                          <span className="text-[8px] font-mono tracking-widest text-stone-400 uppercase">ACTIVE</span>
                        ) : (
                          <span className="text-[8.5px] text-stone-500 font-normal">{p.years}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Multiverse Earths */}
              <div>
                <div className="font-mono text-[11px] tracking-[0.25em] uppercase text-stone-300 font-bold mb-3.5">
                  MULTIVERSE CONTINUITIES
                </div>
                <div className="flex flex-col gap-2.5">
                  {MCU_EARTHS.filter((e) => e.id !== "earth-616").map((earth) => (
                    <button
                      key={earth.id}
                      onClick={() => {
                        setSelectedEarthModal(earth);
                        setIsEarth616Expanded(false);
                      }}
                      className="w-full text-[10px] font-mono tracking-[0.18em] uppercase hover:translate-x-1 transition-all py-1 flex items-center justify-between group text-stone-400 hover:text-white cursor-pointer"
                    >
                      <span className="font-semibold">{earth.designation}</span>
                      <span className="text-[8.5px] text-stone-500 font-normal truncate max-w-[110px] text-right">
                        {earth.name.replace("Reality", "").trim()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-stone-900 flex items-center justify-between text-[9px] font-mono tracking-[0.25em] text-stone-500 uppercase">
              <span>EARTH-616 CONTINUITY</span>
              <span>PHASE I — VI</span>
            </div>
          </aside>
        </div>
      )}

      {/* ========================================================
          VERTICAL SIDE SPINE: OVERFLOW VISIBLE (DESKTOP)
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
                          ? "w-14 h-14 bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.25)] scale-105"
                          : isSelectedEarth
                          ? "w-14 h-14 bg-stone-800 text-white shadow-[0_0_10px_rgba(255,255,255,0.15)]"
                          : "w-14 h-14 bg-[#06060c] text-stone-300 hover:text-white hover:scale-105 hover:bg-stone-900 shadow-xl"
                      }`}
                      title={`${earth.designation} · ${earth.name}`}
                      aria-label={earth.designation}
                    >
                      {renderEarthLabel(earth.id, earth.designation, is616 && isEarth616Expanded)}

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
                              ? "bg-white text-black scale-110 font-black shadow-md"
                              : "bg-black/90 text-stone-400 hover:text-white hover:scale-110 hover:bg-stone-900 shadow-md"
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
                                  ? "bg-white text-black scale-110 font-black shadow-md"
                                  : "bg-black/90 text-stone-400 hover:text-white hover:scale-110 hover:bg-stone-900 shadow-md"
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
