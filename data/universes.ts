export type UniverseCategory =
  | "sacred"
  | "alternate"
  | "void"
  | "incursion"
  | "whatif";

export type UniverseDimension = {
  id: string;
  name: string;
  designation: string;
  category: UniverseCategory;
  threatLevel: "STABLE" | "DESTABILIZED" | "INCURSION_IMMINENT" | "VOID";
  anchorBeing: string;
  governingForce: string;
  description: string;
  keyInhabitants: string[];
  keyNexusEvents: string[];
  incursionVector: string;
  backdrop: string;
  color: string;
};

export const UNIVERSES: UniverseDimension[] = [
  {
    "id": "earth-616",
    "name": "Earth-616 (Sacred Timeline)",
    "designation": "Prime MCU Reality / Earth-199999",
    "category": "sacred",
    "threatLevel": "DESTABILIZED",
    "anchorBeing": "Tony Stark / Iron Man (Formerly)",
    "governingForce": "Masters of the Mystic Arts & Surviving Avengers",
    "description": "The primary reality of the Marvel Cinematic Universe. Home to the Infinity Saga, the Battle of Earth, and the epicenter of multiversal rift events caused by spells, time heists, and dreamwalking.",
    "keyInhabitants": [
      "Tony Stark",
      "Steve Rogers",
      "Thor",
      "Wanda Maximoff",
      "Doctor Strange",
      "Peter Parker",
      "Shang-Chi"
    ],
    "keyNexusEvents": [
      "Time Heist (2023)",
      "Runaway Spider-Man Memory Spell",
      "Darkhold Multiverse Dreamwalk"
    ],
    "incursionVector": "Destabilized by cross-universal travel (America Chavez, Doctor Strange, Clea).",
    "backdrop": "/images/multiverse/earth-616.jpg",
    "color": "#f59e0b"
  },
  {
    "id": "earth-838",
    "name": "Earth-838 (Illuminati Reality)",
    "designation": "Illuminati Utopian Earth",
    "category": "alternate",
    "threatLevel": "INCURSION_IMMINENT",
    "anchorBeing": "Professor Charles Xavier (Earth-838)",
    "governingForce": "The Illuminati (Formerly, prior to Massacre)",
    "description": "A highly advanced alternate Earth where the Illuminati eradicated Thanos using the Book of Vishanti. Severely destabilized after Earth-616 Wanda Maximoff dreamwalked in and slaughtered their leadership council.",
    "keyInhabitants": [
      "Reed Richards (Mister Fantastic)",
      "Charles Xavier",
      "Captain Carter",
      "Black Bolt",
      "Maria Rambeau (Captain Marvel)",
      "Wanda-838"
    ],
    "keyNexusEvents": [
      "Illuminati Council Massacre",
      "Book of Vishanti Destruction"
    ],
    "incursionVector": "Incursion imminent due to footprint left by Doctor Strange and the Scarlet Witch.",
    "backdrop": "/images/multiverse/earth-838.jpg",
    "color": "#3b82f6"
  },
  {
    "id": "the-void",
    "name": "The Void & Alioth Domain",
    "designation": "Null-Time Wasteland Horizon",
    "category": "void",
    "threatLevel": "VOID",
    "anchorBeing": "Alioth the Temporal Consumer",
    "governingForce": "Alioth / Cassandra Nova's Warlords",
    "description": "The cosmic junkyard located at the end of time where all timelines pruned by the TVA were dumped. Ruled by Alioth, filled with remnants of dead universes and forgotten superhero variants.",
    "keyInhabitants": [
      "Cassandra Nova",
      "Deadpool",
      "Wolverine",
      "Classic Loki",
      "Sylvie",
      "Blade",
      "Elektra",
      "Gambit",
      "Johnny Storm"
    ],
    "keyNexusEvents": [
      "Loki Pruning Protocol",
      "Cassandra Nova Time-Ripper Incursion"
    ],
    "incursionVector": "Absolute temporal collapse horizon where dying realities are consumed.",
    "backdrop": "/images/multiverse/the-void.jpg",
    "color": "#ef4444"
  },
  {
    "id": "yggdrasil",
    "name": "Yggdrasil Multiverse Tree",
    "designation": "Loki's Sanctuary of Infinite Stories",
    "category": "sacred",
    "threatLevel": "STABLE",
    "anchorBeing": "Loki (God of Stories)",
    "governingForce": "Loki (God of Stories)",
    "description": "The living, breathing cosmic tree holding all branching timelines in existence. Formed when Loki sacrificed his freedom to bind infinite dying branches with his bare hands.",
    "keyInhabitants": [
      "Loki (God of Stories)",
      "Infinite Parallel Timelines"
    ],
    "keyNexusEvents": [
      "Destruction of the Temporal Loom",
      "Weaving of the World Tree"
    ],
    "incursionVector": "Protected perpetually by Loki's temporal magic at the Throne of Time.",
    "backdrop": "/images/multiverse/yggdrasil.jpg",
    "color": "#22d3ee"
  },
  {
    "id": "earth-10005",
    "name": "Earth-10005 (Fox Mutant Universe)",
    "designation": "Legacy 20th Century Fox X-Men Universe",
    "category": "alternate",
    "threatLevel": "DESTABILIZED",
    "anchorBeing": "Wolverine / Logan (Deceased 2029)",
    "governingForce": "X-Men / TVA Anchor Protocol",
    "description": "The reality of the 20th Century Fox X-Men and Deadpool. Anchor being Logan died in 2029, causing the timeline to begin deteriorating until Wade Wilson intervened.",
    "keyInhabitants": [
      "Deadpool (Wade Wilson)",
      "Wolverine (Logan)",
      "Colossus",
      "Negasonic Teenage Warhead",
      "Yukio",
      "Blind Al"
    ],
    "keyNexusEvents": [
      "Death of Anchor Being Logan (2029)",
      "TVA Time-Ripper Interception"
    ],
    "incursionVector": "Saved from immediate decay by dual-anchor stabilization with Variant Wolverine.",
    "backdrop": "/images/multiverse/earth-10005.jpg",
    "color": "#eab308"
  },
  {
    "id": "earth-96283",
    "name": "Earth-96283 (Raimi Spider-Verse)",
    "designation": "Peter Parker-1 Prime Reality",
    "category": "alternate",
    "threatLevel": "STABLE",
    "anchorBeing": "Peter Parker (Tobey Maguire)",
    "governingForce": "Spider-Man / Daily Bugle",
    "description": "The universe of the classic Sam Raimi Spider-Man trilogy. Displaced villains (Green Goblin, Doc Ock, Sandman) were summoned into Earth-616 before being cured and returned.",
    "keyInhabitants": [
      "Peter Parker (Spider-Man)",
      "Norman Osborn (Green Goblin)",
      "Otto Octavius (Doc Ock)",
      "Flint Marko (Sandman)",
      "Mary Jane Watson"
    ],
    "keyNexusEvents": [
      "Trans-dimensional summoning to Earth-616",
      "Antidote Synthesis & Return"
    ],
    "incursionVector": "Stable; memory breaches restored by Strange's final universal containment spell.",
    "backdrop": "/images/multiverse/earth-96283.jpg",
    "color": "#dc2626"
  },
  {
    "id": "earth-120703",
    "name": "Earth-120703 (Amazing Spider-Verse)",
    "designation": "Peter Parker-3 Amazing Reality",
    "category": "alternate",
    "threatLevel": "STABLE",
    "anchorBeing": "Peter Parker (Andrew Garfield)",
    "governingForce": "Oscorp / Spider-Man",
    "description": "The universe of Marc Webb's Amazing Spider-Man. Peter Parker struggled with guilt over Gwen Stacy's death until finding redemption on Earth-616 by saving MJ.",
    "keyInhabitants": [
      "Peter Parker (Spider-Man)",
      "Curt Connors (Lizard)",
      "Max Dillon (Electro)",
      "Harry Osborn (Green Goblin)"
    ],
    "keyNexusEvents": [
      "Statue of Liberty Multiverse Convergence",
      "Saving MJ at the Shield Scaffold"
    ],
    "incursionVector": "Normalized following villain rehabilitation and dimensional return.",
    "backdrop": "/images/multiverse/earth-120703.jpg",
    "color": "#0ea5e9"
  },
  {
    "id": "citadel-end-of-time",
    "name": "Citadel at the End of Time",
    "designation": "Sanctuary of He Who Remains",
    "category": "void",
    "threatLevel": "VOID",
    "anchorBeing": "He Who Remains",
    "governingForce": "He Who Remains / Miss Minutes",
    "description": "An ancient castle built on an asteroid orbiting the Sacred Timeline outside time itself. Where He Who Remains directed the Time Variance Authority to prevent multiversal war.",
    "keyInhabitants": [
      "He Who Remains",
      "Sylvie",
      "Loki",
      "Miss Minutes"
    ],
    "keyNexusEvents": [
      "Sylvie's Revenge Assassination",
      "Uncontrolled Multiversal Timeline Branching"
    ],
    "incursionVector": "Ground zero for the collapse of the Sacred Timeline.",
    "backdrop": "/images/multiverse/citadel-end-of-time.jpg",
    "color": "#a855f7"
  },
  {
    "id": "earth-sinister",
    "name": "Sinister Incursion Earth",
    "designation": "Collapsed Incursion Reality",
    "category": "incursion",
    "threatLevel": "INCURSION_IMMINENT",
    "anchorBeing": "Sinister Strange (Third Eye)",
    "governingForce": "Sinister Strange & Darkhold Echoes",
    "description": "A dying reality that experienced a devastating incursion caused by its own Doctor Strange using the Darkhold to search for a universe where he was happy with Christine Palmer.",
    "keyInhabitants": [
      "Sinister Strange (Deceased)",
      "Darkhold Tormented Souls"
    ],
    "keyNexusEvents": [
      "Planetary Collision Incursion",
      "Musical Notes Sorcery Duel"
    ],
    "incursionVector": "Total cosmic unraveling; matter dissolving into the atmospheric void.",
    "backdrop": "/images/multiverse/earth-sinister.jpg",
    "color": "#be123c"
  },
  {
    "id": "quantum-realm",
    "name": "The Quantum Realm & Axia",
    "designation": "Sub-Atomic Microverse Empire",
    "category": "void",
    "threatLevel": "DESTABILIZED",
    "anchorBeing": "Kang the Conqueror (Exiled)",
    "governingForce": "Kang's Empire (Fallen) / Freedom Fighters",
    "description": "A microscopic dimension outside space and time accessible via Pym Particles. Housed Kang's exiled high-tech empire Axia until his Time Chair engine core was overloaded.",
    "keyInhabitants": [
      "Kang the Conqueror",
      "MODOK",
      "Janet van Dyne",
      "Scott Lang",
      "Hope van Dyne",
      "Lord Krylar",
      "Jentorra"
    ],
    "keyNexusEvents": [
      "Council of Kangs Multiversal Banishment",
      "Ant-Man Rebellion & Kang's Core Implosion"
    ],
    "incursionVector": "Quantum space bridges directly into infinite timeline nexus points.",
    "backdrop": "/images/multiverse/quantum-realm.jpg",
    "color": "#c084fc"
  },
  {
    "id": "battleworld",
    "name": "Battleworld Horizon",
    "designation": "Doomsday Reality Convergence / Secret Wars",
    "category": "incursion",
    "threatLevel": "INCURSION_IMMINENT",
    "anchorBeing": "Doctor Victor von Doom",
    "governingForce": "God Emperor Doom",
    "description": "The composite mosaic patchwork world formed from the remnants of shattered multiverse realities colliding during universal incursions. Ruled under the absolute iron fist of Victor von Doom.",
    "keyInhabitants": [
      "Doctor Doom",
      "Multiverse Champions",
      "Fantastic Four",
      "Thor Corps"
    ],
    "keyNexusEvents": [
      "Universal Incursion Cataclysm",
      "Doomsday Secret Wars Convergence"
    ],
    "incursionVector": "Terminal endpoint of all incursion collisions across the multiverse.",
    "backdrop": "/images/multiverse/battleworld.jpg",
    "color": "#15803d"
  },
  {
    "id": "earth-82111",
    "name": "Earth-82111 (Captain Carter Universe)",
    "designation": "What If...? Super Soldier Reality",
    "category": "whatif",
    "threatLevel": "STABLE",
    "anchorBeing": "Captain Peggy Carter",
    "governingForce": "Guardians of the Multiverse / SSR",
    "description": "The universe where Peggy Carter took the Super Soldier Serum instead of Steve Rogers, becoming Captain Carter and wielding the Union Jack vibranium shield across the cosmos.",
    "keyInhabitants": [
      "Captain Carter",
      "Steve Rogers (Hydra Stomper)",
      "Howard Stark",
      "The Watcher"
    ],
    "keyNexusEvents": [
      "Peggy Takes the Super Soldier Serum",
      "Guardians of the Multiverse Infinity Ultron Victory"
    ],
    "incursionVector": "Guarded and monitored by Uatu the Watcher.",
    "backdrop": "/images/multiverse/earth-82111.jpg",
    "color": "#2563eb"
  },
  {
    "id": "earth-2149",
    "name": "Earth-2149 (Marvel Zombies Apocalypse)",
    "designation": "Quantum Zombie Outbreak Reality",
    "category": "whatif",
    "threatLevel": "INCURSION_IMMINENT",
    "anchorBeing": "Zombie Scarlet Witch",
    "governingForce": "The Undead Avengers / Zombie Thanos",
    "description": "A horrific reality where a quantum virus brought back from the Quantum Realm by Janet van Dyne infected the Avengers, creating flesh-eating super-powered undead with Infinity Gauntlets.",
    "keyInhabitants": [
      "Zombie Captain America",
      "Zombie Iron Man",
      "Zombie Scarlet Witch",
      "Spider-Man (Survivor)",
      "Zombie Thanos"
    ],
    "keyNexusEvents": [
      "Quantum Virus Outbreak in San Francisco",
      "Zombie Thanos Completing the Gauntlet"
    ],
    "incursionVector": "High biological and dimensional contamination risk.",
    "backdrop": "/images/multiverse/earth-2149.jpg",
    "color": "#16a34a"
  },
  {
    "id": "gap-junction",
    "name": "The Gap Junction",
    "designation": "Nexus Space Between Dimensions",
    "category": "void",
    "threatLevel": "STABLE",
    "anchorBeing": "The Book of Vishanti (Formerly)",
    "governingForce": "Cosmic Neutral Zone",
    "description": "The serene architectural pocket realm situated between all universes in the multiverse. Home to the pedestal of the Book of Vishanti, accessible only through multiversal star portals.",
    "keyInhabitants": [
      "America Chavez",
      "Defender Strange",
      "Doctor Strange-616"
    ],
    "keyNexusEvents": [
      "Defender Strange's Sacrifice",
      "Destruction of the Book of Vishanti"
    ],
    "incursionVector": "Neutral trans-dimensional gateway unaffected by physical planetary physics.",
    "backdrop": "/images/multiverse/gap-junction.jpg",
    "color": "#38bdf8"
  }
];

export function getUniverse(id: string) {
  return UNIVERSES.find((u) => u.id === id);
}

export function getUniversesByCategory(category: UniverseCategory) {
  return UNIVERSES.filter((u) => u.category === category);
}
