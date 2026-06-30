"use client"

import { NewsletterForm } from "@/components/ui/newsletter-form"

/** Card layout: heading, lead, email capture, and fine print. */
export function NewsletterFormDemo() {
  return <NewsletterForm className="max-w-md" />
}

/** Inline layout: a single row for footers and hero sections. */
export function NewsletterFormInlineDemo() {
  return (
    <NewsletterForm
      variant="inline"
      action="Subscribe"
      className="max-w-md"
      aria-label="Newsletter signup"
    />
  )
}
