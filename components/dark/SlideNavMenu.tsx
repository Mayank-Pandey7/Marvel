"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ChevronDown } from "lucide-react";
import { useTimelineState } from "@/context/TimelineStateContext";

interface SlideNavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SlideNavMenu({ isOpen, onClose }: SlideNavMenuProps) {
  const pathname = usePathname();
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

  const isTimelineActive = pathname === "/timeline" || pathname === "/";
  const isFamilyTreeActive = pathname === "/familytree";

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

      {/* Slide-out Menu Panel (Sleek Minimalist Dark Theme) */}
      <aside className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] bg-[#000000] border-r border-stone-900 h-full flex flex-col justify-between p-6 sm:p-8 shadow-[20px_0_50px_rgba(0,0,0,0.9)] animate-in slide-in-from-left duration-300 overflow-y-auto">
        
        {/* Top Header & Navigation */}
        <div>
          {/* Close Button X & Brand */}
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-stone-900">
            <Link 
              href="/timeline" 
              onClick={onClose}
              className="text-xs font-mono font-bold tracking-[0.45em] uppercase text-white hover:text-white/80 transition-opacity pl-[0.45em]"
            >
              MARVEL
            </Link>

            <button
              onClick={onClose}
              className="text-stone-400 hover:text-white transition-colors p-1 cursor-pointer"
              aria-label="Close Navigation Menu"
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>

          {/* Primary Navigation Sections */}
          <div className="flex flex-col gap-6">
            
            {/* 1. VIEW MODES / MAPS (Shown on Mobile, Hidden on Desktop where top bar has dedicated switcher) */}
            <div className="md:hidden border-b border-stone-900/80 pb-6">
              <div className="font-mono text-[11px] tracking-[0.25em] uppercase text-stone-300 font-bold mb-3.5">
                VIEW MODES
              </div>

              <div className="flex flex-col gap-2.5">
                <Link
                  href="/timeline"
                  onClick={onClose}
                  className={`text-[10px] font-mono tracking-[0.18em] uppercase hover:translate-x-1 transition-all py-1 flex items-center justify-between group ${
                    isTimelineActive
                      ? "text-white font-bold"
                      : "text-stone-400 hover:text-white"
                  }`}
                >
                  <span>Sacred Timeline Map</span>
                  {isTimelineActive && (
                    <span className="text-[8px] font-mono tracking-widest text-stone-400 uppercase">ACTIVE</span>
                  )}
                </Link>

                <Link
                  href="/familytree"
                  onClick={onClose}
                  className={`text-[10px] font-mono tracking-[0.18em] uppercase hover:translate-x-1 transition-all py-1 flex items-center justify-between group ${
                    isFamilyTreeActive
                      ? "text-white font-bold"
                      : "text-stone-400 hover:text-white"
                  }`}
                >
                  <span>Sacred Family Tree</span>
                  {isFamilyTreeActive && (
                    <span className="text-[8px] font-mono tracking-widest text-stone-400 uppercase">ACTIVE</span>
                  )}
                </Link>
              </div>
            </div>

            {/* 2. WHO SECTION */}
            <div className="overflow-hidden bg-transparent border-b border-stone-900/80 pb-6">
              <button
                onClick={() => toggleSection("who")}
                className="w-full py-1 flex items-center justify-between text-left group cursor-pointer transition-colors"
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
                <div className="pb-1 pt-3 flex flex-col gap-2.5 animate-in slide-in-from-top-2 duration-200">
                  <Link
                    href="/characters"
                    onClick={onClose}
                    className="text-[10px] font-mono tracking-[0.18em] uppercase text-stone-400 hover:text-white hover:translate-x-1 transition-all py-0.5"
                  >
                    All 100+ Characters
                  </Link>
                  <Link
                    href="/characters?faction=avengers"
                    onClick={onClose}
                    className="text-[10px] font-mono tracking-[0.18em] uppercase text-stone-400 hover:text-white hover:translate-x-1 transition-all py-0.5"
                  >
                    Earth-616 Avengers
                  </Link>
                  <Link
                    href="/characters?faction=cosmic"
                    onClick={onClose}
                    className="text-[10px] font-mono tracking-[0.18em] uppercase text-stone-400 hover:text-white hover:translate-x-1 transition-all py-0.5"
                  >
                    Guardians &amp; Cosmic
                  </Link>
                  <Link
                    href="/characters?faction=multiverse"
                    onClick={onClose}
                    className="text-[10px] font-mono tracking-[0.18em] uppercase text-stone-400 hover:text-white hover:translate-x-1 transition-all py-0.5"
                  >
                    Mutants &amp; Multiverse
                  </Link>
                </div>
              )}
            </div>

            {/* 3. WHAT SECTION */}
            <div className="overflow-hidden bg-transparent border-b border-stone-900/80 pb-6">
              <button
                onClick={() => toggleSection("what")}
                className="w-full py-1 flex items-center justify-between text-left group cursor-pointer transition-colors"
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
                <div className="pb-1 pt-3 flex flex-col gap-2.5 animate-in slide-in-from-top-2 duration-200">
                  <Link
                    href="/artifacts"
                    onClick={onClose}
                    className="text-[10px] font-mono tracking-[0.18em] uppercase text-stone-400 hover:text-white hover:translate-x-1 transition-all py-0.5"
                  >
                    Cosmic Relics Vault
                  </Link>
                  <Link
                    href="/timeline"
                    onClick={onClose}
                    className="text-[10px] font-mono tracking-[0.18em] uppercase text-stone-400 hover:text-white hover:translate-x-1 transition-all py-0.5"
                  >
                    Multiverse Map Realities
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
