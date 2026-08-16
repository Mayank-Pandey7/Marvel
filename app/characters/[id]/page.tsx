import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, Share2, Compass, Gem, Zap, Shield, Sparkles, ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import { CHARACTERS, getCharacter } from "@/data/characters";
import { ARTIFACTS } from "@/data/artifacts";
import { MCU } from "@/data/mcu";
import { getRelationshipsForNode } from "@/data/relationships";

export function generateStaticParams() {
  return CHARACTERS.map((c) => ({ id: c.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const c = getCharacter(params.id);
  if (!c) return { title: "Not found — MCUVERSE" };
  return {
    title: `${c.name} — Temporal Dossier | MCUVERSE`,
    description: c.overview,
  };
}

export default function CharacterDetailPage({ params }: { params: { id: string } }) {
  const character = getCharacter(params.id);
  if (!character) notFound();

  const relationships = getRelationshipsForNode(character.id, 6);
  const artifacts = ARTIFACTS.filter((a) => character.artifactsPossessed.includes(a.id));
  const projects = character.entries.map((id) => MCU.find((m) => m.id === id)).filter(Boolean) as typeof MCU;

  return (
    <PageShell>
      <section className="px-4 sm:px-8 py-12 max-w-5xl mx-auto">
        
        {/* Back navigation */}
        <Link
          href="/characters"
          className="inline-flex items-center gap-1 text-xs font-mono tracking-wider uppercase text-stone-400 hover:text-white mb-6 transition-colors"
        >
          <ChevronLeft size={14} /> Back to Character Index
        </Link>

        {/* Header Dossier Panel */}
        <div className="bg-[#08080d] border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-stone-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  CONFIDENTIAL DOSSIER
                </span>
                <span className="text-[10px] font-mono text-stone-500">
                  {character.universe}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight flex items-center gap-3">
                {character.name}
                <span
                  className="w-3.5 h-3.5 rounded-full inline-block"
                  style={{ backgroundColor: character.color }}
                />
              </h1>
              <p className="text-sm text-stone-400 mt-1">{character.role}</p>

              {character.aliases.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {character.aliases.map((alias) => (
                    <span
                      key={alias}
                      className="text-[10px] font-mono bg-stone-900 border border-stone-800 text-stone-300 px-2 py-0.5 rounded"
                    >
                      &ldquo;{alias}&rdquo;
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:items-end gap-2">
              <span className="text-xs font-mono text-stone-400">
                Primary Faction: <span className="text-stone-200 font-bold">{character.faction}</span>
              </span>
              <span className="text-xs font-mono text-stone-400">
                First Recorded Debut: <span className="text-amber-400 font-semibold">{character.firstAppearance}</span>
              </span>
            </div>
          </div>

          {/* Overview */}
          <div className="my-6">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-400 mb-2">
              Narrative Overview:
            </h3>
            <p className="text-sm text-stone-300 leading-relaxed max-w-3xl">
              {character.overview}
            </p>
          </div>

          {/* Timeline Eras & Incarnations */}
          <div className="my-8 pt-6 border-t border-stone-800">
            <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-amber-300 flex items-center gap-2 mb-4">
              <Compass size={16} />
              Timeline Incarnations & Chronological Eras ({character.eras.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {character.eras.map((era) => (
                <div
                  key={era.eraId}
                  className="bg-black/60 border border-stone-800/80 rounded-xl p-4.5 flex flex-col justify-between hover:border-stone-700 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        Phase {era.phase} · {era.year}
                      </span>
                      <span className="text-[9px] font-mono text-stone-500">{era.universe}</span>
                    </div>

                    <h4 className="text-sm font-bold text-white mb-1.5">{era.title}</h4>
                    <p className="text-xs text-stone-400 leading-relaxed">{era.description}</p>
                  </div>

                  {era.keyMoments.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-stone-800/60">
                      <div className="text-[9px] font-mono uppercase text-stone-500 mb-1.5">Key Nexus Moments:</div>
                      <ul className="space-y-1">
                        {era.keyMoments.map((km, i) => (
                          <li key={i} className="text-[11px] text-stone-300 flex items-start gap-2">
                            <span className="text-amber-400 text-xs">▪</span>
                            <span>{km}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Relics & Entanglements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-stone-800">
            
            {/* Relics */}
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-400 flex items-center gap-1.5 mb-3">
                <Gem size={14} className="text-cyan-400" />
                Wielded Cosmic Relics
              </h3>
              {artifacts.length === 0 ? (
                <p className="text-xs text-stone-500 italic">No cosmic relics registered to this entity.</p>
              ) : (
                <div className="space-y-2">
                  {artifacts.map((art) => (
                    <div
                      key={art.id}
                      className="p-3 rounded-lg bg-black/60 border border-stone-800 text-xs text-stone-300 flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2 font-semibold text-stone-200">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: art.iconColor }} />
                        {art.name}
                      </span>
                      <span className="text-[10px] font-mono text-stone-500">Ph {art.phaseIntroduced}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Relational Web */}
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-400 flex items-center gap-1.5 mb-3">
                <Zap size={14} className="text-amber-400" />
                Cosmic Entanglements ({relationships.length})
              </h3>
              {relationships.length === 0 ? (
                <p className="text-xs text-stone-500 italic">No direct entanglements recorded.</p>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                  {relationships.map((rel) => (
                    <div
                      key={rel.id}
                      className="p-2.5 rounded-lg bg-black/60 border border-stone-800 text-xs"
                    >
                      <div className="flex items-center justify-between font-semibold text-stone-200">
                        <span className="flex items-center gap-1.5">
                          <span className="text-[9px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                            {rel.type.toUpperCase()}
                          </span>
                          <span>{rel.label}</span>
                        </span>
                        <span className="text-[9px] font-mono text-stone-500">Phase {rel.phaseRevealed}</span>
                      </div>
                      <p className="text-[11px] text-stone-400 mt-1">{rel.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Chronological MCU Projects Journey */}
          <div className="mt-8 pt-6 border-t border-stone-800">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-400 mb-3">
              Chronological Project Path ({projects.length} Titles)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {projects.map((p, idx) => (
                <Link
                  key={p.id}
                  href={`/movie/${p.id}`}
                  className="p-3 rounded-lg bg-black/40 border border-stone-800/80 hover:border-amber-500/40 transition-colors flex items-center justify-between group"
                >
                  <div>
                    <span className="text-[10px] font-mono text-stone-500">
                      #{idx + 1} · Phase {p.phase} ({p.year})
                    </span>
                    <div className="text-xs font-semibold text-stone-200 group-hover:text-amber-300 transition-colors">
                      {p.title}
                    </div>
                  </div>
                  <ArrowRight size={12} className="text-stone-600 group-hover:text-amber-400 transition-colors" />
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>
    </PageShell>
  );
}
