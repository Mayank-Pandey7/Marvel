// components/timeline/snakePathUtils.ts

import { useEffect, useRef, useState } from "react";

/**
 * Hook to generate a snake‑path SVG based on a list of elements.
 * Returns the SVG path string `d` and a ref array to attach to each element.
 */
export function useSnakePath(itemCount: number) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [pathD, setPathD] = useState<string>("");

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const isMobile = window.innerWidth < 768;

      const points: { x: number; y: number }[] = [];
      // start point at top centre (or left offset on mobile)
      points.push({
        x: isMobile ? 16 : containerRect.width / 2,
        y: 0,
      });

      for (let i = 0; i < itemCount; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const relativeY = rect.top - containerRect.top + rect.height / 2;
        const xOffset = isMobile ? 0 : i % 2 === 0 ? -36 : 36;
        const relativeX = isMobile ? 16 : containerRect.width / 2 + xOffset;
        points.push({ x: relativeX, y: relativeY });
      }

      if (points.length < 2) return;
      let d = `M ${points[0].x} ${points[0].y}`;
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const midY = (p0.y + p1.y) / 2;
        d += ` C ${p0.x} ${midY}, ${p1.x} ${midY}, ${p1.x} ${p1.y}`;
      }
      setPathD(d);
    };

    updatePath();
    window.addEventListener("resize", updatePath);
    const timer = setTimeout(updatePath, 250);
    return () => {
      window.removeEventListener("resize", updatePath);
      clearTimeout(timer);
    };
  }, [itemCount]);

  return { containerRef, itemRefs, pathD };
}
