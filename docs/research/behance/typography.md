# Behance — Typography

## Platform UI Typography

### System Font Stack
Behance's platform interface uses system fonts — deliberately avoiding any distinctive typographic personality that would compete with the work displayed:

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
             'Helvetica Neue', Arial, sans-serif;
```

The effect: platform chrome is typographically invisible. Navigation, labels, stats — all in neutral, immediately readable system fonts that defer to the content.

### Platform UI Scale
- **Navigation items**: `14px`, `font-weight: 600`, `color: #1d1d1d`
- **Project titles (in feed)**: `14px`, `font-weight: 600`, `color: #1d1d1d`, truncated to 2 lines
- **Owner names**: `13px`, `font-weight: 400`, `color: #5e5e5e`
- **Stats/counts**: `13px`, `font-weight: 600`, `color: #1d1d1d` (the count), `font-weight: 400 color: #5e5e5e` (the label)
- **Tags/categories**: `12px`, `font-weight: 500`, `color: #1769ff` (platform blue), uppercase
- **Button text**: `14px`, `font-weight: 700`, `letter-spacing: 0.02em`

## Project Page Typography

Individual Behance projects are designer-controlled. The patterns in highest-rated work:

### Hero / Title Treatment
When a project uses large display type in its hero:
```css
.project-hero-title {
  font-size: clamp(48px, 8vw, 96px);    /* 48px min, 96px max */
  font-weight: 700-900;                  /* bold to black weight */
  line-height: 1.0-1.1;                 /* tight for display sizes */
  letter-spacing: -0.02em to -0.04em;   /* negative tracking at display sizes */
  color: #1d1d1d;                        /* dark on light bg */
  /* or */
  color: #ffffff;                        /* white on dark bg */
}
```

Common display fonts in top Behance work (not prescriptive — designer's choice):
- **Editorial**: `GT Walsheim`, `Neue Haas Grotesk`, `Aktiv Grotesk`
- **Geometric**: `Circular`, `Euclid Circular A/B`, `DM Sans`
- **Classic**: `Helvetica Neue`, `Inter` (at large sizes)
- **High-contrast serif**: `Canela`, `Playfair Display`, `Freight Display` — for luxury/editorial work
- **Variable fonts**: increasingly common, allowing weight animation and responsive sizing

### Subtitle / Tagline
```css
.project-subtitle {
  font-size: 18px-24px;
  font-weight: 300-400;      /* light or regular — contrast with heavy headline */
  line-height: 1.5;
  color: #5e5e5e;            /* secondary text on white */
  /* or */
  color: rgba(255,255,255,0.7); /* on dark backgrounds */
}
```

### Case Study Body Copy
The most important typographic decision in a case study: body text that is actually comfortable to read.

```css
.case-study-body {
  font-family: 'Inter', system-ui, sans-serif;   /* or designer's chosen font */
  font-size: 17px-18px;           /* slightly above standard — signals care */
  font-weight: 400;
  line-height: 1.8;               /* critical: 1.8 minimum for case study copy */
  color: #1d1d1d;                 /* on white */
  max-width: 680px;               /* CRITICAL: never full-width for body text */
  /* max-width: 720px is BootstrapMade standard, 680px feels more editorial */
}

p + p {
  margin-top: 1.2em;             /* generous paragraph spacing */
}
```

The `max-width: 680px` column creates an optimal 65-75 characters per line — the typographic standard for comfortable reading.

### Section Headings in Case Studies
Not the BootstrapMade centered h2 pattern. In editorial-quality case studies, headings are:

```css
.case-section-heading {
  font-size: 28px-36px;
  font-weight: 700;
  line-height: 1.2;
  color: #1d1d1d;
  margin-bottom: 20px;
  /* Left-aligned, not centered */
  text-align: left;
}
```

Some projects use a thin colored border-left as a heading marker:
```css
.case-section-heading {
  border-left: 3px solid #1769ff;   /* or brand color */
  padding-left: 20px;
}
```

## Label System

The label system is one of the most transferable typographic patterns from Behance to Holocraft's generated sites:

```css
/* Project type, year, role, tools */
.metadata-label {
  font-size: 11px-12px;
  font-weight: 600-700;
  letter-spacing: 0.12em-0.15em;
  text-transform: uppercase;
  color: #9c9c9c;              /* muted, clearly secondary */
}

/* Metadata value (the actual content) */
.metadata-value {
  font-size: 14px-15px;
  font-weight: 500;
  color: #1d1d1d;
}
```

### Metadata Row Layout
```html
<div class="project-metadata">
  <div class="meta-item">
    <span class="metadata-label">CLIENT</span>
    <span class="metadata-value">Acme Corporation</span>
  </div>
  <div class="meta-item">
    <span class="metadata-label">ROLE</span>
    <span class="metadata-value">UI/UX Designer</span>
  </div>
  <div class="meta-item">
    <span class="metadata-label">YEAR</span>
    <span class="metadata-value">2024</span>
  </div>
  <div class="meta-item">
    <span class="metadata-label">TOOLS</span>
    <span class="metadata-value">Figma, After Effects</span>
  </div>
</div>
```

```css
.project-metadata {
  display: flex;
  gap: 48px;
  flex-wrap: wrap;
  margin-top: 32px;
  padding-top: 32px;
  border-top: 1px solid #e7e7e7;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
```

## Image Captions

```css
.image-caption {
  font-size: 13px;
  font-style: italic;
  font-weight: 400;
  color: #9c9c9c;               /* muted — clearly subordinate to image */
  margin-top: 12px;
  line-height: 1.5;
  text-align: center;           /* for full-width images */
  /* OR */
  text-align: left;             /* for inline images with adjacent text */
}
```

Captions are optional. Many top Behance projects omit them entirely — the images are self-explanatory.

## Project Feed Card Typography

```css
/* Project title in grid */
.project-card-title {
  font-size: 14px;
  font-weight: 600;
  color: #1d1d1d;
  line-height: 1.4;
  margin-top: 10px;
  /* Truncate to 2 lines */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Author name */
.project-card-author {
  font-size: 13px;
  font-weight: 400;
  color: #5e5e5e;
  margin-top: 4px;
}

/* Tool tags */
.project-card-tag {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1769ff;
  padding: 3px 8px;
  border: 1px solid #1769ff;
  border-radius: 2px;
  display: inline-block;
}
```

## What Holocraft Takes From This

- **The label system** (`text-xs tracking-[0.12em] uppercase font-semibold text-slate-500`) is universally applicable for metadata, section labels, eyebrow text, badge text
- **The 680px body text column** — enforce this constraint in all case study and editorial sections. Maximum 720px.
- **The 1.8 line-height** for case study / editorial body copy. Standard blog/body is 1.6; editorial is 1.8.
- **Tight negative tracking at display sizes** — at 64px+, use `letter-spacing: -0.03em`. At 48px, use `-0.02em`. At 32px, use `-0.01em`. At body sizes, zero or slightly positive.
- **The contrast pair**: heavy heading + light body weight. If heading is 800 weight, body is 400. If heading is 700, consider 300 for subtitle.
- **Heading left-alignment in content** — centered headings feel like marketing. Left-aligned headings feel like editorial. Portfolio/case study content should be left-aligned.
