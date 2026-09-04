"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import SlideNavMenu from "@/components/dark/SlideNavMenu";

export function Navbar() {
  const router = useRouter();
  const [navMenuOpen, setNavMenuOpen] = useState(false);

  const handleBack = () => {
    if (typeof window !== "undefined") {
      const savedRoute = sessionStorage.getItem("mcu_last_character_route");
      const currentPath = window.location.pathname + window.location.search;
      if (savedRoute && savedRoute !== currentPath && !savedRoute.includes(window.location.pathname)) {
        router.push(savedRoute);
        return;
      }
      if (window.history.length > 1) {
        router.back();
        return;
      }
    }
    router.push("/characters");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleBack();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <SlideNavMenu isOpen={navMenuOpen} onClose={() => setNavMenuOpen(false)} />

      <div
        className="fixed top-0 inset-x-0 h-24 pointer-events-none z-40 bg-gradient-to-b from-black/80 via-black/40 to-transparent"
        style={{ transform: "translateZ(0)" }}
        aria-hidden="true"
      />

      <header
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 sm:py-6 min-h-[58px] sm:min-h-[72px] flex items-center justify-between pointer-events-none bg-transparent"
        style={{ transform: "translateZ(0)" }}
      >
        <button
          onClick={() => setNavMenuOpen(true)}
          className="text-stone-300 hover:text-white transition-colors cursor-pointer p-1.5 pointer-events-auto"
          title="Open Universe Menu"
          aria-label="Open Universe Menu"
        >
          <Menu size={18} strokeWidth={1.5} />
        </button>

        <div className="text-xs sm:text-sm md:text-base font-mono font-bold tracking-[0.45em] sm:tracking-[0.55em] uppercase text-white pl-[0.45em] sm:pl-[0.55em] pointer-events-auto">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            MARVEL
          </Link>
        </div>

        <button
          onClick={handleBack}
          className="text-stone-300 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer pointer-events-auto"
          title="Return to Characters Archive (Esc)"
        >
          <X size={18} strokeWidth={1.5} />
        </button>
      </header>
    </>
  );
}
