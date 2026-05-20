# Google Labs: Interactions

## Ripple Effect

The ripple is M3's primary touch/click feedback mechanism. It provides immediate tactile confirmation
that an interaction was registered, radiating from the exact point of contact.

### Behavior Specification
- **Trigger**: mousedown, touchstart, keydown (Enter/Space on focused element)
- **Origin**: exact cursor/touch position within the element (not centered unless keyboard-triggered)
- **Keyboard-triggered**: ripple originates from center of the element
- **Expansion duration**: 300–400ms, `cubic-bezier(0, 0, 0.2, 1)`
- **Opacity**: starts at `0.12` (hover state layer) ramping to `0.24` at press, fades to `0`
- **Size**: final diameter = `max(containerWidth, containerHeight) * 2.5`
- **Release behavior**: if pointer is released before expansion completes, fade-out begins immediately
  after expansion reaches full size

### React Implementation
```tsx
function useRipple() {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const addRipple = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(prev => [...prev, { x, y, id }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);
  };

  return { ripples, addRipple };
}
```

## FAB (Floating Action Button)

The FAB is the primary action anchor for a screen. M3 defines three sizes: small (40px), standard
(56px), and large (96px). The extended FAB adds a text label.

### Extended FAB Behavior
- **Resting state**: icon only (56px × 56px) OR icon + label text (extended, variable width)
- **Hover**: state layer (8% overlay), elevation increases from Level 3 to Level 4
- **Scroll behavior**: on downward scroll, extended FAB collapses to icon-only (label slides out,
  width animates from full width to 56px)
- **On upward scroll**: re-extends (width animates back, label fades in)
- **Collapse duration**: 200ms `cubic-bezier(0.2, 0, 0, 1)`
- **Extend duration**: 300ms `cubic-bezier(0, 0, 0, 1)`

```tsx
<motion.button
  className="fab"
  animate={{ width: isScrollingDown ? 56 : 'auto' }}
  transition={{ duration: isScrollingDown ? 0.2 : 0.3, ease: [0.2, 0, 0, 1] }}
>
  <Icon name="edit" />
  <motion.span
    animate={{ opacity: isScrollingDown ? 0 : 1, width: isScrollingDown ? 0 : 'auto' }}
    transition={{ duration: 0.15 }}
    style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
  >
    Compose
  </motion.span>
</motion.button>
```

## Navigation Drawer

The navigation drawer slides in from the left edge of the screen. Used in expanded layouts (desktop)
as a persistent element, or in compact/medium layouts as a modal overlay.

### Modal Drawer Behavior (Compact/Medium)
- **Opening**: drawer slides from `translateX(-360px)` to `translateX(0)`, 250ms decelerate easing
- **Backdrop**: fades in simultaneously, `rgba(0, 0, 0, 0.32)`, blocks interaction with content behind
- **Closing**: drawer slides back `translateX(-360px)`, 200ms accelerate easing; backdrop fades out
- **Width**: 360px maximum, or `min(360px, calc(100vw - 56px))` on small screens
- **Close triggers**: backdrop tap, Escape key, swipe left gesture

### Navigation Drawer Item States
- Default: 48px height, icon left-aligned, label right of icon, transparent background
- Active/selected: `--md-sys-color-secondary-container` background, full width pill shape, 48px height,
  icon filled variant, label `font-weight: 700`
- Hover: 8% state layer on `--md-sys-color-on-surface`
- Active item has `aria-current="page"` set

```css
.nav-drawer {
  width: 360px;
  background: var(--md-sys-color-surface-container-low);
  border-radius: 0 16px 16px 0; /* large shape on right side */
  padding: 12px 0;
}
.nav-drawer-item {
  height: 56px;
  padding: 0 24px 0 16px;
  border-radius: 9999px; /* full shape for active indicator */
  margin: 0 12px;
}
.nav-drawer-item.active {
  background: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
}
```

## Bottom Sheet

Bottom sheets slide up from the bottom edge. Two variants: modal (overlays content) and standard
(pushes content up, no overlay).

### Modal Bottom Sheet
- **Opening**: `translateY(100%)` → `translateY(0)`, 450ms `cubic-bezier(0, 0, 0, 1)` (decelerate)
- **Backdrop**: `rgba(0, 0, 0, 0.32)`, fades in simultaneously
- **Shape**: `border-radius: 28px 28px 0 0` (extra-large top corners)
- **Drag handle**: centered horizontal bar, `48px × 4px`, `background: --md-sys-color-on-surface-variant`,
  `border-radius: 2px`, positioned `22px` from top edge of sheet
- **Drag to dismiss**: sheet follows pointer/touch drag velocity; if released past 50% of height
  OR with downward velocity > 500px/s, dismiss; otherwise snap back
- **Content height**: min 72px, max `calc(100vh - 56px)` (leaves space for app bar)
- **Drag handle area**: 48px tall touch target, centered at top of sheet

### Snap Points
Extended variant supports two snap heights:
1. **Collapsed snap**: 40% of viewport height
2. **Expanded snap**: 90% of viewport height (with drag handle visible)

## Chip System

Chips are compact interactive elements. M3 defines four chip types with distinct behaviors:

### Filter Chip
- Toggleable selected state
- Unselected: outlined (`border: 1px solid --md-sys-color-outline`), no background
- Selected: `background: --md-sys-color-secondary-container`, leading checkmark icon appears,
  border removed
- Height: 32px, `border-radius: 8px` (small shape)
- Horizontal padding: 12px (unselected), 8px leading + 12px trailing (selected, to account for icon)
- Checkmark animation: scale from 0 to 1, 150ms `cubic-bezier(0, 0, 0, 1)`

### Input Chip (Deletable)
- Displays entered value (e.g., email address in a To: field, selected filter value)
- Has trailing close/delete icon (`16px × 16px`)
- Background: `--md-sys-color-surface-container-low`
- Outlined with `--md-sys-color-outline`
- Delete icon hover: 8% state layer on icon area

### Suggestion Chip
- Single-tap action (not toggleable)
- No selected state — triggers action and disappears or navigates
- Optional leading icon
- Elevated variant: `background: --md-sys-color-surface-container-low`, elevation Level 1

### Assist Chip
- Shortcut to a related action (e.g., "Set Reminder", "Add to Calendar")
- Elevated or outlined variant
- Can have leading icon

```tsx
// Filter Chip example
<motion.button
  role="checkbox"
  aria-checked={selected}
  className={`chip ${selected ? 'chip--selected' : ''}`}
  onClick={() => setSelected(!selected)}
>
  <AnimatePresence>
    {selected && (
      <motion.span
        initial={{ scale: 0, width: 0 }}
        animate={{ scale: 1, width: 18 }}
        exit={{ scale: 0, width: 0 }}
        transition={{ duration: 0.15, ease: [0, 0, 0, 1] }}
        className="chip__checkmark"
      >
        ✓
      </motion.span>
    )}
  </AnimatePresence>
  {label}
</motion.button>
```

## Search Component

M3 defines two search variants: search bar (persistent, always visible) and search view (full-screen).

### Expanding Search Bar
- **Collapsed state**: search icon button (48px touch target) in app bar
- **Expanded state**: full-width input, 56px height, `border-radius: 28px` (full), contains
  leading search icon, input field, and trailing clear icon
- **Expand animation**: icon expands outward from its position to full width, 300ms decelerate
- **Close**: X button or Escape key, 200ms accelerate collapse

### Search Bar (Persistent, Always Visible)
- Height: 56px
- Border-radius: 28px (full/pill shape)
- Background: `--md-sys-color-surface-container-high` (not white, not outlined)
- Leading: 16px padding, 24px search icon
- Trailing: optional avatar or menu icon
- On focus: elevation increases to Level 3, background becomes `--md-sys-color-surface-container-highest`
- Results: dropdown card below, elevation Level 3, max-height 40vh, scrollable

### Typeahead/Results Dropdown
- Background: `--md-sys-color-surface-container-highest`
- Border-radius: 0 0 28px 28px (continues the pill shape of the bar)
- Individual results: 56px height list items, 16px horizontal padding
- Keyboard navigation: arrow keys move focus, Enter selects, Escape closes

## Snackbar

Snackbars provide brief, non-blocking feedback. One at a time.

- **Position**: bottom center of screen on desktop, bottom full-width on mobile
- **Mobile width**: `calc(100% - 32px)`, 16px from each edge
- **Desktop width**: 288–568px, centered
- **Height**: 48px (single line), up to 68px (two lines)
- **Background**: `--md-sys-color-inverse-surface` (dark on light theme)
- **Text color**: `--md-sys-color-inverse-on-surface`
- **Action button color**: `--md-sys-color-inverse-primary`
- **Border-radius**: `4px` (extra-small shape — snackbars are intentionally less rounded)
- **Padding**: 12px top/bottom, 16px left, 8px right
- **Appear**: `translateY(100px) → translateY(0)`, opacity `0 → 1`, 150ms decelerate
- **Dismiss (auto)**: after 4000ms (or 10000ms if has action)
- **Dismiss animation**: opacity `1 → 0`, 75ms accelerate

## State Layer Implementation Reference

All interactive M3 elements use the state layer system. The layer is a pseudo-element that overlays
the component surface. Colors are the component's "on" color at the specified opacity:

| State | Opacity | Duration | Easing |
|---|---|---|---|
| Hover (enter) | 0 → 8% | 150ms | `cubic-bezier(0.2, 0, 0, 1)` |
| Hover (leave) | 8% → 0 | 150ms | `cubic-bezier(0.2, 0, 0, 1)` |
| Focus (appear) | 0 → 12% | 150ms | `cubic-bezier(0.2, 0, 0, 1)` |
| Focus (leave) | 12% → 0 | 150ms | `cubic-bezier(0.2, 0, 0, 1)` |
| Pressed | 0 → 12% | 105ms | immediate then fade |
| Dragged | 16% (sustained) | — | — |

The state layer does NOT animate the background of the component itself — it is a separate overlay.
This is critical: changing background-color directly conflicts with tonal surface colors.

```css
.md-component {
  position: relative;
  isolation: isolate;
}
.md-component::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: currentColor; /* inherits "on" color from component context */
  opacity: 0;
  transition: opacity 150ms cubic-bezier(0.2, 0, 0, 1);
  pointer-events: none;
}
.md-component:hover::before { opacity: 0.08; }
.md-component:focus-visible::before { opacity: 0.12; }
.md-component:active::before { opacity: 0.12; }
```
