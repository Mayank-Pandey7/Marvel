export type ArtifactCategory =
  | "ironman_armor"
  | "infinity_stone"
  | "dark_magic"
  | "mystic_relic"
  | "cosmic_technology"
  | "asgardian_weapon"
  | "wakandan_tech";

export type Artifact = {
  id: string;
  name: string;
  category: ArtifactCategory;
  origin: string;
  power: string;
  description: string;
  phaseIntroduced: number;
  iconColor: string;
  backdrop: string;
  history: {
    phase: number;
    year: string;
    holder: string;
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
    backdrop: "/images/artifacts/space-stone.jpg",
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
    backdrop: "/images/artifacts/mind-stone.jpg",
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
    backdrop: "/images/artifacts/reality-stone.jpg",
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
    backdrop: "/images/artifacts/power-stone.jpg",
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
    backdrop: "/images/artifacts/time-stone.jpg",
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
    backdrop: "/images/artifacts/soul-stone.jpg",
    history: [
      { phase: 3, year: "2018", holder: "thanos", holderName: "Thanos", location: "Vormir", event: "Thanos sacrifices his daughter Gamora to manifest the Soul Stone." },
      { phase: 3, year: "2023", holder: "hawkeye", holderName: "Clint Barton / Hawkeye", location: "Vormir (2014 Branch)", event: "Natasha Romanoff sacrifices herself, allowing Clint to retrieve the stone." }
    ]
  },

  {
    id: "infinity-gauntlet",
    name: "The Infinity Gauntlet",
    category: "cosmic_technology",
    origin: "Nidavellir Forge / Eitri the Dwarf King",
    power: "Harmonizes and harnesses the full omnipotent power of all six Infinity Stones.",
    description: "Forged from enchanted Uru metal on Nidavellir by the dwarf king Eitri under threat from Thanos. Allowed Thanos to execute the cosmic snap that erased fifty percent of all living beings.",
    phaseIntroduced: 3,
    iconColor: "#eab308",
    backdrop: "/images/artifacts/infinity-gauntlet.jpg",
    history: [
      { phase: 3, year: "2018", holder: "thanos", holderName: "Thanos", location: "Nidavellir / Wakanda", event: "Thanos completes the Gauntlet and executes the Decimation snap in Wakanda." },
      { phase: 3, year: "2018", holder: "thanos", holderName: "Thanos", location: "The Garden Planet", event: "Thanos uses the stones to destroy the stones, crippling the Gauntlet." }
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
    backdrop: "/images/artifacts/nano-gauntlet.jpg",
    history: [
      { phase: 3, year: "2023", holder: "hulk", holderName: "Smart Hulk", location: "Avengers Compound", event: "Hulk snaps his fingers, resurrecting half of all life in the universe." },
      { phase: 3, year: "2023", holder: "iron-man", holderName: "Tony Stark (Iron Man)", location: "Ruined Avengers Compound", event: "Stark siphons the stones into his Mark 85 armor: 'And I... am... Iron Man.'" }
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
    backdrop: "/images/artifacts/the-darkhold.jpg",
    history: [
      { phase: 4, year: "2023", holder: "agatha", holderName: "Agatha Harkness", location: "Westview, NJ", event: "Agatha wields the Darkhold to siphon magic from Wanda." },
      { phase: 4, year: "2023", holder: "wanda", holderName: "Wanda Maximoff (Scarlet Witch)", location: "Mount Wundagore", event: "Wanda embraces the Darkhold, unleashing multiversal dreamwalking." },
      { phase: 4, year: "2024", holder: "doctor-strange", holderName: "Doctor Strange (Sinister Variant / 616)", location: "Incursion Universe", event: "Strange uses the Darkhold of a destroyed universe to dreamwalk into a deceased variant." },
      { phase: 4, year: "2024", holder: "wanda", holderName: "Wanda Maximoff", location: "Mount Wundagore", event: "Wanda destroys Mount Wundagore, obliterating every copy of the Darkhold in the multiverse." }
    ]
  },
  {
    id: "book-of-vishanti",
    name: "The Book of Vishanti",
    category: "mystic_relic",
    origin: "Gap Junction Between Realities",
    power: "Infinite white light sorcery granting whatever magic is necessary to defeat any foe.",
    description: "The ultimate antithesis to the Darkhold, resting in the Gap Junction between universes. Sought by Defender Strange and Earth-616 Strange to stop the Scarlet Witch, but destroyed by Wanda's chaos magic before its spells could be read.",
    phaseIntroduced: 4,
    iconColor: "#38bdf8",
    backdrop: "/images/artifacts/book-of-vishanti.jpg",
    history: [
      { phase: 4, year: "2024", holder: "defender-strange", holderName: "Defender Strange", location: "Gap Junction", event: "Defender Strange and America Chavez race toward the pedestal to counter demons." },
      { phase: 4, year: "2024", holder: "doctor-strange", holderName: "Doctor Strange & America Chavez", location: "Gap Junction", event: "Strange unlocks the tome, but Wanda dreamwalks in and incinerates the Book." }
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
    backdrop: "/images/artifacts/ten-rings.jpg",
    history: [
      { phase: 4, year: "1000 AD–2024", holder: "wenwu", holderName: "Xu Wenwu", location: "Ta Lo / Macau", event: "Wenwu conquers kingdoms for 1,000 years with the Rings' immortal power." },
      { phase: 4, year: "2024", holder: "shang-chi", holderName: "Shang-Chi", location: "Ta Lo", event: "Shang-Chi masters the Rings with wind-kata to defeat the Dweller-in-Darkness." },
      { phase: 4, year: "2024", holder: "shang-chi", holderName: "Shang-Chi, Wong & Bruce Banner", location: "Kamar-Taj", event: "Sorcerers analyze the rings and discover a mysterious pulsing multiversal signal." }
    ]
  },
  {
    id: "quantum-bands",
    name: "Quantum Bands / Noor Bangles",
    category: "cosmic_technology",
    origin: "Kree Empire / Noor Dimension Temple",
    power: "Solid light hard-construct generation, spatial jump point creation, quantum entanglement switching.",
    description: "Ancient paired bangles created to harness the Noor Dimension and open space jump points. One discovered in Karachi by Kamala Khan, the other retrieved by Dar-Benn, whose dual resonance tore holes in the multiverse fabric.",
    phaseIntroduced: 4,
    iconColor: "#c084fc",
    backdrop: "/images/artifacts/quantum-bands.jpg",
    history: [
      { phase: 4, year: "1947–2025", holder: "kamala-khan", holderName: "Kamala Khan (Ms. Marvel)", location: "Jersey City / Karachi", event: "Kamala wears her great-grandmother's bangle, activating her latent mutant light-powers." },
      { phase: 5, year: "2026", holder: "dar-benn", holderName: "Dar-Benn", location: "Tarnax / Hala", event: "Dar-Benn uses the bangle to siphon atmosphere and oceans from allied worlds." },
      { phase: 5, year: "2026", holder: "kamala-khan", holderName: "Kamala Khan", location: "Earth-616", event: "Kamala unites both Quantum Bands, powering Monica Rambeau to seal the incursion tear." }
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
    backdrop: "/images/artifacts/tva-tempad.jpg",
    history: [
      { phase: 4, year: "Timeless", holder: "tva", holderName: "Mobius M. Mobius / TVA", location: "Null-Time Zone", event: "Used to arrest variant anomalies across history." },
      { phase: 4, year: "Timeless", holder: "sylvie", holderName: "Sylvie Laufeydottir", location: "Citadel at End of Time", event: "Sylvie steals a TemPad and hides across planetary apocalypses." },
      { phase: 5, year: "Timeless", holder: "loki", holderName: "Loki (God of Stories)", location: "World Tree of Yggdrasil", event: "Loki masters time-slipping without a device, weaving the timelines." }
    ]
  },
  {
    id: "tva-time-stick",
    name: "TVA Time Stick & Reset Charge",
    category: "cosmic_technology",
    origin: "Time Variance Authority Armory",
    power: "Pruning matter directly into the Void at the end of time; timeline branch erasure.",
    description: "Handheld pruning batons wielded by Minutemen and Judges. A single touch disintegrates entities from their timeline, sending their mass to be consumed by Alioth.",
    phaseIntroduced: 4,
    iconColor: "#ea580c",
    backdrop: "/images/artifacts/tva-time-stick.jpg",
    history: [
      { phase: 4, year: "Timeless", holder: "hunter-b15", holderName: "Hunter B-15 & Minutemen", location: "Gobi Desert", event: "Pruned variant Loki after his escape with the Tesseract." },
      { phase: 4, year: "Timeless", holder: "ravonna-renslayer", holderName: "Judge Ravonna Renslayer", location: "TVA Time Theater", event: "Prunes Mobius and Loki directly to the Void." }
    ]
  },

  {
    id: "mjolnir",
    name: "Mjolnir (Enchanted Uru Hammer)",
    category: "asgardian_weapon",
    origin: "Heart of a Dying Star / Asgardian Royal Forge",
    power: "Worthiness enchantment, lightning channeling, flight propulsion, resurrection of Thor.",
    description: "Forged in the heart of a dying star and enchanted by Odin so that 'whosoever holds this hammer, if they be worthy, shall possess the power of Thor.'",
    phaseIntroduced: 1,
    iconColor: "#a855f7",
    backdrop: "/images/artifacts/mjolnir.jpg",
    history: [
      { phase: 1, year: "2011", holder: "thor", holderName: "Thor Odinson", location: "Puente Antiguo, NM", event: "Thor proves his worthiness and reclaims Mjolnir." },
      { phase: 3, year: "2019", holder: "captain-america", holderName: "Steve Rogers", location: "Ruined Avengers Compound", event: "Captain America proves worthy and wields Mjolnir against Thanos." },
      { phase: 4, year: "2024", holder: "mighty-thor", holderName: "Jane Foster (Mighty Thor)", location: "New Asgard", event: "Reconstructed itself to bond with Jane Foster." }
    ]
  },
  {
    id: "stormbreaker",
    name: "Stormbreaker (The King-Killer Ax)",
    category: "asgardian_weapon",
    origin: "Nidavellir Forge / Eitri & Groot",
    power: "Bifrost summoning, lightning amplification, severing cosmic entity armor, flight.",
    description: "A king's weapon designed to be the greatest in Asgard. Forged by Thor, Rocket, and Eitri, bound together by Groot's arm. Capable of overpowering a beam from all six Infinity Stones.",
    phaseIntroduced: 3,
    iconColor: "#38bdf8",
    backdrop: "/images/artifacts/stormbreaker.jpg",
    history: [
      { phase: 3, year: "2018", holder: "thor", holderName: "Thor", location: "Nidavellir / Wakanda", event: "Thor arrives in Wakanda and hurls Stormbreaker into Thanos's chest." },
      { phase: 3, year: "2018", holder: "thor", holderName: "Thor", location: "The Garden Planet", event: "Thor decapitates Thanos: 'I went for the head.'" },
      { phase: 4, year: "2024", holder: "love", holderName: "Love (Gorr's Resurrected Daughter)", location: "Cosmic Frontier", event: "Gifted to Love as her primary battle weapon alongside Uncle Thor." }
    ]
  },
  {
    id: "necrosword",
    name: "All-Black the Necrosword",
    category: "dark_magic",
    origin: "Shadow Realm / Primeval Void",
    power: "God-slaying, shadow tentacle manipulation, shadow monster summoning, wielder corruption.",
    description: "An ancient cursed blade that feeds on the blood of immortals. Corrupted Gorr after the tragic death of his daughter, granting him the power to slay pantheons of gods across the cosmos.",
    phaseIntroduced: 4,
    iconColor: "#475569",
    backdrop: "/images/artifacts/necrosword.jpg",
    history: [
      { phase: 4, year: "2024", holder: "gorr", holderName: "Gorr the God Butcher", location: "Unknown Desert Planet", event: "Kills his deity Rapu after being betrayed, claiming the Necrosword." },
      { phase: 4, year: "2024", holder: "mighty-thor", holderName: "Jane Foster & Thor", location: "Eternity's Gateway", event: "Mighty Thor shatters the Necrosword into fragments using Mjolnir." }
    ]
  },
  {
    id: "casket-ancient-winters",
    name: "The Casket of Ancient Winters",
    category: "asgardian_weapon",
    origin: "Jotunheim / Laufey's Frost Giants",
    power: "Flash-freezing entire planetary surfaces into eternal ice ages.",
    description: "The supreme relic of the Frost Giants of Jotunheim. Seized by Odin in 965 AD and kept in the Asgardian Vault until Loki discovered his true Frost Giant parentage.",
    phaseIntroduced: 1,
    iconColor: "#0ea5e9",
    backdrop: "/images/artifacts/casket-ancient-winters.jpg",
    history: [
      { phase: 1, year: "965 AD", holder: "odin", holderName: "Odin Borson", location: "Tønsberg / Asgard", event: "Odin secures the Casket to end the Frost Giant war." },
      { phase: 1, year: "2011", holder: "loki", holderName: "Loki", location: "Asgard Vault", event: "Loki opens the Casket, transforming his skin blue and freezing Heimdall." }
    ]
  },
  {
    id: "eternal-flame",
    name: "The Eternal Flame",
    category: "asgardian_weapon",
    origin: "Muspelheim / Surtur's Heart",
    power: "Resurrects dead Asgardian armies; catalyzes the total Ragnarok destruction of Asgard.",
    description: "An unquenchable mystical fire kept in Odin's vault. Used by Hela to revive Fenris and the Berserker army, and later used by Loki to resurrect Surtur to obliterate Hela.",
    phaseIntroduced: 3,
    iconColor: "#f97316",
    backdrop: "/images/artifacts/eternal-flame.jpg",
    history: [
      { phase: 3, year: "2017", holder: "hela", holderName: "Hela (Goddess of Death)", location: "Asgard Vault", event: "Hela plunges the flame into the burial crypt, raising her undead army." },
      { phase: 3, year: "2017", holder: "loki", holderName: "Loki", location: "Asgard Vault", event: "Loki places Surtur's crown into the flame, fulfilling the prophecy of Ragnarok." }
    ]
  },

  {
    id: "vibranium-shield",
    name: "Captain America's Shield",
    category: "wakandan_tech",
    origin: "Howard Stark / SSR / Wakandan Vibranium",
    power: "Total kinetic energy absorption, aerodynamic ricochet, indestructible blunt force.",
    description: "Constructed by Howard Stark using the rarest metal on Earth, vibranium. Handed down from Steve Rogers to Sam Wilson as the immortal symbol of liberty.",
    phaseIntroduced: 1,
    iconColor: "#38bdf8",
    backdrop: "/images/artifacts/vibranium-shield.jpg",
    history: [
      { phase: 1, year: "1943", holder: "captain-america", holderName: "Steve Rogers", location: "SSR Secret Lab", event: "Chosen by Steve Rogers during Howard Stark's weapons showcase." },
      { phase: 3, year: "2019", holder: "captain-america", holderName: "Old Man Steve Rogers", location: "Timeline Bank", event: "Steve Rogers passes the shield to Sam Wilson." },
      { phase: 4, year: "2024", holder: "sam-wilson", holderName: "Sam Wilson (Captain America)", location: "New York City", event: "Sam accepts the shield and mantle of Captain America." }
    ]
  },
  {
    id: "arc-reactor",
    name: "Tony Stark's Arc Reactor",
    category: "cosmic_technology",
    origin: "Stark Industries / Afghanistan Cave",
    power: "Clean multi-gigajoule fusion energy output, repulsor cannon channeling, chest unibeam.",
    description: "Miniaturized by Tony Stark in a cave to prevent shrapnel from piercing his heart. Evolved from palladium core to synthetic new element, powering all Iron Man armors.",
    phaseIntroduced: 1,
    iconColor: "#06b6d4",
    backdrop: "/images/artifacts/arc-reactor.jpg",
    history: [
      { phase: 1, year: "2008", holder: "iron-man", holderName: "Tony Stark", location: "Afghanistan Cave", event: "Built Mark 1 reactor with Yinsen to power the escape armor." },
      { phase: 2, year: "2010", holder: "iron-man", holderName: "Tony Stark", location: "Malibu Lab", event: "Synthesized Howard Stark's new vibranium-substitute element." },
      { phase: 3, year: "2019", holder: "iron-man", holderName: "Tony Stark", location: "Earth-616", event: "Died with reactor glowing: 'Proof That Tony Stark Has A Heart'." }
    ]
  },
  {
    id: "heart-shaped-herb",
    name: "The Heart-Shaped Herb",
    category: "wakandan_tech",
    origin: "Wakanda / Bast the Panther Goddess",
    power: "Superhuman strength, heightened speed, ancestral plane spiritual connection.",
    description: "A mutated plant enriched by the vibranium meteorite crash. Bestows the physical blessings of the Panther Goddess. Burned by Killmonger and synthetically recreated by Shuri.",
    phaseIntroduced: 3,
    iconColor: "#a855f7",
    backdrop: "/images/artifacts/heart-shaped-herb.jpg",
    history: [
      { phase: 3, year: "2016", holder: "t-challa", holderName: "T'Challa (Black Panther)", location: "Birnin Zana", event: "Consumes the herb to enter the Ancestral Plane and speak with T'Chaka." },
      { phase: 3, year: "2016", holder: "killmonger", holderName: "Erik Killmonger", location: "Hall of Kings", event: "Consumes the herb and orders the entire garden set ablaze." },
      { phase: 4, year: "2025", holder: "shuri", holderName: "Shuri (Black Panther)", location: "Mount Bashenga", event: "Synthesizes the herb using Namor's vibranium bracelet, gaining the mantle." }
    ]
  },
  {
    id: "vibranium-habit",
    name: "Panther Habit (Nanotech Vibranium Suit)",
    category: "wakandan_tech",
    origin: "Wakanda Design Group / Shuri",
    power: "Kinetic energy absorption, concussive pulse redirection, silent movement, claws.",
    description: "Designed by Princess Shuri. Encased in a tooth necklace that weaves vibranium nanites over the wearer instantly, absorbing kinetic impacts and re-emitting them in devastating purple concussive blasts.",
    phaseIntroduced: 3,
    iconColor: "#c084fc",
    backdrop: "/images/artifacts/vibranium-habit.jpg",
    history: [
      { phase: 3, year: "2016", holder: "t-challa", holderName: "T'Challa", location: "Busan, South Korea", event: "Field-tests kinetic pulse absorption during car chase." },
      { phase: 4, year: "2025", holder: "shuri", holderName: "Shuri", location: "Atlantic Ocean", event: "Customized gold-accented habit used to defeat Namor." }
    ]
  },

  {
    id: "cloak-of-levitation",
    name: "Cloak of Levitation",
    category: "mystic_relic",
    origin: "Kamar-Taj / New York Sanctum",
    power: "Sentient flight, defensive shield deflection, grappling combat assistance.",
    description: "A sentient crimson cape that chooses its master. Saved Doctor Strange's life in the New York Sanctum and patched together with Darkhold demonic threads during multiversal incursions.",
    phaseIntroduced: 3,
    iconColor: "#e11d48",
    backdrop: "/images/artifacts/cloak-of-levitation.jpg",
    history: [
      { phase: 3, year: "2016", holder: "doctor-strange", holderName: "Doctor Strange", location: "New York Sanctum", event: "The Cloak chooses Strange and wraps around Kaecilius's zealots." },
      { phase: 3, year: "2018", holder: "doctor-strange", holderName: "Doctor Strange", location: "Titan", event: "Flies solo to pin Thanos's Infinity Gauntlet shut during ambush." },
      { phase: 4, year: "2024", holder: "doctor-strange", holderName: "Doctor Strange", location: "Mount Wundagore", event: "Transformed into the Cloak of the Damned using tormented souls." }
    ]
  },
  {
    id: "sling-ring",
    name: "Master's Sling Ring",
    category: "mystic_relic",
    origin: "Masters of the Mystic Arts / Kamar-Taj",
    power: "Dimensional portal generation across Earth, the Multiverse, and the Mirror Dimension.",
    description: "Two-finger mystical bands required by sorcerers to visualize and open dimensional gateways. Allowed the sorcerers to mobilize armies from Titan, Wakanda, and Asgard in Endgame.",
    phaseIntroduced: 3,
    iconColor: "#f59e0b",
    backdrop: "/images/artifacts/sling-ring.jpg",
    history: [
      { phase: 3, year: "2016", holder: "doctor-strange", holderName: "Doctor Strange", location: "Mount Everest", event: "Strange overcomes his nerve damage to conjure his very first portal." },
      { phase: 3, year: "2023", holder: "wong", holderName: "Wong & Masters of Mystic Arts", location: "Avengers Compound", event: "Wong opens dozens of portals across the cosmos: 'Is that everyone?'" },
      { phase: 4, year: "2024", holder: "ned-leeds", holderName: "Ned Leeds", location: "Queens, NY", event: "Ned accidentally summons Spider-Man variants (Tobey & Andrew)." }
    ]
  },
  {
    id: "yaka-arrow",
    name: "Yaka Arrow & Control Fin",
    category: "cosmic_technology",
    origin: "Centauri IV / Yondu Udonta",
    power: "Whistle-controlled acoustic anti-gravitational speed; pierces starship hull armor.",
    description: "A needle-sharp arrow forged from sound-sensitive Yaka metal. Controlled by high-frequency whistles through a neural cybernetic head-fin. Wielded by Yondu to wipe out entire platoons of Ravager mutineers.",
    phaseIntroduced: 2,
    iconColor: "#ef4444",
    backdrop: "/images/artifacts/yaka-arrow.jpg",
    history: [
      { phase: 2, year: "2014", holder: "yondu", holderName: "Yondu Udonta", location: "Xandar", event: "Yondu whistles down a squadron of Sakaaran necrocraft." },
      { phase: 3, year: "2014", holder: "yondu", holderName: "Yondu Udonta", location: "Eclector Spaceship", event: "Yondu and Rocket slaughter Taserface's mutineer crew in legendary slow-motion." },
      { phase: 5, year: "2026", holder: "kraglin", holderName: "Kraglin Obfonteri", location: "Knowhere", event: "Kraglin masters the whistle fin to save Knowhere residents from the High Evolutionary." }
    ]
  },
  {
    id: "ebony-blade",
    name: "The Ebony Blade",
    category: "dark_magic",
    origin: "Camelot / Star-Knight Legacy",
    power: "Pierces any mystical barrier, deflects energy, feeds upon blood and corrupts wielder with madness.",
    description: "An enchanted meteoric blade carved for Sir Percy of Scandia, cursed to corrupt its wielder with inner darkness: 'Death is my reward.' Inherited by Dane Whitman under the watchful eye of Blade.",
    phaseIntroduced: 4,
    iconColor: "#475569",
    backdrop: "/images/artifacts/ebony-blade.jpg",
    history: [
          {
                "phase": 4,
                "year": "2024",
                "holder": "dane-whitman",
                "holderName": "Dane Whitman (Black Knight)",
                "location": "London",
                "event": "Dane unseals the ancient chest containing the Ebony Blade, whispered to by Blade."
          }
    ]
  },
  {
    id: "gungnir",
    name: "Gungnir (Spear of Heaven)",
    category: "asgardian_weapon",
    origin: "Asgard Royal Treasury / Uru Forges",
    power: "Channels divine Odinforce, commands the Destroyer automaton, opens the Bifrost Bridge.",
    description: "The royal symbol of Asgardian sovereignty carried by King Bor, King Odin, and King Thor. Capable of firing lethal blasts of pure cosmic Odinforce and directing the ancient Asgardian vault guardians.",
    phaseIntroduced: 1,
    iconColor: "#eab308",
    backdrop: "/images/artifacts/gungnir.jpg",
    history: [
          {
                "phase": 1,
                "year": "965 AD",
                "holder": "odin",
                "holderName": "Odin Borson",
                "location": "Tønsberg, Norway",
                "event": "Odin leads Asgardian forces to repel the Frost Giants."
          },
          {
                "phase": 1,
                "year": "2011",
                "holder": "loki",
                "holderName": "Loki (Regent of Asgard)",
                "location": "Asgard Throne Room",
                "event": "Loki assumes the throne and commands the Destroyer to Earth."
          },
          {
                "phase": 3,
                "year": "2017",
                "holder": "thor",
                "holderName": "Thor Odinson",
                "location": "Asgard Palace",
                "event": "Thor dual-wields Gungnir against Hela during the Siege of Asgard."
          }
    ]
  },
  {
    id: "hofund",
    name: "Hofund (The Bifrost Sword)",
    category: "asgardian_weapon",
    origin: "Asgard / Heimdall's Vigil",
    power: "Unlocks and channels the cosmic Bifrost Bridge across the Nine Realms; senses all souls in creation.",
    description: "An enchanted broadsword wielded by Heimdall the all-seeing. Served as the physical key to activate the Bifrost portal at Himinbjorg, and later hid the survivors of Asgard from Hela's slaughter.",
    phaseIntroduced: 1,
    iconColor: "#38bdf8",
    backdrop: "/images/artifacts/hofund.jpg",
    history: [
          {
                "phase": 1,
                "year": "2011",
                "holder": "heimdall",
                "holderName": "Heimdall",
                "location": "Himinbjorg",
                "event": "Heimdall turns Hofund to beam Thor and the Warriors Three across realms."
          },
          {
                "phase": 3,
                "year": "2017",
                "holder": "heimdall",
                "holderName": "Heimdall",
                "location": "Asgardian Stronghold",
                "event": "Heimdall steals Hofund to deny Hela access to the Nine Realms."
          },
          {
                "phase": 3,
                "year": "2018",
                "holder": "heimdall",
                "holderName": "Heimdall",
                "location": "Statesman Spaceship",
                "event": "With his dying breath, Heimdall calls upon Dark Magic to send Hulk to Earth."
          }
    ]
  },
  {
    id: "time-loom",
    name: "The Temporal Loom",
    category: "cosmic_technology",
    origin: "TVA Core / He Who Remains",
    power: "Weaves raw temporal radiation into stable timelines; failsafe pruning mechanism against branching multiverse.",
    description: "The monumental temporal reactor at the center of the TVA, engineered by He Who Remains to condense infinite multiverse branches into the Sacred Timeline. Loki sacrificed his freedom to replace the Loom and become the living God of Stories.",
    phaseIntroduced: 5,
    iconColor: "#10b981",
    backdrop: "/images/artifacts/time-loom.jpg",
    history: [
          {
                "phase": 5,
                "year": "Timeless",
                "holder": "victor-timely",
                "holderName": "Victor Timely & O.B.",
                "location": "TVA Core",
                "event": "Timely steps onto the gangway to expand the Loom's throughput ring."
          },
          {
                "phase": 5,
                "year": "Timeless",
                "holder": "loki",
                "holderName": "Loki (God of Stories)",
                "location": "End of Time",
                "event": "Loki shatters the Loom, grasping the dying timelines and weaving the World Tree of Yggdrasil."
          }
    ]
  },
  {
    id: "super-soldier-serum",
    name: "Erskine Super Soldier Serum",
    category: "cosmic_technology",
    origin: "Dr. Abraham Erskine / SSR / Project Rebirth",
    power: "Enhances human physiology to the absolute pinnacle of strength, speed, durability, and mental acuity.",
    description: "The miracle formula synthesized by German scientist Abraham Erskine. Amplifies everything inside a subject: 'Good becomes great. Bad becomes worse.' Created Captain America, the Winter Soldier, and Red Skull.",
    phaseIntroduced: 1,
    iconColor: "#0284c7",
    backdrop: "/images/artifacts/super-soldier-serum.jpg",
    history: [
          {
                "phase": 1,
                "year": "1943",
                "holder": "steve-rogers",
                "holderName": "Steve Rogers (SSR)",
                "location": "Brooklyn Secret Lab",
                "event": "Erskine successfully administers the serum to Steve Rogers."
          },
          {
                "phase": 3,
                "year": "1991",
                "holder": "hydra",
                "holderName": "Winter Soldier / Hydra",
                "location": "Long Island",
                "event": "Bucky Barnes assassinates Howard Stark to steal five serum vials."
          },
          {
                "phase": 4,
                "year": "2024",
                "holder": "john-walker",
                "holderName": "John Walker (U.S. Agent)",
                "location": "Riga, Latvia",
                "event": "Walker secretly ingests Dr. Nagel's refined serum vial."
          }
    ]
  },
  {
    id: "quantum-gps",
    name: "Stark Quantum Space-Time GPS",
    category: "cosmic_technology",
    origin: "Tony Stark / Mobius Strip Simulation",
    power: "Enables precise temporal coordinates navigation through the Quantum Realm without Planck scale lostness.",
    description: "Invented overnight by Tony Stark after modeling a continuous inverted Möbius strip. Allowed the surviving Avengers to execute the Time Heist across 2012 New York, 2013 Asgard, and 2014 Morag.",
    phaseIntroduced: 3,
    iconColor: "#f43f5e",
    backdrop: "/images/artifacts/quantum-gps.jpg",
    history: [
          {
                "phase": 3,
                "year": "2023",
                "holder": "iron-man",
                "holderName": "Tony Stark & Avengers",
                "location": "Avengers Compound",
                "event": "Stark manufactures wrist-mounted GPS units for all 11 Time Heist members."
          },
          {
                "phase": 3,
                "year": "2023",
                "holder": "steve-rogers",
                "holderName": "Steve Rogers",
                "location": "Quantum Pad",
                "event": "Cap uses his GPS to return all six Infinity Stones and live out his life with Peggy."
          }
    ]
  },
  {
    id: "edith-glasses",
    name: "E.D.I.T.H. Tactical Glasses",
    category: "cosmic_technology",
    origin: "Tony Stark / Stark Industries Defense Satellite",
    power: "Full command over orbital drone fleets, global surveillance, biometric eavesdropping, weaponized strikes.",
    description: "Created by Tony Stark ('Even Dead, I'm The Hero') and bequeathed to Peter Parker. Hijacked by Quentin Beck (Mysterio) to create massive elemental holographic illusions in London.",
    phaseIntroduced: 3,
    iconColor: "#38bdf8",
    backdrop: "/images/artifacts/edith-glasses.jpg",
    history: [
          {
                "phase": 3,
                "year": "2024",
                "holder": "spider-man",
                "holderName": "Peter Parker (Spider-Man)",
                "location": "Venice, Italy",
                "event": "Nick Fury (Talos) delivers Tony's glasses to Peter."
          },
          {
                "phase": 3,
                "year": "2024",
                "holder": "mysterio",
                "holderName": "Quentin Beck (Mysterio)",
                "location": "Prague",
                "event": "Beck deceives Peter into transferring ownership of EDITH."
          },
          {
                "phase": 3,
                "year": "2024",
                "holder": "spider-man",
                "holderName": "Peter Parker",
                "location": "Tower Bridge, London",
                "event": "Peter breaks through the illusion and shuts down the drone swarm."
          }
    ]
  },
  {
    id: "cosmi-rod",
    name: "Universal Weapon (Cosmi-Rod)",
    category: "cosmic_technology",
    origin: "Kree Empire / Accuser Corps",
    power: "Concussive kinetic blasts, force-field manipulation, infused with the Power Stone to destroy planets.",
    description: "The ceremonial warhammer of the Kree Accusers, wielded by Ronan the Accuser. Capable of disintegrating enemies on contact; briefly wielded the purple Power Stone to challenge Thanos.",
    phaseIntroduced: 2,
    iconColor: "#a855f7",
    backdrop: "/images/artifacts/cosmi-rod.jpg",
    history: [
          {
                "phase": 2,
                "year": "2014",
                "holder": "ronan",
                "holderName": "Ronan the Accuser",
                "location": "Dark Aster",
                "event": "Ronan embeds the Power Stone into the Cosmi-Rod hammerhead."
          },
          {
                "phase": 2,
                "year": "2014",
                "holder": "guardians",
                "holderName": "Rocket Raccoon & Star-Lord",
                "location": "Xandar",
                "event": "Rocket shoots the Cosmi-Rod with the Hadron Enforcer, shattering it."
          }
    ]
  },
  {
    id: "hadron-enforcer",
    name: "The Hadron Enforcer",
    category: "cosmic_technology",
    origin: "Rocket Raccoon / Knowhere Scrapyard",
    power: "Fires concentrated hadron particle charges capable of annihilating moons and battleships.",
    description: "Built by Rocket Raccoon from scrap parts in a Knowhere workshop. Fired by Drax to shatter Ronan's Cosmi-Rod on Xandar.",
    phaseIntroduced: 2,
    iconColor: "#f97316",
    backdrop: "/images/artifacts/hadron-enforcer.jpg",
    history: [
          {
                "phase": 2,
                "year": "2014",
                "holder": "guardians",
                "holderName": "Rocket Raccoon & Drax",
                "location": "Dark Aster / Xandar",
                "event": "Drax fires directly into Ronan's chest, shattering the Cosmi-Rod."
          }
    ]
  },
  {
    id: "staff-living-tribunal",
    name: "Staff of the Living Tribunal",
    category: "mystic_relic",
    origin: "Kamar-Taj Vaults / Living Tribunal Legacy",
    power: "Extends into a flaming bladed segmented flail, disarming mystical energy and physical attackers.",
    description: "A relic that chose Karl Mordo during his sorcery apprenticeship at Kamar-Taj. Capable of segmented physical extension into an enchanted energy flail.",
    phaseIntroduced: 3,
    iconColor: "#f59e0b",
    backdrop: "/images/artifacts/staff-living-tribunal.jpg",
    history: [
          {
                "phase": 3,
                "year": "2016",
                "holder": "baron-mordo",
                "holderName": "Karl Mordo",
                "location": "Kamar-Taj / London Sanctum",
                "event": "Mordo trains Strange and uses the staff against Kaecilius's zealots."
          }
    ]
  },
  {
    id: "boots-of-valtorr",
    name: "Vaulting Boots of Valtorr",
    category: "mystic_relic",
    origin: "Dimension of Valtorr / Kamar-Taj",
    power: "Enables multi-tiered aerial leaps across mid-air force platforms and high-velocity deceleration.",
    description: "Enchanted boots that allow sorcerers to bound across open air by creating solid mystical steps with every footfall.",
    phaseIntroduced: 3,
    iconColor: "#10b981",
    backdrop: "/images/artifacts/boots-of-valtorr.jpg",
    history: [
          {
                "phase": 3,
                "year": "2016",
                "holder": "baron-mordo",
                "holderName": "Karl Mordo",
                "location": "Mirror Dimension / London",
                "event": "Mordo uses the boots to leap across shifting skyscraper facades."
          }
    ]
  },
  {
    id: "iron-spider-harness",
    name: "Stark Iron Spider Armor & Waldoes",
    category: "cosmic_technology",
    origin: "Tony Stark / Stark Industries Nanotech",
    power: "Deployable arachnid nanotech legs (waldoes), self-contained environmental life support, instant kill mode.",
    description: "Advanced nanotech suit presented to Peter Parker. Equipped with four articulated spider legs for climbing and combat stabilization, oxygen recycling for deep space combat, and defensive web parachutes.",
    phaseIntroduced: 3,
    iconColor: "#e11d48",
    backdrop: "/images/artifacts/iron-spider-harness.jpg",
    history: [
          {
                "phase": 3,
                "year": "2018",
                "holder": "spider-man",
                "holderName": "Peter Parker",
                "location": "Q-Ship / Titan",
                "event": "Tony deploys the suit via orbital pod to save Peter as he suffocates in high atmosphere."
          },
          {
                "phase": 3,
                "year": "2019",
                "holder": "spider-man",
                "holderName": "Peter Parker",
                "location": "Avengers Compound",
                "event": "Peter activates Instant Kill mode while protecting the Nano Gauntlet."
          }
    ]
  },
  {
    id: "hulkbuster-armor",
    name: "Mark 44 Hulkbuster (Veronica)",
    category: "ironman_armor",
    origin: "Tony Stark & Bruce Banner / Orbital Satellite Veronica",
    power: "Hydraulic impact punches, sedatives, multi-part automated repair pods, repulsor cages.",
    description: "A colossal modular armor system co-developed by Stark and Banner to subdue an out-of-control Hulk. Deployed from the orbital Veronica satellite with in-flight replacement limb pods.",
    phaseIntroduced: 2,
    iconColor: "#dc2626",
    backdrop: "/images/artifacts/hulkbuster-armor.jpg",
    history: [
          {
                "phase": 2,
                "year": "2015",
                "holder": "iron-man",
                "holderName": "Tony Stark",
                "location": "Johannesburg",
                "event": "Subdues a mind-warped Hulk rampaging through the financial district."
          },
          {
                "phase": 3,
                "year": "2018",
                "holder": "hulk",
                "holderName": "Bruce Banner",
                "location": "Wakanda",
                "event": "Banner pilots the Mark 48 Hulkbuster to destroy Cull Obsidian."
          }
    ]
  },
  {
    id: "vibranium-arm",
    name: "Bucky's Vibranium Cybernetic Arm",
    category: "wakandan_tech",
    origin: "Wakanda Design Group / Shuri",
    power: "Superhuman crushing grip, kinetic shock deflection, failsafe override decoupling.",
    description: "Gifted to Bucky Barnes by King T'Challa and Shuri to replace his Soviet titanium arm. Forged from pure vibranium with interlocking gold filament accents.",
    phaseIntroduced: 3,
    iconColor: "#a855f7",
    backdrop: "/images/artifacts/vibranium-arm.jpg",
    history: [
          {
                "phase": 3,
                "year": "2018",
                "holder": "winter-soldier",
                "holderName": "Bucky Barnes (White Wolf)",
                "location": "Wakanda",
                "event": "T'Challa presents Bucky with his new vibranium arm before the Outrider invasion."
          },
          {
                "phase": 4,
                "year": "2024",
                "holder": "winter-soldier",
                "holderName": "Bucky Barnes",
                "location": "Madripoor",
                "event": "Ayo disarms Bucky by pressing pressure points on his shoulder release."
          }
    ]
  },
  {
    id: "dragon-scale-armor",
    name: "Great Protector Dragon Scale Armor",
    category: "mystic_relic",
    origin: "Ta Lo / The Great Protector Dragon",
    power: "Immunity to soul-sucking dark magic, elemental wind redirection, extreme concussive resistance.",
    description: "Armor and weaponry crafted by the people of Ta Lo using shed scales of the benevolent Great Protector dragon. Provided Shang-Chi with the spiritual durability to withstand the Dweller-in-Darkness.",
    phaseIntroduced: 4,
    iconColor: "#dc2626",
    backdrop: "/images/artifacts/dragon-scale-armor.jpg",
    history: [
          {
                "phase": 4,
                "year": "2024",
                "holder": "shang-chi",
                "holderName": "Shang-Chi & Xialing",
                "location": "Ta Lo",
                "event": "Worn during the defense of the Dark Gate against the soul-eaters."
          }
    ]
  },
  {
    id: "celestial-seed",
    name: "Ego's Expansion Seed",
    category: "cosmic_technology",
    origin: "Ego the Living Planet / Celestial Genesis",
    power: "Terraforms entire planetary biospheres into extensions of Ego's Celestial consciousness.",
    description: "Biological Celestial seedling planted across thousands of inhabited worlds by Ego. Nearly consumed Earth during the expansion before being detonated by Baby Groot.",
    phaseIntroduced: 2,
    iconColor: "#3b82f6",
    backdrop: "/images/artifacts/celestial-seed.jpg",
    history: [
          {
                "phase": 2,
                "year": "2014",
                "holder": "ego",
                "holderName": "Ego the Living Planet",
                "location": "Missouri / Thousands of Worlds",
                "event": "Ego activates the seedlings, causing massive Celestial blooms across the galaxy."
          }
    ]
  },
  {
    id: "iron-man-mark-1",
    name: "Iron Man Mark I (Cave Prototype)",
    category: "ironman_armor",
    origin: "Afghanistan Cave / Ten Rings Scrap Metal",
    power: "Flamethrowers, crude rocket boosters, bullet-resistant iron-copper plating.",
    description: "Built secretly in a cave with scrap parts from Jericho missiles alongside Ho Yinsen. Powered by Tony's first miniaturized Arc Reactor, allowing Stark to blast out of Ten Rings captivity.",
    phaseIntroduced: 1,
    iconColor: "#78716c",
    backdrop: "/images/artifacts/iron-man-mark-1.jpg",
    history: [
          {
                "phase": 1,
                "year": "2008",
                "holder": "iron-man",
                "holderName": "Tony Stark",
                "location": "Afghanistan Cave",
                "event": "Stark and Yinsen construct the Mark I to escape the Ten Rings."
          },
          {
                "phase": 1,
                "year": "2008",
                "holder": "obadiah-stane",
                "holderName": "Obadiah Stane / Ten Rings",
                "location": "Afghanistan Desert",
                "event": "Stane recovers the wrecked Mark I chassis to engineer the Iron Monger."
          }
    ]
  },
  {
    id: "iron-man-mark-2",
    name: "Iron Man Mark II (Silver Prototype)",
    category: "ironman_armor",
    origin: "Malibu Mansion Workshop / J.A.R.V.I.S.",
    power: "Supersonic flight, streamlined aerodynamics, complete HUD integration, flap air-braking.",
    description: "The sleek unpainted chrome-silver prototype tested by Tony over Santa Monica. Achieved Mach speed before encountering high-altitude icing, and later confiscated by Rhodey to become War Machine.",
    phaseIntroduced: 1,
    iconColor: "#94a3b8",
    backdrop: "/images/artifacts/iron-man-mark-2.jpg",
    history: [
          {
                "phase": 1,
                "year": "2008",
                "holder": "iron-man",
                "holderName": "Tony Stark",
                "location": "Malibu, California",
                "event": "Stark breaks the SR-71 Blackbird altitude record on maiden flight."
          },
          {
                "phase": 2,
                "year": "2010",
                "holder": "war-machine",
                "holderName": "James Rhodes",
                "location": "Edwards Air Force Base",
                "event": "Rhodey confiscates the suit, which Hammer weaponizes into War Machine Mark I."
          }
    ]
  },
  {
    id: "iron-man-mark-3",
    name: "Iron Man Mark III (Gold-Titanium)",
    category: "ironman_armor",
    origin: "Malibu Workshop / Gold-Titanium Alloy",
    power: "Palms & chest repulsors, shoulder anti-tank micro-missiles, forearm rockets, hot-rod paint.",
    description: "Tony's signature red-and-gold battle suit forged from a gold-titanium satellite alloy to solve the icing problem. Used to liberate Gulmira and destroy Obadiah Stane's Iron Monger.",
    phaseIntroduced: 1,
    iconColor: "#dc2626",
    backdrop: "/images/artifacts/iron-man-mark-3.jpg",
    history: [
          {
                "phase": 1,
                "year": "2008",
                "holder": "iron-man",
                "holderName": "Tony Stark",
                "location": "Gulmira, Afghanistan",
                "event": "Stark decimates Ten Rings warlord artillery and tanks."
          },
          {
                "phase": 1,
                "year": "2008",
                "holder": "iron-man",
                "holderName": "Tony Stark",
                "location": "Stark Industries Arc Reactor",
                "event": "Stark overloads the factory reactor to incinerate the Iron Monger."
          }
    ]
  },
  {
    id: "iron-man-mark-5",
    name: "Iron Man Mark V (Suitcase Armor)",
    category: "ironman_armor",
    origin: "Stark Industries Portable R&D",
    power: "Rapid deployment from a red briefcase, lightweight interlocking titanium scales.",
    description: "An ultra-portable emergency suit compressed into a red briefcase ('the Football'). Deployed on the racetrack at Monaco when Whiplash ambushed Tony with electric plasma whips.",
    phaseIntroduced: 1,
    iconColor: "#ef4444",
    backdrop: "/images/artifacts/iron-man-mark-5.jpg",
    history: [
          {
                "phase": 1,
                "year": "2010",
                "holder": "iron-man",
                "holderName": "Tony Stark",
                "location": "Circuit de Monaco",
                "event": "Happy and Pepper throw Tony the briefcase armor to defeat Whiplash."
          }
    ]
  },
  {
    id: "iron-man-mark-6",
    name: "Iron Man Mark VI (Triangular Core)",
    category: "ironman_armor",
    origin: "Malibu Workshop / Synthetic New Element",
    power: "Triangular chest unibeam, high-output single-use red lasers, Thor-lightning energy absorption.",
    description: "Engineered around Tony's synthetic vibranium-substitute element to cure his blood toxicity. Features a triangular chest reactor and single-use 200-petawatt laser pods that slice through Hammer drones.",
    phaseIntroduced: 1,
    iconColor: "#e11d48",
    backdrop: "/images/artifacts/iron-man-mark-6.jpg",
    history: [
          {
                "phase": 1,
                "year": "2010",
                "holder": "iron-man",
                "holderName": "Tony Stark",
                "location": "Flushing Meadows, NY",
                "event": "Stark and Rhodey execute the synchronized repulsor blast against Whiplash."
          },
          {
                "phase": 1,
                "year": "2012",
                "holder": "iron-man",
                "holderName": "Tony Stark",
                "location": "Stuttgart / Helicarrier",
                "event": "Absorbs Thor's lightning to 475% capacity and repairs the Helicarrier rotor."
          }
    ]
  },
  {
    id: "iron-man-mark-7",
    name: "Iron Man Mark VII (New York Vanguard)",
    category: "ironman_armor",
    origin: "Stark Tower / Rapid Deployment Pod",
    power: "Rapid mid-air lock-on deployment, triple-laser pods, micro-missile arrays, heavy booster pack.",
    description: "A heavy combat armor housed inside an automated tracking capsule that locks onto wrist beacons. Deployed when Loki hurled Tony from the Stark Tower penthouse, leading the Battle of New York.",
    phaseIntroduced: 1,
    iconColor: "#b91c1c",
    backdrop: "/images/artifacts/iron-man-mark-7.jpg",
    history: [
          {
                "phase": 1,
                "year": "2012",
                "holder": "iron-man",
                "holderName": "Tony Stark",
                "location": "Stark Tower, NYC",
                "event": "Locks onto falling Tony in mid-air and catches him feet from the pavement."
          },
          {
                "phase": 1,
                "year": "2012",
                "holder": "iron-man",
                "holderName": "Tony Stark",
                "location": "Chitauri Wormhole",
                "event": "Stark carries the nuclear missile through the wormhole into deep space."
          }
    ]
  },
  {
    id: "iron-man-mark-42",
    name: "Iron Man Mark XLII (The Prodigal Son)",
    category: "ironman_armor",
    origin: "Malibu Mansion / Subcutaneous Micro-Transponders",
    power: "Prehensile autonomous propulsion, remote telepresence piloting, piece-by-piece magnetic bonding.",
    description: "An autonomous prehensile suit with micro-chips implanted under Tony's skin, allowing individual armor components to fly across continents and assemble onto him or others.",
    phaseIntroduced: 2,
    iconColor: "#facc15",
    backdrop: "/images/artifacts/iron-man-mark-42.jpg",
    history: [
          {
                "phase": 2,
                "year": "2013",
                "holder": "iron-man",
                "holderName": "Tony Stark",
                "location": "Air Force One Airspace",
                "event": "Tony remotely executes 'Barrel of Monkeys' to save 13 falling passengers."
          },
          {
                "phase": 2,
                "year": "2013",
                "holder": "iron-man",
                "holderName": "Tony Stark & Pepper Potts",
                "location": "Norco Oil Tanker",
                "event": "Traps Aldrich Killian inside the suit and initiates self-destruct protocol."
          }
    ]
  },
  {
    id: "iron-man-mark-46",
    name: "Iron Man Mark XLVI (Civil War Armor)",
    category: "ironman_armor",
    origin: "Avengers Compound / F.R.I.D.A.Y. AI",
    power: "Collapsible helmet within collarbone, 28 miniature arc reactors, sonar cannons, fight-pattern analyzer.",
    description: "Equipped with a fully retractable helmet and Friday's combat analysis algorithm. Featured in the Leipzig Airport battle and the climactic clash with Steve Rogers and Bucky Barnes in Siberia.",
    phaseIntroduced: 3,
    iconColor: "#be123c",
    backdrop: "/images/artifacts/iron-man-mark-46.jpg",
    history: [
          {
                "phase": 3,
                "year": "2016",
                "holder": "iron-man",
                "holderName": "Tony Stark",
                "location": "Leipzig/Halle Airport",
                "event": "Leads Team Iron Man to intercept Cap and the rogue Avengers."
          },
          {
                "phase": 3,
                "year": "2016",
                "holder": "iron-man",
                "holderName": "Tony Stark",
                "location": "Siberian Hydra Bunker",
                "event": "Friday analyzes Cap's fight pattern: 'Let's kick his ass.'"
          }
    ]
  },
  {
    id: "iron-man-mark-50",
    name: "Iron Man Mark L (Bleeding Edge Nanotech)",
    category: "ironman_armor",
    origin: "Chest RT Unit / Stark Nanotechnology",
    power: "Instantaneous shapeshifting weaponry, energy shields, foot clamps, hyper-velocity thrusters.",
    description: "Composed entirely of billions of nanoparticles stored inside the chest housing. Capable of instant re-materialization into energy blades, power blasters, and shields, drawing a drop of blood from Thanos on Titan.",
    phaseIntroduced: 3,
    iconColor: "#dc2626",
    backdrop: "/images/artifacts/iron-man-mark-50.jpg",
    history: [
          {
                "phase": 3,
                "year": "2018",
                "holder": "iron-man",
                "holderName": "Tony Stark",
                "location": "Greenwich Village, NYC",
                "event": "Tony taps his chest housing to manifest nanotech armor against Cull Obsidian."
          },
          {
                "phase": 3,
                "year": "2018",
                "holder": "iron-man",
                "holderName": "Tony Stark",
                "location": "Titan",
                "event": "Duels Thanos single-handedly: 'All that for a drop of blood.'"
          }
    ]
  },
  {
    id: "iron-man-mark-85",
    name: "Iron Man Mark LXXXV (The Endgame Masterpiece)",
    category: "ironman_armor",
    origin: "Stark Eco-Cabin / Quantum Avengers Workshop",
    power: "Ultimate nanotech synthesis, energy-reflector lightning shield, Infinity Stone siphon matrix.",
    description: "Tony's magnum opus, blending classic comic book gold arms/legs with advanced nanotech. Integrated the specialized channel matrix that siphoned the six Infinity Stones from the Gauntlet for Tony's universe-saving snap.",
    phaseIntroduced: 3,
    iconColor: "#eab308",
    backdrop: "/images/artifacts/iron-man-mark-85.jpg",
    history: [
          {
                "phase": 3,
                "year": "2023",
                "holder": "iron-man",
                "holderName": "Tony Stark (Iron Man)",
                "location": "Ruined Avengers Compound",
                "event": "Siphons the six Infinity Stones: 'And I... am... Iron Man.'"
          }
    ]
  },
  {
    id: "rescue-armor",
    name: "Rescue Armor (Mark XLIX)",
    category: "ironman_armor",
    origin: "Tony Stark / Anniversary Gift for Pepper Potts",
    power: "Autonomous floating repulsor cannon wings, heavy energy shielding, sub-orbital flight.",
    description: "A sleek cobalt-blue and champagne-gold nanotech armor engineered secretly by Tony as an anniversary gift for Pepper Potts. Equipped with floating autonomous blaster wings for synchronized strikes.",
    phaseIntroduced: 3,
    iconColor: "#2563eb",
    backdrop: "/images/artifacts/rescue-armor.jpg",
    history: [
          {
                "phase": 3,
                "year": "2023",
                "holder": "pepper-potts",
                "holderName": "Pepper Potts (Rescue)",
                "location": "Ruined Avengers Compound",
                "event": "Pepper joins Tony on the battlefield, executing back-to-back repulsor beams."
          }
    ]
  },
  {
    id: "war-machine-armor",
    name: "War Machine Armor (Mark IV)",
    category: "ironman_armor",
    origin: "Stark Industries / U.S. Air Force",
    power: "Shoulder-mounted multi-barrel minigun, micro-missile arrays, sonic cannons, repulsor blasters.",
    description: "Heavy military-grade exoskeleton piloted by Colonel James Rhodes. Packed with heavy ballistic artillery, micro-missile pods, and reinforced titanium-alloy armor.",
    phaseIntroduced: 3,
    iconColor: "#64748b",
    backdrop: "/images/artifacts/war-machine-armor.jpg",
    history: [
          {
                "phase": 3,
                "year": "2018",
                "holder": "war-machine",
                "holderName": "James Rhodes (War Machine)",
                "location": "Wakanda",
                "event": "Rhodey carpet-bombs legions of Outriders with thermal missile pods."
          }
    ]
  }
];

export function getArtifact(id: string): Artifact | undefined {
  return ARTIFACTS.find((a) => a.id === id);
}

export function getArtifactsByCategory(category: ArtifactCategory): Artifact[] {
  return ARTIFACTS.filter((a) => a.category === category);
}

export function getArtifactsByPhase(phase: number): Artifact[] {
  return ARTIFACTS.filter((a) => a.phaseIntroduced <= phase);
}
