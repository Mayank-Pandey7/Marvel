"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import UniverseMap from "@/components/map/UniverseMap";
import DarkFamilyTree from "@/components/dark/DarkFamilyTree";

function TimelineContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const phaseParam = searchParams.get("phase");
  const movieParam = searchParams.get("movie");
  const viewModeParam = searchParams.get("mode"); // "family" | "timeline"

  const parsedPhase = phaseParam ? parseInt(phaseParam, 10) : 1;
  const initialPhase = isNaN(parsedPhase) ? 1 : Math.min(Math.max(parsedPhase, 1), 6);

  // Default to Dark Family Tree view
  const [viewMode, setViewMode] = useState<"family" | "timeline">(
    viewModeParam === "timeline" ? "timeline" : "family"
  );

  return (
    <main className="w-screen h-screen overflow-hidden bg-[#040406]">
      {viewMode === "family" ? (
        <DarkFamilyTree
          onSwitchToTimeline={() => setViewMode("timeline")}
        />
      ) : (
        <UniverseMap
          onReturn={() => router.push("/")}
          onSwitchToFamilyTree={() => setViewMode("family")}
          initialPhase={initialPhase}
          targetMovieId={movieParam || undefined}
        />
      )}
    </main>
  );
}

export default function TimelinePage() {
  return (
    <Suspense fallback={<div className="w-screen h-screen bg-[#040406]" />}>
      <TimelineContent />
    </Suspense>
  );
}

