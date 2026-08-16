import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MCU, getEntry, getAdjacent } from "@/data/mcu";
import PageShell from "@/components/PageShell";
import MovieDetail from "@/components/MovieDetail";

export function generateStaticParams() {
  return MCU.map((m) => ({ id: m.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const entry = getEntry(params.id);
  if (!entry) return { title: "Not found — MCUVERSE" };
  return {
    title: `${entry.title} — MCUVERSE`,
    description: entry.description,
  };
}

export default function MoviePage({ params }: { params: { id: string } }) {
  const entry = getEntry(params.id);
  if (!entry) notFound();
  const { prev, next } = getAdjacent(params.id);

  return (
    <PageShell>
      <MovieDetail entry={entry} prev={prev} next={next} />
    </PageShell>
  );
}
