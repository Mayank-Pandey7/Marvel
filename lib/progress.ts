import { MCU } from "@/data/mcu";

export function getProgress(watched: Set<string>) {
  const total = MCU.length;
  const watchedCount = watched.size;
  const pct = total ? (watchedCount / total) * 100 : 0;
  return { total, watchedCount, pct };
}

/** First unreleased-from-watched item in year order — used for "Continue Watching". */
export function getContinueItem(watched: Set<string>) {
  const sorted = [...MCU].sort((a, b) => a.year - b.year);
  return (
    sorted.find((m) => !watched.has(m.id) && m.status === "released") ||
    sorted.find((m) => !watched.has(m.id)) ||
    null
  );
}
