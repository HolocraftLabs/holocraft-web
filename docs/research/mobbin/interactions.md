# Mobbin — Interactions

## Tab Navigation

Bottom tab bars are the primary navigation pattern in iOS apps with 4–5 major destinations. They persist across all views in their section, always accessible.

**Structure:**
- Item count: 4–5 (never 3, never 6+)
- Item components: icon (24pt) + label (10pt, weight 500)
- Active state: icon filled (not outlined), label color = accent, label weight 600
- Inactive state: icon outlined or at 60% opacity, label color = secondary text, weight 500
- Background: `systemBackground` with a 0.5px top hairline border at `rgba(0,0,0,0.15)` (iOS "separator")
- Minimum height: 49pt (iOS HIG) + safe area inset bottom
- Touch target: full tab width × full height (no smaller hit areas)

**Web translation — mobile viewport (<768px):**
```css
position: fixed;
bottom: 0;
left: 0;
right: 0;
height: 56px; /* + env(safe-area-inset-bottom) for PWA */
padding-bottom: env(safe-area-inset-bottom);
background: rgba(255,255,255,0.92);
backdrop-filter: blur(20px);
border-top: 0.5px solid rgba(0,0,0,0.12);
display: grid;
grid-template-columns: repeat(5, 1fr);
```

**Web translation — desktop viewport (≥768px):**
Convert to sidebar navigation (vertical list of icon + label items, left-aligned, 240px width) or top navigation bar (horizontal links, right-aligned actions).

## Swipe Gestures

**Swipe right to go back (navigation)**
- Begins at left edge (within 20px of screen left)
- 1:1 finger tracking of the current view
- Threshold: 50% of screen width crossed → commits to pop animation
- Below threshold → springs back to full screen
- Parallax: previous view tracks at 30% of swipe velocity (appears from left)

**Swipe card left to reveal delete action**
- Card slides left, revealing red delete button behind it (right-aligned)
- Delete button width: 80px, background: `#ef4444`
- Reveal starts at 1px displacement, proportional to swipe distance
- Commit threshold: 80px displacement (full button width revealed)
- Delete button tap: card animates off screen left at 250ms ease-in

**Long press for context menu**
- Activation: 500ms hold duration (no movement)
- Visual feedback at 300ms: scale 0.95 on the pressed element (haptic in native, visual only on web)
- Context menu appears: fades in + scales from 0.9 → 1.0, 150ms spring
- Menu position: above the element if below half-screen; below if above half-screen
- Dismiss: tap outside, 100ms fade-out

## Search

### Expandable Search Bar
Premium apps use a search bar that expands to full-width on activation, hiding non-search UI elements.

**Collapsed state:**
- Icon-only (magnifying glass, 20px) or icon + "Search" placeholder text
- Background: `rgba(0,0,0,0.06)` rounded pill shape, height 36px
- Border-radius: 18px (pill)

**Expanded state (focused):**
- Full-width input, same pill shape
- Keyboard appears from bottom (browser behavior)
- "Cancel" button slides in from right: opacity 0 → 1, x from 20px → 0, 200ms ease-out
- Recent searches list appears below input: slides down from 0px height, 200ms ease-out

**Search results:**
- Appear as list replaces page content (no separate page navigation)
- Real-time filtering: debounce 200ms after keystroke
- Highlighted match text: accent color, weight 600, on matched substring
- No results state: centered illustration + "No results for '[query]'" text

## Onboarding Flow

Premium apps (Airbnb, Robinhood, Linear, Superhuman) converge on this onboarding pattern:

**Structure:**
1. Screen 1: Value prop — single large heading + supporting image + "Continue" button
2. Screen 2: Key feature 1 — illustration + 3-word heading + 1-line description
3. Screen 3: Key feature 2 — same format
4. (Optional) Screen 4: Permission request — explain why before asking (location, notifications)
5. Final screen: Account creation or sign-in — minimum fields (email only, or "Continue with Apple/Google")

**Progress indicator:**
```css
/* Dots */
width: 6px;
height: 6px;
border-radius: 3px;
gap: 6px;
/* Active dot */
background: var(--color-accent);
width: 20px; /* Active dot stretches to pill shape */
border-radius: 10px;
transition: width 300ms spring, background 150ms;
/* Inactive dot */
background: rgba(0,0,0,0.15);
```

**Screen transition:**
- Slide: current screen exits left (`translateX(-100%)`), next enters from right (`translateX(100%)`)
- Duration: 350ms spring (stiffness 280, damping 30)
- Alternative: horizontal fade + subtle slide (translateX ±30% + opacity)

**Skip button:**
- Top-right position, 15px, color: `rgba(0,0,0,0.4)`, weight 400
- Always visible (accessibility: users must never be trapped in onboarding)

**Continue button:**
- Full-width, height 52px, border-radius 12px
- Bottom of screen, above safe area inset
- Primary filled style

## Empty States

Every content area must have a defined empty state. Structure is invariant:

```
[Visual]     → 120px illustration SVG or 48px icon
[Heading]    → 2–4 words, 20px, weight 600, centered
[Subtext]    → 1 sentence max, 15px, weight 400, color: secondary, centered
[Action]     → Primary button, same spec as global primary CTA
```

**Visual options by context:**
- Lists with no items: clipboard/list icon, or custom illustration
- Search with no results: magnifying glass + "?" icon
- Error state: cloud with X, or exclamation triangle
- Permission required: lock icon, or camera/location icon

**Centering:**
- Vertical: 10% above true center (slightly above center feels more natural than mathematically centered)
- Horizontal: full-width with 32px horizontal padding

**Spacing:**
```
Icon/illustration: margin-bottom 16px
Heading: margin-bottom 8px
Subtext: margin-bottom 24px
Action button: standard width (min 160px, max 240px)
```

## Loading States

### Skeleton Screens (primary loading pattern)
Replace every content element with a grey placeholder of matching dimensions:
- Text lines: height 12–16px, border-radius 4px, width varies (60%, 80%, 40% alternating)
- Avatars: circle, matches avatar size
- Cards: matching height, border-radius matches card
- Images: matching aspect ratio rectangle

### Spinner (only for action feedback, not initial load)
Used when: form submission, button action in progress, background data sync.
- Size: 20px for inline, 32px for centered in small areas
- Stroke width: 2px
- Color: current text color (inherits for visibility on any background)
- Speed: 1 revolution per 800ms

### Progress Bar (for known-duration operations)
- Height: 3–4px
- Color: accent color
- Animation: linear for fake progress (starts fast, slows near 90%), instant jump to 100% on complete

## Form Patterns

### Inline Validation
- Validate on blur (not on keystroke) — except for confirming password match
- Error state: border changes from `#d1d5db` to `#ef4444`, error message appears below input
- Error message: 13px, color `#ef4444`, slide down from 0 height, 150ms ease-out
- Success state: border changes to `#10b981`, optional checkmark icon in right of input

### Clear Button
- Appears in right of input when field has content and is focused
- Icon: X circle, 16px, color: `rgba(0,0,0,0.3)`
- Tap: clears field, maintains focus
- Disappears: when field is empty or unfocused

### Character Count
- Appears at bottom-right of input when within 20% of limit
- Color: normal state `rgba(0,0,0,0.4)`, warning at 90%: `#f59e0b`, over limit: `#ef4444`
- Format: "143 / 160" or "17 remaining"

### Field Labels
- Above the input, not inside (placeholder text is not a label)
- 13px, weight 600, color: `rgba(0,0,0,0.65)`, margin-bottom 6px

## Lists

### Pull to Refresh
- Rubber band resistance: 40% of finger movement
- Spinner appears at 60px pull displacement
- Spinner opacity: linear 0 → 1 between 20px and 60px displacement
- Release above 60px: triggers refresh, spinner starts rotating, content reloads
- Release below 60px: spring back, stiffness 400, damping 35

### Infinite Scroll
- Load next page trigger: 200px before bottom of list
- Loading indicator: centered spinner, 24px, margin 16px top and bottom
- End of list indicator: centered text, 13px, color: tertiary, "You've reached the end" or similar
- Never: "Load more" button (pagination buttons are mobile anti-pattern)

### List Item Structure
```
[Left: Avatar/Icon 40px] [Center: Title + Subtitle] [Right: Metadata/Chevron]

Left:    40×40px image/icon, border-radius 8px (square) or 20px (avatar)
Center:  Title: 15–17px, weight 600; Subtitle: 13–15px, weight 400, color: secondary
Right:   Timestamp or count: 13px, color: tertiary; Chevron: 16px, color: rgba(0,0,0,0.25)
```

Minimum item height: 44px (touch target compliance). Standard item height: 56–64px (title + subtitle).
