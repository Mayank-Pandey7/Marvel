import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { UNIFIED_MCU_TREE, type MovieNode } from "@/data/movies";
import { MCU } from "@/data/mcu";
import { DOOMSDAY_WATCHLIST } from "@/data/doomsdayWatchlist";
import MovieSlugDetail from "@/components/map/MovieSlugDetail";
import { getTopTierHero, HERO_SLUG_ALIASES } from "@/data/topTierHeroes";
import { getTopTierVillain, VILLAIN_SLUG_ALIASES } from "@/data/topTierVillains";
import { UNIVERSES } from "@/data/universes";
import { TopTierHeroExperience } from "@/components/character/TopTierHeroExperience";
import { CosmicEntityExperience } from "@/components/villains/CosmicEntityExperience";

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
  "punisher": "the-punisher",
  "the-punisher": "the-punisher",
  "moon-knight": "moon-knight",
  "moonknight": "moon-knight",
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
  "spider-man-4": "spiderman-brand-new-day",
  "spiderman-4": "spiderman-brand-new-day",
  "spider-man-brand-new-day": "spiderman-brand-new-day",
  "spiderman-brand-new-day": "spiderman-brand-new-day",
  "brand-new-day": "spiderman-brand-new-day",
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
  "venom": "venom-2018",
  "venom-1": "venom-2018",
  "venom-2": "venom-let-there-be-carnage",
  "carnage": "venom-let-there-be-carnage",
  "venom-3": "venom-the-last-dance",
  "venom-last-dance": "venom-the-last-dance",
  "last-dance": "venom-the-last-dance",

  "marvel-zombies": "marvel-zombies",
  "zombies": "marvel-zombies",
  "marvel-zombies-winter-soldier": "marvel-zombies-winter-soldier",
  "zombies-winter-soldier": "marvel-zombies-winter-soldier",
  "marvel-zombies-the-winter-soldier": "marvel-zombies-winter-soldier",
  "marvel-zombies-fist-of-khonshu": "marvel-zombies-fist-of-khonshu",
  "zombies-fist-of-khonshu": "marvel-zombies-fist-of-khonshu",
  "marvel-zombies-the-fist-of-khonshu": "marvel-zombies-fist-of-khonshu",
  "marvel-zombies-last-guardian": "marvel-zombies-last-guardian",
  "zombies-last-guardian": "marvel-zombies-last-guardian",
  "marvel-zombies-the-last-guardian": "marvel-zombies-last-guardian",
  "the-last-guardian": "marvel-zombies-last-guardian",

  "visionquest": "visionquest",
  "vision-quest": "visionquest",
  "vision": "visionquest",
  "white-vision": "visionquest",

  "zodiac": "zodiac",
  "marvel-zodiac": "zodiac",
  "zodiac-series": "zodiac",

  "your-friendly-neighborhood-spider-man": "your-friendly-neighborhood-spider-man",
  "friendly-neighborhood-spider-man": "your-friendly-neighborhood-spider-man",
  "friendly-neighborhood": "your-friendly-neighborhood-spider-man",
  "spider-man-freshman-year": "your-friendly-neighborhood-spider-man",
  "freshman-year": "your-friendly-neighborhood-spider-man",
  "yfn-spiderman": "your-friendly-neighborhood-spider-man",

  "your-friendly-neighborhood-spider-man-s2": "your-friendly-neighborhood-spider-man-s2",
  "your-friendly-neighborhood-spider-man-season-2": "your-friendly-neighborhood-spider-man-s2",
  "friendly-neighborhood-spider-man-s2": "your-friendly-neighborhood-spider-man-s2",
  "friendly-neighborhood-s2": "your-friendly-neighborhood-spider-man-s2",
  "spider-man-freshman-year-s2": "your-friendly-neighborhood-spider-man-s2",
  "sophomore-year": "your-friendly-neighborhood-spider-man-s2",
  "yfn-spiderman-s2": "your-friendly-neighborhood-spider-man-s2",

  "the-punisher-s2": "the-punisher-s2",
  "the-punisher-season-2": "the-punisher-s2",
  "punisher-s2": "the-punisher-s2",
  "punisher-season-2": "the-punisher-s2",
  "punisher-2": "the-punisher-s2",

  "ghost-rider": "ghost-rider",
  "ghostrider": "ghost-rider",
  "ghost-rider-1": "ghost-rider",
  "ghost-rider-2007": "ghost-rider",
  "ghost-rider-spirit-of-vengeance": "ghost-rider-spirit-of-vengeance",
  "ghost-rider-spirit-of-vengeance-2011": "ghost-rider-spirit-of-vengeance",
  "ghost-rider-2": "ghost-rider-spirit-of-vengeance",
  "ghostrider-2": "ghost-rider-spirit-of-vengeance",
  "spirit-of-vengeance": "ghost-rider-spirit-of-vengeance",
  "friendly-neighborhood-s2": "your-friendly-neighborhood-spider-man-s2",
  "spider-man-freshman-year-s2": "your-friendly-neighborhood-spider-man-s2",
  "yfn-spiderman-s2": "your-friendly-neighborhood-spider-man-s2",
};

function resolveMovieNode(slug: string): MovieNode | null {
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
      coordinates: { x: 0, y: 0 },
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

  const universeMatch = UNIVERSES.find(
    (u) =>
      u.id.toLowerCase() === normalizedSlug ||
      (aliasedId && u.id.toLowerCase() === aliasedId.toLowerCase()) ||
      u.name.toLowerCase().replace(/[^a-z0-9]/g, "") === normalizedSlug.replace(/[^a-z0-9]/g, "")
  );
  if (universeMatch) {
    return {
      id: universeMatch.id,
      title: universeMatch.name,
      shortTitle: universeMatch.designation.split("/")[0].trim(),
      year: 2026,
      releaseDate: "MULTIVERSAL ARCHIVE",
      phase: 7,
      order: 1,
      quote: universeMatch.incursionVector,
      speaker: universeMatch.anchorBeing ? `Anchor: ${universeMatch.anchorBeing.split("(")[0].trim()}` : "Multiverse Reality",
      tagline: universeMatch.designation,
      director: universeMatch.governingForce,
      runtime: 0,
      leadCharacter: universeMatch.anchorBeing,
      heroAlias: universeMatch.threatLevel.replace("_", " ") + " THREAT",
      keyRelics: universeMatch.keyNexusEvents || [],
      description: universeMatch.description,
      color: universeMatch.color,
      posterUrl: universeMatch.backdrop,
      backdropUrl: universeMatch.backdrop,
      keyCharacters: universeMatch.keyInhabitants,
      earthDesignation: universeMatch.designation.split("/")[0].trim(),
      earthName: universeMatch.name,
      x: 0,
      y: 0,
      offsetY: 0,
      connections: [],
    } as unknown as MovieNode;
  }

  return null;
}

const RESERVED_ROOT_ROUTES = new Set([
  "artifacts",
  "characters",
  "developer",
  "doomsday",
  "en",
  "familytree",
  "movie",
  "multiverse",
  "timeline",
  "watchlist",
  "icon.svg",
  "favicon.ico",
  "api",
  "robots.txt",
  "sitemap.xml",
]);

export function generateStaticParams() {
  const slugSet = new Set<string>();

  UNIFIED_MCU_TREE.forEach((m) => {
    if (m.id && !RESERVED_ROOT_ROUTES.has(m.id.toLowerCase())) {
      slugSet.add(m.id.toLowerCase());
    }
  });

  UNIVERSES.forEach((u) => {
    if (u.id && !RESERVED_ROOT_ROUTES.has(u.id.toLowerCase())) {
      slugSet.add(u.id.toLowerCase());
    }
  });

  Object.keys(MOVIE_SLUG_ALIASES).forEach((slug) => {
    if (slug && !RESERVED_ROOT_ROUTES.has(slug.toLowerCase())) {
      slugSet.add(slug.toLowerCase());
    }
  });

  Object.keys(HERO_SLUG_ALIASES).forEach((slug) => {
    if (slug && !RESERVED_ROOT_ROUTES.has(slug.toLowerCase())) {
      slugSet.add(slug.toLowerCase());
    }
  });

  Object.keys(VILLAIN_SLUG_ALIASES).forEach((slug) => {
    if (slug && !RESERVED_ROOT_ROUTES.has(slug.toLowerCase())) {
      slugSet.add(slug.toLowerCase());
    }
  });

  return Array.from(slugSet).map((movieSlug) => ({ movieSlug }));
}

export function generateMetadata({
  params,
}: {
  params: { movieSlug: string };
}): Metadata {
  const normSlug = params.movieSlug.toLowerCase().trim();

  const hero = getTopTierHero(normSlug);
  if (
    hero &&
    (Boolean(HERO_SLUG_ALIASES[normSlug]) ||
      normSlug.includes("rune") ||
      normSlug.includes("worldbreaker") ||
      normSlug.includes("godbuster") ||
      normSlug.includes("theoneaboveall"))
  ) {
    return {
      title: `${hero.name} — MCUVERSE`,
      description: hero.description,
    };
  }

  const villain = getTopTierVillain(normSlug);
  if (
    villain &&
    (Boolean(VILLAIN_SLUG_ALIASES[normSlug]) ||
      normSlug.includes("onebelowall") ||
      normSlug.includes("godemperor") ||
      normSlug.includes("beyonder"))
  ) {
    return {
      title: `${villain.name} — MCUVERSE`,
      description: villain.description,
    };
  }

  const movie = resolveMovieNode(params.movieSlug);
  if (movie) {
    return {
      title: `${movie.title} (${movie.year}) — MCUVERSE`,
      description: movie.description || movie.tagline,
    };
  }

  if (hero) {
    return {
      title: `${hero.name} — MCUVERSE`,
      description: hero.description,
    };
  }

  if (villain) {
    return {
      title: `${villain.name} — MCUVERSE`,
      description: villain.description,
    };
  }

  return { title: "Entry Not Found — MCUVERSE" };
}

export default function MovieSlugPage({
  params,
}: {
  params: { movieSlug: string };
}) {
  const normSlug = params.movieSlug.toLowerCase().trim();

  // 1. Check explicit powerful hero alias
  const isExplicitHeroSlug =
    Boolean(HERO_SLUG_ALIASES[normSlug]) ||
    normSlug.includes("rune") ||
    normSlug.includes("worldbreaker") ||
    normSlug.includes("world-breaker") ||
    normSlug.includes("godbuster") ||
    normSlug.includes("worthy") ||
    normSlug.includes("cosmic") ||
    normSlug.includes("the-one-above-all") ||
    normSlug.includes("theoneaboveall") ||
    normSlug.includes("toaa") ||
    normSlug.includes("franklin");

  if (isExplicitHeroSlug) {
    const hero = getTopTierHero(normSlug);
    if (hero) {
      return <TopTierHeroExperience hero={hero} />;
    }
  }

  // 2. Check explicit powerful villain alias
  const isExplicitVillainSlug =
    Boolean(VILLAIN_SLUG_ALIASES[normSlug]) ||
    normSlug.includes("one-below-all") ||
    normSlug.includes("onebelowall") ||
    normSlug.includes("toba") ||
    normSlug.includes("god-emperor") ||
    normSlug.includes("godemperor") ||
    normSlug.includes("beyonder") ||
    normSlug.includes("knull");

  if (isExplicitVillainSlug) {
    const villain = getTopTierVillain(normSlug);
    if (villain) {
      return <CosmicEntityExperience entity={villain} />;
    }
  }

  // 3. Resolve movie node (for movies like /thor, /iron-man, /the-avengers)
  const movie = resolveMovieNode(params.movieSlug);
  if (movie) {
    return <MovieSlugDetail movie={movie} />;
  }

  // 4. Fallback: check if slug matches any top tier hero or villain
  const fallbackHero = getTopTierHero(normSlug);
  if (fallbackHero) {
    return <TopTierHeroExperience hero={fallbackHero} />;
  }

  const fallbackVillain = getTopTierVillain(normSlug);
  if (fallbackVillain) {
    return <CosmicEntityExperience entity={fallbackVillain} />;
  }

  notFound();
}
