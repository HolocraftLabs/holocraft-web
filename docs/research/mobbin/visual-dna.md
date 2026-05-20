# Mobbin — Visual DNA

## Color Systems from Top Apps

### Light Mode (Productivity — Dominant)

Productivity apps default to light mode because reading dense information is easier on white backgrounds with high contrast.

**Notion**
- Page background: `#ffffff`
- Sidebar background: `#f7f7f5`
- Hover state: `#efefef`
- Active/selected: `#e8e8e5`
- Text primary: `#37352f`
- Text secondary: `rgba(55,53,47,0.65)`
- Text tertiary: `rgba(55,53,47,0.45)`
- Border: `rgba(55,53,47,0.09)`

**Linear**
- Page background: `#ffffff`
- Sidebar background: `#f4f4f5`
- Hover state: `#ececed`
- Active/selected: `#e4e4e7`
- Text primary: `#18181b`
- Text secondary: `#71717a`
- Text tertiary: `#a1a1aa`
- Border: `#e4e4e7`
- Accent: `#5e6ad2` (indigo-ish purple)

**Figma**
- Canvas background: `#1e1e1e` (canvas is dark, panels are light)
- Panel background: `#ffffff`
- Panel secondary: `#f5f5f5`
- Accent: `#a259ff` (purple)
- Text primary: `#1a1a1a`

### Dark Mode (Entertainment and Focus — Dominant)

**Spotify**
- Base: `#121212`
- Surface: `#181818`
- Elevated surface: `#282828`
- Accent: `#1db954` (green)
- Text primary: `#ffffff`
- Text secondary: `#a7a7a7`
- Text tertiary: `#6a6a6a`

**Things 3 (iOS Dark)**
- Base: `#1c1c1e` (iOS system background dark)
- Secondary: `#2c2c2e` (iOS secondary system background dark)
- Tertiary: `#3a3a3c` (iOS tertiary system background dark)
- Grouped secondary: `#1c1c1e`
- Text primary: `#ffffff`
- Text secondary: `rgba(235,235,245,0.6)`
- Separator: `rgba(84,84,88,0.65)`

### Accent Colors — Functional, Not Decorative

Accent colors in top-tier apps are single, purposeful, and used only for primary interactive elements (CTA buttons, active states, links, progress indicators).

- **Stripe**: `#635bff` (indigo-violet)
- **Linear**: `#5e6ad2` (violet-blue)
- **Figma**: `#a259ff` (purple)
- **Notion**: `#2eaadc` (blue, used sparingly)
- **Cash App**: `#00d64f` (green — brand-driven)
- **Robinhood**: `#00c805` (green — finance positive signal)
- **Mercury**: `#3b82f6` (blue — institutional trust)
- **Superhuman**: `#f43f5e` (rose — energetic)

Pattern: SaaS tools trend purple/indigo. Fintech trends blue or green. Social trends brand-specific. Single accent is the rule — secondary accent is rare, tertiary accent does not exist in premium apps.

## Spacing System

**iOS Human Interface Guidelines baseline:**
- Minimum touch target: 44pt × 44pt (44px × 44px at 1x, but screens are 2x–3x so physical size is still 44pt)
- Standard margin: 16pt (16px equivalent in web)
- Grid unit: 8pt (8px in web — the "8-point grid")
- Content padding: 16pt sides, 20pt top after navigation bar

**Translated to web (8px grid):**
```
4px   — gap between inline elements, small nudges
8px   — component internal padding (xs), gap between related items
12px  — component internal padding (sm)
16px  — standard content padding, gap between list items
20px  — section gap, card padding
24px  — large section gap
32px  — section separator
40px  — major section break
48px  — hero section padding
64px  — page-level section gap
```

**Tailwind mapping:**
```
4px  → p-1 / gap-1
8px  → p-2 / gap-2
12px → p-3 / gap-3
16px → p-4 / gap-4
20px → p-5 / gap-5
24px → p-6 / gap-6
32px → p-8 / gap-8
```

## Information Density

Density is not uniform across products — it is calibrated to the use case.

**Dense (productivity tools — Notion, Linear, Cron)**
- List item height: 28–36px
- Line height: 1.4 (tight for scannable content)
- Font size: 13–15px for secondary content
- Cards: minimal padding (12px), small border-radius (8px)
- Vertical rhythm: 4–8px between items
- Goal: display maximum information without scrolling

**Balanced (SaaS dashboards — Stripe, Mercury)**
- List item height: 40–48px
- Line height: 1.5
- Font size: 14–16px
- Cards: 16–20px padding, 12px border-radius
- Vertical rhythm: 8–12px between items
- Goal: clarity at moderate information density

**Sparse (editorial — Letterboxd, Pocket Casts)**
- List item height: 56–72px
- Line height: 1.6–1.7
- Font size: 16–18px
- Cards: 20–24px padding, 16px border-radius
- Vertical rhythm: 16–24px between items
- Goal: breathing room, reduced cognitive load, aesthetic pleasure

## Surface Hierarchy

### iOS Material System (native apps)
```
systemBackground          → white / #1c1c1e dark
secondarySystemBackground → #f2f2f7 / #2c2c2e dark
tertiarySystemBackground  → #ffffff / #3a3a3c dark
systemGroupedBackground   → #f2f2f7 / #1c1c1e dark
```

### Android Material 3 Surface System
```
surface         → #fffbfe
surfaceVariant  → #e7e0ec
surfaceContainer → #f3edf7
surfaceDim      → #ded8e1
surfaceBright   → #fef7ff
```

### Web Translation (light mode)
```
--surface-base:      #ffffff       /* page background */
--surface-raised:    #f9fafb       /* sidebar, secondary panels */
--surface-overlay:   #f3f4f6       /* hover backgrounds, inactive tabs */
--surface-card:      #ffffff       /* cards on base */
--surface-card-elevated: #ffffff   /* cards with shadow on raised surface */
--surface-inverse:   #111827       /* dark elements on light bg */
```

### Web Translation (dark mode)
```
--surface-base:      #0f0f0f       /* page background */
--surface-raised:    #1a1a1a       /* sidebar, panels */
--surface-overlay:   #222222       /* hover states */
--surface-card:      #1a1a1a       /* cards */
--surface-card-elevated: #222222   /* elevated cards */
--surface-inverse:   #f9fafb       /* light elements on dark bg */
```

## Card Specifications

### Standard Card (light mode)
```css
background: #ffffff;
border: 1px solid rgba(0, 0, 0, 0.08);
border-radius: 12px;
padding: 16px;
box-shadow: none;  /* border is sufficient */
```

### Elevated Card (light mode)
```css
background: #ffffff;
border: 1px solid rgba(0, 0, 0, 0.06);
border-radius: 12px;
padding: 16px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08);
```

### Interactive Card (hover state)
```css
/* Default */
background: #ffffff;
border: 1px solid rgba(0, 0, 0, 0.08);
border-radius: 12px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
transition: box-shadow 150ms ease, transform 150ms ease;

/* Hover */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);
transform: translateY(-1px);
```

### Dark Mode Card
```css
background: #1a1a1a;
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 12px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
```

### Border Radius Reference
```
4px  → sharp, data tables, code blocks
8px  → compact UI, tags, badges, form inputs
12px → standard cards, modals, sheets
16px → large cards, feature sections
24px → hero elements, marketing cards
9999px → pills, tags with text, fully rounded buttons
```
