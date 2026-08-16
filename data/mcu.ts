export type MCUEntry = {
  id: string;
  title: string;
  type: "movie" | "series" | "special";
  year: number;
  phase: number;
  poster?: string;
  backdrop?: string;
  description: string;
  runtime?: string;
  importance: "essential" | "recommended" | "optional";
  status: "released" | "upcoming";
  characters: string[]; // character ids, see data/characters.ts
};

export const PHASES = [
  { id: 1, roman: "I", title: "The Infinity Saga — Origins", years: "2008–2012" },
  { id: 2, roman: "II", title: "The Infinity Saga — Escalation", years: "2013–2015" },
  { id: 3, roman: "III", title: "The Infinity Saga — Reckoning", years: "2016–2019" },
  { id: 4, roman: "IV", title: "The Multiverse Saga — New Voices", years: "2021–2022" },
  { id: 5, roman: "V", title: "The Multiverse Saga — Fractures", years: "2023–2025" },
  { id: 6, roman: "VI", title: "The Multiverse Saga — Convergence", years: "2025–2027" },
] as const;

export const MCU: MCUEntry[] = [
  { id: "iron-man", title: "Iron Man", type: "movie", year: 2008, phase: 1, importance: "essential", status: "released", description: "Tony Stark builds a suit of armor and becomes Iron Man, kicking off the modern MCU.", characters: ["iron-man"] },
  { id: "hulk", title: "The Incredible Hulk", type: "movie", year: 2008, phase: 1, importance: "optional", status: "released", description: "Bruce Banner searches for a cure while evading the military.", characters: ["hulk"] },
  { id: "iron-man-2", title: "Iron Man 2", type: "movie", year: 2010, phase: 1, importance: "recommended", status: "released", description: "Stark battles a new threat while grappling with palladium poisoning.", characters: ["iron-man"] },
  { id: "thor", title: "Thor", type: "movie", year: 2011, phase: 1, importance: "essential", status: "released", description: "Banished to Earth, Thor must learn humility to reclaim his hammer.", characters: ["thor"] },
  { id: "cap-first-avenger", title: "Captain America: The First Avenger", type: "movie", year: 2011, phase: 1, importance: "essential", status: "released", description: "Steve Rogers becomes a super-soldier to fight Hydra in WWII.", characters: ["captain-america"] },
  { id: "avengers", title: "The Avengers", type: "movie", year: 2012, phase: 1, importance: "essential", status: "released", description: "Earth's Mightiest Heroes unite to stop Loki and a Chitauri invasion.", characters: ["iron-man", "captain-america", "thor", "hulk", "black-widow", "hawkeye", "loki"] },
  { id: "iron-man-3", title: "Iron Man 3", type: "movie", year: 2013, phase: 2, importance: "recommended", status: "released", description: "Stark confronts the Mandarin after a personal attack on his home.", characters: ["iron-man"] },
  { id: "thor-dark-world", title: "Thor: The Dark World", type: "movie", year: 2013, phase: 2, importance: "optional", status: "released", description: "Thor must save the Nine Realms from the Dark Elf Malekith.", characters: ["thor", "loki"] },
  { id: "cap-winter-soldier", title: "Captain America: The Winter Soldier", type: "movie", year: 2014, phase: 2, importance: "essential", status: "released", description: "Rogers uncovers Hydra's infiltration of S.H.I.E.L.D.", characters: ["captain-america", "black-widow"] },
  { id: "gotg", title: "Guardians of the Galaxy", type: "movie", year: 2014, phase: 2, importance: "essential", status: "released", description: "A band of misfits protects the galaxy from Ronan the Accuser.", characters: ["guardians"] },
  { id: "avengers-aou", title: "Avengers: Age of Ultron", type: "movie", year: 2015, phase: 2, importance: "essential", status: "released", description: "The Avengers face Ultron, an AI built to protect Earth gone wrong.", characters: ["iron-man", "captain-america", "thor", "hulk", "black-widow", "hawkeye"] },
  { id: "ant-man", title: "Ant-Man", type: "movie", year: 2015, phase: 2, importance: "recommended", status: "released", description: "Scott Lang becomes a shrinking hero to pull off an impossible heist.", characters: ["ant-man"] },
  { id: "cap-civil-war", title: "Captain America: Civil War", type: "movie", year: 2016, phase: 3, importance: "essential", status: "released", description: "The Avengers split over accountability, pitting friend against friend.", characters: ["captain-america", "iron-man", "black-widow", "spider-man"] },
  { id: "doctor-strange", title: "Doctor Strange", type: "movie", year: 2016, phase: 3, importance: "essential", status: "released", description: "Stephen Strange masters the mystic arts after a career-ending accident.", characters: ["doctor-strange"] },
  { id: "gotg2", title: "Guardians of the Galaxy Vol. 2", type: "movie", year: 2017, phase: 3, importance: "recommended", status: "released", description: "Star-Lord discovers the truth about his father, Ego.", characters: ["guardians"] },
  { id: "spiderman-homecoming", title: "Spider-Man: Homecoming", type: "movie", year: 2017, phase: 3, importance: "essential", status: "released", description: "Peter Parker balances school life with his duties as Spider-Man.", characters: ["spider-man"] },
  { id: "thor-ragnarok", title: "Thor: Ragnarok", type: "movie", year: 2017, phase: 3, importance: "essential", status: "released", description: "Thor must escape Sakaar and stop Hela from destroying Asgard.", characters: ["thor", "loki", "hulk"] },
  { id: "black-panther", title: "Black Panther", type: "movie", year: 2018, phase: 3, importance: "essential", status: "released", description: "T'Challa returns to Wakanda to claim the throne and defend it.", characters: ["black-panther"] },
  { id: "infinity-war", title: "Avengers: Infinity War", type: "movie", year: 2018, phase: 3, importance: "essential", status: "released", description: "Thanos hunts the Infinity Stones as the Avengers try to stop him.", characters: ["iron-man", "captain-america", "thor", "doctor-strange", "guardians", "black-panther", "spider-man"] },
  { id: "ant-man-wasp", title: "Ant-Man and the Wasp", type: "movie", year: 2018, phase: 3, importance: "recommended", status: "released", description: "Scott teams with Hope van Dyne on a rescue mission into the Quantum Realm.", characters: ["ant-man"] },
  { id: "captain-marvel", title: "Captain Marvel", type: "movie", year: 2019, phase: 3, importance: "recommended", status: "released", description: "Carol Danvers uncovers her past amid a Kree-Skrull conflict.", characters: ["captain-marvel"] },
  { id: "endgame", title: "Avengers: Endgame", type: "movie", year: 2019, phase: 3, importance: "essential", status: "released", description: "The remaining Avengers attempt a time heist to undo the Snap.", characters: ["iron-man", "captain-america", "thor", "hulk", "black-widow", "hawkeye"] },
  { id: "spiderman-far-from-home", title: "Spider-Man: Far From Home", type: "movie", year: 2019, phase: 3, importance: "recommended", status: "released", description: "Peter navigates grief and a new threat while on a school trip abroad.", characters: ["spider-man"] },
  { id: "wandavision", title: "WandaVision", type: "series", year: 2021, phase: 4, importance: "essential", status: "released", description: "Wanda Maximoff builds a sitcom reality in the town of Westview.", characters: ["wanda"] },
  { id: "falcon-winter-soldier", title: "The Falcon and the Winter Soldier", type: "series", year: 2021, phase: 4, importance: "recommended", status: "released", description: "Sam Wilson and Bucky Barnes confront the legacy of the shield.", characters: ["falcon", "winter-soldier"] },
  { id: "loki-s1", title: "Loki (Season 1)", type: "series", year: 2021, phase: 4, importance: "essential", status: "released", description: "A variant Loki is recruited by the TVA, setting the multiverse in motion.", characters: ["loki"] },
  { id: "black-widow", title: "Black Widow", type: "movie", year: 2021, phase: 4, importance: "recommended", status: "released", description: "Natasha Romanoff confronts her past with the Red Room.", characters: ["black-widow"] },
  { id: "shang-chi", title: "Shang-Chi and the Legend of the Ten Rings", type: "movie", year: 2021, phase: 4, importance: "recommended", status: "released", description: "Shang-Chi confronts his father and the legacy of the Ten Rings.", characters: ["shang-chi"] },
  { id: "eternals", title: "Eternals", type: "movie", year: 2021, phase: 4, importance: "optional", status: "released", description: "Ancient immortal beings reunite to face the Deviants.", characters: ["eternals"] },
  { id: "hawkeye", title: "Hawkeye", type: "series", year: 2021, phase: 4, importance: "recommended", status: "released", description: "Clint Barton trains Kate Bishop while a holiday plot unravels in NYC.", characters: ["hawkeye"] },
  { id: "spiderman-no-way-home", title: "Spider-Man: No Way Home", type: "movie", year: 2021, phase: 4, importance: "essential", status: "released", description: "A spell gone wrong tears open the multiverse for Peter Parker.", characters: ["spider-man", "doctor-strange"] },
  { id: "moon-knight", title: "Moon Knight", type: "series", year: 2022, phase: 4, importance: "optional", status: "released", description: "Marc Spector grapples with a dissociative identity and Egyptian gods.", characters: ["moon-knight"] },
  { id: "doctor-strange-multiverse", title: "Doctor Strange in the Multiverse of Madness", type: "movie", year: 2022, phase: 4, importance: "essential", status: "released", description: "Strange journeys across realities to protect a girl with multiversal power.", characters: ["doctor-strange", "wanda"] },
  { id: "ms-marvel", title: "Ms. Marvel", type: "series", year: 2022, phase: 4, importance: "recommended", status: "released", description: "Kamala Khan discovers she has real superpowers.", characters: ["ms-marvel"] },
  { id: "thor-love-thunder", title: "Thor: Love and Thunder", type: "movie", year: 2022, phase: 4, importance: "recommended", status: "released", description: "Thor teams with Jane Foster, now wielding Mjolnir, against Gorr.", characters: ["thor"] },
  { id: "she-hulk", title: "She-Hulk: Attorney at Law", type: "series", year: 2022, phase: 4, importance: "optional", status: "released", description: "Jennifer Walters balances lawyering with life as She-Hulk.", characters: ["she-hulk"] },
  { id: "black-panther-wakanda", title: "Black Panther: Wakanda Forever", type: "movie", year: 2022, phase: 4, importance: "essential", status: "released", description: "Wakanda mourns and defends itself against the underwater nation of Talokan.", characters: ["black-panther"] },
  { id: "guardians-holiday", title: "The Guardians of the Galaxy Holiday Special", type: "special", year: 2022, phase: 4, importance: "optional", status: "released", description: "The Guardians attempt to give Peter Quill the perfect Christmas.", characters: ["guardians"] },
  { id: "ant-man-quantumania", title: "Ant-Man and the Wasp: Quantumania", type: "movie", year: 2023, phase: 5, importance: "essential", status: "released", description: "The Langs are pulled into the Quantum Realm and face Kang.", characters: ["ant-man"] },
  { id: "guardians-vol3", title: "Guardians of the Galaxy Vol. 3", type: "movie", year: 2023, phase: 5, importance: "essential", status: "released", description: "The Guardians fight to save Rocket from his dark origins.", characters: ["guardians"] },
  { id: "secret-invasion", title: "Secret Invasion", type: "series", year: 2023, phase: 5, importance: "recommended", status: "released", description: "Nick Fury uncovers a decades-long Skrull infiltration of Earth.", characters: ["nick-fury"] },
  { id: "loki-s2", title: "Loki (Season 2)", type: "series", year: 2023, phase: 5, importance: "essential", status: "released", description: "Loki fights to save the Sacred Timeline as the multiverse frays.", characters: ["loki"] },
  { id: "the-marvels", title: "The Marvels", type: "movie", year: 2023, phase: 5, importance: "recommended", status: "released", description: "Carol Danvers, Kamala Khan, and Monica Rambeau swap places in space.", characters: ["captain-marvel", "ms-marvel"] },
  { id: "echo", title: "Echo", type: "series", year: 2024, phase: 5, importance: "optional", status: "released", description: "Maya Lopez returns home and confronts her family's criminal legacy.", characters: ["echo"] },
  { id: "agatha-all-along", title: "Agatha All Along", type: "series", year: 2024, phase: 5, importance: "recommended", status: "released", description: "Agatha Harkness assembles a coven to walk the Witches' Road.", characters: ["agatha", "wanda"] },
  { id: "daredevil-born-again", title: "Daredevil: Born Again", type: "series", year: 2025, phase: 5, importance: "recommended", status: "released", description: "Matt Murdock returns to the mask as Wilson Fisk rises to power in NYC.", characters: ["daredevil"] },
  { id: "thunderbolts", title: "Thunderbolts*", type: "movie", year: 2025, phase: 5, importance: "essential", status: "released", description: "A team of antiheroes is thrown together on a black-ops mission.", characters: ["thunderbolts"] },
  { id: "fantastic-four", title: "The Fantastic Four: First Steps", type: "movie", year: 2025, phase: 6, importance: "essential", status: "released", description: "Marvel's First Family debuts, introduced from an alternate reality into the MCU.", characters: ["fantastic-four"] },
  { id: "spiderman-brand-new-day", title: "Spider-Man: Brand New Day", type: "movie", year: 2026, phase: 6, importance: "recommended", status: "upcoming", description: "Peter Parker's next chapter. Plot details not yet confirmed.", characters: ["spider-man"] },
  { id: "avengers-doomsday", title: "Avengers: Doomsday", type: "movie", year: 2026, phase: 6, importance: "essential", status: "upcoming", description: "A new Avengers roster assembles to face Victor von Doom. Plot details not yet confirmed.", characters: ["doctor-doom", "fantastic-four"] },
  { id: "avengers-secret-wars", title: "Avengers: Secret Wars", type: "movie", year: 2027, phase: 6, importance: "essential", status: "upcoming", description: "The next Multiverse Saga event film. Plot details not yet confirmed.", characters: [] },
];

export const DOOMSDAY_ESSENTIALS = [
  "avengers", "infinity-war", "endgame", "loki-s1", "loki-s2",
  "doctor-strange-multiverse", "spiderman-no-way-home", "ant-man-quantumania",
  "the-marvels", "thunderbolts", "fantastic-four", "avengers-doomsday",
];

export function getEntry(id: string) {
  return MCU.find((m) => m.id === id);
}

export function getAdjacent(id: string) {
  const idx = MCU.findIndex((m) => m.id === id);
  return {
    prev: idx > 0 ? MCU[idx - 1] : null,
    next: idx >= 0 && idx < MCU.length - 1 ? MCU[idx + 1] : null,
  };
}
