"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";

import characterFilmstripSource from "./sources/character-filmstrip.html?raw";
import characterWaveSource from "./sources/character-wave.html?raw";
import { CHARACTERS } from "@/data/characters";
import { getCharacterBackdrop } from "@/data/characterBackdrops";

export type CharacterItem = {
  id: string;
  name: string;
  role: string;
  portrait: string;
  universe?: string;
};

export type CharacterCarouselVariant = "filmstrip" | "wave";

export type CharacterCarouselProps = {
  variant?: CharacterCarouselVariant;
  items?: CharacterItem[];
  speed?: number;
  scale?: number;
  opacity?: number;
  hue?: number;
  saturation?: number;
  brightness?: number;
  className?: string;
  style?: CSSProperties;
  onSelectCharacter?: (characterId: string) => void;
};

export const DEFAULT_MCU_CHARACTERS: CharacterItem[] = CHARACTERS.map((c) => {
  const primaryAlias = c.aliases[0] || c.faction.split("/")[0].trim() || "OPERATIVE";
  const portraitUrl = getCharacterBackdrop(c.id);
  return {
    id: c.id,
    name: c.name,
    role: primaryAlias.toUpperCase(),
    portrait: portraitUrl,
    universe: c.universe,
  };
});

export const CHARACTER_CAROUSEL_DEFAULTS = {
  variant: "filmstrip",
  speed: 1,
  scale: 1,
  opacity: 1,
  hue: 0,
  saturation: 1,
  brightness: 1,
} as const satisfies Required<Pick<CharacterCarouselProps, "variant" | "speed" | "scale" | "opacity" | "hue" | "saturation" | "brightness">>;

const SOURCE_BY_VARIANT: Record<CharacterCarouselVariant, string> = {
  filmstrip: characterFilmstripSource,
  wave: characterWaveSource,
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function buildFocusedDocument(variant: CharacterCarouselVariant, items: CharacterItem[]) {
  const focusStyles = `<style data-character-carousel-focus>
:root {
  --character-carousel-scale: 1;
  color-scheme: dark !important;
  background: #000000 !important;
}
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
  background: #000000 !important;
}
.stage {
  width: 100% !important;
  height: 100% !important;
  min-height: 0 !important;
  background: #000000 !important;
  border: 0 !important;
}
.stage::before {
  display: none !important;
}
.stage::after {
  display: none !important;
}
.deck {
  transform: scale(var(--character-carousel-scale));
  transform-origin: 50% 50%;
}
.card {
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  border-radius: 12px !important;
  background: #0c0c11 !important;
  color: #ffffff !important;
  box-shadow:
    0 calc(10px + var(--focus) * 24px) calc(20px + var(--focus) * 36px)
      rgba(0, 0, 0, calc(0.7 + var(--focus) * 0.3)),
    0 0 calc(var(--focus) * 28px) rgba(255, 255, 255, calc(var(--focus) * 0.35)),
    inset 0 0 0 1px rgba(255, 255, 255, 0.12) !important;
  cursor: pointer;
}
.card::before {
  border: 1px solid rgba(255, 255, 255, calc(0.06 + var(--focus) * 0.15)) !important;
  border-radius: 8px !important;
}
.portrait {
  background: #08080c !important;
  border-radius: 8px 8px 0 0 !important;
}
.footer {
  background: #09090e !important;
  border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 0 0 8px 8px !important;
}
.index {
  border: 1px solid rgba(255, 255, 255, 0.4) !important;
  color: #ffffff !important;
}
.name {
  color: #ffffff !important;
  font-size: clamp(8.5px, 0.82vw, 12px) !important;
  font-weight: 800 !important;
}
.role {
  color: #d4d4d8 !important;
  font-size: clamp(5.5px, 0.48vw, 8px) !important;
  font-weight: 700 !important;
}
</style>`;

  const customDataScript = `<script data-character-data>
window.__CUSTOM_PROFILES__ = ${JSON.stringify(items)};
</script>`;

  const controls = `<script data-character-carousel-controls>
(function () {
  var nativeFrame = window.requestAnimationFrame.bind(window);
  var clock = { real: null, virtual: null };
  var controls = window.__CHARACTER_CAROUSEL_CONTROLS = { speed: 1, scale: 1, paused: false };
  window.__CHARACTER_CAROUSEL_NOW = function () {
    return clock.virtual === null ? performance.now() : clock.virtual;
  };
  window.requestAnimationFrame = function (callback) {
    function tick(realTime) {
      if (clock.real === null) {
        clock.real = realTime;
        clock.virtual = realTime;
      } else {
        if (!controls.paused) clock.virtual += (realTime - clock.real) * controls.speed;
        clock.real = realTime;
      }
      if (controls.paused) {
        return nativeFrame(tick);
      }
      callback(clock.virtual);
    }
    return nativeFrame(tick);
  };
  window.addEventListener('message', function (event) {
    if (!event.data || event.data.type !== 'character-carousel-controls') return;
    var next = event.data.controls || {};
    if (Number.isFinite(next.speed)) controls.speed = Math.max(0, Math.min(2.5, next.speed));
    if (Number.isFinite(next.scale)) controls.scale = Math.max(0.7, Math.min(1.3, next.scale));
    controls.paused = Boolean(next.paused);
    document.documentElement.style.setProperty('--character-carousel-scale', String(controls.scale));
  });
})();
</script>`;

  const focusedSource = SOURCE_BY_VARIANT[variant]
    .replaceAll("performance.now()", "window.__CHARACTER_CAROUSEL_NOW()");

  return focusedSource
    .replace(/<script[^>]+cloudflareinsights\.com[^>]*><\/script>/gi, "")
    .replace("</head>", `${focusStyles}${customDataScript}${controls}</head>`);
}

export function CharacterCarousel({
  variant = CHARACTER_CAROUSEL_DEFAULTS.variant,
  items,
  speed = CHARACTER_CAROUSEL_DEFAULTS.speed,
  scale = CHARACTER_CAROUSEL_DEFAULTS.scale,
  opacity = CHARACTER_CAROUSEL_DEFAULTS.opacity,
  hue = CHARACTER_CAROUSEL_DEFAULTS.hue,
  saturation = CHARACTER_CAROUSEL_DEFAULTS.saturation,
  brightness = CHARACTER_CAROUSEL_DEFAULTS.brightness,
  className = "",
  style,
  onSelectCharacter,
}: CharacterCarouselProps) {
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [hostVisible, setHostVisible] = useState(true);
  const [documentVisible, setDocumentVisible] = useState(() => typeof document === "undefined" || !document.hidden);
  const safeSpeed = clamp(speed, 0, 2.5);
  const safeScale = clamp(scale, 0.7, 1.3);
  const paused = !hostVisible || !documentVisible || safeSpeed === 0;

  const resolvedItems = useMemo(() => {
    return items && items.length > 0 ? items : DEFAULT_MCU_CHARACTERS;
  }, [items]);

  const source = useMemo(() => buildFocusedDocument(variant, resolvedItems), [variant, resolvedItems]);

  const postControls = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage({
      type: "character-carousel-controls",
      controls: { speed: safeSpeed, scale: safeScale, paused },
    }, "*");
  }, [paused, safeScale, safeSpeed]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(([entry]) => setHostVisible(entry?.isIntersecting ?? true));
    observer.observe(iframe);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const update = () => setDocumentVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    postControls();
  }, [postControls, source]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "character-select" && event.data?.characterId) {
        const charId = event.data.characterId;
        if (onSelectCharacter) {
          onSelectCharacter(charId);
        } else {
          router.push(`/characters/${charId}`);
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onSelectCharacter, router]);

  return (
    <div
      className={`threeui-background character-carousel character-carousel--${variant}${className ? ` ${className}` : ""}`}
      style={{ background: "#000000", border: 0, pointerEvents: "auto", ...style }}
    >
      <iframe
        ref={iframeRef}
        title="Interactive MCU character filmstrip"
        srcDoc={source}
        sandbox="allow-scripts allow-same-origin"
        onLoad={postControls}
        style={{
          position: "absolute",
          inset: 0,
          display: "block",
          width: "100%",
          height: "100%",
          border: 0,
          background: "#000000",
          opacity: clamp(opacity, 0.05, 1),
        }}
      />
    </div>
  );
}

export function CharacterFilmstrip(props: Omit<CharacterCarouselProps, "variant">) {
  return <CharacterCarousel {...props} variant="filmstrip" />;
}

export function CharacterWave(props: Omit<CharacterCarouselProps, "variant">) {
  return <CharacterCarousel {...props} variant="wave" />;
}
