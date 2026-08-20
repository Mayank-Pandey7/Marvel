import type { Metadata } from "next";
import RoadToDoomsday from "@/components/doomsday/RoadToDoomsday";

export const metadata: Metadata = {
  title: "Road to Doomsday — Official Pre-Doomsday Watchlist | MCUVERSE",
  description: "Disney's official 15-entry prelude watchlist leading to Avengers: Doomsday (2026) and Secret Wars (2027).",
};

export default function DoomsdayPage() {
  return <RoadToDoomsday />;
}
