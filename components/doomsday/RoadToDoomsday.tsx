"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import {
  DOOMSDAY_WATCHLIST,
  type DoomsdayWatchlistItem,
} from "@/data/doomsdayWatchlist";

const DOOMSDAY_RELEASE_DATE = "2026-12-18T00:00:00Z";
import {
  Menu,
  ArrowLeft,
  Search,
  X,
} from "lucide-react";
import SlideNavMenu from "@/components/dark/SlideNavMenu";
import SearchOverlay from "@/components/SearchOverlay";
import { MCU_POSTER_MAP } from "@/components/map/NodeArtwork";

// Organic unequal alternating horizontal offsets matching timeline
const DESKTOP_OFFSETS = [
  -45,  75, -35,  85, -60,  40, -75,  60, -40,  80,
  -65,  50, -55,  85, -40
];

const MOBILE_OFFSETS = [-8, 12, -5, 10, -10, 7, -9, 13, -6, 8, -7, 11, -8, 10, -9];

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState<{
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    months: 3,
    days: 17,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    let target = new Date(targetDate).getTime();
    const now = Date.now();
    if (target <= now) {
      target = new Date("2026-12-18T00:00:00Z").getTime();
    }

    const calculate = () => {
      const currentTime = Date.now();
      const difference = target - currentTime;

      if (difference <= 0) {
        setTimeLeft({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const totalSeconds = Math.floor(difference / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);

      const months = Math.floor(totalDays / 30.4375);
      const days = Math.floor(totalDays % 30.4375);
      const hours = totalHours % 24;
      const minutes = totalMinutes % 60;
      const seconds = totalSeconds % 60;

      setTimeLeft({ months, days, hours, minutes, seconds });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

export default function RoadToDoomsday() {
  const [activeItem, setActiveItem] = useState<DoomsdayWatchlistItem | null>(null);
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const countdown = useCountdown(DOOMSDAY_RELEASE_DATE);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const treeContainerRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastScrollYRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  const [sketchPaths, setSketchPaths] = useState<{
    primaryD: string;
    secondaryD: string;
    whisperD: string;
  }>({
    primaryD: "",
    secondaryD: "",
    whisperD: "",
  });
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  const filteredItems = DOOMSDAY_WATCHLIST;

  // Calculate Unequal, Organic Hand-Drawn Sketch Paths
  useEffect(() => {
    const updateSketchPaths = () => {
      if (!treeContainerRef.current) return;
      const containerRect = treeContainerRef.current.getBoundingClientRect();
      const isMobile = window.innerWidth < 768;
      setIsMobileScreen(isMobile);

      const points: { x: number; y: number }[] = [];
      const mobileBaseX = 26;

      nodeRefs.current.forEach((nodeEl, idx) => {
        if (!nodeEl) return;
        const nodeRect = nodeEl.getBoundingClientRect();
        const relativeY = nodeRect.top - containerRect.top + nodeRect.height / 2;

        const xOffset = isMobile
          ? MOBILE_OFFSETS[idx % MOBILE_OFFSETS.length]
          : DESKTOP_OFFSETS[idx % DESKTOP_OFFSETS.length];

        const relativeX = isMobile
          ? mobileBaseX + xOffset
          : containerRect.width / 2 + xOffset;

        points.push({ x: relativeX, y: relativeY });
      });

      const destEl = document.getElementById("doomsday-destination");
      if (destEl) {
        const destRect = destEl.getBoundingClientRect();
        points.push({
          x: containerRect.width / 2,
          y: destRect.top - containerRect.top + 30,
        });
      }

      if (points.length < 2) return;

      // 1. Primary Hand-Drawn Sketch Stroke
      let d1 = `M ${points[0].x} ${points[0].y}`;
      // 2. Secondary Overlapping Pencil Trace
      let d2 = `M ${points[0].x - 1} ${points[0].y + 1}`;
      // 3. Tertiary Graphite Whisper Stroke
      let d3 = `M ${points[0].x + 1} ${points[0].y - 1}`;

      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const midY = (p0.y + p1.y) / 2;

        const jitter1 = Math.sin(i * 3.7 + 0.8) * (isMobile ? 2 : 5);
        const jitter2 = Math.cos(i * 4.1 + 1.5) * (isMobile ? 2 : 4);
        const jitter3 = Math.sin(i * 2.9 + 2.2) * 2.5;

        const cp1x = p0.x + jitter1;
        const cp1y = midY - 8 + jitter2;
        const cp2x = p1.x - jitter2;
        const cp2y = midY + 8 + jitter1;
        d1 += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;

        const cp1x_2 = cp1x + Math.sin(i * 5.3) * 3 - 1.5;
        const cp1y_2 = cp1y + Math.cos(i * 4.7) * 3 + 1;
        const cp2x_2 = cp2x - Math.cos(i * 3.9) * 3 + 1;
        const cp2y_2 = cp2y + Math.sin(i * 5.1) * 3 - 1;
        d2 += ` C ${cp1x_2} ${cp1y_2}, ${cp2x_2} ${cp2y_2}, ${p1.x + Math.sin(i * 2.3) * 1.5} ${p1.y + 0.5}`;

        const cp1x_3 = cp1x - jitter3 * 0.8 + 1.5;
        const cp1y_3 = cp1y + jitter3 * 0.7 - 1.5;
        const cp2x_3 = cp2x + jitter3 * 0.8 - 1.5;
        const cp2y_3 = cp2y - jitter3 * 0.7 + 1.5;
        d3 += ` C ${cp1x_3} ${cp1y_3}, ${cp2x_3} ${cp2y_3}, ${p1.x - 1} ${p1.y - 0.5}`;
      }

      setSketchPaths({
        primaryD: d1,
        secondaryD: d2,
        whisperD: d3,
      });
    };

    updateSketchPaths();
    window.addEventListener("resize", updateSketchPaths);
    const timer = setTimeout(updateSketchPaths, 250);

    return () => {
      window.removeEventListener("resize", updateSketchPaths);
      clearTimeout(timer);
    };
  }, [filteredItems]);

  // Spring Pop Dynamic Scroll Physics & 3D Spatial Motion
  const updateScrollAnimations = useCallback(() => {
    const windowH = window.innerHeight || 800;
    const currentScrollY = window.scrollY || window.pageYOffset || 0;
    const isMobile = window.innerWidth < 768;

    const deltaY = currentScrollY - lastScrollYRef.current;
    lastScrollYRef.current = currentScrollY;
    scrollVelocityRef.current = Math.max(-25, Math.min(25, deltaY * 0.4));

    const focalCenterY = windowH * 0.50;
    const clearPlateau = isMobile ? 140 : 200;
    const fadeDistance = windowH * 0.45;

    cardRefs.current.forEach((el, idx) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const distFromCenter = Math.abs(centerY - focalCenterY);

      let visibility = 1;
      if (distFromCenter > clearPlateau) {
        const excess = distFromCenter - clearPlateau;
        visibility = Math.max(0, 1 - Math.pow(excess / fadeDistance, 1.2));
      }

      const isAboveCenter = centerY < focalCenterY;
      const velocityInfluence = (1 - visibility) * (scrollVelocityRef.current * 0.25);
      const translateY = (1 - visibility) * (isAboveCenter ? -14 : 16) + velocityInfluence;
      
      const isEven = idx % 2 === 0;
      const horizontalDrift = isMobile ? 0 : (isEven ? -1 : 1) * (1 - visibility) * 12;
      
      const rotateX = isMobile ? 0 : (isAboveCenter ? 1 : -1) * (1 - visibility) * 3;
      const rotateY = isMobile ? 0 : (isEven ? -1 : 1) * (1 - visibility) * 2;
      
      const popScale = 0.93 + visibility * 0.09;
      const displayOpacity = 0.60 + visibility * 0.40;
      const blur = (1 - visibility) * 4.2;

      el.style.opacity = `${displayOpacity.toFixed(3)}`;
      el.style.transform = `perspective(1100px) translate3d(${horizontalDrift.toFixed(1)}px, ${translateY.toFixed(1)}px, 0) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${popScale.toFixed(3)})`;
      el.style.filter = blur > 0.35 ? `blur(${blur.toFixed(1)}px)` : "none";
      el.style.visibility = "visible";
      el.style.pointerEvents = "auto";

      const nodeEl = nodeRefs.current[idx];
      if (nodeEl) {
        const nodePopScale = 0.88 + visibility * 0.18;
        const nodeOpacity = 0.65 + visibility * 0.35;
        nodeEl.style.opacity = `${nodeOpacity.toFixed(3)}`;
        nodeEl.style.transform = `translate3d(-50%, 0, 0) scale(${nodePopScale.toFixed(3)})`;
        nodeEl.style.filter = blur > 0.6 ? `blur(${(blur * 0.4).toFixed(1)}px)` : "none";
        nodeEl.style.visibility = "visible";
        nodeEl.style.pointerEvents = "auto";
      }
    });
  }, []);

  useEffect(() => {
    const onScrollOrResize = () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(updateScrollAnimations);
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    onScrollOrResize();
    const initialTimer = setTimeout(onScrollOrResize, 200);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      clearTimeout(initialTimer);
    };
  }, [filteredItems, updateScrollAnimations]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "/" && !searchOpen) {
        e.preventDefault();
        setSearchOpen(true);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        if (searchOpen) setSearchOpen(false);
        if (activeItem) setActiveItem(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen, activeItem]);

  // Canvas Starfield Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const stars: {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      speed: number;
    }[] = [];

    for (let i = 0; i < 60; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.4,
        alpha: Math.random() * 0.4 + 0.1,
        speed: Math.random() * 0.15 + 0.05,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((s) => {
        s.y -= s.speed;
        if (s.y < 0) {
          s.y = height;
          s.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#000000] text-stone-200 overflow-x-hidden selection:bg-white selection:text-black">
      {/* Background Image & Particle Canvas (Increased Visibility) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/images/doomsday-bg.jpg"
          alt="Doctor Doom"
          className="absolute inset-0 w-full h-full object-cover object-[center_38%] opacity-90 filter brightness-105 contrast-110 select-none"
        />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/35 to-transparent" />
      </div>

      {/* Global Synchronized Header Navbar */}
      <header className="fixed top-0 inset-x-0 z-30 px-4 sm:px-8 py-4 sm:py-6 min-h-[58px] sm:min-h-[72px] flex items-center justify-between pointer-events-none transition-opacity duration-1000">
        {/* Left Side: Drawer Menu Trigger */}
        <div className="flex items-center gap-3 sm:gap-4 pointer-events-auto">
          <button
            onClick={() => setNavMenuOpen(true)}
            className="text-stone-400 hover:text-white transition-colors cursor-pointer p-1.5"
            title="Open Universe Navigation"
            aria-label="Open Universe Navigation"
          >
            <Menu size={18} />
          </button>
        </div>

        {/* Center: Brand Logo & DOOMSDAY Trigger */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-auto flex items-center justify-center gap-1.5 sm:gap-3.5 md:gap-4 whitespace-nowrap">
          <Link
            href="/timeline"
            className="text-[11px] sm:text-base md:text-lg font-mono font-bold tracking-[0.2em] sm:tracking-[0.45em] md:tracking-[0.55em] uppercase text-stone-400 hover:text-white transition-colors select-none cursor-pointer -mr-0.5 sm:-mr-1.5"
            title="Return to Timeline"
          >
            MARVEL
          </Link>
          <span className="text-stone-600 font-mono text-[11px] sm:text-base md:text-lg select-none">|</span>
          <Link
            href="/doomsday"
            className="text-[11px] sm:text-base md:text-lg font-mono font-bold tracking-[0.2em] sm:tracking-[0.45em] md:tracking-[0.55em] uppercase text-emerald-400 scale-105 drop-shadow-[0_0_15px_rgba(52,211,153,0.6)] transition-all select-none"
            title="Road to Doomsday"
          >
            DOOMSDAY
          </Link>
        </div>

        {/* Right Side: Search */}
        <div className="flex items-center gap-2 sm:gap-4 pointer-events-auto">

          <button
            onClick={() => setSearchOpen(true)}
            className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white text-[10px] sm:text-[11.5px] font-mono tracking-[0.18em] sm:tracking-[0.28em] uppercase transition-colors group cursor-pointer p-1.5"
            title="Search All MCU Entries (/ or Ctrl+K)"
          >
            <Search size={14} className="text-stone-500 group-hover:text-white transition-colors" />
            <span className="hidden sm:inline">SEARCH</span>
            <kbd className="hidden md:inline-block text-[9.5px] font-mono text-stone-500 ml-0.5">/</kbd>
          </button>
        </div>
      </header>

      {/* Hero Countdown Header */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 pt-28 sm:pt-36 pb-8 sm:pb-12 text-center antialiased">
        <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-mono uppercase tracking-[0.14em] sm:tracking-[0.20em] font-bold text-white leading-tight">
          <span className="text-emerald-400 drop-shadow-[0_0_25px_rgba(52,211,153,0.5)]">DOOMSDAY</span> IS COMING
        </h1>
        <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-mono text-stone-300 max-w-2xl mx-auto leading-relaxed px-4 tracking-wide">
          «All universes die. The question is what survives in the fire of Victor von Doom.»
        </p>

        {/* Digital Countdown Timer HUD (Clean Floating Numbers) */}
        <div className="mt-8 sm:mt-10 mb-4 flex flex-col items-center justify-center select-none w-full max-w-full px-2">
          <div className="flex items-center justify-center gap-2 xs:gap-3 sm:gap-5 md:gap-7 text-white font-mono bg-transparent">
            {/* Months */}
            <div className="flex flex-col items-center min-w-[2.4rem] xs:min-w-[3rem] sm:min-w-[4rem] md:min-w-[4.8rem]">
              <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider leading-none text-white">
                {String(countdown.months).padStart(2, "0")}
              </span>
              <span className="text-[7px] xs:text-[8px] sm:text-[9.5px] md:text-[10.5px] font-mono tracking-[0.2em] uppercase text-stone-400 mt-2">
                MONTHS
              </span>
            </div>

            <span className="text-lg xs:text-2xl sm:text-3xl md:text-4xl font-light text-stone-600 pb-2 sm:pb-3">:</span>

            {/* Days */}
            <div className="flex flex-col items-center min-w-[2.4rem] xs:min-w-[3rem] sm:min-w-[4rem] md:min-w-[4.8rem]">
              <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider leading-none text-white">
                {String(countdown.days).padStart(2, "0")}
              </span>
              <span className="text-[7px] xs:text-[8px] sm:text-[9.5px] md:text-[10.5px] font-mono tracking-[0.2em] uppercase text-stone-400 mt-2">
                DAYS
              </span>
            </div>

            <span className="text-lg xs:text-2xl sm:text-3xl md:text-4xl font-light text-stone-600 pb-2 sm:pb-3">:</span>

            {/* Hours */}
            <div className="flex flex-col items-center min-w-[2.4rem] xs:min-w-[3rem] sm:min-w-[4rem] md:min-w-[4.8rem]">
              <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider leading-none text-white">
                {String(countdown.hours).padStart(2, "0")}
              </span>
              <span className="text-[7px] xs:text-[8px] sm:text-[9.5px] md:text-[10.5px] font-mono tracking-[0.2em] uppercase text-stone-400 mt-2">
                HOURS
              </span>
            </div>

            <span className="text-lg xs:text-2xl sm:text-3xl md:text-4xl font-light text-stone-600 pb-2 sm:pb-3">:</span>

            {/* Minutes */}
            <div className="flex flex-col items-center min-w-[2.4rem] xs:min-w-[3rem] sm:min-w-[4rem] md:min-w-[4.8rem]">
              <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider leading-none text-white">
                {String(countdown.minutes).padStart(2, "0")}
              </span>
              <span className="text-[7px] xs:text-[8px] sm:text-[9.5px] md:text-[10.5px] font-mono tracking-[0.2em] uppercase text-stone-400 mt-2">
                MINUTES
              </span>
            </div>

            <span className="text-lg xs:text-2xl sm:text-3xl md:text-4xl font-light text-stone-600 pb-2 sm:pb-3">:</span>

            {/* Seconds */}
            <div className="flex flex-col items-center min-w-[2.4rem] xs:min-w-[3rem] sm:min-w-[4rem] md:min-w-[4.8rem]">
              <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider leading-none text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">
                {String(countdown.seconds).padStart(2, "0")}
              </span>
              <span className="text-[7px] xs:text-[8px] sm:text-[9.5px] md:text-[10.5px] font-mono tracking-[0.2em] uppercase text-emerald-400/90 mt-2">
                SECONDS
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Snake Path Watchlist Section (Timeline-Matched Hand-Sketched Spine) */}
      <section className="relative z-10 max-w-5xl mx-auto px-2 sm:px-4 md:px-8 pt-4 pb-36">
        <div ref={treeContainerRef} className="relative">

          {/* SVG Hand-Made Sketch Spine (With Animated Pulse Flow) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible opacity-35 transition-opacity duration-300">
            {sketchPaths.primaryD ? (
              <>
                {/* Sketch Layer 1: Tertiary Graphite Whisper Stroke */}
                <path
                  d={sketchPaths.whisperD}
                  fill="none"
                  stroke="rgba(120, 113, 108, 0.5)"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Sketch Layer 2: Secondary Overlapping Pencil Trace */}
                <path
                  d={sketchPaths.secondaryD}
                  fill="none"
                  stroke="rgba(168, 162, 158, 0.65)"
                  strokeWidth="1.0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Sketch Layer 3: Primary Organic Hand-Drawn Contour Stroke */}
                <path
                  d={sketchPaths.primaryD}
                  fill="none"
                  stroke="rgba(231, 229, 228, 0.85)"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Sketch Layer 4: Animated Traveling Emerald Timeline Energy Beam */}
                <path
                  d={sketchPaths.primaryD}
                  fill="none"
                  stroke="rgba(52, 211, 153, 0.8)"
                  strokeWidth="1.6"
                  strokeDasharray="20 180"
                  className="animate-[dash_10s_linear_infinite]"
                  strokeLinecap="round"
                />
              </>
            ) : (
              <line
                x1="50%"
                y1="0"
                x2="50%"
                y2="100%"
                stroke="rgba(231, 229, 228, 0.7)"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            )}
          </svg>

          {/* Unequal Alternating Vertical Timeline Items */}
          <div className="flex flex-col gap-8 xs:gap-10 sm:gap-14 relative z-10">
            {filteredItems.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const posterSrc = MCU_POSTER_MAP[item.id]?.poster || item.posterUrl;

              const desktopX = DESKTOP_OFFSETS[idx % DESKTOP_OFFSETS.length];
              const mobileX = MOBILE_OFFSETS[idx % MOBILE_OFFSETS.length];
              const connectorWidth = isEven
                ? Math.max(16, 112 + desktopX)
                : Math.max(16, 112 - desktopX);

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  data-index={idx}
                  style={{
                    transition: "opacity 0.32s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease-out",
                    willChange: "transform, opacity, filter",
                  }}
                  className={`group/row relative flex items-center w-full transform-gpu ${
                    isEven
                      ? "md:flex-row pl-12 xs:pl-14 sm:pl-16 md:pl-0"
                      : "md:flex-row-reverse pl-12 xs:pl-14 sm:pl-16 md:pl-0"
                  }`}
                >
                  {/* Milestone Node on the Hand-Sketched Unequal Apex */}
                  <div
                    ref={(el) => {
                      nodeRefs.current[idx] = el;
                    }}
                    style={{
                      left: isMobileScreen
                        ? `${26 + mobileX}px`
                        : `calc(50% + ${desktopX}px)`,
                      transition: "opacity 0.32s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      willChange: "transform, opacity",
                    }}
                    className="absolute flex items-center justify-center z-20 -translate-x-1/2"
                  >
                    <Link
                      href={`/doomsday/${item.id}`}
                      className="group/node relative w-7 h-7 sm:w-8 sm:h-8 rounded-full border bg-black border-stone-700 text-stone-300 group-hover/row:border-white group-hover/row:text-white group-hover/row:scale-125 group-hover/row:rotate-12 flex items-center justify-center font-mono text-[9px] sm:text-[10px] font-bold transition-all duration-300 cursor-pointer select-none"
                      title={`Open ${item.title} (${item.year})`}
                    >
                      {/* Orbiting Rotating Sketched Ring around Node */}
                      <svg
                        className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none overflow-visible opacity-50 group-hover/row:opacity-100 group-hover/row:scale-125 transition-all duration-500 animate-[spin_18s_linear_infinite] group-hover/row:animate-[spin_4s_linear_infinite]"
                        viewBox="0 0 44 44"
                        fill="none"
                      >
                        <path
                          d="M6 22 C 5 11, 12 5, 22 5 C 32 5, 39 12, 38 22 C 37 32, 31 39, 22 39 C 12 39, 5 32, 6 22 C 7 13, 15 7, 22 7 C 30 7, 37 13, 36 23"
                          stroke="rgba(255, 255, 255, 0.7)"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 24 C 7 14, 15 8, 23 8 C 31 8, 37 15, 36 24 C 35 33, 29 37, 21 37 C 14 37, 7 30, 8 22"
                          stroke="rgba(255, 255, 255, 0.35)"
                          strokeWidth="0.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <span className="relative z-10 transition-transform duration-300 group-hover/row:scale-110">{String(item.order).padStart(2, "0")}</span>
                    </Link>
                  </div>

                  {/* Movie Item (Clean Half-Width Layout with Zero Collisions) */}
                  <div
                    className={`w-full md:w-[calc(50%-7rem)] lg:w-[calc(50%-7.5rem)] min-w-0 ${
                      isEven ? "md:pr-2 md:text-right" : "md:pl-2 md:text-left"
                    }`}
                  >
                    <Link
                      href={`/doomsday/${item.id}`}
                      className="group/card block relative p-1.5 xs:p-2 sm:p-2.5 transition-all duration-400 cursor-pointer group-hover/card:opacity-100 opacity-90 w-full min-w-0 bg-transparent"
                    >
                      {/* Dynamic Hand-Drawn Sketched Connector Line (Desktop) */}
                      <svg
                        style={{
                          width: `${connectorWidth}px`,
                          [isEven ? "right" : "left"]: `-${connectorWidth}px`,
                        }}
                        className="hidden md:block absolute top-1/2 -translate-y-1/2 h-3 pointer-events-none overflow-visible opacity-60 group-hover/card:opacity-100 group-hover/card:scale-x-125 transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-center"
                        viewBox="0 0 100 12"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0 7 C 30 5, 70 8, 100 6.5"
                          vectorEffect="non-scaling-stroke"
                          stroke="rgba(168, 162, 158, 0.7)"
                          strokeWidth="0.9"
                          strokeLinecap="round"
                        />
                        <path
                          d="M0 6 C 25 4.5, 65 7.5, 100 6"
                          vectorEffect="non-scaling-stroke"
                          stroke="rgba(231, 229, 228, 0.9)"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                      </svg>

                      {/* Hand-Drawn Sketched Connector Tick (Mobile) */}
                      <svg
                        className="block md:hidden absolute left-[-2rem] xs:left-[-2.25rem] top-1/2 -translate-y-1/2 w-8 xs:w-9 h-3 pointer-events-none overflow-visible opacity-60 group-hover/card:opacity-100 group-hover/card:scale-x-125 transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                        viewBox="0 0 32 12"
                        fill="none"
                      >
                        <path
                          d="M0 6 C 8 4.5, 20 7, 32 6"
                          stroke="rgba(231, 229, 228, 0.85)"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M1 7 C 9 5, 21 7.5, 31 6.5"
                          stroke="rgba(168, 162, 158, 0.6)"
                          strokeWidth="0.8"
                          strokeLinecap="round"
                        />
                      </svg>

                      <div
                        className={`flex items-center gap-2.5 xs:gap-3 sm:gap-4 w-full min-w-0 ${
                          isEven ? "md:flex-row-reverse" : "md:flex-row"
                        }`}
                      >
                        {/* Poster with Spring Physics 3D POP Elevation */}
                        <div className={`relative w-14 h-20 xs:w-18 xs:h-26 sm:w-22 sm:h-32 md:w-24 md:h-36 rounded-lg overflow-hidden bg-stone-950 shrink-0 border border-stone-800/90 group-hover/card:border-white/80 group-hover/card:scale-110 group-hover/card:-translate-y-2 transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_4px_16px_rgba(0,0,0,0.6)] group-hover/card:shadow-[0_20px_40px_rgba(0,0,0,0.95)] ${
                          isEven ? "group-hover/card:rotate-[-1.5deg]" : "group-hover/card:rotate-[1.5deg]"
                        }`}>
                          <img
                            src={posterSrc}
                            alt={item.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-600 ease-out group-hover/card:scale-108"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg";
                            }}
                          />
                          <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                        </div>

                        {/* Movie Info Centered Vertically with Title in Middle */}
                        <div className="flex-1 min-w-0 flex flex-col justify-center py-1">
                          {/* Complete Movie Title in Middle */}
                          <h3 className={`text-xs xs:text-sm sm:text-base md:text-[16px] lg:text-[17px] font-mono uppercase tracking-[0.08em] sm:tracking-[0.1em] font-bold text-stone-200 group-hover/card:text-white transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] leading-snug break-words my-0.5 ${
                            isEven ? "group-hover/card:-translate-x-2" : "group-hover/card:translate-x-2"
                          }`}>
                            {item.title}
                          </h3>

                          <p className={`text-[9.5px] xs:text-[10.5px] sm:text-[11px] font-mono text-stone-400 mt-1 tracking-wide font-light leading-relaxed group-hover/card:text-stone-200 transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] break-words ${
                            isEven ? "group-hover/card:-translate-x-1.5" : "group-hover/card:translate-x-1.5"
                          }`}>
                            {item.tagline}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}

            {/* Final Battleworld Nexus Destination */}
            <div id="doomsday-destination" className="relative flex flex-col items-center justify-center text-center pt-8 px-2 sm:px-4 w-full">
              <div className="max-w-xl w-full py-6 px-2 text-center flex flex-col items-center bg-transparent">
                <h3 className="text-xl sm:text-3xl font-mono uppercase tracking-[0.2em] font-black text-white">
                  AVENGERS: <span className="text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.5)]">DOOMSDAY</span>
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-stone-300 font-mono font-light leading-relaxed max-w-lg mx-auto">
                  All 15 multiversal timeline branches collide under catastrophic incursions. Victor von Doom ascends the throne to forge Battleworld from the dying ashes of reality.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Slide Navigation Menu Drawer */}
      <SlideNavMenu isOpen={navMenuOpen} onClose={() => setNavMenuOpen(false)} />

      {/* Global Search Overlay */}
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </main>
  );
}
