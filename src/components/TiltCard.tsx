"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Card that tilts toward the pointer (max ~10deg) and eases back on leave.
 */
export default function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateX(${(-py * 10).toFixed(
      2,
    )}deg) rotateY(${(px * 10).toFixed(2)}deg)`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transition = "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)";
    ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    window.setTimeout(() => {
      if (ref.current) ref.current.style.transition = "";
    }, 500);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}
