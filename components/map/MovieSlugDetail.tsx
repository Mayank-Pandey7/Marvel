"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { type MovieNode, UNIFIED_MCU_TREE } from "@/data/movies";
import DeepMovieDetail from "./DeepMovieDetail";

export default function MovieSlugDetail({ movie }: { movie: MovieNode }) {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-black text-white">
      <DeepMovieDetail
        movie={movie}
        onClose={() => {
          router.push(`/timeline?phase=${movie.phase}&movie=${movie.id}`);
        }}
        onNavigateToConnectedMovie={(target) => {
          router.push(`/${target.id}`);
        }}
      />
    </div>
  );
}
