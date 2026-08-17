"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Menu } from "lucide-react";
import SearchOverlay from "./SearchOverlay";
import SlideNavMenu from "./dark/SlideNavMenu";

export default function PageShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);

  // Global Ctrl+K / Cmd+K Search Shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#020204] text-stone-100 flex flex-col font-sans relative selection:bg-white selection:text-black">
      {/* Sleek Top Bar */}
      <header className="w-full px-4 sm:px-8 py-5 max-w-7xl mx-auto flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setNavMenuOpen(true)}
            className="inline-flex items-center gap-2 p-2 rounded-full bg-white/5 border border-white/20 hover:border-white/60 text-stone-300 hover:text-white transition-all cursor-pointer group"
            title="Open Menu Drawer"
            aria-label="Open Menu Drawer"
          >
            <Menu size={14} className="text-stone-400 group-hover:text-white transition-colors" />
          </button>
          
          <Link
            href="/timeline"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/20 hover:border-white/60 text-stone-300 hover:text-white text-[10px] font-mono tracking-widest uppercase transition-all group cursor-pointer shadow-[0_0_12px_rgba(255,255,255,0.05)]"
          >
            <ArrowLeft size={12} className="text-stone-400 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">RETURN TO SACRED TIMELINE</span>
            <span className="sm:hidden">TIMELINE</span>
          </Link>
        </div>

        {/* Minimalist Search Button */}
        <button
          onClick={() => setSearchOpen(true)}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/20 hover:border-white/60 text-stone-300 hover:text-white text-[10px] font-mono tracking-widest uppercase transition-all group cursor-pointer shadow-[0_0_12px_rgba(255,255,255,0.06)]"
          title="Search MCU (Ctrl+K)"
        >
          <Search size={13} className="text-stone-400 group-hover:text-white transition-colors" />
          <span>SEARCH</span>
          <kbd className="hidden sm:inline-block text-[9px] font-mono px-1.5 py-0.5 bg-stone-900 border border-stone-800 rounded text-stone-400 ml-1">
            ⌘K
          </kbd>
        </button>
      </header>

      {/* Slide Navigation Drawer */}
      <SlideNavMenu isOpen={navMenuOpen} onClose={() => setNavMenuOpen(false)} />

      {/* Main Page Content */}
      <main className="flex-1 pb-16">{children}</main>

      {/* Global Search Modal Overlay */}
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </div>
  );
}
