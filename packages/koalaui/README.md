# koalaui

The CLI for [Koala UI](https://github.com/TheMrdp/koala-ui). It copies component source into your React project (you own and edit the code; it is **not** a runtime dependency).

## Two tiers

- **Free** — all components (`components/ui/*`), lib helpers and tokens. Fetched from the public repo, **no auth**.
- **PRO** 🔒 — marketing sections, full page examples, templates. Fetched from the private `koala-ui-pro` repo; **requires repo access** (a GitHub token). PRO items can depend on free components — those still come from the public repo automatically.

## Usage

```bash
# One-time: tokens, core lib helpers (cn, tv) and base dependencies
npx koalaui init

# Add free components — no auth needed
npx koalaui add button card data-table

# Add PRO items — authenticate first
gh auth login        # or: export KOALAUI_TOKEN=<read token for koala-ui-pro>
npx koalaui add marketing-hero

# See everything (free + pro)
npx koalaui list
```

After `init`, add `@import "./koala.css";` to your global stylesheet (right after `@import "tailwindcss";`) and make sure your `tsconfig.json` has the `@/*` path alias.

## PRO auth

A GitHub token with read access to the `koala-ui-pro` repo, resolved in order:

```
$KOALAUI_TOKEN  ›  $GH_TOKEN  ›  $GITHUB_TOKEN  ›  `gh auth token`
```

Easiest: `gh auth login`. Don't have PRO access yet? → https://github.com/TheMrdp/koala-ui

## Options

| Flag | Description |
| --- | --- |
| `--cwd <dir>` | Target project root (default: current directory) |
| `--registry <dir>` | Read FREE files from a local checkout instead of the repo (dev) |
| `--pro <dir>` | Read PRO files from a local checkout (dev; default `../koala-ui-pro`) |
| `--branch <branch>` | Branch (default: `main`) |
| `--token <token>` | GitHub token (overrides env / `gh`) |
| `--overwrite` | Overwrite files that already exist |
| `--no-install` | Write files but skip the package-manager install |

## Requirements

React 19, Tailwind CSS v4, and a project that resolves the `@/*` path alias. The package manager is auto-detected (npm / pnpm / yarn / bun) from your lockfile.
