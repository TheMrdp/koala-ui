"use client"

import * as React from "react"
import {
  X,
  LinkSimple,
  EnvelopeSimple,
  Copy,
  Megaphone,
  DeviceMobile,
  Info,
} from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { dialogVariants } from "@/components/ui/dialog"
import {
  InputRoot,
  InputField,
  InputPrefix,
  InputSuffixButton,
  InputLabel,
} from "@/components/ui/input"

/**
 * Inert, non-portal gallery of every dialog pattern the library ships, painted inline so all
 * variants are visible at once without opening anything (matching the Sizes showcase). We
 * render the real `dialogVariants` slots directly: no Radix Root/Portal, so title/description
 * use plain h2/p (the Radix parts need a Dialog context). The `inert` attribute keeps the
 * painted controls out of the focus order and the a11y tree. The hero ComponentPreview at the
 * top of the page stays a fully interactive, openable dialog.
 */

/** The top-right close glyph, sized per density via the real `close` slot. */
function CloseGlyph({ density = "comfortable" }: { density?: "comfortable" | "compact" }) {
  const slots = dialogVariants({ density })
  return (
    <span className={slots.close()}>
      <X />
    </span>
  )
}

/** A labelled, inert painted panel: caption on top, real dialog slots below. */
function Painted({
  label,
  note,
  children,
}: {
  label: string
  note: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <code className="font-mono text-sm font-medium text-foreground">{label}</code>
        <span className="text-xs text-muted-foreground">{note}</span>
      </div>
      {/* `inert`: the panel is a static preview, never focusable or in the a11y tree. */}
      <div inert>{children}</div>
    </div>
  )
}

export function DialogVariantsShowcase() {
  const dDefault = dialogVariants()
  const dConfirm = dialogVariants({ size: "sm" })
  const dCompact = dialogVariants({ size: "sm", density: "compact" })
  const dScroll = dialogVariants()
  const dShare = dialogVariants()
  const dAnnounce = dialogVariants({ bordered: true })

  return (
    <div className="flex w-full flex-col gap-8">
      {/* Default: neutral edit dialog, ghost + primary footer, with close button. */}
      <Painted label="Default" note="md · ghost + primary footer">
        <div className={dDefault.content({ className: "mx-auto" })}>
          <div className={dDefault.header()}>
            <h2 className={dDefault.title()}>Edit profile</h2>
            <p className={dDefault.description()}>
              Make changes to your profile here. Click save when you&apos;re done.
            </p>
          </div>
          <div className={dDefault.footer()}>
            <Button variant="ghost">Cancel</Button>
            <Button>Save changes</Button>
          </div>
          <CloseGlyph />
        </div>
      </Painted>

      {/* Confirmation: destructive, showClose={false} forces an explicit choice (no X). */}
      <Painted label="Confirmation" note='size="sm" · showClose={false}'>
        <div className={dConfirm.content({ className: "mx-auto" })}>
          <div className={dConfirm.header()}>
            <h2 className={dConfirm.title()}>Delete account?</h2>
            <p className={dConfirm.description()}>
              This permanently deletes your account and all data. This cannot be undone.
            </p>
          </div>
          <div className={dConfirm.footer()}>
            <Button variant="ghost">Cancel</Button>
            <Button variant="destructive">Delete</Button>
          </div>
        </div>
      </Painted>

      {/* Compact: tighter padding/title for application UI. */}
      <Painted label="Compact" note='density="compact" · size="sm"'>
        <div className={dCompact.content({ className: "mx-auto" })}>
          <div className={dCompact.header()}>
            <h2 className={dCompact.title()}>Compact dialog</h2>
            <p className={dCompact.description()}>
              Tighter padding and a 1rem title for dense application UI.
            </p>
          </div>
          <div className={dCompact.footer()}>
            <Button>Got it</Button>
          </div>
          <CloseGlyph density="compact" />
        </div>
      </Painted>

      {/* Scrollable: pinned header/footer, the body scrolls. */}
      <Painted label="Scrollable" note="pinned header/footer, body scrolls">
        <div className={dScroll.content({ className: "mx-auto" })}>
          <div className={dScroll.header()}>
            <h2 className={dScroll.title()}>Terms of service</h2>
            <p className={dScroll.description()}>Please read the full terms before accepting.</p>
          </div>
          <div className="max-h-48 overflow-y-auto rounded-lg border border-border p-4 text-sm text-muted-foreground [scrollbar-width:thin]">
            <p className="mb-3">
              By using this service, you agree to be bound by these Terms of Service. Please read
              them carefully before proceeding.
            </p>
            <p className="mb-3">
              <strong className="text-foreground">1. Acceptance.</strong> Your access to and use of
              the service is conditioned on your acceptance of and compliance with these Terms.
            </p>
            <p>
              <strong className="text-foreground">2. Accounts.</strong> When you create an account
              you must provide accurate, complete and current information at all times.
            </p>
          </div>
          <div className={dScroll.footer()}>
            <Button variant="ghost">Decline</Button>
            <Button>Accept</Button>
          </div>
          <CloseGlyph />
        </div>
      </Painted>

      {/* Share: leading DialogIcon + composed Koala Input parts. */}
      <Painted label="Share" note="DialogIcon + composed Input parts">
        <div className={dShare.content({ className: "mx-auto" })}>
          <div className={dShare.icon()}>
            <LinkSimple />
          </div>
          <div className={dShare.header()}>
            <h2 className={dShare.title()}>Share incident</h2>
            <p className={dShare.description()}>Choose who you want to share the incident with.</p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <InputLabel htmlFor="demo-share-link" required>
                Copy the link directly
              </InputLabel>
              <InputRoot>
                <InputField
                  id="demo-share-link"
                  readOnly
                  value="lspcad.flab/incident21414"
                  className="text-muted-foreground"
                />
                <InputSuffixButton aria-label="Copy link">
                  <Copy className="size-4" />
                </InputSuffixButton>
              </InputRoot>
            </div>
            <div className="grid gap-1.5">
              <InputLabel htmlFor="demo-share-email" required>
                Send the link via invitation
              </InputLabel>
              <div className="flex items-center gap-2">
                <InputRoot className="flex-1">
                  <InputPrefix>
                    <EnvelopeSimple />
                  </InputPrefix>
                  <InputField
                    id="demo-share-email"
                    type="email"
                    placeholder="Enter your email address"
                  />
                </InputRoot>
                <Button>Send invite</Button>
              </div>
            </div>
          </div>
          <CloseGlyph />
        </div>
      </Painted>

      {/* Announcement: leading DialogIcon, hero, bordered split footer (helper + actions). */}
      <Painted label="Announcement" note="DialogIcon + bordered split footer">
        <div className={dAnnounce.content({ className: "mx-auto" })}>
          <div className={dAnnounce.icon()}>
            <Megaphone />
          </div>
          <div className={dAnnounce.header()}>
            <h2 className={dAnnounce.title()}>Mobile Version Now Available!</h2>
            <p className={dAnnounce.description()}>Access your dashboard anytime, anywhere.</p>
          </div>
          <div className="flex aspect-[16/10] flex-col items-center justify-center gap-3 rounded-lg bg-gradient-to-br from-accent to-muted text-muted-foreground">
            <DeviceMobile className="size-12" />
            <span className="text-sm font-medium">Dashboard on mobile</span>
          </div>
          <p className="text-pretty text-sm text-muted-foreground">
            Enjoy a seamless experience on the go with our mobile-friendly dashboard. Manage your
            data, track progress, and stay updated in real-time, all from your smartphone.
          </p>
          <div className={dAnnounce.footer({ className: "sm:items-center sm:justify-between" })}>
            <span className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
              <Info className="size-4 text-muted-foreground/70" />
              Need some help? Contact us
            </span>
            <div className="flex flex-col-reverse gap-2 sm:flex-row">
              <Button variant="outline">Cancel</Button>
              <Button>Create</Button>
            </div>
          </div>
          <CloseGlyph />
        </div>
      </Painted>
    </div>
  )
}
