"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Menu, X } from "lucide-react";
import SearchOverlay from "./SearchOverlay";
import SlideNavMenu from "./dark/SlideNavMenu";

export default function PageShell({
  children,
  backHref = "/timeline",
  backLabel = "TIMELINE",
  showCloseButton = false,
  hideSearch = false,
}: {
  children: React.ReactNode;
  backHref?: string;
  backLabel?: string;
  showCloseButton?: boolean;
  hideSearch?: boolean;
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

      <div
        className="fixed top-0 inset-x-0 h-24 pointer-events-none z-40 bg-gradient-to-b from-black/80 via-black/40 to-transparent"
        style={{ transform: "translateZ(0)" }}
        aria-hidden="true"
      />

      <header className="fixed top-0 left-0 right-0 w-full px-4 sm:px-8 py-4 sm:py-6 min-h-[58px] sm:min-h-[72px] flex items-center justify-between z-50 bg-transparent pointer-events-none">

        <div className="flex items-center pointer-events-auto">
          <button
            onClick={() => setNavMenuOpen(true)}
            className="text-stone-400 hover:text-white transition-colors cursor-pointer p-1.5"
            title="Open Menu Drawer"
            aria-label="Open Menu Drawer"
          >
            <Menu size={18} />
          </button>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto">
          <Link
            href="/timeline"
            className="text-xs sm:text-sm md:text-base font-mono font-bold tracking-[0.45em] sm:tracking-[0.55em] uppercase text-white hover:text-stone-300 transition-colors select-none cursor-pointer pl-[0.45em] sm:pl-[0.55em]"
            title="Return to Timeline"
          >
            MARVEL
          </Link>
        </div>

        <div className="flex items-center gap-3 sm:gap-6 pointer-events-auto">
          {showCloseButton ? (
            <Link
              href={backHref}
              className="text-stone-400 hover:text-white p-1.5 transition-colors cursor-pointer rounded-full hover:bg-white/10"
              title="Close and Return to Timeline"
              aria-label="Close and Return to Timeline"
            >
              <X size={18} />
            </Link>
          ) : (
            <>
              <Link
                href={backHref}
                className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white text-[10px] sm:text-[11.5px] font-mono tracking-[0.18em] sm:tracking-[0.28em] uppercase transition-colors group cursor-pointer"
              >
                <ArrowLeft size={12} className="text-stone-500 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline">{backLabel}</span>
              </Link>

              {!hideSearch && (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white text-[10px] sm:text-[11.5px] font-mono tracking-[0.18em] sm:tracking-[0.28em] uppercase transition-colors group cursor-pointer p-1.5"
                  title="Search MCU (Ctrl+K)"
                >
                  <Search size={14} className="text-stone-500 group-hover:text-white transition-colors" />
                  <span className="hidden sm:inline">SEARCH</span>
                  <kbd className="hidden md:inline-block text-[9.5px] font-mono text-stone-500 ml-0.5">
                    /
                  </kbd>
                </button>
              )}
            </>
          )}
        </div>
      </header>

      <SlideNavMenu isOpen={navMenuOpen} onClose={() => setNavMenuOpen(false)} />

      <main className="flex-1 pt-16">{children}</main>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </div>
  );
}
