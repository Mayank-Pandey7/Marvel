"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import DarkFamilyTree from "@/components/dark/DarkFamilyTree";

function FamilyTreeContent() {
  return (
    <main className="w-screen h-screen overflow-hidden bg-black">
      <DarkFamilyTree />
    </main>
  );
}

export default function FamilyTreePage() {
  return (
    <Suspense fallback={<div className="w-screen h-screen bg-black" />}>
      <FamilyTreeContent />
    </Suspense>
  );
}
