# Awwwards AI Generation Prompts

These prompts are written for direct use by AI code-generation agents. Each prompt represents an Awwwards SOTD-class component: avant-garde, typographically bold, motion-first, and deliberately unconventional. The output should be production-ready Next.js + TypeScript + Tailwind CSS v4 + GSAP + Framer Motion.

**Pre-requisite installs:** `gsap`, `@gsap/react`, `@studio-freight/lenis`, `framer-motion`, `split-type` (open-source SplitText alternative).

---

## Hero / Landing Section — Full-Screen GSAP Scroll Narrative

**Style Reference:** Awwwards SOTD — Typographic-First Cinematic Hero

**Visual:**
- Full viewport height (`min-h-screen`), background `#0d0d0d`
- NO photography or 3D. Pure typography + color.
- Layout: centered, vertically middle-aligned content
- Section label (eyebrow): `14px` Inter 400, tracking `0.2em`, uppercase, color `rgba(255,255,255,0.4)`, appears above headline. Example: "Est. 2019 — Creative Studio"
- Headline: `clamp(64px, 14vw, 200px)`, font-weight 300 (starts thin, animates to 700 on scroll — requires variable font), `line-height: 0.90`, `letter-spacing: -0.05em`, color `#f0f0f0`. Two lines, each line wrapped in an `overflow: hidden` div for clip reveal.
- Line 2 of headline: slightly italic or uses an editorial serif (`Playfair Display` or `PP Editorial New`) to contrast the sans of line 1.
- Below headline: a single descriptor line — `16px`, `#555555`, tracking `0.08em` uppercase, indented `clamp(0px, 14vw, 200px)` from left to align with the start of the second character of the headline above
- CTA at bottom-left of viewport: `position: absolute; bottom: 40px; left: 40px`. Text "Explore ↓" in 12px, tracking `0.15em` uppercase, `#555555`. Has a 1px vertical line 40px tall above it.
- Year mark at bottom-right: `position: absolute; bottom: 40px; right: 40px`. Text "2025" in 12px, `#333333`

**Motion:**
- Page load sequence:
  - `t=0ms`: background color fills immediately (no fade)
  - `t=200ms`: eyebrow label slides up from `y: 30px` to `y: 0`, `opacity: 0 → 1`, duration `600ms`, ease `power3.out`
  - `t=400ms`: Line 1 of headline: each character reveals using clip — `y: 110% → 0%` within `overflow: hidden` wrapper, stagger `0.025s` between chars, duration `900ms`, ease `power3.out`
  - `t=700ms`: Line 2 of headline: same reveal, stagger `0.025s`
  - `t=1000ms`: descriptor line fades in, `opacity: 0 → 1`, `x: -10px → 0`, duration `500ms`
  - `t=1200ms`: CTA and year mark fade in, `opacity: 0 → 1`, duration `400ms`
- Scroll-linked (GSAP ScrollTrigger, `scrub: true`):
  - Font weight: `font-variation-settings: 'wght' 300 → 'wght' 700` as user scrolls `0 → 50vh`. Applies to whole headline.
  - Line 1 moves: `y: 0 → -80px` parallax as page scrolls
  - Line 2 moves: `y: 0 → -40px` (slower parallax, creates split)
  - Descriptor line: `opacity: 1 → 0` as user scrolls `0 → 30vh`
  - Background lightness: `#0d0d0d → #111111` (very subtle) over `0 → 100vh`

**Typography:**
- Variable font required: Inter variable (`font-weight: 100 900`) or load `inter-var.woff2`
- Line 1: Inter variable, weight starts `300`, letter-spacing `-0.05em`
- Line 2: Playfair Display or PP Editorial New (serif), weight `400` italic
- Sizes via `clamp(64px, 14vw, 200px)` on both lines, same size
- Eyebrow: Inter 400, 14px, tracking `0.2em`

**Color Context:**
- Background: `#0d0d0d`
- Headline: `#f0f0f0` (warm white)
- Descriptor: `#555555`
- Eyebrow: `rgba(255,255,255,0.4)`
- CTA / year: `#555555` default, `#888888` hover

**Instruction:** Generate a Hero section as a Next.js Client Component in TypeScript + Tailwind CSS v4. Use `split-type` (npm: `split-type`) to split the headline text into characters, then animate each character's Y position using GSAP for the entrance. Wrap each line in a `div` with `overflow: hidden` so characters slide up from below the container boundary. Use `gsap.registerPlugin(ScrollTrigger)` and a `ScrollTrigger` with `scrub: true` to link scroll position to font-variation-settings (update a CSS custom property `--headline-weight` on the headline element), Y parallax on each line, and opacity fade on the descriptor. The headline must use a variable font — include a `@font-face` declaration in the component or a note to add it to `globals.css`. The two headline lines should be in separate semantic elements but visually sized identically. Export as `AWWHeroSection`.

---

## Portfolio / Work Grid — Cursor-Following Image Reveal

**Style Reference:** Awwwards SOTD — Agency Portfolio List

**Visual:**
- Section background: `#0d0d0d`, full-width, min-height `100vh`
- Section heading: `clamp(48px, 8vw, 120px)`, weight 400, tracking `-0.03em`, color `#f0f0f0`, `line-height: 1.0`. Positioned top-left, `padding: 80px 40px 60px`
- Project list: vertical stack, full width. Each project row:
  - Container: `padding: 28px 40px`, `border-bottom: 1px solid rgba(255,255,255,0.06)`
  - Left: index number `01` style (12px, `#333333`, tracking `0.05em`, `width: 48px`), then project title `clamp(24px, 4vw, 56px)` weight 400, tracking `-0.02em`, color `#f0f0f0`
  - Right: category tag `12px uppercase tracking-[0.1em] #555555` + year `12px #333333`, flex-row gap `40px`
  - On hover: row background changes to `rgba(255,255,255,0.025)`, title color `#888888` (inverse — becomes dimmer to let the image take focus), an arrow `→` appears sliding in from left at `opacity: 0 → 1`
- Floating cursor image: `position: fixed`, `width: 320px`, `height: 220px`, `border-radius: 12px`, `overflow: hidden`, `pointer-events: none`, `z-index: 50`. Follows cursor with Framer Motion spring (`stiffness: 120, damping: 18`). `opacity: 0` when no row hovered, `opacity: 1` when hovered. Image crossfades between projects as user moves between rows.
- Bottom of section: small note — "Selected works 2022–2025" in 11px `#333333` tracking `0.1em` uppercase, `padding: 32px 40px`

**Motion:**
- Row entrance: `whileInView`, each row `opacity: 0 → 1, x: -20px → 0`, stagger `0.06s`, duration `500ms`, ease `power2.out`
- Row hover:
  - Background fill: `duration 300ms, ease: [0.25,0.46,0.45,0.94]`
  - Title dim: `color: #f0f0f0 → #888888, duration: 300ms`
  - Row slides right: `x: 0 → 8px, duration: 300ms, ease: [0.25,0.46,0.45,0.94]`
- Image follow: Framer Motion `useMotionValue` + `useSpring` for X and Y. Image `scale: 0.92 → 1.0` on hover entrance, `duration: 400ms`
- Image crossfade: when hovering row 2 after row 1, image for row 1 fades out `opacity: 1 → 0, duration: 200ms`, image for row 2 fades in `opacity: 0 → 1, duration: 200ms`

**Typography:**
- Section heading: Inter or Neue Haas Grotesk equivalent, 400, `clamp(48px, 8vw, 120px)`, tracking `-0.03em`
- Row title: same font, 400, `clamp(24px, 4vw, 56px)`, tracking `-0.02em`
- Index, category, year: Inter 400, 12px
- Bottom note: 11px uppercase

**Color Context:**
- Background: `#0d0d0d`
- Title: `#f0f0f0` → `#888888` on hover
- Index: `#333333`
- Divider: `rgba(255,255,255,0.06)`
- Row hover bg: `rgba(255,255,255,0.025)`
- Category/year: `#555555`

**Instruction:** Generate a Portfolio list component in Next.js TypeScript + Tailwind CSS v4 + Framer Motion. Accept props: `projects: Array<{ id: number; title: string; category: string; year: string; imageUrl: string; href: string }>`. Use `useMotionValue` and `useSpring` for the floating image position. The floating image element is rendered once outside the list, positioned `fixed`, and switches its displayed image based on `hoveredProjectId` state. Use `AnimatePresence` mode `wait` for the image crossfade. Each row is a `motion.div` with `whileInView` for entrance and `whileHover` for the slide-right effect. The `onMouseEnter` / `onMouseLeave` on each row controls `hoveredProjectId`. Export as `ProjectGrid`.

---

## Fullscreen Navigation Overlay

**Style Reference:** Awwwards SOTD — Full-Viewport Menu

**Visual:**
- Trigger: hamburger button, `position: fixed`, `top: 24px`, `right: 40px`, `z-index: 200`
  - Two lines: `width: 28px, height: 1px, background: white, gap: 7px`
  - Open state: lines rotate to X — line 1 `rotate: 45deg, translateY: 4px`, line 2 `rotate: -45deg, translateY: -4px`
- Overlay: `position: fixed, inset: 0, z-index: 150, background: #0d0d0d`
  - Entry animation: `clipPath: 'inset(0 0 100% 0)' → 'inset(0 0 0% 0)'`, duration `800ms`, ease `[0.76,0,0.24,1]`
  - Exit: `clipPath: 'inset(0 0 0% 0)' → 'inset(0 0 100% 0)'`
- Layout inside overlay:
  - Top row: logo (left) + close button (right)
  - Main nav links: vertically stacked, `padding: 0 40px`, positioned at `60%` vertical from top
    - Link font: `clamp(52px, 10vw, 120px)`, weight 300, tracking `-0.03em`, color `#f0f0f0`, `line-height: 1.0`
    - Link hover: `color: #888888`, a counter `01 / 02 ...` appears at end in 13px `#555555`
    - Links enter via `y: 110% → 0%` clip reveal (each in an `overflow: hidden` wrapper), stagger `0.08s`
  - Bottom row (absolute bottom): two columns — left has contact info (address/email in 12px `#555555`), right has social links in 12px `#555555` hover `#f0f0f0`, tracking `0.1em` uppercase

**Motion:**
- Hamburger lines animate simultaneously: `duration: 400ms, ease: [0.76,0,0.24,1]`
- Overlay clip-path: `duration: 800ms, ease: [0.76,0,0.24,1]`
- Nav links enter: `y: 110% → 0%` within `overflow: hidden` parent, stagger `0.07s`, duration `700ms`, ease `power3.out`. Delay starts `400ms` after overlay begins (halfway through overlay animation)
- Bottom row: `opacity: 0 → 1`, delay `700ms`, duration `400ms`
- Exit: overlay animates `clipPath` closed (800ms), links animate back `y: 0% → -110%` first (300ms), then overlay closes
- Link hover: `color` transition `300ms`, counter text slides in `x: 10px → 0, opacity: 0 → 1, duration: 200ms`

**Typography:**
- Nav links: Inter 300 or Neue Haas Grotesk 300, `clamp(52px, 10vw, 120px)`, tracking `-0.03em`
- Bottom info: Inter 400, 12px, tracking `0.08em`
- Social links: Inter 500, 11px, uppercase, tracking `0.12em`

**Color Context:**
- Overlay: `#0d0d0d`
- Links: `#f0f0f0` default, `#888888` hover
- Contact/social: `#555555` default, `#f0f0f0` hover
- Counter: `#555555`

**Instruction:** Generate a fullscreen navigation overlay component in Next.js TypeScript + Tailwind CSS v4 + Framer Motion. Use `AnimatePresence` for mount/unmount. The overlay uses Framer Motion `clipPath` animation for the wipe reveal. Nav links animate via the `y: 110%` technique — each link is wrapped in a `div` with `overflow: hidden` and the `motion.a` inside animates vertically. Use `variants` with `staggerChildren: 0.07` and `delayChildren: 0.4` for the link stagger. Accept props: `links: Array<{ label: string; href: string; index: string }>`, `contactInfo: { address: string; email: string }`, `socialLinks: Array<{ label: string; href: string }>`. Export as `FullscreenNav`.

---

## Page Transition Component

**Style Reference:** Awwwards SOTD — Curtain Wipe Transition

**Visual:**
- A `position: fixed, inset: 0, z-index: 9000` overlay element
- Background: solid color `#0d0d0d` (or customizable via prop `curtainColor`)
- Enters from bottom (`scaleY: 0, origin: bottom → scaleY: 1`) to cover page, then exits upward (`scaleY: 1, origin: top → scaleY: 0`) to reveal new page
- The page name or logo can optionally appear centered in the curtain during the overlap: text `clamp(32px, 6vw, 80px)` weight 700 white, with `opacity: 0 → 1 → 0` across the full transition
- No scrollbar visible during transition

**Motion:**
- Trigger: fires on route change (Next.js App Router `usePathname` change detection)
- Phase 1 — Cover: `scaleY: 0 → 1`, `transformOrigin: 'bottom center'`, duration `600ms`, ease `[0.76,0,0.24,1]`
- Center text: `opacity: 0 → 1` at `t=300ms` (halfway through cover), duration `200ms`
- Page swap: occurs at `t=700ms` (after curtain fully covers)
- Phase 2 — Reveal: `scaleY: 1 → 0`, `transformOrigin: 'top center'`, duration `700ms`, ease `[0.76,0,0.24,1]`, starts at `t=800ms`
- Center text: `opacity: 1 → 0`, duration `200ms` at start of reveal phase
- Total transition: ~1500ms

**Timing Values (Exact):**
```
0ms     → curtain cover begins (scaleY 0→1, 600ms)
300ms   → label fades in (opacity 0→1, 200ms)
600ms   → curtain fully covers page
700ms   → router.push fires OR new page renders
800ms   → curtain reveal begins (scaleY 1→0, 700ms)
800ms   → label fades out (opacity 1→0, 200ms)
1500ms  → transition complete
```

**Color Context:**
- Curtain: `#0d0d0d` (near-black)
- Center text: `#ffffff`

**Instruction:** Generate a page transition system for Next.js App Router in TypeScript + Framer Motion. Create two components: (1) `PageTransitionProvider` — a client component that wraps the layout, watches `usePathname()`, and renders the curtain overlay using `AnimatePresence`. (2) `PageTransitionLink` — a wrapper around Next.js `<Link>` that delays navigation by 700ms to allow the cover animation to complete before the route changes. Use Framer Motion `motion.div` with `scaleY` keyframes for the curtain. The curtain `transformOrigin` must be `'bottom center'` for entry and switch to `'top center'` for exit — use separate `initial/animate/exit` states or GSAP for precise `transformOrigin` switching. If using Framer Motion, animate `scaleY` with a keyframes array `[0, 1, 1, 0]` and `times: [0, 0.4, 0.53, 1]` to represent the pause. Export both components.

---

## Custom Cursor Component

**Style Reference:** Awwwards SOTD — Blend-Mode Inversion Cursor

**Visual:**
- Default state: `width: 12px, height: 12px`, circular, `background: #ffffff`, `mix-blend-mode: difference`
- The `mix-blend-mode: difference` with white background creates an inversion effect — white text inverts to black, black bg inverts to white. No color needed other than white.
- Hover state (on links, buttons, `[data-cursor]` elements): `width: 64px, height: 64px`
- Hover with label (on `[data-cursor-label]` elements): `width: 80px, height: 80px`, label text appears centered inside cursor in `10px Inter 500 uppercase tracking-[0.1em]`. Text color: `black` (because of blend mode inversion, this appears as the complement)
- Click state: `width: 8px, height: 8px` on `mousedown`
- Hidden state: `opacity: 0` when cursor leaves window
- The cursor dot sits on top (`z-index: 99999`), positioned via `transform: translate(x, y) translate(-50%, -50%)`

**Motion:**
- Position: raw mouse coordinates applied each frame via `requestAnimationFrame`. No lerp on the dot itself — it tracks exactly.
- Size transition: CSS `transition: width 350ms cubic-bezier(0.25,0.46,0.45,0.94), height 350ms cubic-bezier(0.25,0.46,0.45,0.94)`
- Label fade: `opacity: 0 → 1, duration: 200ms` on hover state with label
- On `mousedown`: instant width/height 8px, on `mouseup`: returns to previous state
- On `window.blur` / cursor leaving window: `opacity: 0, duration: 300ms`

**Behavior:**
- `cursor: none` applied globally via CSS
- Detects interactive elements via: `document.querySelectorAll('a, button, [role="button"], [data-cursor]')`
- Label data: `el.dataset.cursorLabel` — if exists and truthy, shows label text in hover state
- Magnetic elements: elements with `[data-magnetic]` attribute cause the cursor to be pushed toward the element center by 30% of the offset distance (magnetic pull). Apply via `mousemove` event on those elements.

**Implementation Notes:**
- Must be rendered outside the React component tree that might remount (use in root layout)
- Use `useEffect` with cleanup for all event listeners
- `pointer-events: none` on the cursor element always
- Suppress default cursor with `:global(*) { cursor: none !important }` in a CSS module

**Color Context:**
- Cursor fill: `#ffffff` always
- `mix-blend-mode: difference` handles all visual variation
- Label text: `#000000` (inverted by blend mode to complement)

**Instruction:** Generate a `CustomCursor` component in Next.js TypeScript + Tailwind CSS v4. This is a Client Component. The cursor element is a single `div` absolutely positioned and transformed via direct DOM manipulation in a `requestAnimationFrame` loop (not React state — for performance). Use `useRef` for the cursor element reference. Size changes (hover vs default vs click) are handled by toggling CSS classes that change `width` and `height`, with CSS transitions handling the animation. Include global style injection to set `cursor: none` on all elements — use a `<style>` tag or a CSS module. Handle three cursor states: `default` (12px), `hover` (64px), `hover-label` (80px with centered text). For the magnetic effect, add a `mousemove` listener on each `[data-magnetic]` element that uses GSAP to offset the element position toward the cursor, and resets on `mouseleave` with `elastic.out`. Export as `CustomCursor`. Include usage documentation in a comment at the top of the file.
