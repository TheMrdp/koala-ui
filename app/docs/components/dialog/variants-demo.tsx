"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { ShareIncidentDialog, AnnouncementDialog } from "./share-announcement-demo"

/**
 * A gallery of the dialog patterns the library ships today. Each trigger opens a
 * representative dialog so the differences (close button, density, body, footer
 * actions) can be compared side by side. These are composition patterns over the
 * single `dialogVariants` recipe — `size`, `density` and `showClose` plus the
 * footer action pairing — not separate recipes.
 */
export function DialogVariantsShowcase() {
  return (
    <div className="flex flex-wrap gap-3">
      {/* Default — neutral edit dialog, ghost + primary footer. */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Default</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation — destructive, no close button forces an explicit choice. */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Confirmation</Button>
        </DialogTrigger>
        <DialogContent size="sm" showClose={false}>
          <DialogHeader>
            <DialogTitle>Delete account?</DialogTitle>
            <DialogDescription>
              This permanently deletes your account and all data. This cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="destructive">Delete</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Compact — tighter padding/title for application UI. */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Compact</Button>
        </DialogTrigger>
        <DialogContent density="compact" size="sm">
          <DialogHeader>
            <DialogTitle>Compact dialog</DialogTitle>
            <DialogDescription>
              Tighter padding and a 1rem title for dense application UI.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Got it</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Scrollable — pinned header/footer, body scrolls. */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Scrollable</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Terms of service</DialogTitle>
            <DialogDescription>
              Please read the full terms before accepting.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-72 overflow-y-auto rounded-lg border border-border p-4 text-sm text-muted-foreground [scrollbar-width:thin]">
            <p className="mb-3">
              By using this service, you agree to be bound by these Terms of
              Service. Please read them carefully before proceeding.
            </p>
            <p className="mb-3">
              <strong className="text-foreground">1. Acceptance.</strong> Your
              access to and use of the service is conditioned on your acceptance
              of and compliance with these Terms.
            </p>
            <p className="mb-3">
              <strong className="text-foreground">2. Accounts.</strong> When you
              create an account you must provide accurate, complete and current
              information at all times.
            </p>
            <p>
              <strong className="text-foreground">3. Termination.</strong> We may
              terminate or suspend access to the Service immediately, without
              prior notice, if you breach the Terms.
            </p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Decline</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>Accept</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share — leading icon header + composed inputs (from Figma). */}
      <ShareIncidentDialog />

      {/* Announcement — leading icon, hero, bordered split footer (from Figma). */}
      <AnnouncementDialog />
    </div>
  )
}
