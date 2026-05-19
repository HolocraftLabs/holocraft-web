# CLAUDE.md — holocraft-web

This is the **frontend monorepo** for all Holocraft web applications.

## Stack

- Runtime: Node.js 25+
- Package manager: pnpm 10 (workspace)
- Build system: Turborepo
- Framework: Next.js 16 + React 19 + TypeScript 5
- Styling: Tailwind CSS v4
- Animation: Framer Motion

## Workspace structure

```
holocraft-web/
├── apps/
│   └── flagship/       Main Holocraft website (Next.js 16)
├── packages/
│   ├── ui/             Shared UI components (from holocraft-ui)
│   ├── design-tokens/  Colors, spacing, typography tokens
│   ├── motion/         Animation system and presets
│   ├── eslint-config/  Shared ESLint rules
│   ├── typescript-config/  Shared tsconfig bases
│   └── config/         Shared tool configs
├── docs/research/      Visual design research per source
├── services/           Backend service configs
├── tooling/            Dev tooling scripts
└── infrastructure/     Deployment and infra configs
```

## Common commands

```bash
pnpm dev        # Start all apps in dev mode (via Turborepo)
pnpm build      # Build all apps and packages
pnpm lint       # Lint all workspaces
pnpm format     # Format with Prettier
```

## Adding a package dependency

Always add from **monorepo root** using workspace protocol:
```bash
pnpm --filter flagship add <package>
```

Never run `pnpm install` inside individual app directories.

## Key rules

- Follow all standards defined in `holocraft-core/standards/`
- Never hardcode colors — use design tokens from `packages/design-tokens/`
- TypeScript strict mode is mandatory
- All components must be responsive (320px → 4K)
- Performance first: no unnecessary re-renders, no blocking renders

## Git

- Branch: `main` only (feature branches: `feature/*`, fixes: `fix/*`)
- Remote: `git@github.com:HolocraftLabs/holocraft-web.git`
- Never force push to `main`
