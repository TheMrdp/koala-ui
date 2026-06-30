import * as React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

/**
 * The Koala UI lockup: the brand logo tile plus the wordmark. Shared by the landing
 * header and footer so the mark stays identical in both. `wordmark={false}` renders the
 * tile alone. Decorative tile is aria-hidden; the wordmark carries the accessible name.
 */
export interface BrandMarkProps extends React.ComponentProps<"span"> {
  wordmark?: boolean
}

export function BrandMark({ className, wordmark = true, ...props }: BrandMarkProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)} {...props}>
      <Image
        src="/koala-logo.webp"
        alt=""
        aria-hidden
        width={28}
        height={28}
        className="size-7 rounded-lg shadow-xs"
      />
      {wordmark && <span className="text-base font-semibold tracking-tight">Koala UI</span>}
    </span>
  )
}
