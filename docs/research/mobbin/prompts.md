# Mobbin — AI Generation Prompts

These prompts are ready-to-use for generating production-quality web components that apply premium mobile app patterns. Each prompt specifies exact measurements, Framer Motion spring values, Tailwind responsive classes, and desktop adaptation.

---

## Prompt 1: Mobile Navigation (Bottom Tab Bar → Responsive)

```
Build a responsive navigation component in React + TypeScript + Tailwind CSS v4 + Framer Motion.

MOBILE BEHAVIOR (<768px):
- Fixed bottom navigation bar
- Height: 56px + env(safe-area-inset-bottom) for PWA safe area
- Background: rgba(255,255,255,0.92) with backdrop-filter: blur(20px)
- Top border: 0.5px solid rgba(0,0,0,0.12)
- Grid: 5 equal columns (or 4 if 4 items)
- Each tab: icon (24px, Lucide icons) stacked above label (10px, weight 600)
- Active tab: icon color = var(--color-accent, #5e6ad2), label color = var(--color-accent, #5e6ad2)
- Inactive tab: icon + label color = rgba(0,0,0,0.4)
- Icon active/inactive transition: 100ms ease-in-out
- Active indicator: none (color change is sufficient, no underline or dot on mobile)
- Touch target: full column width × full height (pointer-events on entire cell)

DARK MODE (mobile):
- Background: rgba(15,15,15,0.92) with backdrop-filter: blur(20px)
- Border: rgba(255,255,255,0.08)
- Inactive: rgba(255,255,255,0.4)

DESKTOP BEHAVIOR (≥768px):
- Convert to left sidebar, width 240px
- Fixed left, full height, background: #f9fafb (dark: #111111)
- Logo/wordmark at top, 20px padding, height 60px
- Nav items: vertical list, each item 40px height, 8px border-radius, horizontal layout (icon left 20px + label)
- Active item: background rgba(94,106,210,0.1), text color #5e6ad2, icon color #5e6ad2
- Hover item: background rgba(0,0,0,0.04), 150ms ease-out
- Bottom of sidebar: user avatar + name + settings icon
- Main content: margin-left 240px on desktop

FRAMER MOTION:
- Tab active icon: whileTap={{ scale: 0.85 }}, transition={{ type: "spring", stiffness: 400, damping: 25 }}
- Content area on tab switch: AnimatePresence mode="wait", opacity 0→1, duration 150ms ease-in-out
- Sidebar on mobile: drawer that slides in from left, AnimatePresence, x: -240→0, spring stiffness 300 damping 30
- Sidebar overlay: opacity 0→0.5, 200ms ease-out

PROPS INTERFACE:
interface NavItem {
  id: string
  label: string
  icon: LucideIcon
  href: string
  badge?: number  // notification count, max display "9+"
}

interface NavigationProps {
  items: NavItem[]
  activeId: string
  onNavigate: (id: string) => void
  logo?: React.ReactNode
  userSection?: React.ReactNode
}
```

---

## Prompt 2: Onboarding Flow (Multi-Step with Spring Transitions)

```
Build a multi-step onboarding flow component in React + TypeScript + Tailwind CSS v4 + Framer Motion.

STRUCTURE:
- Full-screen overlay (position: fixed, inset: 0, z-index: 50)
- Backdrop: rgba(0,0,0,0.5), opacity fade-in 200ms
- Content: centered card, max-width 480px, min-height 520px on desktop; full-screen on mobile
- Mobile: rounded-top corners only (border-radius 20px 20px 0 0), bottom-anchored
- Desktop: border-radius 16px, box-shadow: 0 24px 64px rgba(0,0,0,0.2)

STEP LAYOUT (each step):
- Visual area: top 40% of card — illustration placeholder (120px centered icon/SVG slot)
- Content area: bottom 60%
  - Heading: 24px, weight 700, color: #111827, line-height 1.25, margin-bottom 12px
  - Subtext: 16px, weight 400, color: #6b7280, line-height 1.5, margin-bottom 32px
  - Primary button: full-width, height 52px, border-radius 12px, font-size 16px weight 600

PROGRESS INDICATOR:
- Dots row centered below heading
- Inactive dot: 6px × 6px circle, background rgba(0,0,0,0.15), border-radius 3px
- Active dot: 20px × 6px pill, background var(--accent, #5e6ad2), border-radius 3px
- Gap between dots: 6px
- Width transition (inactive → active): 300ms spring stiffness 300 damping 30
- Color transition: 150ms ease

TRANSITIONS BETWEEN STEPS:
- Direction-aware: forward → current exits left (-40px + opacity 0), next enters from right (+40px → 0)
- Direction-aware: backward → current exits right, previous enters from left
- Duration: spring stiffness 280, damping 30
- AnimatePresence mode="wait" with custom prop

SKIP BUTTON:
- Position: absolute top-4 right-4
- Style: 14px, weight 400, color: rgba(0,0,0,0.4), no background, no border
- Hover: color rgba(0,0,0,0.7), 100ms ease
- Show on all steps except final step

FINAL STEP (conversion screen):
- No skip button
- "Get started" as primary CTA
- Optional: social proof ("Join 12,000 teams already using...")
- Optional: secondary link "Sign in instead"

FRAMER MOTION SPECIFICS:
- Step content: custom x direction variant (pass direction as custom prop to AnimatePresence)
- Progress dot: layout animation on width change (add layout prop to dot element)
- Button press: whileTap={{ scale: 0.97 }}, transition spring stiffness 400 damping 25

PROPS:
interface OnboardingStep {
  id: string
  illustration?: React.ReactNode
  heading: string
  subtext: string
  ctaLabel?: string  // defaults to "Continue"
}

interface OnboardingFlowProps {
  steps: OnboardingStep[]
  onComplete: () => void
  onSkip?: () => void
  isOpen: boolean
}
```

---

## Prompt 3: Card List with Swipe Actions

```
Build a swipeable card list component in React + TypeScript + Tailwind CSS v4 + Framer Motion.

CARD STRUCTURE:
- Background: #ffffff (dark: #1a1a1a)
- Border: 1px solid rgba(0,0,0,0.08) (dark: rgba(255,255,255,0.08))
- Border-radius: 12px
- Padding: 16px
- Min-height: 72px
- Layout: [left-icon 40px] [content flex-1] [right-meta]
  - Left icon: 40×40px, border-radius 10px, background: rgba(0,0,0,0.06)
  - Content: title (15px, weight 600, color #111827) + subtitle (13px, weight 400, color #6b7280)
  - Right meta: timestamp (12px, color #9ca3af) + optional chevron (16px, color rgba(0,0,0,0.25))
- Gap between cards: 8px

SWIPE BEHAVIOR (mobile touch, <768px):
- Drag axis: x only (dragConstraints: {{ left: -80, right: 0 }}, dragElastic: 0.1)
- At x = -80: delete action fully revealed (right side, 80px wide, background #ef4444)
- Delete action content: trash icon 20px centered, white, label "Delete" 11px white below icon
- Commit threshold: release at x < -60px → animate card to x: -100%, 200ms ease-in, then remove from list
- Spring back threshold: release at x > -60px → spring back to x: 0, stiffness 400 damping 40

SWIPE REVEAL LAYER:
- Position: absolute, right: 0, top: 0, bottom: 0, width: 80px
- Border-radius: 0 12px 12px 0 (right corners match card)
- Background: #ef4444
- Scales from 0.9 → 1 as card reaches full -80px displacement
- Only visible on mobile (hidden md:hidden)

DESKTOP BEHAVIOR (≥768px):
- No swipe — show hover actions instead
- On card hover: right-aligned action icons appear (opacity 0 → 1, 150ms ease)
- Actions: edit icon + delete icon, 16px each, color rgba(0,0,0,0.4), hover color #ef4444 for delete

PRESS / TAP:
- whileTap={{ scale: 0.99 }} on desktop, no scale on mobile (feels wrong during swipe)
- Card press on mobile: background opacity to 0.95 (native iOS highlight equivalent)

LIST CONTAINER:
- Overflow-x: hidden on container (prevents horizontal scroll during swipe)
- Gap: 8px between cards (not list style, no dividers)
- Padding: 0 16px (16px horizontal page margin)

FRAMER MOTION SPECIFICS:
- Each card: drag="x" with dragConstraints and dragElastic
- onDragEnd handler: check event.offset.x, commit or spring back
- Delete animation: animate to {{ x: "-100%", opacity: 0 }}, then call onDelete callback
- AnimatePresence wraps list items for removal animation

PROPS:
interface CardItem {
  id: string
  icon?: React.ReactNode
  title: string
  subtitle?: string
  timestamp?: string
  href?: string
  onDelete?: (id: string) => void
  onEdit?: (id: string) => void
}

interface SwipeCardListProps {
  items: CardItem[]
  onItemClick?: (id: string) => void
  className?: string
}
```

---

## Prompt 4: Empty State Component

```
Build an empty state component in React + TypeScript + Tailwind CSS v4 + Framer Motion.

LAYOUT:
- Centered layout (flex flex-col items-center justify-center)
- Minimum height: 320px for inline use, full remaining viewport for full-page use
- Vertical center is 10% above mathematical center (padding-bottom: 10% of container height)

VISUAL ELEMENT:
- Container: 80px × 80px centered, margin-bottom 20px
- Icon variant: 40px Lucide icon, color: rgba(0,0,0,0.25), inside 80px container
- Illustration variant: 120px × 120px SVG slot, margin-bottom 20px
- Icon container: background rgba(0,0,0,0.04), border-radius 20px (or 40px for circle)

TYPOGRAPHY:
- Heading: 20px, weight 600, color #111827 (dark: #f9fafb), text-align center
- Subtext: 15px, weight 400, color #6b7280 (dark: #9ca3af), text-align center, max-width 280px, margin-top 8px, line-height 1.5

ACTION:
- Primary button: margin-top 24px, height 44px, min-width 160px, max-width 240px
- Button: border-radius 10px, background var(--accent, #5e6ad2), color white, font-size 15px weight 600
- Hover: background darkens 10% (filter: brightness(0.9)), 150ms ease
- Optional secondary action: plain text link below button, 14px, accent color, margin-top 12px

ENTRANCE ANIMATION:
- On mount: icon floats up (y: 16px → 0, opacity 0 → 1), 400ms spring stiffness 280 damping 25, delay 0ms
- Heading: y: 12px → 0, opacity 0 → 1, spring stiffness 280 damping 25, delay 80ms
- Subtext: same pattern, delay 160ms
- Button: y: 8px → 0, opacity 0 → 1, spring stiffness 280 damping 25, delay 240ms
- Use staggerChildren in Framer Motion variants for clean sequence

VARIANTS:
- "no-data": default icon (InboxIcon or equivalent), "Nothing here yet", "Add your first item to get started"
- "no-results": search icon, "No results found", "Try a different search term"
- "error": cloud-off icon, "Something went wrong", "Check your connection and try again"
- "empty-folder": folder-open icon, "This folder is empty", "Move items here to organize them"

PROPS:
interface EmptyStateProps {
  variant?: "no-data" | "no-results" | "error" | "empty-folder" | "custom"
  illustration?: React.ReactNode  // overrides default icon
  heading?: string
  subtext?: string
  action?: {
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  className?: string
  fullPage?: boolean  // min-height: 100vh - header height
}
```

---

## Prompt 5: Mobile Search Component (Expandable Bar + Results)

```
Build a mobile search component in React + TypeScript + Tailwind CSS v4 + Framer Motion.

COLLAPSED STATE:
- Pill container: height 36px, border-radius 18px, background rgba(0,0,0,0.06)
- Width: 100% of parent minus 32px margin
- Padding: 0 12px
- Left: magnifying glass icon (16px, color rgba(0,0,0,0.4))
- Right: "Search" placeholder text (15px, color rgba(0,0,0,0.4))
- Tap anywhere: transitions to expanded state

EXPANDED STATE:
- Input: full-width, no border, no background, font-size 17px, height 44px
- Wrapper: background rgba(0,0,0,0.06), border-radius 12px (rectangular, not pill)
- Padding: 0 12px
- Right of wrapper: "Cancel" button
  - Appears with: x from 20px → 0, opacity 0 → 1, 200ms ease-out
  - Style: 15px, weight 400, color: var(--accent, #5e6ad2), no background, margin-left 8px
  - Tap: clears input, collapses back to collapsed state, dismisses keyboard (blur)

TRANSITION (collapsed → expanded):
- Width: animates from pill to full-width, 200ms ease-out
- Border-radius: 18px → 12px, same timing
- "Search" text: opacity 1 → 0, 100ms
- Real input: opacity 0 → 1 after 100ms, then auto-focus

RECENT SEARCHES (shown when expanded, no query):
- List below search bar, slides down: height 0 → auto, 200ms ease-out
- Section label: "Recent" — 12px, uppercase, weight 600, letter-spacing 0.05em, color rgba(0,0,0,0.4)
- Each item: clock icon (14px) + search term (15px, weight 400) + X button (dismiss this recent)
- Item height: 44px, touch target full width
- Max: 5 recent items

SEARCH RESULTS (shown when query has ≥1 character, after 200ms debounce):
- Replace page content with results list (not a separate page)
- Results appear: opacity 0 → 1, y 8px → 0, 200ms ease-out
- Each result: matches the list item spec from interactions.md
- Matched text: color var(--accent), weight 700 on the substring that matches query
- "No results": show EmptyState variant="no-results" inline

KEYBOARD HANDLING:
- Enter key: trigger full search (navigate to results page or filter)
- Escape key: clear input if has content, collapse if empty
- Arrow keys: navigate between recent searches / suggestions

DESKTOP ADAPTATION (≥768px):
- Convert to standard input with icon (not expandable)
- Width: 240px collapsed, 360px on focus (transition 200ms ease-out)
- No "Cancel" button — click outside or Escape to collapse
- Dropdown results panel instead of full-page results

PROPS:
interface SearchProps {
  placeholder?: string
  onSearch: (query: string) => void
  onClear?: () => void
  recentSearches?: string[]
  onRecentClear?: (term: string) => void
  results?: React.ReactNode  // rendered results list
  isLoading?: boolean
  className?: string
}
```

---

## Prompt 6: Sheet / Drawer Component (Bottom Sheet on Mobile)

```
Build a bottom sheet / drawer component in React + TypeScript + Tailwind CSS v4 + Framer Motion.

MOBILE BEHAVIOR (<768px):
- Slides up from bottom of screen
- Cover: fixed overlay, rgba(0,0,0,0.5), z-index 40
- Sheet: fixed bottom-0 left-0 right-0, z-index 50
- Border-radius: 20px 20px 0 0 (top corners only)
- Background: #ffffff (dark: #1e1e1e)
- Padding: 0 0 env(safe-area-inset-bottom) 0

HANDLE:
- 36px × 4px, background rgba(0,0,0,0.15), border-radius 2px
- Centered, margin: 12px auto

HEIGHTS:
- Default: fits content (up to 85vh, then scrollable internally)
- Snap points: 40vh, 70vh, 85vh (if multiple heights desired)
- At 85vh: top of sheet is near top of screen, round all corners 12px

HEADER (optional):
- Title: 17px, weight 600, centered, color #111827
- Close button: absolute right-4 top-4, 24×24px circle, background rgba(0,0,0,0.06), X icon 14px
- Divider: 1px solid rgba(0,0,0,0.08) below header if content scrolls

CONTENT:
- Padding: 0 20px 20px
- Scrollable if content exceeds max-height
- Scroll indicator: fade-out gradient at bottom of content area (16px gradient to white/background)

DRAG TO DISMISS:
- Drag handle and sheet background are draggable downward
- Resistance: 1:1 below natural position (no resistance on drag down)
- Dismiss threshold: dragged down 120px or velocity > 500px/s
- Below threshold: spring back to original position, stiffness 400 damping 35
- Above threshold: animate to y: "100%", 250ms spring stiffness 300 damping 35, call onClose

ENTER / EXIT ANIMATION:
- Enter: y from "100%" to 0, spring stiffness 300, damping 30
- Exit: y from 0 to "100%", spring stiffness 300, damping 35
- Backdrop enter: opacity 0 → 0.5, 200ms ease-out (slightly ahead of sheet)
- Backdrop exit: opacity 0.5 → 0, 200ms ease-in (slightly after sheet starts closing)

DESKTOP BEHAVIOR (≥768px):
- Convert to right-side drawer: width 400px, slides in from right
- Fixed right-0 top-0 bottom-0
- Enter: x from 400px to 0, spring stiffness 300 damping 30
- Background overlay: same as mobile
- Close button in top-right, same style
- Internal scroll: overflow-y auto, height 100vh

ACCESSIBILITY:
- aria-modal="true" on sheet container
- aria-label or aria-labelledby pointing to title
- Focus trap inside sheet when open
- Escape key dismisses sheet (call onClose)
- First focusable element receives focus on open

PROPS:
interface SheetProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  snapPoints?: number[]  // vh values e.g. [40, 70, 85]
  initialSnap?: number   // index into snapPoints
  className?: string
}
```

---

## Prompt 7: Tab Interface (iOS-Style with Spring Animation)

```
Build a tab interface component in React + TypeScript + Tailwind CSS v4 + Framer Motion.

VISUAL DESIGN:
- Outer container: background rgba(0,0,0,0.06), border-radius 10px, padding 2px
- Tab items: equal-width flex children, height 34px (total container: 38px)
- Active tab: white background (dark: #2a2a2a), border-radius 8px, box-shadow: 0 1px 3px rgba(0,0,0,0.12)
- Active tab text: #111827 (dark: #f9fafb), weight 600, font-size 14px
- Inactive tab text: rgba(0,0,0,0.5) (dark: rgba(255,255,255,0.5)), weight 500, font-size 14px
- Transition: text color 150ms ease

ANIMATED INDICATOR:
- The white background is a Framer Motion `layoutId` element — it slides between tabs
- `layoutId="tab-indicator"` on the active background element
- Framer Motion `layout` transition: spring stiffness 300, damping 30
- This creates the physical slide as tabs switch — the indicator follows the active tab

SIZES:
- sm: height 30px (container 34px), font-size 12px, border-radius 7px (outer 9px)
- md: height 34px (container 38px), font-size 14px, border-radius 8px (outer 10px) ← default
- lg: height 40px (container 44px), font-size 15px, border-radius 9px (outer 11px)

CONTENT AREA:
- Content below tab bar: AnimatePresence mode="wait"
- Direction-aware: tabs to the right of current → content enters from right
- Transition: x ±24px + opacity 0→1, spring stiffness 280 damping 30
- No content transition if switching tabs rapidly (cancel previous animation)

TAB VARIANTS:
- Default: text only
- With icons: icon (16px) left of label, gap 6px
- With badge: count badge on tab (right-aligned, accent background, 10px text)
  - Badge: min-width 18px, height 18px, border-radius 9px, background var(--accent)
  - Slide in from right when badge count > 0, spring stiffness 400 damping 25

SCROLL TABS (many items):
- If more than 5 tabs: horizontal scroll, no scrollbar visible (scrollbar-none class)
- Active tab always scrolled into view (scrollIntoView smooth behavior)
- Fade-out edges: left/right gradient overlays (24px, bg to transparent)

KEYBOARD NAVIGATION:
- Arrow left/right: move active tab
- Home/End: first/last tab
- Tab key: follows DOM order (tab items are buttons)

FRAMER MOTION SPECIFICS:
- Indicator: `<motion.div layoutId="tab-indicator" layout transition={{ type: "spring", stiffness: 300, damping: 30 }} />`
- Content: custom direction variant (pass direction as AnimatePresence custom prop)
- Ensure `LayoutGroup` wraps the component if multiple instances on same page

PROPS:
interface TabItem {
  id: string
  label: string
  icon?: LucideIcon
  badge?: number
  content: React.ReactNode
}

interface TabsProps {
  items: TabItem[]
  defaultActiveId?: string
  activeId?: string  // controlled mode
  onChange?: (id: string) => void
  size?: "sm" | "md" | "lg"
  className?: string
}
```
