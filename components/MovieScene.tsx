"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CharacterCarousel, type CharacterItem } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type MovieNode } from "@/data/movies";
import { getMoviePoster } from "@/components/timeline/TimelineScrollableView";

const MOVIE_BACKDROPS: Record<string, string> = {
  "iron-man": "/images/backdrops/iron-man.jpg",
  "incredible-hulk": "/images/backdrops/incredible-hulk.jpg",
  "iron-man-2": "/images/backdrops/iron-man-2.jpg",
  "thor": "/images/backdrops/thor.jpg",
  "captain-america-first-avenger": "/images/backdrops/cap-first-avenger.jpg",
  "the-avengers": "/images/backdrops/the-avengers.jpg",
  "iron-man-3": "/images/backdrops/iron-man-3.jpg",
  "thor-the-dark-world": "/images/backdrops/thor-dark-world.jpg",
  "captain-america-the-winter-soldier": "/images/backdrops/cap-winter-soldier.jpg",
  "guardians-of-the-galaxy": "/images/backdrops/gotg.jpg",
  "avengers-age-of-ultron": "/images/backdrops/avengers-age-of-ultron.jpg",
  "ant-man": "/images/backdrops/ant-man.jpg",
  "captain-america-civil-war": "/images/backdrops/cap-civil-war.jpg",
  "doctor-strange": "/images/backdrops/doctor-strange.jpg",
  "guardians-of-the-galaxy-vol-2": "/images/backdrops/gotg2.jpg",
  "spider-man-homecoming": "/images/backdrops/spider-man-homecoming.jpg",
  "thor-ragnarok": "/images/backdrops/thor-ragnarok.jpg",
  "black-panther": "/images/backdrops/black-panther.jpg",
  "avengers-infinity-war": "/images/backdrops/infinity-war.jpg",
  "ant-man-and-the-wasp": "/images/backdrops/ant-man-and-the-wasp.jpg",
  "captain-marvel": "/images/backdrops/captain-marvel.jpg",
  "avengers-endgame": "/images/backdrops/endgame.jpg",
  "spider-man-far-from-home": "/images/backdrops/spider-man-far-from-home.jpg",
  "wandavision": "/images/backdrops/wandavision.jpg",
  "the-falcon-and-the-winter-soldier": "/images/backdrops/the-falcon-and-the-winter-soldier.jpg",
  "loki": "/images/backdrops/loki.jpg",
  "black-widow": "/images/backdrops/black-widow.jpg",
  "shang-chi": "/images/backdrops/shang-chi.jpg",
  "eternals": "https://image.tmdb.org/t/p/w1280/lFByFSLV5WDJEv3KabbdAF959F2.jpg",
  "hawkeye": "/images/backdrops/hawkeye.jpg",
  "spider-man-no-way-home": "/images/backdrops/spider-man-no-way-home.jpg",
  "moon-knight": "/images/backdrops/moon-knight.jpg",
  "doctor-strange-in-the-multiverse-of-madness": "/images/backdrops/doctor-strange-multiverse.jpg",
  "ms-marvel": "/images/backdrops/ms-marvel.jpg",
  "thor-love-and-thunder": "/images/backdrops/thor-love-thunder.jpg",
  "she-hulk-attorney-at-law": "/images/backdrops/she-hulk.jpg",
  "black-panther-wakanda-forever": "/images/backdrops/black-panther.jpg",
  "ant-man-and-the-wasp-quantumania": "/images/backdrops/ant-man-quantumania.jpg",
  "guardians-of-the-galaxy-vol-3": "/images/backdrops/guardians-vol3.jpg",
  "secret-invasion": "https://image.tmdb.org/t/p/w1280/3rINdUPSy9AklJg74jWHOyUXuZd.jpg",
  "the-marvels": "https://image.tmdb.org/t/p/w1280/9GBhzXMFjgcZ3FdR9w3bUMMTps5.jpg",
  "echo": "/images/backdrops/echo.jpg",
  "deadpool-and-wolverine": "/images/backdrops/deadpool-and-wolverine.jpg",
  "agatha-all-along": "/images/backdrops/agatha-all-along.jpg",
  "captain-america-brave-new-world": "/images/backdrops/cap-brave-new-world.jpg",
  "daredevil-born-again": "/images/backdrops/daredevil-born-again.jpg",
  "thunderbolts": "/images/backdrops/thunderbolts.jpg",
  "the-fantastic-four-first-steps": "/images/backdrops/fantastic-four.jpg",
  "blade": "/images/backdrops/blade.jpg",
  "spiderman-brand-new-day": "/images/backdrops/spiderman-brand-new-day.jpg",
  "avengers-doomsday": "/images/backdrops/avengers-doomsday.jpg",
  "avengers-secret-wars": "/images/backdrops/battleworld.jpg",
  "battleworld": "/images/backdrops/battleworld.jpg",
};

interface MovieSceneProps {
  movies?: MovieNode[];
}

export function MovieScene({ movies }: MovieSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 650);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const items: CharacterItem[] | undefined = movies?.map((m) => {
    const poster = getMoviePoster(m);
    return {
      id: m.id,
      name: m.title,
      role: `PHASE ${m.phase} · ${m.year} · ${m.runtime} MIN`,
      portrait: poster,
      universe: m.heroAlias ? m.heroAlias.toUpperCase() : `PHASE ${m.phase}`,
    };
  });

  const handlePrev = () => {
    const iframe = containerRef.current?.querySelector("iframe");
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage({ type: "step-prev" }, "*");
    }
  };

  const handleNext = () => {
    const iframe = containerRef.current?.querySelector("iframe");
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage({ type: "step-next" }, "*");
    }
  };

  if (movies && movies.length === 0) {
    return (
      <div className="shader-frame w-full h-[480px] sm:h-[calc(100vh-140px)] min-h-[480px] sm:min-h-[580px] relative bg-transparent overflow-hidden border-0 flex flex-col items-center justify-center text-center p-6">
        <h3 className="text-sm font-mono tracking-[0.3em] uppercase text-stone-300 font-bold">
          NO 3D WHEEL MOVIES FOUND
        </h3>
        <p className="text-xs font-mono tracking-wide text-stone-500 mt-2 max-w-sm">
          No movie records match the active search or phase filter.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="group/carousel shader-frame w-full h-[460px] sm:h-[calc(100vh-140px)] min-h-[460px] sm:min-h-[650px] relative bg-black sm:bg-transparent overflow-hidden border-0 select-none flex items-center justify-center mt-6 sm:mt-0"
    >
      {/* Left Navigation Button */}
      <button
        onClick={handlePrev}
        aria-label="Previous Movie"
        className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-black/90 text-stone-300 hover:text-white border border-white/10 hover:border-white/30 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-2xl active:scale-95"
      >
        <ChevronLeft size={22} className="sm:w-7 sm:h-7" />
      </button>

      {/* Right Navigation Button */}
      <button
        onClick={handleNext}
        aria-label="Next Movie"
        className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-black/90 text-stone-300 hover:text-white border border-white/10 hover:border-white/30 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-2xl active:scale-95"
      >
        <ChevronRight size={22} className="sm:w-7 sm:h-7" />
      </button>

      {/* 3D Filmstrip Perspective Rail for MCU Movies */}
      <CharacterCarousel
        key={items ? `${isMobile ? "m" : "d"}-${items.map((i) => i.id).join(",")}` : "all-movies"}
        variant="filmstrip"
        items={items}
        fullPoster={!isMobile}
        speed={1.00}
        scale={isMobile ? 0.85 : 1.18}
        opacity={1.00}
        hue={0}
        saturation={1.00}
        brightness={1.00}
        onSelectCharacter={(movieId: string) => {
          router.push(`/timeline/${movieId}?view=wheel`);
        }}
      />
    </div>
  );
}

export default MovieScene;
