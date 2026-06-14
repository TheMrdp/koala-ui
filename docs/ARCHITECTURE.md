# Koala UI - Architecture & Component Guidelines

The house style for building Koala UI components. A pragmatic distillation of modern
React design-system patterns - taking what scales, dropping what's clever-but-fragile.

---

## TL;DR - the Koala stack

| Concern | Choice |
| --- | --- |
| Styling / variants | **`tailwind-variants` (`tv`)** with `slots` |
| Class conflict merge | `tailwind-merge`, extended for our tokens |
| Behavior & a11y | **Radix UI** primitives |
| Polymorphism (`asChild`) | **Radix `Slot`** |
| Cross-part state | **React Context** (typed helper), never child cloning |
| Theming | CSS variables + semantic tokens + class strategy |
| Distribution model | source in-repo, per-component folders |

---

## 1. Best practices

### Styling (Tailwind substrate)
1. **Components > loops > custom CSS.** Reuse comes from React components, not `@apply`.
   Reserve custom CSS in `@layer` for genuinely single-element cases.
2. **Never ship conflicting utilities.** Expose explicit `variant`/`size` props instead of
   letting consumers pile on arbitrary classes. Resolve unavoidable conflicts with `tailwind-merge`.
3. **No dynamic string concatenation of class names** (`` `text-${color}-500` ``). The Tailwind
   compiler can't see them. Use complete class strings selected by a variant map.
4. **Runtime values → CSS variables**, not generated classes (`style={{ "--x": value }}` +
   `bg-(--x)`). Relevant for user-supplied colors, progress widths, etc.
5. **Semantic design tokens** (`bg-background`, `text-muted-foreground`) over raw palette
   values, so theming is centralized. → see [`app/globals.css`](../app/globals.css).

### System structure
1. **Theming = CSS variables + semantic tokens + a class toggle**, never hardcoded in
   components (`.dark`, `.cream`, `.moonlight`).
2. **Behavior/a11y belongs in a primitive layer**, not bespoke per component. We use Radix.
3. **`tailwind-variants` (`tv`) with `slots`** is the right variant engine for a DS, because a
   DS is *mostly multi-part components* - one recipe styles every part. Wrap `tv` with our own
   `cn` merge config so custom tokens resolve.
4. **Variant maps are plain, typed, sorted objects** - readable and tree-shakeable.
5. **Ship source, not a black-box dependency.** Components live in the repo and are owned.
6. **Radix + `Slot`** for behavior and `asChild` composition.

### What we deliberately reject
- **`recursiveCloneChildren`-style prop distribution.** Matching children by `displayName` to
  inject props is elegant in a demo and a liability at scale: it breaks under minification
  unless every part hard-codes `displayName`, breaks the moment a part is wrapped in a
  consumer's own component, and clones the whole subtree each render. **Use React Context for
  cross-part state** - what Radix, React Aria, Ark, MUI, and Chakra all do internally.

---

## 2. Component anatomy

```
components/ui/<component>/
  <component>.tsx     # implementation: tv recipe + Radix + parts
  index.ts            # public re-exports (the component's API surface)
```

Per-component **folders** (not flat files) so multi-part components, their context, and
co-located helpers have a home as they grow.

### Single-element component (e.g. Button)
- One `tv()` recipe, no slots needed - don't add machinery you don't use.
- `asChild` via Radix `Slot`.
- React 19: no `forwardRef`; `ref` is a regular prop.

### Multi-part component (e.g. Card, Dialog, Select)
- One `tv()` recipe with **`slots`**; each part consumes its slot.
- Shared state (size, variant, open) flows through a **typed React Context** created with
  [`lib/create-context.tsx`](../lib/create-context.tsx) - never prop-drilled, never cloned.
- **Export each part as its own named export** (`Card`, `CardHeader`, `CardTitle`, …),
  composed as `<Card><CardHeader>…`. **Do NOT** use `Card.Header` dot-notation: a
  compound component that needs Context is a `"use client"` module, and namespaced
  statics hung off an export (via `Object.assign`) **do not survive the RSC
  server→client boundary** - a server component reading `Card.Header` gets `undefined`.
  Only named exports are proxied across that boundary.

```tsx
// shape only - see Button for a real single-part example
const card = tv({
  slots: { root: "rounded-xl border bg-card", header: "p-6", body: "p-6 pt-0" },
  variants: { density: { compact: { header: "p-4", body: "p-4 pt-0" } } },
})
const [CardProvider, useCardContext] = createContext<{ slots: CardSlots }>("Card")
```

---

## 3. Hard rules
- **Tokens only.** No raw hex/`oklch()`/`cubic-bezier()`/ms in components. Use the semantic
  color tokens, the `radius-*`/`shadow-*` scales, and the motion utilities (`ease-out`,
  `duration-base`). JS animation pulls from [`lib/motion.ts`](../lib/motion.ts).
- **Every component accepts `className`** and merges it last (via `tv`, which runs
  `tailwind-merge`), so consumers can override without specificity fights.
- **A11y is not optional.** Reach for a Radix primitive before hand-rolling focus/keyboard/ARIA.
  The lone exception is **Tooltip**, which wraps **Tippy.js** (headless mode) for positioning
  and hover-intent - but still owns its markup as a `tv` recipe with our tokens. Prefer Radix
  for anything new; only reach outside it with a reason this clear.
- **One variant engine: `tv`.** We standardized on `tailwind-variants`; don't introduce a
  second variants library.
- **Buttons are text-first; icons are the exception.** Default to a label-only `Button` - the
  text is the affordance. Icons are allowed but should be rare and intentional (e.g. a leading
  glyph that genuinely clarifies the action), not a default decoration. If most buttons in a
  surface carry icons, that's a smell - reach for the plain label first.

---

## 4. Density - the cross-cutting spacing axis

Koala serves **both marketing and application UI**. The difference is spacing, not color: a
marketing page wants generous padding; an app dashboard wants tight, information-dense
surfaces. **`density`** ([`lib/density.tsx`](../lib/density.tsx)) is the one knob that
expresses this - `comfortable` (the default) and `compact`.

- **It's a `tv` variant like any other.** Components that honor density (Button, Card, Dialog,
  Tabs) add a `density: { comfortable, compact }` variant and resolve it before styling.
  `comfortable` must reproduce the component's pre-density classes **byte-for-byte**, so
  existing marketing markup never shifts. Where the compact deltas would collide awkwardly
  with another axis (e.g. Button's `size`), carry them in `compoundVariants` keyed on
  `size + density` and leave the `density` variant slots empty.
- **Resolution precedence: explicit prop > nearest `DensityProvider` > `"comfortable"`.**
  Every consuming component calls `useDensity(props.density)` and feeds the result into its
  recipe. `DensityProvider` lets an app shell set density once for a whole subtree with no
  per-instance props; the context carries a safe default, so a component with no provider and
  no prop behaves exactly as before density existed.
- **Reading density makes a component a client component.** Card, Dialog and Tabs already are.
  **Button is `"use client"`** specifically so it can participate in provider-driven
  density - the alternative (server-only Button) would defeat the "set density once" pattern.
- **Not every component takes density.** Avatar and Badge own explicit pixel `size` scales; a
  spacing axis would be redundant, so they skip it. Add density only where padding/gap/height
  genuinely have two sensible densities.
- **Density never changes radius or color.** Roundy corners are a brand trait at every density
  (the global `--radius` puts cards at 16px); density only retunes spacing and control height.

---

## 5. Interaction & polish

Polish is a standing rule of the DS - apply these by default when building or reviewing any
component.

**Always-on (already wired into the foundation):**
- **Font smoothing** - `antialiased` on root + base layer ([globals.css](../app/globals.css)).
- **Text wrapping** - headings `text-wrap: balance`, body `text-wrap: pretty` (base layer).
- **Layered shadows over borders** - our `shadow-*` tokens already stack transparent layers.

**Per-component rules:**
- **Scale on press** - interactive controls use `active:scale-[0.96]` (exactly `0.96`,
  never below `0.95`). Expose a `static` prop to disable. Button is the reference.
- **Specific transitions** - never `transition: all`. Name the properties (or use
  Tailwind's curated `transition`, which is explicit, not `all`).
- **Concentric radius** - nested surfaces: `outerRadius = innerRadius + padding`. Never
  the same `rounded-*` on a parent and its inner child.
- **Tabular numbers** - `tabular-nums` on any dynamically-updating number (counters,
  timers, prices) to prevent layout shift.
- **Minimum hit area** - interactive elements ≥ 40×40px; extend small controls with a
  pseudo-element rather than enlarging the visual.
- **Optical alignment** - nudge icons/glyphs optically when geometric centering looks off.
- **Interruptible animations** - CSS transitions for interactive state; keyframes only for
  one-shot staged sequences. Stagger enters (~100ms), keep exits subtle.
- **`will-change` sparingly** - only `transform`/`opacity`/`filter`, only on observed stutter.
