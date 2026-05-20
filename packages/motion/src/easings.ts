// Framer Motion easing arrays [x1, y1, x2, y2] format

export const easings = {
  outSmooth: [0.16, 1, 0.3, 1] as [number, number, number, number],
  inOutSmooth: [0.87, 0, 0.13, 1] as [number, number, number, number],
  spring: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  cinematic: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  standard: [0.2, 0, 0, 1] as [number, number, number, number],
  decelerate: [0, 0, 0, 1] as [number, number, number, number],
  accelerate: [0.3, 0, 1, 1] as [number, number, number, number],
} as const;

export const springs = {
  // Standard spring — smooth, no bounce
  smooth: { type: "spring" as const, stiffness: 300, damping: 40, mass: 1 },
  // Responsive spring — quick snap
  snappy: { type: "spring" as const, stiffness: 500, damping: 50, mass: 0.8 },
  // Gentle spring — slow settle
  gentle: { type: "spring" as const, stiffness: 120, damping: 30, mass: 1 },
  // Bouncy spring — overshoots slightly
  bouncy: { type: "spring" as const, stiffness: 300, damping: 20, mass: 1 },
  // Mobile iOS-style spring
  ios: { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 },
} as const;
