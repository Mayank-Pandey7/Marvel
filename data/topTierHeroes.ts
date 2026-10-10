export interface HeroPowerAttribute {
  label: string;
  value: string;
  score: number;
}

export interface HeroFeatItem {
  title: string;
  eraOrEvent: string;
  description: string;
  impact: string;
  quote?: string;
}

export interface HeroPotentialCapability {
  title: string;
  scale: string;
  description: string;
}

export interface TopTierHero {
  rank: number;
  characterId: string;
  name: string;
  alias?: string;
  image: string;
  tier: "Multiversal+" | "Multiversal" | "High Cosmic" | "Cosmic" | "High";
  tierColor: string;
  reason: string;
  heroicClass: string;
  domain: string;
  description: string;
  potentialPower: {
    scale: string;
    energySource: string;
    classification: string;
    summary: string;
    attributes: HeroPowerAttribute[];
  };
  whatTheyHaveDone: HeroFeatItem[];
  whatTheyCanDo: HeroPotentialCapability[];
}

export const TOP_TIER_HEROES: TopTierHero[] = [
  {
    rank: 1,
    characterId: "the-one-above-all",
    name: "The One-Above-All",
    alias: "Omnipotent Creator & Supreme Architect",
    image: "/images/characters/the-one-above-all.jpg",
    tier: "Multiversal+",
    tierColor: "#f59e0b",
    reason: "Omnipotent progenitor, source of all love, creation, and life across the entire Marvel Omniverse.",
    heroicClass: "SUPREME OMNIPOTENT CREATOR",
    domain: "The Marvel Omniverse",
    description: "The One-Above-All is the supreme master, benevolent creator, and ultimate authority over all reality, dimensions, time, and conceptual existence. Beyond all cosmic battles, it embodies the infinite spark of creativity, descending in humble mortal guises to restore despairing heroes and preserve the spiritual balance of existence.",
    potentialPower: {
      scale: "True Omnipotence / Omnipresence / Omniscience",
      energySource: "The Primordial Source of Existence",
      classification: "Supreme Omniversal Deity",
      summary: "Boundless and absolute. Can spontaneously manifest, rewrite, or restore infinite multiverses, conceptual realities, and living souls with effortless intent.",
      attributes: [
        { label: "Reality Manipulation", value: "Absolute / Boundless", score: 100 },
        { label: "Benevolent Authority", value: "Supreme Omniverse", score: 100 },
        { label: "Dimensional Scale", value: "Beyond Infinity", score: 100 },
        { label: "Immortality & Grace", value: "Absolute", score: 100 },
        { label: "Cosmic Restoration", value: "Instantaneous", score: 100 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Created the Entire Framework of Reality & Abstract Pantheon",
        eraOrEvent: "Before Time & The First Cosmos",
        description: "Breathed the infinite multiverse into existence, establishing the cosmic order and appointing the Living Tribunal as universal arbiter.",
        impact: "Established the foundations of all life, light, and cosmic destiny.",
        quote: "I am the One-Above-All. I see through many eyes. I build with many hands."
      },
      {
        title: "Spiritual Healing of Peter Parker & Cosmic Grace",
        eraOrEvent: "Sensational Spider-Man (2007)",
        description: "Manifested as a humble, kind homeless artist to comfort Peter Parker in his darkest grief, teaching him the sacred necessity of hope and mortal perseverance.",
        impact: "Restored the spiritual conviction of Earth's greatest hero."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Instant Omniversal Genesis & Salvation",
        scale: "Infinite Multiversal",
        description: "Can manifest or resurrect entire universes, dimensions, and heroes with a mere thought."
      },
      {
        title: "Absolute Transcendence",
        scale: "Meta-Physical",
        description: "Exists completely immune to any weapon, Infinity Stone, cosmic cube, or multiversal destruction."
      }
    ]
  },
  {
    rank: 2,
    characterId: "franklin-richards",
    name: "Franklin Richards (Universal Shaper)",
    alias: "The Universal Shaper / Mutant Beyond Omega",
    image: "/images/characters/franklin-richards.jpg",
    tier: "Multiversal+",
    tierColor: "#38bdf8",
    reason: "Possesses boundless reality-warping abilities; created pocket universes as a child and made Galactus his herald.",
    heroicClass: "UNIVERSAL SHAPER / OMEGA HERO",
    domain: "Earth-616 / Pocket Multiverses",
    description: "The son of Mister Fantastic and the Invisible Woman, Franklin Richards was born an Omega-Level mutant whose power transcends standard mutant classifications. Even as a child, he created miniature pocket universes beneath his bedsheets. In his adult form, he commanded Galactus into battle against the Mad Celestials and helped resurrect the entire Marvel Multiverse.",
    potentialPower: {
      scale: "Multiversal Reality Creation & Control",
      energySource: "Innate Cosmic Psionic Spark",
      classification: "Reality Shaper & World Forger",
      summary: "Capable of warping reality, space, time, and matter on an absolute scale. Can forge full-sized universes and alter the laws of physics at will.",
      attributes: [
        { label: "Reality Creation", value: "Universal / Infinite", score: 99 },
        { label: "Energy Manipulation", value: "Boundless", score: 98 },
        { label: "Psionic Power", value: "Transcendent", score: 97 },
        { label: "Temporal Control", value: "Time-Weaving", score: 96 },
        { label: "Cosmic Command", value: "Galactus-Level Subjugation", score: 98 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Created the Heroes Reborn Universe",
        eraOrEvent: "Heroes Reborn (1996)",
        description: "When the Avengers and Fantastic Four sacrificed themselves against Onslaught, Franklin subconsciously created an entire pocket universe to save their souls and restore their lives.",
        impact: "Rescued Earth's greatest superheroes from absolute annihilation."
      },
      {
        title: "Resurrected Galactus as His Personal Herald",
        eraOrEvent: "Fantastic Four #604 (2012)",
        description: "In the war against the Mad Celestials of Earth-4280, adult Franklin channeled his cosmic energy to resurrect a fallen Galactus, ordering the Devourer: 'To me, my Galactus!'",
        impact: "Decimated the Mad Celestials and saved the timeline from utter annihilation.",
        quote: "To me, my Galactus!"
      },
      {
        title: "Rebuilt the Entire Marvel Multiverse",
        eraOrEvent: "Secret Wars Conclusion (2015)",
        description: "Working alongside his father Reed Richards and the Molecule Man, Franklin envisioned and birthed hundreds of brand new universes, restoring the multiverse after the incursions.",
        impact: "Restored infinite realities, planets, and civilizations across creation."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Pocket Universe Generation",
        scale: "Full Universal Scale",
        description: "Spontaneously creates complete cosmos with functional stars, planets, biological ecosystems, and physics."
      },
      {
        title: "Cosmic Deicide & Domination",
        scale: "Celestial Tier",
        description: "Can overpower or redirect Celestials and cosmic abstracts through raw psionic force."
      }
    ]
  },
  {
    rank: 3,
    characterId: "thor",
    name: "Thor (Rune King)",
    alias: "Lord of the Runes / Destroyer of the Cycle",
    image: "/images/characters/rune-king-thor.jpg",
    tier: "Multiversal+",
    tierColor: "#3b82f6",
    reason: "Sacrificed both eyes, mastered the ancient Runes and Odinforce, gaining infinite wisdom and destroying the shadow gods of Ragnarok.",
    heroicClass: "RUNE ALL-FATHER & DESTINY BREAKER",
    domain: "Asgard / Yggdrasil / Beyond the Veil",
    description: "To save his people from the endless cycle of Ragnarok, Thor underwent the ultimate sacrifice: gouging out both of his eyes at the Well of Mimir and hanging himself from Yggdrasil until death. Transcending mortality, he mastered the magic of the Runes and the Odinforce, gaining omniscient cosmic wisdom and destroying 'Those Who Sit Above in Shadow'.",
    potentialPower: {
      scale: "Multiversal Cosmic Mastery & Fate Severing",
      energySource: "The Ancient Runes & The Odinforce / Thorforce",
      classification: "Transcendent Cosmic Deity",
      summary: "Wields supreme control over reality, fate, magic, and time. Can erase elder monsters with a thought and sever cosmic destiny threads.",
      attributes: [
        { label: "Rune Magic & Odinforce", value: "Transcendent Master", score: 98 },
        { label: "Omniscient Insight", value: "Cosmic Awareness", score: 97 },
        { label: "Reality Alteration", value: "Multiversal Weave", score: 98 },
        { label: "Physical & Godly Might", value: "Infinite Divine", score: 99 },
        { label: "Fate Severing", value: "Cosmic Authority", score: 99 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Effortlessly Obliterated Mangog & Slew Loki's Armies",
        eraOrEvent: "Thor: Ragnarok (2004)",
        description: "With a mere gesture of his hand, Rune King Thor dismantled the indestructible Mangog and stripped Loki of his head without killing him, ending the war instantly.",
        impact: "Ended the devastating siege on the Nine Realms in seconds."
      },
      {
        title: "Severed the Loom of Fate & Erased 'Those Who Sit Above in Shadow'",
        eraOrEvent: "The Final Ragnarok",
        description: "Traveled beyond the boundaries of reality to the realm of the elder shadow parasites who fed on Ragnarok. Thor snapped the cosmic tapestry of fate, annihilating the shadow gods forever and freeing Asgard from death loops.",
        impact: "Freed Asgard and the entire cosmos from an eternal cosmic curse.",
        quote: "I am the end of your feast. I am the death of your cycle."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Fate Weaving & Destruction",
        scale: "Multiversal Law",
        description: "Can alter or erase the fundamental destiny of gods, dimensions, and cosmic entities."
      },
      {
        title: "Omniscient Astral Sight",
        scale: "All Time & Dimensions",
        description: "Sees every past, present, and future timeline across the branches of the World Tree."
      }
    ]
  },
  {
    rank: 4,
    characterId: "adam-warlock",
    name: "Adam Warlock (Living Tribunal)",
    alias: "The Cosmic Avatar of Balance",
    image: "/images/characters/adam-warlock-comic.jpg",
    tier: "Multiversal+",
    tierColor: "#eab308",
    reason: "Trusted wielder of the Infinity Gauntlet, guardian of the Soul Gem, and chosen by The One-Above-All to ascend as the new Living Tribunal.",
    heroicClass: "COSMIC ARBITER & SOUL GUARDIAN",
    domain: "The Cosmic Threshold / Multiverse",
    description: "Created in a cocoon by mortal scientists as the perfect human, Adam Warlock evolved into the paramount philosophical defender of the universe. He defeated Thanos during the Infinity Gauntlet crisis, mastered the Soul Gem, and was ultimately selected by The One-Above-All to succeed the fallen Living Tribunal as the ultimate arbiter of multiversal balance.",
    potentialPower: {
      scale: "Multiversal Cosmic Balance",
      energySource: "Soul World / Quantum Magic / Tribunal Authority",
      classification: "Cosmic Judge & Sovereign Entity",
      summary: "Possesses supreme soul manipulation, cosmic energy manipulation, quantum cocoon resurrection, and multiversal judicial authority.",
      attributes: [
        { label: "Cosmic Tribunal Authority", value: "Supreme Judge", score: 98 },
        { label: "Soul Gem Mastery", value: "Absolute Command", score: 98 },
        { label: "Quantum Sorcery", value: "Cosmic Weaving", score: 96 },
        { label: "Quantum Rebirth", value: "Immortal Cocoon", score: 97 },
        { label: "Universal Equilibrium", value: "Multiversal Balance", score: 99 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Dismantled Thanos & Wielded the Infinity Gauntlet",
        eraOrEvent: "The Infinity Gauntlet (1991)",
        description: "Orchestrated the tactical cosmic strike against the omnipotent Thanos and Nebula, claiming the Infinity Gauntlet and restoring half the universe with perfect philosophical detachment.",
        impact: "Saved the entire universe from Thanos' omnipotent reign."
      },
      {
        title: "Ascended as the New Living Tribunal",
        eraOrEvent: "Thanos: The Infinity Finale (2016)",
        description: "Following the destruction of the original Tribunal, Adam Warlock was elevated by The One-Above-All to take the golden tri-faced mantle, guaranteeing eternal cosmic justice.",
        impact: "Restored the fundamental laws of multiversal balance across all reality."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Multiversal Nullification",
        scale: "Multiverse Hierarchy",
        description: "Can negate or judge conflicts between cosmic abstracts and Infinity Stones."
      },
      {
        title: "Soul World Dominion",
        scale: "Infinite Consciousness",
        description: "Can draw and heal billions of souls within the tranquil pocket realm of the Soul Gem."
      }
    ]
  },
  {
    rank: 5,
    characterId: "doctor-strange",
    name: "Doctor Strange (Sorcerer Supreme)",
    alias: "Master of the Mystic Arts / Eye of Agamotto",
    image: "/images/characters/doctor-strange-comic.jpg",
    tier: "Multiversal",
    tierColor: "#10b981",
    reason: "Channels the Vishanti, wields the Words of Creation as leader of the Black Priests, and held entire reality breaches together.",
    heroicClass: "SORCERER SUPREME & MYSTIC ANCHOR",
    domain: "Sanctum Sanctorum / Astral Plane / Multiverse",
    description: "Doctor Stephen Strange is Earth's Sorcerer Supreme and principal defender against interdimensional horrors. In his classic and Black Priest incarnations, Strange commands mystic forces that rival cosmic abstracts, using ancient incantations, the Eye of Agamotto, and the Words of Creation to restructure reality and hold falling multiverses from collapsing.",
    potentialPower: {
      scale: "Multiversal Mystical Mastery",
      energySource: "The Vishanti / Chaos Magic / Words of Creation",
      classification: "Supreme Mystical Champion",
      summary: "Commands limitless mystical arts, astral projection across dimensions, dimensional banishment, time manipulation, and universal warding.",
      attributes: [
        { label: "Sorcery & Spellcraft", value: "Absolute Mastery", score: 97 },
        { label: "Words of Creation", value: "Reality Shattering", score: 98 },
        { label: "Astral Dimension Control", value: "Infinite Multiverse", score: 96 },
        { label: "Temporal Wards", value: "Agamotto Chrono-Lock", score: 95 },
        { label: "Dimensional Defense", value: "Omniversal Shielding", score: 97 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Led the Black Priests & Spoke the Words of Creation",
        eraOrEvent: "New Avengers (Time Runs Out)",
        description: "Assumed leadership of the Black Priests at the center of the Multiverse, speaking primordial syllables that could restructure and amputate corrupted realities to preserve the greater cosmos.",
        impact: "Preserved core multiversal continuity during the fatal incursions."
      },
      {
        title: "Merged with Eternity & Defeated Shuma-Gorath",
        eraOrEvent: "Doctor Strange Classic Runs",
        description: "Bonded his consciousness directly with the cosmic embodiment of Eternity and repeatedly banished the primordial multiversal demon Shuma-Gorath back to the Chaos Dimension.",
        impact: "Protected Earth and the mortal realm from eldritch consumption."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Dimensional Banishment & Reality Wards",
        scale: "Multiversal Incursion Scale",
        description: "Can seal breaches between universes and banish cosmic deities into infinite pocket voids."
      },
      {
        title: "Divine Vishanti Invocation",
        scale: "Cosmic Eldritch Tier",
        description: "Channels the combined power of Oshtur, Hoggoth, and Agamotto to cleanse cosmic blights."
      }
    ]
  },
  {
    rank: 6,
    characterId: "silver-surfer",
    name: "Silver Surfer (Power Cosmic)",
    alias: "The Sentinel of the Spaceways",
    image: "/images/characters/silver-surfer.jpg",
    tier: "High Cosmic",
    tierColor: "#94a3b8",
    reason: "Pure conduit of the Power Cosmic; commands matter transmutation, faster-than-light traversal, time travel, and purged Knull's abyss.",
    heroicClass: "POWER COSMIC CHAMPION",
    domain: "Deep Cosmos / Zenn-La",
    description: "Sacrificing his mortal life on Zenn-La to save his world from Galactus, Norrin Radd became the Silver Surfer. Infused with the Power Cosmic, he possesses near-infinite energy manipulation, the ability to transmute any element, traverse hyperspace faster than light, and channel stellar energy. He is the universe's ultimate selfless wanderer and protector.",
    potentialPower: {
      scale: "Cosmic Energy & Subatomic Transmutation",
      energySource: "The Power Cosmic",
      classification: "Cosmic Sentinel & Transmuter",
      summary: "Can manipulate cosmic energy, subatomic particles, gravity, electromagnetism, and traverse across timelines on his silver board.",
      attributes: [
        { label: "Power Cosmic Channeling", value: "Pure Supreme", score: 96 },
        { label: "Subatomic Transmutation", value: "Absolute Matter Control", score: 95 },
        { label: "FTL & Time Traversal", value: "Infinite Speed", score: 97 },
        { label: "Durability & Regeneration", value: "Star-Core Immune", score: 95 },
        { label: "Cosmic Awareness", value: "Universal Telepathy", score: 96 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Stood Against Galactus to Save Earth",
        eraOrEvent: "Fantastic Four #48–50 (1966)",
        description: "Inspired by the human spirit of Alicia Masters, Norrin defied his omnipotent master Galactus, siding with the Fantastic Four to protect Earth from total planetary consumption.",
        impact: "Saved Earth-616 from its very first extinction-level cosmic threat."
      },
      {
        title: "Purged the Dark Void in 'Silver Surfer: Black'",
        eraOrEvent: "Silver Surfer: Black (2019)",
        description: "Cast into the dawn of time, Norrin burned with the light of newly birthed stars to fight Knull, forging a dying star into a beacon of life that seeded the universe with living light.",
        impact: "Weakened the God of the Symbiotes and brought light to the primordial cosmos.",
        quote: "Let there be light."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Planetary Re-Ignition & Matter Transmutation",
        scale: "Star & Planetary Scale",
        description: "Can reignite dead suns, purify poisoned atmosphere, and turn solid lead into pure gold instantly."
      },
      {
        title: "Hyperspace & Quantum Phase",
        scale: "Universal Travel",
        description: "Travels billions of lightyears across galaxies in seconds and phases through planetary crusts."
      }
    ]
  },
  {
    rank: 7,
    characterId: "sentry",
    name: "The Sentry (Golden Guardian)",
    alias: "The Golden Guardian of Good",
    image: "/images/characters/sentry.jpg",
    tier: "High Cosmic",
    tierColor: "#eab308",
    reason: "Commands the power of a million exploding suns, instantaneous molecular regeneration, and defeated Molecule Man in pure matter combat.",
    heroicClass: "SOLAR PSIONIC TITAN",
    domain: "Earth-616 / The Watchtower",
    description: "Empowered by the Golden Sentry Serum, Robert Reynolds possesses power that defies traditional physics. Radiating the energy of a million exploding suns, his powers include absolute flight, invulnerability, light manipulation, and complete control over his own and surrounding molecular structures. When stable and fully heroic, he is virtually unstoppable.",
    potentialPower: {
      scale: "Solar Cosmic & Molecular Control",
      energySource: "Golden Sentry Serum / Trans-Dimensional Sun Source",
      classification: "Infinite Solar Entity",
      summary: "Infinite physical strength, light constructs, instant cellular restoration, and supreme matter control exceeding master molecular manipulators.",
      attributes: [
        { label: "Solar Energy Output", value: "1,000,000 Exploding Suns", score: 98 },
        { label: "Molecular Manipulation", value: "Beyond Molecule Man", score: 97 },
        { label: "Physical Strength", value: "Class 100+ / Infinite", score: 98 },
        { label: "Invulnerability", value: "Immortal Regeneration", score: 99 },
        { label: "Speed & Flight", value: "Faster-Than-Light", score: 96 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Defeated Owen Reece (Molecule Man) in Molecular Duel",
        eraOrEvent: "Dark Avengers #12",
        description: "After Molecule Man atomized Sentry into nothingness, Sentry reassembled his own body from absolute molecular dust, learned molecular manipulation on the spot, and disintegrated Owen Reece.",
        impact: "Proved that Sentry's control over matter surpasses multiversal-level entities."
      },
      {
        title: "Fought Galactus to a Stalemate",
        eraOrEvent: "Cosmic Lore (Sentry Vol. 1)",
        description: "Engaged the world-eating cosmic titan Galactus in direct solo combat, battling the Devourer to a complete standstill to protect the galaxy.",
        impact: "Demonstrated power capable of checking abstract cosmic predators."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Absolute Spontaneous Reconstitution",
        scale: "Subatomic Level",
        description: "Can reconstruct his entire body and conscious mind even if disintegrated on a molecular level."
      },
      {
        title: "Stellar Energy Flash",
        scale: "Solar System Scale",
        description: "Releases bursts of blinding golden light capable of vaporizing armadas and calming savage beasts."
      }
    ]
  },
  {
    rank: 8,
    characterId: "hulk",
    name: "Hulk (World Breaker)",
    alias: "The Green Scar / Smasher of Worlds",
    image: "/images/characters/world-breaker-hulk.jpg",
    tier: "High Cosmic",
    tierColor: "#22c55e",
    reason: "Peak gamma rage radiating kinetic devastation; footsteps shatter tectonic plates and punches crack planetary crusts.",
    heroicClass: "GAMMA FORCE MONARCH",
    domain: "Earth-616 / Sakaar",
    description: "When Bruce Banner's infinite rage reaches absolute cosmic resonance as the Green Scar, he becomes the World Breaker. Radiating a blinding aura of pure green gamma radiation, his footsteps cause continental tectonic devastation, and a single clash can obliterate planets. Driven by righteous protective fury, he fought the entire superhero community to protect his chosen people.",
    potentialPower: {
      scale: "Planetary Shattering Kinetic Gamma",
      energySource: "The Green Door / Infinite Gamma Resonance",
      classification: "Unbounded Physical Godhead",
      summary: "Boundless physical strength with no upper limit, continent-cracking shockwaves, regenerative healing factor, and radioactive aura.",
      attributes: [
        { label: "Physical Strength", value: "Unbounded / Infinite", score: 99 },
        { label: "Kinetic Shockwaves", value: "Planet-Cracking", score: 98 },
        { label: "Regenerative Factor", value: "Instantaneous Immortality", score: 98 },
        { label: "Gamma Emission", value: "Star-Core Thermal", score: 96 },
        { label: "Durability", value: "Nuke & Dimension Proof", score: 97 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Shattered an Entire Planet in the Dark Dimension",
        eraOrEvent: "Incredible Hulks #634 (2011)",
        description: "In combat against Red She-Hulk in the Dark Dimension, the mere shockwave of their physical collision completely shattered a colossal planet and its surrounding moons.",
        impact: "Demonstrated pure kinetic deicide capable of destroying planetary bodies."
      },
      {
        title: "Single-Handedly Overpowered Earth's Mightiest Heroes",
        eraOrEvent: "World War Hulk (2007)",
        description: "Conquered the Avengers, Fantastic Four, X-Men, Juggernaut, Ghost Rider, and Black Bolt through sheer unstoppable physical dominance and military strategy.",
        impact: "Exposed the moral flaws of the Illuminati and established his undisputed might."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Tectonic Step",
        scale: "Continental Scale",
        description: "A single step transfers enough subterranean shock to submerge entire coastlines and split faultlines."
      },
      {
        title: "Immortal Gamma Regeneration",
        scale: "Green Door Connection",
        description: "Heals severed limbs, destroyed organs, and mental attacks within fractions of a millisecond."
      }
    ]
  },
  {
    rank: 9,
    characterId: "wanda",
    name: "Scarlet Witch (Nexus Goddess)",
    alias: "The Nexus Being of Chaos & Reality",
    image: "/images/characters/scarlet-witch-comic.jpg",
    tier: "Multiversal",
    tierColor: "#ef4444",
    reason: "Nexus Being of Earth-616; uttered 'No More Mutants' altering the multiverse, absorbed the True Darkhold and defeated Chthon.",
    heroicClass: "NEXUS CHAOS SOVEREIGN",
    domain: "Earth-616 / The Chaos Realm",
    description: "Wanda Maximoff is the focal Nexus Being of Earth-616, giving her the extraordinary innate ability to alter probability and weave True Chaos Magic. Capable of reshaping realities across dimensions with simple spoken phrases, Wanda absorbed the elder god Chthon into her soul, mastering the Darkhold and acting as the guardian anchor of probability in the multiverse.",
    potentialPower: {
      scale: "Multiversal Probability & Reality Warping",
      energySource: "True Chaos Magic / Elder God Chthon Essence",
      classification: "Nexus Reality Shaper",
      summary: "Can rewrite physics, biological genomes, and history across multiple dimensions simultaneously through emotional and vocal intent.",
      attributes: [
        { label: "Chaos Magic", value: "Absolute Transcendent", score: 98 },
        { label: "Reality Reshaping", value: "Multiversal Scale", score: 98 },
        { label: "Nexus Resonance", value: "Anchor of Earth-616", score: 99 },
        { label: "Probability Manipulation", value: "Boundless", score: 97 },
        { label: "Eldritch Mastery", value: "Chthon Absorption", score: 96 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Uttered 'No More Mutants' Across the Multiverse",
        eraOrEvent: "House of M (2005)",
        description: "With three spoken words, Wanda stripped 98.6% of the world's mutant population of their X-gene, reshaping the fabric of reality across Earth-616 and neighboring timelines.",
        impact: "Fundamentally rewired the cosmic biological destiny of Earth."
      },
      {
        title: "Absorbed Chthon & The True Darkhold",
        eraOrEvent: "Darkhold Omega (2022)",
        description: "Rather than allowing the Elder God Chthon to breach the mortal realm, Wanda absorbed the primordial entity and the Darkhold directly into her soul, becoming the master of true chaos.",
        impact: "Permanently neutralized Marvel's oldest eldritch corruption."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Nexus Reality Re-Weaving",
        scale: "Multiverse Scale",
        description: "Manifests alternate timeline pockets and alters fundamental physics with vocal commands."
      },
      {
        title: "Hex Barrier & Probability Erasure",
        scale: "Global / Planetary",
        description: "Turns impossible statistical outcomes into certainty and encases nations in altered realities."
      }
    ]
  },
  {
    rank: 10,
    characterId: "the-watcher",
    name: "The Watcher (Multiversal Mind)",
    alias: "The Eye of the Multiverse",
    image: "/images/characters/the-watcher.jpg",
    tier: "High Cosmic",
    tierColor: "#60a5fa",
    reason: "Cosmic entity capable of viewing all parallel timelines simultaneously; wields immense energy manipulation and broke oaths to save Earth.",
    heroicClass: "MULTIVERSAL OBSERVER & GUARDIAN",
    domain: "The Blue Area of the Moon / Multiverse",
    description: "Stationed on Earth's Moon, Uatu is a member of the ancient Watcher race sworn to observe and never interfere in the events of the cosmos. Bound by compassion for humanity, Uatu repeatedly violated his sacred oath to alert the Fantastic Four to Galactus, protect the timelines, and safeguard the multiverse against absolute extinction.",
    potentialPower: {
      scale: "Multiversal Cosmic Sight & Energy Control",
      energySource: "Watcher Cosmic Heritage / Delta Energy",
      classification: "Cosmic Scholar & Reality Arbiter",
      summary: "Omnipresent awareness of divergent timelines, psionic projection, energy transmutation, and interdimensional translocation.",
      attributes: [
        { label: "Multiversal Sight", value: "All Parallel Realities", score: 98 },
        { label: "Cosmic Energy Control", value: "High Abstract Tier", score: 95 },
        { label: "Interdimensional Phasing", value: "Instant Omniverse", score: 96 },
        { label: "Telepathic Mastery", value: "Planetary / Cosmic", score: 94 },
        { label: "Moral Conviction", value: "Compassionate Protector", score: 97 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Broke His Sacred Oath to Save Earth from Galactus",
        eraOrEvent: "Fantastic Four #48 (1966)",
        description: "Concealed Earth with cosmic mirages, traveled across galaxies to retrieve the Ultimate Nullifier, and delivered it to Mister Fantastic to repel Galactus.",
        impact: "Prevented Earth-616 from being consumed by Galactus."
      },
      {
        title: "Assembled the Guardians of the Multiverse",
        eraOrEvent: "Multiversal Crisis",
        description: "Stepped in to recruit champions across divergent realities to stop Infinity Ultron from consuming every timeline in the multiverse.",
        impact: "Rescued the entire multiverse from synthetic omnicide."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Omniscient Timeline Observation",
        scale: "Infinite Multiverse",
        description: "Simultaneously witnesses every divergent choice, nexus event, and alternate reality in existence."
      },
      {
        title: "Cosmic Reality Cloaking",
        scale: "Planetary / Star System",
        description: "Can cloak entire planets in optical and cosmic illusions to hide them from cosmic predators."
      }
    ]
  },
  {
    rank: 11,
    characterId: "frank-castle",
    name: "Ghost Rider (Cosmic Ghost Rider)",
    alias: "The Herald of Vengeance",
    image: "/images/characters/cosmic-ghost-rider.jpg",
    tier: "High Cosmic",
    tierColor: "#f97316",
    reason: "Infused with both the Spirit of Vengeance and the Power Cosmic; wields cosmic hellfire and a Penance Stare that burns cosmic gods.",
    heroicClass: "COSMIC HELLFIRE SENTINEL",
    domain: "Dead Timelines / The End of Time",
    description: "In an alternate future where Thanos slaughtered Earth, Frank Castle made a pact with Mephisto to become Ghost Rider, then made a pact with Galactus to gain the Power Cosmic. Armed with infinite cosmic hellfire, indestructible chains forged from the bones of Cyttorak, and a Penance Stare powered by cosmic energy, he is an unstoppable force of chaotic righteous fury.",
    potentialPower: {
      scale: "Dual Power Cosmic & Spirit of Vengeance",
      energySource: "Mephisto Hellfire + Galactus Power Cosmic",
      classification: "Transcendent Anti-Hero",
      summary: "Cosmic hellfire blast projection, Cyttorak bone chains, Time Stone manipulation, lightspeed motorcycle traversal through space.",
      attributes: [
        { label: "Cosmic Hellfire", value: "Solar System Incineration", score: 96 },
        { label: "Penance Stare", value: "Cosmic Entity Burn", score: 98 },
        { label: "Power Cosmic Fusion", value: "Herald Tier+", score: 95 },
        { label: "Indestructible Durability", value: "Absolute", score: 96 },
        { label: "Temporal Travel", value: "Time Shard Weaving", score: 94 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Incinerated Armies of Alternate Future Thanos",
        eraOrEvent: "Thanos Wins (2017)",
        description: "Fought across millions of years, annihilating cosmic hordes, fighting alongside Silver Surfer with the Annihilation Sword, and incinerating entire planetary fleets.",
        impact: "Delivered cosmic vengeance across an entire timeline."
      },
      {
        title: "Raised Baby Thanos to Change Cosmic History",
        eraOrEvent: "Cosmic Ghost Rider (2018)",
        description: "Traveled back in time to kidnap baby Thanos, attempting to raise the titan with compassion and morality to prevent the extinction of the universe.",
        impact: "Challenged the very concept of fixed cosmic destiny with love and chaos."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Cosmic Penance Stare",
        scale: "Planetary / Abstract Soul Burn",
        description: "Forces cosmic entities, gods, and warlords to feel the suffering of trillions of slaughtered souls instantly."
      },
      {
        title: "Space-Bound Hellfire Bike",
        scale: "Intergalactic Speed",
        description: "Traverses hyperspace without oxygen, bursting through stars and alien armada flagships."
      }
    ]
  },
  {
    rank: 12,
    characterId: "black-bolt",
    name: "Black Bolt (Midnight King)",
    alias: "The Midnight King / Voice of the Cosmos",
    image: "/images/characters/black-bolt-comic.jpg",
    tier: "High Cosmic",
    tierColor: "#38bdf8",
    reason: "Quasi-sonic electron channeler; a whisper shatters mountain ranges, and a full scream tears holes in reality itself.",
    heroicClass: "INHUMAN MONARCH OF DEVASTATION",
    domain: "Attilan / The Kree Empire",
    description: "The supreme monarch of the Inhumans, Blackagar Boltagon possesses the most devastating destructive biological weapon in Marvel history. His brain harnesses ambient electrons to fuel his speech center: a mere murmur levels cities, while his full sonic scream can rip dimensional tears through space and obliterate cosmic fleets.",
    potentialPower: {
      scale: "Quasi-Sonic Molecular Shattering & Electron Control",
      energySource: "Electron Particle Channeling / Inhuman Heritage",
      classification: "Living Weapon of Mass Destruction",
      summary: "Particle manipulation, hypersonic flight, electron force fields, physical strength matching Thor, and vocal deicide.",
      attributes: [
        { label: "Quasi-Sonic Scream", value: "Planetary & Dimension Tear", score: 97 },
        { label: "Electron Manipulation", value: "Matter Channeling", score: 94 },
        { label: "Physical Godly Might", value: "Hulk / Thor Rival", score: 93 },
        { label: "Master Shielding", value: "Nuclear Proof Forcefield", score: 95 },
        { label: "Royal Restraint", value: "Absolute Iron Discipline", score: 99 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Detonated the Terrigen Bomb & Tore the Fault in Space-Time",
        eraOrEvent: "War of Kings (2009)",
        description: "Clashed with Vulcan, unleashing a full vocal scream that detonated the Terrigen Bomb and ripped open 'The Fault'—a catastrophic multiversal tear in space-time.",
        impact: "Demonstrated power capable of puncturing the fabric of the universe."
      },
      {
        title: "Whispered Thanos Through a Mountain Range",
        eraOrEvent: "Infinity (2013)",
        description: "Stood alone in Attilan against Thanos, unleashing a focused vocal blast that destroyed the entire floating city and pulverized the Mad Titan into the bedrock.",
        impact: "Inflicted severe physical damage on an Eternal warlord."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Vocal Dimension Shatter",
        scale: "Planetary / Star Cluster Scale",
        description: "A full scream destabilizes matter at atomic bonds across thousands of miles."
      },
      {
        title: "Master Electron Blast",
        scale: "Subatomic Channeling",
        description: "Fires focused electron beams from the tuning fork on his brow that incinerate alien dreadnoughts."
      }
    ]
  },
  {
    rank: 13,
    characterId: "peter-quill",
    name: "Star-Lord (Master of the Sun)",
    alias: "The Solar Avatar of the Cosmos",
    image: "/images/characters/star-lord-sun.jpg",
    tier: "High Cosmic",
    tierColor: "#f59e0b",
    reason: "Infused with the pure elemental solar power of the Master of the Sun; defeated the Olympian Pantheon of New Olympus.",
    heroicClass: "SOLAR COSMIC AVATAR",
    domain: "Deep Space / Guardians of the Galaxy",
    description: "After spending 140 years in an alternate dimension on Morinus, Peter Quill returned empowered as the Master of the Sun. Moving beyond mortal blasters, he channels pure elemental cosmic solar fire, light, and gravitational energy, capable of taking down cosmic deities and mythological pantheons solo.",
    potentialPower: {
      scale: "Solar Elemental & Cosmic Light Manipulation",
      energySource: "The Master of the Sun / Solar Core Reservoir",
      classification: "Cosmic Deity & Elementalist",
      summary: "Elemental gun transmutation, solar flares, cosmic gravity control, and immortality through solar renewal.",
      attributes: [
        { label: "Solar Energy Projection", value: "Stellar Starfire", score: 94 },
        { label: "Elemental Transmutation", value: "Air, Fire, Water, Earth", score: 93 },
        { label: "God Slaying Capability", value: "Olympian Pantheon Buster", score: 95 },
        { label: "Tactical Leadership", value: "Cosmic General", score: 96 },
        { label: "Cosmic Longevity", value: "Centuries of Battle Wisdom", score: 94 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Annihilated the Reborn Olympian Gods on New Olympus",
        eraOrEvent: "Guardians of the Galaxy by Al Ewing (2020)",
        description: "Single-handedly confronted the resurrected, bloodthirsty Greek Gods led by Zeus, draining their divine energy and destroying their cosmic city with a solar burst.",
        impact: "Ended an existential galactic pantheon threat."
      },
      {
        title: "Held the Cancerverse Void with Nova",
        eraOrEvent: "The Thanos Imperative",
        description: "Stood ground at the center of a collapsing universe, holding back eldritch Many-Angled Ones to ensure Earth's reality remained uncorrupted.",
        impact: "Prevented a cosmic plague from overtaking the multiverse."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Sun God Flare",
        scale: "Solar System Radiance",
        description: "Releases pulses of solar light that blind cosmic entities and disintegrate dark matter constructs."
      },
      {
        title: "Elemental Gun Manifestation",
        scale: "Subatomic Element Creation",
        description: "Fires pure planetary elements, summoning tidal waves and earthen crusts in vacuum."
      }
    ]
  },
  {
    rank: 14,
    characterId: "charles-xavier",
    name: "Professor X (Krakoan Cerebro)",
    alias: "Architect of Krakoa / Earth's Supreme Mind",
    image: "/images/characters/professor-x-comic.jpg",
    tier: "Cosmic",
    tierColor: "#3b82f6",
    reason: "Earth's supreme telepath; can freeze 8 billion minds simultaneously, backup and restore mutant souls, and shatter astral entities.",
    heroicClass: "ALPHA-TO-OMEGA PSIONIC ARCHITECT",
    domain: "Krakoa / Astral Plane / Earth-616",
    description: "Charles Francis Xavier is the visionary founder of the X-Men and Earth's preeminent telepathic mind. Through Cerebro and the Krakoan resurrection network, Xavier connected to every mutant and human mind on the planet, storing consciousness backups of millions and fighting cosmic psionic battles across the Astral Plane.",
    potentialPower: {
      scale: "Global & Astral Psionic Supremacy",
      energySource: "Innate Omega-Tier Mutant Psionic Spark + Cerebro",
      classification: "Supreme Telepath & Soul Weaver",
      summary: "Planetary telepathy, memory alteration, mind freezing, psionic blast projection, and astral soul preservation.",
      attributes: [
        { label: "Planetary Telepathy", value: "8 Billion Minds Synced", score: 96 },
        { label: "Astral Plane Combat", value: "Supreme Master", score: 95 },
        { label: "Consciousness Storage", value: "Mutant Resurrection Network", score: 97 },
        { label: "Mind Control & Illusions", value: "Absolute", score: 94 },
        { label: "Visionary Empathy", value: "Peaceful Coexistence", score: 98 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Built the Krakoan Resurrection Network",
        eraOrEvent: "House of X / Powers of X (2019)",
        description: "Stored the soul-consciousness of every mutant on Earth inside Cerebro, enabling the Five to resurrect millions of fallen mutants and defeat mortality.",
        impact: "Ended mutant extinction and changed the sociopolitical landscape of the world."
      },
      {
        title: "Defeated the Shadow King on the Astral Plane",
        eraOrEvent: "Classic X-Men Run",
        description: "Engaged the ancient psionic demon Amahl Farouk on the Astral Plane, defeating the dark entity with pure psionic willpower to protect humanity's dreams.",
        impact: "Safeguarded the subconscious minds of all mortals on Earth."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Global Mind Freeze",
        scale: "Planetary Population",
        description: "Can pause the conscious thought of every human, mutant, and animal on Earth simultaneously."
      },
      {
        title: "Astral Reality Sculpting",
        scale: "Astral Plane Dimension",
        description: "Shapes thought forms into indestructible armor and weapons in the psychic realm."
      }
    ]
  },
  {
    rank: 15,
    characterId: "captain-marvel",
    name: "Captain Marvel (Binary)",
    alias: "The White Hole Conduit",
    image: "/images/characters/binary-captain-marvel.jpg",
    tier: "Cosmic",
    tierColor: "#ef4444",
    reason: "Taps directly into the energy of a white hole; possesses near-limitless stellar photon output and infinite energy absorption.",
    heroicClass: "STELLAR PHOTONIC GODDESS",
    domain: "Deep Space / Earth-616 / Avengers",
    description: "When Carol Danvers was experimented upon by the alien Brood, her connection to a cosmic white hole was unlocked, transforming her into Binary. In this state, she radiates stellar energy, manipulates gravity, survives the vacuum of deep space without equipment, and absorbs cosmic attacks to amplify her own power exponentially.",
    potentialPower: {
      scale: "Stellar White Hole Energy Channeling",
      energySource: "Cosmic White Hole Singularity",
      classification: "Stellar Energy Sovereign",
      summary: "Photonic beam discharge, energy absorption with no upper limit, lightspeed flight, gravity manipulation, and stellar thermals.",
      attributes: [
        { label: "White Hole Photon Output", value: "Stellar Star Energy", score: 95 },
        { label: "Infinite Energy Absorption", value: "Limitless Conversion", score: 97 },
        { label: "Lightspeed Interstellar Flight", value: "Deep Space Traversal", score: 94 },
        { label: "Physical Strength", value: "Class 100+ / Hulk Buster", score: 93 },
        { label: "Cosmic Durability", value: "Supernova Resistant", score: 95 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Absorbed & Dissipated a Star-Killing Mega-Warhead",
        eraOrEvent: "Captain Marvel (2019)",
        description: "Flew directly into the core of a star-killing radioactive weapon, absorbed its entire catastrophic energy payload without harm, and converted it into light.",
        impact: "Prevented the total destruction of Earth's atmosphere."
      },
      {
        title: "Led the Avengers in Cosmic Incursions and Interstellar Wars",
        eraOrEvent: "Empyre & Infinity Wars",
        description: "Commanded the united cosmic fleets against Kree-Skrull armadas and Cotati invaders, proving herself as Earth's premier space defense anchor.",
        impact: "Preserved peace across intergalactic empires."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Binary Photon Supernova",
        scale: "Star / Planetary Scale",
        description: "Releases concentrated stellar radiation that can burn through alien armada hulls in fractions of a second."
      },
      {
        title: "Universal Energy Ingestion",
        scale: "Cosmic Blasts & Nuclear Fire",
        description: "Absorbs cosmic magic, lasers, and nuclear blasts to increase her own physical power."
      }
    ]
  },
  {
    rank: 16,
    characterId: "odin",
    name: "Odin (All-Father)",
    alias: "Architect of the Nine Realms / Master of the Odinforce",
    image: "/images/characters/odin-comic.jpg",
    tier: "High Cosmic",
    tierColor: "#d97706",
    reason: "Master of the Odinforce; extinguished entire burning galaxies in battle with Seth, forged Mjolnir, and fought Galactus.",
    heroicClass: "ALL-FATHER OF ASGARD",
    domain: "Asgard / Yggdrasil",
    description: "The wise and battle-hardened ruler of Asgard, Odin Borson is the legendary All-Father who united the Nine Realms and established peace across the cosmos. Wielding the Odinforce—a divine magical reservoir formed from his brothers Vili and Ve—Odin has shattered galaxies in battle, banished primordial demons, and protected mortals for millions of years.",
    potentialPower: {
      scale: "Galactic Divine Magic & Reality Control",
      energySource: "The Odinforce / Asgardian Divine Spark",
      classification: "Supreme Skyfather",
      summary: "Galaxy-scale energy projection, time stopping, dimension sealing, enchanting uru weapons (Mjolnir), and reviving fallen armies.",
      attributes: [
        { label: "The Odinforce", value: "Galactic Divine Power", score: 97 },
        { label: "Weapon Enchantment", value: "Mjolnir / Gungnir Mastery", score: 96 },
        { label: "Dimensional Sealing", value: "Nine Realms Sovereign", score: 95 },
        { label: "Physical Godly Might", value: "Galactus Headbutt Level", score: 96 },
        { label: "Ancient Wisdom", value: "Yggdrasil Knowledge", score: 98 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Extinguished Galaxies in Battle with the Serpent God Seth",
        eraOrEvent: "Thor #399–400",
        description: "Clashed with the death god Seth across dimensions, with their physical and magical shockwaves extinguishing burning galaxies and shattering space-time fabric.",
        impact: "Saved the entire universe from eternal necrotic entropy."
      },
      {
        title: "Trapped the God Tempest & Forged Mjolnir",
        eraOrEvent: "Mighty Thor (2016)",
        description: "Wrestled the sentient cosmic storm known as the God Tempest, trapped its infinite fury inside a chunk of pure Uru metal, and forged the hammer Mjolnir.",
        impact: "Created the legendary weapon that defines Asgard's greatest champions."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Odinforce Reality Banishment",
        scale: "Galaxy / Dimension Scale",
        description: "Can transport entire planetary populations across dimensions and freeze planetary time indefinitely."
      },
      {
        title: "All-Father Divine Blessing",
        scale: "Godly Enchantment",
        description: "Bestows divine immortality, weather control, and cosmic authority on worthy champions."
      }
    ]
  },
  {
    rank: 17,
    characterId: "reed-richards",
    name: "Mister Fantastic (Council of Reeds)",
    alias: "The Smartest Man in the Multiverse",
    image: "/images/characters/reed-richards-comic.jpg",
    tier: "High Cosmic",
    tierColor: "#0284c7",
    reason: "Greatest mortal intellect in existence; built the Bridge to observe all realities, outsmarted Celestials, and rebuilt the Marvel Multiverse.",
    heroicClass: "MULTIVERSAL ARCHITECT & SCIENTIFIC TITAN",
    domain: "Baxter Building / Interdimensional Council of Reeds",
    description: "Dr. Reed Richards is the intellectual anchor of Earth and the leader of the Fantastic Four. Capable of stretching his body to impossible molecular proportions, Reed's true cosmic might is his unmatched intellect. He outwitted the Beyonders, defeated God Emperor Doom through morality and science, and reconstructed every universe in the multiverse.",
    potentialPower: {
      scale: "Multiversal Technology & Molecular Elasticity",
      energySource: "Cosmic Ray Mutation + Super-Intellect",
      classification: "Universal Architect & Strategic Deity",
      summary: "Supreme technological invention, dimensional mapping, Ultimate Nullifier weaponization, Council of Reeds multiversal network.",
      attributes: [
        { label: "Intellect & Invention", value: "Beyond Omniscient Tech", score: 100 },
        { label: "Multiverse Mapping", value: "Full Multiversal Bridge", score: 98 },
        { label: "Cosmic Strategy", value: "Outwitted God Doom & Celestials", score: 98 },
        { label: "Molecular Elasticity", value: "Immune to Blunt Force & EMP", score: 92 },
        { label: "Moral Leadership", value: "Father of Multiverse Rebirth", score: 99 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Rebuilt the Entire Multiverse Alongside Franklin & Molecule Man",
        eraOrEvent: "Secret Wars Conclusion (2015)",
        description: "Convinced Owen Reece to strip God Emperor Doom of his Beyonder power, took the divine spark, and partnered with Franklin to reconstruct infinite parallel realities.",
        impact: "Restored every single cosmos and lifeform across Marvel reality."
      },
      {
        title: "Formed the Interdimensional Council of Reeds",
        eraOrEvent: "Fantastic Four by Jonathan Hickman",
        description: "Gathered alternate Reed Richards variants across infinite universes wielding Infinity Gauntlets and Ultimate Nullifiers to 'Solve Everything'.",
        impact: "Created the greatest intellectual defense federation in cosmic history."
      }
    ],
    whatTheyCanDo: [
      {
        title: "The Bridge Construction",
        scale: "Omniverse Observation",
        description: "Peers into any point in the past, present, or future across infinite parallel dimensions."
      },
      {
        title: "Ultimate Nullifier Calibration",
        scale: "Universal Erasure Control",
        description: "Can calculate and safely target conceptual entities for deletion without harming bystander realities."
      }
    ]
  },
  {
    rank: 18,
    characterId: "iron-man",
    name: "Iron Man (Godbuster Armor)",
    alias: "The Mechanic / Savior of the Universe",
    image: "/images/characters/iron-man-godbuster.jpg",
    tier: "High Cosmic",
    tierColor: "#eab308",
    reason: "Engineered the Godbuster and Celestial Hulkbuster armors; snapped the Nano Gauntlet to vanquish Thanos; cosmic tech visionary.",
    heroicClass: "COSMIC TECH VISIONARY & GODBUSTER",
    domain: "Earth-616 / Stark Industries / The Cosmos",
    description: "Anthony Edward Stark proved that mortal human intellect, relentless engineering, and sheer heroic will can stand toe-to-toe with cosmic gods. From escaping a cave in the Mark I to crafting the Godkiller Mark II, the Godbuster armor inside the eScape, and wielding all six Infinity Stones to save all creation, Tony Stark is the soul of heroism.",
    potentialPower: {
      scale: "Celestial-Buster Engineering & Nanotech Godhood",
      energySource: "Arc Reactor / Zero-Point Energy / Cosmic God Armor",
      classification: "Technological Apex Hero",
      summary: "Godbuster armor capable of overpowering digital and cosmic entities, instant nanotech deployment, Infinity Gauntlet compatibility, and AI synthesis.",
      attributes: [
        { label: "Engineering & Innovation", value: "Godkiller Level", score: 98 },
        { label: "Armor Arsenal", value: "85+ Specialized Iterations", score: 97 },
        { label: "Infinity Gauntlet Will", value: "Universal Savior Snap", score: 99 },
        { label: "Tactical Genius", value: "Futurist & Master Strategist", score: 96 },
        { label: "Heroic Sacrifice", value: "Ultimate Cosmic Anchor", score: 100 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Built the Godbuster Armor in the Virtual eScape",
        eraOrEvent: "Tony Stark: Iron Man (2019)",
        description: "Constructed an armor whose power output was so colossal that Arno Stark classified it as the ultimate masterpiece, capable of shattering digital gods and cosmic avatars.",
        impact: "Defeated the Motherboard and saved millions of trapped human minds."
      },
      {
        title: "Delivered the Final Nano-Gauntlet Snap Against Thanos",
        eraOrEvent: "Avengers: Endgame (2019 / Earth-616)",
        description: "Channeling all six Infinity Stones through his nanotech armor, Tony looked Thanos in the eyes, uttered 'I am Iron Man,' and wiped the Mad Titan's armies from existence.",
        impact: "Rescued the entire universe from permanent extinction.",
        quote: "And I... am... Iron Man."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Celestial Hulkbuster Deployment",
        scale: "Celestial Scale",
        description: "Pilots massive orbital armors capable of wrestling Dark Celestials and cosmic leviathans."
      },
      {
        title: "Instant Nanotech Armor Adaptation",
        scale: "Millisecond Reaction",
        description: "Restructures armor into energy blades, lightning re-channelers, and heavy repulsor cannons instantaneously."
      }
    ]
  },
  {
    rank: 19,
    characterId: "captain-america",
    name: "Captain America (Worthy / Mjolnir)",
    alias: "The Sentinel of Liberty / Wielder of Mjolnir",
    image: "/images/characters/captain-america-worthy.jpg",
    tier: "Cosmic",
    tierColor: "#3b82f6",
    reason: "The moral compass of the multiverse; wielded Mjolnir against Thanos, led the Avengers through cosmic wars, unbreakable vibranium shield.",
    heroicClass: "DIVINE WORTHY COMMANDER",
    domain: "Earth-616 / Avengers Initiative",
    description: "Steven Rogers represents the unconquerable spirit of human courage and morality. Enhanced by the Super Soldier Serum, Steve's greatest weapon is his pure, unyielding heart. Proving worthy to summon and wield the divine hammer Mjolnir, Captain America commanded lightning and stood alone against cosmic conquerors to protect freedom.",
    potentialPower: {
      scale: "Divine Mjolnir Worthiness & Super-Soldier Apex",
      energySource: "Super Soldier Serum + Divine Asgardian Mjolnir Magic",
      classification: "Worthy Divine Commander",
      summary: "Divine thunder manipulation, vibranium shield ricochet mastery, tactical leadership uniting cosmic armadas, unbreakable willpower.",
      attributes: [
        { label: "Mjolnir Divine Power", value: "Thor's Full Lightning Power", score: 95 },
        { label: "Vibranium Shield Mastery", value: "Kinetic Absorption", score: 96 },
        { label: "Tactical Leadership", value: "Unites Gods & Mortals", score: 100 },
        { label: "Indomitable Will", value: "Never Yields / 'I Can Do This All Day'", score: 100 },
        { label: "Physical Conditioning", value: "Peak Super-Soldier", score: 92 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Summoned Mjolnir & Battered Thanos",
        eraOrEvent: "Avengers: Endgame (2019)",
        description: "When Thor was pinned by Thanos, Cap called Mjolnir across the battlefield, combined it with his shield in an electrifying combo, and summoned lightning to batter the Mad Titan.",
        impact: "Turned the tide in the ultimate battle for the universe.",
        quote: "Avengers... assemble."
      },
      {
        title: "Stood Alone Against Thanos and His Entire Cosmic Army",
        eraOrEvent: "Battle of Earth",
        description: "With a broken shield and wounded body, Steve stood alone between Thanos' galactic armada and the ashes of Earth, tightening the strap on his arm without hesitation.",
        impact: "Defined the true meaning of superheroic courage across the cosmos."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Divine Thunder & Shield Combo",
        scale: "Tactical Deicide",
        description: "Strikes vibranium shield with Mjolnir to create concussive lightning shockwaves that shatter armadas."
      },
      {
        title: "Unbreakable Willpower Beacon",
        scale: "Morale / Multiversal Inspiration",
        description: "Inspires gods, mutants, and cosmic beings to fight past their mortal limits in defense of the innocent."
      }
    ]
  },
  {
    rank: 20,
    characterId: "spider-man",
    name: "Spider-Man (Captain Universe)",
    alias: "The Friendly Neighborhood Hero / Avatar of Responsibility",
    image: "/images/characters/cosmic-spider-man.jpg",
    tier: "Cosmic",
    tierColor: "#ef4444",
    reason: "Chosen champion of the Enigma Force as Captain Universe; moral beacon acknowledged by The One-Above-All and the Beyonder.",
    heroicClass: "COSMIC CHAMPION OF RESPONSIBILITY",
    domain: "Midtown / Earth-616 / Spider-Verse Nexus",
    description: "Bitten by a radioactive spider, Peter Parker learned the sacred creed: 'With great power comes great responsibility.' Beyond his agile street-level heroics, Peter's pure heart led the cosmic Enigma Force to choose him as Captain Universe, allowing him to manipulate subatomic matter and shatter Tri-Sentinels. He is celebrated across the multiverse as the greatest hero of all.",
    potentialPower: {
      scale: "Uni-Power Cosmic Manipulation & Spider-Sense Nexus",
      energySource: "The Enigma Force + Web of Life and Destiny",
      classification: "Cosmic Spider Champion",
      summary: "Precognitive Spider-Sense connected to the Web of Life, subatomic matter transmutation, lightspeed flight, and unyielding moral conviction.",
      attributes: [
        { label: "Cosmic Uni-Power", value: "Matter Transmutation & FTL", score: 95 },
        { label: "Spider-Sense", value: "Nexus Multiverse Precognition", score: 97 },
        { label: "Physical Agility & Might", value: "Class 25+ / Cosmic Amplified", score: 93 },
        { label: "Scientific Intellect", value: "Biochemical & Nano Genius", score: 94 },
        { label: "Heart & Responsibility", value: "Multiversal Moral Anchor", score: 100 }
      ]
    },
    whatTheyHaveDone: [
      {
        title: "Wielded the Uni-Power to Destroy the Tri-Sentinel",
        eraOrEvent: "Acts of Vengeance (1989)",
        description: "Empowered as Cosmic Spider-Man, Peter effortlessly punched the Grey Hulk into orbit, transmuted solid matter, and unleashed a cosmic blast to incinerate the Tri-Sentinel.",
        impact: "Rescued New York City from total devastation."
      },
      {
        title: "Center of the Web of Life in Spider-Verse",
        eraOrEvent: "Spider-Verse (2014)",
        description: "Led an army of hundreds of Spider-Heroes from across infinite parallel realities to defeat the Inheritors and preserve the multiverse's web of destiny.",
        impact: "Saved every Spider-Hero in existence from vampiric consumption."
      }
    ],
    whatTheyCanDo: [
      {
        title: "Cosmic Web Weaving",
        scale: "Subatomic / Cosmic Energy",
        description: "Spins webs of pure cosmic energy that can restrain stellar behemoths and absorb dimensional shockwaves."
      },
      {
        title: "Multiversal Precognitive Warning",
        scale: "Quantum Hazard Detection",
        description: "Spider-Sense warns of cosmic cataclysms and dimensional tears before they occur."
      }
    ]
  }
];

export const HERO_SLUG_ALIASES: Record<string, string> = {
  // Thor / Rune King Thor
  "runekingthor": "thor",
  "rune-king-thor": "thor",
  "thor-rune-king": "thor",
  "runethor": "thor",
  "rune-thor": "thor",
  "cosmickingthor": "thor",
  "cosmic-king-thor": "thor",
  "allfatherthor": "thor",
  "allfather-thor": "thor",
  "kingthor": "thor",
  "king-thor": "thor",
  "thor-god-of-thunder": "thor",

  // The One-Above-All
  "theoneaboveall": "the-one-above-all",
  "the-one-above-all": "the-one-above-all",
  "toaa": "the-one-above-all",
  "one-above-all": "the-one-above-all",
  "oneaboveall": "the-one-above-all",

  // Franklin Richards
  "franklinrichards": "franklin-richards",
  "franklin-richards": "franklin-richards",
  "franklin": "franklin-richards",

  // Adam Warlock / Living Tribunal
  "adamwarlock": "adam-warlock",
  "adam-warlock": "adam-warlock",
  "livingtribunal": "adam-warlock",
  "living-tribunal": "adam-warlock",
  "adam-warlock-tribunal": "adam-warlock",

  // Doctor Strange
  "doctorstrange": "doctor-strange",
  "doctor-strange": "doctor-strange",
  "drstrange": "doctor-strange",
  "dr-strange": "doctor-strange",
  "black-priests-strange": "doctor-strange",
  "blackprieststrange": "doctor-strange",
  "strangesupreme": "doctor-strange",
  "strange-supreme": "doctor-strange",

  // Silver Surfer
  "silversurfer": "silver-surfer",
  "silver-surfer": "silver-surfer",
  "silversurferblack": "silver-surfer",
  "silver-surfer-black": "silver-surfer",
  "norrin-radd": "silver-surfer",

  // Sentry
  "sentry": "sentry",
  "thesentry": "sentry",
  "the-sentry": "sentry",
  "sentry-void": "sentry",
  "sentryvoid": "sentry",
  "merged-sentry": "sentry",
  "robert-reynolds": "sentry",

  // Hulk / World Breaker Hulk
  "worldbreakerhulk": "hulk",
  "world-breaker-hulk": "hulk",
  "worldbreaker": "hulk",
  "world-breaker": "hulk",
  "titanhulk": "hulk",
  "titan-hulk": "hulk",
  "green-scar": "hulk",
  "greenscar": "hulk",
  "immortalhulk": "hulk",
  "immortal-hulk": "hulk",

  // Wanda / Scarlet Witch
  "scarletwitch": "wanda",
  "scarlet-witch": "wanda",
  "wanda": "wanda",
  "wanda-maximoff": "wanda",
  "wandamaximoff": "wanda",
  "chaosmagicwanda": "wanda",

  // The Watcher
  "thewatcher": "the-watcher",
  "the-watcher": "the-watcher",
  "watcher": "the-watcher",
  "uatu": "the-watcher",
  "uatuthewatcher": "the-watcher",
  "uatu-the-watcher": "the-watcher",

  // Cosmic Ghost Rider / Frank Castle
  "cosmicghostrider": "frank-castle",
  "cosmic-ghost-rider": "frank-castle",
  "frankcastle": "frank-castle",
  "frank-castle": "frank-castle",
  "punisher-cosmic": "frank-castle",

  // Black Bolt
  "blackbolt": "black-bolt",
  "black-bolt": "black-bolt",
  "blackagar": "black-bolt",
  "blackagar-boltagon": "black-bolt",
  "midnight-king": "black-bolt",

  // Star-Lord / Peter Quill
  "starlord": "peter-quill",
  "star-lord": "peter-quill",
  "peterquill": "peter-quill",
  "peter-quill": "peter-quill",
  "masterofthesun": "peter-quill",
  "master-of-the-sun": "peter-quill",

  // Professor X / Charles Xavier
  "charlesxavier": "charles-xavier",
  "charles-xavier": "charles-xavier",
  "professorx": "charles-xavier",
  "professor-x": "charles-xavier",
  "profx": "charles-xavier",
  "prof-x": "charles-xavier",

  // Captain Marvel / Carol Danvers
  "captainmarvel": "captain-marvel",
  "captain-marvel": "captain-marvel",
  "binary": "captain-marvel",
  "caroldanvers": "captain-marvel",
  "carol-danvers": "captain-marvel",

  // Odin All-Father
  "odin": "odin",
  "odinallfather": "odin",
  "odin-allfather": "odin",
  "allfatherodin": "odin",
  "allfather-odin": "odin",
  "odinborson": "odin",
  "odin-borson": "odin",

  // Reed Richards / The Maker
  "reedrichards": "reed-richards",
  "reed-richards": "reed-richards",
  "misterfantastic": "reed-richards",
  "mister-fantastic": "reed-richards",
  "mrfantastic": "reed-richards",
  "mr-fantastic": "reed-richards",
  "themaker": "reed-richards",
  "the-maker": "reed-richards",

  // Iron Man / Godbuster
  "godbuster": "iron-man",
  "godbuster-ironman": "iron-man",
  "godbuster-iron-man": "iron-man",
  "godkiller-ironman": "iron-man",
  "cosmic-ironman": "iron-man",
  "cosmic-iron-man": "iron-man",

  // Captain America / Worthy Cap
  "worthycap": "captain-america",
  "worthy-cap": "captain-america",
  "worthycaptainamerica": "captain-america",
  "worthy-captain-america": "captain-america",

  // Spider-Man / Cosmic Spider-Man
  "cosmicspiderman": "spider-man",
  "cosmic-spider-man": "spider-man",
  "captainuniverse": "spider-man",
  "captainuniversespiderman": "spider-man",
  "captain-universe-spiderman": "spider-man",
  "captain-universe-spider-man": "spider-man",
};

export function getTopTierHero(slugOrId: string): TopTierHero | undefined {
  const norm = slugOrId.toLowerCase().trim();
  const clean = norm.replace(/[^a-z0-9-]/g, "");
  const stripped = norm.replace(/[^a-z0-9]/g, "");

  // 1. Direct characterId match
  const direct = TOP_TIER_HEROES.find(
    (h) => h.characterId.toLowerCase() === norm || h.characterId.toLowerCase() === clean
  );
  if (direct) return direct;

  // 2. Alias lookup
  const aliasedId = HERO_SLUG_ALIASES[norm] || HERO_SLUG_ALIASES[clean] || HERO_SLUG_ALIASES[stripped];
  if (aliasedId) {
    const aliasMatch = TOP_TIER_HEROES.find((h) => h.characterId.toLowerCase() === aliasedId.toLowerCase());
    if (aliasMatch) return aliasMatch;
  }

  // 3. Name or alias matching
  return TOP_TIER_HEROES.find((h) => {
    const hCharNorm = h.characterId.replace(/[^a-z0-9]/g, "").toLowerCase();
    const hNameNorm = h.name.replace(/[^a-z0-9]/g, "").toLowerCase();
    const hAliasNorm = (h.alias || "").replace(/[^a-z0-9]/g, "").toLowerCase();
    return (
      hCharNorm === stripped ||
      hNameNorm.includes(stripped) ||
      hAliasNorm.includes(stripped) ||
      stripped.includes(hCharNorm)
    );
  });
}
