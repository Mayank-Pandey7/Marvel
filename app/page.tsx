"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import DarkIntroSelector from "@/components/dark/DarkIntroSelector";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {

    router.prefetch("/timeline");
    router.prefetch("/characters");
    router.prefetch("/artifacts");
  }, [router]);

  const handleContinueFromIntro = (phase?: number, movieId?: string) => {
    const targetPhase = phase || 1;
    const movieQuery = movieId ? `&movie=${encodeURIComponent(movieId)}` : "";
    router.push(`/timeline?phase=${targetPhase}${movieQuery}`);
  };

  return <DarkIntroSelector onContinue={handleContinueFromIntro} />;
}
