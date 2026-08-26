import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { UNIFIED_MCU_TREE, type MovieNode } from "@/data/movies";
import { MCU } from "@/data/mcu";
import { DOOMSDAY_WATCHLIST } from "@/data/doomsdayWatchlist";
import MoviePageDetail from "@/components/map/MoviePageDetail";

const MOVIE_SLUG_ALIASES: Record<string, string> = {
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
  "quantumania": "ant-man-and-the-wasp-quantumania",
  "ant-man-3": "ant-man-and-the-wasp-quantumania",
  "guardians-3": "guardians-of-the-galaxy-vol-3",
  "gotg-3": "guardians-of-the-galaxy-vol-3",
  "gotg3": "guardians-of-the-galaxy-vol-3",
  "secret-invasion": "secret-invasion",
  "loki-2": "loki-season-2",
  "loki-s2": "loki-season-2",
  "the-marvels": "the-marvels",
  "marvels": "the-marvels",
  "echo": "echo",
  "deadpool-3": "deadpool-and-wolverine",
  "deadpool-and-wolverine": "deadpool-and-wolverine",
  "deadpool-wolverine": "deadpool-and-wolverine",
  "agatha": "agatha-all-along",
  "agatha-coven-of-chaos": "agatha-all-along",
  "brave-new-world": "captain-america-brave-new-world",
  "captain-america-4": "captain-america-brave-new-world",
  "daredevil": "daredevil-born-again",
  "daredevil-ba": "daredevil-born-again",
  "thunderbolts": "thunderbolts",
  "fantastic-four": "the-fantastic-four-first-steps",
  "f4": "the-fantastic-four-first-steps",
  "blade": "blade",
  "spiderman-4": "spiderman-brand-new-day",
  "spider-man-4": "spiderman-brand-new-day",
  "brand-new-day": "spiderman-brand-new-day",
  "doomsday": "avengers-doomsday",
  "avengers-5": "avengers-doomsday",
  "secret-wars": "avengers-secret-wars",
  "avengers-6": "avengers-secret-wars",
};

function resolveMovie(slug: string): MovieNode | null {
  const normalizedSlug = slug.toLowerCase().trim();

  const directMatch = UNIFIED_MCU_TREE.find(
    (m) => m.id.toLowerCase() === normalizedSlug
  );
  if (directMatch) return directMatch;

  const aliasedId = MOVIE_SLUG_ALIASES[normalizedSlug];
  if (aliasedId) {
    const aliasMatch = UNIFIED_MCU_TREE.find(
      (m) => m.id.toLowerCase() === aliasedId.toLowerCase()
    );
    if (aliasMatch) return aliasMatch;
  }

  const mcuEntry = MCU.find((m) => m.id.toLowerCase() === normalizedSlug);
  if (mcuEntry) {
    const treeMatch = UNIFIED_MCU_TREE.find(
      (m) =>
        m.id.toLowerCase() === mcuEntry.id.toLowerCase() ||
        m.title.toLowerCase() === mcuEntry.title.toLowerCase()
    );
    if (treeMatch) return treeMatch;
  }

  const doomsdayItem = DOOMSDAY_WATCHLIST.find(
    (d) =>
      d.id.toLowerCase() === normalizedSlug ||
      d.slug.toLowerCase() === normalizedSlug ||
      (aliasedId && (d.id.toLowerCase() === aliasedId.toLowerCase() || d.slug.toLowerCase() === aliasedId.toLowerCase())) ||
      d.title.toLowerCase().replace(/[^a-z0-9]/g, "") ===
        normalizedSlug.replace(/[^a-z0-9]/g, "")
  );
  if (doomsdayItem) {
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
      connections: ["avengers-doomsday"],
      posterUrl: doomsdayItem.posterUrl,
      backdropUrl: doomsdayItem.backdropUrl,
    } as unknown as MovieNode;
  }

  const titleMatch = UNIFIED_MCU_TREE.find(
    (m) =>
      m.title.toLowerCase().replace(/[^a-z0-9]/g, "") ===
      normalizedSlug.replace(/[^a-z0-9]/g, "")
  );
  if (titleMatch) return titleMatch;

  return null;
}

export function generateStaticParams() {
  const nodeSlugs = UNIFIED_MCU_TREE.map((m) => ({ slug: m.id }));
  const aliasSlugs = Object.keys(MOVIE_SLUG_ALIASES).map((slug) => ({
    slug,
  }));
  return [...nodeSlugs, ...aliasSlugs];
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const movie = resolveMovie(params.slug);
  if (!movie) return { title: "Movie Not Found | MCUVERSE" };

  return {
    title: `${movie.title} — Dossier & Narrative Specs | MCUVERSE`,
    description: movie.description || `Comprehensive dossier for ${movie.title} in the Marvel Cinematic Universe.`,
  };
}

export default function MovieSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const movie = resolveMovie(params.slug);
  if (!movie) notFound();

  return <MoviePageDetail movie={movie} />;
}
