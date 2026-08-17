export type ArtifactCategory =
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
  iconColor: string; // hex
  backdrop: string;
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
  // 1. INFINITY STONES
  {
    id: "space-stone",
    name: "The Tesseract (Space Stone)",
    category: "infinity_stone",
    origin: "Pre-Universe Singularity / Asgardian Vault",
    power: "Omnipresent spatial teleportation, portal creation, wormholes across dimensions.",
    description: "Housed inside the glowing crystalline cube known as the Tesseract. Weaponized by Hydra, captured by S.H.I.E.L.D., used by Loki to invade New York, and later shattered by Thanos to claim the blue Space Stone.",
    phaseIntroduced: 1,
    iconColor: "#38bdf8",
    backdrop: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=2560&auto=format&fit=crop",
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
    backdrop: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2560&auto=format&fit=crop",
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
    backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2560&auto=format&fit=crop",
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
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2560&auto=format&fit=crop",
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
    backdrop: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=2560&auto=format&fit=crop",
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
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2560&auto=format&fit=crop",
    history: [
      { phase: 3, year: "2018", holder: "thanos", holderName: "Thanos", location: "Vormir", event: "Thanos sacrifices his daughter Gamora to manifest the Soul Stone." },
      { phase: 3, year: "2023", holder: "hawkeye", holderName: "Clint Barton / Hawkeye", location: "Vormir (2014 Branch)", event: "Natasha Romanoff sacrifices herself, allowing Clint to retrieve the stone." }
    ]
  },

  // 2. GAUNTLETS & COSMIC HARNESSES
  {
    id: "infinity-gauntlet",
    name: "The Infinity Gauntlet",
    category: "cosmic_technology",
    origin: "Nidavellir Forge / Eitri the Dwarf King",
    power: "Harmonizes and harnesses the full omnipotent power of all six Infinity Stones.",
    description: "Forged from enchanted Uru metal on Nidavellir by the dwarf king Eitri under threat from Thanos. Allowed Thanos to execute the cosmic snap that erased fifty percent of all living beings.",
    phaseIntroduced: 3,
    iconColor: "#eab308",
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2560&auto=format&fit=crop",
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
    backdrop: "https://images.unsplash.com/photo-1635863138275-d9b33299680b?q=80&w=2560&auto=format&fit=crop",
    history: [
      { phase: 3, year: "2023", holder: "hulk", holderName: "Smart Hulk", location: "Avengers Compound", event: "Hulk snaps his fingers, resurrecting half of all life in the universe." },
      { phase: 3, year: "2023", holder: "iron-man", holderName: "Tony Stark (Iron Man)", location: "Ruined Avengers Compound", event: "Stark siphons the stones into his Mark 85 armor: 'And I... am... Iron Man.'" }
    ]
  },

  // 3. ANCIENT TOMES & DARK MAGIC
  {
    id: "the-darkhold",
    name: "The Darkhold (Book of the Damned)",
    category: "dark_magic",
    origin: "Mount Wundagore / Chthon the Elder God",
    power: "Dreamwalking across multiverse realities, chaos magic corruption, dark incantations.",
    description: "An ancient tome of chaos magic carved from Mount Wundagore. Corrupts the mind of any reader. Studied by Agatha Harkness in Westview, used by Wanda to dreamwalk across the Multiverse to hunt America Chavez, before being destroyed across all realities.",
    phaseIntroduced: 4,
    iconColor: "#be123c",
    backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2560&auto=format&fit=crop",
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
    backdrop: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=2560&auto=format&fit=crop",
    history: [
      { phase: 4, year: "2024", holder: "defender-strange", holderName: "Defender Strange", location: "Gap Junction", event: "Defender Strange and America Chavez race toward the pedestal to counter demons." },
      { phase: 4, year: "2024", holder: "doctor-strange", holderName: "Doctor Strange & America Chavez", location: "Gap Junction", event: "Strange unlocks the tome, but Wanda dreamwalks in and incinerates the Book." }
    ]
  },

  // 4. MULTIVERSAL & COSMIC TECHNOLOGY
  {
    id: "ten-rings",
    name: "The Ten Rings",
    category: "cosmic_technology",
    origin: "Unknown Ancient Cosmic / Multiversal Beacon",
    power: "Immortality, concussive energy projection, kinetic mastery, emits mysterious cosmic signal.",
    description: "Ten glowing iron bands of unknown alien/multiversal origin discovered by Xu Wenwu a millennium ago. Bestowed upon Shang-Chi, currently sending a beacon to an unknown deep space recipient.",
    phaseIntroduced: 4,
    iconColor: "#06b6d4",
    backdrop: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2560&auto=format&fit=crop",
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
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2560&auto=format&fit=crop",
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
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2560&auto=format&fit=crop",
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
    backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2560&auto=format&fit=crop",
    history: [
      { phase: 4, year: "Timeless", holder: "hunter-b15", holderName: "Hunter B-15 & Minutemen", location: "Gobi Desert", event: "Pruned variant Loki after his escape with the Tesseract." },
      { phase: 4, year: "Timeless", holder: "ravonna-renslayer", holderName: "Judge Ravonna Renslayer", location: "TVA Time Theater", event: "Prunes Mobius and Loki directly to the Void." }
    ]
  },

  // 5. ASGARDIAN & COSMIC GOD WEAPONS
  {
    id: "mjolnir",
    name: "Mjolnir (Enchanted Uru Hammer)",
    category: "asgardian_weapon",
    origin: "Heart of a Dying Star / Asgardian Royal Forge",
    power: "Worthiness enchantment, lightning channeling, flight propulsion, resurrection of Thor.",
    description: "Forged in the heart of a dying star and enchanted by Odin so that 'whosoever holds this hammer, if they be worthy, shall possess the power of Thor.'",
    phaseIntroduced: 1,
    iconColor: "#a855f7",
    backdrop: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2560&auto=format&fit=crop",
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
    backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=2560&auto=format&fit=crop",
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
    backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2560&auto=format&fit=crop",
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
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2560&auto=format&fit=crop",
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
    backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=2560&auto=format&fit=crop",
    history: [
      { phase: 3, year: "2017", holder: "hela", holderName: "Hela (Goddess of Death)", location: "Asgard Vault", event: "Hela plunges the flame into the burial crypt, raising her undead army." },
      { phase: 3, year: "2017", holder: "loki", holderName: "Loki", location: "Asgard Vault", event: "Loki places Surtur's crown into the flame, fulfilling the prophecy of Ragnarok." }
    ]
  },

  // 6. EARTH & WAKANDAN VIBRANIUM
  {
    id: "vibranium-shield",
    name: "Captain America's Shield",
    category: "wakandan_tech",
    origin: "Howard Stark / SSR / Wakandan Vibranium",
    power: "Total kinetic energy absorption, aerodynamic ricochet, indestructible blunt force.",
    description: "Constructed by Howard Stark using the rarest metal on Earth, vibranium. Handed down from Steve Rogers to Sam Wilson as the immortal symbol of liberty.",
    phaseIntroduced: 1,
    iconColor: "#38bdf8",
    backdrop: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?q=80&w=2560&auto=format&fit=crop",
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
    backdrop: "https://images.unsplash.com/photo-1635863138275-d9b33299680b?q=80&w=2560&auto=format&fit=crop",
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
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2560&auto=format&fit=crop",
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
    backdrop: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2560&auto=format&fit=crop",
    history: [
      { phase: 3, year: "2016", holder: "t-challa", holderName: "T'Challa", location: "Busan, South Korea", event: "Field-tests kinetic pulse absorption during car chase." },
      { phase: 4, year: "2025", holder: "shuri", holderName: "Shuri", location: "Atlantic Ocean", event: "Customized gold-accented habit used to defeat Namor." }
    ]
  },

  // 7. MYSTIC RELICS & SANCTUM SANCTORUM
  {
    id: "cloak-of-levitation",
    name: "Cloak of Levitation",
    category: "mystic_relic",
    origin: "Kamar-Taj / New York Sanctum",
    power: "Sentient flight, defensive shield deflection, grappling combat assistance.",
    description: "A sentient crimson cape that chooses its master. Saved Doctor Strange's life in the New York Sanctum and patched together with Darkhold demonic threads during multiversal incursions.",
    phaseIntroduced: 3,
    iconColor: "#e11d48",
    backdrop: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=2560&auto=format&fit=crop",
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
    backdrop: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2560&auto=format&fit=crop",
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
    backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=2560&auto=format&fit=crop",
    history: [
      { phase: 2, year: "2014", holder: "yondu", holderName: "Yondu Udonta", location: "Xandar", event: "Yondu whistles down a squadron of Sakaaran necrocraft." },
      { phase: 3, year: "2014", holder: "yondu", holderName: "Yondu Udonta", location: "Eclector Spaceship", event: "Yondu and Rocket slaughter Taserface's mutineer crew in legendary slow-motion." },
      { phase: 5, year: "2026", holder: "kraglin", holderName: "Kraglin Obfonteri", location: "Knowhere", event: "Kraglin masters the whistle fin to save Knowhere residents from the High Evolutionary." }
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
