"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { X, ArrowLeft } from "lucide-react";
import { useTimelineState } from "@/context/TimelineStateContext";

interface SlideNavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SlideNavMenu({ isOpen, onClose }: SlideNavMenuProps) {
  const pathname = usePathname();
  const router = useRouter();
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

            <div className="flex flex-col gap-2">
              <Link
                href="/timeline"
                onClick={onClose}
                className={`text-xs sm:text-[13px] font-mono tracking-[0.16em] uppercase hover:translate-x-1 transition-all py-1.5 flex items-center justify-between group ${
                  pathname === "/timeline" || pathname.startsWith("/timeline/")
                    ? "text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.35)]"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                <span>SACRED TIMELINE</span>
              </Link>

              <Link
                href="/familytree"
                onClick={onClose}
                className={`text-xs sm:text-[13px] font-mono tracking-[0.16em] uppercase hover:translate-x-1 transition-all py-1.5 flex items-center justify-between group ${
                  pathname === "/familytree"
                    ? "text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.35)]"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                <span>CHARACTER FAMILY TREE</span>
              </Link>

              <Link
                href="/multiverse"
                onClick={onClose}
                className={`text-xs sm:text-[13px] font-mono tracking-[0.16em] uppercase hover:translate-x-1 transition-all py-1.5 flex items-center justify-between group ${
                  pathname === "/multiverse" || pathname.startsWith("/multiverse/")
                    ? "text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.35)]"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                <span>MULTIVERSE EARTHS</span>
              </Link>

              <Link
                href="/characters/heros"
                onClick={onClose}
                className={`text-xs sm:text-[13px] font-mono tracking-[0.16em] uppercase hover:translate-x-1 transition-all py-1.5 flex items-center justify-between group ${
                  pathname === "/characters/heros" || pathname === "/characters/heroes"
                    ? "text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.35)]"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                <span>HEROES &amp; ALLIES</span>
              </Link>

              <Link
                href="/characters/villains"
                onClick={onClose}
                className={`text-xs sm:text-[13px] font-mono tracking-[0.16em] uppercase hover:translate-x-1 transition-all py-1.5 flex items-center justify-between group ${
                  pathname === "/characters/villains" || pathname.startsWith("/characters/villains")
                    ? "text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.35)]"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                <span>VILLAINS &amp; THREATS</span>
              </Link>

              <Link
                href="/artifacts"
                onClick={onClose}
                className={`text-xs sm:text-[13px] font-mono tracking-[0.16em] uppercase hover:translate-x-1 transition-all py-1.5 flex items-center justify-between group ${
                  pathname === "/artifacts" || pathname.startsWith("/artifacts/")
                    ? "text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.35)]"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                <span>COSMIC RELICS &amp; REALITIES</span>
              </Link>

              <Link
                href="/developer"
                onClick={onClose}
                className={`text-xs sm:text-[13px] font-mono tracking-[0.16em] uppercase hover:translate-x-1 transition-all py-1.5 flex items-center justify-between group ${
                  pathname === "/developer"
                    ? "text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.35)]"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                <span>DEVELOPER</span>
              </Link>
            </div>

          </div>
        </div>

        <div className="pt-5 mt-6 border-t border-stone-900 flex items-center justify-between">
          <Link
            href="/"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-300 text-[11px] sm:text-xs font-mono tracking-[0.18em] uppercase transition-colors cursor-pointer group py-1"
            title="Return to Select Phase & Movies"
          >
            <ArrowLeft size={14} className="text-stone-600 group-hover:-translate-x-1 transition-transform" />
            <span>RETURN TO PORTAL</span>
          </Link>
        </div>

      </aside>
    </div>
  );
}
