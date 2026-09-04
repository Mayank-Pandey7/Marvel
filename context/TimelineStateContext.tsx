"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type ActiveTab = "graph" | "timeline" | "characters" | "artifacts" | "universes" | "nexus";

type TimelineState = {
  currentPhase: number;
  setCurrentPhase: (phase: number) => void;
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
};

const TimelineStateContext = createContext<TimelineState | null>(null);

const STORAGE_PHASE_KEY = "mcuverse_timeline_phase";
const STORAGE_SOUND_KEY = "mcuverse_sound_enabled";

export function TimelineStateProvider({ children }: { children: React.ReactNode }) {
  const [currentPhase, setPhaseState] = useState<number>(1);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>("character:ironman");
  const [activeTab, setActiveTab] = useState<ActiveTab>("graph");
  const [searchOpen, setSearchOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    try {
      const savedSound = localStorage.getItem(STORAGE_SOUND_KEY);
      if (savedSound === "false") setSoundEnabled(false);
    } catch {
      
    }
  }, []);

  const setCurrentPhase = useCallback((phase: number) => {
    setPhaseState(phase);
    try {
      localStorage.setItem(STORAGE_PHASE_KEY, String(phase));
    } catch {
      
    }
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_SOUND_KEY, String(next));
      } catch {
        
      }
      return next;
    });
  }, []);

  return (
    <TimelineStateContext.Provider
      value={{
        currentPhase,
        setCurrentPhase,
        selectedNodeId,
        setSelectedNodeId,
        activeTab,
        setActiveTab,
        searchOpen,
        setSearchOpen,
        soundEnabled,
        toggleSound,
      }}
    >
      {children}
    </TimelineStateContext.Provider>
  );
}

export function useTimelineState() {
  const ctx = useContext(TimelineStateContext);
  if (!ctx) {
    throw new Error("useTimelineState must be used within TimelineStateProvider");
  }
  return ctx;
}
