const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'characters');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 40+ Major Iconic Marvel MCU Heroes, Villains, and Multiverse Legends
const NEW_CHARACTERS = [
  // Major Iconic Villains
  {
    id: "dormammu",
    name: "Dormammu",
    aliases: ["Lord of the Dark Dimension", "The Destroyer of Worlds", "The Cosmic Conqueror"],
    universe: "Dark Dimension",
    faction: "Dark Dimension",
    role: "Primordial cosmic entity of absolute hunger and entropy.",
    overview: "A gargantuan primordial cosmic entity who rules the Dark Dimension, seeking to merge all infinite universes into his timeless domain of eternal darkness.",
    firstAppearance: "Doctor Strange (2016)",
    color: "#9333ea",
    imageSearch: "Dormammu",
    statusByPhase: {
      3: { status: "ascended", note: "Trapped in a temporal loop by Doctor Strange until he withdrew from Earth." },
      4: { status: "unknown", note: "Lurks within the boundless Dark Dimension." },
      5: { status: "unknown", note: "Clea and Doctor Strange travel to his realm to prevent an incursion." },
      6: { status: "unknown", note: "Threat of the Dark Dimension looms over the collapsing multiverse." }
    },
    eras: [
      {
        eraId: "dormammu-bargain",
        phase: 3,
        title: "The Infinite Bargain (2016)",
        year: "2016",
        universe: "Dark Dimension",
        description: "Ensnared in Doctor Strange's endless Time Stone loop until conceding to spare Earth.",
        keyMoments: ["Killed Strange countless times in the loop", "'Dormammu, I've come to bargain'", "Banished back into the Dark Dimension"]
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
    role: "Super Soldier turned monstrous gamma juggernaut.",
    overview: "A British Royal Marine infused with a variant Super Soldier Serum and Bruce Banner's gamma blood, mutating into the unstoppable monstrosity known as the Abomination.",
    firstAppearance: "The Incredible Hulk (2008)",
    color: "#15803d",
    imageSearch: "Emil Blonsky (Marvel Cinematic Universe)",
    statusByPhase: {
      1: { status: "alive", note: "Defeated by the Hulk in Harlem and locked in Cryo-Stasis by General Ross." },
      4: { status: "alive", note: "Sparred with Wong in Macau; paroled by Jennifer Walters and retreated to Kamar-Taj." },
      5: { status: "alive", note: "Living in peaceful retreat within Kamar-Taj." },
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
    aliases: ["Ego the Living Planet", "The Celestial"],
    universe: "Earth-616",
    faction: "Celestials",
    role: "Cosmic Celestial entity and biological father of Peter Quill.",
    overview: "An ancient Celestial who manifested as a living planet, planting seeds across thousands of worlds to enact the Expansion and remake the cosmos in his own image.",
    firstAppearance: "Guardians of the Galaxy Vol. 2 (2017)",
    color: "#3b82f6",
    imageSearch: "Ego (Marvel Cinematic Universe)",
    statusByPhase: {
      3: { status: "deceased", note: "Destroyed when Baby Groot detonated an explosive in his brain core." },
      4: { status: "deceased", note: "Defunct planet core drifting in deep cosmos." },
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
        keyMoments: ["Revealed he placed the tumor in Meredith Quill's head", "Core annihilated by Guardians' thermal detonator"]
      }
    ],
    artifactsPossessed: ["celestial-light"],
    linkedNexusEvents: [],
    entries: ["guardians-of-the-galaxy-vol-2"]
  },
  {
    id: "adam-warlock",
    name: "Adam Warlock",
    aliases: ["Adam", "Him", "Sovereign Sovereign"],
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
        description: "Emerged prematurely from his cocoon; saved Star-Lord from freezing in vacuum of space.",
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
      6: { status: "alive", note: "Frontline soldier in New York multiversal conflicts." }
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
    firstAppearance: "What If...? (2021) / Doctor Strange in the Multiverse of Madness (2022)",
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
    firstAppearance: "Eternals (2021 Voice) / Deadpool & Wolverine (2024)",
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
  }
];

console.log(`Processing ${NEW_CHARACTERS.length} expanded characters...`);
console.log('Writing helper script to download photos from MCU Fandom Wiki...');

const dlScript = `
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const targetDir = 'public/images/characters';

const CHARACTERS_TO_FETCH = ${JSON.stringify(NEW_CHARACTERS.map(c => ({ id: c.id, query: c.imageSearch || c.name }))), null, 2};

for (const c of CHARACTERS_TO_FETCH) {
  const dest = path.join(targetDir, \`\${c.id}.jpg\`);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 15000) {
    console.log(\`✓ [Exists] \${c.id}.jpg (\${fs.statSync(dest).size} bytes)\`);
    continue;
  }

  console.log(\`Searching Fandom for: \${c.query}...\`);
  try {
    const apiUrl = \`https://marvelcinematicuniverse.fandom.com/api.php?action=query&list=search&srsearch=\${encodeURIComponent(c.query)}&format=json\`;
    const searchJson = execSync(\`curl.exe -s -A "Mozilla/5.0" "\${apiUrl}"\`, { encoding: 'utf8' });
    const searchData = JSON.parse(searchJson);
    if (!searchData.query?.search?.length) {
      console.log(\`✗ No search results for \${c.query}\`);
      continue;
    }

    const pageTitle = searchData.query.search[0].title;
    const imgApiUrl = \`https://marvelcinematicuniverse.fandom.com/api.php?action=query&titles=\${encodeURIComponent(pageTitle)}&prop=pageimages&pithumbsize=1000&format=json\`;
    const imgJson = execSync(\`curl.exe -s -A "Mozilla/5.0" "\${imgApiUrl}"\`, { encoding: 'utf8' });
    const imgData = JSON.parse(imgJson);
    const pages = imgData.query?.pages || {};
    const pageId = Object.keys(pages)[0];
    const thumbUrl = pages[pageId]?.thumbnail?.source;

    if (thumbUrl) {
      const cleanUrl = thumbUrl.split('/revision/')[0];
      execSync(\`curl.exe -sL -A "Mozilla/5.0" "\${cleanUrl}" -o "\${dest}"\`);
      const size = fs.statSync(dest).size;
      if (size > 5000) {
        console.log(\`✓ [Saved] \${c.id}.jpg (\${size} bytes)\`);
      } else {
        console.log(\`✗ [Too small] \${c.id}.jpg\`);
      }
    } else {
      console.log(\`✗ No thumbnail found on page: \${pageTitle}\`);
    }
  } catch (err) {
    console.error(\`✗ Error fetching \${c.id}:\`, err.message);
  }
}
`;

fs.writeFileSync('scripts/fetch_new_character_photos.js', dlScript);
console.log('Saved scripts/fetch_new_character_photos.js');
