"use client";

import React, { useEffect, useState } from "react";
import { MCU } from "@/data/mcu";

export default function CinematicIntro({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1500),
      setTimeout(() => setStep(3), 2700),
      setTimeout(() => setStep(4), 4000),
      setTimeout(() => setStep(5), 5200),
      setTimeout(() => onDone(), 6600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [reduced, onDone]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-blood/40"
            style={{
              width: 2,
              height: 2,
              top: `${(i * 37) % 100}%`,
              left: `${(i * 53) % 100}%`,
              opacity: step >= 1 ? 0.6 : 0,
              transition: `opacity 1.2s ease ${i * 20}ms`,
            }}
          />
        ))}
      </div>

      <svg width="220" height="220" viewBox="0 0 220 220" className="absolute" style={{ opacity: step >= 1 ? 1 : 0, transition: "opacity 0.8s ease" }}>
        <circle
          cx="110" cy="110" r="95" fill="none" stroke="#7f1d1d" strokeWidth="1"
          strokeDasharray="596" strokeDashoffset={step >= 1 ? 0 : 596}
          style={{ transition: "stroke-dashoffset 2s ease-out" }}
        />
      </svg>

      <h1
        className="relative font-display font-black tracking-[0.15em] text-5xl sm:text-7xl text-white"
        style={{ opacity: step >= 2 ? 1 : 0, transform: step >= 2 ? "translateY(0)" : "translateY(16px)", transition: "opacity 1.1s ease, transform 1.1s ease" }}
      >
        MCU<span className="text-blood">VERSE</span>
      </h1>

      <p
        className="relative mt-5 text-xs sm:text-sm tracking-[0.35em] text-stone-300 uppercase"
        style={{ opacity: step >= 3 ? 1 : 0, transform: step >= 3 ? "translateY(0)" : "translateY(10px)", transition: "opacity 0.9s ease, transform 0.9s ease" }}
      >
        Every Story. Every Hero. Every Universe.
      </p>

      <p
        className="relative mt-3 text-[11px] sm:text-xs tracking-[0.25em] text-blood/80 uppercase"
        style={{ opacity: step >= 4 ? 1 : 0, transition: "opacity 0.9s ease" }}
      >
        {MCU.length}+ Stories · 6 Phases · 1 Multiverse
      </p>

      <button
        onClick={onDone}
        className="absolute bottom-10 text-[11px] tracking-[0.2em] uppercase text-stone-500 hover:text-white transition-colors"
        style={{ opacity: step >= 1 ? 1 : 0, transition: "opacity 0.8s ease" }}
      >
        Skip Intro →
      </button>
    </div>
  );
}
