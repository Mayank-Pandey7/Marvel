"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, ChevronDown } from "lucide-react";
import { useTimelineState } from "@/context/TimelineStateContext";

interface SlideNavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SlideNavMenu({ isOpen, onClose }: SlideNavMenuProps) {
  const router = useRouter();
  const { currentPhase, setCurrentPhase } = useTimelineState();

  // Accordion open states
  const [openSection, setOpenSection] = useState<"who" | "what" | null>("who");

  // Toggle accordion sections
  const toggleSection = (section: "who" | "what") => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      role="dialog" 
      aria-modal="true" 
      aria-label="Universe Navigation Menu"
      className="fixed inset-0 z-50 flex select-none animate-in fade-in duration-200"
    >
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-out Menu Panel (Sleek High-Tech Dark Glass matching website UI) */}
      <aside className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] bg-[#000000] border-r border-stone-800/80 h-full flex flex-col justify-between p-6 sm:p-8 shadow-[20px_0_50px_rgba(0,0,0,0.9)] animate-in slide-in-from-left duration-300 overflow-y-auto">
        
        {/* Top Header & Navigation */}
        <div>
          {/* Close Button X & Brand */}
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-stone-900">
            <div className="flex items-center gap-2.5">
              <Link 
                href="/timeline" 
                onClick={onClose}
                className="text-xs font-mono font-bold tracking-[0.35em] uppercase text-white hover:text-white/80 transition-opacity"
              >
                MARVEL
              </Link>
            </div>

            <button
              onClick={onClose}
              className="text-stone-400 hover:text-white transition-colors p-1.5 rounded-sm border border-stone-800 hover:border-stone-600 bg-stone-950 cursor-pointer"
              aria-label="Close Navigation Menu"
            >
              <X size={15} strokeWidth={1.5} />
            </button>
          </div>

          {/* Primary Accordion Navigation Sections */}
          <div className="flex flex-col gap-4">
            
            {/* WHO SECTION */}
            <div className="overflow-hidden bg-transparent border-b border-stone-900/80 pb-1">
              <button
                onClick={() => toggleSection("who")}
                className="w-full px-1 py-3 flex items-center justify-between text-left group cursor-pointer transition-colors"
              >
                <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-stone-300 group-hover:text-white transition-colors font-bold">
                  WHO — HEROES &amp; FACTIONS
                </span>
                <ChevronDown
                  size={14}
                  strokeWidth={1.5}
                  className={`text-stone-500 group-hover:text-stone-300 transition-transform duration-300 ${
                    openSection === "who" ? "rotate-180 text-white" : ""
                  }`}
                />
              </button>

              {/* Submenu Links for WHO */}
              {openSection === "who" && (
                <div className="px-1 pb-3 pt-1 flex flex-col gap-2 animate-in slide-in-from-top-2 duration-200">
                  <Link
                    href="/characters"
                    onClick={onClose}
                    className="text-[10px] font-mono tracking-[0.18em] uppercase text-stone-400 hover:text-white hover:translate-x-1 transition-all py-1 flex items-center gap-2"
                  >
                    <span className="text-stone-600">•</span> All 100+ Characters
                  </Link>
                  <Link
                    href="/characters?faction=avengers"
                    onClick={onClose}
                    className="text-[10px] font-mono tracking-[0.18em] uppercase text-stone-400 hover:text-white hover:translate-x-1 transition-all py-1 flex items-center gap-2"
                  >
                    <span className="text-stone-600">•</span> Earth-616 Avengers
                  </Link>
                  <Link
                    href="/characters?faction=cosmic"
                    onClick={onClose}
                    className="text-[10px] font-mono tracking-[0.18em] uppercase text-stone-400 hover:text-white hover:translate-x-1 transition-all py-1 flex items-center gap-2"
                  >
                    <span className="text-stone-600">•</span> Guardians &amp; Cosmic
                  </Link>
                  <Link
                    href="/characters?faction=multiverse"
                    onClick={onClose}
                    className="text-[10px] font-mono tracking-[0.18em] uppercase text-stone-400 hover:text-white hover:translate-x-1 transition-all py-1 flex items-center gap-2"
                  >
                    <span className="text-stone-600">•</span> Mutants &amp; Multiverse
                  </Link>
                </div>
              )}
            </div>

            {/* WHAT SECTION */}
            <div className="overflow-hidden bg-transparent border-b border-stone-900/80 pb-1">
              <button
                onClick={() => toggleSection("what")}
                className="w-full px-1 py-3 flex items-center justify-between text-left group cursor-pointer transition-colors"
              >
                <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-stone-300 group-hover:text-white transition-colors font-bold">
                  WHAT — COSMIC ARTIFACTS
                </span>
                <ChevronDown
                  size={14}
                  strokeWidth={1.5}
                  className={`text-stone-500 group-hover:text-stone-300 transition-transform duration-300 ${
                    openSection === "what" ? "rotate-180 text-white" : ""
                  }`}
                />
              </button>

              {/* Submenu Links for WHAT */}
              {openSection === "what" && (
                <div className="px-1 pb-3 pt-1 flex flex-col gap-2 animate-in slide-in-from-top-2 duration-200">
                  <Link
                    href="/artifacts"
                    onClick={onClose}
                    className="text-[10px] font-mono tracking-[0.18em] uppercase text-stone-400 hover:text-white hover:translate-x-1 transition-all py-1 flex items-center gap-2"
                  >
                    <span className="text-stone-600">•</span> Cosmic Relics Vault
                  </Link>
                  <Link
                    href="/multiverse"
                    onClick={onClose}
                    className="text-[10px] font-mono tracking-[0.18em] uppercase text-stone-400 hover:text-white hover:translate-x-1 transition-all py-1 flex items-center gap-2"
                  >
                    <span className="text-stone-600">•</span> Multiverse Map Realities
                  </Link>
                  <Link
                    href="/web"
                    onClick={onClose}
                    className="text-[10px] font-mono tracking-[0.18em] uppercase text-stone-400 hover:text-white hover:translate-x-1 transition-all py-1 flex items-center gap-2"
                  >
                    <span className="text-stone-600">•</span> Interactive Multiverse Web
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-stone-900 flex items-center justify-between text-[9px] font-mono tracking-[0.25em] text-stone-500 uppercase">
          <span>THE SACRED TIMELINE</span>
          <span>PHASE I — VI</span>
        </div>

      </aside>
    </div>
  );
}
