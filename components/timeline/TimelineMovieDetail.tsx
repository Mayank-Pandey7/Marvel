"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { type MovieNode } from "@/data/movies";
import DeepMovieDetail from "@/components/map/DeepMovieDetail";

export default function TimelineMovieDetail({
  movie,
  backHref = "/timeline",
  connectedBasePath = "/timeline",
}: {
  movie: MovieNode;
  backHref?: string;
  connectedBasePath?: string;
}) {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-black text-white">
      <DeepMovieDetail
        movie={movie}
        onClose={() => {
          if (window.history.length > 1) {
            router.back();
          } else {
            router.push(backHref);
          }
        }}
        onNavigateToConnectedMovie={(target) => {
          router.push(`${connectedBasePath}/${target.id}`);
        }}
      />
    </div>
  );
}
