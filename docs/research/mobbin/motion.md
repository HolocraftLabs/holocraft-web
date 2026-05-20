# Mobbin — Motion

## iOS Spring Physics Foundation

iOS does not use CSS cubic-bezier timing functions for UI animations. It uses a spring physics model — every animated element has mass, stiffness, and damping. The result is motion that feels physical: it overshoots slightly, then settles. This is why native iOS apps feel alive and web apps often feel mechanical.

The iOS UIKit spring default: `UISpringTimingParameters` with `dampingRatio: 0.7`, `response: 0.4s`. Translated to a spring model: **stiffness ≈ 300, damping ≈ 30, mass = 1**.

In Framer Motion, this translates to:
```js
transition: {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 1
}
```

This is Holocraft's default spring. All interactive element motion starts here unless a specific override is documented.

## Sheet Presentation (Bottom Sheet / Modal)

iOS sheets slide up from the bottom of the screen. The animation has two phases: the background dims, and the sheet travels from `translateY(100%)` to `translateY(0)`.

**Specification:**
- Duration: ~300ms (spring-based, not fixed duration)
- Spring: stiffness 300, damping 30
- Background dim: opacity 0 → 0.5, timing 250ms ease-out (slightly ahead of sheet)
- Dismiss: reverse — sheet drops down, bg fades, 250ms

**Framer Motion implementation:**
```js
// Sheet variants
const sheetVariants = {
  hidden: { y: "100%", opacity: 1 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
  exit: {
    y: "100%",
    transition: { type: "spring", stiffness: 300, damping: 35, duration: 0.25 }
  }
}

// Backdrop variants
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }
}
```

## Tab Bar Navigation

Tab switching in iOS is nearly instant. The current tab's content fades out as the new tab's content fades in. There is no slide or push — tabs are not hierarchical, they are peer views.

**Specification:**
- Switch timing: 150ms
- Easing: ease-in-out (cross-fade)
- Tab icon: active state fills with accent color, 100ms
- Tab label: active state switches to weight 600 and accent color, 100ms
- No scale on tab icon activation

**Framer Motion implementation:**
```js
const tabContentVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15, ease: "easeInOut" } },
  exit: { opacity: 0, transition: { duration: 0.1, ease: "easeIn" } }
}
```

## Card Expand (Shared Element Transition)

When a card is tapped, it expands to fill the screen. The card morphs in place — its border-radius shrinks, it grows to fill the viewport. This is the "hero" animation pattern (called `matchedGeometryEffect` in SwiftUI, `sharedElement` in React Navigation).

**Specification:**
- Duration: 400ms spring (stiffness 280, damping 28)
- Border-radius: 12px → 0px (or to modal border-radius)
- Scale: card's actual size → full screen (layout animation)
- Content inside the card: fades in at 200ms offset (after card has expanded 50%)
- Dismiss: reverse, 350ms spring

**Web approximation (no true shared element in browser):**
```js
// Expand from card position to full-screen overlay
const expandVariants = {
  initial: {
    borderRadius: 12,
    scale: 0.9,
    opacity: 0
  },
  animate: {
    borderRadius: 0,
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 280, damping: 28 }
  }
}
```

## Pull to Refresh

The rubber band elastic resistance effect in iOS scroll views is a core spatial metaphor. Pulling beyond the top of a list compresses the resistance exponentially — the list follows the finger but with decreasing responsiveness.

**Specification:**
- Resistance factor: pull distance × 0.4 (40% of finger movement)
- Loading spinner appears at 60px pull threshold
- Spinner opacity: 0 at 0px pull → 1.0 at 60px pull (linear)
- Release: spring snap-back, stiffness 400, damping 35
- Loading: spinner rotates continuously at 1 revolution per 800ms

**Framer Motion drag implementation:**
```js
// Attach to scroll container
dragConstraints={{ top: 0, bottom: 0 }}
dragElastic={{ top: 0.4, bottom: 0 }}
// onDrag: measure y position, trigger refresh at threshold
```

## Swipe to Dismiss / Delete

Cards and list items in iOS can be swiped horizontally to reveal actions (delete, archive, snooze). The card follows the finger with spring physics, then snaps back if released below threshold, or commits to the action if released above threshold.

**Specification:**
- Dismiss threshold: 40% of element width
- Follow ratio: 1:1 (card moves exactly with finger)
- Spring back: stiffness 400, damping 40 (fast, snappy)
- Commit to dismiss: x moves to -100% (or +100%), 200ms ease-in
- Delete action reveal: slides in from right as card moves left, starts at 30px card displacement

**Framer Motion implementation:**
```js
const swipeThreshold = elementWidth * 0.4
// onDragEnd: if offset.x < -swipeThreshold → animate to dismiss; else → animate back to 0
transition: { type: "spring", stiffness: 400, damping: 40 }
```

## Button Press

Every tappable element in iOS gives physical feedback. The primary feedback mechanism is a subtle scale-down on press.

**Specification:**
- Press: scale 0.97, timing instant (0ms — follows finger contact)
- Release: scale 1.0, spring stiffness 400, damping 25 (quick, slight overshoot)
- Opacity on press: 0.9 (subtle dim, communicates "registered")
- Long press: maintain 0.97 scale for duration, then spring release

**Framer Motion implementation:**
```jsx
<motion.button
  whileTap={{ scale: 0.97, opacity: 0.9 }}
  transition={{ type: "spring", stiffness: 400, damping: 25 }}
>
```

## Loading and Skeleton States

Premium apps do not show full-page spinners. Content areas show skeleton screens while loading — grey placeholder shapes that match the layout of the content about to appear.

**Specification:**
- Skeleton color: `rgba(0,0,0,0.06)` light mode, `rgba(255,255,255,0.06)` dark mode
- Shimmer animation: linear gradient moves left-to-right over 1500ms, looping
- Shimmer gradient: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)`
- Background position: -200% → 200% (full sweep)
- Border-radius: matches the content element it replaces

**CSS animation:**
```css
@keyframes shimmer {
  from { background-position: -200% 0; }
  to   { background-position:  200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    rgba(0,0,0,0.06) 25%,
    rgba(0,0,0,0.12) 50%,
    rgba(0,0,0,0.06) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}
```

## Navigation Push / Pop

iOS navigation stacks push new views in from the right and pop them back to the left. The parent view simultaneously moves left as the child enters from the right.

**Specification:**
- Push: new view enters from `translateX(100%)` to `translateX(0)`, 350ms spring (stiffness 280, damping 30)
- Push: parent view exits to `translateX(-30%)`, same timing (parallax depth effect)
- Pop: reverse — child exits right (+100%), parent returns from -30% to 0
- Navigation bar title: cross-fades between screens, 200ms

**Framer Motion page transition:**
```js
const pageVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-30%",
    opacity: direction > 0 ? 1 : 0.7
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({
    x: direction < 0 ? "100%" : "-30%",
    opacity: direction < 0 ? 1 : 0.7
  })
}

const pageTransition = {
  type: "spring",
  stiffness: 280,
  damping: 30
}
```

## Reduced Motion

All animations must respect `prefers-reduced-motion`. The rule: when reduced motion is active, replace transform/position animations with opacity fade. Keep duration and spring values but remove translate/scale.

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

```js
// Framer Motion
import { useReducedMotion } from "framer-motion"
const prefersReducedMotion = useReducedMotion()

const variants = prefersReducedMotion
  ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
  : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
```

## Timing Reference Table

| Interaction | Duration | Curve |
|------------|----------|-------|
| Button press (scale) | instant + spring release | spring 400/25 |
| Hover state | 150ms | ease-out |
| Tab switch | 150ms | ease-in-out |
| Toast appear | 250ms | ease-out |
| Bottom sheet open | ~300ms | spring 300/30 |
| Modal open | ~300ms | spring 300/30 |
| Page push | ~350ms | spring 280/30 |
| Card expand | ~400ms | spring 280/28 |
| Shimmer loop | 1500ms | ease-in-out |
