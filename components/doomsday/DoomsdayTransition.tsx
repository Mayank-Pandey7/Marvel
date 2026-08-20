"use client";

import React, { createContext, useContext } from "react";
import { useRouter } from "next/navigation";

interface DoomsdayTransitionContextType {
  triggerDoomsdayTransition: () => void;
  isTransitioning: boolean;
}

const DoomsdayTransitionContext = createContext<DoomsdayTransitionContextType>({
  triggerDoomsdayTransition: () => {},
  isTransitioning: false,
});

export const useDoomsdayTransition = () => useContext(DoomsdayTransitionContext);

export function DoomsdayTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const triggerDoomsdayTransition = () => {
    router.push("/doomsday");
  };

  return (
    <DoomsdayTransitionContext.Provider value={{ triggerDoomsdayTransition, isTransitioning: false }}>
      {children}
    </DoomsdayTransitionContext.Provider>
  );
}
