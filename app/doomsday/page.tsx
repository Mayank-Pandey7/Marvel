import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import DoomsdayList from "@/components/DoomsdayList";

export const metadata: Metadata = {
  title: "Doomsday Preparation — MCUVERSE",
  description: "Prepare for Avengers: Doomsday by completing the essential viewing list.",
};

export default function DoomsdayPage() {
  return (
    <PageShell>
      <section
        className="relative px-4 sm:px-8 py-24 overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(153,27,27,0.22), #050403 65%)" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className="absolute w-px h-px bg-red-600/50 rounded-full"
              style={{ top: `${(i * 41) % 100}%`, left: `${(i * 61) % 100}%` }}
            />
          ))}
        </div>
        <DoomsdayList />
      </section>
    </PageShell>
  );
}
