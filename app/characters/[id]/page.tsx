"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { X } from "lucide-react";
import { CHARACTERS, getCharacter, type Character } from "@/data/characters";
import { ARTIFACTS } from "@/data/artifacts";
import { MCU } from "@/data/mcu";
import { getRelationshipsForNode } from "@/data/relationships";
import { getCharacterBackdrop } from "@/data/characterBackdrops";
import SlideNavMenu from "@/components/dark/SlideNavMenu";

interface TimelineSlide {
  id: string;
  type: "intro" | "era" | "entanglements" | "relics";
  phase?: number;
  year?: string;
  universe?: string;
  title: string;
  subtitle?: string;
  description: string;
  keyMoments?: string[];
  backdrop: string;
  footerLabel?: string;
}

export default function CharacterDetailPage({ params }: { params: { id: string } }) {
  const character = getCharacter(params.id);
  if (!character) notFound();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [waveDirection, setWaveDirection] = useState<"next" | "prev">("next");
  const [isRippling, setIsRippling] = useState(false);

  // Strict single-step scroll lock ref
  const isScrollLocked = useRef(false);
  const scrollLockTimeout = useRef<NodeJS.Timeout | null>(null);

  const relationships = getRelationshipsForNode(character.id, 6);
  const artifacts = ARTIFACTS.filter((a) => character.artifactsPossessed.includes(a.id));

  // Build the complete array of cinematic slides
  const slides: TimelineSlide[] = useMemo(() => [
    {
      id: "intro",
      type: "intro",
      universe: character.universe.split("/")[0].trim(),
      title: character.name,
      subtitle: character.aliases[0] || character.role.split(",")[0] || "OPERATIVE",
      description: character.overview,
      backdrop: getCharacterBackdrop(character.id),
      footerLabel: "TIMELINE START",
    },
    ...character.eras.map((era, i) => ({
      id: era.eraId || `era-${i}`,
      type: "era" as const,
      phase: era.phase,
      year: era.year,
      universe: era.universe,
      title: era.title.split("(")[0].trim(),
      subtitle: `PHASE ${era.phase} · ${era.year}`,
      description: era.description,
      keyMoments: era.keyMoments,
      backdrop: getCharacterBackdrop(character.id, era.eraId, era.phase),
      footerLabel: `END OF PHASE ${era.phase} MILESTONE`,
    })),
    ...(relationships.length > 0
      ? [
          {
            id: "entanglements",
            type: "entanglements" as const,
            title: "RELATIONAL ENTANGLEMENTS",
            subtitle: "COSMIC BONDS & RIVALRIES",
            description: `Recorded relational bonds, rivalries, alliances, and temporal interactions for ${character.name} across the Marvel multiverse.`,
            backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2560&auto=format&fit=crop",
            footerLabel: "RELATIONAL MATRIX",
          },
        ]
      : []),
    ...(artifacts.length > 0
      ? [
          {
            id: "relics",
            type: "relics" as const,
            title: "WIELDED COSMIC RELICS",
            subtitle: "SINGULARITIES & ARTIFACTS",
            description: `Ancient singularities, Infinity Stones, armor sets, and cosmic weapons commanded by ${character.name}.`,
            backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2560&auto=format&fit=crop",
            footerLabel: "RELICS VAULT",
          },
        ]
      : []),
  ], [character, relationships, artifacts]);

  const currentSlide = slides[currentSlideIndex] || slides[0];

  const triggerSmoothLiquidWave = useCallback(() => {
    setIsRippling(true);
    setTimeout(() => {
      setIsRippling(false);
    }, 1000);
  }, []);

  const goToSlide = useCallback((index: number, direction?: "next" | "prev") => {
    if (index >= 0 && index < slides.length && index !== currentSlideIndex) {
      const dir = direction || (index > currentSlideIndex ? "next" : "prev");
      setWaveDirection(dir);
      setCurrentSlideIndex(index);
      triggerSmoothLiquidWave();
    }
  }, [slides.length, currentSlideIndex, triggerSmoothLiquidWave]);

  const handleNext = useCallback(() => {
    setCurrentSlideIndex((curr) => {
      if (curr < slides.length - 1) {
        setWaveDirection("next");
        triggerSmoothLiquidWave();
        return curr + 1;
      }
      return curr;
    });
  }, [slides.length, triggerSmoothLiquidWave]);

  const handlePrev = useCallback(() => {
    setCurrentSlideIndex((curr) => {
      if (curr > 0) {
        setWaveDirection("prev");
        triggerSmoothLiquidWave();
        return curr - 1;
      }
      return curr;
    });
  }, [triggerSmoothLiquidWave]);

  // Strict Single-Step Wheel Navigation with Inertia Suppression
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 18) return;
      if (isScrollLocked.current) return;

      isScrollLocked.current = true;

      if (e.deltaY > 0) {
        handleNext();
      } else {
        handlePrev();
      }

      if (scrollLockTimeout.current) clearTimeout(scrollLockTimeout.current);
      scrollLockTimeout.current = setTimeout(() => {
        isScrollLocked.current = false;
      }, 950);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      if (scrollLockTimeout.current) clearTimeout(scrollLockTimeout.current);
    };
  }, [handleNext, handlePrev]);

  // Touch Swipe for Mobile
  useEffect(() => {
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrollLocked.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      if (Math.abs(diff) > 40) {
        isScrollLocked.current = true;
        if (diff > 0) handleNext();
        else handlePrev();

        setTimeout(() => {
          isScrollLocked.current = false;
        }, 850);
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleNext, handlePrev]);

  return (
    <div className="relative w-screen h-screen bg-black text-stone-200 font-sans selection:bg-white selection:text-black overflow-hidden select-none">
      
      {/* 1. GPU-ACCELERATED SILKY-SMOOTH LIQUID WATER WAVE BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {slides.map((slide, idx) => {
          const isActive = idx === currentSlideIndex;
          const isPrev = idx < currentSlideIndex;
          
          return (
            <div
              key={slide.id}
              className="absolute inset-0 w-full h-full will-change-[opacity,transform,filter]"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive
                  ? "scale(1) translateY(0) rotate(0deg)"
                  : isPrev
                  ? "scale(1.08) translateY(-24px) rotate(0.4deg)"
                  : "scale(0.96) translateY(24px) rotate(-0.4deg)",
                filter: isActive ? "blur(0px)" : "blur(8px)",
                transition: "opacity 1000ms cubic-bezier(0.25, 1, 0.5, 1), transform 1100ms cubic-bezier(0.16, 1, 0.3, 1), filter 1000ms cubic-bezier(0.25, 1, 0.5, 1)",
              }}
            >
              <img
                src={slide.backdrop}
                alt={slide.title}
                className="w-full h-full object-cover object-center filter brightness-95 contrast-110"
              />
            </div>
          );
        })}

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 z-10 pointer-events-none" />

        {/* Liquid Water Ripple Wave Caustic Light Sweeper */}
        <div 
          className="absolute inset-0 pointer-events-none z-15 will-change-[opacity,transform]"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.04) 40%, transparent 70%)",
            opacity: isRippling ? 1 : 0,
            transform: isRippling ? "scale(1.15) translateY(0)" : "scale(0.85) translateY(20px)",
            transition: "opacity 900ms cubic-bezier(0.22, 1, 0.36, 1), transform 1000ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        {/* Ambient Organic Oceanic Glow */}
        <div 
          className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.15)_0%,transparent_60%)] animate-pulse z-10 pointer-events-none" 
          style={{ animationDuration: "7s" }}
        />
      </div>

      {/* 2. TOP FIXED HEADER (MENU · MARVEL · CLOSE) */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-10 py-6 flex items-center justify-between bg-transparent">
        
        {/* Left: Drawer Toggle */}
        <button
          onClick={() => setNavMenuOpen(true)}
          className="text-stone-300 hover:text-white transition-colors cursor-pointer p-1 group"
          title="Open Universe Menu"
          aria-label="Open Universe Menu"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className="h-[1.5px] w-5 bg-current block group-hover:w-6 transition-all" />
            <span className="h-[1.5px] w-3.5 bg-current block group-hover:w-5 transition-all" />
          </div>
        </button>

        {/* Center: Spaced MARVEL Logo */}
        <div className="text-xs sm:text-sm font-mono font-medium tracking-[0.55em] uppercase text-white pl-[0.55em]">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            MARVEL
          </Link>
        </div>

        {/* Right: Return to Characters Index */}
        <Link
          href="/characters"
          className="text-stone-300 hover:text-white p-1 transition-colors cursor-pointer"
          title="Return to Characters"
        >
          <X size={18} strokeWidth={1.5} />
        </Link>
      </header>

      {/* 3. FLUID LIQUID-STAGGERED STORY CONTENT AREA */}
      <main className="relative z-20 w-full h-full px-6 sm:px-12 md:px-16 flex flex-col justify-between pt-24 pb-12">
        
        {/* Upper Spacer */}
        <div className="h-4" />

        {/* Center / Middle Content Area */}
        <div className="w-full max-w-3xl my-auto">
          
          <div 
            key={currentSlide.id} 
            className={`flex flex-col gap-3 ${
              waveDirection === "next" 
                ? "animate-wave-up" 
                : "animate-wave-down"
            }`}
          >
            
            {/* Tag / Phase Indicator (No numbers badge) */}
            <div className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase text-stone-400 opacity-90">
              {currentSlide.type === "intro" ? (
                <span>{currentSlide.universe} · {currentSlide.subtitle}</span>
              ) : currentSlide.type === "era" ? (
                <span>PHASE {currentSlide.phase} · {currentSlide.year}</span>
              ) : (
                <span>{currentSlide.subtitle}</span>
              )}
            </div>

            {/* Main Headline Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-mono font-bold tracking-[0.16em] uppercase text-white leading-tight">
              {currentSlide.title}
            </h1>

            {/* Narrative Story Paragraph */}
            <p className="text-xs sm:text-sm md:text-base font-mono tracking-wide text-stone-300 leading-relaxed mt-2 max-w-2xl">
              {currentSlide.description}
            </p>

            {/* Key Nexus Moments */}
            {currentSlide.keyMoments && currentSlide.keyMoments.length > 0 && (
              <div className="mt-4 space-y-2 max-w-xl">
                {currentSlide.keyMoments.map((moment, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-mono text-stone-300">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-white" />
                    <span>{moment}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Entanglements quick links */}
            {currentSlide.type === "entanglements" && (
              <div className="mt-4 flex flex-wrap gap-2 max-w-xl">
                {relationships.slice(0, 4).map((rel) => {
                  const targetChar = CHARACTERS.find((c) => c.id === rel.target);
                  return (
                    <Link
                      key={rel.id}
                      href={`/characters/${rel.target}`}
                      className="px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors"
                    >
                      {targetChar?.name || rel.label}
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Relics quick links */}
            {currentSlide.type === "relics" && (
              <div className="mt-4 flex flex-wrap gap-2 max-w-xl">
                {artifacts.map((art) => (
                  <span
                    key={art.id}
                    className="px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase bg-white/10 text-stone-300"
                  >
                    {art.name}
                  </span>
                ))}
              </div>
            )}

            {/* Bottom Milestone Label */}
            <div className="mt-6 text-[10px] font-mono tracking-[0.3em] uppercase text-stone-500">
              {currentSlide.footerLabel}
            </div>

          </div>

        </div>

        {/* 4. BOTTOM CENTER PROGRESS DOTS */}
        <div className="relative z-30 flex items-center justify-center w-full pt-4">
          <div className="flex items-center gap-2.5">
            {slides.map((_, idx) => {
              const isActive = idx === currentSlideIndex;
              return (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`rounded-full transition-all duration-700 cubic-bezier(0.16,1,0.3,1) cursor-pointer ${
                    isActive
                      ? "w-8 h-1.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                      : "w-2 h-1.5 bg-stone-700 hover:bg-stone-400"
                  }`}
                  title={`Jump to chapter ${idx + 1}`}
                />
              );
            })}
          </div>
        </div>

      </main>

      {/* Slide Navigation Drawer */}
      <SlideNavMenu isOpen={navMenuOpen} onClose={() => setNavMenuOpen(false)} />

      {/* Silky-Smooth GPU Wave Animation Keyframes */}
      <style jsx global>{`
        @keyframes waveUp {
          0% {
            opacity: 0;
            transform: translateY(22px) scale(0.985);
            filter: blur(5px);
          }
          60% {
            filter: blur(0.5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes waveDown {
          0% {
            opacity: 0;
            transform: translateY(-22px) scale(0.985);
            filter: blur(5px);
          }
          60% {
            filter: blur(0.5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }

        .animate-wave-up {
          animation: waveUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-wave-down {
          animation: waveDown 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

    </div>
  );
}
