"use client";

import React, { useMemo, useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Film, 
  Layers, 
  Users, 
  ArrowRight, 
  ExternalLink, 
  Search, 
  RotateCcw, 
  Zap, 
  Sparkles, 
  Info,
  ChevronRight,
  Compass
} from "lucide-react";
import { 
  resolveNode, 
  getNeighbors, 
  getAllSearchableNodes, 
  type WebNode, 
  type NodeType 
} from "@/lib/graph";

const TYPE_CONFIG: Record<
  NodeType, 
  { 
    icon: typeof Film; 
    border: string; 
    glow: string; 
    textColor: string; 
    bgBadge: string;
    lineColor: string;
    label: string;
  }
> = {
  phase: { 
    icon: Layers, 
    border: "border-amber-500", 
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.5)]", 
    textColor: "text-amber-400",
    bgBadge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    lineColor: "#f59e0b",
    label: "PHASE"
  },
  movie: { 
    icon: Film, 
    border: "border-cyan-400", 
    glow: "shadow-[0_0_20px_rgba(34,211,238,0.5)]", 
    textColor: "text-cyan-400",
    bgBadge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    lineColor: "#22d3ee",
    label: "FILM / SAGA"
  },
  character: { 
    icon: Users, 
    border: "border-red-500", 
    glow: "shadow-[0_0_20px_rgba(239,68,68,0.55)]", 
    textColor: "text-red-400",
    bgBadge: "bg-red-500/20 text-red-300 border-red-500/40",
    lineColor: "#ef4444",
    label: "HERO / VARIANT"
  },
};

const QUICK_NODES = [
  { id: "character:iron-man", label: "IRON MAN" },
  { id: "character:captain-america", label: "CAPTAIN AMERICA" },
  { id: "character:thor", label: "THOR" },
  { id: "character:loki", label: "LOKI" },
  { id: "character:spider-man", label: "SPIDER-MAN" },
  { id: "movie:avengers-endgame", label: "AVENGERS: ENDGAME" },
  { id: "movie:deadpool-and-wolverine", label: "DEADPOOL & WOLVERINE" },
  { id: "phase:3", label: "PHASE III" },
  { id: "character:doctor-strange", label: "DOCTOR STRANGE" },
  { id: "character:wanda-maximoff", label: "SCARLET WITCH" },
];

export default function ConnectionsWeb({ initialFocus }: { initialFocus: string }) {
  const [focus, setFocus] = useState(initialFocus);
  const [trail, setTrail] = useState<string[]>([]);
  const [fading, setFading] = useState(false);
  const [filterType, setFilterType] = useState<"all" | NodeType>("all");
  const [hoveredNode, setHoveredNode] = useState<WebNode | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFocus(initialFocus);
    setTrail([]);
  }, [initialFocus]);

  // Click outside to close search suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const centerNode = resolveNode(focus);
  const allNeighbors = useMemo(() => getNeighbors(focus), [focus]);

  const allSearchable = useMemo(() => getAllSearchableNodes(), []);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return allSearchable
      .filter((n) => n.label.toLowerCase().includes(q) || n.sublabel.toLowerCase().includes(q))
      .slice(0, 8);
  }, [searchQuery, allSearchable]);

  const filteredNeighbors = useMemo(() => {
    if (filterType === "all") return allNeighbors;
    return allNeighbors.filter((n) => n.type === filterType);
  }, [allNeighbors, filterType]);

  const goTo = useCallback(
    (id: string) => {
      if (id === focus) return;
      setFading(true);
      setSearchQuery("");
      setSearchOpen(false);
      setTimeout(() => {
        setTrail((t) => [...t, focus]);
        setFocus(id);
        setFilterType("all");
        setFading(false);
      }, 200);
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
      setFilterType("all");
      setFading(false);
    }, 200);
  }, []);

  const resetToDefault = useCallback(() => {
    goTo("character:iron-man");
    setTrail([]);
  }, [goTo]);

  if (!centerNode) {
    return (
      <div className="text-center py-20 text-stone-500 font-mono text-xs tracking-widest uppercase">
        Node coordinates not found in Quantum Graph.
      </div>
    );
  }

  const centerConfig = TYPE_CONFIG[centerNode.type];
  const CenterIcon = centerConfig.icon;

  // Multi-Ring Layout Geometry to avoid node overlapping:
  // If count <= 8 -> Single Ring radius = 220
  // If count > 8 -> Dual Concentric Rings (Inner ~190, Outer ~310)
  const count = filteredNeighbors.length;
  const isDualRing = count > 8;
  const innerRadius = 180;
  const outerRadius = 300;
  const maxRadius = isDualRing ? outerRadius : 220;

  const nodePositions = filteredNeighbors.map((n, i) => {
    let radius = 220;
    let angle = (i * (2 * Math.PI)) / count - Math.PI / 2;

    if (isDualRing) {
      const isOuter = i % 2 === 1;
      radius = isOuter ? outerRadius : innerRadius;
      // Stagger angles slightly for organic distribution
      angle = (i * (2 * Math.PI)) / count - Math.PI / 2;
    }

    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    return { node: n, x, y, radius, angle };
  });

  return (
    <div className="w-full flex flex-col items-center gap-8 relative select-none">
      
      {/* 1. TOP CONTROL BAR (UNIVERSAL SEARCH + QUICK FOCUS SHORTCUTS) */}
      <div className="w-full max-w-4xl flex flex-col gap-4 z-30">
        
        {/* Borderless Search Input with Dropdown Autocomplete */}
        <div ref={searchContainerRef} className="relative w-full">
          <div className="relative flex items-center bg-stone-950/80 px-4 py-3 rounded-xl border border-white/10 focus-within:border-white/30 focus-within:bg-stone-900/90 transition-all shadow-xl backdrop-blur-md">
            <Search size={16} className="text-stone-500 shrink-0 mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              placeholder="SEARCH (CHARACTER, MOVIE, OR PHASE TO RE-CENTER)..."
              className="w-full bg-transparent text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-stone-100 placeholder:text-stone-600 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSearchOpen(false);
                }}
                className="text-stone-500 hover:text-stone-300 text-[10px] font-mono tracking-widest px-2 py-0.5 uppercase cursor-pointer"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {searchOpen && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#0a0a0f] border border-stone-800 rounded-xl overflow-hidden shadow-2xl z-50 backdrop-blur-xl divide-y divide-stone-900">
              {searchResults.map((result) => {
                const conf = TYPE_CONFIG[result.type];
                const Icon = conf.icon;
                return (
                  <button
                    key={result.id}
                    onClick={() => goTo(result.id)}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-stone-900/80 transition-colors text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {result.image ? (
                        <img
                          src={result.image}
                          alt={result.label}
                          className="w-8 h-8 rounded-full object-cover border border-white/15 shrink-0"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center border border-white/15 shrink-0">
                          <Icon size={14} className={conf.textColor} />
                        </div>
                      )}
                      <div>
                        <div className="text-xs font-mono font-bold text-white group-hover:text-amber-200 transition-colors uppercase tracking-wider">
                          {result.label}
                        </div>
                        <div className="text-[10px] font-mono text-stone-500 uppercase tracking-wide">
                          {result.sublabel}
                        </div>
                      </div>
                    </div>
                    <span className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border ${conf.bgBadge}`}>
                      {conf.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Fast Focus Preset Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-mono tracking-widest uppercase">
          <span className="text-stone-600 mr-1 flex items-center gap-1">
            <Compass size={11} /> JUMP:
          </span>
          {QUICK_NODES.map((item) => (
            <button
              key={item.id}
              onClick={() => goTo(item.id)}
              className={`px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                focus === item.id
                  ? "bg-white text-black border-white font-bold shadow-[0_0_12px_rgba(255,255,255,0.4)]"
                  : "bg-black/60 border-stone-800 text-stone-400 hover:text-white hover:border-stone-600"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

      </div>

      {/* 2. TEMPORAL BREADCRUMB TRAIL (CAUSALITY PATH) */}
      {trail.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-1.5 px-4 py-2 bg-stone-950/60 rounded-full border border-white/5 backdrop-blur-md z-20">
          <button
            onClick={resetToDefault}
            className="text-[9.5px] font-mono tracking-widest uppercase text-stone-500 hover:text-white flex items-center gap-1 mr-1 transition-colors cursor-pointer"
            title="Reset to Genesis Node"
          >
            <RotateCcw size={10} />
            <span>ORIGIN</span>
          </button>
          <span className="text-stone-700">|</span>

          {trail.map((id, idx) => {
            const n = resolveNode(id);
            if (!n) return null;
            return (
              <span key={`${id}-${idx}`} className="flex items-center gap-1.5">
                <button
                  onClick={() => goToBreadcrumb(idx)}
                  className="text-[10px] font-mono tracking-wider uppercase text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
                >
                  {n.label}
                </button>
                <ChevronRight size={11} className="text-stone-600" />
              </span>
            );
          })}
          <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-white px-2 py-0.5 rounded bg-white/10 border border-white/20">
            {centerNode.label}
          </span>
        </div>
      )}

      {/* 3. NEIGHBOR FILTER RIBBON (CHARACTERS / MOVIES / PHASES) */}
      <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase z-20">
        <button
          onClick={() => setFilterType("all")}
          className={`px-3 py-1 rounded-md border transition-all cursor-pointer ${
            filterType === "all"
              ? "bg-white text-black border-white font-bold"
              : "bg-black/40 border-stone-800 text-stone-500 hover:text-stone-300"
          }`}
        >
          ALL CONNECTIONS ({allNeighbors.length})
        </button>

        {["character", "movie", "phase"].map((typeKey) => {
          const type = typeKey as NodeType;
          const countForType = allNeighbors.filter((n) => n.type === type).length;
          if (countForType === 0) return null;
          const conf = TYPE_CONFIG[type];

          return (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 rounded-md border transition-all cursor-pointer ${
                filterType === type
                  ? `${conf.bgBadge} font-bold shadow-md`
                  : "bg-black/40 border-stone-800 text-stone-500 hover:text-stone-300"
              }`}
            >
              {conf.label}S ({countForType})
            </button>
          );
        })}
      </div>

      {/* 4. SPATIAL QUANTUM GRAPH CANVAS */}
      <div
        className={`relative flex items-center justify-center transition-all duration-300 ease-out z-10 ${
          fading ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
        style={{
          width: "100%",
          maxWidth: maxRadius * 2 + 200,
          height: maxRadius * 2 + 200,
        }}
      >
        
        {/* SVG LASER QUANTUM CONNECTING TENDRILS */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Pulsing Gradient Lasers */}
            <linearGradient id="centerLaser" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor={centerConfig.lineColor} stopOpacity="0.2" />
            </linearGradient>
          </defs>

          <g transform={`translate(${(maxRadius * 2 + 200) / 2}, ${(maxRadius * 2 + 200) / 2})`}>
            {/* Background Radar Guide Rings */}
            <circle
              r={innerRadius}
              fill="none"
              stroke="#ffffff"
              strokeWidth="1"
              strokeDasharray="4 6"
              opacity="0.06"
            />
            {isDualRing && (
              <circle
                r={outerRadius}
                fill="none"
                stroke="#ffffff"
                strokeWidth="1"
                strokeDasharray="4 8"
                opacity="0.04"
              />
            )}

            {/* Connecting Laser Lines with animated glow */}
            {nodePositions.map(({ node, x, y }) => {
              const nodeConf = TYPE_CONFIG[node.type];
              const isHovered = hoveredNode?.id === node.id;

              return (
                <g key={`line-${node.id}`}>
                  {/* Base Line */}
                  <line
                    x1={0}
                    y1={0}
                    x2={x}
                    y2={y}
                    stroke={nodeConf.lineColor}
                    strokeWidth={isHovered ? 2 : 1}
                    opacity={isHovered ? 0.9 : 0.28}
                    className="transition-all duration-300"
                  />
                  {/* Energy Packet Pulse */}
                  <circle
                    cx={x * 0.5}
                    cy={y * 0.5}
                    r={isHovered ? 2.5 : 1.5}
                    fill={nodeConf.lineColor}
                    opacity={isHovered ? 1 : 0.6}
                    className="animate-pulse"
                  />
                </g>
              );
            })}
          </g>
        </svg>

        {/* CENTER HERO HUB (FOCUSED NODE) */}
        <div
          className="absolute z-20 group"
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
        >
          <div className="relative flex flex-col items-center gap-2">
            
            {/* Animated Rotating Orbital Radar Ring */}
            <div 
              className="absolute -inset-4 rounded-full border border-dashed border-white/20 animate-[spin_30s_linear_infinite] pointer-events-none"
            />

            {/* Radial Aura Glow */}
            <div
              className="absolute -inset-6 rounded-full opacity-35 blur-xl pointer-events-none"
              style={{ backgroundColor: centerConfig.lineColor }}
            />

            {/* Center Circular Photo / Icon */}
            <div className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-black border-2 ${centerConfig.border} ${centerConfig.glow} shadow-2xl overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
              {centerNode.image ? (
                <img
                  src={centerNode.image}
                  alt={centerNode.label}
                  className="w-full h-full rounded-full object-cover object-center filter brightness-105"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-stone-900 flex items-center justify-center">
                  <CenterIcon size={32} className="text-white" />
                </div>
              )}

              {/* Overlay Glass Flare */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/10 rounded-full pointer-events-none" />
            </div>

            {/* Floating Type Badge */}
            <span className={`text-[9px] font-mono font-bold tracking-[0.25em] uppercase px-2.5 py-0.5 rounded-full border shadow-lg ${centerConfig.bgBadge}`}>
              {centerConfig.label}
            </span>

            {/* Label & Sublabel */}
            <div className="text-center max-w-[200px] flex flex-col gap-0.5">
              <h2 className="text-sm sm:text-base font-mono font-bold tracking-wider text-white uppercase leading-snug drop-shadow-md">
                {centerNode.label}
              </h2>
              <p className="text-[10px] font-mono text-stone-400 tracking-wide line-clamp-1">
                {centerNode.sublabel}
              </p>
            </div>

          </div>
        </div>

        {/* NEIGHBOR NODES IN ORBIT */}
        {nodePositions.map(({ node, x, y }) => {
          const conf = TYPE_CONFIG[node.type];
          const NodeIcon = conf.icon;
          const isHovered = hoveredNode?.id === node.id;
          const nodeSize = count > 12 ? 46 : 54;

          return (
            <div
              key={node.id}
              className="absolute z-20"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
              }}
              onMouseEnter={() => setHoveredNode(node)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <button
                onClick={() => goTo(node.id)}
                className={`group flex flex-col items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                  isHovered ? "scale-125 z-30" : "hover:scale-110"
                }`}
                style={{ width: nodeSize + 50 }}
              >
                
                {/* Neighbor Node Circle with Photo Thumbnail */}
                <div
                  className={`relative rounded-full p-0.5 bg-black border-2 ${conf.border} ${
                    isHovered ? conf.glow : "shadow-md"
                  } transition-all duration-300 overflow-hidden flex items-center justify-center`}
                  style={{ width: nodeSize, height: nodeSize }}
                >
                  {node.image ? (
                    <img
                      src={node.image}
                      alt={node.label}
                      className="w-full h-full rounded-full object-cover object-center filter brightness-95 group-hover:brightness-110"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-stone-950 flex items-center justify-center">
                      <NodeIcon size={18} className={conf.textColor} />
                    </div>
                  )}

                  {/* Glass Sheen */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none rounded-full" />
                </div>

                {/* Node Label */}
                <span className="text-center font-mono text-[10.5px] font-bold text-stone-200 group-hover:text-white uppercase tracking-wider line-clamp-1 max-w-[110px] drop-shadow-sm">
                  {node.label}
                </span>

                {/* Micro Subtitle */}
                <span className="text-[8.5px] font-mono text-stone-500 group-hover:text-stone-300 uppercase tracking-widest line-clamp-1 max-w-[100px]">
                  {node.sublabel.split("·")[0].trim()}
                </span>

              </button>
            </div>
          );
        })}

      </div>

      {/* 5. FLOATING INTEL & PROVENANCE INSPECTOR DRAWER */}
      <div className="w-full max-w-2xl bg-[#08080d]/90 border border-stone-800/90 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        <div className="flex items-center gap-4">
          {centerNode.image && (
            <img
              src={centerNode.image}
              alt={centerNode.label}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-white/10 shrink-0 shadow-lg"
            />
          )}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border ${centerConfig.bgBadge}`}>
                {centerConfig.label}
              </span>
              <span className="text-[10px] font-mono uppercase text-stone-500">
                {allNeighbors.length} Multiverse Entanglements
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-mono font-bold text-white uppercase tracking-wider">
              {centerNode.label}
            </h3>
            {centerNode.description && (
              <p className="text-xs font-mono text-stone-400 line-clamp-2 max-w-md leading-relaxed">
                {centerNode.description}
              </p>
            )}
          </div>
        </div>

        {/* Action button to open full character / movie dossier */}
        <Link
          href={centerNode.href}
          className="shrink-0 w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-lg group"
        >
          <span>OPEN DOSSIER</span>
          <ArrowRight size={13} className="transform group-hover:translate-x-1 transition-transform" />
        </Link>

      </div>

      {/* 6. TYPE LEGEND FOOTER */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-mono uppercase tracking-widest text-stone-500 z-20">
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
          <span className="text-stone-300">Phase Milestones</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
          <span className="text-stone-300">Cinematic Releases</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
          <span className="text-stone-300">Heroes & Variants</span>
        </span>
      </div>

    </div>
  );
}
