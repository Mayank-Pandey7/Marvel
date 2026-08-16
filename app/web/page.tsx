import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import ConnectionsWeb from "@/components/ConnectionsWeb";
import { defaultFocusId, resolveNode } from "@/lib/graph";

export const metadata: Metadata = {
  title: "The Web — MCUVERSE",
  description: "Everything is connected — jump between phases, movies, and characters in one living network.",
};

export default function WebPage({ searchParams }: { searchParams: { focus?: string } }) {
  const requested = searchParams.focus;
  const focus = requested && resolveNode(requested) ? requested : defaultFocusId();

  return (
    <PageShell>
      <section className="px-4 sm:px-8 py-16 max-w-4xl mx-auto text-center">
        <p className="text-[11px] tracking-[0.3em] text-blood uppercase mb-2">Discover How Everything Connects</p>
        <h1 className="text-3xl sm:text-4xl font-display font-black text-white mb-3">THE WEB</h1>
        <p className="text-sm text-stone-500 max-w-lg mx-auto mb-14">
          Same story, every angle. Tap any phase, movie, or character to re-center the web around it.
        </p>
        <ConnectionsWeb initialFocus={focus} />
      </section>
    </PageShell>
  );
}
