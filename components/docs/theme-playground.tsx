"use client"

import * as React from "react"
import { ArrowCounterClockwise, Check } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { THEMES, type Theme } from "@/components/theme-provider"
import { type Accent } from "@/components/accent-provider"
import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { InputRoot, InputField, InputLabel } from "@/components/ui/input"
import { CodeSnippet } from "@/components/docs/code-snippet"

/**
 * The eight built-in accent presets, mirrored from the `[data-accent="…"]` blocks in
 * app/globals.css. Kept as literal values here (rather than read off the DOM) so the
 * playground is fully self-contained: the same string drives the live preview, the swatch,
 * and the copyable CSS. If you add or retune an accent in globals.css, mirror it here.
 */
const ACCENT_PRESETS: { name: Accent; value: string }[] = [
  { name: "orange", value: "oklch(0.648 0.222 34.2)" },
  { name: "red", value: "oklch(0.585 0.222 27)" },
  { name: "amber", value: "oklch(0.705 0.165 70)" },
  { name: "green", value: "oklch(0.62 0.17 150)" },
  { name: "teal", value: "oklch(0.6 0.13 192)" },
  { name: "blue", value: "oklch(0.55 0.2 255)" },
  { name: "violet", value: "oklch(0.52 0.23 285)" },
  { name: "pink", value: "oklch(0.59 0.23 354)" },
]

/** Koala's tuned default radius (xl = ×1.4 lands cards at exactly 16px). */
const DEFAULT_RADIUS = 0.71
const DEFAULT_BRAND = ACCENT_PRESETS[0]

type BrandLabel = Accent | "custom"

const THEME_LABELS: Record<Theme, string> = {
  light: "Light",
  dark: "Dark",
  cream: "Cream",
  moonlight: "Moonlight",
}

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
    {children}
  </p>
)

/**
 * ThemePlayground — a self-contained, live theming sandbox. Theme, accent (`--brand`) and
 * corner radius (`--radius`) are applied as scoped CSS variables on the preview surface, so
 * a real cross-section of Koala components restyles instantly without touching the page's
 * own theme. The copyable CSS mirrors exactly what the consumer would drop into their
 * `:root`. All state lives in handlers (no effects), per the repo's strict react-hooks lint.
 */
export function ThemePlayground() {
  const [theme, setTheme] = React.useState<Theme>("light")
  const [brand, setBrand] = React.useState<string>(DEFAULT_BRAND.value)
  const [brandLabel, setBrandLabel] = React.useState<BrandLabel>(DEFAULT_BRAND.name)
  const [radius, setRadius] = React.useState<number>(DEFAULT_RADIUS)

  const isDefault =
    theme === "light" && brandLabel === DEFAULT_BRAND.name && radius === DEFAULT_RADIUS

  function selectPreset(preset: (typeof ACCENT_PRESETS)[number]) {
    setBrand(preset.value)
    setBrandLabel(preset.name)
  }

  function selectCustom(value: string) {
    setBrand(value)
    setBrandLabel("custom")
  }

  function reset() {
    setTheme("light")
    setBrand(DEFAULT_BRAND.value)
    setBrandLabel(DEFAULT_BRAND.name)
    setRadius(DEFAULT_RADIUS)
  }

  // Scope the three knobs to the preview only. --ring-brand is derived from --brand the same
  // way :root does, so focus rings track the chosen accent (we set it explicitly because a
  // child override of --brand alone won't recompute a parent-declared --ring-brand).
  const previewStyle = {
    "--brand": brand,
    "--ring-brand": `color-mix(in oklch, ${brand} 10%, transparent)`,
    "--radius": `${radius}rem`,
  } as React.CSSProperties

  // The themed canvas needs the theme's class (light is the bare :root, so no class).
  const themeClass = theme === "light" ? "" : theme

  const generatedCss = [
    ":root {",
    `  --brand: ${brand};`,
    `  --radius: ${radius}rem;`,
    "}",
  ].join("\n")

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      {/* ── Controls ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-6 border-b border-border p-5 sm:flex-row sm:flex-wrap sm:items-start sm:gap-8">
        {/* Theme */}
        <div className="flex flex-col gap-2.5">
          <SectionLabel>Theme</SectionLabel>
          <ButtonGroup size="sm" variant="ghost" attached>
            {THEMES.map((t) => (
              <ButtonGroupItem
                key={t}
                aria-pressed={theme === t}
                variant={theme === t ? "secondary" : "ghost"}
                onClick={() => setTheme(t)}
              >
                {THEME_LABELS[t]}
              </ButtonGroupItem>
            ))}
          </ButtonGroup>
        </div>

        {/* Accent */}
        <div className="flex flex-col gap-2.5">
          <SectionLabel>Accent · --brand</SectionLabel>
          <div className="flex items-center gap-1.5">
            {ACCENT_PRESETS.map((preset) => {
              const active = brandLabel === preset.name
              return (
                <button
                  key={preset.name}
                  type="button"
                  aria-label={preset.name}
                  aria-pressed={active}
                  onClick={() => selectPreset(preset)}
                  className={cn(
                    "grid size-9 cursor-pointer place-items-center rounded-lg transition-[transform,box-shadow] duration-fast ease-out active:scale-[0.92]",
                    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
                    active && "ring-2 ring-foreground ring-offset-2 ring-offset-card",
                  )}
                >
                  <span
                    aria-hidden
                    className="size-5 rounded-full"
                    style={{ backgroundColor: preset.value }}
                  >
                    {active && (
                      <Check
                        weight="bold"
                        className="size-5 p-0.5 text-white mix-blend-difference"
                      />
                    )}
                  </span>
                </button>
              )
            })}

            {/* Custom color well */}
            <label
              className={cn(
                "relative ml-1 grid size-9 cursor-pointer place-items-center rounded-lg transition-transform duration-fast ease-out active:scale-[0.92]",
                brandLabel === "custom" && "ring-2 ring-foreground ring-offset-2 ring-offset-card",
              )}
              title="Custom color"
            >
              <span
                aria-hidden
                className="size-5 rounded-full border border-border"
                style={{
                  background:
                    brandLabel === "custom"
                      ? brand
                      : "conic-gradient(from 90deg, #f84416, #f5b800, #2ecc71, #2d9cdb, #9b51e0, #f84416)",
                }}
              />
              <input
                type="color"
                aria-label="Custom accent color"
                // type=color needs a hex; seed it from the default so the picker opens sensibly.
                defaultValue="#f84416"
                onChange={(e) => selectCustom(e.target.value)}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
            </label>
          </div>
        </div>

        {/* Radius */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between gap-6">
            <SectionLabel>Radius · --radius</SectionLabel>
            <span className="font-mono text-xs text-muted-foreground tabular-nums">
              {radius.toFixed(2)}rem
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Slider
              value={[radius]}
              onValueChange={([v]) => setRadius(v)}
              min={0}
              max={1.5}
              step={0.01}
              className="w-44"
              aria-label="Corner radius"
            />
          </div>
        </div>

        {/* Reset */}
        <div className="flex flex-col gap-2.5 sm:ml-auto">
          <SectionLabel className="sr-only">Reset</SectionLabel>
          <Button
            variant="ghost"
            size="sm"
            onClick={reset}
            disabled={isDefault}
            className="self-start"
          >
            <ArrowCounterClockwise />
            Reset
          </Button>
        </div>
      </div>

      {/* ── Live preview ─────────────────────────────────────────────────── */}
      <div
        className={cn(
          "flex justify-center bg-background p-6 text-foreground sm:p-10",
          themeClass,
        )}
        style={previewStyle}
      >
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Workspace
              <Badge>Pro</Badge>
            </CardTitle>
            <CardDescription>
              Every surface, control and focus ring below reads the same tokens.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <InputRoot>
              <InputLabel htmlFor="playground-name">Display name</InputLabel>
              <InputField id="playground-name" placeholder="Koala team" defaultValue="Koala team" />
            </InputRoot>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">Volume</span>
                <span className="font-mono text-xs text-muted-foreground tabular-nums">68</span>
              </div>
              <Slider defaultValue={[68]} variant="brand" aria-label="Volume" />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="playground-switch" className="text-sm text-foreground">
                Email notifications
              </label>
              <Switch id="playground-switch" defaultChecked />
            </div>

            <label className="flex items-center gap-2.5 text-sm text-foreground">
              <Checkbox defaultChecked />
              Subscribe to the changelog
            </label>
          </CardContent>
          <CardFooter className="gap-2">
            <Button variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button className="flex-1">Save changes</Button>
          </CardFooter>
        </Card>
      </div>

      {/* ── Generated CSS ────────────────────────────────────────────────── */}
      <div className="border-t border-border p-5">
        <p className="mb-3 text-sm text-muted-foreground">
          Drop this into your global stylesheet to ship the look above
          {brandLabel !== "custom" && (
            <>
              {" "}
              (the same accent is also available as{" "}
              <code className="font-mono text-xs">data-accent=&quot;{brandLabel}&quot;</code>)
            </>
          )}
          .
        </p>
        <CodeSnippet code={generatedCss} lang="tsx" filename="globals.css" />
      </div>
    </div>
  )
}
