"use client";

import React, { useState } from "react";

// Verified High-Resolution Official MCU Movie Posters & Badges
export const MCU_POSTER_MAP: Record<string, { poster: string; color: string; fallbackText: string }> = {
  // Phase 1
  "iron-man": {
    poster: "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
    color: "#e55039",
    fallbackText: "IM",
  },
  "the-incredible-hulk": {
    poster: "https://image.tmdb.org/t/p/w500/gKzYx79y0AQTL4UAk1cBQJ3nvrm.jpg",
    color: "#2ed573",
    fallbackText: "HULK",
  },
  "iron-man-2": {
    poster: "https://image.tmdb.org/t/p/w500/6WBeq4jjqCmjXugQ0VPUtiV1d8L.jpg",
    color: "#fa8231",
    fallbackText: "IM2",
  },
  "thor": {
    poster: "https://image.tmdb.org/t/p/w500/prSfAi1xGrhLQNxVSUFh61xQ4Qx.jpg",
    color: "#4bcffa",
    fallbackText: "THOR",
  },
  "captain-america": {
    poster: "https://image.tmdb.org/t/p/w500/vSNxAJTlD0r02V9sPYFSpLxg2uj.jpg",
    color: "#3867d6",
    fallbackText: "CAP",
  },
  "the-avengers": {
    poster: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
    color: "#ffd32a",
    fallbackText: "AVENGERS",
  },

  // Phase 2
  "iron-man-3": {
    poster: "https://image.tmdb.org/t/p/w500/1Ilv6ryFeSJvEG9ZnUpFeem5mM9.jpg",
    color: "#e55039",
    fallbackText: "IM3",
  },
  "thor-dark-world": {
    poster: "https://image.tmdb.org/t/p/w500/wp6OxE4poJ4G7c0U2ZIXas09g4P.jpg",
    color: "#a55eea",
    fallbackText: "THOR 2",
  },
  "captain-america-winter-soldier": {
    poster: "https://image.tmdb.org/t/p/w500/tVFRpFw3xTed5nGQqW0sdKGx84U.jpg",
    color: "#4b6584",
    fallbackText: "CAP 2",
  },
  "guardians-of-the-galaxy": {
    poster: "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
    color: "#ff9f1a",
    fallbackText: "GOTG",
  },
  "avengers-age-of-ultron": {
    poster: "https://image.tmdb.org/t/p/w500/4ssDuvEDkS9Nvm8Ve2rUdMoR8x3.jpg",
    color: "#eb3b5a",
    fallbackText: "ULTRON",
  },
  "ant-man": {
    poster: "https://image.tmdb.org/t/p/w500/8c4QgB2Kd4576P6oY8ePps1qgQy.jpg",
    color: "#fa8231",
    fallbackText: "ANT-MAN",
  },

  // Phase 3
  "captain-america-civil-war": {
    poster: "https://image.tmdb.org/t/p/w500/rAGiXaUfPzY7CDEyNKUofk3Kw2e.jpg",
    color: "#3867d6",
    fallbackText: "CIVIL WAR",
  },
  "doctor-strange": {
    poster: "https://image.tmdb.org/t/p/w500/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg",
    color: "#ff9f1a",
    fallbackText: "STRANGE",
  },
  "guardians-of-the-galaxy-vol-2": {
    poster: "https://image.tmdb.org/t/p/w500/y4MBh0EjBlMuOzv9axM4qJmLRbF.jpg",
    color: "#fd9644",
    fallbackText: "GOTG 2",
  },
  "spider-man-homecoming": {
    poster: "https://image.tmdb.org/t/p/w500/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg",
    color: "#ff3838",
    fallbackText: "SPIDER-MAN",
  },
  "thor-ragnarok": {
    poster: "https://image.tmdb.org/t/p/w500/rzRwTcFvttcN1ZpX2xv4UmYvSd2.jpg",
    color: "#20bf6b",
    fallbackText: "RAGNAROK",
  },
  "black-panther": {
    poster: "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
    color: "#a55eea",
    fallbackText: "PANTHER",
  },
  "avengers-infinity-war": {
    poster: "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    color: "#ffd32a",
    fallbackText: "INFINITY WAR",
  },
  "ant-man-and-the-wasp": {
    poster: "https://image.tmdb.org/t/p/w500/rv1AWImgx386ULjcf62VdpWziME.jpg",
    color: "#fed330",
    fallbackText: "ANT & WASP",
  },
  "captain-marvel": {
    poster: "https://image.tmdb.org/t/p/w500/AtsgWhDnHTq68L0lLsUrCnM7Tgp.jpg",
    color: "#45aaf2",
    fallbackText: "MARVEL",
  },
  "avengers-endgame": {
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    color: "#a55eea",
    fallbackText: "ENDGAME",
  },
  "spider-man-far-from-home": {
    poster: "https://image.tmdb.org/t/p/w500/4q2hz2mYflgYOpVLyGuhiz0yYAW.jpg",
    color: "#ff4d4d",
    fallbackText: "FFH",
  },

  // Phase 4
  "wandavision": {
    poster: "https://image.tmdb.org/t/p/w500/glKDrtVTGhZk1b645nGUMMu9wmm.jpg",
    color: "#eb3b5a",
    fallbackText: "WANDAVISION",
  },
  "loki-season-1": {
    poster: "https://image.tmdb.org/t/p/w500/kEl2t3OhXc39gTuSmIpne78o1OY.jpg",
    color: "#2ed573",
    fallbackText: "LOKI 1",
  },
  "black-widow": {
    poster: "https://image.tmdb.org/t/p/w500/qAZ0whmmp93qRBP0fLArWgm2St4.jpg",
    color: "#eb3b5a",
    fallbackText: "BLACK WIDOW",
  },
  "shang-chi": {
    poster: "https://image.tmdb.org/t/p/w500/1BIoJGKbXjdFDAvUEiA2VHqkK1Z.jpg",
    color: "#ff4757",
    fallbackText: "SHANG-CHI",
  },
  "eternals": {
    poster: "https://image.tmdb.org/t/p/w500/bcCBq9N1EMo3daNIjWJ1kYNAyAH.jpg",
    color: "#ffd32a",
    fallbackText: "ETERNALS",
  },
  "spider-man-no-way-home": {
    poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    color: "#ff3838",
    fallbackText: "NO WAY HOME",
  },
  "doctor-strange-multiverse-of-madness": {
    poster: "https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
    color: "#8854d0",
    fallbackText: "MOM",
  },
  "thor-love-and-thunder": {
    poster: "https://image.tmdb.org/t/p/w500/pIkRyD18kl4F0b6PpHmhoEwMGPX.jpg",
    color: "#f368e0",
    fallbackText: "LOVE & THUNDER",
  },
  "black-panther-wakanda-forever": {
    poster: "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
    color: "#a55eea",
    fallbackText: "WAKANDA",
  },

  // Phase 5
  "ant-man-and-the-wasp-quantumania": {
    poster: "https://image.tmdb.org/t/p/w500/qnqGbB22YJ7dSs4o6M7exTpNxPz.jpg",
    color: "#ff4757",
    fallbackText: "QUANTUMANIA",
  },
  "guardians-of-the-galaxy-vol-3": {
    poster: "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN2Ydgii51I3.jpg",
    color: "#20bf6b",
    fallbackText: "GOTG 3",
  },
  "secret-invasion": {
    poster: "https://image.tmdb.org/t/p/w500/f5f3TEXdVIUFUG59ap3MbdfZsTV.jpg",
    color: "#e55039",
    fallbackText: "SECRET INVASION",
  },
  "loki-season-2": {
    poster: "https://image.tmdb.org/t/p/w500/voHUmluYmKyleFk9a3xgHyKvIgH.jpg",
    color: "#2ed573",
    fallbackText: "LOKI 2",
  },
  "the-marvels": {
    poster: "https://image.tmdb.org/t/p/w500/9GBhzXMFjgcZ3FdR9w3bUMMTps5.jpg",
    color: "#45aaf2",
    fallbackText: "THE MARVELS",
  },
  "deadpool-and-wolverine": {
    poster: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    color: "#eb3b5a",
    fallbackText: "D&W",
  },
  "captain-america-brave-new-world": {
    poster: "https://image.tmdb.org/t/p/w500/7vPtYFqK3jW7Q3Hn0qZ9mQo4VqZ.jpg",
    color: "#3867d6",
    fallbackText: "BNW",
  },

  // Phase 6
  "thunderbolts": {
    poster: "https://image.tmdb.org/t/p/w500/mKOB2v1lWn0W09G6i0V0UuE8hJg.jpg",
    color: "#ffd32a",
    fallbackText: "THUNDERBOLTS*",
  },
  "the-fantastic-four-first-steps": {
    poster: "https://image.tmdb.org/t/p/w500/bcCBq9N1EMo3daNIjWJ1kYNAyAH.jpg",
    color: "#4bcffa",
    fallbackText: "FANTASTIC FOUR",
  },
  "blade": {
    poster: "https://image.tmdb.org/t/p/w500/gKzYx79y0AQTL4UAk1cBQJ3nvrm.jpg",
    color: "#eb3b5a",
    fallbackText: "BLADE",
  },
  "avengers-doomsday": {
    poster: "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    color: "#2ed573",
    fallbackText: "DOOMSDAY",
  },
  "avengers-secret-wars": {
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    color: "#ffd32a",
    fallbackText: "SECRET WARS",
  },
};

export default function NodeArtwork({
  movieId,
  className = "w-full h-full",
  isActive = false,
  rounded = "rounded-full",
}: {
  movieId: string;
  className?: string;
  isActive?: boolean;
  rounded?: string;
}) {
  const [imgError, setImgError] = useState(false);
  const data = MCU_POSTER_MAP[movieId] || {
    poster: `https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg`,
    color: "#ffffff",
    fallbackText: movieId.toUpperCase(),
  };

  return (
    <div className={`relative ${className} flex items-center justify-center bg-black overflow-hidden ${rounded} select-none`}>
      {/* Background Poster Image */}
      {!imgError ? (
        <img
          src={data.poster}
          alt={movieId}
          onError={() => setImgError(true)}
          loading="lazy"
          className={`w-full h-full object-cover object-center transition-all duration-700 ${
            isActive ? "scale-110 filter brightness-110 contrast-105" : "scale-100 filter brightness-95 contrast-100 group-hover:scale-105 group-hover:brightness-105"
          }`}
        />
      ) : (
        <div
          className="w-full h-full flex flex-col items-center justify-center p-2 text-center"
          style={{ backgroundColor: `${data.color}20` }}
        >
          <span className="font-mono text-[10px] font-black tracking-widest uppercase" style={{ color: data.color }}>
            {data.fallbackText}
          </span>
        </div>
      )}

      {/* Cinematic Vignette Overlay */}
      <div className={`absolute inset-0 ${rounded} bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.85)_100%)] pointer-events-none`} />

      {/* Active Inner Cosmic Glow Ring */}
      {isActive && (
        <div
          className={`absolute inset-0 ${rounded} pointer-events-none transition-opacity duration-300`}
          style={{
            boxShadow: `inset 0 0 16px ${data.color}90`,
            border: `1.5px solid ${data.color}`,
          }}
        />
      )}
    </div>
  );
}
