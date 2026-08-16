export type Artifact = {
  id: string;
  name: string;
  category: "infinity_stone" | "mystic_relic" | "cosmic_technology" | "dark_magic";
  origin: string;
  power: string;
  description: string;
  phaseIntroduced: number;
  iconColor: string; // hex
  history: {
    phase: number;
    year: string;
    holder: string; // character id or organization
    holderName: string;
    location: string;
    event: string;
  }[];
};

export const ARTIFACTS: Artifact[] = [
  {
    id: "space-stone",
    name: "The Tesseract (Space Stone)",
    category: "infinity_stone",
    origin: "Pre-Universe Singularity / Asgardian Vault",
    power: "Omnipresent spatial teleportation, portal creation, wormholes across dimensions.",
    description: "Housed inside the glowing crystalline cube known as the Tesseract. Weaponized by Hydra, captured by S.H.I.E.L.D., used by Loki to invade New York, and later shattered by Thanos to claim the blue Space Stone.",
    phaseIntroduced: 1,
    iconColor: "#38bdf8",
    history: [
      { phase: 1, year: "1942", holder: "red-skull", holderName: "Red Skull / Hydra", location: "Tønsberg, Norway", event: "Hydra recovers the Tesseract to power advanced weaponry." },
      { phase: 1, year: "1945", holder: "captain-america", holderName: "Steve Rogers / S.H.I.E.L.D.", location: "Arctic Waters", event: "Valkyrie crash plunges Tesseract into the ocean; recovered by Howard Stark." },
      { phase: 1, year: "2012", holder: "loki", holderName: "Loki", location: "New York City", event: "Loki opens the Chitauri wormhole above Stark Tower." },
      { phase: 1, year: "2012", holder: "thor", holderName: "Thor / Odin", location: "Asgard Vault", event: "Returned to Odin's vault for safekeeping." },
      { phase: 3, year: "2017", holder: "loki", holderName: "Loki", location: "Statesman Spaceship", event: "Loki steals the Tesseract during Asgard's destruction (Ragnarok)." },
      { phase: 3, year: "2018", holder: "thanos", holderName: "Thanos", location: "Infinity Gauntlet", event: "Thanos crushes the cube, revealing the Space Stone." },
      { phase: 4, year: "2012-Branch", holder: "loki", holderName: "Loki (2012 Variant)", location: "TVA Headquarters", event: "Variant Loki escapes with Tesseract, sparking the Loki timeline branch." }
    ]
  },
  {
    id: "mind-stone",
    name: "The Mind Stone (Scepter / Vision)",
    category: "infinity_stone",
    origin: "Pre-Universe Singularity / Chitauri Scepter",
    power: "Psionic manipulation, consciousness synthesis, reality perception, energy blasts.",
    description: "Given to Loki inside the Scepter to conquer Earth. Later studied by Strucker to awaken the Maximoff twins, and embedded into the synthezoid Vision by Tony Stark and Thor.",
    phaseIntroduced: 1,
    iconColor: "#facc15",
    history: [
      { phase: 1, year: "2012", holder: "loki", holderName: "Loki", location: "Earth-616", event: "Used to mind-control Hawkeye and Selvig during New York invasion." },
      { phase: 2, year: "2014", holder: "hydra", holderName: "Baron Strucker / Hydra", location: "Sokovia", event: "Hydra unlocks Wanda and Pietro's latent psionic powers." },
      { phase: 2, year: "2015", holder: "vision", holderName: "Vision", location: "Vision's Brow", event: "Synthesized into Vision's vibranium forehead as his life source." },
      { phase: 3, year: "2018", holder: "thanos", holderName: "Thanos", location: "Wakanda", event: "Thanos tears the stone from Vision's forehead, completing the Gauntlet." }
    ]
  },
  {
    id: "reality-stone",
    name: "The Aether (Reality Stone)",
    category: "infinity_stone",
    origin: "Pre-Universe Singularity / Malekith",
    power: "Transmutation of matter, illusion creation, warping physical laws into dark matter.",
    description: "Existed for millennia as a volatile liquid Aether sought by Dark Elves. Absorbed by Jane Foster, retrieved by Thor, stored with the Collector on Knowhere, and seized by Thanos.",
    phaseIntroduced: 2,
    iconColor: "#ef4444",
    history: [
      { phase: 2, year: "2013", holder: "thor", holderName: "Thor & Jane Foster", location: "Svartalfheim", event: "Extracted from Jane Foster and protected from Malekith." },
      { phase: 2, year: "2013", holder: "collector", holderName: "The Collector", location: "Knowhere", event: "Entrusted to Taneleer Tivan to keep separated from the Tesseract." },
      { phase: 3, year: "2018", holder: "thanos", holderName: "Thanos", location: "Knowhere", event: "Thanos burns Knowhere and converts the Aether into the Reality Stone." }
    ]
  },
  {
    id: "power-stone",
    name: "The Orb (Power Stone)",
    category: "infinity_stone",
    origin: "Pre-Universe Singularity / Morag Vault",
    power: "Planetary decimation, unstoppable kinetic force, cosmic radiation absorption.",
    description: "Enclosed in a metal Orb on the submerged ocean planet Morag. Stolen by Peter Quill, fought over by Ronan, secured by the Nova Corps on Xandar, before Thanos decimated Xandar.",
    phaseIntroduced: 2,
    iconColor: "#a855f7",
    history: [
      { phase: 2, year: "2014", holder: "guardians", holderName: "Guardians of the Galaxy", location: "Morag / Knowhere / Xandar", event: "Quill and the Guardians harness the stone together to vaporize Ronan." },
      { phase: 2, year: "2014", holder: "nova-corps", holderName: "Nova Corps", location: "Xandar", event: "Placed under highest security in the Nova Vault." },
      { phase: 3, year: "2018", holder: "thanos", holderName: "Thanos", location: "Xandar", event: "Thanos decimates Xandar off-screen to claim his very first stone." }
    ]
  },
  {
    id: "time-stone",
    name: "Eye of Agamotto (Time Stone)",
    category: "infinity_stone",
    origin: "Pre-Universe Singularity / First Sorcerer Supreme",
    power: "Temporal rewinding, future foresight, temporal looping, causal manipulation.",
    description: "Encased within the mystical amulet created by Agamotto. Worn by Kamar-Taj's Masters of the Mystic Arts and Doctor Strange to bargain with Dormammu and calculate the one winning timeline in Endgame.",
    phaseIntroduced: 3,
    iconColor: "#22c55e",
    history: [
      { phase: 3, year: "2016", holder: "doctor-strange", holderName: "Doctor Stephen Strange", location: "Kamar-Taj / Hong Kong", event: "Strange breaks natural law to reverse Hong Kong's destruction and trap Dormammu." },
      { phase: 3, year: "2018", holder: "doctor-strange", holderName: "Doctor Strange", location: "Titan", event: "Strange views 14,000,605 futures and surrenders the stone to Thanos to save Stark." },
      { phase: 3, year: "2018", holder: "thanos", holderName: "Thanos", location: "Infinity Gauntlet", event: "Thanos uses Time Stone to reverse Vision's destruction in Wakanda." }
    ]
  },
  {
    id: "soul-stone",
    name: "The Soul Stone",
    category: "infinity_stone",
    origin: "Pre-Universe Singularity / Vormir Altar",
    power: "Dominion over spiritual essence, soul communication, cosmic awareness.",
    description: "Resting on the barren world of Vormir, requiring 'a soul for a soul' as an eternal trade. Guarded by the cursed Red Skull until claimed through tragic sacrifice.",
    phaseIntroduced: 3,
    iconColor: "#f97316",
    history: [
      { phase: 3, year: "2018", holder: "thanos", holderName: "Thanos", location: "Vormir", event: "Thanos sacrifices his daughter Gamora to manifest the Soul Stone." },
      { phase: 3, year: "2023", holder: "hawkeye", holderName: "Clint Barton / Hawkeye", location: "Vormir (2014 Branch)", event: "Natasha Romanoff sacrifices herself, allowing Clint to retrieve the stone." }
    ]
  },
  {
    id: "the-darkhold",
    name: "The Darkhold (Book of the Damned)",
    category: "dark_magic",
    origin: "Mount Wundagore / Chthon the Elder God",
    power: "Dreamwalking across multiverse realities, chaos magic corruption, dark incantations.",
    description: "An ancient tome of chaos magic carved from Mount Wundagore. Corrupts the mind of any reader. Studied by Agatha Harkness in Westview, used by Wanda to dreamwalk across the Multiverse to hunt America Chavez, before being destroyed across all realities.",
    phaseIntroduced: 4,
    iconColor: "#be123c",
    history: [
      { phase: 4, year: "2023", holder: "agatha", holderName: "Agatha Harkness", location: "Westview, NJ", event: "Agatha wields the Darkhold to siphon magic from Wanda." },
      { phase: 4, year: "2023", holder: "wanda", holderName: "Wanda Maximoff (Scarlet Witch)", location: "Mount Wundagore", event: "Wanda embraces the Darkhold, unleashing multiversal dreamwalking." },
      { phase: 4, year: "2024", holder: "doctor-strange", holderName: "Doctor Strange (Sinister Variant / 616)", location: "Incursion Universe", event: "Strange uses the Darkhold of a destroyed universe to dreamwalk into a deceased variant." },
      { phase: 4, year: "2024", holder: "wanda", holderName: "Wanda Maximoff", location: "Mount Wundagore", event: "Wanda destroys Mount Wundagore, obliterating every copy of the Darkhold in the multiverse." }
    ]
  },
  {
    id: "ten-rings",
    name: "The Ten Rings",
    category: "cosmic_technology",
    origin: "Unknown Ancient Cosmic / Multiversal Beacon",
    power: "Immortality, concussive energy projection, kinetic mastery, emits mysterious cosmic signal.",
    description: "Ten glowing iron bands of unknown alien/multiversal origin discovered by Xu Wenwu a millennium ago. Bestowed upon Shang-Chi, currently sending a beacon to an unknown deep space recipient.",
    phaseIntroduced: 4,
    iconColor: "#06b6d4",
    history: [
      { phase: 4, year: "1000 AD–2024", holder: "wenwu", holderName: "Xu Wenwu", location: "Ta Lo / Macau", event: "Wenwu conquers kingdoms for 1,000 years with the Rings' immortal power." },
      { phase: 4, year: "2024", holder: "shang-chi", holderName: "Shang-Chi", location: "Ta Lo", event: "Shang-Chi masters the Rings with wind-kata to defeat the Dweller-in-Darkness." },
      { phase: 4, year: "2024", holder: "shang-chi", holderName: "Shang-Chi, Wong & Bruce Banner", location: "Kamar-Taj", event: "Sorcerers analyze the rings and discover a mysterious pulsing multiversal signal." }
    ]
  },
  {
    id: "tva-tempad",
    name: "TVA TemPad & Time Door",
    category: "cosmic_technology",
    origin: "He Who Remains / Citadel at the End of Time",
    power: "Instantaneous physical transportation to any coordinate in time, branch, or Void.",
    description: "Standard issue technology of the Time Variance Authority, powered by temporal energy from the Citadel. Capable of pruning branched realities and breaching the Void.",
    phaseIntroduced: 4,
    iconColor: "#f59e0b",
    history: [
      { phase: 4, year: "Timeless", holder: "tva", holderName: "Mobius M. Mobius / TVA", location: "Null-Time Zone", event: "Used to arrest variant anomalies across history." },
      { phase: 4, year: "Timeless", holder: "sylvie", holderName: "Sylvie Laufeydottir", location: "Citadel at End of Time", event: "Sylvie steals a TemPad and hides across planetary apocalypses." },
      { phase: 5, year: "Timeless", holder: "loki", holderName: "Loki (God of Stories)", location: "World Tree of Yggdrasil", event: "Loki masters time-slipping without a device, weaving the timelines." }
    ]
  },
  {
    id: "nano-gauntlet",
    name: "Stark Nano Gauntlet",
    category: "cosmic_technology",
    origin: "Stark Industries / 2023 Avengers Compound",
    power: "Channels all six Infinity Stones simultaneously through programmable nanotechnology.",
    description: "Built by Tony Stark, Bruce Banner, and Rocket Raccoon using nanotechnology to withstand the cosmic surge of six Infinity Stones. Used by Hulk to resurrect the universe and Tony Stark to eliminate Thanos.",
    phaseIntroduced: 3,
    iconColor: "#e11d48",
    history: [
      { phase: 3, year: "2023", holder: "hulk", holderName: "Smart Hulk", location: "Avengers Compound", event: "Hulk snaps his fingers, resurrecting half of all life in the universe." },
      { phase: 3, year: "2023", holder: "iron-man", holderName: "Tony Stark (Iron Man)", location: "Ruined Avengers Compound", event: "Stark siphons the stones into his Mark 85 armor: 'And I... am... Iron Man.'" }
    ]
  }
];

export function getArtifact(id: string) {
  return ARTIFACTS.find((a) => a.id === id);
}
