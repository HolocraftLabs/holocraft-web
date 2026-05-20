# DesignPrompts — Motion

## Design System Motion Tokens

Motion in a design system is treated as a first-class token category alongside color, spacing, and typography. Inconsistent animation timing is one of the most common reasons a UI feels unpolished. Token-driven motion eliminates this inconsistency.

### Duration Tokens

```css
--duration-instant:  0ms;      /* State changes that should appear immediate (no animation) */
--duration-fastest:  50ms;     /* Micro-feedback: icon swap, checkmark appear */
--duration-fast:     100ms;    /* Hover states, active states, color changes */
--duration-normal:   200ms;    /* Standard UI transitions: dropdown open, tooltip, badge */
--duration-slow:     300ms;    /* Larger elements: modal, panel, sheet */
--duration-slower:   500ms;    /* Complex animations: page transitions, stagger sequences */
--duration-slowest:  800ms;    /* Skeleton shimmer start, progress bar */
```

**Rule:** Match duration to element size and distance traveled. A small tooltip appearing at the cursor takes 100ms. A full-height side panel sliding in takes 300ms. Duration that is too short feels jarring; duration that is too long feels sluggish.

### Easing Tokens

```css
/* Standard curve family (Material Design influence) */
--ease-linear:   linear;

/* Entering elements: start fast, decelerate to final position */
--ease-out:      cubic-bezier(0, 0, 0.2, 1);    /* Google's "Standard Decelerate" */
--ease-out-soft: cubic-bezier(0, 0, 0.4, 1);    /* Gentler deceleration */

/* Exiting elements: start at speed, accelerate away */
--ease-in:       cubic-bezier(0.4, 0, 1, 1);    /* Google's "Standard Accelerate" */
--ease-in-soft:  cubic-bezier(0.2, 0, 1, 1);    /* Gentler acceleration */

/* Elements moving between positions */
--ease-in-out:   cubic-bezier(0.4, 0, 0.2, 1);  /* Google's "Standard" */

/* Emphasis — overshoot slightly */
--ease-bounce:   cubic-bezier(0.34, 1.56, 0.64, 1);  /* slight spring-like overshoot */
```

**Usage rules:**
- Elements entering the viewport: `--ease-out` (they decelerate as they arrive)
- Elements leaving the viewport: `--ease-in` (they accelerate as they depart)
- Elements changing position within the viewport: `--ease-in-out` (symmetric movement)
- State changes without movement: `linear` or `--ease-in-out` (opacity, color)

### Interaction-Specific Motion Pairs

These are the exact duration + easing combinations to use for common interactions:

```css
/* Button hover (background color change) */
transition: background-color var(--duration-fast) var(--ease-out);
/* = background-color 100ms cubic-bezier(0,0,0.2,1) */

/* Button press (scale feedback) */
transition: transform var(--duration-fastest) linear;
/* = transform 50ms linear — instant, physical */

/* Input focus ring appear */
transition: box-shadow var(--duration-fast) var(--ease-out);
/* = box-shadow 100ms cubic-bezier(0,0,0.2,1) */

/* Dropdown / select open */
transition: opacity var(--duration-normal) var(--ease-out),
            transform var(--duration-normal) var(--ease-out);
/* = 200ms, transform from scaleY(0.95) to scaleY(1) + opacity 0→1 */

/* Modal open */
transition: opacity var(--duration-slow) var(--ease-out),
            transform var(--duration-slow) var(--ease-out);
/* = 300ms, transform scale(0.95)→scale(1) + opacity */

/* Modal backdrop */
transition: opacity var(--duration-normal) var(--ease-out);
/* = opacity 200ms, slightly ahead of modal content */

/* Toast / notification slide-in */
transition: transform var(--duration-slow) var(--ease-out),
            opacity var(--duration-normal) var(--ease-out);
/* = 300ms slide, 200ms fade, simultaneously */

/* Tooltip appear */
transition: opacity var(--duration-fast) var(--ease-out),
            transform var(--duration-fast) var(--ease-out);
/* = 100ms, transform translateY(-4px)→translateY(0) */

/* Accordion / collapsible expand */
transition: height var(--duration-normal) var(--ease-in-out);
/* = 200ms */

/* Color change (status, theme) */
transition: color var(--duration-fast) var(--ease-in-out),
            background-color var(--duration-fast) var(--ease-in-out),
            border-color var(--duration-fast) var(--ease-in-out);
```

## Reduced Motion

Every animation in Holocraft outputs must respect `prefers-reduced-motion: reduce`. This is not optional — it is a WCAG 2.1 AA requirement for motion-sensitive users (vestibular disorders, epilepsy, motion sickness).

### CSS Implementation

```css
/* Apply to all transitions globally */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

This blanket rule is the safe global default. Individual components may need more nuanced handling — replace position animations (transform, translate) with opacity-only transitions, keeping the state change but removing the movement.

### Framer Motion Implementation

```js
import { useReducedMotion } from "framer-motion"

function AnimatedComponent() {
  const prefersReducedMotion = useReducedMotion()

  // Replace transform animations with opacity-only when reduced motion is preferred
  const variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.1 } }
      }
    : {
        hidden: { opacity: 0, y: 16, scale: 0.98 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { type: "spring", stiffness: 300, damping: 30 }
        }
      }

  return <motion.div variants={variants} initial="hidden" animate="visible" />
}
```

**Rule:** When reduced motion is preferred, keep duration animations that communicate state (opacity transitions for show/hide) but remove transform animations that create movement (translate, scale, rotate).

## Motion as State Communication

Motion is not decoration — every animation communicates information. This principle governs all Holocraft motion decisions:

### Opacity: Presence
Opacity changes communicate whether an element exists in the current context.
- `opacity 0`: element is absent, not relevant to the current state
- `opacity 0.5`: element exists but is not currently available (disabled)
- `opacity 1`: element is present and available

### Transform (translate): Position
Position changes communicate spatial relationships between states.
- Sliding in from right: new content, forward navigation
- Sliding in from left: previous content, back navigation
- Sliding up from bottom: contextual overlay (mobile sheet, menu)
- Sliding down from top: notification, global alert

### Transform (scale): Depth and Emphasis
Scale changes communicate proximity and importance.
- Scale down on press (0.97): physical feedback, element receding under finger
- Scale up on hover (1.02): element coming forward, inviting interaction
- Scale from 0.95 on enter: element emerging from behind the current layer

### Color Transition: State Change
Color transitions communicate changing state without positional movement.
- Border color changing to accent: field is now focused
- Background changing to accent: button is now primary/active
- Color changing to red: error or destructive state
- Color changing to green: success or positive state

### Stagger: Sequence and Hierarchy
Staggered animations communicate list structure and content hierarchy.
- List items entering with 40ms stagger: "this is a collection of items"
- Section blocks entering with 80ms stagger: "these are sequential sections"

```js
// Framer Motion stagger
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,    /* 40ms between each child */
      delayChildren: 0.1        /* 100ms before first child starts */
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  }
}
```

## Motion Anti-Patterns

These patterns make UIs feel low-quality and must never appear in Holocraft outputs:

- **Animations on every element on page load** — stagger only intentional list/sequence reveals, not every section
- **Bouncy overshoot on non-interactive content** — spring physics for interactive feedback, linear/ease for content transitions
- **Same duration for every animation** — match duration to element size (small = fast, large = slower)
- **`all` in transition property** — always specify exact properties (`transition: background-color 150ms ease`)
- **Animations that block interaction** — never disable pointer events during an animation
- **Looping animations in idle UI** — no spinning, pulsing, or bouncing elements unless indicating active loading
