import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { UNIFIED_MCU_TREE, type MovieNode } from "@/data/movies";
import { MCU } from "@/data/mcu";
import { DOOMSDAY_WATCHLIST } from "@/data/doomsdayWatchlist";
import MovieSlugDetail from "@/components/map/MovieSlugDetail";

// Comprehensive alias dictionary to support short and alternate movie slugs
const MOVIE_SLUG_ALIASES: Record<string, string> = {
  // Phase 1
  "hulk": "the-incredible-hulk",
  "the-hulk": "the-incredible-hulk",
  "ironman": "iron-man",
  "ironman-1": "iron-man",
  "ironman-2": "iron-man-2",
  "ironman-3": "iron-man-3",
  "thor-1": "thor",
  "captain-america": "captain-america-the-first-avenger",
  "cap-first-avenger": "captain-america-the-first-avenger",
  "captain-america-1": "captain-america-the-first-avenger",
  "captain-america-first-avenger": "captain-america-the-first-avenger",
  "the-first-avenger": "captain-america-the-first-avenger",
  "avengers": "the-avengers",
  "the-avengers-1": "the-avengers",
  "avengers-1": "the-avengers",

  // Phase 2
  "thor-2": "thor-the-dark-world",
  "dark-world": "thor-the-dark-world",
  "thor-dark-world": "thor-the-dark-world",
  "captain-america-2": "captain-america-the-winter-soldier",
  "winter-soldier": "captain-america-the-winter-soldier",
  "cap-winter-soldier": "captain-america-the-winter-soldier",
  "captain-america-winter-soldier": "captain-america-the-winter-soldier",
  "gotg": "guardians-of-the-galaxy",
  "gotg-1": "guardians-of-the-galaxy",
  "guardians": "guardians-of-the-galaxy",
  "guardians-1": "guardians-of-the-galaxy",
  "age-of-ultron": "avengers-age-of-ultron",
  "avengers-2": "avengers-age-of-ultron",
  "avengers-aou": "avengers-age-of-ultron",
  "antman": "ant-man",
  "antman-1": "ant-man",

  // Phase 3
  "civil-war": "captain-america-civil-war",
  "cap-civil-war": "captain-america-civil-war",
  "captain-america-3": "captain-america-civil-war",
  "doctor-strange-1": "doctor-strange",
  "dr-strange": "doctor-strange",
  "gotg-2": "guardians-of-the-galaxy-vol-2",
  "gotg2": "guardians-of-the-galaxy-vol-2",
  "guardians-2": "guardians-of-the-galaxy-vol-2",
  "spiderman-homecoming": "spider-man-homecoming",
  "homecoming": "spider-man-homecoming",
  "spider-man-1": "spider-man-homecoming",
  "spiderman-1": "spider-man-homecoming",
  "ragnarok": "thor-ragnarok",
  "thor-3": "thor-ragnarok",
  "black-panther-1": "black-panther",
  "infinity-war": "avengers-infinity-war",
  "avengers-3": "avengers-infinity-war",
  "antman-and-the-wasp": "ant-man-and-the-wasp",
  "antman-wasp": "ant-man-and-the-wasp",
  "ant-man-wasp": "ant-man-and-the-wasp",
  "captain-marvel-1": "captain-marvel",
  "endgame": "avengers-endgame",
  "avengers-4": "avengers-endgame",
  "far-from-home": "spider-man-far-from-home",
  "spiderman-far-from-home": "spider-man-far-from-home",
  "spider-man-2": "spider-man-far-from-home",
  "spiderman-2": "spider-man-far-from-home",

  // Phase 4
  "wandavision": "wandavision",
  "falcon-and-winter-soldier": "the-falcon-and-the-winter-soldier",
  "falcon-winter-soldier": "the-falcon-and-the-winter-soldier",
  "loki": "loki-season-1",
  "loki-s1": "loki-season-1",
  "loki-1": "loki-season-1",
  "black-widow": "black-widow",
  "shang-chi": "shang-chi-and-the-legend-of-the-ten-rings",
  "shangchi": "shang-chi-and-the-legend-of-the-ten-rings",
  "eternals": "eternals",
  "hawkeye": "hawkeye",
  "no-way-home": "spider-man-no-way-home",
  "spiderman-no-way-home": "spider-man-no-way-home",
  "spider-man-3": "spider-man-no-way-home",
  "spiderman-3": "spider-man-no-way-home",
  "moon-knight": "moon-knight",
  "multiverse-of-madness": "doctor-strange-in-the-multiverse-of-madness",
  "doctor-strange-2": "doctor-strange-in-the-multiverse-of-madness",
  "doctor-strange-multiverse": "doctor-strange-in-the-multiverse-of-madness",
  "ms-marvel": "ms-marvel",
  "love-and-thunder": "thor-love-and-thunder",
  "thor-4": "thor-love-and-thunder",
  "she-hulk": "she-hulk-attorney-at-law",
  "werewolf-by-night": "werewolf-by-night",
  "wakanda-forever": "black-panther-wakanda-forever",
  "black-panther-2": "black-panther-wakanda-forever",
  "guardians-holiday-special": "the-guardians-of-the-galaxy-holiday-special",

  // Phase 5 & 6
  "quantumania": "ant-man-and-the-wasp-quantumania",
  "ant-man-3": "ant-man-and-the-wasp-quantumania",
  "antman-3": "ant-man-and-the-wasp-quantumania",
  "secret-invasion": "secret-invasion",
  "gotg-3": "guardians-of-the-galaxy-vol-3",
  "gotg3": "guardians-of-the-galaxy-vol-3",
  "guardians-3": "guardians-of-the-galaxy-vol-3",
  "loki-2": "loki-season-2",
  "loki-s2": "loki-season-2",
  "the-marvels": "the-marvels",
  "echo": "echo",
  "deadpool-3": "deadpool-and-wolverine",
  "deadpool-wolverine": "deadpool-and-wolverine",
  "deadpool": "deadpool-and-wolverine",
  "agatha": "agatha-all-along",
  "agatha-all-along": "agatha-all-along",
  "brave-new-world": "captain-america-brave-new-world",
  "captain-america-4": "captain-america-brave-new-world",
  "daredevil-born-again": "daredevil-born-again",
  "thunderbolts": "thunderbolts",
  "fantastic-four": "the-fantastic-four-first-steps",
  "first-steps": "the-fantastic-four-first-steps",
  "the-fantastic-four": "the-fantastic-four-first-steps",
  "spider-man-4": "spider-man-4",
  "avengers-doomsday": "avengers-doomsday",
  "avengers-secret-wars": "avengers-secret-wars",
  "x-men": "x-men-2000",
  "xmen": "x-men-2000",
  "x-men-1": "x-men-2000",
  "xmen-1": "x-men-2000",
  "x-men-2000": "x-men-2000",
  "x2": "x2-2003",
  "x-men-2": "x2-2003",
  "xmen-2": "x2-2003",
  "x2-2003": "x2-2003",
  "x2-x-men-united": "x2-2003",
};

// Helper function to resolve any slug or alias to a canonical MovieNode
function resolveMovieNode(slug: string): MovieNode | null {
  const normalizedSlug = slug.toLowerCase().trim();

  // 1. Check exact match in UNIFIED_MCU_TREE
  const directMatch = UNIFIED_MCU_TREE.find(
    (m) => m.id.toLowerCase() === normalizedSlug
  );
  if (directMatch) return directMatch;

  // 2. Check alias dictionary
  const aliasedId = MOVIE_SLUG_ALIASES[normalizedSlug];
  if (aliasedId) {
    const aliasMatch = UNIFIED_MCU_TREE.find(
      (m) => m.id.toLowerCase() === aliasedId.toLowerCase()
    );
    if (aliasMatch) return aliasMatch;
  }

  // 3. Check data/mcu.ts entry mapping to UNIFIED_MCU_TREE
  const mcuEntry = MCU.find((m) => m.id.toLowerCase() === normalizedSlug);
  if (mcuEntry) {
    const treeMatch = UNIFIED_MCU_TREE.find(
      (m) =>
        m.id.toLowerCase() === mcuEntry.id.toLowerCase() ||
        m.title.toLowerCase() === mcuEntry.title.toLowerCase()
    );
    if (treeMatch) return treeMatch;
  }

  // 4. Check DOOMSDAY_WATCHLIST (X-Men 2000, X2, Doomsday milestones)
  const doomsdayItem = DOOMSDAY_WATCHLIST.find(
    (d) =>
      d.id.toLowerCase() === normalizedSlug ||
      d.slug.toLowerCase() === normalizedSlug ||
      (aliasedId && (d.id.toLowerCase() === aliasedId.toLowerCase() || d.slug.toLowerCase() === aliasedId.toLowerCase())) ||
      d.title.toLowerCase().replace(/[^a-z0-9]/g, "") ===
        normalizedSlug.replace(/[^a-z0-9]/g, "")
  );
  if (doomsdayItem) {
    // Try to find if this doomsday movie is also in UNIFIED_MCU_TREE
    const treeMatch = UNIFIED_MCU_TREE.find(
      (m) =>
        m.id.toLowerCase() === doomsdayItem.slug.toLowerCase() ||
        m.id.toLowerCase() === doomsdayItem.id.toLowerCase()
    );
    if (treeMatch) {
      return {
        ...treeMatch,
        posterUrl: doomsdayItem.posterUrl,
        backdropUrl: doomsdayItem.backdropUrl,
      } as unknown as MovieNode;
    }

    return {
      id: doomsdayItem.slug || doomsdayItem.id,
      title: doomsdayItem.title,
      phase: doomsdayItem.phase || 1,
      year: doomsdayItem.year,
      type: doomsdayItem.category === "Series" ? "series" : "movie",
      tagline: doomsdayItem.tagline,
      description: doomsdayItem.whyItMatters + "\n\n" + doomsdayItem.doomConnection,
      coordinates: { x: 0, y: 0 },
      connections: ["avengers-doomsday"],
      posterUrl: doomsdayItem.posterUrl,
      backdropUrl: doomsdayItem.backdropUrl,
    } as unknown as MovieNode;
  }

  // 5. Fuzzy title match (e.g. "the incredible hulk" -> "the-incredible-hulk")
  const titleMatch = UNIFIED_MCU_TREE.find(
    (m) =>
      m.title.toLowerCase().replace(/[^a-z0-9]/g, "") ===
      normalizedSlug.replace(/[^a-z0-9]/g, "")
  );
  if (titleMatch) return titleMatch;

  return null;
}

export function generateStaticParams() {
  const nodeSlugs = UNIFIED_MCU_TREE.map((m) => ({ movieSlug: m.id }));
  const aliasSlugs = Object.keys(MOVIE_SLUG_ALIASES).map((slug) => ({
    movieSlug: slug,
  }));
  return [...nodeSlugs, ...aliasSlugs];
}

export function generateMetadata({
  params,
}: {
  params: { movieSlug: string };
}): Metadata {
  const movie = resolveMovieNode(params.movieSlug);
  if (!movie) return { title: "Movie Not Found — MCUVERSE" };

  return {
    title: `${movie.title} (${movie.year}) — MCUVERSE`,
    description: movie.description || movie.tagline,
  };
}

export default function MovieSlugPage({
  params,
}: {
  params: { movieSlug: string };
}) {
  const movie = resolveMovieNode(params.movieSlug);
  if (!movie) {
    notFound();
  }

  return <MovieSlugDetail movie={movie} />;
}
