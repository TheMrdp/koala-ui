"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ACCENTS, useAccent, type Accent } from "@/components/accent-provider"

/**
 * Each swatch carries its own `data-accent`, so `bg-brand` resolves to that preset's
 * `--brand` regardless of the active accent — no JS color list to drift from the CSS.
 */
function Swatch({ accent, className }: { accent: Accent; className?: string }) {
  return (
    <span
      data-accent={accent}
      aria-hidden
      className={`inline-block size-3.5 shrink-0 rounded-full bg-brand ${className ?? ""}`}
    />
  )
}

/** Accent ("color mode") picker for the docs header. Dogfoods DropdownMenu. */
export function AccentSwitcher() {
  const { accent, setAccent } = useAccent()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" iconOnly aria-label="Change accent color">
          <Swatch accent={accent} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[10rem]">
        <DropdownMenuLabel>Accent</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={accent}
          onValueChange={(value) => setAccent(value as Accent)}
        >
          {ACCENTS.map((a) => (
            <DropdownMenuRadioItem key={a} value={a} className="capitalize">
              <Swatch accent={a} />
              {a}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
