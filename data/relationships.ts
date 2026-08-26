export type RelationshipType =
  | "family"
  | "romance"
  | "alliance"
  | "enemy"
  | "variant"
  | "mentor"
  | "creator"
  | "killed_by"
  | "relic_bearer";

export type RelationshipEdge = {
  id: string;
  source: string;
  target: string;
  type: RelationshipType;
  label: string;
  phaseRevealed: number;
  description: string;
};

export const RELATIONSHIPS: RelationshipEdge[] = [

  { id: "r1", source: "thor", target: "loki", type: "family", label: "Adoptive Brother", phaseRevealed: 1, description: "Raised as brothers in Asgard, torn apart by jealousy and the truth of Loki's Frost Giant bloodline." },
  { id: "r2", source: "loki", target: "thor", type: "enemy", label: "Betrayed / Rival", phaseRevealed: 1, description: "Loki attempted to destroy Jotunheim and later invaded Earth to prove superiority over Thor." },
  { id: "r3", source: "captain-america", target: "bucky-barnes", type: "family", label: "Lifelong Brotherhood", phaseRevealed: 1, description: "Childhood best friends from Brooklyn who fought together in the Howling Commandos." },
  { id: "r4", source: "captain-america", target: "peggy-carter", type: "romance", label: "Eternal Love", phaseRevealed: 1, description: "Promised a dance before Steve plunged the Valkyrie into the ice in 1945." },
  { id: "r5", source: "iron-man", target: "captain-america", type: "alliance", label: "Founding Avengers Co-Leaders", phaseRevealed: 1, description: "United under S.H.I.E.L.D. to repel the Chitauri Invasion in the Battle of New York." },
  { id: "r6", source: "black-widow", target: "hawkeye", type: "alliance", label: "Budapest Comrades", phaseRevealed: 1, description: "Deep covert bond built on mutual redemption and Clint sparing Natasha's life." },
  { id: "r7", source: "iron-man", target: "space-stone", type: "relic_bearer", label: "Carried Missile into Tesseract Portal", phaseRevealed: 1, description: "Tony flew the nuclear missile through the Tesseract wormhole to destroy the Chitauri mothership." },
  { id: "r8", source: "loki", target: "space-stone", type: "relic_bearer", label: "Wielded Tesseract", phaseRevealed: 1, description: "Used the Tesseract given by Thanos to open a cosmic portal to Earth." },
  { id: "r9", source: "loki", target: "mind-stone", type: "relic_bearer", label: "Wielded Chitauri Scepter", phaseRevealed: 1, description: "Carried the blue scepter concealing the yellow Mind Stone to subjugate minds." },

  { id: "r10", source: "captain-america", target: "winter-soldier", type: "enemy", label: "Brainwashed Ghost", phaseRevealed: 2, description: "Steve discovers his presumed-dead friend Bucky is Hydra's assassin, the Winter Soldier." },
  { id: "r11", source: "iron-man", target: "vision", type: "creator", label: "Synthesized Mind & Vibranium", phaseRevealed: 2, description: "Tony Stark and Bruce Banner uploaded J.A.R.V.I.S. into the synthetic body powered by the Mind Stone." },
  { id: "r12", source: "vision", target: "mind-stone", type: "relic_bearer", label: "Life Source in Forehead", phaseRevealed: 2, description: "The Mind Stone serves as the beating heart and cosmic consciousness of the synthezoid Vision." },
  { id: "r13", source: "wanda", target: "vision", type: "romance", label: "Cosmic Spark / Soul Connection", phaseRevealed: 2, description: "Connected through the Mind Stone's resonance; Vision rescued Wanda during Sokovia's fall." },
  { id: "r14", source: "guardians", target: "power-stone", type: "relic_bearer", label: "Shared the Cosmic Surge", phaseRevealed: 2, description: "Peter Quill, Gamora, Drax, and Rocket joined hands to channel the Power Stone and destroy Ronan." },
  { id: "r15", source: "ant-man", target: "hank-pym", type: "mentor", label: "Inheritor of the Ant-Suit", phaseRevealed: 2, description: "Hank Pym chose ex-con Scott Lang to protect Pym Particle secrets from Cross." },

  { id: "r16", source: "iron-man", target: "spider-man", type: "mentor", label: "Father Figure & Benefactor", phaseRevealed: 3, description: "Tony recruited young Peter Parker in Civil War and engineered his high-tech Stark suits." },
  { id: "r17", source: "iron-man", target: "captain-america", type: "enemy", label: "Shattered by Sokovia Accords & Siberia", phaseRevealed: 3, description: "Tony discovered Bucky killed his parents while Steve kept the secret, fracturing the Avengers." },
  { id: "r18", source: "doctor-strange", target: "time-stone", type: "relic_bearer", label: "Keeper of the Eye of Agamotto", phaseRevealed: 3, description: "Doctor Strange mastered temporal loops to bargain with Dormammu and protect Earth-616." },
  { id: "r19", source: "thanos", target: "iron-man", type: "enemy", label: "Cursed with Knowledge", phaseRevealed: 3, description: "Thanos acknowledged Stark as his intellectual counterpart on Titan during the Infinity War." },
  { id: "r20", source: "thanos", target: "gamora", type: "family", label: "Favored Adoptive Daughter", phaseRevealed: 3, description: "Thanos raised Gamora into the deadliest woman in the galaxy, then sacrificed her on Vormir for the Soul Stone." },
  { id: "r21", source: "thanos", target: "loki", type: "killed_by", label: "Choked to Death in Statesman", phaseRevealed: 3, description: "Thanos crushed Loki's neck in front of Thor: 'No resurrections this time.'" },
  { id: "r22", source: "thanos", target: "vision", type: "killed_by", label: "Tore Mind Stone from Brow", phaseRevealed: 3, description: "Thanos rewound time using the Time Stone to rip the Mind Stone from Vision in Wakanda." },
  { id: "r23", source: "black-widow", target: "hawkeye", type: "killed_by", label: "Soul Stone Sacrifice at Vormir", phaseRevealed: 3, description: "Natasha fought Clint to give her life on Vormir so the Avengers could complete the Time Heist." },
  { id: "r24", source: "iron-man", target: "nano-gauntlet", type: "relic_bearer", label: "The Final Snap", phaseRevealed: 3, description: "Tony Stark channeled all 6 Infinity Stones into his armor, sacrificing himself to turn Thanos to dust." },
  { id: "r25", source: "captain-america", target: "peggy-carter", type: "romance", label: "Lived the Promised Life", phaseRevealed: 3, description: "Steve travelled back to 1949 after returning the stones to live his life with Peggy." },

  { id: "r26", source: "loki", target: "sylvie", type: "variant", label: "Multiverse Variant & Paradoxical Love", phaseRevealed: 4, description: "Sylvie is a female variant of Loki whose timeline was pruned; their nexus connection baffled the TVA." },
  { id: "r27", source: "loki", target: "mobius", type: "alliance", label: "Glorious Purpose Partners", phaseRevealed: 4, description: "TVA Analyst Mobius saw through Loki's god facade and forged an unbreakable friendship." },
  { id: "r28", source: "sylvie", target: "he-who-remains", type: "killed_by", label: "Slew the Citadel Sovereign", phaseRevealed: 4, description: "Sylvie killed He Who Remains at the End of Time, causing the Sacred Timeline to branch infinitely." },
  { id: "r29", source: "wanda", target: "the-darkhold", type: "relic_bearer", label: "Corrupted into Scarlet Witch", phaseRevealed: 4, description: "Wanda read the Darkhold to search the multiverse for her sons Billy and Tommy, succumbing to corruption." },
  { id: "r30", source: "wanda", target: "doctor-strange", type: "enemy", label: "Multiversal Slaughter", phaseRevealed: 4, description: "Scarlet Witch hunted America Chavez across dimensions while Doctor Strange fought to stop her dreamwalking." },
  { id: "r31", source: "spider-man", target: "doctor-strange", type: "alliance", label: "Spell Gone Wrong", phaseRevealed: 4, description: "Peter asked Strange to cast the Runes of Kof-Kol to erase memories of his identity, cracking the multiverse." },
  { id: "r32", source: "shang-chi", target: "ten-rings", type: "relic_bearer", label: "Wielder of the Ten Cosmic Rings", phaseRevealed: 4, description: "Inherited the glowing weapons of Ta Lo from his father Xu Wenwu." },
  { id: "r33", source: "agatha", target: "wanda", type: "enemy", label: "Coven Rivalry & Westview Duel", phaseRevealed: 4, description: "Agatha sought to steal Wanda's innate Chaos Magic before being trapped in Westview under a spell." },

  { id: "r34", source: "loki", target: "tva-tempad", type: "relic_bearer", label: "Ascended into God of Stories", phaseRevealed: 5, description: "Loki sacrificed his freedom at the center of the Multiverse, replacing the Loom with Yggdrasil holding infinite timelines." },
  { id: "r35", source: "ant-man", target: "kang-the-conqueror", type: "enemy", label: "Quantum Realm Clash", phaseRevealed: 5, description: "Scott Lang trapped the exiled Kang inside his own multiversal power core in the Quantum Realm." },
  { id: "r36", source: "doctor-doom", target: "fantastic-four", type: "enemy", label: "Latverian Arch-Nemesis", phaseRevealed: 6, description: "Victor von Doom's intellectual and mystical crusade clashes directly with Reed Richards and Marvel's First Family." },
  { id: "r37", source: "doctor-doom", target: "avengers-doomsday", type: "enemy", label: "Multiverse Convergence Mastermind", phaseRevealed: 6, description: "The supreme sorcerer-technologist poised to reshape colliding realities into Battleworld." }
];

export function getRelationshipsForNode(id: string, maxPhase: number = 6): RelationshipEdge[] {
  return RELATIONSHIPS.filter(
    (r) => (r.source === id || r.target === id) && r.phaseRevealed <= maxPhase
  );
}

export function getAllRelationshipsUpToPhase(maxPhase: number = 6): RelationshipEdge[] {
  return RELATIONSHIPS.filter((r) => r.phaseRevealed <= maxPhase);
}
