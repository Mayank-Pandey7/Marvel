"use client";

import React, { Suspense } from "react";
import TimelineScrollableView from "@/components/timeline/TimelineScrollableView";

export default function TimelinePage() {
  return (
    <Suspense fallback={<div className="min-h-screen w-full bg-[#030305]" />}>
      <TimelineScrollableView />
    </Suspense>
  );
}
