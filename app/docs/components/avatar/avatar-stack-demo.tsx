"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

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

const STACK_SIZES = [
  { size: "sm", overlap: "-space-x-2.5" },
  { size: "md", overlap: "-space-x-3" },
  { size: "lg", overlap: "-space-x-4" },
] as const

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

const stackAvatar =
  "ring-2 ring-background transition duration-fast ease-out hover:z-10 hover:-translate-y-0.5"

function AvatarStack({
  size,
  overlap,
}: {
  size: (typeof STACK_SIZES)[number]["size"]
  overlap: string
}) {
  return (
    <div className={cn("flex", overlap)}>
      {TEAM.map(({ img, name }) => (
        <Tooltip key={img} content={name}>
          <Avatar size={size} className={stackAvatar}>
            <AvatarImage src={`https://i.pravatar.cc/160?img=${img}`} alt={name} />
            <AvatarFallback>{initials(name)}</AvatarFallback>
          </Avatar>
        </Tooltip>
      ))}
      <Tooltip
        content={
          <ul className="flex flex-col gap-0.5 py-0.5 text-left">
            {OVERFLOW.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        }
      >
        <Avatar size={size} className={stackAvatar}>
          <AvatarFallback>+5</AvatarFallback>
        </Avatar>
      </Tooltip>
    </div>
  )
}

export function AvatarStackDemo() {
  return (
    <>
      {STACK_SIZES.map(({ size, overlap }) => (
        <div key={size} className="flex items-center gap-4">
          <span className="w-8 font-mono text-xs text-muted-foreground">{size}</span>
          <AvatarStack size={size} overlap={overlap} />
        </div>
      ))}
    </>
  )
}
