// Curated cinematic high-resolution backdrops for MCU Characters and each of their timeline phases
export const CHARACTER_BACKDROPS: Record<
  string, 
  { 
    main: string; 
    eras?: Record<string, string>; 
    phaseBackdrops?: Record<number, string>;
    entanglements?: string;
  }
> = {
  "iron-man": {
    main: "https://images.unsplash.com/photo-1635863138275-d9b33299680b?q=80&w=2560&auto=format&fit=crop", // Mark I / Tony in workshop
    eras: {
      "iron-man-origin": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=2560&auto=format&fit=crop", // Battle of NY / Phase 1
      "iron-man-endgame": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2560&auto=format&fit=crop", // Nano Gauntlet Snap / Phase 3
    },
    phaseBackdrops: {
      1: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=2560&auto=format&fit=crop",
      2: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?q=80&w=2560&auto=format&fit=crop",
      3: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2560&auto=format&fit=crop",
    },
    entanglements: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2560&auto=format&fit=crop",
  },
  "captain-america": {
    main: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?q=80&w=2560&auto=format&fit=crop",
    eras: {
      "cap-ww2": "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?q=80&w=2560&auto=format&fit=crop",
      "cap-worthy": "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=2560&auto=format&fit=crop",
    },
    phaseBackdrops: {
      1: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?q=80&w=2560&auto=format&fit=crop",
      2: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=2560&auto=format&fit=crop",
      3: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2560&auto=format&fit=crop",
    },
    entanglements: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2560&auto=format&fit=crop",
  },
  "thor": {
    main: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2560&auto=format&fit=crop",
    phaseBackdrops: {
      1: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2560&auto=format&fit=crop",
      2: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2560&auto=format&fit=crop",
      3: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2560&auto=format&fit=crop",
      4: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=2560&auto=format&fit=crop",
    },
  },
  "loki": {
    main: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2560&auto=format&fit=crop",
    phaseBackdrops: {
      1: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2560&auto=format&fit=crop",
      2: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2560&auto=format&fit=crop",
      3: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2560&auto=format&fit=crop",
      4: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=2560&auto=format&fit=crop",
      5: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=2560&auto=format&fit=crop",
    },
  },
  "wanda": {
    main: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2560&auto=format&fit=crop",
    phaseBackdrops: {
      2: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2560&auto=format&fit=crop",
      3: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2560&auto=format&fit=crop",
      4: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2560&auto=format&fit=crop",
    },
  },
  "doctor-strange": {
    main: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2560&auto=format&fit=crop",
    phaseBackdrops: {
      3: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2560&auto=format&fit=crop",
      4: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2560&auto=format&fit=crop",
      5: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=2560&auto=format&fit=crop",
    },
  },
  "spider-man": {
    main: "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?q=80&w=2560&auto=format&fit=crop",
    phaseBackdrops: {
      3: "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?q=80&w=2560&auto=format&fit=crop",
      4: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=2560&auto=format&fit=crop",
    },
  },
  "thanos": {
    main: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2560&auto=format&fit=crop",
    phaseBackdrops: {
      1: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2560&auto=format&fit=crop",
      2: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2560&auto=format&fit=crop",
      3: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2560&auto=format&fit=crop",
    },
  },
  "doctor-doom": {
    main: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2560&auto=format&fit=crop",
  },
  "deadpool": {
    main: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=2560&auto=format&fit=crop",
  },
  "wolverine": {
    main: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?q=80&w=2560&auto=format&fit=crop",
  },
  "red-skull": {
    main: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2560&auto=format&fit=crop",
    eras: {
      "red-skull-ww2": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2560&auto=format&fit=crop",
      "red-skull-vormir": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2560&auto=format&fit=crop",
    },
  },
  "gorr": {
    main: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2560&auto=format&fit=crop",
  },
  "mysterio": {
    main: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2560&auto=format&fit=crop",
  },
  "vulture": {
    main: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=2560&auto=format&fit=crop",
  },
  "wenwu": {
    main: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2560&auto=format&fit=crop",
  },
  "agatha-harkness": {
    main: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2560&auto=format&fit=crop",
  },
  "high-evolutionary": {
    main: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2560&auto=format&fit=crop",
  },
  "kingpin": {
    main: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=2560&auto=format&fit=crop",
  },
  "red-hulk": {
    main: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2560&auto=format&fit=crop",
  },
  "zemo": {
    main: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=2560&auto=format&fit=crop",
  },
  "ronan": {
    main: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2560&auto=format&fit=crop",
  },
  "cassandra-nova": {
    main: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2560&auto=format&fit=crop",
  },
  "reed-richards": {
    main: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=2560&auto=format&fit=crop",
  },
  "sue-storm": {
    main: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2560&auto=format&fit=crop",
  },
  "johnny-storm": {
    main: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2560&auto=format&fit=crop",
  },
  "ben-grimm": {
    main: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2560&auto=format&fit=crop",
  },
  "galactus": {
    main: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2560&auto=format&fit=crop",
  },
  "professor-x": {
    main: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2560&auto=format&fit=crop",
  },
  "magneto": {
    main: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2560&auto=format&fit=crop",
  },
  "gambit": {
    main: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=2560&auto=format&fit=crop",
  },
  "x-23": {
    main: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?q=80&w=2560&auto=format&fit=crop",
  },
  "beast": {
    main: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2560&auto=format&fit=crop",
  },
};

const PHASE_DEFAULT_BACKDROPS: Record<number, string> = {
  1: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=2560&auto=format&fit=crop",
  2: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?q=80&w=2560&auto=format&fit=crop",
  3: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2560&auto=format&fit=crop",
  4: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2560&auto=format&fit=crop",
  5: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2560&auto=format&fit=crop",
  6: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=2560&auto=format&fit=crop",
};

export function getCharacterBackdrop(characterId: string, eraId?: string, phase?: number): string {
  const charBackdrop = CHARACTER_BACKDROPS[characterId];
  if (charBackdrop) {
    if (eraId && charBackdrop.eras && charBackdrop.eras[eraId]) {
      return charBackdrop.eras[eraId];
    }
    if (phase && charBackdrop.phaseBackdrops && charBackdrop.phaseBackdrops[phase]) {
      return charBackdrop.phaseBackdrops[phase];
    }
    if (phase && PHASE_DEFAULT_BACKDROPS[phase]) {
      return PHASE_DEFAULT_BACKDROPS[phase];
    }
    return charBackdrop.main;
  }
  if (phase && PHASE_DEFAULT_BACKDROPS[phase]) {
    return PHASE_DEFAULT_BACKDROPS[phase];
  }
  return "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=2560&auto=format&fit=crop";
}

export function hasCharacterBackdrop(characterId: string): boolean {
  return Boolean(CHARACTER_BACKDROPS[characterId]);
}
