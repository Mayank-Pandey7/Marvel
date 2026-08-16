"use client";

import { useEffect, useRef } from "react";
import { useTimelineState } from "@/context/TimelineStateContext";

export default function AmbientAudio() {
  const { soundEnabled } = useTimelineState();
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    if (!soundEnabled) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.5);
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtxRef.current) {
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(140, ctx.currentTime);
        filter.connect(masterGain);

        // Low cosmic drone 1 (55Hz - A1)
        const osc1 = ctx.createOscillator();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(55, ctx.currentTime);
        osc1.connect(filter);
        osc1.start();
        osc1Ref.current = osc1;

        // Sub harmonic drone 2 (82.4Hz - E2)
        const osc2 = ctx.createOscillator();
        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(82.4, ctx.currentTime);
        osc2.connect(filter);
        osc2.start();
        osc2Ref.current = osc2;
      }

      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      if (gainNodeRef.current && audioCtxRef.current) {
        // Soft, ambient level
        gainNodeRef.current.gain.setTargetAtTime(0.04, audioCtxRef.current.currentTime, 0.8);
      }
    } catch {
      // audio error handling
    }

    return () => {
      // cleanup on unmount
    };
  }, [soundEnabled]);

  return null;
}
