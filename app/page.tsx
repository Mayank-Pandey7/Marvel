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
    router.prefetch("/developer");
  }, [router]);

  const handleContinueFromIntro = (phase?: number, movieId?: string) => {
    const isMultiverse = phase === 7;
    const p = isMultiverse ? "X" : (phase || 1);
    const m = movieId ? `&movie=${movieId}` : "";
    const targetEarth = isMultiverse ? "all" : "Earth-616";
    const e = `&earth=${targetEarth}`;

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("mcu_timeline_earth_filter", targetEarth);
      } catch {}
    }

    router.push(`/timeline?phase=${p}${m}${e}`);
  };

  return <DarkIntroSelector onContinue={handleContinueFromIntro} />;
}
