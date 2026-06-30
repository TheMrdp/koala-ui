"use client"

import type { CSSProperties } from "react"
import { LockSimple } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/** Where "Get full code" sends shoppers. The storefront pricing page on koalaui.com. */
const PRICING_URL = "https://koalaui.com/pricing"

/**
 * PremiumCode: the locked stand-in for a code block on a paid (PRO) docs page. The live
 * preview stays visible (it's the showcase); the source is gated behind a "Get full code"
 * CTA. Reads as a real code surface, the same rounded/bordered card as CodeSnippet, with a
 * blurred, realistically-indented faux source that fades under a scrim, so it's obvious
 * there *is* code here without giving it away.
 *
 * Drop it anywhere a CodeSnippet would go on a PRO page, or pass `locked` to
 * ComponentPreview to swap its Code tab for this.
 */
export interface PremiumCodeProps {
  /** Headline above the CTA. @default "This is a Pro component" */
  title?: string
  /** Supporting line under the headline. */
  description?: string
  className?: string
  /**
   * Inline styles for the root. Used to match the sibling Preview tab's height so switching
   * tabs never jumps (ComponentPreview passes a measured `minHeight`).
   */
  style?: CSSProperties
}

// A faux source block: import lines, then a component body. {w} is the line length,
// {i} the indent depth; w:0 renders a blank line. Static (no Math.random) so SSR is stable.
const FAUX_LINES: { w: string; i: number }[] = [
  { w: "44%", i: 0 },
  { w: "62%", i: 1 },
  { w: "54%", i: 1 },
  { w: "26%", i: 0 },
  { w: "0", i: 0 },
  { w: "40%", i: 0 },
  { w: "58%", i: 1 },
  { w: "47%", i: 2 },
  { w: "52%", i: 2 },
  { w: "30%", i: 1 },
]

export function PremiumCode({
  title = "This is a Pro component",
  description = "The full source ships with Koala UI Pro. Grab a license to copy it into your project.",
  className,
  style,
}: PremiumCodeProps) {
  return (
    <div
      style={style}
      className={cn(
        "relative isolate overflow-hidden rounded-xl border border-border bg-card shadow-xs",
        className,
      )}
    >
      {/* Blurred, realistically-indented faux source: implies real code behind the gate. */}
      <div
        aria-hidden
        className="flex flex-col gap-3 p-5 opacity-50 blur-[2px] select-none"
      >
        {FAUX_LINES.map((line, idx) =>
          line.w === "0" ? (
            <div key={idx} className="h-2.5" />
          ) : (
            <div
              key={idx}
              className="h-2.5 rounded-full bg-muted-foreground/25"
              style={{ width: line.w, marginLeft: `${line.i * 1.25}rem` }}
            />
          ),
        )}
      </div>

      {/* Scrim: fades the source out toward the CTA so it reads as a paywall, not a glitch. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-card/60 via-card/85 to-card"
      />

      {/* Lock + CTA. */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3.5 px-6 py-8 text-center">
        <span
          aria-hidden
          className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground ring-1 ring-border ring-inset"
        >
          <LockSimple className="size-[1.35rem]" />
        </span>
        <div className="flex flex-col gap-1.5">
          <p className="text-base font-semibold tracking-tight">{title}</p>
          <p className="mx-auto max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
        <Button asChild variant="secondary" size="sm" className="mt-1">
          <a href={PRICING_URL} target="_blank" rel="noopener noreferrer">
            Get full code
          </a>
        </Button>
      </div>
    </div>
  )
}
