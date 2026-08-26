"use client";

import React, { useState } from "react";

export const MCU_POSTER_MAP: Record<string, { poster: string; color: string; fallbackText: string }> = {

  "iron-man": {
    poster: "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
    color: "#e55039",
    fallbackText: "IRON MAN",
  },
  "hulk": {
    poster: "https://image.tmdb.org/t/p/w500/gKzYx79y0AQTL4UAk1cBQJ3nvrm.jpg",
    color: "#2ed573",
    fallbackText: "HULK",
  },
  "the-incredible-hulk": {
    poster: "https://image.tmdb.org/t/p/w500/gKzYx79y0AQTL4UAk1cBQJ3nvrm.jpg",
    color: "#2ed573",
    fallbackText: "HULK",
  },
  "iron-man-2": {
    poster: "https://image.tmdb.org/t/p/w500/6WBeq4fCfn7AN0o21W9qNcRF2l9.jpg",
    color: "#fa8231",
    fallbackText: "IRON MAN 2",
  },
  "thor": {
    poster: "https://image.tmdb.org/t/p/w500/prSfAi1xGrhLQNxVSUFh61xQ4Qy.jpg",
    color: "#4bcffa",
    fallbackText: "THOR",
  },
  "cap-first-avenger": {
    poster: "https://image.tmdb.org/t/p/w500/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg",
    color: "#3867d6",
    fallbackText: "CAPTAIN AMERICA",
  },
  "captain-america": {
    poster: "https://image.tmdb.org/t/p/w500/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg",
    color: "#3867d6",
    fallbackText: "CAPTAIN AMERICA",
  },
  "avengers": {
    poster: "/images/posters/the-avengers.jpg",
    color: "#ffd32a",
    fallbackText: "THE AVENGERS",
  },
  "the-avengers": {
    poster: "/images/posters/the-avengers.jpg",
    color: "#ffd32a",
    fallbackText: "THE AVENGERS",
  },

  "iron-man-3": {
    poster: "https://image.tmdb.org/t/p/w500/qhPtAc1TKbMPqNvcdXSOn9Bn7hZ.jpg",
    color: "#e55039",
    fallbackText: "IRON MAN 3",
  },
  "thor-dark-world": {
    poster: "https://image.tmdb.org/t/p/w500/wp6OxE4poJ4G7c0U2ZIXasTSMR7.jpg",
    color: "#a55eea",
    fallbackText: "THOR 2",
  },
  "cap-winter-soldier": {
    poster: "https://image.tmdb.org/t/p/w500/tVFRpFw3xTedgPGqxW0AOI8Qhh0.jpg",
    color: "#4b6584",
    fallbackText: "WINTER SOLDIER",
  },
  "captain-america-winter-soldier": {
    poster: "https://image.tmdb.org/t/p/w500/tVFRpFw3xTedgPGqxW0AOI8Qhh0.jpg",
    color: "#4b6584",
    fallbackText: "WINTER SOLDIER",
  },
  "gotg": {
    poster: "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
    color: "#ff9f1a",
    fallbackText: "GUARDIANS",
  },
  "guardians-of-the-galaxy": {
    poster: "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
    color: "#ff9f1a",
    fallbackText: "GUARDIANS",
  },
  "avengers-aou": {
    poster: "https://image.tmdb.org/t/p/w500/4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg",
    color: "#eb3b5a",
    fallbackText: "AGE OF ULTRON",
  },
  "avengers-age-of-ultron": {
    poster: "https://image.tmdb.org/t/p/w500/4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg",
    color: "#eb3b5a",
    fallbackText: "AGE OF ULTRON",
  },
  "ant-man": {
    poster: "https://image.tmdb.org/t/p/w500/rQRnQfUl3kfp78nCWq8Ks04vnq1.jpg",
    color: "#fa8231",
    fallbackText: "ANT-MAN",
  },

  "cap-civil-war": {
    poster: "https://image.tmdb.org/t/p/w500/rAGiXaUfPzY7CDEyNKUofk3Kw2e.jpg",
    color: "#3867d6",
    fallbackText: "CIVIL WAR",
  },
  "captain-america-civil-war": {
    poster: "https://image.tmdb.org/t/p/w500/rAGiXaUfPzY7CDEyNKUofk3Kw2e.jpg",
    color: "#3867d6",
    fallbackText: "CIVIL WAR",
  },
  "doctor-strange": {
    poster: "https://image.tmdb.org/t/p/w500/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg",
    color: "#ff9f1a",
    fallbackText: "DOCTOR STRANGE",
  },
  "gotg2": {
    poster: "https://image.tmdb.org/t/p/w500/y4MBh0EjBlMuOzv9axM4qJlmhzz.jpg",
    color: "#fd9644",
    fallbackText: "GOTG VOL 2",
  },
  "guardians-of-the-galaxy-vol-2": {
    poster: "https://image.tmdb.org/t/p/w500/y4MBh0EjBlMuOzv9axM4qJlmhzz.jpg",
    color: "#fd9644",
    fallbackText: "GOTG VOL 2",
  },
  "spiderman-homecoming": {
    poster: "https://image.tmdb.org/t/p/w500/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg",
    color: "#ff3838",
    fallbackText: "HOMECOMING",
  },
  "spider-man-homecoming": {
    poster: "https://image.tmdb.org/t/p/w500/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg",
    color: "#ff3838",
    fallbackText: "HOMECOMING",
  },
  "thor-ragnarok": {
    poster: "https://image.tmdb.org/t/p/w500/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg",
    color: "#20bf6b",
    fallbackText: "RAGNAROK",
  },
  "black-panther": {
    poster: "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
    color: "#a55eea",
    fallbackText: "BLACK PANTHER",
  },
  "infinity-war": {
    poster: "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    color: "#ffd32a",
    fallbackText: "INFINITY WAR",
  },
  "avengers-infinity-war": {
    poster: "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    color: "#ffd32a",
    fallbackText: "INFINITY WAR",
  },
  "ant-man-wasp": {
    poster: "https://image.tmdb.org/t/p/w500/cFQEO687n1K6umXbInzocxcnAQz.jpg",
    color: "#fed330",
    fallbackText: "ANT & WASP",
  },
  "ant-man-and-the-wasp": {
    poster: "https://image.tmdb.org/t/p/w500/cFQEO687n1K6umXbInzocxcnAQz.jpg",
    color: "#fed330",
    fallbackText: "ANT & WASP",
  },
  "captain-marvel": {
    poster: "https://image.tmdb.org/t/p/w500/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg",
    color: "#45aaf2",
    fallbackText: "CAPTAIN MARVEL",
  },
  "endgame": {
    poster: "https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg",
    color: "#a55eea",
    fallbackText: "ENDGAME",
  },
  "avengers-endgame": {
    poster: "https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg",
    color: "#a55eea",
    fallbackText: "ENDGAME",
  },
  "spiderman-far-from-home": {
    poster: "https://image.tmdb.org/t/p/w500/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg",
    color: "#ff4d4d",
    fallbackText: "FAR FROM HOME",
  },
  "spider-man-far-from-home": {
    poster: "https://image.tmdb.org/t/p/w500/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg",
    color: "#ff4d4d",
    fallbackText: "FAR FROM HOME",
  },

  "wandavision": {
    poster: "https://image.tmdb.org/t/p/w500/ijWWwINc8h71NQ8j1LTJMFSj5wr.jpg",
    color: "#eb3b5a",
    fallbackText: "WANDAVISION",
  },
  "falcon-winter-soldier": {
    poster: "https://image.tmdb.org/t/p/w500/6kbAMLteGO8yyewYau6bJ683sw7.jpg",
    color: "#3867d6",
    fallbackText: "FALCON & WS",
  },
  "the-falcon-and-the-winter-soldier": {
    poster: "https://image.tmdb.org/t/p/w500/6kbAMLteGO8yyewYau6bJ683sw7.jpg",
    color: "#3867d6",
    fallbackText: "FALCON & WS",
  },
  "loki": {
    poster: "https://image.tmdb.org/t/p/w500/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg",
    color: "#2ed573",
    fallbackText: "LOKI",
  },
  "loki-s1": {
    poster: "https://image.tmdb.org/t/p/w500/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg",
    color: "#2ed573",
    fallbackText: "LOKI S1",
  },
  "loki-season-1": {
    poster: "https://image.tmdb.org/t/p/w500/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg",
    color: "#2ed573",
    fallbackText: "LOKI S1",
  },
  "black-widow": {
    poster: "https://image.tmdb.org/t/p/w500/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg",
    color: "#eb3b5a",
    fallbackText: "BLACK WIDOW",
  },
  "shang-chi": {
    poster: "https://image.tmdb.org/t/p/w500/9f2Q0U3IOsLgrI2HkvldwSABZy5.jpg",
    color: "#ff4757",
    fallbackText: "SHANG-CHI",
  },
  "eternals": {
    poster: "https://image.tmdb.org/t/p/w500/lFByFSLV5WDJEv3KabbdAF959F2.jpg",
    color: "#ffd32a",
    fallbackText: "ETERNALS",
  },
  "hawkeye": {
    poster: "https://image.tmdb.org/t/p/w500/ct5pNE5dDHryHLDnxyZPYcqO1sz.jpg",
    color: "#a55eea",
    fallbackText: "HAWKEYE",
  },
  "spiderman-no-way-home": {
    poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    color: "#ff3838",
    fallbackText: "NO WAY HOME",
  },
  "spider-man-no-way-home": {
    poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    color: "#ff3838",
    fallbackText: "NO WAY HOME",
  },
  "moon-knight": {
    poster: "https://image.tmdb.org/t/p/w500/x6FsYvt33846IQnDSFxla9j0RX8.jpg",
    color: "#d1d8e0",
    fallbackText: "MOON KNIGHT",
  },
  "doctor-strange-multiverse": {
    poster: "https://image.tmdb.org/t/p/w500/ddJcSKbcp4rKZTmuyWaMhuwcfMz.jpg",
    color: "#8854d0",
    fallbackText: "MOM",
  },
  "doctor-strange-multiverse-of-madness": {
    poster: "https://image.tmdb.org/t/p/w500/ddJcSKbcp4rKZTmuyWaMhuwcfMz.jpg",
    color: "#8854d0",
    fallbackText: "MOM",
  },
  "ms-marvel": {
    poster: "https://image.tmdb.org/t/p/w500/3HWWh92kZbD7odwJX7nKmXNZsYo.jpg",
    color: "#45aaf2",
    fallbackText: "MS. MARVEL",
  },
  "thor-love-thunder": {
    poster: "https://image.tmdb.org/t/p/w500/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg",
    color: "#f368e0",
    fallbackText: "LOVE & THUNDER",
  },
  "thor-love-and-thunder": {
    poster: "https://image.tmdb.org/t/p/w500/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg",
    color: "#f368e0",
    fallbackText: "LOVE & THUNDER",
  },
  "she-hulk": {
    poster: "https://image.tmdb.org/t/p/w500/5xz2orV8f0usyrfGNshcoXHmiaV.jpg",
    color: "#2ed573",
    fallbackText: "SHE-HULK",
  },
  "she-hulk-attorney-at-law": {
    poster: "https://image.tmdb.org/t/p/w500/5xz2orV8f0usyrfGNshcoXHmiaV.jpg",
    color: "#2ed573",
    fallbackText: "SHE-HULK",
  },
  "black-panther-wakanda": {
    poster: "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
    color: "#a55eea",
    fallbackText: "WAKANDA FOREVER",
  },
  "black-panther-wakanda-forever": {
    poster: "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
    color: "#a55eea",
    fallbackText: "WAKANDA FOREVER",
  },
  "guardians-holiday": {
    poster: "https://image.tmdb.org/t/p/w500/8dqXyslZ2hv49Oiob9UjlGSHSTR.jpg",
    color: "#2ed573",
    fallbackText: "GOTG SPECIAL",
  },
  "the-guardians-of-the-galaxy-holiday-special": {
    poster: "https://image.tmdb.org/t/p/w500/8dqXyslZ2hv49Oiob9UjlGSHSTR.jpg",
    color: "#2ed573",
    fallbackText: "GOTG SPECIAL",
  },

  "ant-man-quantumania": {
    poster: "https://image.tmdb.org/t/p/w500/qnqGbB22YJ7dSs4o6M7exTpNxPz.jpg",
    color: "#ff4757",
    fallbackText: "QUANTUMANIA",
  },
  "ant-man-and-the-wasp-quantumania": {
    poster: "https://image.tmdb.org/t/p/w500/qnqGbB22YJ7dSs4o6M7exTpNxPz.jpg",
    color: "#ff4757",
    fallbackText: "QUANTUMANIA",
  },
  "guardians-vol3": {
    poster: "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
    color: "#20bf6b",
    fallbackText: "GOTG VOL 3",
  },
  "guardians-of-the-galaxy-vol-3": {
    poster: "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
    color: "#20bf6b",
    fallbackText: "GOTG VOL 3",
  },
  "secret-invasion": {
    poster: "https://image.tmdb.org/t/p/w500/3rINdUPSy9AklJg74jWHOyUXuZd.jpg",
    color: "#e55039",
    fallbackText: "SECRET INVASION",
  },
  "loki-s2": {
    poster: "https://image.tmdb.org/t/p/w500/oJdVHUYrjdS2IqiNztVIP4GPB1p.jpg",
    color: "#2ed573",
    fallbackText: "LOKI S2",
  },
  "loki-season-2": {
    poster: "https://image.tmdb.org/t/p/w500/oJdVHUYrjdS2IqiNztVIP4GPB1p.jpg",
    color: "#2ed573",
    fallbackText: "LOKI S2",
  },
  "the-marvels": {
    poster: "https://image.tmdb.org/t/p/w500/9GBhzXMFjgcZ3FdR9w3bUMMTps5.jpg",
    color: "#45aaf2",
    fallbackText: "THE MARVELS",
  },
  "echo": {
    poster: "https://image.tmdb.org/t/p/w500/vFyJH630cF68LohVYjQW49074Sy.jpg",
    color: "#e55039",
    fallbackText: "ECHO",
  },
  "deadpool-and-wolverine": {
    poster: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    color: "#eb3b5a",
    fallbackText: "D&W",
  },
  "deadpool-wolverine": {
    poster: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    color: "#eb3b5a",
    fallbackText: "D&W",
  },
  "agatha-all-along": {
    poster: "https://image.tmdb.org/t/p/w500/mGsxKwXUjojitRv2E9qMTbxbBRd.jpg",
    color: "#a55eea",
    fallbackText: "AGATHA",
  },
  "captain-america-brave-new-world": {
    poster: "https://image.tmdb.org/t/p/w500/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg",
    color: "#3867d6",
    fallbackText: "BRAVE NEW WORLD",
  },
  "cap-brave-new-world": {
    poster: "https://image.tmdb.org/t/p/w500/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg",
    color: "#3867d6",
    fallbackText: "BRAVE NEW WORLD",
  },
  "daredevil-born-again": {
    poster: "https://image.tmdb.org/t/p/w500/xDUoAsU8lQHOOoRkFiBuarmACDN.jpg",
    color: "#eb3b5a",
    fallbackText: "DAREDEVIL",
  },
  "thunderbolts": {
    poster: "https://image.tmdb.org/t/p/w500/hqcexYHbiTBfDIdDWxrxPtVndBX.jpg",
    color: "#ffd32a",
    fallbackText: "THUNDERBOLTS*",
  },

  "fantastic-four": {
    poster: "https://image.tmdb.org/t/p/w500/nf5qaSEvyYSNeFH0YhSs5EsBLX9.jpg",
    color: "#4bcffa",
    fallbackText: "FANTASTIC FOUR",
  },
  "the-fantastic-four-first-steps": {
    poster: "https://image.tmdb.org/t/p/w500/nf5qaSEvyYSNeFH0YhSs5EsBLX9.jpg",
    color: "#4bcffa",
    fallbackText: "FANTASTIC FOUR",
  },
  "blade": {
    poster: "https://image.tmdb.org/t/p/w500/gKzYx79y0AQTL4UAk1cBQJ3nvrm.jpg",
    color: "#eb3b5a",
    fallbackText: "BLADE",
  },
  "spiderman-brand-new-day": {
    poster: "/images/posters/spiderman-brand-new-day.jpg",
    color: "#ff3838",
    fallbackText: "BRAND NEW DAY",
  },
  "spider-man-brand-new-day": {
    poster: "/images/posters/spiderman-brand-new-day.jpg",
    color: "#ff3838",
    fallbackText: "BRAND NEW DAY",
  },
  "spiderman-4": {
    poster: "/images/posters/spiderman-brand-new-day.jpg",
    color: "#ff3838",
    fallbackText: "SPIDER-MAN 4",
  },
  "spider-man-4": {
    poster: "https://image.tmdb.org/t/p/w500/iPOn6DinuVyLY17YM9mKuPofV08.jpg",
    color: "#ff3838",
    fallbackText: "SPIDER-MAN 4",
  },
  "avengers-doomsday": {
    poster: "https://image.tmdb.org/t/p/w500/jzPwsojjFStf5lR5Nm07w2hH56G.jpg",
    color: "#2ed573",
    fallbackText: "DOOMSDAY",
  },
  "avengers-secret-wars": {
    poster: "https://image.tmdb.org/t/p/w500/f0YBuh4hyiAheXhh4JnJWoKi9g5.jpg",
    color: "#ffd32a",
    fallbackText: "SECRET WARS",
  },
  "battleworld": {
    poster: "https://image.tmdb.org/t/p/w500/f0YBuh4hyiAheXhh4JnJWoKi9g5.jpg",
    color: "#ffd32a",
    fallbackText: "BATTLEWORLD",
  },
  "x-men": {
    poster: "/images/posters/x-men-2000.jpg",
    color: "#4bcffa",
    fallbackText: "X-MEN",
  },
  "x-men-2000": {
    poster: "/images/posters/x-men-2000.jpg",
    color: "#4bcffa",
    fallbackText: "X-MEN",
  },
  "x2": {
    poster: "/images/posters/x2-2003.jpg",
    color: "#a55eea",
    fallbackText: "X2",
  },
  "x2-2003": {
    poster: "/images/posters/x2-2003.jpg",
    color: "#a55eea",
    fallbackText: "X2",
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

  const data = MCU_POSTER_MAP[movieId] ||
    MCU_POSTER_MAP[movieId.toLowerCase()] ||
    MCU_POSTER_MAP[movieId.replace(/_/g, "-")] || {
      poster: "",
      color: "#ffffff",
      fallbackText: movieId.toUpperCase(),
    };

  return (
    <div className={`relative ${className} flex items-center justify-center bg-stone-900 overflow-hidden ${rounded} select-none`}>
      {}
      {data.poster && !imgError ? (
        <img
          key={movieId}
          src={data.poster}
          alt={data.fallbackText || movieId}
          onError={() => setImgError(true)}
          className={`w-full h-full object-cover object-center transition-all duration-500 ${
            isActive
              ? "scale-110 brightness-110 contrast-105"
              : "scale-100 brightness-100 contrast-100 group-hover:scale-105 group-hover:brightness-105"
          }`}
        />
      ) : (
        <div
          className="w-full h-full flex flex-col items-center justify-center p-2 text-center"
          style={{ backgroundColor: `${data.color}25` }}
        >
          <span className="font-mono text-[9px] font-bold tracking-wider uppercase text-white/90">
            {data.fallbackText}
          </span>
        </div>
      )}

      {}
      <div className={`absolute inset-0 ${rounded} border border-white/10 pointer-events-none`} />

      {}
      {isActive && (
        <div
          className={`absolute inset-0 ${rounded} pointer-events-none transition-opacity duration-300`}
          style={{
            boxShadow: `inset 0 0 14px ${data.color}90`,
            border: `1.5px solid ${data.color}`,
          }}
        />
      )}
    </div>
  );
}
