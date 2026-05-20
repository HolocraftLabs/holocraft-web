# Pageflows: Visual DNA

## Background and Surface Colors

Across the documented app library, 95% of onboarding flows use light mode with white or near-white
backgrounds. Dark mode is rare in onboarding contexts — it appears in media-heavy apps (Spotify,
YouTube) but is the exception, not the rule.

| Context | Color | Hex |
|---|---|---|
| Primary background (light) | White | `#FFFFFF` |
| Soft background (focus screens) | Near-white warm | `#FAFAFA` or `#F9FAFB` |
| Soft background (cool tint) | Near-white cool | `#F8FAFC` |
| Card / container on white | Light gray | `#F3F4F6` |
| Divider / separator | Very light gray | `#E5E7EB` |
| Input field background (filled) | Light gray | `#F9FAFB` |
| Input field border (default) | Medium gray | `#D1D5DB` |
| Input field border (focus) | Brand primary | varies |

## Focus Screen Layout

The most distinctive pattern from Pageflows: when a flow reaches a critical moment (the first screen
of onboarding, a success screen, a key value proposition), the layout switches to a "focus mode"
with these characteristics:

- **Single central element**: one image, illustration, or icon fills the upper 40–50% of the screen
- **Large whitespace**: minimum 48px padding on all sides, often more
- **Clear hierarchy**: headline → single sentence subtext → single CTA
- **No competing elements**: no navigation, no links, no secondary actions in initial focus screens
- **Vertical rhythm**: image → 32px gap → headline → 12px gap → subtext → 32px gap → CTA

This layout is used by Airbnb, Headspace, Duolingo, Spotify, Figma, and virtually every top app
at their opening onboarding screens.

## Progress Indicators

### Linear Progress Bar (Most Common)
- Height: 2–4px (Airbnb: 2px, Duolingo: 4px, Notion: 3px)
- Width: 100% of screen or content area
- Background track: `#E5E7EB` or `#F3F4F6` (light gray)
- Fill color: brand primary (varies by app)
- Position: top of screen, below status bar, OR top of content card
- Transition: fill width animates on step advance, 500ms ease-in-out

### Step Dots
- Small circles, 6–8px diameter
- Inactive: `#D1D5DB`
- Active: brand primary color, often slightly larger (8px vs 6px)
- Spacing: 8px between dots
- Used when total steps ≤ 5

### Text Label ("Step 3 of 7")
- Position: top-right of screen or centered above main content
- Font: 13–14px, weight 500, `#6B7280` (gray-500 equivalent)
- Format options: "3 of 7" / "Step 3" / "3/7"
- Used in combination with linear bar or as standalone in B2B flows

## Form Layout Standards

### Field Layout
- Always single column on mobile (0–599px)
- Field height: 48px minimum (44px is the absolute minimum touch target)
- Standard field height across top apps: **52–56px**
- Full width: 100% of container minus padding (16px sides on mobile)
- Label above field (not placeholder-only): `margin-bottom: 6–8px`

### Label Typography
- Font size: 13–14px
- Weight: 500 (medium)
- Color: `#111827` (near black) or `#374151` (gray-700)
- Position: above input, not inline/floating in most documented apps

### Field Internal Layout
- Horizontal padding: 14–16px
- Vertical padding: 14–16px (to reach 52–56px total height with 14px line-height input)
- Border: 1px solid `#D1D5DB` at rest, 2px solid brand primary on focus
- Border-radius: 8–12px (varies: Notion 8px, Stripe 6px, Airbnb 12px, Linear 8px)
- Background: white or `#F9FAFB`

## CTAs (Call to Action Buttons)

### Mobile CTAs
- Width: 100% (calc(100% - 32px) with 16px margin each side), or true full-bleed to edges
- Position: bottom of screen, often in a fixed bottom bar with safe area padding
- Height: 48–56px (Stripe: 48px, Airbnb: 56px, Duolingo: 52px)
- Border-radius: 8–16px (varies; Airbnb: 12px, Duolingo: 16px, Stripe: 6px, Notion: 8px)
- Typography: 15–16px, weight 600, centered
- Background: brand primary (high-contrast solid color — never gradient in primary CTA)

### Desktop CTAs
- Width: auto, centered, min-width 180px, max-width 320px
- Same height and typography as mobile
- Centered horizontally in content column

### CTA Color Contrast Requirements
- All documented top apps meet WCAG AA minimum 4.5:1 contrast
- Most meet 7:1 (AAA) — white text on brand primary is the overwhelming standard

### Secondary Actions
- Positioned below primary CTA: "Already have an account? Sign in"
- Font: 14–15px, weight 400–500, muted color `#6B7280`
- The link/action within: brand primary color, weight 600
- Touch target: 44px minimum height even for text links (achieved via padding)

## Error States

**Universal pattern**: inline, under the field, never modal.

```
[input field with red border]
! This email is already in use. Sign in instead?
```

- Border color: `#EF4444` (red-500) or `#DC2626` (red-600)
- Error text color: `#EF4444` or `#DC2626`
- Error text size: 12–13px, weight 400
- Error text position: directly below the field, `margin-top: 4–6px`
- Error icon: 14px warning triangle or circle-X, same red color, `margin-right: 4px`
- Animation: error text slides down from above (translateY(-4px)→0 + opacity 0→1), 150ms

Recovery actions within error messages:
- Airbnb: "Email already registered — log in?" (the "log in" is a link)
- Stripe: "Your card number is invalid." (no recovery, just clear description)
- Notion: "Something went wrong. Try again." with a "Try again" link button

## Success States

- Green checkmark: `#10B981` (emerald-500) or `#22C55E` (green-500)
- Appears briefly (400–800ms) before automatic progression
- Scale animation: 0 → 1.1 → 1.0 (spring bounce), then hold
- Optional brief background color flash: field border goes green for 400ms before reverting
- Full screen success: centered checkmark, 48–64px, headline below, auto-advances after 1500–2000ms

## Illustrations in Onboarding

Pattern across documented apps:
- Style: flat illustration, 2–4 colors, brand palette
- Never photographic in onboarding (photos appear in product preview/social proof sections)
- Size: fills 40–50% of screen height on the focus screen
- Position: top of content area, centered
- Viewbox: typically 1:1 square or 4:3
- Animation: subtle (float/bob, loop, 2–3s) or static
- Apps using illustration: Headspace, Duolingo, Airbnb, Robinhood, Cash App
- Apps using product screenshots: Notion, Linear, Figma (shows the actual product UI)

## Social Auth Button Design

Google button (exact spec, from documented apps):
- Background: `#FFFFFF`
- Border: 1px solid `#D1D5DB`
- Border-radius: 8px (or full-pill on some apps)
- Height: 48–52px
- Google "G" logo: exactly 18–20px, positioned left with 16px padding
- Text: "Continue with Google", 15px, weight 500, `#1F2937`

Apple button:
- Background: `#000000`
- Text/logo: `#FFFFFF`
- Same dimensions as Google button
- Apple  logo: 18px

Ordering (observed across apps): Google first, Apple second, email/phone below with divider.
Rationale: Google has broader device coverage; Apple is iPhone-specific but high-value; email
is always available as fallback.

Divider between social and email:
- `<hr>` style line with "or" text centered
- Line: 1px solid `#E5E7EB`, opacity 100%
- "or" text: 13px, weight 500, `#9CA3AF`, `padding: 0 12px`
- Vertical spacing above/below divider: 16–20px
