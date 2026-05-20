# BootstrapMade — Visual DNA

## Color System

### Default Palette
- **Primary**: `#3498db` (Bootstrap-era blue) or `#0d6efd` (Bootstrap 5 blue). Custom themes swap this for brand color.
- **Background (main)**: `#ffffff`
- **Background (alternate sections)**: `#f8f9fa` — Bootstrap's `bg-light`, creates rhythm without visual weight
- **Background (dark sections)**: `#212529` — used for footer, occasional CTA sections
- **Text (primary)**: `#212529` — Bootstrap's default dark, near-black
- **Text (secondary/body)**: `#555555` or `#666666` — used for paragraph text, lower hierarchy content
- **Text (muted/captions)**: `#888888` or `#6c757d` (Bootstrap muted)
- **Border**: `#dee2e6` — Bootstrap's default border color, used for card edges, dividers
- **White**: `#ffffff` — used as text on dark backgrounds, button text on filled buttons

### Section Color Alternation Pattern
The standard BootstrapMade page cycles predictably:
1. Section 1 (Hero): full-bleed with primary color gradient or image overlay, or plain white
2. Section 2: `#ffffff` background
3. Section 3: `#f8f9fa` background
4. Section 4: `#ffffff` background
5. Stats section: `#212529` dark background (breaks rhythm, commands attention)
6. Testimonials: `#f8f9fa`
7. CTA section: primary color background (`#3498db` or brand color)
8. Footer: `#212529`

This alternation is applied mechanically but is structurally sound — it creates spatial rhythm that guides scanning.

### Accent and State Colors
- **Success**: `#28a745` (Bootstrap green) — form success states, checkmarks
- **Error/Danger**: `#dc3545` — form validation errors
- **Warning**: `#ffc107` — alert states
- **Link hover**: primary color darkened 10% via `filter: brightness(0.9)`
- **Button hover**: `background-color` shifts to primary darkened ~10%

## Grid System

### Container
- **Max-width**: `1140px` on Bootstrap 4, `1320px` on Bootstrap 5 with `container-xxl`
- **Horizontal padding**: `15px` each side (Bootstrap standard), giving `1110px` or `1290px` content width
- **Centered**: `margin: 0 auto`

### Column Grid
- **System**: 12-column Bootstrap grid
- **Gutter width**: `30px` total (15px each side per column) in Bootstrap 4; `24px` in Bootstrap 5 default (`--bs-gutter-x: 1.5rem`)
- **Common layouts**:
  - 3-column features: `col-lg-4 col-md-6`
  - 2-column split: `col-lg-6`
  - 4-column team/client logos: `col-lg-3 col-md-6`
  - Full-width CTA: `col-12`

### Breakpoints (Bootstrap 5)
- `xs`: 0–575px (mobile portrait)
- `sm`: 576–767px (mobile landscape)
- `md`: 768–991px (tablet)
- `lg`: 992–1199px (small desktop)
- `xl`: 1200–1399px (desktop)
- `xxl`: 1400px+ (large desktop)

## Spacing and Density

### Vertical Rhythm — Sections
- **Section padding (desktop)**: `padding: 80px 0` — equivalent to `py-5` (Bootstrap's `py-5` = `3rem` = 48px, but most BootstrapMade templates override to 80px)
- **Section padding (mobile)**: `padding: 60px 0`
- **Extra large sections** (hero, CTA): `padding: 120px 0` desktop

### Component Internal Spacing
- **Card padding**: `padding: 24px` (`p-4` in Bootstrap = `1.5rem`)
- **Card padding (larger cards)**: `padding: 30-40px`
- **Icon-to-heading gap**: `margin-bottom: 16px` (1rem)
- **Heading-to-body gap**: `margin-bottom: 12px`
- **Button margin-top from body text**: `margin-top: 24px`

### Base Unit
All spacing is derived from an **8px base unit**:
- `4px` — micro gaps (icon padding)
- `8px` — tight gaps (label-to-value)
- `16px` — default component internal gap
- `24px` — card padding, content blocks
- `32px` — between cards in a grid row
- `48px` — between major content groups
- `80px` — section padding
- `120px` — hero/CTA section padding

### Section Heading Block
Every content section follows the same pattern:
```
[Section Tag] — small uppercase, primary color (optional)
[Section Heading] — centered h2, 36px, dark color
[Colored Underline Divider] — 2px height, 40px width, primary color, centered, margin: 12px auto 20px
[Section Subtitle] — centered paragraph, 16-18px, #555555, max-width 720px, margin: auto
```
This block is visually exhausted across the web but structurally sound — it establishes hierarchy before content begins.

## Surface and Depth

### Cards
- **Background**: `#ffffff`
- **Border**: none (typically) or `1px solid #dee2e6` (light variant)
- **Box shadow (default)**: `box-shadow: 0 2px 15px rgba(0, 0, 0, 0.10)`
- **Box shadow (hover)**: `box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15)`
- **Border radius**: `4px` (subtle) to `8px` (standard card), `50%` for circular avatar images
- **Transition**: `box-shadow 0.3s ease, transform 0.3s ease`

### Buttons
- **Primary**: filled, `background-color: #3498db`, `color: #ffffff`, `border-radius: 4px`, `padding: 10px 28px`
- **Outline**: `border: 2px solid #3498db`, `color: #3498db`, transparent background
- **Hover state**: `background-color` darkens 10%, `transform: translateY(-2px)` (subtle lift) — not universal but common
- **Border radius variants**: flat (0), rounded (4-8px), pill (50px)

### Icons
- **Libraries**: Bootstrap Icons (most common in newer templates), Font Awesome 5/6 (legacy)
- **Icon treatment in feature cards**: circular colored background (`width: 60px; height: 60px; border-radius: 50%; background: rgba(52, 152, 219, 0.1)`), icon centered inside
- **Icon size in cards**: `font-size: 32px` or `font-size: 2rem`
- **Icon color**: primary color (#3498db)

## Imagery

### Photography Style
- **Subject**: people at work (laptops, meetings, handshakes), abstract business scenarios, product screenshots
- **Treatment**: stock photography, minimal color grading
- **Hero images**: full-width or right-side split, overlaid with dark gradient `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))` for text contrast
- **About section**: team photos, office environment, candid work moments
- **Aspect ratios**: 16:9 hero, 4:3 or 1:1 team/testimonial avatars (circular, 80-100px diameter)

### Dividers and Decorative Elements
- **Section divider**: colored horizontal rule, `height: 2px; width: 40px; background: #3498db; margin: 12px auto`
- **Background patterns**: occasional subtle dot grid or diagonal stripe `background-image: url("data:image/svg+xml...")` at 5-10% opacity
- **Wave dividers**: SVG wave shapes between sections (more modern templates), typically white wave cutting into colored section below
