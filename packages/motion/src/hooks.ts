"use client";

import { useRef, useCallback } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { magneticConfig } from "./variants";

// Magnetic hover hook — applies spring physics to element position based on cursor proximity
export function useMagneticHover() {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, magneticConfig.transition);
  const springY = useSpring(y, magneticConfig.transition);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * magneticConfig.strength;
    const deltaY = (e.clientY - centerY) * magneticConfig.strength;
    x.set(Math.min(Math.max(deltaX, -magneticConfig.maxOffset), magneticConfig.maxOffset));
    y.set(Math.min(Math.max(deltaY, -magneticConfig.maxOffset), magneticConfig.maxOffset));
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, springX, springY, handleMouseMove, handleMouseLeave };
}

// Reduced motion check
export function usePrefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
