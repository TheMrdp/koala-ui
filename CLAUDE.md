@AGENTS.md

# Koala UI

Koala UI is a **commercial React component library** built to be sold as a product. The goal is a polished, production-ready design system that competes directly with AlignUI and Untitled UI React. Quality and consistency are the highest priority — every component ships feeling finished.

## Stack

| Layer | Tool |
| --- | --- |
| Framework | Next.js (App Router) — see AGENTS.md for version notes |
| Styling | Tailwind CSS v4 + `tailwind-variants` (`tv`) for variant recipes |
| Behavior & a11y | Radix UI primitives (`@radix-ui/*`) |
| Class merging | `tailwind-merge` via our `lib/tv.ts` wrapper |
| Theming | CSS variables + semantic tokens (4 themes: light, dark, cream, moonlight) |
| Icons | Phosphor Icons (`@phosphor-icons/react`) |
| Animation (JS) | Custom easing/duration values from `lib/motion.ts` |
| Density | `lib/density.tsx` — `comfortable` / `compact` across marketing and app UI |

## Documentation — read before touching components

- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — the house style: `tv` with slots, Radix primitives, named exports (not dot-notation), React Context for cross-part state, density system, hard rules. **Read this first for any component work.**
- **[docs/FOUNDATIONS.md](docs/FOUNDATIONS.md)** — the token layer: what Tailwind provides verbatim vs. what Koala adds (color roles, radius knob, per-theme shadows, motion tokens). **Read this before touching tokens or globals.css.**

## Architecture rules (summary — full detail in ARCHITECTURE.md)

- **`tv` only, no `cva`.** Multi-part components use `tv` with `slots`; single-part use `tv` without. One recipe per component.
- **Named exports, not dot-notation.** `Card`, `CardHeader`, `CardBody` — never `Card.Header`. Dot-notation breaks RSC server→client boundaries.
- **React Context for cross-part state** via `lib/create-context.tsx`. Never `recursiveCloneChildren`.
- **Tokens only.** No raw hex, `oklch()`, `cubic-bezier()`, or `ms` values in components. Use semantic color roles, `radius-*`/`shadow-*` scales, and motion utilities (`ease-out`, `duration-base`). JS animation reads from `lib/motion.ts`.
- **Radix first.** Reach for a Radix primitive before hand-rolling focus/keyboard/ARIA. Tooltip (Tippy.js) is the documented exception.
- **Every component accepts `className`**, merged last via `tv` / `tailwind-merge`.
- React 19: no `forwardRef` — `ref` is a regular prop.

## Polish — `/make-interfaces-feel-better`

Run `/make-interfaces-feel-better` on **any substantive UI work**: new components, visual iterations, animation, hover/focus states, shadows, spacing, typography. This is a standing rule for the DS — the full 16-principle checklist is the bar every component ships to.

Key always-on rules (already wired into the foundation):
- `antialiased` on root, `text-wrap: balance` on headings, `text-wrap: pretty` on body.
- `active:scale-[0.96]` on interactive controls (never below 0.95). Expose a `static` prop to opt out.
- Concentric radius on nested surfaces. Specific transitions, never `transition: all`.
- `tabular-nums` on any dynamically-updating number.
- Minimum 40×40px hit area for interactive elements.

See the full skill at [.claude/skills/make-interfaces-feel-better/SKILL.md](.claude/skills/make-interfaces-feel-better/SKILL.md).

## File locations

```
app/globals.css          # Tailwind @theme — all design tokens live here
lib/tv.ts                # tailwind-variants wrapper (use this, not raw tv)
lib/create-context.tsx   # typed Context helper for multi-part components
lib/density.tsx          # DensityProvider + useDensity hook
lib/motion.ts            # JS-side easing/duration values
components/ui/<name>/    # one folder per component: <name>.tsx + index.ts
docs/                    # ARCHITECTURE.md + FOUNDATIONS.md
```
