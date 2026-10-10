"use client";

import React from "react";
import TimelineLocalVideoBackground from "@/components/timeline/TimelineLocalVideoBackground";

export default function BackgroundStarfield() {
  return (
    <TimelineLocalVideoBackground
      blurClassName="filter blur-[12px] scale-110"
      overlayClassName="bg-black/20 backdrop-blur-[12px]"
    />
  );
}
