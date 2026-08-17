import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-void">
      <p className="text-[11px] tracking-[0.3em] text-blood uppercase mb-3">Timeline Fracture</p>
      <h1 className="text-3xl sm:text-4xl font-display font-black text-white mb-4">PAGE NOT FOUND</h1>
      <p className="text-stone-500 text-sm mb-8 max-w-sm">This story doesn&apos;t exist in this reality.</p>
      <Link href="/timeline" className="px-6 py-3 border border-white/20 hover:border-white/50 text-white text-xs tracking-[0.2em] uppercase transition-colors">
        Return to Sacred Timeline
      </Link>
    </div>
  );
}
