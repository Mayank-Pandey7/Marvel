"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import SlideNavMenu from "@/components/dark/SlideNavMenu";

export function Navbar() {
  const [navMenuOpen, setNavMenuOpen] = useState(false);

  return (
    <>
      {/* Slide Navigation Menu */}
      <SlideNavMenu isOpen={navMenuOpen} onClose={() => setNavMenuOpen(false)} />

      {/* Header Backdrop Gradient - Stable GPU compositing */}
      <div
        className="fixed top-0 inset-x-0 h-24 pointer-events-none z-40 bg-gradient-to-b from-black/80 via-black/40 to-transparent"
        style={{ transform: "translateZ(0)" }}
        aria-hidden="true"
      />

      {/* Synchronized Global Header Navbar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 sm:py-6 min-h-[58px] sm:min-h-[72px] flex items-center justify-between pointer-events-none bg-transparent"
        style={{ transform: "translateZ(0)" }}
      >
        {/* Left Side: Menu Trigger */}
        <button
          onClick={() => setNavMenuOpen(true)}
          className="text-stone-300 hover:text-white transition-colors cursor-pointer p-1.5 pointer-events-auto"
          title="Open Universe Menu"
          aria-label="Open Universe Menu"
        >
          <Menu size={18} strokeWidth={1.5} />
        </button>

        {/* Center: Brand Header */}
        <div className="text-xs sm:text-sm md:text-base font-mono font-bold tracking-[0.45em] sm:tracking-[0.55em] uppercase text-white pl-[0.45em] sm:pl-[0.55em] pointer-events-auto">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            MARVEL
          </Link>
        </div>

        {/* Right Side: Return Link */}
        <Link
          href="/characters"
          className="text-stone-300 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer pointer-events-auto"
          title="Return to Characters Archive (Esc)"
        >
          <X size={18} strokeWidth={1.5} />
        </Link>
      </header>
    </>
  );
}
