"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { X, ChevronRight, User, Gem, Zap, Globe, Film } from "lucide-react";
import { MCU } from "@/data/mcu";
import { CHARACTERS } from "@/data/characters";
import { ARTIFACTS } from "@/data/artifacts";
import { NEXUS_EVENTS } from "@/data/timelineTree";
import { UNIVERSES } from "@/data/universes";
import { useTimelineState } from "@/context/TimelineStateContext";

export default function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { currentPhase, setSelectedNodeId } = useTimelineState();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const searchResults = useMemo(() => {
    if (!q.trim()) return [];
    const s = q.toLowerCase();

    const matchedCharacters = CHARACTERS.filter(
      (c) =>
        c.name.toLowerCase().includes(s) ||
        c.aliases.some((a) => a.toLowerCase().includes(s)) ||
        c.role.toLowerCase().includes(s)
    ).map((c) => ({
      id: `character:${c.id}`,
      type: "character" as const,
      title: c.name,
      subtitle: c.role,
      action: () => {
        setSelectedNodeId(`character:${c.id}`);
        onClose();
        router.push("/#graph");
      }
    }));

    const matchedArtifacts = ARTIFACTS.filter(
      (a) => a.name.toLowerCase().includes(s) || a.origin.toLowerCase().includes(s)
    ).map((a) => ({
      id: `artifact:${a.id}`,
      type: "artifact" as const,
      title: a.name,
      subtitle: a.origin,
      action: () => {
        setSelectedNodeId(`artifact:${a.id}`);
        onClose();
        router.push("/#graph");
      }
    }));

    const matchedNexus = NEXUS_EVENTS.filter(
      (n) => n.title.toLowerCase().includes(s) || n.culprit.toLowerCase().includes(s)
    ).map((n) => ({
      id: `nexus:${n.id}`,
      type: "nexus" as const,
      title: n.title,
      subtitle: `Culprit: ${n.culprit} · ${n.year}`,
      action: () => {
        setSelectedNodeId(`nexus:${n.id}`);
        onClose();
        router.push("/#graph");
      }
    }));

    const matchedProjects = MCU.filter(
      (m) =>
        m.title.toLowerCase().includes(s) ||
        String(m.year).includes(s) ||
        m.description.toLowerCase().includes(s)
    ).map((m) => ({
      id: `movie:${m.id}`,
      type: "movie" as const,
      title: m.title,
      subtitle: `Phase ${m.phase} · ${m.year}`,
      action: () => {
        onClose();
        router.push(`/movie/${m.id}`);
      }
    }));

    return [...matchedCharacters, ...matchedArtifacts, ...matchedNexus, ...matchedProjects].slice(0, 12);
  }, [q, onClose, router, setSelectedNodeId]);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center pt-20 sm:pt-28 px-4">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-stone-400 hover:text-white p-2 rounded-lg hover:bg-stone-900 transition-colors"
        aria-label="Close search"
      >
        <X size={22} />
      </button>

      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">
          <span>Cosmic Database Query</span>
          <span>·</span>
          <span>Spoiler Barrier: Phase {currentPhase}</span>
        </div>

        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search characters, Infinity Stones, nexus points, timelines..."
          className="w-full bg-stone-950/80 border border-stone-800 focus:border-amber-500/80 rounded-xl px-4 py-3.5 outline-none text-white text-lg sm:text-xl placeholder-stone-600 shadow-2xl transition-colors font-sans"
        />

        <div className="mt-4 flex flex-col divide-y divide-stone-800/60 max-h-[60vh] overflow-y-auto pr-1">
          {searchResults.map((item) => (
            <button
              key={item.id}
              onClick={item.action}
              className="flex items-center justify-between py-3.5 px-3 rounded-lg text-left hover:bg-stone-900/60 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-400 group-hover:text-amber-300 transition-colors">
                  {item.type === "character" && <User size={16} />}
                  {item.type === "artifact" && <Gem size={16} />}
                  {item.type === "nexus" && <Zap size={16} />}
                  {item.type === "movie" && <Film size={16} />}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </div>
                  <div className="text-xs text-stone-400">{item.subtitle}</div>
                </div>
              </div>
              <ChevronRight size={14} className="text-stone-600 group-hover:text-amber-400 transition-colors" />
            </button>
          ))}

          {q && searchResults.length === 0 && (
            <div className="text-stone-500 text-sm text-center py-8 font-mono">
              No anomalies found for &ldquo;{q}&rdquo; in the active timeline sector.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
