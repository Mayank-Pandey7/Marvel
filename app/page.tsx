"use client";

import { useState } from "react";
import DarkIntroSelector from "@/components/dark/DarkIntroSelector";
import UniverseMap from "@/components/map/UniverseMap";

export default function HomePage() {
  // Default home screen is the Dark Timeline Point Selector landing page
  const [viewMode, setViewMode] = useState<"selector" | "map">("selector");
  const [targetPhase, setTargetPhase] = useState<number>(1);
  const [targetMovieId, setTargetMovieId] = useState<string | undefined>(undefined);

  const handleContinueFromIntro = (phase?: number, movieId?: string) => {
    if (phase) setTargetPhase(phase);
    if (movieId) setTargetMovieId(movieId);
    setViewMode("map");
  };

  if (viewMode === "selector") {
    return <DarkIntroSelector onContinue={handleContinueFromIntro} />;
  }

  // Transition directly into the Timeline Tree positioned at that exact Phase & Movie section
  return (
    <main className="w-screen h-screen overflow-hidden bg-[#020204]">
      <UniverseMap
        onReturn={() => setViewMode("selector")}
        initialPhase={targetPhase}
        targetMovieId={targetMovieId}
      />
    </main>
  );
}
