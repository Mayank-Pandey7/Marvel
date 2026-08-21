const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'characters');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 25 Iconic Marvel Cinematic Universe Heroes, Supervillains & Cosmic Entities
const EXPANDED_CHARACTERS = [
  {
    id: "dormammu",
    name: "Dormammu",
    aliases: ["Lord of the Dark Dimension", "The Destroyer of Worlds", "The Cosmic Entity"],
    universe: "Dark Dimension",
    faction: "Dark Dimension",
    role: "Primordial cosmic entity of absolute hunger and entropy.",
    overview: "A gargantuan primordial entity ruling the timeless Dark Dimension, seeking to devour all realities across the multiverse until outwitted by Doctor Strange.",
    firstAppearance: "Doctor Strange (2016)",
    color: "#9333ea",
    imageSearch: "Dormammu",
    statusByPhase: {
      3: { status: "ascended", note: "Ensnared in Doctor Strange's infinite Time Stone loop until conceding to withdraw." },
      4: { status: "unknown", note: "Bound within the boundless Dark Dimension." },
      5: { status: "unknown", note: "Clea and Doctor Strange travel to his realm to prevent an incursion." },
      6: { status: "unknown", note: "Threat of the Dark Dimension looms over the multiverse." }
    },
    eras: [
      {
        eraId: "dormammu-bargain",
        phase: 3,
        title: "The Infinite Bargain (2016)",
        year: "2016",
        universe: "Dark Dimension",
        description: "Ensnared in Doctor Strange's endless Time Stone loop until agreeing to spare Earth.",
        keyMoments: ["Killed Strange in thousands of loops", "'Dormammu, I've come to bargain'", "Banished back to Dark Dimension"]
      }
    ],
    artifactsPossessed: ["dark-dimension-energy"],
    linkedNexusEvents: ["nexus-dark-dimension-bargain"],
    entries: ["doctor-strange"]
  },
  {
    id: "abomination",
    name: "Emil Blonsky",
    aliases: ["The Abomination"],
    universe: "Earth-616",
    faction: "US Special Forces / Damage Control / Kamar-Taj",
    role: "Super Soldier mutated into an unstoppable gamma juggernaut.",
    overview: "A British Royal Marine infused with Super Soldier Serum and Bruce Banner's gamma blood, transforming into the monstrous Abomination before finding enlightenment at Kamar-Taj.",
    firstAppearance: "The Incredible Hulk (2008)",
    color: "#15803d",
    imageSearch: "Emil Blonsky (Marvel Cinematic Universe)",
    statusByPhase: {
      1: { status: "alive", note: "Defeated by the Hulk in Harlem and imprisoned in Cryo-Stasis." },
      4: { status: "alive", note: "Sparred with Wong in Macau; paroled and relocated to Kamar-Taj." },
      5: { status: "alive", note: "Living in peaceful spiritual retreat in Kamar-Taj." },
      6: { status: "alive", note: "Potential asset in global superhuman conflicts." }
    },
    eras: [
      {
        eraId: "abomination-harlem",
        phase: 1,
        title: "The Battle of Harlem (2008)",
        year: "2008",
        universe: "Earth-616",
        description: "Rampaged through New York City before being subdued by the Hulk.",
        keyMoments: ["Injected with Bruce Banner's gamma blood", "Demolished Harlem in brutal clash with Hulk"]
      }
    ],
    artifactsPossessed: [],
    linkedNexusEvents: [],
    entries: ["the-incredible-hulk", "she-hulk-attorney-at-law", "shang-chi"]
  },
  {
    id: "ego",
    name: "Ego",
    aliases: ["Ego the Living Planet", "The Celestial Father"],
    universe: "Earth-616",
    faction: "Celestials",
    role: "Cosmic Celestial entity and biological father of Peter Quill.",
    overview: "An ancient Celestial who manifested as a living planet, planting seedlings across thousands of worlds to assimilate the cosmos into his single consciousness.",
    firstAppearance: "Guardians of the Galaxy Vol. 2 (2017)",
    color: "#3b82f6",
    imageSearch: "Ego (Marvel Cinematic Universe)",
    statusByPhase: {
      3: { status: "deceased", note: "Destroyed when Baby Groot detonated a thermal bomb in his brain core." },
      4: { status: "deceased", note: "Defunct cosmic core drifting in deep cosmos." },
      5: { status: "deceased", note: "His cosmic legacy shaped Star-Lord's destiny." },
      6: { status: "deceased", note: "Extinct Celestial entity." }
    },
    eras: [
      {
        eraId: "ego-expansion",
        phase: 3,
        title: "The Expansion (2014)",
        year: "2014",
        universe: "Earth-616",
        description: "Attempted to use Peter Quill's Celestial DNA to assimilate the universe.",
        keyMoments: ["Revealed he placed the tumor in Meredith Quill", "Core annihilated by Guardians' thermal detonator"]
      }
    ],
    artifactsPossessed: ["celestial-light"],
    linkedNexusEvents: [],
    entries: ["guardians-of-the-galaxy-vol-2"]
  },
  {
    id: "adam-warlock",
    name: "Adam Warlock",
    aliases: ["Adam", "Him", "Golden Sovereign"],
    universe: "Earth-616",
    faction: "Sovereign / Guardians of the Galaxy",
    role: "Genetically engineered cosmic powerhouse.",
    overview: "Created by High Priestess Ayesha of the Sovereign to destroy the Guardians, Adam developed an independent moral compass and joined Rocket Raccoon's new Guardians of the Galaxy.",
    firstAppearance: "Guardians of the Galaxy Vol. 3 (2023)",
    color: "#eab308",
    imageSearch: "Adam Warlock (Marvel Cinematic Universe)",
    statusByPhase: {
      5: { status: "alive", note: "Rescued Star-Lord and joined Rocket Raccoon's new Guardians roster." },
      6: { status: "alive", note: "Active cosmic protector of the galaxy." }
    },
    eras: [
      {
        eraId: "warlock-awakening",
        phase: 5,
        title: "Awakening of the Sovereign (2026)",
        year: "2026",
        universe: "Earth-616",
        description: "Emerged from his cocoon; saved Star-Lord from freezing in deep vacuum of space.",
        keyMoments: ["Assaulted Knowhere to capture Rocket", "Rescued Peter Quill in deep space", "Joined the new Guardians lineup"]
      }
    ],
    artifactsPossessed: ["quantum-cosmic-energy"],
    linkedNexusEvents: [],
    entries: ["guardians-of-the-galaxy-vol-3"]
  },
  {
    id: "us-agent",
    name: "John Walker",
    aliases: ["U.S. Agent", "Captain America (Former)"],
    universe: "Earth-616",
    faction: "US Army / Thunderbolts / Valentina Allegra de Fontaine",
    role: "Decorated Super Soldier with extreme combat methods.",
    overview: "A highly decorated US Army Ranger chosen to succeed Steve Rogers as Captain America. After taking the Super Soldier Serum and executing a Flag Smasher publicly, he was stripped of his title and recruited as U.S. Agent.",
    firstAppearance: "The Falcon and the Winter Soldier (2021)",
    color: "#dc2626",
    imageSearch: "John Walker (Marvel Cinematic Universe)",
    statusByPhase: {
      4: { status: "alive", note: "Stripped of Captain America mantle; rebranded as U.S. Agent by Val." },
      5: { status: "alive", note: "Key operative on the Thunderbolts* black-ops roster." },
      6: { status: "alive", note: "Frontline soldier in multiversal conflicts." }
    },
    eras: [
      {
        eraId: "walker-fall",
        phase: 4,
        title: "Fall of the New Cap (2024)",
        year: "2024",
        universe: "Earth-616",
        description: "Consumed Erskine serum and executed Nico in front of global cameras in Riga.",
        keyMoments: ["Took Super Soldier Serum", "Killed Flag Smasher in public with shield", "Enlisted by Contessa Valentina"]
      }
    ],
    artifactsPossessed: ["custom-vibranium-shield"],
    linkedNexusEvents: [],
    entries: ["the-falcon-and-the-winter-soldier", "thunderbolts"]
  },
  {
    id: "ghost",
    name: "Ava Starr",
    aliases: ["Ghost"],
    universe: "Earth-616",
    faction: "SHIELD Stealth Ops / Thunderbolts",
    role: "Quantum-phasing stealth assassin.",
    overview: "Afflicted with molecular instability after a quantum accident, Ava can phase through solid matter and delivers devastating kinetic strikes as a lethal black-ops operative.",
    firstAppearance: "Ant-Man and the Wasp (2018)",
    color: "#94a3b8",
    imageSearch: "Ava Starr (Marvel Cinematic Universe)",
    statusByPhase: {
      3: { status: "alive", note: "Stabilized by Janet van Dyne's quantum healing energy." },
      4: { status: "alive", note: "Living in hiding while monitoring quantum realm fluctuations." },
      5: { status: "alive", note: "Recruited onto the Thunderbolts* team." },
      6: { status: "alive", note: "Active operative." }
    },
    eras: [
      {
        eraId: "ghost-hunt",
        phase: 3,
        title: "Quantum Survival (2018)",
        year: "2018",
        universe: "Earth-616",
        description: "Pursued Hank Pym's quantum tunnel to cure her agonizing cellular decay.",
        keyMoments: ["Infiltrated Pym's mobile lab", "Healed temporarily by Janet van Dyne"]
      }
    ],
    artifactsPossessed: ["quantum-containment-suit"],
    linkedNexusEvents: [],
    entries: ["ant-man-and-the-wasp", "thunderbolts"]
  },
  {
    id: "taskmaster",
    name: "Antonia Dreykov",
    aliases: ["Taskmaster"],
    universe: "Earth-616",
    faction: "Red Room / Thunderbolts",
    role: "Photographic reflexes combat mimic.",
    overview: "Daughter of General Dreykov, augmented with photographic reflexes neural technology allowing her to instantly replicate any opponent's fighting style, including Cap, Hawkeye, Black Panther, and Bucky.",
    firstAppearance: "Black Widow (2021)",
    color: "#f97316",
    imageSearch: "Taskmaster (Marvel Cinematic Universe)",
    statusByPhase: {
      4: { status: "alive", note: "Freed from chemical mind control by Natasha Romanoff." },
      5: { status: "alive", note: "Armed and deployed with the Thunderbolts* roster." },
      6: { status: "alive", note: "Active black-ops operative." }
    },
    eras: [
      {
        eraId: "taskmaster-liberation",
        phase: 4,
        title: "Red Room Liberation (2016)",
        year: "2016",
        universe: "Earth-616",
        description: "Mimicked Avenger fighting styles across Europe before being cured with Red Dust.",
        keyMoments: ["Ambushed Natasha on Norwegian bridge", "Freed from mental control by Red Dust"]
      }
    ],
    artifactsPossessed: ["mimicry-hud-visor", "retractable-claws"],
    linkedNexusEvents: [],
    entries: ["black-widow", "thunderbolts"]
  },
  {
    id: "sentry",
    name: "Bob Reynolds",
    aliases: ["The Sentry", "The Void", "Golden Guardian of Good"],
    universe: "Earth-616",
    faction: "Thunderbolts / US Special Projects",
    role: "God-like superhuman with the power of one million exploding suns.",
    overview: "Robert Reynolds gained god-like solar energy manipulation through an experimental government serum, balancing cosmic benevolence with his terrifying psychological shadow entity, The Void.",
    firstAppearance: "Thunderbolts* (2025)",
    color: "#fbbf24",
    imageSearch: "Sentry (Marvel Cinematic Universe)",
    statusByPhase: {
      5: { status: "alive", note: "Awakened within the secret OXE facility during Thunderbolts* operations." },
      6: { status: "alive", note: "Cosmic powerhouse contending with the Void during multiversal incursions." }
    },
    eras: [
      {
        eraId: "sentry-awakening",
        phase: 5,
        title: "Awakening of the Golden Guardian (2025)",
        year: "2025",
        universe: "Earth-616",
        description: "Encountered by the Thunderbolts crew in an abandoned classified bunker.",
        keyMoments: ["Discovered in the subterranean lab", "Manifested molecular solar radiance"]
      }
    ],
    artifactsPossessed: ["solar-molecule-energy"],
    linkedNexusEvents: [],
    entries: ["thunderbolts"]
  },
  {
    id: "the-leader",
    name: "Samuel Sterns",
    aliases: ["The Leader", "Mr. Blue"],
    universe: "Earth-616",
    faction: "Intelligencia / Shadow Government",
    role: "Gamma-enhanced supreme intellectual mastermind.",
    overview: "A cellular biologist mutated by Bruce Banner's gamma blood, developing hyper-accelerated intellect, telepathic brainwave control, and pulling the strings behind global political conspiracies.",
    firstAppearance: "The Incredible Hulk (2008)",
    color: "#22c55e",
    imageSearch: "Samuel Sterns (Marvel Cinematic Universe)",
    statusByPhase: {
      1: { status: "alive", note: "Infected by Banner's blood; brain expanded after Harlem riot." },
      5: { status: "alive", note: "Manipulated President Ross and global geopolitics in Brave New World." },
      6: { status: "alive", note: "Orchestrating gamma and superhuman tech proliferation." }
    },
    eras: [
      {
        eraId: "leader-resurgence",
        phase: 5,
        title: "Brave New Order (2026)",
        year: "2026",
        universe: "Earth-616",
        description: "Engineered the assassination attempts and geopolitical fracturing of global powers.",
        keyMoments: ["Synthesized gamma-adrenal compounds", "Triggered President Ross's Red Hulk metamorphosis"]
      }
    ],
    artifactsPossessed: ["gamma-neural-helm"],
    linkedNexusEvents: [],
    entries: ["the-incredible-hulk", "captain-america-brave-new-world"]
  },
  {
    id: "baron-mordo",
    name: "Karl Mordo",
    aliases: ["Baron Mordo", "Master Mordo", "Sorcerer Supreme (Earth-838)"],
    universe: "Earth-616 / Earth-838",
    faction: "Masters of the Mystic Arts / Illuminati (838)",
    role: "Fanatical sorcerer dedicated to exterminating all magic users.",
    overview: "A former senior disciple of the Ancient One who became disillusioned by her use of Dark Dimension energy, dedicating his life to stealing the magic of unworthy sorcerers across realities.",
    firstAppearance: "Doctor Strange (2016)",
    color: "#059669",
    imageSearch: "Karl Mordo (Marvel Cinematic Universe)",
    statusByPhase: {
      3: { status: "alive", note: "Renounced Kamar-Taj and began stripping magic from rogue sorcerers." },
      4: { status: "variant", note: "Earth-838 variant ruled Illuminati; Earth-616 Mordo hunted Strange." },
      5: { status: "alive", note: "Lurking in the shadows of the mystic world." },
      6: { status: "alive", note: "Active mystic antagonist." }
    },
    eras: [
      {
        eraId: "mordo-crusade",
        phase: 3,
        title: "The Bill Comes Due (2016)",
        year: "2016",
        universe: "Earth-616",
        description: "Severed ties with Doctor Strange, proclaiming that the bill comes due for mystic hubris.",
        keyMoments: ["Stole magic from Jonathan Pangborn", "'Too many sorcerers'"]
      }
    ],
    artifactsPossessed: ["vaulting-boots-of-valtorr", "staff-of-the-living-tribunal"],
    linkedNexusEvents: [],
    entries: ["doctor-strange", "doctor-strange-in-the-multiverse-of-madness"]
  },
  {
    id: "electro",
    name: "Max Dillon",
    aliases: ["Electro"],
    universe: "Earth-120703",
    faction: "Sinister Foes",
    role: "Living electrical generator.",
    overview: "An electrical engineer transformed into a living conduit of pure high-voltage current, pulled across the multiverse into Earth-616 where he absorbed Arc Reactor technology.",
    firstAppearance: "Spider-Man: No Way Home (2021)",
    color: "#eab308",
    imageSearch: "Electro (The Amazing Spider-Man 2)",
    statusByPhase: {
      4: { status: "cured", note: "Cured by Peter Parker using an Arc Reactor drain unit and returned home." }
    },
    eras: [
      {
        eraId: "electro-nwh",
        phase: 4,
        title: "The New York Voltage (2024)",
        year: "2024",
        universe: "Earth-616",
        description: "Absorbed Stark Arc Reactor energy at the Statue of Liberty battle before being depowered.",
        keyMoments: ["Harnessed Arc Reactor power", "Bonded with Peter-Three before returning to his universe"]
      }
    ],
    artifactsPossessed: ["stark-arc-reactor"],
    linkedNexusEvents: ["nexus-multiverse-spell-rupture"],
    entries: ["spider-man-no-way-home"]
  },
  {
    id: "sandman",
    name: "Flint Marko",
    aliases: ["Sandman"],
    universe: "Earth-96283",
    faction: "Multiverse Incursion",
    role: "Granular sand-manipulating shape-shifter.",
    overview: "Accidentally exposed to a particle accelerator, Marko's cellular structure became malleable living sand, driven solely by the desire to reunite with his daughter Penny.",
    firstAppearance: "Spider-Man: No Way Home (2021)",
    color: "#d97706",
    imageSearch: "Flint Marko (Spider-Man 3)",
    statusByPhase: {
      4: { status: "cured", note: "Cured by Peter-One's DNA reversion formula at the Statue of Liberty." }
    },
    eras: [
      {
        eraId: "sandman-nwh",
        phase: 4,
        title: "The Sandstorm (2024)",
        year: "2024",
        universe: "Earth-616",
        description: "Assisted Spider-Man before battling at Liberty Island in desperation to return home.",
        keyMoments: ["Defended Spider-Man against Electro", "Reverted to human form by Peter Parker"]
      }
    ],
    artifactsPossessed: [],
    linkedNexusEvents: ["nexus-multiverse-spell-rupture"],
    entries: ["spider-man-no-way-home"]
  },
  {
    id: "lizard",
    name: "Dr. Curt Connors",
    aliases: ["The Lizard"],
    universe: "Earth-120703",
    faction: "Oscorp Biologists",
    role: "Reptilian geneticist mutant.",
    overview: "A brilliant Oscorp geneticist whose cross-species limb regeneration serum transformed him into a ferocious, super-strong reptilian predator seeking to mutate all humanity.",
    firstAppearance: "Spider-Man: No Way Home (2021)",
    color: "#16a34a",
    imageSearch: "The Lizard (The Amazing Spider-Man)",
    statusByPhase: {
      4: { status: "cured", note: "Injected with Peter-Three's chemical antidote and returned home cured." }
    },
    eras: [
      {
        eraId: "lizard-nwh",
        phase: 4,
        title: "Sanctum Cell (2024)",
        year: "2024",
        universe: "Earth-616",
        description: "Warned Peter of the inevitable fate of the villains before the Statue of Liberty clash.",
        keyMoments: ["Held captive in the Sanctum Sanctorum basement", "Cured by Peter Parker"]
      }
    ],
    artifactsPossessed: [],
    linkedNexusEvents: ["nexus-multiverse-spell-rupture"],
    entries: ["spider-man-no-way-home"]
  },
  {
    id: "captain-carter",
    name: "Peggy Carter",
    aliases: ["Captain Carter", "The First Avenger (Earth-838)"],
    universe: "Earth-838 / Multiverse",
    faction: "Illuminati (838) / Guardians of the Multiverse",
    role: "Super Soldier armed with a Vibranium Union Jack shield and jetpack.",
    overview: "In realities where Peggy Carter received the Super Soldier Serum instead of Steve Rogers, she became Captain Carter, leading the Illuminati and wielding her Vibranium shield across the cosmos.",
    firstAppearance: "Doctor Strange in the Multiverse of Madness (2022)",
    color: "#2563eb",
    imageSearch: "Captain Carter (Marvel Cinematic Universe)",
    statusByPhase: {
      4: { status: "variant", note: "Earth-838 variant slain by the Scarlet Witch; Multiverse variants active." },
      5: { status: "alive", note: "Guarding timelines alongside Uatu the Watcher." },
      6: { status: "alive", note: "Legendary multiversal champion." }
    },
    eras: [
      {
        eraId: "carter-illuminati",
        phase: 4,
        title: "The Illuminati Stand (2024)",
        year: "2024",
        universe: "Earth-838",
        description: "Engaged Wanda Maximoff in brutal combat inside the Illuminati headquarters.",
        keyMoments: ["'I could do this all day'", "Fought Wanda with jetpack and Vibranium shield"]
      }
    ],
    artifactsPossessed: ["vibranium-union-jack-shield", "quantum-jetpack"],
    linkedNexusEvents: ["nexus-captain-carter-injection"],
    entries: ["doctor-strange-in-the-multiverse-of-madness", "what-if"]
  },
  {
    id: "blade",
    name: "Eric Brooks",
    aliases: ["Blade", "The Daywalker"],
    universe: "Earth-616 / Multiverse",
    faction: "Midnight Sons / Resistance (The Void)",
    role: "Half-vampire hunter wielding adamantium-edged silver blades.",
    overview: "Possessing all of a vampire's supernatural strength, speed, and senses with none of their weaknesses to sunlight, Blade hunts the supernatural horrors of the dark world.",
    firstAppearance: "Deadpool & Wolverine (2024)",
    color: "#dc2626",
    imageSearch: "Blade (Marvel Cinematic Universe)",
    statusByPhase: {
      3: { status: "alive", note: "Legendary hunter operating across forgotten timeline branches." },
      4: { status: "alive", note: "Spoke to Dane Whitman regarding the Ebony Blade." },
      5: { status: "alive", note: "Fought Cassandra Nova's army in The Void alongside Deadpool and Wolverine." },
      6: { status: "alive", note: "Hunting dark forces in the MCU prime timeline." }
    },
    eras: [
      {
        eraId: "blade-void",
        phase: 5,
        title: "Resistance in The Void (2024)",
        year: "2024",
        universe: "The Void",
        description: "United with Elektra, Gambit, and Laura to dismantle Cassandra Nova's fortress.",
        keyMoments: ["'There's only ever been one Blade. Only ever gonna be one Blade'", "Slaughtered Marauders with titanium blades"]
      }
    ],
    artifactsPossessed: ["titanium-silver-sword", "ebony-blade"],
    linkedNexusEvents: [],
    entries: ["deadpool-and-wolverine", "blade", "eternals"]
  },
  {
    id: "elektra",
    name: "Elektra Natchios",
    aliases: ["Elektra", "The Black Sky"],
    universe: "Earth-701306 / Earth-616",
    faction: "The Hand / The Chaste / Void Resistance",
    role: "Master assassin wielding twin deadly Sai.",
    overview: "A master martial artist and lethal assassin trained by Stick and resurrected as the Black Sky, whose combat mastery makes her one of the most lethal duelists in the multiverse.",
    firstAppearance: "Daredevil (2016) / Deadpool & Wolverine (2024)",
    color: "#b91c1c",
    imageSearch: "Elektra (Marvel Cinematic Universe)",
    statusByPhase: {
      4: { status: "alive", note: "Operating across dark sectors of the multiverse." },
      5: { status: "alive", note: "Joined the Resistance in The Void to defeat Cassandra Nova." },
      6: { status: "alive", note: "Deadly freelance combatant." }
    },
    eras: [
      {
        eraId: "elektra-void",
        phase: 5,
        title: "The Battle for The Void (2024)",
        year: "2024",
        universe: "The Void",
        description: "Fought alongside Logan and Wade against Cassandra Nova's wasteland forces.",
        keyMoments: ["Defeated dozens of wasteland marauders with twin Sai"]
      }
    ],
    artifactsPossessed: ["twin-sai"],
    linkedNexusEvents: [],
    entries: ["deadpool-and-wolverine", "daredevil-born-again"]
  },
  {
    id: "silver-surfer",
    name: "Shalla-Bal",
    aliases: ["Silver Surfer", "Herald of Galactus"],
    universe: "Earth-199999 / Retro-Futuristic Earth",
    faction: "Heralds of Galactus",
    role: "Cosmic herald wielding the Power Cosmic.",
    overview: "Endowed with the infinite Power Cosmic by Galactus, the Silver Surfer travels across the stars on a silvery board to prepare worlds for the World-Eater's consumption.",
    firstAppearance: "The Fantastic Four: First Steps (2025)",
    color: "#94a3b8",
    imageSearch: "Silver Surfer (Marvel Cinematic Universe)",
    statusByPhase: {
      6: { status: "alive", note: "Herald of Galactus in the retro-futuristic 1960s universe." }
    },
    eras: [
      {
        eraId: "surfer-herald",
        phase: 6,
        title: "Coming of Galactus (1960s)",
        year: "1960s",
        universe: "Earth-Fantastic",
        description: "Descended upon Earth to herald the hunger of Galactus.",
        keyMoments: ["Channelled Power Cosmic across atmospheric skies"]
      }
    ],
    artifactsPossessed: ["cosmic-surfboard", "power-cosmic"],
    linkedNexusEvents: [],
    entries: ["the-fantastic-four-first-steps"]
  },
  {
    id: "modok",
    name: "Darren Cross",
    aliases: ["M.O.D.O.K.", "Yellowjacket"],
    universe: "Earth-616",
    faction: "Pym Tech / Kang's Empire",
    role: "Mechanized Organism Designed Only for Killing.",
    overview: "Crushed subatomically into the Quantum Realm after battling Ant-Man, Darren Cross was rescued and cybernetically reconstructed by Kang the Conqueror into the ultimate killing organism.",
    firstAppearance: "Ant-Man (2015) / Ant-Man and the Wasp: Quantumania (2023)",
    color: "#a855f7",
    imageSearch: "M.O.D.O.K. (Marvel Cinematic Universe)",
    statusByPhase: {
      2: { status: "alive", note: "Shrunk into subatomic oblivion inside his malfunctioning Yellowjacket suit." },
      5: { status: "deceased", note: "Sacrificed himself to destroy Kang's quantum shield generator, dying 'as an Avenger'." }
    },
    eras: [
      {
        eraId: "modok-quantum",
        phase: 5,
        title: "Quantum Retribution (2026)",
        year: "2026",
        universe: "Quantum Realm",
        description: "Enforced Kang's reign until Cassie Lang convinced him to stop being a dick.",
        keyMoments: ["Reconstructed with giant cybernetic cranium", "Destroyed Kang's core shield", "'At least I died... an Avenger'"]
      }
    ],
    artifactsPossessed: ["doomsday-chair"],
    linkedNexusEvents: [],
    entries: ["ant-man", "ant-man-and-the-wasp-quantumania"]
  },
  {
    id: "ebony-maw",
    name: "Ebony Maw",
    aliases: ["The Maw", "Child of Thanos"],
    universe: "Earth-616",
    faction: "Black Order / Thanos' Army",
    role: "Telekinetic herald and voice of the Mad Titan.",
    overview: "The fanatical herald of Thanos possessing overwhelming telekinetic mastery, preaching the gospel of balance across dying civilizations before being ejected into space.",
    firstAppearance: "Avengers: Infinity War (2018)",
    color: "#64748b",
    imageSearch: "Ebony Maw (Marvel Cinematic Universe)",
    statusByPhase: {
      3: { status: "deceased", note: "Blown through the hull of his Q-Ship into vacuum of space by Iron Man and Spider-Man; 2014 variant dusted." }
    },
    eras: [
      {
        eraId: "maw-new-york",
        phase: 3,
        title: "The Black Order Assault (2018)",
        year: "2018",
        universe: "Earth-616",
        description: "Invaded Greenwich Village to seize the Time Stone from Doctor Strange.",
        keyMoments: ["'Hear me and rejoice'", "Captured Doctor Strange with telekinetic micro-needles"]
      }
    ],
    artifactsPossessed: [],
    linkedNexusEvents: [],
    entries: ["avengers-infinity-war", "avengers-endgame"]
  },
  {
    id: "surtur",
    name: "Surtur",
    aliases: ["Lord of Muspelheim", "Destroyer of Asgard"],
    universe: "Earth-616",
    faction: "Fire Demons of Muspelheim",
    role: "Prophesied apocalyptic fire giant.",
    overview: "The colossal fire demon of Muspelheim whose destiny was fulfilled when Thor and Loki plunged his Crown into the Eternal Flame, resurrecting Surtur to obliterate Hela and Asgard in Ragnarok.",
    firstAppearance: "Thor: Ragnarok (2017)",
    color: "#ea580c",
    imageSearch: "Surtur (Marvel Cinematic Universe)",
    statusByPhase: {
      3: { status: "deceased", note: "Plunged his Twilight Sword into Asgard's core, destroying Hela and Asgard during Ragnarok." }
    },
    eras: [
      {
        eraId: "surtur-ragnarok",
        phase: 3,
        title: "Ragnarok Unleashed (2017)",
        year: "2017",
        universe: "Earth-616",
        description: "Grew mountain-sized in the Eternal Flame and shattered Asgard into space dust.",
        keyMoments: ["Resurrected in the Royal Vault", "'I am Asgard's doom!'", "Struck down Hela with the Twilight Sword"]
      }
    ],
    artifactsPossessed: ["crown-of-surtur", "eternal-flame", "twilight-sword"],
    linkedNexusEvents: [],
    entries: ["thor-ragnarok"]
  },
  {
    id: "clea",
    name: "Clea",
    aliases: ["Clea of the Dark Dimension", "Sorceress"],
    universe: "Dark Dimension / Earth-616",
    faction: "Masters of the Mystic Arts",
    role: "Master sorceress of the Dark Dimension.",
    overview: "A powerful sorceress of the Dark Dimension and niece of Dormammu, who seeks out Doctor Strange to repair a multiversal incursion caused by his reality-hopping adventures.",
    firstAppearance: "Doctor Strange in the Multiverse of Madness (2022)",
    color: "#c084fc",
    imageSearch: "Clea (Marvel Cinematic Universe)",
    statusByPhase: {
      4: { status: "alive", note: "Appeared in New York and recruited Doctor Strange into the Dark Dimension." },
      5: { status: "alive", note: "Preventing universal incursions in the Dark Dimension." },
      6: { status: "alive", note: "Frontline multiversal sorceress contending with Battleworld." }
    },
    eras: [
      {
        eraId: "clea-incursion",
        phase: 4,
        title: "The Incursion Call (2024)",
        year: "2024",
        universe: "Earth-616",
        description: "Opened a rift in reality and took Stephen Strange into the Dark Dimension.",
        keyMoments: ["Sliced open dimensional rift with crescent blade", "'You caused an incursion, and we're going to fix it'"]
      }
    ],
    artifactsPossessed: ["dark-dimension-blade"],
    linkedNexusEvents: [],
    entries: ["doctor-strange-in-the-multiverse-of-madness"]
  },
  {
    id: "bullseye",
    name: "Benjamin Poindexter",
    aliases: ["Bullseye", "Dex"],
    universe: "Earth-616",
    faction: "FBI (Disgraced) / Kingpin / Shadow Ops",
    role: "Lethal marksman who never misses.",
    overview: "A psychopathic former FBI tactical agent with superhuman aim and projectile lethality, weaponizing any physical object from paperclips to knives with pinpoint accuracy.",
    firstAppearance: "Daredevil (2018) / Daredevil: Born Again (2025)",
    color: "#0284c7",
    imageSearch: "Benjamin Poindexter (Marvel Cinematic Universe)",
    statusByPhase: {
      4: { status: "alive", note: "Underwent experimental Cogmium spinal reconstruction surgery." },
      5: { status: "alive", note: "Unleashed in New York City amidst Kingpin's mayoral crackdown." },
      6: { status: "alive", note: "Lethal assassin in New York street-level conflicts." }
    },
    eras: [
      {
        eraId: "dex-born-again",
        phase: 5,
        title: "Target Acquired (2026)",
        year: "2026",
        universe: "Earth-616",
        description: "Re-emerged with reinforced adamantium-grade spine to exact vengeance on Matt Murdock and Wilson Fisk.",
        keyMoments: ["Assassinated targets with projectile precision in New York courtrooms"]
      }
    ],
    artifactsPossessed: ["cogmium-spine-implant"],
    linkedNexusEvents: [],
    entries: ["daredevil-born-again"]
  }
];

console.log(`Downloading photos for ${EXPANDED_CHARACTERS.length} expanded characters & villains...`);

for (const c of EXPANDED_CHARACTERS) {
  const dest = path.join(targetDir, `${c.id}.jpg`);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 15000) {
    console.log(`✓ [Exists] ${c.id}.jpg (${fs.statSync(dest).size} bytes)`);
    continue;
  }

  const query = c.imageSearch || c.name;
  console.log(`Searching Fandom Wiki for: ${query}...`);
  try {
    const apiUrl = `https://marvelcinematicuniverse.fandom.com/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json`;
    const searchJson = execSync(`curl.exe -s -A "Mozilla/5.0" "${apiUrl}"`, { encoding: 'utf8' });
    const searchData = JSON.parse(searchJson);
    if (!searchData.query?.search?.length) {
      console.log(`✗ No search results for ${query}`);
      continue;
    }

    const pageTitle = searchData.query.search[0].title;
    const imgApiUrl = `https://marvelcinematicuniverse.fandom.com/api.php?action=query&titles=${encodeURIComponent(pageTitle)}&prop=pageimages&pithumbsize=1000&format=json`;
    const imgJson = execSync(`curl.exe -s -A "Mozilla/5.0" "${imgApiUrl}"`, { encoding: 'utf8' });
    const imgData = JSON.parse(imgJson);
    const pages = imgData.query?.pages || {};
    const pageId = Object.keys(pages)[0];
    const thumbUrl = pages[pageId]?.thumbnail?.source;

    if (thumbUrl) {
      const cleanUrl = thumbUrl.split('/revision/')[0];
      execSync(`curl.exe -sL -A "Mozilla/5.0" "${cleanUrl}" -o "${dest}"`);
      const size = fs.existsSync(dest) ? fs.statSync(dest).size : 0;
      if (size > 5000) {
        console.log(`✓ [Saved] ${c.id}.jpg (${size} bytes)`);
      } else {
        console.log(`✗ [Too small] ${c.id}.jpg`);
      }
    } else {
      console.log(`✗ No thumbnail found on page: ${pageTitle}`);
    }
  } catch (err) {
    console.error(`✗ Error fetching ${c.id}:`, err.message);
  }
}

// 2. Read and merge into data/characters.ts
const charsPath = path.join(__dirname, '..', 'data', 'characters.ts');
let charsContent = fs.readFileSync(charsPath, 'utf8');

// Check which characters are not yet in data/characters.ts
const toAdd = [];
for (const c of EXPANDED_CHARACTERS) {
  if (!charsContent.includes(`id: "${c.id}"`)) {
    toAdd.push(c);
  }
}

console.log(`\nAdding ${toAdd.length} new characters/villains to data/characters.ts...`);
if (toAdd.length > 0) {
  // Find the closing bracket of CHARACTERS array
  const lastBracketIndex = charsContent.lastIndexOf('];');
  if (lastBracketIndex !== -1) {
    const formattedNewEntries = toAdd.map(c => '  ' + JSON.stringify(c, null, 2).replace(/\n/g, '\n  ')).join(',\n\n');
    charsContent = charsContent.slice(0, lastBracketIndex).trimEnd() + ',\n\n  // --- EXPANDED MARVEL HEROES & VILLAINS ---\n' + formattedNewEntries + '\n];\n';
    fs.writeFileSync(charsPath, charsContent, 'utf8');
    console.log(`✓ Successfully updated data/characters.ts with ${toAdd.length} new entries!`);
  }
}

// 3. Update data/characterBackdrops.ts
const bdropPath = path.join(__dirname, '..', 'data', 'characterBackdrops.ts');
if (fs.existsSync(bdropPath)) {
  let bdropContent = fs.readFileSync(bdropPath, 'utf8');
  let addedBdrops = 0;
  for (const c of EXPANDED_CHARACTERS) {
    if (!bdropContent.includes(`"${c.id}":`)) {
      const entry = `  "${c.id}": "/images/characters/${c.id}.jpg",\n`;
      const idx = bdropContent.lastIndexOf('};');
      if (idx !== -1) {
        bdropContent = bdropContent.slice(0, idx) + entry + bdropContent.slice(idx);
        addedBdrops++;
      }
    }
  }
  if (addedBdrops > 0) {
    fs.writeFileSync(bdropPath, bdropContent, 'utf8');
    console.log(`✓ Added ${addedBdrops} entries to data/characterBackdrops.ts`);
  }
}

console.log('\n🎉 All new Marvel characters and villains integrated successfully!');
