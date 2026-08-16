"use client";

import React from "react";
import Link from "next/link";
import { useTimelineState } from "@/context/TimelineStateContext";
import { CHARACTERS } from "@/data/characters";
import { ARTIFACTS } from "@/data/artifacts";
import { NEXUS_EVENTS } from "@/data/timelineTree";
import { getRelationshipsForNode } from "@/data/relationships";
import { X, ExternalLink, ShieldAlert, Sparkles, Zap, Lock, Compass, Gem } from "lucide-react";

export default function CharacterDossier() {
  const { currentPhase, selectedNodeId, setSelectedNodeId } = useTimelineState();

  if (!selectedNodeId) return null;

  const [kind, rawId] = selectedNodeId.split(":");

  // Case 1: Character Dossier
  if (kind === "character") {
    const character = CHARACTERS.find((c) => c.id === rawId);
    if (!character) return null;

    const currentStatus = character.statusByPhase[currentPhase] || {
      status: "unknown",
      note: "Status obscured or unrecorded in this temporal cycle."
    };

    // Filter eras up to current phase
    const visibleEras = character.eras.filter((e) => e.phase <= currentPhase);
    const lockedErasCount = character.eras.length - visibleEras.length;

    // Filter relationships up to current phase
    const relationships = getRelationshipsForNode(character.id, currentPhase);

    // Filter artifacts up to current phase
    const possessedArtifacts = ARTIFACTS.filter(
      (a) => character.artifactsPossessed.includes(a.id) && a.phaseIntroduced <= currentPhase
    );

    return (
      <div className="w-full bg-[#08080d] border border-stone-800 rounded-2xl p-6 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={() => setSelectedNodeId(null)}
          className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded hover:bg-stone-800 transition-colors"
          title="Close Dossier"
        >
          <X size={18} />
        </button>

        {/* Top Identification Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-stone-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded bg-stone-800 text-stone-400">
                TEMPORAL DOSSIER
              </span>
              <span className="text-[10px] font-mono tracking-wider text-stone-500">
                ID: {character.id}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-wide flex items-center gap-3">
              {character.name}
              <span
                className="w-3 h-3 rounded-full inline-block"
                style={{ backgroundColor: character.color }}
              />
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">{character.role}</p>
            {character.aliases.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {character.aliases.map((alias) => (
                  <span
                    key={alias}
                    className="text-[10px] font-mono bg-stone-900 border border-stone-800 text-stone-400 px-2 py-0.5 rounded"
                  >
                    "{alias}"
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Temporal Status Badge */}
          <div className="flex flex-col items-end">
            <div className="text-[10px] font-mono text-stone-500 uppercase tracking-wider mb-1">
              Status @ Phase {currentPhase}
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                currentStatus.status === "alive"
                  ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                  : currentStatus.status === "deceased"
                  ? "bg-red-500/10 border border-red-500/30 text-red-400"
                  : currentStatus.status === "dusted"
                  ? "bg-amber-500/10 border border-amber-500/30 text-amber-400"
                  : currentStatus.status === "ascended"
                  ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-300"
                  : currentStatus.status === "variant"
                  ? "bg-purple-500/10 border border-purple-500/30 text-purple-300"
                  : "bg-stone-800 text-stone-400"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {currentStatus.status}
            </div>
            <p className="text-[11px] text-stone-400 text-right max-w-xs mt-1 italic">
              {currentStatus.note}
            </p>
          </div>
        </div>

        {/* Overview Bio */}
        <p className="text-sm text-stone-300 my-4 leading-relaxed">
          {character.overview}
        </p>

        {/* Multi-Era Incarnations (Dark-style timeline evolution) */}
        <div className="my-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-400 flex items-center gap-1.5">
              <Compass size={14} className="text-amber-400" />
              Timeline Incarnations & Eras
            </h3>
            {lockedErasCount > 0 && (
              <span className="text-[10px] font-mono text-amber-500/80 flex items-center gap-1">
                <Lock size={10} />
                {lockedErasCount} future era{lockedErasCount > 1 ? "s" : ""} sealed by spoiler barrier
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {visibleEras.map((era) => (
              <div
                key={era.eraId}
                className="bg-black/50 border border-stone-800/80 rounded-xl p-3.5 flex flex-col justify-between hover:border-stone-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      Phase {era.phase} · {era.year}
                    </span>
                    <span className="text-[9px] font-mono text-stone-500">{era.universe}</span>
                  </div>
                  <h4 className="text-xs font-bold text-stone-200 mb-1">{era.title}</h4>
                  <p className="text-[11px] text-stone-400 leading-normal">{era.description}</p>
                </div>

                {era.keyMoments.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-stone-800/60">
                    <div className="text-[9px] font-mono uppercase text-stone-500 mb-1">Key Nexus Moments:</div>
                    <ul className="space-y-0.5">
                      {era.keyMoments.map((km, i) => (
                        <li key={i} className="text-[10px] text-stone-400 flex items-center gap-1.5">
                          <span className="text-amber-400 text-[8px]">▪</span> {km}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Relics & Direct Entanglements Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-800/80">
          
          {/* Relics Held */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-400 flex items-center gap-1.5 mb-2.5">
              <Gem size={13} className="text-cyan-400" />
              Wielded Cosmic Relics
            </h3>
            {possessedArtifacts.length === 0 ? (
              <p className="text-xs text-stone-500 italic">No cosmic relics registered in this cycle.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {possessedArtifacts.map((art) => (
                  <button
                    key={art.id}
                    onClick={() => setSelectedNodeId(`artifact:${art.id}`)}
                    className="flex items-center gap-2 bg-stone-900/80 border border-stone-800 hover:border-cyan-500/50 px-2.5 py-1.5 rounded-lg text-xs text-stone-200 transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: art.iconColor }} />
                    <span>{art.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Direct Relationships */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-400 flex items-center gap-1.5 mb-2.5">
              <Zap size={13} className="text-amber-400" />
              Known Entanglements ({relationships.length})
            </h3>
            {relationships.length === 0 ? (
              <p className="text-xs text-stone-500 italic">No entanglements recorded before Phase {currentPhase}.</p>
            ) : (
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {relationships.map((rel) => {
                  const otherId = rel.source === character.id ? rel.target : rel.source;
                  const otherChar = CHARACTERS.find((c) => c.id === otherId);
                  const otherArt = ARTIFACTS.find((a) => a.id === otherId);
                  const otherName = otherChar?.name || otherArt?.name || otherId;

                  return (
                    <div
                      key={rel.id}
                      onClick={() => {
                        if (otherChar) setSelectedNodeId(`character:${otherChar.id}`);
                        if (otherArt) setSelectedNodeId(`artifact:${otherArt.id}`);
                      }}
                      className="p-2 rounded bg-stone-950/70 border border-stone-800/80 hover:border-amber-500/40 text-xs flex flex-col gap-0.5 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-stone-200 flex items-center gap-1.5">
                          <span className="text-[10px] text-amber-400 font-mono">[{rel.type.toUpperCase()}]</span>
                          {otherName}
                        </span>
                        <span className="text-[9px] font-mono text-stone-500">Ph {rel.phaseRevealed}</span>
                      </div>
                      <p className="text-[10px] text-stone-400 line-clamp-1">{rel.description}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* Footer Deep Dossier Link */}
        <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between">
          <span className="text-[10px] font-mono text-stone-500">
            Sacred Timeline & Multiverse Record · Earth-616
          </span>
          <Link
            href={`/characters/${character.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-wider"
          >
            Open Full Character Archive <ExternalLink size={12} />
          </Link>
        </div>
      </div>
    );
  }

  // Case 2: Artifact Dossier
  if (kind === "artifact") {
    const artifact = ARTIFACTS.find((a) => a.id === rawId);
    if (!artifact) return null;

    const visibleHistory = artifact.history.filter((h) => h.phase <= currentPhase);

    return (
      <div className="w-full bg-[#08080d] border border-stone-800 rounded-2xl p-6 shadow-2xl relative">
        <button
          onClick={() => setSelectedNodeId(null)}
          className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded hover:bg-stone-800 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            COSMIC RELIC ARCHIVE
          </span>
          <span className="text-[10px] font-mono text-stone-500">
            Introduced: Phase {artifact.phaseIntroduced}
          </span>
        </div>

        <h2 className="text-2xl font-bold text-white tracking-wide flex items-center gap-3">
          {artifact.name}
          <span
            className="w-3.5 h-3.5 rounded-full inline-block"
            style={{ backgroundColor: artifact.iconColor }}
          />
        </h2>
        <p className="text-xs text-amber-300/80 font-mono mt-1">Origin: {artifact.origin}</p>

        <p className="text-sm text-stone-300 my-4 leading-relaxed">{artifact.description}</p>

        <div className="my-4 p-3 bg-stone-900/60 rounded-xl border border-stone-800">
          <div className="text-[10px] font-mono uppercase text-stone-400 mb-1">Cosmic Power & Resonance:</div>
          <p className="text-xs text-stone-200 font-sans">{artifact.power}</p>
        </div>

        {/* Provenance and Custody Timeline */}
        <div className="mt-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-400 mb-3">
            Custody & Timeline Path (Up to Phase {currentPhase})
          </h3>
          <div className="space-y-2">
            {visibleHistory.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 p-2.5 rounded bg-black/40 border border-stone-800/80">
                <span className="text-[10px] font-mono text-amber-400 font-bold shrink-0 mt-0.5">
                  {step.year}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-200">
                    <span>Wielded by: {step.holderName}</span>
                    <span className="text-[9px] font-mono text-stone-500">{step.location}</span>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-0.5">{step.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Case 3: Nexus Event Dossier
  if (kind === "nexus") {
    const nexus = NEXUS_EVENTS.find((n) => n.id === rawId);
    if (!nexus) return null;

    return (
      <div className="w-full bg-[#08080d] border border-stone-800 rounded-2xl p-6 shadow-2xl relative">
        <button
          onClick={() => setSelectedNodeId(null)}
          className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded hover:bg-stone-800 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded bg-pink-500/10 text-pink-300 border border-pink-500/20">
            NEXUS POINT INCIDENT
          </span>
          <span className="text-[10px] font-mono text-red-400 font-bold">
            THREAT: {nexus.threatLevel}
          </span>
        </div>

        <h2 className="text-2xl font-bold text-white tracking-wide">{nexus.title}</h2>
        <div className="text-xs text-stone-400 font-mono mt-1">
          {nexus.year} · Universe: {nexus.universe} · Culprit: {nexus.culprit}
        </div>

        <p className="text-sm text-stone-300 my-4 leading-relaxed">{nexus.description}</p>

        <div className="my-4 p-3 bg-pink-950/20 rounded-xl border border-pink-900/40">
          <div className="text-[10px] font-mono uppercase text-pink-400 mb-1">Multiversal Impact:</div>
          <p className="text-xs text-stone-200 font-sans">{nexus.impact}</p>
        </div>

        <div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-400 mb-2">
            Cascading Temporal Consequences:
          </h3>
          <ul className="space-y-1.5">
            {nexus.consequences.map((c, i) => (
              <li key={i} className="text-xs text-stone-300 flex items-start gap-2 bg-stone-900/40 p-2 rounded border border-stone-800/60">
                <span className="text-pink-400 mt-0.5">⚡</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return null;
}
