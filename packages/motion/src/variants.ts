import type { Variants, Transition } from "framer-motion";
import { easings } from "./easings";

// Shared transitions
const fastTransition: Transition = {
  duration: 0.15,
  ease: easings.outSmooth,
};

const baseTransition: Transition = {
  duration: 0.3,
  ease: easings.outSmooth,
};

const moderateTransition: Transition = {
  duration: 0.5,
  ease: easings.outSmooth,
};

const slowTransition: Transition = {
  duration: 0.8,
  ease: easings.outSmooth,
};

const cinematicTransition: Transition = {
  duration: 1.2,
  ease: easings.cinematic,
};

// ─────────────────────────────────────────
// PRIMITIVE 1: Cinematic Reveal
// Full-section entrance — fade up from below
// ─────────────────────────────────────────
export const cinematicReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      ...moderateTransition,
      duration: 0.8,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: fastTransition,
  },
};

// ─────────────────────────────────────────
// PRIMITIVE 2: Stagger Text
// Staggered text reveal for headings/lists
// ─────────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
};

export const staggerItemFast: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: fastTransition,
  },
};

// ─────────────────────────────────────────
// PRIMITIVE 3: Parallax Depth
// Values applied via style prop with useTransform
// Use with: transform: useTransform(scrollY, [0, 1000], [0, -200])
// ─────────────────────────────────────────
export const parallaxConfig = {
  slow: { factor: 0.1 },    // 10% of scroll speed
  medium: { factor: 0.25 }, // 25% of scroll speed
  fast: { factor: 0.5 },    // 50% of scroll speed
} as const;

// ─────────────────────────────────────────
// PRIMITIVE 4: Magnetic Hover
// Applied via onMouseMove handler — not Variants
// Usage: see useMagneticHover hook in hooks.ts
// ─────────────────────────────────────────
export const magneticConfig = {
  strength: 0.35,     // 35% of cursor offset applied to element
  maxOffset: 16,      // max px offset
  transition: { type: "spring" as const, stiffness: 300, damping: 30 },
} as const;

// ─────────────────────────────────────────
// PRIMITIVE 5: Ambient Float
// Gentle continuous floating animation for decorative elements
// ─────────────────────────────────────────
export const ambientFloat: Variants = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

export const ambientFloatSlow: Variants = {
  animate: {
    y: [0, -8, 0],
    rotate: [0, 1, -1, 0],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

// ─────────────────────────────────────────
// PRIMITIVE 6: Page Transition
// Full-page enter/exit with clip-path reveal
// ─────────────────────────────────────────
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easings.outSmooth,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.3,
      ease: easings.accelerate,
    },
  },
};

// Cinematic clip-path reveal (curtain style)
export const curtainReveal: Variants = {
  initial: {
    clipPath: "inset(0 0 100% 0)",
  },
  enter: {
    clipPath: "inset(0 0 0% 0)",
    transition: {
      duration: 0.8,
      ease: easings.outSmooth,
    },
  },
  exit: {
    clipPath: "inset(100% 0 0% 0)",
    transition: {
      duration: 0.5,
      ease: easings.accelerate,
    },
  },
};

// ─────────────────────────────────────────
// PRIMITIVE 7: Scroll Choreography
// Viewport-triggered entrance animations
// Use with: whileInView="visible" viewport={{ once: true, margin: "-100px" }}
// ─────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.outSmooth,
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: baseTransition,
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: easings.outSmooth,
    },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: easings.outSmooth,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easings.outSmooth,
    },
  },
};

// ─────────────────────────────────────────
// PRIMITIVE 8: Smooth Interpolation
// UI state transitions — modals, menus, dropdowns
// ─────────────────────────────────────────
export const expandDown: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: easings.inOutSmooth },
      opacity: { duration: 0.2 },
    },
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.4, ease: easings.outSmooth },
      opacity: { duration: 0.3, delay: 0.1 },
    },
  },
};

export const overlayBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, ease: "linear" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

export const slideUpModal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: easings.outSmooth,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.97,
    transition: {
      duration: 0.2,
      ease: easings.accelerate,
    },
  },
};

// Card hover state
export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
    transition: baseTransition,
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      duration: 0.25,
      ease: easings.outSmooth,
    },
  },
};

// Button press
export const buttonPress = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: fastTransition },
  tap: { scale: 0.97, transition: { duration: 0.1 } },
};
