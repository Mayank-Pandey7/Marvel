import Reveal from "./Reveal";
import { MCU } from "@/data/mcu";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(153,27,27,0.18), transparent 60%), #0a0908" }} />
      <Reveal>
        <p className="text-[11px] tracking-[0.4em] text-blood uppercase mb-6">The Multiverse Saga</p>
      </Reveal>
      <Reveal delay={100}>
        <h1 className="font-display font-black text-white leading-[0.95] text-5xl sm:text-7xl lg:text-8xl tracking-tight">
          EVERY STORY.<br />
          EVERY HERO.<br />
          <span className="text-blood">EVERY UNIVERSE.</span>
        </h1>
      </Reveal>
      <Reveal delay={220}>
        <p className="mt-7 max-w-xl text-stone-400 text-sm sm:text-base leading-relaxed">
          Explore the complete Marvel Cinematic Universe, track your journey, and prepare for what comes next.
        </p>
      </Reveal>
      <Reveal delay={340}>
        <div className="mt-9 flex flex-col sm:flex-row items-center gap-4">
          <a href="#journey" className="px-8 py-3 bg-blood-deep hover:bg-blood text-white text-xs tracking-[0.2em] uppercase font-medium transition-colors">
            Start Your Journey
          </a>
          <a href="#timeline" className="px-8 py-3 border border-white/20 hover:border-white/50 text-white text-xs tracking-[0.2em] uppercase font-medium transition-colors">
            Explore Timeline
          </a>
        </div>
      </Reveal>
      <Reveal delay={460}>
        <div className="mt-16 flex items-center gap-8 sm:gap-14 text-stone-500">
          {[[`${MCU.length}+`, "Stories"], ["6", "Phases"], ["1", "Multiverse"]].map(([num, label]) => (
            <div key={label} className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-bold text-white">{num}</span>
              <span className="text-[10px] tracking-[0.2em] uppercase mt-1">{label}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
