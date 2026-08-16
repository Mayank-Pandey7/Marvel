export type UniverseDimension = {
  id: string;
  name: string;
  designation: string;
  threatLevel: "STABLE" | "DESTABILIZED" | "INCURSION_IMMINENT" | "VOID";
  governingForce: string;
  description: string;
  keyInhabitants: string[];
  keyNexusEvents: string[];
  color: string;
};

export const UNIVERSES: UniverseDimension[] = [
  {
    id: "earth-616",
    name: "Sacred Timeline (Earth-616)",
    designation: "Prime MCU Reality / Earth-199999",
    threatLevel: "DESTABILIZED",
    governingForce: "Masters of the Mystic Arts & Surviving Avengers",
    description: "The primary reality of the Marvel Cinematic Universe. Home to the Infinity Saga, the Battle of Earth, and the epicenter of multiversal rift events caused by spells, time heists, and dreamwalking.",
    keyInhabitants: ["Tony Stark", "Steve Rogers", "Thor", "Wanda Maximoff", "Doctor Strange", "Peter Parker", "Shang-Chi"],
    keyNexusEvents: ["nexus-time-heist", "nexus-spider-spell", "nexus-darkhold-dreamwalk"],
    color: "#f59e0b"
  },
  {
    id: "earth-838",
    name: "Earth-838",
    designation: "Illuminati Utopian Reality",
    threatLevel: "INCURSION_IMMINENT",
    governingForce: "The Illuminati (Formerly, prior to Massacre)",
    description: "A highly advanced alternate Earth where the Illuminati eradicated Thanos using the Book of Vishanti. Severely destabilized after Earth-616 Wanda Maximoff dreamwalked in and slaughtered their leadership council.",
    keyInhabitants: ["Reed Richards (Deceased)", "Charles Xavier (Deceased)", "Captain Carter (Deceased)", "Black Bolt (Deceased)", "Wanda-838"],
    keyNexusEvents: ["nexus-darkhold-dreamwalk"],
    color: "#3b82f6"
  },
  {
    id: "the-void",
    name: "The Void & Alioth Domain",
    designation: "Null-Time Event Horizon",
    threatLevel: "VOID",
    governingForce: "Alioth the Temporal Consumer / Cassandra Nova",
    description: "The wasteland located at the end of time where all timelines pruned by the TVA were dumped. Ruled by Alioth, filled with remnants of dead universes and forgotten variants.",
    keyInhabitants: ["Classic Loki", "Kid Loki", "Alligator Loki", "Sylvie", "Cassandra Nova", "Deadpool", "Wolverine"],
    keyNexusEvents: ["nexus-citadel-death"],
    color: "#ef4444"
  },
  {
    id: "yggdrasil",
    name: "Yggdrasil Multiverse Tree",
    designation: "Loki's Sanctuary of Infinite Stories",
    threatLevel: "STABLE",
    governingForce: "Loki (God of Stories)",
    description: "The living, breathing cosmic tree holding all branching timelines in existence. Formed when Loki sacrificed his freedom to bind infinite dying branches with his bare hands.",
    keyInhabitants: ["Loki (God of Stories)", "Infinite Parallel Timelines"],
    keyNexusEvents: ["nexus-god-of-stories"],
    color: "#22d3ee"
  },
  {
    id: "earth-10005",
    name: "Earth-10005 (Fox Mutant Universe)",
    designation: "Legacy X-Men Reality",
    threatLevel: "DESTABILIZED",
    governingForce: "X-Men / TVA Anchor Protocol",
    description: "The reality of the 20th Century Fox X-Men and Deadpool. Anchor being Logan died in 2029, causing the timeline to begin deteriorating until Wade Wilson intervened.",
    keyInhabitants: ["Deadpool (Wade Wilson)", "Wolverine (Logan)", "Cassandra Nova", "Colossus"],
    keyNexusEvents: [],
    color: "#eab308"
  },
  {
    id: "battleworld",
    name: "Battleworld Horizon",
    designation: "Doomsday Reality Convergence",
    threatLevel: "INCURSION_IMMINENT",
    governingForce: "Doctor Victor von Doom",
    description: "The composite mosaic patchwork world formed from the fragments of destroyed multiverse realities during universal incursions.",
    keyInhabitants: ["Doctor Doom", "Fantastic Four", "Multiverse Champions"],
    keyNexusEvents: [],
    color: "#15803d"
  }
];

export function getUniverse(id: string) {
  return UNIVERSES.find((u) => u.id === id);
}
