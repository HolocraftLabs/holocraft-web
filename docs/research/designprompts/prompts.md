# DesignPrompts — AI Generation Prompts

These prompts are the building blocks for any Holocraft product. They generate production-quality, accessible, fully-typed React components. Each prompt is immediately usable for code generation.

---

## Prompt 1: Button Component (All Variants, Sizes, States)

```
Build a Button component in React + TypeScript + Tailwind CSS v4 + Framer Motion.

VARIANTS (visual style):
- "primary":     background var(--color-primary, #2563eb), text white
- "secondary":   background transparent, border 1px solid var(--color-primary), text var(--color-primary)
- "outline":     background white/surface, border 1px solid #d1d5db, text #374151
- "ghost":       background transparent, no border, text #374151; hover shows background
- "destructive": background #dc2626, text white
- "link":        no background, no border, text var(--color-primary), underline on hover

SIZES:
- "sm": height 32px, padding 0 12px, font-size 13px, border-radius 6px, icon 14px
- "md": height 40px, padding 0 16px, font-size 14px, border-radius 8px, icon 16px (default)
- "lg": height 48px, padding 0 20px, font-size 15px, border-radius 10px, icon 18px

STATES:
- default: base styles above
- hover: background darkens 10% (primary/destructive) or bg appears (ghost/outline), 100ms ease-out
- active: scale(0.97), additional 5% darker background, 50ms linear
- focus-visible: box-shadow 0 0 0 2px white, 0 0 0 4px #3b82f6 (2px white gap + 2px accent ring)
- disabled: opacity 0.5, cursor not-allowed, pointer-events none
- loading: spinner replaces left icon (or appears left of label), cursor wait, pointer-events none

ICON POSITIONS:
- iconLeft: icon appears 8px left of label
- iconRight: icon appears 8px right of label  
- iconOnly: no label, equal width/height (square button), icon centered

FULL-WIDTH:
- fullWidth?: boolean — width: 100% when true

LOADING INDICATOR:
- 16px spinner SVG, stroke currentColor, stroke-width 1.5
- Rotates 1 revolution per 800ms
- Replaces iconLeft if present; otherwise appears 8px left of label
- Label text stays visible (no hiding — prevents width collapse)

FRAMER MOTION:
- whileTap={{ scale: 0.97 }} on all variants except "link"
- transition={{ type: "spring", stiffness: 400, damping: 25 }}
- Loading spinner: animate={{ rotate: 360 }}, transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}

ACCESSIBILITY:
- Native <button> element (not <div>)
- aria-disabled="true" when disabled (still focusable for screen reader announcement)
- aria-busy="true" when loading
- aria-label required when iconOnly
- type="button" by default (prevents form submission)
- type="submit" when used in forms

TYPESCRIPT PROPS:
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link"
  size?: "sm" | "md" | "lg"
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  iconOnly?: React.ReactNode  // if provided, renders icon-only square button
  isLoading?: boolean
  loadingText?: string       // screen reader text during loading, defaults to "Loading..."
  fullWidth?: boolean
  asChild?: boolean          // Radix-style: renders as child element (for Link wrapping)
}
```

---

## Prompt 2: Input Component (Text, Email, Password with Toggle, Icon Variants)

```
Build an Input component system in React + TypeScript + Tailwind CSS v4.

BASE INPUT:
- Background: #ffffff (dark: #111111)
- Border: 1px solid #d1d5db (dark: #2a2a2a)
- Border-radius: 8px
- Height: 40px (md), 32px (sm), 48px (lg)
- Padding: 0 12px
- Font-size: 14px (md), 13px (sm), 15px (lg)
- Font-weight: 400
- Color: #111827 (dark: #f9fafb)
- Placeholder: #9ca3af (dark: #6b7280)
- Width: 100%
- transition: border-color 100ms ease-out, box-shadow 100ms ease-out

STATE BORDERS AND RINGS:
- hover:   border-color: #9ca3af (not on error/disabled)
- focus:   border-color: #3b82f6, box-shadow: 0 0 0 3px rgba(59,130,246,0.2)
- error:   border-color: #ef4444, box-shadow: 0 0 0 3px rgba(239,68,68,0.15)
- success: border-color: #16a34a, box-shadow: 0 0 0 3px rgba(22,163,74,0.15)
- disabled: background: #f3f4f6, border-color: #e5e7eb, color: #9ca3af, cursor: not-allowed

INPUT WRAPPER (with label + helper + error):
- Label: 14px, weight 500, color #111827, margin-bottom 6px
- Input field
- Helper text: 12px, weight 400, color #6b7280, margin-top 4px
- Error message: 12px, weight 400, color #ef4444, margin-top 4px (replaces helper when error)
- Error slides in: height 0→auto, opacity 0→1, 150ms ease-out on mount

LEFT ICON:
- Position absolute, left: 12px, vertically centered
- Size: 16px, color: #9ca3af (idle), #6b7280 (focused)
- Input padding-left adjusts to 40px when icon present
- Icon color transitions: 100ms ease

RIGHT ELEMENT (one of: icon, clear button, character count, password toggle):
- Position absolute, right: 12px, vertically centered
- Input padding-right adjusts to 40px

CLEAR BUTTON:
- Shows when: field is focused AND has content (input value.length > 0)
- Icon: X-circle 16px, color: #9ca3af
- Hover: color #6b7280, 100ms
- Click: clears value, keeps focus on input
- Hide with: opacity 0 + pointer-events none when not visible (smooth, no layout shift)

CHARACTER COUNT:
- Shows when: maxLength prop is set AND (value.length / maxLength) > 0.7 (within 30% of limit)
- Format: "47 / 60"
- Font: 12px, monospace (tabular-nums), color #9ca3af
- At 90%: color #f59e0b
- At 100%+: color #ef4444

PASSWORD INPUT:
- type="password" by default
- Right element: eye / eye-off icon toggle (16px, color #9ca3af, hover #6b7280)
- Click eye: toggles input type between "password" and "text"
- aria-label: "Show password" / "Hide password"

TEXTAREA VARIANT:
- min-height: 80px, resize: vertical (user can resize)
- Same border/focus/error styles as input
- Padding: 10px 12px (not 0 on vertical — text needs top/bottom padding)
- Line-height: 1.5

PROPS:
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  errorMessage?: string
  successMessage?: string
  leftIcon?: React.ReactNode
  rightElement?: React.ReactNode
  showClear?: boolean
  onClear?: () => void
  showCharCount?: boolean
  // Password specific:
  showPasswordToggle?: boolean
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helperText?: string
  errorMessage?: string
  showCharCount?: boolean
  minRows?: number
  maxRows?: number  // auto-grows up to this row count
}
```

---

## Prompt 3: Card Component (Base, Elevated, Interactive Variants)

```
Build a Card component system in React + TypeScript + Tailwind CSS v4 + Framer Motion.

BASE CARD:
- Background: #ffffff (dark: #111111)
- Border: 1px solid rgba(0,0,0,0.08) (dark: rgba(255,255,255,0.08))
- Border-radius: 12px
- Padding: 20px (default), 16px (compact), 24px (spacious)
- No box-shadow (border communicates edge)
- Overflow: hidden (children respect border-radius)

ELEVATED CARD:
- Same base styles
- Border: 1px solid rgba(0,0,0,0.06)
- Box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)
- Dark mode shadow: 0 1px 3px rgba(0,0,0,0.4)

INTERACTIVE CARD (clickable/hoverable):
- Base: same as Elevated Card
- Cursor: pointer
- transition: box-shadow 150ms ease-out, transform 150ms ease-out, border-color 150ms ease-out

- Hover:
  box-shadow: 0 4px 12px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)
  transform: translateY(-2px)
  border-color: rgba(0,0,0,0.12)

- Active (mousedown):
  transform: translateY(0px)
  box-shadow: 0 1px 3px rgba(0,0,0,0.1)
  150ms ease

- Focus-visible: box-shadow includes focus ring (0 0 0 2px white, 0 0 0 4px #3b82f6) combined with card shadow

FRAMER MOTION (Interactive Card):
- whileHover: no Framer Motion — use CSS transform for performance
- whileTap={{ scale: 0.99, transition: { duration: 0.1 } }}
- Exception: if card is inside a grid/list with layout animations, use Framer Motion layout prop

CARD SECTIONS (composable children):
- CardHeader: padding-bottom: 16px, border-bottom: 1px solid rgba(0,0,0,0.06) if followed by CardContent
  - CardTitle: 16px, weight 600, color #111827
  - CardDescription: 14px, weight 400, color #6b7280, margin-top 4px
- CardContent: padding-top: 16px (when preceded by CardHeader), default content area
- CardFooter: padding-top: 16px, border-top: 1px solid rgba(0,0,0,0.06), display flex, align-items center, gap 8px

CARD WITH MEDIA:
- Image: full-width, border-radius 12px 12px 0 0, aspect-ratio 16/9 (or as specified)
- Image + CardContent: image has no top-padding, connects flush to card top
- object-fit: cover on all card images

SELECTED STATE:
- border-color: var(--color-primary) (#2563eb)
- box-shadow: 0 0 0 1px var(--color-primary) (double border effect)
- Add ring inside: box-shadow: 0 0 0 1px #2563eb, inset 0 0 0 1px #2563eb

PROPS:
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "base" | "elevated" | "interactive"
  padding?: "compact" | "default" | "spacious" | "none"
  isSelected?: boolean
  asChild?: boolean
  href?: string   // if provided, renders as <a> tag (accessible link card)
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  action?: React.ReactNode    // right-aligned element in header (button, badge, menu)
}
```

---

## Prompt 4: Badge / Tag Component

```
Build a Badge/Tag component in React + TypeScript + Tailwind CSS v4.

COUNT BADGE (notification, number display):
- Shape: pill (border-radius: 9999px)
- Min-width: 18px, height: 18px
- Padding: 0 5px (for multi-digit numbers)
- Font-size: 10px, font-weight: 700, letter-spacing: 0.02em
- font-variant-numeric: tabular-nums (stable width as numbers change)
- Display: inline-flex, align-items: center, justify-content: center
- Color variants:
  - default: background #dc2626, color white (red = notification = urgency)
  - primary: background #2563eb, color white
  - secondary: background #e5e7eb, color #374151
- "9+" capping: when value > 9, display "9+" (prevents long badge strings)
- Entrance animation: scale 0→1, spring stiffness 400 damping 25, delay 0ms

STATUS BADGE (state indicator: published, active, pending, error):
- Shape: rounded-md (border-radius: 6px)
- Height: 20px (sm), 24px (md)
- Padding: 0 6px (sm), 0 8px (md)
- Font-size: 11px (sm), 12px (md), font-weight: 600, letter-spacing: 0.04em, text-transform: uppercase
- No background color fill — use subtle tinted backgrounds with matching text:
  - success:  background: #dcfce7, color: #15803d, dot: #16a34a
  - error:    background: #fee2e2, color: #b91c1c, dot: #dc2626
  - warning:  background: #fef9c3, color: #a16207, dot: #ca8a04
  - info:     background: #dbeafe, color: #1d4ed8, dot: #2563eb
  - neutral:  background: #f3f4f6, color: #374151, dot: #9ca3af
  - purple:   background: #f3e8ff, color: #7e22ce, dot: #9333ea
- Optional leading dot: 6px circle, color matches text, margin-right 5px
- Dark mode: background at 15% opacity of base color, text at brighter shade

CATEGORY TAG (clickable label, filter UI):
- Shape: rounded-md (border-radius: 6px) or pill (border-radius: 9999px)
- Height: 28px
- Padding: 0 10px
- Font-size: 13px, font-weight: 500
- Default: background: #f3f4f6, color: #374151, border: none
- Hover: background: #e5e7eb, color: #111827, transition: 100ms ease
- Active/selected: background: var(--color-primary-muted, #dbeafe), color: var(--color-primary, #2563eb), font-weight: 600
- Removable variant: shows X button (12px) on right with 4px margin, tap removes tag
  - X button: opacity 0.5, hover: opacity 1, 100ms

ICON BADGE (avatar-style with notification count, avatar + badge positioned):
- Position: relative container
- Badge: position absolute, top: -4px, right: -4px
- Badge: count badge spec above, min-width 16px, height 16px, font-size 10px

PROPS:
interface BadgeProps {
  variant?: "count" | "status" | "tag"
  // Count badge:
  count?: number
  maxCount?: number  // defaults to 9
  // Status badge:
  status?: "success" | "error" | "warning" | "info" | "neutral" | "purple"
  showDot?: boolean
  // Tag:
  isSelected?: boolean
  onRemove?: () => void
  // Shared:
  label: string
  size?: "sm" | "md"
  className?: string
}
```

---

## Prompt 5: Navigation Component (Top Nav + Mobile Hamburger + Sidebar)

```
Build a full navigation system in React + TypeScript + Tailwind CSS v4 + Framer Motion.

TOP NAVIGATION BAR (desktop primary, mobile secondary):
- Height: 60px
- Background: rgba(255,255,255,0.92), backdrop-filter: blur(20px)
- Border-bottom: 1px solid rgba(0,0,0,0.08)
- Position: fixed, top: 0, left: 0, right: 0, z-index: 30
- Layout: [Logo left] [Nav links center or left] [Actions right]

LOGO AREA:
- Height: 100% of nav, padding: 0 20px
- Logo image: 28px height, auto width
- Wordmark: 17px, weight: 700, letter-spacing: -0.02em, color: #111827

DESKTOP NAV LINKS (≥768px):
- Display: flex, gap: 4px (between items)
- Each link: height: 36px, padding: 0 12px, border-radius: 8px, font-size: 14px, weight: 500
- Inactive: color: #6b7280
- Inactive hover: color: #111827, background: #f3f4f6, transition: 100ms ease
- Active: color: var(--color-primary, #2563eb), background: #eff6ff, font-weight: 600
- Active indicator: none (background fill is sufficient — no underline, no dot)

DESKTOP ACTIONS (right side):
- Gap: 8px between elements
- User avatar: 32px circle, border: 2px solid #e5e7eb, cursor: pointer
- CTA button: primary variant, size sm (height 32px)
- Notification bell: icon button, size md

MOBILE HAMBURGER MENU:
- Below 768px: hide desktop nav links, show hamburger button
- Hamburger: 40×40px icon button, 3 lines (or animated to X when open)
- Lines: 20px wide, 2px tall, color: #374151, gap: 5px between lines
- Animation to X: top line rotates 45deg, bottom line rotates -45deg, middle fades out, 200ms spring stiffness 300 damping 30

MOBILE MENU DRAWER (full-screen overlay):
- Position: fixed, inset: 0, z-index: 40
- Background: #ffffff (full white — not transparent)
- Opens from right: x: 100% → 0, spring stiffness 300, damping 30
- Close: hamburger (now X) tap, or back button, or Escape

MOBILE MENU CONTENT:
- Padding: 80px top (below nav bar) 24px sides
- Nav items: stacked vertically, height 52px, font-size: 18px, weight: 500
- Stagger entrance: 40ms delay between items
- Separator before bottom items (settings, sign out)

SIDEBAR NAVIGATION (app shells, dashboard layouts):
- Width: 240px fixed, full viewport height
- Position: fixed left-0 top-0 bottom-0
- Background: #f9fafb (dark: #111111)
- Border-right: 1px solid #e5e7eb (dark: #1e1e1e)
- Padding: 16px 12px
- z-index: 20

SIDEBAR SECTIONS:
- Logo area: 48px height, padding 0 8px, margin-bottom 16px
- Section label: 11px uppercase weight 600 letter-spacing 0.08em color #9ca3af, padding 0 8px, margin-bottom 4px
- Nav items: height 36px, border-radius 8px, padding 0 8px, display flex align-items center gap 10px
  - Icon: 16px, color matches text
  - Label: 14px, weight 500
  - Inactive: color #6b7280, hover: background #f3f4f6 color #111827, 100ms ease
  - Active: background #eff6ff, color #2563eb, font-weight 600
- Badge: count badge on right, same spec as Badge component

SIDEBAR FOOTER:
- Position: absolute bottom-0 left-0 right-0
- Padding: 16px 12px
- Border-top: 1px solid #e5e7eb
- User info: avatar 32px + name 14px weight 600 + email 12px secondary + settings icon button

RESPONSIVE SIDEBAR (mobile):
- Collapsed: hidden (translate-x -240px or display none)
- Open: slides in, same dimensions
- Backdrop: rgba(0,0,0,0.5) behind sidebar
- Close: backdrop tap, Escape, close button
- Trigger: hamburger in mobile top nav

PROPS:
interface NavItem {
  id: string
  label: string
  icon?: LucideIcon
  href: string
  badge?: number
  children?: NavItem[]  // for nested sidebar sections
}

interface NavigationProps {
  logo: React.ReactNode
  items: NavItem[]
  activeId: string
  variant?: "top" | "sidebar"
  actions?: React.ReactNode  // right side of top nav
  user?: {
    name: string
    email: string
    avatar?: string
  }
}
```

---

## Prompt 6: Statistics Card (Number + Label + Trend Indicator)

```
Build a StatCard component in React + TypeScript + Tailwind CSS v4 + Framer Motion.

BASE LAYOUT:
- Card container: same as Card elevated variant (background white, border, border-radius 12px, shadow)
- Padding: 20px
- Width: flex (fits container) or fixed (240px min, 320px max)
- Min-height: 100px

CONTENT STRUCTURE:
[Label row]          →  Category label + optional action button (top-right)
[Value row]          →  Large number + trend badge
[Subtext row]        →  Supporting description or comparison text

LABEL:
- Font-size: 13px, font-weight: 600, color: #6b7280
- Letter-spacing: 0em (not uppercase — modern stat cards avoid uppercase labels)
- Margin-bottom: 8px

PRIMARY VALUE (the big number):
- Font-size: 32px (default), 24px (compact), 48px (large)
- Font-weight: 700
- Color: #111827 (dark: #f9fafb)
- Font-variant-numeric: tabular-nums (prevents layout shift as number changes)
- Line-height: 1 (tight — no extra space around the number)
- Letter-spacing: -0.02em (tight tracking for large numbers)

VALUE ANIMATION (on mount or value change):
- Counter animation: 0 → final value, 800ms ease-out
- Use a counting animation library or requestAnimationFrame loop
- Only animate if value < 1,000,000 and prefers-reduced-motion is false
- No animation if value is non-numeric (e.g., "N/A", "—")

TREND BADGE:
- Position: inline-flex next to value, vertical-align: middle, margin-left: 8px
- Height: 22px, padding: 0 8px, border-radius: 11px (pill)
- Positive trend (value increased):
  - Background: #dcfce7, color: #15803d
  - Icon: trending-up 12px, margin-right: 4px
  - Value: "+12.5%" or "+450"
- Negative trend (value decreased):
  - Background: #fee2e2, color: #b91c1c
  - Icon: trending-down 12px
- Neutral (no change):
  - Background: #f3f4f6, color: #6b7280
  - Icon: minus 12px
- Trend font: 12px, weight: 600

SUBTEXT:
- Font-size: 13px, weight: 400, color: #9ca3af
- Margin-top: 6px
- Examples: "vs. last month", "from 1,240 users", "updated 2 minutes ago"

SPARKLINE (optional small chart in background):
- Position: absolute bottom 0 right 0
- Width: 30% of card, height: 40%
- Opacity: 0.15 (subtle background element)
- SVG polyline, no axes, no labels — purely decorative context
- Color: matches trend direction (green/red) or neutral gray

ICON VARIANT (replaces sparkline):
- 40×40px container, border-radius: 10px, top-right of card
- Background: tinted with category color (e.g., blue for revenue: #dbeafe)
- Icon: 20px, color matches background's full-saturation equivalent (#2563eb)

LOADING STATE:
- Replace value with skeleton: 80px × 28px, border-radius 4px
- Replace label with skeleton: 60px × 14px
- Replace trend with skeleton: 48px × 22px pill shape
- Shimmer animation on all skeletons

GRID LAYOUT:
- Typically used in a 2×2 or 4×1 grid
- gap: 16px between cards
- Each card fills its grid column

PROPS:
interface StatCardProps {
  label: string
  value: string | number
  prefix?: string              // "$", "€", "#"
  suffix?: string              // "users", "orders", "%"
  trend?: {
    direction: "up" | "down" | "neutral"
    value: string              // "+12.5%", "-3 users"
    label?: string             // "vs last month"
  }
  icon?: LucideIcon
  iconColor?: string           // hex, used for icon container bg tint
  sparklineData?: number[]     // array of values for mini sparkline
  isLoading?: boolean
  subtext?: string
  size?: "compact" | "default" | "large"
  className?: string
}
```

---

## Prompt 7: Toast / Alert Notification System

```
Build a Toast notification system in React + TypeScript + Tailwind CSS v4 + Framer Motion.
Include: ToastProvider, useToast hook, ToastContainer, Toast component, and Alert (inline) component.

TOAST SYSTEM ARCHITECTURE:
- ToastProvider: wraps the app, provides context with show/dismiss functions
- useToast(): returns { toast } object with methods: toast.success(), toast.error(), toast.warning(), toast.info(), toast.custom()
- ToastContainer: renders the fixed-position portal for all toasts
- Toast: individual notification element

TOAST CONTAINER POSITION:
- Desktop (≥768px): fixed top-4 right-4, flex-col, gap: 8px, z-index: 100
- Mobile (<768px): fixed bottom-4 left-4 right-4, flex-col-reverse, gap: 8px
- max-width: 380px (desktop), auto (mobile, stretches full width)

INDIVIDUAL TOAST VISUAL:
- Background: #ffffff (dark: #1a1a1a)
- Border: 1px solid rgba(0,0,0,0.1) (dark: rgba(255,255,255,0.1))
- Border-radius: 10px
- Box-shadow: 0 4px 16px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)
- Padding: 12px 16px
- Display: flex, align-items: flex-start, gap: 10px
- min-width: 280px (desktop)

TOAST VARIANTS:
- success: left border 3px solid #16a34a, icon: check-circle 18px #16a34a
- error:   left border 3px solid #dc2626, icon: x-circle 18px #dc2626
- warning: left border 3px solid #d97706, icon: alert-triangle 18px #d97706
- info:    left border 3px solid #2563eb, icon: info 18px #2563eb
- (all have same base card — only left border and icon color vary)

TOAST CONTENT LAYOUT:
- Left: icon, 18px, flex-shrink: 0, margin-top: 1px
- Center: flex-1
  - Title: 14px, weight: 600, color: #111827, line-height: 1.4
  - Message (optional): 13px, weight: 400, color: #6b7280, margin-top: 2px, line-height: 1.4
  - Action button (optional): text button, 13px, weight: 600, color: var(--color-primary), margin-top: 8px
- Right: X close button, 20×20px, icon 14px, color: #9ca3af, hover: #374151, 100ms ease

PROGRESS BAR (auto-dismiss timer):
- Position: absolute, bottom: 0, left: 0, height: 3px
- Border-radius: 0 0 10px 10px (only bottom corners, inside card)
- Background: matches left border color (green/red/amber/blue)
- Animation: width 100% → 0% over --duration value, linear
- Pause on hover: animation-play-state: paused on .toast:hover

AUTO-DISMISS TIMING:
- success/info: 5000ms
- warning: 7000ms
- error: 0 (no auto-dismiss — errors require user acknowledgment)
- custom: caller-specified

FRAMER MOTION (toast enter/exit):
Desktop variants:
const toastVariants = {
  initial: { opacity: 0, x: 48, scale: 0.96 },
  animate: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
  exit: { opacity: 0, x: 48, scale: 0.96, transition: { duration: 0.2, ease: "easeIn" } }
}

Mobile variants:
const toastVariantsMobile = {
  initial: { opacity: 0, y: 48, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
  exit: { opacity: 0, y: 48, transition: { duration: 0.2, ease: "easeIn" } }
}

AnimatePresence mode="sync" wraps all toasts (multiple can be visible simultaneously).

INLINE ALERT COMPONENT (non-dismissible, embedded in page):
- Same color variants as toast (success/error/warning/info)
- Layout: icon (left) + content (flex-1) + optional dismiss (right)
- Background: var(--color-*-subtle): #dcfce7 / #fee2e2 / #fef9c3 / #dbeafe
- Border: 1px solid corresponding border color at 30% opacity
- Border-radius: 8px
- Padding: 12px 16px
- No box-shadow (inline, not floating)
- Title: 14px, weight: 600, color: corresponding dark text (#15803d / #b91c1c / #a16207 / #1d4ed8)
- Message: 13px, weight: 400, same color at 80% opacity

USETOAST API:
const { toast } = useToast()

// Usage:
toast.success({ title: "Changes saved", message: "Your profile has been updated." })
toast.error({ title: "Upload failed", message: "File size exceeds 10MB limit." })
toast.warning({ title: "Session expiring", message: "You'll be signed out in 5 minutes.", action: { label: "Stay signed in", onClick: () => refreshSession() } })
toast.info({ title: "New version available", duration: 8000 })
toast.dismiss(id)  // dismiss specific toast by id
toast.dismissAll()

TOAST FUNCTION RETURNS: string (toast ID, for programmatic dismissal)

PROPS:
interface ToastOptions {
  title: string
  message?: string
  duration?: number   // ms, 0 = no auto-dismiss
  action?: {
    label: string
    onClick: () => void
  }
  onDismiss?: () => void
}

interface AlertProps {
  variant: "success" | "error" | "warning" | "info"
  title: string
  message?: string
  isDismissible?: boolean
  onDismiss?: () => void
  action?: React.ReactNode
  className?: string
}
```
