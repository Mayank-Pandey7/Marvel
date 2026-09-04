import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { UNIFIED_MCU_TREE, type MovieNode } from "@/data/movies";
import { MCU } from "@/data/mcu";
import { DOOMSDAY_WATCHLIST } from "@/data/doomsdayWatchlist";
import TimelineMovieDetail from "@/components/timeline/TimelineMovieDetail";

const DOOMSDAY_SLUG_ALIASES: Record<string, string> = {
  "x-men": "x-men-2000",
  "x-men-2000": "x-men-2000",
  "x2": "x2-2003",
  "x2-2003": "x2-2003",
  "x-men-united": "x2-2003",
  "x-men-the-last-stand": "x-men-the-last-stand",
  "x-men-first-class": "x-men-first-class",
  "x-men-days-of-future-past": "x-men-days-of-future-past",
  "days-of-future-past": "x-men-days-of-future-past",
  "x-men-apocalypse": "x-men-apocalypse",
  "x-men-dark-phoenix": "x-men-dark-phoenix",
  "logan": "logan",
  "spider-man-2002": "spider-man-2002",
  "the-amazing-spider-man": "the-amazing-spider-man",
  "the-amazing-spider-man-2": "the-amazing-spider-man-2",
  "fantastic-four-2005": "fantastic-four-2005",
  "blade-1998": "blade-1998",
  "captain-america": "captain-america-the-first-avenger",
  "cap-first-avenger": "captain-america-the-first-avenger",
  "avengers": "the-avengers",
  "civil-war": "captain-america-civil-war",
  "infinity-war": "avengers-infinity-war",
  "endgame": "avengers-endgame",
  "loki-s1": "loki-season-1",
  "loki-s2": "loki-season-2",
  "multiverse-of-madness": "doctor-strange-in-the-multiverse-of-madness",
  "deadpool-and-wolverine": "deadpool-and-wolverine",
  "deadpool-3": "deadpool-and-wolverine",
  "fantastic-four": "the-fantastic-four-first-steps",
  "the-fantastic-four-first-steps": "the-fantastic-four-first-steps",
  "doomsday": "avengers-doomsday",
  "avengers-doomsday": "avengers-doomsday",
  "secret-wars": "avengers-secret-wars",
};

function parseRuntime(runtimeStr?: string): number {
  if (!runtimeStr) return 125;
  if (runtimeStr.includes("h")) {
    const hours = parseInt(runtimeStr.match(/(\d+)h/)?.[1] || "0");
    const mins = parseInt(runtimeStr.match(/(\d+)m/)?.[1] || "0");
    const total = hours * 60 + mins;
    if (total > 0 && total <= 300) return total;
  }
  const digits = parseInt(runtimeStr.replace(/[^0-9]/g, "") || "125");
  if (digits > 0 && digits <= 300) return digits;
  return 125;
}

function resolveDoomsdayMovie(rawSlug: string): MovieNode | null {
  const norm = rawSlug.toLowerCase().trim();
  const canonicalId = DOOMSDAY_SLUG_ALIASES[norm] || norm;

  
  const doomsdayMatch = DOOMSDAY_WATCHLIST.find(
    (d) =>
      d.id.toLowerCase() === canonicalId ||
      d.id.toLowerCase() === norm ||
      d.slug.toLowerCase() === canonicalId ||
      d.slug.toLowerCase() === norm
  );
  if (doomsdayMatch) {
    return {
      id: doomsdayMatch.id,
      title: doomsdayMatch.title,
      shortTitle: doomsdayMatch.title,
      year: doomsdayMatch.year,
      releaseDate: `${doomsdayMatch.year}-05-01`,
      phase: doomsdayMatch.phase || 0,
      order: doomsdayMatch.order,
      quote: doomsdayMatch.tagline,
      speaker: doomsdayMatch.keyCharacters[0] || "Marvel",
      tagline: doomsdayMatch.tagline,
      director: "Marvel Studios / 20th Century Fox",
      runtime: parseRuntime(doomsdayMatch.runtime),
      leadCharacter: doomsdayMatch.keyCharacters[0] || "Hero",
      heroAlias: doomsdayMatch.keyCharacters.length > 1 ? doomsdayMatch.keyCharacters[1] : "",
      keyRelics: [],
      description: `${doomsdayMatch.whyItMatters} ${doomsdayMatch.doomConnection}`,
      color: "#f59e0b",
      posterUrl: doomsdayMatch.posterUrl,
      backdropUrl: doomsdayMatch.backdropUrl,
      x: 0,
      y: 0,
      offsetY: 0,
      connections: [],
    } as MovieNode;
  }

  // 2. Check UNIFIED_MCU_TREE
  const directTreeMatch = UNIFIED_MCU_TREE.find(
    (m) =>
      m.id.toLowerCase() === canonicalId ||
      m.id.toLowerCase() === norm ||
      m.shortTitle.toLowerCase() === norm
  );
  if (directTreeMatch) return directTreeMatch;

  // 3. Check MCU archive entries
  const mcuMatch = MCU.find(
    (m) =>
      m.id.toLowerCase() === canonicalId ||
      m.id.toLowerCase() === norm
  );
  if (mcuMatch) {
    return {
      id: mcuMatch.id,
      title: mcuMatch.title,
      shortTitle: mcuMatch.title,
      year: mcuMatch.year,
      releaseDate: `${mcuMatch.year}-05-01`,
      phase: mcuMatch.phase,
      order: 0,
      quote: mcuMatch.description,
      speaker: mcuMatch.characters[0] || "Marvel",
      tagline: mcuMatch.description,
      director: "Marvel Studios",
      runtime: parseInt(mcuMatch.runtime?.replace(/[^0-9]/g, "") || "120") || 120,
      leadCharacter: mcuMatch.characters[0] || "Hero",
      heroAlias: mcuMatch.characters[0] || "Hero",
      keyRelics: [],
      description: mcuMatch.description,
      color: "#eab308",
      posterUrl: mcuMatch.poster,
      x: 0,
      y: 0,
      offsetY: 0,
      connections: [],
    };
  }

  return null;
}

export function generateStaticParams() {
  const watchlistSlugs = DOOMSDAY_WATCHLIST.map((m) => ({ slug: m.id }));
  const primarySlugs = UNIFIED_MCU_TREE.map((m) => ({ slug: m.id }));
  const aliasSlugs = Object.keys(DOOMSDAY_SLUG_ALIASES).map((slug) => ({ slug }));
  return [...watchlistSlugs, ...primarySlugs, ...aliasSlugs];
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const movie = resolveDoomsdayMovie(params.slug);

  if (!movie) {
    return {
      title: "Road to Doomsday — Marvel Watchlist",
      description: "Essential canonical movies leading into Avengers: Doomsday and Secret Wars.",
    };
  }

  return {
    title: `${movie.title} (${movie.year}) — Road to Doomsday`,
    description: movie.description || `Explore ${movie.title} in the Road to Avengers: Doomsday.`,
  };
}

export default function DoomsdayMoviePage({ params }: { params: { slug: string } }) {
  const movie = resolveDoomsdayMovie(params.slug);

  if (!movie) {
    notFound();
  }

  return <TimelineMovieDetail movie={movie} backHref="/doomsday" connectedBasePath="/doomsday" />;
}
