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
import { useDoomsdayTransition } from "@/components/doomsday/DoomsdayTransition";
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
  const { triggerDoomsdayTransition } = useDoomsdayTransition();
  const [spoilerPhase, setSpoilerPhase] = useState<number>(currentPhase || 6);

  // Camera Pan & Zoom State (World coordinates 0..5000, 0..3000)
  const [camera, setCamera] = useState({ x: 0, y: 0, scale: 0.75 });

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
  const contentLayerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cameraRef = useRef({ x: 0, y: 0, scale: 0.58 });

  useEffect(() => {
    cameraRef.current = camera;
  }, [camera]);

  // Global Keyboard Shortcuts & Browser Page Zoom Interceptor
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent browser whole-page zoom on Ctrl + / Ctrl - / Ctrl 0
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "+" || e.key === "-" || e.key === "=" || e.key === "0" || e.key === "_")
      ) {
        e.preventDefault();
      }

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

    const handleWheelZoomPrevent = (e: WheelEvent) => {
      // Prevent browser whole-page zoom on Ctrl + Wheel
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheelZoomPrevent, { passive: false });
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheelZoomPrevent);
    };
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

  // Available Dynasty Clusters strictly present in the current phase
  const availableDynastyClusters = useMemo(() => {
    const activeClusterIds = new Set(visibleNodes.map((n) => n.cluster));
    return DYNASTY_CLUSTERS.filter(
      (dynasty) => dynasty.id === "all" || activeClusterIds.has(dynasty.id)
    );
  }, [visibleNodes]);

  // Auto-reset active cluster to "all" if selected family is not present in active phase
  useEffect(() => {
    if (activeCluster !== "all") {
      const exists = availableDynastyClusters.some((d) => d.id === activeCluster);
      if (!exists) setActiveCluster("all");
    }
  }, [availableDynastyClusters, activeCluster]);

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
    } else if (hoveredConnId) {
      cIds.add(hoveredConnId);
      const hoveredConn = visibleConnections.find((c) => c.id === hoveredConnId);
      if (hoveredConn) {
        nIds.add(hoveredConn.fromId);
        nIds.add(hoveredConn.toId);
      }
    }

    return { connectedNodeIds: nIds, connectedConnectionIds: cIds };
  }, [activeFocusId, hoveredConnId, visibleConnections]);

  // Pan Camera to Focus on Coordinates with Smooth Cinematic Transition
  const focusOnCoordinates = useCallback(
    (targetX: number, targetY: number, customScale?: number, isSmooth: boolean = true) => {
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

      cameraRef.current = { x: newX, y: newY, scale: targetScale };
      if (contentLayerRef.current) {
        if (isSmooth) {
          contentLayerRef.current.style.transition = "transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)";
        } else {
          contentLayerRef.current.style.transition = "none";
        }
        contentLayerRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0) scale(${targetScale})`;
      }
      setCamera({ x: newX, y: newY, scale: targetScale });
    },
    []
  );

  const focusOnNode = useCallback(
    (node: DarkTreeNode, e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedNode?.id === node.id) {
        // Clicking the same character card again toggles off selection and unlocks view
        setSelectedNode(null);
        setHoveredNodeId(null);
        return;
      }
      setSelectedNode(node);
      const isMobile = (typeof window !== "undefined" ? window.innerWidth : 1000) < 640;
      focusOnCoordinates(
        node.x + CARD_W / 2,
        node.y + CARD_H / 2,
        isMobile ? 0.85 : 0.95
      );
    },
    [selectedNode, focusOnCoordinates]
  );

  const focusOnCluster = useCallback(
    (clusterId: string) => {
      setActiveCluster((prev) => (prev === clusterId ? "all" : clusterId));
      setSelectedNode(null);
      setHoveredNodeId(null);
      const width = typeof window !== "undefined" ? window.innerWidth : 1200;
      const height = typeof window !== "undefined" ? window.innerHeight : 800;
      const isMobile = width < 640;
      const isTablet = width >= 640 && width < 1024;

      if (clusterId === "all") {
        const nodesToFrame = visibleNodes.length > 0 ? visibleNodes : DARK_TREE_NODES;
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        nodesToFrame.forEach((n) => {
          if (n.x < minX) minX = n.x;
          if (n.x > maxX) maxX = n.x;
          if (n.y < minY) minY = n.y;
          if (n.y > maxY) maxY = n.y;
        });

        const centerX = (minX + maxX + CARD_W) / 2;
        const centerY = (minY + maxY + CARD_H) / 2;
        const totalW = maxX - minX + CARD_W;
        const totalH = maxY - minY + CARD_H;

        // Auto-scale to dynamically frame the active Phase with exact panoramic fitting
        const scaleX = (width - (isMobile ? 40 : 140)) / (totalW + 120);
        const scaleY = (height - (isMobile ? 120 : 190)) / (totalH + 120);
        const overviewScale = Math.min(scaleX, scaleY);

        focusOnCoordinates(centerX, centerY, Math.min(Math.max(overviewScale, 0.25), 0.75));
        return;
      }

      // Dynamically calculate the exact bounding center of the chosen dynasty cluster
      const clusterNodes = DARK_TREE_NODES.filter((n) => n.cluster === clusterId);
      if (clusterNodes.length > 0) {
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        clusterNodes.forEach((n) => {
          if (n.x < minX) minX = n.x;
          if (n.x > maxX) maxX = n.x;
          if (n.y < minY) minY = n.y;
          if (n.y > maxY) maxY = n.y;
        });

        const centerX = (minX + maxX + CARD_W) / 2;
        const centerY = (minY + maxY + CARD_H) / 2;
        const clusterW = maxX - minX + CARD_W;
        const clusterH = maxY - minY + CARD_H;

        // Auto-compute framing scale so the entire family cluster fits centered with breathing margin
        const scaleX = (width - (isMobile ? 40 : 120)) / (clusterW + 60);
        const scaleY = (height - (isMobile ? 120 : 180)) / (clusterH + 60);
        const autoScale = Math.min(scaleX, scaleY);

        focusOnCoordinates(centerX, centerY, Math.min(Math.max(autoScale, 0.45), 0.95));
      }
    },
    [focusOnCoordinates, visibleNodes]
  );

  // Responsive Initial Frame on Mount & Window Resize (Auto-fit all active Phase characters)
  useEffect(() => {
    const handleViewportResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < 640;

      const nodesToFrame = visibleNodes.length > 0 ? visibleNodes : DARK_TREE_NODES;
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      nodesToFrame.forEach((n) => {
        if (n.x < minX) minX = n.x;
        if (n.x > maxX) maxX = n.x;
        if (n.y < minY) minY = n.y;
        if (n.y > maxY) maxY = n.y;
      });

      const centerX = (minX + maxX + CARD_W) / 2;
      const centerY = (minY + maxY + CARD_H) / 2;
      const totalW = maxX - minX + CARD_W;
      const totalH = maxY - minY + CARD_H;

      const scaleX = (width - (isMobile ? 40 : 140)) / (totalW + 120);
      const scaleY = (height - (isMobile ? 120 : 190)) / (totalH + 120);
      const overviewScale = Math.min(scaleX, scaleY);

      focusOnCoordinates(centerX, centerY, Math.min(Math.max(overviewScale, 0.25), 0.75));
    };

    handleViewportResize();
    window.addEventListener("resize", handleViewportResize);
    window.addEventListener("orientationchange", handleViewportResize);
    return () => {
      window.removeEventListener("resize", handleViewportResize);
      window.removeEventListener("orientationchange", handleViewportResize);
    };
  }, [focusOnCoordinates, visibleNodes]);

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

    const particles = Array.from({ length: 48 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
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

  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mouse Pan Handling (Instantaneous 120fps GPU Transform with Zero Re-renders)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).closest(
        "button, a, input, aside, nav, header, [role='button'], .dossier-card, .no-map-drag, .search-overlay"
      )
    )
      return;
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX - cameraRef.current.x,
      y: e.clientY - cameraRef.current.y,
    };
    if (contentLayerRef.current) {
      contentLayerRef.current.style.transition = "none";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const nextX = e.clientX - dragStartRef.current.x;
    const nextY = e.clientY - dragStartRef.current.y;
    cameraRef.current.x = nextX;
    cameraRef.current.y = nextY;

    if (contentLayerRef.current) {
      contentLayerRef.current.style.transform = `translate3d(${nextX}px, ${nextY}px, 0) scale(${cameraRef.current.scale})`;
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setCamera({ ...cameraRef.current });
    }
    const dist = Math.hypot(
      e.clientX - (dragStartRef.current.x + cameraRef.current.x),
      e.clientY - (dragStartRef.current.y + cameraRef.current.y)
    );
    if (dist < 5) {
      if (!(e.target as HTMLElement).closest('[data-node="true"]')) {
        setSelectedNode(null);
        setHoveredNodeId(null);
      }
    }
  };

  // Wheel Zoom Handling (Exponential Cursor-Pinned Zoom with GPU Interpolation)
  const handleWheel = (e: React.WheelEvent) => {
    if (
      (e.target as HTMLElement).closest(
        "aside, nav, header, .dossier-card, .search-overlay, [data-scrollable]"
      )
    )
      return;

    e.preventDefault();
    // Continuous exponential zoom factor (adapts to precision trackpads and discrete wheel mice)
    const delta = Math.max(Math.min(e.deltaY, 120), -120);
    const zoomFactor = Math.exp(-delta * 0.0016);
    const nextScale = Math.min(Math.max(cameraRef.current.scale * zoomFactor, 0.35), 1.65);
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Pin the exact world point directly under the cursor
    const newX = mouseX - (mouseX - cameraRef.current.x) * (nextScale / cameraRef.current.scale);
    const newY = mouseY - (mouseY - cameraRef.current.y) * (nextScale / cameraRef.current.scale);

    cameraRef.current = { x: newX, y: newY, scale: nextScale };
    if (contentLayerRef.current) {
      contentLayerRef.current.style.transition = "none";
      contentLayerRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0) scale(${nextScale})`;
    }

    if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    wheelTimeoutRef.current = setTimeout(() => {
      setCamera({ ...cameraRef.current });
    }, 80);
  };

  // Double Click Canvas Zoom In
  const handleDoubleClick = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).closest(
        "button, a, input, aside, nav, header, [role='button'], .dossier-card, [data-node='true']"
      )
    )
      return;

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const targetScale = Math.min(cameraRef.current.scale * 1.35, 1.65);
    const newX = mouseX - (mouseX - cameraRef.current.x) * (targetScale / cameraRef.current.scale);
    const newY = mouseY - (mouseY - cameraRef.current.y) * (targetScale / cameraRef.current.scale);

    cameraRef.current = { x: newX, y: newY, scale: targetScale };
    if (contentLayerRef.current) {
      contentLayerRef.current.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
      contentLayerRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0) scale(${targetScale})`;
    }
    setCamera({ x: newX, y: newY, scale: targetScale });
  };

  // Touch Gestures: 1-Finger Smooth Pan & 2-Finger Responsive Pinch-to-Zoom
  const handleTouchStart = (e: React.TouchEvent) => {
    if (
      (e.target as HTMLElement).closest(
        "button, a, input, aside, nav, header, [role='button'], .dossier-card, .no-map-drag, .search-overlay"
      )
    )
      return;

    if (contentLayerRef.current) {
      contentLayerRef.current.style.transition = "none";
    }

    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      touchStartRef.current = {
        x: e.touches[0].clientX - cameraRef.current.x,
        y: e.touches[0].clientY - cameraRef.current.y,
      };
    } else if (e.touches.length === 2) {
      isDraggingRef.current = true;
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const midX = (t1.clientX + t2.clientX) / 2;
      const midY = (t1.clientY + t2.clientY) / 2;

      touchStartRef.current = {
        x: midX - cameraRef.current.x,
        y: midY - cameraRef.current.y,
        dist,
        initialScale: cameraRef.current.scale,
        midX,
        midY,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;

    if (e.touches.length === 1) {
      const nextX = e.touches[0].clientX - touchStartRef.current.x;
      const nextY = e.touches[0].clientY - touchStartRef.current.y;
      cameraRef.current.x = nextX;
      cameraRef.current.y = nextY;

      if (contentLayerRef.current) {
        contentLayerRef.current.style.transform = `translate3d(${nextX}px, ${nextY}px, 0) scale(${cameraRef.current.scale})`;
      }
    } else if (e.touches.length === 2 && touchStartRef.current.dist) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const zoomRatio = dist / touchStartRef.current.dist;
      const nextScale = Math.min(
        Math.max((touchStartRef.current.initialScale || 0.58) * zoomRatio, 0.15),
        1.8
      );

      const midX = (t1.clientX + t2.clientX) / 2;
      const midY = (t1.clientY + t2.clientY) / 2;

      const nextX = midX - (midX - touchStartRef.current.x) * (nextScale / (touchStartRef.current.initialScale || 0.58));
      const nextY = midY - (midY - touchStartRef.current.y) * (nextScale / (touchStartRef.current.initialScale || 0.58));

      cameraRef.current = { x: nextX, y: nextY, scale: nextScale };
      if (contentLayerRef.current) {
        contentLayerRef.current.style.transform = `translate3d(${nextX}px, ${nextY}px, 0) scale(${nextScale})`;
      }
    }
  };

  const handleTouchEnd = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setCamera({ ...cameraRef.current });
    }
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
    focusOnCluster("all");
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

      // If vertically aligned (within tolerance): pure straight vertical drop with zero jogs
      if (Math.abs(startX - endX) <= 15) {
        return {
          path: `M ${endX} ${startY} V ${endY}`,
          arrow:
            conn.hasArrow !== false
              ? { x: endX, y: endY - 3, dir: "down" }
              : undefined,
        };
      }

      // Smooth organic tree branch through the clear corridor between row tiers (never touching names!)
      const midY = conn.midY || (fromNode.y + h + toNode.y) / 2;
      const r = Math.min(12, Math.abs(endX - startX) / 2, Math.abs(endY - midY) / 2);
      const dirX = endX > startX ? 1 : -1;

      const path = `M ${startX} ${startY} V ${midY - r} Q ${startX} ${midY} ${startX + dirX * r} ${midY} H ${endX - dirX * r} Q ${endX} ${midY} ${endX} ${midY + r} V ${endY}`;

      return {
        path,
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
      // If horizontally aligned on same tier (e.g. Bucky <-> Steve)
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
        const r = 8;
        const dirY = endY > startY ? 1 : -1;
        const dirX = endX > channelX ? 1 : -1;

        const path = `M ${startX} ${startY} H ${channelX - (isFromRight ? -r : r)} Q ${channelX} ${startY} ${channelX} ${startY + dirY * r} V ${endY - dirY * r} Q ${channelX} ${endY} ${channelX + dirX * r} ${endY} H ${endX}`;

        return {
          path,
          arrow: {
            x: isFromRight ? endX + 4 : endX - 4,
            y: endY,
            dir: isFromRight ? "left" : "right",
          },
        };
      }

      // Otherwise stepped down from bottom to top through clear mid-corridor
      const startX = fromCenterX;
      const startY = fromNode.y + h;
      const endX = toCenterX;
      const endY = toNode.y;
      const midY = conn.midY || (fromNode.y + h + toNode.y) / 2;
      const r = 10;
      const dirX = endX > startX ? 1 : -1;

      return {
        path: `M ${startX} ${startY} V ${midY - r} Q ${startX} ${midY} ${startX + dirX * r} ${midY} H ${endX - dirX * r} Q ${endX} ${midY} ${endX} ${midY + r} V ${endY}`,
        arrow: conn.hasArrow
          ? { x: endX, y: endY - 3, dir: "down" }
          : undefined,
      };
    }

    // Default smooth tree step
    const midY = (fromNode.y + h + toNode.y) / 2;
    const r = 10;
    const dirX = toCenterX > fromCenterX ? 1 : -1;
    return {
      path: `M ${fromCenterX} ${fromNode.y + h} V ${midY - r} Q ${fromCenterX} ${midY} ${fromCenterX + dirX * r} ${midY} H ${toCenterX - dirX * r} Q ${toCenterX} ${midY} ${toCenterX} ${midY + r} V ${toNode.y}`,
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
      onDoubleClick={handleDoubleClick}
      className="fixed inset-0 w-screen h-screen bg-[#000000] text-stone-300 select-none overflow-hidden font-sans cursor-grab active:cursor-grabbing touch-none"
      style={{ touchAction: "none" }}
    >
      {/* 1. Star Dust & Atmosphere Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.95)_100%)] pointer-events-none z-0" />

      {/* TOP AMBIENT FADING BLUR BACKGROUND MASK (TIGHT & COMPACT) */}
      <div
        className="fixed top-0 inset-x-0 h-20 pointer-events-none z-20 bg-gradient-to-b from-[#000000]/90 to-transparent backdrop-blur-sm [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] transition-opacity duration-700"
        aria-hidden="true"
      />

      {/* ------------------------------------------------------------- */}
      {/* TOP HEADER: RESPONSIVE MATCH WITH PAGESHELL & UNIVERSEMAP    */}
      {/* ------------------------------------------------------------- */}
      <header className="fixed top-0 left-0 right-0 w-full px-3 sm:px-8 py-3 sm:py-4 flex items-center justify-between z-50 bg-transparent pointer-events-none">
        
        {/* Left: Drawer Menu Toggle + Mode Switcher (Matching RETURN typography) */}
        <div className="flex items-center gap-3 sm:gap-4 pointer-events-auto">
          <button
            onClick={() => setNavMenuOpen(true)}
            className="text-stone-400 hover:text-white transition-colors cursor-pointer p-1"
            title="Open Universe Navigation"
            aria-label="Open Universe Navigation"
          >
            <Menu size={16} />
          </button>

          {/* View Mode Switcher (Matching RETURN style: borderless, font-mono tracking-widest) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              className="text-[9.5px] sm:text-[11px] font-mono tracking-[0.15em] sm:tracking-[0.25em] uppercase text-white font-bold transition-colors cursor-pointer"
              title="Sacred Family Tree Lineage View"
            >
              FAMILY TREE
            </button>
            <span className="text-stone-600 font-mono text-[9.5px] sm:text-[11px]">/</span>
            {onSwitchToTimeline && (
              <button
                onClick={onSwitchToTimeline}
                className="text-[9.5px] sm:text-[11px] font-mono tracking-[0.15em] sm:tracking-[0.25em] uppercase text-stone-400 hover:text-white transition-colors cursor-pointer"
                title="Switch to MCU Chronological Timeline Map"
              >
                TIMELINE MAP
              </button>
            )}
          </div>
        </div>

        {/* Center: Mathematically Exact Centered MARVEL | DOOMSDAY Brand Header */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-auto flex items-center justify-center gap-2 sm:gap-3">
          <Link 
            href="/timeline" 
            className="text-[11px] sm:text-xs md:text-sm font-mono font-bold tracking-[0.35em] sm:tracking-[0.45em] uppercase text-white hover:text-white/80 transition-opacity select-none"
            title="MCU Timeline Map"
          >
            MARVEL
          </Link>
          <span className="text-stone-600 font-mono text-xs select-none">|</span>
          <button
            onClick={triggerDoomsdayTransition}
            className="text-[11px] sm:text-xs md:text-sm font-mono font-bold tracking-[0.35em] sm:tracking-[0.45em] uppercase text-emerald-400 hover:text-emerald-300 drop-shadow-[0_0_12px_rgba(52,211,153,0.5)] transition-all select-none cursor-pointer bg-transparent border-none"
            title="Initialize Road to Doomsday Incursion"
          >
            DOOMSDAY
          </button>
        </div>

        {/* Right: Phase Filter + Return Link + Search Trigger (Matching RETURN typography) */}
        <div className="flex items-center gap-3 sm:gap-5 pointer-events-auto">
          {/* Phase Selector (Matching RETURN style) */}
          <div className="hidden md:flex items-center gap-2 sm:gap-2.5">
            <span className="text-[9.5px] sm:text-[11px] font-mono tracking-[0.15em] sm:tracking-[0.25em] uppercase text-stone-500">
              PHASE:
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {[1, 2, 3, 4, 5, 6].map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setSpoilerPhase(p);
                    setCurrentPhase(p);
                  }}
                  className={`text-[9.5px] sm:text-[11px] font-mono tracking-[0.15em] transition-colors cursor-pointer px-1 py-0.5 ${
                    spoilerPhase === p
                      ? "text-white font-bold"
                      : spoilerPhase > p
                      ? "text-stone-300 hover:text-white"
                      : "text-stone-600 hover:text-stone-400"
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
        ref={contentLayerRef}
        className="absolute inset-0 origin-top-left pointer-events-auto"
        style={{
          transform: `translate3d(${camera.x}px, ${camera.y}px, 0) scale(${camera.scale})`,
          width: "5000px",
          height: "3000px",
          transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "transform",
        }}
      >
        {/* SVG Orthogonal Line Network */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 5000 3000"
          style={{ overflow: "visible" }}
        >
          {/* Render All Orthogonal Line Connections */}
          {visibleConnections.map((conn) => {
            const data = pathMap.get(conn.id);
            if (!data) return null;

            const fromNode = visibleNodes.find((n) => n.id === conn.fromId);
            const toNode = visibleNodes.find((n) => n.id === conn.toId);
            const isDynastyIsolated = activeCluster !== "all";
            const connInActiveDynasty = !isDynastyIsolated || (fromNode?.cluster === activeCluster && toNode?.cluster === activeCluster);

            const isDirectlyHovered = hoveredConnId === conn.id;
            const isConnectedToFocus = connectedConnectionIds.has(conn.id);
            const isHighlighted = isDirectlyHovered || isConnectedToFocus;
            const isDimmed = (activeFocusId || hoveredConnId)
              ? !isHighlighted
              : (isDynastyIsolated && !connInActiveDynasty);

            return (
              <g
                key={conn.id}
                className={`transition-opacity duration-200 pointer-events-auto ${
                  isDimmed ? "opacity-10" : "opacity-100"
                }`}
                onMouseEnter={() => setHoveredConnId(conn.id)}
                onMouseLeave={() => setHoveredConnId(null)}
              >
                {/* Wide invisible hit-box for easy line hovering */}
                <path
                  d={data.path}
                  fill="none"
                  stroke="transparent"
                  strokeWidth="16"
                  className="cursor-pointer pointer-events-auto"
                />

                {/* Primary Crisp Clean Matte Line (No Glow) */}
                <path
                  d={data.path}
                  fill="none"
                  stroke={isHighlighted ? "#ffffff" : "rgba(255, 255, 255, 0.28)"}
                  strokeWidth={isHighlighted ? "1.75" : "1"}
                  strokeDasharray={
                    conn.type === "variant" ||
                    conn.type === "paradox" ||
                    conn.type === "mentor"
                      ? "4 4"
                      : undefined
                  }
                  className="transition-colors duration-150 pointer-events-none"
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

          // Active Dynasty Cluster Focus
          const focusNode = activeFocusId ? visibleNodes.find((n) => n.id === activeFocusId) : null;
          const activeFamilyCluster = activeCluster !== "all" ? activeCluster : focusNode?.cluster || null;

          // Same Family Guarantee: All characters in the active family stay 100% unblurred
          const isInSameFamily = activeFamilyCluster ? node.cluster === activeFamilyCluster : true;
          const isOutsideActiveFamily = activeFamilyCluster ? !isInSameFamily : false;

          return (
            <div
              key={node.id}
              data-node="true"
              onClick={(e) => focusOnNode(node, e)}
              onMouseEnter={() => setHoveredNodeId(node.id)}
              onMouseLeave={() => setHoveredNodeId((prev) => (prev === node.id ? null : prev))}
              className={`absolute cursor-pointer flex flex-col items-center group transition-all duration-500 ease-out ${
                isOutsideActiveFamily
                  ? "opacity-25 blur-[3px] pointer-events-auto select-none z-0 hover:opacity-100 hover:blur-0"
                  : isConnected || !activeFocusId
                  ? "opacity-100 blur-0 pointer-events-auto z-10"
                  : "opacity-65 blur-0 pointer-events-auto z-10"
              }`}
              style={{
                left: `${node.x - 25}px`,
                top: `${node.y}px`,
                width: `160px`,
                zIndex: isSelected ? 40 : isHovered ? 35 : isOutsideActiveFamily ? 1 : 10,
                contentVisibility: "auto",
                containIntrinsicSize: "160px 190px",
              }}
            >
              {/* Vertical Rectangular Character Portrait Card */}
              <div
                className={`relative w-[110px] h-[142px] bg-[#09090d] rounded-sm border transition-colors duration-200 overflow-hidden ${
                  isSelected
                    ? "border-white ring-1 ring-white"
                    : isHovered
                    ? "border-stone-200"
                    : "border-stone-800 group-hover:border-stone-400"
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
                      src={node.photoUrl ? `${node.photoUrl}?v=202608` : ""}
                      alt={node.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover object-[center_15%] brightness-100 contrast-105 transition-opacity duration-300 z-10"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />

                    {/* Subtle Edge Inset Vignette */}
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none z-20" />

                    {/* Phase Indicator Dot */}
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white/60 group-hover:bg-white shadow-[0_0_4px_rgba(255,255,255,0.6)] transition-colors z-20" />
                  </div>
                )}
              </div>

              {/* Character Name & Subtitle Beneath Card (100% Unclipped) */}
              <div className="mt-2.5 flex flex-col items-center text-center w-full max-w-[160px] px-1 pointer-events-none">
                <h3
                  className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-bold leading-tight line-clamp-1 w-full transition-colors ${
                    isSelected || isHovered
                      ? "text-white"
                      : "text-stone-300"
                  }`}
                  title={node.name}
                >
                  {node.name}
                </h3>
                {node.subtitle && (
                  <p className="text-[8px] sm:text-[8.5px] font-mono tracking-widest uppercase text-stone-400 line-clamp-1 w-full mt-0.5">
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
        <div className="no-map-drag pointer-events-auto flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-full sm:max-w-5xl py-1.5 sm:py-2 px-2.5 sm:px-3 bg-black/85 rounded-full backdrop-blur-xl shadow-2xl no-scrollbar">
          {availableDynastyClusters.map((dynasty) => {
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

