import { MCU, PHASES, type MCUEntry } from "@/data/mcu";
import { CHARACTERS, type Character } from "@/data/characters";

export type NodeType = "phase" | "movie" | "character";

export type WebNode = {
  id: string;
  type: NodeType;
  label: string;
  sublabel: string;
  href: string;
};

function phaseNode(phaseId: number): WebNode {
  const p = PHASES.find((x) => x.id === phaseId)!;
  return {
    id: `phase:${p.id}`,
    type: "phase",
    label: `Phase ${p.roman}`,
    sublabel: p.years,
    href: "/#timeline",
  };
}

function movieNode(m: MCUEntry): WebNode {
  return {
    id: `movie:${m.id}`,
    type: "movie",
    label: m.title,
    sublabel: `${m.year} · ${m.type}`,
    href: `/movie/${m.id}`,
  };
}

function characterNode(c: Character): WebNode {
  return {
    id: `character:${c.id}`,
    type: "character",
    label: c.name,
    sublabel: c.role,
    href: `/characters/${c.id}`,
  };
}

/** Resolve any raw id ("phase:1", "movie:iron-man", "character:thor") into a WebNode. */
export function resolveNode(id: string): WebNode | null {
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
 * Direct neighbors of a node, one hop away, spanning across node types —
 * a phase connects to its movies, a movie connects to its phase and its
 * characters, a character connects to every movie they appear in.
 */
export function getNeighbors(id: string): WebNode[] {
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

export function defaultFocusId(): string {
  return `phase:1`;
}
