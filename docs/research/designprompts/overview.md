# DesignPrompts — Overview

## What DesignPrompts Represents

DesignPrompts is an AI-native design system specification resource. Where Mobbin documents what ships in products, DesignPrompts documents the systematic architecture that makes those products maintainable — the token structures, component variants, accessibility requirements, and documentation formats that allow design systems to scale.

Its core function is bridging the gap between visual design and implementation. It defines components not as pixels but as systems: a button is not a rectangle — it is an entity with 5 size variants, 7 visual variants, 6 interactive states, 3 icon positions, and a set of accessibility requirements. This systems thinking is what enables consistent AI-generated code.

For Holocraft, DesignPrompts is the reference for how to structure the specifications fed into AI agents. The format of the documentation matters as much as its content — well-structured specifications produce better code.

## Core Philosophy

**Token-first design** — Visual decisions are made once as named tokens, then referenced everywhere. Never hardcode `#3b82f6` in a component — reference `var(--color-primary)`. When the token changes, everything updates. This is the foundation of themeable, maintainable systems.

**Systematic thinking** — Every component is part of a system. A button does not exist in isolation — it exists in relation to form inputs, modals, cards, and navigation. Decisions made for the button (height, border-radius, font-weight) propagate implications to every other component. Systematic thinking forces consistency.

**Component composability** — Base components are the atoms. Complex components are composed from atoms, never built from scratch. A `DatePicker` is composed of `Input`, `Popover`, `Calendar`, and `Button`. Each atom is independently tested and accessible; the composition inherits all guarantees.

**Accessibility first** — Accessibility is a structural requirement, not a post-hoc addition. ARIA attributes, keyboard navigation, focus management, and color contrast ratios are specified alongside visual properties — not added after the component ships. WCAG AA compliance (4.5:1 text contrast, 3:1 UI element contrast) is the minimum standard.

## Industries and Contexts

DesignPrompts is most directly relevant to:

- **Design system tooling** — teams building internal component libraries (like Radix, shadcn/ui, MUI, Chakra)
- **Product SaaS teams** — teams that need consistent, accessible UI across a complex product
- **Component library developers** — creating Storybook-documented, npm-published component packages
- **AI-assisted development** — codebases where AI agents generate components from specifications

The emotional direction is: **professional precision, systematic clarity, developer confidence**. A developer using a well-documented design system should feel like they have an answer for every question before they ask it. The documentation removes ambiguity.

## What Holocraft Extracts

### Token Naming Conventions
The primitive → semantic → component token hierarchy is a direct extraction from DesignPrompts methodology. Holocraft uses:
- Primitives: `--blue-500`, `--gray-100`, `--spacing-4` (raw values, no semantic meaning)
- Semantic: `--color-primary`, `--color-background`, `--color-border` (purpose-named, theme-switchable)
- Component: `--button-bg`, `--input-border-focus`, `--card-shadow` (component-scoped overrides)

### Component Documentation Format
Every Holocraft component prompt follows the DesignPrompts documentation structure:
1. Visual variants (size, style, state as separate dimensions)
2. Props interface (TypeScript, fully typed, with JSDoc)
3. Accessibility requirements (aria attributes, keyboard behavior, contrast ratios)
4. Motion specifications (enter/exit, interactive states, reduced motion)
5. Responsive behavior (explicit mobile and desktop specs)

### Variant Structure Patterns
Components have multiple orthogonal dimensions: `variant` (visual style) × `size` × `state`. These are never combined into a single long list — they are independent axes. A button has `variant: "primary" | "secondary" | "destructive"` AND `size: "sm" | "md" | "lg"` AND `state: "default" | "hover" | "active" | "disabled"`. The combination matrix is (variants × sizes × states) = the full component surface.

### Accessibility Requirement Integration
Every interactive component specifies:
- `aria-*` attribute requirements
- Keyboard interaction pattern (which keys do what)
- Focus management (where focus goes on open, close, error)
- Screen reader behavior (what is announced on state change)
- Color contrast ratios for each visual state

### AI Prompt Structure for Component Generation
DesignPrompts demonstrates that AI-ready documentation has these properties:
- Exact numeric values (never "small" or "large" — always "12px" or "40px")
- State transitions specified as start → end with duration and easing
- Props as TypeScript interfaces, not prose descriptions
- Behavior rules expressed as conditionals ("if X, then Y")

## A Note on Adaptation

Holocraft does not copy DesignPrompts token names or component structures directly. The extraction is methodological. Observe the format and the level of specificity — then apply that same format and specificity to Holocraft's own design system decisions.

Where DesignPrompts might specify `--button-bg: var(--color-primary)`, Holocraft adapts this to its own token system and color palette. The naming convention is: prefix all design tokens with `--hc-` in Holocraft's own system to avoid collisions with third-party libraries.
