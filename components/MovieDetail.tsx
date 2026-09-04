"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Share2, Users, Gem, Film, Calendar, Play, ExternalLink } from "lucide-react";
import PosterArt from "./PosterArt";
import Reveal from "./Reveal";
import type { MCUEntry } from "@/data/mcu";
import { CHARACTERS } from "@/data/characters";
import { ARTIFACTS } from "@/data/artifacts";

export default function MovieDetail({
  entry,
  prev,
  next,
}: {
  entry: MCUEntry;
  prev: MCUEntry | null;
  next: MCUEntry | null;
}) {
  const characters = CHARACTERS.filter((c) => entry.characters.includes(c.id));
  const relevantArtifacts = ARTIFACTS.filter((a) =>
    a.history.some((h) => h.phase === entry.phase)
  ).slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10">
      <Link
        href="/timeline"
        className="inline-flex items-center gap-1 text-xs font-mono tracking-wider uppercase text-stone-400 hover:text-white mb-6 transition-colors"
      >
        <ChevronLeft size={14} /> Back to Sacred Timeline
      </Link>

      <Reveal>
        <div className="border border-stone-800 rounded-2xl overflow-hidden shadow-2xl">
          <PosterArt entry={entry} size="wide" />
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="flex items-center gap-2 mt-6 mb-2">
          <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
            Phase {entry.phase} · {entry.type.toUpperCase()} {entry.status === "upcoming" ? "· Upcoming" : ""}
          </span>
          <span className="text-xs font-mono text-stone-500 flex items-center gap-1">
            <Calendar size={12} /> {entry.year}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-black text-white mb-3">
          {entry.title}
        </h1>

        <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl mb-6">
          {entry.description}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/timeline"
            className="inline-flex items-center gap-2 px-5 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 text-xs font-mono tracking-wider uppercase rounded-xl transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)]"
          >
            <Share2 size={13} />
            <span>Explore in Timeline</span>
          </Link>
        </div>
      </Reveal>

      {characters.length > 0 && (
        <Reveal delay={140} className="mt-10">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-400 mb-3 flex items-center gap-1.5">
            <Users size={14} className="text-amber-400" />
            Key Entangled Figures ({characters.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {characters.map((c) => (
              <Link
                key={c.id}
                href={`/characters/${c.id}`}
                className="border border-stone-800/80 hover:border-amber-500/50 bg-black/50 p-4 rounded-xl transition-all group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                  <p className="text-sm text-white font-bold group-hover:text-amber-300 transition-colors">
                    {c.name}
                  </p>
                </div>
                <p className="text-[11px] text-stone-400 line-clamp-1">{c.role}</p>
              </Link>
            ))}
          </div>
        </Reveal>
      )}

      <div className="mt-14 flex items-center justify-between border-t border-stone-800 pt-6">
        {prev ? (
          <Link
            href={`/movie/${prev.id}`}
            className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-xs">
              <span className="block text-[9px] font-mono uppercase tracking-wider text-stone-500">
                Preceding Chapter
              </span>
              <span className="font-semibold text-stone-200">{prev.title}</span>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/movie/${next.id}`}
            className="flex items-center gap-2 text-right text-stone-400 hover:text-white transition-colors group"
          >
            <span className="text-xs">
              <span className="block text-[9px] font-mono uppercase tracking-wider text-stone-500">
                Succeeding Chapter
              </span>
              <span className="font-semibold text-stone-200">{next.title}</span>
            </span>
            <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
