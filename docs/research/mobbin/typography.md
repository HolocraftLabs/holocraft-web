# Mobbin — Typography

## Native Typefaces

### iOS: SF Pro Family
Apple's San Francisco typeface is the foundation of every iOS app. It is not available on web but defines the standard that web typography must match.

- **SF Pro Display** — used for headings above 20pt. Has looser tracking at large sizes, optical size adjusted.
- **SF Pro Text** — used for body text below 20pt. Tighter tracking, optimized for readability at small sizes.
- **SF Mono** — used for code, data values, timestamps, version numbers. Fixed-width, available on macOS but not on web.
- **SF Pro Rounded** — used for friendly/consumer contexts (Memoji, kids apps). Not relevant to Holocraft.

### Android: Google Sans and Roboto
- **Google Sans** — used in first-party Google apps (Google Maps, Gmail, Drive). Slightly more rounded than Roboto.
- **Roboto** — Android system default. Clean, neutral, wide character support.
- **Roboto Mono** — monospace equivalent for data and code display.

## Web Equivalents

| Native | Web Equivalent | Source |
|--------|---------------|--------|
| SF Pro Display/Text | Inter | Google Fonts / Bunny Fonts |
| SF Pro Text | system-ui, -apple-system | System font stack |
| SF Mono | JetBrains Mono | Google Fonts |
| SF Mono | Fira Code | Google Fonts |
| Google Sans | Inter | Google Fonts |
| Roboto | Roboto | Google Fonts |

**Recommended Holocraft font stack:**
```css
--font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
```

Inter at weight 400 matches SF Pro Text at Regular. Inter at weight 600 matches SF Pro Semibold. Inter variable font (wght 100–900) covers the full range with a single font file.

## Type Scale — iOS HIG

The iOS Human Interface Guidelines define a named type scale used consistently across all Apple apps. Mobbin documents that every premium iOS app follows this scale exactly.

| Style | Size (pt) | Weight | Tracking |
|-------|-----------|--------|----------|
| Large Title | 34pt | Bold (700) | +0.37pt |
| Title 1 | 28pt | Bold (700) | +0.36pt |
| Title 2 | 22pt | Bold (700) | +0.35pt |
| Title 3 | 20pt | Semibold (600) | +0.38pt |
| Headline | 17pt | Semibold (600) | -0.43pt |
| Body | 17pt | Regular (400) | -0.43pt |
| Callout | 16pt | Regular (400) | -0.32pt |
| Subheadline | 15pt | Regular (400) | -0.23pt |
| Footnote | 13pt | Regular (400) | -0.08pt |
| Caption 1 | 12pt | Regular (400) | 0pt |
| Caption 2 | 11pt | Regular (400) | +0.07pt |

**Web translation (1pt ≈ 1px at standard screen density):**
```css
--text-large-title: 34px;   /* Hero headings */
--text-title-1: 28px;       /* Page titles */
--text-title-2: 22px;       /* Section headings */
--text-title-3: 20px;       /* Subsection headings */
--text-headline: 17px;      /* List row headings, emphasized body */
--text-body: 17px;          /* Primary body text */
--text-callout: 16px;       /* Secondary body, descriptions */
--text-subheadline: 15px;   /* Supporting text */
--text-footnote: 13px;      /* Legal, metadata, timestamps */
--text-caption-1: 12px;     /* Image captions, labels */
--text-caption-2: 11px;     /* Smallest readable text, badges */
```

## Weight Usage — Observed Patterns

From Mobbin's catalog of premium apps, weight usage follows strict conventions:

**Regular (400)** — Body text, descriptions, secondary content, list row subtitles  
**Medium (500)** — Slightly emphasized body text, navigation labels (inactive state)  
**Semibold (600)** — Labels, active navigation items, form field labels, button text (md size), list row titles  
**Bold (700)** — Page headings (Title 1–2), large numbers in dashboards, primary CTA button text (lg size)  
**Extrabold (800)** — Hero headlines in marketing sections only  
**Black (900)** — Rare; display-only at very large sizes (48px+) in consumer apps  

No premium utility, productivity, or fintech app uses decorative or display fonts anywhere in the product UI. Legibility is the only typographic goal.

## Line Height — Observed Standards

```css
/* Tight — headings, data, compact UI */
line-height: 1.2;  /* 34px text = 41px line height */
line-height: 1.25; /* 28px text = 35px line height */

/* Normal — subheadings, emphasized content */
line-height: 1.333; /* 24px text = 32px line height */
line-height: 1.4;   /* 20px text = 28px line height */

/* Comfortable — body text, descriptions */
line-height: 1.5;   /* 16–17px text = 24–25.5px line height */

/* Loose — long-form reading, documentation */
line-height: 1.6;   /* 16px text = 25.6px line height */
line-height: 1.75;  /* editorial/blog body */
```

## Letter Spacing — Observed Standards

```css
/* Large headings: slightly negative tracking (tight, modern) */
letter-spacing: -0.02em;  /* 34–48px text */
letter-spacing: -0.01em;  /* 22–28px text */

/* Body: no adjustment */
letter-spacing: 0em;      /* 15–17px text */

/* Captions and labels: zero or very slightly positive */
letter-spacing: 0em;      /* 12–13px text */

/* Uppercase labels: wide tracking (standard for small caps) */
letter-spacing: 0.08em;   /* 10–12px uppercase labels */
letter-spacing: 0.1em;    /* badges, status chips in uppercase */
```

## Component Label Typography

Labels for form fields, section headers in lists, and tag/badge text follow a consistent pattern across all Mobbin apps:

```css
/* Form field label */
font-size: 13px;
font-weight: 600;
line-height: 1.4;
letter-spacing: 0em;
color: rgba(0, 0, 0, 0.65);  /* secondary text */

/* Section header (above list) */
font-size: 12px;
font-weight: 600;
line-height: 1.5;
letter-spacing: 0.05em;
text-transform: uppercase;
color: rgba(0, 0, 0, 0.45);  /* tertiary text */

/* Badge / status chip */
font-size: 11px;
font-weight: 600;
line-height: 1;
letter-spacing: 0.04em;
text-transform: uppercase;
```

## Monospace Usage

Monospace type signals: code, data values, IDs, version numbers, timestamps, terminal output, API keys.

```css
/* Data value — dashboard numbers */
font-family: var(--font-mono);
font-size: 14px;
font-weight: 400;
letter-spacing: -0.01em;  /* monospace is naturally wide, tighten slightly */

/* Code block */
font-family: var(--font-mono);
font-size: 13px;
font-weight: 400;
line-height: 1.6;  /* code needs more breathing room */
```

## Observed Anti-Patterns (Never Use in Holocraft Outputs)

- Multiple typeface families in a single product UI (one sans + one mono only)
- Font weight below 400 (300 light) in body or UI text — poor readability on OLED/retina
- All-caps for body text or headings — only for 10–13px labels
- Decorative or serif fonts in productivity/utility/fintech UI
- Line height below 1.2 for anything but single-line display numbers
- Font sizes below 11px in any interactive element
- Letter spacing above 0.15em (looks amateurish at UI scale)
