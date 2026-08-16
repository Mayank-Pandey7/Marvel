"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  getWatchedItems, markAsWatched, markAsUnwatched,
  getIntroSeen, setIntroSeen as persistIntroSeen,
  getWatchOrder, setWatchOrder as persistWatchOrder,
} from "@/lib/storage";

type WatchOrder = "release" | "chronological";

type Ctx = {
  watched: Set<string>;
  toggleWatched: (id: string) => void;
  isWatched: (id: string) => boolean;
  introSeen: boolean;
  finishIntro: () => void;
  order: WatchOrder;
  setOrder: (o: WatchOrder) => void;
  hydrated: boolean;
};

const WatchedContext = createContext<Ctx | null>(null);

export function WatchedProvider({ children }: { children: React.ReactNode }) {
  const [watched, setWatched] = useState<Set<string>>(new Set());
  const [introSeen, setIntroSeenState] = useState(false);
  const [order, setOrderState] = useState<WatchOrder>("release");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setWatched(new Set(getWatchedItems()));
    setIntroSeenState(getIntroSeen());
    setOrderState(getWatchOrder());
    setHydrated(true);
  }, []);

  const toggleWatched = useCallback((id: string) => {
    setWatched((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        markAsUnwatched(id);
      } else {
        next.add(id);
        markAsWatched(id);
      }
      return next;
    });
  }, []);

  const isWatched = useCallback((id: string) => watched.has(id), [watched]);

  const finishIntro = useCallback(() => {
    setIntroSeenState(true);
    persistIntroSeen(true);
  }, []);

  const setOrder = useCallback((o: WatchOrder) => {
    setOrderState(o);
    persistWatchOrder(o);
  }, []);

  return (
    <WatchedContext.Provider value={{ watched, toggleWatched, isWatched, introSeen, finishIntro, order, setOrder, hydrated }}>
      {children}
    </WatchedContext.Provider>
  );
}

export function useWatched() {
  const ctx = useContext(WatchedContext);
  if (!ctx) throw new Error("useWatched must be used within WatchedProvider");
  return ctx;
}
