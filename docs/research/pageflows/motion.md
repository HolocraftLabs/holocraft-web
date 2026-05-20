# Pageflows: Motion

## Motion Philosophy in Flows

Motion in user flows serves a single master: conversion. Every animation either:
1. Communicates state (loading, success, error)
2. Communicates direction (forward, backward, hierarchy)
3. Provides feedback (input registered, action confirmed)

Any animation that does none of these three should be removed. Flow motion is not branding;
it is information. The benchmark is: if the animation was removed, would the user be confused?
If yes, it communicates something essential. If no, it's decoration.

## Flow Transitions (Between Steps)

The standard transition between onboarding steps or form wizard screens:

### Forward Navigation (Progressing to Next Step)
- Transform: `translateX(0) → translateX(-100%)` for exiting screen
- Transform: `translateX(100%) → translateX(0)` for entering screen
- Duration: 300ms
- Easing: `ease-in-out` (or `cubic-bezier(0.4, 0, 0.2, 1)`)
- Both screens animate simultaneously (not sequential)

```css
/* Exiting screen */
.step-exit { transform: translateX(0); animation: slideOutLeft 300ms ease-in-out forwards; }
@keyframes slideOutLeft {
  to { transform: translateX(-100%); }
}

/* Entering screen */
.step-enter { transform: translateX(100%); animation: slideInFromRight 300ms ease-in-out forwards; }
@keyframes slideInFromRight {
  to { transform: translateX(0); }
}
```

### Back Navigation (Returning to Previous Step)
- Same motion, reversed axis:
- Exiting: `translateX(0) → translateX(100%)`
- Entering: `translateX(-100%) → translateX(0)`

This directional motion model is the same one used by iOS navigation (UINavigationController)
and is deeply familiar to mobile users. Never use slide-up/slide-down for lateral flow navigation.

### Framer Motion AnimatePresence Implementation
```tsx
const [[step, direction], setStep] = useState([0, 0]);

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 0 }),
};

<AnimatePresence custom={direction} mode="wait">
  <motion.div
    key={step}
    custom={direction}
    variants={variants}
    initial="enter"
    animate="center"
    exit="exit"
    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
  />
</AnimatePresence>
```

## Screen Entrance Animation

When a flow screen first appears (initial load, not a step transition):

- Opacity: `0 → 1`
- Transform: `translateY(10px) → translateY(0)`
- Duration: 250ms
- Easing: `ease-out` (`cubic-bezier(0, 0, 0.2, 1)`)
- Stagger: if multiple elements, stagger by 50ms each

The `translateY(10px)` offset is subtle — barely noticeable consciously, but it creates the
feeling that content "arrives" rather than simply appearing. Keep it under 16px; larger values
feel slow and heavy.

```tsx
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
/>

// Staggered children:
<motion.div
  variants={{
    hidden: {},
    show: { transition: { staggerChildren: 0.05 } }
  }}
  initial="hidden"
  animate="show"
>
  {items.map(item => (
    <motion.div
      key={item}
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0, 0, 0.2, 1] } }
      }}
    />
  ))}
</motion.div>
```

## Form Validation Shake

When a form submission attempt fails validation (user taps "Continue" with invalid/empty fields):

The entire form or the specific invalid field performs a horizontal shake:

- Shake sequence: `0px → 8px → -8px → 4px → -4px → 0px`
- Duration: 400ms total
- Easing: `ease-in-out` per keyframe segment
- Simultaneously: invalid fields turn red (border + label)

```css
@keyframes shake {
  0%   { transform: translateX(0); }
  15%  { transform: translateX(8px); }
  30%  { transform: translateX(-8px); }
  50%  { transform: translateX(6px); }
  65%  { transform: translateX(-4px); }
  80%  { transform: translateX(2px); }
  100% { transform: translateX(0); }
}

.field--error {
  animation: shake 400ms ease-in-out;
}
```

Framer Motion equivalent using the `animate` prop with keyframes:
```tsx
<motion.div
  animate={hasError ? { x: [0, 8, -8, 6, -4, 2, 0] } : {}}
  transition={{ duration: 0.4, ease: 'easeInOut' }}
/>
```

## Loading Button Animation

When a form submits or an async action starts, the button enters a loading state.

Critical constraint: **button dimensions must not change.** Width stays fixed. No layout shift.

- Text fades out: opacity `1 → 0`, duration 150ms
- Spinner fades in: opacity `0 → 1`, duration 150ms, delay 100ms (slight overlap)
- Spinner: 20px SVG, rotates continuously at 360deg/800ms linear
- Background color stays the same (do not gray out the button while loading — too alarming)
- `aria-busy="true"` is set on the button

```tsx
<motion.button disabled={isLoading} aria-busy={isLoading}>
  <motion.span
    animate={{ opacity: isLoading ? 0 : 1 }}
    transition={{ duration: 0.15 }}
    style={{ position: 'absolute' }}
  >
    {label}
  </motion.span>
  <motion.span
    animate={{ opacity: isLoading ? 1 : 0 }}
    transition={{ duration: 0.15, delay: 0.1 }}
  >
    <Spinner />
  </motion.span>
</motion.button>
```

## Success Moment Animation

When an action succeeds (form submitted, payment confirmed, verification complete):

### Icon Scale Pulse
- Checkmark or success icon scales: `0 → 1.2 → 1.0`
- Duration: 400ms
- Use spring physics for the bounce: `type: 'spring', stiffness: 400, damping: 20`
- Opacity: `0 → 1` simultaneously, duration 200ms

```tsx
<motion.div
  initial={{ scale: 0, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{
    scale: { type: 'spring', stiffness: 400, damping: 20 },
    opacity: { duration: 0.2 }
  }}
>
  <CheckCircleIcon />
</motion.div>
```

### Brief Background Color Flash (Field-Level Success)
- Field border transitions: default → green (`#10B981`) → default
- Duration: green state holds for 600ms, then fades back over 300ms
- Do NOT permanently show green on success — it competes with subsequent error states

## Progress Bar Fill Animation

When the user advances from one step to the next, the progress bar fill increases:

- Property: `width` (CSS) or `scaleX` on a transform-origin: left element
- Duration: 500ms
- Easing: `ease-in-out`
- Delay: 0ms (starts immediately when step changes)

```tsx
<div className="progress-track">
  <motion.div
    className="progress-fill"
    animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
    transition={{ duration: 0.5, ease: 'easeInOut' }}
  />
</div>
```

Using `scaleX` for GPU acceleration (better for long progress bars on low-end devices):
```tsx
<motion.div
  style={{ transformOrigin: 'left center', scaleX: 0 }}
  animate={{ scaleX: currentStep / totalSteps }}
  transition={{ duration: 0.5, ease: 'easeInOut' }}
/>
```

## Onboarding Card Swipe

Some onboarding flows use swipeable cards (Tinder-style or horizontal scroll snapping):

- Swipe gesture: follows finger/mouse position 1:1 during drag
- Release velocity detection: if `velocity.x > 500px/s`, complete the swipe to that direction
- If velocity insufficient, spring back to center
- Card rotation during drag: `rotate: dragX * 0.05` degrees (subtle tilt)

```tsx
<motion.div
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  dragElastic={0.3}
  onDragEnd={(event, info) => {
    if (Math.abs(info.velocity.x) > 500 || Math.abs(info.offset.x) > 150) {
      // advance or retreat based on direction
    }
  }}
  style={{ x: dragX, rotate: rotateValue }}
/>
```

## OTP Auto-Advance Animation

When an OTP digit is entered, focus moves to the next field automatically:

- No animation on the field itself — instant focus movement
- The newly-focused field: brief scale from `1.0 → 1.05 → 1.0`, 200ms spring, draws attention
- When all digits filled: slight delay (150ms) then submit or trigger verification check

```tsx
const handleOTPInput = (value: string, index: number) => {
  if (value.length === 1 && index < fields.length - 1) {
    refs[index + 1].current?.focus();
  }
};
```

## Prefers-Reduced-Motion Handling

All flow transitions should degrade gracefully:

```css
@media (prefers-reduced-motion: reduce) {
  /* Replace slides with instant opacity fades */
  .step-enter,
  .step-exit {
    transform: none !important;
    opacity: 0;
    animation: fadeOnly 0.15s ease forwards;
  }
  @keyframes fadeOnly {
    to { opacity: 1; }
  }
  /* Disable shake entirely — error states communicated by color alone */
  .field--error { animation: none !important; }
}
```

In React with Framer Motion:
```tsx
const shouldReduce = useReducedMotion();
const transitionVariants = shouldReduce
  ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }
  : fullSlideVariants;
```
