"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { type MovieNode } from "@/data/movies";
import DeepMovieDetail from "@/components/map/DeepMovieDetail";

export default function TimelineMovieDetail({ movie }: { movie: MovieNode }) {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-black text-white">
      <DeepMovieDetail
        movie={movie}
        onClose={() => {
          router.push("/timeline");
        }}
        onNavigateToConnectedMovie={(target) => {
          router.push(`/timeline/${target.id}`);
        }}
      />
    </div>
  );
}
