"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const EASINGS = [
  { name: "ease-out", className: "ease-out", note: "UI enter / exit" },
  { name: "ease-in-out", className: "ease-in-out", note: "On-screen movement" },
  { name: "ease-drawer", className: "ease-drawer", note: "Sheets / drawers" },
]

const DURATIONS = [
  { name: "duration-fast", className: "duration-fast", note: "160ms" },
  { name: "duration-base", className: "duration-base", note: "300ms" },
  { name: "duration-slow", className: "duration-slow", note: "450ms" },
]

/** Interactive comparison of the motion tokens. Click Play to animate every track. */
export function MotionDemo({ rows }: { rows: "easing" | "duration" }) {
  const [on, setOn] = React.useState(false)
  const tracks = rows === "easing" ? EASINGS : DURATIONS
  // Easing rows share a slow duration so the curve is visible; duration rows share ease-out.
  const shared = rows === "easing" ? "duration-slow" : "ease-out"

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col divide-y divide-border rounded-lg border border-border">
        {tracks.map((t) => (
          <div key={t.name} className="flex items-center gap-4 p-4">
            <div className="w-32 shrink-0">
              <p className="font-mono text-xs text-foreground">{t.name}</p>
              <p className="text-[11px] text-muted-foreground">{t.note}</p>
            </div>
            <div className="@container relative h-8 flex-1 rounded-md bg-muted">
              <div
                className={cn(
                  "absolute top-1 left-1 size-6 rounded-sm bg-primary transition-transform",
                  t.className,
                  shared,
                  on ? "translate-x-[calc(100cqw-2rem)]" : "translate-x-0",
                )}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={() => setOn((v) => !v)}>
          {on ? "Reset" : "Play"}
        </Button>
      </div>
    </div>
  )
}
