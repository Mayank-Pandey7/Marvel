"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { UNIFIED_MCU_TREE, type MovieNode } from "@/data/movies";
import { MCU_POSTER_MAP } from "@/components/map/NodeArtwork";

function getMoviePoster(node: MovieNode) {
  const posterEntry =
    MCU_POSTER_MAP[node.id] ||
    MCU_POSTER_MAP[node.id.toLowerCase()] ||
    MCU_POSTER_MAP[node.id.replace(/-/g, "")] ||
    MCU_POSTER_MAP[node.id.replace(/_/g, "-")];

  if (posterEntry?.poster) return posterEntry.poster;
  if (node.posterUrl) return node.posterUrl;
  return "/images/posters/the-avengers.jpg";
}

// Unequal, organic alternating horizontal offsets (varying amplitudes within clean boundaries)
const DESKTOP_OFFSETS = [
  -45,  75, -35,  85, -60,  40, -75,  60, -40,  80,
  -65,  50, -55,  85, -40,  70, -70,  45, -55,  75,
  -50,  85, -65,  55, -45,  80, -75,  65, -35,  70,
  -60,  50, -80,  65, -40,  85, -55,  60, -70,  75,
  -50,  80, -60,  65
];

const MOBILE_OFFSETS = [-8, 12, -5, 10, -10, 7, -9, 13, -6, 8];

export default function TimelineDoomsdayLayout({
  movies,
  viewMode = "path",
}: {
  movies: MovieNode[];
  viewMode?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastScrollYRef = useRef(0);
  const scrollVelocityRef = useRef(0);

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
  const rafIdRef = useRef<number | null>(null);

  // Calculate Unequal, Organic Hand-Drawn Sketch Paths starting cleanly at 01
  useEffect(() => {
    const updateSketchPaths = () => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
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

      if (points.length < 2) return;

      // 1. Primary Hand-Drawn Sketch Stroke with Unequal Wave Amplitudes
      let d1 = `M ${points[0].x} ${points[0].y}`;
      // 2. Secondary Overlapping Pencil Trace
      let d2 = `M ${points[0].x - 1} ${points[0].y + 1}`;
      // 3. Tertiary Graphite Whisper Stroke
      let d3 = `M ${points[0].x + 1} ${points[0].y - 1}`;

      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const midY = (p0.y + p1.y) / 2;

        // Organic hand tremor variations
        const jitter1 = Math.sin(i * 3.7 + 0.8) * (isMobile ? 2 : 5);
        const jitter2 = Math.cos(i * 4.1 + 1.5) * (isMobile ? 2 : 4);
        const jitter3 = Math.sin(i * 2.9 + 2.2) * 2.5;

        // Primary sketch control points with unequal tension
        const cp1x = p0.x + jitter1;
        const cp1y = midY - 8 + jitter2;
        const cp2x = p1.x - jitter2;
        const cp2y = midY + 8 + jitter1;
        d1 += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;

        // Secondary sketch stroke (slightly offset for authentic pencil feel)
        const cp1x_2 = cp1x + Math.sin(i * 5.3) * 3 - 1.5;
        const cp1y_2 = cp1y + Math.cos(i * 4.7) * 3 + 1;
        const cp2x_2 = cp2x - Math.cos(i * 3.9) * 3 + 1;
        const cp2y_2 = cp2y + Math.sin(i * 5.1) * 3 - 1;
        d2 += ` C ${cp1x_2} ${cp1y_2}, ${cp2x_2} ${cp2y_2}, ${p1.x + Math.sin(i * 2.3) * 1.5} ${p1.y + 0.5}`;

        // Tertiary light whisper graphite line
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
    window.addEventListener("orientationchange", updateSketchPaths);
    const timer = setTimeout(updateSketchPaths, 250);

    return () => {
      window.removeEventListener("resize", updateSketchPaths);
      window.removeEventListener("orientationchange", updateSketchPaths);
      clearTimeout(timer);
    };
  }, [movies]);

  // Spring Pop Dynamic Scroll Physics & 3D Spatial Motion
  const updateScrollAnimations = useCallback(() => {
    const windowH = window.innerHeight || 800;
    const currentScrollY = window.scrollY || window.pageYOffset || 0;
    const isMobile = window.innerWidth < 768;

    // Track scroll velocity for elastic spring momentum
    const deltaY = currentScrollY - lastScrollYRef.current;
    lastScrollYRef.current = currentScrollY;
    scrollVelocityRef.current = Math.max(-25, Math.min(25, deltaY * 0.4));

    // Continuous Timeline Visibility: All movies remain visible, with center movies subtly elevated
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

      // Calculate vertical elevation, horizontal drift & velocity skew
      const isAboveCenter = centerY < focalCenterY;
      const velocityInfluence = (1 - visibility) * (scrollVelocityRef.current * 0.25);
      const translateY = (1 - visibility) * (isAboveCenter ? -14 : 16) + velocityInfluence;
      
      const isEven = idx % 2 === 0;
      const horizontalDrift = isMobile ? 0 : (isEven ? -1 : 1) * (1 - visibility) * 12;
      
      // Subtle 3D perspective tilt + dynamic pop scaling
      const rotateX = isMobile ? 0 : (isAboveCenter ? 1 : -1) * (1 - visibility) * 3;
      const rotateY = isMobile ? 0 : (isEven ? -1 : 1) * (1 - visibility) * 2;
      
      // Pop Scale & Display Opacity (always visible)
      const popScale = 0.93 + visibility * 0.09;
      const displayOpacity = 0.60 + visibility * 0.40;

      // Cinematic Depth-of-Field Blur (0px in center focal plateau -> up to 4.2px at top/bottom edges)
      const blur = (1 - visibility) * 4.2;

      el.style.opacity = `${displayOpacity.toFixed(3)}`;
      el.style.transform = `perspective(1100px) translate3d(${horizontalDrift.toFixed(1)}px, ${translateY.toFixed(1)}px, 0) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${popScale.toFixed(3)})`;
      el.style.filter = blur > 0.35 ? `blur(${blur.toFixed(1)}px)` : "none";
      el.style.visibility = "visible";
      el.style.pointerEvents = "auto";

      // Milestone Node continuous visibility & pulse
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
    window.addEventListener("orientationchange", onScrollOrResize, { passive: true });

    // Initial trigger
    onScrollOrResize();
    const initialTimer = setTimeout(onScrollOrResize, 200);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("orientationchange", onScrollOrResize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      clearTimeout(initialTimer);
    };
  }, [movies, updateScrollAnimations]);

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto px-2 sm:px-4 md:px-8 pt-4 pb-28">
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

            {/* Sketch Layer 4: Animated Traveling Timeline Energy Beam */}
            <path
              d={sketchPaths.primaryD}
              fill="none"
              stroke="rgba(255, 255, 255, 0.6)"
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
        {movies.map((movie, idx) => {
          const posterUrl = getMoviePoster(movie);
          const globalOrderIndex = UNIFIED_MCU_TREE.findIndex((m) => m.id === movie.id);
          const displayNumber = globalOrderIndex >= 0 ? globalOrderIndex + 1 : idx + 1;

          const isEven = idx % 2 === 0;
          const desktopX = DESKTOP_OFFSETS[idx % DESKTOP_OFFSETS.length];
          const mobileX = MOBILE_OFFSETS[idx % MOBILE_OFFSETS.length];
          const connectorWidth = isEven
            ? Math.max(16, 112 + desktopX)
            : Math.max(16, 112 - desktopX);

          return (
            <div
              key={movie.id}
              id={`movie-node-${movie.id}`}
              data-movie-id={movie.id}
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
                  href={`/timeline/${movie.id}${viewMode ? `?view=${viewMode}` : ""}`}
                  className="group/node relative w-7 h-7 sm:w-8 sm:h-8 rounded-full border bg-black border-stone-700 text-stone-300 group-hover/row:border-white group-hover/row:text-white group-hover/row:scale-125 group-hover/row:rotate-12 flex items-center justify-center font-mono text-[9px] sm:text-[10px] font-bold transition-all duration-300 cursor-pointer select-none"
                  title={`View ${movie.title} (${movie.year})`}
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

                  <span className="relative z-10 transition-transform duration-300 group-hover/row:scale-110">{String(displayNumber).padStart(2, "0")}</span>
                </Link>
              </div>

              {/* Movie Item (Clean Half-Width Layout with Zero Collisions) */}
              <div
                className={`w-full md:w-[calc(50%-7rem)] lg:w-[calc(50%-7.5rem)] min-w-0 ${
                  isEven ? "md:pr-2 md:text-right" : "md:pl-2 md:text-left"
                }`}
              >
                <Link
                  href={`/timeline/${movie.id}${viewMode ? `?view=${viewMode}` : ""}`}
                  className="group/card block relative p-1.5 xs:p-2 sm:p-2.5 transition-all duration-400 cursor-pointer group-hover/card:opacity-100 opacity-90 w-full min-w-0 bg-transparent"
                >
                  {/* Dynamic Hand-Drawn Sketched Connector Line (Desktop) - Joins Directly to Node */}
                  <svg
                    style={{
                      width: `${connectorWidth}px`,
                      [isEven ? "right" : "left"]: `-${connectorWidth}px`,
                    }}
                    className="hidden md:block absolute top-1/2 -translate-y-1/2 h-3 pointer-events-none overflow-visible opacity-60 group-hover/card:opacity-100 group-hover/card:scale-x-125 transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-center"
                    viewBox="0 0 100 12"
                    preserveAspectRatio="none"
                  >
                    {/* Secondary graphite contour trace */}
                    <path
                      d="M0 7 C 30 5, 70 8, 100 6.5"
                      vectorEffect="non-scaling-stroke"
                      stroke="rgba(168, 162, 158, 0.7)"
                      strokeWidth="0.9"
                      strokeLinecap="round"
                    />
                    {/* Primary organic sketched stroke */}
                    <path
                      d="M0 6 C 25 4.5, 65 7.5, 100 6"
                      vectorEffect="non-scaling-stroke"
                      stroke="rgba(231, 229, 228, 0.9)"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Hand-Drawn Sketched Connector Tick (Mobile) - Joins Directly to Node */}
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
                        src={posterUrl}
                        alt={movie.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-600 ease-out group-hover/card:scale-108"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg";
                        }}
                      />
                      <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                    </div>

                    {/* Movie Info Centered Vertically with Dynamic Hover Glides */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center py-1">
                      <div
                        className={`flex items-center gap-1.5 flex-wrap text-[8px] xs:text-[8.5px] font-mono uppercase tracking-wider mb-1 transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/card:-translate-y-1 ${
                          isEven ? "md:justify-end" : "md:justify-start"
                        }`}
                      >
                        <span className="text-stone-300 font-bold transition-colors duration-300 group-hover/card:text-white">
                          PHASE {movie.phase}
                        </span>
                        <span className="text-stone-600">•</span>
                        <span className="text-stone-300 font-semibold group-hover/card:text-white">
                          {movie.year}
                        </span>
                        {movie.runtime && (
                          <>
                            <span className="text-stone-600">•</span>
                            <span className="text-stone-500 group-hover/card:text-stone-300">
                              {movie.runtime} MIN
                            </span>
                          </>
                        )}
                      </div>

                      {/* Complete Movie Title in Middle */}
                      <h3 className={`text-xs xs:text-sm sm:text-base md:text-[16px] lg:text-[17px] font-mono uppercase tracking-[0.08em] sm:tracking-[0.1em] font-bold text-stone-200 group-hover/card:text-white transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] leading-snug break-words my-0.5 ${
                        isEven ? "group-hover/card:-translate-x-2" : "group-hover/card:translate-x-2"
                      }`}>
                        {movie.title}
                      </h3>

                      <p className={`text-[9.5px] xs:text-[10.5px] sm:text-[11px] font-mono text-stone-400 mt-1 tracking-wide font-light leading-relaxed group-hover/card:text-stone-200 transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] break-words ${
                        isEven ? "group-hover/card:-translate-x-1.5" : "group-hover/card:translate-x-1.5"
                      }`}>
                        {movie.heroAlias || movie.tagline || movie.leadCharacter}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
