# DesignPrompts — Interactions

## Button States

Every button has 6 states. Each state must be visually distinct. Missing any state creates an accessibility or usability failure.

### Primary Button Full State Specification

```css
/* DEFAULT */
.btn-primary {
  background: var(--color-primary);              /* #2563eb */
  color: var(--color-primary-foreground);        /* #ffffff */
  border: 1px solid transparent;
  border-radius: var(--radius-lg);              /* 8px */
  height: var(--button-height-md);              /* 40px */
  padding: var(--button-padding-md);            /* 0 16px */
  font-size: var(--button-font-size-md);        /* 14px */
  font-weight: 600;
  cursor: pointer;
  transition: background-color 100ms cubic-bezier(0,0,0.2,1),
              box-shadow 100ms cubic-bezier(0,0,0.2,1),
              transform 50ms linear;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

/* HOVER */
.btn-primary:hover {
  background: var(--color-primary-hover);       /* #1d4ed8 — darkens ~10% */
  box-shadow: 0 1px 3px rgba(0,0,0,0.15);
  /* Transition: 100ms ease-out */
}

/* ACTIVE (mousedown / touch) */
.btn-primary:active {
  background: var(--color-primary-active);      /* #1e40af — darkens further ~5% */
  transform: scale(0.97);
  box-shadow: none;
  /* Transition: transform 50ms linear (instant physical feel) */
}

/* FOCUS (keyboard navigation) */
.btn-primary:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-background),
              0 0 0 4px var(--color-border-focus);
  /* Ring: 2px white gap, 2px accent ring — total 4px from element edge */
}

/* DISABLED */
.btn-primary:disabled,
.btn-primary[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
  /* No hover, no active, no focus ring (still keyboard-focusable with aria-disabled) */
}

/* LOADING STATE (button with spinner) */
.btn-primary[data-loading="true"] {
  cursor: wait;
  pointer-events: none;
  /* Spinner replaces left icon or appears inline with label */
  /* Label stays visible (don't hide text — prevents button width collapse) */
}
```

### Button Hover — Exact Color Shift

For programmatic hover state calculation (used when generating custom accent colors):
- Light mode hover: `filter: brightness(0.9)` (10% darker than base)
- Light mode active: `filter: brightness(0.83)` (17% darker than base)
- Alternative (CSS): mix base color with black at 10% for hover, 18% for active

### Icon Button (square, icon-only)

```css
.btn-icon {
  width: var(--button-height-md);    /* 40px — equal width and height */
  height: var(--button-height-md);
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* Icon size: 16px for sm (32px button), 18px for md (40px button), 20px for lg (48px button) */
```

## Input States

### Text Input Full State Specification

```css
/* DEFAULT */
.input {
  background: var(--color-surface);             /* #ffffff */
  border: 1px solid var(--input-border);        /* 1px solid #d1d5db */
  border-radius: var(--input-radius);           /* 8px */
  height: var(--input-height-md);              /* 40px */
  padding: var(--input-padding);               /* 0 12px */
  font-size: var(--input-font-size);           /* 14px */
  font-weight: 400;
  color: var(--color-text);                    /* #111827 */
  transition: border-color 100ms cubic-bezier(0,0,0.2,1),
              box-shadow 100ms cubic-bezier(0,0,0.2,1);
  outline: none;
  width: 100%;
}

.input::placeholder {
  color: var(--color-text-tertiary);            /* #9ca3af */
  font-weight: 400;
}

/* HOVER */
.input:hover:not(:focus):not([aria-invalid="true"]):not(:disabled) {
  border-color: var(--color-border-strong);     /* #d1d5db → #9ca3af — slightly darker */
}

/* FOCUS */
.input:focus {
  border-color: var(--color-border-focus);      /* #3b82f6 */
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);  /* focus ring: accent at 20% opacity */
}

/* ERROR */
.input[aria-invalid="true"],
.input.error {
  border-color: var(--color-border-error);      /* #ef4444 */
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}

/* SUCCESS */
.input.success {
  border-color: var(--color-success);           /* #16a34a */
  box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.15);
}

/* DISABLED */
.input:disabled {
  background: var(--color-surface-overlay);     /* #f3f4f6 */
  border-color: var(--color-border);            /* #e5e7eb */
  color: var(--color-text-disabled);            /* #d1d5db */
  cursor: not-allowed;
  opacity: 1;  /* Don't use opacity for input — use explicit color changes */
}
```

### Input with Icon Padding

When an icon appears inside an input (left icon for search, right icon for clear/visibility toggle):
- Left icon: `padding-left: 40px`, icon at `left: 12px, top: 50%, translateY(-50%)`
- Right icon: `padding-right: 40px`, icon at `right: 12px, top: 50%, translateY(-50%)`
- Icon size: 16px
- Icon color: `var(--color-text-tertiary)` default, `var(--color-text-secondary)` on focus

## Select / Dropdown

```css
/* Trigger button */
.select-trigger {
  /* Same base styles as input */
  /* Plus: */
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
}

/* Chevron icon */
.select-chevron {
  width: 16px;
  height: 16px;
  color: var(--color-text-tertiary);
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}
.select-trigger[aria-expanded="true"] .select-chevron {
  transform: rotate(180deg);   /* Rotates 180deg when open */
}

/* Dropdown list */
.select-content {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);            /* 8px */
  box-shadow: 0 8px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08);
  padding: 4px;
  min-width: 100%;                             /* At least as wide as trigger */
  
  /* ENTER animation */
  transform-origin: top center;
  animation: dropdownIn 150ms cubic-bezier(0,0,0.2,1) forwards;
}

@keyframes dropdownIn {
  from { opacity: 0; transform: scaleY(0.95) translateY(-4px); }
  to   { opacity: 1; transform: scaleY(1)    translateY(0); }
}

/* Option item */
.select-option {
  height: 36px;
  padding: 0 8px;
  border-radius: 6px;
  font-size: 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 100ms ease;
}
.select-option:hover    { background: var(--color-surface-overlay); }   /* #f3f4f6 */
.select-option[aria-selected="true"] {
  background: var(--color-primary-subtle);     /* #eff6ff */
  color: var(--color-primary);                 /* #2563eb */
  font-weight: 600;
}
```

## Toggle / Switch

```css
/* Track */
.toggle {
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background: var(--color-border-strong);       /* off: #d1d5db */
  transition: background-color 150ms cubic-bezier(0.4,0,0.2,1);
  cursor: pointer;
  position: relative;
}
.toggle[aria-checked="true"] {
  background: var(--color-primary);             /* on: #2563eb */
}

/* Thumb */
.toggle-thumb {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 150ms cubic-bezier(0.4,0,0.2,1);
}
.toggle[aria-checked="true"] .toggle-thumb {
  transform: translateX(20px);    /* slides 20px right: (44px - 20px - 2px - 2px) */
}

/* Focus */
.toggle:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-background),
              0 0 0 4px var(--color-border-focus);
}
```

## Checkbox

```css
/* Box */
.checkbox {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1.5px solid var(--color-border-strong);  /* #d1d5db */
  background: var(--color-surface);
  transition: border-color 100ms ease, background-color 100ms ease;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
}
.checkbox:hover {
  border-color: var(--color-primary);
}
.checkbox[aria-checked="true"] {
  background: var(--color-primary);
  border-color: var(--color-primary);
}

/* Checkmark (SVG stroke animation) */
.checkbox-checkmark {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.checkbox-checkmark path {
  stroke: #ffffff;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 16;
  stroke-dashoffset: 16;
  transition: stroke-dashoffset 150ms cubic-bezier(0,0,0.2,1) 50ms;
  /* Delay 50ms after background changes — checkmark draws in after box fills */
}
.checkbox[aria-checked="true"] .checkbox-checkmark path {
  stroke-dashoffset: 0;   /* Draws the checkmark in */
}

/* Indeterminate state */
.checkbox[aria-checked="mixed"] {
  background: var(--color-primary);
  border-color: var(--color-primary);
  /* Show minus/dash icon instead of checkmark */
}
```

## Toast / Notification

```css
/* Container (portal, fixed position) */
.toast-container {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;   /* Container doesn't block clicks */
}
/* Mobile: bottom of screen */
@media (max-width: 767px) {
  .toast-container {
    top: auto;
    bottom: calc(16px + env(safe-area-inset-bottom));
    right: 16px;
    left: 16px;
  }
}

/* Toast element */
.toast {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08);
  padding: 12px 16px;
  max-width: 380px;
  min-width: 280px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  pointer-events: all;      /* Toast itself is interactive */

  /* ENTER animation: slides down from top (desktop) or up from bottom (mobile) */
  /* Handled by Framer Motion AnimatePresence */
}

/* Toast icon */
.toast-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-top: 1px;
}
/* success: #16a34a, error: #dc2626, warning: #d97706, info: #2563eb */

/* Toast content */
.toast-title   { font-size: 14px; font-weight: 600; color: var(--color-text); }
.toast-message { font-size: 13px; font-weight: 400; color: var(--color-text-secondary); margin-top: 2px; }

/* Progress bar (auto-dismiss timer indicator) */
.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: var(--color-primary);
  border-radius: 0 0 10px 10px;
  animation: toastProgress 5000ms linear forwards;  /* 5000ms = auto-dismiss delay */
}
/* Hover pauses via animation-play-state: paused on .toast:hover .toast-progress */
@keyframes toastProgress {
  from { width: 100%; }
  to   { width: 0%; }
}
```

**Auto-dismiss timing:** 5000ms for informational toasts, 8000ms for error toasts (more time to read), no auto-dismiss for action toasts (require explicit dismissal).

## Dialog / Modal

```css
/* Backdrop */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 40;
  /* ENTER: opacity 0→1, 200ms ease-out */
  /* EXIT: opacity 1→0, 150ms ease-in */
}

/* Dialog */
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 50;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.1);
  padding: 24px;
  width: 90vw;
  max-width: 480px;
  max-height: 85vh;
  overflow-y: auto;

  /* ENTER: scale 0.95→1, opacity 0→1, 250ms spring stiffness 300 damping 30 */
  /* EXIT:  scale 1→0.95, opacity 1→0, 200ms ease-in */
}

/* Mobile full-screen */
@media (max-width: 640px) {
  .modal {
    width: 100%;
    max-width: 100%;
    max-height: 90vh;
    bottom: 0;
    top: auto;
    left: 0;
    right: 0;
    transform: none;
    border-radius: 20px 20px 0 0;
    /* On mobile: treat as bottom sheet, not centered dialog */
  }
}
```

**Framer Motion modal:**
```js
const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.15, ease: "easeIn" }
  }
}
```

**Accessibility requirements:**
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to dialog title ID
- Focus trap: Tab/Shift+Tab cycle only through dialog focusable elements
- Return focus: on close, return focus to the element that triggered the dialog
- Escape key: closes the dialog
- Click on backdrop: closes the dialog
