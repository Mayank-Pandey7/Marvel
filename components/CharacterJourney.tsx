"use client";

import Link from "next/link";
import { Check, Circle } from "lucide-react";
import type { Character } from "@/data/characters";
import { MCU } from "@/data/mcu";
import { useWatched } from "@/context/WatchedContext";
import Reveal from "./Reveal";

export default function CharacterJourney({ character }: { character: Character }) {
  const { isWatched } = useWatched();
  const journey = character.entries.map((id) => MCU.find((m) => m.id === id)).filter(Boolean) as typeof MCU;

  return (
    <Reveal className="border border-white/10 bg-white/[0.03] p-6 mt-8">
      <p className="text-[10px] tracking-[0.2em] uppercase text-blood mb-1">{character.name}&apos;s Journey</p>
      <p className="text-xs text-stone-500 mb-6">{character.role}</p>
      <div className="flex flex-col gap-1">
        {journey.map((e, i) => (
          <Link key={e.id} href={`/movie/${e.id}`} className="flex items-center gap-3 py-2 group">
            <span className="text-[10px] text-stone-600 w-5 tabular-nums">{i + 1}</span>
            {isWatched(e.id) ? <Check size={12} className="text-blood" /> : <Circle size={12} className="text-stone-700" />}
            <span className="text-xs text-stone-300 group-hover:text-white transition-colors">{e.title}</span>
            <span className="text-[10px] text-stone-600">{e.year}</span>
          </Link>
        ))}
      </div>
    </Reveal>
  );
}
