"use client"

import * as React from "react"
import {
  Star,
  ShieldCheck,
  Info,
  Palette,
  Sun,
  Moon,
  Desktop,
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
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {
  TextareaRoot,
  TextareaField,
  TextareaLabel,
} from "@/components/ui/textarea"
import { OTPInput } from "@/components/ui/otp-input"
import { QRCode } from "@/components/ui/qr-code"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

/**
 * Further dialog patterns translated from Figma (Koala UI 12.0 · Dialog frame). Like the Share
 * and Announcement pilots, each one is a *composition* over the single `dialogVariants` recipe,
 * not a new variant: a leading `DialogIcon`, real Koala controls dropped into the body (never
 * hand-rolled), and the `bordered` footer for the split helper/action row. The Figma brand-orange
 * CTA maps to the DS `primary` button, and icons render outline (Phosphor's default weight) per
 * the house style.
 */

// A small "Need some help?" helper for the bordered footer's left side, plus the tiny info
// button used beside required labels. Shared by all three dialogs below so the idiom stays one.
function FooterHelp() {
  return (
    <span className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
      <Tooltip content="Email support@koala.app, we usually reply within a few hours." trigger="mouseenter">
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
  )
}

function LabelInfo({ content }: { content: string }) {
  return (
    <Tooltip content={content} trigger="mouseenter">
      <button
        type="button"
        aria-label="More information"
        onClick={(e) => e.preventDefault()}
        className="inline-flex rounded-full text-muted-foreground/70 outline-none transition-colors duration-fast ease-out hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Info aria-hidden className="size-3.5" />
      </button>
    </Tooltip>
  )
}

// === Feedback (category: Feedback / Rating Text) ===

export function FeedbackDialog() {
  const [rating, setRating] = React.useState("")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Feedback</Button>
      </DialogTrigger>
      <DialogContent size="sm">
        <DialogIcon>
          <Star />
        </DialogIcon>
        <DialogHeader>
          <DialogTitle>Help us improve!</DialogTitle>
          <DialogDescription>
            Share your experience with us so we can make it better.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label id="rating-label" required>
              Rate your experience
              <LabelInfo content="1 is poor, 5 is excellent." />
            </Label>
            {/* Single-select rating; the pills stretch to fill the row evenly. */}
            <ToggleGroup
              type="single"
              size="sm"
              value={rating}
              onValueChange={setRating}
              aria-labelledby="rating-label"
              className="w-full"
            >
              {["1", "2", "3", "4", "5"].map((n) => (
                <ToggleGroupItem key={n} value={n} aria-label={`${n} out of 5`} className="flex-1">
                  {n}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <div className="grid gap-2">
            <TextareaLabel htmlFor="feedback-message">Your message</TextareaLabel>
            <TextareaRoot>
              <TextareaField
                id="feedback-message"
                placeholder="Write your message here..."
                rows={4}
                maxLength={500}
                showCount
              />
            </TextareaRoot>
          </div>
        </div>

        <DialogFooter bordered className="sm:items-center sm:justify-between">
          <FooterHelp />
          <div className="flex flex-col-reverse gap-2 sm:flex-row">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button disabled={!rating}>Submit</Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// === Two-factor (category: 2FA) ===

export function TwoFactorDialog() {
  const [code, setCode] = React.useState("")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Enable 2FA</Button>
      </DialogTrigger>
      <DialogContent
        size="sm"
        // The QR is informational; land focus straight on the code entry instead of the container.
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogIcon>
          <ShieldCheck />
        </DialogIcon>
        <DialogHeader>
          <DialogTitle>Enable two-factor authentication</DialogTitle>
          <DialogDescription>
            Scan the QR code with your authentication app, then enter the 6-digit
            code to verify and activate 2FA.
          </DialogDescription>
        </DialogHeader>

        {/* Concentric radius: rounded-lg panel nested inside the rounded-xl content; the QR
            takes a tighter rounded-md one step further in. */}
        <div className="flex items-center justify-center rounded-lg border border-border bg-accent p-6">
          <QRCode
            value="otpauth://totp/Koala:esteban?secret=JBSWY3DPEHPK3PXP&issuer=Koala"
            level="Q"
            size={176}
            margin={2}
            title="Two-factor authentication QR code"
            className="rounded-md p-3 shadow-xs"
          />
        </div>

        <OTPInput
          label="Introduce code"
          required
          length={6}
          autoFocus
          value={code}
          onChange={setCode}
        />

        <DialogFooter bordered className="sm:items-center sm:justify-between">
          <FooterHelp />
          <div className="flex flex-col-reverse gap-2 sm:flex-row">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button disabled={code.length < 6}>Verify</Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// === Selectable cards (category: Theme) ===

const THEMES = [
  { value: "light", title: "Light theme", hint: "For a clean and minimal look.", icon: Sun },
  { value: "dark", title: "Dark theme", hint: "Perfect for working in low-light conditions.", icon: Moon },
  { value: "system", title: "System", hint: "Automatically adapts to your device's settings.", icon: Desktop },
] as const

export function SelectableCardsDialog() {
  const [theme, setTheme] = React.useState("light")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Change theme</Button>
      </DialogTrigger>
      <DialogContent size="sm">
        <DialogIcon>
          <Palette />
        </DialogIcon>
        <DialogHeader>
          <DialogTitle>Change theme</DialogTitle>
          <DialogDescription>
            Choose your preferred theme to customize your experience.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          <Label id="theme-label" required>
            Choose your theme
            <LabelInfo content="You can change this anytime from settings." />
          </Label>
          <RadioGroup
            value={theme}
            onValueChange={setTheme}
            aria-labelledby="theme-label"
          >
            {THEMES.map(({ value, title, hint, icon: Icon }) => (
              <label
                key={value}
                htmlFor={`theme-${value}`}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3.5 transition-colors duration-fast ease-out has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-accent has-[[data-state=checked]]:[&_[data-slot=theme-card-icon]]:text-primary"
              >
                <Icon
                  data-slot="theme-card-icon"
                  aria-hidden
                  className="size-5 shrink-0 text-muted-foreground transition-colors duration-fast ease-out"
                />
                <span className="flex flex-1 flex-col gap-0.5">
                  <span className="text-sm font-medium leading-none">{title}</span>
                  <span className="text-sm text-muted-foreground">{hint}</span>
                </span>
                <RadioGroupItem id={`theme-${value}`} value={value} />
              </label>
            ))}
          </RadioGroup>
        </div>

        <DialogFooter bordered className="sm:items-center sm:justify-between">
          <FooterHelp />
          <div className="flex flex-col-reverse gap-2 sm:flex-row">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>Apply</Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
