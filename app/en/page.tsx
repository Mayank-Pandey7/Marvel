"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import DarkIntroSelector from "@/components/dark/DarkIntroSelector";

export default function IntroEnPage() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/timeline");
    router.prefetch("/familytree");
    router.prefetch("/doomsday");
    router.prefetch("/characters");
    router.prefetch("/artifacts");
  }, [router]);

  const handleContinueFromIntro = (phase?: number, movieId?: string) => {
    const p = phase || 1;
    const m = movieId ? `&movie=${movieId}` : "";
    router.push(`/timeline?phase=${p}${m}`);
  };

  return <DarkIntroSelector onContinue={handleContinueFromIntro} />;
}

