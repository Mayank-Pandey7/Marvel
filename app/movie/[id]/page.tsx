"use client";

import React, { useMemo } from "react";
import { notFound, useRouter } from "next/navigation";
import { UNIFIED_MCU_TREE, type MovieNode } from "@/data/movies";
import { MCU } from "@/data/mcu";
import { DOOMSDAY_WATCHLIST } from "@/data/doomsdayWatchlist";
import DeepMovieDetail from "@/components/map/DeepMovieDetail";

export default function MovieDossierPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const movieId = params.id;

  const movieNode: MovieNode | null = useMemo(() => {
    const directMatch = UNIFIED_MCU_TREE.find(
      (m) => m.id === movieId || m.id.toLowerCase() === movieId.toLowerCase()
    );
    if (directMatch) return directMatch;

    const strippedId = movieId.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    const fallbackMatch = UNIFIED_MCU_TREE.find(
      (m) => m.id.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() === strippedId
    );
    if (fallbackMatch) return fallbackMatch;

    const mcuEntry = MCU.find((m) => m.id === movieId || m.id.toLowerCase() === movieId.toLowerCase());
    if (mcuEntry) {
      return {
        id: mcuEntry.id,
        title: mcuEntry.title,
        shortTitle: mcuEntry.title,
        year: mcuEntry.year,
        releaseDate: `${mcuEntry.year}`,
        phase: mcuEntry.phase,
        order: 1,
        quote: "Part of the journey is the end.",
        speaker: "THE WATCHER",
        tagline: mcuEntry.description,
        director: "Marvel Studios",
        runtime: 130,
        leadCharacter: mcuEntry.characters[0] || "Avengers",
        heroAlias: "Earth's Mightiest Heroes",
        keyRelics: ["Infinity Stones"],
        description: mcuEntry.description,
        color: "#ffffff",
        x: 0,
        y: 0,
        offsetY: 0,
        connections: [],
      };
    }

    const doomsdayEntry = DOOMSDAY_WATCHLIST.find(
      (d) =>
        d.id.toLowerCase() === movieId.toLowerCase() ||
        d.slug.toLowerCase() === movieId.toLowerCase()
    );
    if (doomsdayEntry) {
      return {
        id: doomsdayEntry.id,
        title: doomsdayEntry.title,
        shortTitle: doomsdayEntry.title,
        year: doomsdayEntry.year,
        releaseDate: `${doomsdayEntry.year}`,
        phase: doomsdayEntry.phase || 0,
        order: doomsdayEntry.order,
        quote: doomsdayEntry.tagline,
        speaker: doomsdayEntry.keyCharacters[0] || "Marvel",
        tagline: doomsdayEntry.tagline,
        director: "Marvel Studios / 20th Century Fox",
        runtime: parseInt(doomsdayEntry.runtime?.replace(/[^0-9]/g, "") || "115") || 115,
        leadCharacter: doomsdayEntry.keyCharacters[0] || "Hero",
        heroAlias: doomsdayEntry.keyCharacters[0] || "Hero",
        keyRelics: [],
        description: `${doomsdayEntry.whyItMatters} ${doomsdayEntry.doomConnection}`,
        color: "#f59e0b",
        x: 0,
        y: 0,
        offsetY: 0,
        connections: [],
      };
    }

    return null;
  }, [movieId]);

  if (!movieNode) {
    notFound();
  }

  const handleClose = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/timeline");
    }
  };

  const handleNavigateToConnected = (targetMovie: MovieNode) => {
    router.push(`/movie/${targetMovie.id}`);
  };

  return (
    <div className="min-h-screen w-full bg-[#000000] text-stone-100 overflow-hidden">
      <DeepMovieDetail
        movie={movieNode}
        onClose={handleClose}
        onNavigateToConnectedMovie={handleNavigateToConnected}
      />
    </div>
  );
}
