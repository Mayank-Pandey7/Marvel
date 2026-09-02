"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const TimelineScrollableView = dynamic(
  () => import("@/components/timeline/TimelineScrollableView"),
  {
    ssr: false,
    loading: () => <div className="min-h-screen w-full bg-[#030305]" />,
  }
);

export default function TimelinePage() {
  return (
    <Suspense fallback={<div className="min-h-screen w-full bg-[#030305]" />}>
      <TimelineScrollableView />
    </Suspense>
  );
}
