export type CharacterEra = {
  eraId: string;
  phase: number;
  title: string;
  year: string;
  universe: string;
  description: string;
  keyMoments: string[];
};

export type CharacterStatus = "alive" | "deceased" | "dusted" | "variant" | "ascended" | "unknown";

export type Character = {
  id: string;
  name: string;
  aliases: string[];
  universe: string;
  faction: string;
  role: string;
  overview: string;
  firstAppearance: string;
  statusByPhase: Record<number, { status: CharacterStatus; note: string }>;
  eras: CharacterEra[];
  artifactsPossessed: string[];
  linkedNexusEvents: string[];
  entries: string[];
  color: string;
};

export const CHARACTERS: Character[] = [
  {
    id: "loki",
    name: "Loki Laufeyson",
    aliases: ["God of Mischief", "Prince of Asgard", "TVA Consultant", "God of Stories"],
    universe: "Earth-616 / 2012 Branch / Citadel",
    faction: "Asgard / TVA / Yggdrasil",
    role: "Frost Giant prince who evolved from vengeful villain to protector of the Multiverse.",
    overview: "Loki's journey spans Shakespearean tragedy, cosmic conquest, painful deaths, time-slipping paradoxes, and ultimate cosmic sacrifice as the living foundation of the entire Multiverse Tree.",
    firstAppearance: "Thor (2011)",
    color: "#10b981",
    statusByPhase: {
      1: { status: "alive", note: "Imprisoned in Asgard after failing to conquer New York." },
      2: { status: "alive", note: "Faked death on Svartalfheim and secretly usurped Odin's throne." },
      3: { status: "deceased", note: "Strangled to death by Thanos aboard the Statesman in 2018." },
      4: { status: "variant", note: "2012 Variant arrested by TVA, unravelling the Sacred Timeline." },
      5: { status: "ascended", note: "Transformed into the God of Stories, holding the Multiverse in his hands." },
      6: { status: "ascended", note: "Eternal anchor at the center of the World Tree Yggdrasil." }
    },
    eras: [
      {
        eraId: "loki-prince",
        phase: 1,
        title: "Loki: The Fallen Prince (2011–2012)",
        year: "2011–2012",
        universe: "Earth-616",
        description: "Discovered his true lineage as Laufey's son. Led the Chitauri invasion with the Mind and Space Stones, defeated by the Avengers.",
        keyMoments: ["Broke the Rainbow Bridge", "Mind-controlled Hawkeye & Selvig", "'I am a god, you dull creature'"]
      },
      {
        eraId: "loki-redemption",
        phase: 3,
        title: "Loki: The Odinson (2013–2018)",
        year: "2013–2018",
        universe: "Earth-616",
        description: "Fought alongside Thor against Malekith and Hela, stole the Tesseract from Asgard's vault, and died protecting Thor from Thanos.",
        keyMoments: ["Sacrificed himself to save Thor", "Stole Tesseract before Surtur destroyed Asgard", "'The sun will shine on us again, brother'"]
      },
      {
        eraId: "loki-variant-tva",
        phase: 4,
        title: "Loki: The TVA Variant (2012 Branch / Timeless)",
        year: "Timeless",
        universe: "Branch 2012 / TVA",
        description: "Escaped during the Avengers 2023 Time Heist. Discovered Infinity Stones used as paperweights at the TVA, teamed with Sylvie to expose the fake Time Keepers.",
        keyMoments: ["Watched his own future death on film reel", "Discovered Sylvie", "Enchanted Alioth in the Void"]
      },
      {
        eraId: "loki-god-of-stories",
        phase: 5,
        title: "Loki: God of Stories (Citadel / Yggdrasil)",
        year: "Eternal",
        universe: "Yggdrasil Multiverse",
        description: "Spent centuries mastering physics and temporal mechanics. Sacrificed personal companionship to destroy the Loom and weave all dying timelines with his bare hands.",
        keyMoments: ["Learned time-slipping mastery from O.B.", "Tore open the Temporal Loom", "Ascended the lonely throne as God of Stories"]
      }
    ],
    artifactsPossessed: ["space-stone", "mind-stone", "tva-tempad"],
    linkedNexusEvents: ["nexus-time-heist", "nexus-citadel-death", "nexus-god-of-stories"],
    entries: ["thor", "avengers", "thor-dark-world", "thor-ragnarok", "infinity-war", "loki-s1", "loki-s2"]
  },
  {
    id: "wanda",
    name: "Wanda Maximoff",
    aliases: ["Scarlet Witch", "The Harbinger of Chaos", "Mythological Nexus Being"],
    universe: "Earth-616 (Dreamwalked to Earth-838)",
    faction: "Avengers / Westview Hex / Wundagore",
    role: "Nexus Being imbued with raw Chaos Magic capable of spontaneous reality rewriting.",
    overview: "From Sokovian orphan to Avenger, Wanda's profound grief birthed the Westview Hex and awakened the ancient prophecy of the Scarlet Witch, plunging her into multiversal dark corruption.",
    firstAppearance: "Captain America: The Winter Soldier (2014 mid-credits) / Avengers: Age of Ultron (2015)",
    color: "#ef4444",
    statusByPhase: {
      1: { status: "unknown", note: "Living in war-torn Sokovia prior to Hydra experimentation." },
      2: { status: "alive", note: "Awakened by Mind Stone, joined the Avengers in Sokovia." },
      3: { status: "dusted", note: "Turned to dust by Thanos's snap in Wakanda after watching Vision die twice." },
      4: { status: "deceased", note: "Crushed under Mount Wundagore after destroying the Darkhold across realities." },
      5: { status: "unknown", note: "Presumed deceased; dark magical ripples echo through Agatha's coven." },
      6: { status: "unknown", note: "Fate across the multiverse unresolved." }
    },
    eras: [
      {
        eraId: "wanda-sokovia",
        phase: 2,
        title: "Wanda: The Miracle (2014–2015)",
        year: "2014–2015",
        universe: "Earth-616",
        description: "Hydra test subject alongside twin brother Pietro; switched sides when she discovered Ultron's extinction plot.",
        keyMoments: ["Mind-warped Tony Stark to see his worst nightmare", "Pietro's tragic death in Sokovia", "Joined New Avengers lineup"]
      },
      {
        eraId: "wanda-infinity",
        phase: 3,
        title: "Wanda: The Avenger in Love (2016–2019)",
        year: "2016–2018 / 2023",
        universe: "Earth-616",
        description: "Lived off-grid with Vision in Edinburgh; forced to shatter the Mind Stone in Vision's head before Thanos reversed time and tore it out.",
        keyMoments: ["Civil War airport battle", "Shattered Mind Stone with one hand while holding Thanos back with the other", "Nearly ripped Thanos apart single-handedly in Endgame"]
      },
      {
        eraId: "wanda-hex",
        phase: 4,
        title: "Wanda: The Hex & Scarlet Witch Awakening (2023)",
        year: "2023",
        universe: "Earth-616",
        description: "Overwhelmed by grief, rewrote reality in Westview, New Jersey, conjuring a sitcom life, a restored Vision, and twin sons Billy and Tommy.",
        keyMoments: ["Created the Westview Hex", "Defeated Agatha Harkness", "Full awakening as the prophesied Scarlet Witch"]
      },
      {
        eraId: "wanda-darkhold",
        phase: 4,
        title: "Wanda: The Darkhold Dreamwalker (2024)",
        year: "2024",
        universe: "Earth-616 -> Earth-838",
        description: "Corrupted by the Darkhold, slaughtered the Masters of Kamar-Taj and the Illuminati of Earth-838 to claim America Chavez.",
        keyMoments: ["Annihilated Illuminati (Reed Richards, Professor X, Captain Carter)", "Shattered Mount Wundagore to destroy all Darkholds", "'I have family. They are not real.'"]
      }
    ],
    artifactsPossessed: ["mind-stone", "the-darkhold"],
    linkedNexusEvents: ["nexus-darkhold-dreamwalk"],
    entries: ["avengers-aou", "cap-civil-war", "infinity-war", "endgame", "wandavision", "doctor-strange-multiverse"]
  },
  {
    id: "iron-man",
    name: "Tony Stark",
    aliases: ["Iron Man", "The Mechanic", "Savior of Earth", "Iron Man 2023"],
    universe: "Earth-616",
    faction: "Stark Industries / Avengers / Damage Control",
    role: "Genius inventor who inaugurated the modern heroic age and cracked quantum time travel.",
    overview: "Built an armor in an Afghan cave, privatized world peace, created the Avengers, solved the Quantum Realm navigation eigenvalue, and sacrificed his life using the Nano Gauntlet.",
    firstAppearance: "Iron Man (2008)",
    color: "#eab308",
    statusByPhase: {
      1: { status: "alive", note: "Revealed his superhero identity to the world; repelled New York invasion." },
      2: { status: "alive", note: "Accidentally created Ultron; built Hulkbuster and Vision." },
      3: { status: "deceased", note: "Died on October 17, 2023, snapping Thanos and his army out of existence." },
      4: { status: "deceased", note: "Legacy looms large; armor tech weaponized by DODC and Armor Wars." },
      5: { status: "deceased", note: "Remembered universally as Earth's greatest sacrifice." },
      6: { status: "deceased", note: "Legacy echoes into the impending multiversal clashes." }
    },
    eras: [
      {
        eraId: "tony-birth-iron-man",
        phase: 1,
        title: "Tony: Forge of the Armored Avenger (2008–2012)",
        year: "2008–2012",
        universe: "Earth-616",
        description: "Escaped the Ten Rings captivity with Mark 1; flew the nuclear warhead into the Chitauri wormhole.",
        keyMoments: ["'I am Iron Man.'", "Cured palladium poisoning with new element", "Flew nuke through wormhole, witnessing cosmic expanse"]
      },
      {
        eraId: "tony-ultron-civil-war",
        phase: 2,
        title: "Tony: The Architect of Protection (2013–2016)",
        year: "2013–2016",
        universe: "Earth-616",
        description: "Suffering from PTSD, sought to build 'a suit of armor around the world' via Ultron, leading to ideological war with Steve Rogers.",
        keyMoments: ["Clean Slate Protocol", "Created Ultron and Vision", "Signed Sokovia Accords; battled Steve and Bucky in Siberia"]
      },
      {
        eraId: "tony-endgame-sacrifice",
        phase: 3,
        title: "Tony: The Quantum Savior (2018–2023)",
        year: "2018–2023",
        universe: "Earth-616",
        description: "Trapped in space after Titan defeat; solved inverted Möbius strip quantum GPS, built the Nano Gauntlet, and made the ultimate sacrifice.",
        keyMoments: ["Discovered Quantum Realm Time GPS", "Forged Nano Gauntlet", "'And I... am... Iron Man.'"]
      }
    ],
    artifactsPossessed: ["space-stone", "nano-gauntlet"],
    linkedNexusEvents: ["nexus-time-heist"],
    entries: ["iron-man", "iron-man-2", "avengers", "iron-man-3", "avengers-aou", "cap-civil-war", "spiderman-homecoming", "infinity-war", "endgame"]
  },
  {
    id: "captain-america",
    name: "Steve Rogers",
    aliases: ["Captain America", "The First Avenger", "Nomad", "Old Steve"],
    universe: "Earth-616 / 1949 Alternate Timeline",
    faction: "Howling Commandos / S.H.I.E.L.D. / Avengers",
    role: "The moral compass of the Avengers who lived two lifetimes across time.",
    overview: "Enhanced by Erskine's Super-Soldier Serum in WWII, frozen for 66 years, led Earth's heroes against cosmic despots, proved worthy of Mjolnir, and returned to 1949 to live his stolen life with Peggy Carter.",
    firstAppearance: "Captain America: The First Avenger (2011)",
    color: "#3b82f6",
    statusByPhase: {
      1: { status: "alive", note: "Thawed from Arctic ice after 66-year cryogenic slumber." },
      2: { status: "alive", note: "Exposed Hydra's infiltration of S.H.I.E.L.D.; refused to sign Accords." },
      3: { status: "alive", note: "Traveled to 1949 with Peggy Carter; passed shield to Sam Wilson as an elderly man." },
      4: { status: "unknown", note: "Off the radar (rumored by the public to be 'on the moon')." },
      5: { status: "unknown", note: "Legacy upheld by Sam Wilson as the new Captain America." },
      6: { status: "unknown", note: "Historical legend across Earth-616." }
    },
    eras: [
      {
        eraId: "steve-ww2",
        phase: 1,
        title: "Steve: The Man Out of Time (1942–2012)",
        year: "1942–2012",
        universe: "Earth-616",
        description: "Transformed by Project Rebirth, dismantled Hydra's Tesseract weapons, plunged the Valkyrie into the ice.",
        keyMoments: ["Erskine transformation", "Bucky fell from train", "Crash in the Arctic with Tesseract", "'I had a date.'"]
      },
      {
        eraId: "steve-nomad",
        phase: 2,
        title: "Steve: The Uncompromising Patriot (2014–2016)",
        year: "2014–2016",
        universe: "Earth-616",
        description: "Discovered Winter Soldier's identity, tore down S.H.I.E.L.D., went underground as Nomad after Civil War.",
        keyMoments: ["Elevator fight in Triskelion", "Battle on the Helicarriers", "Refusal to sign Sokovia Accords"]
      },
      {
        eraId: "steve-worthy-endgame",
        phase: 3,
        title: "Steve: The Worthy Champion & The Chosen Life (2018–2023 / 1949)",
        year: "2018–2023 / 1949",
        universe: "Earth-616 -> 1949 Branch",
        description: "Stood alone against Thanos's armada; wielded Thor's hammer Mjolnir with lightning; returned the Infinity Stones to their proper timelines and stayed with Peggy.",
        keyMoments: ["Wielded Mjolnir against Thanos", "'Avengers... assemble.'", "Returned stones and lived a quiet life with Peggy"]
      }
    ],
    artifactsPossessed: ["space-stone"],
    linkedNexusEvents: ["nexus-time-heist"],
    entries: ["cap-first-avenger", "avengers", "cap-winter-soldier", "avengers-aou", "cap-civil-war", "infinity-war", "endgame"]
  },
  {
    id: "doctor-strange",
    name: "Doctor Stephen Strange",
    aliases: ["Master of the Mystic Arts", "Guardian of the Time Stone", "Defender of Reality"],
    universe: "Earth-616",
    faction: "Masters of the Mystic Arts / Kamar-Taj / Midnight Sons",
    role: "Neurosurgeon turned reality guardian who calculated the one timeline to defeat Thanos.",
    overview: "Healed shattered hands through mystic sorcery, broke physical law to defend Earth against interdimensional invaders, peered through 14 million futures, and traversed the Multiverse to prevent universal collapse.",
    firstAppearance: "Doctor Strange (2016)",
    color: "#06b6d4",
    statusByPhase: {
      1: { status: "unknown", note: "Practicing top neurosurgeon in New York." },
      2: { status: "unknown", note: "Named by Jasper Sitwell's Project Insight algorithm as a potential threat." },
      3: { status: "dusted", note: "Dusted on Titan; returned in 2023 to bring cosmic reinforcements to Earth." },
      4: { status: "alive", note: "Traversed the Multiverse with America Chavez; developed a third eye and went with Clea." },
      5: { status: "alive", note: "In the Dark Dimension fixing looming multiversal Incursions." },
      6: { status: "alive", note: "Key defender in the Multiversal Convergence." }
    },
    eras: [
      {
        eraId: "strange-sorcerer-initiation",
        phase: 3,
        title: "Stephen: Master of Kamar-Taj (2016–2018)",
        year: "2016–2018",
        universe: "Earth-616",
        description: "Mastered the Eye of Agamotto, trapped Dormammu in an infinite temporal loop, calculated the single winning outcome out of 14,000,605 possibilities.",
        keyMoments: ["'Dormammu, I've come to bargain.'", "Saw 14,000,605 futures on Titan", "Handed Time Stone to Thanos ('We're in the endgame now')"]
      },
      {
        eraId: "strange-multiverse-incursions",
        phase: 4,
        title: "Stephen: The Multiversal Voyager (2024)",
        year: "2024",
        universe: "Earth-616 -> Earth-838 -> Sinister Realm",
        description: "Accidentally tore the multiverse open casting Peter Parker's memory spell. Fought Scarlet Witch across dimensions, possessed a dead variant via the Darkhold, and awakened his third eye.",
        keyMoments: ["Cast Runes of Kof-Kol", "Dreamwalked into Defender Strange's corpse with demons", "Traveled to the Dark Dimension with Clea to stop an Incursion"]
      }
    ],
    artifactsPossessed: ["time-stone", "the-darkhold"],
    linkedNexusEvents: ["nexus-spider-spell", "nexus-darkhold-dreamwalk"],
    entries: ["doctor-strange", "thor-ragnarok", "infinity-war", "endgame", "spiderman-no-way-home", "doctor-strange-multiverse"]
  },
  {
    id: "spider-man",
    name: "Peter Parker",
    aliases: ["Spider-Man", "The Friendly Neighborhood Hero", "The Forgotten Spider"],
    universe: "Earth-616",
    faction: "Avengers / Midtown High / Street-Level NYC",
    role: "Teen prodigy who paid the ultimate personal price to heal fractured universes.",
    overview: "Recruited by Tony Stark, Peter balanced high school with global threats until Mysterio exposed his identity, forcing a spell that erased him from the memory of every person in the universe.",
    firstAppearance: "Captain America: Civil War (2016)",
    color: "#f43f5e",
    statusByPhase: {
      1: { status: "unknown", note: "Living as a child in Queens." },
      2: { status: "unknown", note: "Bitten by radioactive spider in NYC." },
      3: { status: "dusted", note: "Dusted in Tony Stark's arms on Titan ('I don't feel so good...')." },
      4: { status: "alive", note: "Erased from all human memories; living in a small NYC apartment as a true vigilante." },
      5: { status: "alive", note: "Operating as an anonymous street-level Spider-Man." },
      6: { status: "alive", note: "Poised for next chapters in the multiverse." }
    },
    eras: [
      {
        eraId: "peter-protege",
        phase: 3,
        title: "Peter: Stark's Protege (2016–2019)",
        year: "2016–2019",
        universe: "Earth-616",
        description: "Mentored by Tony Stark, fought Vulture and Thanos, inherited E.D.I.T.H. glasses before Mysterio framed him.",
        keyMoments: ["Airport battle in Germany", "Dusted on Titan", "Reunited with Tony in Endgame", "Defeated Mysterio in London"]
      },
      {
        eraId: "peter-three-spiders-sacrifice",
        phase: 4,
        title: "Peter: The Forgotten Web-Slinger (2024)",
        year: "2024",
        universe: "Earth-616",
        description: "United three Spider-Men across cinema history (Tobey, Andrew, Peter 1) to cure legacy villains. Allowed Doctor Strange to erase him from everyone's memories.",
        keyMoments: ["Aunt May's death ('With great power...')", "Three Spider-Men swinging together at Statue of Liberty", "Erased from MJ and Ned's memories; sewing his own classic suit"]
      }
    ],
    artifactsPossessed: ["nano-gauntlet"],
    linkedNexusEvents: ["nexus-spider-spell"],
    entries: ["cap-civil-war", "spiderman-homecoming", "infinity-war", "endgame", "spiderman-far-from-home", "spiderman-no-way-home", "spiderman-brand-new-day"]
  },
  {
    id: "thanos",
    name: "Thanos",
    aliases: ["The Mad Titan", "Inevitability", "Conqueror of Titan"],
    universe: "Earth-616 / 2014 Branch",
    faction: "Black Order / Chitauri Armada",
    role: "Warlord who sought universal balance through the extermination of half of all life.",
    overview: "Obsessed with resource depletion, Thanos collected all six Infinity Stones to perform the Snap, destroyed the stones, and was beheaded by Thor. A 2014 branch variant leapt across time to 2023 Earth.",
    firstAppearance: "The Avengers (2012 mid-credits)",
    color: "#a855f7",
    statusByPhase: {
      1: { status: "alive", note: "Supplied Loki with the Chitauri army and Mind Stone scepter." },
      2: { status: "alive", note: "Dispatched Ronan to claim the Power Stone Orb." },
      3: { status: "deceased", note: "Main Thanos beheaded on The Garden (2018); 2014 Variant dusted by Tony Stark (2023)." },
      4: { status: "deceased", note: "Dead across the main timeline; echoes felt in the multiversal aftermath." },
      5: { status: "deceased", note: "Historical menace." },
      6: { status: "deceased", note: "Remains a baseline benchmark for cosmic tyrants." }
    },
    eras: [
      {
        eraId: "thanos-infinity-quest",
        phase: 3,
        title: "Thanos: The Infinity Gauntlet (2018)",
        year: "2018",
        universe: "Earth-616",
        description: "Decimated Xandar, slaughtered Asgardians, sacrificed Gamora on Vormir, and executed the Snap in Wakanda.",
        keyMoments: ["Sacrificed Gamora on Vormir for Soul Stone", "Titan battle against Stark, Strange, and Guardians", "The Snap in Wakanda: 'You should have gone for the head.'"]
      },
      {
        eraId: "thanos-2014-timewar",
        phase: 3,
        title: "Thanos: The 2014 Variant Jump (2014 -> 2023)",
        year: "2014 / 2023",
        universe: "Branch 2014",
        description: "Learned of the Time Heist through Nebula's memory stream; quantum-jumped his entire battle fleet to 2023 Earth to shred the universe down to its last atom.",
        keyMoments: ["Nebula cybernetic memory interception", "Bombarded Avengers Compound", "Dusted into oblivion by Tony Stark's snap"]
      }
    ],
    artifactsPossessed: ["space-stone", "mind-stone", "reality-stone", "power-stone", "time-stone", "soul-stone"],
    linkedNexusEvents: ["nexus-time-heist"],
    entries: ["avengers", "gotg", "avengers-aou", "infinity-war", "endgame"]
  },
  {
    id: "kang-the-conqueror",
    name: "Kang the Conqueror / He Who Remains",
    aliases: ["He Who Remains", "The Conqueror", "Victor Timely", "Immortus", "Rama-Tut"],
    universe: "31st Century / Multiverse / Citadel",
    faction: "Council of Kangs / TVA",
    role: "Multiversal temporal despot whose endless variants war for dominion over all reality.",
    overview: "Discovered the existence of alternate universes in the 31st century, triggering the first Multiversal War. He Who Remains pruned all branches into a Sacred Timeline until his death.",
    firstAppearance: "Loki Season 1 (2021) / Quantumania (2023)",
    color: "#38bdf8",
    statusByPhase: {
      1: { status: "unknown", note: "Maintaining the Sacred Timeline from the Citadel outside time." },
      2: { status: "unknown", note: "TVA actively pruning non-conforming branch realities." },
      3: { status: "unknown", note: "Isolated Sacred Timeline from other Kang variants." },
      4: { status: "variant", note: "He Who Remains slain by Sylvie; infinite Kang variants freed." },
      5: { status: "variant", note: "Exiled Kang defeated in Quantum Realm; Council of Kangs alerted." },
      6: { status: "unknown", note: "Temporal fragments converging on the Multiverse War." }
    },
    eras: [
      {
        eraId: "he-who-remains-citadel",
        phase: 4,
        title: "He Who Remains: Architect of the Sacred Timeline",
        year: "End of Time",
        universe: "Null-Time Zone",
        description: "Harnessed Alioth to end the first Multiversal War, created the TVA to prune all branching realities to prevent Kang variants from existing.",
        keyMoments: ["Revealed truth of the TVA to Loki and Sylvie", "Offered them rule of the timeline", "Slain with an apple in hand: 'See you soon.'"]
      },
      {
        eraId: "kang-exiled-conqueror",
        phase: 5,
        title: "Kang: The Exiled Conqueror (Quantum Realm)",
        year: "Quantum Present",
        universe: "Quantum Realm",
        description: "Exiled by the Council of Kangs into the Quantum Realm; constructed an empire and multiversal engine before Scott Lang trapped him.",
        keyMoments: ["Built Quantum Empire", "Fought Ant-Man and Wasp", "Council of Kangs convening in the arena"]
      }
    ],
    artifactsPossessed: ["tva-tempad"],
    linkedNexusEvents: ["nexus-citadel-death"],
    entries: ["loki-s1", "ant-man-quantumania", "loki-s2"]
  },
  {
    id: "doctor-doom",
    name: "Victor von Doom",
    aliases: ["Doctor Doom", "Lord of Latveria", "Supreme Sorcerer-Scientist", "God Emperor Doom"],
    universe: "Latveria / Alternate Reality / Earth-616 Horizon",
    faction: "Latveria / Cabal / Battleworld",
    role: "Master of science and dark sorcery destined to forge Battleworld from dying realities.",
    overview: "Sovereign of Latveria whose intellect rivals Reed Richards and whose sorcery rivals Doctor Strange. Positioned at the apex of the Multiverse Saga convergence.",
    firstAppearance: "Avengers: Doomsday (2026 upcoming)",
    color: "#15803d",
    statusByPhase: {
      1: { status: "unknown", note: "Ruling in secret or alternate reality." },
      2: { status: "unknown", note: "Hidden beyond Earth-616 purview." },
      3: { status: "unknown", note: "Observing cosmic power shifts." },
      4: { status: "unknown", note: "Monitoring multiversal incursions." },
      5: { status: "unknown", note: "Preparing for total reality collapse." },
      6: { status: "alive", note: "Ascendant antagonist in Avengers: Doomsday & Secret Wars." }
    },
    eras: [
      {
        eraId: "doom-doomsday",
        phase: 6,
        title: "Doom: The Doomsday Sovereign",
        year: "2026–2027",
        universe: "Multiverse Convergence",
        description: "As incursions threaten total existence, Doom steps into the breach to reshape shattered realities under his iron will.",
        keyMoments: ["Clash with Marvel's First Family", "Confrontation with Earth's surviving heroes", "Creation of Battleworld"]
      }
    ],
    artifactsPossessed: [],
    linkedNexusEvents: [],
    entries: ["avengers-doomsday", "avengers-secret-wars"]
  },
  {
    id: "fantastic-four",
    name: "The Fantastic Four (Reed, Sue, Johnny, Ben)",
    aliases: ["Marvel's First Family", "The Explorers of the Unknown", "Future Foundation"],
    universe: "Retro-Futuristic Alternate 1960s Earth -> Earth-616",
    faction: "Baxter Building / Future Foundation",
    role: "Pioneering family of cosmic explorers arriving into the mainline Multiverse.",
    overview: "Exposed to cosmic rays during an exploratory mission, Reed Richards (Mister Fantastic), Sue Storm (Invisible Woman), Johnny Storm (Human Torch), and Ben Grimm (The Thing) emerge as cosmic pioneers.",
    firstAppearance: "The Fantastic Four: First Steps (2025)",
    color: "#0284c7",
    statusByPhase: {
      1: { status: "unknown", note: "Existing in retro-futuristic alternate universe." },
      2: { status: "unknown", note: "Alternate universe timeline." },
      3: { status: "unknown", note: "Alternate universe timeline." },
      4: { status: "variant", note: "Earth-838 Reed Richards executed by Scarlet Witch." },
      5: { status: "unknown", note: "Preparing for trans-dimensional crossover." },
      6: { status: "alive", note: "Debuting into the core MCU in First Steps & Doomsday." }
    },
    eras: [
      {
        eraId: "f4-first-steps",
        phase: 6,
        title: "Fantastic Four: First Steps in the Cosmos",
        year: "Alternate 1960s / 2025",
        universe: "Alternate Retro 1960s -> Earth-616",
        description: "Marvel's First Family navigates cosmic anomalies and Galactus, transitioning into the wider MCU narrative.",
        keyMoments: ["Cosmic ray exposure", "First contact with the Multiverse", "Arrival on the threshold of Doomsday"]
      }
    ],
    artifactsPossessed: [],
    linkedNexusEvents: [],
    entries: ["fantastic-four", "avengers-doomsday"]
  },
  {
    id: "thor",
    name: "Thor Odinson",
    aliases: ["God of Thunder", "Lord of Asgard", "Space Viking", "Worthy Avenger"],
    universe: "Earth-616",
    faction: "Asgard / Avengers / Guardians of the Galaxy",
    role: "Asgardian god who weathered the loss of his family, home, and hammer to become a cosmic protector.",
    overview: "Exiled to Earth for arrogance, fought alongside Avengers, lost his eye, brother, and father, unlocked his innate thunder without Mjolnir, and adopted Gorr's daughter Love.",
    firstAppearance: "Thor (2011)",
    color: "#38bdf8",
    statusByPhase: {
      1: { status: "alive", note: "Regained worthiness and protected Midgard." },
      2: { status: "alive", note: "Defeated Malekith; saw Infinity Stone vision in Water of Sights." },
      3: { status: "alive", note: "Killed Thanos in 2018; participated in 2023 Time Heist." },
      4: { status: "alive", note: "Adopted Love; defending the cosmos with Stormbreaker." },
      5: { status: "alive", note: "Traveling across the cosmos as a protector." },
      6: { status: "alive", note: "Veteran god standing against multiversal annihilation." }
    },
    eras: [
      {
        eraId: "thor-arrogant-prince",
        phase: 1,
        title: "Thor: The Banished Prince (2011–2012)",
        year: "2011–2012",
        universe: "Earth-616",
        description: "Cast down to Earth without power by Odin, learned humility through mortal bonds, reclaimed Mjolnir.",
        keyMoments: ["Banished by Odin", "Reclaimed hammer in New Mexico", "Defeated Loki in New York"]
      },
      {
        eraId: "thor-god-of-thunder",
        phase: 3,
        title: "Thor: God of Thunder & Ragnarok (2017–2019)",
        year: "2017–2019",
        universe: "Earth-616",
        description: "Lost Mjolnir to Hela, awakened intrinsic lightning powers, watched Asgard fall, forged Stormbreaker on Nidavellir.",
        keyMoments: ["'Are you Thor, the God of Hammers?'", "Forged Stormbreaker with Eitri", "Decapitated Thanos in The Garden"]
      }
    ],
    artifactsPossessed: ["reality-stone", "space-stone"],
    linkedNexusEvents: ["nexus-time-heist"],
    entries: ["thor", "avengers", "thor-dark-world", "avengers-aou", "thor-ragnarok", "infinity-war", "endgame", "thor-love-thunder"]
  },
  {
    id: "black-widow",
    name: "Natasha Romanoff",
    aliases: ["Black Widow", "Agent Romanoff", "Red Room Survivor", "The Glue of the Avengers"],
    universe: "Earth-616",
    faction: "Red Room / S.H.I.E.L.D. / Avengers",
    role: "Elite espionage master who chose sacrifice to save her found family.",
    overview: "Trained in the brutal Red Room, defected to S.H.I.E.L.D., became an indispensable leader of the Avengers, and sacrificed her life on Vormir to secure the Soul Stone.",
    firstAppearance: "Iron Man 2 (2010)",
    color: "#dc2626",
    statusByPhase: {
      1: { status: "alive", note: "Covertly monitored Tony Stark; closed Chitauri portal in NY." },
      2: { status: "alive", note: "Dumped all S.H.I.E.L.D. secrets onto the public internet." },
      3: { status: "deceased", note: "Fell to her death on Vormir in 2023 to claim the Soul Stone." },
      4: { status: "deceased", note: "Prequel revelations uncovered her Red Room origins." },
      5: { status: "deceased", note: "Immortalized in Avengers history." },
      6: { status: "deceased", note: "Legacy carried forward by Yelena Belova." }
    },
    eras: [
      {
        eraId: "natasha-spy",
        phase: 1,
        title: "Natasha: The Red in the Ledger (2010–2014)",
        year: "2010–2014",
        universe: "Earth-616",
        description: "Worked undercover at Stark Industries; outsmarted Loki's interrogations; leaked Hydra secrets to Congress.",
        keyMoments: ["Interrogated Loki in the Helicarrier", "Closed Tesseract wormhole", "Exposed Hydra and S.H.I.E.L.D. to Congress"]
      },
      {
        eraId: "natasha-vormir-sacrifice",
        phase: 3,
        title: "Natasha: The Vormir Sacrifice (2018–2023)",
        year: "2018–2023",
        universe: "Earth-616",
        description: "Kept the Avengers network operational during the five-year Blip, and sacrificed her life on Vormir so Clint Barton could obtain the Soul Stone.",
        keyMoments: ["Led five-year recovery network from Avengers Compound", "Fought Clint Barton to make the sacrifice on Vormir", "'Let me go. It's okay.'"]
      }
    ],
    artifactsPossessed: ["soul-stone"],
    linkedNexusEvents: ["nexus-time-heist"],
    entries: ["iron-man-2", "avengers", "cap-winter-soldier", "avengers-aou", "cap-civil-war", "infinity-war", "endgame", "black-widow"]
  },
  {
    id: "shang-chi",
    name: "Shang-Chi",
    aliases: ["Master of Kung Fu", "Wielder of the Ten Rings", "Shaun"],
    universe: "Earth-616",
    faction: "Ten Rings / Kamar-Taj Network",
    role: "Martial artist who inherited an ancient weapon with mysterious multiversal resonance.",
    overview: "Trained by his immortal father Xu Wenwu, Shang-Chi fled to San Francisco before being forced to confront his heritage in Ta Lo, claiming the Ten Rings.",
    firstAppearance: "Shang-Chi and the Legend of the Ten Rings (2021)",
    color: "#06b6d4",
    statusByPhase: {
      1: { status: "unknown", note: "Living in China under Wenwu's training." },
      2: { status: "unknown", note: "Living in San Francisco as Shaun." },
      3: { status: "alive", note: "Survived the Blip in San Francisco." },
      4: { status: "alive", note: "Master of the Ten Rings, inducted into the Avengers emergency circle by Wong." },
      5: { status: "alive", note: "Active defender of Earth-616." },
      6: { status: "alive", note: "Cosmic beacon bearer." }
    },
    eras: [
      {
        eraId: "shang-ta-lo",
        phase: 4,
        title: "Shang-Chi: The Ten Rings Mastery (2024)",
        year: "2024",
        universe: "Earth-616 / Ta Lo",
        description: "Defeated the Dweller-in-Darkness in Ta Lo, assumed command of the Ten Rings, discovered they emit an unknown signal into deep space.",
        keyMoments: ["Bus fight in San Francisco", "Tamed the Great Protector dragon in Ta Lo", "Meeting with Wong, Captain Marvel, and Bruce Banner"]
      }
    ],
    artifactsPossessed: ["ten-rings"],
    linkedNexusEvents: [],
    entries: ["shang-chi"]
  }
];

export function getCharacter(id: string) {
  return CHARACTERS.find((c) => c.id === id);
}
