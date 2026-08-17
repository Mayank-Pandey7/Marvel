import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, Compass, Gem, Zap, ArrowRight, Shield } from "lucide-react";
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
      <section className="px-4 sm:px-8 py-10 max-w-6xl mx-auto font-sans">
        
        {/* Back navigation */}
        <Link
          href="/characters"
          className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-widest uppercase text-stone-400 hover:text-white mb-6 transition-colors group cursor-pointer"
        >
          <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>BACK TO ALL CHARACTERS</span>
        </Link>

        {/* Header Dossier Panel */}
        <div className="bg-[#050508] border border-stone-900 rounded-2xl p-6 sm:p-8 shadow-2xl">
          
          <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-stone-900">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded bg-white/5 text-stone-300 border border-white/10">
                  CONFIDENTIAL DOSSIER
                </span>
                <span className="text-[10px] font-mono tracking-wider text-stone-500 uppercase">
                  {character.universe}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-mono font-bold text-white tracking-wider flex items-center gap-3">
                {character.name}
                <span
                  className="w-3.5 h-3.5 rounded-full inline-block shadow-[0_0_10px_currentColor]"
                  style={{ backgroundColor: character.color, color: character.color }}
                />
              </h1>
              <p className="text-xs sm:text-sm font-mono text-stone-400 mt-1">{character.role}</p>

              {character.aliases.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {character.aliases.map((alias) => (
                    <span
                      key={alias}
                      className="text-[10px] font-mono tracking-wider uppercase bg-stone-950 border border-stone-900 text-stone-400 px-2 py-0.5 rounded"
                    >
                      &ldquo;{alias}&rdquo;
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:items-end gap-1.5 text-xs font-mono">
              <span className="text-stone-500">
                FACTION: <span className="text-stone-200 font-bold">{character.faction}</span>
              </span>
              <span className="text-stone-500">
                FIRST DEBUT: <span className="text-stone-300 font-semibold">{character.firstAppearance}</span>
              </span>
            </div>
          </div>

          {/* Overview */}
          <div className="my-6">
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-500 mb-2">
              NARRATIVE OVERVIEW
            </h3>
            <p className="text-xs sm:text-sm font-mono text-stone-300 leading-relaxed max-w-4xl">
              {character.overview}
            </p>
          </div>

          {/* Timeline Eras & Incarnations */}
          <div className="my-8 pt-6 border-t border-stone-900">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-300 flex items-center gap-2 mb-4">
              <Compass size={14} className="text-stone-400" />
              <span>TIMELINE INCARNATIONS & ERAS ({character.eras.length})</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {character.eras.map((era) => (
                <div
                  key={era.eraId}
                  className="bg-[#000000] border border-stone-900 rounded-xl p-4.5 flex flex-col justify-between hover:border-stone-800 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded bg-white/5 text-stone-300 border border-white/10">
                        Phase {era.phase} · {era.year}
                      </span>
                      <span className="text-[9px] font-mono text-stone-500">{era.universe}</span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-mono font-bold text-white mb-1.5">{era.title}</h4>
                    <p className="text-xs font-mono text-stone-400 leading-relaxed">{era.description}</p>
                  </div>

                  {era.keyMoments.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-stone-900">
                      <div className="text-[9px] font-mono uppercase tracking-widest text-stone-500 mb-1.5">
                        KEY NEXUS MOMENTS:
                      </div>
                      <ul className="space-y-1">
                        {era.keyMoments.map((km, i) => (
                          <li key={i} className="text-[11px] font-mono text-stone-300 flex items-start gap-2">
                            <span className="text-stone-500 text-xs">▪</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-stone-900">
            
            {/* Relics */}
            <div>
              <h3 className="text-[11px] font-mono font-bold uppercase tracking-widest text-stone-400 flex items-center gap-1.5 mb-3">
                <Gem size={13} className="text-cyan-400" />
                <span>WIELDED COSMIC RELICS</span>
              </h3>
              {artifacts.length === 0 ? (
                <p className="text-xs font-mono text-stone-600 italic">No registered cosmic relics wielded.</p>
              ) : (
                <div className="space-y-2">
                  {artifacts.map((art) => (
                    <div
                      key={art.id}
                      className="p-3 rounded-lg bg-[#000000] border border-stone-900 text-xs font-mono text-stone-300 flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2 font-semibold text-stone-200">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: art.iconColor }} />
                        {art.name}
                      </span>
                      <span className="text-[9px] text-stone-500">PHASE {art.phaseIntroduced}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Relational Web */}
            <div>
              <h3 className="text-[11px] font-mono font-bold uppercase tracking-widest text-stone-400 flex items-center gap-1.5 mb-3">
                <Zap size={13} className="text-stone-300" />
                <span>COSMIC ENTANGLEMENTS ({relationships.length})</span>
              </h3>
              {relationships.length === 0 ? (
                <p className="text-xs font-mono text-stone-600 italic">No direct entanglements recorded.</p>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {relationships.map((rel) => (
                    <div
                      key={rel.id}
                      className="p-2.5 rounded-lg bg-[#000000] border border-stone-900 text-xs font-mono"
                    >
                      <div className="flex items-center justify-between font-semibold text-stone-200">
                        <span className="flex items-center gap-1.5">
                          <span className="text-[9px] bg-white/5 border border-white/10 text-stone-300 px-1.5 py-0.5 rounded uppercase">
                            {rel.type}
                          </span>
                          <span>{rel.label}</span>
                        </span>
                        <span className="text-[9px] text-stone-500">Phase {rel.phaseRevealed}</span>
                      </div>
                      <p className="text-[10px] text-stone-400 mt-1">{rel.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Chronological MCU Projects Journey */}
          <div className="mt-8 pt-6 border-t border-stone-900">
            <h3 className="text-[11px] font-mono font-bold uppercase tracking-widest text-stone-400 mb-3">
              CHRONOLOGICAL PROJECT PATH ({projects.length} TITLES)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {projects.map((p, idx) => (
                <Link
                  key={p.id}
                  href={`/movie/${p.id}`}
                  className="p-3 rounded-lg bg-[#000000] border border-stone-900 hover:border-stone-700 transition-colors flex items-center justify-between group"
                >
                  <div>
                    <span className="text-[9px] font-mono text-stone-500 uppercase">
                      #{idx + 1} · Phase {p.phase} ({p.year})
                    </span>
                    <div className="text-xs font-mono font-semibold text-stone-200 group-hover:text-white transition-colors">
                      {p.title}
                    </div>
                  </div>
                  <ArrowRight size={12} className="text-stone-600 group-hover:text-white transition-colors" />
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>
    </PageShell>
  );
}
