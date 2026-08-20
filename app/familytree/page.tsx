"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import DarkFamilyTree from "@/components/dark/DarkFamilyTree";

function FamilyTreeContent() {
  const router = useRouter();

  return (
    <main className="w-screen h-screen overflow-hidden bg-[#040406]">
      <DarkFamilyTree
        onSwitchToTimeline={() => router.push("/timeline")}
      />
    </main>
  );
}

export default function FamilyTreePage() {
  return (
    <Suspense fallback={<div className="w-screen h-screen bg-[#040406]" />}>
      <FamilyTreeContent />
    </Suspense>
  );
}
