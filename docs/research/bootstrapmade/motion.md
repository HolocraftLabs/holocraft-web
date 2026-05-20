# BootstrapMade — Motion

## Motion Personality

**Subtle, professional, unobtrusive.** BootstrapMade motion exists to signal interactivity and guide attention — never to entertain. Every animation has a functional rationale: confirm a click, reveal content progressively, indicate loading state.

The principle: **motion should be noticed subconsciously, not consciously**. If a user says "that animation was cool," it's probably too much for a business site.

## Scroll Reveal Animations

### Library: AOS (Animate On Scroll)
The dominant animation library used across BootstrapMade templates. CDN-loaded via:
```html
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<script>AOS.init();</script>
```

### Standard AOS Configuration
```javascript
AOS.init({
  duration: 600,          // animation duration in ms
  easing: 'ease-in-out',  // easing function
  once: true,             // animate only on first scroll into view
  mirror: false,          // do NOT animate out when scrolling past
  offset: 100,            // trigger 100px before element enters viewport
});
```

### Common AOS Attribute Patterns
```html
<!-- Single card entrance -->
<div data-aos="fade-up" data-aos-delay="0">Card 1</div>
<div data-aos="fade-up" data-aos-delay="100">Card 2</div>
<div data-aos="fade-up" data-aos-delay="200">Card 3</div>

<!-- Section heading entrance -->
<div data-aos="fade-up" data-aos-duration="500">
  <h2>Section Title</h2>
</div>

<!-- Left/right split sections -->
<div data-aos="fade-right">Image panel</div>
<div data-aos="fade-left">Text panel</div>

<!-- Stats section numbers -->
<div data-aos="zoom-in" data-aos-delay="0">Stat 1</div>
<div data-aos="zoom-in" data-aos-delay="150">Stat 2</div>
<div data-aos="zoom-in" data-aos-delay="300">Stat 3</div>
```

### Animation Types Used
- `fade-up` — most common, elements rise 30px as they fade in. Used for cards, headings, paragraphs.
- `fade-in` — pure opacity, no movement. Used for hero overlays, images.
- `fade-left` / `fade-right` — used in split-panel sections.
- `zoom-in` — scale 0.8 → 1.0. Used for stats, testimonials, CTAs.
- `flip-left` / `flip-right` — card flip effect. Used sparingly, usually for feature cards.

### NOT Used
- `fade-down` — rare, unnatural for below-fold reveal
- Complex keyframe sequences
- Physics-based springs
- Scroll-linked (scrubbing) animations

## Timing and Duration

### Animation Duration Standards
- **Fast (UI feedback)**: 200–300ms — hover state color transitions, active states
- **Standard (scroll reveal)**: 400–600ms — AOS scroll animations, modal appear
- **Slow (hero intro)**: 800–1000ms — hero text entrance, page-load animations (rare)

```css
/* Standard transitions applied globally */
a {
  transition: color 0.3s ease;
}

.btn {
  transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.2s ease;
}

.card {
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

img {
  transition: transform 0.3s ease; /* for hover zoom effects */
}
```

### Easing Functions
- `ease` or `ease-in-out` — default for all transitions. Smooth start and end.
- `ease-out` — used for enter animations (elements decelerating as they arrive)
- **No custom cubic-bezier** in standard BootstrapMade templates — kept simple

## Hover Animations

### Buttons
```css
.btn-primary:hover {
  background-color: #2980b9;        /* primary color darkened 10% */
  border-color: #2980b9;
  transform: translateY(-2px);      /* subtle lift — not universal, ~50% of templates */
  transition: all 0.3s ease;
}

.btn-outline-primary:hover {
  background-color: #3498db;
  color: #ffffff;
  transform: translateY(-2px);
}
```

### Cards
```css
.service-card:hover {
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);   /* deepens from default 0 2px 15px */
  transform: translateY(-5px);                    /* card lifts 5px */
  transition: all 0.3s ease;
}

.service-card .icon {
  transition: transform 0.3s ease;
}

.service-card:hover .icon {
  transform: scale(1.1);             /* icon slightly grows on card hover */
}
```

### Navigation Links
```css
.nav-link {
  color: #212529;
  transition: color 0.3s ease;
  position: relative;
}

/* Underline slide-in variant (more modern templates) */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #3498db;
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}
```

### Portfolio/Gallery Items
```css
.portfolio-item:hover img {
  transform: scale(1.05);
  transition: transform 0.4s ease;
}

.portfolio-item .overlay {
  opacity: 0;
  transition: opacity 0.3s ease;
  background: rgba(33, 37, 41, 0.8);
}

.portfolio-item:hover .overlay {
  opacity: 1;
}
```

## Counter Animations (Stats Sections)

JavaScript-driven number count-up when the stats section scrolls into viewport. Standard implementation uses a simple IntersectionObserver or jQuery `waypoints` plugin.

```javascript
// Standard counter animation pattern
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    element.textContent = Math.floor(current).toLocaleString();
    if (current >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    }
  }, 16);
}

// Trigger when section enters viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.counter').forEach(counter => {
        const target = parseInt(counter.dataset.target);
        animateCounter(counter, target);
      });
    }
  });
}, { threshold: 0.3 });
```

Duration: 1500–2000ms for the count-up. Easing: linear or ease-out.

## Navbar Scroll Behavior

```javascript
// Transparent to solid navbar on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});
```

```css
.navbar {
  background-color: transparent;
  transition: background-color 0.4s ease, box-shadow 0.4s ease;
}

.navbar.scrolled {
  background-color: #ffffff;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}
```

## What BootstrapMade Does NOT Use

- **Custom smooth scroll** (Lenis, Locomotive, virtual scroll) — native browser scroll only
- **GSAP** — not present, no timeline animations
- **Custom cursor** — standard OS cursor
- **Page transitions** — none, hard browser navigation
- **Parallax** (mostly) — occasional `background-attachment: fixed` for hero images, but not JS parallax
- **Magnetic buttons** — not present
- **WebGL / Canvas** — not present
- **Scroll-linked animations** (scrubbing) — not present

## Holocraft Motion Upgrade Strategy

When adapting BootstrapMade structure into Holocraft's motion system:

1. **Replace AOS with Framer Motion** — use `motion.div` with `viewport={{ once: true }}` for scroll reveals. Use staggered `variants` for card grids.
2. **Increase animation specificity** — instead of generic `fade-up` on everything, use directional logic: cards enter from below, left/right panels enter from their respective sides, hero content enters from center.
3. **Add Lenis smooth scroll** — the single highest-impact motion upgrade from BootstrapMade baseline.
4. **Keep counter animations** — they work. Implement with Framer Motion's `useMotionValue` + `useTransform`, or `react-countup` with IntersectionObserver.
5. **Preserve duration discipline** — 400–600ms for scroll reveals, 200–300ms for hover states. BootstrapMade's timing instincts are correct even if the implementation is basic.
