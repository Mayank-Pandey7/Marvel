import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CharacterCarousel, type CharacterItem } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type MovieNode } from "@/data/movies";
import { MCU_POSTER_MAP } from "@/components/map/NodeArtwork";

interface MovieSceneProps {
  movies?: MovieNode[];
}

export function MovieScene({ movies }: MovieSceneProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const items: CharacterItem[] | undefined = movies?.map((m) => {
    const poster = MCU_POSTER_MAP[m.id]?.poster || "/images/backdrops/iron-man-1.jpg";
    return {
      id: m.id,
      name: m.title,
      role: `PHASE ${m.phase} · ${m.year}`,
      portrait: poster,
      universe: `Phase ${m.phase}`,
    };
  });

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data) return;
      if (event.data.type === "character-select" && event.data.characterId) {
        router.push(`/movies/${event.data.characterId}`);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [router]);

  const handlePrev = () => {
    const iframe = containerRef.current?.querySelector("iframe");
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage({ type: "step-prev" }, "*");
    }
  };

  const handleNext = () => {
    const iframe = containerRef.current?.querySelector("iframe");
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage({ type: "step-next" }, "*");
    }
  };

  if (movies && movies.length === 0) {
    return (
      <div className="shader-frame w-full h-[480px] sm:h-[520px] relative bg-black overflow-hidden border-0 flex flex-col items-center justify-center text-center p-6">
        <h3 className="text-sm font-mono tracking-[0.3em] uppercase text-stone-300 font-bold">
          NO 3D WHEEL MOVIES FOUND
        </h3>
        <p className="text-xs font-mono tracking-wide text-stone-500 mt-2 max-w-sm">
          No movie records match the active search query or phase filter.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="group/carousel shader-frame w-full h-[480px] sm:h-[520px] relative bg-black overflow-hidden border-0 select-none"
    >
      {/* Left Navigation Button */}
      <button
        onClick={handlePrev}
        aria-label="Previous Movie"
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-stone-300 hover:text-white border border-white/10 hover:border-white/30 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-2xl active:scale-95"
      >
        <ChevronLeft size={22} className="sm:w-6 sm:h-6" />
      </button>

      {/* Right Navigation Button */}
      <button
        onClick={handleNext}
        aria-label="Next Movie"
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-stone-300 hover:text-white border border-white/10 hover:border-white/30 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-2xl active:scale-95"
      >
        <ChevronRight size={22} className="sm:w-6 sm:h-6" />
      </button>

      {/* 3D Filmstrip Perspective Rail */}
      <CharacterCarousel
        key={items ? items.map((i) => i.id).join(",") : "all-movies"}
        variant="filmstrip"
        items={items}
        speed={1.00}
        scale={1.00}
        opacity={1.00}
        hue={0}
        saturation={1.00}
        brightness={1.00}
      />
    </div>
  );
}
