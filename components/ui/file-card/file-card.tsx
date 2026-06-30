"use client"

import * as React from "react"
import { Slot } from "radix-ui"
import {
  File,
  FilePdf,
  FileDoc,
  FileXls,
  FilePpt,
  FileZip,
  FileImage,
  FileAudio,
  FileVideo,
  FileCode,
  FileText,
  CheckCircle,
  WarningCircle,
  CircleNotch,
  type Icon,
} from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { createContext } from "@/lib/create-context"
import { useDensity } from "@/lib/density"
import { tv, type VariantProps } from "@/lib/tv"

/**
 * FileCard: a card for a single file: a type-tinted icon (or thumbnail), the name,
 * a meta line (size · date), trailing actions, and an optional upload progress bar.
 * A multi-part component built like Card/Stat: one `tv` recipe with `slots`, shared
 * state flowing to every part through React Context (never prop-drilled or cloned).
 * Compose the named parts (`FileCardIcon`, `FileCardThumbnail`, `FileCardContent`,
 * `FileCardName`, `FileCardMeta`, `FileCardActions`, `FileCardProgress`) into a row.
 * See docs/ARCHITECTURE.md §2.
 */
export const fileCardVariants = tv({
  slots: {
    // A horizontal row: media left, content fills, actions ride the right edge.
    root: "flex items-center gap-3 rounded-xl border bg-card text-card-foreground",
    // Concentric radius: the card is rounded-xl (16px), so the inner tile drops to lg.
    // Grid-centered so the glyph optically centers; tone is applied per instance. The glyph
    // fills ~60% of the tile (sized per density below) so the type reads at a glance.
    icon: "grid shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground",
    // Same footprint as the icon tile, but clips an <img> to the concentric radius.
    // Image outline (#11): a 1px inset ring in pure black/white, never a tinted neutral,
    // which would read as dirt on the image edge. `dark:` covers .dark and .moonlight.
    thumbnail:
      "relative shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-inset ring-black/10 dark:ring-white/10 [&>img]:size-full [&>img]:object-cover",
    // min-w-0 lets the name truncate instead of pushing the actions off the card.
    content: "flex min-w-0 flex-1 flex-col gap-0.5",
    name: "truncate text-sm font-medium text-foreground",
    // tabular-nums so a live-updating size/percent never reflows the meta line.
    meta: "flex items-center gap-1.5 truncate text-xs tabular-nums text-muted-foreground [&>svg]:size-3.5 [&>svg]:shrink-0",
    actions: "flex shrink-0 items-center gap-0.5 self-start",
    // Progress lives below the meta line; the row stays a single column with content.
    progress: "mt-1.5 flex flex-col gap-1",
    progressTrack: "h-1.5 w-full overflow-hidden rounded-full bg-muted",
    // Width is a runtime value, so it rides a CSS var (no generated class). Specific
    // transition on width only, never `transition: all`.
    progressFill:
      "h-full rounded-full bg-primary transition-[width] duration-slow ease-out w-(--file-card-progress)",
    progressMeta:
      "flex items-center justify-between text-xs tabular-nums text-muted-foreground",
  },
  variants: {
    variant: {
      // polish: prefer shadow for depth over hard borders.
      default: { root: "border-border shadow-xs" },
      outline: { root: "border-border shadow-none" },
      elevated: { root: "border-transparent shadow-lg" },
      // Chrome-less: no border, surface, or shadow. The type-tinted icon still carries the
      // file's identity, so a `ghost` row reads as a minimal attachment that sits flush on its
      // container (feeds, comment threads, dense lists) instead of a "card inside a card".
      ghost: { root: "border-transparent bg-transparent shadow-none" },
    },
    // Upload/validation state tints the surface and the progress fill. `idle` is the
    // resting state; `error` pulls a soft destructive border so a failed file reads at
    // a glance; `success` keeps the surface calm (the trailing check carries the signal).
    state: {
      idle: {},
      uploading: {},
      success: {},
      error: {
        root: "border-destructive/40 bg-destructive/5",
        progressFill: "bg-destructive",
      },
    },
    // Density is Koala's cross-cutting spacing axis (see lib/density.tsx). For FileCard it
    // governs padding, gap, and the media tile. `compact` is the dense app default
    // (file lists, upload trays); `comfortable` is the roomier marketing alternative.
    density: {
      compact: { root: "gap-3 p-3", icon: "size-10 [&>svg]:size-6", thumbnail: "size-10" },
      comfortable: { root: "gap-4 p-4", icon: "size-12 [&>svg]:size-7", thumbnail: "size-12" },
    },
    // When the whole card is a link/button (an attachment that opens), add affordance:
    // pointer, hover lift, focus ring. File rows are inert by default.
    interactive: {
      true: {
        // A full card scaling 0.96 reads janky; 0.98 gives press feedback on a large
        // surface while staying above the 0.95 floor. `transition` is curated, not `all`.
        root: "cursor-pointer transition duration-fast ease-out hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      },
    },
  },
  compoundVariants: [
    // Ghost is chrome-less, so the density padding (which exists to inset content from the
    // border/surface) just floats the row off its left edge, so drop it so a ghost attachment
    // aligns flush with the surrounding text.
    { variant: "ghost", class: { root: "p-0" } },
    // …unless the whole row is interactive: then restore a little padding and trade the
    // default hover-shadow for a soft surface, so it behaves like a hoverable list item.
    {
      variant: "ghost",
      interactive: true,
      class: { root: "-mx-2 p-2 hover:bg-muted hover:shadow-none" },
    },
  ],
  defaultVariants: {
    variant: "default",
    state: "idle",
    density: "compact",
  },
})

type FileCardSlots = ReturnType<typeof fileCardVariants>
type FileCardState = NonNullable<VariantProps<typeof fileCardVariants>["state"]>

const [FileCardProvider, useFileCardContext] = createContext<{
  slots: FileCardSlots
  state: FileCardState
}>("FileCard")

/* ------------------------------------------------------------ file types --- */

/** The visual categories a file collapses to: each maps to a glyph and a soft tone. */
export type FileCardType =
  | "pdf"
  | "image"
  | "video"
  | "audio"
  | "doc"
  | "sheet"
  | "slides"
  | "archive"
  | "code"
  | "text"
  | "default"

/** Glyph + soft tint per category. Soft variants follow the Badge pattern
 *  (`bg-<role>/10 text-<role>`) so they re-theme across all four palettes. */
const FILE_TYPES: Record<FileCardType, { icon: Icon; tone: string }> = {
  pdf: { icon: FilePdf, tone: "bg-destructive/10 text-destructive" },
  image: { icon: FileImage, tone: "bg-purple/10 text-purple" },
  video: { icon: FileVideo, tone: "bg-pink/10 text-pink" },
  audio: { icon: FileAudio, tone: "bg-orange/10 text-orange" },
  doc: { icon: FileDoc, tone: "bg-info/10 text-info" },
  sheet: { icon: FileXls, tone: "bg-success/10 text-success" },
  slides: { icon: FilePpt, tone: "bg-warning/10 text-warning" },
  archive: { icon: FileZip, tone: "bg-teal/10 text-teal" },
  code: { icon: FileCode, tone: "bg-teal/10 text-teal" },
  text: { icon: FileText, tone: "bg-muted text-muted-foreground" },
  default: { icon: File, tone: "bg-muted text-muted-foreground" },
}

/** Extension → category, so a filename resolves straight to the right glyph + tone. */
const EXTENSION_TYPES: Record<string, FileCardType> = {
  pdf: "pdf",
  png: "image", jpg: "image", jpeg: "image", gif: "image", svg: "image", webp: "image", avif: "image", heic: "image",
  mp4: "video", mov: "video", webm: "video", avi: "video", mkv: "video",
  mp3: "audio", wav: "audio", ogg: "audio", flac: "audio", m4a: "audio",
  doc: "doc", docx: "doc", rtf: "doc", pages: "doc", odt: "doc",
  xls: "sheet", xlsx: "sheet", csv: "sheet", numbers: "sheet", ods: "sheet",
  ppt: "slides", pptx: "slides", key: "slides", odp: "slides",
  zip: "archive", rar: "archive", "7z": "archive", tar: "archive", gz: "archive",
  js: "code", ts: "code", jsx: "code", tsx: "code", json: "code", html: "code", css: "code", py: "code", rb: "code", go: "code", rs: "code", sh: "code",
  txt: "text", md: "text", log: "text",
}

/**
 * fileTypeFromName: derive a {@link FileCardType} from a filename's extension, so a
 * consumer can drive `FileCardIcon` straight from the file: `type={fileTypeFromName(f.name)}`.
 * Falls back to `"default"` for unknown or extensionless names.
 */
export function fileTypeFromName(name: string): FileCardType {
  const ext = name.split(".").pop()?.toLowerCase()
  return (ext && EXTENSION_TYPES[ext]) || "default"
}

/* ------------------------------------------------------------------ parts --- */

export interface FileCardProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof fileCardVariants> {
  asChild?: boolean
}

/**
 * Parts are exported individually (not `FileCard.Icon` dot-notation) because namespaced
 * statics don't survive the RSC server→client boundary; only named exports do. Compose
 * as `<FileCard><FileCardIcon … /><FileCardContent>…`.
 */
export function FileCard({
  className,
  variant,
  state,
  density,
  interactive,
  asChild = false,
  ...props
}: FileCardProps) {
  // Density resolves prop > provider > "compact"; compute the slots once, every part
  // reads them from context.
  const resolvedState = state ?? "idle"
  const slots = fileCardVariants({
    variant,
    state,
    interactive,
    density: useDensity(density),
  })
  const Comp = asChild ? Slot.Root : "div"
  return (
    <FileCardProvider slots={slots} state={resolvedState}>
      <Comp data-slot="file-card" data-state={resolvedState} className={slots.root({ className })} {...props} />
    </FileCardProvider>
  )
}

export interface FileCardIconProps extends React.ComponentProps<"div"> {
  /** File category: picks the glyph and soft tone. Ignored when `children` are passed. */
  type?: FileCardType
}

/**
 * FileCardIcon: the leading type tile. Pass `type` to auto-pick a glyph and tint (or
 * derive it with {@link fileTypeFromName}); pass `children` to render your own glyph and
 * tone it with `className`.
 */
export function FileCardIcon({ type, className, children, ...props }: FileCardIconProps) {
  const { slots } = useFileCardContext("FileCardIcon")
  const meta = type ? FILE_TYPES[type] : undefined
  const Glyph = meta?.icon
  return (
    <div
      data-slot="file-card-icon"
      aria-hidden
      className={slots.icon({ className: cn(meta?.tone, className) })}
      {...props}
    >
      {children ?? (Glyph ? <Glyph weight="regular" /> : null)}
    </div>
  )
}

export interface FileCardThumbnailProps extends React.ComponentProps<"img"> {
  alt: string
}

/**
 * FileCardThumbnail: an image preview that fills the same footprint as `FileCardIcon`,
 * clipped to the concentric radius. Use it for images instead of the type glyph; pass an
 * object URL or remote `src`. Always give a meaningful `alt`.
 */
export function FileCardThumbnail({ className, alt, ...props }: FileCardThumbnailProps) {
  const { slots } = useFileCardContext("FileCardThumbnail")
  return (
    <div data-slot="file-card-thumbnail" className={slots.thumbnail({ className })}>
      {/* Native img: previews are commonly object URLs for not-yet-uploaded blobs, which
          next/image can't optimize. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt={alt} {...props} />
    </div>
  )
}

export function FileCardContent({ className, ...props }: React.ComponentProps<"div">) {
  const { slots } = useFileCardContext("FileCardContent")
  return <div data-slot="file-card-content" className={slots.content({ className })} {...props} />
}

export function FileCardName({ className, ...props }: React.ComponentProps<"div">) {
  const { slots } = useFileCardContext("FileCardName")
  return <div data-slot="file-card-name" className={slots.name({ className })} {...props} />
}

export function FileCardMeta({ className, ...props }: React.ComponentProps<"div">) {
  const { slots } = useFileCardContext("FileCardMeta")
  return <div data-slot="file-card-meta" className={slots.meta({ className })} {...props} />
}

export function FileCardActions({ className, ...props }: React.ComponentProps<"div">) {
  const { slots } = useFileCardContext("FileCardActions")
  return <div data-slot="file-card-actions" className={slots.actions({ className })} {...props} />
}

export interface FileCardProgressProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** Upload completion, 0-100. Drives the fill width and the trailing percentage. */
  value?: number
  /** Optional leading label on the meta line (e.g. "Uploading…", "Failed"). */
  label?: React.ReactNode
  /** Hide the percentage on the right of the meta line. @default false */
  hideValue?: boolean
}

/**
 * FileCardProgress: an upload bar with a label/percentage meta line. The fill width
 * rides a CSS variable (runtime value, no generated class) and tints destructive when the
 * card's `state` is `error`. Renders the bar in `idle` too; omit it once upload completes.
 */
export function FileCardProgress({
  className,
  value = 0,
  label,
  hideValue = false,
  ...props
}: FileCardProgressProps) {
  const { slots, state } = useFileCardContext("FileCardProgress")
  const pct = Math.min(100, Math.max(0, value))
  return (
    <div
      data-slot="file-card-progress"
      className={slots.progress({ className })}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      {...props}
    >
      {(label || !hideValue) && (
        <div className={slots.progressMeta()}>
          <span className="truncate">{label}</span>
          {!hideValue && (
            <span className={cn(state === "error" && "text-destructive")}>
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}
      <div className={slots.progressTrack()}>
        <div
          className={slots.progressFill()}
          style={{ "--file-card-progress": `${pct}%` } as React.CSSProperties}
        />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------ status glyph --- */

const STATUS_ICON = {
  uploading: { icon: CircleNotch, tone: "text-muted-foreground animate-spin motion-reduce:animate-none" },
  success: { icon: CheckCircle, tone: "text-success" },
  error: { icon: WarningCircle, tone: "text-destructive" },
} as const

export interface FileCardStatusProps extends React.ComponentProps<"span"> {
  /** Which status glyph to show. Defaults to the card's `state` from context. */
  status?: "uploading" | "success" | "error"
}

/**
 * FileCardStatus: a small trailing status glyph (spinner / check / warning) that reads
 * the card's `state` from context by default, so `<FileCard state="success">` lights the
 * check automatically. Override per instance with `status`.
 */
export function FileCardStatus({ status, className, ...props }: FileCardStatusProps) {
  const { state } = useFileCardContext("FileCardStatus")
  const resolved = status ?? (state === "idle" ? undefined : state)
  if (!resolved) return null
  const { icon: Glyph, tone } = STATUS_ICON[resolved]
  return (
    <span data-slot="file-card-status" aria-hidden className={cn("grid place-items-center [&>svg]:size-5", tone, className)} {...props}>
      <Glyph weight="regular" />
    </span>
  )
}
