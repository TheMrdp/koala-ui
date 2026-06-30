"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { AvatarGroup } from "@/components/ui/avatar-group"
import { Tooltip } from "@/components/ui/tooltip"

const TEAM = [
  { img: 12, name: "Esteban Alonso" },
  { img: 5, name: "Marie Dubois" },
  { img: 32, name: "Liam Chen" },
  { img: 47, name: "Sofia Rossi" },
]

const OVERFLOW = [
  "Yuki Tanaka",
  "Omar Shaikh",
  "Priya Nair",
  "Lucas Ferreira",
  "Amélie Bernard",
]

const STACK_SIZES = ["sm", "md", "lg"] as const

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

/** The group owns the overlap, ring, and hover lift; children stay plain Avatars. */
export function AvatarStackDemo() {
  return (
    <>
      {STACK_SIZES.map((size) => (
        <div key={size} className="flex items-center gap-4">
          <span className="w-8 font-mono text-xs text-muted-foreground">{size}</span>
          {/* max collapses the rest into a +N chip; total counts the names we don't render. */}
          <AvatarGroup
            size={size}
            max={4}
            total={TEAM.length + OVERFLOW.length}
            renderOverflow={(overflow) => (
              <Tooltip
                content={
                  <ul className="flex flex-col gap-0.5 py-0.5 text-left">
                    {OVERFLOW.map((name) => (
                      <li key={name}>{name}</li>
                    ))}
                  </ul>
                }
              >
                <Avatar size={size}>
                  <AvatarFallback maxInitials={4} className="tabular-nums">
                    {`+${overflow}`}
                  </AvatarFallback>
                </Avatar>
              </Tooltip>
            )}
          >
            {TEAM.map(({ img, name }) => (
              <Tooltip key={img} content={name}>
                <Avatar size={size}>
                  <AvatarImage src={`https://i.pravatar.cc/160?img=${img}`} alt={name} />
                  <AvatarFallback>{initials(name)}</AvatarFallback>
                </Avatar>
              </Tooltip>
            ))}
          </AvatarGroup>
        </div>
      ))}
    </>
  )
}
