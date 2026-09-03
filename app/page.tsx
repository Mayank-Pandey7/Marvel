"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import DarkIntroSelector from "@/components/dark/DarkIntroSelector";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/timeline");
    router.prefetch("/familytree");
    router.prefetch("/doomsday");
    router.prefetch("/characters");
    router.prefetch("/artifacts");
  }, [router]);

  const handleContinueFromIntro = (phase?: number, movieId?: string) => {
    const p = phase === 7 ? "X" : (phase || 1);
    const m = movieId ? `&movie=${movieId}` : "";
    const e = phase === 7 ? "&earth=all" : "";
    router.push(`/timeline?phase=${p}${m}${e}`);
  };

  return <DarkIntroSelector onContinue={handleContinueFromIntro} />;
}
