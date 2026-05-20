# Behance — Visual DNA

## Color System

### Platform UI Colors
Behance's own interface is intentionally color-neutral to avoid competing with the work displayed:

- **Primary background**: `#ffffff` — the default. All project feeds, profile pages, project pages.
- **Secondary background**: `#f7f7f7` — used for page-level background behind white content cards
- **Dark surface** (project page header area): `#1d1d1d` — used sparingly
- **Primary text**: `#1d1d1d` — near-black, not pure black. Softer on white.
- **Secondary text**: `#5e5e5e` — for metadata, secondary labels, timestamps
- **Muted text**: `#9c9c9c` — captions, placeholder text, disabled states
- **Platform accent**: `#1769ff` — Behance blue, used only for interactive elements: links, CTAs, "Appreciate" button active state, "Follow" button, highlights
- **Border/divider**: `#e7e7e7` — extremely light, 1px dividers between sections, card borders
- **Card background**: `#ffffff` — no shadow on individual project cards, border distinguishes them from background

### Individual Project Color Palettes
Project pages take on the designer's own palette. The most respected Behance work often uses:
- **Dark presentation backgrounds**: `#0d0d0d`, `#111111`, `#1a1a1a`, `#0f1117`
- **Single accent color**: one bold color applied to section dividers, labels, or UI elements in mockups
- **Neutral document feel**: off-white `#fafaf8` or `#f5f5f0` for editorial-style case studies
- **Full-color sections**: a single section with a bold background color to present a color palette from brand work

### Color Discipline in Top Projects
The highest-rated Behance projects apply extreme color discipline:
- Maximum 2-3 colors in the presentation itself (not counting the work)
- Presentation background, text color, and one accent color
- Resist the temptation to decorate — let the work provide the color

## Grid Architecture

### Platform Feed Grid
The Behance project feed uses a responsive masonry-style grid:
- Desktop (1440px+): 4 columns, ~340px per thumbnail
- Desktop (1200px): 3 columns, ~380px per thumbnail
- Tablet (768px): 2 columns
- Mobile: 1 column, full width
- Gutter between columns: `20px`
- Images in feed: maintain original aspect ratio (masonry), typically 4:3, 16:9, or 1:1

### Individual Project Page
- **Content container**: `max-width: 1200px` or `max-width: 960px` (designer's choice)
- **Centered**: `margin: 0 auto`
- **Full-bleed images**: escape container with `width: 100vw; position: relative; left: 50%; transform: translateX(-50%)`
- **Section width**: alternates between full-bleed and contained
- **2-column content split**: CSS Grid `grid-template-columns: 1fr 1fr` or `2fr 1fr` for image+text layouts
- **Vertical rhythm**: minimum `60px` between major sections, `120-160px` for top-tier projects

### Profile Page Layout
- **Cover image**: full-width (100vw), `height: 220px` desktop — fixed height, covers entire width
- **Profile info**: overlapping the cover image bottom, centered or left-aligned
- **Avatar**: `120px × 120px`, circular, `border: 4px solid #ffffff`, positioned at cover image bottom edge
- **Stats row**: Followers / Following / Appreciations / Views — displayed in a horizontal strip below avatar
- **Project grid**: below stats, same masonry grid as feed

## Typography and Text Density

### Text-to-Image Ratio
On the best Behance projects: approximately 20-30% text, 70-80% imagery. Text exists to contextualize, not to explain. Trust the images.

### Spacing — Key Values
- **Between major sections (case study)**: `80px` minimum, `120-160px` for flagship projects
- **Between related elements** (image group, text block): `20-24px`
- **Paragraph spacing**: `1em` (one line of text)
- **Container horizontal padding** (at container edge): `40px` desktop, `24px` tablet, `16px` mobile
- **Image caption margin-top**: `12px` above caption below image

### Surface Treatments
- **Images**: no borders, no drop shadows on the images themselves — the white background creates implicit boundaries
- **Text blocks**: no backgrounds, no boxes — text floats on the white page
- **Section dividers**: thin `1px` horizontal rules `#e7e7e7`, or none at all (whitespace alone divides sections)
- **Glassmorphism / shadows / gradients**: absent from the platform UI. Present only inside project artwork.

## Image Presentation

### Full-Bleed Images
The signature Behance presentation technique. Used when the work is the statement:
```css
/* Full-bleed image within a constrained layout */
.full-bleed {
  width: 100vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 80px;
  margin-bottom: 80px;
}

/* Image inside */
.full-bleed img {
  width: 100%;
  height: auto;
  display: block;
}
```

### Device Mockup Presentation
- Browser window mockup: work appears inside a styled browser frame with URL bar, 3 dots, tab strip. Usually `border-radius: 8-12px`, `box-shadow: 0 40px 80px rgba(0,0,0,0.2)`.
- Mobile mockup: iPhone-style frame, portrait orientation, centered on a neutral or brand-color background
- Multiple devices: overlapping perspective mockups (one at angle, one flat) — shows responsive design
- Aspect ratio: browser mockup typically 16:9 or 16:10. Mobile 9:19.5.

### Background Treatments for Mockup Presentation
When staging device mockups, the background is always intentional:
- Solid brand color (e.g., the client's primary color) — most common
- Dark `#111111` to `#1a1a1a` — makes screens pop
- Subtle gradient (2 related colors, radial from center)
- Noise/grain texture on a neutral surface — editorial feel
- Never: pure white with no treatment (mockup needs contrast from page background)

### Before/After Layouts
```
Before | After
[Old design image] [New design image]
Side-by-side, equal columns
```
OR a swipe comparison slider (CSS clip-path or JS-based drag handle).
Label positioning: small text above or below each panel, not overlaid.

## Decorative and Structural Elements

### Color Swatches Section
For branding projects: a row of color rectangles showing the brand palette. Full-width, equal columns, `height: 120-200px` each.

```html
<div style="display: grid; grid-template-columns: repeat(5, 1fr); height: 160px;">
  <div style="background: #1769ff;"></div>
  <div style="background: #0d0d0d;"></div>
  <div style="background: #ffffff; border: 1px solid #e7e7e7;"></div>
  <div style="background: #f5f5f0;"></div>
  <div style="background: #e84c3d;"></div>
</div>
```

### Typography Specimen Sections
Large-scale display of a typeface: the alphabet, a pangram, size specimens. Black text on white or white text on black. These are common in brand identity projects.

### Grid Pattern Documentation
Brand identity projects often show a grid-construction diagram of a logo — thin lines over the mark, precise proportions. White lines on dark background.
