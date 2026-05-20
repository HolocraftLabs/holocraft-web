# Google Labs: AI Prompts

These prompts generate production-quality Material Design 3 components. Each prompt is immediately
actionable for code generation using React, TypeScript, Framer Motion, and Tailwind CSS v4.

---

## Prompt: Material 3 Button System

```
Build a complete Material Design 3 Button system in React + TypeScript + Tailwind CSS v4.

Include all five M3 button variants as a single polymorphic component:
1. Filled button — primary action, uses --md-sys-color-primary background, --md-sys-color-on-primary text
2. Tonal button — secondary action, uses --md-sys-color-secondary-container background, --md-sys-color-on-secondary-container text
3. Outlined button — medium-emphasis, transparent background, 1px border using --md-sys-color-outline
4. Text button — lowest emphasis, transparent background, primary color text
5. Elevated button — tonal surface with shadow, --md-sys-color-surface-container-low + elevation Level 1

Component API:
  interface ButtonProps {
    variant: 'filled' | 'tonal' | 'outlined' | 'text' | 'elevated';
    size?: 'sm' | 'md' | 'lg'; // default 'md'
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    loading?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
  }

Specs:
- Height: 40px (md), 32px (sm), 48px (lg)
- Border-radius: 9999px (full/pill shape)
- Horizontal padding: 24px (no icon), 16px leading + 24px trailing (leading icon), 24px leading + 16px trailing (trailing icon)
- Icon size: 18px, gap between icon and label: 8px
- Typography: Label Large (14px, weight 500, letter-spacing 0.10px)

State layer (pseudo-element approach):
- Hover: 8% overlay of the button's "on" color
- Focus-visible: 12% overlay + 3px focus ring offset using outline
- Active/pressed: 12% overlay
- Disabled: content opacity 38%, container opacity 12% (for filled/tonal/elevated)
- Transition: opacity 150ms cubic-bezier(0.2, 0, 0, 1)

Loading state:
- Spinner SVG replaces leading icon (or appears centered if no icon)
- Button width does not change (no layout shift)
- aria-busy="true" set when loading

Ripple effect:
- Expands from click point, diameter = max(width, height) * 2.5
- Duration: 400ms cubic-bezier(0, 0, 0.2, 1)
- Opacity: 0.24 → 0
- Use useRipple() custom hook returning ripples array and addRipple handler

Accessibility:
- role="button" or native <button>
- aria-disabled (not HTML disabled) for loading state to maintain focus
- aria-label when icon-only
- Visible focus ring: 3px solid --md-sys-color-primary, 2px offset

Framer Motion:
- Wrap ripple containers in AnimatePresence
- Each ripple: initial={{ scale: 0, opacity: 0.24 }}, animate={{ scale: 4, opacity: 0 }}
- transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}

Tailwind CSS v4:
- Define color tokens in @theme block mapping to CSS custom properties
- Use CSS variables for all color references (not Tailwind color names)
- Example: bg-[var(--md-sys-color-primary)]

prefers-reduced-motion:
- All transitions disabled
- Ripple still appears but instant (no animation)
- Use useReducedMotion() from framer-motion
```

---

## Prompt: Navigation Rail (Desktop Vertical Nav)

```
Build a Material Design 3 Navigation Rail component in React + TypeScript + Tailwind CSS v4.

Navigation Rail is the standard vertical navigation for medium/expanded breakpoints (600px+).
On compact screens (<600px) it should not render — a Bottom Navigation Bar is used instead.

Structure:
- Fixed left edge, full height, width: 80px
- Optional FAB at top (56px × 56px)
- Nav items: 2–7 destinations
- Optional header icon/logo above FAB
- Background: --md-sys-color-surface-container

Nav item anatomy (each destination):
- Height: 56px total
- Active indicator: pill shape, 56px wide × 32px tall, background --md-sys-color-secondary-container
- Icon: 24px, centered in active indicator, filled variant when active (use font-variation-settings: 'FILL' 1)
- Label: below active indicator, 12px (Label Medium), weight 500, centered
- Active label color: --md-sys-color-on-surface
- Inactive label color: --md-sys-color-on-surface-variant

Component API:
  interface NavRailProps {
    items: Array<{
      id: string;
      label: string;
      icon: string; // Material Symbol name
      href?: string;
    }>;
    activeId: string;
    onNavigate: (id: string) => void;
    fab?: { label: string; icon: string; onClick: () => void };
  }

Active indicator animation:
- When user switches destinations, the active indicator pill slides from the previous item's
  position to the new item using Framer Motion layoutId="nav-indicator"
- Duration: 300ms, ease: cubic-bezier(0.2, 0, 0, 1) (standard easing)
- layoutId approach: render indicator inside each item conditionally, Framer Motion handles position tween

State layers:
- Hover: 8% --md-sys-color-on-surface overlay on the 56px indicator area
- Focus-visible: 12% overlay + visible focus ring
- Pressed: 12% overlay

Accessibility:
- nav element with aria-label="Main navigation"
- Each item: role="link" or <a> tag with aria-current="page" for active
- Icon: aria-hidden="true" (decorative)
- Label is the accessible name
- Keyboard: Tab moves between items, Enter/Space activates

Framer Motion implementation:
  // Inside each NavItem, render the active indicator with layoutId
  {isActive && (
    <motion.div
      layoutId="nav-indicator"
      className="nav-indicator"
      style={{ borderRadius: 9999 }}
      transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
    />
  )}

Tailwind CSS v4:
- Rail width: w-20 (80px)
- Item height: h-14 (56px)
- Indicator: w-14 h-8 rounded-full (56px × 32px)
- All colors via CSS custom properties in @theme
```

---

## Prompt: Search Component (Expandable)

```
Build a Material Design 3 Search Bar component in React + TypeScript + Tailwind CSS v4.

Two modes:
1. Persistent Search Bar — always visible, 56px pill-shaped input
2. Expanding Search — starts as icon button in app bar, expands to full-width bar

Persistent Search Bar specs:
- Height: 56px
- Border-radius: 28px (pill)
- Background: --md-sys-color-surface-container-high (no border, no shadow at rest)
- On focus: background → --md-sys-color-surface-container-highest, elevation Level 3 shadow
- Leading: 16px left padding, 24px search icon (--md-sys-color-on-surface-variant)
- Trailing: 48px avatar button OR menu icon button (optional)
- Input text: Body Large (16px, weight 400)
- Placeholder: Body Large, --md-sys-color-on-surface-variant color

Results Dropdown:
- Appears below bar, separated by 4px gap
- Background: --md-sys-color-surface-container-highest
- Border-radius: 0 0 28px 28px (continues the pill shape)
- Elevation: Level 3
- Max-height: 40vh, overflow-y: auto
- Each result item: 56px height, 16px horizontal padding, icon (optional) + text
- Active result (keyboard): 8% state layer
- Typography: Body Large for result text, Body Medium for metadata/secondary text

Expanding Search (from icon) specs:
- Collapsed: 48px × 48px icon button with search icon
- Expanded: full-width of container, same pill design as persistent bar
- Expand animation: the icon button grows outward to fill the container
  - Width: 48px → 100%, duration 300ms, ease: cubic-bezier(0, 0, 0, 1)
  - Opacity of input/placeholder: 0 → 1, delay 150ms, duration 150ms
  - Trailing X button fades in as input becomes active
- Collapse: reverse, 200ms ease: cubic-bezier(0.3, 0, 1, 1)

Component API:
  interface SearchProps {
    variant: 'persistent' | 'expanding';
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    onSearch?: (value: string) => void;
    suggestions?: Array<{ id: string; label: string; sublabel?: string; icon?: string }>;
    isLoading?: boolean;
  }

State management:
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  // Auto-focus input when expanded
  useEffect(() => { if (isExpanded) inputRef.current?.focus(); }, [isExpanded]);

Framer Motion:
  <motion.div
    animate={{ width: isExpanded ? '100%' : 48 }}
    transition={{ duration: isExpanded ? 0.3 : 0.2, ease: isExpanded ? [0,0,0,1] : [0.3,0,1,1] }}
  >
  // Results dropdown
  <AnimatePresence>
    {showResults && (
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.15, ease: [0,0,0,1] }}
      />
    )}
  </AnimatePresence>

Keyboard navigation:
- ArrowDown/ArrowUp: move through suggestions (update aria-activedescendant)
- Enter: select highlighted suggestion or submit search
- Escape: clear input if has value, else collapse/close
- Results list: role="listbox", each item role="option", aria-selected for highlighted item
- Input: aria-autocomplete="list", aria-controls pointing to listbox id, aria-expanded

prefers-reduced-motion: width change is instant, no opacity transitions
```

---

## Prompt: Card System (Three Variants)

```
Build a Material Design 3 Card system in React + TypeScript + Tailwind CSS v4.

Three card variants:
1. Elevated Card — Level 1 shadow + tonal overlay, --md-sys-color-surface-container-low background
2. Filled Card — no shadow, --md-sys-color-surface-container-highest background
3. Outlined Card — no shadow, 1px border --md-sys-color-outline, --md-sys-color-surface background

All cards share:
- Border-radius: 12px (medium shape)
- Overflow: hidden (clips content to rounded corners)
- When interactive: hover state layer 8%, focus 12%, pressed 12%
- Disabled: opacity 38% on content, elevation to Level 0 (elevated card only)

Card anatomy:
  Media area (optional, top): full-width image, aspect-ratio 16/9 or square
  Header area: padding 16px, optional leading avatar/icon (40px), title + subhead text
  Content area: padding 16px top 0, Body Medium text, --md-sys-color-on-surface-variant
  Action area (optional, bottom): padding 8px, contains action buttons, right-aligned

Component API:
  interface CardProps {
    variant: 'elevated' | 'filled' | 'outlined';
    interactive?: boolean; // adds hover/focus/press states + cursor pointer
    onClick?: () => void;
    media?: { src: string; alt: string; aspectRatio?: '16/9' | '1/1' };
    header?: {
      avatar?: { src?: string; initials?: string };
      title: string;
      subhead?: string;
      action?: React.ReactNode; // top-right corner action (kebab menu etc)
    };
    children?: React.ReactNode; // content area
    actions?: React.ReactNode; // bottom action row
  }

Elevation for Elevated Card:
  box-shadow: 0 1px 2px rgba(0,0,0,0.30), 0 1px 3px 1px rgba(0,0,0,0.15);
  /* Plus tonal overlay via color-mix: */
  background: color-mix(in srgb, var(--md-sys-color-primary) 5%, var(--md-sys-color-surface));

On hover (elevated, interactive):
  box-shadow: 0 1px 2px rgba(0,0,0,0.30), 0 2px 6px 2px rgba(0,0,0,0.15);
  /* Level 2 shadow */
  transition: box-shadow 200ms cubic-bezier(0.2, 0, 0, 1);

State layer (on all interactive cards):
  position: absolute; inset: 0; border-radius: inherit;
  background: var(--md-sys-color-on-surface);
  opacity: 0 → 0.08 (hover) → 0.12 (focus/press)
  transition: opacity 150ms cubic-bezier(0.2, 0, 0, 1)

Typography within card:
  Title: Title Medium (16px, weight 500, letter-spacing 0.15px), --md-sys-color-on-surface
  Subhead: Body Medium (14px, weight 400, letter-spacing 0.25px), --md-sys-color-on-surface-variant
  Body content: Body Medium, --md-sys-color-on-surface-variant

Accessibility:
  If interactive: role="button" or use <a> for links, tabIndex={0}
  Keyboard: Enter and Space trigger onClick
  aria-label if content doesn't provide a clear text label

Framer Motion (container transform — card to detail):
  // Assign layoutId to each card and its detail view
  <motion.div layoutId={`card-${id}`} style={{ borderRadius: 12 }}>
  // When detail opens:
  <motion.div layoutId={`card-${id}`} style={{ borderRadius: 28 }}
    transition={{ layout: { type: 'spring', bounce: 0, duration: 0.4 } }}>
```

---

## Prompt: Chip System (Filter, Input, Suggestion)

```
Build a complete Material Design 3 Chip system in React + TypeScript + Tailwind CSS v4.

All chips share:
- Height: 32px
- Border-radius: 8px (small shape)
- Typography: Label Large (14px, weight 500, letter-spacing 0.10px)
- Horizontal padding: 12px (no icon), 8px leading + 12px trailing (with leading icon)

Filter Chip:
  Unselected: border 1px solid --md-sys-color-outline, transparent background
  Selected: background --md-sys-color-secondary-container, border removed,
            leading checkmark icon (18px) slides in from left
  Hover: 8% state layer, border still visible when unselected
  Focus: 12% state layer + 3px focus ring

  interface FilterChipProps {
    label: string;
    selected: boolean;
    onToggle: () => void;
    leadingIcon?: string; // shown when unselected, replaced by checkmark when selected
    disabled?: boolean;
  }

  Checkmark animation (Framer Motion):
    <AnimatePresence>
      {selected && (
        <motion.span
          initial={{ scale: 0, width: 0, marginRight: 0 }}
          animate={{ scale: 1, width: 18, marginRight: 8 }}
          exit={{ scale: 0, width: 0, marginRight: 0 }}
          transition={{ duration: 0.15, ease: [0, 0, 0, 1] }}
        >
          ✓
        </motion.span>
      )}
    </AnimatePresence>

  Accessibility: role="checkbox", aria-checked={selected}

Input Chip (deletable):
  Has a selected value displayed, with trailing delete icon (18px ×)
  Background: --md-sys-color-surface-container-low
  Border: 1px solid --md-sys-color-outline
  Optional leading avatar (24px) or icon
  Delete icon: hover area 32px × 32px, on click removes chip
  On delete: chip exits with scale: 1→0 + opacity: 1→0, 150ms accelerate easing
  Layout reflows (use Framer Motion layout prop on sibling chips)

  interface InputChipProps {
    label: string;
    onDelete: () => void;
    avatar?: { src: string; alt: string };
    leadingIcon?: string;
  }

  Accessibility: role="row" (in a group), delete button has aria-label="Remove {label}"

Suggestion Chip:
  Single-tap, no selected state
  Elevated variant: background --md-sys-color-surface-container-low, elevation Level 1
  Outlined variant: border 1px solid --md-sys-color-outline, transparent background
  Optional leading icon (18px)
  On click: performs action, often followed by chip disappearing or new content loading

  interface SuggestionChipProps {
    label: string;
    onClick: () => void;
    variant: 'elevated' | 'outlined';
    leadingIcon?: string;
    disabled?: boolean;
  }

Chip Group / Chip Row:
  Scrollable horizontal row on mobile (overflow-x: auto, no scrollbar visible)
  Wrapping grid on desktop
  Gap between chips: 8px
  Use Framer Motion layout on each chip so additions/removals animate position changes

Complete state layer for all chip types:
  position: relative; overflow: hidden; isolation: isolate;
  ::before pseudo (state layer): inherited approach from visual-dna.md
  Ripple on press using useRipple() hook
```

---

## Prompt: Form Input (Outlined and Filled Variants)

```
Build a Material Design 3 Text Field component in React + TypeScript + Tailwind CSS v4.

Two variants: outlined and filled.

Filled variant specs:
- Height: 56px
- Background: --md-sys-color-surface-container-highest
- Border: none on sides/top, 1px bottom border using --md-sys-color-on-surface-variant at rest
- Border (focused): 2px bottom border using --md-sys-color-primary
- Border-radius: 4px 4px 0 0 (top corners extra-small, bottom flat)
- Active indicator: the bottom border

Outlined variant specs:
- Height: 56px
- Background: transparent
- Border: 1px all sides, --md-sys-color-outline at rest
- Border (focused): 2px all sides, --md-sys-color-primary
- Border-radius: 4px (extra-small shape on all corners)

Label animation (both variants):
  Resting (no value, unfocused): label sits vertically centered in field
    font-size: 16px, color: --md-sys-color-on-surface-variant
    position: absolute, top: 50%, transform: translateY(-50%)
  Active (focused OR has value): label floats to top
    font-size: 12px (Body Small), color: --md-sys-color-primary (if focused) or --md-sys-color-on-surface-variant
    For outlined: label cuts into the border (background: white behind label text)
    For filled: label sits at 8px from top
  Animation: all label transforms use 150ms cubic-bezier(0.2, 0, 0, 1)

  Implementation with Framer Motion:
    <motion.label
      animate={isFocused || hasValue
        ? { y: variant === 'filled' ? -12 : -28, fontSize: '12px', color: isFocused ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-on-surface-variant)' }
        : { y: 0, fontSize: '16px', color: 'var(--md-sys-color-on-surface-variant)' }
      }
      transition={{ duration: 0.15, ease: [0.2, 0, 0, 1] }}
    >

Input text: Body Large (16px, weight 400)
Caret color: --md-sys-color-primary

Helper text (below field):
- 16px left padding, 4px top margin
- Body Small (12px, weight 400)
- Color: --md-sys-color-on-surface-variant (default), --md-sys-color-error (error state)

Error state:
- Border color: --md-sys-color-error (outlined) or bottom border --md-sys-color-error (filled)
- Label color: --md-sys-color-error
- Trailing error icon: 24px, --md-sys-color-error
- Helper text changes to error message, color: --md-sys-color-error
- Error message appears with: translateY(-4px)→0 + opacity 0→1, 150ms decelerate

Character counter:
- Right-aligned below field, Body Small, --md-sys-color-on-surface-variant
- Format: "12 / 50"
- Turns --md-sys-color-error when value length > maxLength

Component API:
  interface TextFieldProps {
    variant: 'outlined' | 'filled';
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: 'text' | 'email' | 'password' | 'tel' | 'number';
    helperText?: string;
    errorMessage?: string;
    maxLength?: number;
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    disabled?: boolean;
    required?: boolean;
  }

Accessibility:
- <label> htmlFor linked to input id
- aria-describedby points to helperText id AND errorMessage id
- aria-invalid="true" when error state
- aria-required="true" when required
- Error message in aria-live="polite" region
- Never rely on placeholder alone as label — always use floating label

Tailwind CSS v4:
- Use CSS custom properties for all color tokens
- Transition class: transition-[font-size,transform,color] duration-150
- Focus state managed via JavaScript (not CSS :focus) to handle "has value" case separately
```

---

## Prompt: Dialog Component with Container Transform

```
Build a Material Design 3 Dialog component in React + TypeScript + Framer Motion + Tailwind CSS v4.

Two dialog variants: basic dialog and full-screen dialog (mobile).

Basic Dialog specs:
- Width: 280–560px, centered in viewport
- Background: --md-sys-color-surface-container-high
- Border-radius: 28px (extra-large shape)
- Elevation: Level 3 (0 4px 8px rgba(0,0,0,0.30) + tonal overlay 11%)
- Padding: 24px all sides
- Scrim/backdrop: rgba(0,0,0,0.32), covers entire viewport

Dialog anatomy:
  Icon (optional): 24px centered icon, --md-sys-color-secondary, margin-bottom 16px
  Headline: Headline Small (24px, weight 400), --md-sys-color-on-surface, margin-bottom 16px
  Body text: Body Medium (14px, weight 400), --md-sys-color-on-surface-variant, margin-bottom 24px
  Actions row: right-aligned, gap 8px, contains 1–2 Text buttons (or 1 Filled + 1 Text)

Container Transform Animation (from trigger element):
  - Assign layoutId to trigger element and dialog
  - Dialog morphs from trigger's position/shape to centered dialog shape
  - Border-radius morphs from trigger's border-radius to 28px
  - Duration: 400ms, transition: { layout: { type: 'spring', bounce: 0, duration: 0.4 } }

  Implementation:
    // Trigger (e.g., a card or FAB)
    <motion.button layoutId="dialog-trigger" style={{ borderRadius: 16 }} onClick={open}>
      Open Dialog
    </motion.button>

    // Dialog
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.32)', zIndex: 50 }}
          />
          <motion.div
            layoutId="dialog-trigger"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
            style={{
              position: 'fixed',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: 28,
              zIndex: 51,
            }}
            transition={{ layout: { type: 'spring', bounce: 0, duration: 0.4 } }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, delay: 0.15 }}
            >
              {/* dialog content */}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>

  Fallback (no layoutId trigger): dialog scales from 80% to 100% + fades in
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1, transition: { duration: 0.3, ease: [0,0,0,1] } }}
    exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.2, ease: [0.3,0,1,1] } }}

Full-Screen Dialog (compact/mobile):
  Slides up from bottom, covers entire screen
  initial={{ y: '100%' }}, animate={{ y: 0 }}, exit={{ y: '100%' }}
  transition: { duration: 0.45, ease: [0,0,0,1] }
  Has app-bar-style header with close (X) button left, title center, action button right
  Border-radius: 0 (full screen)

Focus management:
  - On open: focus moves to first focusable element inside dialog
  - Focus trapped inside dialog while open
  - On close: focus returns to trigger element
  - Use a FocusTrap component or @radix-ui/react-focus-trap

Keyboard:
  - Escape closes dialog (calls onClose)
  - Tab cycles through focusable elements within dialog only
  - Enter on confirm button submits

Component API:
  interface DialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    icon?: React.ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm?: () => void;
    triggerId?: string; // layoutId for container transform
    variant?: 'basic' | 'fullscreen';
    children?: React.ReactNode; // custom body content
  }

prefers-reduced-motion:
  No layout transform animation
  Simple opacity fade: initial={{ opacity: 0 }}, animate={{ opacity: 1 }}, duration: 0.15s
  Scrim still appears (functional feedback) but also fades instantly
```
