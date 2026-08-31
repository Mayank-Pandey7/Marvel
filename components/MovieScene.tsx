import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CharacterCarousel, type CharacterItem } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type MovieNode } from "@/data/movies";
import { MCU_POSTER_MAP } from "@/components/map/NodeArtwork";

interface MovieSceneProps {
  movies?: MovieNode[];
}

function formatMovieTitleForWheel(title: string): string {
  const mapping: Record<string, string> = {
    "Iron Man": "IRON MAN",
    "The Incredible Hulk": "THE HULK",
    "Iron Man 2": "IRON MAN 2",
    "Thor": "THOR",
    "Captain America: The First Avenger": "CAPTAIN 1",
    "The Avengers": "AVENGERS",
    "Iron Man 3": "IRON MAN 3",
    "Thor: The Dark World": "THOR 2",
    "Captain America: The Winter Soldier": "CAPTAIN 2",
    "Guardians of the Galaxy": "GUARDIANS",
    "Avengers: Age of Ultron": "AVENGERS 2",
    "Ant-Man": "ANT-MAN",
    "Captain America: Civil War": "CIVIL WAR",
    "Doctor Strange": "DR STRANGE",
    "Guardians of the Galaxy Vol. 2": "GUARDIANS 2",
    "Spider-Man: Homecoming": "SPIDER-MAN",
    "Thor: Ragnarok": "THOR 3",
    "Black Panther": "PANTHER",
    "Avengers: Infinity War": "AVENGERS 3",
    "Ant-Man and the Wasp": "ANT-MAN 2",
    "Captain Marvel": "CAP MARVEL",
    "Avengers: Endgame": "AVENGERS 4",
    "Spider-Man: Far From Home": "SPIDER-MAN 2",
    "WandaVision": "WANDAVISION",
    "The Falcon and the Winter Soldier": "FALCON & WS",
    "Loki (Season 1)": "LOKI S1",
    "Loki (Season 2)": "LOKI S2",
    "Loki": "LOKI",
    "Black Widow": "BLACK WIDOW",
    "What If...? (Season 1)": "WHAT IF S1",
    "What If...? (Season 2)": "WHAT IF S2",
    "Shang-Chi and the Legend of the Ten Rings": "SHANG-CHI",
    "Eternals": "ETERNALS",
    "Hawkeye": "HAWKEYE",
    "Spider-Man: No Way Home": "SPIDER-MAN 3",
    "Moon Knight": "MOON KNIGHT",
    "Doctor Strange in the Multiverse of Madness": "DR STRANGE 2",
    "Ms. Marvel": "MS. MARVEL",
    "Thor: Love and Thunder": "THOR 4",
    "I Am Groot": "I AM GROOT",
    "She-Hulk: Attorney at Law": "SHE-HULK",
    "Werewolf by Night": "WEREWOLF",
    "Black Panther: Wakanda Forever": "WAKANDA",
    "The Guardians of the Galaxy Holiday Special": "HOLIDAY",
    "Ant-Man and the Wasp: Quantumania": "ANT-MAN 3",
    "Guardians of the Galaxy Vol. 3": "GUARDIANS 3",
    "Secret Invasion": "INVASION",
    "The Marvels": "THE MARVELS",
    "Echo": "ECHO",
    "Deadpool & Wolverine": "DEADPOOL 3",
    "Agatha All Along": "AGATHA",
    "Captain America: Brave New World": "CAPTAIN 4",
    "Thunderbolts*": "THUNDERBOLTS",
    "The Fantastic Four: First Steps": "FANTASTIC 4",
    "Spider-Man: Brand New Day": "SPIDER-MAN 4",
    "Avengers: Doomsday": "DOOMSDAY",
    "Avengers: Secret Wars": "SECRET WARS",
    "Daredevil: Born Again": "DAREDEVIL",
    "Blade": "BLADE",
    "Ironheart": "IRONHEART"
  };

  if (mapping[title]) return mapping[title];

  if (title.includes(":")) {
    return title.split(":")[1].trim().toUpperCase();
  }
  return title.toUpperCase();
}

export function MovieScene({ movies }: MovieSceneProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.68);

  useEffect(() => {
    const handleResize = () => {
      setScale(window.innerWidth < 640 ? 0.58 : 0.68);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const items: CharacterItem[] | undefined = movies?.map((m) => {
    const poster = MCU_POSTER_MAP[m.id]?.poster || "/images/backdrops/iron-man-1.jpg";
    return {
      id: m.id,
      name: formatMovieTitleForWheel(m.title),
      role: `Phase ${m.phase} · ${m.year}`,
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

  useEffect(() => {
    // Apply normal weight styling inside carousel iframe if available
    const applyIframeStyles = () => {
      const iframe = containerRef.current?.querySelector("iframe");
      if (iframe?.contentDocument) {
        try {
          const style = iframe.contentDocument.createElement("style");
          style.textContent = `
            * {
              font-weight: 400 !important;
              -webkit-font-smoothing: antialiased !important;
              -moz-osx-font-smoothing: grayscale !important;
            }
            h1, h2, h3, p, span, div {
              font-weight: 400 !important;
              letter-spacing: 0.04em !important;
            }
          `;
          iframe.contentDocument.head?.appendChild(style);
        } catch {
          // Cross-origin safe
        }
      }
    };
    const t = setTimeout(applyIframeStyles, 400);
    return () => clearTimeout(t);
  }, []);

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
      className="group/carousel shader-frame w-full h-[420px] sm:h-[480px] relative bg-black overflow-hidden border-0 select-none font-normal"
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

      {/* 3D Filmstrip Perspective Rail with Responsive Scaled Dimensions */}
      <CharacterCarousel
        key={items ? items.map((i) => i.id).join(",") : "all-movies"}
        variant="filmstrip"
        items={items}
        speed={1.00}
        scale={scale}
        opacity={1.00}
        hue={0}
        saturation={1.00}
        brightness={1.00}
      />
    </div>
  );
}

export default MovieScene;
