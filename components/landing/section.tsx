import * as React from "react"

import {
  Section as UISection,
  SectionContainer,
  type SectionContainerProps,
} from "@/components/ui/section"
import {
  SectionHeader,
  SectionHeaderText,
  SectionHeaderHeading,
  SectionHeaderDescription,
} from "@/components/ui/section-header"
import { Reveal } from "@/components/landing/reveal"

/**
 * Landing-page wrappers over the canonical DS section shell (components/ui/section +
 * section-header). They keep the terse landing call-sites (`<Section>` + `<SectionHeading … />`)
 * while every section now inherits ONE rhythm from the system: the full-bleed band, the 1440px
 * centered gutter (`SectionContainer`, the marketing default), the 32px side padding, and the
 * canonical 56px gap between the heading and the content below it. No section sets its own
 * header→content margin anymore — the gutter's `gap` owns it.
 */

export interface SectionProps extends React.ComponentProps<"section"> {
  /** Constrain children to the shared centered gutter. @default true */
  contained?: boolean
  /** Width cap of the gutter (forwarded to SectionContainer). @default "xlarge" (1440px) */
  width?: SectionContainerProps["width"]
  /**
   * Vertical rhythm of the band. Use `none` for a child that is already its own band and brings
   * its own `py` (e.g. a Hero), so the page rhythm has a single owner. @default "default"
   */
  padding?: "default" | "none"
}

/** A full-bleed vertical band. Wraps children in the shared 1440px gutter unless `contained={false}`. */
export function Section({
  className,
  contained = true,
  width,
  padding,
  children,
  ...props
}: SectionProps) {
  return (
    <UISection className={className} padding={padding} {...props}>
      {contained ? <SectionContainer width={width}>{children}</SectionContainer> : children}
    </UISection>
  )
}

export interface SectionHeadingProps extends Omit<React.ComponentProps<"div">, "title"> {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  /** Center the heading block. @default true */
  centered?: boolean
}

/**
 * Eyebrow + balanced title + pretty description, the standard section lede. Composes the DS
 * `SectionHeader` (so it shares the heading scale and alignment axes with the rest of the
 * system) inside a `Reveal` for the landing's scroll-in animation. The eyebrow stays the
 * landing's uppercase brand caption rather than a Badge pill.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = true,
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <Reveal className={className} {...props}>
      <SectionHeader align={centered ? "center" : "left"}>
        <SectionHeaderText>
          {eyebrow != null && (
            <span className="text-sm font-semibold tracking-wide text-brand uppercase">
              {eyebrow}
            </span>
          )}
          <SectionHeaderHeading>{title}</SectionHeaderHeading>
          {description != null && <SectionHeaderDescription>{description}</SectionHeaderDescription>}
        </SectionHeaderText>
      </SectionHeader>
    </Reveal>
  )
}
