"use client";

import React, { Suspense } from "react";
import { CharactersContent } from "@/components/character/CharactersContent";

export default function HeroesAliasPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <CharactersContent defaultFaction="heroes" titleOverride="ARCHIVES · HEROES & ALLIES" />
    </Suspense>
  );
}
