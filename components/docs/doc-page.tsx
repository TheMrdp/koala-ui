"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

/** Turn a section title into a URL-safe anchor id, shared by DocSection and the TOC. */
export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/** Page title + lead description block, shared across docs pages. */
export function DocHeader({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="mb-8 flex flex-col gap-2">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="text-lg text-pretty text-muted-foreground">{description}</p>
    </div>
  )
}

function CopyAnchorLink({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = useState(false)

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    const url = `${window.location.origin}${window.location.pathname}#${slug}`
    navigator.clipboard.writeText(url).then(() => {
      window.location.hash = slug
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <a
      href={`#${slug}`}
      onClick={handleClick}
      className={cn(
        "opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-base font-normal tabular-nums select-none",
        copied ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
      aria-label={`Copy link to ${title}`}
      tabIndex={-1}
    >
      {copied ? "Copied!" : "#"}
    </a>
  )
}

/** Section heading inside a docs page. */
export function DocSection({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  const slug = slugify(title)
  return (
    <section className={cn("mt-10", className)}>
      <h2
        id={slug}
        className="group flex items-center gap-2 scroll-mt-24 border-b border-border pb-2 text-xl font-semibold tracking-tight"
      >
        {title}
        <CopyAnchorLink slug={slug} title={title} />
      </h2>
      {children}
    </section>
  )
}
