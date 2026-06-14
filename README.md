# Koala UI

A polished, production-ready **React component library** built with Next.js (App Router), Tailwind CSS v4, Radix UI and `tailwind-variants`. Four themes (light, dark, cream, moonlight), a density system, and a strict house style — every component ships feeling finished.

This **public** repo holds the **free tier** (all components, lib helpers and tokens), the **docs site** (the storefront) and the **`koalaui` CLI**. The **paid tier** (marketing sections, page examples, templates) lives in the private companion repo [`koala-ui-pro`](https://github.com/TheMrdp/koala-ui-pro).

## Two tiers

| Tier | What | Where | Install |
| --- | --- | --- | --- |
| **Free** | components (`components/ui/*`), lib, tokens | this public repo | `koalaui add button` — no auth |
| **PRO** | sections, full page examples, templates | private `koala-ui-pro` | `koalaui add <item>` — needs repo access 🔒 |

The CLI copies **source** into your project (you own and edit the code; it's not a bundled npm dependency).

```bash
# 1. Set up tokens, lib helpers and base dependencies (free, no auth)
npx koalaui init

# 2. Add free components
npx koalaui add button card field

# 3. Add PRO items — authenticate first with an account that has access
gh auth login        # or: export KOALAUI_TOKEN=<read token for koala-ui-pro>
npx koalaui add marketing-hero
```

Requirements in the consuming project: React 19, Tailwind CSS v4, and the `@/*` path alias. PRO items can depend on free components — the CLI pulls those from this public repo automatically.

### Granting a customer PRO access

Add them as a **read collaborator** on the private `koala-ui-pro` repo (or hand them a fine-grained PAT scoped to read its contents). They authenticate with that token and the CLI does the rest. Revoke access to cut off future PRO installs — the free tier keeps working.

## Local development (this repo)

```bash
npm install
npm run dev        # docs site at http://localhost:3000
npm run registry   # regenerate the CLI registry from components/ui + lib
```

## Repository layout

```
app/                     # docs site (App Router) — the public storefront
components/ui/<name>/     # one folder per component: <name>.tsx + index.ts (FREE)
lib/                     # tv, utils, create-context, density, motion — shipped with components
docs/                    # ARCHITECTURE.md + FOUNDATIONS.md (house style + token layer)
packages/koalaui/        # the koalaui CLI (init / add / list)
scripts/build-registry.mjs  # generates registry.json (catalog of free + pro items)
registry.json            # the catalog the CLI reads (committed; rebuild with npm run registry)
```

The PRO source lives in the sibling private repo `koala-ui-pro`. Run `npm run registry` with a local checkout of it at `../koala-ui-pro` (or set `$KOALA_PRO_DIR`) so the catalog includes pro items.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and [docs/FOUNDATIONS.md](docs/FOUNDATIONS.md) before touching components or tokens.

## License

The free tier is proprietary but free to use in your projects via the CLI. PRO content (the `koala-ui-pro` repo) is commercial and separately licensed. All rights reserved.
