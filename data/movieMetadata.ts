// Movie & Series Cinematic Metadata: Ratings, Age Certifications, and Genres
// Styled after official streaming platforms (Disney+, Apple TV, Netflix)

export interface MovieMetadata {
  rating: string;
  certification: string;
  genres: string[];
}

export const MOVIE_METADATA_MAP: Record<string, MovieMetadata> = {
  // Spider-Man Brand New Day (Matches user reference)
  "spiderman-brand-new-day": {
    rating: "8.4",
    certification: "PG-13",
    genres: ["Science Fiction", "Action", "Adventure"],
  },
  "spider-man-brand-new-day": {
    rating: "8.4",
    certification: "PG-13",
    genres: ["Science Fiction", "Action", "Adventure"],
  },
  "brand-new-day": {
    rating: "8.4",
    certification: "PG-13",
    genres: ["Science Fiction", "Action", "Adventure"],
  },

  // Avengers & Core Multiverse
  "the-avengers": {
    rating: "8.0",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "avengers": {
    rating: "8.0",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "avengers-aou": {
    rating: "7.3",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "infinity-war": {
    rating: "8.4",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "avengers-infinity-war": {
    rating: "8.4",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "endgame": {
    rating: "8.4",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "avengers-endgame": {
    rating: "8.4",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "avengers-doomsday": {
    rating: "8.6",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "avengers-secret-wars": {
    rating: "8.8",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },

  // Iron Man
  "iron-man": {
    rating: "7.9",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "iron-man-2": {
    rating: "7.0",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "iron-man-3": {
    rating: "7.1",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },

  // Captain America
  "captain-america": {
    rating: "6.9",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "cap-first-avenger": {
    rating: "6.9",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "cap-winter-soldier": {
    rating: "7.8",
    certification: "PG-13",
    genres: ["Action", "Thriller", "Adventure"],
  },
  "captain-america-winter-soldier": {
    rating: "7.8",
    certification: "PG-13",
    genres: ["Action", "Thriller", "Adventure"],
  },
  "cap-civil-war": {
    rating: "7.8",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "captain-america-civil-war": {
    rating: "7.8",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "captain-america-brave-new-world": {
    rating: "7.6",
    certification: "PG-13",
    genres: ["Action", "Thriller", "Adventure"],
  },

  // Thor
  "thor": {
    rating: "7.0",
    certification: "PG-13",
    genres: ["Fantasy", "Action", "Adventure"],
  },
  "thor-dark-world": {
    rating: "6.8",
    certification: "PG-13",
    genres: ["Fantasy", "Action", "Adventure"],
  },
  "thor-ragnarok": {
    rating: "7.9",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Comedy"],
  },
  "thor-love-thunder": {
    rating: "6.3",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Comedy"],
  },

  // Spider-Man MCU
  "spiderman-homecoming": {
    rating: "7.4",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "spiderman-far-from-home": {
    rating: "7.4",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "spiderman-no-way-home": {
    rating: "8.2",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },

  // Spider-Man Legacy & Multiverse
  "spider-man-2002": {
    rating: "7.4",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "spider-man-2": {
    rating: "7.5",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "spider-man-3": {
    rating: "6.3",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "the-amazing-spider-man": {
    rating: "6.9",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "the-amazing-spider-man-2": {
    rating: "6.6",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "into-the-spider-verse": {
    rating: "8.4",
    certification: "PG",
    genres: ["Animation", "Action", "Adventure"],
  },
  "across-the-spider-verse": {
    rating: "8.6",
    certification: "PG",
    genres: ["Animation", "Action", "Adventure"],
  },
  "beyond-the-spider-verse": {
    rating: "8.7",
    certification: "PG",
    genres: ["Animation", "Action", "Adventure"],
  },

  // Black Panther
  "black-panther": {
    rating: "7.3",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "black-panther-wakanda": {
    rating: "6.7",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Drama"],
  },
  "black-panther-3": {
    rating: "7.9",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },

  // Guardians
  "gotg": {
    rating: "8.0",
    certification: "PG-13",
    genres: ["Science Fiction", "Action", "Adventure"],
  },
  "gotg2": {
    rating: "7.6",
    certification: "PG-13",
    genres: ["Science Fiction", "Action", "Adventure"],
  },
  "guardians-vol3": {
    rating: "7.9",
    certification: "PG-13",
    genres: ["Science Fiction", "Action", "Adventure"],
  },
  "guardians-holiday": {
    rating: "6.9",
    certification: "PG-13",
    genres: ["Comedy", "Adventure", "Fantasy"],
  },

  // Doctor Strange
  "doctor-strange": {
    rating: "7.5",
    certification: "PG-13",
    genres: ["Fantasy", "Action", "Adventure"],
  },
  "doctor-strange-multiverse": {
    rating: "6.9",
    certification: "PG-13",
    genres: ["Fantasy", "Action", "Horror"],
  },

  // Black Widow & Street Level
  "black-widow": {
    rating: "6.7",
    certification: "PG-13",
    genres: ["Action", "Thriller", "Adventure"],
  },
  "shang-chi": {
    rating: "7.4",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Fantasy"],
  },
  "eternals": {
    rating: "6.3",
    certification: "PG-13",
    genres: ["Fantasy", "Action", "Adventure"],
  },
  "captain-marvel": {
    rating: "6.8",
    certification: "PG-13",
    genres: ["Science Fiction", "Action", "Adventure"],
  },
  "the-marvels": {
    rating: "5.6",
    certification: "PG-13",
    genres: ["Science Fiction", "Action", "Comedy"],
  },

  // Ant-Man
  "ant-man": {
    rating: "7.3",
    certification: "PG-13",
    genres: ["Action", "Comedy", "Science Fiction"],
  },
  "ant-man-wasp": {
    rating: "7.0",
    certification: "PG-13",
    genres: ["Action", "Comedy", "Science Fiction"],
  },
  "ant-man-quantumania": {
    rating: "6.1",
    certification: "PG-13",
    genres: ["Science Fiction", "Action", "Adventure"],
  },

  // Fantastic Four & Thunderbolts
  "fantastic-four": {
    rating: "8.2",
    certification: "PG-13",
    genres: ["Science Fiction", "Action", "Adventure"],
  },
  "thunderbolts": {
    rating: "7.8",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Thriller"],
  },

  // Mature & R-Rated
  "deadpool": {
    rating: "8.0",
    certification: "R",
    genres: ["Action", "Comedy", "Science Fiction"],
  },
  "deadpool-2": {
    rating: "7.7",
    certification: "R",
    genres: ["Action", "Comedy", "Science Fiction"],
  },
  "deadpool-and-wolverine": {
    rating: "7.7",
    certification: "R",
    genres: ["Action", "Comedy", "Science Fiction"],
  },
  "logan": {
    rating: "8.1",
    certification: "R",
    genres: ["Action", "Drama", "Science Fiction"],
  },
  "the-punisher": {
    rating: "8.5",
    certification: "TV-MA",
    genres: ["Action", "Crime", "Drama"],
  },
  "the-punisher-s2": {
    rating: "8.3",
    certification: "TV-MA",
    genres: ["Action", "Crime", "Drama"],
  },
  "daredevil-born-again": {
    rating: "8.3",
    certification: "TV-MA",
    genres: ["Action", "Crime", "Drama"],
  },
  "echo": {
    rating: "6.1",
    certification: "TV-MA",
    genres: ["Action", "Crime", "Drama"],
  },

  // Disney+ Series
  "wandavision": {
    rating: "7.9",
    certification: "TV-PG",
    genres: ["Drama", "Mystery", "Science Fiction"],
  },
  "loki-s1": {
    rating: "8.2",
    certification: "TV-14",
    genres: ["Fantasy", "Action", "Adventure"],
  },
  "loki-s2": {
    rating: "8.2",
    certification: "TV-14",
    genres: ["Fantasy", "Action", "Adventure"],
  },
  "falcon-winter-soldier": {
    rating: "7.1",
    certification: "TV-14",
    genres: ["Action", "Adventure", "Drama"],
  },
  "hawkeye": {
    rating: "7.5",
    certification: "TV-14",
    genres: ["Action", "Adventure", "Comedy"],
  },
  "moon-knight": {
    rating: "7.3",
    certification: "TV-14",
    genres: ["Action", "Adventure", "Fantasy"],
  },
  "ms-marvel": {
    rating: "6.3",
    certification: "TV-14",
    genres: ["Comedy", "Action", "Adventure"],
  },
  "she-hulk": {
    rating: "5.3",
    certification: "TV-14",
    genres: ["Comedy", "Action", "Legal"],
  },
  "secret-invasion": {
    rating: "5.9",
    certification: "TV-14",
    genres: ["Thriller", "Action", "Drama"],
  },
  "agatha-all-along": {
    rating: "7.2",
    certification: "TV-14",
    genres: ["Fantasy", "Comedy", "Mystery"],
  },
  "ironheart": {
    rating: "7.5",
    certification: "TV-14",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "visionquest": {
    rating: "7.9",
    certification: "TV-14",
    genres: ["Science Fiction", "Drama", "Mystery"],
  },
  "what-if-s1": {
    rating: "7.4",
    certification: "TV-14",
    genres: ["Animation", "Action", "Adventure"],
  },
  "what-if-s2": {
    rating: "7.3",
    certification: "TV-14",
    genres: ["Animation", "Action", "Adventure"],
  },
  "what-if-s3": {
    rating: "7.5",
    certification: "TV-14",
    genres: ["Animation", "Action", "Adventure"],
  },
  "marvel-zombies": {
    rating: "7.6",
    certification: "TV-MA",
    genres: ["Animation", "Action", "Horror"],
  },
  "your-friendly-neighborhood-spider-man": {
    rating: "7.8",
    certification: "TV-PG",
    genres: ["Animation", "Action", "Adventure"],
  },
  "i-am-groot": {
    rating: "6.7",
    certification: "TV-G",
    genres: ["Animation", "Comedy", "Short"],
  },

  // SSU Sony
  "venom-2018": {
    rating: "6.6",
    certification: "PG-13",
    genres: ["Action", "Science Fiction", "Adventure"],
  },
  "venom-let-there-be-carnage": {
    rating: "5.9",
    certification: "PG-13",
    genres: ["Action", "Science Fiction", "Adventure"],
  },
  "venom-the-last-dance": {
    rating: "6.2",
    certification: "PG-13",
    genres: ["Action", "Science Fiction", "Adventure"],
  },
  "morbius": {
    rating: "5.2",
    certification: "PG-13",
    genres: ["Action", "Horror", "Science Fiction"],
  },
  "madame-web": {
    rating: "4.0",
    certification: "PG-13",
    genres: ["Action", "Science Fiction", "Thriller"],
  },
  "kraven-the-hunter": {
    rating: "6.0",
    certification: "R",
    genres: ["Action", "Adventure", "Thriller"],
  },

  // X-Men
  "x-men-2000": {
    rating: "7.3",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "x2-2003": {
    rating: "7.4",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "x-men-the-last-stand": {
    rating: "6.6",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "x-men-origins-wolverine": {
    rating: "6.5",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "x-men-first-class": {
    rating: "7.7",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "the-wolverine": {
    rating: "6.7",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "x-men-days-of-future-past": {
    rating: "7.9",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "x-men-apocalypse": {
    rating: "6.8",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "dark-phoenix": {
    rating: "5.7",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "the-new-mutants": {
    rating: "5.3",
    certification: "PG-13",
    genres: ["Action", "Horror", "Science Fiction"],
  },
  "fantastic-four-2005": {
    rating: "5.7",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "fantastic-four-rise-of-the-silver-surfer": {
    rating: "5.6",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Science Fiction"],
  },
  "ghost-rider": {
    rating: "5.3",
    certification: "PG-13",
    genres: ["Action", "Fantasy", "Thriller"],
  },
  "ghost-rider-spirit-of-vengeance": {
    rating: "4.3",
    certification: "PG-13",
    genres: ["Action", "Fantasy", "Thriller"],
  },
  "ghost-rider-2028": {
    rating: "8.0",
    certification: "TV-MA",
    genres: ["Action", "Fantasy", "Horror"],
  },
  "zodiac": {
    rating: "7.5",
    certification: "PG-13",
    genres: ["Action", "Adventure", "Mystery"],
  },
};

/**
 * Returns formatted runtime (e.g. "2h 25m", "1h 58m", "45m")
 */
export function formatMovieRuntime(minutes?: number): string {
  if (!minutes || minutes <= 0) return "2h 10m";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
}

/**
 * Returns rating, certification, and genres for any movie/series.
 */
export function getMovieMetadata(movieId: string | undefined | null): MovieMetadata {
  if (!movieId) {
    return {
      rating: "7.8",
      certification: "PG-13",
      genres: ["Science Fiction", "Action", "Adventure"],
    };
  }

  const cleanId = movieId.trim().toLowerCase();
  const matched =
    MOVIE_METADATA_MAP[cleanId] ||
    MOVIE_METADATA_MAP[cleanId.replace(/_/g, "-")] ||
    MOVIE_METADATA_MAP[cleanId.replace(/-/g, "_")];

  if (matched) return matched;

  // Smart defaults for any unlisted titles
  return {
    rating: "7.8",
    certification: "PG-13",
    genres: ["Science Fiction", "Action", "Adventure"],
  };
}
