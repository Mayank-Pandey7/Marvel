"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Film, Layers, Users, ArrowRight, ExternalLink } from "lucide-react";
import { resolveNode, getNeighbors, type WebNode } from "@/lib/graph";

const TYPE_META: Record<WebNode["type"], { icon: typeof Film; ring: string; glow: string }> = {
  phase: { icon: Layers, ring: "border-amber-500/70", glow: "shadow-[0_0_18px_rgba(245,158,11,0.35)]" },
  movie: { icon: Film, ring: "border-white/60", glow: "shadow-[0_0_18px_rgba(255,255,255,0.15)]" },
  character: { icon: Users, ring: "border-red-500/70", glow: "shadow-[0_0_18px_rgba(220,38,38,0.4)]" },
};

function NodeBubble({
  node,
  size,
  onClick,
  emphasis = false,
}: {
  node: WebNode;
  size: number;
  onClick?: () => void;
  emphasis?: boolean;
}) {
  const meta = TYPE_META[node.type];
  const Icon = meta.icon;
  return (
    <button
      onClick={onClick}
      className={`group flex flex-col items-center gap-2 transition-transform hover:scale-105 ${onClick ? "cursor-pointer" : "cursor-default"}`}
      style={{ width: size + 40 }}
    >
      <span
        className={`flex items-center justify-center rounded-full bg-[#0d0c0b] border-2 ${meta.ring} ${emphasis ? meta.glow : ""} transition-shadow`}
        style={{ width: size, height: size }}
      >
        <Icon size={emphasis ? 22 : 16} className="text-stone-200" />
      </span>
      <span className={`text-center leading-tight ${emphasis ? "text-sm text-white font-semibold" : "text-[11px] text-stone-300"}`}>
        {node.label}
      </span>
      <span className="text-[9px] text-stone-500 tracking-wide text-center line-clamp-1">{node.sublabel}</span>
    </button>
  );
}

export default function ConnectionsWeb({ initialFocus }: { initialFocus: string }) {
  const [focus, setFocus] = useState(initialFocus);
  const [trail, setTrail] = useState<string[]>([]);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    setFocus(initialFocus);
    setTrail([]);
  }, [initialFocus]);

  const centerNode = resolveNode(focus);
  const neighbors = useMemo(() => getNeighbors(focus), [focus]);

  const goTo = useCallback(
    (id: string) => {
      if (id === focus) return;
      setFading(true);
      setTimeout(() => {
        setTrail((t) => [...t, focus]);
        setFocus(id);
        setFading(false);
      }, 180);
    },
    [focus]
  );

  const goToBreadcrumb = useCallback((index: number) => {
    setFading(true);
    setTimeout(() => {
      setTrail((t) => {
        const target = t[index];
        setFocus(target);
        return t.slice(0, index);
      });
      setFading(false);
    }, 180);
  }, []);

  if (!centerNode) {
    return <p className="text-stone-500 text-sm text-center py-20">Nothing to show here.</p>;
  }

  const radius = neighbors.length > 6 ? 210 : 180;
  const nodeSize = neighbors.length > 8 ? 44 : 56;

  return (
    <div>
      {/* Breadcrumb trail */}
      {trail.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 justify-center mb-8 px-4">
          {trail.map((id, i) => {
            const n = resolveNode(id);
            if (!n) return null;
            return (
              <span key={id} className="flex items-center gap-1.5">
                <button
                  onClick={() => goToBreadcrumb(i)}
                  className="text-[10px] tracking-wide uppercase text-stone-500 hover:text-white transition-colors"
                >
                  {n.label}
                </button>
                <ArrowRight size={10} className="text-stone-700" />
              </span>
            );
          })}
          <span className="text-[10px] tracking-wide uppercase text-white">{centerNode.label}</span>
        </div>
      )}

      {/* Orbital graph */}
      <div
        className={`relative mx-auto flex items-center justify-center transition-opacity duration-200 ${fading ? "opacity-0" : "opacity-100"}`}
        style={{ width: "100%", maxWidth: radius * 2 + 160, height: radius * 2 + 120 }}
      >
        {/* connecting lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
          <g transform={`translate(${(radius * 2 + 160) / 2}, ${(radius * 2 + 120) / 2})`}>
            {neighbors.map((n, i) => {
              const angle = (i * (2 * Math.PI)) / neighbors.length - Math.PI / 2;
              const x = radius * Math.cos(angle);
              const y = radius * Math.sin(angle);
              return (
                <line
                  key={n.id}
                  x1={0}
                  y1={0}
                  x2={x}
                  y2={y}
                  stroke={n.type === "character" ? "#7f1d1d" : n.type === "phase" ? "#78350f" : "#3f3f46"}
                  strokeWidth={1}
                  opacity={0.7}
                />
              );
            })}
          </g>
        </svg>

        {/* center node */}
        <div className="absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
          <NodeBubble node={centerNode} size={78} emphasis />
        </div>

        {/* neighbor nodes */}
        {neighbors.map((n, i) => {
          const angle = (i * (2 * Math.PI)) / neighbors.length - Math.PI / 2;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          return (
            <div
              key={n.id}
              className="absolute"
              style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: "translate(-50%, -50%)" }}
            >
              <NodeBubble node={n} size={nodeSize} onClick={() => goTo(n.id)} />
            </div>
          );
        })}
      </div>

      {/* legend + open page link */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-[10px] uppercase tracking-wider text-stone-500">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full border border-amber-500/70" /> Phase</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full border border-white/60" /> Movie / Series</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full border border-red-500/70" /> Character</span>
      </div>

      <div className="text-center mt-6">
        <Link
          href={centerNode.href}
          className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-stone-400 hover:text-white transition-colors"
        >
          Open {centerNode.label} <ExternalLink size={12} />
        </Link>
      </div>
    </div>
  );
}
