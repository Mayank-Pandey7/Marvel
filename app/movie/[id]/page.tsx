"use client";

import React, { useMemo } from "react";
import { notFound, useRouter } from "next/navigation";
import { UNIFIED_MCU_TREE, type MovieNode } from "@/data/movies";
import { MCU } from "@/data/mcu";
import DeepMovieDetail from "@/components/map/DeepMovieDetail";

export default function MovieDossierPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const movieId = params.id;

  // Resolve matching MovieNode from UNIFIED_MCU_TREE or fallback to MCU dataset
  const movieNode: MovieNode | null = useMemo(() => {
    const directMatch = UNIFIED_MCU_TREE.find(
      (m) => m.id === movieId || m.id.toLowerCase() === movieId.toLowerCase()
    );
    if (directMatch) return directMatch;

    // Fallback: match by stripped id or title
    const strippedId = movieId.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    const fallbackMatch = UNIFIED_MCU_TREE.find(
      (m) => m.id.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() === strippedId
    );
    if (fallbackMatch) return fallbackMatch;

    // Fallback from data/mcu.ts if not present in UNIFIED_MCU_TREE
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

    return null;
  }, [movieId]);

  if (!movieNode) {
    notFound();
  }

  const handleClose = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(`/timeline?phase=${movieNode.phase}&movie=${encodeURIComponent(movieNode.id)}`);
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
