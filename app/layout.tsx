import type { Metadata, Viewport } from "next";
import "./globals.css";
import { TimelineStateProvider } from "@/context/TimelineStateContext";
import { WatchedProvider } from "@/context/WatchedContext";
import AmbientAudio from "@/components/dark/AmbientAudio";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "MARVEL CINEMATIC UNIVERSE — The Sacred Timeline & Multiverse Map",
  description: "An interactive cinematic timeline map exploring all 6 Phases of the Marvel Cinematic Universe, Multiverse Earths, Character Archives, and Cosmic Relics.",
  keywords: ["Marvel", "MCU", "Timeline", "Multiverse", "Avengers", "X-Men", "Fantastic Four", "Sacred Timeline", "Infinity Stones"],
  authors: [{ name: "MCUVERSE Team" }],
  openGraph: {
    title: "MCUVERSE — Marvel Sacred Timeline & Multiverse Tree",
    description: "Explore all 44 canonical MCU movies, multiversal realities, character dossiers, and cosmic artifacts in an interactive spatial canvas.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MCUVERSE — Marvel Sacred Timeline & Multiverse Map",
    description: "Interactive timeline tree exploring 6 Phases of the Marvel Cinematic Universe.",
  },
};

import { DoomsdayTransitionProvider } from "@/components/doomsday/DoomsdayTransition";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#020204] text-stone-100 antialiased min-h-screen selection:bg-white selection:text-black">
        <TimelineStateProvider>
          <WatchedProvider>
            <DoomsdayTransitionProvider>
              <AmbientAudio />
              {children}
            </DoomsdayTransitionProvider>
          </WatchedProvider>
        </TimelineStateProvider>
      </body>
    </html>
  );
}
