"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import DarkIntroSelector from "@/components/dark/DarkIntroSelector";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/timeline");
    router.prefetch("/familytree");
    router.prefetch("/movies");
    router.prefetch("/characters");
    router.prefetch("/artifacts");
  }, [router]);

  const handleContinueFromIntro = () => {
    router.push("/familytree");
  };

  return <DarkIntroSelector onContinue={handleContinueFromIntro} />;
}
