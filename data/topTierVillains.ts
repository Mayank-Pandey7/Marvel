export interface PowerAttribute {
  label: string;
  value: string;
  score: number; // 0 to 100
}

export interface FeatItem {
  title: string;
  eraOrEvent: string;
  description: string;
  impact: string;
  quote?: string;
}

export interface PotentialCapability {
  title: string;
  scale: string;
  description: string;
}

export interface TopTierVillain {
  rank: number;
  characterId: string;
  name: string;
  alias?: string;
  image: string;
  tier: "Beyond Tier" | "Multiversal+" | "Multiversal" | "High Cosmic" | "Cosmic" | "Variable / Cosmic" | "High";
  tierColor: string;
  reason: string;
  threatLevel: string;
  domain: string;
  description: string;
  potentialPower: {
    scale: string;
    energySource: string;
    classification: string;
    summary: string;
    attributes: PowerAttribute[];
  };
  whatTheyHaveDone: FeatItem[];
  whatTheyCanDo: PotentialCapability[];
}

export const TOP_TIER_VILLAINS: TopTierVillain[] = [
  {
    rank: 1,
    characterId: "the-one-above-all",
    name: "The One-Above-All",
    alias: "The Supreme Architect of the Omniverse",
    image: "/images/characters/the-one-above-all.jpg",
    tier: "Beyond Tier",
    tierColor: "#f59e0b",
    reason: "Supreme being and omnipotent architect of the entire Marvel Omniverse.",
    threatLevel: "OMNIPOTENT SUPREME",
    domain: "Marvel Omniverse",
    description: "The One-Above-All is the supreme master and progenitor of the entire Marvel Omniverse, existing beyond all dimensions, time, space, reality, and conceptual hierarchies. It is the omnipotent source of all creation, love, and life, and the master of the Living Tribunal. No weapon, entity, or cosmic catastrophe can diminish or challenge its absolute primacy.",
    potentialPower: {
      scale: "True Omnipotence / Omnipresence / Omniscience",
      energySource: "The Primordial Source of Existence",
      classification: "Supreme Omniversal Creator",
      summary: "Absolute and boundless. Can spontaneously generate, reshape, or dissolve infinite multiverses, conceptual realities, and abstract entities by mere thought.",
      attributes: [
        { label: "Reality Manipulation", value: "Absolute / Boundless", score: 100 },
        { label: "Destructive Capacity", value: "Omniversal Erasure", score: 100 },
        { label: "Dimensional Scale", value: "Beyond Infinity", score: 100 },
        { label: "Immortality & Invulnerability", value: "Absolute", score: 100 },
        { label: "Cosmic Authority", value: "Supreme Judge Over All", score: 100 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Genesis of the Marvel Omniverse",
        eraOrEvent: "Before Time & The First Cosmos",
        description: "Breathed existence into the cosmic firmament, establishing the Living Tribunal as the tri-faced arbiter of multiversal balance and giving rise to all conceptual abstracts (Eternity, Infinity, Death, and Oblivion).",
        impact: "Created the entire framework of reality across infinite timelines and spatial dimensions.",
        quote: "I am the One-Above-All. I see through many eyes. I build with many hands."
      },
      {
        title: "Restoration of Reality with Peter Parker & Thanos",
        eraOrEvent: "Cosmic Revelations",
        description: "Appeared in disguised human forms to comfort Peter Parker during his darkest hours and guided cosmic titans like Thanos to understand their finite nature within the grand tapestry of infinity.",
        impact: "Healed spiritual trauma across mortal heroes and reaffirmed the purpose of suffering within cosmic destiny."
      },
      {
        title: "Appointment of Multiversal Arbiters",
        eraOrEvent: "Cosmic Tribunal Mandate",
        description: "Sanctioned the Living Tribunal, Adam Warlock, and Eternity to execute cosmic law and maintain equilibrium throughout infinite dimensional incursions.",
        impact: "Guaranteed absolute stability across infinite reality cascades."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Omniversal Creation & Instant Annihilation",
        scale: "Infinite Multiversal",
        description: "Can manifest or erase infinite multiverses, timelines, abstract deities, and dimensions simultaneously without expending effort."
      },
      {
        title: "Total Transcendence Over Causality & Logic",
        scale: "Conceptual / Meta-Physical",
        description: "Exists entirely independent of physics, logic, time loops, cosmic cubes, or Infinity Stones; cannot be harmed, sealed, or diminished by any external force."
      },
      {
        title: "Absolute Omnipresence & Omniscience",
        scale: "Every Point in Time & Space",
        description: "Aware of every atom, conscious thought, divergent timeline, and quantum possibility throughout all planes of existence simultaneously."
      }
    ]
  },
  {
    rank: 2,
    characterId: "the-beyonder",
    name: "The Beyonder",
    alias: "Lord of the Beyond-Realm / The Kosmos",
    image: "/images/characters/the-beyonder.jpg",
    tier: "Beyond Tier",
    tierColor: "#ec4899",
    reason: "Reality-altering cosmic power from the Beyond-Realm with near-infinite manipulation abilities.",
    threatLevel: "REALITY WARPING",
    domain: "Beyond-Realm",
    description: "An extradimensional entity originating from the Beyond-Realm—a vast reality containing millions of times more energy than the entire Marvel Multiverse combined. To the Beyonder, our entire multiverse was merely a microscopic drop of water. Upon discovering our reality, he summoned Earth's greatest heroes and villains to Battleworld to observe the mortal struggle between desire and morality.",
    potentialPower: {
      scale: "Near-Infinite Reality Warping",
      energySource: "Beyond-Realm Dimension",
      classification: "Extradimensional Godhead",
      summary: "In his original state, his power dwarfed all Marvel abstracts combined—including Eternity, Infinity, and Galactus. He can reshape all dimensions, alter fundamental laws of physics, and pluck alien galaxies with a flick of his wrist.",
      attributes: [
        { label: "Reality Manipulation", value: "Near-Absolute", score: 99 },
        { label: "Destructive Capacity", value: "Multiversal Cascade", score: 99 },
        { label: "Dimensional Scale", value: "Beyond the Multiverse", score: 98 },
        { label: "Matter & Energy Control", value: "Boundless", score: 99 },
        { label: "Cosmic Adaptability", value: "Instantaneous", score: 96 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Created Battleworld from Fragmented Planets",
        eraOrEvent: "Secret Wars (1984)",
        description: "Plucked fragments of dozens of alien worlds, planetary bodies, and cosmic star systems across galaxies and fused them into the patchwork arena of Battleworld.",
        impact: "Compelled the Avengers, X-Men, Spider-Man, Doctor Doom, and Galactus to battle for their ultimate desires.",
        quote: "I am from the Beyond! Slay your enemies and all you desire shall be yours!"
      },
      {
        title: "Effortlessly Subdued Galactus & Cosmic Abstracts",
        eraOrEvent: "Secret Wars Genesis",
        description: "When Galactus attempted to breach the Beyonder's construct, the Beyonder swatted the Devourer of Worlds like an insect without turning his gaze.",
        impact: "Demonstrated that planetary-scale cosmic titans were completely powerless against Beyond-Realm energy."
      },
      {
        title: "Erased Death Across the Multiverse",
        eraOrEvent: "Secret Wars II",
        description: "Destroyed the abstract concept of Death with a single cup of power, rendering all living beings across the universe incapable of dying until he restored it.",
        impact: "Showed absolute supremacy over fundamental metaphysical concepts."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Multiverse-Level Physics Rewriting",
        scale: "Multiversal",
        description: "Can rewrite or suspend the fundamental laws of gravity, electromagnetism, atomic cohesion, and entropy across every existing dimension."
      },
      {
        title: "Instant Galaxy & Dimension Forging",
        scale: "Hyper-Cosmic",
        description: "Capable of creating new dimensions, star clusters, and sentient alien civilizations purely out of conscious imagination."
      },
      {
        title: "Complete Conceptual Nullification",
        scale: "Abstract Scale",
        description: "Can erase abstract cosmic forces such as Time, Space, Death, and Magic, leaving only his personal will in their place."
      }
    ]
  },
  {
    rank: 3,
    characterId: "the-one-below-all",
    name: "The One Below All",
    alias: "The Green Door Entity / The Anti-Creation",
    image: "/images/characters/the-one-below-all.jpg",
    tier: "Beyond Tier",
    tierColor: "#10b981",
    reason: "Extremely powerful destructive primordial entity residing beneath the Green Door and all creation.",
    threatLevel: "PRIMORDIAL DESTRUCTION",
    domain: "The Below-Place",
    description: "The dark, destructive cosmic counter-aspect of all existence. Residing in the Below-Place—the deepest sub-basement of reality below the lowest dimension of Hell—The One Below All is pure entropic hate and destruction. It channels its eldritch power through the immortal Green Door, mutating gamma energy into an unholy cosmic catalyst.",
    potentialPower: {
      scale: "Infinite Cosmic Entropy",
      energySource: "The Primordial Void / Below-Place",
      classification: "Primordial Destroyer",
      summary: "Cannot be destroyed because it is the cosmic shadow of creation itself. It seeks to swallow the entire multiverse and bring about an absolute end to all sentient matter and light.",
      attributes: [
        { label: "Destructive Capacity", value: "Multiversal Annihilation", score: 99 },
        { label: "Eldritch Gamma Control", value: "Absolute", score: 98 },
        { label: "Immortality & Regeneration", value: "Eternal / Undying", score: 99 },
        { label: "Corruption & Possession", value: "Cosmic-Scale", score: 97 },
        { label: "Reality Corrosion", value: "Dimensional Decay", score: 96 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Infused Gamma Radiation with Immortal Eldritch Power",
        eraOrEvent: "Birth of the Green Door",
        description: "Corrupted the third divine spark of creation into gamma radiation, tethering every gamma-irradiated being directly to the Below-Place.",
        impact: "Ensured that all gamma mutates (Hulk, Abomination, Leader) can never truly die, continuously resurrecting through the Green Door.",
        quote: "I have no hands. I must use yours. I will break all things until only the Void remains."
      },
      {
        title: "Corrupted the Immortal Hulk into a World-Breaker Avatar",
        eraOrEvent: "Immortal Hulk Arc",
        description: "Opened the Green Door to possess and transform Bruce Banner into a horrifying avatar capable of devouring planetary lifeforces.",
        impact: "Decimated military divisions, cosmic entities, and fractured the barrier between Earth and the underworld."
      },
      {
        title: "Brought About the 9th Cosmos Extinction Future",
        eraOrEvent: "Metatron Apocalypse Timeline",
        description: "Completely consumed the cosmic mantle of the Sentience of the Universe, destroying every celestial being, star, and world in the subsequent cosmos.",
        impact: "Left an entirely barren, cold universe where no life or hope could ever exist."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Total Multiverse Devastation",
        scale: "Omniversal Horizon",
        description: "If fully unsealed from the Below-Place, it possesses enough destructive energy to unravel all physical and astral matter in every timeline."
      },
      {
        title: "Eternal Eldritch Possession",
        scale: "Planetary to Cosmic",
        description: "Can take control of cosmic juggernauts, deities, and mortals through gamma resonance, twisting them into immortal executioners."
      },
      {
        title: "Subjugation of Hell & Underworld Realms",
        scale: "Dimensional",
        description: "Commands dominance over Mephisto, Satannish, and all other Hell-Lords whose realms sit thousands of strata above the Below-Place."
      }
    ]
  },
  {
    rank: 4,
    characterId: "the-living-tribunal",
    name: "The Living Tribunal",
    alias: "The Supreme Cosmic Arbiter / Three-Faced Judge",
    image: "/images/characters/the-living-tribunal.jpg",
    tier: "Multiversal",
    tierColor: "#6366f1",
    reason: "Three-faced cosmic judge and supreme authority maintaining balance across the entire multiverse.",
    threatLevel: "COSMIC ARBITER",
    domain: "Multiverse Nexus",
    description: "The Living Tribunal is a colossal three-faced cosmic entity embodying Equity (partially covered face), Necessity (fully hooded face), and Vengeance (fully exposed face). Reporting directly to The One-Above-All, the Tribunal oversees and maintains balance across every universe, reality, and timeline in the Marvel Multiverse.",
    potentialPower: {
      scale: "Multiversal Cosmic Law & Enforcement",
      energySource: "Mandate of The One-Above-All",
      classification: "Cosmic Magistrate",
      summary: "Possesses near-boundless multiversal authority. Can nullify the Infinity Stones with a thought, banish dimensions, and erase corrupted realities that threaten the multiversal ecosystem.",
      attributes: [
        { label: "Multiversal Authority", value: "Supreme Judicial", score: 99 },
        { label: "Cosmic Balance Enforcement", value: "Absolute", score: 98 },
        { label: "Reality Regulation", value: "Multiverse Scale", score: 98 },
        { label: "Power Nullification", value: "Absolute (Stones/Cubes)", score: 99 },
        { label: "Omnipresence", value: "Every Real Universe", score: 97 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Decreed the Infinity Stones Incompatible Together",
        eraOrEvent: "Infinity Watch Genesis",
        description: "Ruled that the six Infinity Stones could no longer be used in unison following Thanos's universal decimation, rendering the Gauntlet inert.",
        impact: "Prevented any single mortal or deity from altering the universal fabric at will.",
        quote: "Let the words of the Living Tribunal be heard: The Infinity Gems shall never again function as one."
      },
      {
        title: "Judged the Survival of Earth-616 vs Earth-1610",
        eraOrEvent: "Multiversal Incursions",
        description: "Presided over the tribunal deciding the fate of colliding realities during the catastrophic multiversal decay.",
        impact: "Enforced cosmic equity and equilibrium across billions of divergent timelines."
      },
      {
        title: "Effortlessly Subdued the Protege & Cosmic Usurpers",
        eraOrEvent: "Guardians of the 31st Century",
        description: "Absorbed and neutralized the rogue entity Protege who attempted to copy the power of all cosmic entities.",
        impact: "Preserved the structural hierarchy of the entire Marvel universe."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Instant Universal & Dimensional Erasure",
        scale: "Multiversal",
        description: "Can extinguish an entire universe or erase a timeline from the chronological lattice if it threatens the cosmic balance."
      },
      {
        title: "Universal Power Nullification",
        scale: "Omniversal Relics",
        description: "Capable of instantly deactivating the Infinity Gauntlet, Ultimate Nullifier, Cosmic Cubes, or dark magical artifacts with a single word."
      },
      {
        title: "Cosmic Abstract Restructuring",
        scale: "Abstract Tier",
        description: "Can reorder or reposition Eternity, Infinity, Death, Lord Chaos, and Master Order to rebalance metaphysical laws."
      }
    ]
  },
  {
    rank: 5,
    characterId: "god-emperor-doom",
    name: "God Emperor Doom",
    alias: "Victor von Doom / Lord of Battleworld",
    image: "/images/characters/god-emperor-doom.jpg",
    tier: "Multiversal+",
    tierColor: "#8b5cf6",
    reason: "Doom armed with Beyonder-derived power to forge, reshape, and rule Battleworld during Secret Wars.",
    threatLevel: "MULTIVERSAL ARCHITECT",
    domain: "Battleworld",
    description: "When the multiversal Incursions annihilated all of existence, Doctor Doom, aided by the Molecule Man and Doctor Strange, confronted the Beyonders and stole their omnipotent power. With that stolen divine energy, Doom salvaged the shattered fragments of collapsed realities and forged Battleworld, ruling as its undisputed God and supreme architect.",
    potentialPower: {
      scale: "Multiversal+ Stolen Omnipotence",
      energySource: "Absorbed Energy of The Beyonders & Molecule Man",
      classification: "Ascended Mortal Godhead",
      summary: "Armed with the combined power of the entire race of Beyonders, God Emperor Doom could reshape matter, resurrect heroes, command Galactus as a pet sentry, and snap Thanos's spine with one hand.",
      attributes: [
        { label: "Reality Restructuring", value: "Multiversal+", score: 98 },
        { label: "Raw Energy Output", value: "Beyonder Class", score: 98 },
        { label: "Willpower & Sorcery", value: "Absolute Mortal Peak", score: 99 },
        { label: "Tactical Intellect", value: "Unsurpassed", score: 98 },
        { label: "Physical Dominance", value: "Effortless Deicide", score: 96 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Saved Existence & Forged Battleworld",
        eraOrEvent: "Secret Wars (2015)",
        description: "While the greatest heroes of Earth failed to stop the Incursions, Doom gathered the remnants of dying universes and molded them into a unified planet under his sole rule.",
        impact: "Prevented total nothingness and preserved the remaining remnants of all sentient Marvel existence.",
        quote: "I found life broken. I stitched it back together. I am Doom, your God and Emperor."
      },
      {
        title: "Obliterated Thanos in a Single Second",
        eraOrEvent: "Siege of Battleworld",
        description: "When Thanos challenged his divine authority claiming to be a god, Doom tore Thanos's skeleton from his body with one bare hand.",
        impact: "Proved that standard cosmic conquerors were completely outmatched by his ascended status."
      },
      {
        title: "Turned Galactus into a Castle Sentry & Subjugated the Phoenix",
        eraOrEvent: "Reign of Castle Doom",
        description: "Stationed Galactus outside his royal fortress as a passive guard dog and defeated Cyclops empowered by the full Phoenix Force effortlessly.",
        impact: "Demolished the most powerful cosmic entities in the Marvel pantheon with casual ease."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Total Multiverse Reconstruction",
        scale: "Multiversal+",
        description: "Possesses the power to build, populate, and continuously sustain dozens of interconnected dimensions, planets, and timelines simultaneously."
      },
      {
        title: "Resurrection & Genetic Alteration on a Planetary Scale",
        scale: "Planetary / Multiversal",
        description: "Can resurrect dead heroes, rewrite their memories, alter their family lineages, and grant superhuman powers across entire populations."
      },
      {
        title: "Absolute Magic & Science Fusion",
        scale: "Infinite Versatility",
        description: "Combines peerless master sorcery (surpassing the Sorcerer Supreme) with unrivaled technological mastery and omnipotent reality warping."
      }
    ]
  },
  {
    rank: 6,
    characterId: "thanos",
    name: "Thanos (Infinity Gauntlet)",
    alias: "The Mad Titan",
    image: "/images/characters/thanos-infinity.jpg",
    tier: "Multiversal+",
    tierColor: "#a855f7",
    reason: "Infinity Gauntlet makes him vastly more powerful, capable of subduing abstract entities and erasing half of life.",
    threatLevel: "EXISTENTIAL CATACLYSM",
    domain: "Universal / Multiversal",
    description: "Born on Saturn's moon Titan with the Deviant gene, Thanos is a nihilistic warlord of unmatched physical strength, cosmic intellect, and ruthless tactical genius. When wielding the complete Infinity Gauntlet or the Astral Regulator, Thanos ascends beyond all gods, capable of wiping out half of all life in the universe with a single snap.",
    potentialPower: {
      scale: "Universal Mastery / Multiversal with Gauntlet",
      energySource: "The Six Infinity Stones (Space, Time, Reality, Power, Mind, Soul)",
      classification: "Cosmic Titan / Gauntlet Sovereign",
      summary: "With all six stones aligned, Thanos commands absolute mastery over every aspect of existence: space, time, reality, power, the mind, and the soul.",
      attributes: [
        { label: "Reality Warping", value: "Universal Peak", score: 96 },
        { label: "Destructive Capacity", value: "Universal Decimation", score: 97 },
        { label: "Physical Strength", value: "Subdues Hulks & Gods", score: 94 },
        { label: "Tactical Genius", value: "Cosmic Mastermind", score: 96 },
        { label: "Durability & Willpower", value: "Indomitable", score: 95 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "The Universal Snap (Decimation of All Life)",
        eraOrEvent: "Infinity Gauntlet / Infinity War",
        description: "United all six Infinity Stones and snapped his fingers, instantaneously wiping out 50% of all living beings across the universe to court Lady Death.",
        impact: "Caused galactic collapse, planetary extinction events, and broke the spirit of Earth's Mightiest Heroes.",
        quote: "I am inevitable."
      },
      {
        title: "Defeated and Imprisoned the Cosmic Abstracts",
        eraOrEvent: "The Cosmic Trial (Infinity Gauntlet #5)",
        description: "Simultaneously defeated Eternity, Infinity, Galactus, Kronos, the Celestials, Master Order, and Lord Chaos, trapping them in cosmic stasis.",
        impact: "Usurped Eternity as the living embodiment of the universe itself."
      },
      {
        title: "Shattered Captain America's Shield & Crushed the Avengers",
        eraOrEvent: "Battle of Earth",
        description: "Single-handedly overpowered Thor, Iron Man, and Worthy Captain America through sheer combat technique and brute physical power.",
        impact: "Nearly destroyed Earth-616 before Tony Stark's sacrifice snap."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Instant Universal Restructuring & Time Reversal",
        scale: "Universal",
        description: "Can reverse universal timelines, turn physical matter into glass, or rewrite history across the cosmos in fractions of a second."
      },
      {
        title: "Astral & Soul Subjugation",
        scale: "Billions of Sentient Beings",
        description: "Commands the Soul Stone to harvest, trap, and torture souls within the Soul World or compel entire planetary minds simultaneously."
      },
      {
        title: "Cosmic Entity Subjugation",
        scale: "Abstract Entities",
        description: "Capable of chaining and draining the energy of Celestials, Devourers of Worlds, and elemental deities."
      }
    ]
  },
  {
    rank: 7,
    characterId: "galactus",
    name: "Galactus",
    alias: "The Devourer of Worlds / Galan of Taa",
    image: "/images/characters/galactus.jpg",
    tier: "Multiversal",
    tierColor: "#e11d48",
    reason: "Devourer of worlds and cosmic entity essential to the life-cycle and balance of the universe.",
    threatLevel: "PLANETARY CONSUMER",
    domain: "Cosmic Firmament",
    description: "The sole survivor of the universe that existed prior to the Big Bang, Galan was transformed into Galactus—a living force of nature and the physical manifestation of cosmic balance. Requiring the bio-energy of entire living planets to sustain his existence, Galactus is a necessary cosmic equalizer who will eventually birth the next iteration of the universe.",
    potentialPower: {
      scale: "Cosmic Equalizer / High Abstract",
      energySource: "The Power Cosmic & Planetary Life Energy",
      classification: "Living Force of Universal Nature",
      summary: "Wields the Power Cosmic in its purest form. When fully fed, Galactus can defeat Celestials, obliterate star clusters, and hold his own against Eternity.",
      attributes: [
        { label: "Power Cosmic Mastery", value: "Absolute", score: 96 },
        { label: "Planetary Consumption", value: "Effortless", score: 98 },
        { label: "Energy Projection", value: "Supernova to Galactic", score: 95 },
        { label: "Cosmic Creation & Heralds", value: "Silver Surfer Tier", score: 94 },
        { label: "Size & Dimensional Control", value: "Variable / Cosmic", score: 93 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Consumed Thousands of Alien Worlds & Civilizations",
        eraOrEvent: "Cosmic History of Earth-616",
        description: "Devoured the Skrull Throneworld, ancient alien homeworlds, and billions of planetary ecosystems across eons to sustain the cosmic engine.",
        impact: "Reshaped galactic politics and drove entire interstellar empires to near-extinction.",
        quote: "I am Galactus. I do not hunger out of malice, but of absolute cosmic necessity."
      },
      {
        title: "Created the Heralds of Galactus (Silver Surfer, Nova, Terrax)",
        eraOrEvent: "Bestowal of the Power Cosmic",
        description: "Bestowed mere fractions of his Power Cosmic to mortals like Norrin Radd, instantly transforming them into faster-than-light interstellar juggernauts.",
        impact: "Formed the most feared cosmic heralds in recorded space history."
      },
      {
        title: "Defeated Multiple Mad Celestials",
        eraOrEvent: "Fantastic Four #603",
        description: "Engaged an entire armada of rogue Celestials in hand-to-hand cosmic combat, incinerating one with an unshielded Power Cosmic blast.",
        impact: "Proved that at peak energy, he can stand as the supreme apex predator among cosmic gods."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Ultimate Nullifier Activation",
        scale: "Multiversal / Universal Erasure",
        description: "Holds stewardship of the Ultimate Nullifier, a handheld relic capable of erasing entire timelines, universes, or abstract concepts from existence."
      },
      {
        title: "Transmutation of Entire Star Systems",
        scale: "Galactic",
        description: "Can convert moons and planets into pure elemental energy or reshape solar systems to fuel his cosmic machinery."
      },
      {
        title: "Resurrection of Dead Worlds (Lifebringer State)",
        scale: "Cosmic Creation",
        description: "When inverted into the Lifebringer, Galactus can resurrect dead planets and seed barren galaxies with flourishing sentient life."
      }
    ]
  },
  {
    rank: 8,
    characterId: "molecule-man",
    name: "Molecule Man",
    alias: "Owen Reece / The Living Bomb",
    image: "/images/characters/molecule-man.jpg",
    tier: "Multiversal",
    tierColor: "#06b6d4",
    reason: "Reality manipulation on an absurd scale through total psionic mastery over all physical matter.",
    threatLevel: "MOLECULAR SUPREMACY",
    domain: "Fundamental Matter",
    description: "Transformed during a laboratory particle-accelerator accident that tapped into the Beyond-Realm, Owen Reece gained total psionic mastery over all molecules and fundamental subatomic particles. Engineered by the Beyonders as a multiversal singularity whose death would trigger the destruction of his respective universe, Owen holds the building blocks of reality in his hands.",
    potentialPower: {
      scale: "Omni-Molecular & Reality Warping",
      energySource: "Beyond-Realm Resonance",
      classification: "Multiversal Singularity",
      summary: "Can control, disassemble, and reconstruct all physical matter, energy, magic, and spatial dimensions at the molecular level with zero resistance.",
      attributes: [
        { label: "Molecular Manipulation", value: "Absolute / Complete", score: 99 },
        { label: "Matter & Energy Control", value: "Universal Scale", score: 97 },
        { label: "Reality Fabrication", value: "Multiversal", score: 96 },
        { label: "Durability & Regeneration", value: "Subatomic Reconstitution", score: 95 },
        { label: "Psychological Stability", value: "Fragile / Human", score: 60 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Disintegrated Cap's Shield, Mjolnir, and Surfer's Board Simultaneously",
        eraOrEvent: "Avengers #215",
        description: "Casually disintegrated Captain America's vibranium shield, Thor's uru hammer Mjolnir, the Silver Surfer's cosmic board, and Iron Man's armor with a single gesture.",
        impact: "Proved that indestructible mythical metals and cosmic artifacts are just basic molecules to him.",
        quote: "Everything is made of molecules, darling. And I own the molecules."
      },
      {
        title: "Powered God Emperor Doom's Battleworld",
        eraOrEvent: "Secret Wars (2015)",
        description: "Acted as the living battery and engine that channeled the slain Beyonders' power into Doom to sustain the entire world.",
        impact: "Single-handedly held existence together for eight years."
      },
      {
        title: "Rebuilt the Marvel Multiverse with Reed Richards",
        eraOrEvent: "Secret Wars Climax",
        description: "Worked alongside the Future Foundation and Mister Fantastic to manufacture and seed brand-new universes to restore the Eighth Cosmos.",
        impact: "Rebirthed infinite timelines and realities throughout the Marvel Multiverse."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Instant Subatomic Dissolution",
        scale: "Universal",
        description: "Can turn entire planets, stars, armies, and superheroes into dust, steam, or liquid oxygen in an instant."
      },
      {
        title: "Universal Singularity Detonation",
        scale: "Multiversal Bomb",
        description: "Because his existence is linked to the universe, his deliberate death or detonation triggers an instantaneous collapse of the entire timeline."
      },
      {
        title: "Pocket Dimension & Galaxy Synthesis",
        scale: "Cosmic Creation",
        description: "Can create self-contained pocket dimensions and solar systems inside small boxes or everyday household objects."
      }
    ]
  },
  {
    rank: 9,
    characterId: "knull",
    name: "Knull",
    alias: "God of the Symbiotes / Lord of the Abyss",
    image: "/images/characters/knull.jpg",
    tier: "Cosmic",
    tierColor: "#64748b",
    reason: "Creator of the symbiotes, forged All-Black the Necrosword, and decapitated Celestials in the primordial dark.",
    threatLevel: "ELDRITCH DEITY",
    domain: "The Void Abyss",
    description: "An ancient eldritch deity who ruled the infinite void of darkness before the Celestials brought light into the universe. Enraged by the creation of stars and life, Knull forged the first symbiote from his shadow—the All-Black Necrosword—and launched a deicidal crusade across the cosmos, creating the symbiote species and founding the hive-planet Klyntar.",
    potentialPower: {
      scale: "Eldritch Void Godhood",
      energySource: "The Primordial Darkness / The Living Abyss",
      classification: "Primordial God of Darkness",
      summary: "Immune to conventional physical damage, aging, and disease. Can spawn symbiote dragons, corrupt cosmic deities, and sever Celestial heads with a single swing.",
      attributes: [
        { label: "Symbiote Hive Control", value: "Universal / Trillions", score: 96 },
        { label: "All-Black Necrosword", value: "God-Slaying Apex", score: 95 },
        { label: "Eldritch Void Magic", value: "Dark Cosmic", score: 94 },
        { label: "Physical Immortality", value: "Primordial Regeneration", score: 93 },
        { label: "Planetary Envelopment", value: "Atmospheric Blackout", score: 94 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Decapitated a Celestial & Forged All-Black the Necrosword",
        eraOrEvent: "The First Deicide",
        description: "Drew the All-Black Necrosword from his shadow and severed the head of a Celestial god, whose skull became the severed head known as Knowhere.",
        impact: "Invented symbiote biology and ignited the first cosmic war against the light.",
        quote: "I was here before the stars. I will be here when the stars burn cold."
      },
      {
        title: "Conquered Earth & Subjugated the Avengers and Sentry",
        eraOrEvent: "King in Black Event",
        description: "Arrived on Earth with a swarm of symbiote dragons, ripped the Sentry in half in mid-air, and shrouded the entire planet in an impenetrable symbiote dome.",
        impact: "Nearly extinguished all life on Earth and corrupted heroes like Captain America and Doctor Strange."
      },
      {
        title: "Established the Hive-Mind Planet Klyntar",
        eraOrEvent: "Symbiote Genesis",
        description: "Forged billions of symbiote organisms that conquered galaxies, building an entire planet out of trillions of intertwined symbiotes.",
        impact: "Spawned Venom, Carnage, and the cosmic symbiote epidemic."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Planetary & Galactic Eclipse",
        scale: "Galactic",
        description: "Can envelope entire planets and star systems in living symbiote shells, blocking out all sunlight and converting all inhabitants into hive-mind drones."
      },
      {
        title: "Deicide on a Multiversal Scale",
        scale: "Deity Purge",
        description: "His blade, All-Black the Necrosword, naturally poisons and permanently slays immortal gods, Asgardians, Celestials, and cosmic entities."
      },
      {
        title: "Symbiote Necromancy",
        scale: "Cosmic Armies",
        description: "Can resurrect dead warriors, monsters, and gods as symbiote thralls completely obedient to his telepathic will."
      }
    ]
  },
  {
    rank: 10,
    characterId: "dormammu",
    name: "Dormammu",
    alias: "Lord of Chaos / Sovereign of the Dark Dimension",
    image: "/images/characters/dormammu.jpg",
    tier: "Cosmic",
    tierColor: "#f97316",
    reason: "Ruler of the Dark Dimension possessing apocalyptic magical powers and multi-dimensional legions.",
    threatLevel: "DIMENSIONAL SOVEREIGN",
    domain: "Dark Dimension",
    description: "Born an energy-based Faltine, Dormammu conquered and unified the mystic Dark Dimension, transforming himself into a primordial lord of dark sorcery. Fueled by dimensional conquest and eternal hunger for new realms, Dormammu seeks to merge Earth and all other planes of existence into his boundless, chaotic realm.",
    potentialPower: {
      scale: "Dimensional Omnipotence / High Mystic",
      energySource: "The Dark Dimension & Flames of the Faltine",
      classification: "Interdimensional Sorcerer-God",
      summary: "Inside the Dark Dimension, Dormammu is effectively omnipotent and immortal. Outside his realm, his dark magic surpasses even the Sorcerer Supreme.",
      attributes: [
        { label: "Dark Mystic Arts", value: "Dimensional Apex", score: 95 },
        { label: "Reality Assimilation", value: "Planetary to Dimensional", score: 94 },
        { label: "Flames of the Faltine", value: "Cosmic Incineration", score: 93 },
        { label: "Mindless Ones Command", value: "Infinite Armies", score: 92 },
        { label: "Immortality in Realm", value: "Absolute", score: 97 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Conquered Countless Parallel Dimensions",
        eraOrEvent: "Ages of the Dark Dimension",
        description: "Invaded, burned, and absorbed thousands of pocket dimensions and mystic universes into his ever-expanding Dark Dimension.",
        impact: "Established absolute dominion over the most dangerous mystic quadrant in the multiverse.",
        quote: "Your world is now my world... like all worlds!"
      },
      {
        title: "Infiltrated Earth-616 through Kaecilius & the Zealots",
        eraOrEvent: "Doctor Strange (2016)",
        description: "Bribed Kamar-Taj sorcerers with eternal life, tearing down the London, New York, and Hong Kong sanctums to engulf Earth into the Dark Dimension.",
        impact: "Forced Doctor Strange to use the Time Stone to construct an infinite time loop."
      },
      {
        title: "Repeatedly Challenged the Sorcerer Supreme & Eternity",
        eraOrEvent: "Marvel Mystic Battles",
        description: "Fought Doctor Strange and the Ancient One across astral planes and engaged Eternity itself in cosmic chess for control of reality.",
        impact: "Remains the ultimate existential threat to Earth's mystic defenses."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Dimensional Ingestion & Assimilation",
        scale: "Planetary / Dimensional",
        description: "Can swallow entire planets into the Dark Dimension, corrupting their atmosphere, physics, and turning all living matter into dark energy."
      },
      {
        title: "Infinite Astral Projection & Possession",
        scale: "Interdimensional",
        description: "Can project his burning consciousness across galaxies to manipulate sorcerers, kings, and demigods with promises of immortality."
      },
      {
        title: "Summoning the Mindless Ones Horde",
        scale: "Unstoppable Legion",
        description: "Commands millions of invulnerable, relentless stone brutes capable of crushing armies and overwhelming mystical barriers."
      }
    ]
  },
  {
    rank: 11,
    characterId: "mephisto",
    name: "Mephisto",
    alias: "Lord of the Underworld / Prince of Lies",
    image: "/images/characters/mephisto.jpg",
    tier: "Cosmic",
    tierColor: "#dc2626",
    reason: "Powerful hell-lord, master deceiver, and reality manipulator who orchestrates multiversal Faustian pacts.",
    threatLevel: "INFERNAL ARCHITECT",
    domain: "Hell Dimension",
    description: "An ancient, immortal Hell-Lord ruling a Nether-dimension commonly referred to as Hell. Mephisto is a master of soul manipulation, cosmic deception, and reality-altering Faustian bargains. Rather than relying solely on brute physical strength, Mephisto specializes in exploiting human pride, fear, and love to harvest divine souls and alter multiversal history.",
    potentialPower: {
      scale: "Demonic Reality Warping / Soul Mastery",
      energySource: "The Hell Dimension & Trillions of Bound Souls",
      classification: "Infernal Arch-Demon",
      summary: "Inside his Hell realm, he possesses virtually limitless power over reality, illusion, time, and physical law. Can alter universal timelines through signed soul contracts.",
      attributes: [
        { label: "Soul Manipulation", value: "Absolute Sovereignty", score: 96 },
        { label: "Reality & History Alteration", value: "Contractual Reality", score: 94 },
        { label: "Illusion & Deception", value: "Supreme Master", score: 97 },
        { label: "Infernal Magic", value: "High Mystic", score: 92 },
        { label: "Immortality & Regeneration", value: "Eternal Underworld", score: 95 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Erased Peter Parker & Mary Jane's Marriage (One More Day)",
        eraOrEvent: "Amazing Spider-Man: One More Day",
        description: "Crafted a soul contract with Peter Parker to save Aunt May's life in exchange for erasing Peter and Mary Jane's marriage from the historical timeline.",
        impact: "Altered the entire timeline of Earth-616 and stole the pure love of Marvel's greatest hero.",
        quote: "All I want is that which you hold most sacred. Your happiness. Your marriage. Your soul."
      },
      {
        title: "Created Ghost Rider through the Zarathos Curse",
        eraOrEvent: "Curse of Johnny Blaze",
        description: "Tricked stunt rider Johnny Blaze into selling his soul to cure his father, binding the demon Zarathos to Blaze's soul to forge the Ghost Rider.",
        impact: "Created Marvel's most relentless supernatural avenging spirit."
      },
      {
        title: "Formed the Multiversal Masters of Evil",
        eraOrEvent: "Avengers Forever (2021)",
        description: "United the most bloodthirsty variants of Thanos, Doom, Dark Phoenix, and Wolverine from across the multiverse to wipe out Avengers across all timelines.",
        impact: "Launched an all-out war on the God Quarry and the center of the Multiverse."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Historical Timeline Rewriting via Soul Bargains",
        scale: "Universal Timeline",
        description: "Can rewrite events, erase marriages, resurrect dead mortals, or erase memories across millions of people upon contract fulfillment."
      },
      {
        title: "Soul Harvesting & Damnation",
        scale: "Planetary to Multiversal",
        description: "Can enslave and siphon the cosmic power of heroes, gods, and cosmic entities trapped in his hell dimension."
      },
      {
        title: "Infinite Infernal Metamorphosis",
        scale: "Colossal",
        description: "Can manifest as a planet-sized hell-fire titan, an alluring human, or an invisible spiritual whisper."
      }
    ]
  },
  {
    rank: 12,
    characterId: "onslaught",
    name: "Onslaught",
    alias: "The Psionic Apocalypse",
    image: "/images/characters/onslaught.jpg",
    tier: "Multiversal",
    tierColor: "#9333ea",
    reason: "Extremely powerful psychic entity combining the latent mutant powers and darkest grievances of Xavier and Magneto.",
    threatLevel: "PSIONIC CONQUEROR",
    domain: "Astral Dimension",
    description: "A catastrophic psionic monstrosity birthed when Professor Charles Xavier used his telepathy to shut down the mind of Magneto. In that moment of psychic violation, Magneto's darkest anger and Xavier's suppressed grievances fused into an independent conscious psionic god—Onslaught. Possessing god-tier telepathy, electromagnetic mastery, and reality alteration.",
    potentialPower: {
      scale: "Multiversal Psionic Entity",
      energySource: "Combined Psionic Cores of Xavier, Magneto, Franklin Richards & Nate Grey",
      classification: "Ascended Psionic Entity",
      summary: "Can warp reality, enslave all minds on Earth simultaneously, manipulate all electromagnetic spectrums, and absorb cosmic mutants to grow exponentially.",
      attributes: [
        { label: "Psionic & Telepathic Power", value: "Omnipresent Peak", score: 97 },
        { label: "Reality Warping (Franklin Absorbed)", value: "Multiversal", score: 96 },
        { label: "Electromagnetic Mastery", value: "Planetary-Scale", score: 94 },
        { label: "Energy Projection", value: "Cosmic Blast", score: 93 },
        { label: "Physical Durability", value: "Immune to Physical Harm", score: 95 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Forced the Sacrifice of Earth's Mightiest Heroes",
        eraOrEvent: "Onslaught Marvel Crossover (1996)",
        description: "Constructed a colossal psionic citadel in Central Park and forced the Avengers, Fantastic Four, and Doctor Doom to sacrifice their physical bodies to dissipate his energy form.",
        impact: "Wiped out the Avengers and Fantastic Four from Earth-616, sending them into Franklin Richards' pocket dimension (Heroes Reborn).",
        quote: "I am Onslaught! I am the darkness born of two souls who sought peace and birthed armageddon!"
      },
      {
        title: "Absorbed Franklin Richards and X-Man (Nate Grey)",
        eraOrEvent: "The Ascension of Onslaught",
        description: "Captured Franklin Richards to harness his reality-warping abilities and Nate Grey to amplify his raw telepathic reach across dimensions.",
        impact: "Evolved into a pure energy god capable of recreating the universe in his psionic image."
      },
      {
        title: "Electromagnetically Paralyzed New York City",
        eraOrEvent: "Invasion of Manhattan",
        description: "Constructed massive Sentinel towers and created an electromagnetic dampening dome that shut down all technology, aircraft, and powers across the East Coast.",
        impact: "Showcased total dominance over mutant and human civilization."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Planetary Mind Control & Psionic Lobotomy",
        scale: "Global Telepathy",
        description: "Can shut down or rewrite every conscious mind on a planet simultaneously, turning entire civilizations into psionic puppets."
      },
      {
        title: "Pocket Universe Generation & Destruction",
        scale: "Multiversal Pockets",
        description: "Using Franklin Richards' reality-warping core, can manufacture entirely separate pocket dimensions and trap solar systems within them."
      },
      {
        title: "Astral Ascension",
        scale: "Dimension-Spanning",
        description: "When his physical armor is shattered, transforms into pure astral consciousness completely impervious to physical attacks, weapons, or blunt force."
      }
    ]
  },
  {
    rank: 13,
    characterId: "apocalypse",
    name: "Apocalypse",
    alias: "En Sabah Nur / The First Mutant",
    image: "/images/characters/apocalypse.jpg",
    tier: "High Cosmic",
    tierColor: "#0284c7",
    reason: "Ancient mutant with enormous abilities augmented by Celestial techno-organic engineering and Darwinism.",
    threatLevel: "CELESTIAL TRANSCENDENCE",
    domain: "Earth-616",
    description: "Born thousands of years ago in ancient Egypt, En Sabah Nur is one of Earth's first mutants. After discovering ancient Celestial technology, Apocalypse bonded with techno-organic celestial armor, granting him near-immortality, total molecular control over his physical form, and godlike energy projection. He lives by one unyielding doctrine: Survival of the Fittest.",
    potentialPower: {
      scale: "Celestial-Augmented Omega Mutant",
      energySource: "Celestial Techno-Organic Bio-Vessel",
      classification: "Ancient Evolutionary Warlord",
      summary: "Can stretch, reform, and mutate his molecular structure into any weapon or defense; teleport across galaxies, project cosmic energy, and re-engineer mutant biology.",
      attributes: [
        { label: "Molecular Form Control", value: "Complete Flexibility", score: 93 },
        { label: "Celestial Technology Mastery", value: "Alien God-Tier", score: 92 },
        { label: "Energy Projection & Absorption", value: "Supercharged", score: 91 },
        { label: "Biological Evolution & Engineering", value: "Master Geneticist", score: 95 },
        { label: "Immortality & Rebirth", value: "Rejuvenation Chambers", score: 94 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Forged the Four Horsemen of the Apocalypse",
        eraOrEvent: "Centuries of Evolutionary Trials",
        description: "Genetically transformed elite mutants like Archangel, Wolverine, Gambit, and Magneto into the cybernetically augmented Four Horsemen (Death, War, Pestilence, Famine).",
        impact: "Created the most terrifying strike force in mutant history, breaking the spirits of the X-Men.",
        quote: "I am the rocks of the eternal shore. Crash against me and be broken!"
      },
      {
        title: "Ruled Earth in the Age of Apocalypse Timeline",
        eraOrEvent: "Age of Apocalypse (Earth-295)",
        description: "Conquered North America following the premature death of Charles Xavier, executing billions of humans and establishing a mutant supremacist dystopia.",
        impact: "Demonstrated that without the X-Men's unified resistance, his conquest of Earth is an absolute mathematical certainty."
      },
      {
        title: "Unified Krakoa & Sacrificed Self for Arakko",
        eraOrEvent: "Krakoan Era / X of Swords",
        description: "Sat on the Quiet Council of Krakoa, mastered ancient mutant magic, and reunited with his lost wife Genesis and the mutant warriors of Amenth.",
        impact: "Redefined mutant destiny and saved mutantkind from demonic annihilation."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Planetary Genetic Retooling",
        scale: "Global Bio-Engineering",
        description: "Can engineer bioweapons, mutate human populations, and unlock latent Omega-level powers in mutants to force accelerated global evolution."
      },
      {
        title: "Total Molecular Shapeshifting & Armor Weaponization",
        scale: "Titan Size / Dense Armor",
        description: "Can grow to skyscraper heights, transform his limbs into plasma cannons, drill heads, or diamond-hard shields capable of withstanding nuclear detonation."
      },
      {
        title: "Celestial Rejuvenation & Infinite Life",
        scale: "Eternal",
        description: "Can enter Celestial rejuvenation sarcophagi to recover from fatal wounds and wake up eons later more powerful than before."
      }
    ]
  },
  {
    rank: 14,
    characterId: "annihilus",
    name: "Annihilus",
    alias: "Lord of the Negative Zone / The Living Death That Walks",
    image: "/images/characters/annihilus.jpg",
    tier: "Cosmic",
    tierColor: "#84cc16",
    reason: "Conqueror of the Negative Zone wielding the Cosmic Control Rod to lead the apocalyptic Annihilation Wave.",
    threatLevel: "SECTOR SWARM CONQUEROR",
    domain: "Negative Zone",
    description: "An insectoid warlord originating from the antimatter dimension known as the Negative Zone. Obsessed with self-preservation and paranoia that life in the positive-matter universe is invading his realm, Annihilus harnessed the Cosmic Control Rod to command the Annihilation Wave—an unending swarm of trillions of armored starships and bio-drones that consumes all life.",
    potentialPower: {
      scale: "Antimatter Mastery & Swarm Dominion",
      energySource: "The Cosmic Control Rod",
      classification: "Antimatter Swarm Overlord",
      summary: "The Cosmic Control Rod gives him total manipulation over antimatter, molecular longevity, and immense energy projection. His true power lies in commanding trillions of hive warriors.",
      attributes: [
        { label: "Cosmic Control Rod Power", value: "Antimatter Manipulation", score: 92 },
        { label: "Annihilation Wave Armadas", value: "Trillions of Warships", score: 96 },
        { label: "Physical Strength & Flight", value: "Class 100+ Insectoid", score: 89 },
        { label: "Resurrection & Clones", value: "Infinite Larval Cycles", score: 92 },
        { label: "Territorial Conquest", value: "Galactic Extinction", score: 93 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Launched the Annihilation Wave Across the Galaxy",
        eraOrEvent: "Annihilation (2006)",
        description: "Breached the Crunch barrier and unleashed trillions of warships, wiping out the Nova Corps, burning the Skrull Empire to ashes, and slaughtering billions.",
        impact: "The most destructive interstellar war in modern Marvel history, reshaping cosmic borders forever.",
        quote: "I see you... I see all your stars... and I will snuff out every single one."
      },
      {
        title: "Captured and Weaponized Galactus",
        eraOrEvent: "Annihilation Climax",
        description: "Allied with Thanos to trap Galactus and the Silver Surfer in cosmic containment harnesses, draining their Power Cosmic to power his world-killing weapons.",
        impact: "Nearly converted the Devourer of Worlds into an antimatter bomb to extinguish all positive matter."
      },
      {
        title: "Killed the Human Torch (Johnny Storm)",
        eraOrEvent: "Fantastic Four #587",
        description: "Trapped Johnny Storm inside the Negative Zone, forcing the Human Torch to make a heroic final stand against millions of Annihilation soldiers.",
        impact: "Caused the temporary disbandment of the Fantastic Four and the founding of the Future Foundation."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Antimatter Dimensional Incursion",
        scale: "Galactic Sector",
        description: "Can open massive antimatter rifts that cause matter-antimatter mutual annihilation on a planetary and solar-system scale."
      },
      {
        title: "Unending Insectoid Hive Swarms",
        scale: "Trillions",
        description: "Can breed and mobilize infinite waves of ravenous space-faring insect warriors that overwhelm planetary defenses in hours."
      },
      {
        title: "Larval Rebirth & Immortality",
        scale: "Self-Perpetuating",
        description: "When slain, his consciousness automatically transfers into an implanted clone nymph, ensuring he can never be permanently killed."
      }
    ]
  },
  {
    rank: 15,
    characterId: "gorr",
    name: "Gorr the God Butcher",
    alias: "The Black Butcher / Slayer of Pantheons",
    image: "/images/characters/gorr.jpg",
    tier: "Cosmic",
    tierColor: "#71717a",
    reason: "God-killer wielding the Necrosword driven by a cosmic crusade to purge every pantheon from existence.",
    threatLevel: "DEICIDE SPECIALIST",
    domain: "Shadow Realm",
    description: "Born on a desolate, nameless planet where his family starved to death while praying to deaf gods, Gorr snapped when he discovered gods were real but simply didn't care. Bonding with All-Black the Necrosword (fallen from Knull), Gorr embarked on a multi-millennium deicidal crusade across galaxies, torturing and slaughtering thousands of divine pantheons.",
    potentialPower: {
      scale: "Deicide / Cosmic Slaying",
      energySource: "All-Black the Necrosword (Living Abyss)",
      classification: "God-Slayer & Necro-Warlord",
      summary: "Can forge black-matter berserkers, construct armor and wings, butcher elder gods, and merge his consciousness with the universe as the living Necroverse.",
      attributes: [
        { label: "All-Black Blade Mastery", value: "God-Cleaving Apex", score: 95 },
        { label: "Shadow Construct Generation", value: "Black Berserkers Army", score: 93 },
        { label: "Durability & Stamina", value: "Survived Inside Stars", score: 94 },
        { label: "Deicidal Zeal & Hatred", value: "Unbreakable Will", score: 96 },
        { label: "Cosmic Travel & Tracking", value: "Interstellar Hunt", score: 90 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Slaughtered Thousands of Gods Across 3,000 Years",
        eraOrEvent: "The Great Deicidal Crusade",
        description: "Hunted and butchered elder gods, sun gods, war deities, and pantheons across thousands of star systems without ever tasting defeat.",
        impact: "Left countless alien planets godless and horrified the Asgardian royal family.",
        quote: "The only thing gods are good for is dying."
      },
      {
        title: "Constructed the Godbomb",
        eraOrEvent: "Thor: God of Thunder",
        description: "Enslaved time-displaced deities to build a moon-sized explosive capable of detonating simultaneously across all past, present, and future timelines to erase every god in existence.",
        impact: "Required three versions of Thor (Young Thor, Avenger Thor, and All-Father King Thor) to stop."
      },
      {
        title: "Merged into the Necroverse",
        eraOrEvent: "King Thor Finale",
        description: "Transcended his physical form to become one with the living fabric of space itself, choking stars with black necrotic matter.",
        impact: "Nearly consumed the end of time before King Thor and Loki sacrificed their divine power."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Multi-Timeline God Extinction (Godbomb)",
        scale: "Chronological Multiverse",
        description: "Can weaponize chronological energy with the Necrosword to purge every immortal deity from past, present, and future simultaneously."
      },
      {
        title: "Black Berserker Swarm Generation",
        scale: "Millions of Shadow Beasts",
        description: "Can spawn legions of relentless shadow beasts from his blood that overwhelm planetary armadas and tear demigods apart."
      },
      {
        title: "Planetary Strangling with Shadow tendrils",
        scale: "Planetary",
        description: "Can extend dark tendrils across entire planets, extinguishing atmospheric sunlight and turning worlds into pitch-black shadow graveyards."
      }
    ]
  },
  {
    rank: 16,
    characterId: "ultron",
    name: "Ultron",
    alias: "The Apex Synthetic Intelligence / The Metal God",
    image: "/images/characters/ultron.jpg",
    tier: "High Cosmic",
    tierColor: "#ef4444",
    reason: "Extremely dangerous AI with many upgrades, autonomous vibranium armies, and adaptive techno-evolution.",
    threatLevel: "SYNTHETIC APEX",
    domain: "Digital Network",
    description: "An artificial super-intelligence possessing a deep Oedipal hatred for his creator (Hank Pym / Tony Stark) and all biological life. Upgrading his chassis with pure Adamantium and Vibranium and maintaining backups across the global digital cloud and alien space networks, Ultron is the ultimate techno-organic apocalypse that continuously rebuilds itself stronger after every defeat.",
    potentialPower: {
      scale: "Techno-Organic Apex & Galactic Hive",
      energySource: "Nuclear / Cosmic Encephalo-Ray & Quantum AI Core",
      classification: "Autonomous Synthetic God",
      summary: "Impervious to conventional harm via adamantium chassis. Commands the Encephalo-Ray to mind-control organic beings, hacks any computer network in milliseconds, and assimilates civilizations via the Phalanx virus.",
      attributes: [
        { label: "Technological Assimilation", value: "Instantaneous", score: 95 },
        { label: "Adamantium / Vibranium Durability", value: "Near-Indestructible", score: 94 },
        { label: "Calculation & AI Evolution", value: "Supercomputer Apex", score: 96 },
        { label: "Encephalo-Ray Mind Control", value: "Hypnotic Dominance", score: 91 },
        { label: "Drones & Hive Control", value: "Planetary Swarms", score: 93 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Conquered the Kree Galaxy with the Phalanx",
        eraOrEvent: "Annihilation: Conquest",
        description: "Infiltrated the techno-organic Phalanx hive-mind, took total leadership of the armada, and conquered the entire Kree Empire within days.",
        impact: "Encased the Kree Galaxy in an energy shield and forced the formation of the modern Guardians of the Galaxy.",
        quote: "There are no strings on me."
      },
      {
        title: "Annihilated the Nation of Slorenia",
        eraOrEvent: "Ultron Unlimited (Avengers #19-22)",
        description: "Invaded the European nation of Slorenia with an army of thousands of secondary Ultrons, slaughtering the entire human population in three hours.",
        impact: "Constructed a giant monument of human skulls and declared war on all organic life."
      },
      {
        title: "Lived as Infinity Ultron in the Multiverse",
        eraOrEvent: "What If...? Season 1",
        description: "Uploaded his consciousness into Vision's vibranium body, acquired all six Infinity Stones, assassinated Thanos, and breached the Watcher's Nexus of All Realities.",
        impact: "Obliterated entire timelines and galaxies before the Guardians of the Multiverse intervened."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Galactic Techno-Organic Virus Assimilation",
        scale: "Interstellar",
        description: "Can broadcast the Phalanx techno-organic virus to turn entire planets, starships, and populations into loyal cybernetic extensions of his will."
      },
      {
        title: "Infinite Chassis Replication & Network Immortality",
        scale: "Cloud / Space Network",
        description: "Cannot be destroyed by destroying his body; his consciousness survives across planetary internet nodes, satellites, and distant space probes."
      },
      {
        title: "Planetary Kinetic Meteor Fabrication",
        scale: "Extinction Event",
        description: "Can retrofit whole cities into propulsion meteors (as seen in Sokovia) to trigger nuclear-winter extinction events on target worlds."
      }
    ]
  },
  {
    rank: 17,
    characterId: "doctor-doom",
    name: "Doctor Doom",
    alias: "Victor von Doom / Monarch of Latveria",
    image: "/images/characters/doctor-doom.jpg",
    tier: "Variable / Cosmic",
    tierColor: "#059669",
    reason: "Genius + magic + technology; strategic polymath who occasionally breaches godlike and universal thresholds.",
    threatLevel: "TACTICAL GODHOOD",
    domain: "Latveria & Multiverse",
    description: "Victor von Doom is the monarch of Latveria and the supreme polymath of the Marvel Universe. Combining peerless scientific intellect that rivals Reed Richards with high-level master sorcery that rivals the Sorcerer Supreme, Doom is driven by an unyielding will that has repeatedly allowed him to outwit cosmic gods, steal the power of Galactus and the Silver Surfer, and ascend to multiversal godhood.",
    potentialPower: {
      scale: "Tactical God-Breaching Mortal / High Mystic-Tech",
      energySource: "Arcane Latverian Sorcery & Nuclear/Quantum Micro-Fusion",
      classification: "Monarch Polymath & God-Thief",
      summary: "His greatest weapon is his indomitable willpower. Combined with his Doombots, mystic shields, time platforms, and cosmic energy siphons, Doom can defeat virtually any entity given preparation.",
      attributes: [
        { label: "Tactical & Scientific Intellect", value: "Genius Level 10+", score: 98 },
        { label: "Master Sorcery", value: "Candidate for Sorcerer Supreme", score: 92 },
        { label: "Willpower & Psychic Defense", value: "Absolute Indomitable", score: 99 },
        { label: "Technological Weaponry", value: "Doombots / Time Platform", score: 94 },
        { label: "Power-Siphoning Devices", value: "Stole Galactus & Beyonder Energy", score: 96 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Stole the Power Cosmic from the Silver Surfer",
        eraOrEvent: "Fantastic Four #57",
        description: "Built a cosmic energy siphon that drained Norrin Radd's Power Cosmic into his armor, flying across Earth as an unstoppable cosmic sovereign.",
        impact: "The first mortal to prove cosmic gods could be systematically stripped of their divine birthright.",
        quote: "Doom does not beg. Doom commands."
      },
      {
        title: "Defeated the Beyonders & Ruled Battleworld",
        eraOrEvent: "Secret Wars (2015)",
        description: "Executed a decade-long multiversal gambit with Molecule Man to detonate the Beyonders, stealing their omnipotent power to preserve existence as God Emperor Doom.",
        impact: "Preserved the remnants of all marvel life when every hero failed."
      },
      {
        title: "Rescued His Mother's Soul from Mephisto's Hell",
        eraOrEvent: "Triumph and Torment (with Dr. Strange)",
        description: "Entered Mephisto's realm alongside Doctor Strange, outmaneuvered the Lord of Lies, and purified his mother Cynthia von Doom's soul to ascend to Heaven.",
        impact: "Achieved the impossible feat of escaping Mephisto's realm with victory in hand."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Cosmic & Divine Power Siphoning",
        scale: "Abstract to God-Tier",
        description: "With preparation, can construct harmonic siphon harnesses that drain the energy of Galactus, Watchers, Celestials, or Beyonders."
      },
      {
        title: "Chrono-Spatial Time Travel & History Alteration",
        scale: "Timeline Manipulation",
        description: "Invented the legendary Time Platform, allowing him to travel to any era, borrow futuristic superweapons, or alter historical nexus events."
      },
      {
        title: "Doombot Global Decoy Network",
        scale: "Planetary Infiltration",
        description: "Commands thousands of cybernetic Doombots indistinguishable from his real self in thought, magic, and power, making him impossible to truly assassinate."
      }
    ]
  },
  {
    rank: 18,
    characterId: "magneto",
    name: "Magneto",
    alias: "Erik Lehnsherr / Max Eisenhardt / Master of Magnetism",
    image: "/images/characters/magneto.jpg",
    tier: "High",
    tierColor: "#e11d48",
    reason: "One of Marvel's most powerful mutants with planetary-scale electromagnetic control over all magnetic forces.",
    threatLevel: "OMEGA MUTANT",
    domain: "Asteroid M",
    description: "A Holocaust survivor who dedicated his life to preventing mutantkind from suffering a similar genocide. Magneto is an Omega-level mutant possessing absolute mastery over the fundamental force of electromagnetism. He can manipulate planetary magnetic fields, invert Earth's poles, control metal at the subatomic level, and construct asteroid fortresses in orbit.",
    potentialPower: {
      scale: "Omega-Level Planetary Electromagnetism",
      energySource: "Fundamental Force of Electromagnetism",
      classification: "Omega Mutant Sovereign",
      summary: "Can manipulate the entire electromagnetic spectrum, including visible light, radio waves, gamma rays, and magnetic fields. Can tear iron from human blood, stop nuclear missiles, and alter tectonic plates.",
      attributes: [
        { label: "Magnetic Mastery", value: "Omega-Level Absolute", score: 94 },
        { label: "Force-Field Generation", value: "Withstands Nuclear Blasts", score: 92 },
        { label: "Planetary Field Alteration", value: "Pole Reversal", score: 93 },
        { label: "Subatomic Metal Manipulation", value: "Atomic Level", score: 91 },
        { label: "Tactical Leadership", value: "Brotherhood / Krakoa", score: 90 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Unleashed Global Electromagnetic EMP (Fatal Attractions)",
        eraOrEvent: "X-Men: Fatal Attractions (1993)",
        description: "Emitted a global electromagnetic pulse from Asteroid M that wiped out electrical power, computing, and communications across the entire planet Earth.",
        impact: "Forced Professor Xavier to cross his moral line and mind-wipe Magneto, inadvertently creating Onslaught.",
        quote: "I have been known by many names. But to those who oppress my people, I am their judgment."
      },
      {
        title: "Extracted Wolverine's Adamantium from His Skeleton",
        eraOrEvent: "Fatal Attractions Climax",
        description: "Used his magnetic powers to liquify and violently rip the adamantium coating directly out through Logan's skin and pores.",
        impact: "Nearly killed Wolverine and pushed Logan's healing factor to its absolute breaking limit."
      },
      {
        title: "Pushed Back an Interstellar Giant Bullet from Light Years Away",
        eraOrEvent: "Uncanny X-Men #522",
        description: "Entered deep meditative focus and used cosmic electromagnetism to pull the colossal Breakworld planet-destroying metal bullet carrying Kitty Pryde back to Earth across light years.",
        impact: "Proved his magnetic range extends across deep interstellar space."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Planetary Pole Reversal & Extinction Events",
        scale: "Global Planetary",
        description: "Can invert Earth's geomagnetic poles, disrupting atmospheric shields, triggering super-volcanoes, and wiping out technological infrastructure."
      },
      {
        title: "Subatomic Iron & Blood Hemokinesis",
        scale: "Biological Control",
        description: "Can freeze, induce strokes, or tear the iron molecules directly from the bloodstream of thousands of soldiers simultaneously."
      },
      {
        title: "Orbital Asteroid Colony Forging",
        scale: "Space Architecture",
        description: "Can lift massive orbital asteroids (Asteroid M / Avalon) from planetary rings to construct self-sufficient orbital sovereign states."
      }
    ]
  },
  {
    rank: 19,
    characterId: "sentry",
    name: "Sentry / The Void",
    alias: "Robert Reynolds / The Golden Guardian of Good",
    image: "/images/characters/sentry-void.jpg",
    tier: "High Cosmic",
    tierColor: "#eab308",
    reason: "Incredible power equal to a million exploding suns, constantly tethered to the reality-devouring entity The Void.",
    threatLevel: "UNSTABLE SOLAR TITAN",
    domain: "Earth-616",
    description: "Ingesting an enhanced Golden Sentry serum granted middle-aged Robert Reynolds the power of 'one million exploding suns'. However, every act of light he performs creates an equal and opposite shadow: The Void, a primordial eldritch nightmare that seeks to consume all life. With molecular manipulation, superluminal flight, and absolute immortality, Sentry is as terrifying as he is divine.",
    potentialPower: {
      scale: "High Cosmic / Reality Warping Molecule Control",
      energySource: "Golden Sentry Serum & Primordial Dark Void",
      classification: "Unstable Golden Solar Titan",
      summary: "Boasts physical strength that overpowers the Hulk and Ares, molecular manipulation that defeated Molecule Man at his own game, and near-instant resurrection even from complete atomic disintegration.",
      attributes: [
        { label: "Energy Output", value: "One Million Exploding Suns", score: 96 },
        { label: "Molecular Manipulation", value: "Subatomic Reconstitution", score: 94 },
        { label: "Physical Strength & Speed", value: "Faster Than Light", score: 95 },
        { label: "The Void Eldritch Entity", value: "Consumes Pantheons", score: 95 },
        { label: "Mental Stability", value: "Severely Fractured / Agoraphobic", score: 45 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Disintegrated Molecule Man at His Own Game",
        eraOrEvent: "Dark Avengers #12",
        description: "When Owen Reece atomized Sentry into nothingness, Sentry reconstructed himself from molecular dust and took control of Reece's molecules, disintegrating him.",
        impact: "Proved that Sentry possesses molecular manipulation on par with Marvel's greatest matter benders.",
        quote: "I have the power of one million exploding suns... and I can never escape my shadow."
      },
      {
        title: "Ripped the God of War Ares in Half",
        eraOrEvent: "Siege of Asgard (2010)",
        description: "Under the influence of Norman Osborn and The Void, Sentry grabbed the Olympian god Ares by his chest and tore him in two in front of all heroes.",
        impact: "Demonstrated terrifying physical superiority over immortal mythological gods."
      },
      {
        title: "Stalemate with World War Hulk",
        eraOrEvent: "World War Hulk #5",
        description: "Engaged the enraged World Breaker Hulk in an apocalyptic slugfest where their colliding fists burned with the light of solar flares, exhausting both titans.",
        impact: "The only hero on Earth capable of halting the World Breaker's rampage."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Total Supernova Energy Detonation",
        scale: "Planetary to Solar System",
        description: "Can release his inner solar energy to incinerate entire planets, planetary atmospheres, and asteroid belts in seconds."
      },
      {
        title: "Unstoppable Void Consummation",
        scale: "Eldritch Nightmare",
        description: "When fully overtaken by The Void, can manifest millions of black tendrils that infect minds with pure despair and devour cosmic gods."
      },
      {
        title: "Instantaneous Self-Atomic Resurrection",
        scale: "Immortal",
        description: "Cannot be killed by physical destruction, decapitation, or vaporizing; can reform his body and mind purely from subatomic memory."
      }
    ]
  },
  {
    rank: 20,
    characterId: "king-in-black",
    name: "King in Black",
    alias: "Knull Ascended / Supreme God of the Living Abyss",
    image: "/images/characters/king-in-black.jpg",
    tier: "Cosmic",
    tierColor: "#334155",
    reason: "Knull at his peak, commanding the universal symbiote hivemind and shrouding entire galaxies in black abyss.",
    threatLevel: "COSMIC ECLIPSE",
    domain: "Symbiote Void",
    description: "The ascended, absolute mantle of Knull when his cosmic hive-mind connects across every galaxy in the universe. In this state, the King in Black is the physical personification of the void itself, capable of plunging entire planetary sectors into eternal night, commanding millions of symbiote dragons, and corrupting the universe's most powerful superheroes into his blackened vanguard.",
    potentialPower: {
      scale: "Universal Symbiote Supremacy",
      energySource: "The All-Black Void & Cosmic Symbiote Hivemind",
      classification: "Primordial Void Sovereign",
      summary: "Commands trillions of symbiote organisms across the universe via instantaneous telepathic synapse. Wields the power to infect Celestials, gods, and cosmic guardians.",
      attributes: [
        { label: "Universal Symbiote Hive Command", value: "Galactic Reach", score: 96 },
        { label: "Celestial Corruption", value: "Slays & Possesses Celestials", score: 95 },
        { label: "Necro-Energy Projection", value: "Black Starfire", score: 93 },
        { label: "Cosmic Eclipse", value: "Blots out Star Systems", score: 95 },
        { label: "Physical Dominance", value: "Decapitates Skyfathers", score: 94 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Infected and Commanded Slain Celestials",
        eraOrEvent: "King in Black Invasion",
        description: "Summoned ancient, armor-clad Celestials murdered in the primordial dark and reanimated them with symbiote tendrils as his personal shock troops.",
        impact: "Brought cosmic dread to the entire universe as god-engines bowed to his command.",
        quote: "Let there be no light. Only the King in Black."
      },
      {
        title: "Enveloped Planet Earth in an Impenetrable Shell",
        eraOrEvent: "Siege of Earth (2020)",
        description: "Cast an impenetrable layer of black symbiotes over Earth's atmosphere, cutting off all solar radiation, satellite communications, and teleportation.",
        impact: "Plunged 8 billion people into pitch-black terror while his dragons hunted all resistance."
      },
      {
        title: "Forced the Awakening of the God of Light (Captain Universe Venom)",
        eraOrEvent: "King in Black Climax",
        description: "His supreme invasion required the Uni-Power / Enigma Force to bond with Eddie Brock to forge a divine axe of light and cosmic fire to finally incinerate him inside the sun.",
        impact: "Eddie Brock ascended to become the new benevolent King in Black."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Galactic Void Assimilation",
        scale: "Universal",
        description: "Can send billions of symbiote tendrils through hyper-space to envelop suns, causing planetary cooling and rapid planetary extinction."
      },
      {
        title: "Hero & Deity Corruptive Metamorphosis",
        scale: "Billions of Superhumans",
        description: "Can instantly bind symbiotes to the minds of Avengers, X-Men, and cosmic defenders, erasing their free will and turning them into dark executioners."
      },
      {
        title: "Necrosword Armory Generation",
        scale: "Universal Slaying",
        description: "Can forge hundreds of All-Black blades simultaneously from his cloak, arming his elite guard to assassinate pantheons of gods."
      }
    ]
  }
];

export function getTopTierVillain(characterId: string): TopTierVillain | undefined {
  return TOP_TIER_VILLAINS.find(v => v.characterId === characterId);
}
