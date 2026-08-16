"use client";

import { useWatched } from "@/context/WatchedContext";

export default function OrderToggle() {
  const { order, setOrder } = useWatched();
  return (
    <div className="px-4 sm:px-8 max-w-6xl mx-auto flex items-center gap-2 mb-6">
      <span className="text-[10px] tracking-[0.2em] uppercase text-stone-600 mr-2">Order:</span>
      {(
        [
          ["release", "Release Order"],
          ["chronological", "Chronological"],
        ] as const
      ).map(([id, label]) => (
        <button
          key={id}
          onClick={() => setOrder(id)}
          className={`px-3 py-1 text-[10px] tracking-wider uppercase border rounded-full transition-colors ${
            order === id ? "bg-blood-deep border-blood-deep text-white" : "border-white/15 text-stone-500 hover:border-white/40"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
