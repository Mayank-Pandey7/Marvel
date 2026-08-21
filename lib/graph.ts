import { MCU, PHASES, type MCUEntry } from "@/data/mcu";
import { CHARACTERS, type Character } from "@/data/characters";

export type NodeType = "phase" | "movie" | "character";

export type WebNode = {
  id: string;
  type: NodeType;
  label: string;
  sublabel: string;
  description?: string;
  image?: string;
  backdrop?: string;
  meta?: {
    year?: number | string;
    phase?: number;
    role?: string;
    universe?: string;
    runtime?: string;
    importance?: string;
    status?: string;
    totalConnections?: number;
  };
  href: string;
};

const PHASE_BACKDROPS: Record<number, string> = {
  1: "/images/backdrops/avengers.jpg",
  2: "/images/backdrops/avengers-aou.jpg",
  3: "/images/backdrops/avengers-endgame.jpg",
  4: "/images/backdrops/spider-man-no-way-home.jpg",
  5: "/images/backdrops/deadpool-and-wolverine.jpg",
  6: "/images/backdrops/avengers-secret-wars.jpg",
};

function phaseNode(phaseId: number): WebNode {
  const p = PHASES.find((x) => x.id === phaseId) || PHASES[0];
  const movieCount = MCU.filter((m) => m.phase === p.id).length;
  
  return {
    id: `phase:${p.id}`,
    type: "phase",
    label: `Phase ${p.roman}`,
    sublabel: `${p.years} · ${movieCount} Titles`,
    description: `${p.title} (${p.years}) — Encompassing ${movieCount} major cinematic milestones.`,
    image: `/images/posters/phase-${p.id}.jpg`,
    backdrop: PHASE_BACKDROPS[p.id] || "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=2560&auto=format&fit=crop",
    meta: {
      phase: p.id,
      year: p.years,
      totalConnections: movieCount,
    },
    href: "/#timeline",
  };
}

function movieNode(m: MCUEntry): WebNode {
  return {
    id: `movie:${m.id}`,
    type: "movie",
    label: m.title,
    sublabel: `${m.year} · Phase ${m.phase} ${m.type.toUpperCase()}`,
    description: m.description,
    image: m.poster || `/images/posters/${m.id}.jpg`,
    backdrop: m.backdrop || `/images/backdrops/${m.id}.jpg`,
    meta: {
      year: m.year,
      phase: m.phase,
      runtime: m.runtime,
      importance: m.importance,
      status: m.status,
      totalConnections: m.characters.length + 1,
    },
    href: `/movie/${m.id}`,
  };
}

function characterNode(c: Character): WebNode {
  return {
    id: `character:${c.id}`,
    type: "character",
    label: c.name,
    sublabel: c.role || "Multiverse Champion",
    description: c.overview || `${c.name} — ${c.role}`,
    image: c.avatar || `/images/characters/${c.id}.jpg`,
    backdrop: c.avatar || `/images/characters/${c.id}.jpg`,
    meta: {
      role: c.role,
      universe: c.universe,
      totalConnections: c.entries.length,
    },
    href: `/characters/${c.id}`,
  };
}

/** Resolve any raw id ("phase:1", "movie:iron-man", "character:thor") into a WebNode. */
export function resolveNode(id: string): WebNode | null {
  if (!id) return null;
  const [kind, rest] = id.split(":");
  if (kind === "phase") {
    const p = PHASES.find((x) => String(x.id) === rest);
    return p ? phaseNode(p.id) : null;
  }
  if (kind === "movie") {
    const m = MCU.find((x) => x.id === rest);
    return m ? movieNode(m) : null;
  }
  if (kind === "character") {
    const c = CHARACTERS.find((x) => x.id === rest);
    return c ? characterNode(c) : null;
  }
  return null;
}

/**
 * Direct neighbors of a node, one hop away, spanning across node types.
 */
export function getNeighbors(id: string): WebNode[] {
  if (!id) return [];
  const [kind, rest] = id.split(":");

  if (kind === "phase") {
    const phaseId = Number(rest);
    return MCU.filter((m) => m.phase === phaseId).map(movieNode);
  }

  if (kind === "movie") {
    const m = MCU.find((x) => x.id === rest);
    if (!m) return [];
    const chars = CHARACTERS.filter((c) => m.characters.includes(c.id)).map(characterNode);
    return [phaseNode(m.phase), ...chars];
  }

  if (kind === "character") {
    const c = CHARACTERS.find((x) => x.id === rest);
    if (!c) return [];
    return MCU.filter((m) => c.entries.includes(m.id)).map(movieNode);
  }

  return [];
}

/**
 * Returns all searchable nodes across all Phases, Movies, and Characters.
 */
export function getAllSearchableNodes(): WebNode[] {
  const phaseNodes = PHASES.map((p) => phaseNode(p.id));
  const movieNodes = MCU.map(movieNode);
  const charNodes = CHARACTERS.map(characterNode);

  return [...phaseNodes, ...movieNodes, ...charNodes];
}

export function defaultFocusId(): string {
  return `character:iron-man`;
}
