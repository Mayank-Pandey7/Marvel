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

  const [camera, setCamera] = useState({ x: 0, y: 0, scale: 0.75 });
  const cameraRef = useRef({ x: 0, y: 0, scale: 0.75 });
  const contentLayerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const rafIdRef = useRef<number | null>(null);
  const pendingCamRef = useRef<{ x: number; y: number; scale: number } | null>(null);
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scheduleSyncCameraState = useCallback(() => {
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    syncTimeoutRef.current = setTimeout(() => {
      setCamera({ ...cameraRef.current });
    }, 150);
  }, []);

  const updateCameraTransform = useCallback(
    (newCamera: { x: number; y: number; scale: number }, isSmooth: boolean = false) => {
      cameraRef.current = newCamera;
      if (!contentLayerRef.current) return;

      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      if (isSmooth) {
        contentLayerRef.current.style.transition = "transform 0.32s cubic-bezier(0.2, 0, 0, 1)";
        contentLayerRef.current.style.transform = `translate3d(${newCamera.x}px, ${newCamera.y}px, 0) scale(${newCamera.scale})`;
        scheduleSyncCameraState();
      } else {
        contentLayerRef.current.style.transition = "none";
        pendingCamRef.current = newCamera;
        rafIdRef.current = requestAnimationFrame(() => {
          if (contentLayerRef.current && pendingCamRef.current) {
            contentLayerRef.current.style.transform = `translate3d(${pendingCamRef.current.x}px, ${pendingCamRef.current.y}px, 0) scale(${pendingCamRef.current.scale})`;
          }
          rafIdRef.current = null;
        });
      }
    },
    [scheduleSyncCameraState]
  );

  const touchStartRef = useRef<{
    x: number;
    y: number;
    dist?: number;
    initialScale?: number;
    midX?: number;
    midY?: number;
  }>({ x: 0, y: 0 });

  const [selectedNode, setSelectedNode] = useState<DarkTreeNode | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [hoveredConnId, setHoveredConnId] = useState<string | null>(null);

  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeCluster, setActiveCluster] = useState<string>("all");
  const [isPhaseDrawerOpen, setIsPhaseDrawerOpen] = useState(false);

  useEffect(() => {
    cameraRef.current = camera;
  }, [camera]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {

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

  useEffect(() => {
    if (currentPhase && currentPhase !== spoilerPhase) {
      setSpoilerPhase(currentPhase);
    }
  }, [currentPhase]);

  const visibleNodes = useMemo(() => {
    return DARK_TREE_NODES.filter((n) => n.phaseIntroduced <= spoilerPhase);
  }, [spoilerPhase]);

  const availableDynastyClusters = useMemo(() => {
    const activeClusterIds = new Set(visibleNodes.map((n) => n.cluster));
    return DYNASTY_CLUSTERS.filter(
      (dynasty) => dynasty.id === "all" || activeClusterIds.has(dynasty.id)
    );
  }, [visibleNodes]);

  useEffect(() => {
    if (activeCluster !== "all") {
      const exists = availableDynastyClusters.some((d) => d.id === activeCluster);
      if (!exists) setActiveCluster("all");
    }
  }, [availableDynastyClusters, activeCluster]);

  const visibleConnections = useMemo(() => {
    const nodeIds = new Set(visibleNodes.map((n) => n.id));
    return DARK_TREE_CONNECTIONS.filter(
      (c) =>
        c.phaseRevealed <= spoilerPhase &&
        nodeIds.has(c.fromId) &&
        nodeIds.has(c.toId)
    );
  }, [visibleNodes, spoilerPhase]);

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

  const focusOnCoordinates = useCallback(
    (targetX: number, targetY: number, customScale?: number, isSmooth: boolean = true) => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth || window.innerWidth;
      const height = containerRef.current.clientHeight || window.innerHeight;

      const isMobile = width < 640;
      const isTablet = width >= 640 && width < 1024;

      const defaultScale = isMobile ? 0.68 : isTablet ? 0.58 : 0.62;
      const targetScale = customScale || defaultScale;

      const newX = width / 2 - targetX * targetScale;
      const newY = height / 2 - targetY * targetScale;

      updateCameraTransform({ x: newX, y: newY, scale: targetScale }, isSmooth);
    },
    [updateCameraTransform]
  );

  const focusOnNode = useCallback(
    (node: DarkTreeNode, e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedNode?.id === node.id) {

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

        const scaleX = (width - (isMobile ? 40 : 140)) / (totalW + 120);
        const scaleY = (height - (isMobile ? 120 : 190)) / (totalH + 120);
        const overviewScale = Math.min(scaleX, scaleY);

        focusOnCoordinates(centerX, centerY, Math.min(Math.max(overviewScale, 0.25), 0.75));
        return;
      }

      const targetClusterNodes = visibleNodes.filter((n) => n.cluster === clusterId);
      const clusterNodes = targetClusterNodes.length > 0
        ? targetClusterNodes
        : DARK_TREE_NODES.filter((n) => n.cluster === clusterId);

      if (clusterNodes.length > 0) {
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        clusterNodes.forEach((n) => {
          if (n.x < minX) minX = n.x;
          if (n.x > maxX) maxX = n.x;
          if (n.y < minY) minY = n.y;
          if (n.y > maxY) maxY = n.y;
        });

        const centerX = (minX + maxX + CARD_W) / 2;
        const centerY = (minY + maxY + CARD_H + 40) / 2;
        const clusterW = maxX - minX + CARD_W;
        const clusterH = maxY - minY + CARD_H + 40;

        const scaleX = (width - (isMobile ? 32 : 120)) / (clusterW + 40);
        const scaleY = (height - (isMobile ? 140 : 180)) / (clusterH + 40);
        const autoScale = Math.min(scaleX, scaleY);

        focusOnCoordinates(
          centerX,
          centerY,
          Math.min(Math.max(autoScale, isMobile ? 0.52 : 0.60), isMobile ? 0.95 : 1.05)
        );
      }
    },
    [focusOnCoordinates, visibleNodes]
  );

  const handleSelectPhase = useCallback(
    (phaseNum: number) => {
      setSpoilerPhase(phaseNum);
      setCurrentPhase(phaseNum);
      setIsPhaseDrawerOpen(false);
      setActiveCluster("all");
      setSelectedNode(null);
    },
    [setCurrentPhase]
  );

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
    updateCameraTransform({ x: nextX, y: nextY, scale: cameraRef.current.scale }, false);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      scheduleSyncCameraState();
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

  const handleWheel = (e: React.WheelEvent) => {
    if (
      (e.target as HTMLElement).closest(
        "aside, nav, header, .dossier-card, .search-overlay, [data-scrollable]"
      )
    )
      return;

    e.preventDefault();

    const delta = Math.max(Math.min(e.deltaY, 120), -120);
    const zoomFactor = Math.exp(-delta * 0.0016);
    const nextScale = Math.min(Math.max(cameraRef.current.scale * zoomFactor, 0.35), 1.65);
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const newX = mouseX - (mouseX - cameraRef.current.x) * (nextScale / cameraRef.current.scale);
    const newY = mouseY - (mouseY - cameraRef.current.y) * (nextScale / cameraRef.current.scale);

    updateCameraTransform({ x: newX, y: newY, scale: nextScale }, false);
    scheduleSyncCameraState();
  };

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

    updateCameraTransform({ x: newX, y: newY, scale: targetScale }, true);
  };

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
      updateCameraTransform({ x: nextX, y: nextY, scale: cameraRef.current.scale }, false);
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

      updateCameraTransform({ x: nextX, y: nextY, scale: nextScale }, false);
    }
  };

  const handleTouchEnd = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      scheduleSyncCameraState();
    }
  };

  const zoomIn = () => {
    const nextScale = Math.min(cameraRef.current.scale * 1.30, 1.8);
    if (!containerRef.current) return;
    const cx = containerRef.current.clientWidth / 2;
    const cy = containerRef.current.clientHeight / 2;
    const newX = cx - (cx - cameraRef.current.x) * (nextScale / cameraRef.current.scale);
    const newY = cy - (cy - cameraRef.current.y) * (nextScale / cameraRef.current.scale);
    updateCameraTransform({ x: newX, y: newY, scale: nextScale }, true);
  };

  const zoomOut = () => {
    const nextScale = Math.max(cameraRef.current.scale * 0.75, 0.20);
    if (!containerRef.current) return;
    const cx = containerRef.current.clientWidth / 2;
    const cy = containerRef.current.clientHeight / 2;
    const newX = cx - (cx - cameraRef.current.x) * (nextScale / cameraRef.current.scale);
    const newY = cy - (cy - cameraRef.current.y) * (nextScale / cameraRef.current.scale);
    updateCameraTransform({ x: newX, y: newY, scale: nextScale }, true);
  };

  const resetView = () => {
    focusOnCluster("all");
  };

  const fullCharacterData = useMemo(() => {
    if (!selectedNode || !selectedNode.characterId) return null;
    return CHARACTERS.find((c) => c.id === selectedNode.characterId) || null;
  }, [selectedNode]);

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

    const w = CARD_W;
    const h = CARD_H;
    const totalH = CARD_H + 44;
    const fromCenterX = fromNode.x + w / 2;
    const toCenterX = toNode.x + w / 2;

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

    if (conn.type === "child" || conn.type === "creator") {

      const partnerConn = visibleConnections.find(
        (c) =>
          c.type === "partner" &&
          (c.fromId === conn.fromId || c.toId === conn.fromId)
      );

      let startX = fromCenterX;
      let startY = fromNode.y + totalH;

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
      const endY = toNode.y;

      if (Math.abs(startX - endX) <= 15) {
        return {
          path: `M ${endX} ${startY} V ${endY}`,
          arrow:
            conn.hasArrow !== false
              ? { x: endX, y: endY - 3, dir: "down" }
              : undefined,
        };
      }

      const parentBottom = Math.max(fromNode.y + totalH, startY);
      const midY = conn.midY || (parentBottom + toNode.y) / 2;

      const path =
        Math.abs(startX - endX) < 1
          ? `M ${startX} ${startY} V ${endY}`
          : `M ${startX} ${startY} V ${midY} H ${endX} V ${endY}`;

      return {
        path,
        arrow:
          conn.hasArrow !== false
            ? { x: endX, y: endY - 3, dir: "down" }
            : undefined,
      };
    }

    if (
      conn.type === "variant" ||
      conn.type === "mentor" ||
      conn.type === "paradox"
    ) {

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

      if (conn.type === "mentor") {
        const isFromRight = fromNode.x > toNode.x;
        const startX = isFromRight ? fromNode.x : fromNode.x + w;
        const startY = fromNode.y + h * 0.55;
        const endX = isFromRight ? toNode.x + w : toNode.x;
        const endY = toNode.y + h * 0.45;
        const channelX = (startX + endX) / 2;

        const path = `M ${startX} ${startY} H ${channelX} V ${endY} H ${endX}`;

        return {
          path,
          arrow: {
            x: isFromRight ? endX + 4 : endX - 4,
            y: endY,
            dir: isFromRight ? "left" : "right",
          },
        };
      }

      const startX = fromCenterX;
      const startY = fromNode.y + totalH;
      const endX = toCenterX;
      const endY = toNode.y;
      const parentBottom = fromNode.y + totalH;
      const midY = conn.midY || (parentBottom + toNode.y) / 2;

      return {
        path:
          Math.abs(startX - endX) < 1
            ? `M ${startX} ${startY} V ${endY}`
            : `M ${startX} ${startY} V ${midY} H ${endX} V ${endY}`,
        arrow: conn.hasArrow
          ? { x: endX, y: endY - 3, dir: "down" }
          : undefined,
      };
    }

    const parentBottom = fromNode.y + totalH;
    const midY = (parentBottom + toNode.y) / 2;
    return {
      path:
        Math.abs(fromCenterX - toCenterX) < 1
          ? `M ${fromCenterX} ${fromNode.y + totalH} V ${toNode.y}`
          : `M ${fromCenterX} ${fromNode.y + totalH} V ${midY} H ${toCenterX} V ${toNode.y}`,
      arrow: { x: toCenterX, y: toNode.y - 3, dir: "down" },
    };
  };

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
      {}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.95)_100%)] pointer-events-none z-0" />

      {/* Header Backdrop (Balanced Subtle Transparent Blur - No Black Bar) */}
      <div
        className="fixed top-0 inset-x-0 h-20 sm:h-26 pointer-events-none z-20 bg-transparent backdrop-blur-xs sm:backdrop-blur-sm [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] transition-opacity duration-700"
        aria-hidden="true"
      />

      {/* 1. SYNCHRONIZED GLOBAL HEADER NAVBAR (EXACT MATCHING HEIGHT) */}
      <header className="fixed top-0 left-0 right-0 w-full px-4 sm:px-8 py-4 sm:py-6 min-h-[58px] sm:min-h-[72px] flex items-center justify-between z-50 bg-transparent pointer-events-none">

        {/* Left Side: Menu Trigger & Title Switcher */}
        <div className="flex items-center gap-2 sm:gap-4 pointer-events-auto">
          <button
            onClick={() => setNavMenuOpen(true)}
            className="text-stone-400 hover:text-white transition-colors cursor-pointer p-1.5"
            title="Open Universe Navigation"
            aria-label="Open Universe Navigation"
          >
            <Menu size={18} />
          </button>

          {/* Title Header */}
          <div className="hidden md:flex items-center gap-2 sm:gap-3">
            <span
              className="text-[10.5px] sm:text-[12px] font-mono tracking-[0.18em] sm:tracking-[0.28em] uppercase text-white font-bold select-none"
            >
              FAMILY TREE
            </span>
            <span className="text-stone-600 font-mono text-[10.5px] sm:text-[12px]">/</span>
            <Link
              href="/timeline"
              className="text-[10.5px] sm:text-[12px] font-mono tracking-[0.18em] sm:tracking-[0.28em] uppercase text-stone-400 hover:text-white transition-colors cursor-pointer"
              title="Switch to Sequential Timeline"
            >
              TIMELINE
            </Link>
          </div>
        </div>

        {/* Center: Brand Logo & DOOMSDAY Trigger */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-auto flex items-center justify-center gap-2 sm:gap-3.5">
          <Link
            href="/timeline"
            className="text-xs sm:text-sm md:text-base font-mono font-bold tracking-[0.3em] xs:tracking-[0.4em] sm:tracking-[0.5em] uppercase text-white hover:text-stone-300 transition-colors select-none cursor-pointer"
            title="Switch to Timeline"
          >
            MARVEL
          </Link>
          <span className="text-stone-600 font-mono text-sm select-none">|</span>
          <button
            onClick={triggerDoomsdayTransition}
            className="text-[11px] sm:text-xs md:text-sm font-mono font-bold tracking-[0.3em] xs:tracking-[0.4em] sm:tracking-[0.5em] uppercase text-emerald-400/80 hover:text-emerald-300 hover:scale-105 drop-shadow-[0_0_12px_rgba(52,211,153,0.35)] transition-all select-none cursor-pointer bg-transparent border-none"
            title="Initialize Road to Doomsday Incursion"
          >
            DOOMSDAY
          </button>
        </div>

        {/* Right Side: Phase Jump Switcher, Return & Search */}
        <div className="flex items-center gap-3 sm:gap-5 pointer-events-auto">
          {/* Phase Direct Jump Switcher */}
          <div className="hidden md:flex items-center gap-2 sm:gap-2.5">
            <span className="text-[10px] sm:text-[11.5px] font-mono tracking-[0.18em] sm:tracking-[0.28em] uppercase text-stone-500">
              PHASE:
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {[1, 2, 3, 4, 5, 6].map((p) => (
                <button
                  key={p}
                  onClick={() => handleSelectPhase(p)}
                  className={`text-[10px] sm:text-[11.5px] font-mono tracking-[0.18em] transition-colors cursor-pointer px-1.5 py-0.5 ${
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

          <button
            onClick={() => setSearchOpen(true)}
            className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white text-[10px] sm:text-[11.5px] font-mono tracking-[0.18em] sm:tracking-[0.28em] uppercase transition-colors group cursor-pointer p-1.5"
            title="Search MCU (Ctrl+K or /)"
          >
            <Search size={14} className="text-stone-500 group-hover:text-white transition-colors" />
            <span className="hidden sm:inline">SEARCH</span>
            <kbd className="hidden md:inline-block text-[9.5px] font-mono text-stone-500 ml-0.5">
              /
            </kbd>
          </button>
        </div>
      </header>

      {/* Mobile Phase Pill */}
      <div className="fixed left-3 top-16 sm:top-20 z-30 md:hidden flex items-center gap-1.5">
        <button
          onClick={() => setIsPhaseDrawerOpen((prev) => !prev)}
          className="px-3 py-1 rounded-full bg-black/80 text-stone-300 text-[9px] font-mono tracking-widest uppercase backdrop-blur-md shadow-lg flex items-center cursor-pointer active:scale-95 transition-transform"
        >
          <span>{`PHASE ${spoilerPhase}`}</span>
        </button>
      </div>

      {}
      {isPhaseDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex select-none animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsPhaseDrawerOpen(false)}
          />
          <aside className="relative z-10 w-full max-w-[320px] bg-[#000000] border-r border-stone-900 h-full p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-300 shadow-[20px_0_50px_rgba(0,0,0,0.9)]">
            <div>
              {}
              <div className="flex items-center justify-between pb-4 border-b border-stone-900 mb-6">
                <span className="text-xs font-mono font-bold tracking-[0.35em] uppercase text-white">
                  SACRED FAMILY TREE
                </span>
                <button
                  onClick={() => setIsPhaseDrawerOpen(false)}
                  className="text-stone-400 hover:text-white transition-colors p-1 cursor-pointer"
                  aria-label="Close Phase HUD"
                >
                  <X size={16} strokeWidth={1.5} />
                </button>
              </div>

              {}
              <div className="border-b border-stone-900/80 pb-6 mb-6">
                <div className="font-mono text-[11px] tracking-[0.25em] uppercase text-stone-300 font-bold mb-3.5">
                  REVEAL UP TO PHASE
                </div>

                <div className="flex flex-col gap-2.5">
                  {[1, 2, 3, 4, 5, 6].map((p) => {
                    const isActive = p === spoilerPhase;
                    return (
                      <button
                        key={p}
                        onClick={() => handleSelectPhase(p)}
                        className={`w-full text-[10px] font-mono tracking-[0.18em] uppercase hover:translate-x-1 transition-all py-1 flex items-center justify-between group cursor-pointer ${
                          isActive
                            ? "text-white font-bold"
                            : "text-stone-400 hover:text-white"
                        }`}
                      >
                        <span>Phase {p}</span>
                        {isActive ? (
                          <span className="text-[8px] font-mono tracking-widest text-stone-400 uppercase">ACTIVE</span>
                        ) : (
                          <span className="text-[8.5px] text-stone-500 font-normal">
                            {p === 6 ? "ALL CHARACTERS" : `UP TO PHASE ${p}`}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {}
              <div>
                <div className="font-mono text-[11px] tracking-[0.25em] uppercase text-stone-300 font-bold mb-2">
                  SPOILER FILTER
                </div>
                <p className="text-[9.5px] font-mono text-stone-500 leading-relaxed">
                  Select a Phase to explore character relationships and lineages up to that point in the Marvel Cinematic Universe.
                </p>
              </div>
            </div>

            {}
            <div className="pt-6 border-t border-stone-900 flex items-center justify-between text-[9px] font-mono tracking-[0.25em] text-stone-500 uppercase">
              <span>{visibleNodes.length} HEROES VISIBLE</span>
              <span>PHASE {spoilerPhase}</span>
            </div>
          </aside>
        </div>
      )}

      {}
      <SlideNavMenu isOpen={navMenuOpen} onClose={() => setNavMenuOpen(false)} />

      {}
      {}
      {/* Canvas Layer */}
      <div
        ref={contentLayerRef}
        className="absolute inset-0 origin-top-left pointer-events-auto will-change-transform transform-gpu [backface-visibility:hidden] [perspective:1000px] [transform-style:preserve-3d]"
        style={{
          transform: `translate3d(${camera.x}px, ${camera.y}px, 0) scale(${camera.scale})`,
          width: "5000px",
          height: "3000px",
        }}
      >
        {/* Orthogonal SVG Lineage Network */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 5000 3000"
          style={{ overflow: "visible" }}
        >
          {/* Render All Tree Connections */}
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
                {/* Thick Invisible Hover Target */}
                <path
                  d={data.path}
                  fill="none"
                  stroke="transparent"
                  strokeWidth="16"
                  className="cursor-pointer pointer-events-auto"
                />

                {/* Visible Orthogonal Line */}
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

                {/* Junction Plus/Intersection Badge */}
                {data.junction && (
                  <g
                    transform={`translate(${data.junction.x}, ${data.junction.y})`}
                    className="pointer-events-none transition-colors duration-200"
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

                {/* Direct Lineage Direction Arrows */}
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

        {/* Character Dossier Portrait Nodes */}
        {visibleNodes.map((node) => {
          const isSelected = selectedNode?.id === node.id;
          const isHovered = hoveredNodeId === node.id;
          const isConnected = connectedNodeIds.has(node.id);

          const focusNode = activeFocusId ? visibleNodes.find((n) => n.id === activeFocusId) : null;
          const activeFamilyCluster = activeCluster !== "all" ? activeCluster : focusNode?.cluster || null;

          const isInSameFamily = activeFamilyCluster ? node.cluster === activeFamilyCluster : true;
          const isOutsideActiveFamily = activeFamilyCluster ? !isInSameFamily : false;

          return (
            <div
              key={node.id}
              data-node="true"
              onClick={(e) => focusOnNode(node, e)}
              onMouseEnter={() => setHoveredNodeId(node.id)}
              onMouseLeave={() => setHoveredNodeId((prev) => (prev === node.id ? null : prev))}
              className={`absolute cursor-pointer flex flex-col items-center group transition-opacity duration-200 ${
                isOutsideActiveFamily
                  ? "opacity-20 pointer-events-auto select-none z-0 hover:opacity-100"
                  : isConnected || !activeFocusId
                  ? "opacity-100 pointer-events-auto z-10"
                  : "opacity-65 pointer-events-auto z-10"
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
              {}
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

                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#07070a] text-stone-600 border border-dashed border-stone-800">
                    <span className="text-3xl font-mono font-light text-stone-500 group-hover:text-white transition-colors">
                      ?
                    </span>
                    <span className="text-[8px] font-mono tracking-widest uppercase text-stone-600 mt-1">
                      ENCRYPTED
                    </span>
                  </div>
                ) : (

                  <div className="relative w-full h-full bg-[#0d0d14] flex items-center justify-center">
                    {}
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
                      className="absolute inset-0 w-full h-full object-cover object-[center_15%] brightness-100 contrast-105 transition-opacity duration-300 z-10"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />

                    {}
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none z-20" />

                    {}
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white/60 group-hover:bg-white shadow-[0_0_4px_rgba(255,255,255,0.6)] transition-colors z-20" />
                  </div>
                )}
              </div>

              {}
              <div className="mt-2 flex flex-col items-center text-center w-full max-w-[160px] px-1 pointer-events-none z-20">
                <h3
                  className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-bold leading-tight line-clamp-1 max-w-full px-2 py-0.5 rounded bg-black/85 backdrop-blur-[2px] transition-colors ${
                    isSelected || isHovered
                      ? "text-white ring-1 ring-white/30"
                      : "text-stone-300"
                  }`}
                  title={node.name}
                >
                  {node.name}
                </h3>
                {node.subtitle && (
                  <p className="text-[8px] sm:text-[8.5px] font-mono tracking-widest uppercase text-stone-400 line-clamp-1 max-w-full px-1.5 py-0.5 rounded bg-black/85 backdrop-blur-[2px] mt-0.5">
                    {node.subtitle}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {}
      {}
      {}
      <footer className="fixed bottom-3 sm:bottom-4 left-0 right-0 z-30 flex items-center justify-center px-2 sm:px-4 pointer-events-none">
        <div className="no-map-drag pointer-events-auto flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-[95vw] sm:max-w-5xl py-1 sm:py-2 px-2 sm:px-3 bg-black/90 rounded-full backdrop-blur-xl shadow-2xl no-scrollbar">
          {availableDynastyClusters.map((dynasty) => {
            const isActive = activeCluster === dynasty.id;
            return (
              <button
                key={dynasty.id}
                onClick={() => focusOnCluster(dynasty.id)}
                className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[7px] xs:text-[7.5px] sm:text-[9px] font-mono tracking-wider sm:tracking-widest uppercase whitespace-nowrap transition-all cursor-pointer ${
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

      {}
      {}
      {}
      <div className="fixed bottom-14 sm:bottom-16 left-3 sm:left-6 z-30 flex items-center gap-1.5 pointer-events-auto">
        <button
          onClick={zoomIn}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/80 hover:bg-stone-900 text-stone-400 hover:text-white flex items-center justify-center text-xs transition-colors backdrop-blur-md cursor-pointer shadow-lg"
          title="Zoom In"
        >
          <ZoomIn size={13} />
        </button>
        <button
          onClick={zoomOut}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/80 hover:bg-stone-900 text-stone-400 hover:text-white flex items-center justify-center text-xs transition-colors backdrop-blur-md cursor-pointer shadow-lg"
          title="Zoom Out"
        >
          <ZoomOut size={13} />
        </button>
        <button
          onClick={resetView}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/80 hover:bg-stone-900 text-stone-400 hover:text-white flex items-center justify-center text-xs transition-colors backdrop-blur-md cursor-pointer shadow-lg"
          title="Fit All Families"
        >
          <RotateCcw size={12} />
        </button>
      </div>

      {}
      {}
      {}
      {selectedNode && (
        <>
          {}
          <div
            onClick={() => setSelectedNode(null)}
            className="md:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-xs"
          />

          <aside className="dossier-card fixed bottom-0 md:top-0 right-0 left-0 md:left-auto z-50 w-full md:max-w-[400px] max-h-[86vh] md:max-h-full bg-black/95 border-t md:border-t-0 md:border-l border-white/10 p-5 sm:p-7 shadow-[0_0_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl flex flex-col justify-between overflow-y-auto rounded-t-2xl md:rounded-none animate-in slide-in-from-bottom md:slide-in-from-right duration-300">
            <div>
              {}
              <div className="md:hidden w-10 h-1 bg-stone-700 rounded-full mx-auto mb-3.5" />

              {}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
                <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] uppercase text-stone-400">
                  <span className="text-white font-bold">{selectedNode.clusterLabel}</span>
                  <span className="text-stone-600">•</span>
                  <span>PHASE {selectedNode.phaseIntroduced}</span>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-stone-400 hover:text-white p-1 rounded-full hover:bg-white/10 cursor-pointer transition-colors"
                  aria-label="Close dossier"
                >
                  <X size={16} />
                </button>
              </div>

              {}
              <div className="mt-5 flex gap-4 items-start">
                <div className="w-20 sm:w-24 h-28 sm:h-32 rounded-xl border border-white/10 bg-stone-950 overflow-hidden shrink-0 shadow-2xl relative">
                  {selectedNode.isMystery ? (
                    <div className="w-full h-full flex items-center justify-center text-3xl font-mono text-stone-600 bg-stone-900">
                      ?
                    </div>
                  ) : (
                    <img
                      src={selectedNode.photoUrl || ""}
                      alt={selectedNode.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top filter brightness-95 contrast-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="flex flex-col gap-1">
                  <h2 className="text-base sm:text-lg font-mono font-bold text-white uppercase tracking-[0.14em] leading-tight">
                    {selectedNode.name}
                  </h2>
                  {selectedNode.subtitle && (
                    <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-stone-400">
                      {selectedNode.subtitle}
                    </p>
                  )}
                  {fullCharacterData && (
                    <div className="pt-1">
                      <span className="inline-block text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-stone-300">
                        {fullCharacterData.universe}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {}
              <div className="mt-5">
                <h4 className="text-[9.5px] font-mono tracking-[0.3em] uppercase text-stone-500 font-bold mb-1.5">
                  NARRATIVE DOSSIER
                </h4>
                <p className="text-xs sm:text-[13px] text-stone-300 leading-relaxed font-sans font-light line-clamp-4 md:line-clamp-none">
                  {selectedNode.bio ||
                    fullCharacterData?.overview ||
                    "Encrypted timeline record preserved in the Sacred Timeline archives."}
                </p>
              </div>

              {}
              <div className="mt-5">
                <h4 className="text-[9.5px] font-mono tracking-[0.3em] uppercase text-stone-500 font-bold mb-2">
                  DIRECT GENEALOGICAL CONNECTIONS
                </h4>
                <div className="space-y-2">
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
                          className="w-full p-2.5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.06] flex items-center justify-between text-left transition-all group cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-9 rounded-md bg-stone-900 border border-white/10 overflow-hidden shrink-0 shadow-sm">
                              <img
                                src={otherNode.photoUrl || ""}
                                alt={otherNode.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover filter brightness-95"
                              />
                            </div>
                            <div>
                              <div className="text-xs font-mono font-bold text-stone-200 uppercase tracking-wider group-hover:text-white transition-colors">
                                {otherNode.name}
                              </div>
                              <div className="text-[8.5px] font-mono uppercase tracking-widest text-stone-500 mt-0.5">
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

              {}
              {fullCharacterData &&
                fullCharacterData.artifactsPossessed.length > 0 && (
                  <div className="mt-5">
                    <h4 className="text-[9.5px] font-mono tracking-[0.3em] uppercase text-stone-500 font-bold mb-2">
                      COSMIC RELICS WIELDED
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {fullCharacterData.artifactsPossessed.map((artId) => (
                        <Link
                          key={artId}
                          href={`/artifacts?relic=${encodeURIComponent(artId)}`}
                          className="inline-flex items-center text-[9px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-stone-300 hover:border-white/30 hover:text-white transition-colors"
                        >
                          {artId.replace("-", " ")}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            {}
            {selectedNode.characterId && (
              <div className="pt-4 border-t border-white/10 mt-5">
                <Link
                  href={`/characters/${selectedNode.characterId}`}
                  className="w-full py-2.5 sm:py-3 rounded-xl bg-white text-black font-mono font-bold text-[10px] tracking-[0.22em] uppercase flex items-center justify-center gap-2 hover:bg-stone-200 transition-colors shadow-lg cursor-pointer"
                >
                  <span>OPEN FULL DOSSIER</span>
                  <ExternalLink size={12} />
                </Link>
              </div>
            )}
          </aside>
        </>
      )}

      {}
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </div>
  );
}
