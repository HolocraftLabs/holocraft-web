# BootstrapMade — Typography

## Font Stack Patterns

### Most Common Combinations
BootstrapMade templates almost universally use Google Fonts. The dominant combinations:

**Combination 1 (Classic business)**
- Heading: `Raleway`, weights 400/600/700
- Body: `Open Sans`, weights 400/600
- Import: `https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Raleway:wght@400;600;700&display=swap`

**Combination 2 (Modern clean)**
- Heading: `Poppins`, weights 400/600/700
- Body: `Open Sans`, weights 400/600
- Import: `https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Poppins:wght@400;600;700&display=swap`

**Combination 3 (Friendly/approachable)**
- Heading: `Nunito`, weights 600/700/800
- Body: `Nunito`, weights 400/600
- Import: `https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap`

**Combination 4 (Tech/SaaS)**
- Heading: `Jost`, weights 500/600/700
- Body: `Roboto`, weights 300/400
- Import: `https://fonts.googleapis.com/css2?family=Jost:wght@500;600;700&family=Roboto:wght@300;400&display=swap`

### System Fallbacks
```css
font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

## Type Scale

### Heading Sizes (Desktop)
All headings use the heading font (Raleway, Poppins, etc.):

```css
h1 {
  font-size: 48px;      /* 3rem */
  font-weight: 700;
  line-height: 1.2;
  color: #212529;
}

h2 {
  font-size: 36px;      /* 2.25rem */
  font-weight: 700;
  line-height: 1.3;
  color: #212529;
}

h3 {
  font-size: 24px;      /* 1.5rem */
  font-weight: 600;
  line-height: 1.4;
  color: #212529;
}

h4 {
  font-size: 20px;      /* 1.25rem */
  font-weight: 600;
  line-height: 1.4;
  color: #212529;
}

h5 {
  font-size: 18px;      /* 1.125rem */
  font-weight: 600;
  line-height: 1.5;
  color: #212529;
}

h6 {
  font-size: 16px;      /* 1rem */
  font-weight: 600;
  line-height: 1.5;
  color: #212529;
}
```

### Responsive Heading Reduction
On mobile (`max-width: 768px`):
- h1: 36px → 32px
- h2: 36px → 28px
- h3: 24px → 20px

### Body Text
```css
body {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;        /* 1rem — never go below this for body */
  font-weight: 400;
  line-height: 1.6;       /* critical for readability */
  color: #555555;         /* or #666666 — slightly lighter than headings */
}

p {
  margin-bottom: 1rem;    /* 16px */
}
```

### Lead/Subtitle Text
```css
.lead {
  font-size: 18px;        /* 1.125rem */
  font-weight: 400;
  line-height: 1.7;
  color: #555555;
}
```
Used as hero subtitle, section subtitle below h2.

## Section Heading Pattern

Every content section uses this exact structure:

```html
<!-- Optional label above heading -->
<p class="section-label">OUR SERVICES</p>

<!-- Main heading -->
<h2>What We Do Best</h2>

<!-- Colored underline divider -->
<div class="section-divider"></div>

<!-- Section subtitle -->
<p class="section-subtitle">
  A brief description of this section, two sentences maximum, centered,
  explaining what the user will find below.
</p>
```

```css
.section-label {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #3498db;           /* primary color */
  margin-bottom: 8px;
}

h2 {
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  color: #212529;
  margin-bottom: 12px;
}

.section-divider {
  width: 40px;
  height: 2px;
  background-color: #3498db;   /* primary color */
  margin: 0 auto 20px;
}

.section-subtitle {
  font-size: 16px;
  line-height: 1.7;
  color: #555555;
  text-align: center;
  max-width: 720px;
  margin: 0 auto 40px;
}
```

This pattern is **structurally sound but visually exhausted**. Holocraft should extract the function (three-tier hierarchy: label → heading → subtitle) and redesign the visual execution entirely.

## Button Typography

```css
.btn {
  font-family: 'Open Sans', sans-serif;   /* body font, not heading font */
  font-size: 14px;                         /* or 15px */
  font-weight: 600;
  letter-spacing: 0.05em;                  /* subtle tracking */
  text-transform: uppercase;               /* optional, used in ~40% of templates */
  line-height: 1;
}

/* Non-uppercase variant (increasingly common in newer templates) */
.btn-modern {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: none;
}
```

## Navigation Typography

```css
.navbar-nav .nav-link {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #212529;            /* dark on white nav */
  /* or #ffffff on transparent hero nav */
}

.navbar-nav .nav-link:hover,
.navbar-nav .nav-link.active {
  color: #3498db;            /* primary color */
}
```

## Card Typography Hierarchy

```css
/* Icon or image: no typography */

.card-title {
  font-size: 20px;           /* h4 size */
  font-weight: 600;
  color: #212529;
  margin-bottom: 12px;
}

.card-body-text {
  font-size: 15px;           /* slightly smaller than body */
  line-height: 1.6;
  color: #666666;
  margin-bottom: 0;
}

.card-link {
  font-size: 14px;
  font-weight: 600;
  color: #3498db;
  text-decoration: none;
  letter-spacing: 0.03em;
}
```

## Testimonial Typography

```css
.testimonial-quote {
  font-size: 16px;
  font-style: italic;
  line-height: 1.8;
  color: #555555;
  margin-bottom: 20px;
}

/* Opening quote mark — decorative */
.testimonial-quote::before {
  content: '\201C';
  font-size: 60px;
  font-family: Georgia, serif;
  color: #3498db;
  line-height: 0;
  vertical-align: -24px;
  margin-right: 4px;
}

.testimonial-author {
  font-size: 15px;
  font-weight: 700;
  color: #212529;
}

.testimonial-role {
  font-size: 14px;
  color: #888888;
}
```

## Footer Typography

```css
.footer-heading {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

.footer-link {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 2.2;           /* generous line height in link lists */
  text-decoration: none;
}

.footer-link:hover {
  color: #ffffff;
}

.footer-copyright {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
}
```

## What Holocraft Takes From This

- **The scale rationale**: h1 48px → h2 36px → h3 24px → h4 20px → body 16px is a proven readable hierarchy. Preserve the relative scale relationships even when absolute sizes increase.
- **The 1.6–1.8 line-height standard**: Never drop body text below 1.6 line-height. For long-form (case studies, about pages), 1.8 is better.
- **Label typography**: `font-size: 12-14px; letter-spacing: 0.12-0.15em; text-transform: uppercase; font-weight: 700` — this pattern works universally as a section preamble.
- **Max-width for readable text**: `max-width: 720px` for centered body copy (2-column equivalent). Never let a centered paragraph span the full container width.
