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
  const [openSection, setOpenSection] = useState<"who" | "what" | "when" | null>(null);

  // Toggle accordion sections
  const toggleSection = (section: "who" | "what" | "when") => {
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
    <div className="fixed inset-0 z-50 flex select-none animate-in fade-in duration-200">
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-out Menu Panel */}
      <aside className="relative z-10 w-full max-w-[360px] sm:max-w-[400px] bg-[#000000] border-r border-stone-900/90 h-full flex flex-col justify-between p-6 sm:p-8 shadow-[10px_0_40px_rgba(0,0,0,0.9)] animate-in slide-in-from-left duration-300 overflow-y-auto">
        
        {/* Top Header */}
        <div>
          {/* Close Button X */}
          <div className="flex justify-end items-center mb-8">
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-white transition-colors p-1 rounded-sm cursor-pointer"
              aria-label="Close Navigation Menu"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Primary Accordion Navigation Sections */}
          <div className="border-t border-stone-900 flex flex-col">
            
            {/* WHO SECTION */}
            <div className="border-b border-stone-900">
              <button
                onClick={() => toggleSection("who")}
                className="w-full py-5 flex items-center justify-between text-left group cursor-pointer"
              >
                <span className="font-mono text-sm tracking-[0.4em] uppercase text-stone-300 group-hover:text-white transition-colors">
                  W H O
                </span>
                <ChevronDown
                  size={16}
                  strokeWidth={1.5}
                  className={`text-stone-500 group-hover:text-stone-300 transition-transform duration-300 ${
                    openSection === "who" ? "rotate-180 text-white" : ""
                  }`}
                />
              </button>

              {/* Submenu Links for WHO */}
              {openSection === "who" && (
                <div className="pb-4 pl-2 flex flex-col gap-2.5 animate-in slide-in-from-top-2 duration-200">
                  <Link
                    href="/characters"
                    onClick={onClose}
                    className="text-xs font-mono tracking-[0.2em] uppercase text-stone-400 hover:text-white hover:translate-x-1 transition-all py-1"
                  >
                    • Characters
                  </Link>
                  <Link
                    href="/characters"
                    onClick={onClose}
                    className="text-xs font-mono tracking-[0.2em] uppercase text-stone-400 hover:text-white hover:translate-x-1 transition-all py-1"
                  >
                    • Earth-616 Avengers
                  </Link>
                  <Link
                    href="/characters"
                    onClick={onClose}
                    className="text-xs font-mono tracking-[0.2em] uppercase text-stone-400 hover:text-white hover:translate-x-1 transition-all py-1"
                  >
                    • Guardians & Cosmic Entities
                  </Link>
                  <Link
                    href="/characters"
                    onClick={onClose}
                    className="text-xs font-mono tracking-[0.2em] uppercase text-stone-400 hover:text-white hover:translate-x-1 transition-all py-1"
                  >
                    • Multiversal Variants
                  </Link>
                  <Link
                    href="/characters"
                    onClick={onClose}
                    className="text-xs font-mono tracking-[0.2em] uppercase text-stone-400 hover:text-white hover:translate-x-1 transition-all py-1"
                  >
                    • Incursion Villains & Threats
                  </Link>
                </div>
              )}
            </div>

            {/* WHAT SECTION */}
            <div className="border-b border-stone-900">
              <button
                onClick={() => toggleSection("what")}
                className="w-full py-5 flex items-center justify-between text-left group cursor-pointer"
              >
                <span className="font-mono text-sm tracking-[0.4em] uppercase text-stone-300 group-hover:text-white transition-colors">
                  W H A T
                </span>
                <ChevronDown
                  size={16}
                  strokeWidth={1.5}
                  className={`text-stone-500 group-hover:text-stone-300 transition-transform duration-300 ${
                    openSection === "what" ? "rotate-180 text-white" : ""
                  }`}
                />
              </button>

              {/* Submenu Links for WHAT */}
              {openSection === "what" && (
                <div className="pb-4 pl-2 flex flex-col gap-2.5 animate-in slide-in-from-top-2 duration-200">
                  <Link
                    href="/artifacts"
                    onClick={onClose}
                    className="text-xs font-mono tracking-[0.2em] uppercase text-stone-400 hover:text-white hover:translate-x-1 transition-all py-1"
                  >
                    • Cosmic Relics Vault
                  </Link>
                  <Link
                    href="/artifacts"
                    onClick={onClose}
                    className="text-xs font-mono tracking-[0.2em] uppercase text-stone-400 hover:text-white hover:translate-x-1 transition-all py-1"
                  >
                    • Infinity Stones & Relics
                  </Link>
                  <Link
                    href="/multiverse"
                    onClick={onClose}
                    className="text-xs font-mono tracking-[0.2em] uppercase text-stone-400 hover:text-white hover:translate-x-1 transition-all py-1"
                  >
                    • Multiverse Map & Realities
                  </Link>
                  <Link
                    href="/web"
                    onClick={onClose}
                    className="text-xs font-mono tracking-[0.2em] uppercase text-stone-400 hover:text-white hover:translate-x-1 transition-all py-1"
                  >
                    • Interactive Cosmic Web
                  </Link>
                </div>
              )}
            </div>

            {/* WHEN SECTION */}
            <div className="border-b border-stone-900">
              <button
                onClick={() => toggleSection("when")}
                className="w-full py-5 flex items-center justify-between text-left group cursor-pointer"
              >
                <span className="font-mono text-sm tracking-[0.4em] uppercase text-stone-300 group-hover:text-white transition-colors">
                  W H E N
                </span>
                <ChevronDown
                  size={16}
                  strokeWidth={1.5}
                  className={`text-stone-500 group-hover:text-stone-300 transition-transform duration-300 ${
                    openSection === "when" ? "rotate-180 text-white" : ""
                  }`}
                />
              </button>

              {/* Submenu Links for WHEN */}
              {openSection === "when" && (
                <div className="pb-4 pl-2 flex flex-col gap-2.5 animate-in slide-in-from-top-2 duration-200">
                  <Link
                    href="/timeline"
                    onClick={onClose}
                    className="text-xs font-mono tracking-[0.2em] uppercase text-stone-400 hover:text-white hover:translate-x-1 transition-all py-1 flex items-center justify-between"
                  >
                    <span>• Sacred Timeline Map</span>
                    <span className="text-[10px] text-stone-500">2008–2027</span>
                  </Link>
                  <Link
                    href="/"
                    onClick={onClose}
                    className="text-xs font-mono tracking-[0.2em] uppercase text-stone-400 hover:text-white hover:translate-x-1 transition-all py-1 flex items-center justify-between text-amber-400/90 hover:text-amber-300"
                  >
                    <span>• Phase Selector Intro</span>
                    <span className="text-[9px] bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded text-amber-300">HOME</span>
                  </Link>
                  {[1, 2, 3, 4, 5, 6].map((phaseNum) => (
                    <Link
                      key={phaseNum}
                      href={`/timeline?phase=${phaseNum}`}
                      onClick={() => {
                        setCurrentPhase(phaseNum);
                        onClose();
                      }}
                      className="text-left text-xs font-mono tracking-[0.2em] uppercase text-stone-400 hover:text-white hover:translate-x-1 transition-all py-1 flex items-center justify-between cursor-pointer"
                    >
                      <span className={currentPhase === phaseNum ? "text-white font-bold" : ""}>
                        • Phase {phaseNum} {phaseNum === 1 ? "Assemble" : phaseNum === 2 ? "Age of Heroes" : phaseNum === 3 ? "Infinity War" : phaseNum === 4 ? "Multiverse" : phaseNum === 5 ? "Kang Dynasty" : "Secret Wars"}
                      </span>
                      {currentPhase === phaseNum && (
                        <span className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded text-white">ACTIVE</span>
                      )}
                    </Link>
                  ))}
                  <Link
                    href="/doomsday"
                    onClick={onClose}
                    className="text-xs font-mono tracking-[0.2em] uppercase text-stone-400 hover:text-white hover:translate-x-1 transition-all py-1 flex items-center justify-between text-rose-400/90 hover:text-rose-300"
                  >
                    <span>• Doomsday Horizon</span>
                    <span className="text-[9px] bg-rose-950 border border-rose-800/60 px-1.5 py-0.5 rounded text-rose-300">ALERT</span>
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>

      </aside>
    </div>
  );
}
