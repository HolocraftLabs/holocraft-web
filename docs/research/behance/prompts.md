# Behance — AI Component Prompts

These prompts are for AI code agents building portfolio, agency, and case study websites in the Behance editorial tradition, elevated with Holocraft's premium aesthetic system. Stack: Next.js 14 App Router, Tailwind CSS v4, Framer Motion, TypeScript.

---

## Prompt 1: Agency / Portfolio Hero

### Full-Bleed Image or Video Hero

```
Build a full-bleed hero section for a design agency or creative portfolio. Behance editorial style: the work is the hero, text is minimal.

LAYOUT:
- Full viewport height (min-h-screen) OR fixed large height (80-100vh, designer's choice via prop)
- Full-width background: either a high-quality image (next/image with fill and object-fit: cover) OR a looping video
- Dark overlay: absolute inset-0, background gradient from rgba(0,0,0,0.15) at top to rgba(0,0,0,0.6) at bottom
- Content: positioned bottom-left at container padding — NOT centered (editorial, not marketing)

CONTENT STRUCTURE (bottom-left, padding: 0 0 80px 80px desktop, 0 0 48px 24px mobile):
1. Agency type label: "DESIGN STUDIO · EST. 2019"
   - font-size: 12px, font-weight: 700, letter-spacing: 0.15em, uppercase
   - color: rgba(255,255,255,0.6)
   - margin-bottom: 20px
2. Headline: 1-2 lines, very large
   - font-size: clamp(48px, 6vw, 96px)
   - font-weight: 800
   - line-height: 1.0
   - letter-spacing: -0.03em
   - color: #ffffff
   - max-width: 800px
3. NO body paragraph in hero — restraint is the message
4. CTA: single link, not a button
   - "View Our Work ↓" or "Selected Projects →"
   - font-size: 16px, font-weight: 500, color: rgba(255,255,255,0.75)
   - hover: color: #ffffff
   - underline animates in on hover (border-bottom, width 0→100%, 0.3s ease)
   - margin-top: 40px

RIGHT SIDE — optional floating project count:
- Absolute right-bottom area (right: 80px, bottom: 80px)
- "(24)" or "24 Projects" in large, thin typography
- font-size: 80px, font-weight: 200, color: rgba(255,255,255,0.15)
- Purely decorative

SCROLL INDICATOR:
- Bottom-center
- "SCROLL" vertical text + animated line (height expands 0→24px, 1.5s ease-in-out infinite)
- font-size: 10px, letter-spacing: 0.2em, uppercase, color: rgba(255,255,255,0.4)

ANIMATION (Framer Motion):
- On mount: label fades in (delay 0.3s) → headline fades in (delay 0.5s) → CTA fades in (delay 0.7s)
- Each: opacity 0→1, y: 16→0, duration: 0.7s, ease: 'easeOut'
- Image: blur-up loading (blurDataURL for next/image placeholder)

BACKGROUND OPTIONS (accept as prop backgroundType: 'image' | 'video' | 'color-gradient'):
- image: next/image with fill, priority, blurDataURL
- video: HTML5 video, muted, autoPlay, loop, playsInline, poster fallback
- color-gradient: CSS gradient using brand colors, no image

DARK MODE: Always dark (overlay enforces it). Light variant omitted for this component.

Props: { headline: string; agencyLabel?: string; ctaText: string; ctaHref: string; backgroundSrc: string; backgroundType: 'image' | 'video' }

Return: TypeScript React component with 'use client' directive.
```

---

## Prompt 2: Project / Work Grid

### 3-Column Portfolio Grid with Hover Overlay

```
Build a project portfolio grid section for an agency or freelance designer.

SECTION LAYOUT:
- Section padding: py-24 desktop (96px), py-16 mobile (64px)
- Background: #ffffff (light) or #0a0a0a (dark)
- Optional section header: left-aligned (NOT centered), "Selected Work" in text-4xl font-bold, with "All Projects →" link right-aligned on the same row

GRID LAYOUT:
- CSS Grid: grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 (1px gap = dark lines between cells) OR gap-6 (spaced cards) — accept as prop
- For masonry variant: use CSS columns or a library like react-masonry-css
- Container: max-w-7xl mx-auto px-6 (for spaced variant) OR no container (for edge-to-edge variant)

CARD STRUCTURE:
Each card is a clickable project thumbnail. Link wraps the entire card.

```tsx
<Link href={project.href} className="group block relative overflow-hidden aspect-[4/3]">
  {/* Thumbnail */}
  <Image
    src={project.thumbnail}
    alt={project.title}
    fill
    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  />

  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

  {/* Info panel — slides up */}
  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
    <p className="text-xs font-semibold tracking-[0.12em] uppercase text-white/60 mb-1">
      {project.category}
    </p>
    <h3 className="text-lg font-bold text-white">{project.title}</h3>
  </div>

  {/* Arrow indicator */}
  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm">
    →
  </div>
</Link>
```

FEATURED PROJECT (first item, spans 2 columns):
- First card: lg:col-span-2 lg:row-span-1 with aspect-[16/9] instead of [4/3]
- Larger font in overlay: text-2xl for title
- Can show project subtitle in overlay

ANIMATION (Framer Motion):
- On page load / viewport enter: cards stagger in, 0.08s between each
- Each card: opacity 0→1, scale 0.97→1, duration 0.5s easeOut
- Use: staggerChildren via variants on the grid container

TYPES:
```tsx
interface Project {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  href: string;
  featured?: boolean;   // spans 2 columns if true, first item only
  year?: string;
}
```

FILTER BAR (optional, accept showFilters prop):
- Tabs: "All" | "Branding" | "UI/UX" | "Motion" | "Print"
- Behance-style: text tabs with border-bottom active indicator
- Filter animates via AnimatePresence + layout animation on the grid

Return: TypeScript React component. Accept projects: Project[], showFilters?: boolean, layout?: 'grid' | 'masonry'.
```

---

## Prompt 3: Case Study Page Hero

### Full-Width Project Hero with Metadata

```
Build a case study / project page hero section — the first thing seen when opening a portfolio project page.

This is the Behance-editorial pattern: the project image is enormous and immediate, metadata is clean and systematic.

LAYOUT:
Full-width (no container), two sections stacked:

1. HERO IMAGE SECTION (full-bleed):
   - Width: 100vw (break out of any container)
   - Height: 55-65vh (dynamic via CSS clamp)
   - next/image with fill, object-fit: cover, priority: true, high quality
   - No overlay by default — the image stands alone
   - Background color matching brand (set via CSS custom property --project-color) while image loads

2. METADATA SECTION (contained):
   - Max-width: 1200px, centered, px-6
   - Padding: pt-10 pb-16

   Left column (2/3 width):
   - Project title: text-4xl lg:text-5xl font-bold text-slate-900 (light) or text-white (dark), letter-spacing: -0.02em
   - Project description: mt-4 text-lg text-slate-600 leading-relaxed max-w-2xl

   Right column (1/3 width):
   - Metadata grid: 2×2 or 2×3 grid of label+value pairs
   - Label: text-xs font-semibold tracking-[0.12em] uppercase text-slate-400
   - Value: text-sm font-medium text-slate-900 (light) or text-white (dark), mt-1

   Metadata fields: CLIENT, ROLE, YEAR, TOOLS, DURATION (show whichever are provided)

   Divider: mt-10 border-t border-slate-200 (light) or border-white/10 (dark) between metadata and body below

RESPONSIVE LAYOUT:
- Desktop (lg+): 2-column metadata (2/3 + 1/3)
- Mobile: stacked, title first, then metadata grid 2 columns

ANIMATION:
- Hero image: next/image blur-up (blurDataURL placeholder)
- After image loads: opacity transition if using manual loading state
- Metadata: fade-up entrance, staggered 0.1s per item, on initial mount

NEXT.JS SPECIFIC:
- This is a page-level component, not a shared layout component
- Use: generateMetadata for SEO based on project data
- Image must have priority={true} as it's above the fold

Props: { title: string; description: string; heroImage: string; heroImageBlur?: string; metadata: { client?: string; role?: string; year?: string; tools?: string; duration?: string } }

Return: TypeScript React component, works as a section within a page, responsive.
```

---

## Prompt 4: Case Study Content Section

### Alternating Image + Text Layout

```
Build a reusable case study content section with alternating image-left/text-right and text-left/image-right layouts.

This component renders the body of a case study — after the hero. It accepts an array of content blocks, each with an image and text, and alternates their alignment.

SECTION PADDING:
- Each block: py-24 desktop (96px), py-16 mobile (64px)
- Note: use generous padding — this is editorial, not marketing. Space signals quality.

BLOCK LAYOUT:
- Grid: grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center max-w-6xl mx-auto px-6
- Even index blocks: image LEFT, text RIGHT
- Odd index blocks: image RIGHT, text LEFT (lg:order-last on image)

IMAGE COLUMN:
- Rounded corners: rounded-2xl (or none for full-bleed feel within grid — accept as prop)
- Shadow: shadow-2xl on light backgrounds, shadow-none on dark
- Optional: thin border border-slate-100 (light) or border-white/8 (dark)
- Use next/image, width/height based on aspect ratio, sizes prop for responsive
- Aspect ratios: 16/9 (screen work), 4/3 (general), 1/1 (square compositions)

TEXT COLUMN:
- Section label: text-xs font-semibold tracking-[0.15em] uppercase text-indigo-400 (or brand color), mb-3
- Section heading: text-3xl font-bold text-slate-900 (light) or text-white (dark), leading-tight, letter-spacing: -0.01em
- Body text: mt-4 text-[17px] text-slate-600 (light) or text-slate-300 (dark), leading-[1.8], max-w-lg
- Multiple paragraphs: space-y-4 between <p> tags
- Optional sub-points: bulleted list, each item: flex items-start gap-3, bullet dot or icon
- Optional CTA link: mt-8, text-sm font-semibold text-indigo-500 flex items-center gap-2 hover:gap-3 transition-all

OPTIONAL CALLOUT BOX:
A block that has no image — just a full-width text callout with left border:
```tsx
<blockquote className="border-l-4 border-indigo-500 pl-8 py-4 my-16 max-w-3xl mx-auto">
  <p className="text-2xl font-medium text-slate-700 italic leading-relaxed">
    "The insight that unlocked the redesign was..."
  </p>
</blockquote>
```

TYPES:
```tsx
type ContentBlock = {
  type: 'image-text';
  label?: string;
  heading: string;
  body: string[];        // array of paragraphs
  image: string;
  imageAlt: string;
  imageAspect?: '16/9' | '4/3' | '1/1';
  ctaText?: string;
  ctaHref?: string;
} | {
  type: 'quote';
  quote: string;
  attribution?: string;
} | {
  type: 'full-width-image';
  image: string;
  imageAlt: string;
  caption?: string;
}
```

ANIMATION:
- Image column: fades in from its direction (image on left: from left, image on right: from right)
- Text column: fades in from opposite direction
- Use whileInView with viewport={{ once: true, margin: '-80px' }}
- Duration: 0.6s, stagger: 0.15s between image and text

Return: TypeScript React component. Accept blocks: ContentBlock[], theme?: 'light' | 'dark'.
```

---

## Prompt 5: Process Documentation Section

### Image Sequence with Annotation

```
Build a process/behind-the-scenes documentation section for a case study — showing the messy middle: wireframes, sketches, iterations, research artifacts.

PHILOSOPHY (Behance editorial):
Process documentation is a trust signal. It shows rigor, craft, and thought. The layout should feel like pages from a design notebook — ordered, labeled, but honest about the process.

LAYOUT OPTIONS (accept as prop):

Option A — Image Row (3-4 images in a horizontal row):
- grid grid-cols-3 lg:grid-cols-4 gap-4
- Each image: rounded-xl, aspect-[4/3], overflow-hidden, hover:scale-[1.02] transition
- Caption below each: text-xs text-slate-400 italic text-center, mt-2

Option B — Large + Small Grid:
- grid grid-cols-3 gap-4
- First image: col-span-2, row-span-2 (large)
- Remaining 4 images: each col-span-1 (small grid around the large)

Option C — Sequential Timeline:
- Vertical timeline, alternating left/right
- Each step: number indicator (01, 02, 03), heading, image, annotation
- Step numbers: text-7xl font-black text-slate-100 (light) or white/5 (dark), absolute positioned behind content

SECTION HEADER (left-aligned):
```tsx
<div className="max-w-6xl mx-auto px-6 mb-16">
  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-indigo-400 mb-3">
    PROCESS
  </p>
  <h2 className="text-3xl lg:text-4xl font-bold text-white">
    How we got there
  </h2>
</div>
```

ANNOTATION OVERLAY:
Some process images use annotation overlays — numbered callouts:
```tsx
// Position: absolute relative to image container
<div className="annotation-marker" style={{ top: '30%', left: '45%' }}>
  <div className="w-6 h-6 rounded-full bg-indigo-500 text-white text-xs font-bold flex items-center justify-center">
    1
  </div>
  {/* Tooltip on hover */}
  <div className="annotation-tooltip">
    Navigation was redesigned here
  </div>
</div>
```

```css
.annotation-tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: #1d1d1d;
  color: white;
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 6px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.annotation-marker:hover .annotation-tooltip {
  opacity: 1;
}
```

ANIMATION:
- Images enter staggered as section scrolls into view
- Each image: opacity 0→1, scale 0.96→1, stagger 0.1s

Return: TypeScript React component. Accept steps: ProcessStep[], layout?: 'row' | 'grid' | 'timeline'.
```

---

## Prompt 6: Skills / Tools Section

### Clean Tag System with Visual Hierarchy

```
Build a skills and tools section for a designer or developer portfolio. Clean, editorial, non-decorative.

LAYOUT:
- Section padding: py-20 desktop, py-14 mobile
- Background: matches page (white or dark)
- Container: max-w-4xl mx-auto px-6
- Left-aligned content (NOT centered — portfolio is editorial, not marketing)

SECTION HEADING:
- "Skills & Tools" — text-3xl font-bold, left-aligned
- Subtitle (optional): text-base text-slate-500 mt-2

SKILLS ORGANIZATION:
Group skills by category. Each category:
- Category heading: text-xs font-semibold tracking-[0.12em] uppercase text-slate-400 mb-4 mt-10
- Tags row: flex flex-wrap gap-2

TAG STYLES — three visual tiers:

Tier 1 — Core/Expert skills (solid filled):
```tsx
<span className="px-4 py-2 rounded-full bg-slate-900 (dark bg) or bg-slate-100 (light) text-sm font-semibold text-white dark:text-white border border-transparent">
  {skill}
</span>
```

Tier 2 — Proficient skills (outlined):
```tsx
<span className="px-4 py-2 rounded-full border border-slate-300 dark:border-white/20 text-sm font-medium text-slate-700 dark:text-slate-300">
  {skill}
</span>
```

Tier 3 — Familiar/learning (text only with dot):
```tsx
<span className="text-sm text-slate-400 flex items-center gap-2">
  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block"/>
  {skill}
</span>
```

ICON VARIANT (for well-known tools — Figma, React, etc.):
```tsx
<div className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-white/10">
  <img src={tool.iconSrc} alt="" className="w-4 h-4" />
  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{tool.name}</span>
</div>
```

CATEGORY EXAMPLES:
- Design: Figma, Sketch, Adobe XD, Illustrator, Photoshop, After Effects
- Development: React, Next.js, TypeScript, Tailwind CSS, Framer Motion
- Prototyping: Principle, ProtoPie, InVision
- Research: Maze, Hotjar, UserTesting

PROFICIENCY BAR VARIANT (optional):
Instead of tags, show horizontal bars:
```tsx
<div className="space-y-4 mt-6">
  {skills.map(skill => (
    <div key={skill.name}>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-white">{skill.name}</span>
        <span className="text-xs text-slate-500">{skill.level}%</span>
      </div>
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-indigo-500 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: index * 0.1 }}
          viewport={{ once: true }}
        />
      </div>
    </div>
  ))}
</div>
```

ANIMATION:
- Tags stagger in on viewport enter, 0.04s between each
- Proficiency bars animate width on enter

TYPES:
```tsx
interface SkillCategory {
  category: string;
  skills: Array<{
    name: string;
    tier: 1 | 2 | 3;
    icon?: string;
    level?: number;   // for bar variant, 0-100
  }>;
}
```

Return: TypeScript React component. Accept categories: SkillCategory[], variant?: 'tags' | 'bars'.
```

---

## Prompt 7: Contact / Hire Section

### Editorial Portfolio Contact Ending

```
Build a closing contact/hire section for a portfolio site. NOT a generic form — this is the editorial finale of a portfolio. It should feel like a direct, human invitation, not a form to fill out.

PHILOSOPHY:
The best Behance-inspired portfolio contact sections are simple, confident, and personal. "I'm available for new projects. Let's talk." Not "Fill out this form and we'll get back to you."

LAYOUT — Full-Width Minimal Design:
- Section padding: py-32 desktop (128px), py-20 mobile (80px)
- Background: #0a0a0a (preferred — dark ending to portfolio) OR white with strong typography
- Container: max-w-3xl mx-auto px-6 (narrower than usual — intimate)
- All content: left-aligned (editorial) OR centered (symmetrical — accept as prop)

CONTENT STRUCTURE:

1. Status badge (optional):
   - "✓ Available for Work" or "◉ Currently Booked — Taking inquiries for Q3"
   - Pill: bg-green-500/15 text-green-400 border border-green-500/30 px-4 py-1.5 rounded-full text-sm font-medium
   - If booked: bg-amber-500/15 text-amber-400 border border-amber-500/30

2. Large heading:
   - "Let's create something great" or "Ready to start a project?"
   - font-size: clamp(36px, 5vw, 72px)
   - font-weight: 800
   - line-height: 1.0
   - letter-spacing: -0.03em
   - color: #ffffff (dark bg)
   - max-width: 700px

3. Short paragraph:
   - font-size: 18px, line-height: 1.7, color: rgba(255,255,255,0.6)
   - 2 sentences max. Personal tone.
   - max-width: 500px

4. Primary CTA — direct email link:
   - NOT a form — a large email address as a link
   - "hello@studio.com" styled as a headline
   - font-size: 24-32px, font-weight: 600, color: #ffffff
   - Underline: animated underline on hover (border-bottom 2px)
   - cursor: pointer

5. Secondary contact methods row:
   - LinkedIn, Twitter, Dribbble icon buttons
   - 40×40px circular, border border-white/15, hover: border-white/40
   - SVG icons, color: rgba(255,255,255,0.6), hover: rgba(255,255,255,1)

6. Availability calendar link (optional):
   - "Book a 30-min intro call →" — Calendly link
   - text-sm text-slate-500 hover:text-white transition-colors

DECORATIVE ELEMENT — Large Background Number/Text:
Positioned absolute, behind content:
```css
.contact-bg-text {
  position: absolute;
  bottom: -40px;
  right: -20px;
  font-size: clamp(120px, 18vw, 240px);
  font-weight: 900;
  color: rgba(255,255,255,0.03);
  pointer-events: none;
  user-select: none;
  line-height: 1;
}
/* Content: "HELLO" or "LET'S TALK" or "CONTACT" */
```

ANIMATION:
- On scroll into view: heading letter-by-letter reveal (split text by word, stagger 0.05s per word)
- Email link: on hover, letter-spacing slightly increases (0→0.02em, 0.2s ease)
- Social icons: stagger in, scale 0.8→1

MINIMAL FORM VARIANT (if client insists on a form):
- Maximum 3 fields: Name, Email, Brief message
- Styled with the dark aesthetic: bg-white/5 inputs, white/10 borders
- One button: "Send Message →"
- No floating labels, no complex validation UI — keep it clean
- On submit: replace with "Message sent. I'll be in touch soon." — no page reload

FOOTER NOTE below section:
- Tiny: "© 2024 Studio Name. Designed with care in San Francisco." — text-xs text-white/20
- Optional: back to top arrow

Return: TypeScript React component. Accept props: { name: string; email: string; status: 'available' | 'booked'; availabilityNote?: string; socialLinks: { platform: string; url: string }[]; showForm?: boolean }.
```
