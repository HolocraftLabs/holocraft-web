# Behance — Motion

## Motion Personality

**Refined, subtle, editorial.** Behance's motion language is defined more by what it does not do than what it does. The absence of animation is a deliberate design choice: visual noise competes with the work on display.

The principle: **motion should serve navigation and image loading clarity — nothing else.** When you view a great design project on Behance, you should remember the design, not the transitions.

This is a critical reference point for Holocraft: not every generated site should be animated. Agency portfolio sites, design studio showcases, and creative director personal brands all benefit from Behance's motion restraint. Over-animation in a portfolio context is the typographic equivalent of using Comic Sans — it signals a lack of taste.

## Platform-Level Motion

### Scroll Behavior
- **Native browser scroll** — no JavaScript smooth scroll override
- No Lenis, no Locomotive, no virtual scroll
- Reason: the work on Behance spans many devices; custom scroll adds complexity without benefit
- **Scroll rate**: standard operating system acceleration curves

### Page Navigation
- Standard browser navigation — full page reload
- No page transitions, no exit animations, no enter animations
- This is intentional: the abruptness of page loads creates a clean slate for the next project
- **No AJAX navigation**: each project page is a standalone URL

### Image Loading
The most significant motion on the platform: image fade-in as content loads.

```css
/* Progressive image reveal */
.project-image {
  opacity: 0;
  transition: opacity 0.4s ease;
}

.project-image.loaded {
  opacity: 1;
}
```

```javascript
// Set 'loaded' class when image completes loading
const images = document.querySelectorAll('.project-image');
images.forEach(img => {
  if (img.complete) {
    img.classList.add('loaded');
  } else {
    img.addEventListener('load', () => img.classList.add('loaded'));
  }
});
```

Duration: `400ms`, easing: `ease` — no slide, no scale, purely opacity. The image simply appears.

Why: fade-in without movement prevents layout jank. The image occupies its reserved space from the start (set via `aspect-ratio` or explicit `height`); only opacity changes.

## Project Card Hover States

In the project feed grid, each card has a hover state that reveals metadata overlaid on the thumbnail:

```css
.project-card {
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

/* The thumbnail image */
.project-card img {
  width: 100%;
  height: auto;
  display: block;
  transform: scale(1.0);
  transition: transform 0.4s ease;
}

.project-card:hover img {
  transform: scale(1.02);    /* extremely subtle scale — 1.02, not 1.05 or 1.1 */
}

/* Overlay that appears on hover */
.project-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0.3) 40%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 16px;
}

.project-card:hover .project-card-overlay {
  opacity: 1;
}

/* Text inside overlay */
.project-card-overlay-title {
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  transform: translateY(8px);
  transition: transform 0.3s ease;
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.project-card-overlay-category {
  color: rgba(255, 255, 255, 0.75);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transform: translateY(8px);
  transition: transform 0.3s ease 0.05s, opacity 0.3s ease 0.05s;
  opacity: 0;
}

.project-card:hover .project-card-overlay-title,
.project-card:hover .project-card-overlay-category {
  transform: translateY(0);
  opacity: 1;
}
```

Key observations:
- Image scale is `1.02` — barely perceptible as scale, reads as "focus"
- Overlay gradient is bottom-to-top: dark at bottom (where text is), transparent at top (where image content is)
- Text slides up 8px into position — `translateY(8px → 0)`, not dramatic
- Text has staggered delay: title first, then category (50ms later)

## Lightbox / Full-Screen Image Viewer

When a user clicks to expand an image, Behance uses a zoom-from-position technique:

```javascript
// Conceptual implementation (Behance uses custom code)
// The image appears to grow from its thumbnail position to fill the screen

// 1. Get the thumbnail's bounding rect
const rect = thumbnail.getBoundingClientRect();

// 2. Create the expanded view
// 3. Animate from (rect.left, rect.top, rect.width, rect.height)
//    to (0, 0, window.innerWidth, window.innerHeight)

// CSS transition approach:
.lightbox-image {
  position: fixed;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
```

The motion: smooth zoom from thumbnail to full-screen in `350ms`, cubic-bezier easing (Material Design's standard easing: `cubic-bezier(0.4, 0, 0.2, 1)`).

Close: reverse zoom back to thumbnail position, or opacity fade-out.

Navigation between images in the lightbox: `slide` direction matching the navigation direction (next = slide left, previous = slide right), `300ms`.

## Appreciation Button Animation

The "Appreciate" (heart/applause) button has a satisfying micro-animation on click:

```css
/* Conceptual — Behance uses custom React/JS */
.appreciate-btn {
  transition: transform 0.15s ease;
}

.appreciate-btn:active {
  transform: scale(0.85);
}

/* After click — icon fill animation */
.appreciate-btn.appreciated .icon {
  animation: appreciatePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  /* spring: overshoot to 1.3x, settle at 1.0x */
}

@keyframes appreciatePop {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.3); }
  100% { transform: scale(1); }
}
```

The spring overshoot (`cubic-bezier(0.34, 1.56, 0.64, 1)`) creates a "pop" feeling that makes the action feel satisfying and confirmed.

## Follow Button States

```css
.follow-btn {
  transition: background-color 0.2s ease, color 0.2s ease;
}

/* Hover on "Follow" state */
.follow-btn:hover {
  background-color: #0d56d1;   /* slightly darker Behance blue */
}

/* "Following" state — already followed */
.follow-btn.following {
  background-color: transparent;
  border: 1px solid #9c9c9c;
  color: #5e5e5e;
}

/* Hover on "Following" state — changes to "Unfollow" text */
.follow-btn.following:hover {
  border-color: #e84c3d;
  color: #e84c3d;
  /* No animation — just color change, 0.2s ease */
}
```

## What Behance's Motion Restraint Teaches Holocraft

### When NOT to Animate
Portfolio and agency sites should apply the Behance restraint principle selectively:
- **Do not** animate individual images as they load on a portfolio page (use the simple opacity fade at most)
- **Do not** add scroll-linked parallax to portfolio images — it distorts the work
- **Do not** use entrance animations on case study body text — it feels distracting, not premium
- **Do** animate the project grid cards on initial load (stagger, once)
- **Do** animate page transitions between projects (but subtly — cross-fade, not slide)

### Appropriate Animation for Portfolio Sites with Holocraft's System
When Holocraft generates a portfolio/agency site, apply Behance's restraint plus Framer Motion's quality:

```tsx
// Project grid entrance — Framer Motion
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

// Case study body text — NO animation. Just renders.
// Hero image — simple opacity: 0 → 1 on mount (400ms)
// Full-bleed images — NO animation. Instant render.
```

### The Restraint Principle in Practice
For every animation decision on a portfolio/agency site, ask:
1. Does this animation help the viewer understand the content?
2. Does it make the navigation clearer?
3. Does it confirm an interaction?

If the answer to all three is no, remove the animation. The work is the spectacle.
