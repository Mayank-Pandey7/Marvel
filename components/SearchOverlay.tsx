"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { X, ChevronRight, User, Gem, Zap, Film, Search } from "lucide-react";
import { MCU } from "@/data/mcu";
import { CHARACTERS } from "@/data/characters";
import { ARTIFACTS } from "@/data/artifacts";
import { NEXUS_EVENTS } from "@/data/timelineTree";
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
    const s = q.toLowerCase().trim();

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
        onClose();
        router.push(`/characters?search=${encodeURIComponent(c.name)}`);
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
        onClose();
        router.push(`/artifacts?search=${encodeURIComponent(a.name)}`);
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
        onClose();
        router.push("/timeline");
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
        router.push(`/timeline?phase=${m.phase}&movie=${encodeURIComponent(m.id)}`);
      }
    }));

    return [...matchedCharacters, ...matchedArtifacts, ...matchedNexus, ...matchedProjects].slice(0, 16);
  }, [q, onClose, router]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none animate-in fade-in duration-200">
      {/* Transparent Dim Backdrop with Subtle Blur */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Transparent Glass Spatial Modal Container */}
      <div className="relative z-10 w-full max-w-3xl bg-black/50 backdrop-blur-md p-5 sm:p-8 flex flex-col gap-6 animate-in zoom-in-95 duration-200">
        
        {/* Borderless Search Input Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800/80">
          <div className="flex items-center gap-3.5 flex-1 mr-2">
            <Search size={16} className="text-stone-500 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="SEARCH (CHARACTERS, RELICS, MOVIES, PHASES)..."
              className="w-full bg-transparent text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-white placeholder-stone-600 focus:outline-none"
            />
          </div>

          {q && (
            <button
              onClick={() => setQ("")}
              className="text-stone-500 hover:text-stone-300 text-[10px] font-mono uppercase tracking-widest mr-2 cursor-pointer transition-colors"
            >
              CLEAR
            </button>
          )}

          <button
            onClick={onClose}
            className="text-stone-500 hover:text-white transition-colors p-1 cursor-pointer"
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results Stream with Clean Custom Scrollbar */}
        <div className="flex flex-col gap-1 max-h-[60vh] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-stone-800 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
          <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.25em] text-stone-500 uppercase px-2 mb-2">
            <span>{searchResults.length} DATABASE MATCHES</span>
            {q && <span>FILTERED</span>}
          </div>

          {searchResults.length === 0 ? (
            <div className="py-16 text-center text-xs font-mono text-stone-500 tracking-[0.2em] uppercase">
              {q ? `No anomalies found for "${q}" in the multiverse database.` : "Enter query to search characters, artifacts, and timeline nodes."}
            </div>
          ) : (
            searchResults.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                className="group w-full flex items-center justify-between p-3 sm:p-3.5 hover:bg-white/[0.04] transition-all text-left cursor-pointer border-b border-stone-900/60 last:border-b-0"
              >
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 pr-3">
                  <div className="p-2 bg-stone-900/60 border border-stone-800 text-stone-400 group-hover:text-white transition-colors shrink-0">
                    {item.type === "character" && <User size={14} />}
                    {item.type === "artifact" && <Gem size={14} />}
                    {item.type === "nexus" && <Zap size={14} />}
                    {item.type === "movie" && <Film size={14} />}
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-xs sm:text-sm font-mono font-medium text-white group-hover:text-white tracking-wider truncate">
                        {item.title}
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-mono text-stone-400 tracking-widest uppercase">
                        {item.type.toUpperCase()}
                      </span>
                    </div>

                    <span className="text-[10px] sm:text-[11px] font-mono text-stone-500 group-hover:text-stone-400 transition-colors mt-0.5 truncate max-w-xl">
                      {item.subtitle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-stone-600 group-hover:text-white transition-colors shrink-0">
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] hidden sm:inline text-stone-500 group-hover:text-white transition-colors">
                    EXPLORE
                  </span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer Hint */}
        <div className="pt-3 border-t border-stone-900/80 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-stone-500 tracking-[0.2em] uppercase">
          <div className="flex items-center gap-1.5">
            <span>PRESS</span>
            <kbd className="px-1.5 py-0.5 bg-stone-900/80 border border-stone-800 text-stone-400">ESC</kbd>
            <span>TO CLOSE</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5">
            <span>PRESS</span>
            <kbd className="px-1.5 py-0.5 bg-stone-900/80 border border-stone-800 text-stone-400">CTRL+K</kbd>
            <span>TO SEARCH</span>
          </div>
        </div>
      </div>
    </div>
  );
}
