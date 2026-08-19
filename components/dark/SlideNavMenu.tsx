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
  const [openSection, setOpenSection] = useState<"who" | "what" | null>(null);

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

      {/* Slide-out Menu Panel */}
      <aside className="relative z-10 w-full max-w-[360px] sm:max-w-[400px] bg-[#000000] border-r border-stone-900/90 h-full flex flex-col justify-between p-6 sm:p-8 shadow-[10px_0_40px_rgba(0,0,0,0.9)] animate-in slide-in-from-left duration-300 overflow-y-auto">
        
        {/* Top Header & Navigation */}
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
                    href="/timeline?mode=family"
                    onClick={onClose}
                    className="text-xs font-mono tracking-[0.2em] uppercase text-white font-bold hover:translate-x-1 transition-all py-1 flex items-center gap-1.5"
                  >
                    • Sacred Family Tree (Dark Style)
                  </Link>
                  <Link
                    href="/characters"
                    onClick={onClose}
                    className="text-xs font-mono tracking-[0.2em] uppercase text-stone-400 hover:text-white hover:translate-x-1 transition-all py-1"
                  >
                    • All Characters
                  </Link>
                  <Link
                    href="/characters?faction=avengers"
                    onClick={onClose}
                    className="text-xs font-mono tracking-[0.2em] uppercase text-stone-400 hover:text-white hover:translate-x-1 transition-all py-1"
                  >
                    • Earth-616 Avengers
                  </Link>
                  <Link
                    href="/characters?faction=cosmic"
                    onClick={onClose}
                    className="text-xs font-mono tracking-[0.2em] uppercase text-stone-400 hover:text-white hover:translate-x-1 transition-all py-1"
                  >
                    • Guardians & Cosmic Entities
                  </Link>
                  <Link
                    href="/characters?faction=multiverse"
                    onClick={onClose}
                    className="text-xs font-mono tracking-[0.2em] uppercase text-stone-400 hover:text-white hover:translate-x-1 transition-all py-1"
                  >
                    • Multiversal & Mutants
                  </Link>
                  <Link
                    href="/characters?faction=villains"
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

          </div>
        </div>

      </aside>
    </div>
  );
}
