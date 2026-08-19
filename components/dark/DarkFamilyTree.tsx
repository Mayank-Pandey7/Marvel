"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  DARK_TREE_NODES,
  DARK_TREE_CONNECTIONS,
  DYNASTY_CLUSTERS,
  type DarkTreeNode,
  type OrthogonalConnection,
} from "@/data/darkFamilyTree";
import { CHARACTERS } from "@/data/characters";
import { useTimelineState } from "@/context/TimelineStateContext";
import SlideNavMenu from "@/components/dark/SlideNavMenu";
import SearchOverlay from "@/components/SearchOverlay";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  X,
  ExternalLink,
  ChevronRight,
  Menu,
  ArrowLeft,
  GitBranch,
} from "lucide-react";

// Dimensions of each character portrait card
const CARD_W = 110;
const CARD_H = 142;

export default function DarkFamilyTree({
  onSwitchToTimeline,
}: {
  onSwitchToTimeline?: () => void;
}) {
  const { currentPhase, setCurrentPhase } = useTimelineState();
  const [spoilerPhase, setSpoilerPhase] = useState<number>(currentPhase || 6);

  // Camera Pan & Zoom State (World coordinates 0..5000, 0..3000)
  const [camera, setCamera] = useState({ x: 0, y: 0, scale: 0.75 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Touch Gesture Tracking (1-finger pan & 2-finger pinch)
  const touchStartRef = useRef<{
    x: number;
    y: number;
    dist?: number;
    initialScale?: number;
    midX?: number;
    midY?: number;
  }>({ x: 0, y: 0 });

  // Selected & Hovered Node & Connection Line
  const [selectedNode, setSelectedNode] = useState<DarkTreeNode | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [hoveredConnId, setHoveredConnId] = useState<string | null>(null);

  // Navigation & Search Modals
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeCluster, setActiveCluster] = useState<string>("all");

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Global Keyboard Shortcuts (Ctrl+K or / for Search, Escape to deselect)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !searchOpen) {
        e.preventDefault();
        setSearchOpen(true);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        if (selectedNode) setSelectedNode(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen, selectedNode]);

  // Sync spoilerPhase with context
  useEffect(() => {
    if (currentPhase && currentPhase !== spoilerPhase) {
      setSpoilerPhase(currentPhase);
    }
  }, [currentPhase]);

  // Visible Nodes based on Spoiler Phase
  const visibleNodes = useMemo(() => {
    return DARK_TREE_NODES.filter((n) => n.phaseIntroduced <= spoilerPhase);
  }, [spoilerPhase]);

  // Visible Connections based on Spoiler Phase & Visible Nodes
  const visibleConnections = useMemo(() => {
    const nodeIds = new Set(visibleNodes.map((n) => n.id));
    return DARK_TREE_CONNECTIONS.filter(
      (c) =>
        c.phaseRevealed <= spoilerPhase &&
        nodeIds.has(c.fromId) &&
        nodeIds.has(c.toId)
    );
  }, [visibleNodes, spoilerPhase]);

  // Highlighted connected paths & nodes on Hover / Select
  const activeFocusId = hoveredNodeId || selectedNode?.id || null;

  const { connectedNodeIds, connectedConnectionIds } = useMemo(() => {
    const nIds = new Set<string>();
    const cIds = new Set<string>();

    if (activeFocusId) {
      nIds.add(activeFocusId);
      visibleConnections.forEach((conn) => {
        if (conn.fromId === activeFocusId || conn.toId === activeFocusId) {
          nIds.add(conn.fromId);
          nIds.add(conn.toId);
          cIds.add(conn.id);

          // If this is a child connection, illuminate the parental marriage bridge and co-parent
          if (conn.type === "child" && conn.toId === activeFocusId) {
            const partnerConn = visibleConnections.find(
              (c) =>
                c.type === "partner" &&
                (c.fromId === conn.fromId || c.toId === conn.fromId)
            );
            if (partnerConn) {
              nIds.add(partnerConn.fromId);
              nIds.add(partnerConn.toId);
              cIds.add(partnerConn.id);
            }
          }
        }
      });
    }

    if (hoveredConnId) {
      cIds.add(hoveredConnId);
      const hoveredConn = visibleConnections.find((c) => c.id === hoveredConnId);
      if (hoveredConn) {
        nIds.add(hoveredConn.fromId);
        nIds.add(hoveredConn.toId);
      }
    }

    return { connectedNodeIds: nIds, connectedConnectionIds: cIds };
  }, [activeFocusId, hoveredConnId, visibleConnections]);

  // Pan Camera to Focus on Coordinates with Responsive Scaling
  const focusOnCoordinates = useCallback(
    (targetX: number, targetY: number, customScale?: number) => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth || window.innerWidth;
      const height = containerRef.current.clientHeight || window.innerHeight;

      const isMobile = width < 640;
      const isTablet = width >= 640 && width < 1024;

      // Auto-calculate optimal responsive scale
      const defaultScale = isMobile ? 0.68 : isTablet ? 0.58 : 0.62;
      const targetScale = customScale || defaultScale;

      const newX = width / 2 - targetX * targetScale;
      const newY = height / 2 - targetY * targetScale;

      setCamera({ x: newX, y: newY, scale: targetScale });
    },
    []
  );

  const focusOnNode = useCallback(
    (node: DarkTreeNode) => {
      setSelectedNode(node);
      const isMobile = (typeof window !== "undefined" ? window.innerWidth : 1000) < 640;
      focusOnCoordinates(
        node.x + CARD_W / 2,
        node.y + CARD_H / 2,
        isMobile ? 0.85 : 0.95
      );
    },
    [focusOnCoordinates]
  );

  const focusOnCluster = useCallback(
    (clusterId: string) => {
      setActiveCluster((prev) => (prev === clusterId ? "all" : clusterId));
      setSelectedNode(null);
      setHoveredNodeId(null);
      const width = typeof window !== "undefined" ? window.innerWidth : 1200;
      const isMobile = width < 640;

      if (clusterId === "all") {
        focusOnCoordinates(1500, 1000, isMobile ? 0.26 : 0.38);
        return;
      }
      const clusterMeta = DYNASTY_CLUSTERS.find((c) => c.id === clusterId);
      if (clusterMeta && "focusX" in clusterMeta) {
        // Smooth, focused framing on the selected dynasty
        focusOnCoordinates(
          clusterMeta.focusX,
          clusterMeta.focusY,
          isMobile ? 0.78 : 0.92
        );
      }
    },
    [focusOnCoordinates]
  );

  // Responsive Initial Frame on Mount & Window Resize
  useEffect(() => {
    const handleViewportResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile: Frame on House of Odin & Stark Dynasty prominently
        focusOnCoordinates(980, 330, 0.68);
      } else if (width < 1024) {
        focusOnCoordinates(1150, 600, 0.48);
      } else {
        focusOnCoordinates(1200, 850, 0.58);
      }
    };

    handleViewportResize();
    window.addEventListener("resize", handleViewportResize);
    window.addEventListener("orientationchange", handleViewportResize);
    return () => {
      window.removeEventListener("resize", handleViewportResize);
      window.removeEventListener("orientationchange", handleViewportResize);
    };
  }, [focusOnCoordinates]);

  // Ambient Star Dust Particle Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.35 + 0.08,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const rafRef = useRef<number | null>(null);

  // Mouse Pan Handling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).closest(
        "button, a, input, aside, nav, header, [role='button'], .dossier-card, .no-map-drag, .search-overlay"
      )
    )
      return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - camera.x, y: e.clientY - camera.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const nextX = e.clientX - dragStart.x;
    const nextY = e.clientY - dragStart.y;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setCamera((prev) => ({
        ...prev,
        x: nextX,
        y: nextY,
      }));
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  // Wheel Zoom Handling (Smooth Focal Point Zooming)
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    setCamera((prev) => {
      const nextScale = Math.min(Math.max(prev.scale * zoomFactor, 0.15), 1.8);
      if (!containerRef.current) return { ...prev, scale: nextScale };

      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const newX = mouseX - (mouseX - prev.x) * (nextScale / prev.scale);
      const newY = mouseY - (mouseY - prev.y) * (nextScale / prev.scale);

      return { x: newX, y: newY, scale: nextScale };
    });
  };

  // Touch Gestures: 1-Finger Smooth Pan & 2-Finger Responsive Pinch-to-Zoom
  const handleTouchStart = (e: React.TouchEvent) => {
    if (
      (e.target as HTMLElement).closest(
        "button, a, input, aside, nav, header, [role='button'], .dossier-card, .no-map-drag, .search-overlay"
      )
    )
      return;

    if (e.touches.length === 1) {
      setIsDragging(true);
      touchStartRef.current = {
        x: e.touches[0].clientX - camera.x,
        y: e.touches[0].clientY - camera.y,
      };
    } else if (e.touches.length === 2) {
      setIsDragging(true);
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const midX = (t1.clientX + t2.clientX) / 2;
      const midY = (t1.clientY + t2.clientY) / 2;

      touchStartRef.current = {
        x: midX - camera.x,
        y: midY - camera.y,
        dist,
        initialScale: camera.scale,
        midX,
        midY,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    if (e.touches.length === 1) {
      const newX = e.touches[0].clientX - touchStartRef.current.x;
      const newY = e.touches[0].clientY - touchStartRef.current.y;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setCamera((prev) => ({ ...prev, x: newX, y: newY }));
      });
    } else if (e.touches.length === 2 && touchStartRef.current.dist) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const zoomRatio = dist / touchStartRef.current.dist;
      const nextScale = Math.min(
        Math.max((touchStartRef.current.initialScale || 0.6) * zoomRatio, 0.15),
        1.8
      );

      const midX = (t1.clientX + t2.clientX) / 2;
      const midY = (t1.clientY + t2.clientY) / 2;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setCamera((prev) => {
          const newX = midX - (touchStartRef.current.x || 0);
          const newY = midY - (touchStartRef.current.y || 0);
          return { x: newX, y: newY, scale: nextScale };
        });
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  // Zoom Button Controls
  const zoomIn = () =>
    setCamera((prev) => ({
      ...prev,
      scale: Math.min(prev.scale * 1.25, 1.8),
    }));
  const zoomOut = () =>
    setCamera((prev) => ({
      ...prev,
      scale: Math.max(prev.scale * 0.8, 0.15),
    }));
  const resetView = () => {
    const isMobile = (typeof window !== "undefined" ? window.innerWidth : 1200) < 640;
    focusOnCoordinates(1500, 1000, isMobile ? 0.26 : 0.38);
  };

  // Selected Character Details from Full DB
  const fullCharacterData = useMemo(() => {
    if (!selectedNode || !selectedNode.characterId) return null;
    return CHARACTERS.find((c) => c.id === selectedNode.characterId) || null;
  }, [selectedNode]);

  // Helper to compute Orthogonal Line SVG Paths
  const computeOrthogonalPath = (
    conn: OrthogonalConnection
  ): {
    path: string;
    junction?: { x: number; y: number; symbol: string };
    arrow?: { x: number; y: number; dir: "down" | "right" | "left" | "up" };
  } | null => {
    const fromNode = visibleNodes.find((n) => n.id === conn.fromId);
    const toNode = visibleNodes.find((n) => n.id === conn.toId);
    if (!fromNode || !toNode) return null;

    const w = CARD_W; // 110
    const h = CARD_H; // 142
    const fromCenterX = fromNode.x + w / 2;
    const fromCenterY = fromNode.y + h / 2;
    const toCenterX = toNode.x + w / 2;
    const toCenterY = toNode.y + h / 2;

    // 1. PARTNER (Marriage / Couple Horizontal Bridge)
    if (conn.type === "partner") {
      const isLeftToRight = fromNode.x < toNode.x;
      const startX = isLeftToRight ? fromNode.x + w : fromNode.x;
      const endX = isLeftToRight ? toNode.x : toNode.x + w;
      const y = fromNode.y + h / 2;
      const junctionX = (startX + endX) / 2;

      return {
        path: `M ${startX} ${y} H ${endX}`,
        junction: { x: junctionX, y, symbol: "+" },
      };
    }

    // 2. CHILD (Parent(s) to Child)
    if (conn.type === "child" || conn.type === "creator") {
      // Check if parent has a marriage partner on the same tier in visibleConnections
      const partnerConn = visibleConnections.find(
        (c) =>
          c.type === "partner" &&
          (c.fromId === conn.fromId || c.toId === conn.fromId)
      );

      let startX = fromCenterX;
      let startY = fromNode.y + h; // Bottom edge of parent card

      // If parent is married, originate the child lineage stem from the marriage junction knot
      if (partnerConn) {
        const p1 = visibleNodes.find((n) => n.id === partnerConn.fromId);
        const p2 = visibleNodes.find((n) => n.id === partnerConn.toId);
        if (p1 && p2 && Math.abs(p1.y - p2.y) < 30) {
          const leftP = p1.x < p2.x ? p1 : p2;
          const rightP = p1.x < p2.x ? p2 : p1;
          startX = (leftP.x + w + rightP.x) / 2;
          startY = leftP.y + h / 2;
        }
      }

      const endX = toCenterX;
      const endY = toNode.y; // Top edge of child card

      // If vertically aligned: pure straight vertical drop
      if (Math.abs(startX - endX) < 6) {
        return {
          path: `M ${startX} ${startY} V ${endY}`,
          arrow:
            conn.hasArrow !== false
              ? { x: endX, y: endY - 3, dir: "down" }
              : undefined,
        };
      }

      // Stepped 90° Manhattan line through the channel between parent and child rows
      const midY = conn.midY || fromNode.y + h + 22;
      return {
        path: `M ${startX} ${startY} V ${midY} H ${endX} V ${endY}`,
        arrow:
          conn.hasArrow !== false
            ? { x: endX, y: endY - 3, dir: "down" }
            : undefined,
      };
    }

    // 3. VARIANT / MENTOR / PARADOX / ALLY
    if (
      conn.type === "variant" ||
      conn.type === "mentor" ||
      conn.type === "paradox"
    ) {
      // If horizontally aligned on same tier
      if (Math.abs(fromNode.y - toNode.y) < 30) {
        const isLeft = fromNode.x < toNode.x;
        const startX = isLeft ? fromNode.x + w : fromNode.x;
        const endX = isLeft ? toNode.x : toNode.x + w;
        const y = fromNode.y + h / 2;

        return {
          path: `M ${startX} ${y} H ${endX}`,
          arrow: conn.hasArrow
            ? {
                x: isLeft ? endX - 3 : endX + 3,
                y,
                dir: isLeft ? "right" : "left",
              }
            : undefined,
        };
      }

      // Mentor side-to-side corridor routing (e.g. Tony Stark -> Peter Parker)
      if (conn.type === "mentor") {
        const isFromRight = fromNode.x > toNode.x;
        const startX = isFromRight ? fromNode.x : fromNode.x + w;
        const startY = fromNode.y + h * 0.55;
        const endX = isFromRight ? toNode.x + w : toNode.x;
        const endY = toNode.y + h * 0.45;
        const channelX = (startX + endX) / 2;

        return {
          path: `M ${startX} ${startY} H ${channelX} V ${endY} H ${endX}`,
          arrow: {
            x: isFromRight ? endX + 4 : endX - 4,
            y: endY,
            dir: isFromRight ? "left" : "right",
          },
        };
      }

      // Otherwise stepped down from bottom to top
      const startX = fromCenterX;
      const startY = fromNode.y + h;
      const endX = toCenterX;
      const endY = toNode.y;
      const midY = conn.midY || startY + 22;

      return {
        path: `M ${startX} ${startY} V ${midY} H ${endX} V ${endY}`,
        arrow: conn.hasArrow
          ? { x: endX, y: endY - 3, dir: "down" }
          : undefined,
      };
    }

    // Default 90° step
    return {
      path: `M ${fromCenterX} ${fromNode.y + h} V ${
        (fromNode.y + h + toNode.y) / 2
      } H ${toCenterX} V ${toNode.y}`,
      arrow: { x: toCenterX, y: toNode.y - 3, dir: "down" },
    };
  };

  // Memoize all orthogonal paths to prevent costly recalculations during camera movement
  const pathMap = useMemo(() => {
    const map = new Map<string, ReturnType<typeof computeOrthogonalPath>>();
    visibleConnections.forEach((conn) => {
      map.set(conn.id, computeOrthogonalPath(conn));
    });
    return map;
  }, [visibleConnections, visibleNodes]);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      className="relative w-screen h-screen overflow-hidden bg-[#000000] text-stone-100 select-none cursor-grab active:cursor-grabbing font-sans touch-none"
      style={{ touchAction: "none" }}
    >
      {/* Background Animated Mist Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-30"
      />

      {/* Atmospheric Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,rgba(12,12,18,0.2)_0%,rgba(0,0,0,0.92)_100%)]" />

      {/* ------------------------------------------------------------- */}
      {/* TOP HEADER: RESPONSIVE MATCH WITH PAGESHELL & UNIVERSEMAP    */}
      {/* ------------------------------------------------------------- */}
      <header className="fixed top-0 left-0 right-0 w-full px-3 sm:px-8 py-2.5 sm:py-4 flex items-center justify-between z-50 bg-transparent backdrop-blur-sm transition-colors pointer-events-none">
        
        {/* Left: Drawer Menu Toggle + Mode Switcher */}
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          <button
            onClick={() => setNavMenuOpen(true)}
            className="text-stone-400 hover:text-white transition-colors cursor-pointer p-1.5 rounded-full bg-black/50 border border-stone-800/80 backdrop-blur-md shadow-lg"
            title="Open Menu Drawer"
            aria-label="Open Menu Drawer"
          >
            <Menu size={15} />
          </button>

          {/* View Mode Toggle Pill */}
          <div className="flex items-center bg-black/60 border border-stone-800/80 rounded-full p-0.5 backdrop-blur-md shadow-lg">
            <button
              className="px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-mono tracking-[0.15em] sm:tracking-[0.2em] uppercase font-bold bg-white text-black shadow-sm transition-all"
              title="Sacred Family Tree Lineage View"
            >
              FAMILY TREE
            </button>
            {onSwitchToTimeline && (
              <button
                onClick={onSwitchToTimeline}
                className="px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-mono tracking-[0.15em] sm:tracking-[0.2em] uppercase text-stone-400 hover:text-white transition-all flex items-center gap-1"
                title="Switch to MCU Chronological Timeline Map"
              >
                <GitBranch size={10} />
                <span className="hidden sm:inline">TIMELINE MAP</span>
              </button>
            )}
          </div>
        </div>

        {/* Center: Spaced MARVEL Brand Logo */}
        <div className="flex items-center justify-center pointer-events-auto">
          <Link 
            href="/" 
            className="text-[10px] sm:text-xs md:text-sm font-mono font-medium tracking-[0.35em] sm:tracking-[0.55em] uppercase text-white hover:text-white/80 transition-opacity select-none pl-[0.35em] sm:pl-[0.55em]"
          >
            MARVEL
          </Link>
        </div>

        {/* Right: Phase Filter + Return Link + Search Trigger */}
        <div className="flex items-center gap-2 sm:gap-4 pointer-events-auto">
          {/* Phase Spoiler Selector Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-stone-800/80 backdrop-blur-md shadow-lg">
            <span className="text-[8.5px] font-mono uppercase tracking-widest text-stone-400">
              PHASE:
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5, 6].map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setSpoilerPhase(p);
                    setCurrentPhase(p);
                  }}
                  className={`w-4.5 h-4.5 rounded-full text-[8.5px] font-mono flex items-center justify-center transition-all cursor-pointer ${
                    spoilerPhase >= p
                      ? "bg-white text-black font-bold shadow-[0_0_6px_rgba(255,255,255,0.6)]"
                      : "bg-stone-900 text-stone-600 hover:text-stone-300"
                  }`}
                  title={`Unlock Phase ${p}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white text-[9.5px] sm:text-[11px] font-mono tracking-[0.15em] sm:tracking-[0.25em] uppercase transition-colors group cursor-pointer"
          >
            <ArrowLeft size={11} className="text-stone-500 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">RETURN</span>
          </Link>

          <button
            onClick={() => setSearchOpen(true)}
            className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white text-[9.5px] sm:text-[11px] font-mono tracking-[0.15em] sm:tracking-[0.25em] uppercase transition-colors group cursor-pointer p-1"
            title="Search MCU (Ctrl+K or /)"
          >
            <Search size={13} className="text-stone-500 group-hover:text-white transition-colors" />
            <span className="hidden sm:inline">SEARCH</span>
            <kbd className="hidden md:inline-block text-[9px] font-mono text-stone-500 ml-0.5">
              /
            </kbd>
          </button>
        </div>
      </header>

      {/* Slide Navigation Drawer */}
      <SlideNavMenu isOpen={navMenuOpen} onClose={() => setNavMenuOpen(false)} />

      {/* ------------------------------------------------------------- */}
      {/* 2D SPATIAL ZOOMABLE CANVAS                                   */}
      {/* ------------------------------------------------------------- */}
      <div
        className="absolute inset-0 origin-top-left pointer-events-auto"
        style={{
          transform: `translate3d(${camera.x}px, ${camera.y}px, 0) scale(${camera.scale})`,
          width: "5000px",
          height: "3000px",
          transition: isDragging ? "none" : "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "transform",
        }}
      >
        {/* SVG Orthogonal Line Network */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 5000 3000"
          style={{ overflow: "visible" }}
        >
          <defs>
            <filter id="dark-line-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Render All Orthogonal Line Connections */}
          {visibleConnections.map((conn) => {
            const data = pathMap.get(conn.id);
            if (!data) return null;

            const fromNode = visibleNodes.find((n) => n.id === conn.fromId);
            const toNode = visibleNodes.find((n) => n.id === conn.toId);
            const isDynastyIsolated = activeCluster !== "all";
            const connInActiveDynasty = !isDynastyIsolated || (fromNode?.cluster === activeCluster && toNode?.cluster === activeCluster);

            // Lines ONLY glow when directly hovered or when connected to the hovered/selected character!
            const isDirectlyHovered = hoveredConnId === conn.id;
            const isConnectedToFocus = connectedConnectionIds.has(conn.id);
            const isHighlighted = isDirectlyHovered || isConnectedToFocus;
            const isDimmed = (activeFocusId || hoveredConnId)
              ? !isHighlighted
              : (isDynastyIsolated && !connInActiveDynasty);

            return (
              <g
                key={conn.id}
                className={`transition-all duration-300 pointer-events-auto ${
                  isDimmed ? "opacity-10 filter blur-[1px]" : "opacity-100"
                }`}
                onMouseEnter={() => setHoveredConnId(conn.id)}
                onMouseLeave={() => setHoveredConnId(null)}
              >
                {/* Wide invisible hit-box for easy line hovering */}
                <path
                  d={data.path}
                  fill="none"
                  stroke="transparent"
                  strokeWidth="14"
                  className="cursor-pointer pointer-events-auto"
                />

                {/* Radiant Bloom Line Glow - ONLY visible on hover / active focus */}
                {isHighlighted && (
                  <path
                    d={data.path}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="3.5"
                    filter="url(#dark-line-glow)"
                    opacity="0.9"
                    className="pointer-events-none transition-opacity duration-200"
                  />
                )}

                {/* Primary Orthogonal Manhattan Line */}
                <path
                  d={data.path}
                  fill="none"
                  stroke={isHighlighted ? "#ffffff" : "rgba(255, 255, 255, 0.18)"}
                  strokeWidth={isHighlighted ? "2" : "1"}
                  strokeDasharray={
                    conn.type === "variant" ||
                    conn.type === "paradox" ||
                    conn.type === "mentor"
                      ? "4 4"
                      : undefined
                  }
                  className="transition-colors duration-200 pointer-events-none"
                />

                {/* Marriage / Partnership Junction Node Cross */}
                {data.junction && (
                  <g
                    transform={`translate(${data.junction.x}, ${data.junction.y})`}
                    className="pointer-events-none transition-all duration-200"
                  >
                    <circle
                      r="4.5"
                      fill="#000000"
                      stroke={isHighlighted ? "#ffffff" : "rgba(255, 255, 255, 0.45)"}
                      strokeWidth={isHighlighted ? "1.5" : "1"}
                    />
                    <line
                      x1="-2.5"
                      y1="0"
                      x2="2.5"
                      y2="0"
                      stroke={isHighlighted ? "#ffffff" : "rgba(255, 255, 255, 0.6)"}
                      strokeWidth={isHighlighted ? "1.5" : "1"}
                    />
                    <line
                      x1="0"
                      y1="-2.5"
                      x2="0"
                      y2="2.5"
                      stroke={isHighlighted ? "#ffffff" : "rgba(255, 255, 255, 0.6)"}
                      strokeWidth={isHighlighted ? "1.5" : "1"}
                    />
                  </g>
                )}

                {/* Directional Arrowhead Marker */}
                {data.arrow && data.arrow.dir === "down" && (
                  <polygon
                    points={`${data.arrow.x},${data.arrow.y + 1} ${data.arrow.x - 3},${data.arrow.y - 4} ${data.arrow.x + 3},${data.arrow.y - 4}`}
                    fill={isHighlighted ? "#ffffff" : "rgba(255, 255, 255, 0.45)"}
                    className="pointer-events-none transition-colors duration-200"
                  />
                )}
                {data.arrow && data.arrow.dir === "right" && (
                  <polygon
                    points={`${data.arrow.x + 1},${data.arrow.y} ${data.arrow.x - 4},${data.arrow.y - 3} ${data.arrow.x - 4},${data.arrow.y + 3}`}
                    fill={isHighlighted ? "#ffffff" : "rgba(255, 255, 255, 0.45)"}
                    className="pointer-events-none transition-colors duration-200"
                  />
                )}
                {data.arrow && data.arrow.dir === "left" && (
                  <polygon
                    points={`${data.arrow.x - 1},${data.arrow.y} ${data.arrow.x + 4},${data.arrow.y - 3} ${data.arrow.x + 4},${data.arrow.y + 3}`}
                    fill={isHighlighted ? "#ffffff" : "rgba(255, 255, 255, 0.45)"}
                    className="pointer-events-none transition-colors duration-200"
                  />
                )}

                {/* Connection Label Tag on Highlight */}
                {conn.label && isHighlighted && (
                  <text
                    x={
                      (visibleNodes.find((n) => n.id === conn.fromId)?.x || 0) + 40
                    }
                    y={
                      (visibleNodes.find((n) => n.id === conn.fromId)?.y || 0) + 70
                    }
                    fill="#ffffff"
                    fontSize="8"
                    fontFamily="monospace"
                    letterSpacing="0.15em"
                    className="select-none uppercase"
                  >
                    {conn.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* ------------------------------------------------------------- */}
        {/* CHARACTER PORTRAIT CARDS (Exact Dark Visual Aesthetics)       */}
        {/* ------------------------------------------------------------- */}
        {visibleNodes.map((node) => {
          const isSelected = selectedNode?.id === node.id;
          const isHovered = hoveredNodeId === node.id;
          const isConnected = connectedNodeIds.has(node.id);
          const isDynastyIsolated = activeCluster !== "all";
          const inActiveDynasty = !isDynastyIsolated || node.cluster === activeCluster;
          const isDimmed = activeFocusId ? !isConnected : !inActiveDynasty;

          return (
            <div
              key={node.id}
              onClick={() => focusOnNode(node)}
              onMouseEnter={() => setHoveredNodeId(node.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
              className={`absolute cursor-pointer flex flex-col items-center group transition-all duration-300 ${
                isDimmed
                  ? "opacity-10 pointer-events-none scale-95 select-none z-0"
                  : "opacity-100 scale-100 pointer-events-auto"
              }`}
              style={{
                left: `${node.x}px`,
                top: `${node.y}px`,
                width: `${CARD_W}px`,
                zIndex: isSelected ? 40 : isHovered ? 35 : isDimmed ? 0 : 10,
              }}
            >
              {/* Vertical Rectangular Character Portrait Card */}
              <div
                className={`relative w-[110px] h-[142px] bg-[#09090d] rounded-sm border transition-all duration-300 overflow-hidden shadow-2xl ${
                  isSelected
                    ? "border-white ring-2 ring-white/40 shadow-[0_0_25px_rgba(255,255,255,0.7)] scale-105"
                    : isHovered
                    ? "border-white shadow-[0_0_18px_rgba(255,255,255,0.4)] scale-105"
                    : "border-stone-800 group-hover:border-stone-500"
                }`}
              >
                {node.isMystery ? (
                  // Mystery Placeholder Node
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#07070a] text-stone-600 border border-dashed border-stone-800">
                    <span className="text-3xl font-mono font-light text-stone-500 group-hover:text-white transition-colors">
                      ?
                    </span>
                    <span className="text-[8px] font-mono tracking-widest uppercase text-stone-600 mt-1">
                      ENCRYPTED
                    </span>
                  </div>
                ) : (
                  // Character Portrait Image with Monogram Fallback
                  <div className="relative w-full h-full bg-[#0d0d14] flex items-center justify-center">
                    {/* Fallback Monogram Avatar */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-1.5 bg-gradient-to-b from-stone-900 to-black pointer-events-none">
                      <span className="font-mono text-lg font-bold text-stone-400 uppercase tracking-widest">
                        {node.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
                      </span>
                      <span className="text-[7px] font-mono tracking-tighter uppercase text-stone-600 mt-1 line-clamp-1">
                        {node.clusterLabel}
                      </span>
                    </div>

                    <img
                      src={node.photoUrl || ""}
                      alt={node.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover object-top grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:brightness-105 transition-all duration-500 z-10"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />

                    {/* Gradient Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none z-20" />

                    {/* Phase Indicator Dot */}
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white/40 group-hover:bg-white transition-colors z-20" />
                  </div>
                )}
              </div>

              {/* Character Name & Subtitle Beneath Card */}
              <div className="mt-2.5 flex flex-col items-center text-center w-[150px] -ml-[20px]">
                <h3
                  className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold leading-tight line-clamp-1 transition-colors ${
                    isSelected || isHovered
                      ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                      : "text-stone-300"
                  }`}
                >
                  {node.name}
                </h3>
                {node.subtitle && (
                  <p className="text-[8px] sm:text-[8.5px] font-mono tracking-widest uppercase text-stone-400 line-clamp-1 mt-0.5">
                    {node.subtitle}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* BOTTOM DYNASTY CLUSTER NAVIGATION TABS (Fluid Ribbon)        */}
      {/* ------------------------------------------------------------- */}
      <footer className="fixed bottom-3 sm:bottom-4 left-0 right-0 z-30 flex items-center justify-center px-2 sm:px-4 pointer-events-none">
        <div className="no-map-drag pointer-events-auto flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-full sm:max-w-5xl py-1.5 sm:py-2 px-2.5 sm:px-3 bg-black/80 border border-stone-800/80 rounded-full backdrop-blur-xl shadow-2xl no-scrollbar">
          {DYNASTY_CLUSTERS.map((dynasty) => {
            const isActive = activeCluster === dynasty.id;
            return (
              <button
                key={dynasty.id}
                onClick={() => focusOnCluster(dynasty.id)}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-[8.5px] sm:text-[9px] font-mono tracking-widest uppercase whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-white text-black font-bold shadow-md"
                    : "text-stone-400 hover:text-white hover:bg-stone-900/60"
                }`}
              >
                {dynasty.label}
              </button>
            );
          })}
        </div>
      </footer>

      {/* ------------------------------------------------------------- */}
      {/* FLOATING ZOOM & CANVAS CONTROLS (Bottom Left)                */}
      {/* ------------------------------------------------------------- */}
      <div className="fixed bottom-3 sm:bottom-4 left-3 sm:left-6 z-30 flex items-center gap-1.5 pointer-events-auto">
        <button
          onClick={zoomIn}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/80 border border-stone-800 hover:border-white/60 text-stone-400 hover:text-white flex items-center justify-center text-xs transition-colors backdrop-blur-md cursor-pointer shadow-lg"
          title="Zoom In"
        >
          <ZoomIn size={13} />
        </button>
        <button
          onClick={zoomOut}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/80 border border-stone-800 hover:border-white/60 text-stone-400 hover:text-white flex items-center justify-center text-xs transition-colors backdrop-blur-md cursor-pointer shadow-lg"
          title="Zoom Out"
        >
          <ZoomOut size={13} />
        </button>
        <button
          onClick={resetView}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/80 border border-stone-800 hover:border-white/60 text-stone-400 hover:text-white flex items-center justify-center text-xs transition-colors backdrop-blur-md cursor-pointer shadow-lg"
          title="Fit All Families"
        >
          <RotateCcw size={12} />
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* RESPONSIVE CHARACTER DOSSIER DRAWER (Sidebar / Bottom Sheet) */}
      {/* ------------------------------------------------------------- */}
      {selectedNode && (
        <>
          {/* Mobile Backdrop overlay */}
          <div
            onClick={() => setSelectedNode(null)}
            className="md:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-xs"
          />

          <aside className="dossier-card fixed bottom-0 md:top-0 right-0 left-0 md:left-auto z-50 w-full md:max-w-[380px] max-h-[84vh] md:max-h-full bg-black/95 border-t md:border-t-0 md:border-l border-stone-800 p-5 sm:p-6 shadow-[0_0_50px_rgba(0,0,0,0.95)] backdrop-blur-2xl flex flex-col justify-between overflow-y-auto rounded-t-2xl md:rounded-none animate-in slide-in-from-bottom md:slide-in-from-right duration-300">
            <div>
              {/* Mobile Drag/Close indicator bar */}
              <div className="md:hidden w-10 h-1 bg-stone-700 rounded-full mx-auto mb-3" />

              {/* Header / Close button */}
              <div className="flex items-center justify-between pb-3.5 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-white/10 text-white font-bold border border-white/20">
                    {selectedNode.clusterLabel}
                  </span>
                  <span className="text-[9px] font-mono text-stone-500 uppercase">
                    PHASE {selectedNode.phaseIntroduced}+
                  </span>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-stone-400 hover:text-white p-1 rounded-sm cursor-pointer transition-colors"
                  aria-label="Close dossier"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Character Portrait & Main Name */}
              <div className="mt-4 flex gap-3.5 items-start">
                <div className="w-20 sm:w-24 h-28 sm:h-32 rounded-sm border border-stone-700 bg-stone-950 overflow-hidden shrink-0 shadow-xl relative">
                  {selectedNode.isMystery ? (
                    <div className="w-full h-full flex items-center justify-center text-3xl font-mono text-stone-600 bg-stone-900">
                      ?
                    </div>
                  ) : (
                    <img
                      src={selectedNode.photoUrl || ""}
                      alt={selectedNode.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top grayscale contrast-125"
                    />
                  )}
                  <div className="absolute inset-0 border border-white/10 pointer-events-none" />
                </div>

                <div>
                  <h2 className="text-base sm:text-lg font-mono font-bold text-white uppercase tracking-wider leading-tight">
                    {selectedNode.name}
                  </h2>
                  {selectedNode.subtitle && (
                    <p className="text-[9.5px] font-mono tracking-widest uppercase text-stone-400 mt-0.5 sm:mt-1">
                      {selectedNode.subtitle}
                    </p>
                  )}
                  {fullCharacterData && (
                    <span className="inline-block mt-1.5 text-[8.5px] font-mono uppercase px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-400">
                      {fullCharacterData.universe}
                    </span>
                  )}
                </div>
              </div>

              {/* Biography / Narrative Summary */}
              <div className="mt-4">
                <h4 className="text-[8.5px] font-mono tracking-widest uppercase text-stone-500 mb-1">
                  NARRATIVE DOSSIER
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed font-sans line-clamp-4 md:line-clamp-none">
                  {selectedNode.bio ||
                    fullCharacterData?.overview ||
                    "Encrypted timeline record preserved in the Sacred Timeline archives."}
                </p>
              </div>

              {/* Family & Connected Ties in the Tree */}
              <div className="mt-5">
                <h4 className="text-[8.5px] font-mono tracking-widest uppercase text-stone-500 mb-2">
                  DIRECT GENEALOGICAL CONNECTIONS
                </h4>
                <div className="space-y-1.5">
                  {visibleConnections
                    .filter(
                      (c) =>
                        c.fromId === selectedNode.id || c.toId === selectedNode.id
                    )
                    .map((c) => {
                      const otherId =
                        c.fromId === selectedNode.id ? c.toId : c.fromId;
                      const otherNode = visibleNodes.find((n) => n.id === otherId);
                      if (!otherNode) return null;

                      return (
                        <button
                          key={c.id}
                          onClick={() => focusOnNode(otherNode)}
                          className="w-full p-2 rounded border border-stone-900 bg-stone-950/80 hover:border-stone-700 hover:bg-stone-900/60 flex items-center justify-between text-left transition-all group cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-5 h-7 bg-stone-900 border border-stone-800 overflow-hidden shrink-0">
                              <img
                                src={otherNode.photoUrl || ""}
                                alt={otherNode.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover grayscale"
                              />
                            </div>
                            <div>
                              <div className="text-xs font-mono font-bold text-white uppercase group-hover:text-white">
                                {otherNode.name}
                              </div>
                              <div className="text-[8px] font-mono uppercase text-stone-500">
                                {c.label || c.type}
                              </div>
                            </div>
                          </div>
                          <ChevronRight
                            size={14}
                            className="text-stone-600 group-hover:text-white transition-colors"
                          />
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* Artifacts Possessed */}
              {fullCharacterData &&
                fullCharacterData.artifactsPossessed.length > 0 && (
                  <div className="mt-5">
                    <h4 className="text-[8.5px] font-mono tracking-widest uppercase text-stone-500 mb-1.5">
                      COSMIC RELICS WIELDED
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {fullCharacterData.artifactsPossessed.map((artId) => (
                        <Link
                          key={artId}
                          href={`/artifacts?relic=${encodeURIComponent(artId)}`}
                          className="text-[8.5px] font-mono uppercase px-2 py-0.5 rounded-full bg-stone-900/90 border border-stone-800 text-stone-300 hover:border-white hover:text-white transition-colors"
                        >
                          {artId.replace("-", " ")}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            {/* Footer Action: Open Full Profile */}
            {selectedNode.characterId && (
              <div className="pt-4 border-t border-stone-900 mt-4">
                <Link
                  href={`/characters/${selectedNode.characterId}`}
                  className="w-full py-2 sm:py-2.5 rounded bg-white text-black font-mono font-bold text-[9.5px] sm:text-[10px] tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-stone-200 transition-colors shadow-lg"
                >
                  <span>OPEN FULL DOSSIER</span>
                  <ExternalLink size={12} />
                </Link>
              </div>
            )}
          </aside>
        </>
      )}

      {/* Global Search Modal Overlay */}
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </div>
  );
}

