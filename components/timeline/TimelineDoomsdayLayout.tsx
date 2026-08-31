"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { type MovieNode } from "@/data/movies";
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

export default function TimelineDoomsdayLayout({
  movies,
}: {
  movies: MovieNode[];
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [snakePathD, setSnakePathD] = useState<string>("");

  useEffect(() => {
    const updateSnakePath = () => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
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

        const xOffset = isMobile ? 0 : idx % 2 === 0 ? -36 : 36;
        const relativeX = isMobile ? 16 : containerRect.width / 2 + xOffset;

        points.push({ x: relativeX, y: relativeY });
      });

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
  }, [movies]);

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto pt-4 pb-20">
      {/* SVG Snake Connector Line */}
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

      {/* Alternating Vertical Timeline Items */}
      <div className="flex flex-col gap-10 sm:gap-14 relative z-10">
        {movies.map((movie, idx) => {
          const isEven = idx % 2 === 0;
          const posterUrl = getMoviePoster(movie);

          return (
            <div
              key={movie.id}
              className={`relative flex items-center w-full ${
                isEven
                  ? "md:flex-row pl-12 md:pl-0"
                  : "md:flex-row-reverse pl-12 md:pl-0"
              }`}
            >
              {/* Circular Milestone Node on the Path */}
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
                  href={`/timeline/${movie.id}`}
                  className="w-8 h-8 rounded-full border bg-black border-stone-700 text-stone-300 hover:border-white hover:text-white hover:scale-110 flex items-center justify-center font-mono text-[10px] font-bold transition-all shadow-[0_0_12px_rgba(0,0,0,0.8)] cursor-pointer"
                  title={`View ${movie.title} (${movie.year})`}
                >
                  <span>{String(movie.order).padStart(2, "0")}</span>
                </Link>
              </div>

              {/* Movie Card */}
              <div
                className={`w-full md:w-[calc(50%-4rem)] min-w-0 ${
                  isEven ? "md:pr-2 md:text-right" : "md:pl-2 md:text-left"
                }`}
              >
                <Link
                  href={`/timeline/${movie.id}`}
                  className="group block relative p-2 sm:p-3 transition-all duration-300 cursor-pointer hover:opacity-100 opacity-90 w-full min-w-0 bg-stone-950/40 hover:bg-stone-900/60 border border-white/5 hover:border-white/20 rounded-xl backdrop-blur-sm shadow-xl"
                >
                  {/* Horizontal Branch Connector Line */}
                  <div
                    className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-6 h-[1px] ${
                      isEven ? "-right-6" : "-left-6"
                    } bg-stone-700 group-hover:bg-stone-400 transition-colors`}
                  />

                  <div
                    className={`flex items-start gap-3 sm:gap-4 w-full min-w-0 ${
                      isEven ? "md:flex-row-reverse" : "md:flex-row"
                    }`}
                  >
                    {/* Poster */}
                    <div className="relative w-16 h-24 xs:w-20 xs:h-28 sm:w-24 sm:h-36 rounded-lg overflow-hidden bg-stone-950 shrink-0 border border-stone-800/90 group-hover:border-white/30 group-hover:scale-105 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                      <img
                        src={posterUrl}
                        alt={movie.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg";
                        }}
                      />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none rounded-lg" />
                      <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                    </div>

                    {/* Movie Info */}
                    <div className="flex-1 min-w-0 py-0.5">
                      <div
                        className={`flex items-center gap-1.5 flex-wrap text-[8.5px] font-mono uppercase tracking-wider mb-1 ${
                          isEven ? "md:justify-end" : "md:justify-start"
                        }`}
                      >
                        <span className="text-amber-400/90 font-bold">
                          PHASE {movie.phase}
                        </span>
                        <span className="text-stone-600">•</span>
                        <span className="text-stone-300 font-semibold">
                          {movie.year}
                        </span>
                        {movie.runtime && (
                          <>
                            <span className="text-stone-600">•</span>
                            <span className="text-stone-500">
                              {movie.runtime} MIN
                            </span>
                          </>
                        )}
                      </div>

                      <h3 className="text-xs xs:text-sm sm:text-base font-mono uppercase tracking-[0.12em] font-bold truncate text-stone-200 group-hover:text-white transition-colors">
                        {movie.title}
                      </h3>

                      <p className="text-[10px] xs:text-[11px] font-mono text-stone-400 line-clamp-2 mt-1 tracking-wide">
                        {movie.heroAlias || movie.tagline || movie.leadCharacter}
                      </p>

                      <div
                        className={`flex items-center gap-2 mt-2.5 ${
                          isEven ? "md:justify-end" : "md:justify-start"
                        }`}
                      >
                        <span className="text-[9px] font-mono tracking-widest text-stone-500 group-hover:text-stone-300 uppercase flex items-center gap-1 transition-colors">
                          EXPLORE ENTRY →
                        </span>
                      </div>
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
