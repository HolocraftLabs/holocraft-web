# Google Labs: Visual DNA

## Material 3 Color Token System

M3 uses named semantic tokens, not raw hex values, at the component level. Tokens reference roles in
the tonal palette. The default reference palette below is the M3 baseline purple scheme; any production
implementation generates these from a seed color using `@material/material-color-utilities`.

### Core Color Roles (Light Mode Defaults)

| Token | Default Hex | Purpose |
|---|---|---|
| `--md-sys-color-primary` | `#6750A4` | Main brand color, primary buttons, active states |
| `--md-sys-color-on-primary` | `#FFFFFF` | Text/icons on primary |
| `--md-sys-color-primary-container` | `#EADDFF` | Lighter tinted surface for containers, chips |
| `--md-sys-color-on-primary-container` | `#21005D` | Text/icons on primary container |
| `--md-sys-color-secondary` | `#625B71` | Supporting brand color |
| `--md-sys-color-on-secondary` | `#FFFFFF` | Text/icons on secondary |
| `--md-sys-color-secondary-container` | `#E8DEF8` | Secondary tinted container |
| `--md-sys-color-on-secondary-container` | `#1D192B` | Text on secondary container |
| `--md-sys-color-tertiary` | `#7D5260` | Contrast accent, third brand color |
| `--md-sys-color-on-tertiary` | `#FFFFFF` | Text on tertiary |
| `--md-sys-color-tertiary-container` | `#FFD8E4` | Tertiary container |
| `--md-sys-color-on-tertiary-container` | `#31111D` | Text on tertiary container |
| `--md-sys-color-error` | `#B3261E` | Error states, destructive actions |
| `--md-sys-color-on-error` | `#FFFFFF` | Text on error |
| `--md-sys-color-error-container` | `#F9DEDC` | Error container backgrounds |
| `--md-sys-color-on-error-container` | `#410E0B` | Text on error container |

### Surface Color System

The surface system creates depth hierarchy through tonal shifts, not shadows alone.

| Token | Default Hex | Usage |
|---|---|---|
| `--md-sys-color-surface` | `#FFFBFE` | Default page/card background |
| `--md-sys-color-surface-dim` | `#DED8E1` | Dimmed surface (behind modals) |
| `--md-sys-color-surface-bright` | `#FFFBFE` | Brightest surface variant |
| `--md-sys-color-surface-container-lowest` | `#FFFFFF` | Lowest container (cards on surface) |
| `--md-sys-color-surface-container-low` | `#F7F2FA` | Low container |
| `--md-sys-color-surface-container` | `#F3EDF7` | Standard container |
| `--md-sys-color-surface-container-high` | `#ECE6F0` | High container (navigation drawer) |
| `--md-sys-color-surface-container-highest` | `#E6E0E9` | Highest container (app bars) |
| `--md-sys-color-on-surface` | `#1C1B1F` | Primary text on surface |
| `--md-sys-color-on-surface-variant` | `#49454F` | Secondary text, icons on surface |
| `--md-sys-color-outline` | `#79747E` | Borders, dividers |
| `--md-sys-color-outline-variant` | `#CAC4D0` | Subtle borders, lower-emphasis dividers |

### Dark Mode Surface Equivalents

Dark mode inverts the tonal hierarchy. Key tokens:

| Token | Dark Mode Hex |
|---|---|
| `--md-sys-color-surface` | `#1C1B1F` |
| `--md-sys-color-surface-container-lowest` | `#0F0D13` |
| `--md-sys-color-surface-container` | `#211F26` |
| `--md-sys-color-surface-container-highest` | `#36343B` |
| `--md-sys-color-on-surface` | `#E6E1E5` |
| `--md-sys-color-primary` | `#D0BCFF` |
| `--md-sys-color-on-primary` | `#381E72` |

## Shape System

M3 defines a shape scale used consistently across all components. Shape communicates component
family and interactivity level.

| Token | Value | Typical Use |
|---|---|---|
| `--md-sys-shape-corner-none` | `0px` | Full rectangles (navigation drawer panels) |
| `--md-sys-shape-corner-extra-small` | `4px` | Tooltips, snackbars |
| `--md-sys-shape-corner-small` | `8px` | Menus, text fields |
| `--md-sys-shape-corner-medium` | `12px` | Cards, dialogs |
| `--md-sys-shape-corner-large` | `16px` | FABs, navigation rail items |
| `--md-sys-shape-corner-extra-large` | `28px` | Large FABs, extended FABs |
| `--md-sys-shape-corner-full` | `9999px` | Buttons, chips, badges, sliders |

In CSS custom properties, use `border-radius: var(--md-sys-shape-corner-medium)` — `12px`.

## Elevation System

M3 elevation is expressed as both shadow AND a tonal surface overlay. At higher elevations, the
surface color becomes lighter (in light mode) by mixing in primary color. This replaces the
"stack of shadows" approach from Material Design 2.

| Level | Shadow | Tonal Overlay Opacity | Typical Use |
|---|---|---|---|
| Level 0 | none | 0% | Flat surfaces, text fields (filled) |
| Level 1 | `0 1px 2px rgba(0,0,0,0.30)` | 5% | Cards, chips |
| Level 2 | `0 1px 2px rgba(0,0,0,0.30), 0 2px 6px rgba(0,0,0,0.15)` | 8% | FAB (resting) |
| Level 3 | `0 4px 8px rgba(0,0,0,0.30)` | 11% | Navigation drawer, modal bottom sheet |
| Level 4 | `0 6px 10px rgba(0,0,0,0.30)` | 12% | FAB (pressed) |
| Level 5 | `0 8px 12px rgba(0,0,0,0.30)` | 14% | Navigation bar |

Tonal overlay: mix `--md-sys-color-primary` at specified opacity into the surface background.
Implementation: `background: color-mix(in srgb, var(--md-sys-color-primary) 8%, var(--md-sys-color-surface))` for Level 2.

## Grid System

M3 uses a responsive adaptive grid that changes column count and margin at breakpoints.

| Breakpoint | Width | Columns | Gutter | Margin |
|---|---|---|---|---|
| Compact (mobile) | 0–599px | 4 | 16px | 16px |
| Medium (tablet) | 600–839px | 8 | 24px | 24px |
| Medium (large tablet) | 840–1199px | 12 | 24px | 24px |
| Expanded (desktop) | 1200px+ | 12 | 24px | 24px (or auto) |

Component sizing adjusts at each breakpoint:
- Navigation: bottom bar (compact) → navigation rail (medium) → navigation drawer (expanded)
- Cards: full-width (compact) → 2-column grid (medium) → 3–4 column grid (expanded)
- Dialogs: full-screen sheet (compact) → centered dialog max 560px (medium+)

## State Layer System

M3 communicates interactive states through semi-transparent overlays of the component's content color.
This ensures states are always visible regardless of the underlying surface color.

| State | Overlay Opacity | Color |
|---|---|---|
| Hover | 8% | `--md-sys-color-on-surface` (or on-primary for primary elements) |
| Focus (keyboard) | 12% | `--md-sys-color-on-surface` |
| Pressed | 12% | `--md-sys-color-on-surface` |
| Dragged | 16% | `--md-sys-color-on-surface` |
| Disabled | Opacity 38% on content, 12% on container | — |

CSS implementation for a button hover state:
```css
.md-button::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--md-sys-color-on-primary);
  opacity: 0;
  transition: opacity 150ms cubic-bezier(0.2, 0, 0, 1);
}
.md-button:hover::before { opacity: 0.08; }
.md-button:focus-visible::before { opacity: 0.12; }
.md-button:active::before { opacity: 0.12; }
```

## Iconography

Material Symbols (successor to Material Icons) with variable font axes:

- **FILL**: 0 (outline) or 1 (filled) — use filled for active/selected states
- **wght**: 100–700 weight axis — match to text weight context (400 default)
- **GRAD**: -25 to 200 — use -25 for dark mode to prevent bloom
- **opsz**: 20, 24, 40, 48px — match to usage size for optimal rendering

```css
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
```

Active/selected state: `font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;`

## Spacing and Layout Tokens

All spacing uses 4px base unit. Common values:

| Use | Value |
|---|---|
| Component internal padding (dense) | 8px |
| Component internal padding (standard) | 16px |
| Component internal padding (comfortable) | 24px |
| List item height (compact) | 48px |
| List item height (standard) | 56px |
| App bar height | 64px |
| Bottom navigation bar height | 80px |
| Navigation rail width | 80px |
| Navigation drawer width | 360px |
| FAB size (standard) | 56px × 56px |
| FAB size (small) | 40px × 40px |
| FAB size (large) | 96px × 96px |
| Chip height | 32px |
| Button height | 40px |
| Text field height | 56px |
