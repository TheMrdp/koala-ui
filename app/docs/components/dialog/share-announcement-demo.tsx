"use client"

import * as React from "react"
import {
  LinkSimple,
  EnvelopeSimple,
  Info,
  Copy,
  Check,
  Megaphone,
  DeviceMobile,
  ChartLineUp,
  BellSimple,
  Lightning,
  Sparkle,
} from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { Tooltip } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogIcon,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  InputRoot,
  InputField,
  InputPrefix,
  InputSuffixButton,
  InputLabel,
} from "@/components/ui/input"
import {
  Carousel,
  CarouselContent,
  CarouselSlide,
  CarouselIndicators,
} from "@/components/ui/carousel"

/**
 * Pilot variants translated from Figma (Koala UI 12.0 · Dialog frame). Both establish the
 * pattern for the rest: a leading `DialogIcon`, Koala Input parts composed (never hand-rolled),
 * and the `bordered` footer for split helper/action rows. The Figma brand-orange CTA maps to
 * the DS `primary` button (the library's primary action is near-black, not brand orange).
 * Icons are always rendered outline (Phosphor's default weight) per the house style.
 */

// ─── Share v2 (category: Share / invite) ────────────────────────────────────────

export function ShareIncidentDialog() {
  const [copied, setCopied] = React.useState(false)
  const emailRef = React.useRef<HTMLInputElement>(null)

  function copyLink() {
    navigator.clipboard?.writeText("lspcad.flab/incident21414").catch(() => {})
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent
        size="md"
        onOpenAutoFocus={(e) => {
          e.preventDefault()
          emailRef.current?.focus()
        }}
      >
        <DialogIcon>
          <LinkSimple />
        </DialogIcon>
        <DialogHeader>
          <DialogTitle>Share incident</DialogTitle>
          <DialogDescription>
            Choose who you want to share the incident with.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-1.5">
            <InputLabel htmlFor="share-link" required>
              Copy the link directly
              <Tooltip content="Anyone with this link can view the incident." trigger="mouseenter">
                <button
                  type="button"
                  aria-label="About this link"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex rounded-full text-muted-foreground/70 outline-none transition-colors duration-fast ease-out hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Info aria-hidden className="size-3.5" />
                </button>
              </Tooltip>
            </InputLabel>
            <InputRoot>
              <InputField
                id="share-link"
                readOnly
                value="lspcad.flab/incident21414"
                className="text-muted-foreground"
              />
              <InputSuffixButton
                aria-label={copied ? "Link copied" : "Copy link"}
                onClick={copyLink}
              >
                <span className="relative flex size-4 items-center justify-center">
                  <Copy
                    aria-hidden
                    className={`absolute size-4 transition-[opacity,scale] duration-fast ease-out ${copied ? "scale-50 opacity-0" : "scale-100 opacity-100"}`}
                  />
                  <Check
                    aria-hidden
                    className={`absolute size-4 text-success transition-[opacity,scale] duration-fast ease-out ${copied ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
                  />
                </span>
              </InputSuffixButton>
            </InputRoot>
          </div>

          <div className="grid gap-1.5">
            <InputLabel htmlFor="share-email" required>
              Send the link via invitation
            </InputLabel>
            <div className="flex items-center gap-2">
              <InputRoot className="flex-1">
                <InputPrefix>
                  <EnvelopeSimple />
                </InputPrefix>
                <InputField
                  ref={emailRef}
                  id="share-email"
                  type="email"
                  placeholder="Enter your email address"
                />
              </InputRoot>
              <Button>Send invite</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ─── Announcement 1 (category: Announcements) ───────────────────────────────────

const ANNOUNCEMENT_SLIDES = [
  { id: "mobile", icon: DeviceMobile, caption: "Dashboard on mobile" },
  { id: "insights", icon: ChartLineUp, caption: "Real-time insights" },
  { id: "alerts", icon: BellSimple, caption: "Instant alerts" },
  { id: "fast", icon: Lightning, caption: "Faster everywhere" },
  { id: "more", icon: Sparkle, caption: "And much more" },
] as const

export function AnnouncementDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Announcement</Button>
      </DialogTrigger>
      <DialogContent size="md">
        <DialogIcon>
          <Megaphone />
        </DialogIcon>
        <DialogHeader>
          <DialogTitle>Mobile Version Now Available!</DialogTitle>
          <DialogDescription>
            Access your dashboard anytime, anywhere.
          </DialogDescription>
        </DialogHeader>

        {/* Working hero carousel — click a dot or use ←/→ while focused. */}
        <Carousel label="Product highlights">
          <CarouselContent>
            {ANNOUNCEMENT_SLIDES.map(({ id, icon: Icon, caption }) => (
              <CarouselSlide key={id}>
                <div className="flex aspect-[16/10] flex-col items-center justify-center gap-3 bg-gradient-to-br from-accent to-muted text-muted-foreground">
                  <Icon className="size-12" aria-hidden />
                  <span className="text-sm font-medium">{caption}</span>
                </div>
              </CarouselSlide>
            ))}
          </CarouselContent>
          <CarouselIndicators />
        </Carousel>

        <p className="text-pretty text-sm text-muted-foreground">
          Enjoy a seamless experience on the go with our mobile-friendly
          dashboard. Manage your data, track progress, and stay updated in
          real-time, all from your smartphone.
        </p>

        <DialogFooter bordered className="sm:items-center sm:justify-between">
          <span className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <Tooltip content="Email support@koala.app — we usually reply within a few hours." trigger="mouseenter">
              <button
                type="button"
                aria-label="How to contact support"
                onClick={(e) => e.preventDefault()}
                className="inline-flex rounded-full text-muted-foreground/70 outline-none transition-colors duration-fast ease-out hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Info aria-hidden className="size-4" />
              </button>
            </Tooltip>
            Need some help? Contact us
          </span>
          <div className="flex flex-col-reverse gap-2 sm:flex-row">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>Create</Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
