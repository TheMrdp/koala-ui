"use client"

import * as React from "react"

import { LoginForm } from "@/components/ui/auth-form"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { DensityProvider, type Density } from "@/lib/density"
import { cn } from "@/lib/utils"

/**
 * Density on a real block: the LoginForm auth block under a live density knob. Toggling
 * Comfortable/Compact retunes the whole card at once - padding, gaps, title size - and opens it up
 * or tightens it, so the spacing axis is something you feel rather than read. The max-width /
 * padding / gap change rides one CSS transition, so it stays interruptible: flip it mid-animation
 * and it reverses cleanly (no `transition-all`).
 */
export function DensityAuthFormDemo() {
  const [density, setDensity] = React.useState<Density>("comfortable")

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <ToggleGroup
        type="single"
        size="sm"
        value={density}
        onValueChange={(v) => v && setDensity(v as Density)}
        aria-label="Form density"
      >
        <ToggleGroupItem value="comfortable">Comfortable</ToggleGroupItem>
        <ToggleGroupItem value="compact">Compact</ToggleGroupItem>
      </ToggleGroup>

      <DensityProvider density={density}>
        <LoginForm
          className={cn(
            "transition-[max-width,padding,gap] duration-base ease-out",
            density === "comfortable" ? "max-w-md" : "max-w-sm",
          )}
        />
      </DensityProvider>
    </div>
  )
}
