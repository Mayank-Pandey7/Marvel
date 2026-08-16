"use client";

import { useEffect, useRef, useState } from "react";

export default function SecretWarsTeaser() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative h-[70vh] flex flex-col items-center justify-center bg-black overflow-hidden">
      <div
        className="absolute rounded-full border border-red-900/40 transition-all duration-[3000ms] ease-out motion-reduce:transition-none"
        style={{ width: visible ? 900 : 40, height: visible ? 900 : 40, opacity: visible ? 0.4 : 0 }}
      />
      <div
        className="absolute rounded-full border border-red-900/20 transition-all duration-[3500ms] ease-out motion-reduce:transition-none"
        style={{ width: visible ? 1300 : 20, height: visible ? 1300 : 20, opacity: visible ? 0.3 : 0 }}
      />
      <p className={`text-stone-400 text-xs tracking-[0.3em] uppercase transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}>
        The story isn&apos;t over.
      </p>
      <h2
        className={`mt-4 text-4xl sm:text-6xl font-display font-black text-white transition-opacity duration-1000 delay-[1200ms] ${visible ? "opacity-100" : "opacity-0"}`}
      >
        SECRET WARS
      </h2>
      <p className={`mt-4 text-blood text-xs tracking-[0.3em] uppercase transition-opacity duration-1000 delay-[2200ms] ${visible ? "opacity-100" : "opacity-0"}`}>
        Everything collides.
      </p>
    </section>
  );
}
