# BootstrapMade — AI Component Prompts

These prompts are for AI code agents building production website sections. Each prompt extracts the structural intelligence of BootstrapMade and rebuilds it with Holocraft's visual system: dark mode default, premium typography, Framer Motion animations, Tailwind CSS v4, Next.js App Router.

---

## Prompt 1: Hero Section

### Layout Variant A — Centered Text + CTA

```
Build a full-viewport hero section for a business/SaaS website using Next.js 14 App Router, Tailwind CSS v4, and Framer Motion.

LAYOUT:
- Full viewport height (min-h-screen)
- Content centered both axes
- Background: dark (#0a0a0a) with subtle radial gradient from center: radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.15), transparent)
- Optional: mesh gradient overlay using CSS background with multiple radial gradients

CONTENT STRUCTURE (center-aligned):
1. Eyebrow label: "TRUSTED BY 500+ COMPANIES" — 12px, font-weight 600, letter-spacing 0.15em, uppercase, color #a5b4fc (indigo-300), with small left/right decorative lines (::before/::after with 40px horizontal rule)
2. Headline: 2–3 line h1, clamp(40px, 6vw, 80px), font-weight 800, color #ffffff, line-height 1.1, max-width 900px
3. Subtitle: 18-20px, color #94a3b8 (slate-400), line-height 1.7, max-width 600px, margin: 24px auto
4. CTA row: Primary button (filled, indigo #6366f1, 48px height, px-8, rounded-xl, font-weight 600) + Secondary link ("See how it works →", no background, color #94a3b8)
5. Social proof: "Joined by teams at" + 4-5 company logo SVGs (low-opacity white, 60% opacity)
6. Scroll indicator: animated chevron-down at bottom center

ANIMATION (Framer Motion):
- Staggered entrance: eyebrow (0ms) → headline (100ms) → subtitle (200ms) → CTAs (300ms) → logos (400ms)
- Each: initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}
- Scroll indicator: infinite bounce animation translateY(0→8px→0) 2s ease-in-out infinite

RESPONSIVE:
- Mobile: reduce headline to clamp(32px, 8vw, 48px), stack CTAs vertically (flex-col gap-3), hide logos or show 3 max
- Tablet: reduce to clamp(36px, 6vw, 60px)

Return: complete React component with TypeScript, Tailwind classes only (no inline style except for CSS custom properties), Framer Motion imports, and any necessary 'use client' directive.
```

---

### Layout Variant B — Split Image + Text

```
Build a hero section with a 2-column split layout: text left, image/mockup right.

LAYOUT:
- Full viewport height
- Grid: grid-cols-1 lg:grid-cols-2, items-center
- Left column: text content, padding-left container, max-width 560px
- Right column: product screenshot or device mockup, slight right overflow on large screens

LEFT COLUMN CONTENT:
1. Badge: pill-shaped chip, bg-indigo-950 border border-indigo-800 text-indigo-300, "New · Version 2.0 Released"
2. H1: 48-60px, font-weight 800, line-height 1.1, dark text on light variant or white on dark
3. Body paragraph: 17px, line-height 1.7, color #64748b (light mode) or #94a3b8 (dark mode)
4. Feature checklist: 3 lines with checkmark icons (✓ in indigo circle), 15px, font-weight 500
5. CTA buttons: Primary "Get Started Free" + "Watch Demo" with play icon
6. Micro-copy below buttons: "No credit card required · Cancel anytime"

RIGHT COLUMN:
- Floating UI mockup: rounded-2xl shadow-2xl border border-white/10, slight rotation (rotate-1)
- Behind mockup: decorative blurred gradient blob, absolute positioned, filter blur-3xl
- Floating stat chips: 2-3 small floating cards (e.g., "↑ 34% revenue", "127 active users") with subtle entrance animations

ANIMATION:
- Left column: staggered fade-right entrance
- Right column: fade-left entrance, 150ms delay
- Floating chips: gentle float loop (translateY ±8px, 3s ease-in-out infinite, staggered offsets)
- On scroll: slight parallax (right column moves 20px slower than scroll)

DARK MODE: fully supported via Tailwind dark: variant
```

---

### Layout Variant C — Video Background

```
Build a hero section with a full-bleed background video.

IMPLEMENTATION:
- <video> element: position absolute, inset-0, object-fit cover, width/height 100%, muted, autoPlay, loop, playsInline
- Dark overlay: absolute inset-0 bg-black/60 (or gradient: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)))
- All content: relative z-10, centered

ACCESSIBILITY:
- Video must have a <source> with type attribute
- Provide prefers-reduced-motion: if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) pause video and show static image fallback
- poster attribute on <video> for initial frame before video loads

CONTENT: Same centered structure as Variant A. White text only (video backgrounds demand it).

PERFORMANCE: Use next/image for poster, lazy-load video, consider using Next.js <Script> for IntersectionObserver-based video loading.
```

---

## Prompt 2: Features / Services 3-Column Grid

```
Build a features/services section with a 3-column card grid.

SECTION STRUCTURE:
- Background: #ffffff (light) or #0f0f0f (dark). Padding: py-32 (128px) desktop, py-20 (80px) mobile.
- Section header block:
  - Label: "WHAT WE OFFER" — text-xs font-semibold tracking-[0.15em] uppercase text-indigo-400
  - H2: "Everything you need to succeed" — text-4xl lg:text-5xl font-bold text-white (or #0f172a light)
  - Subtitle: max-w-2xl mx-auto text-center text-slate-400 text-lg leading-relaxed mt-4
  - Space below header: mb-16 (64px) before grid

CARD GRID:
- Layout: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
- Container max-width: max-w-7xl mx-auto px-6

CARD STRUCTURE (for each feature):
- Background: bg-white/5 (dark) or bg-white border border-slate-200 (light)
- Border: border border-white/10 (dark) — subtle glassmorphism edge
- Border radius: rounded-2xl
- Padding: p-8
- Icon: 48x48px icon container, rounded-xl, bg-indigo-950 (dark) or bg-indigo-50 (light), icon color indigo-400/indigo-600. Icon: Heroicons or Lucide React.
- H3: mt-6 text-xl font-semibold text-white (or slate-900 light)
- Body: mt-3 text-base text-slate-400 leading-relaxed
- Optional CTA link: mt-6 text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group. Arrow icon: group-hover:translate-x-1 transition-transform

HOVER STATE:
- border-color shifts from white/10 → white/20
- bg shifts from white/5 → white/8
- icon container brightens slightly
- transition: all 150ms ease

ANIMATION (Framer Motion):
- Section header: viewport scroll trigger, fade-up
- Cards: staggerChildren 0.1s, each card fadeUp with y: 24 → 0
- Use: whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }}

RESPONSIVE:
- lg: 3 columns
- md: 2 columns
- sm/xs: 1 column, full width
- Card order: logical reading order, no reflow tricks needed

Return: complete TypeScript React component. Define features array as const with icon, title, description, href fields. Use Framer Motion motion.div for each card with custom stagger delay via variants.
```

---

## Prompt 3: Stats / Numbers Counter Section

```
Build a statistics section that counts numbers up when it enters the viewport.

DESIGN:
- Background: dark indigo/navy: bg-indigo-950 or bg-[#0d1117]. Full width.
- Padding: py-24 desktop, py-16 mobile
- Optional: subtle grid pattern overlay using CSS background-image: repeating-linear-gradient

LAYOUT:
- Centered container max-w-6xl mx-auto px-6
- Stats grid: grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12

STAT ITEM STRUCTURE:
- Number: text-5xl lg:text-6xl font-black text-white (with optional suffix like "+" or "k")
- Label: mt-2 text-sm font-semibold tracking-widest uppercase text-indigo-300/70
- Divider between items: hidden on mobile, lg:block vertical 1px border-r border-white/10 on all but last

COUNTER ANIMATION:
Use react-countup or implement with Framer Motion useMotionValue:
```tsx
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

function StatItem({ value, suffix, label }: StatItemProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl lg:text-6xl font-black text-white">
        {inView ? <CountUp end={value} duration={2} suffix={suffix} /> : '0'}
      </div>
      <p className="mt-2 text-sm font-semibold tracking-widest uppercase text-indigo-300/70">
        {label}
      </p>
    </div>
  );
}
```

STAT DATA (example):
- 10,000+ / Active Users
- 99.9% / Uptime SLA
- 4.9★ / Average Rating
- 150+ / Countries Served

Optional: Add a section heading above the stats grid: "Trusted at scale" in white, centered, mb-16.

PACKAGE: Use `react-countup` (npm install react-countup) and `react-intersection-observer`.
```

---

## Prompt 4: Testimonials Section

```
Build a testimonials section with quote cards.

LAYOUT OPTIONS:

Option A — Static 3-column grid (desktop), 1-column stack (mobile):
- grid grid-cols-1 md:grid-cols-3 gap-6
- Show 3 testimonials simultaneously
- No carousel, no auto-scroll

Option B — Swiper carousel (use when 5+ testimonials):
- Use Swiper.js with slidesPerView: 1 / md: 2 / lg: 3
- Autoplay: 5000ms, loop: true, pauseOnMouseEnter: true

CARD STRUCTURE:
- Background: bg-white (light) or bg-[#141414] (dark)
- Border: border border-slate-200 (light) or border border-white/8 (dark)
- Border radius: rounded-2xl
- Padding: p-8
- Top: 5 star icons (★ ★ ★ ★ ★), text-amber-400, text-sm, gap-0.5
- Quote text: mt-4 text-base text-slate-600 (light) or text-slate-300 (dark), leading-relaxed, italic
- Opening quote mark: decorative " character, text-6xl text-indigo-200/40, font-serif, line-height 0, float-left, margin-right 8px
- Divider: mt-6 border-t border-slate-100 (light) or border-white/10 (dark)
- Author row: mt-4 flex items-center gap-3
  - Avatar: w-10 h-10 rounded-full object-cover (use next/image)
  - Name: text-sm font-semibold text-slate-900 (light) or text-white (dark)
  - Role/Company: text-xs text-slate-500 (light) or text-slate-400 (dark)

HOVER STATE:
- Card: shadow lifts (box-shadow deepens), border brightens slightly
- transform: translateY(-4px) — use group hover with Tailwind

ANIMATION:
- Section enters viewport: cards stagger in with y:30→0, opacity:0→1, 0.1s stagger
- Carousel: smooth slide transition 600ms ease

OPTIONAL: Featured testimonial — full-width card above the grid, large quote (24px), author with company logo instead of just name.

Return complete component with TypeScript. Accept testimonials as prop array: { quote, author, role, company, avatar, rating }[].
```

---

## Prompt 5: CTA Section (Full-Width Colored Background)

```
Build a conversion CTA section — full container width, contrasting background, single focus.

PLACEMENT: This section appears after testimonials, just before footer. It is the final conversion moment.

DESIGN:
- Background: gradient from indigo-600 to violet-600 (horizontal or diagonal)
- OR: dark bg-[#0a0a0a] with border-t border-b border-white/10 — minimalist variant
- OR: bg-indigo-950 with subtle noise texture overlay
- Full width (no card/border), section height auto (content-defined)
- Padding: py-24 desktop, py-16 mobile

CONTENT (centered, max-w-3xl mx-auto text-center):
1. Eyebrow (optional): "LIMITED TIME" or "START TODAY" — text-xs tracking-widest uppercase text-white/60
2. Headline: text-3xl lg:text-5xl font-bold text-white, line-height 1.1, 1-2 lines max
3. Subtitle: mt-4 text-lg text-white/70 leading-relaxed, max-w-xl mx-auto
4. CTA buttons: mt-10, flex gap-4 justify-center flex-wrap
   - Primary: bg-white text-indigo-600 hover:bg-white/90, px-8 py-4 rounded-xl font-bold text-base
   - Secondary (optional): border border-white/30 text-white hover:bg-white/10, same sizing
5. Micro-copy: mt-4 text-sm text-white/50 — "No credit card required"

ANIMATION:
- Section entrance: scale from 0.98 → 1.0 + opacity 0→1 as it enters viewport
- Button hover: scale(1.02) + box-shadow glow matching button color

BACKGROUND DECORATIVE ELEMENTS:
- Two large blurred circles, absolute positioned, overflow hidden on parent section:
  ```css
  /* Left blob */
  position: absolute; left: -80px; top: 50%; transform: translateY(-50%);
  width: 400px; height: 400px; border-radius: 50%;
  background: rgba(255,255,255,0.05); filter: blur(80px); pointer-events: none;
  ```

Return: TypeScript React component. Accept props: headline, subtitle, primaryCta {text, href}, secondaryCta? {text, href}, microCopy?.
```

---

## Prompt 6: Contact Form Section

```
Build a contact section with a form and company info side panel.

LAYOUT:
- Two columns on desktop: grid grid-cols-1 lg:grid-cols-5 gap-16 items-start
- Left (lg:col-span-2): contact information panel
- Right (lg:col-span-3): contact form
- Mobile: stacked, info panel first

LEFT PANEL:
- H2: "Let's talk" or "Get in touch" — text-3xl font-bold
- Subtitle: text-slate-400, 2-3 sentences
- Contact info items (each): flex items-center gap-4
  - Icon: 40x40 rounded-lg bg-indigo-950 text-indigo-400
  - Label: text-sm text-slate-500 uppercase tracking-wider
  - Value: text-base text-white font-medium
- Items: Email, Phone (optional), Location, Hours
- Social links: row of icon buttons (LinkedIn, Twitter/X, GitHub) at bottom

RIGHT PANEL — FORM:
- Background: bg-[#141414] rounded-2xl p-8 lg:p-10 border border-white/8
- Fields (all use consistent styling):
  ```css
  label: block text-sm font-medium text-slate-400 mb-2
  input/textarea: w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3
                  text-white placeholder:text-slate-600
                  focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50
                  transition-colors duration-200
  ```
- Fields: Name (full-width), Email (full-width), Subject (full-width), Message (textarea, rows=5)
- Submit button: full-width, bg-indigo-600 hover:bg-indigo-500, py-4, rounded-xl, font-semibold
- Submit button loading state: show spinner icon + "Sending..." text, disabled
- Success state: replace form with success message card (green border, checkmark, "We'll get back to you within 24 hours")
- Error state: show error banner above submit button

FORM LOGIC (React Hook Form + Zod):
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});
```

ANIMATION:
- Form fields: stagger in on section enter, 50ms apart
- Error messages: animate in with height 0→auto + opacity 0→1
- Success message: scale 0.95→1 + opacity 0→1

Return: complete TypeScript component with React Hook Form, Zod validation, loading/success/error states, and a Next.js API route at /api/contact using nodemailer or Resend SDK.
```

---

## Prompt 7: Pricing Table Section

```
Build a 3-tier pricing section with monthly/annual toggle.

SECTION LAYOUT:
- Background: dark #0a0a0a or light #f8fafc
- Padding: py-32 desktop, py-20 mobile
- Section header: centered, "Simple, transparent pricing" h2 + subtitle
- Toggle: Monthly / Annual pill toggle above cards (annual shows "Save 20%" badge)

TOGGLE IMPLEMENTATION:
```tsx
const [isAnnual, setIsAnnual] = useState(false);

<div className="flex items-center gap-3 justify-center mb-12">
  <span className={`text-sm ${!isAnnual ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
  <button
    onClick={() => setIsAnnual(!isAnnual)}
    className="relative w-12 h-6 rounded-full bg-indigo-600 transition-colors"
  >
    <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${isAnnual ? 'translate-x-6' : ''}`} />
  </button>
  <span className={`text-sm ${isAnnual ? 'text-white' : 'text-slate-500'}`}>
    Annual <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full ml-1">Save 20%</span>
  </span>
</div>
```

CARD GRID:
- grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto

CARD STRUCTURE:
- Base card: rounded-2xl border border-white/10 p-8 bg-white/3
- Featured/highlighted card (middle): border-indigo-500 border-2, bg-indigo-950/50, ring-1 ring-indigo-500/20, scale-105 on desktop
- Featured badge: "Most Popular" — absolute top-4 right-4, text-xs bg-indigo-500 text-white px-3 py-1 rounded-full

CARD CONTENT:
1. Tier name: text-base font-semibold text-slate-400 uppercase tracking-wider
2. Price: mt-4, large display
   - Currency symbol: text-2xl font-bold text-white, align top
   - Number: text-5xl font-black text-white
   - Period: text-slate-500 text-base "/mo"
   - Annual discount note: text-xs text-slate-500 mt-1 (shows original monthly price struck through)
3. Description: mt-4 text-sm text-slate-400 leading-relaxed
4. Divider: mt-6 border-t border-white/10
5. Features list: mt-6 space-y-3
   - Each: flex items-start gap-3, checkmark icon (✓) in indigo or green circle (w-5 h-5), text-sm text-slate-300
   - Unavailable features (in base tier): text-slate-600, ✗ icon in slate
6. CTA button: mt-8, full-width
   - Featured: bg-indigo-600 hover:bg-indigo-500 text-white
   - Others: bg-white/5 hover:bg-white/10 text-white border border-white/10

PRICE ANIMATION: When toggle switches, prices animate with Framer Motion:
```tsx
<motion.span key={isAnnual ? 'annual' : 'monthly'} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
  {isAnnual ? annualPrice : monthlyPrice}
</motion.span>
```

ENTERPRISE ROW (below cards, full-width):
- "Need more? Talk to us about Enterprise →" — text-center, text-slate-400, with link

Return: complete TypeScript component. Accept plans as prop: { name, monthlyPrice, annualPrice, description, features: { text, included }[], featured?, cta }[].
```
