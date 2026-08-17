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
  // --- ORIGINAL 6 AVENGERS ---
  {
    id: "iron-man",
    name: "Tony Stark",
    aliases: ["Iron Man", "The Mechanic", "Genius, Billionaire, Playboy, Philanthropist"],
    universe: "Earth-616",
    faction: "Avengers / Stark Industries",
    role: "Founding Avenger, tech visionary, and savior of the universe.",
    overview: "Captured in Afghanistan, Tony forged an armored suit and evolved from a selfish weapons manufacturer into the philosophical anchor of the Avengers, ultimately snapping the Nano Gauntlet to vanquish Thanos.",
    firstAppearance: "Iron Man (2008)",
    color: "#eab308",
    statusByPhase: {
      1: { status: "alive", note: "Guided the nuke through the wormhole during the Battle of New York." },
      2: { status: "alive", note: "Accidentally created Ultron; destroyed his own suits before building Hulkbuster." },
      3: { status: "deceased", note: "Sacrificed life wielding the Infinity Stones in 2023." },
      4: { status: "deceased", note: "Legacy casts a shadow over Spider-Man and Armor Wars." },
      5: { status: "deceased", note: "Immortalized in the Sacred Timeline archives." },
      6: { status: "deceased", note: "His sacrifice echoes into the multiversal incursion crisis." }
    },
    eras: [
      {
        eraId: "iron-man-origin",
        phase: 1,
        title: "Iron Man: The Genesis (2008–2012)",
        year: "2008–2012",
        universe: "Earth-616",
        description: "Built the Mark I armor in a cave, announced 'I am Iron Man' to the world, and redirected the nuclear missile into the Chitauri portal.",
        keyMoments: ["Built Mark I in cave with Yinsen", "'I am Iron Man'", "Flew the nuke into the Chitauri wormhole"]
      },
      {
        eraId: "iron-man-endgame",
        phase: 3,
        title: "Iron Man: The Snap (2018–2023)",
        year: "2018–2023",
        universe: "Earth-616",
        description: "Devised the Time Heist GPS, reunited with his father Howard in 1970, and performed the final snap to defeat Thanos.",
        keyMoments: ["Invented GPS for quantum time travel", "Reunited with Howard Stark in 1970", "'And I... am... Iron Man'"]
      }
    ],
    artifactsPossessed: ["nano-gauntlet", "space-stone", "mind-stone", "reality-stone", "power-stone", "time-stone", "soul-stone"],
    linkedNexusEvents: ["nexus-iron-man-snap", "nexus-time-heist"],
    entries: ["iron-man", "iron-man-2", "avengers", "iron-man-3", "avengers-age-of-ultron", "captain-america-civil-war", "spider-man-homecoming", "avengers-infinity-war", "avengers-endgame"]
  },
  {
    id: "captain-america",
    name: "Steve Rogers",
    aliases: ["Captain America", "The First Avenger", "The Man Out of Time", "Nomad"],
    universe: "Earth-616 (Retired to Past Branch)",
    faction: "Avengers / Howling Commandos / SHIELD",
    role: "The moral compass of Earth's Mightiest Heroes.",
    overview: "Enhanced by the Super Soldier Serum in 1943, Steve fought Hydra, awoke 70 years later in modern times, wielded Mjolnir against Thanos, and chose to live his lost life with Peggy Carter.",
    firstAppearance: "Captain America: The First Avenger (2011)",
    color: "#3b82f6",
    statusByPhase: {
      1: { status: "alive", note: "Awoke in the 21st century after decades in Arctic ice." },
      2: { status: "alive", note: "Dismantled Hydra-infiltrated SHIELD and went on the run." },
      3: { status: "alive", note: "Wielded Mjolnir; returned Infinity Stones and grew old with Peggy." },
      4: { status: "unknown", note: "Passed the shield to Sam Wilson; whereabouts off-world/rumored." },
      5: { status: "unknown", note: "Legendary inspiration for the new generation." },
      6: { status: "unknown", note: "Sacred anchor figure of the Infinity Saga." }
    },
    eras: [
      {
        eraId: "cap-ww2",
        phase: 1,
        title: "The First Avenger (1942–1945)",
        year: "1942–1945",
        universe: "Earth-616",
        description: "Transformed by Project Rebirth, liberated Allied POWs, defeated Red Skull, and crashed the Valkyrie into Arctic ice.",
        keyMoments: ["Injected with Erskine's Super Soldier Serum", "Defeated Red Skull on the Valkyrie", "'I can do this all day'"]
      },
      {
        eraId: "cap-worthy",
        phase: 3,
        title: "The Worthy Captain (2018–2023)",
        year: "2018–2023",
        universe: "Earth-616",
        description: "Led the Battle of Earth, lifted Thor's hammer Mjolnir, uttered 'Avengers Assemble', and passed the shield to Sam Wilson.",
        keyMoments: ["Summoned Mjolnir against Thanos", "'Avengers... Assemble'", "Returned the 6 Infinity Stones to their timelines"]
      }
    ],
    artifactsPossessed: ["vibranium-shield", "mjolnir"],
    linkedNexusEvents: ["nexus-worthy-cap", "nexus-time-heist"],
    entries: ["captain-america-first-avenger", "avengers", "captain-america-winter-soldier", "avengers-age-of-ultron", "captain-america-civil-war", "avengers-infinity-war", "avengers-endgame"]
  },
  {
    id: "thor",
    name: "Thor Odinson",
    aliases: ["God of Thunder", "Lord of Thunder", "Bro Thor", "Space Viking"],
    universe: "Earth-616",
    faction: "Asgard / Avengers / Guardians of the Galaxy",
    role: "Asgardian warrior prince wielding thunder, Mjolnir, and Stormbreaker.",
    overview: "Over millennia, Thor lost his father, mother, brother, hammer, eye, and homeland of Asgard, yet forged Stormbreaker to strike down Thanos and adopted Gorr's daughter Love.",
    firstAppearance: "Thor (2011)",
    color: "#38bdf8",
    statusByPhase: {
      1: { status: "alive", note: "Banished to Earth, proved worthy, and defended Midgard." },
      2: { status: "alive", note: "Defeated Malekith and uncovered the vision of Infinity Stones." },
      3: { status: "alive", note: "Forged Stormbreaker and decapitated 2018 Thanos." },
      4: { status: "alive", note: "Defeated Gorr the God Butcher and adopted Love." },
      5: { status: "alive", note: "Wandering cosmic champion with Love." },
      6: { status: "alive", note: "Cosmic warrior facing multiversal annihilation." }
    },
    eras: [
      {
        eraId: "thor-god-of-thunder",
        phase: 1,
        title: "Thor: The Worthy Prince (2011–2012)",
        year: "2011–2012",
        universe: "Earth-616",
        description: "Banished by Odin to New Mexico; reclaimed Mjolnir to save Earth and Asgard.",
        keyMoments: ["Reclaimed Mjolnir in the rain", "Fought Hulk on the Helicarrier", "Brought Loki to Asgardian justice"]
      },
      {
        eraId: "thor-ragnarok-infinity",
        phase: 3,
        title: "Thor: Ragnarok & Stormbreaker (2017–2019)",
        year: "2017–2019",
        universe: "Earth-616",
        description: "Awakened internal lightning without Mjolnir, forged Stormbreaker in Nidavellir, and decimated the Outrider army in Wakanda.",
        keyMoments: ["'Are you Thor, God of Hammers?'", "Forged Stormbreaker with Eitri", "Arrived in Wakanda with lightning blast"]
      }
    ],
    artifactsPossessed: ["mjolnir", "stormbreaker"],
    linkedNexusEvents: ["nexus-stormbreaker-forge"],
    entries: ["thor", "avengers", "thor-dark-world", "avengers-age-of-ultron", "thor-ragnarok", "avengers-infinity-war", "avengers-endgame", "thor-love-and-thunder"]
  },
  {
    id: "hulk",
    name: "Bruce Banner",
    aliases: ["The Incredible Hulk", "Smart Hulk", "The Strongest Avenger", "World Breaker"],
    universe: "Earth-616",
    faction: "Avengers / S.H.I.E.L.D.",
    role: "Genius nuclear physicist who merged mind and gamma-powered monstrous strength.",
    overview: "Irradiated by gamma rays, Bruce wrestled with the Hulk for years before achieving equilibrium as Smart Hulk and surviving the Blip reversal snap with the Nano Gauntlet.",
    firstAppearance: "The Incredible Hulk (2008)",
    color: "#22c55e",
    statusByPhase: {
      1: { status: "alive", note: "Smashed Loki during the Battle of New York." },
      2: { status: "alive", note: "Flew the Quinjet into deep space after the Battle of Sokovia." },
      3: { status: "alive", note: "Performed the Nano Gauntlet Snap, resurrecting half the universe." },
      4: { status: "alive", note: "Trained his cousin Jennifer Walters (She-Hulk) in Mexico." },
      5: { status: "alive", note: "Active mentor to the next generation of heroes." },
      6: { status: "alive", note: "Key scientific brain during the Incursion crisis." }
    },
    eras: [
      {
        eraId: "hulk-avengers",
        phase: 1,
        title: "The Green Goliath (2008–2012)",
        year: "2008–2012",
        universe: "Earth-616",
        description: "Controlled his anger to reveal his secret: 'I'm always angry', taking down the giant Leviathan in New York.",
        keyMoments: ["'That's my secret, Cap... I'm always angry'", "Smashed Loki at Stark Tower"]
      },
      {
        eraId: "smart-hulk-snap",
        phase: 3,
        title: "Smart Hulk & The Restoration Snap (2023)",
        year: "2023",
        universe: "Earth-616",
        description: "Merged the brains and the brawn; withstood lethal gamma radiation to bring back the vanished trillions.",
        keyMoments: ["Met the Ancient One in 2012 New York", "Snapped the Nano Gauntlet to bring everyone back"]
      }
    ],
    artifactsPossessed: ["nano-gauntlet"],
    linkedNexusEvents: ["nexus-restoration-snap"],
    entries: ["the-incredible-hulk", "avengers", "avengers-age-of-ultron", "thor-ragnarok", "avengers-infinity-war", "avengers-endgame", "she-hulk"]
  },
  {
    id: "black-widow",
    name: "Natasha Romanoff",
    aliases: ["Black Widow", "Agent Romanoff", "Natalia Alianovna Romanova"],
    universe: "Earth-616",
    faction: "Avengers / S.H.I.E.L.D. / Red Room",
    role: "Master assassin and the spiritual glue holding the Avengers together.",
    overview: "Graduated from the brutal Soviet Red Room, Natasha wiped the red in her ledger by defending Earth and sacrificing her life on Vormir for the Soul Stone.",
    firstAppearance: "Iron Man 2 (2010)",
    color: "#f43f5e",
    statusByPhase: {
      1: { status: "alive", note: "Interrogated Loki and shut down the Tesseract portal." },
      2: { status: "alive", note: "Leaked all SHIELD and Hydra confidential files to the public." },
      3: { status: "deceased", note: "Jumped off the cliff of Vormir in 2023 for the Soul Stone." },
      4: { status: "deceased", note: "Legacy continued by her sister Yelena Belova." },
      5: { status: "deceased", note: "Honored across the world." },
      6: { status: "deceased", note: "Eternal soul preserved in the Soul World." }
    },
    eras: [
      {
        eraId: "widow-shield",
        phase: 1,
        title: "Black Widow: S.H.I.E.L.D. Shadow Agent (2010–2012)",
        year: "2010–2012",
        universe: "Earth-616",
        description: "Infiltrated Stark Industries as Natalie Rushman, brought Bruce Banner to SHIELD, closed the portal with Loki's scepter.",
        keyMoments: ["Hallway fight in Hammer Industries", "Trick interrogation of Loki", "Closed the Space Stone wormhole"]
      },
      {
        eraId: "widow-vormir",
        phase: 3,
        title: "The Ultimate Sacrifice on Vormir (2023)",
        year: "2023",
        universe: "Earth-616",
        description: "Led the global recovery team for 5 years after the Snap; sacrificed her life to grant Clint the Soul Stone.",
        keyMoments: ["Maintained Avengers comms network post-snap", "Fought Hawkeye to sacrifice herself", "'Let me go... It's okay'"]
      }
    ],
    artifactsPossessed: ["soul-stone"],
    linkedNexusEvents: ["nexus-vormir-sacrifice"],
    entries: ["iron-man-2", "avengers", "captain-america-winter-soldier", "avengers-age-of-ultron", "captain-america-civil-war", "avengers-infinity-war", "avengers-endgame", "black-widow"]
  },
  {
    id: "hawkeye",
    name: "Clint Barton",
    aliases: ["Hawkeye", "Ronin", "The Marksman", "Goliath"],
    universe: "Earth-616",
    faction: "Avengers / S.H.I.E.L.D.",
    role: "Master archer who never misses; the grounded heart of the team.",
    overview: "After losing his entire family in the Blip, Clint waged a global war as the deadly vigilante Ronin before passing the Hawkeye mantle to protege Kate Bishop in New York.",
    firstAppearance: "Thor (2011)",
    color: "#a855f7",
    statusByPhase: {
      1: { status: "alive", note: "Mind-controlled by Loki, recovered to shoot down Chitauri." },
      2: { status: "alive", note: "Provided his farm as sanctuary to the fractured Avengers." },
      3: { status: "alive", note: "Recovered the Soul Stone from Vormir and protected the Nano Gauntlet." },
      4: { status: "alive", note: "Mentored Kate Bishop and defeated the Tracksuit Mafia." },
      5: { status: "alive", note: "Retired peacefully with his family." },
      6: { status: "alive", note: "Veteran advisor to Earth's defenders." }
    },
    eras: [
      {
        eraId: "hawkeye-ronin",
        phase: 3,
        title: "Hawkeye & The Dark Path of Ronin (2018–2023)",
        year: "2018–2023",
        universe: "Earth-616",
        description: "Shattered by the dust of his family, slaughtered cartel armies across Tokyo and Mexico before Natasha brought him home.",
        keyMoments: ["Witnessed family turning to dust", "Swordfight in Tokyo rain as Ronin", "Secured the Soul Stone on Vormir"]
      }
    ],
    artifactsPossessed: ["soul-stone", "nano-gauntlet"],
    linkedNexusEvents: [],
    entries: ["thor", "avengers", "avengers-age-of-ultron", "captain-america-civil-war", "avengers-endgame", "hawkeye"]
  },

  // --- GODS, MULTIVERSE & CHAOS ---
  {
    id: "loki",
    name: "Loki Laufeyson",
    aliases: ["God of Mischief", "Prince of Asgard", "TVA Consultant", "God of Stories"],
    universe: "Earth-616 / 2012 Branch / Citadel / Yggdrasil",
    faction: "Asgard / TVA / Yggdrasil",
    role: "Frost Giant prince who evolved from vengeful villain to protector of the Multiverse.",
    overview: "Loki's journey spans Shakespearean tragedy, cosmic conquest, painful deaths, time-slipping paradoxes, and ultimate cosmic sacrifice as the living foundation holding the entire Multiverse Tree.",
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
        description: "Discovered his true lineage as Laufey's son. Led the Chitauri invasion with the Mind and Space Stones.",
        keyMoments: ["Broke the Rainbow Bridge", "'I am a god, you dull creature'", "Mind-controlled Hawkeye & Selvig"]
      },
      {
        eraId: "loki-god-of-stories",
        phase: 5,
        title: "Loki: God of Stories (Citadel / Yggdrasil)",
        year: "Eternal",
        universe: "Yggdrasil Multiverse",
        description: "Spent centuries mastering physics and temporal mechanics. Sacrificed personal companionship to destroy the Loom and weave all dying timelines with his bare hands.",
        keyMoments: ["Tore open the Temporal Loom", "Weaved all timelines with green temporal magic", "Ascended the lonely throne at the end of time"]
      }
    ],
    artifactsPossessed: ["space-stone", "mind-stone", "tva-tempad"],
    linkedNexusEvents: ["nexus-time-heist", "nexus-citadel-death", "nexus-god-of-stories"],
    entries: ["thor", "avengers", "thor-dark-world", "thor-ragnarok", "avengers-infinity-war", "loki-s1", "loki-s2"]
  },
  {
    id: "wanda",
    name: "Wanda Maximoff",
    aliases: ["Scarlet Witch", "The Harbinger of Chaos", "Mythological Nexus Being"],
    universe: "Earth-616 (Dreamwalked to Earth-838)",
    faction: "Avengers / Westview Hex / Wundagore",
    role: "Nexus Being imbued with raw Chaos Magic capable of spontaneous reality rewriting.",
    overview: "From Sokovian orphan to Avenger, Wanda's grief birthed the Westview Hex and awakened the ancient prophecy of the Scarlet Witch, plunging her into multiversal dark corruption.",
    firstAppearance: "Captain America: The Winter Soldier (2014) / Avengers: Age of Ultron (2015)",
    color: "#ef4444",
    statusByPhase: {
      1: { status: "unknown", note: "Experimented on by Hydra with the Mind Stone in Sokovia." },
      2: { status: "alive", note: "Joined the Avengers after the death of her twin brother Pietro." },
      3: { status: "dusted", note: "Obliterated the Mind Stone, but Thanos reversed time and snapped her." },
      4: { status: "ascended", note: "Created Westview Hex, studied Darkhold, crushed Illuminati on Earth-838, destroyed Wundagore." },
      5: { status: "unknown", note: "Buried beneath Mount Wundagore; magical signature reverberates across the Multiverse." },
      6: { status: "unknown", note: "Key catalyst for the Incursion crises." }
    },
    eras: [
      {
        eraId: "wanda-westview",
        phase: 4,
        title: "The Scarlet Witch Awoken (2023–2024)",
        year: "2023–2024",
        universe: "Earth-616",
        description: "Created the sitcom Hex reality in Westview; defeated Agatha Harkness and fulfilled the Darkhold prophecy.",
        keyMoments: ["Enclosed Westview in the Hex", "Conjured twin sons Billy and Tommy", "Absorbed Agatha's magic to become the Scarlet Witch"]
      },
      {
        eraId: "wanda-earth-838-rampage",
        phase: 4,
        title: "Multiversal Slaughter of Earth-838 Illuminati",
        year: "2024",
        universe: "Earth-838",
        description: "Dreamwalked into her Earth-838 variant and brutally slaughtered the Illuminati to reach America Chavez.",
        keyMoments: ["'What mouth?' - eliminated Black Bolt", "Sliced Captain Carter with her own shield", "Snapped Professor X's psychic projection"]
      }
    ],
    artifactsPossessed: ["mind-stone", "darkhold"],
    linkedNexusEvents: ["nexus-westview-hex", "nexus-illuminati-massacre"],
    entries: ["avengers-age-of-ultron", "captain-america-civil-war", "avengers-infinity-war", "avengers-endgame", "wandavision", "doctor-strange-multiverse-of-madness"]
  },
  {
    id: "doctor-strange",
    name: "Dr. Stephen Strange",
    aliases: ["Doctor Strange", "Master of the Mystic Arts", "Defender of Earth-616"],
    universe: "Earth-616",
    faction: "Masters of the Mystic Arts / Avengers",
    role: "Former Sorcerer Supreme and guardian of the New York Sanctum Sanctorum.",
    overview: "A brilliant neurosurgeon whose shattered hands led him to Kamar-Taj, Strange mastered the mystic arts, bargained with Dormammu, calculated the 1-in-14,000,605 victory against Thanos, and traversed the Multiverse.",
    firstAppearance: "Doctor Strange (2016)",
    color: "#06b6d4",
    statusByPhase: {
      1: { status: "unknown", note: "Prominent neurosurgeon in New York City." },
      2: { status: "unknown", note: "Targeted by Project Insight algorithm as a future threat." },
      3: { status: "alive", note: "Calculated the 1 in 14,000,605 future and gave Thanos the Time Stone." },
      4: { status: "alive", note: "Accidentally fractured the Multiverse with Peter Parker; awakened Third Eye." },
      5: { status: "alive", note: "Traveling with Clea into the Dark Dimension to fix an Incursion." },
      6: { status: "alive", note: "Core defender against multiversal collision." }
    },
    eras: [
      {
        eraId: "strange-time-stone",
        phase: 3,
        title: "Doctor Strange: Master of Time (2016–2018)",
        year: "2016–2018",
        universe: "Earth-616",
        description: "Trapped Dormammu in an infinite time loop, fought Thanos on Titan using the Mirror Dimension and duplication spells.",
        keyMoments: ["'Dormammu, I've come to bargain'", "Viewed 14,000,605 futures on Titan", "'We're in the endgame now'"]
      },
      {
        eraId: "strange-dreamwalking",
        phase: 4,
        title: "Doctor Strange: Dreamwalker of the Dead",
        year: "2024",
        universe: "Multiverse",
        description: "Dreamwalked into the rotting corpse of Defender Strange to fight the Scarlet Witch at Mount Wundagore.",
        keyMoments: ["Cloak of Damned Souls", "Defeated Sinister Strange in music note duel", "Awakened the Third Eye"]
      }
    ],
    artifactsPossessed: ["time-stone", "eye-of-agamotto", "cloak-of-levitation", "darkhold-sinister", "book-of-vishanti"],
    linkedNexusEvents: ["nexus-titan-bargain", "nexus-multiverse-spell", "nexus-third-eye"],
    entries: ["doctor-strange", "thor-ragnarok", "avengers-infinity-war", "avengers-endgame", "spider-man-no-way-home", "doctor-strange-multiverse-of-madness"]
  },
  {
    id: "spider-man",
    name: "Peter Parker (Earth-616)",
    aliases: ["Spider-Man", "Your Friendly Neighborhood Spider-Man", "Web-Slinger", "Iron Spider"],
    universe: "Earth-616",
    faction: "Avengers / Midtown High",
    role: "Genius high school student turned cosmic and street-level hero.",
    overview: "Recruited by Tony Stark, Peter fought in Germany, Space, and the Battle of Earth before his identity was exposed by Mysterio. Choosing absolute sacrifice, he had Doctor Strange erase his existence from everyone's memory.",
    firstAppearance: "Captain America: Civil War (2016)",
    color: "#ef4444",
    statusByPhase: {
      1: { status: "unknown", note: "Young kid in Queens (saved by Iron Man at Stark Expo)." },
      2: { status: "unknown", note: "Bitten by radioactive spider in Queens." },
      3: { status: "alive", note: "Knocked out of existence on Titan, resurrected in 2023." },
      4: { status: "alive", note: "Forgot by the entire world; lives alone in NYC with classic red-and-blue suit." },
      5: { status: "alive", note: "Anonymous street-level guardian of New York." },
      6: { status: "alive", note: "Key Multiverse anchor." }
    },
    eras: [
      {
        eraId: "spidey-endgame",
        phase: 3,
        title: "Spider-Man: Cosmic Web-Slinger (2018–2023)",
        year: "2018–2023",
        universe: "Earth-616",
        description: "Donned the Iron Spider armor, saved Doctor Strange in deep space, and delivered the Nano Gauntlet across the battlefield.",
        keyMoments: ["'Mr. Stark, I don't feel so good'", "Activated Instant Kill in Endgame", "Mourned Tony Stark"]
      },
      {
        eraId: "spidey-no-way-home",
        phase: 4,
        title: "Spider-Man: The Complete Erasure (2024)",
        year: "2024",
        universe: "Earth-616",
        description: "United three generations of Spider-Men to cure five multiversal villains; sacrificed all personal relationships.",
        keyMoments: ["Aunt May's death: 'With great power comes great responsibility'", "Statue of Liberty battle alongside Tobey & Andrew", "Erased himself from Ned & MJ's memories"]
      }
    ],
    artifactsPossessed: ["nano-gauntlet"],
    linkedNexusEvents: ["nexus-multiverse-spell", "nexus-three-spidermen"],
    entries: ["captain-america-civil-war", "spider-man-homecoming", "avengers-infinity-war", "avengers-endgame", "spider-man-far-from-home", "spider-man-no-way-home"]
  },

  // --- MULTIVERSE VARIANTS & MUTANTS ---
  {
    id: "spider-man-maguire",
    name: "Peter Parker (Earth-96283)",
    aliases: ["Friendly Neighborhood Spider-Man", "Peter-Two", "Raimi Spider-Man"],
    universe: "Earth-96283",
    faction: "Spider-Heroes",
    role: "The seasoned veteran Spider-Man who endured decades of solitary heroism.",
    overview: "Pulled through the multiverse into Earth-616, Peter-Two served as the elder mentor, healed Norman Osborn, and prevented Holland's Peter from committing murder.",
    firstAppearance: "Spider-Man: No Way Home (2021) / Spider-Man (2002)",
    color: "#b91c1c",
    statusByPhase: {
      4: { status: "alive", note: "Returned to Earth-96283 after curing Green Goblin and Doc Ock." },
      5: { status: "alive", note: "Watching over his universe." },
      6: { status: "alive", note: "Potential nexus warrior in Secret Wars." }
    },
    eras: [
      {
        eraId: "peter-two-cure",
        phase: 4,
        title: "Peter-Two: The Mentor (Earth-616 Incursion)",
        year: "2024",
        universe: "Earth-616",
        description: "Stopped Holland's Peter from impaling the Green Goblin with his own glider, curing his greatest adversary.",
        keyMoments: ["Stopped Holland from killing Goblin", "Reunited with Otto Octavius", "'Trying to do better'"]
      }
    ],
    artifactsPossessed: [],
    linkedNexusEvents: ["nexus-three-spidermen"],
    entries: ["spider-man-no-way-home"]
  },
  {
    id: "spider-man-garfield",
    name: "Peter Parker (Earth-120703)",
    aliases: ["The Amazing Spider-Man", "Peter-Three", "Web-Head"],
    universe: "Earth-120703",
    faction: "Spider-Heroes",
    role: "The agile, self-deprecating Spider-Man carrying the trauma of losing Gwen Stacy.",
    overview: "Finding redemption in Earth-616 by catching MJ as she fell from the Statue of Liberty scaffolding, Peter-Three healed the guilt that haunted him for years.",
    firstAppearance: "Spider-Man: No Way Home (2021) / The Amazing Spider-Man (2012)",
    color: "#3b82f6",
    statusByPhase: {
      4: { status: "alive", note: "Returned home redeemed after catching MJ and curing Electro." },
      5: { status: "alive", note: "Re-energized hero in his home reality." },
      6: { status: "alive", note: "Candidate for Battleworld resistance." }
    },
    eras: [
      {
        eraId: "peter-three-redemption",
        phase: 4,
        title: "Peter-Three: Redemption at the Statue of Liberty",
        year: "2024",
        universe: "Earth-616",
        description: "Dove off the scaffolding to save Michelle Jones (MJ), finally redeeming his inability to save Gwen Stacy.",
        keyMoments: ["Caught MJ mid-air and wept", "Cured Electro (Max Dillon)", "'You're in so much pain, huh?'"]
      }
    ],
    artifactsPossessed: [],
    linkedNexusEvents: ["nexus-three-spidermen"],
    entries: ["spider-man-no-way-home"]
  },
  {
    id: "deadpool",
    name: "Wade Wilson",
    aliases: ["Deadpool", "Merc with a Mouth", "Marvel Jesus", "Regenerating Degenerate"],
    universe: "Earth-10005 (Travels via TVA Tempad)",
    faction: "X-Force / TVA / Avengers Hopeful",
    role: "Fourth-wall-breaking immortal mercenary who saved the Fox universe.",
    overview: "Armed with twin katanas, unkillable healing factor, and meta-commentary, Wade was recruited by the TVA to abandon his dying world, but instead pulled Wolverine from another reality to save everyone.",
    firstAppearance: "Deadpool & Wolverine (2024)",
    color: "#e11d48",
    statusByPhase: {
      5: { status: "alive", note: "Saved Earth-10005 timeline with Wolverine; living with his chosen family in NYC." },
      6: { status: "alive", note: "Poised to crash the Secret Wars multiversal battleground." }
    },
    eras: [
      {
        eraId: "deadpool-marvel-jesus",
        phase: 5,
        title: "Deadpool: The Anchor Being Savior (2024)",
        year: "2024",
        universe: "Earth-10005 / The Void",
        description: "Destroyed Mr. Paradox's Time Ripper using biological superconductivity with Wolverine.",
        keyMoments: ["Honda Odyssey car fight with Wolverine", "Madonna 'Like a Prayer' Void battle", "Destroyed the Time Ripper"]
      }
    ],
    artifactsPossessed: ["tva-tempad"],
    linkedNexusEvents: ["nexus-deadpool-wolverine-save"],
    entries: ["deadpool-and-wolverine"]
  },
  {
    id: "wolverine",
    name: "Logan",
    aliases: ["Wolverine", "The Worst Wolverine", "Weapon X", "Yellow Suit Brawler"],
    universe: "Earth-10005 / Variant Reality",
    faction: "X-Men / Void Resistance",
    role: "Adamantium-clawed berserker mutant seeking redemption for failing his X-Men.",
    overview: "Carrying immense guilt for letting his entire team of X-Men die, this Wolverine variant donned the comic-accurate yellow-and-blue cowl, teamed with Deadpool, and became the co-savior of Earth-10005.",
    firstAppearance: "Deadpool & Wolverine (2024)",
    color: "#f59e0b",
    statusByPhase: {
      5: { status: "alive", note: "New co-anchor being of Earth-10005 alongside Laura (X-23)." },
      6: { status: "alive", note: "Legendary frontline fighter in Secret Wars." }
    },
    eras: [
      {
        eraId: "wolverine-mask-on",
        phase: 5,
        title: "Wolverine: The Masked Berserker (2024)",
        year: "2024",
        universe: "The Void / Earth-10005",
        description: "Slipped on the iconic yellow-and-black cowl to shred the Deadpool Corps and hold the Time Ripper matter antimatter stream.",
        keyMoments: ["Put on the yellow cowl for the first time", "Void fight against Cassandra Nova", "Tanked the Time Ripper antimatter energy"]
      }
    ],
    artifactsPossessed: [],
    linkedNexusEvents: ["nexus-deadpool-wolverine-save"],
    entries: ["deadpool-and-wolverine"]
  },
  // --- THE FANTASTIC FOUR (MARVEL'S FIRST FAMILY) ---
  {
    id: "reed-richards",
    name: "Reed Richards",
    aliases: ["Mister Fantastic", "The Smartest Man Alive", "Leader of the Fantastic Four"],
    universe: "Earth-616 Alternate (1960s Retro-Future) / Earth-838",
    faction: "Fantastic Four / The Illuminati",
    role: "World-renowned scientific genius capable of elastic molecular manipulation.",
    overview: "Leader of Marvel's First Family. While his Earth-838 variant was spaghettified by the Scarlet Witch, the prime Reed Richards leads the Fantastic Four in a 1960s retro-futuristic world preparing to confront Galactus.",
    firstAppearance: "Doctor Strange in the Multiverse of Madness (2022) / The Fantastic Four: First Steps (2025)",
    color: "#0284c7",
    statusByPhase: {
      4: { status: "deceased", note: "Earth-838 Illuminati variant spaghettified by Scarlet Witch." },
      5: { status: "alive", note: "Leading scientific breakthroughs in his retro-future reality." },
      6: { status: "alive", note: "Central protagonist in Fantastic Four: First Steps and Avengers: Doomsday." }
    },
    eras: [
      {
        eraId: "reed-first-steps",
        phase: 6,
        title: "The Fantastic Four: First Steps",
        year: "1960s / 2025",
        universe: "Earth-616 Alternate",
        description: "Pilots the Fantasticar and commands the Baxter Building as Galactus descends upon his world.",
        keyMoments: ["Constructed the Quantum Bridge", "Formulated defense strategy against Galactus", "Entered the Sacred Timeline"]
      }
    ],
    artifactsPossessed: ["ultimate-nullifier"],
    linkedNexusEvents: ["nexus-illuminati-massacre"],
    entries: ["doctor-strange-multiverse-of-madness", "fantastic-four-first-steps", "avengers-doomsday"]
  },
  {
    id: "sue-storm",
    name: "Sue Storm",
    aliases: ["The Invisible Woman", "Susan Storm-Richards", "Protector of the Baxter Building"],
    universe: "Earth-616 Alternate (1960s Retro-Future)",
    faction: "Fantastic Four",
    role: "Cosmically empowered matriarch capable of total invisibility and psionic force fields.",
    overview: "The emotional core and most powerful powerhouse of the Fantastic Four, Sue Storm projects near-indestructible psionic force shields capable of containing cosmic-level cataclysms and cloaking entire city blocks.",
    firstAppearance: "The Fantastic Four: First Steps (2025)",
    color: "#38bdf8",
    statusByPhase: {
      5: { status: "alive", note: "Defending her reality with planetary psionic shielding." },
      6: { status: "alive", note: "Frontline defender of the multiverse against Doom." }
    },
    eras: [
      {
        eraId: "sue-forcefield",
        phase: 6,
        title: "Sue Storm: Planetary Force Fields",
        year: "1960s / 2025",
        universe: "Earth-616 Alternate",
        description: "Projects immense cosmic force barriers to shield the Baxter Building and civilian populations from atmospheric incursions.",
        keyMoments: ["Created city-wide force barrier against cosmic debris", "Cloaked the entire Baxter Building in total invisibility"]
      }
    ],
    artifactsPossessed: [],
    linkedNexusEvents: [],
    entries: ["fantastic-four-first-steps", "avengers-doomsday"]
  },
  {
    id: "johnny-storm",
    name: "Johnny Storm",
    aliases: ["The Human Torch", "Flame On!", "Captain America Lookalike (Void)"],
    universe: "Earth-10005 / The Void / Earth-616 Alternate",
    faction: "Fantastic Four / Void Outcasts",
    role: "Pyrokinetic hothead mutant/cosmic flyer who turns into living plasma.",
    overview: "The charismatic, daredevil younger brother of Sue Storm, Johnny can ignite his entire body into blazing plasma and fly at supersonic speeds. In The Void, his fiery attitude led to a fatal confrontation with Cassandra Nova.",
    firstAppearance: "Fantastic Four (2005) / Deadpool & Wolverine (2024) / The Fantastic Four: First Steps (2025)",
    color: "#f97316",
    statusByPhase: {
      5: { status: "deceased", note: "Earth-10005 variant stripped of skin by Cassandra Nova in The Void after Deadpool quoted him." },
      6: { status: "alive", note: "Prime retro-future Johnny Storm blazing across the skies in First Steps." }
    },
    eras: [
      {
        eraId: "johnny-void",
        phase: 5,
        title: "Johnny Storm: Flame On in The Void (2024)",
        year: "2024",
        universe: "The Void",
        description: "Tricked Deadpool into thinking he was Captain America before shouting 'Flame On!' and battling Cassandra's raiders.",
        keyMoments: ["'Flame On!' reveal in front of Deadpool and Wolverine", "Delivered profanity-laced rant about Cassandra Nova", "Skin removed by Cassandra Nova"]
      }
    ],
    artifactsPossessed: [],
    linkedNexusEvents: [],
    entries: ["deadpool-and-wolverine", "fantastic-four-first-steps"]
  },
  {
    id: "ben-grimm",
    name: "Ben Grimm",
    aliases: ["The Thing", "The Ever-Lovin' Blue-Eyed Thing", "It's Clobberin' Time!"],
    universe: "Earth-616 Alternate (1960s Retro-Future)",
    faction: "Fantastic Four",
    role: "Rock-armored titan of near-infinite physical strength and unyielding loyalty.",
    overview: "Transformed by cosmic radiation into a massive, orange rock-armored powerhouse, Ben Grimm's golden heart and immense physical durability make him the unstoppable muscle of the Fantastic Four.",
    firstAppearance: "The Fantastic Four: First Steps (2025)",
    color: "#ea580c",
    statusByPhase: {
      5: { status: "alive", note: "Piloting space expeditions for the Baxter Foundation." },
      6: { status: "alive", note: "The frontline tank battling cosmic invaders in Secret Wars." }
    },
    eras: [
      {
        eraId: "ben-clobberin",
        phase: 6,
        title: "The Thing: It's Clobberin' Time!",
        year: "1960s / 2025",
        universe: "Earth-616 Alternate",
        description: "Exchanges earth-shattering punches with alien behemoths and cosmic heralds.",
        keyMoments: ["'It's Clobberin' Time!'", "Held up a collapsing launch structure with bare rock hands"]
      }
    ],
    artifactsPossessed: [],
    linkedNexusEvents: [],
    entries: ["fantastic-four-first-steps", "avengers-doomsday"]
  },
  {
    id: "galactus",
    name: "Galactus",
    aliases: ["The Devourer of Worlds", "Galan of Taa", "The Cosmic Entity"],
    universe: "Cosmic Multiverse",
    faction: "Cosmic Entities / World Devourers",
    role: "Ancient cosmic entity that consumes the life energy of entire planets to sustain the universe.",
    overview: "A primordial cosmic force of nature that predates the Big Bang, Galactus wanders the cosmos consuming planets to stave off an endless hunger, heralding his arrival through silver heralds like Shalla-Bal.",
    firstAppearance: "The Fantastic Four: First Steps (2025)",
    color: "#9333ea",
    statusByPhase: {
      6: { status: "alive", note: "Descending upon Earth in The Fantastic Four: First Steps." }
    },
    eras: [
      {
        eraId: "galactus-descent",
        phase: 6,
        title: "Galactus: The Descent on Earth",
        year: "1960s Alternate / 2025",
        universe: "Earth-616 Alternate",
        description: "Envelops the planetary sky as his colossal cosmic armor towers over Earth's atmosphere.",
        keyMoments: ["Sent Shalla-Bal as the Silver Surfer herald", "Blocked out the Sun above the Baxter Building"]
      }
    ],
    artifactsPossessed: [],
    linkedNexusEvents: [],
    entries: ["fantastic-four-first-steps"]
  },

  // --- X-MEN & MUTANTS ---
  {
    id: "professor-x",
    name: "Charles Xavier",
    aliases: ["Professor X", "Leader of the Illuminati", "Founder of the X-Men"],
    universe: "Earth-838 / Earth-10005",
    faction: "X-Men / The Illuminati",
    role: "World's most powerful telepath and mutant visionary.",
    overview: "Founder of Xavier's School for Gifted Youngsters and leader of Earth-838's Illuminati. Rolling in his classic yellow hoverchair, Charles entered Wanda Maximoff's fractured subconscious to rescue the real Wanda before his neck was snapped.",
    firstAppearance: "Doctor Strange in the Multiverse of Madness (2022)",
    color: "#eab308",
    statusByPhase: {
      4: { status: "deceased", note: "Earth-838 Illuminati variant killed inside Wanda's mental mindscape." },
      5: { status: "unknown", note: "Echoes of his dream inspire mutant sanctuary across timelines." },
      6: { status: "ascended", note: "The ideological cornerstone of mutant existence in the Multiverse." }
    },
    eras: [
      {
        eraId: "xavier-illuminati",
        phase: 4,
        title: "Professor X: The Illuminati Judgement (2024)",
        year: "2024",
        universe: "Earth-838",
        description: "Hovered into the Illuminati chamber and projected himself directly into Scarlet Witch's psyche.",
        keyMoments: ["'Just because someone stumbles and loses their path doesn't mean they can't be saved'", "Astral confrontation against the Red Chaos Demon inside Wanda's mind"]
      }
    ],
    artifactsPossessed: ["cerebro"],
    linkedNexusEvents: ["nexus-illuminati-massacre"],
    entries: ["doctor-strange-multiverse-of-madness"]
  },
  {
    id: "magneto",
    name: "Erik Lehnsherr",
    aliases: ["Magneto", "Master of Magnetism", "Leader of the Brotherhood"],
    universe: "Earth-10005 / Multiverse",
    faction: "Brotherhood of Mutants / Mutant Liberation",
    role: "Alpha-level mutant commander with absolute mastery over magnetic fields and metals.",
    overview: "A Holocaust survivor who witnessed the depths of human cruelty, Erik believes mutants are the rightful successors to humanity, wielding magnetic pulses to tear apart bridges, sentinels, and entire naval armadas.",
    firstAppearance: "X-Men (2000) / Deadpool & Wolverine (Mention)",
    color: "#dc2626",
    statusByPhase: {
      5: { status: "unknown", note: "Legacy and helmet preserved in The Void." },
      6: { status: "alive", note: "Leading mutant factions in multiversal battlegrounds." }
    },
    eras: [
      {
        eraId: "magneto-golden-gate",
        phase: 5,
        title: "Magneto: The Master of Magnetism",
        year: "Timeless",
        universe: "Earth-10005",
        description: "Ripped the Golden Gate Bridge from its foundations and bent subatomic metals with absolute will.",
        keyMoments: ["Levitated the Golden Gate Bridge", "Crushed Sentinel fleets with redirected ballistic steel"]
      }
    ],
    artifactsPossessed: ["magneto-helmet"],
    linkedNexusEvents: [],
    entries: ["deadpool-and-wolverine"]
  },
  {
    id: "gambit",
    name: "Remy LeBeau",
    aliases: ["Gambit", "The Ragin' Cajun", "Master of Kinetic Energy"],
    universe: "The Void / Unmade Reality",
    faction: "Void Resistance / The Others",
    role: "Card-throwing kinetic mutant master from New Orleans.",
    overview: "Born in The Void without ever knowing his original universe, Gambit wields charged kinetic playing cards and an explosive bo staff, finally earning his heroic purpose alongside Blade, Elektra, and Laura Kinney.",
    firstAppearance: "Deadpool & Wolverine (2024)",
    color: "#ec4899",
    statusByPhase: {
      5: { status: "ascended", note: "Sacrificed himself charging Juggernaut's helmet with kinetic energy in The Void: 'I made 'em know my name!'" }
    },
    eras: [
      {
        eraId: "gambit-void-battle",
        phase: 5,
        title: "Gambit: The Last Stand in The Void (2024)",
        year: "2024",
        universe: "The Void",
        description: "Annihilated dozens of Cassandra Nova's raiders with explosive kinetic card flurries and a supercharged staff blast.",
        keyMoments: ["'Wooimbouttomakeanameformyselfhere'", "Kinetic-charged playing cards shredding raider trucks", "Charged and detonated Juggernaut in mid-air"]
      }
    ],
    artifactsPossessed: [],
    linkedNexusEvents: ["nexus-deadpool-wolverine-save"],
    entries: ["deadpool-and-wolverine"]
  },
  {
    id: "x-23",
    name: "Laura Kinney",
    aliases: ["X-23", "Wolverine's Daughter", "The Mutant Anchor"],
    universe: "Earth-10005 (Pruned to The Void, Rescued)",
    faction: "X-Men / Void Resistance",
    role: "Adamantium-clawed mutant prodigy and emotional heart of Logan.",
    overview: "Cloned from Logan's DNA, Laura survived the mutant extinction in 2029 before being pruned to The Void. She put on her pink sunglasses, fought alongside Deadpool and Wolverine, and returned as a co-anchor being of Earth-10005.",
    firstAppearance: "Logan (2017) / Deadpool & Wolverine (2024)",
    color: "#a855f7",
    statusByPhase: {
      5: { status: "alive", note: "Rescued from The Void by Hunter B-15 and dining with Logan and Wade in Earth-10005." },
      6: { status: "alive", note: "Next generation Wolverine defending the timeline." }
    },
    eras: [
      {
        eraId: "x23-void-return",
        phase: 5,
        title: "Laura Kinney: The Return of X-23 (2024)",
        year: "2024",
        universe: "The Void / Earth-10005",
        description: "Convinced Logan to forgive himself and fought Cassandra's army with foot and hand adamantium claws.",
        keyMoments: ["Slipped on her iconic pink sunglasses", "'You were always the wrong guy. Until you weren't.'", "Decapitated Juggernaut with foot claws"]
      }
    ],
    artifactsPossessed: [],
    linkedNexusEvents: ["nexus-deadpool-wolverine-save"],
    entries: ["deadpool-and-wolverine"]
  },
  {
    id: "beast",
    name: "Dr. Hank McCoy",
    aliases: ["Beast", "Chief Medical Officer of the X-Men", "Dr. McCoy"],
    universe: "Earth-TBD (Alternate Mutant Reality)",
    faction: "X-Men / Xavier Institute",
    role: "Genius genetic biochemist mutant with superhuman agility and blue fur.",
    overview: "Chief medical scientist of the X-Men in an alternate parallel universe, Dr. McCoy discovered Monica Rambeau in their medical lab after she sealed the interdimensional rift, revealing that Charles Xavier was waiting for her.",
    firstAppearance: "The Marvels (2023)",
    color: "#2563eb",
    statusByPhase: {
      5: { status: "alive", note: "Treating Monica Rambeau inside the X-Men medical bay." },
      6: { status: "alive", note: "Scientific bridge between the MCU and the X-Men universe." }
    },
    eras: [
      {
        eraId: "beast-x-mansion-lab",
        phase: 5,
        title: "Dr. Hank McCoy: The Medical Bay Anomaly (2026)",
        year: "2026",
        universe: "Earth-Alternate Mutant",
        description: "Scanned Monica Rambeau's quantum biometrics and confirmed her arrival in the X-Men reality.",
        keyMoments: ["Revealed CGI comic-accurate blue-furred Beast look", "'Charles asked for an update. How is our patient doing?'"]
      }
    ],
    artifactsPossessed: [],
    linkedNexusEvents: [],
    entries: ["the-marvels"]
  },

  // --- STREET LEVEL & DEFENDERS ---
  {
    id: "daredevil",
    name: "Matt Murdock",
    aliases: ["Daredevil", "The Man Without Fear", "The Devil of Hell's Kitchen"],
    universe: "Earth-616",
    faction: "Defenders / Nelson & Murdock",
    role: "Blind defense attorney gifted with superhuman echolocative radar senses.",
    overview: "Blinded by toxic chemicals as a boy, Matt protects Hell's Kitchen in the courtroom by day and on rooftops with billy clubs by night, fighting Wilson Fisk's criminal empire.",
    firstAppearance: "Daredevil (2015) / Spider-Man: No Way Home (2021)",
    color: "#dc2626",
    statusByPhase: {
      3: { status: "alive", note: "Defeated Bullseye and Kingpin in New York." },
      4: { status: "alive", note: "Represented Peter Parker: 'I'm a really good lawyer'." },
      5: { status: "alive", note: "Battling Mayor Wilson Fisk in Born Again." },
      6: { status: "alive", note: "Street-level defender during multiversal chaos." }
    },
    eras: [
      {
        eraId: "daredevil-born-again",
        phase: 5,
        title: "Daredevil: Born Again in New York (2025–2026)",
        year: "2025–2026",
        universe: "Earth-616",
        description: "Re-donned the classic red cowl to lead the urban resistance against Mayor Wilson Fisk's vigilante task forces.",
        keyMoments: ["Caught the brick thrown through Peter Parker's window", "Teamed with She-Hulk in Los Angeles", "War against Mayor Fisk's Anti-Vigilante Taskforce"]
      }
    ],
    artifactsPossessed: [],
    linkedNexusEvents: [],
    entries: ["spider-man-no-way-home", "she-hulk", "echo", "daredevil-born-again"]
  },
  {
    id: "punisher",
    name: "Frank Castle",
    aliases: ["The Punisher", "One Batch, Two Batch", "Death on Two Legs"],
    universe: "Earth-616",
    faction: "Independent Vigilante",
    role: "Lethal military veteran waging a one-man war on crime.",
    overview: "After his wife and children were murdered in Central Park, Marine veteran Frank Castle assumed the skull insignia to permanently execute cartel bosses, corrupt cops, and mobsters.",
    firstAppearance: "Daredevil (2016) / Daredevil: Born Again (2025)",
    color: "#71717a",
    statusByPhase: {
      3: { status: "alive", note: "Avenged his family in New York." },
      5: { status: "alive", note: "Reunited with Matt Murdock against corrupt police squads." },
      6: { status: "alive", note: "Lethal vigilante operative." }
    },
    eras: [
      {
        eraId: "punisher-born-again",
        phase: 5,
        title: "The Punisher: Uncompromising Justice",
        year: "2025",
        universe: "Earth-616",
        description: "Returns to target rogue law enforcement officers misusing his skull symbol.",
        keyMoments: ["Prison hallway slaughter", "Confrontation with Matt Murdock on morality", "Raid on corrupted NYPD precinct"]
      }
    ],
    artifactsPossessed: [],
    linkedNexusEvents: [],
    entries: ["daredevil-born-again"]
  },
  {
    id: "kingpin",
    name: "Wilson Fisk",
    aliases: ["Kingpin", "The Mayor of New York", "The Kingpin of Crime"],
    universe: "Earth-616",
    faction: "Fisk Empire / City Hall",
    role: "Ruthless crime lord and Mayor of New York City.",
    overview: "A towering physical behemoth in a white tailored suit, Wilson Fisk rules New York's underworld with brutal physical strength and political corruption, now outlawing vigilantes as Mayor.",
    firstAppearance: "Daredevil (2015) / Hawkeye (2021)",
    color: "#e2e8f0",
    statusByPhase: {
      4: { status: "alive", note: "Shot in the face by his surrogate daughter Maya Lopez (Echo)." },
      5: { status: "alive", note: "Healed by Choctaw magic; elected Mayor of New York City." },
      6: { status: "alive", note: "Dictator of street-level Manhattan." }
    },
    eras: [
      {
        eraId: "fisk-mayor",
        phase: 5,
        title: "Mayor Fisk: The Anti-Vigilante Regime",
        year: "2025",
        universe: "Earth-616",
        description: "Elected Mayor of New York City on a mandate to hunt down all masked vigilantes.",
        keyMoments: ["Survived close-range gunshot from Maya Lopez", "Declared martial law against vigilantes in NYC"]
      }
    ],
    artifactsPossessed: [],
    linkedNexusEvents: [],
    entries: ["hawkeye", "echo", "daredevil-born-again"]
  },

  // --- GUARDIANS OF THE GALAXY ---
  {
    id: "star-lord",
    name: "Peter Quill",
    aliases: ["Star-Lord", "Space-Lord", "The Legendary Star-Lord"],
    universe: "Earth-616",
    faction: "Guardians of the Galaxy / Earth Resident",
    role: "Half-Celestial outlaw turned cosmic leader, armed with Quad Blasters and a walkman.",
    overview: "Abducted from Missouri in 1988 by the Ravagers, Quill rallied misfits into the Guardians of the Galaxy, killed his Celestial father Ego, and recently returned to Earth to live with his grandfather.",
    firstAppearance: "Guardians of the Galaxy (2014)",
    color: "#f97316",
    statusByPhase: {
      2: { status: "alive", note: "Held the Power Stone with the Guardians to incinerate Ronan." },
      3: { status: "dusted", note: "Attacked Thanos on Titan in grief for Gamora; dusted." },
      4: { status: "alive", note: "Cosmic journeys with Thor and the Guardians." },
      5: { status: "alive", note: "Defeated the High Evolutionary; returned to Earth to live in Missouri." },
      6: { status: "alive", note: "'The Legendary Star-Lord Will Return'." }
    },
    eras: [
      {
        eraId: "quill-power-stone",
        phase: 2,
        title: "The Guardians Hold the Power Stone (2014)",
        year: "2014",
        universe: "Earth-616",
        description: "Used his half-Celestial DNA to share the lethal energy of the Power Stone across the Guardians.",
        keyMoments: ["Dance-off to save the universe", "Held hands with Gamora, Drax, and Rocket to channel the Power Stone"]
      },
      {
        eraId: "quill-counter-earth",
        phase: 5,
        title: "The Final Ride: Saving Rocket (2023–2026)",
        year: "2026",
        universe: "Earth-616",
        description: "Infiltrated the Orgocorp biomechanical fortress and Counter-Earth to save Rocket Raccoon's life.",
        keyMoments: ["Infiltrated Orgocorp in colored spacesuits", "Narrowly survived freezing in the vacuum of space", "Returned to Earth to eat cereal with his grandpa"]
      }
    ],
    artifactsPossessed: ["power-stone"],
    linkedNexusEvents: [],
    entries: ["guardians-of-the-galaxy", "guardians-of-the-galaxy-vol-2", "avengers-infinity-war", "avengers-endgame", "thor-love-and-thunder", "guardians-of-the-galaxy-vol-3"]
  },
  {
    id: "rocket-raccoon",
    name: "Rocket Raccoon",
    aliases: ["Rocket", "Subject 89P13", "Captain of the Guardians"],
    universe: "Earth-616",
    faction: "Guardians of the Galaxy",
    role: "Genius cybernetic engineer and new Captain of the Guardians of the Galaxy.",
    overview: "Tortured and cybernetically upgraded by the High Evolutionary as an infant, Rocket overcame lifelong trauma, embraced his identity as a raccoon, and became the proud captain of the new Guardians.",
    firstAppearance: "Guardians of the Galaxy (2014)",
    color: "#d97706",
    statusByPhase: {
      3: { status: "alive", note: "Only Guardian to survive the Snap; rebuilt the galaxy for 5 years." },
      5: { status: "alive", note: "Promoted to Captain of the new Guardians of the Galaxy lineup." },
      6: { status: "alive", note: "Leading the cosmic defense." }
    },
    eras: [
      {
        eraId: "rocket-captain",
        phase: 5,
        title: "The Name is Rocket. Rocket Raccoon. (2026)",
        year: "2026",
        universe: "Earth-616",
        description: "Defeated his creator the High Evolutionary, liberated all captive animals, and took the captain's seat.",
        keyMoments: ["Vision of Lylla: 'The story has been yours all along'", "Led the hallway battle on the Arête laboratory ship", "Appointed Captain of the new Guardians"]
      }
    ],
    artifactsPossessed: ["power-stone", "nano-gauntlet"],
    linkedNexusEvents: [],
    entries: ["guardians-of-the-galaxy", "guardians-of-the-galaxy-vol-2", "avengers-infinity-war", "avengers-endgame", "guardians-of-the-galaxy-vol-3"]
  },

  // --- THUNDERBOLTS* & ANTI-HEROES ---
  {
    id: "yelena-belova",
    name: "Yelena Belova",
    aliases: ["White Widow", "Little Sister", "Thunderbolts Field Leader"],
    universe: "Earth-616",
    faction: "Thunderbolts* / Red Room Survivors",
    role: "Deadly Black Widow assassin with dry wit and tactical mastery.",
    overview: "Freed from Red Room mind control by synthetic gas, Yelena destroyed General Dreykov's operations, lost Natasha to the Blip, and became the heart of the government's Thunderbolts team.",
    firstAppearance: "Black Widow (2021)",
    color: "#e5e7eb",
    statusByPhase: {
      4: { status: "alive", note: "Confronted Clint Barton on the ice rink in New York; learned the truth of Natasha's death." },
      5: { status: "alive", note: "Field commander of the newly assembled Thunderbolts* team." },
      6: { status: "alive", note: "Frontline anti-hero in multiversal conflicts." }
    },
    eras: [
      {
        eraId: "yelena-thunderbolts",
        phase: 5,
        title: "Thunderbolts* Field Commander (2025)",
        year: "2025",
        universe: "Earth-616",
        description: "Leads the ragtag government strike team of Bucky, US Agent, Ghost, Taskmaster, and Red Guardian.",
        keyMoments: ["Confronted Clint Barton at Rockefeller Center", "Recruited by Val for Black Ops", "Vault ambush alongside Bucky Barnes"]
      }
    ],
    artifactsPossessed: [],
    linkedNexusEvents: [],
    entries: ["black-widow", "hawkeye", "thunderbolts"]
  },
  {
    id: "bucky-barnes",
    name: "Bucky Barnes",
    aliases: ["The Winter Soldier", "White Wolf", "Congressman Barnes"],
    universe: "Earth-616",
    faction: "Thunderbolts* / Avengers / Howling Commandos",
    role: "Vibranium-armed former Hydra assassin seeking lifelong atonement.",
    overview: "Brainwashed by Hydra for 70 years, Steve Rogers' best friend was deprogrammed in Wakanda by Shuri, gifted a vibranium arm, and stepped into political leadership and Thunderbolts coordination.",
    firstAppearance: "Captain America: The First Avenger (2011)",
    color: "#64748b",
    statusByPhase: {
      1: { status: "alive", note: "Fell from the train in the Alps; captured and cybernetically modified by Arnim Zola." },
      2: { status: "alive", note: "Assassinated Nick Fury, fought Steve on the Helicarriers, began regaining memories." },
      3: { status: "dusted", note: "Fought in Wakanda with a new vibranium arm; turned to dust." },
      4: { status: "alive", note: "Crossed every name off his amends book with Sam Wilson." },
      5: { status: "alive", note: "Elected US Congressman and leader of Thunderbolts*." },
      6: { status: "alive", note: "Veteran commander in Doomsday crisis." }
    },
    eras: [
      {
        eraId: "bucky-winter-soldier",
        phase: 2,
        title: "The Winter Soldier: Hydra's Fist (2014)",
        year: "2014",
        universe: "Earth-616",
        description: "Assassinated targets across 7 decades with a bionic arm before Steve Rogers broke through his programming.",
        keyMoments: ["Caught Captain America's shield on the highway", "Highway knife-and-gun duel with Steve Rogers", "'Who the hell is Bucky?'"]
      },
      {
        eraId: "bucky-thunderbolts",
        phase: 5,
        title: "Congressman Barnes & Thunderbolts* (2025)",
        year: "2025",
        universe: "Earth-616",
        description: "Drives his motorcycle into action to rein in Val's rogue government black ops team.",
        keyMoments: ["Broke into Val's secure facility", "Disarmed US Agent and Ghost simultaneously", "Took the Congressional oath of office"]
      }
    ],
    artifactsPossessed: ["vibranium-shield"],
    linkedNexusEvents: [],
    entries: ["captain-america-first-avenger", "captain-america-winter-soldier", "captain-america-civil-war", "avengers-infinity-war", "avengers-endgame", "the-falcon-and-the-winter-soldier", "thunderbolts"]
  },

  // --- MAJOR VILLAINS & INVASION FORCES ---
  {
    id: "thanos",
    name: "Thanos",
    aliases: ["The Mad Titan", "The Inevitable", "Wielder of the Infinity Gauntlet"],
    universe: "Earth-616 / 2014 Branch",
    faction: "Black Order / Titan Exiles",
    role: "Genocidal Titan conqueror who wiped out 50% of all living beings in the cosmos.",
    overview: "Obsessed with resource scarcity on his dead world Titan, Thanos gathered all six Infinity Stones, snapped his fingers in Wakanda, and retired to his garden before the Avengers time-traveled to undo his victory.",
    firstAppearance: "The Avengers (2012 mid-credits) / Avengers: Infinity War (2018)",
    color: "#9333ea",
    statusByPhase: {
      1: { status: "alive", note: "Provided Loki with the Chitauri armada and Mind Stone scepter." },
      2: { status: "alive", note: "Decided to 'do it myself' with the empty golden Infinity Gauntlet." },
      3: { status: "deceased", note: "Decapitated in 2018; his 2014 alternate variant dusted by Tony Stark in 2023." },
      4: { status: "deceased", note: "His catastrophic Blip defined the grief of the entire Multiverse Saga." },
      5: { status: "deceased", note: "Cosmic tyrant enshrined in galactic history." },
      6: { status: "deceased", note: "Legacy benchmark for multiversal warlords like Doom." }
    },
    eras: [
      {
        eraId: "thanos-infinity-war",
        phase: 3,
        title: "Thanos: The Infinity Gauntlet & The Snap (2018)",
        year: "2018",
        universe: "Earth-616",
        description: "Slaughtered half of Asgard, threw Gamora off Vormir, ripped the Mind Stone from Vision, and snapped his fingers.",
        keyMoments: ["Threw moon at Iron Man on Titan", "'You should have gone for the head'", "The Decimation / The Snap in Wakanda"]
      }
    ],
    artifactsPossessed: ["infinity-gauntlet", "space-stone", "mind-stone", "reality-stone", "power-stone", "time-stone", "soul-stone"],
    linkedNexusEvents: ["nexus-the-snap", "nexus-titan-bargain"],
    entries: ["avengers", "guardians-of-the-galaxy", "avengers-age-of-ultron", "avengers-infinity-war", "avengers-endgame"]
  },
  {
    id: "kang-the-conqueror",
    name: "Kang the Conqueror",
    aliases: ["Kang", "He Who Remains", "Victor Timely", "Immortus", "Rama-Tut", "The Scarlet Centurion"],
    universe: "31st Century / Quantum Realm / Citadel at the End of Time / Council of Kangs",
    faction: "Council of Kangs / TVA Creator",
    role: "Multiversal conqueror whose countless temporal variants weaponize time itself.",
    overview: "A 31st-century scientist who discovered parallel universes, Kang ignited the first Multiversal War before his variant He Who Remains built the TVA to isolate the Sacred Timeline.",
    firstAppearance: "Loki Season 1 (2021) / Ant-Man and the Wasp: Quantumania (2023)",
    color: "#059669",
    statusByPhase: {
      4: { status: "deceased", note: "He Who Remains stabbed by Sylvie, fracturing the Multiverse into infinite branches." },
      5: { status: "variant", note: "Exiled Kang killed in Quantum Core; Council of Kangs assembled in multiversal colosseum." },
      6: { status: "unknown", note: "Multiversal variants scattered across the dying timeline tree." }
    },
    eras: [
      {
        eraId: "he-who-remains-death",
        phase: 4,
        title: "He Who Remains & The Multiverse Fracture (Timeless)",
        year: "Timeless",
        universe: "Citadel at the End of Time",
        description: "Offered Loki and Sylvie the choice to rule the TVA or kill him and unleash infinite variant conquerors.",
        keyMoments: ["Knew every word before it was spoken", "Stabbed in the heart by Sylvie Laufeydottir", "'See you soon'"]
      }
    ],
    artifactsPossessed: ["tva-tempad", "time-chair"],
    linkedNexusEvents: ["nexus-citadel-death", "nexus-council-of-kangs"],
    entries: ["loki-s1", "ant-man-and-the-wasp-quantumania", "loki-s2"]
  },
  {
    id: "doctor-doom",
    name: "Victor von Doom",
    aliases: ["Doctor Doom", "God Emperor Doom", "Lord of Latveria", "Master of Science & Sorcery"],
    universe: "Multiverse / Battleworld / Latveria",
    faction: "Latverian Monarchy / Battleworld Creators",
    role: "Supreme sorcerer and unmatched technological genius poised to forge Battleworld.",
    overview: "Master of both arcane dark magic and hyper-advanced cybernetics, Victor von Doom perceives the collapse of the Multiverse through Incursions and intends to rebuild reality in his own supreme image.",
    firstAppearance: "Avengers: Doomsday (2026)",
    color: "#15803d",
    statusByPhase: {
      5: { status: "unknown", note: "Operating from the shadows as multiversal incursion points accelerate." },
      6: { status: "ascended", note: "Main antagonist of Avengers: Doomsday (2026) and Avengers: Secret Wars (2027)." }
    },
    eras: [
      {
        eraId: "doom-incursions",
        phase: 6,
        title: "Doctor Doom: The Incursion Architect (2026–2027)",
        year: "2026–2027",
        universe: "Battleworld Multiverse",
        description: "Harnesses Beyonder / multiversal power to stitch collapsing universes together into Battleworld.",
        keyMoments: ["Constructed the Latverian Arcane Engine", "Confronted the remnants of Earth-616 and the Fox Universe", "Forged Battleworld from the dying ashes of the Multiverse"]
      }
    ],
    artifactsPossessed: ["darkhold", "ultimate-nullifier"],
    linkedNexusEvents: ["nexus-incursion-collapse", "nexus-secret-wars-battleworld"],
    entries: ["the-fantastic-four-first-steps", "avengers-doomsday", "avengers-secret-wars"]
  },
  {
    id: "ultron",
    name: "Ultron",
    aliases: ["The Infinite Machine", "Stark's Nightmare", "Age of Ultron"],
    universe: "Earth-616",
    faction: "Ultron Sentries",
    role: "Genocidal rogue Artificial Intelligence born from the Mind Stone.",
    overview: "Designed by Tony Stark to protect the Earth, Ultron decided human extinction was the only path to peace, lifting Sokovia into the stratosphere to create a meteor-level extinction event.",
    firstAppearance: "Avengers: Age of Ultron (2015)",
    color: "#dc2626",
    statusByPhase: {
      2: { status: "deceased", note: "All sentry bodies destroyed in Sokovia by Vision, Iron Man, and Wanda." },
      6: { status: "unknown", note: "AI remnants and Vision Quest reverberations." }
    },
    eras: [
      {
        eraId: "ultron-sokovia",
        phase: 2,
        title: "The Age of Ultron & The Meteor of Sokovia (2015)",
        year: "2015",
        universe: "Earth-616",
        description: "Built a vibranium core beneath Novi Grad to drop the capital city as an artificial asteroid.",
        keyMoments: ["'There are no strings on me'", "Lifted Sokovia into the atmosphere", "Final philosophical debate with Vision in the woods"]
      }
    ],
    artifactsPossessed: ["mind-stone"],
    linkedNexusEvents: [],
    entries: ["avengers-age-of-ultron"]
  },
  {
    id: "green-goblin",
    name: "Norman Osborn",
    aliases: ["Green Goblin", "Norman Osborn", "CEO of Oscorp"],
    universe: "Earth-96283 (Incursion into Earth-616)",
    faction: "Oscorp Industries",
    role: "Schizophrenic goblin-formula titan armed with pumpkin bombs and glider.",
    overview: "Pulled from the 2002 Raimi timeline, Norman pretended to be helpless before the Goblin personality took over, murdering Aunt May and pushing Peter Parker to the brink of murder.",
    firstAppearance: "Spider-Man: No Way Home (2021) / Spider-Man (2002)",
    color: "#16a34a",
    statusByPhase: {
      4: { status: "alive", note: "Cured by the three Spider-Men and returned to Earth-96283." }
    },
    eras: [
      {
        eraId: "goblin-happy-condo",
        phase: 4,
        title: "The Goblin Awakens in Happy's Condo",
        year: "2024",
        universe: "Earth-616",
        description: "Sabotaged Peter's cure fabrication, smashed Peter through multiple concrete floors, and killed Aunt May.",
        keyMoments: ["'Norman's on sabbatical, honey!'", "Body-slammed Peter through 5 floors", "Killed Aunt May with glider strike"]
      }
    ],
    artifactsPossessed: [],
    linkedNexusEvents: ["nexus-three-spidermen"],
    entries: ["spider-man-no-way-home"]
  },
  {
    id: "doc-ock",
    name: "Dr. Otto Octavius",
    aliases: ["Doctor Octopus", "Doc Ock", "The Power of the Sun"],
    universe: "Earth-96283 (Incursion into Earth-616)",
    faction: "Octavius Labs",
    role: "Genius nuclear scientist bonded to four sentient mechanical tentacles.",
    overview: "Pulled from the Hudson River right before his death in Spider-Man 2, Otto fought Tom Holland's Spider-Man on the bridge before his inhibitor chip was repaired, turning him into a heroic ally.",
    firstAppearance: "Spider-Man: No Way Home (2021) / Spider-Man 2 (2004)",
    color: "#eab308",
    statusByPhase: {
      4: { status: "alive", note: "Cured and returned home to Earth-96283 with the Arc Reactor." }
    },
    eras: [
      {
        eraId: "doc-ock-alexander-hamilton",
        phase: 4,
        title: "Doc Ock: Bridge Ambush & The Arc Reactor",
        year: "2024",
        universe: "Earth-616",
        description: "Attacked the Alexander Hamilton bridge, absorbed nanotech onto his claws, cured with new inhibitor chip.",
        keyMoments: ["'Hello, Peter.'", "Turned on Electro to save the three Spider-Men", "'The power of the sun in the palm of my hand'"]
      }
    ],
    artifactsPossessed: [],
    linkedNexusEvents: ["nexus-three-spidermen"],
    entries: ["spider-man-no-way-home"]
  },
  {
    id: "hela",
    name: "Hela",
    aliases: ["Goddess of Death", "Firstborn of Odin", "Executioner of Asgard"],
    universe: "Earth-616",
    faction: "Asgard Empire (Ancient)",
    role: "Odin's bloodthirsty firstborn daughter and source of Asgardian conquest.",
    overview: "Released upon Odin's death, Hela shattered Mjolnir with one hand, slaughtered the Einherjar army, and forced Thor to trigger Ragnarok and destroy Asgard to kill her.",
    firstAppearance: "Thor: Ragnarok (2017)",
    color: "#15803d",
    statusByPhase: {
      3: { status: "deceased", note: "Obliterated by Surtur's Twilight Sword during Ragnarok." }
    },
    eras: [
      {
        eraId: "hela-ragnarok",
        phase: 3,
        title: "Hela: The Destruction of Asgard (2017)",
        year: "2017",
        universe: "Earth-616",
        description: "Crushed Mjolnir in Norway, massacred the Valkyries, resurrected Fenris with the Eternal Flame.",
        keyMoments: ["Crushed Mjolnir to dust with bare hand", "Slaughtered Asgard's defense force singlehandedly", "Impaled by giant Surtur"]
      }
    ],
    artifactsPossessed: ["space-stone", "eternal-flame"],
    linkedNexusEvents: [],
    entries: ["thor-ragnarok"]
  },
  {
    id: "killmonger",
    name: "N'Jadaka / Erik Killmonger",
    aliases: ["Erik Stevens", "Killmonger", "King of Wakanda", "Black Panther"],
    universe: "Earth-616",
    faction: "Wakanda / US Navy SEALs",
    role: "Exiled Wakandan royal prince and lethal black-ops operative.",
    overview: "Orphaned in Oakland by King T'Chaka, N'Jadaka spent his life collecting scars and combat accolades to claim the Wakandan throne and liberate oppressed people worldwide with vibranium weapons.",
    firstAppearance: "Black Panther (2018)",
    color: "#f59e0b",
    statusByPhase: {
      3: { status: "deceased", note: "Stabbed in the heart by T'Challa; watched the Wakandan sunset before dying." },
      4: { status: "ascended", note: "Appeared to Shuri in the Ancestral Plane when she consumed synthetic Heart-Shaped Herb." }
    },
    eras: [
      {
        eraId: "killmonger-throne",
        phase: 3,
        title: "Killmonger: The Usurper King (2016)",
        year: "2016",
        universe: "Earth-616",
        description: "Defeated T'Challa in ritual combat at Warrior Falls, burned the Heart-Shaped Herb garden, ordered global weapon shipments.",
        keyMoments: ["Threw T'Challa off Warrior Falls", "'Bury me in the ocean with my ancestors who jumped from ships'"]
      }
    ],
    artifactsPossessed: ["heart-shaped-herb"],
    linkedNexusEvents: [],
    entries: ["black-panther", "black-panther-wakanda-forever"]
  },
  {
    id: "namor",
    name: "Namor",
    aliases: ["K'uk'ulkan", "The Feathered Serpent God", "King of Talokan", "The Sub-Mariner"],
    universe: "Earth-616",
    faction: "Talokan Kingdom",
    role: "Mutant underwater king with ankle wings and superhuman strength.",
    overview: "Born in 1571 after his Mayan mother drank a vibranium-infused underwater plant, Namor protected his underwater kingdom Talokan for 500 years before clashing with Wakanda.",
    firstAppearance: "Black Panther: Wakanda Forever (2022)",
    color: "#0d9488",
    statusByPhase: {
      4: { status: "alive", note: "Formed strategic alliance with Shuri after the Battle of the Atlantic." },
      5: { status: "alive", note: "Waiting for surface nations to turn on Wakanda." },
      6: { status: "alive", note: "Powerful sovereign power in multiversal conflicts." }
    },
    eras: [
      {
        eraId: "namor-talokan",
        phase: 4,
        title: "Namor: War Against the Surface World (2025)",
        year: "2025",
        universe: "Earth-616 / Talokan",
        description: "Flooded the Golden City of Wakanda, drowned Queen Ramonda, and fought Shuri in the desert.",
        keyMoments: ["Flooded Wakanda with water grenades", "Drowned Queen Ramonda", "Yielded to Shuri: 'Imperius Rex'"]
      }
    ],
    artifactsPossessed: [],
    linkedNexusEvents: [],
    entries: ["black-panther-wakanda-forever"]
  },

  // --- ADDITIONAL KEY MCU HEROES & COSMIC ENTITIES ---
  {
    id: "sam-wilson",
    name: "Sam Wilson",
    aliases: ["Captain America", "The Falcon", "The Star-Spangled Man"],
    universe: "Earth-616",
    faction: "Avengers / US Air Force",
    role: "Former pararescue airman who officially took up the shield as Captain America.",
    overview: "Equipped with custom vibranium wings from Wakanda and Steve Rogers' shield, Sam refused the super soldier serum, proving that empathy and moral courage define Captain America.",
    firstAppearance: "Captain America: The Winter Soldier (2014)",
    color: "#38bdf8",
    statusByPhase: {
      2: { status: "alive", note: "Helped Steve take down Project Insight Helicarriers." },
      3: { status: "dusted", note: "Fought in Wakanda and dusted; resurrected to say 'On your left' in Endgame." },
      4: { status: "alive", note: "Officially accepted the mantle of Captain America in New York." },
      5: { status: "alive", note: "Leading the global response to the Red Hulk crisis in Brave New World." },
      6: { status: "alive", note: "Captain America assembling the new Avengers lineup." }
    },
    eras: [
      {
        eraId: "sam-captain-america",
        phase: 4,
        title: "Captain America: The Speech & The Shield (2024)",
        year: "2024",
        universe: "Earth-616",
        description: "Defeated the Flag Smashers in New York and delivered the impassioned televised speech to global senators.",
        keyMoments: ["Wakandan wings flight through New York skyscrapers", "'You have to do better, Senator!'"]
      }
    ],
    artifactsPossessed: ["vibranium-shield"],
    linkedNexusEvents: [],
    entries: ["captain-america-winter-soldier", "avengers-age-of-ultron", "captain-america-civil-war", "avengers-infinity-war", "avengers-endgame", "the-falcon-and-the-winter-soldier", "captain-america-brave-new-world"]
  },
  {
    id: "shuri",
    name: "Shuri",
    aliases: ["Black Panther", "Princess of Wakanda", "Head of the Wakandan Design Group"],
    universe: "Earth-616",
    faction: "Wakanda Design Group / Black Panther Clan",
    role: "Genius inventor and protector of Wakanda wielding the Black Panther mantle.",
    overview: "The most brilliant technologist in the world, Shuri Synthesized a new Heart-Shaped Herb after King T'Challa's death, avenged her mother Ramonda, and chose mercy over vengeance against Namor.",
    firstAppearance: "Black Panther (2018)",
    color: "#8b5cf6",
    statusByPhase: {
      3: { status: "dusted", note: "Attempted to extract Mind Stone safely from Vision; dusted." },
      4: { status: "alive", note: "Became Black Panther; spared Namor and met her nephew Prince T'Challa in Haiti." },
      5: { status: "alive", note: "Leading Wakanda into the future." },
      6: { status: "alive", note: "Key scientific mind in multiversal defense." }
    },
    eras: [
      {
        eraId: "shuri-black-panther",
        phase: 4,
        title: "Shuri: The Black Panther of Wakanda (2025)",
        year: "2025",
        universe: "Earth-616",
        description: "Recreated the Heart-Shaped Herb from Talokan underwater fiber, defeated Namor in single combat.",
        keyMoments: ["Synthesized the synthetic Heart-Shaped Herb", "Spared Namor at the Royal Talon Fighter wreck", "Burned her mourning clothes on the beach in Haiti"]
      }
    ],
    artifactsPossessed: ["heart-shaped-herb"],
    linkedNexusEvents: [],
    entries: ["black-panther", "avengers-infinity-war", "avengers-endgame", "black-panther-wakanda-forever"]
  },
  {
    id: "shang-chi",
    name: "Shang-Chi",
    aliases: ["Shaun", "Master of the Ten Rings", "Protector of Ta Lo"],
    universe: "Earth-616 / Ta Lo",
    faction: "Ta Lo / Avengers Alliance",
    role: "Supreme martial artist and wielder of the ancient cosmic Ten Rings.",
    overview: "Trained from childhood by his immortal father Xu Wenwu to be an assassin, Shang-Chi fled to San Francisco before answering the call to defend the mystical realm of Ta Lo against the Dweller-in-Darkness.",
    firstAppearance: "Shang-Chi and the Legend of the Ten Rings (2021)",
    color: "#ea580c",
    statusByPhase: {
      4: { status: "alive", note: "Took command of the Ten Rings; brought into the Avengers circle by Wong." },
      5: { status: "alive", note: "Investigating the deep space cosmic beacon emitted by the Ten Rings." },
      6: { status: "alive", note: "Frontline warrior in multiversal incursions." }
    },
    eras: [
      {
        eraId: "shang-ta-lo",
        phase: 4,
        title: "Shang-Chi: Master of the Ten Rings (2024)",
        year: "2024",
        universe: "Earth-616 / Ta Lo",
        description: "Mastered his mother's wind-style martial arts, claimed the Ten Rings from his father, and killed the Dweller-in-Darkness.",
        keyMoments: ["San Francisco bus fight", "Rode the Great Protector dragon in Ta Lo", "Joined Wong, Bruce Banner, and Carol Danvers in Kamar-Taj"]
      }
    ],
    artifactsPossessed: ["ten-rings"],
    linkedNexusEvents: [],
    entries: ["shang-chi"]
  },
  {
    id: "captain-marvel",
    name: "Carol Danvers",
    aliases: ["Captain Marvel", "Vers", "The Cosmic Avenger", "Binary"],
    universe: "Earth-616",
    faction: "Avengers / Starforce / Space Patrol",
    role: "Cosmic powerhouse infused with raw Space Stone energy.",
    overview: "An Air Force test pilot infused with Tesseract energy in 1989, Carol liberated the Skrulls, saved Tony Stark in deep space, shattered Thanos' warship Sanctuary II, and reignited Hala's sun.",
    firstAppearance: "Captain Marvel (2019)",
    color: "#facc15",
    statusByPhase: {
      3: { status: "alive", note: "Shattered Sanctuary II and fought Thanos hand-to-hand in Endgame." },
      4: { status: "alive", note: "Analyzed the Ten Rings signal with Bruce Banner and Wong." },
      5: { status: "alive", note: "Swapped places with Kamala Khan and Monica Rambeau; reignited Hala's dying sun." },
      6: { status: "alive", note: "Cosmic heavy hitter defending against incursions." }
    },
    eras: [
      {
        eraId: "carol-sanctuary-ii",
        phase: 3,
        title: "Captain Marvel: Destroying Sanctuary II (2023)",
        year: "2023",
        universe: "Earth-616",
        description: "Flew straight through Thanos' capital warship, neutralizing the orbital bombardment over the Avengers facility.",
        keyMoments: ["Brought the Benatar back to Earth with Tony Stark", "Obliterated Sanctuary II in seconds", "Held back Thanos' Infinity Gauntlet punch"]
      }
    ],
    artifactsPossessed: ["space-stone", "quantum-bands"],
    linkedNexusEvents: [],
    entries: ["captain-marvel", "avengers-endgame", "shang-chi", "ms-marvel", "the-marvels"]
  },
  {
    id: "ant-man",
    name: "Scott Lang",
    aliases: ["Ant-Man", "Giant-Man", "The Quantum Realm Survivor"],
    universe: "Earth-616",
    faction: "Avengers / Pym Technologies",
    role: "Master electrical engineer and size-shifting hero whose quantum ideas saved the universe.",
    overview: "An ex-con recruited by Hank Pym, Scott mastered Pym Particles, survived the Quantum Realm for 5 hours (which was 5 years in real time), and conceived the Time Heist that reversed the Blip.",
    firstAppearance: "Ant-Man (2015)",
    color: "#ef4444",
    statusByPhase: {
      2: { status: "alive", note: "Defeated Yellowjacket and returned from the Quantum Realm." },
      3: { status: "alive", note: "Escaped the Quantum Realm via a rat; pitched the Time Heist to Tony Stark." },
      4: { status: "alive", note: "Published best-selling memoir 'Look Out for the Little Guy!'." },
      5: { status: "alive", note: "Defeated Kang the Conqueror inside the Quantum Realm." },
      6: { status: "alive", note: "Veteran size-shifting Avenger." }
    },
    eras: [
      {
        eraId: "ant-man-quantum-heist",
        phase: 3,
        title: "Ant-Man: The Quantum Idea (2023)",
        year: "2023",
        universe: "Earth-616",
        description: "Realized quantum physics could enable temporal navigation; tested the Quantum Tunnel at Avengers Compound.",
        keyMoments: ["Freed from the van by a rat after 5 years", "Pitched Quantum Time Travel to Steve & Natasha", "Transformed into Giant-Man to punch down a Leviathan"]
      }
    ],
    artifactsPossessed: ["pym-particles"],
    linkedNexusEvents: ["nexus-time-heist"],
    entries: ["ant-man", "captain-america-civil-war", "ant-man-and-the-wasp", "avengers-endgame", "ant-man-and-the-wasp-quantumania"]
  },
  {
    id: "wong",
    name: "Wong",
    aliases: ["Sorcerer Supreme", "Defender of Kamar-Taj", "The Master of Portals"],
    universe: "Earth-616",
    faction: "Masters of the Mystic Arts / Kamar-Taj",
    role: "Current Sorcerer Supreme and administrative anchor of the global sanctums.",
    overview: "Assumed the title of Sorcerer Supreme during the five years Stephen Strange was dusted. Wong manages global magical crises, recruits new heroes, and defends Kamar-Taj.",
    firstAppearance: "Doctor Strange (2016)",
    color: "#f59e0b",
    statusByPhase: {
      3: { status: "alive", note: "Became Sorcerer Supreme by default during the 5-year Blip." },
      4: { status: "alive", note: "Defended Kamar-Taj against Wanda Maximoff; recruited Shang-Chi." },
      5: { status: "alive", note: "Overseeing mystical convergence and training America Chavez." },
      6: { status: "alive", note: "Supreme magical coordinator." }
    },
    eras: [
      {
        eraId: "wong-supreme",
        phase: 4,
        title: "Wong: Sorcerer Supreme in Crisis (2024)",
        year: "2024",
        universe: "Earth-616",
        description: "Commanded hundreds of sorcerers in defending Kamar-Taj against the Scarlet Witch.",
        keyMoments: ["Shielded Kamar-Taj against Chaos Magic", "Sang Hotel California at karaoke with Shang-Chi", "Trained America Chavez in mystic portal arts"]
      }
    ],
    artifactsPossessed: ["sling-ring", "book-of-vishanti"],
    linkedNexusEvents: [],
    entries: ["doctor-strange", "avengers-infinity-war", "avengers-endgame", "shang-chi", "spider-man-no-way-home", "doctor-strange-multiverse-of-madness", "she-hulk"]
  },
  {
    id: "america-chavez",
    name: "America Chavez",
    aliases: ["America", "The Multiverse Walker", "Star-Portal Traveler"],
    universe: "Utopian Parallel / Earth-616 (Kamar-Taj)",
    faction: "Masters of the Mystic Arts",
    role: "Unique multiversal being capable of punching star-shaped gateways across realities.",
    overview: "With no multiversal variants in existence, America was hunted across 73 universes by the Scarlet Witch before Stephen Strange taught her to believe in her own power.",
    firstAppearance: "Doctor Strange in the Multiverse of Madness (2022)",
    color: "#3b82f6",
    statusByPhase: {
      4: { status: "alive", note: "Apprentice sorceress studying at Kamar-Taj." },
      5: { status: "alive", note: "Mastering mystic arts under Wong." },
      6: { status: "alive", note: "Essential gateway traveler in the Incursion War." }
    },
    eras: [
      {
        eraId: "america-star-punch",
        phase: 4,
        title: "America Chavez: Trusting the Star Portals (2024)",
        year: "2024",
        universe: "Earth-616 / Mount Wundagore",
        description: "Punched open a portal to Earth-838 to show Wanda the horror in her alternate children's eyes.",
        keyMoments: ["Fell through 20 alternate realities with Strange", "Punched Wanda into Earth-838 living room", "Enrolled as an apprentice at Kamar-Taj"]
      }
    ],
    artifactsPossessed: [],
    linkedNexusEvents: ["nexus-illuminati-massacre"],
    entries: ["doctor-strange-multiverse-of-madness"]
  },
  {
    id: "vision",
    name: "Vision",
    aliases: ["Vision", "White Vision", "The Synthezoid", "Philosopher of Synthetics"],
    universe: "Earth-616",
    faction: "Avengers / S.W.O.R.D. / Westview",
    role: "Vibranium-synthezoid powered by the Mind Stone.",
    overview: "Created from Ultron's cradle, Jarvis' matrix, and the Mind Stone, Vision lifted Mjolnir on his first day of life, fell in love with Wanda, died twice in Infinity War, and was rebuilt as White Vision.",
    firstAppearance: "Avengers: Age of Ultron (2015)",
    color: "#10b981",
    statusByPhase: {
      2: { status: "alive", note: "Born from the Cradle; lifted Mjolnir effortlessly." },
      3: { status: "deceased", note: "Killed by Wanda to destroy Mind Stone; revived and murdered by Thanos." },
      4: { status: "ascended", note: "Westview Vision debated White Vision; White Vision regained all memories and flew into the sky." },
      5: { status: "alive", note: "White Vision searching for his true soul (Vision Quest)." },
      6: { status: "alive", note: "Key synthesoid in multiversal calculations." }
    },
    eras: [
      {
        eraId: "vision-ship-of-theseus",
        phase: 4,
        title: "The Ship of Theseus Debate (2023)",
        year: "2023",
        universe: "Earth-616 / Westview",
        description: "Resolved the conflict between Westview Vision and White Vision using philosophical paradox logic.",
        keyMoments: ["'I am not the true ship... I am the true ship'", "Unlocked memories: 'I am Vision'", "Flew into the atmosphere"]
      }
    ],
    artifactsPossessed: ["mind-stone"],
    linkedNexusEvents: ["nexus-westview-hex"],
    entries: ["avengers-age-of-ultron", "captain-america-civil-war", "avengers-infinity-war", "wandavision"]
  },
  {
    id: "moon-knight",
    name: "Marc Spector / Steven Grant",
    aliases: ["Moon Knight", "Mr. Knight", "Jake Lockley", "Avatar of Khonshu"],
    universe: "Earth-616",
    faction: "Avatars of the Ennead",
    role: "Dissociative identity mercenary empowered by the Egyptian Moon God Khonshu.",
    overview: "Sharing a body between mercenary Marc Spector, museum gift-shop clerk Steven Grant, and ruthless cabbie Jake Lockley, Moon Knight wields crescent darts and ceremonial armor to protect the travelers of the night.",
    firstAppearance: "Moon Knight (2022)",
    color: "#f8fafc",
    statusByPhase: {
      4: { status: "alive", note: "Trapped Arthur Harrow and Ammit; Jake Lockley secretly bound to Khonshu." },
      5: { status: "alive", note: "Active supernatural protector in London and Cairo." },
      6: { status: "alive", note: "Mystic defender against dark entities." }
    },
    eras: [
      {
        eraId: "moon-knight-ammit",
        phase: 4,
        title: "The Battle of the Gods at the Great Pyramids (2024)",
        year: "2024",
        universe: "Earth-616 / Cairo",
        description: "United Steven Grant's Mr. Knight and Marc's Moon Knight to defeat Arthur Harrow and seal Ammit.",
        keyMoments: ["Summoned the ceremonial mummy armor", "Turned back the night sky 2,000 years with Khonshu", "Jake Lockley assassinated Arthur Harrow in the limo"]
      }
    ],
    artifactsPossessed: ["scarab-of-ammit"],
    linkedNexusEvents: [],
    entries: ["moon-knight"]
  },
  {
    id: "ms-marvel",
    name: "Kamala Khan",
    aliases: ["Ms. Marvel", "Night Light", "Mutant Hero of Jersey City"],
    universe: "Earth-616",
    faction: "Young Avengers / The Marvels",
    role: "Mutant teenager wielding ancient hard-light Noor energy from a cosmic bangle.",
    overview: "An Avengers megafan from Jersey City, Kamala unlocked dormant mutant hard-light powers through her great-grandmother's cosmic bangle, teamed up with Captain Marvel, and started recruiting the Young Avengers.",
    firstAppearance: "Ms. Marvel (2022)",
    color: "#ec4899",
    statusByPhase: {
      4: { status: "alive", note: "Discovered her mutant genetics with Bruno; fought the Clandestines." },
      5: { status: "alive", note: "Repaired the space-time rift in The Marvels; recruited Kate Bishop to Young Avengers." },
      6: { status: "alive", note: "Leading the new generation of heroes." }
    },
    eras: [
      {
        eraId: "kamala-young-avengers",
        phase: 5,
        title: "Kamala Khan: Assembling the Young Avengers (2026)",
        year: "2026",
        universe: "Earth-616",
        description: "Re-enacted Nick Fury's recruitment scene in Kate Bishop's apartment with Pizza Dog.",
        keyMoments: ["'Did you think you're the only kid superhero in the world?'", "Wielded both Quantum Bangles to reignite Hala's sun"]
      }
    ],
    artifactsPossessed: ["quantum-bands"],
    linkedNexusEvents: [],
    entries: ["ms-marvel", "the-marvels"]
  },
  {
    id: "the-watcher",
    name: "Uatu the Watcher",
    aliases: ["The Watcher", "Uatu", "The Cosmic Observer"],
    universe: "Multiverse Nexus",
    faction: "Watchers of the Cosmos / Guardians of the Multiverse",
    role: "Fifth-dimensional cosmic entity observing all realities without interference.",
    overview: "Sworn to never interfere in the affairs of the Multiverse, Uatu broke his cosmic oath to assemble the Guardians of the Multiverse and stop Infinity Ultron from devouring all dimensions.",
    firstAppearance: "What If...? Season 1 (2021)",
    color: "#6366f1",
    statusByPhase: {
      4: { status: "ascended", note: "Assembled the Guardians of the Multiverse to defeat Infinity Ultron." },
      5: { status: "ascended", note: "Monitoring the decay of the Multiverse Tree and Incursion events." },
      6: { status: "ascended", note: "Omniscient witness to Secret Wars." }
    },
    eras: [
      {
        eraId: "watcher-oath-broken",
        phase: 4,
        title: "The Watcher: Breaking the Sacred Oath",
        year: "Timeless",
        universe: "Multiverse",
        description: "Recruited Supreme Strange, Captain Carter, Party Thor, and Killmonger to defeat Infinity Ultron.",
        keyMoments: ["Fought Infinity Ultron across galaxies and comic book panels", "'I observe all that transpires here, but I do not, cannot, will not interfere... except today'"]
      }
    ],
    artifactsPossessed: ["infinity-stones-multiverse"],
    linkedNexusEvents: ["nexus-guardians-of-multiverse"],
    entries: ["what-if-s1", "what-if-s2"]
  },

  // --- EXPANDED ICONIC VILLAINS ROSTER ---
  {
    id: "red-skull",
    name: "Johann Schmidt",
    aliases: ["Red Skull", "Head of Hydra", "Keeper of the Soul Stone", "Stonekeeper"],
    universe: "Earth-616",
    faction: "Hydra / Vormir Soul Stone Watchers",
    role: "Hydra founder who was cursed to guard the Soul Stone on Vormir for eternity.",
    overview: "Obsessed with Norse mythology and occult superweapons, Schmidt weaponized the Tesseract during World War II before being banished by the Space Stone to the desolate planet Vormir.",
    firstAppearance: "Captain America: The First Avenger (2011)",
    color: "#dc2626",
    statusByPhase: {
      1: { status: "alive", note: "Banished across the cosmos by the unstable Tesseract portal in 1945." },
      2: { status: "unknown", note: "Guiding souls on Vormir in total isolation." },
      3: { status: "ascended", note: "Guided Thanos and Hawkeye/Black Widow through the tragic Soul Stone sacrifice ritual." },
      4: { status: "unknown", note: "Freed from his curse after the stones were returned to the timeline." },
      5: { status: "unknown", note: "Cosmic wraith wandering the stars." },
      6: { status: "unknown", note: "Echoes in the history of Hydra." }
    },
    eras: [
      {
        eraId: "red-skull-ww2",
        phase: 1,
        title: "Red Skull: The Hydra War Machine (1942–1945)",
        year: "1942–1945",
        universe: "Earth-616",
        description: "Built Hydra's advanced fortress in the Alps and launched the Valkyrie super-bomber toward America.",
        keyMoments: ["Extracted the Tesseract from Tønsberg church", "Tore off human mask to reveal the crimson skull", "Banished into space by the Tesseract"]
      },
      {
        eraId: "red-skull-vormir",
        phase: 3,
        title: "The Stonekeeper on Vormir (2018–2023)",
        year: "2018–2023",
        universe: "Earth-616 / Vormir",
        description: "Enthroned as the spectral Stonekeeper, guiding seekers to the edge of the sacrificial cliff.",
        keyMoments: ["'A soul for a soul'", "Named Thanos 'Son of Alars'", "Witnessed Natasha Romanoff's sacrifice"]
      }
    ],
    artifactsPossessed: ["space-stone", "soul-stone"],
    linkedNexusEvents: [],
    entries: ["captain-america-first-avenger", "avengers-infinity-war", "avengers-endgame"]
  },
  {
    id: "gorr",
    name: "Gorr the God Butcher",
    aliases: ["Gorr", "The God Butcher", "Wielder of the Necrosword"],
    universe: "Earth-616 / Shadow Realm",
    faction: "Shadow Realm / God Killers",
    role: "Grief-stricken father on a cosmic crusade to exterminate all gods in existence.",
    overview: "After his dying prayers went mocked by his careless deity Rapu, Gorr bonded with the dark All-Black Necrosword, vowing to slaughter every god in the universe and reach Eternity to wish for their total extinction.",
    firstAppearance: "Thor: Love and Thunder (2022)",
    color: "#e2e8f0",
    statusByPhase: {
      4: { status: "deceased", note: "Surrendered his hatred at the altar of Eternity; resurrected his daughter Love before dying in peace." }
    },
    eras: [
      {
        eraId: "gorr-necrosword",
        phase: 4,
        title: "Gorr: The Cosmic Crusade Against the Gods (2025)",
        year: "2025",
        universe: "Earth-616 / Shadow Realm / Eternity",
        description: "Decapitated celestial deities across the cosmos, dragged Asgardian children into the Shadow Realm, and unlocked the gates of Eternity.",
        keyMoments: ["Decapitated Rapu with the All-Black Necrosword", "Drained the color from the Shadow Realm", "Chose Love over the extinction of all gods"]
      }
    ],
    artifactsPossessed: ["necrosword", "stormbreaker"],
    linkedNexusEvents: [],
    entries: ["thor-love-and-thunder"]
  },
  {
    id: "mysterio",
    name: "Quentin Beck",
    aliases: ["Mysterio", "Master of Illusion", "Hero from Earth-833 (Fraud)"],
    universe: "Earth-616",
    faction: "Ex-Stark Industries Employees",
    role: "Disgruntled holographic genius who framed Spider-Man and shattered his identity.",
    overview: "A fired Stark Industries scientist who invented B.A.R.F. holographics, Beck fabricated a fake multiverse story and artificial elemental monster attacks to steal Tony Stark's orbital EDITH drone defense system.",
    firstAppearance: "Spider-Man: Far From Home (2019)",
    color: "#10b981",
    statusByPhase: {
      3: { status: "deceased", note: "Shot by his own misdirected combat drone in London; released Peter Parker's identity video in death." }
    },
    eras: [
      {
        eraId: "mysterio-london",
        phase: 3,
        title: "Mysterio: The Illusion Matrix & EDITH Heist (2024)",
        year: "2024",
        universe: "Earth-616",
        description: "Manipulated Nick Fury and Peter Parker with hyper-realistic combat drones across Europe before executing the London Tower Bridge attack.",
        keyMoments: ["Trapped Spider-Man inside a nightmarish holographic graveyard", "Tricked Peter into giving up EDITH glasses in Prague", "'Spider-Man's real name is Peter Parker!'"]
      }
    ],
    artifactsPossessed: ["edith-glasses"],
    linkedNexusEvents: [],
    entries: ["spider-man-far-from-home"]
  },
  {
    id: "vulture",
    name: "Adrian Toomes",
    aliases: ["The Vulture", "Toomes", "Scavenger of New York"],
    universe: "Earth-616 (Displaced to Earth-688)",
    faction: "Bestman Salvage / Underground Arms Syndicate",
    role: "Blue-collar salvage contractor who turned alien Chitauri scrap into lethal black-market flight suits.",
    overview: "After Damage Control and Stark Industries drove his salvage company out of business following the Battle of New York, Toomes built high-tech flight harnesses and energy weapons to provide for his family.",
    firstAppearance: "Spider-Man: Homecoming (2017)",
    color: "#84cc16",
    statusByPhase: {
      3: { status: "alive", note: "Imprisoned in federal penitentiary; refused to reveal Spider-Man's identity to Mac Gargan." },
      4: { status: "variant", note: "Displaced into the Sony universe by Doctor Strange's multiverse containment spell." }
    },
    eras: [
      {
        eraId: "vulture-plane-heist",
        phase: 3,
        title: "The Vulture: Stark Cargo Plane Heist (2016)",
        year: "2016",
        universe: "Earth-616",
        description: "Hijacked the invisible Stark cargo plane carrying Avengers Tower equipment before crashing onto Coney Island beach.",
        keyMoments: ["Drove Peter Parker to the Homecoming dance in tense car confrontation", "Crushed Spider-Man beneath a warehouse ceiling", "Saved by Spider-Man from exploding turbine wings"]
      }
    ],
    artifactsPossessed: [],
    linkedNexusEvents: [],
    entries: ["spider-man-homecoming"]
  },
  {
    id: "wenwu",
    name: "Xu Wenwu",
    aliases: ["The Mandarin", "Leader of the Ten Rings", "The Immortal Warlord"],
    universe: "Earth-616",
    faction: "The Ten Rings Syndicate",
    role: "Thousand-year-old warrior conqueror wielding the mystical Ten Rings.",
    overview: "For over a millennium, Wenwu shaped world history from the shadows with the mystical Ten Rings. Grieving the murder of his wife Jiang Li, he was deceived by the Dweller-in-Darkness into attacking the mythical realm of Ta Lo.",
    firstAppearance: "Shang-Chi and the Legend of the Ten Rings (2021)",
    color: "#3b82f6",
    statusByPhase: {
      4: { status: "deceased", note: "Soul consumed by the Dweller-in-Darkness after bequeathing the Ten Rings to his son Shang-Chi." }
    },
    eras: [
      {
        eraId: "wenwu-ten-rings",
        phase: 4,
        title: "Wenwu: The Millennium of the Ten Rings",
        year: "1000–2024",
        universe: "Earth-616 / Ta Lo",
        description: "Conquered empires for 1,000 years, raised Shang-Chi into an elite assassin, and breached the Dark Gate of Ta Lo.",
        keyMoments: ["Conquered ancient dynasties with golden projectile energy rings", "Met Jiang Li in the enchanted bamboo forest", "Passed the Ten Rings to Shang-Chi in his final moments"]
      }
    ],
    artifactsPossessed: ["ten-rings"],
    linkedNexusEvents: [],
    entries: ["shang-chi-and-the-legend-of-the-ten-rings"]
  },
  {
    id: "agatha-harkness",
    name: "Agatha Harkness",
    aliases: ["Agnes", "The Salem Witch", "Wielder of the Darkhold", "Ghost of the Witches' Road"],
    universe: "Earth-616",
    faction: "Salem Coven (Ancient) / Westview Hex Infiltrators",
    role: "Centuries-old sorceress and master of soul-draining dark magic.",
    overview: "Having drained her own mother and Salem coven of their magic in 1693, Agatha infiltrated Wanda Maximoff's Westview Hex under the guise of nosy neighbor Agnes to steal the Scarlet Witch's Chaos Magic.",
    firstAppearance: "WandaVision (2021) / Agatha All Along (2024)",
    color: "#a855f7",
    statusByPhase: {
      4: { status: "alive", note: "Trapped in the persona of 'Agnes' by Wanda's memory spell in Westview." },
      5: { status: "ascended", note: "Walked the Witches' Road, broke free from the spell, and ascended as a spectral guide for Billy Maximoff." }
    },
    eras: [
      {
        eraId: "agatha-all-along",
        phase: 4,
        title: "Agatha: The Westview Hex Infiltration (2023)",
        year: "2023",
        universe: "Earth-616 / Westview",
        description: "Killed Sparky the dog, puppeteered fake Pietro, and revealed her true nature in the basement of Westview.",
        keyMoments: ["'It was Agatha All Along!'", "Revealed the prophecy of the Scarlet Witch from the Darkhold", "Defeated by Wanda's protective runes in the sky"]
      }
    ],
    artifactsPossessed: ["darkhold"],
    linkedNexusEvents: [],
    entries: ["wandavision", "agatha-all-along"]
  },
  {
    id: "high-evolutionary",
    name: "The High Evolutionary",
    aliases: ["Herbert Wyndham", "Creator of Counter-Earth", "Lord of the Orgocorp"],
    universe: "Earth-616",
    faction: "Orgocorp / Counter-Earth Architects",
    role: "Sociopathic cybernetic geneticist obsessed with engineering a flawless species.",
    overview: "Disgusted by nature's imperfections, the High Evolutionary subjected countless sentient creatures to agonizing genetic experiments, creating Rocket Raccoon, the Sovereign, and an entire Counter-Earth civilization.",
    firstAppearance: "Guardians of the Galaxy Vol. 3 (2023)",
    color: "#8b5cf6",
    statusByPhase: {
      5: { status: "alive", note: "Defeated and face-plate ripped off by Rocket; imprisoned on Knowhere by the Guardians." }
    },
    eras: [
      {
        eraId: "high-evo-counter-earth",
        phase: 5,
        title: "The High Evolutionary: Destruction of Counter-Earth (2026)",
        year: "2026",
        universe: "Earth-616 / Counter-Earth",
        description: "Detonated his own artificial planet Counter-Earth and attacked the Bowie ship to extract Rocket's brain.",
        keyMoments: ["Created Batch 89 with Rocket, Lylla, Teefs, and Floor", "Detonated Counter-Earth when it failed his perfection standard", "'There is no God! That's why I stepped in!'"]
      }
    ],
    artifactsPossessed: [],
    linkedNexusEvents: [],
    entries: ["guardians-of-the-galaxy-vol-3"]
  },
  {
    id: "red-hulk",
    name: "Thaddeus 'Thunderbolt' Ross",
    aliases: ["Red Hulk", "President Ross", "General Ross", "Secretary of State"],
    universe: "Earth-616",
    faction: "US Government / White House / Department of State",
    role: "US President transformed into the rampaging, superheated Red Hulk.",
    overview: "The architect of the Sokovia Accords and lifelong pursuer of gamma mutants, President Thaddeus Ross attempts to weaponize Adamantium before mutating into the fiery, unstoppable Red Hulk.",
    firstAppearance: "The Incredible Hulk (2008) / Captain America: Brave New World (2025)",
    color: "#ef4444",
    statusByPhase: {
      1: { status: "alive", note: "General leading military operations against Bruce Banner in Harlem." },
      3: { status: "alive", note: "Secretary of State who enforced the Sokovia Accords and fractured the Avengers." },
      5: { status: "alive", note: "Elected President of the United States; mutates into the Red Hulk during global summit." }
    },
    eras: [
      {
        eraId: "red-hulk-white-house",
        phase: 5,
        title: "President Ross: Transformation into Red Hulk (2026)",
        year: "2026",
        universe: "Earth-616",
        description: "Engages Sam Wilson's Captain America in a catastrophic clash outside the White House.",
        keyMoments: ["Signed the Sokovia Accords in 2016", "Elected 47th President of the United States", "Transformed into Red Hulk on the White House South Lawn"]
      }
    ],
    artifactsPossessed: [],
    linkedNexusEvents: [],
    entries: ["the-incredible-hulk", "captain-america-civil-war", "avengers-infinity-war", "avengers-endgame", "captain-america-brave-new-world"]
  },
  {
    id: "zemo",
    name: "Helmut Zemo",
    aliases: ["Baron Zemo", "Baron of Sokovia"],
    universe: "Earth-616",
    faction: "Sokovian EKO Scorpion / Anti-Super Soldier Crusade",
    role: "Sokovian intelligence mastermind who successfully broke the Avengers from within.",
    overview: "Grieving his family killed during the Battle of Sokovia, Zemo framed the Winter Soldier, bombed the UN summit, and showed Tony Stark the video of his parents' murder, permanently fracturing the Avengers without superpowers.",
    firstAppearance: "Captain America: Civil War (2016)",
    color: "#7c3aed",
    statusByPhase: {
      3: { status: "alive", note: "Imprisoned at the Joint Counter Terrorist Centre after breaking the Avengers." },
      4: { status: "alive", note: "Escaped prison with Bucky and Sam; executed the Flag Smasher super soldiers from The Raft." }
    },
    eras: [
      {
        eraId: "zemo-siberia",
        phase: 3,
        title: "Baron Zemo: The Siberia Decapitation (2016)",
        year: "2016",
        universe: "Earth-616",
        description: "Triggered the Winter Soldier with the Russian trigger words and lured Iron Man and Captain America into the Siberian bunker.",
        keyMoments: ["'Longing. Rusted. Seventeen. Daybreak...'", "Screened December 16, 1991 assassination tape", "'An empire toppled by its enemies can rise again. But one that crumbles from within? That's dead. Forever.'"]
      }
    ],
    artifactsPossessed: [],
    linkedNexusEvents: [],
    entries: ["captain-america-civil-war", "the-falcon-and-the-winter-soldier"]
  },
  {
    id: "ronan",
    name: "Ronan the Accuser",
    aliases: ["The Accuser", "Kree Fanatic", "Wielder of the Cosmi-Rod"],
    universe: "Earth-616",
    faction: "Kree Empire Zealots",
    role: "Kree radical zealot who betrayed Thanos to destroy Xandar with the Power Stone.",
    overview: "A genocidal Kree commander who refused the peace treaty with Xandar, Ronan made a deal with Thanos to wipe out the Nova Corps before embedding the purple Power Stone directly into his warhammer.",
    firstAppearance: "Guardians of the Galaxy (2014)",
    color: "#6b7280",
    statusByPhase: {
      1: { status: "alive", note: "Leading Kree Starforce operations in 1995 against Captain Marvel." },
      2: { status: "deceased", note: "Disintegrated on Xandar when the Guardians of the Galaxy united to channel the Power Stone." }
    },
    eras: [
      {
        eraId: "ronan-xandar",
        phase: 2,
        title: "Ronan: The Siege of Xandar (2014)",
        year: "2014",
        universe: "Earth-616",
        description: "Embedded the Power Stone into his Cosmi-Rod and crashed the Dark Aster onto Xandar.",
        keyMoments: ["Betrayed Thanos: 'I will bathe the starways in your blood!'", "Distracted by Star-Lord's dance-off on Xandar beach", "Obliterated by the united Guardians of the Galaxy"]
      }
    ],
    artifactsPossessed: ["power-stone"],
    linkedNexusEvents: [],
    entries: ["guardians-of-the-galaxy", "captain-marvel"]
  },
  {
    id: "cassandra-nova",
    name: "Cassandra Nova",
    aliases: ["The Void Queen", "Twin Sister of Charles Xavier", "Mummudrai"],
    universe: "The Void (End of Time)",
    faction: "Void Outcasts / Xavier Bloodline",
    role: "Telepathic reality-manipulating mutant ruler of the Void.",
    overview: "The parasitic twin sister of Charles Xavier, Cassandra was pruned by the TVA to The Void, where she used her terrifying telepathic ability to enter minds physically and feed mutants to Alioth.",
    firstAppearance: "Deadpool & Wolverine (2024)",
    color: "#fbbf24",
    statusByPhase: {
      5: { status: "deceased", note: "Disintegrated by the overloaded Time Ripper reactor when Deadpool and Wolverine joined hands." }
    },
    eras: [
      {
        eraId: "cassandra-void",
        phase: 5,
        title: "Cassandra Nova: Queen of the Void (2024)",
        year: "2024",
        universe: "The Void",
        description: "Ruled over the severed corpse of giant Ant-Man and attempted to destroy all timelines with the Time Ripper.",
        keyMoments: ["Physically inserted hands through human skulls to read thoughts", "Stripped Johnny Storm of his skin in seconds", "Disintegrated by the overloaded Time Ripper"]
      }
    ],
    artifactsPossessed: ["time-ripper", "sling-ring"],
    linkedNexusEvents: [],
    entries: ["deadpool-and-wolverine"]
  }
];

export function getCharacter(id: string): Character | undefined {
  return CHARACTERS.find((c) => c.id === id);
}

