"use client"

import * as React from "react"
import { Check, Copy } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CodeBlockProps {
  code: string
  /** Shown top-left as a filename chip, e.g. "button.tsx". */
  filename?: string
  className?: string
}

export function CodeBlock({ code, filename, className }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  async function copy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    const id = window.setTimeout(() => setCopied(false), 1500)
    return () => window.clearTimeout(id)
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-border bg-card",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="font-mono text-xs text-muted-foreground">
          {filename ?? "tsx"}
        </span>
        <Button
          iconOnly
          variant="ghost"
          size="sm"
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="size-7"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </Button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-mono text-card-foreground">{code}</code>
      </pre>
    </div>
  )
}
