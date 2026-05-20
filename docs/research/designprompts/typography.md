# DesignPrompts — Typography

## Documentation-Focused Typeface Selection

Design system documentation has two typeface roles: UI text (component labels, prose, navigation) and code/token display (monospace for all code samples, token names, and values).

### Primary Sans-Serif: Inter or System UI

Inter is the standard for design system documentation and product UIs. It was designed specifically for screen readability and closely mirrors SF Pro's metrics while being openly available.

```css
--font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont,
             'Segoe UI', Helvetica, Arial, sans-serif;
```

When Inter is not loaded, `system-ui` falls through to SF Pro on macOS/iOS, Segoe UI on Windows, and Roboto on Android — all acceptable alternatives.

Inter variable font allows a single font file to cover all weights:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
```

### Primary Monospace: JetBrains Mono or Fira Code

JetBrains Mono is the preferred monospace for technical documentation. Key characteristics:
- Increased letter height (125% of standard) for readability at small sizes
- Ligatures for common programming symbols (→, ===, ≤, ≥)
- Designed specifically for code — not adapted from a text typeface

```css
--font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code',
             'Courier New', monospace;
```

Fira Code is the acceptable alternative if JetBrains Mono is not loaded. It has similar metrics and excellent ligature support.

## Type Scale — Design System Standard

The design system type scale uses named tokens with explicit size and line-height pairs. Line height is always defined with size — never left to browser defaults (1.2 browser default is too tight for body text).

```css
/* === Text size tokens === */
--text-xs:   12px;    /* Caption, legal, meta labels */
--text-sm:   14px;    /* Secondary body, form labels, table cells */
--text-base: 16px;    /* Primary body text */
--text-lg:   18px;    /* Large body, lead paragraphs */
--text-xl:   20px;    /* Small headings, card titles */
--text-2xl:  24px;    /* Section headings */
--text-3xl:  30px;    /* Page headings */
--text-4xl:  36px;    /* Major section headings */
--text-5xl:  48px;    /* Hero subheadings */
--text-6xl:  60px;    /* Hero headings */
--text-7xl:  72px;    /* Display headings */
--text-8xl:  96px;    /* Oversized display (rare) */

/* === Line height tokens (paired with sizes) === */
/* Tight — headings, single-line display */
--leading-none:   1;
--leading-tight:  1.2;
--leading-snug:   1.25;

/* Normal — subheadings, mixed contexts */
--leading-normal: 1.333;
--leading-relaxed: 1.4;

/* Comfortable — body text */
--leading-loose:  1.5;
--leading-looser: 1.6;

/* Editorial — long-form reading */
--leading-editorial: 1.75;

/* === Standard size + line-height pairings === */
xs   (12px):  line-height 1.5   → 18px computed line height
sm   (14px):  line-height 1.5   → 21px
base (16px):  line-height 1.5   → 24px
lg   (18px):  line-height 1.5   → 27px
xl   (20px):  line-height 1.4   → 28px
2xl  (24px):  line-height 1.333 → 32px
3xl  (30px):  line-height 1.333 → 40px
4xl  (36px):  line-height 1.25  → 45px
5xl  (48px):  line-height 1.1   → 52.8px
6xl  (60px):  line-height 1.1   → 66px
7xl  (72px):  line-height 1     → 72px
8xl  (96px):  line-height 1     → 96px
```

## Component-Specific Typography

### Form Field Labels
Labels sit above inputs, not inside them. They identify the field at all times, including when the field is filled.

```css
/* Form label */
font-size: 14px;     /* --text-sm */
font-weight: 500;
line-height: 1.5;
letter-spacing: 0em;
color: var(--color-text);  /* #111827 */
margin-bottom: 6px;

/* Helper text (below input) */
font-size: 12px;     /* --text-xs */
font-weight: 400;
line-height: 1.5;
color: var(--color-text-secondary);  /* #6b7280 */
margin-top: 4px;

/* Error message (below input on error state) */
font-size: 12px;
font-weight: 400;
color: var(--color-destructive);     /* #dc2626 */
margin-top: 4px;
```

### Component Category Labels (Section Identifiers)
Used in sidebars, settings panels, and grouped lists to label a category of items.

```css
font-size: 11px;
font-weight: 600;
line-height: 1.5;
letter-spacing: 0.08em;
text-transform: uppercase;
color: var(--color-text-tertiary);   /* #9ca3af */
margin-bottom: 4px;
padding: 0 8px;
```

### Badge and Tag Typography
Badges display counts or status. Tags display categories. Both use compact, uppercase, tracked text.

```css
/* Count badge */
font-size: 10px;
font-weight: 700;
line-height: 1;
letter-spacing: 0.02em;
font-variant-numeric: tabular-nums;  /* ensures number width stability */

/* Status badge */
font-size: 11px;
font-weight: 600;
line-height: 1;
letter-spacing: 0.04em;
text-transform: uppercase;

/* Category tag */
font-size: 12px;
font-weight: 500;
line-height: 1;
letter-spacing: 0.02em;
```

### Code and Token Documentation
Token names, CSS values, and code snippets must use monospace consistently.

```css
/* Inline code (within prose) */
font-family: var(--font-mono);
font-size: 13px;         /* slightly smaller than surrounding prose */
font-weight: 400;
line-height: inherit;    /* follows surrounding line height */
background: rgba(0,0,0,0.06);
border: 1px solid rgba(0,0,0,0.08);
border-radius: 4px;
padding: 1px 5px;

/* Code block */
font-family: var(--font-mono);
font-size: 13px;
font-weight: 400;
line-height: 1.6;        /* code needs more space between lines */
tab-size: 2;             /* 2-space indentation */
```

### Navigation Typography
Top navigation links and sidebar navigation items use specific type settings:

```css
/* Top nav link */
font-size: 14px;
font-weight: 500;
line-height: 1;
letter-spacing: 0em;
color: var(--color-text-secondary);
/* Active: */
color: var(--color-text);
font-weight: 600;

/* Sidebar nav item */
font-size: 14px;
font-weight: 400;
line-height: 1;
color: var(--color-text-secondary);
/* Active: */
font-weight: 600;
color: var(--color-text);
/* or Active with accent: */
color: var(--color-primary);
background: var(--color-primary-subtle);
```

## Weight System

```css
--font-weight-thin:       100;
--font-weight-extralight: 200;
--font-weight-light:      300;
--font-weight-regular:    400;
--font-weight-medium:     500;
--font-weight-semibold:   600;
--font-weight-bold:       700;
--font-weight-extrabold:  800;
--font-weight-black:      900;
```

**Usage by context:**
- 400 regular: body text, descriptions, placeholder text, help text
- 500 medium: navigation labels (inactive), input text, table cell content
- 600 semibold: navigation labels (active), form labels, card titles, button text (sm/md), section headings
- 700 bold: page headings (h1–h2), numbers in stat cards, primary button text (lg), large display numbers
- 800+ extrabold: hero headings only, display type at 48px+, never in product UI

## Letter Spacing System

```css
--tracking-tighter:  -0.05em;   /* large display headings 48px+ */
--tracking-tight:    -0.025em;  /* headings 24px–48px */
--tracking-normal:    0em;      /* body text, default */
--tracking-wide:      0.025em;  /* labels, captions */
--tracking-wider:     0.05em;   /* uppercase labels, section headers */
--tracking-widest:    0.1em;    /* uppercase badges, fine print labels */
```

## Anti-Patterns (Never in Holocraft Outputs)

- Using font-weight 300 (light) for body text — poor rendering on non-Retina, insufficient contrast
- Setting `letter-spacing: -0.05em` on text below 24px — creates illegible tight text
- Using `text-transform: uppercase` on text above 14px — uncomfortable to read
- Mixing Inter with another sans-serif typeface in the same UI context
- Setting `line-height: 1` on multiline text — lines collide on ascenders/descenders
- Using font-size below 11px in any interactive or readable element
- Setting heading font-weight below 600 for any heading h1–h3
