"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Ambient "digital rain" canvas used behind the hero.
 * Burgundy monospace glyphs falling with a trailing fade, masked by a soft
 * radial gradient so the effect dissolves into the dark background.
 */
export default function MatrixRain({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const CHARS = "01ΑΒΓΔΕΖΗΘΛΞΠΣΦΨΩ#%&+=<>";
    const FONT_SIZE = 14;
    let cols = 0;
    let drops: number[] = [];
    let raf = 0;
    let last = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      cols = Math.max(1, Math.floor(rect.width / FONT_SIZE));
      drops = Array.from({ length: cols }, () =>
        Math.floor((Math.random() * -rect.height) / FONT_SIZE),
      );
    };
    resize();

    const draw = (time: number) => {
      raf = requestAnimationFrame(draw);
      if (time - last < 55) return; // ~18fps keeps it calm
      last = time;

      ctx.fillStyle = "rgba(14, 16, 17, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${FONT_SIZE}px "JetBrains Mono", ui-monospace, monospace`;

      for (let i = 0; i < cols; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;
        // lead glyph brighter, trail dimmer
        ctx.fillStyle =
          Math.random() > 0.975 ? "rgba(245, 163, 192, 0.9)" : "rgba(163, 13, 80, 0.85)";
        ctx.fillText(char, x, y);
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    raf = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{
        maskImage:
          "radial-gradient(ellipse 60% 70% at 65% 45%, black 0%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 60% 70% at 65% 45%, black 0%, transparent 75%)",
        opacity: 0.25,
      }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
