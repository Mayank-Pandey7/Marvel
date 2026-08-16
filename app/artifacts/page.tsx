import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import ArtifactsVault from "@/components/dark/ArtifactsVault";
import { Gem } from "lucide-react";

export const metadata: Metadata = {
  title: "Cosmic Relics & Artifacts — MCUVERSE",
  description: "Explore the Infinity Stones, Darkhold, Ten Rings, and ancient multiversal artifacts across time.",
};

export default function ArtifactsPage() {
  return (
    <PageShell>
      <section className="px-4 sm:px-8 py-12 max-w-6xl mx-auto">
        <ArtifactsVault />
      </section>
    </PageShell>
  );
}
