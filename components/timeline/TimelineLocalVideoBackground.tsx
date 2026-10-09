"use client";

import React, { useRef, useEffect } from "react";

interface TimelineLocalVideoBackgroundProps {
  src?: string;
  blurClassName?: string;
  overlayClassName?: string;
}

export default function TimelineLocalVideoBackground({
  src = "/trailers/loki-video.mp4",
  blurClassName = "filter blur-[4px] sm:blur-[5px] scale-105",
  overlayClassName = "bg-black/35 backdrop-blur-[1.5px]",
}: TimelineLocalVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playbackRate = 1.0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback auto-play policy handler
        video.muted = true;
        video.playbackRate = 1.0;
        video.play().catch(() => {});
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-black">
      {/* 1. Native HTML5 Video Element with Full Object-Cover and Ambient Blur */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none transition-opacity duration-700 ease-out opacity-90 ${blurClassName}`}
      >
        <source src={src} type="video/mp4" />
        <source src="/trailers/loki video .mp4" type="video/mp4" />
      </video>

      {/* 2. Uniform Atmospheric Dark Overlay */}
      <div className={`absolute inset-0 pointer-events-none ${overlayClassName}`} />

      {/* 3. Top Black Header Fade across the Navbar */}
      <div className="absolute top-0 inset-x-0 h-44 sm:h-64 bg-gradient-to-b from-black/90 via-black/40 via-black/10 to-transparent pointer-events-none" />

      {/* 4. Full-Height Right Fade behind SELECT REALITY & Multiverse Controls */}
      <div className="absolute top-0 bottom-0 right-0 w-80 sm:w-96 md:w-[420px] h-full bg-gradient-to-l from-black/80 via-black/40 to-transparent pointer-events-none" />
    </div>
  );
}
