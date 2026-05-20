# MDX AI Generation Prompts

These prompts are written for direct use by AI code-generation agents. Each prompt specifies visual values, motion values, library usage, component structure, and a clear implementation instruction. The output should be production-ready Next.js + TypeScript + Tailwind CSS v4 + Framer Motion components.

---

## Hero Section

**Style Reference:** MDX Cinematic 3D

**Visual:**
- Full viewport height (`min-h-screen`), dark background `#0a0a0f`
- Radial gradient glow centered at 40% vertical: `radial-gradient(ellipse 80% 50% at 50% 40%, rgba(79,158,255,0.15) 0%, transparent 70%)`
- Three.js `<canvas>` positioned `fixed inset-0 z-0 pointer-events-none` — renders a TorusKnot geometry with `MeshPhysicalMaterial` (color `0x4f9eff`, metalness 0.9, roughness 0.1, emissive `0x4f9eff` at intensity 0.12)
- Section label above headline: 11px, uppercase, tracking `0.12em`, color `#4f9eff`, with a 16px horizontal rule preceding it
- Headline: `clamp(56px, 7vw, 88px)`, weight 800, `line-height: 1.0`, `letter-spacing: -0.04em`, color white. Last word wrapped in `bg-gradient-to-r from-[#4f9eff] to-[#8b5cf6] bg-clip-text text-transparent`
- Subheadline: 18px, weight 400, `line-height: 1.7`, color `#9999aa`, `max-width: 560px`, center-aligned
- CTA row: Primary button (gradient fill, `linear-gradient(135deg, #4f9eff, #8b5cf6)`, 48px height, 24px horizontal padding, 8px radius) + Secondary ghost button (1px solid `rgba(255,255,255,0.12)`, same sizing)
- Scroll hint below CTAs: thin 1px vertical line 32px tall + "scroll" label in 11px uppercase, `opacity: 0.35`

**Motion:**
- Three.js canvas: `opacity: 0` → `opacity: 1`, duration `800ms`, linear easing. Begins immediately at page mount.
- GSAP timeline (delay `0.8s` from mount): 
  - `t=0`: section label, `y: 20px → 0, opacity: 0 → 1`, duration `500ms`, ease `expo.out`
  - `t=0.15s`: headline, `y: 40px → 0, opacity: 0 → 1`, duration `700ms`, ease `expo.out`
  - `t=0.35s`: subheadline, `y: 30px → 0, opacity: 0 → 1`, duration `600ms`, ease `expo.out`
  - `t=0.55s`: CTA row, `opacity: 0 → 1`, duration `400ms`, ease `power2.out`
  - `t=0.65s`: scroll hint, `opacity: 0 → 0.35`, duration `400ms`
- GSAP ScrollTrigger: as user scrolls first `100vh`, camera Z position lerps `5 → 3` via `scrub: 1.5`. Hero text parallax: `y: 0 → -60px`, `scrub: true`
- Three.js mesh idle: `rotation.y += 0.001` per frame. Mouse movement (mousemove event) lerps `rotation.x` and `rotation.y` by ±5° (0.087 rad)

**Typography:**
- Display: Inter 800, `clamp(56px, 7vw, 88px)`, `line-height: 1.0`, `letter-spacing: -0.04em`
- Subtext: Inter 400, 18px, `line-height: 1.7`
- Label: Inter 500, 11px, `letter-spacing: 0.12em`, uppercase
- Gradient text class: `bg-gradient-to-r from-[#4f9eff] to-[#8b5cf6] bg-clip-text text-transparent`

**Color Context:**
- Background: `#0a0a0f`
- Glow: `rgba(79,158,255,0.15)` radial center
- Primary text: `#ffffff`
- Secondary text: `#9999aa`
- Accent: `#4f9eff`, `#8b5cf6`

**Instruction:** Generate a full-viewport hero section as a Next.js Client Component (`'use client'`) in TypeScript using Tailwind CSS v4. Use `@react-three/fiber` and `@react-three/drei` for the 3D scene (TorusKnot mesh with metallic material, ambient + point lights at positions [3,3,3] and [-3,-2,2] in colors `#4f9eff` and `#8b5cf6`). Use Framer Motion for any UI element animations where simpler, GSAP for the load timeline and ScrollTrigger camera movement. Lenis smooth scroll should be initialized in a parent provider, not this component. The Three.js `<Canvas>` from `@react-three/fiber` goes in a `div` with class `fixed inset-0 z-0 pointer-events-none`, and all UI content goes in a `div` with class `relative z-10`. Export as `HeroSection`. Include all necessary imports at the top of the file.

---

## Navigation

**Style Reference:** MDX Dark Glass Navbar

**Visual:**
- `position: fixed`, `top: 0`, full width, height `64px`
- Background: `rgba(10, 10, 15, 0.80)` — after 20px scroll changes to `rgba(10, 10, 15, 0.95)`
- `backdrop-filter: blur(12px)`
- Bottom border: `1px solid rgba(255,255,255,0.06)` — after scroll changes to `rgba(255,255,255,0.10)`
- Layout: logo left, nav links center, CTA right. `padding: 0 40px` desktop, `0 16px` mobile
- Logo: text mark "BRAND" in Inter 600, 15px, tracking `0.05em`, white. Or SVG logo component
- Nav links (desktop only, hidden below `md`): Inter 450, 14px, color `#9999aa`, hover `#ffffff`, `transition: color 200ms`
- CTA: gradient-border button (1px gradient `#4f9eff → #8b5cf6` via 1px wrapper technique), inner bg `#0a0a0f`, text white, 13px, weight 500, padding `8px 16px`, radius `6px`
- Mobile: show hamburger (2 lines, 20px wide, 1px height, 6px gap), slide-down mobile menu on tap

**Motion:**
- On page load: navbar fades in at `t=1000ms` from a GSAP global timeline. `opacity: 0 → 1, y: -8px → 0, duration: 400ms, ease: power2.out`
- Nav links on hover: color transition 200ms, optional scale `1.0 → 1.02` on hover
- Scroll detection: `window.addEventListener('scroll', ...)` with `{ passive: true }`, toggles `.scrolled` class at `scrollY > 20`
- Mobile menu: Framer Motion `AnimatePresence`, slides down from `-100%` to `0%`, `duration: 400ms, ease: [0.25,0.46,0.45,0.94]`

**Color Context:**
- Background base: `rgba(10,10,15,0.80)`, scrolled: `rgba(10,10,15,0.95)`
- Border base: `rgba(255,255,255,0.06)`, scrolled: `rgba(255,255,255,0.10)`
- Link color: `#9999aa` default, `#ffffff` hover

**Instruction:** Generate a responsive navigation component as a Next.js Client Component in TypeScript + Tailwind CSS v4. Include scroll detection for background opacity change (add `scrolled` state after 20px). Desktop shows inline links + CTA. Mobile (below `md:` breakpoint) shows hamburger icon that opens an Framer Motion animated dropdown with the nav links stacked vertically (16px font, full-width, padding `12px 16px`, border-bottom `rgba(255,255,255,0.06)`). The CTA button uses the 1px gradient wrapper technique. Include a `useEffect` to listen for scroll and update a `isScrolled` state. Export as `Navigation`.

---

## Features Section

**Style Reference:** MDX Glass Card Grid

**Visual:**
- Section background: `#0a0a0f` with a subtle `radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 60%)` from top
- Section padding: `160px 0` desktop, `80px 0` mobile
- Section eyebrow label above heading: "Features" in 11px uppercase, tracking `0.12em`, color `#4f9eff`, with `::before` 16px rule
- Section heading: `clamp(36px, 4vw, 56px)`, weight 700, color white, tracking `-0.02em`, `line-height: 1.1`, `max-width: 640px`
- Section subtext: 17px, weight 400, color `#9999aa`, `max-width: 560px`, `line-height: 1.65`, below heading, spacing `mt-4`
- Grid: 3 columns desktop (`grid-cols-3`), 2 tablet (`md:grid-cols-2`), 1 mobile. Gap `24px`
- Each card: `p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]`, hover: `bg-white/[0.055] border-white/[0.14]`, `transition: all 300ms ease`
- Card icon container: `w-10 h-10 rounded-xl mb-5` with `background: rgba(79,158,255,0.12); border: 1px solid rgba(79,158,255,0.20)`. Icon: white, 20px
- Card title: Inter 600, 17px, color white, tracking `-0.01em`, `mb-2`
- Card body: Inter 400, 14px, color `#9999aa`, `line-height: 1.6`
- Top of cards: optional subtle gradient glow `radial-gradient(ellipse at 50% 0%, rgba(79,158,255,0.08) 0%, transparent 70%)` revealed on hover

**Motion:**
- Section heading + subtext: `useInView` trigger at `50%` viewport. `opacity: 0 → 1, y: 30px → 0, duration: 600ms, ease: [0.16,1,0.3,1]`
- Cards: Framer Motion staggered container. Each card `opacity: 0 → 1, y: 40px → 0, duration: 700ms, ease: [0.16,1,0.3,1]`. Stagger: `0.1s` between cards. Trigger: `whileInView`, `viewport={{ once: true, margin: '-80px' }}`
- Card hover: `y: 0 → -6px, duration: 300ms, ease: [0.25,0.46,0.45,0.94]`. Box shadow on hover: `0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(79,158,255,0.08)`

**Color Context:**
- Background: `#0a0a0f`
- Card base: `rgba(255,255,255,0.03)` fill, `rgba(255,255,255,0.08)` border
- Card hover: `rgba(255,255,255,0.055)` fill, `rgba(255,255,255,0.14)` border
- Icon bg: `rgba(79,158,255,0.12)`, icon border: `rgba(79,158,255,0.20)`
- Section accent glow: `rgba(139,92,246,0.08)`

**Instruction:** Generate a complete Features section component in Next.js TypeScript + Tailwind CSS v4 + Framer Motion. The section takes a `features: Array<{ icon: React.ReactNode; title: string; description: string; accentColor?: string }>` prop. Use Framer Motion `variants` and `staggerChildren` for the card grid entrance. Each card should be a `motion.div` with `whileHover` for the lift + glow effect, and `whileInView` for entrance. Include a `viewport={{ once: true, margin: '-80px' }}` so cards animate once when scrolled into view. The section heading uses `useInView` from Framer Motion for its entrance. Export as `FeaturesSection`.

---

## Testimonials / Social Proof

**Style Reference:** MDX Dark Glass Cards + Trust Signals

**Visual:**
- Section background: `#0a0a0f` with slight `#0d0d1a` gradient wash in the center
- Padding: `140px 0` desktop, `80px 0` mobile
- Section heading: `clamp(32px, 4vw, 48px)`, weight 700, center-aligned, tracking `-0.02em`, color white
- Subheadline: 16px, color `#9999aa`, center-aligned, `max-width: 480px`, `mt-3`
- Logo strip (social proof bar): above or below heading, a row of 5–6 company logos in `opacity: 0.35`, grayscale, 28px tall. On hover: `opacity: 0.7, filter: none`. Logos separated by `32px gap`
- Testimonial grid: 3 columns desktop, 1 mobile. Each card: `p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]`
- Inside each card: star rating (5 stars, `#4f9eff`), quote in 15px Inter 400 color `#e8e8f0` `line-height: 1.65`, author avatar (32px circle with `bg-white/10` fallback), author name 14px white 500, author title 12px `#9999aa`
- Stars: use `★` characters in color `#4f9eff`, `font-size: 14px`, letter-spacing `2px`

**Motion:**
- Logo strip: on mount, logos fade in staggered `opacity: 0 → 0.35`, `x: -10px → 0`, stagger `0.08s`, duration `500ms`
- Cards: `whileInView` entrance, `opacity: 0 → 1, y: 40px → 0`, stagger `0.12s`, duration `700ms, ease: [0.16,1,0.3,1]`
- Logo hover: `opacity: 0.35 → 0.7`, duration `300ms`, `filter: grayscale(1) → grayscale(0)`

**Color Context:**
- Background: `#0a0a0f`
- Card surface: `rgba(255,255,255,0.03)`
- Quote text: `#e8e8f0`
- Star color: `#4f9eff`
- Author name: `#ffffff`
- Author title: `#9999aa`

**Instruction:** Generate a Testimonials section in Next.js TypeScript + Tailwind CSS v4 + Framer Motion. Accepts props: `testimonials: Array<{ quote: string; authorName: string; authorTitle: string; authorImage?: string; company: string }>` and `logos: Array<{ src: string; alt: string }>`. Display logos in a horizontally scrolling strip on mobile (overflow-x: auto, hide scrollbar). Use CSS `mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent)` on the logo strip container to create fade edges. Cards use `motion.div` with `whileInView`. Export as `TestimonialsSection`.

---

## Pricing Section

**Style Reference:** MDX Three-Tier Pricing

**Visual:**
- Section background: `#0a0a0f`, padding `160px 0` desktop
- Section label: "Pricing" in 11px uppercase `#4f9eff`
- Section heading: `clamp(36px, 4vw, 52px)`, weight 700, white, centered
- Toggle: Monthly / Annual billing toggle. Pill shape, `bg-white/[0.05] border border-white/[0.08] rounded-full p-1`. Selected state: `bg-white/[0.12]`, transition 300ms. Annual shows a "Save 20%" badge in `#4f9eff`
- Pricing grid: 3 columns (Starter / Pro / Enterprise), max-width 1000px, centered, gap `24px`. Middle card (Pro) is featured — slightly larger scale `scale(1.02)`, border `rgba(79,158,255,0.30)` instead of `rgba(255,255,255,0.08)`, and a thin `linear-gradient(to bottom, rgba(79,158,255,0.10), transparent)` at the top of the card (1px line + glow)
- Each card: `p-8 rounded-2xl bg-white/[0.03] border ...`
- Inside card: plan name (14px 500 `#9999aa` uppercase tracking `0.08em`), price (60px Inter 800 white), `/month` (18px `#9999aa`), description (14px `#666680`), CTA button, feature list
- Feature list: `14px #9999aa`, each item with a `✓` check in `#4f9eff` 12px before it, `gap-y: 12px`
- Featured card CTA: filled gradient button `linear-gradient(135deg, #4f9eff, #8b5cf6)`
- Other cards CTA: ghost button `border border-white/[0.12] hover:border-white/[0.24]`

**Motion:**
- Heading entrance: `useInView`, `opacity: 0 → 1, y: 30px → 0, duration: 600ms`
- Toggle: Framer Motion `layout` on the selected indicator for smooth slide animation between monthly/annual
- Cards: staggered `whileInView`, `opacity: 0 → 1, y: 40px → 0`, stagger `0.1s`
- Featured card: enters with a slight scale animation `scale: 0.97 → 1.02`
- Toggle switch: when annual selected, price number animates (count-up effect or cross-fade)

**Color Context:**
- Base card: `rgba(255,255,255,0.03)` fill, `rgba(255,255,255,0.08)` border
- Featured card: `rgba(255,255,255,0.05)` fill, `rgba(79,158,255,0.30)` border
- Price text: `#ffffff`
- Check color: `#4f9eff`
- Toggle: `bg-white/[0.05]`, selected item `bg-white/[0.12]`

**Instruction:** Generate a Pricing section component in Next.js TypeScript + Tailwind CSS v4 + Framer Motion. Include a `useState` for `billingCycle: 'monthly' | 'annual'`. The toggle uses a `motion.div` with `layoutId="toggle-indicator"` for smooth sliding. Prices update based on billing cycle (pass both prices as props). The featured card receives a `featured: true` prop that changes border color and adds the gradient accent at top. Use Framer Motion `whileInView` for card entrance animations. Export as `PricingSection`.

---

## Footer

**Style Reference:** MDX Dark Comprehensive Footer

**Visual:**
- Background: `#050508` (slightly darker than main bg for contrast), top border `rgba(255,255,255,0.06)`
- Padding: `80px 0 40px` desktop
- Layout: Top row — logo left + newsletter signup right. Middle row — 4 link columns. Bottom row — copyright left + social links right
- Logo: same as nav logo
- Newsletter signup (top right): small label "Stay updated" (12px `#9999aa`), email input (dark glass style: `bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-14px text-white placeholder-[#444455]`, focus `border-[#4f9eff]/50`) + Subscribe button (gradient fill, 14px, padding `10px 20px`)
- Link columns: 4 columns, each with heading (12px 500 uppercase tracking `0.08em` `#9999aa`) + links below (14px `#666680` hover `#9999aa`, transition `200ms`)
- Column headings examples: "Product", "Company", "Resources", "Legal"
- Bottom row: copyright text 13px `#444455`, social icons (GitHub, Twitter, LinkedIn) as icon buttons — 20px icons, `#666680` hover `#9999aa`
- Divider between middle and bottom: `1px solid rgba(255,255,255,0.06)`, `margin: 40px 0`

**Motion:**
- Footer content fades in when scrolled into view — each column `opacity: 0 → 1, y: 20px → 0`, stagger `0.08s`, `whileInView once: true`
- Link hover: `color: #666680 → #9999aa`, `x: 0 → 2px` (subtle horizontal nudge), `duration: 200ms`
- Subscribe button: Framer Motion `whileTap: scale(0.97)`, hover glow on button

**Color Context:**
- Background: `#050508`
- Top border: `rgba(255,255,255,0.06)`
- Column heading: `#9999aa`
- Links: `#666680` default, `#9999aa` hover
- Copyright: `#444455`
- Social icons: `#666680` default, `#9999aa` hover

**Instruction:** Generate a Footer component in Next.js TypeScript + Tailwind CSS v4 + Framer Motion. Accept props: `columns: Array<{ heading: string; links: Array<{ label: string; href: string }> }>`, `socialLinks: Array<{ platform: string; href: string; icon: React.ReactNode }>`. Include a controlled email input with `useState` for the newsletter form (no actual submission logic needed — log to console and show a brief success state). Use Framer Motion `whileInView` with stagger for columns. The footer should be fully responsive — on mobile, columns stack vertically, newsletter signup goes below logo. Export as `Footer`.
