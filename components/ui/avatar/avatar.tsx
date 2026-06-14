"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { createContext } from "@/lib/create-context"
import { tv, type VariantProps } from "@/lib/tv"

/**
 * Avatar — a multi-part component over Radix Avatar (which handles image load state and
 * fallback). Pattern: one `tv` recipe with `slots`, shared `size`/`shape` flowing to every
 * part through React Context. See docs/ARCHITECTURE.md §2.
 *
 * The shape lives on the root; Image/Fallback inherit it via `rounded-[inherit]` so a
 * `<img>` clips itself — no `overflow-hidden` on the root, leaving the corner free for
 * `Avatar.Status` to sit outside the silhouette.
 */
export const avatarVariants = tv({
  slots: {
    root: [
      "relative inline-flex shrink-0 select-none items-center justify-center align-middle",
      "bg-muted",
      // make-interfaces-feel-better: image outline — a hairline over the image edge so it
      // doesn't float against light surfaces.
      "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit]",
      "after:border after:border-foreground/10 after:content-['']",
    ],
    image: "size-full rounded-[inherit] object-cover",
    fallback:
      "flex size-full items-center justify-center rounded-[inherit] bg-muted font-medium uppercase text-muted-foreground",
    status: "absolute z-10 rounded-full ring-2 ring-background",
  },
  variants: {
    size: {
      xs: { root: "size-6 rounded-full text-xs", status: "size-1.5" },
      sm: { root: "size-8 rounded-full text-xs", status: "size-2" },
      md: { root: "size-10 rounded-full text-sm", status: "size-2.5" },
      lg: { root: "size-12 rounded-full text-base", status: "size-3" },
      xl: { root: "size-16 rounded-full text-lg", status: "size-3.5" },
    },
    shape: {
      circle: { root: "rounded-full" },
      square: { root: "rounded-lg" },
    },
  },
  defaultVariants: {
    size: "md",
    shape: "circle",
  },
})

type AvatarSlots = ReturnType<typeof avatarVariants>
const [AvatarProvider, useAvatarContext] = createContext<{ slots: AvatarSlots }>(
  "Avatar",
)

export interface AvatarProps
  extends React.ComponentProps<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

export function AvatarRoot({ className, size, shape, ...props }: AvatarProps) {
  const slots = avatarVariants({ size, shape })
  return (
    <AvatarProvider slots={slots}>
      <AvatarPrimitive.Root
        data-slot="avatar"
        className={slots.root({ className })}
        {...props}
      />
    </AvatarProvider>
  )
}

export function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  const { slots } = useAvatarContext("Avatar.Image")
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={slots.image({ className })}
      {...props}
    />
  )
}

export function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  const { slots } = useAvatarContext("Avatar.Fallback")
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={slots.fallback({ className })}
      {...props}
    />
  )
}

const statusColor = {
  online: "bg-success",
  away: "bg-warning",
  busy: "bg-destructive",
  offline: "bg-muted-foreground",
} as const

const statusPosition = {
  "bottom-right": "right-0 bottom-0",
  "top-right": "right-0 top-0",
  "bottom-left": "left-0 bottom-0",
  "top-left": "left-0 top-0",
} as const

export interface AvatarStatusProps extends React.ComponentProps<"span"> {
  /** Presence state — maps to a semantic status token. */
  variant?: keyof typeof statusColor
  /** Corner where the indicator appears. @default "bottom-right" */
  position?: keyof typeof statusPosition
}

export function AvatarStatus({
  className,
  variant = "online",
  position = "bottom-right",
  ...props
}: AvatarStatusProps) {
  const { slots } = useAvatarContext("Avatar.Status")
  return (
    <span
      data-slot="avatar-status"
      className={cn(slots.status(), statusColor[variant], statusPosition[position], className)}
      {...props}
    />
  )
}

/** Compound API: `<Avatar>` (= `<Avatar.Root>`) with `.Image`, `.Fallback`, `.Status`. */
export const Avatar = Object.assign(AvatarRoot, {
  Root: AvatarRoot,
  Image: AvatarImage,
  Fallback: AvatarFallback,
  Status: AvatarStatus,
})
