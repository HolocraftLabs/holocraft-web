# DesignPrompts — Visual DNA

## Design System Documentation Aesthetic

Design system documentation has its own visual language — it must be visually neutral enough to showcase components without competing with them, but structured enough to communicate hierarchy in dense technical content.

**Background:** White (`#ffffff`) for light mode, near-black (`#0a0a0a` or `#111111`) for dark mode. No colored backgrounds in documentation pages — components need neutral staging.

**Grid:** 12-column, 24px gutters, 24px outer margin. Component showcases use 8-column center column; code and token tables use full 12-column.

**Monospace prevalence:** Code, token names, and values always render in a monospace font. The visual contrast between sans-serif prose and monospace values is a functional signal: "this is a value you can copy and use."

## Color Token Architecture

The three-tier token system is the foundational pattern from DesignPrompts. It is not optional — it is the architecture that makes theming, dark mode, and component-level overrides possible without CSS specificity conflicts.

### Tier 1: Primitive Tokens (Raw Values)

Primitives are the complete color palette — every color value in the system. No semantic meaning. Only referenced by semantic tokens, never by components directly.

```css
/* Blue scale — full 11-step palette */
--blue-50:  #eff6ff;
--blue-100: #dbeafe;
--blue-200: #bfdbfe;
--blue-300: #93c5fd;
--blue-400: #60a5fa;
--blue-500: #3b82f6;
--blue-600: #2563eb;
--blue-700: #1d4ed8;
--blue-800: #1e40af;
--blue-900: #1e3a8a;
--blue-950: #172554;

/* Gray scale */
--gray-50:  #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-300: #d1d5db;
--gray-400: #9ca3af;
--gray-500: #6b7280;
--gray-600: #4b5563;
--gray-700: #374151;
--gray-800: #1f2937;
--gray-900: #111827;
--gray-950: #030712;

/* Green scale */
--green-50:  #f0fdf4;
--green-500: #22c55e;
--green-600: #16a34a;

/* Red scale */
--red-50:   #fef2f2;
--red-500:  #ef4444;
--red-600:  #dc2626;

/* Yellow/Amber scale */
--amber-50:  #fffbeb;
--amber-500: #f59e0b;
--amber-600: #d97706;
```

### Tier 2: Semantic Tokens (Purpose-Named)

Semantics assign meaning to primitives. These are what components reference. Theme switching (light/dark) happens here — the component never needs to know which theme is active.

```css
:root {
  /* Primary brand color */
  --color-primary:            var(--blue-600);       /* #2563eb */
  --color-primary-hover:      var(--blue-700);       /* #1d4ed8 */
  --color-primary-active:     var(--blue-800);       /* #1e40af */
  --color-primary-foreground: #ffffff;
  --color-primary-subtle:     var(--blue-50);        /* #eff6ff */
  --color-primary-muted:      var(--blue-100);       /* #dbeafe */

  /* Destructive (danger) */
  --color-destructive:            var(--red-600);    /* #dc2626 */
  --color-destructive-hover:      var(--red-700);
  --color-destructive-foreground: #ffffff;
  --color-destructive-subtle:     var(--red-50);

  /* Success */
  --color-success:            var(--green-600);      /* #16a34a */
  --color-success-foreground: #ffffff;
  --color-success-subtle:     var(--green-50);

  /* Warning */
  --color-warning:            var(--amber-500);      /* #f59e0b */
  --color-warning-foreground: #ffffff;
  --color-warning-subtle:     var(--amber-50);

  /* Backgrounds */
  --color-background:         var(--gray-50);        /* #f9fafb */
  --color-surface:            #ffffff;
  --color-surface-raised:     var(--gray-50);
  --color-surface-overlay:    var(--gray-100);

  /* Text */
  --color-text:               var(--gray-900);       /* #111827 */
  --color-text-secondary:     var(--gray-500);       /* #6b7280 */
  --color-text-tertiary:      var(--gray-400);       /* #9ca3af */
  --color-text-disabled:      var(--gray-300);       /* #d1d5db */
  --color-text-inverse:       #ffffff;

  /* Borders */
  --color-border:             var(--gray-200);       /* #e5e7eb */
  --color-border-strong:      var(--gray-300);       /* #d1d5db */
  --color-border-focus:       var(--blue-500);       /* #3b82f6 */
  --color-border-error:       var(--red-500);        /* #ef4444 */
}

[data-theme="dark"] {
  --color-primary:            var(--blue-500);       /* #3b82f6 */
  --color-primary-hover:      var(--blue-400);       /* #60a5fa */
  --color-background:         #0a0a0a;
  --color-surface:            #111111;
  --color-surface-raised:     #1a1a1a;
  --color-surface-overlay:    #222222;
  --color-text:               var(--gray-50);        /* #f9fafb */
  --color-text-secondary:     var(--gray-400);       /* #9ca3af */
  --color-text-tertiary:      var(--gray-600);       /* #4b5563 */
  --color-border:             #2a2a2a;
  --color-border-strong:      #333333;
}
```

### Tier 3: Component-Scoped Tokens

Used only when a component needs values that differ from semantics, or when a component exposes customization surface to consumers.

```css
/* Button component tokens */
--button-bg:              var(--color-primary);
--button-bg-hover:        var(--color-primary-hover);
--button-fg:              var(--color-primary-foreground);
--button-border:          transparent;
--button-shadow:          none;
--button-radius:          8px;
--button-font-size-sm:    13px;
--button-font-size-md:    14px;
--button-font-size-lg:    15px;
--button-height-sm:       32px;
--button-height-md:       40px;
--button-height-lg:       48px;
--button-padding-sm:      0 12px;
--button-padding-md:      0 16px;
--button-padding-lg:      0 20px;

/* Input component tokens */
--input-bg:               var(--color-surface);
--input-border:           var(--color-border-strong);
--input-border-focus:     var(--color-border-focus);
--input-border-error:     var(--color-border-error);
--input-border-success:   var(--color-success);
--input-radius:           8px;
--input-height-sm:        32px;
--input-height-md:        40px;
--input-height-lg:        48px;
--input-font-size:        14px;
--input-padding:          0 12px;
```

## Component Visual Patterns

### Neutral Base with Accent

All DesignPrompts-studied components use a neutral base (white or near-white) with a single accent color for primary interactive elements. Secondary and ghost variants derive from the same accent hue at reduced opacity or inverted contrast.

```
Primary button:   accent background, white text
Secondary button: white/transparent background, accent border, accent text
Ghost button:     transparent background, no border, accent text
Outline button:   white background, gray border, dark text (neutral, not accent)
Destructive:      red background or red text (only for dangerous actions)
```

### Surface Hierarchy (4 levels)

Every element occupies one of four surface levels. Elevation is communicated through background value, not box-shadow (shadow is reserved for elevated cards and modals only).

```
Level 0 — Page background:    --color-background (#f9fafb light, #0a0a0a dark)
Level 1 — Main content areas: --color-surface (#ffffff light, #111111 dark)
Level 2 — Panels, sidebars:   --color-surface-raised (#f9fafb light, #1a1a1a dark)
Level 3 — Hover states, chips: --color-surface-overlay (#f3f4f6 light, #222222 dark)
```

Modals and tooltips break this pattern — they float above all levels and use box-shadow to communicate elevation:
```css
/* Modal */
box-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.1);

/* Tooltip */
box-shadow: 0 4px 12px rgba(0,0,0,0.15);

/* Dropdown */
box-shadow: 0 8px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08);
```

### Interactive State Visual Progression

Every interactive element must clearly communicate its current state through visual change:

```
Default  → Base styling (no special treatment)
Hover    → Background darkens/lightens 6–10%, or border appears, 150ms ease-out
Active   → Scale 0.97, background darkens further 5%, instant
Focus    → 2px ring, 2px offset, accent color (box-shadow: 0 0 0 2px var(--color-border-focus))
Disabled → Opacity 0.5, cursor: not-allowed, no pointer events
Error    → Border and text change to --color-border-error (#ef4444)
Success  → Border and icon change to --color-success (#16a34a)
```

### Border Radius Reference System

Border-radius in DesignPrompts is not arbitrary — it follows a system tied to component type:

```
--radius-none: 0px       /* Data tables, code blocks */
--radius-xs:   2px       /* Checkboxes, radio buttons */
--radius-sm:   4px       /* Tags, compact badges, table cells */
--radius-md:   6px       /* Compact components (chips, small buttons) */
--radius-lg:   8px       /* Standard components (buttons, inputs, cards) */
--radius-xl:   12px      /* Large cards, modals, sheets */
--radius-2xl:  16px      /* Feature cards, marketing components */
--radius-full: 9999px    /* Pills, avatar containers, progress bars */
```

Component default radius by type:
- Button: `--radius-lg` (8px)
- Input: `--radius-lg` (8px)
- Card: `--radius-xl` (12px)
- Modal: `--radius-xl` (12px)
- Badge: `--radius-sm` (4px) for label badge, `--radius-full` for count badge
- Avatar: `--radius-full` (circle) or `--radius-lg` (8px, square style)
- Tooltip: `--radius-md` (6px)
- Dropdown: `--radius-lg` (8px)
