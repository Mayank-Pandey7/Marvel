"use client";

import { useState } from "react";
import DarkIntroSelector from "@/components/dark/DarkIntroSelector";
import UniverseMap from "@/components/map/UniverseMap";

export default function HomePage() {
  // Default home screen is the Dark Timeline Point Selector landing page
  const [viewMode, setViewMode] = useState<"selector" | "map">("selector");

  if (viewMode === "selector") {
    return <DarkIntroSelector onContinue={() => setViewMode("map")} />;
  }

  // After clicking CONTINUE in Phase 1, transition into the Cinematic Interactive Universe Map
  return (
    <main className="w-screen h-screen overflow-hidden bg-[#020204]">
      <UniverseMap onReturn={() => setViewMode("selector")} />
    </main>
  );
}
