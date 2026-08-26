export type TimelineBranch = {
  id: string;
  name: string;
  divergencePoint: string;
  phase: number;
  year: string;
  status: "active" | "pruned" | "stabilized" | "incursion_threat";
  color: string;
  description: string;
  catalyst: string;
  keyEvents: string[];
};

export type NexusEvent = {
  id: string;
  title: string;
  phase: number;
  year: string;
  universe: string;
  culprit: string;
  threatLevel: "ALPHA" | "OMEGA" | "MULTIVERSAL" | "TEMPORAL";
  description: string;
  impact: string;
  consequences: string[];
};

export const TIMELINE_BRANCHES: TimelineBranch[] = [
  {
    id: "sacred-timeline-616",
    name: "The Sacred Timeline (Earth-616)",
    divergencePoint: "Prime Origin",
    phase: 1,
    year: "1942–Present",
    status: "active",
    color: "#f59e0b",
    description: "The baseline reality curated by He Who Remains to isolate and prevent the rise of Kang variants.",
    catalyst: "He Who Remains TVA Dictum",
    keyEvents: [
      "Captain America thawed into modern era (2011)",
      "Battle of New York (2012)",
      "The Blip / Thanos Snap (2018)",
      "The Time Heist & Battle of Earth (2023)"
    ]
  },
  {
    id: "branch-2012-tesseract",
    name: "Branch 2012 (Loki Tesseract Escape)",
    divergencePoint: "Battle of New York (Time Heist Interruption)",
    phase: 4,
    year: "2012",
    status: "stabilized",
    color: "#10b981",
    description: "Formed when Scott Lang and Tony Stark caused a distraction during the 2012 Time Heist, allowing Loki to grab the dropped Tesseract and vanish into the Gobi Desert.",
    catalyst: "Tony Stark briefcase collision & 2012 Loki theft",
    keyEvents: [
      "Loki teleports to Gobi Desert, Mongolia",
      "Arrested by TVA Minutemen; reset charge deployed",
      "Loki learns the truth of the Time Keepers & Citadel"
    ]
  },
  {
    id: "branch-2014-thanos",
    name: "Branch 2014 (Thanos Quantum Jump)",
    divergencePoint: "Morag / Nebula Memory Sync",
    phase: 3,
    year: "2014",
    status: "pruned",
    color: "#a855f7",
    description: "Created when 2014 Nebula synchronized memories with 2023 Nebula, revealing the entire Time Heist to 2014 Thanos. Thanos duplicated Pym Particles to jump with his warship to 2023 Earth.",
    catalyst: "Nebula neural interface cybernetic cross-feed",
    keyEvents: [
      "Thanos captures future Nebula and reverse-engineers Pym Particles",
      "Sanctuary II jumps across time to destroy Avengers Compound in 2023",
      "Thanos turned to dust by Tony Stark's Nano Gauntlet Snap"
    ]
  },
  {
    id: "earth-838",
    name: "Earth-838 (The Illuminati Realm)",
    divergencePoint: "Divergent Timeline / Alternate Earth",
    phase: 4,
    year: "Alternate Present",
    status: "incursion_threat",
    color: "#3b82f6",
    description: "A utopian high-tech Earth governed by the Illuminati (Professor X, Reed Richards, Captain Carter, Black Bolt, Captain Marvel). Ravaged by Earth-616 Wanda Maximoff dreamwalking into her alternate self.",
    catalyst: "Scarlet Witch Darkhold Dreamwalking across Multiverse",
    keyEvents: [
      "Earth-838 Strange used Darkhold to defeat Thanos and was executed",
      "Earth-616 Wanda possesses Earth-838 Wanda and massacres Illuminati",
      "Risk of cataclysmic Incursion with Earth-616"
    ]
  },
  {
    id: "the-void",
    name: "The Void (End of Time / Alioth Waste)",
    divergencePoint: "Null-Time Event Horizon",
    phase: 4,
    year: "Outside Space-Time",
    status: "active",
    color: "#ef4444",
    description: "The cosmic dumping ground where all pruned timeline branches and variant beings are cast to be consumed by the temporal beast Alioth.",
    catalyst: "TVA Pruning Batons & Reset Charges",
    keyEvents: [
      "Classic Loki casts Asgard illusion to distract Alioth",
      "Loki and Sylvie enchant Alioth, opening path to the Citadel",
      "Deadpool and Wolverine banished to the Void by Cassandra Nova"
    ]
  },
  {
    id: "yggdrasil-multiverse",
    name: "Yggdrasil: Loki's Living Multiverse",
    divergencePoint: "Temporal Loom Destruction",
    phase: 5,
    year: "Eternal Present",
    status: "active",
    color: "#22d3ee",
    description: "When the Temporal Loom failed to contain infinite branching timelines, Loki destroyed the Loom, physically gathered all dying branches in his bare hands, and took the throne at the End of Time, weaving all realities into a flourishing living World Tree (Yggdrasil).",
    catalyst: "Loki's self-sacrifice ('For you. For all of us.')",
    keyEvents: [
      "Destruction of the Temporal Loom with magic",
      "Loki binds thousands of dying branch timelines with living green temporal magic",
      "Loki sits upon the throne as God of Stories, keeping infinite realities alive"
    ]
  }
];

export const NEXUS_EVENTS: NexusEvent[] = [
  {
    id: "nexus-time-heist",
    title: "The Avengers 2023 Time Heist",
    phase: 3,
    year: "2023 (Traveling to 1970, 2012, 2013, 2014)",
    universe: "Earth-616 + Multiple Branch Realities",
    culprit: "Tony Stark, Scott Lang, Steve Rogers, Bruce Banner",
    threatLevel: "OMEGA",
    description: "Utilizing quantum tunneling and Pym particles via the Quantum Realm GPS, the Avengers breached past eras to extract six Infinity Stones, causing multiple branch timeline incursions.",
    impact: "Extracted stones to reverse Thanos's universal Snap, but accidentally created the 2012 Loki branch and 2014 Thanos jump.",
    consequences: [
      "2012 Loki escaped with Tesseract, leading to TVA recruitment",
      "2014 Thanos traveled forward in time to level Avengers Compound",
      "Steve Rogers stayed in 1949 with Peggy Carter, creating an alternate life path"
    ]
  },
  {
    id: "nexus-citadel-death",
    title: "The Death of He Who Remains",
    phase: 4,
    year: "Citadel at the End of Time",
    universe: "Null-Time Zone",
    culprit: "Sylvie Laufeydottir",
    threatLevel: "MULTIVERSAL",
    description: "Sylvie plunged her blade into He Who Remains, shattering the Sacred Timeline's isolation shield and unleashing infinite branching timelines and Kang variants.",
    impact: "Instantly broke the singularity of the MCU timeline, spawning endless parallel universes and initiating the Multiverse Saga.",
    consequences: [
      "The Sacred Timeline branched uncontrollably into infinite realities",
      "Alternate Kangs began conquering universes across space-time",
      "Set the stage for multiversal Incursions and Secret Wars"
    ]
  },
  {
    id: "nexus-spider-spell",
    title: "The Fractured Runes of Kof-Kol",
    phase: 4,
    year: "2024",
    universe: "Earth-616",
    culprit: "Doctor Stephen Strange & Peter Parker",
    threatLevel: "OMEGA",
    description: "Peter Parker repeatedly interrupted Doctor Strange's ancient forgetting spell, destabilizing the mystic containment barrier and pulling villains and heroes who knew Peter Parker is Spider-Man across alternate cinematic universes (Sony universes).",
    impact: "Proved that memory and identity resonance can breach dimensional walls between disparate cinematic franchises.",
    consequences: [
      "Tobey Maguire and Andrew Garfield Spider-Men arrived in Earth-616",
      "Green Goblin, Doc Ock, Electro, Sandman, and Lizard crossed universes",
      "Peter Parker sacrificed his entire social existence so Strange could seal the multiverse"
    ]
  },
  {
    id: "nexus-darkhold-dreamwalk",
    title: "Scarlet Witch's Multiversal Incursion Rampage",
    phase: 4,
    year: "2024",
    universe: "Earth-616 & Earth-838",
    culprit: "Wanda Maximoff (Scarlet Witch)",
    threatLevel: "MULTIVERSAL",
    description: "Wanda wielded the forbidden Darkhold to dreamwalk into Earth-838, brutally murdering the Illuminati to kidnap America Chavez for her dimension-traversing power.",
    impact: "Triggered universal boundary degradation, destabilizing reality fabric and leading to impending Incursions.",
    consequences: [
      "Slaughter of Earth-838's greatest defenders (Reed Richards, Xavier, Carter)",
      "Destruction of the Darkhold across every universe in existence",
      "Clea arriving from the Dark Dimension to warn Doctor Strange of a brewing Incursion"
    ]
  },
  {
    id: "nexus-god-of-stories",
    title: "Loki's Ascendance to God of Stories",
    phase: 5,
    year: "End of Time",
    universe: "Yggdrasil Multiverse",
    culprit: "Loki (Earth-616 2012 Variant)",
    threatLevel: "TEMPORAL",
    description: "Loki mastered the art of time-slipping across centuries of physics research, bypassed the Temporal Loom's infinite loop trap, tore down the machine, and physically replaced the mechanical filter by weaving infinite timelines with his own magical essence.",
    impact: "Transformed the oppressive pruned timeline into a free, flourishing multiverse anchored by the Tree of Life.",
    consequences: [
      "Freed all multiverse realities from TVA pruning mandates",
      "Left Loki eternally anchored alone upon the throne keeping existence from collapsing",
      "Allowed the Fantastic Four, X-Men, and alternate universes to exist simultaneously"
    ]
  }
];

export function getBranch(id: string) {
  return TIMELINE_BRANCHES.find((b) => b.id === id);
}

export function getNexusEvent(id: string) {
  return NEXUS_EVENTS.find((e) => e.id === id);
}
