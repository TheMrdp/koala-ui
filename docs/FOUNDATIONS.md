# Koala UI - Foundations

The design-token layer. The guiding rule: **lean on Tailwind v4's defaults to the
maximum; only add a thin semantic layer on top.** If Tailwind already ships a scale,
we use it as-is and never redefine it.

Tokens live in [`app/globals.css`](../app/globals.css) under `@theme`. JS-side motion
tokens mirror them in [`lib/motion.ts`](../lib/motion.ts).

---

## What we take from Tailwind verbatim (do NOT redefine)

| Foundation | Source | Notes |
| --- | --- | --- |
| **Spacing** | Tailwind `--spacing` (0.25rem base) | The entire `p-*`/`m-*`/`gap-*`/`size-*` scale is generated dynamically. Use it. |
| **Type scale** | Tailwind `--text-xs … --text-9xl` | 16 steps, each with a paired line-height. |
| **Tracking / leading** | Tailwind `--tracking-*`, `--leading-*` | `tracking-tight`, `leading-relaxed`, etc. |
| **Breakpoints** | Tailwind `--breakpoint-sm … 2xl` | 40 / 48 / 64 / 80 / 96 rem. |
| **Containers** | Tailwind `--container-3xs … 7xl` | `max-w-*` and `@container` sizes. |
| **Color palette** | Tailwind's 27-color oklch palette | Available to consumers (`bg-blue-500`); our semantic tokens are the preferred API. |

## What Koala adds on top (the semantic layer)

These are the **only** tokens we author. Everything is themeable across the four
themes (`light`, `dark`, `cream`, `moonlight`).

### Color - semantic tokens, not raw palette
Components reference **roles**, never palette values, so theming is centralized:
`bg-background`, `text-foreground`, `bg-card`, `bg-primary`, `text-muted-foreground`,
`border-border`, `ring-ring`, `bg-destructive`, … Each role is a CSS variable
redefined per theme. **Rule: components never use `bg-zinc-900` directly - only roles.**

### Radius - one knob
Driven by a single `--radius` base; the scale is relative (`--radius-sm` =
`calc(var(--radius) * 0.6)` … up to `--radius-4xl`). Change one value, the whole
system re-rounds. This intentionally overrides Tailwind's fixed radius defaults.

### Shadows / elevation - per theme
`shadow-xs … shadow-xl` carry **per-theme** values (dark/moonlight surfaces need
heavier, cooler shadows to read). This overrides Tailwind's single rgb-based set.

### Motion
`--ease-out`, `--ease-in-out`, `--ease-drawer` and `--duration-fast|base|slow`,
exposed as utilities (`ease-out`, `duration-base`). Mirrored in `lib/motion.ts` for
JS animation. **Never inline a raw `cubic-bezier()` or ms value in a component.**

### Fonts
Inter is the **only** bundled typeface. `--font-sans` (Inter) and `--font-heading`
(→ sans) cover UI, headings and body. `--font-mono` is a **system monospace stack**
(`ui-monospace, SFMono-Regular, Menlo, Consolas, …`) - used for code and token labels,
with nothing to download. Inter is wired through `next/font` in
[`app/layout.tsx`](../app/layout.tsx).

---

## Rules of thumb
- **Need a value Tailwind already has?** Use the utility. Don't add a token.
- **Need it to change per theme, or to be a reusable design decision?** Add a
  semantic token here, then a utility consumes it.
- **Never** hardcode hex / oklch / cubic-bezier / ms inside a component.
- See the four themes and every token rendered live at `/docs/foundations`.
