"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import UniverseMap from "@/components/map/UniverseMap";

function TimelineContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const phaseParam = searchParams.get("phase");
  const movieParam = searchParams.get("movie");
  const parsedPhase = phaseParam ? parseInt(phaseParam, 10) : 1;
  const initialPhase = isNaN(parsedPhase) ? 1 : Math.min(Math.max(parsedPhase, 1), 6);

  return (
    <main className="w-screen h-screen overflow-hidden bg-[#020204]">
      <UniverseMap
        onReturn={() => router.push("/")}
        initialPhase={initialPhase}
        targetMovieId={movieParam || undefined}
      />
    </main>
  );
}

export default function TimelinePage() {
  return (
    <Suspense fallback={<div className="w-screen h-screen bg-[#020204]" />}>
      <TimelineContent />
    </Suspense>
  );
}
