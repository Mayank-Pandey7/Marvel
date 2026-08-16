import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/", label: "The Cosmic Web" },
  { href: "/characters", label: "Character Dossiers" },
  { href: "/artifacts", label: "Cosmic Relics" },
  { href: "/multiverse", label: "Multiverse Map" },
  { href: "/doomsday", label: "Doomsday Horizon" },
];

export default function Footer() {
  return (
    <footer className="border-t border-stone-900 bg-[#020204] px-6 py-12 text-center relative z-20">
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
        <p className="font-mono tracking-[0.4em] uppercase text-white text-xs sm:text-sm font-light">
          M A R V E L &nbsp; C I N E M A T I C &nbsp; U N I V E R S E
        </p>
      </div>
      <p className="text-xs text-stone-500 font-mono tracking-wider">
        «The question is not where, or how, but when and in which universe.»
      </p>

      <div className="flex flex-wrap justify-center gap-6 mt-6 text-xs font-mono text-stone-400">
        {FOOTER_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-white uppercase tracking-wider transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <p className="text-[10px] font-mono text-stone-600 mt-8">
        Interactive narrative entanglement and spoiler-safe timeline explorer.
      </p>
    </footer>
  );
}
