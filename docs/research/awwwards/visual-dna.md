# Awwwards Visual DNA

## Color System

Unlike MDX which has a consistent dark palette, Awwwards SOTD winners cluster into two extreme poles — they almost never occupy the middle.

### Dark Pole
Used by: agency sites, luxury brands, experimental art pieces

| Role | Hex | Notes |
|------|-----|-------|
| Background | `#0d0d0d` | Near-black with warm bias (not blue-black like MDX) |
| Background deep | `#080808` | Behind overlapping elements |
| Background alt | `#111111` | Alternate section color for breathing room |
| Primary text | `#f0f0f0` | Warm white, not pure `#ffffff` |
| Secondary text | `#888888` | True mid-grey for captions |
| Accent | Context-specific | No consistent accent — each site defines its own |

### Light Pole
Used by: editorial sites, luxury fashion, architecture, cultural institutions

| Role | Hex | Notes |
|------|-----|-------|
| Background | `#fafafa` | Off-white, warmer than pure white |
| Background paper | `#f5f5f2` | Slightly warm tint, paper-like |
| Background cream | `#f0ede8` | Warm cream for premium/luxury signal |
| Primary text | `#0d0d0d` | Match dark background as text color |
| Secondary text | `#555555` | Mid-grey |
| Accent | `#1a1a1a` / context | Bold dark, or single bright accent |

### Color Behavior Patterns

**High contrast is non-negotiable.** SOTD winners always push toward maximum contrast ratios. Mid-grey backgrounds are almost never seen — they read as "unfinished" to the jury.

**Single accent color per site.** Unlike MDX which can have blue + violet + cyan, Awwwards winners typically commit to one chromatic accent and use it sparingly. The accent is often unusual — ochre, forest green, dusty rose, electric orange, acid yellow.

**Color as section identity.** Full-bleed color blocks mark transitions between sections. Instead of white dividers, a section might have a completely different background color — black to cream to black — creating rhythm through color.

**No gradients as decoration.** Gradient backgrounds signal immaturity on SOTD winners. Gradients appear only when they serve the visual concept — e.g., a site about light and optics uses prismatic gradients as thematic elements.

### Example Accent Palettes from SOTD-Class Work

```css
/* Agency dark */
--bg: #0d0d0d;
--fg: #f0f0f0;
--accent: #e8ff00; /* acid yellow */

/* Luxury light */
--bg: #f5f5f2;
--fg: #0d0d0d;
--accent: #c9a96e; /* warm gold */

/* Art/culture */
--bg: #ffffff;
--fg: #000000;
--accent: #ff3300; /* pure red-orange */

/* Premium tech dark */
--bg: #0a0a0a;
--fg: #ffffff;
--accent: #00ff94; /* acid green */
```

## Typography

### Oversized Display Type — The SOTD Signature
The single most consistent visual trait of Awwwards winners is display type that fills or exceeds the viewport width.

**Scale:**
- Fluid headline: `clamp(48px, 12vw, 180px)` — scales between 48px and 180px based on viewport
- Extreme: `clamp(80px, 18vw, 260px)` — for typographic-first hero sections
- Standard large: `clamp(40px, 8vw, 120px)` — for section headings

**Implementation:**
```css
.hero-headline {
  font-size: clamp(48px, 12vw, 180px);
  line-height: 0.92; /* Tight — lines nearly touching */
  letter-spacing: -0.04em;
  font-weight: 400; /* Often light/regular — size does the work */
}
```

### Serif vs Sans

Recent SOTD trend (2022–2025) skews heavily toward serif for display:
- **Freight Display** — editorial, literary
- **Canela** — luxury fashion, premium lifestyle
- **Editorial New** — contemporary fashion, art spaces
- **PP Editorial New** (Pangram Pangram) — widely used
- **Playfair Display** — accessible Google Fonts alternative
- **Cormorant Garamond** — elegant, refined

Sans-serif for display:
- **Neue Haas Grotesk** — modernist, neutral authority
- **ABC Diatype** — technical, systematic
- **Inter** — developer tools (overlaps with MDX)

### Body Type
Small relative to display. This contrast is intentional — the hierarchy is SIZE-based, not weight-based.

```css
.body-text {
  font-size: 14px; /* Sometimes as small as 13px */
  line-height: 1.8;
  letter-spacing: 0.01em;
  font-weight: 400;
  color: #888888; /* On dark */
}
```

### Typographic Hierarchy Pattern
The Awwwards approach uses only 2 sizes:
1. **Enormous** — the headline (15–25vw)
2. **Tiny** — everything else (13–16px)

There is rarely a mid-sized heading. The absence of a midsize heading creates dramatic visual contrast.

### Label/Caption Type
```css
.label {
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-weight: 500;
  opacity: 0.5;
}
```

### Tracking Rules
| Size | Tracking |
|------|---------|
| Display (>80px) | `-0.03em` to `-0.06em` — tighter the larger |
| Heading (40–80px) | `-0.02em` to `-0.03em` |
| Body (14–18px) | `0em` to `+0.01em` — neutral |
| Small caps / labels (11–13px) | `+0.10em` to `+0.20em` — open |

### Variable Font Animation
SOTD winners increasingly animate font weight on scroll:

```css
@font-face {
  font-family: 'CustomVar';
  src: url('/fonts/custom-variable.woff2') format('woff2-variations');
  font-weight: 100 900;
}

.animated-headline {
  font-variation-settings: 'wght' var(--font-weight, 100);
  /* GSAP controls --font-weight via ScrollTrigger from 100 to 900 */
}
```

## Grid

### Convention-Breaking as Style
SOTD sites do not use 12-column grids consistently. They use them as a starting point, then deliberately violate them.

**Common grid violations:**
- Headlines that extend 110–120% of container width (overflow visible)
- Elements absolutely positioned outside the grid column
- 60/40 asymmetric column splits instead of equal halves
- Staggered row starts (second item starts 200px lower than first)
- Full-bleed elements (100vw) mixed with contained elements

**Intentional Asymmetry:**
```css
.project-grid {
  display: grid;
  grid-template-columns: 3fr 2fr; /* 60/40 split */
  gap: 0; /* No gap — direct adjacency */
}

/* Item 2 pushed down to create offset */
.project-grid > :nth-child(2) {
  margin-top: 120px;
}
```

### Full-Bleed Sections
Section backgrounds extend to viewport edge. Content inside may or may not be contained.

```css
.full-bleed-section {
  width: 100vw;
  margin-left: calc(-50vw + 50%); /* Escape container */
  padding: 160px 80px;
}
```

## Density

**One focal element per screen.** When the user arrives at a new scroll position, they should see one primary thing. Everything else is secondary or absent.

**Generous negative space.** 50% or more of the viewport can be empty. This is not wasted space — it is compositional breathing room that gives the focal element authority.

**Section transitions as design moments.** Between sections, there is no filler. The transition itself — a color shift, a curtain wipe, a pinned element releasing — is the design moment.

## Surface and Imagery

### Photography vs No Photography
Awwwards splits sharply:
- **Cinematic photography** — full-bleed, art-directed, often black and white or heavily color-graded. Never stock photography.
- **Zero photography** — pure typographic layouts, color blocking, geometric forms. Common in agency self-sites and art projects.

Never use: lifestyle photography, product-in-hand shots, office environments, smiling people at computers.

### WebGL Backgrounds
Present in roughly 60% of SOTD winners. Always custom — never a Three.js template. Common approaches:
- Custom GLSL shaders (fluid simulation, light rays, morphing geometry)
- Three.js with custom post-processing (bloom, chromatic aberration, film grain)
- Paper.js or p5.js for 2D canvas work
- PIXI.js for GPU-accelerated 2D

### Full-Bleed Color Blocking
Color is used architecturally — entire sections change background color to mark transitions:

```html
<section style="background: #0d0d0d; color: #f0f0f0;">...</section>
<section style="background: #f5f5f2; color: #0d0d0d;">...</section>
<section style="background: #e8ff00; color: #0d0d0d;">...</section>
```

This creates visual rhythm without any decorative elements.
