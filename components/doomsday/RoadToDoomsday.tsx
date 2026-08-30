"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import {
  DOOMSDAY_WATCHLIST,
  type DoomsdayWatchlistItem,
} from "@/data/doomsdayWatchlist";
import { useWatched } from "@/context/WatchedContext";
import SlideNavMenu from "@/components/dark/SlideNavMenu";
import SearchOverlay from "@/components/SearchOverlay";
import { MCU_POSTER_MAP } from "@/components/map/NodeArtwork";
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  ArrowLeft,
  Menu,
  Search,
  X,
  Zap,
  Flame,
  Globe,
  Radio,
  ExternalLink,
} from "lucide-react";

const DOOMSDAY_RELEASE_DATE = new Date("2026-12-18T00:00:00").getTime();

function useCountdown(targetDate: number) {
  const [timeLeft, setTimeLeft] = useState<{
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPassed: boolean;
  }>({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: false });

  useEffect(() => {
    const calculate = () => {
      const now = new Date();
      const target = new Date(targetDate);
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      let months = (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth());
      let tempDate = new Date(now);
      tempDate.setMonth(tempDate.getMonth() + months);

      if (tempDate > target) {
        months--;
        tempDate = new Date(now);
        tempDate.setMonth(tempDate.getMonth() + months);
      }

      const diffMs = target.getTime() - tempDate.getTime();
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      setTimeLeft({ months: Math.max(0, months), days, hours, minutes, seconds, isPassed: false });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

export default function RoadToDoomsday() {
  const { isWatched, toggleWatched } = useWatched();
  const [activeItem, setActiveItem] = useState<DoomsdayWatchlistItem | null>(null);
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const countdown = useCountdown(DOOMSDAY_RELEASE_DATE);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const filteredItems = DOOMSDAY_WATCHLIST;

  const treeContainerRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [snakePathD, setSnakePathD] = useState<string>("");

  const watchedCount = useMemo(() => {
    return DOOMSDAY_WATCHLIST.filter((item) => isWatched(item.id)).length;
  }, [isWatched]);

  const progressPercent = Math.round(
    (watchedCount / DOOMSDAY_WATCHLIST.length) * 100
  );

  useEffect(() => {
    const updateSnakePath = () => {
      if (!treeContainerRef.current) return;
      const containerRect = treeContainerRef.current.getBoundingClientRect();
      const isMobile = window.innerWidth < 768;

      const points: { x: number; y: number }[] = [];

      points.push({
        x: isMobile ? 16 : containerRect.width / 2,
        y: 0,
      });

      nodeRefs.current.forEach((nodeEl, idx) => {
        if (!nodeEl) return;
        const nodeRect = nodeEl.getBoundingClientRect();
        const relativeY = nodeRect.top - containerRect.top + nodeRect.height / 2;

        const xOffset = isMobile ? 0 : (idx % 2 === 0 ? -36 : 36);
        const relativeX = isMobile ? 16 : containerRect.width / 2 + xOffset;

        points.push({ x: relativeX, y: relativeY });
      });

      const destEl = document.getElementById("doomsday-destination");
      if (destEl) {
        const destRect = destEl.getBoundingClientRect();
        points.push({
          x: containerRect.width / 2,
          y: destRect.top - containerRect.top + 20,
        });
      }

      if (points.length < 2) return;

      let d = `M ${points[0].x} ${points[0].y}`;
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const midY = (p0.y + p1.y) / 2;
        d += ` C ${p0.x} ${midY}, ${p1.x} ${midY}, ${p1.x} ${p1.y}`;
      }

      setSnakePathD(d);
    };

    updateSnakePath();
    window.addEventListener("resize", updateSnakePath);
    const timer = setTimeout(updateSnakePath, 250);

    return () => {
      window.removeEventListener("resize", updateSnakePath);
      clearTimeout(timer);
    };
  }, [filteredItems]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !searchOpen) {
        e.preventDefault();
        setSearchOpen(true);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        if (activeItem) setActiveItem(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen, activeItem]);

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
      {}
      {}
      {}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {}
        <img
          src="/images/doomsday-bg.jpg"
          alt="Doctor Doom"
          className="absolute inset-0 w-full h-full object-cover object-[center_25%] opacity-85 filter brightness-105 contrast-110 select-none"
        />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-[#000000]/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#000000_90%)]" />
      </div>

      {}
      <div
        className="fixed top-0 inset-x-0 h-20 pointer-events-none z-20 bg-gradient-to-b from-[#000000]/90 to-transparent backdrop-blur-sm [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] transition-opacity duration-700"
        aria-hidden="true"
      />

      {}
      {}
      {}
      <header className="fixed top-0 inset-x-0 z-30 px-3 sm:px-8 py-2.5 sm:py-4 flex items-center justify-between pointer-events-none transition-opacity duration-1000">
        {}
        <div className="flex items-center gap-3 sm:gap-4 pointer-events-auto">
          <button
            onClick={() => setNavMenuOpen(true)}
            className="text-stone-400 hover:text-white transition-colors cursor-pointer p-1"
            title="Open Universe Navigation"
            aria-label="Open Universe Navigation"
          >
            <Menu size={16} />
          </button>
        </div>

        {}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-auto flex items-center justify-center gap-2 sm:gap-3">
          <span
            className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm font-mono font-bold tracking-[0.25em] xs:tracking-[0.35em] sm:tracking-[0.45em] uppercase text-stone-400 select-none cursor-default"
          >
            MARVEL
          </span>
          <span className="text-stone-600 font-mono text-xs select-none">|</span>
          <Link
            href="/doomsday"
            className="text-[11px] xs:text-xs sm:text-sm md:text-base font-mono font-bold tracking-[0.25em] xs:tracking-[0.35em] sm:tracking-[0.45em] uppercase text-emerald-400 scale-110 drop-shadow-[0_0_15px_rgba(52,211,153,0.6)] transition-all select-none"
            title="Road to Doomsday"
          >
            DOOMSDAY
          </Link>
        </div>

        {}
        <div className="flex items-center gap-2 sm:gap-4 pointer-events-auto">
          <Link
            href="/timeline"
            className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white text-[9.5px] sm:text-[11px] font-mono tracking-[0.15em] sm:tracking-[0.25em] uppercase transition-colors group cursor-pointer"
            title="Return to Timeline"
          >
            <ArrowLeft size={11} className="text-stone-500 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">RETURN</span>
          </Link>

          <button
            onClick={() => setSearchOpen(true)}
            className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white text-[9.5px] sm:text-[11px] font-mono tracking-[0.15em] sm:tracking-[0.25em] uppercase transition-colors group cursor-pointer p-1"
            title="Search All MCU Entries (/ or Ctrl+K)"
          >
            <Search size={13} className="text-stone-500 group-hover:text-white transition-colors" />
            <span className="hidden sm:inline">SEARCH</span>
            <kbd className="hidden md:inline-block text-[9px] font-mono text-stone-500 ml-0.5">/</kbd>
          </button>
        </div>
      </header>

      {}
      {}
      {}
      <section className="relative z-10 max-w-5xl mx-auto px-3 sm:px-8 pt-20 sm:pt-24 pb-6 sm:pb-8 text-center">
        <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-mono uppercase tracking-[0.16em] xs:tracking-[0.22em] font-bold text-white leading-tight">
          <span className="text-emerald-400 drop-shadow-[0_0_25px_rgba(52,211,153,0.6)]">DOOMSDAY</span> IS COMING
        </h1>
        <p className="mt-2.5 sm:mt-3 text-[11px] xs:text-xs sm:text-[13.5px] font-mono text-stone-400 max-w-2xl mx-auto leading-relaxed px-2">
          «All universes die. The question is what survives in the fire of Victor von Doom.»
        </p>

        {}
        <div className="mt-5 sm:mt-7 mb-3 sm:mb-4 flex flex-col items-center justify-center select-none w-full max-w-full px-1">
          {}
          <div className="flex items-center justify-center gap-1 xs:gap-2 sm:gap-3.5 md:gap-5 text-white font-mono">
            {}
            <div className="flex flex-col items-center min-w-[2.2rem] xs:min-w-[2.75rem] sm:min-w-[3.75rem] md:min-w-[4.5rem]">
              <span className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider leading-none">
                {String(countdown.months).padStart(2, "0")}
              </span>
              <span className="text-[6.5px] xs:text-[7.5px] sm:text-[9px] md:text-[10px] font-mono tracking-[0.18em] sm:tracking-[0.22em] uppercase text-stone-400 mt-1.5 xs:mt-2 sm:mt-2.5">
                MONTHS
              </span>
            </div>

            <span className="text-base xs:text-xl sm:text-2xl md:text-3xl font-light text-stone-500 pb-2 xs:pb-3.5 sm:pb-5">:</span>

            {}
            <div className="flex flex-col items-center min-w-[2.2rem] xs:min-w-[2.75rem] sm:min-w-[3.75rem] md:min-w-[4.5rem]">
              <span className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider leading-none">
                {String(countdown.days).padStart(2, "0")}
              </span>
              <span className="text-[6.5px] xs:text-[7.5px] sm:text-[9px] md:text-[10px] font-mono tracking-[0.18em] sm:tracking-[0.22em] uppercase text-stone-400 mt-1.5 xs:mt-2 sm:mt-2.5">
                DAYS
              </span>
            </div>

            <span className="text-base xs:text-xl sm:text-2xl md:text-3xl font-light text-stone-500 pb-2 xs:pb-3.5 sm:pb-5">:</span>

            {}
            <div className="flex flex-col items-center min-w-[2.2rem] xs:min-w-[2.75rem] sm:min-w-[3.75rem] md:min-w-[4.5rem]">
              <span className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider leading-none">
                {String(countdown.hours).padStart(2, "0")}
              </span>
              <span className="text-[6.5px] xs:text-[7.5px] sm:text-[9px] md:text-[10px] font-mono tracking-[0.18em] sm:tracking-[0.22em] uppercase text-stone-400 mt-1.5 xs:mt-2 sm:mt-2.5">
                HOURS
              </span>
            </div>

            <span className="text-base xs:text-xl sm:text-2xl md:text-3xl font-light text-stone-500 pb-2 xs:pb-3.5 sm:pb-5">:</span>

            {}
            <div className="flex flex-col items-center min-w-[2.2rem] xs:min-w-[2.75rem] sm:min-w-[3.75rem] md:min-w-[4.5rem]">
              <span className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider leading-none">
                {String(countdown.minutes).padStart(2, "0")}
              </span>
              <span className="text-[6.5px] xs:text-[7.5px] sm:text-[9px] md:text-[10px] font-mono tracking-[0.18em] sm:tracking-[0.22em] uppercase text-stone-400 mt-1.5 xs:mt-2 sm:mt-2.5">
                MINUTES
              </span>
            </div>

            <span className="text-base xs:text-xl sm:text-2xl md:text-3xl font-light text-stone-500 pb-2 xs:pb-3.5 sm:pb-5">:</span>

            {}
            <div className="flex flex-col items-center min-w-[2.2rem] xs:min-w-[2.75rem] sm:min-w-[3.75rem] md:min-w-[4.5rem]">
              <span className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider leading-none text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">
                {String(countdown.seconds).padStart(2, "0")}
              </span>
              <span className="text-[6.5px] xs:text-[7.5px] sm:text-[9px] md:text-[10px] font-mono tracking-[0.18em] sm:tracking-[0.22em] uppercase text-emerald-400/80 mt-1.5 xs:mt-2 sm:mt-2.5">
                SECONDS
              </span>
            </div>
          </div>
        </div>
      </section>

      {}
      {}
      {}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 pt-4 pb-36">
        <div ref={treeContainerRef} className="relative">

          {}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
            {snakePathD ? (
              <path
                d={snakePathD}
                fill="none"
                stroke="#57534e"
                strokeWidth="1.5"
                strokeDasharray="5 6"
                strokeLinecap="round"
                className="opacity-70"
              />
            ) : (
              <line
                x1="50%"
                y1="0"
                x2="50%"
                y2="100%"
                stroke="#57534e"
                strokeWidth="1.5"
                strokeDasharray="5 6"
                className="opacity-70"
              />
            )}
          </svg>

          {}
          <div className="flex flex-col gap-12 sm:gap-16 relative z-10">
            {filteredItems.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const isItemWatched = isWatched(item.id);
              const isSelected = activeItem?.id === item.id;

              return (
                <div
                  key={item.id}
                  className={`relative flex items-center w-full ${
                    isEven
                      ? "md:flex-row pl-12 md:pl-0"
                      : "md:flex-row-reverse pl-12 md:pl-0"
                  }`}
                >
                  {}
                  <div
                    ref={(el) => {
                      nodeRefs.current[idx] = el;
                    }}
                    className={`absolute flex items-center justify-center z-20 ${
                      isEven
                        ? "left-4 md:left-[calc(50%-2.25rem)]"
                        : "left-4 md:left-[calc(50%+2.25rem)]"
                    } -translate-x-1/2`}
                  >
                    <Link
                      href={`/${item.slug || item.id}`}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center font-mono text-[10px] font-bold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-white text-black border-white scale-110"
                          : isItemWatched
                          ? "bg-stone-900 border-white text-white"
                          : "bg-black border-stone-700 text-stone-400 hover:border-white hover:text-white"
                      }`}
                      title={`Open ${item.title} (${item.year})`}
                    >
                      <span>{String(item.order).padStart(2, "0")}</span>
                    </Link>
                  </div>

                  {}
                  <div className={`w-full md:w-[calc(50%-4rem)] min-w-0 ${isEven ? "md:pr-2 md:text-right" : "md:pl-2 md:text-left"}`}>
                    <Link
                      href={`/${item.slug || item.id}`}
                      className="group block relative p-1.5 sm:p-3 transition-all duration-200 cursor-pointer hover:opacity-100 opacity-90 w-full min-w-0"
                    >
                      {}
                      <div
                        className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-6 h-[1px] ${
                          isEven ? "-right-6" : "-left-6"
                        } bg-stone-700 group-hover:bg-stone-400`}
                      />

                      <div className={`flex items-start gap-2.5 sm:gap-3.5 w-full min-w-0 ${isEven ? "md:flex-row-reverse" : "md:flex-row"}`}>

                        {}
                        <div className="relative w-16 h-24 xs:w-20 xs:h-28 sm:w-24 sm:h-36 rounded-md overflow-hidden bg-stone-950 shrink-0 border border-stone-800/90 group-hover:border-stone-400 group-hover:scale-105 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                          <img
                            src={MCU_POSTER_MAP[item.id]?.poster || item.posterUrl}
                            alt={item.title}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {

                              (e.target as HTMLImageElement).src = "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg";
                            }}
                          />
                          <div className="absolute inset-0 ring-1 ring-inset ring-white/15 pointer-events-none rounded-md" />
                          <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                        </div>

                        {}
                        <div className="flex-1 min-w-0 pr-1">
                          <div className={`flex items-center gap-1.5 flex-wrap text-[8px] xs:text-[8.5px] font-mono uppercase tracking-wider mb-0.5 ${
                            isEven ? "md:justify-end" : "md:justify-start"
                          }`}>
                            <span className="text-stone-400 font-semibold">{item.year}</span>
                            <span className="text-stone-700">•</span>
                            <span className="text-stone-500">{item.universe}</span>
                          </div>

                          <h3 className="text-xs xs:text-sm sm:text-base font-mono uppercase tracking-[0.1em] xs:tracking-[0.14em] font-bold truncate text-stone-300 group-hover:text-white transition-colors">
                            {item.title}
                          </h3>

                          <p className="text-[10px] xs:text-[11px] font-sans text-stone-400 line-clamp-2 mt-0.5 font-light leading-relaxed">
                            {item.tagline}
                          </p>

                          {}
                          <div className={`flex items-center justify-between gap-2 sm:gap-3 mt-1.5 sm:mt-2 ${
                            isEven ? "md:flex-row-reverse" : "md:flex-row"
                          }`}>
                            <span className="text-[7.5px] xs:text-[8px] font-mono tracking-widest uppercase text-stone-500 truncate">
                              {item.incursionThreat}
                            </span>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleWatched(item.id);
                              }}
                              className={`whitespace-nowrap shrink-0 inline-flex items-center gap-1 sm:gap-1.5 text-[8px] xs:text-[8.5px] font-mono tracking-wider uppercase transition-colors cursor-pointer ${
                                isItemWatched
                                  ? "text-emerald-400 font-semibold"
                                  : "text-stone-400 hover:text-white"
                              }`}
                            >
                              {isItemWatched ? (
                                <>
                                  <CheckCircle2 size={11} className="text-emerald-400" />
                                  <span>WATCHED</span>
                                </>
                              ) : (
                                <>
                                  <Circle size={11} className="text-stone-500" />
                                  <span>MARK WATCHED</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                      </div>
                    </Link>
                  </div>

                  {}
                  <div className="hidden md:block w-[calc(50%-4rem)]" />
                </div>
              );
            })}

            {}
            {}
            {}
            <div id="doomsday-destination" className="relative flex flex-col items-center justify-center text-center pt-8 px-2 sm:px-4 w-full">
              <div className="max-w-xl w-full p-4 text-center flex flex-col items-center">
                <h3 className="text-xl sm:text-3xl font-mono uppercase tracking-[0.2em] font-black text-white">
                  AVENGERS: <span className="text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.5)]">DOOMSDAY</span>
                </h3>
                <p className="mt-2.5 text-xs text-stone-300 font-sans font-light leading-relaxed max-w-lg mx-auto">
                  All 15 multiversal timeline branches collide under catastrophic incursions. Victor von Doom ascends the throne to forge Battleworld from the dying ashes of reality.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {}
      {}
      {}
      {activeItem && (
        <div
          onClick={() => setActiveItem(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[#08080c] border border-stone-700 rounded-sm p-6 sm:p-8 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
          >
            {}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 p-1.5 rounded-sm border border-stone-800 hover:border-stone-600 text-stone-400 hover:text-white bg-stone-950 transition-colors cursor-pointer"
            >
              <X size={15} />
            </button>

            {}
            <div className="relative rounded-sm overflow-hidden border border-stone-800 aspect-video bg-stone-950 shrink-0">
              <img
                src={activeItem.backdropUrl || activeItem.posterUrl}
                alt={activeItem.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover brightness-75"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = activeItem.posterUrl;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-transparent to-black/40" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-[9px] font-mono tracking-[0.25em] text-stone-400 uppercase font-semibold block mb-1">
                    CHAPTER #{String(activeItem.order).padStart(2, "0")} · {activeItem.year} · {activeItem.universe}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-mono font-bold uppercase text-white tracking-tight">
                    {activeItem.title}
                  </h2>
                </div>
              </div>
            </div>

            {}
            <div className="bg-[#0e0e16] border border-stone-800 rounded-sm p-4">
              <div className="flex items-center gap-2 text-[9.5px] font-mono font-bold tracking-[0.25em] uppercase text-white mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <span>DOOM &amp; INCURSION CONNECTION</span>
              </div>
              <p className="text-xs sm:text-[13px] font-sans text-stone-200 leading-relaxed font-light">
                {activeItem.doomConnection}
              </p>
            </div>

            {}
            <div>
              <span className="text-[9.5px] font-mono tracking-[0.25em] uppercase text-stone-500 font-semibold block mb-1">
                NARRATIVE FOUNDATION
              </span>
              <p className="text-xs text-stone-400 leading-relaxed font-sans font-light">
                {activeItem.whyItMatters}
              </p>
            </div>

            {}
            <div>
              <span className="text-[9.5px] font-mono tracking-[0.25em] uppercase text-stone-500 font-semibold block mb-2">
                KEY CHARACTERS
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeItem.keyCharacters.map((char) => (
                  <span
                    key={char}
                    className="text-[9.5px] font-mono px-2.5 py-1 rounded-sm bg-stone-900 border border-stone-800 text-stone-300"
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>

            {}
            <div className="pt-3 border-t border-stone-800 flex items-center justify-between gap-3">
              <button
                onClick={() => toggleWatched(activeItem.id)}
                className={`flex-1 py-2.5 rounded-sm font-mono text-[10.5px] font-bold tracking-widest uppercase transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  isWatched(activeItem.id)
                    ? "bg-white text-black font-bold shadow-md"
                    : "bg-stone-900 border border-stone-700 text-stone-300 hover:bg-stone-800 hover:text-white"
                }`}
              >
                <CheckCircle2 size={13} />
                <span>{isWatched(activeItem.id) ? "COMPLETED" : "MARK VIEWED"}</span>
              </button>

              <Link
                href={activeItem.phase ? `/movie/${activeItem.id}` : "/timeline"}
                className="py-2.5 px-4 rounded-sm bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 text-[10.5px] font-mono tracking-widest uppercase transition-colors flex items-center gap-1.5"
              >
                <span>EXPLORE ENTRY</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {}
      <SlideNavMenu isOpen={navMenuOpen} onClose={() => setNavMenuOpen(false)} />
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </main>
  );
}
