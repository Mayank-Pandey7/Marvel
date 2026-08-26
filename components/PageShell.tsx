"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Menu } from "lucide-react";
import SearchOverlay from "./SearchOverlay";
import SlideNavMenu from "./dark/SlideNavMenu";

export default function PageShell({
  children,
  backHref = "/timeline",
  backLabel = "TIMELINE"
}: {
  children: React.ReactNode;
  backHref?: string;
  backLabel?: string;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);

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
    <div className="min-h-screen bg-[#000000] text-stone-100 flex flex-col font-sans relative selection:bg-white selection:text-black">

      {}
      <div
        className="fixed top-0 inset-x-0 h-20 pointer-events-none z-40 bg-gradient-to-b from-[#000000]/90 to-transparent backdrop-blur-sm [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] transition-opacity duration-700"
        aria-hidden="true"
      />

      {}
      <header className="fixed top-0 left-0 right-0 w-full px-3 sm:px-8 py-2.5 sm:py-4 flex items-center justify-between z-50 bg-transparent pointer-events-none">

        {}
        <div className="flex items-center pointer-events-auto">
          <button
            onClick={() => setNavMenuOpen(true)}
            className="text-stone-400 hover:text-white transition-colors cursor-pointer p-1.5"
            title="Open Menu Drawer"
            aria-label="Open Menu Drawer"
          >
            <Menu size={16} />
          </button>
        </div>

        {}
        <div className="flex items-center justify-center pointer-events-auto">
          <Link
            href="/"
            className="text-[11px] sm:text-xs md:text-sm font-mono font-medium tracking-[0.45em] sm:tracking-[0.55em] uppercase text-white hover:text-white/80 transition-opacity select-none pl-[0.45em] sm:pl-[0.55em]"
          >
            MARVEL
          </Link>
        </div>

        {}
        <div className="flex items-center gap-3 sm:gap-5 pointer-events-auto">
          <Link
            href="/movies"
            className="hidden md:inline-flex items-center text-stone-400 hover:text-white text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase transition-colors"
          >
            MOVIES
          </Link>
          <Link
            href="/characters"
            className="hidden md:inline-flex items-center text-stone-400 hover:text-white text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase transition-colors"
          >
            CHARACTERS
          </Link>
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white text-[10px] sm:text-[11px] font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase transition-colors group cursor-pointer"
          >
            <ArrowLeft size={11} className="text-stone-500 group-hover:-translate-x-1 transition-transform" />
            <span>{backLabel}</span>
          </Link>

          <button
            onClick={() => setSearchOpen(true)}
            className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white text-[10px] sm:text-[11px] font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase transition-colors group cursor-pointer p-1"
            title="Search MCU (Ctrl+K)"
          >
            <Search size={13} className="text-stone-500 group-hover:text-white transition-colors" />
            <span className="hidden sm:inline">SEARCH</span>
            <kbd className="hidden md:inline-block text-[9px] font-mono text-stone-500 ml-0.5">
              /
            </kbd>
          </button>
        </div>
      </header>

      {}
      <SlideNavMenu isOpen={navMenuOpen} onClose={() => setNavMenuOpen(false)} />

      {}
      <main className="flex-1 pt-16">{children}</main>

      {}
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </div>
  );
}
