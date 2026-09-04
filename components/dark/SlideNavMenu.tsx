"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X, ArrowLeft } from "lucide-react";
import { useTimelineState } from "@/context/TimelineStateContext";

interface SlideNavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SlideNavMenu({ isOpen, onClose }: SlideNavMenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentPhase, setCurrentPhase } = useTimelineState();

  useEffect(() => {
    router.prefetch("/");
    router.prefetch("/en");
    router.prefetch("/timeline");
    router.prefetch("/familytree");
    router.prefetch("/multiverse");
    router.prefetch("/characters");
    router.prefetch("/characters/heros");
    router.prefetch("/characters/villains");
    router.prefetch("/artifacts");
    router.prefetch("/developer");
  }, [router]);

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
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <aside className="relative z-10 w-full max-w-[360px] sm:max-w-[420px] bg-[#000000] border-r border-stone-900 h-full flex flex-col justify-between p-7 sm:p-9 shadow-[20px_0_50px_rgba(0,0,0,0.9)] animate-in slide-in-from-left duration-300 overflow-y-auto">

        <div>
          {/* Top Bar: MARVEL Logo + X Close Button */}
          <div className="flex justify-between items-center mb-7 pb-4 border-b border-stone-900">
            <Link
              href="/timeline"
              onClick={onClose}
              className="text-xs sm:text-sm font-mono font-bold tracking-[0.4em] uppercase text-white hover:text-white/80 transition-opacity pl-[0.4em]"
            >
              MARVEL
            </Link>

            <button
              onClick={onClose}
              aria-label="Close Navigation"
              className="p-1.5 -mr-1.5 text-stone-400 hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex flex-col gap-6">

            {/* Primary Navigation Links */}
            <div className="flex flex-col gap-2">
              <Link
                href="/timeline"
                className={`text-xs sm:text-[13px] font-mono tracking-[0.16em] uppercase hover:translate-x-1 transition-all py-1.5 flex items-center justify-between group ${
                  pathname === "/timeline" || pathname.startsWith("/timeline/")
                    ? "text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.35)]"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                <span>Sacred Timeline</span>
              </Link>

              <Link
                href="/familytree"
                className={`text-xs sm:text-[13px] font-mono tracking-[0.16em] uppercase hover:translate-x-1 transition-all py-1.5 flex items-center justify-between group ${
                  pathname === "/familytree"
                    ? "text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.35)]"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                <span>Character Family Tree</span>
              </Link>

              <Link
                href="/multiverse"
                className={`text-xs sm:text-[13px] font-mono tracking-[0.16em] uppercase hover:translate-x-1 transition-all py-1.5 flex items-center justify-between group ${
                  pathname === "/multiverse"
                    ? "text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.35)]"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                <span>Multiverse Earths</span>
              </Link>

              {/* Character Section with Sub-links */}
              <div className="flex flex-col">
                <Link
                  href="/characters"
                  className={`text-xs sm:text-[13px] font-mono tracking-[0.16em] uppercase hover:translate-x-1 transition-all py-1.5 flex items-center justify-between group ${
                    pathname === "/characters" && !searchParams?.get("faction")
                      ? "text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.35)]"
                      : "text-stone-400 hover:text-white"
                  }`}
                >
                  <span>Character</span>
                </Link>

                <div className="pl-4 sm:pl-5 flex flex-col gap-1.5 border-l border-stone-800/80 ml-2 my-1">
                  <Link
                    href="/characters/heros"
                    className={`text-[11px] sm:text-xs font-mono tracking-[0.14em] uppercase hover:translate-x-1 transition-all py-1 flex items-center justify-between group ${
                      pathname === "/characters/heros" || pathname === "/characters/heroes" || (pathname === "/characters" && searchParams?.get("faction") === "heroes")
                        ? "text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.35)]"
                        : "text-stone-400 hover:text-white"
                    }`}
                  >
                    <span>Heroes &amp; Allies</span>
                  </Link>

                  <Link
                    href="/characters/villains"
                    className={`text-[11px] sm:text-xs font-mono tracking-[0.14em] uppercase hover:translate-x-1 transition-all py-1 flex items-center justify-between group ${
                      pathname === "/characters/villains" || (pathname === "/characters" && searchParams?.get("faction") === "villains")
                        ? "text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.35)]"
                        : "text-stone-400 hover:text-white"
                    }`}
                  >
                    <span>Villains &amp; Threats</span>
                  </Link>
                </div>
              </div>

              <Link
                href="/artifacts"
                className={`text-xs sm:text-[13px] font-mono tracking-[0.16em] uppercase hover:translate-x-1 transition-all py-1.5 flex items-center justify-between group ${
                  pathname === "/artifacts" || pathname.startsWith("/artifacts/")
                    ? "text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.35)]"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                <span>Cosmic Relics &amp; Realities</span>
              </Link>

              <Link
                href="/developer"
                className={`text-xs sm:text-[13px] font-mono tracking-[0.16em] uppercase hover:translate-x-1 transition-all py-1.5 flex items-center justify-between group ${
                  pathname === "/developer"
                    ? "text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.35)]"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                <span>Developer</span>
              </Link>
            </div>

          </div>
        </div>

        {/* Bottom Section: RETURN link */}
        <div className="pt-5 mt-6 border-t border-stone-900 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-stone-400 hover:text-white text-[11px] sm:text-xs font-mono tracking-[0.18em] uppercase transition-colors cursor-pointer group py-1"
            title="Return to Select Phase & Movies"
          >
            <ArrowLeft size={14} className="text-stone-500 group-hover:-translate-x-1 transition-transform" />
            <span>RETURN TO PORTAL</span>
          </Link>
        </div>

      </aside>
    </div>
  );
}
