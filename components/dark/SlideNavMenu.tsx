"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, Film, Users, Gem, Globe, ShieldAlert, Bookmark, Share2 } from "lucide-react";
import { useTimelineState } from "@/context/TimelineStateContext";

interface SlideNavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_ITEMS = [
  {
    href: "/",
    label: "SACRED TIMELINE & MOVIES",
    desc: "Chronological Phase journey & films",
    icon: Film,
  },
  {
    href: "/characters",
    label: "CHARACTER DOSSIERS",
    desc: "Heroes, villains, variants & lineages",
    icon: Users,
  },
  {
    href: "/artifacts",
    label: "COSMIC RELICS VAULT",
    desc: "Infinity stones, Darkhold & divine relics",
    icon: Gem,
  },
  {
    href: "/multiverse",
    label: "MULTIVERSE MAP & REALITIES",
    desc: "Branching timelines, Earth-616, 838 & TVA",
    icon: Globe,
  },
  {
    href: "/doomsday",
    label: "DOOMSDAY HORIZON",
    desc: "Secret Wars countdown & incursion nexus",
    icon: ShieldAlert,
  },
  {
    href: "/watchlist",
    label: "YOUR SAGA WATCHLIST",
    desc: "Track completed movies and series",
    icon: Bookmark,
  },
  {
    href: "/web",
    label: "INTERACTIVE COSMIC WEB",
    desc: "Full entanglement graph and node web",
    icon: Share2,
  },
];

export default function SlideNavMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { currentPhase } = useTimelineState();

  // Close on escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex select-none">
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      {/* Slide-out Menu Panel */}
      <aside className="relative z-10 w-full max-w-sm sm:max-w-md bg-[#050508]/95 border-r border-stone-800/80 h-full flex flex-col justify-between p-6 sm:p-8 shadow-2xl animate-in slide-in-from-left duration-300">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-stone-800/80">
            <div>
              <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-stone-500">
                NAVIGATION
              </p>
              <h2 className="text-xs font-mono tracking-[0.3em] uppercase text-white font-bold mt-1">
                MARVEL CINEMATIC UNIVERSE
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-stone-500 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/5 cursor-pointer"
              aria-label="Close Navigation"
            >
              <X size={18} />
            </button>
          </div>

          {/* Current Phase Indicator */}
          <div className="mt-5 mb-4 px-3 py-2 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono">
            <span className="text-stone-400">ACTIVE TIMELINE POINT</span>
            <span className="text-white font-bold">PHASE {currentPhase}</span>
          </div>

          {/* Navigation Items List */}
          <nav className="flex flex-col gap-2 mt-4">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="group flex items-start gap-3.5 p-3 rounded-xl border border-stone-900/60 hover:border-white/30 bg-stone-950/40 hover:bg-white/5 transition-all"
                >
                  <div className="p-2 rounded-lg bg-stone-900 border border-stone-800 group-hover:border-white/40 text-stone-400 group-hover:text-white transition-colors mt-0.5 shrink-0">
                    <Icon size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-mono tracking-wider font-semibold text-stone-200 group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                    <span className="text-[10px] font-mono text-stone-500 group-hover:text-stone-400 transition-colors mt-0.5">
                      {item.desc}
                    </span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-stone-800/80 flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-stone-500">
          <span>THE SACRED TIMELINE</span>
          <span className="text-stone-400">MCU 2008 – 2027</span>
        </div>
      </aside>
    </div>
  );
}
