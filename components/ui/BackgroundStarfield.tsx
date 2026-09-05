"use client";

import React, { useRef, useEffect } from "react";

export default function BackgroundStarfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

    const starCount = 600;
    const particles = Array.from({ length: starCount }, () => {
      const isLarge = Math.random() > 0.85;
      const isMedium = Math.random() > 0.5;
      const radius = isLarge
        ? Math.random() * 1.2 + 1.5
        : isMedium
        ? Math.random() * 0.7 + 0.8
        : Math.random() * 0.5 + 0.4;
      const baseAlpha = isLarge
        ? Math.random() * 0.4 + 0.45
        : isMedium
        ? Math.random() * 0.3 + 0.25
        : Math.random() * 0.25 + 0.15;

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        radius,
        baseAlpha,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        color:
          Math.random() > 0.8
            ? "210, 230, 255"
            : Math.random() > 0.9
            ? "255, 240, 220"
            : "255, 255, 255",
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        p.twinklePhase += p.twinkleSpeed;
        const currentAlpha = Math.max(
          0.08,
          Math.min(1, p.baseAlpha + Math.sin(p.twinklePhase) * 0.25)
        );

        ctx.fillStyle = `rgba(${p.color}, ${currentAlpha})`;
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

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.95)_100%)] pointer-events-none z-0" />
    </>
  );
}
