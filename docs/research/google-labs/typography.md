# Google Labs: Typography

## Material Type Scale

The Material Type Scale is a 15-role system that covers every text context in an application. Each
role has fixed values for size, line height, weight, and letter spacing. These values are not
guidelines — they are the exact values used in Android, web, and all Google products.

### Complete Type Scale Reference

| Role | Size | Line Height | Weight | Letter Spacing |
|---|---|---|---|---|
| Display Large | 57px | 64px | 400 | -0.25px |
| Display Medium | 45px | 52px | 400 | 0px |
| Display Small | 36px | 44px | 400 | 0px |
| Headline Large | 32px | 40px | 400 | 0px |
| Headline Medium | 28px | 36px | 400 | 0px |
| Headline Small | 24px | 32px | 400 | 0px |
| Title Large | 22px | 28px | 400 | 0px |
| Title Medium | 16px | 24px | 500 | +0.15px |
| Title Small | 14px | 20px | 500 | +0.10px |
| Body Large | 16px | 24px | 400 | +0.50px |
| Body Medium | 14px | 20px | 400 | +0.25px |
| Body Small | 12px | 16px | 400 | +0.40px |
| Label Large | 14px | 20px | 500 | +0.10px |
| Label Medium | 12px | 16px | 500 | +0.50px |
| Label Small | 11px | 16px | 500 | +0.50px |

### CSS Custom Properties Implementation

```css
:root {
  /* Display */
  --md-sys-typescale-display-large-size: 57px;
  --md-sys-typescale-display-large-line-height: 64px;
  --md-sys-typescale-display-large-weight: 400;
  --md-sys-typescale-display-large-tracking: -0.25px;

  --md-sys-typescale-display-medium-size: 45px;
  --md-sys-typescale-display-medium-line-height: 52px;
  --md-sys-typescale-display-medium-weight: 400;
  --md-sys-typescale-display-medium-tracking: 0px;

  --md-sys-typescale-display-small-size: 36px;
  --md-sys-typescale-display-small-line-height: 44px;
  --md-sys-typescale-display-small-weight: 400;
  --md-sys-typescale-display-small-tracking: 0px;

  /* Headline */
  --md-sys-typescale-headline-large-size: 32px;
  --md-sys-typescale-headline-large-line-height: 40px;
  --md-sys-typescale-headline-large-weight: 400;

  --md-sys-typescale-headline-medium-size: 28px;
  --md-sys-typescale-headline-medium-line-height: 36px;
  --md-sys-typescale-headline-medium-weight: 400;

  --md-sys-typescale-headline-small-size: 24px;
  --md-sys-typescale-headline-small-line-height: 32px;
  --md-sys-typescale-headline-small-weight: 400;

  /* Title */
  --md-sys-typescale-title-large-size: 22px;
  --md-sys-typescale-title-large-line-height: 28px;
  --md-sys-typescale-title-large-weight: 400;

  --md-sys-typescale-title-medium-size: 16px;
  --md-sys-typescale-title-medium-line-height: 24px;
  --md-sys-typescale-title-medium-weight: 500;
  --md-sys-typescale-title-medium-tracking: 0.15px;

  --md-sys-typescale-title-small-size: 14px;
  --md-sys-typescale-title-small-line-height: 20px;
  --md-sys-typescale-title-small-weight: 500;
  --md-sys-typescale-title-small-tracking: 0.10px;

  /* Body */
  --md-sys-typescale-body-large-size: 16px;
  --md-sys-typescale-body-large-line-height: 24px;
  --md-sys-typescale-body-large-weight: 400;
  --md-sys-typescale-body-large-tracking: 0.50px;

  --md-sys-typescale-body-medium-size: 14px;
  --md-sys-typescale-body-medium-line-height: 20px;
  --md-sys-typescale-body-medium-weight: 400;
  --md-sys-typescale-body-medium-tracking: 0.25px;

  --md-sys-typescale-body-small-size: 12px;
  --md-sys-typescale-body-small-line-height: 16px;
  --md-sys-typescale-body-small-weight: 400;
  --md-sys-typescale-body-small-tracking: 0.40px;

  /* Label */
  --md-sys-typescale-label-large-size: 14px;
  --md-sys-typescale-label-large-line-height: 20px;
  --md-sys-typescale-label-large-weight: 500;
  --md-sys-typescale-label-large-tracking: 0.10px;

  --md-sys-typescale-label-medium-size: 12px;
  --md-sys-typescale-label-medium-line-height: 16px;
  --md-sys-typescale-label-medium-weight: 500;
  --md-sys-typescale-label-medium-tracking: 0.50px;

  --md-sys-typescale-label-small-size: 11px;
  --md-sys-typescale-label-small-line-height: 16px;
  --md-sys-typescale-label-small-weight: 500;
  --md-sys-typescale-label-small-tracking: 0.50px;
}
```

### Tailwind CSS v4 Mapping

In a Tailwind v4 project, map the Material Type Scale to Tailwind tokens in `@theme`:

```css
@theme {
  --font-size-display-lg: 57px;
  --line-height-display-lg: 64px;
  --font-size-display-md: 45px;
  --line-height-display-md: 52px;
  --font-size-display-sm: 36px;
  --line-height-display-sm: 44px;
  --font-size-headline-lg: 32px;
  --line-height-headline-lg: 40px;
  --font-size-headline-md: 28px;
  --line-height-headline-md: 36px;
  --font-size-headline-sm: 24px;
  --line-height-headline-sm: 32px;
  --font-size-title-lg: 22px;
  --line-height-title-lg: 28px;
  --font-size-title-md: 16px;
  --line-height-title-md: 24px;
  --font-size-title-sm: 14px;
  --line-height-title-sm: 20px;
  --font-size-body-lg: 16px;
  --line-height-body-lg: 24px;
  --font-size-body-md: 14px;
  --line-height-body-md: 20px;
  --font-size-body-sm: 12px;
  --line-height-body-sm: 16px;
  --font-size-label-lg: 14px;
  --line-height-label-lg: 20px;
  --font-size-label-md: 12px;
  --line-height-label-md: 16px;
  --font-size-label-sm: 11px;
  --line-height-label-sm: 16px;
}
```

## Default Typefaces

### Roboto (Android and general web)

Roboto is the default M3 typeface. It is available from Google Fonts and as a system font on Android.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
```

```css
:root {
  --md-sys-typescale-plain-font: 'Roboto', sans-serif;
  --md-sys-typescale-brand-font: 'Roboto', sans-serif;
}
```

### Google Sans (Product sites, Google-branded experiences)

Google Sans is used on consumer-facing Google products (Pixel, Workspace, AI Studio). It has a
slightly more rounded, warmer character than Roboto. Available via Google Fonts as `Plus Jakarta Sans`
(closest public equivalent) or directly on internal/Google-hosted sites.

For Google I/O and labs.google specifically, the Display and Headline scales use Google Sans Display,
a high-contrast display-weight variant.

### Typeface Assignment by Scale Role

| Scale Range | Typeface | Rationale |
|---|---|---|
| Display Large/Medium/Small | Google Sans Display (or Roboto) | Hero text, marketing moments |
| Headline Large → Small | Google Sans (or Roboto) | Section headers, card titles |
| Title Large → Small | Roboto | UI labels, navigation, modal headers |
| Body Large → Small | Roboto | Paragraph text, descriptions |
| Label Large → Small | Roboto | Button labels, captions, chips |

## Type Scale Usage Map

### When to Use Each Role

**Display** — Hero sections only. Full-bleed landing screens, splash pages. Never in scrollable
content lists. Max 1–2 instances per page.

**Headline Large** — Page titles, primary section headers. Equivalent to H1/H2.

**Headline Medium** — Secondary section headers, card group titles. Equivalent to H2/H3.

**Headline Small** — Tertiary headers, list group labels when elevated. H3/H4 equivalent.

**Title Large** — App bar titles, dialog titles, primary card text.

**Title Medium** — List item primary text, settings item labels, navigation labels.

**Title Small** — List item secondary metadata, sub-labels.

**Body Large** — Primary body copy, form field input text (16px for readability and iOS zoom prevention).

**Body Medium** — Secondary body copy, descriptions, tooltips.

**Body Small** — Captions, supplementary information, timestamps.

**Label Large** — Button labels (40px height buttons), prominent interactive labels.

**Label Medium** — Chip labels, tab labels, smaller button labels.

**Label Small** — Badge text, tiny metadata, data table cell content.

## Variable Font Optimization

For performance, use the variable font versions:

```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100..900&display=swap" rel="stylesheet">
```

```css
/* Subset only the weights you need at each scale */
@font-face {
  font-family: 'Roboto';
  font-weight: 400;
  /* Body, Display */
  font-display: swap;
}
@font-face {
  font-family: 'Roboto';
  font-weight: 500;
  /* Title, Label */
  font-display: swap;
}
```

## Responsive Type Behavior

Display and Headline sizes scale down on compact (mobile) viewports:

| Role | Desktop | Mobile (Compact) |
|---|---|---|
| Display Large | 57px / 64px | 45px / 52px (drops to Display Medium) |
| Display Medium | 45px / 52px | 36px / 44px (drops to Display Small) |
| Headline Large | 32px / 40px | 28px / 36px |
| Headline Medium | 28px / 36px | 24px / 32px |

Title, Body, and Label scales remain constant across breakpoints — they are already sized for
mobile contexts.

```css
@media (max-width: 599px) {
  .display-large {
    font-size: 45px;
    line-height: 52px;
  }
  .display-medium {
    font-size: 36px;
    line-height: 44px;
  }
  .headline-large {
    font-size: 28px;
    line-height: 36px;
  }
}
```
