"use client";

import React, { useState, useMemo, useRef, useCallback } from "react";
import { useTimelineState } from "@/context/TimelineStateContext";
import { CHARACTERS } from "@/data/characters";
import { ARTIFACTS } from "@/data/artifacts";
import { NEXUS_EVENTS } from "@/data/timelineTree";
import { getAllRelationshipsUpToPhase, type RelationshipEdge } from "@/data/relationships";
import { ZoomIn, ZoomOut, RotateCcw, Filter, Eye, Layers, Sparkles } from "lucide-react";

type GraphNodeType = "character" | "artifact" | "nexus";

type GraphNode = {
  id: string; // e.g. "character:loki" or "artifact:space-stone"
  rawId: string;
  type: GraphNodeType;
  label: string;
  sublabel: string;
  color: string;
  phaseIntroduced: number;
  x: number;
  y: number;
  iconChar: string;
};

// Preset balanced orbital & constellation coordinates for immersive aesthetic
const PRESET_COORDINATES: Record<string, { x: number; y: number }> = {
  // Center Trinity / Multiverse Anchors
  "character:loki": { x: 500, y: 380 },
  "character:wanda": { x: 340, y: 280 },
  "character:doctor-strange": { x: 660, y: 280 },
  "character:iron-man": { x: 380, y: 500 },
  "character:captain-america": { x: 620, y: 500 },
  "character:spider-man": { x: 500, y: 560 },
  "character:thanos": { x: 500, y: 220 },
  "character:kang-the-conqueror": { x: 260, y: 170 },
  "character:doctor-doom": { x: 740, y: 170 },
  "character:fantastic-four": { x: 830, y: 250 },
  "character:thor": { x: 230, y: 400 },
  "character:black-widow": { x: 770, y: 410 },
  "character:shang-chi": { x: 240, y: 570 },

  // Cosmic Artifacts
  "artifact:space-stone": { x: 350, y: 390 },
  "artifact:mind-stone": { x: 440, y: 430 },
  "artifact:time-stone": { x: 580, y: 340 },
  "artifact:the-darkhold": { x: 270, y: 270 },
  "artifact:ten-rings": { x: 170, y: 510 },
  "artifact:tva-tempad": { x: 410, y: 250 },
  "artifact:nano-gauntlet": { x: 480, y: 490 },

  // Nexus Events
  "nexus:nexus-time-heist": { x: 500, y: 440 },
  "nexus:nexus-citadel-death": { x: 380, y: 180 },
  "nexus:nexus-spider-spell": { x: 600, y: 440 },
  "nexus:nexus-darkhold-dreamwalk": { x: 420, y: 310 },
  "nexus:nexus-god-of-stories": { x: 500, y: 300 }
};

export default function CosmicGraph() {
  const { currentPhase, selectedNodeId, setSelectedNodeId } = useTimelineState();
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<"all" | "heroes" | "artifacts" | "multiverse">("all");

  // Pan and zoom state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // 1. Build Nodes based on current spoiler phase
  const nodes: GraphNode[] = useMemo(() => {
    const list: GraphNode[] = [];

    // Characters
    CHARACTERS.forEach((c) => {
      const charId = `character:${c.id}`;
      const coord = PRESET_COORDINATES[charId] || { x: 500, y: 400 };
      
      // Determine when character is first known/active
      const firstEra = c.eras[0];
      const introPhase = firstEra ? firstEra.phase : 1;

      if (introPhase <= currentPhase) {
        list.push({
          id: charId,
          rawId: c.id,
          type: "character",
          label: c.name,
          sublabel: c.role,
          color: c.color || "#38bdf8",
          phaseIntroduced: introPhase,
          x: coord.x,
          y: coord.y,
          iconChar: c.name.charAt(0)
        });
      }
    });

    // Artifacts
    ARTIFACTS.forEach((a) => {
      const artId = `artifact:${a.id}`;
      const coord = PRESET_COORDINATES[artId] || { x: 500, y: 400 };

      if (a.phaseIntroduced <= currentPhase) {
        list.push({
          id: artId,
          rawId: a.id,
          type: "artifact",
          label: a.name,
          sublabel: a.power,
          color: a.iconColor || "#f59e0b",
          phaseIntroduced: a.phaseIntroduced,
          x: coord.x,
          y: coord.y,
          iconChar: "✦"
        });
      }
    });

    // Nexus Events
    NEXUS_EVENTS.forEach((ne) => {
      const nexId = `nexus:${ne.id}`;
      const coord = PRESET_COORDINATES[nexId] || { x: 500, y: 400 };

      if (ne.phase <= currentPhase) {
        list.push({
          id: nexId,
          rawId: ne.id,
          type: "nexus",
          label: ne.title,
          sublabel: ne.impact,
          color: "#ec4899",
          phaseIntroduced: ne.phase,
          x: coord.x,
          y: coord.y,
          iconChar: "⎊"
        });
      }
    });

    return list;
  }, [currentPhase]);

  // 2. Build visible edges up to current spoiler phase
  const edges = useMemo(() => {
    const rawRels = getAllRelationshipsUpToPhase(currentPhase);
    const validNodeIds = new Set(nodes.map((n) => n.id));
    const result: (RelationshipEdge & { sourceNode: GraphNode; targetNode: GraphNode })[] = [];

    rawRels.forEach((r) => {
      // Find source node (could be character or artifact)
      const srcNode = nodes.find(
        (n) => n.rawId === r.source || n.id === `character:${r.source}` || n.id === `artifact:${r.source}`
      );
      const tgtNode = nodes.find(
        (n) => n.rawId === r.target || n.id === `character:${r.target}` || n.id === `artifact:${r.target}`
      );

      if (srcNode && tgtNode && validNodeIds.has(srcNode.id) && validNodeIds.has(tgtNode.id)) {
        result.push({
          ...r,
          sourceNode: srcNode,
          targetNode: tgtNode
        });
      }
    });

    return result;
  }, [currentPhase, nodes]);

  // Active focus (hovered or selected)
  const activeFocusId = hoveredNodeId || selectedNodeId;

  // Connected nodes map for highlighting
  const connectedNodeIds = useMemo(() => {
    if (!activeFocusId) return new Set<string>();
    const set = new Set<string>([activeFocusId]);
    edges.forEach((e) => {
      if (e.sourceNode.id === activeFocusId) set.add(e.targetNode.id);
      if (e.targetNode.id === activeFocusId) set.add(e.sourceNode.id);
    });
    return set;
  }, [activeFocusId, edges]);

  // Mouse pan handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === "BUTTON" || (e.target as HTMLElement).closest("button")) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  }, [pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y
    });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    setZoom((z) => Math.min(Math.max(0.5, z * zoomFactor), 2.5));
  }, []);

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Filtered nodes
  const filteredNodes = useMemo(() => {
    if (filterType === "heroes") return nodes.filter((n) => n.type === "character");
    if (filterType === "artifacts") return nodes.filter((n) => n.type === "artifact");
    if (filterType === "multiverse") return nodes.filter((n) => n.type === "nexus" || n.rawId.includes("loki") || n.rawId.includes("strange") || n.rawId.includes("wanda") || n.rawId.includes("kang"));
    return nodes;
  }, [nodes, filterType]);

  const filteredNodeIds = new Set(filteredNodes.map((n) => n.id));

  return (
    <div
      className="relative w-full h-[620px] md:h-[720px] bg-[#050508] border border-stone-900 rounded-2xl overflow-hidden shadow-2xl select-none cursor-grab active:cursor-grabbing group"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* Ambient background grid & cosmic nebulas */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(245,158,11,0.05),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(168,85,247,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_75%,rgba(6,182,212,0.05),transparent_55%)]" />
        {/* Subtle coordinate dot grid */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: "radial-gradient(#78716c 1px, transparent 1px)",
            backgroundSize: "32px 32px"
          }}
        />
      </div>

      {/* Floating Controls Bar (Top Left) */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1 bg-stone-950/80 backdrop-blur-md border border-stone-800/80 p-1 rounded-lg shadow-lg">
          <button
            onClick={() => setFilterType("all")}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
              filterType === "all" ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" : "text-stone-400 hover:text-white"
            }`}
          >
            All Entanglements ({nodes.length})
          </button>
          <button
            onClick={() => setFilterType("heroes")}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
              filterType === "heroes" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40" : "text-stone-400 hover:text-white"
            }`}
          >
            Characters
          </button>
          <button
            onClick={() => setFilterType("artifacts")}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
              filterType === "artifacts" ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/40" : "text-stone-400 hover:text-white"
            }`}
          >
            Relics & Stones
          </button>
          <button
            onClick={() => setFilterType("multiverse")}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
              filterType === "multiverse" ? "bg-purple-500/20 text-purple-300 border border-purple-500/40" : "text-stone-400 hover:text-white"
            }`}
          >
            Multiverse Nexus
          </button>
        </div>
      </div>

      {/* Zoom / Reset Controls (Top Right) */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-stone-950/80 backdrop-blur-md border border-stone-800/80 p-1 rounded-lg shadow-lg">
        <button
          onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))}
          className="p-1.5 rounded text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          title="Zoom In"
        >
          <ZoomIn size={15} />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(0.5, z - 0.2))}
          className="p-1.5 rounded text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut size={15} />
        </button>
        <button
          onClick={resetView}
          className="p-1.5 rounded text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          title="Reset Constellation View"
        >
          <RotateCcw size={15} />
        </button>
      </div>

      {/* Legend Bar (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-20 hidden sm:flex items-center gap-4 bg-stone-950/90 backdrop-blur-md border border-stone-800/80 px-3 py-1.5 rounded-lg text-[10px] font-mono text-stone-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" /> Sacred Filament
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" /> Conflict / Kill
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_6px_#a855f7]" /> Variant / Nexus
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#06b6d4]" /> Relic Bearer
        </span>
      </div>

      {/* SVG Canvas for Filaments & Nodes */}
      <svg
        className="w-full h-full pointer-events-auto"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "center center",
          transition: isDragging ? "none" : "transform 0.15s ease-out"
        }}
      >
        <defs>
          {/* Glowing filters for connections */}
          <filter id="gold-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Render Connection Filaments (Edges) */}
        <g className="filaments">
          {edges.map((e) => {
            const isConnectedToActive =
              activeFocusId &&
              (e.sourceNode.id === activeFocusId || e.targetNode.id === activeFocusId);
            
            const isDimmed =
              activeFocusId && !isConnectedToActive;

            // Color coding based on relation type
            let strokeColor = "#52525b"; // default muted
            let strokeWidth = 1.2;

            if (e.type === "relic_bearer") {
              strokeColor = "#06b6d4";
              strokeWidth = isConnectedToActive ? 2.5 : 1.5;
            } else if (e.type === "enemy" || e.type === "killed_by") {
              strokeColor = "#ef4444";
              strokeWidth = isConnectedToActive ? 2.5 : 1.5;
            } else if (e.type === "variant") {
              strokeColor = "#a855f7";
              strokeWidth = isConnectedToActive ? 2.5 : 1.5;
            } else if (e.type === "alliance" || e.type === "family") {
              strokeColor = "#f59e0b";
              strokeWidth = isConnectedToActive ? 2.5 : 1.5;
            }

            const opacity = isDimmed ? 0.12 : isConnectedToActive ? 0.95 : 0.45;

            // Compute curved bezier path
            const midX = (e.sourceNode.x + e.targetNode.x) / 2;
            const midY = (e.sourceNode.y + e.targetNode.y) / 2 - 20;

            return (
              <g key={e.id}>
                <path
                  d={`M ${e.sourceNode.x} ${e.sourceNode.y} Q ${midX} ${midY} ${e.targetNode.x} ${e.targetNode.y}`}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeOpacity={opacity}
                  strokeDasharray={e.type === "variant" ? "4,4" : undefined}
                  className="transition-all duration-300"
                />
                {isConnectedToActive && (
                  <text
                    x={midX}
                    y={midY - 6}
                    fill="#f5f5f4"
                    fontSize="10"
                    fontFamily="monospace"
                    textAnchor="middle"
                    className="bg-black/90 px-1 py-0.5 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                  >
                    {e.label}
                  </text>
                )}
              </g>
            );
          })}
        </g>

        {/* 2. Render Nodes */}
        <g className="nodes">
          {nodes.map((node) => {
            if (!filteredNodeIds.has(node.id)) return null;

            const isSelected = selectedNodeId === node.id;
            const isHovered = hoveredNodeId === node.id;
            const isConnected = connectedNodeIds.has(node.id);
            const isDimmed = activeFocusId && !isConnected;

            const nodeRadius = node.type === "character" ? 24 : node.type === "artifact" ? 20 : 18;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => setSelectedNodeId(node.id)}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                className="cursor-pointer transition-transform duration-200"
                style={{
                  opacity: isDimmed ? 0.25 : 1,
                  transform: isHovered || isSelected ? `translate(${node.x}px, ${node.y}px) scale(1.15)` : `translate(${node.x}px, ${node.y}px)`
                }}
              >
                {/* Outer Ring Pulse for active or selected node */}
                {(isSelected || isHovered) && (
                  <circle
                    r={nodeRadius + 8}
                    fill="none"
                    stroke={node.color}
                    strokeWidth="1.5"
                    strokeOpacity="0.8"
                    className="animate-ping"
                  />
                )}

                {/* Main Node Background Bubble */}
                <circle
                  r={nodeRadius}
                  fill="#0b0b10"
                  stroke={isSelected ? "#ffffff" : node.color}
                  strokeWidth={isSelected ? 3 : isConnected ? 2 : 1.5}
                  className="transition-colors duration-200 shadow-xl"
                  style={{
                    filter: isSelected || isHovered ? `drop-shadow(0 0 14px ${node.color})` : undefined
                  }}
                />

                {/* Node Center Icon / Initial */}
                <text
                  textAnchor="middle"
                  dy=".35em"
                  fill="#fafaf9"
                  fontSize={node.type === "character" ? "12" : "13"}
                  fontWeight="bold"
                  fontFamily="sans-serif"
                  className="select-none pointer-events-none"
                >
                  {node.iconChar}
                </text>

                {/* Label below node */}
                <text
                  y={nodeRadius + 14}
                  textAnchor="middle"
                  fill={isSelected ? "#ffffff" : isConnected ? "#f5f5f4" : "#a8a29e"}
                  fontSize={node.type === "character" ? "11" : "10"}
                  fontWeight={isSelected || isConnected ? "600" : "normal"}
                  fontFamily="sans-serif"
                  className="select-none pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                >
                  {node.label}
                </text>

                {/* Subtitle / Role */}
                {(isSelected || isHovered) && (
                  <text
                    y={nodeRadius + 26}
                    textAnchor="middle"
                    fill={node.color}
                    fontSize="9"
                    fontFamily="monospace"
                    className="select-none pointer-events-none uppercase tracking-wider"
                  >
                    {node.type === "character" ? "Character" : node.type === "artifact" ? "Cosmic Relic" : "Nexus Point"}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
