"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { EyebrowBadge } from "@/components/ironman/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ironman/AnimatedSection";

const telemetry = [
  { label: "Suit Integrity", value: "99.2%", note: "Nanoparticle lattice" },
  { label: "Arc Output", value: "3.4 GJ/s", note: "Cold-fused, Vibranium core" },
  { label: "Flight Ceiling", value: "72.8 km", note: "Stratospheric assist" },
  { label: "Response Time", value: "0.018 s", note: "Neural link, J.A.R.V.I.S." },
];

export function IronManSystemsNominal() {
  return (
    <section
      id="systems"
      className="relative border-t border-white/5 bg-[#0a0a0b] px-6 pb-20 pt-20 md:px-12 md:pb-32 md:pt-28"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-14 md:grid md:grid-cols-[5fr_4fr] md:gap-16">
        <AnimatedSection className="flex flex-col gap-6">
          <AnimatedItem>
            <EyebrowBadge>J.A.R.V.I.S. // SYSTEMS NOMINAL</EyebrowBadge>
          </AnimatedItem>
          <AnimatedItem>
            <h2 className="max-w-[16ch] font-sans text-4xl font-bold leading-[0.98] tracking-tighter text-white md:text-6xl">
              &ldquo;And I&hellip; am&hellip;{" "}
              <span className="text-accent">Iron Man.</span>&rdquo;
            </h2>
          </AnimatedItem>
          <AnimatedItem>
            <p className="max-w-[48ch] font-sans text-base leading-relaxed text-zinc-400 md:text-lg">
              A snap heard around the universe. The Mark LXXXV was engineered in
              six hours and retired in seconds &mdash; its final moment, the
              reason any of us are still here. Every readout below is what
              J.A.R.V.I.S. logged in the last frame before the blast.
            </p>
          </AnimatedItem>
        </AnimatedSection>

        <AnimatedSection className="flex flex-col divide-y divide-white/10 border-t border-white/10 font-mono md:mt-3">
          {telemetry.map((row) => (
            <AnimatedItem key={row.label}>
              <div className="flex items-baseline justify-between gap-6 py-5">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                    {row.label}
                  </span>
                  <span className="font-sans text-[13px] text-zinc-400">
                    {row.note}
                  </span>
                </div>
                <span className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                  {row.value}
                </span>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
