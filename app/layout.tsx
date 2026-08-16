import type { Metadata } from "next";
import "./globals.css";
import { TimelineStateProvider } from "@/context/TimelineStateContext";
import { WatchedProvider } from "@/context/WatchedContext";
import AmbientAudio from "@/components/dark/AmbientAudio";

export const metadata: Metadata = {
  title: "MARVEL CINEMATIC UNIVERSE — The Sacred Timeline & Multiverse Map",
  description: "An interactive cinematic timeline map exploring the Marvel Cinematic Universe.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#020204] text-stone-100 antialiased min-h-screen selection:bg-white selection:text-black">
        <TimelineStateProvider>
          <WatchedProvider>
            <AmbientAudio />
            {children}
          </WatchedProvider>
        </TimelineStateProvider>
      </body>
    </html>
  );
}
