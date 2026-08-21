"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Menu, X, Volume2, VolumeX } from "lucide-react";
import { useTimelineState } from "@/context/TimelineStateContext";
import SlideNavMenu from "@/components/dark/SlideNavMenu";
import { useDoomsdayTransition } from "@/components/doomsday/DoomsdayTransition";

const NAV_LINKS = [
  { href: "/characters", label: "Characters" },
  { href: "/artifacts", label: "Cosmic Relics" },
  { href: "/multiverse", label: "Multiverse Map" },
];

export default function Navbar({ onSearch }: { onSearch: () => void }) {
  const { currentPhase, soundEnabled, toggleSound } = useTimelineState();
  const { triggerDoomsdayTransition } = useDoomsdayTransition();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300 px-4 sm:px-8 bg-transparent ${
        scrolled
          ? "py-3 backdrop-blur-md border-b border-white/5 bg-black/20"
          : "py-4 backdrop-blur-none border-b border-transparent"
      }`}
    >
      {/* Brand Logo: MARVEL | DOOMSDAY */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <Link href="/timeline" className="font-mono tracking-[0.25em] uppercase text-white text-xs sm:text-sm font-light flex items-center gap-2 group">
          <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff] group-hover:scale-125 transition-transform" />
          <span className="font-semibold tracking-[0.25em]">MARVEL</span>
        </Link>
        <span className="text-stone-600 font-mono text-xs select-none">|</span>
        <button
          onClick={triggerDoomsdayTransition}
          className="font-mono tracking-[0.25em] uppercase text-emerald-400 hover:text-emerald-300 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)] text-xs sm:text-sm font-semibold transition-all cursor-pointer bg-transparent border-none"
        >
          DOOMSDAY
        </button>

        {/* Phase Pill in Navbar */}
        <span className="hidden lg:inline-flex items-center gap-1.5 text-[10px] font-mono uppercase bg-white/5 border border-white/15 text-stone-300 px-2.5 py-0.5 rounded-full ml-1">
          <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
          Phase {currentPhase}
        </span>
      </div>

      {/* Center Links */}
      <div className="hidden md:flex items-center gap-6">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[11px] font-mono tracking-[0.2em] uppercase text-stone-400 hover:text-white transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Ambient Audio Synth Toggle */}
        <button
          onClick={toggleSound}
          className={`p-2 rounded-lg border transition-all ${
            soundEnabled
              ? "bg-white/15 text-white border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.25)]"
              : "bg-stone-900/60 text-stone-500 border-stone-800 hover:text-stone-300"
          }`}
          title={soundEnabled ? "Mute Atmospheric Soundscape" : "Enable Dark Synth Drone"}
          aria-label="Toggle ambient atmospheric audio"
        >
          {soundEnabled ? <Volume2 size={16} className="animate-pulse" /> : <VolumeX size={16} />}
        </button>

        {/* Search Modal Trigger */}
        <button
          onClick={onSearch}
          className="flex items-center gap-2 text-xs font-mono text-stone-400 hover:text-white bg-stone-950/80 border border-stone-800 hover:border-stone-700 px-3 py-1.5 rounded-lg transition-colors"
          aria-label="Search all characters, artifacts, and timeline events"
        >
          <Search size={14} />
          <span className="hidden sm:inline text-[11px] tracking-wider uppercase">Search Cosmos</span>
        </button>

        {/* Menu Drawer Toggle */}
        <button
          className="text-stone-300 hover:text-white p-1 cursor-pointer transition-colors"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open Navigation Drawer"
          title="Menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Slide Navigation Drawer */}
      <SlideNavMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </nav>
  );
}
