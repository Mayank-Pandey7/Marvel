"use client";

import React, { useRef, useEffect } from "react";

interface CrossStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  coreRadius: number;
  spikeLen: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export default function BackgroundStarfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setupCanvas = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    setupCanvas();
    window.addEventListener("resize", setupCanvas);

    // Fixed star count requested by user
    const starCount = 700;

    const stars: CrossStar[] = Array.from({ length: starCount }, () => {
      const rand = Math.random();
      let spikeLen: number;
      let coreRadius: number;
      let baseAlpha: number;
      let speedScale: number;

      if (rand > 0.96) {
        // Rare subtle foreground glint
        spikeLen = Math.random() * 1.4 + 2.8; // 2.8px - 4.2px
        coreRadius = Math.random() * 0.25 + 0.5; // 0.5px - 0.75px
        baseAlpha = Math.random() * 0.2 + 0.7;
        speedScale = 0.055;
      } else if (rand > 0.85) {
        // Mid-depth cosmic star
        spikeLen = Math.random() * 1.0 + 1.4; // 1.4px - 2.4px
        coreRadius = Math.random() * 0.18 + 0.3; // 0.3px - 0.48px
        baseAlpha = Math.random() * 0.25 + 0.45;
        speedScale = 0.035;
      } else {
        // Vast deep cosmic stardust (far back in the galaxy)
        spikeLen = Math.random() * 0.7 + 0.5; // 0.5px - 1.2px tiny micro glints
        coreRadius = Math.random() * 0.12 + 0.15; // 0.15px - 0.27px
        baseAlpha = Math.random() * 0.3 + 0.18;
        speedScale = 0.018;
      }

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speedScale,
        vy: (Math.random() - 0.5) * speedScale,
        coreRadius,
        spikeLen,
        baseAlpha,
        twinkleSpeed: Math.random() * 0.018 + 0.004,
        twinklePhase: Math.random() * Math.PI * 2,
      };
    });

    const drawCrossStar = (
      x: number,
      y: number,
      spikeLen: number,
      coreRadius: number,
      alpha: number
    ) => {
      ctx.save();
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;

      // 4-pointed curved diamond flare (Alien X Celestialsapien signature glint)
      ctx.beginPath();
      ctx.moveTo(x, y - spikeLen);
      ctx.quadraticCurveTo(x, y, x + spikeLen, y);
      ctx.quadraticCurveTo(x, y, x, y + spikeLen);
      ctx.quadraticCurveTo(x, y, x - spikeLen, y);
      ctx.quadraticCurveTo(x, y, x, y - spikeLen);
      ctx.closePath();
      ctx.fill();

      // Bright circular core for noticeable stars
      if (coreRadius > 0.35) {
        ctx.beginPath();
        ctx.arc(x, y, coreRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        // Float and drift across the cosmos
        star.x += star.vx;
        star.y += star.vy;

        const margin = star.spikeLen + 4;
        if (star.x < -margin) star.x = width + margin;
        if (star.x > width + margin) star.x = -margin;
        if (star.y < -margin) star.y = height + margin;
        if (star.y > height + margin) star.y = -margin;

        // Twinkle and breathing sparkle
        star.twinklePhase += star.twinkleSpeed;
        const alphaMod = Math.sin(star.twinklePhase);
        const currentAlpha = Math.max(
          0.05,
          Math.min(1, star.baseAlpha + alphaMod * 0.18)
        );
        const currentSpike = star.spikeLen * (1 + alphaMod * 0.1);

        drawCrossStar(
          star.x,
          star.y,
          currentSpike,
          star.coreRadius,
          currentAlpha
        );
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", setupCanvas);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-[#000000] pointer-events-none z-0" />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />
    </>
  );
}

