"use client"

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar"
import { AvatarGroup } from "@/components/ui/avatar-group"
import { Tooltip } from "@/components/ui/tooltip"

type Size = "xs" | "sm" | "md" | "lg" | "xl"

const TEAM = [
  { img: 12, name: "Esteban Alonso" },
  { img: 5, name: "Marie Dubois" },
  { img: 32, name: "Liam Chen" },
  { img: 47, name: "Sofia Rossi" },
]

const MORE = ["Yuki Tanaka", "Omar Shaikh", "Priya Nair", "Lucas Ferreira", "Amélie Bernard"]
const TOTAL = TEAM.length + MORE.length

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

/**
 * Plain helper (not a component) so the avatars stay DIRECT children of AvatarGroup and
 * `React.Children.toArray` counts each one for the `max`/`+N` math.
 */
const people = (size: Size) =>
  TEAM.map(({ img, name }) => (
    <Tooltip key={img} content={name}>
      <Avatar size={size}>
        <AvatarImage src={`https://i.pravatar.cc/160?img=${img}`} alt={name} />
        <AvatarFallback>{initials(name)}</AvatarFallback>
      </Avatar>
    </Tooltip>
  ))

/** Hero: four collaborators capped, the rest folded into a `+N` chip. */
export function AvatarGroupHeroDemo() {
  return (
    <AvatarGroup size="md" max={4} total={TOTAL}>
      {people("md")}
    </AvatarGroup>
  )
}

/** Sizes: the overlap tightens as the box grows; match the group size to its children. */
export function AvatarGroupSizesDemo() {
  return (
    <div className="flex flex-col gap-6">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex items-center gap-4">
          <span className="w-8 font-mono text-xs text-muted-foreground">{size}</span>
          <AvatarGroup size={size} max={4} total={TOTAL}>
            {people(size)}
          </AvatarGroup>
        </div>
      ))}
    </div>
  )
}

/** Overflow: the same set at a few caps so the `+N` math reads at a glance. */
export function AvatarGroupOverflowDemo() {
  return (
    <div className="flex flex-col gap-4">
      {[2, 3, undefined].map((max, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="w-20 shrink-0 font-mono text-xs text-muted-foreground">
            {max == null ? "no max" : `max ${max}`}
          </span>
          <AvatarGroup size="md" max={max} total={TOTAL}>
            {people("md")}
          </AvatarGroup>
        </div>
      ))}
    </div>
  )
}

// Fallback-only stack: no images, so every avatar shows its initials. Each carries a `color` so
// the cluster reads as distinct people, stride-mixed (brand/purple/teal/orange/pink) so no two
// neighbours share a hue and the row balances warm/cool.
const FALLBACK_TEAM = [
  { name: "Noah Bennett", color: "brand" },
  { name: "Emma Morales", color: "purple" },
  { name: "Caleb Wong", color: "teal" },
  { name: "Wren Eriksson", color: "orange" },
  { name: "Gabriel Ortiz", color: "pink" },
] as const

/** Fallbacks: with no image each avatar shows colored initials. In a group, fallbacks always ride
 *  the colored `color` variant (soft bg + strong initials), never the flat gray default. */
export function AvatarGroupFallbacksDemo() {
  return (
    <AvatarGroup size="md">
      {FALLBACK_TEAM.map(({ name, color }) => (
        <Tooltip key={name} content={name}>
          <Avatar size="md" color={color}>
            <AvatarFallback>{initials(name)}</AvatarFallback>
          </Avatar>
        </Tooltip>
      ))}
    </AvatarGroup>
  )
}

/** Custom overflow: swap the chip for a Tooltip that names the people the stack hides. */
export function AvatarGroupCustomOverflowDemo() {
  return (
    <AvatarGroup
      size="md"
      max={4}
      total={TOTAL}
      renderOverflow={(overflow) => (
        <Tooltip
          interactive
          content={
            <ul className="flex flex-col gap-0.5 py-0.5 text-left">
              {MORE.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          }
        >
          <Avatar size="md" tabIndex={0}>
            <AvatarFallback maxInitials={4} className="tabular-nums">
              {`+${overflow}`}
            </AvatarFallback>
          </Avatar>
        </Tooltip>
      )}
    >
      {people("md")}
    </AvatarGroup>
  )
}
