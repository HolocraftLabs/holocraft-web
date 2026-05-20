// Color tokens
export const colors = {
  background: "#060606",
  backgroundElevated: "#0b0d0f",
  backgroundOverlay: "#111418",
  foreground: "#f5f5f5",
  foregroundMuted: "rgba(255,255,255,0.62)",
  foregroundSubtle: "rgba(255,255,255,0.40)",
  foregroundFaint: "rgba(255,255,255,0.22)",
  border: "rgba(255,255,255,0.10)",
  borderSubtle: "rgba(255,255,255,0.06)",
  borderStrong: "rgba(255,255,255,0.22)",
  accent: "#06b6d4",
  accentLight: "#b9f4ff",
  accentDim: "rgba(6,182,212,0.15)",
} as const;

// Motion tokens
export const duration = {
  instant: 0,
  fast: 150,
  base: 300,
  moderate: 500,
  slow: 800,
  cinematic: 1200,
} as const;

export const easing = {
  linear: "linear",
  in: "cubic-bezier(0.4,0,1,1)",
  out: "cubic-bezier(0,0,0.2,1)",
  inOut: "cubic-bezier(0.4,0,0.2,1)",
  outSmooth: "cubic-bezier(0.16,1,0.3,1)",
  inOutSmooth: "cubic-bezier(0.87,0,0.13,1)",
  spring: "cubic-bezier(0.34,1.56,0.64,1)",
  cinematic: "cubic-bezier(0.25,0.1,0.25,1)",
} as const;

export type DurationKey = keyof typeof duration;
export type EasingKey = keyof typeof easing;
