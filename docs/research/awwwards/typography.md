# Awwwards Typography System

## The Core Principle: Size as the Only Hierarchy

Awwwards SOTD typography operates on a single principle: contrast through scale, not weight or color. A site might have a 160px headline and 14px body text with nothing in between. This extreme contrast is the defining typographic move of award-winning sites.

Weight variation is secondary. Color variation is tertiary. SIZE is the primary differentiator.

## Font Selection

### Serif Display (Dominant, 2022–2025)

SOTD winners increasingly use editorial serif fonts for display. These fonts communicate: editorial craft, luxury, considered thought, longevity.

| Font | Source | Character | Best For |
|------|--------|-----------|---------|
| **PP Editorial New** | Pangram Pangram | Sharp, contemporary, fashion | Agency, fashion, art |
| **Canela** | Commercial Type | Soft, luxury, organic | Fashion, lifestyle, luxury |
| **Freight Display** | GarageFonts | Literary, authoritative | Editorial, journalism |
| **Cormorant Garamond** | Google Fonts | Refined, delicate at display | Luxury, portfolio |
| **Playfair Display** | Google Fonts | Elegant, classic | Accessible luxury |
| **Cardinal Fruit** | OH no Type | Quirky editorial | Experimental, art |

### Geometric Sans Display

| Font | Source | Character | Best For |
|------|--------|-----------|---------|
| **Neue Haas Grotesk** | Monotype | Clean authority, Swiss | Agency, tech |
| **ABC Diatype** | ABC Dinamo | Technical, precise | Developer tools, tech |
| **Syne** | Google Fonts | Geometric, futuristic | Creative tech, portfolio |
| **Space Grotesk** | Google Fonts | Techy, warm | SaaS, startup |

### Body Text
Almost always a neutral, highly legible sans:
- **Inter** — universal default
- **DM Sans** — slightly warmer than Inter
- Matching the display font at small sizes (14–16px)

## Type Scale

### The Extreme Scale
The hallmark of Awwwards typography. Not a gentle 1.25x or 1.333x scale — a dramatic jump.

```css
/* SOTD-class type scale */
--type-display: clamp(64px, 14vw, 200px);  /* Hero headline */
--type-display-sm: clamp(48px, 10vw, 140px); /* Secondary display */
--type-heading: clamp(28px, 4vw, 56px);    /* Section headings */
--type-body: 14px;                          /* Body — always small */
--type-label: 11px;                         /* Labels — always small */
```

Note the gap: there is no 22–45px range in this scale. Items are either large or small.

### Fluid Sizing Implementation
```css
/* True fluid type — no breakpoint jumps */
.display-headline {
  font-size: clamp(64px, 12vw, 180px);
  line-height: 0.92;
  letter-spacing: -0.04em;
}

/* The "only two sizes" rule in practice */
.section-body {
  font-size: clamp(13px, 1.2vw, 16px);
  line-height: 1.8;
}
```

### Viewport-Width Typography
Some SOTD winners size headlines purely in viewport units — no clamp:

```css
/* Headline that fills the viewport exactly */
.vw-headline {
  font-size: 18vw;
  line-height: 0.9;
  letter-spacing: -0.05em;
  white-space: nowrap;
  overflow: hidden;
}
```

This creates a headline that is always exactly full-width regardless of viewport size.

## Tracking (Letter Spacing)

The tracking rules for Awwwards are more extreme than MDX:

| Size | Tracking | Notes |
|------|---------|-------|
| Display >100px | `-0.05em` to `-0.07em` | Very tight — letters almost touching |
| Display 60–100px | `-0.03em` to `-0.05em` | Tight |
| Heading 30–60px | `-0.02em` to `-0.03em` | Moderate tight |
| Body 14–18px | `0em` | Neutral — don't touch body tracking |
| Label/caption 10–13px | `+0.12em` to `+0.20em` | Open for legibility |

## Line Height

| Usage | Line Height | Notes |
|-------|------------|-------|
| Display stacked | `0.88–0.95` | Lines overlap slightly — overlapping descenders is intentional |
| Display comfortable | `1.0` | Lines just touching |
| Large heading | `1.05–1.1` | Slightly open |
| Body | `1.75–1.9` | Very open — small text needs air |
| Caption | `1.5` | |

## Typographic Hierarchy Examples

### Pattern A: Typographic-First Hero (No Images)
```
60px serif italic label    ← "Since 2019"
180px sans headline        ← "STUDIO"
14px body, centered        ← "We build digital experiences that..."
```

### Pattern B: Split Layout
```
Left column: 120px display headline, stacked 2–3 lines
Right column: 14px body + small CTA, aligned to bottom of headline
```

### Pattern C: Overlapping Type
```
Full-bleed 200px headline, line 1
Subheadline overlapping into headline at -40px margin-top
14px body below, indented 50%
```

## Variable Font Animations

SOTD winners use variable font axes (weight, width, optical size) animated with GSAP:

### Weight Morph on Scroll
```js
// GSAP ScrollTrigger animating font weight variable
gsap.to('.hero-headline', {
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  },
  fontVariationSettings: '"wght" 900', // from 100 (set in CSS) to 900
});
```

```css
.hero-headline {
  font-variation-settings: 'wght' 100; /* Starts ultra-thin */
  /* Becomes bold (wght 900) as user scrolls */
}
```

### Hover Weight Change
```css
.nav-link {
  font-variation-settings: 'wght' 400;
  transition: font-variation-settings 200ms ease;
}
.nav-link:hover {
  font-variation-settings: 'wght' 700;
}
```

## Text Animation Techniques

### Character-by-Character Reveal (GSAP SplitText)
The signature entrance animation for SOTD headlines.

```js
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const split = new SplitText('.hero-headline', { type: 'chars' });

gsap.from(split.chars, {
  y: 100,
  opacity: 0,
  rotateX: -90,
  stagger: 0.03,
  duration: 0.8,
  ease: 'power4.out',
  delay: 0.2,
});
```

### Line-by-Line Reveal (Clip-Path Wipe)
Elegant and performant — text appears to slide out from behind a mask.

```js
// Split into lines first
const split = new SplitText('.hero-headline', { type: 'lines' });

// Wrap each line in a clipping container
split.lines.forEach(line => {
  const wrapper = document.createElement('div');
  wrapper.style.overflow = 'hidden';
  line.parentNode.insertBefore(wrapper, line);
  wrapper.appendChild(line);
});

// Animate from below the clip
gsap.from(split.lines, {
  y: '110%', // Start below overflow: hidden container
  opacity: 1, // No fade — pure positional reveal
  stagger: 0.12,
  duration: 1.0,
  ease: 'power3.out',
  delay: 0.3,
});
```

### Scramble Text Effect
Letters randomize then resolve to the correct text. Used for tech/glitch aesthetics.

```js
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
gsap.registerPlugin(ScrambleTextPlugin);

gsap.to('.headline', {
  duration: 1.5,
  scrambleText: {
    text: 'The future of design',
    chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    revealDelay: 0.5,
    speed: 0.4,
  }
});
```

## CSS Typography Specifics

### Inter via CSS Import
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
```

### Optical Sizing
```css
/* Enable optical sizing for better rendering at small/large sizes */
.display-text {
  font-optical-sizing: auto;
}
```

### Preventing Text Layout Shift
```css
/* Reserve space for custom fonts */
@font-face {
  font-family: 'Display';
  src: url('/fonts/display.woff2') format('woff2');
  font-display: block; /* Block until loaded — prevents flash */
  size-adjust: 100%; /* Prevent layout shift */
}
```

### Balancing Long Headlines
```css
.headline {
  text-wrap: balance; /* Modern CSS — distribute line lengths evenly */
  /* Fallback: max-width: 20ch for manual control */
}
```
