"use client"

import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const INITIAL = ["Design", "Engineering", "Marketing", "Research"]

/** Interactive demo for the `onRemove` dismiss affordance. */
export function DismissibleDemo() {
  const [tags, setTags] = React.useState(INITIAL)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex min-h-7 flex-wrap items-center justify-center gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            pill
            onRemove={() => setTags((t) => t.filter((x) => x !== tag))}
            removeLabel={`Remove ${tag}`}
          >
            {tag}
          </Badge>
        ))}
      </div>
      {tags.length < INITIAL.length && (
        <Button size="sm" variant="outline" onClick={() => setTags(INITIAL)}>
          Reset
        </Button>
      )}
    </div>
  )
}
