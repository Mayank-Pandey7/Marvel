export type TreeNodeType = "character" | "mystery" | "variant" | "group";

export interface DarkTreeNode {
  id: string;
  name: string;
  subtitle?: string;
  photoUrl?: string;
  cluster: "stark" | "asgard" | "maximoff" | "rogers" | "pym" | "richards" | "kang" | "romanoff" | "cosmic" | "mutants" | "spiders" | "wakanda" | "mystic" | "tenrings" | "guardians" | "defenders" | "eternals";
  clusterLabel: string;
  phaseIntroduced: number;
  x: number;
  y: number;
  isMystery?: boolean;
  status?: string;
  characterId?: string; // Links to data/characters.ts
  bio?: string;
}

export type LineType = "partner" | "child" | "variant" | "mentor" | "enemy" | "creator" | "paradox";

export interface OrthogonalConnection {
  id: string;
  fromId: string;
  toId: string;
  type: LineType;
  label?: string;
  phaseRevealed: number;
  midY?: number;
  midX?: number;
  junction?: { x: number; y: number; symbol?: "+" | "x" | "dot" };
  hasArrow?: boolean;
  arrowDir?: "down" | "right" | "left" | "up";
}

// ---------------------------------------------------------------------------
// CHARACTER NODES (Generational Dynasties with Spatial Coords)
// Coordinate Space: 2600 x 2000
// ---------------------------------------------------------------------------

export const DARK_TREE_NODES: DarkTreeNode[] = [
  // ==========================================
  // 1. THE ASGARDIAN ROYAL HOUSE (Top Left)
  // ==========================================
  {
    id: "bor",
    name: "BOR BURISON",
    subtitle: "King of Asgard",
    photoUrl: "/images/characters/bor.jpg",
    cluster: "asgard",
    clusterLabel: "HOUSE OF ODIN",
    phaseIntroduced: 2,
    x: 470,
    y: 120,
    characterId: "thor",
    bio: "Father of Odin who defeated the Dark Elves during the First Convergence."
  },
  {
    id: "odin",
    name: "ODIN BORSON",
    subtitle: "Allfather",
    photoUrl: "/images/characters/odin.jpg",
    cluster: "asgard",
    clusterLabel: "HOUSE OF ODIN",
    phaseIntroduced: 1,
    x: 360,
    y: 340,
    characterId: "thor",
    bio: "Ruler of Asgard, protector of the Nine Realms, father to Hela, Thor, and adoptive father to Loki."
  },
  {
    id: "frigga",
    name: "FRIGGA",
    subtitle: "Queen of Asgard",
    photoUrl: "/images/characters/frigga.jpg",
    cluster: "asgard",
    clusterLabel: "HOUSE OF ODIN",
    phaseIntroduced: 1,
    x: 580,
    y: 340,
    characterId: "thor",
    bio: "Wife of Odin, witch raised by witches, who taught Loki his illusion magic."
  },
  {
    id: "laufey",
    name: "LAUFEY",
    subtitle: "King of Frost Giants",
    photoUrl: "/images/characters/laufey.jpg",
    cluster: "asgard",
    clusterLabel: "HOUSE OF ODIN",
    phaseIntroduced: 1,
    x: 100,
    y: 340,
    bio: "Biological Frost Giant father of Loki, left him to die in Jotunheim temple."
  },
  {
    id: "hela",
    name: "HELA",
    subtitle: "Goddess of Death",
    photoUrl: "/images/characters/hela.jpg",
    cluster: "asgard",
    clusterLabel: "HOUSE OF ODIN",
    phaseIntroduced: 3,
    x: 800,
    y: 560,
    characterId: "hela",
    bio: "Firstborn of Odin, Asgardian executioner imprisoned in Hel for millennia."
  },
  {
    id: "thor",
    name: "THOR ODINSON",
    subtitle: "God of Thunder",
    photoUrl: "/images/characters/thor.jpg",
    cluster: "asgard",
    clusterLabel: "HOUSE OF ODIN",
    phaseIntroduced: 1,
    x: 580,
    y: 560,
    characterId: "thor",
    bio: "Rightful heir of Asgard who evolved from arrogant warrior prince into the God of Thunder."
  },
  {
    id: "jane-foster",
    name: "JANE FOSTER",
    subtitle: "Mighty Thor",
    photoUrl: "/images/characters/jane-foster.jpg",
    cluster: "asgard",
    clusterLabel: "HOUSE OF ODIN",
    phaseIntroduced: 1,
    x: 360,
    y: 560,
    bio: "Astrophysicist who wielded reconstructed Mjolnir as the Mighty Thor before ascending to Valhalla."
  },
  {
    id: "loki",
    name: "LOKI LAUFEYSON",
    subtitle: "God of Stories",
    photoUrl: "/images/characters/loki.jpg",
    cluster: "asgard",
    clusterLabel: "HOUSE OF ODIN",
    phaseIntroduced: 1,
    x: 100,
    y: 560,
    characterId: "loki",
    bio: "Adopted brother of Thor who broke the TVA loop and holds the Multiverse Tree together at the End of Time."
  },
  {
    id: "sylvie",
    name: "SYLVIE",
    subtitle: "Loki Variant",
    photoUrl: "/images/characters/sylvie.jpg",
    cluster: "asgard",
    clusterLabel: "HOUSE OF ODIN",
    phaseIntroduced: 4,
    x: 100,
    y: 780,
    bio: "Female Loki variant hunted by the TVA who killed He Who Remains, fracturing the Sacred Timeline."
  },
  {
    id: "love",
    name: "LOVE",
    subtitle: "Daughter of Eternity",
    photoUrl: "/images/characters/love.jpg",
    cluster: "asgard",
    clusterLabel: "HOUSE OF ODIN",
    phaseIntroduced: 4,
    x: 470,
    y: 780,
    bio: "Resurrected daughter of Gorr infused with cosmic energy of Eternity, raised by Thor."
  },

  // ==========================================
  // 2. THE STARK DYNASTY (Center Top)
  // ==========================================
  {
    id: "howard-stark",
    name: "HOWARD STARK",
    subtitle: "Founder Stark Industries",
    photoUrl: "/images/characters/howard-stark.jpg",
    cluster: "stark",
    clusterLabel: "STARK DYNASTY",
    phaseIntroduced: 1,
    x: 1420,
    y: 120,
    characterId: "iron-man",
    bio: "Visionary inventor, founding member of S.H.I.E.L.D., and father of Tony Stark."
  },
  {
    id: "maria-stark",
    name: "MARIA STARK",
    subtitle: "Philanthropist",
    photoUrl: "/images/characters/maria-stark.jpg",
    cluster: "stark",
    clusterLabel: "STARK DYNASTY",
    phaseIntroduced: 3,
    x: 1640,
    y: 120,
    bio: "Mother of Tony Stark, assassinated alongside Howard in 1991 by the Winter Soldier."
  },
  {
    id: "tony-stark",
    name: "TONY STARK",
    subtitle: "Iron Man",
    photoUrl: "/images/characters/tony-stark.jpg",
    cluster: "stark",
    clusterLabel: "STARK DYNASTY",
    phaseIntroduced: 1,
    x: 1420,
    y: 340,
    characterId: "iron-man",
    bio: "Genius billionaire who forged the Iron Man armor and sacrificed himself with the Infinity Stones."
  },
  {
    id: "pepper-potts",
    name: "PEPPER POTTS",
    subtitle: "Rescue",
    photoUrl: "/images/characters/pepper-potts.jpg",
    cluster: "stark",
    clusterLabel: "STARK DYNASTY",
    phaseIntroduced: 1,
    x: 1640,
    y: 340,
    bio: "CEO of Stark Industries, wife of Tony Stark, and mother of Morgan Stark."
  },
  {
    id: "morgan-stark",
    name: "MORGAN STARK",
    subtitle: "Daughter of Tony",
    photoUrl: "/images/characters/morgan-stark.jpg",
    cluster: "stark",
    clusterLabel: "STARK DYNASTY",
    phaseIntroduced: 3,
    x: 1530,
    y: 560,
    bio: "'I love you 3000' - Daughter of Tony Stark and Pepper Potts."
  },
  {
    id: "peter-parker",
    name: "PETER PARKER",
    subtitle: "Spider-Man (616)",
    photoUrl: "/images/characters/peter-parker.jpg",
    cluster: "stark",
    clusterLabel: "STARK DYNASTY",
    phaseIntroduced: 3,
    x: 1200,
    y: 560,
    characterId: "spider-man",
    bio: "Tony Stark's protege who sacrificed his personal identity so the multiverse could heal."
  },
  {
    id: "may-parker",
    name: "AUNT MAY",
    subtitle: "Guardian of Peter",
    photoUrl: "/images/characters/may-parker.jpg",
    cluster: "stark",
    clusterLabel: "STARK DYNASTY",
    phaseIntroduced: 3,
    x: 1200,
    y: 340,
    bio: "'With great power, there must also come great responsibility.' Moral anchor of Spider-Man."
  },

  // ==========================================
  // 3. THE ROGERS & SUPER SOLDIER LINEAGE (Top Right)
  // ==========================================
  {
    id: "abraham-erskine",
    name: "DR. ERSKINE",
    subtitle: "Project Rebirth",
    photoUrl: "/images/characters/abraham-erskine.jpg",
    cluster: "rogers",
    clusterLabel: "SUPER SOLDIER COVENANT",
    phaseIntroduced: 1,
    x: 2260,
    y: 120,
    bio: "German scientist who created the original Super Soldier Serum."
  },
  {
    id: "steve-rogers",
    name: "STEVE ROGERS",
    subtitle: "Captain America",
    photoUrl: "/images/characters/steve-rogers.jpg",
    cluster: "rogers",
    clusterLabel: "SUPER SOLDIER COVENANT",
    phaseIntroduced: 1,
    x: 2260,
    y: 340,
    characterId: "captain-america",
    bio: "Enhanced by Project Rebirth, the moral compass of the Avengers who lived his lost life with Peggy."
  },
  {
    id: "peggy-carter",
    name: "PEGGY CARTER",
    subtitle: "Director of S.H.I.E.L.D.",
    photoUrl: "/images/characters/peggy-carter.jpg",
    cluster: "rogers",
    clusterLabel: "SUPER SOLDIER COVENANT",
    phaseIntroduced: 1,
    x: 2480,
    y: 340,
    bio: "SSR agent and founder of S.H.I.E.L.D. who promised Steve a dance in 1945."
  },
  {
    id: "bucky-barnes",
    name: "BUCKY BARNES",
    subtitle: "Winter Soldier",
    photoUrl: "/images/characters/bucky-barnes.jpg",
    cluster: "rogers",
    clusterLabel: "SUPER SOLDIER COVENANT",
    phaseIntroduced: 1,
    x: 2040,
    y: 340,
    characterId: "bucky-barnes",
    bio: "Steve's lifelong brother, brainwashed as HYDRA's assassin before breaking free to lead the Thunderbolts*."
  },
  {
    id: "sam-wilson",
    name: "SAM WILSON",
    subtitle: "Captain America",
    photoUrl: "/images/characters/sam-wilson.jpg",
    cluster: "rogers",
    clusterLabel: "SUPER SOLDIER COVENANT",
    phaseIntroduced: 2,
    x: 2260,
    y: 560,
    characterId: "sam-wilson",
    bio: "Pararescue veteran who inherited Steve's vibranium shield and leads the new Avengers."
  },
  {
    id: "red-skull",
    name: "RED SKULL",
    subtitle: "Johann Schmidt",
    photoUrl: "/images/characters/red-skull.jpg",
    cluster: "rogers",
    clusterLabel: "SUPER SOLDIER COVENANT",
    phaseIntroduced: 1,
    x: 2700,
    y: 340,
    characterId: "red-skull",
    bio: "HYDRA commander warped by Erskine's prototype serum, cursed to guide seekers on Vormir."
  },

  // ==========================================
  // 4. THE MAXIMOFF BLOODLINE (Left Mid)
  // ==========================================
  {
    id: "oleg-maximoff",
    name: "OLEG MAXIMOFF",
    subtitle: "Sokovian Father",
    photoUrl: "/images/characters/oleg-maximoff.jpg",
    cluster: "maximoff",
    clusterLabel: "MAXIMOFF LINEAGE",
    phaseIntroduced: 4,
    x: 1140,
    y: 1040,
    bio: "Father of Wanda and Pietro, killed by a Stark Industries mortar in Novi Grad."
  },
  {
    id: "iryna-maximoff",
    name: "IRYNA MAXIMOFF",
    subtitle: "Sokovian Mother",
    photoUrl: "/images/characters/iryna-maximoff.jpg",
    cluster: "maximoff",
    clusterLabel: "MAXIMOFF LINEAGE",
    phaseIntroduced: 4,
    x: 1360,
    y: 1040,
    bio: "Mother of the Maximoff twins, instilled in Wanda a love for American television sitcoms."
  },
  {
    id: "pietro-maximoff",
    name: "PIETRO MAXIMOFF",
    subtitle: "Quicksilver",
    photoUrl: "/images/characters/pietro-maximoff.jpg",
    cluster: "maximoff",
    clusterLabel: "MAXIMOFF LINEAGE",
    phaseIntroduced: 2,
    x: 1020,
    y: 1260,
    bio: "Wanda's twin brother, moved with supersonic speed and sacrificed his life in Sokovia."
  },
  {
    id: "wanda-maximoff",
    name: "WANDA MAXIMOFF",
    subtitle: "The Scarlet Witch",
    photoUrl: "/images/characters/wanda-maximoff.jpg",
    cluster: "maximoff",
    clusterLabel: "MAXIMOFF LINEAGE",
    phaseIntroduced: 2,
    x: 1240,
    y: 1260,
    characterId: "scarlet-witch",
    bio: "Wielder of Chaos Magic prophesied to rule or destroy the cosmos, destroyed the Darkhold across all dimensions."
  },
  {
    id: "vision",
    name: "VISION",
    subtitle: "Mind Stone Synthezoid",
    photoUrl: "/images/characters/vision.jpg",
    cluster: "maximoff",
    clusterLabel: "MAXIMOFF LINEAGE",
    phaseIntroduced: 2,
    x: 1460,
    y: 1260,
    characterId: "vision",
    bio: "Synthezoid forged from vibranium, J.A.R.V.I.S., and the Mind Stone who questioned the Ship of Theseus."
  },
  {
    id: "white-vision",
    name: "WHITE VISION",
    subtitle: "Reconstructed Weapon",
    photoUrl: "/images/characters/white-vision.jpg",
    cluster: "maximoff",
    clusterLabel: "MAXIMOFF LINEAGE",
    phaseIntroduced: 4,
    x: 1680,
    y: 1480,
    bio: "S.W.O.R.D. reassembled body of Vision whose original memories were restored during the Westview duel."
  },
  {
    id: "billy-maximoff",
    name: "BILLY MAXIMOFF",
    subtitle: "Wiccan",
    photoUrl: "/images/characters/billy-maximoff.jpg",
    cluster: "maximoff",
    clusterLabel: "MAXIMOFF LINEAGE",
    phaseIntroduced: 4,
    x: 1240,
    y: 1480,
    bio: "Son of the Scarlet Witch who inherited reality manipulation magic and conquered the Witches' Road."
  },
  {
    id: "tommy-maximoff",
    name: "TOMMY MAXIMOFF",
    subtitle: "Speed",
    photoUrl: "/images/characters/tommy-maximoff.jpg",
    cluster: "maximoff",
    clusterLabel: "MAXIMOFF LINEAGE",
    phaseIntroduced: 4,
    x: 1460,
    y: 1480,
    bio: "Son of Wanda and Vision, inherited uncle Pietro's superhuman velocity."
  },
  {
    id: "agatha-harkness",
    name: "AGATHA HARKNESS",
    subtitle: "Salem Witch",
    photoUrl: "/images/characters/agatha-harkness.jpg",
    cluster: "maximoff",
    clusterLabel: "MAXIMOFF LINEAGE",
    phaseIntroduced: 4,
    x: 1680,
    y: 1260,
    characterId: "agatha-harkness",
    bio: "Salem witch who absorbed her coven and guided Billy Maximoff along the Witches' Road."
  },

  // ==========================================
  // 5. THE PYM-LANG QUANTUM TREE (Center Mid)
  // ==========================================
  {
    id: "hank-pym",
    name: "HANK PYM",
    subtitle: "Original Ant-Man",
    photoUrl: "/images/characters/hank-pym.jpg",
    cluster: "pym",
    clusterLabel: "PYM-LANG QUANTUM",
    phaseIntroduced: 2,
    x: 2180,
    y: 1040,
    characterId: "hank-pym",
    bio: "Discoverer of Pym Particles who defended reality during the Cold War alongside Janet."
  },
  {
    id: "janet-van-dyne",
    name: "JANET VAN DYNE",
    subtitle: "Original Wasp",
    photoUrl: "/images/characters/janet-van-dyne.jpg",
    cluster: "pym",
    clusterLabel: "PYM-LANG QUANTUM",
    phaseIntroduced: 2,
    x: 2400,
    y: 1040,
    bio: "Original Wasp lost in the Quantum Realm for 30 years where she encountered Kang the Conqueror."
  },
  {
    id: "hope-van-dyne",
    name: "HOPE VAN DYNE",
    subtitle: "The Wasp",
    photoUrl: "/images/characters/hope-van-dyne.jpg",
    cluster: "pym",
    clusterLabel: "PYM-LANG QUANTUM",
    phaseIntroduced: 2,
    x: 2180,
    y: 1260,
    characterId: "wasp",
    bio: "Pym Van Dyne Global leader and brilliant fighter who brought Scott back from the Quantum Realm."
  },
  {
    id: "scott-lang",
    name: "SCOTT LANG",
    subtitle: "Ant-Man",
    photoUrl: "/images/characters/scott-lang.jpg",
    cluster: "pym",
    clusterLabel: "PYM-LANG QUANTUM",
    phaseIntroduced: 2,
    x: 2400,
    y: 1260,
    characterId: "ant-man",
    bio: "Ex-convict turned Avenger whose Quantum Realm time-heist theory saved the entire universe."
  },
  {
    id: "cassie-lang",
    name: "CASSIE LANG",
    subtitle: "Stature",
    photoUrl: "/images/characters/cassie-lang.jpg",
    cluster: "pym",
    clusterLabel: "PYM-LANG QUANTUM",
    phaseIntroduced: 2,
    x: 2400,
    y: 1480,
    bio: "Scott's activist daughter who built the Quantum Satellite and wears Pym shrinking armor."
  },

  // ==========================================
  // 6. THE COUNCIL OF KANGS & TVA (Bottom Left)
  // ==========================================
  {
    id: "nathaniel-richards",
    name: "NATHANIEL RICHARDS",
    subtitle: "31st Century Scholar",
    photoUrl: "/images/characters/nathaniel-richards.jpg",
    cluster: "kang",
    clusterLabel: "KANG DYNASTY & TVA",
    phaseIntroduced: 4,
    x: 320,
    y: 1880,
    bio: "31st-century scientist who discovered the existence of parallel universes and sparked the first Multiversal War."
  },
  {
    id: "he-who-remains",
    name: "HE WHO REMAINS",
    subtitle: "Citadel Ruler",
    photoUrl: "/images/characters/he-who-remains.jpg",
    cluster: "kang",
    clusterLabel: "KANG DYNASTY & TVA",
    phaseIntroduced: 4,
    x: 320,
    y: 2100,
    characterId: "kang",
    bio: "Victor of the Multiversal War who isolated the Sacred Timeline and created the TVA."
  },
  {
    id: "kang-the-conqueror",
    name: "KANG THE CONQUEROR",
    subtitle: "Exiled Warlord",
    photoUrl: "/images/characters/kang-the-conqueror.jpg",
    cluster: "kang",
    clusterLabel: "KANG DYNASTY & TVA",
    phaseIntroduced: 5,
    x: 540,
    y: 2100,
    characterId: "kang",
    bio: "Exiled variant trapped in the Quantum Realm who conquered entire timelines and empires."
  },
  {
    id: "victor-timely",
    name: "VICTOR TIMELY",
    subtitle: "1893 Inventor",
    photoUrl: "/images/characters/victor-timely.jpg",
    cluster: "kang",
    clusterLabel: "KANG DYNASTY & TVA",
    phaseIntroduced: 5,
    x: 760,
    y: 2100,
    bio: "19th-century variant gifted the TVA handbook who aided Loki in fixing the Temporal Loom."
  },
  {
    id: "immortus",
    name: "IMMORTUS",
    subtitle: "Council Leader",
    photoUrl: "/images/characters/immortus.jpg",
    cluster: "kang",
    clusterLabel: "KANG DYNASTY & TVA",
    phaseIntroduced: 5,
    x: 320,
    y: 2320,
    bio: "Elder variant overseeing the Council of Kangs across the infinite branches."
  },
  {
    id: "ravonna-renslayer",
    name: "RAVONNA RENSLAYER",
    subtitle: "TVA Judge",
    photoUrl: "/images/characters/ravonna-renslayer.jpg",
    cluster: "kang",
    clusterLabel: "KANG DYNASTY & TVA",
    phaseIntroduced: 4,
    x: 540,
    y: 2320,
    bio: "Former commander and lover of He Who Remains exiled into the Void at the End of Time."
  },

  // ==========================================
  // 7. FANTASTIC FOUR & LATVERIA (Bottom Mid)
  // ==========================================
  {
    id: "reed-richards",
    name: "REED RICHARDS",
    subtitle: "Mister Fantastic",
    photoUrl: "/images/characters/reed-richards.jpg",
    cluster: "richards",
    clusterLabel: "FANTASTIC FOUR & DOOM",
    phaseIntroduced: 4,
    x: 1200,
    y: 1880,
    characterId: "reed-richards",
    bio: "Smartest man alive, leader of the Fantastic Four, master of elastic molecular restructuring."
  },
  {
    id: "sue-storm",
    name: "SUE STORM",
    subtitle: "Invisible Woman",
    photoUrl: "/images/characters/sue-storm.jpg",
    cluster: "richards",
    clusterLabel: "FANTASTIC FOUR & DOOM",
    phaseIntroduced: 6,
    x: 1420,
    y: 1880,
    characterId: "sue-storm",
    bio: "Matriarch of the Fantastic Four wielding psionic force fields and light-bending invisibility."
  },
  {
    id: "johnny-storm",
    name: "JOHNNY STORM",
    subtitle: "Human Torch",
    photoUrl: "/images/characters/johnny-storm.jpg",
    cluster: "richards",
    clusterLabel: "FANTASTIC FOUR & DOOM",
    phaseIntroduced: 5,
    x: 1640,
    y: 1880,
    characterId: "johnny-storm",
    bio: "'Flame On!' Hot-headed cosmic pioneer capable of plasma flight and supernova heat."
  },
  {
    id: "ben-grimm",
    name: "BEN GRIMM",
    subtitle: "The Thing",
    photoUrl: "/images/characters/ben-grimm.jpg",
    cluster: "richards",
    clusterLabel: "FANTASTIC FOUR & LATVERIA",
    phaseIntroduced: 6,
    x: 780,
    y: 1880,
    characterId: "ben-grimm",
    bio: "'It's Clobberin' Time!' Loyal pilot transformed into an indestructible rock-armored titan."
  },
  {
    id: "franklin-richards",
    name: "FRANKLIN RICHARDS",
    subtitle: "Reality Shaper",
    photoUrl: "/images/characters/franklin-richards.jpg",
    cluster: "richards",
    clusterLabel: "FANTASTIC FOUR & DOOM",
    phaseIntroduced: 6,
    x: 1310,
    y: 2100,
    bio: "Omega-level reality manipulator born to Reed and Sue with power over universal matter."
  },
  {
    id: "doctor-doom",
    name: "VICTOR VON DOOM",
    subtitle: "Doctor Doom",
    photoUrl: "/images/characters/doctor-doom.jpg",
    cluster: "richards",
    clusterLabel: "FANTASTIC FOUR & DOOM",
    phaseIntroduced: 6,
    x: 1750,
    y: 2100,
    characterId: "doctor-doom",
    bio: "Monarch of Latveria blending sorcery and supreme science, destined to rule Battleworld."
  },

  // ==========================================
  // 8. THE MUTANTS & X-MEN (Bottom Right)
  // ==========================================
  {
    id: "charles-xavier",
    name: "CHARLES XAVIER",
    subtitle: "Professor X",
    photoUrl: "/images/characters/charles-xavier.jpg",
    cluster: "mutants",
    clusterLabel: "MUTANT BLOODLINES",
    phaseIntroduced: 4,
    x: 2320,
    y: 1880,
    characterId: "professor-x",
    bio: "World's most powerful telepath and founder of the X-Men seeking human-mutant coexistence."
  },
  {
    id: "erik-lehnsherr",
    name: "ERIK LEHNSHERR",
    subtitle: "Magneto",
    photoUrl: "/images/characters/erik-lehnsherr.jpg",
    cluster: "mutants",
    clusterLabel: "MUTANT BLOODLINES",
    phaseIntroduced: 4,
    x: 2540,
    y: 1880,
    characterId: "magneto",
    bio: "Master of Magnetism who survived genocide and defends mutantkind by any means necessary."
  },
  {
    id: "wolverine",
    name: "LOGAN / WOLVERINE",
    subtitle: "Weapon X",
    photoUrl: "/images/characters/wolverine.jpg",
    cluster: "mutants",
    clusterLabel: "MUTANT BLOODLINES",
    phaseIntroduced: 5,
    x: 2320,
    y: 2100,
    characterId: "wolverine",
    bio: "Adamantium-clawed mutant anchor being with regenerative healing who saved his timeline with Wade."
  },
  {
    id: "deadpool",
    name: "WADE WILSON",
    subtitle: "Deadpool",
    photoUrl: "/images/characters/deadpool.jpg",
    cluster: "mutants",
    clusterLabel: "MUTANT BLOODLINES",
    phaseIntroduced: 5,
    x: 2540,
    y: 2100,
    characterId: "deadpool",
    bio: "Regenerating fourth-wall-breaking mercenary who traversed the multiverse to save Earth-10005."
  },
  {
    id: "x-23",
    name: "LAURA KINNEY",
    subtitle: "X-23",
    photoUrl: "/images/characters/x-23.jpg",
    cluster: "mutants",
    clusterLabel: "MUTANT BLOODLINES",
    phaseIntroduced: 5,
    x: 2320,
    y: 2320,
    characterId: "x-23",
    bio: "Cloned daughter of Logan carrying his adamantium claws and ferocious warrior spirit."
  },
  {
    id: "gambit",
    name: "REMY LEBEAU",
    subtitle: "Gambit",
    photoUrl: "/images/characters/gambit.jpg",
    cluster: "mutants",
    clusterLabel: "MUTANT BLOODLINES",
    phaseIntroduced: 5,
    x: 2760,
    y: 2100,
    characterId: "gambit",
    bio: "'You know how long I been waiting for this?' Kinetic-charging Cajun hero from the Void."
  },

  // ==========================================
  // 9. THE RED ROOM SISTERHOOD (Right Mid)
  // ==========================================
  {
    id: "dreykov",
    name: "GENERAL DREYKOV",
    subtitle: "Red Room Architect",
    photoUrl: "/images/characters/dreykov.jpg",
    cluster: "romanoff",
    clusterLabel: "RED ROOM SISTERHOOD",
    phaseIntroduced: 4,
    x: 2900,
    y: 1040,
    bio: "Soviet overseer who controlled the Black Widow assassination program via chemical subjugation."
  },
  {
    id: "melina-vostokoff",
    name: "MELINA VOSTOKOFF",
    subtitle: "Lead Scientist Widow",
    photoUrl: "/images/characters/melina-vostokoff.jpg",
    cluster: "romanoff",
    clusterLabel: "RED ROOM SISTERHOOD",
    phaseIntroduced: 4,
    x: 3120,
    y: 1040,
    bio: "Veteran Black Widow scientist and surrogate mother to Natasha and Yelena."
  },
  {
    id: "alexei-shostakov",
    name: "ALEXEI SHOSTAKOV",
    subtitle: "Red Guardian",
    photoUrl: "/images/characters/alexei-shostakov.jpg",
    cluster: "romanoff",
    clusterLabel: "RED ROOM SISTERHOOD",
    phaseIntroduced: 4,
    x: 3340,
    y: 1040,
    bio: "Soviet super soldier and surrogate father to Natasha and Yelena."
  },
  {
    id: "natasha-romanoff",
    name: "NATASHA ROMANOFF",
    subtitle: "Black Widow",
    photoUrl: "/images/characters/natasha-romanoff.jpg",
    cluster: "romanoff",
    clusterLabel: "RED ROOM SISTERHOOD",
    phaseIntroduced: 1,
    x: 3120,
    y: 1260,
    characterId: "black-widow",
    bio: "Defected from the Red Room to S.H.I.E.L.D., becoming the moral anchor of the Avengers."
  },
  {
    id: "yelena-belova",
    name: "YELENA BELOVA",
    subtitle: "White Widow",
    photoUrl: "/images/characters/yelena-belova.jpg",
    cluster: "romanoff",
    clusterLabel: "RED ROOM SISTERHOOD",
    phaseIntroduced: 4,
    x: 3340,
    y: 1260,
    characterId: "yelena-belova",
    bio: "Natasha's surrogate sister who freed all brainwashed Widows and co-leads the Thunderbolts*."
  },

  // ==========================================
  // 10. THE COSMIC TITAN ORDER (Far Right)
  // ==========================================
  {
    id: "alars",
    name: "A'LARS",
    subtitle: "Titan Sovereign",
    photoUrl: "/images/characters/alars.jpg",
    cluster: "cosmic",
    clusterLabel: "COSMIC DYNASTIES",
    phaseIntroduced: 3,
    x: 3300,
    y: 120,
    bio: "Eternal of Titan, father of Thanos and Eros (Starfox)."
  },
  {
    id: "thanos",
    name: "THANOS",
    subtitle: "The Mad Titan",
    photoUrl: "/images/characters/thanos.jpg",
    cluster: "cosmic",
    clusterLabel: "COSMIC DYNASTIES",
    phaseIntroduced: 1,
    x: 3300,
    y: 340,
    characterId: "thanos",
    bio: "Warlord of Titan who collected the six Infinity Stones to erase half of all life in the universe."
  },
  {
    id: "eros",
    name: "EROS / STARFOX",
    subtitle: "Royal Prince of Titan",
    photoUrl: "/images/characters/eros.jpg",
    cluster: "cosmic",
    clusterLabel: "COSMIC DYNASTIES",
    phaseIntroduced: 4,
    x: 3520,
    y: 340,
    bio: "Brother of Thanos, adventurer of the cosmos and master of emotional manipulation."
  },
  {
    id: "gamora",
    name: "GAMORA",
    subtitle: "Deadliest Woman",
    photoUrl: "/images/characters/gamora.jpg",
    cluster: "cosmic",
    clusterLabel: "COSMIC DYNASTIES",
    phaseIntroduced: 2,
    x: 3300,
    y: 560,
    characterId: "gamora",
    bio: "Adopted daughter of Thanos who broke free from his tyranny and found family with the Guardians."
  },
  {
    id: "nebula",
    name: "NEBULA",
    subtitle: "Daughter of Thanos",
    photoUrl: "/images/characters/nebula.jpg",
    cluster: "cosmic",
    clusterLabel: "COSMIC DYNASTIES",
    phaseIntroduced: 2,
    x: 3520,
    y: 560,
    characterId: "nebula",
    bio: "Cybernetically enhanced daughter of Thanos who redeemed herself and now governs Knowhere."
  },
  {
    id: "ego",
    name: "EGO THE PLANET",
    subtitle: "Celestial Father",
    photoUrl: "/images/characters/ego.jpg",
    cluster: "cosmic",
    clusterLabel: "COSMIC DYNASTIES",
    phaseIntroduced: 2,
    x: 2860,
    y: 340,
    bio: "Primordial Celestial entity who planted expansions across millions of worlds."
  },
  {
    id: "meredith-quill",
    name: "MEREDITH QUILL",
    subtitle: "Mother of Star-Lord",
    photoUrl: "/images/characters/meredith-quill.jpg",
    cluster: "cosmic",
    clusterLabel: "COSMIC DYNASTIES",
    phaseIntroduced: 2,
    x: 3080,
    y: 340,
    bio: "Earth woman from Missouri who gifted Peter Quill his iconic Awesome Mix tapes."
  },
  {
    id: "peter-quill",
    name: "PETER QUILL",
    subtitle: "Star-Lord",
    photoUrl: "/images/characters/peter-quill.jpg",
    cluster: "cosmic",
    clusterLabel: "COSMIC DYNASTIES",
    phaseIntroduced: 2,
    x: 3080,
    y: 560,
    characterId: "star-lord",
    bio: "Half-human, half-Celestial leader of the Guardians who fell in love with Gamora."
  },

  // ==========================================
  // 11. SPIDERS OF THE MULTIVERSE (Far Right Mid)
  // ==========================================
  {
    id: "spider-man-tobey",
    name: "PETER PARKER (96283)",
    subtitle: "The Friendly Neighbor",
    photoUrl: "/images/characters/spider-man-tobey.jpg",
    cluster: "spiders",
    clusterLabel: "SPIDER-VERSE WEB",
    phaseIntroduced: 4,
    x: 3840,
    y: 1160,
    characterId: "spider-man-maguire",
    bio: "Veteran Spider-Man from Earth-96283 who cured the Green Goblin and guided young Peter."
  },
  {
    id: "spider-man-andrew",
    name: "PETER PARKER (120703)",
    subtitle: "The Amazing Spider-Man",
    photoUrl: "/images/characters/spider-man-andrew.jpg",
    cluster: "spiders",
    clusterLabel: "SPIDER-VERSE WEB",
    phaseIntroduced: 4,
    x: 4060,
    y: 1160,
    characterId: "spider-man-garfield",
    bio: "Spider-Man from Earth-120703 who found redemption by saving MJ during the Statue of Liberty battle."
  },
  {
    id: "green-goblin",
    name: "NORMAN OSBORN",
    subtitle: "Green Goblin",
    photoUrl: "/images/characters/green-goblin.jpg",
    cluster: "spiders",
    clusterLabel: "SPIDER-VERSE WEB",
    phaseIntroduced: 4,
    x: 4500,
    y: 1160,
    characterId: "green-goblin",
    bio: "'Gods don't have to choose... we take.' Corrupted by Goblin Serum, murdered Aunt May."
  },
  {
    id: "doc-ock",
    name: "OTTO OCTAVIUS",
    subtitle: "Doctor Octopus",
    photoUrl: "/images/characters/doc-ock.jpg",
    cluster: "spiders",
    clusterLabel: "SPIDER-VERSE WEB",
    phaseIntroduced: 4,
    x: 4280,
    y: 1160,
    characterId: "doc-ock",
    bio: "'The power of the sun in the palm of my hand.' Cured inhibitor chip by Peter Parker."
  },

  // ==========================================
  // 12. THE WAKANDAN ROYAL DYNASTY
  // ==========================================
  {
    id: "tchaka",
    name: "KING T'CHAKA",
    subtitle: "Former Black Panther",
    photoUrl: "/images/characters/tchaka.jpg",
    cluster: "wakanda",
    clusterLabel: "WAKANDA ROYAL HOUSE",
    phaseIntroduced: 3,
    x: 4120,
    y: 120,
    bio: "King of Wakanda who concealed vibranium from the world and fathered T'Challa and Shuri."
  },
  {
    id: "ramonda",
    name: "QUEEN RAMONDA",
    subtitle: "Queen Mother",
    photoUrl: "/images/characters/ramonda.jpg",
    cluster: "wakanda",
    clusterLabel: "WAKANDA ROYAL HOUSE",
    phaseIntroduced: 3,
    x: 4340,
    y: 120,
    bio: "Fierce queen mother who defended Wakanda against world governments and Namor's Talokan invasion."
  },
  {
    id: "tchalla",
    name: "KING T'CHALLA",
    subtitle: "Black Panther",
    photoUrl: "/images/characters/tchalla.jpg",
    cluster: "wakanda",
    clusterLabel: "WAKANDA ROYAL HOUSE",
    phaseIntroduced: 3,
    x: 4120,
    y: 340,
    characterId: "black-panther",
    bio: "Beloved protector and visionary ruler who opened Wakanda's borders and fought Thanos' armies."
  },
  {
    id: "nakia",
    name: "NAKIA",
    subtitle: "War Dog / Mother",
    photoUrl: "/images/characters/nakia.jpg",
    cluster: "wakanda",
    clusterLabel: "WAKANDA ROYAL HOUSE",
    phaseIntroduced: 3,
    x: 4340,
    y: 340,
    bio: "Covert War Dog spy who bore T'Challa's secret heir, Prince Toussaint, in Haiti."
  },
  {
    id: "shuri",
    name: "SHURI",
    subtitle: "Black Panther II",
    photoUrl: "/images/characters/shuri.jpg",
    cluster: "wakanda",
    clusterLabel: "WAKANDA ROYAL HOUSE",
    phaseIntroduced: 3,
    x: 4560,
    y: 340,
    bio: "Genius tech innovator who recreated the synthetic Heart-Shaped Herb to claim the Black Panther mantle."
  },
  {
    id: "killmonger",
    name: "N'JADAKA / KILLMONGER",
    subtitle: "Usurper King",
    photoUrl: "/images/characters/killmonger.jpg",
    cluster: "wakanda",
    clusterLabel: "WAKANDA ROYAL HOUSE",
    phaseIntroduced: 3,
    x: 3900,
    y: 340,
    bio: "Exiled nephew of T'Chaka who challenged for the throne and radicalized Wakanda's foreign policy."
  },
  {
    id: "toussaint",
    name: "PRINCE TOUSSAINT",
    subtitle: "T'Challa II",
    photoUrl: "/images/characters/toussaint.jpg",
    cluster: "wakanda",
    clusterLabel: "WAKANDA ROYAL HOUSE",
    phaseIntroduced: 4,
    x: 4230,
    y: 560,
    bio: "Son of King T'Challa raised peacefully by Nakia in Haiti, carrying the royal Panther bloodline."
  },
  {
    id: "namor",
    name: "NAMOR",
    subtitle: "K'uk'ulkan / Talokan King",
    photoUrl: "/images/characters/namor.jpg",
    cluster: "wakanda",
    clusterLabel: "WAKANDA ROYAL HOUSE",
    phaseIntroduced: 4,
    x: 4780,
    y: 340,
    bio: "Feathered serpent mutant god and underwater monarch of Talokan forged by vibranium evolution."
  },

  // ==========================================
  // 13. MASTERS OF THE MYSTIC ARTS (KAMAR-TAJ)
  // ==========================================
  {
    id: "ancient-one",
    name: "THE ANCIENT ONE",
    subtitle: "Sorcerer Supreme",
    photoUrl: "/images/characters/ancient-one.jpg",
    cluster: "mystic",
    clusterLabel: "MASTERS OF MYSTIC ARTS",
    phaseIntroduced: 3,
    x: 360,
    y: 1040,
    bio: "Centuries-old Celtic sorceress who drew power from the Dark Dimension to safeguard Earth."
  },
  {
    id: "doctor-strange",
    name: "STEPHEN STRANGE",
    subtitle: "Master of Black Magic",
    photoUrl: "/images/characters/doctor-strange.jpg",
    cluster: "mystic",
    clusterLabel: "MASTERS OF MYSTIC ARTS",
    phaseIntroduced: 3,
    x: 360,
    y: 1260,
    characterId: "doctor-strange",
    bio: "Former neurosurgeon who wielded the Time Stone, saw 14,000,605 futures, and now navigates the Dark Dimension."
  },
  {
    id: "wong",
    name: "WONG",
    subtitle: "Sorcerer Supreme",
    photoUrl: "/images/characters/wong.jpg",
    cluster: "mystic",
    clusterLabel: "MASTERS OF MYSTIC ARTS",
    phaseIntroduced: 3,
    x: 140,
    y: 1260,
    bio: "Librarian of Kamar-Taj who ascended to Sorcerer Supreme during the 5-year Blip."
  },
  {
    id: "america-chavez",
    name: "AMERICA CHAVEZ",
    subtitle: "Star Portal Prodigy",
    photoUrl: "/images/characters/america-chavez.jpg",
    cluster: "mystic",
    clusterLabel: "MASTERS OF MYSTIC ARTS",
    phaseIntroduced: 4,
    x: 360,
    y: 1480,
    bio: "Unique multiversal traveler born in the Utopian Parallel capable of punching star portals across realities."
  },
  {
    id: "clea",
    name: "CLEA",
    subtitle: "Dark Dimension Sorceress",
    photoUrl: "/images/characters/clea.jpg",
    cluster: "mystic",
    clusterLabel: "MASTERS OF MYSTIC ARTS",
    phaseIntroduced: 4,
    x: 580,
    y: 1260,
    bio: "Niece of Dormammu who enlisted Doctor Strange to fix an impending Multiversal Incursion."
  },

  // ==========================================
  // 14. THE TEN RINGS & TA LO DYNASTY
  // ==========================================
  {
    id: "xu-wenwu",
    name: "XU WENWU",
    subtitle: "The Mandarin / Ten Rings",
    photoUrl: "/images/characters/xu-wenwu.jpg",
    cluster: "tenrings",
    clusterLabel: "TEN RINGS & TA LO",
    phaseIntroduced: 4,
    x: 4820,
    y: 1040,
    characterId: "wenwu",
    bio: "Thousand-year-old warlord wielding the immortal Ten Rings who fell in love with Ying Li of Ta Lo."
  },
  {
    id: "ying-li",
    name: "YING LI",
    subtitle: "Guardian of Ta Lo",
    photoUrl: "/images/characters/ying-li.jpg",
    cluster: "tenrings",
    clusterLabel: "TEN RINGS & TA LO",
    phaseIntroduced: 4,
    x: 5040,
    y: 1040,
    bio: "Master martial artist empowered by the Great Protector dragon who relinquished immortality for family."
  },
  {
    id: "shang-chi",
    name: "SHANG-CHI",
    subtitle: "Master of Kung Fu",
    photoUrl: "/images/characters/shang-chi.jpg",
    cluster: "tenrings",
    clusterLabel: "TEN RINGS & TA LO",
    phaseIntroduced: 4,
    x: 4820,
    y: 1260,
    bio: "Mastered the dragon style and inherited the Ten Rings, unlocking a cosmic homing beacon."
  },
  {
    id: "xu-xialing",
    name: "XU XIALING",
    subtitle: "Leader of the Ten Rings",
    photoUrl: "/images/characters/xu-xialing.jpg",
    cluster: "tenrings",
    clusterLabel: "TEN RINGS & TA LO",
    phaseIntroduced: 4,
    x: 5040,
    y: 1260,
    bio: "Founder of the Golden Daggers Club who restructured the Ten Rings army under modern leadership."
  },

  // ==========================================
  // 15. GUARDIANS & RAVAGERS
  // ==========================================
  {
    id: "yondu-udonta",
    name: "YONDU UDONTA",
    subtitle: "Ravager Captain",
    photoUrl: "/images/characters/yondu-udonta.jpg",
    cluster: "guardians",
    clusterLabel: "GUARDIANS & RAVAGERS",
    phaseIntroduced: 2,
    x: 4120,
    y: 1880,
    bio: "'He may have been your father, boy, but he wasn't your daddy.' Yaka arrow master who saved Peter Quill."
  },
  {
    id: "rocket-raccoon",
    name: "ROCKET RACCOON",
    subtitle: "Subject 89P13",
    photoUrl: "/images/characters/rocket-raccoon.jpg",
    cluster: "guardians",
    clusterLabel: "GUARDIANS & RAVAGERS",
    phaseIntroduced: 2,
    x: 4340,
    y: 1880,
    bio: "Genetically cyber-engineered pilot who conquered his trauma to lead the new Guardians of the Galaxy."
  },
  {
    id: "groot",
    name: "GROOT",
    subtitle: "Flora Colossus",
    photoUrl: "/images/characters/groot.jpg",
    cluster: "guardians",
    clusterLabel: "GUARDIANS & RAVAGERS",
    phaseIntroduced: 2,
    x: 4560,
    y: 1880,
    bio: "'We are Groot.' Loyal tree-like protector with infinite regenerative limb-growth abilities."
  },
  {
    id: "drax",
    name: "DRAX THE DESTROYER",
    subtitle: "The Destroyer",
    photoUrl: "/images/characters/drax.jpg",
    cluster: "guardians",
    clusterLabel: "GUARDIANS & RAVAGERS",
    phaseIntroduced: 2,
    x: 4780,
    y: 1880,
    bio: "Kylosian warrior who avenged his slain family and found peace as a father on Knowhere."
  },
  {
    id: "mantis",
    name: "MANTIS",
    subtitle: "Empathic Sister",
    photoUrl: "/images/characters/mantis.jpg",
    cluster: "guardians",
    clusterLabel: "GUARDIANS & RAVAGERS",
    phaseIntroduced: 3,
    x: 5000,
    y: 1880,
    bio: "Empath daughter of Ego and half-sister of Peter Quill who controls cosmic feelings and minds."
  },

  // ==========================================
  // 16. STREET LEVEL DEFENDERS & UNDERWORLD
  // ==========================================
  {
    id: "matt-murdock",
    name: "MATT MURDOCK",
    subtitle: "Daredevil",
    photoUrl: "/images/characters/matt-murdock.jpg",
    cluster: "defenders",
    clusterLabel: "DEFENDERS & UNDERWORLD",
    phaseIntroduced: 4,
    x: 3220,
    y: 1880,
    characterId: "daredevil",
    bio: "Blind attorney with hyper-sensory radar perception who protects Hell's Kitchen as the Devil of New York."
  },
  {
    id: "wilson-fisk",
    name: "WILSON FISK",
    subtitle: "Kingpin / NYC Mayor",
    photoUrl: "/images/characters/wilson-fisk.jpg",
    cluster: "defenders",
    clusterLabel: "DEFENDERS & UNDERWORLD",
    phaseIntroduced: 4,
    x: 3440,
    y: 1880,
    characterId: "kingpin",
    bio: "Ruthless criminal syndicate overlord who weaponized political power to outlaw vigilantes in NYC."
  },
  {
    id: "frank-castle",
    name: "FRANK CASTLE",
    subtitle: "The Punisher",
    photoUrl: "/images/characters/frank-castle.jpg",
    cluster: "defenders",
    clusterLabel: "DEFENDERS & UNDERWORLD",
    phaseIntroduced: 5,
    x: 3220,
    y: 2100,
    bio: "Lethal vigilante executing criminal operations with relentless tactical warfare."
  },
  {
    id: "maya-lopez",
    name: "MAYA LOPEZ",
    subtitle: "Echo",
    photoUrl: "/images/characters/maya-lopez.jpg",
    cluster: "defenders",
    clusterLabel: "DEFENDERS & UNDERWORLD",
    phaseIntroduced: 5,
    x: 3440,
    y: 2100,
    bio: "Deaf Choctaw warrior empowered by ancestral spirits who healed Wilson Fisk's childhood trauma."
  },

  // ==========================================
  // 17. ETERNALS OF EARTH
  // ==========================================
  {
    id: "ajak",
    name: "AJAK",
    subtitle: "Prime Eternal Leader",
    photoUrl: "/images/characters/ajak.jpg",
    cluster: "eternals",
    clusterLabel: "ETERNALS OF EARTH",
    phaseIntroduced: 4,
    x: 2000,
    y: 2460,
    bio: "Communicator with the Celestial Arishem who chose to protect humanity rather than allow the Emergence."
  },
  {
    id: "ikaris",
    name: "IKARIS",
    subtitle: "Prime Celestial Enforcer",
    photoUrl: "/images/characters/ikaris.jpg",
    cluster: "eternals",
    clusterLabel: "ETERNALS OF EARTH",
    phaseIntroduced: 4,
    x: 2520,
    y: 2680,
    bio: "Cosmic energy optic blast warrior who flew into the sun out of grief over betraying his family."
  },
  {
    id: "sersi",
    name: "SERSI",
    subtitle: "Matter Transmutation Prime",
    photoUrl: "/images/characters/sersi.jpg",
    cluster: "eternals",
    clusterLabel: "ETERNALS OF EARTH",
    phaseIntroduced: 4,
    x: 2260,
    y: 2680,
    bio: "Empathetic matter-transmuter who turned the emerging Celestial Tiamut into marble to save Earth."
  },
  {
    id: "thena",
    name: "THENA",
    subtitle: "Goddess of War",
    photoUrl: "/images/characters/thena.jpg",
    cluster: "eternals",
    clusterLabel: "ETERNALS OF EARTH",
    phaseIntroduced: 4,
    x: 2780,
    y: 2680,
    bio: "Master warrior suffering from Mahd Wy'ry memory overload who fights to liberate all Eternals."
  },
  {
    id: "gilgamesh",
    name: "GILGAMESH",
    subtitle: "Strongest Eternal",
    photoUrl: "/images/characters/gilgamesh.jpg",
    cluster: "eternals",
    clusterLabel: "ETERNALS OF EARTH",
    phaseIntroduced: 4,
    x: 3040,
    y: 2680,
    bio: "Gentle powerhouse who guarded Thena for centuries before falling to the Deviant Kro."
  },

  // ==========================================
  // 18. MYSTERY NODES / UNKNOWN PARADOXES
  // (Like the blank '?' portraits in Dark tree)
  // ==========================================
  {
    id: "mystery-secret-wars",
    name: "?",
    subtitle: "Multiversal Incursion Anchor",
    isMystery: true,
    cluster: "richards",
    clusterLabel: "UNKNOWN CAUSAL LOOPS",
    phaseIntroduced: 6,
    x: 960,
    y: 1880,
    bio: "Quantum entanglement shielded by temporal encryption until Battleworld convergence."
  },
  {
    id: "mystery-asgard-void",
    name: "?",
    subtitle: "Forgotten Asgardian Branch",
    isMystery: true,
    cluster: "asgard",
    clusterLabel: "UNKNOWN CAUSAL LOOPS",
    phaseIntroduced: 5,
    x: 800,
    y: 780,
    bio: "Unpruned reality branch adrift at the edge of the Multiverse Tree."
  }
];

// ---------------------------------------------------------------------------
// ORTHOGONAL LINEAGE CONNECTIONS
// (Strict 90-degree lines connecting nodes with marriage junctions & arrows)
// ---------------------------------------------------------------------------

export const DARK_TREE_CONNECTIONS: OrthogonalConnection[] = [
  // --- ASGARDIAN ROYAL DYNASTY ---
  // Bor -> Odin
  { id: "c_bor_odin", fromId: "bor", toId: "odin", type: "child", phaseRevealed: 2, hasArrow: true, arrowDir: "down" },
  // Odin + Frigga (Partnership)
  {
    id: "c_odin_frigga",
    fromId: "odin",
    toId: "frigga",
    type: "partner",
    phaseRevealed: 1,
  },
  // Odin+Frigga -> Thor
  { id: "c_parents_thor", fromId: "odin", toId: "thor", type: "child", phaseRevealed: 1, hasArrow: true, arrowDir: "down" },
  // Odin+Frigga -> Hela (Firstborn)
  { id: "c_odin_hela", fromId: "odin", toId: "hela", type: "child", phaseRevealed: 3, hasArrow: true, arrowDir: "down" },
  // Laufey -> Loki (Biological Lineage)
  { id: "c_laufey_loki", fromId: "laufey", toId: "loki", type: "child", label: "Biological", phaseRevealed: 1, hasArrow: true, arrowDir: "down" },
  // Thor + Jane Foster
  {
    id: "c_thor_jane",
    fromId: "thor",
    toId: "jane-foster",
    type: "partner",
    phaseRevealed: 1,
  },
  // Thor+Jane -> Love (Adopted Cosmic Child)
  { id: "c_thor_love", fromId: "thor", toId: "love", type: "child", label: "Adopted", phaseRevealed: 4, hasArrow: true, arrowDir: "down" },
  // Loki <-> Sylvie (Multiversal Variant & Paradox)
  { id: "c_loki_sylvie", fromId: "loki", toId: "sylvie", type: "variant", label: "Variant", phaseRevealed: 4, hasArrow: true, arrowDir: "right" },

  // --- STARK DYNASTY ---
  // Howard + Maria
  {
    id: "c_howard_maria",
    fromId: "howard-stark",
    toId: "maria-stark",
    type: "partner",
    phaseRevealed: 1,
  },
  // Howard+Maria -> Tony Stark
  { id: "c_howard_tony", fromId: "howard-stark", toId: "tony-stark", type: "child", phaseRevealed: 1, hasArrow: true, arrowDir: "down" },
  // Tony + Pepper Potts
  {
    id: "c_tony_pepper",
    fromId: "tony-stark",
    toId: "pepper-potts",
    type: "partner",
    phaseRevealed: 1,
  },
  // Tony+Pepper -> Morgan Stark
  { id: "c_tony_morgan", fromId: "tony-stark", toId: "morgan-stark", type: "child", phaseRevealed: 3, hasArrow: true, arrowDir: "down" },
  // Tony -> Peter Parker (Mentor / Surrogate Father)
  { id: "c_tony_peter", fromId: "tony-stark", toId: "peter-parker", type: "mentor", label: "Mentor", phaseRevealed: 3, hasArrow: true, arrowDir: "down" },
  // Aunt May -> Peter Parker
  { id: "c_may_peter", fromId: "may-parker", toId: "peter-parker", type: "child", label: "Guardian", phaseRevealed: 3, hasArrow: true, arrowDir: "down" },

  // --- SUPER SOLDIER COVENANT ---
  // Erskine -> Steve Rogers
  { id: "c_erskine_steve", fromId: "abraham-erskine", toId: "steve-rogers", type: "creator", label: "Serum", phaseRevealed: 1, hasArrow: true, arrowDir: "down" },
  // Erskine -> Red Skull (Failed prototype)
  { id: "c_erskine_skull", fromId: "abraham-erskine", toId: "red-skull", type: "creator", label: "Prototype", phaseRevealed: 1, hasArrow: true, arrowDir: "down" },
  // Steve + Peggy Carter
  {
    id: "c_steve_peggy",
    fromId: "steve-rogers",
    toId: "peggy-carter",
    type: "partner",
    phaseRevealed: 1,
  },
  // Bucky Barnes <-> Steve Rogers (Brothers in Arms)
  { id: "c_steve_bucky", fromId: "bucky-barnes", toId: "steve-rogers", type: "variant", label: "Brothers in Arms", phaseRevealed: 1, hasArrow: false },
  // Steve -> Sam Wilson (Shield Inheritor)
  { id: "c_steve_sam", fromId: "steve-rogers", toId: "sam-wilson", type: "mentor", label: "Shield Mantle", phaseRevealed: 3, hasArrow: true, arrowDir: "down" },

  // --- MAXIMOFF BLOODLINE ---
  // Oleg + Iryna Maximoff
  {
    id: "c_oleg_iryna",
    fromId: "oleg-maximoff",
    toId: "iryna-maximoff",
    type: "partner",
    phaseRevealed: 4,
  },
  // Parents -> Wanda
  { id: "c_parents_wanda", fromId: "oleg-maximoff", toId: "wanda-maximoff", type: "child", phaseRevealed: 2, hasArrow: true, arrowDir: "down" },
  // Parents -> Pietro
  { id: "c_parents_pietro", fromId: "oleg-maximoff", toId: "pietro-maximoff", type: "child", phaseRevealed: 2, hasArrow: true, arrowDir: "down" },
  // Wanda + Vision
  {
    id: "c_wanda_vision",
    fromId: "wanda-maximoff",
    toId: "vision",
    type: "partner",
    phaseRevealed: 3,
  },
  // Vision <-> White Vision (Memory Restoration Paradox)
  { id: "c_vision_white", fromId: "vision", toId: "white-vision", type: "variant", label: "Theseus", phaseRevealed: 4, hasArrow: true, arrowDir: "right" },
  // Wanda+Vision -> Billy
  { id: "c_wanda_billy", fromId: "wanda-maximoff", toId: "billy-maximoff", type: "child", phaseRevealed: 4, hasArrow: true, arrowDir: "down" },
  // Wanda+Vision -> Tommy
  { id: "c_wanda_tommy", fromId: "wanda-maximoff", toId: "tommy-maximoff", type: "child", phaseRevealed: 4, hasArrow: true, arrowDir: "down" },
  // Agatha -> Billy (Witches Road Mentor)
  { id: "c_agatha_billy", fromId: "agatha-harkness", toId: "billy-maximoff", type: "mentor", label: "Coven", phaseRevealed: 5, hasArrow: true, arrowDir: "right" },

  // --- PYM-LANG QUANTUM TREE ---
  // Hank + Janet
  {
    id: "c_hank_janet",
    fromId: "hank-pym",
    toId: "janet-van-dyne",
    type: "partner",
    phaseRevealed: 2,
  },
  // Hank+Janet -> Hope van Dyne
  { id: "c_hank_hope", fromId: "hank-pym", toId: "hope-van-dyne", type: "child", phaseRevealed: 2, hasArrow: true, arrowDir: "down" },
  // Hope + Scott Lang
  {
    id: "c_hope_scott",
    fromId: "hope-van-dyne",
    toId: "scott-lang",
    type: "partner",
    phaseRevealed: 2,
  },
  // Scott Lang -> Cassie Lang
  { id: "c_scott_cassie", fromId: "scott-lang", toId: "cassie-lang", type: "child", phaseRevealed: 2, hasArrow: true, arrowDir: "down" },

  // --- KANG DYNASTY & TVA ---
  // Nathaniel Richards -> He Who Remains
  { id: "c_nathaniel_hwr", fromId: "nathaniel-richards", toId: "he-who-remains", type: "variant", phaseRevealed: 4, hasArrow: true, arrowDir: "down" },
  // He Who Remains -> Kang Conqueror
  { id: "c_hwr_conqueror", fromId: "he-who-remains", toId: "kang-the-conqueror", type: "variant", phaseRevealed: 5, hasArrow: true, arrowDir: "right" },
  // He Who Remains -> Victor Timely
  { id: "c_hwr_timely", fromId: "he-who-remains", toId: "victor-timely", type: "variant", phaseRevealed: 5, hasArrow: true, arrowDir: "right" },
  // He Who Remains -> Immortus
  { id: "c_hwr_immortus", fromId: "he-who-remains", toId: "immortus", type: "variant", phaseRevealed: 5, hasArrow: true, arrowDir: "down" },
  // He Who Remains -> Ravonna Renslayer
  { id: "c_hwr_ravonna", fromId: "he-who-remains", toId: "ravonna-renslayer", type: "mentor", label: "TVA Founder", phaseRevealed: 4, hasArrow: true, arrowDir: "down" },

  // --- FANTASTIC FOUR & LATVERIA ---
  // Reed + Sue
  {
    id: "c_reed_sue",
    fromId: "reed-richards",
    toId: "sue-storm",
    type: "partner",
    phaseRevealed: 4,
  },
  // Sue + Johnny (Siblings)
  { id: "c_sue_johnny", fromId: "sue-storm", toId: "johnny-storm", type: "variant", label: "Siblings", phaseRevealed: 5, hasArrow: false },
  // Reed + Ben (Best Friends)
  { id: "c_reed_ben", fromId: "reed-richards", toId: "ben-grimm", type: "variant", label: "Founding", phaseRevealed: 6, hasArrow: false },
  // Reed+Sue -> Franklin Richards
  { id: "c_reed_franklin", fromId: "reed-richards", toId: "franklin-richards", type: "child", phaseRevealed: 6, hasArrow: true, arrowDir: "down" },
  // Reed <-> Doctor Doom (Eternal Rivals)
  { id: "c_reed_doom", fromId: "reed-richards", toId: "doctor-doom", type: "enemy", label: "Rivalry", phaseRevealed: 6, hasArrow: true, arrowDir: "down" },

  // --- MUTANTS & X-MEN ---
  // Xavier <-> Magneto
  {
    id: "c_charles_erik",
    fromId: "charles-xavier",
    toId: "erik-lehnsherr",
    type: "variant",
    label: "Mutant Founders",
    phaseRevealed: 4,
    hasArrow: false
  },
  // Wolverine -> Laura / X-23 (Genetic Daughter)
  { id: "c_logan_laura", fromId: "wolverine", toId: "x-23", type: "child", label: "Genetic Daughter", phaseRevealed: 5, hasArrow: true, arrowDir: "down" },
  // Wolverine + Deadpool (Anchor Duo)
  { id: "c_logan_deadpool", fromId: "wolverine", toId: "deadpool", type: "variant", label: "Anchor Beings", phaseRevealed: 5, hasArrow: false },
  // Deadpool <-> Gambit (Void Survivors)
  { id: "c_laura_gambit", fromId: "deadpool", toId: "gambit", type: "variant", label: "Void Resistance", phaseRevealed: 5, hasArrow: false },

  // --- RED ROOM SISTERHOOD ---
  // Dreykov -> Melina & Alexei
  { id: "c_dreykov_melina", fromId: "dreykov", toId: "melina-vostokoff", type: "creator", phaseRevealed: 4, hasArrow: true, arrowDir: "right" },
  // Melina + Alexei
  {
    id: "c_melina_alexei",
    fromId: "melina-vostokoff",
    toId: "alexei-shostakov",
    type: "partner",
    phaseRevealed: 4,
  },
  // Melina+Alexei -> Natasha
  { id: "c_parents_natasha", fromId: "melina-vostokoff", toId: "natasha-romanoff", type: "child", label: "Surrogate", phaseRevealed: 4, hasArrow: true, arrowDir: "down" },
  // Melina+Alexei -> Yelena
  { id: "c_parents_yelena", fromId: "melina-vostokoff", toId: "yelena-belova", type: "child", label: "Surrogate", phaseRevealed: 4, hasArrow: true, arrowDir: "down" },
  // Natasha <-> Yelena (Sisters)
  { id: "c_natasha_yelena", fromId: "natasha-romanoff", toId: "yelena-belova", type: "variant", label: "Sisters", phaseRevealed: 4, hasArrow: false },

  // --- COSMIC TITAN DYNASTY ---
  // A'Lars -> Thanos
  { id: "c_alars_thanos", fromId: "alars", toId: "thanos", type: "child", phaseRevealed: 3, hasArrow: true, arrowDir: "down" },
  // A'Lars -> Eros
  { id: "c_alars_eros", fromId: "alars", toId: "eros", type: "child", phaseRevealed: 4, hasArrow: true, arrowDir: "down" },
  // Thanos -> Gamora (Adopted)
  { id: "c_thanos_gamora", fromId: "thanos", toId: "gamora", type: "child", label: "Adopted", phaseRevealed: 2, hasArrow: true, arrowDir: "down" },
  // Thanos -> Nebula (Adopted)
  { id: "c_thanos_nebula", fromId: "thanos", toId: "nebula", type: "child", label: "Adopted", phaseRevealed: 2, hasArrow: true, arrowDir: "down" },
  // Ego -> Peter Quill
  { id: "c_ego_quill", fromId: "ego", toId: "peter-quill", type: "child", label: "Celestial Son", phaseRevealed: 3, hasArrow: true, arrowDir: "down" },
  // Peter Quill + Gamora
  {
    id: "c_quill_gamora",
    fromId: "peter-quill",
    toId: "gamora",
    type: "partner",
    phaseRevealed: 2,
  },

  // --- WAKANDAN ROYAL DYNASTY ---
  // T'Chaka + Ramonda
  {
    id: "c_tchaka_ramonda",
    fromId: "tchaka",
    toId: "ramonda",
    type: "partner",
    phaseRevealed: 3,
  },
  // T'Chaka -> T'Challa
  { id: "c_tchaka_tchalla", fromId: "tchaka", toId: "tchalla", type: "child", phaseRevealed: 3, hasArrow: true, arrowDir: "down" },
  // T'Chaka -> Shuri
  { id: "c_tchaka_shuri", fromId: "tchaka", toId: "shuri", type: "child", phaseRevealed: 3, hasArrow: true, arrowDir: "down" },
  // T'Challa + Nakia
  {
    id: "c_tchalla_nakia",
    fromId: "tchalla",
    toId: "nakia",
    type: "partner",
    phaseRevealed: 3,
  },
  // T'Challa+Nakia -> Toussaint (T'Challa II)
  { id: "c_tchalla_toussaint", fromId: "tchalla", toId: "toussaint", type: "child", phaseRevealed: 4, hasArrow: true, arrowDir: "down" },
  // T'Chaka -> Killmonger (Uncle / Bloodline)
  { id: "c_tchaka_killmonger", fromId: "tchaka", toId: "killmonger", type: "child", label: "Nephew", phaseRevealed: 3, hasArrow: true, arrowDir: "down" },
  // Shuri <-> Namor (Alliance / Rivals)
  { id: "c_shuri_namor", fromId: "shuri", toId: "namor", type: "variant", label: "Truce", phaseRevealed: 4, hasArrow: false },

  // --- MASTERS OF THE MYSTIC ARTS ---
  // Ancient One -> Stephen Strange
  { id: "c_ancient_strange", fromId: "ancient-one", toId: "doctor-strange", type: "mentor", label: "Sorcerer Mantle", phaseRevealed: 3, hasArrow: true, arrowDir: "down" },
  // Strange <-> Wong
  { id: "c_strange_wong", fromId: "doctor-strange", toId: "wong", type: "variant", label: "Supreme Ally", phaseRevealed: 3, hasArrow: false },
  // Strange -> America Chavez
  { id: "c_strange_america", fromId: "doctor-strange", toId: "america-chavez", type: "mentor", label: "Multiverse Mentor", phaseRevealed: 4, hasArrow: true, arrowDir: "down" },
  // Strange + Clea
  { id: "c_strange_clea", fromId: "doctor-strange", toId: "clea", type: "partner", label: "Incursion Team", phaseRevealed: 4, hasArrow: true, arrowDir: "down" },

  // --- TEN RINGS & TA LO ---
  // Xu Wenwu + Ying Li
  {
    id: "c_wenwu_yingli",
    fromId: "xu-wenwu",
    toId: "ying-li",
    type: "partner",
    phaseRevealed: 4,
  },
  // Wenwu+Ying Li -> Shang-Chi
  { id: "c_parents_shangchi", fromId: "xu-wenwu", toId: "shang-chi", type: "child", phaseRevealed: 4, hasArrow: true, arrowDir: "down" },
  // Wenwu+Ying Li -> Xu Xialing
  { id: "c_parents_xialing", fromId: "xu-wenwu", toId: "xu-xialing", type: "child", phaseRevealed: 4, hasArrow: true, arrowDir: "down" },

  // --- GUARDIANS & RAVAGERS ---
  // Yondu -> Peter Quill
    // Rocket + Groot
  { id: "c_rocket_groot", fromId: "rocket-raccoon", toId: "groot", type: "variant", label: "Brothers", phaseRevealed: 2, hasArrow: false },
  // Drax + Mantis
  { id: "c_drax_mantis", fromId: "drax", toId: "mantis", type: "variant", label: "Best Friends", phaseRevealed: 3, hasArrow: false },
  // Ego -> Mantis (Empath Daughter)
  
  // --- DEFENDERS & UNDERWORLD ---
  // Matt Murdock <-> Wilson Fisk
  { id: "c_matt_fisk", fromId: "matt-murdock", toId: "wilson-fisk", type: "enemy", label: "Arch-Nemesis", phaseRevealed: 4, hasArrow: true, arrowDir: "right" },
  // Matt Murdock -> Frank Castle
  { id: "c_matt_frank", fromId: "matt-murdock", toId: "frank-castle", type: "mentor", label: "Vigilante Code", phaseRevealed: 5, hasArrow: true, arrowDir: "down" },
  // Wilson Fisk -> Maya Lopez
  { id: "c_fisk_maya", fromId: "wilson-fisk", toId: "maya-lopez", type: "mentor", label: "Surrogate Uncle", phaseRevealed: 5, hasArrow: true, arrowDir: "down" },

  // --- ETERNALS OF EARTH ---
  // Ajak -> Ikaris & Sersi
  { id: "c_ajak_ikaris", fromId: "ajak", toId: "ikaris", type: "child", label: "Prime", phaseRevealed: 4, hasArrow: true, arrowDir: "right" },
  // Ikaris + Sersi (5,000 Year Bond)
  {
    id: "c_ikaris_sersi",
    fromId: "ikaris",
    toId: "sersi",
    type: "partner",
    phaseRevealed: 4,
  },
  // Thena + Gilgamesh
  {
    id: "c_thena_gilgamesh",
    fromId: "thena",
    toId: "gilgamesh",
    type: "partner",
    label: "Eternal Protectors",
    phaseRevealed: 4,
  }
];

export const DYNASTY_CLUSTERS = [
  { id: "all", label: "ALL FAMILIES", count: DARK_TREE_NODES.length },
  { id: "asgard", label: "HOUSE OF ODIN", count: 10, focusX: 380, focusY: 400 },
  { id: "stark", label: "STARK DYNASTY", count: 7, focusX: 980, focusY: 330 },
  { id: "rogers", label: "SUPER SOLDIERS", count: 6, focusX: 1390, focusY: 330 },
  { id: "maximoff", label: "MAXIMOFF LINEAGE", count: 9, focusX: 680, focusY: 960 },
  { id: "pym", label: "PYM-LANG QUANTUM", count: 5, focusX: 1320, focusY: 960 },
  { id: "wakanda", label: "WAKANDA ROYAL HOUSE", count: 8, focusX: 2750, focusY: 330 },
  { id: "mystic", label: "MASTERS OF MYSTIC ARTS", count: 5, focusX: 260, focusY: 960 },
  { id: "tenrings", label: "TEN RINGS & TA LO", count: 4, focusX: 2780, focusY: 870 },
  { id: "kang", label: "KANG DYNASTY & TVA", count: 6, focusX: 340, focusY: 1530 },
  { id: "richards", label: "FANTASTIC FOUR & DOOM", count: 7, focusX: 1030, focusY: 1440 },
  { id: "mutants", label: "MUTANT BLOODLINES", count: 6, focusX: 1680, focusY: 1530 },
  { id: "romanoff", label: "RED ROOM SISTERHOOD", count: 5, focusX: 1800, focusY: 870 },
  { id: "cosmic", label: "COSMIC DYNASTIES", count: 7, focusX: 2130, focusY: 330 },
  { id: "guardians", label: "GUARDIANS & RAVAGERS", count: 5, focusX: 2700, focusY: 1440 },
  { id: "defenders", label: "DEFENDERS & STREET", count: 4, focusX: 2130, focusY: 1440 },
  { id: "eternals", label: "ETERNALS OF EARTH", count: 5, focusX: 1820, focusY: 1950 },
  { id: "spiders", label: "SPIDER-VERSE WEB", count: 4, focusX: 2230, focusY: 890 }
] as const;

