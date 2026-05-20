# MDX Typography System

## Font Families

### Primary Display Font
**Inter** is the most common choice for MDX-class SaaS sites. It is a geometric sans-serif designed for screens, with excellent weight range and legibility at large sizes.

Alternatives in order of appropriateness:
- **Neue Haas Grotesk** — more premium, slightly compressed, excellent at 800–900 weight
- **Geist** (Vercel) — modern geometric sans, excellent for developer-tool contexts
- **Sohne** (Klim) — warm geometric, less sterile than Inter
- **PP Neue Montreal** — contemporary geometric, popular in 2024–2025 MDX-class work

**Never use:** Helvetica Neue (too generic), Roboto (too Android), system-ui for display (inconsistent)

### Loading Strategy
```html
<!-- Preload critical font weights -->
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
```

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-var.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-display: swap;
  font-style: normal;
}
```

## Type Scale

### Desktop Scale
| Token | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| `display-xl` | 96px | 800 | 1.0 | -0.04em | Hero headline, max impact |
| `display-lg` | 88px | 800 | 1.0 | -0.04em | Hero headline, standard |
| `display-md` | 72px | 700 | 1.05 | -0.03em | Hero on smaller viewports |
| `heading-xl` | 56px | 700 | 1.1 | -0.02em | Section headings |
| `heading-lg` | 40px | 700 | 1.15 | -0.02em | Feature headings |
| `heading-md` | 28px | 600 | 1.2 | -0.01em | Card headings |
| `heading-sm` | 20px | 600 | 1.3 | 0em | Subheadings |
| `body-lg` | 18px | 400 | 1.7 | 0em | Hero subtext, lead copy |
| `body-md` | 16px | 400 | 1.65 | 0em | Standard body |
| `body-sm` | 14px | 400 | 1.6 | 0em | Secondary body, captions |
| `label` | 12px | 500 | 1.5 | 0.10em | Section labels, tags |
| `label-sm` | 11px | 500 | 1.5 | 0.12em | Footnotes, metadata |

### Mobile Scale
| Token | Desktop Size | Mobile Size | Notes |
|-------|-------------|------------|-------|
| `display-xl` | 96px | 48px | Halved |
| `display-lg` | 88px | 44px | Halved |
| `display-md` | 72px | 40px | Slightly smaller |
| `heading-xl` | 56px | 32px | |
| `heading-lg` | 40px | 28px | |
| Body unchanged | 16-18px | 16-18px | Never reduce body on mobile |

### Fluid Sizing (Preferred for hero)
```css
/* Hero headline — fluid between mobile and desktop */
.hero-heading {
  font-size: clamp(44px, 7vw, 96px);
  font-weight: 800;
  line-height: 1.0;
  letter-spacing: -0.04em;
}

/* Section heading — fluid */
.section-heading {
  font-size: clamp(32px, 4vw, 56px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}
```

## Display Typography

### Hero Headline Construction
The MDX hero headline almost always follows this structure:
1. A regular-weight first line (slightly dimmer, #9999aa)
2. A heavy-weight second line (white, full impact)
3. The final word or phrase in gradient text

```jsx
// Hero headline pattern
<h1 className="text-[88px] font-[800] leading-[1.0] tracking-[-0.04em]">
  <span className="block text-[#9999aa] font-[400] text-[20px] tracking-[0.1em] uppercase mb-4">
    Introducing
  </span>
  <span className="block text-white">
    Build faster with
  </span>
  <span className="block bg-gradient-to-r from-[#4f9eff] to-[#8b5cf6] bg-clip-text text-transparent">
    intelligent tools
  </span>
</h1>
```

### Gradient Text Technique
```css
/* The gradient text recipe */
.gradient-text {
  background: linear-gradient(135deg, #4f9eff 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent; /* Fallback */
}
```

**Tailwind v3:**
```html
<span class="bg-gradient-to-r from-[#4f9eff] to-[#8b5cf6] bg-clip-text text-transparent">
  gradient word
</span>
```

**Tailwind v4:**
```html
<span class="text-gradient" style="--tw-gradient-from: #4f9eff; --tw-gradient-to: #8b5cf6;">
  gradient word
</span>
```

### Weight Contrast
The MDX headline often uses weight contrast within the same size:

```css
/* Light intro word + heavy main word */
.headline-light { font-weight: 300; color: #666680; }
.headline-heavy { font-weight: 800; color: #ffffff; }
```

## Body Typography

### Subheadline
```css
.hero-subtext {
  font-size: 18px;
  font-weight: 400;
  line-height: 1.7;
  color: #9999aa;
  max-width: 560px;
  margin: 0 auto; /* Center-aligned hero subtext */
}
```

### Feature Body
```css
.feature-body {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.65;
  color: #9999aa;
}
```

### Paragraph Spacing
- Between paragraphs: `1em` (same as font-size)
- First paragraph after heading: `16px`
- Paragraph max-width: always constrained to `56–65ch` (560–640px at 16px)

## Label / Section Tag Typography

MDX sites always precede section headings with a small label/eyebrow text. This creates visual hierarchy and communicates the section's role before the heading.

```jsx
// Section label pattern
<div className="flex items-center gap-2 mb-4">
  <div className="w-4 h-px bg-[#4f9eff]" />
  <span className="text-[11px] font-[500] tracking-[0.12em] uppercase text-[#4f9eff]">
    Features
  </span>
</div>
<h2 className="text-[56px] font-[700] tracking-[-0.02em] text-white leading-[1.1]">
  Everything you need
</h2>
```

Label styles:
```css
.section-label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #4f9eff;
}
```

## Navigation Typography

```css
.nav-link {
  font-size: 14px;
  font-weight: 450; /* Inter optical size */
  letter-spacing: 0em;
  color: #9999aa;
  transition: color 200ms ease;
}

.nav-link:hover {
  color: #ffffff;
}

.nav-cta {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0em;
}
```

## Code/Technical Typography

For SaaS developer tools, code snippets appear in hero or feature sections:

```css
.code-block {
  font-family: 'Geist Mono', 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #e8e8f0;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
  padding: 16px 20px;
}

/* Syntax highlight colors for dark theme */
.token-keyword { color: #8b5cf6; }
.token-string { color: #06b6d4; }
.token-function { color: #4f9eff; }
.token-comment { color: #444455; }
.token-number { color: #22d3ee; }
```

## Tailwind Typography Utility Reference

```css
/* Common MDX text classes */
text-[88px]           /* 88px display */
text-[72px]           /* 72px display mobile */
text-[56px]           /* 56px section heading */
font-[800]            /* Weight 800 */
font-[700]            /* Weight 700 */
leading-[1.0]         /* 1.0 line height for display */
leading-[1.1]         /* 1.1 for section headings */
leading-[1.65]        /* 1.65 for body */
tracking-[-0.04em]    /* -0.04em for display */
tracking-[-0.02em]    /* -0.02em for headings */
tracking-[0.10em]     /* 0.10em for labels */
text-white            /* #ffffff */
text-[#9999aa]        /* Secondary text */
text-[#666680]        /* Tertiary text */
```
