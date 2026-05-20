# Mobbin — Overview

## What Mobbin Represents

Mobbin is the definitive reference library for mobile UX patterns. It catalogs thousands of screenshots from shipping iOS and Android products — not conceptual dribbble designs, not student projects. Every screen documented in Mobbin has been approved by a product team, QA'd, and released to millions of users. This makes it uniquely valuable: it reflects what works in production, under real business constraints, for real users.

For Holocraft, Mobbin is the primary source for mobile-first UI patterns applicable to responsive web products. The extraction goal is not to replicate native app chrome — it is to isolate the underlying interaction principles and apply them in a web context.

## Core Value

Observable patterns from shipping products are worth more than theoretical design systems. When Airbnb, Spotify, and Linear all converge on the same card pattern, that convergence is signal. When three fintech apps use the same onboarding step count, that is data. Mobbin aggregates that signal at scale.

The value Holocraft extracts is not aesthetic — it is structural. How does Superhuman handle keyboard navigation? How does Notion structure its sidebar? How does Stripe present a failed payment state? These are proven answers to hard design problems.

## Industries Studied

**Productivity apps** — Notion, Linear, Things, Obsidian, Craft, Cron  
**Fintech** — Stripe, Mercury, Brex, Robinhood, Cash App, Revolut  
**E-commerce** — Shopify, Amazon, ASOS, Depop, eBay  
**Social** — Instagram, Twitter/X, Discord, BeReal, Strava  
**Entertainment** — Spotify, Netflix, YouTube, Pocket Casts, Letterboxd  
**Utility** — Google Maps, Waze, Weather, Transit, Halide  

## Emotional Direction Per Category

Each category has a distinct emotional register that its visual language must serve.

**Productivity** — Clarity, speed, trust. Every pixel that does not help the user accomplish a task is a pixel in the way. Typography is functional, not expressive. Color is used only to communicate state. Whitespace is generous because it reduces cognitive load. Target feeling: "I know exactly where I am and what to do next."

**Fintech** — Security plus simplicity. Users are anxious when dealing with money. The UI must communicate institutional credibility while remaining non-intimidating. Heavy use of green (#10b981, #22c55e) for confirmation, careful avoidance of red except for errors (#ef4444). Rounded corners and soft shadows signal approachability over authority. Target feeling: "My money is safe and I understand what is happening."

**E-commerce** — Aspiration plus clarity. Product photography dominates. UI chrome is minimal to let product images breathe. Price is always prominent (large, heavy weight, near the primary CTA). Friction in the purchase flow is a revenue killer — every unnecessary step has been removed. Target feeling: "I want this and buying it is easy."

**Social** — Energy and engagement. Motion is heavier. Color is more saturated. Notification badges and activity indicators keep the user engaged. The emotional goal is excitement and belonging. Target feeling: "Something is always happening here and I am part of it."

**Entertainment** — Immersion. Dark backgrounds (#121212, #000000) dominate. Content fills the screen. Navigation is minimal and disappears when not needed. Target feeling: "I am fully inside this experience."

**Utility** — Functional immediacy. No onboarding friction. Information is available at a glance. Interaction cost must be near zero because the user is often multitasking (driving, walking, cooking). Target feeling: "I got what I needed instantly."

## What Holocraft Extracts

### Mobile Navigation Patterns for Responsive Web
Bottom tab bars (4–5 items, icon + label, 44pt minimum touch target) translate directly to mobile web navigation. On desktop, the same conceptual structure becomes a sidebar or top navigation. Key extractions: item count constraint (4–5 max), active state signaling (accent color fill on icon, label weight 600), and the spatial logic (bottom = most frequent, top = contextual actions).

### Onboarding Flow Structure
Premium apps use 3–5 onboarding screens with a single focused message per screen. Progress is indicated with dots (4–6px diameter, 8px gap, active = accent color, inactive = rgba(0,0,0,0.15)) or a linear progress bar. Skip is always available (top-right, 15px text, color: rgba(0,0,0,0.4)). The final screen converts: it presents the primary action with zero friction. This structure maps directly to web onboarding modals, product tours, and sign-up flows.

### Empty State Design
No premium app ships a blank white screen for empty states. Every empty state has three elements: a visual (illustration at 120–160px, icon at 48–64px, or contextual image), a heading (2–5 words, 20px semibold, "No results yet"), and a primary action button (same spec as the global primary CTA). The visual is always centered, 24–32px below the empty state container center.

### Micro-Interaction Timing from Native Apps
iOS uses spring physics, not linear easing. The result feels physical — buttons compress on press, sheets slide up with momentum. iOS default spring: stiffness 300, damping 30. Sheet presentation: 300ms spring. Tab transition: 150ms opacity fade. Button press: scale 0.97, spring release 200ms. These exact values are used in Holocraft's Framer Motion defaults.

### Card and List Patterns
Cards: 12–16px border-radius, 1px border at rgba(0,0,0,0.08) in light mode, box-shadow 0 1px 3px rgba(0,0,0,0.12) for elevated variants, 16px internal padding. List items: 44pt minimum height, left-aligned primary content, right-aligned metadata (timestamp, count, chevron). These measurements are directly usable in Tailwind (rounded-xl, border border-black/[0.08], shadow-sm, p-4).

## Critical Caveat: Principles, Not Chrome

Native mobile has affordances that do not translate directly to web:

- **Swipe gestures** — natural on touchscreen, require explicit pointer event implementation on web (Framer Motion `drag` with `dragConstraints` and `dragElastic`)
- **Haptic feedback** — native vibration motors, not available on web (Web Vibration API is not appropriate for UI feedback)
- **Safe areas** — notch and home indicator handling via `env(safe-area-inset-bottom)`, must be used in web with `padding-bottom: env(safe-area-inset-bottom)` for mobile PWAs
- **System fonts** — SF Pro and Google Sans are not available on web; use Inter (closest to SF Pro) and Roboto as system equivalents
- **Native navigation transitions** — UIKit push/pop are not available in web; use Framer Motion `AnimatePresence` with slide variants for equivalent effect

Extract the principle (progressive disclosure, contextual actions, spring physics feedback) not the specific UI implementation. The goal is web products that feel as considered as premium mobile apps — not web products that impersonate native apps.
