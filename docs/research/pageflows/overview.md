# Pageflows: Overview

## What Pageflows Represents

Pageflows is a UX reference library that documents real user flows from shipping consumer and B2B
applications. Unlike design system documentation (which shows components in isolation), Pageflows
shows how products actually behave — step by step, screen by screen — when real users complete
real tasks. Every flow is recorded from a live, production app.

The primary reference sites are Airbnb, Spotify, Stripe, Notion, Linear, Figma, Duolingo, Headspace,
Cash App, Robinhood, and dozens of others across productivity, finance, e-commerce, and lifestyle
categories. The value is observational: this is what the most successful products actually ship,
not what design guidelines recommend in theory.

## Core Value

**Observable flows from shipping products.** The critical insight is that the "correct" way to design
a flow is not derived from first principles — it is distilled from what millions of users have
learned to expect. Pageflows documents the convergent design solutions that the best product teams
have landed on after years of user testing, A/B testing, and conversion optimization.

When Airbnb, Spotify, AND Notion all make social auth (Google/Apple) the primary option and put email
below a divider, that is not coincidence. It is the result of independent optimization toward the
same conversion truth. Pageflows makes these convergent patterns visible.

## Flow Categories

### Onboarding
The first-run experience. How products introduce value, collect initial data, and set up personalization.
Key patterns: value statement screens, feature tour slides, permission request timing, personalization
questions, account connection prompts.

### Sign Up / Login
Authentication flows. Email + password, social auth (Google, Apple, Facebook), phone number OTP,
magic link, SSO for B2B. Key patterns: progressive profiling, field order, error recovery.

### Checkout / Purchase
Payment flows. Single-page checkout, multi-step checkout, express checkout (Apple Pay/Google Pay),
subscription confirmation, free trial activation. Key patterns: trust signals, progress indicators,
field auto-format.

### Settings / Account
Profile management, notification preferences, privacy settings, connected accounts, billing
management, subscription management. Key patterns: destructive action confirmation, toggle states,
change confirmation feedback.

### Upgrade / Paywall
Converting free users to paid. Feature gating, paywall design, pricing comparison, free trial
offers, discount flow. Key patterns: feature comparison tables, social proof, urgency framing.

### Empty States
First-use states before content exists. How products fill blank screens meaningfully.
Key patterns: illustration + headline + CTA, sample content, guided first action.

### Error States
What happens when things go wrong. Network errors, validation failures, permission denied,
payment failed. Key patterns: specific error messages, recovery actions, retry logic.

### Notifications / Permission Requests
Timing and framing of camera, notification, location, and contact permission requests.
Key patterns: pre-permission education screens, contextual timing.

## What Holocraft Extracts

### Onboarding Flow Structure
- Optimal step count: 3–7 steps for consumer apps, 4–10 for B2B onboarding
- Progress visibility: always show current step / total steps, never hide where the user is
- Skip logic: provide "skip" on optional personalization steps, never on essential data collection
- Value-first order: show the product's core value before asking for information

### Sign Up Form Best Practices
- Single-column layout with full-width fields
- Social auth first (Google, Apple), email form below with "or continue with email" divider
- Minimum required fields: do not ask for what can be inferred or collected later
- Password requirements: show inline, not just on error

### Pricing/Upgrade Flow Conversion Patterns
- Annual plan default with monthly toggle (annual saves X% framing)
- "Most popular" badge on recommended tier
- Feature comparison: show what they gain, not what they lose
- Free trial: CTA says "Start free trial" not "Enter payment info"

### Error State Communication
- Inline field errors, never modal alerts for validation
- Specific messages: "Email already in use — sign in instead?" not "Invalid email"
- Recovery actions always present: don't leave users stuck

### Permission Request Timing and Framing
- Never request system permission on first screen
- Show a pre-permission screen explaining WHY the permission improves the experience
- Request permission at the moment of first relevant feature use

### Paywall and Upgrade Flow Design
- Show pricing in context of feature value, not as a wall
- Monthly/annual toggle with default on annual
- Testimonials or user counts as social proof below pricing

## Critical Insight: Progressive Disclosure

The most successful products make complex flows feel simple by revealing complexity progressively.
They do not show all options at once. They do not ask all questions upfront. They build context
gradually, asking for information only when the user understands why it's needed.

The sign-up flow for Notion asks for your name, then your use case, then invites your team — but
only in that order. By step 3 the user understands enough about Notion to meaningfully answer the
team question. The same question on screen 1 would feel premature and jarring.

For Holocraft: every multi-step flow built from Pageflows research should apply this principle.
Ask the minimum on each step. Defer optional information. Show progress. Reward completion.
