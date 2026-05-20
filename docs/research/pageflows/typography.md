# Pageflows: Typography

## Overview

Typography in documented user flows is deliberately restrained. The goal of flow typography is not
to express brand personality — it is to communicate one thing at a time with maximum clarity.
Flows use a maximum of 2–3 distinct text sizes per screen. Complex typographic hierarchy belongs on
marketing pages; flows need instant comprehension.

## Onboarding Headlines

The headline is the primary communication on each onboarding screen. It must be read and understood
in under 2 seconds.

| Property | Value |
|---|---|
| Font size | 24–30px |
| Font weight | 600–700 |
| Line height | 1.2–1.3 (tight) |
| Color | `#111827` (Tailwind gray-900) or `#1A1A1A` |
| Text alignment | Centered (focus screens), Left-aligned (form screens) |
| Max width | 320px on mobile (prevents lines over 8–10 words) |
| Margin bottom | 12–16px before body copy, 24–32px before CTA if no body |

Specific values from documented apps:
- Airbnb onboarding: 26px, weight 600, `#222222`, centered
- Duolingo: 28px, weight 700, `#3C3C3C`, centered
- Notion: 24px, weight 700, `#191919`, left-aligned
- Linear: 28px, weight 700, `#1A1A1A`, centered
- Headspace: 26px, weight 600, `#263238`, centered

## Body Copy (Subtitle / Supporting Text)

The supporting text below the headline. Kept minimal — max 2 sentences. Not a paragraph.

| Property | Value |
|---|---|
| Font size | 15–16px |
| Font weight | 400 (regular) |
| Line height | 1.5 (24px for 16px text) |
| Color | `#6B7280` (gray-500) or `#4B5563` (gray-600) |
| Text alignment | Centered (focus screens), Left-aligned (form screens) |
| Max width | 300–320px on mobile |
| Max content | 2 sentences, 1–2 lines on mobile |

When body copy is absent (common on later onboarding screens), the headline is the only text
above the CTA. This is intentional — later screens in a flow rely on accumulated context.

## Form Field Labels

Labels sit above the input field. They are the field's accessible name and its visual identifier.

| Property | Value |
|---|---|
| Font size | 13–14px |
| Font weight | 500 (medium) |
| Line height | 20px |
| Color | `#374151` (gray-700) or `#111827` (gray-900) |
| Margin bottom | 6–8px (gap between label and field) |
| Text transform | Sentence case, never all-caps |

Never use placeholder text as a substitute for a label. Placeholders disappear on input and are
inaccessible. They serve only as format hints (e.g., "name@example.com" in an email field).

## Placeholder Text

| Property | Value |
|---|---|
| Font size | Same as input text (15–16px) |
| Font weight | 400 |
| Color | `#9CA3AF` (gray-400) — noticeably lighter than input text |
| Content | Format hint only, not a label replacement |

## Error Text

Inline error messages appear below the field when validation fails. They must be specific and
recoverable when possible.

| Property | Value |
|---|---|
| Font size | 12–13px |
| Font weight | 400 (regular) |
| Line height | 16–20px |
| Color | `#EF4444` (red-500) or `#DC2626` (red-600) |
| Margin top | 4–6px (from bottom edge of field) |
| Icon | 14px warning or error icon, same color, margin-right: 4px |
| Max length | 1 sentence — specific and actionable |

Error message examples from documented apps:
- "This email is already associated with an account."
- "Password must be at least 8 characters."
- "Please enter a valid phone number."
- "Your card was declined. Please try a different card."

Anti-pattern: "Invalid input" — non-specific, unhelpful, frustrating.

## CTA Button Text

Button labels in flows follow strict conventions that maximize conversion and clarity.

| Property | Value |
|---|---|
| Font size | 15–16px |
| Font weight | 600 (semi-bold) |
| Color | White (on brand primary) or brand primary (on white/outline) |
| Text alignment | Centered within button |
| Text transform | Sentence case (not ALL CAPS except legacy apps) |
| Max length | 3–5 words (longer labels reduce click-through) |

CTA label patterns from top apps:

| App | First CTA | Sign up CTA | Upgrade CTA |
|---|---|---|---|
| Airbnb | "Get started" | "Continue" | "Continue" |
| Duolingo | "Get started" | "Create account" | "Start free trial" |
| Notion | "Continue with Google" | "Continue" | "Upgrade to Pro" |
| Spotify | "Sign up free" | "Create account" | "Get Premium" |
| Stripe | — | "Create account" | "Start free trial" |

Never use "Submit", "OK", or "Next" alone on CTAs — they communicate nothing about what happens.
"Continue" is acceptable within a flow (step to step). The first and last CTA must be specific.

## "Already have an account?" Link Text

| Property | Value |
|---|---|
| Container text | 14–15px, weight 400, `#6B7280` |
| Link text (within sentence) | 14–15px, weight 600, brand primary color |
| Position | Centered below primary CTA, 16–24px gap |
| Touch target | Entire line should be tappable (padding: 12px 0) |

Format: "Already have an account? [Sign in]" — the bracketed portion is the interactive link.

## Screen Hierarchy Rule

**Maximum 3 distinct text sizes per screen in a flow.** Breaking this rule is a common mistake
when designers try to add richness to screens that should be simple.

Typical correct hierarchy per screen type:

Focus screen (value prop, success): headline + body only (2 sizes)
Form screen: section label (optional) + field label + input text (2–3 sizes)
Confirmation screen: headline + metadata + CTA label (2 sizes effective, 3 technically)

## Typeface Selection Patterns

Across the documented apps, two patterns dominate:

**System default stack** (fastest load, no FOUT, native feel):
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
```
Used by: Linear, Vercel, GitHub, most developer tools.

**Single brand typeface** (distinctive, consistent brand feel):
- Airbnb: Cereal (custom) — similar to Inter/Circular
- Spotify: Circular (custom) — rounded geometric sans
- Duolingo: DIN Round (custom) — rounded, friendly
- Notion: ui-sans-serif → Inter fallback
- Stripe: Söhne (custom) — precise, premium feel

For Holocraft-built products targeting professional/SaaS audiences: **Inter** is the highest-quality
publicly available option, matching the aesthetic of Linear, Vercel, and Notion.

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

```css
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

`-webkit-font-smoothing: antialiased` is standard across all documented apps for cleaner rendering
on macOS and iOS.

## Spacing Rhythm in Flows

Consistent vertical spacing creates the "breathability" of high-quality flows:

| Spacing use | Value |
|---|---|
| Illustration → Headline | 32–40px |
| Headline → Body copy | 12–16px |
| Body copy → CTA | 32–40px |
| CTA → Secondary link | 16–20px |
| Field label → Input | 6–8px |
| Input → Error text | 4–6px |
| Input → Next field | 16–20px |
| Last field → CTA | 24–32px |
| Screen horizontal padding | 16–24px (mobile), 32–48px (desktop form) |
