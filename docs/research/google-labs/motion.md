# Google Labs: Motion

## Material Motion Principles

Material 3 defines motion as a communication system, not a decoration layer. Every animation conveys
one of four physical behaviors:

**Emphasize** — draws attention to something new or important. Used for: onboarding spotlights,
badge appearances, success confirmations. Characterized by a slight overshoot or scale pulse.

**Decelerate** — elements entering the screen decelerate into their final position. Simulates
physical arrival (momentum slows as the element "lands"). Used for: navigation transitions in,
dialog/sheet open, dropdown appear.

**Accelerate** — elements leaving the screen accelerate away. Simulates physical departure.
Used for: navigation transitions out, dialog/sheet close, snackbar dismiss.

**Standard** — elements that move within the visible screen (not entering or leaving). Used for:
content reflow, filter changes, layout updates, scroll-linked animations.

## Easing Functions (Exact cubic-bezier Values)

### Standard Easing
```css
transition-timing-function: cubic-bezier(0.2, 0, 0, 1);
```
Use for: elements that begin and end within the visible viewport. Reordering, resizing, state changes
that shift layout. The element starts with moderate speed and decelerates sharply to a precise stop.

### Decelerate Easing (Emphasized Decelerate)
```css
transition-timing-function: cubic-bezier(0, 0, 0, 1);
```
Use for: elements entering the screen, content appearing, modals/sheets opening. Fast entry,
precision landing. The `0, 0` control point means the animation starts at maximum velocity.

### Accelerate Easing (Emphasized Accelerate)
```css
transition-timing-function: cubic-bezier(0.3, 0, 1, 1);
```
Use for: elements leaving the screen, dismissals, content disappearing. Slow start, builds to
full speed. The element "launches" away rather than sliding out at constant velocity.

### Legacy Standard Easing (M2 compatibility, still used in some M3 components)
```css
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
```
This is the classic Material ease-in-out. Still present in M3 for short, contained animations
where the new emphasized easings feel excessive.

## Duration Scale

Material 3 defines a duration token system. Use the named tokens, not arbitrary millisecond values.

| Token | Duration | Usage |
|---|---|---|
| `--md-sys-motion-duration-short1` | 50ms | Icon state changes (fill toggle), micro feedback |
| `--md-sys-motion-duration-short2` | 100ms | Tooltip appear, badge appear |
| `--md-sys-motion-duration-short3` | 150ms | Selection state change, ripple expansion start |
| `--md-sys-motion-duration-short4` | 200ms | Button state change, chip select, small fade |
| `--md-sys-motion-duration-medium1` | 250ms | List item expand, small component transitions |
| `--md-sys-motion-duration-medium2` | 300ms | FAB extend, navigation rail item, card expand |
| `--md-sys-motion-duration-medium3` | 350ms | Search bar expand, filter panel open |
| `--md-sys-motion-duration-medium4` | 400ms | Tab transition, color scheme change |
| `--md-sys-motion-duration-long1` | 450ms | Bottom sheet open, full-screen dialog enter |
| `--md-sys-motion-duration-long2` | 500ms | Large container transform, page transition |
| `--md-sys-motion-duration-long3` | 550ms | Complex shared element transitions |
| `--md-sys-motion-duration-long4` | 600ms | Onboarding screen transitions |
| `--md-sys-motion-duration-extra-long1` | 700ms | Feature spotlight animations |
| `--md-sys-motion-duration-extra-long2` | 800ms | (rare) Elaborate entrance sequences |
| `--md-sys-motion-duration-extra-long3` | 900ms | (rare) Full-screen illustrative transitions |
| `--md-sys-motion-duration-extra-long4` | 1000ms | (rare) Maximum. Use with extreme caution. |

## Container Transform Pattern

Container transform is M3's signature transition: an element morphs from one shape/size into another.
The source element (e.g., a card or FAB) expands to become the destination container (e.g., a dialog
or detail screen).

### Phase Breakdown
1. **Fade out** content of source container (0–120ms, opacity 1→0)
2. **Shape morph** source container into target shape (0–300ms, border-radius + width + height)
3. **Fade in** content of destination container (120–300ms, opacity 0→1)

### Implementation with Framer Motion
```tsx
// Shared layout animation — source and destination share the same layoutId
<motion.div layoutId="card-to-modal" layout style={{ borderRadius: 12 }}>
  {/* card content */}
</motion.div>

// On modal open:
<AnimatePresence>
  {isOpen && (
    <motion.div
      layoutId="card-to-modal"
      layout
      style={{ borderRadius: 28 }}
      transition={{ duration: 0.3, ease: [0, 0, 0, 1] }}
    >
      {/* modal content */}
    </motion.div>
  )}
</AnimatePresence>
```

## Shared Axis Pattern

Shared axis transitions communicate spatial or sequential relationships. Elements slide along a shared
axis (X for left/right navigation, Y for up/down within hierarchy).

### Horizontal Shared Axis (Tabs, Wizard Steps)
- Outgoing: `translateX(0) → translateX(-30px)`, opacity `1 → 0`, duration 200ms accelerate
- Incoming: `translateX(30px) → translateX(0)`, opacity `0 → 1`, duration 300ms decelerate
- The 30px offset is not 100vw — this is NOT a full slide. It's a short offset suggesting direction.

```tsx
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 30 : -30,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 30 : -30,
    opacity: 0,
  }),
};

<AnimatePresence custom={direction} mode="wait">
  <motion.div
    key={currentStep}
    custom={direction}
    variants={variants}
    initial="enter"
    animate="center"
    exit="exit"
    transition={{
      x: { duration: 0.3, ease: [0, 0, 0, 1] },
      opacity: { duration: 0.2 },
    }}
  />
</AnimatePresence>
```

## Fade Through Pattern

Fade through is used when elements have no spatial relationship — one fades out, then another fades in.
Unlike a crossfade, there is a brief moment of empty space (or low opacity) between them.

- Outgoing: opacity `1 → 0`, scale `1.0 → 0.92`, duration 90ms accelerate
- Gap: 30ms pause (or simply the outgoing animation completes first)
- Incoming: opacity `0 → 1`, scale `0.92 → 1.0`, duration 210ms decelerate

```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={activeTab}
    initial={{ opacity: 0, scale: 0.92 }}
    animate={{ opacity: 1, scale: 1, transition: { duration: 0.21, ease: [0, 0, 0, 1] } }}
    exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.09, ease: [0.3, 0, 1, 1] } }}
  />
</AnimatePresence>
```

## Prefers-Reduced-Motion

All M3 animations must be disabled or replaced when the user has requested reduced motion. This is
not optional — it is an accessibility requirement.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

For Framer Motion, use the `useReducedMotion` hook:

```tsx
import { useReducedMotion } from 'framer-motion';

function AnimatedComponent() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      animate={{ x: shouldReduce ? 0 : 30, opacity: 1 }}
      transition={{ duration: shouldReduce ? 0 : 0.3 }}
    />
  );
}
```

Essential state changes (showing/hiding elements for functionality) use `opacity: 0/1` with
`visibility: hidden/visible` instead of animation when reduced motion is active.

## Spring Motion for Framer Motion Mapping

When Framer Motion spring physics are preferred over cubic-bezier easings:

| M3 Easing | Framer Motion Spring Equivalent |
|---|---|
| Standard `cubic-bezier(0.2, 0, 0, 1)` | `{ type: "spring", stiffness: 400, damping: 40, mass: 1 }` |
| Decelerate `cubic-bezier(0, 0, 0, 1)` | `{ type: "spring", stiffness: 600, damping: 50, mass: 0.8 }` |
| Accelerate `cubic-bezier(0.3, 0, 1, 1)` | Not recommended as spring — use `ease: [0.3, 0, 1, 1]` |

For container transforms specifically, `type: "spring", bounce: 0` provides the
most natural morphing behavior:
```tsx
transition={{ layout: { type: "spring", bounce: 0, duration: 0.4 } }}
```

## Ripple Effect Animation

Touch/click feedback that radiates from the point of interaction.

```css
.ripple {
  position: absolute;
  border-radius: 50%;
  background: var(--md-sys-color-on-primary);
  opacity: 0.24;
  transform: scale(0);
  animation: ripple-expand 400ms cubic-bezier(0, 0, 0.2, 1) forwards;
  pointer-events: none;
}

@keyframes ripple-expand {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
```

Final ripple size: diameter = `max(width, height) * 2.5`. Initial position: centered on
click/touch coordinates. Opacity starts at `0.24` (pressed state layer) and fades to `0`.
