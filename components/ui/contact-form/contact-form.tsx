"use client"

import * as React from "react"
import {
  ArrowUp,
  ChatCircleDots,
  CheckCircle,
  Handshake,
  Lifebuoy,
  Star,
  Tag,
} from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldHint, FieldRow } from "@/components/ui/field"
import { InputRoot, InputField } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  TextareaRoot,
  TextareaField,
  TextareaFooter,
  TextareaCount,
} from "@/components/ui/textarea"
import { useDensity, type Density } from "@/lib/density"
import { tv } from "@/lib/tv"

/**
 * ContactForm: a complete "get in touch" block: name + email row, a categorized subject Select,
 * and a message Textarea with a live character count, all wired through Field for automatic
 * label/aria/error association. Self-contained: it owns its field state and submit flow, so it
 * works on drop-in. Wire `onSubmit` to your endpoint. See docs/ARCHITECTURE.md §2.
 *
 * The card root declares `--surface: var(--card)` so nested Inputs/Select/Textarea blend with the
 * panel (the --surface contract).
 */
export const contactFormVariants = tv({
  slots: {
    root: "flex w-full max-w-lg flex-col rounded-2xl border border-border bg-card text-card-foreground shadow-xs [--surface:var(--card)]",
    header: "flex flex-col gap-1.5",
    title: "font-semibold tracking-tight text-foreground text-balance",
    description: "text-sm text-pretty text-muted-foreground",
    form: "flex flex-col gap-4",
    success: "flex flex-col items-center gap-3 text-center animate-in fade-in-0 zoom-in-95 duration-base ease-out",
    successIcon: "text-success",
    successTitle: "text-base font-semibold text-foreground",
    successText: "text-sm text-pretty text-muted-foreground",
  },
  // Density is Koala's cross-cutting spacing axis (see lib/density.tsx): card padding, outer gap,
  // title size, success padding. `compact` is the Koala default (16px); `comfortable` is 24px.
  variants: {
    density: {
      compact: { root: "gap-4 p-4", title: "text-base", success: "py-4" },
      comfortable: { root: "gap-6 p-6", title: "text-lg", success: "py-6" },
    },
  },
  defaultVariants: {
    density: "compact",
  },
})

const SUBJECTS = [
  { value: "general", label: "General inquiry", icon: ChatCircleDots },
  { value: "sales", label: "Sales", icon: Tag },
  { value: "support", label: "Support", icon: Lifebuoy },
  { value: "partnership", label: "Partnership", icon: Handshake },
  { value: "feedback", label: "Feedback", icon: Star },
] as const

const MESSAGE_MAX = 500

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactFormProps extends Omit<React.ComponentProps<"div">, "onSubmit" | "title"> {
  /** Heading above the form. */
  title?: React.ReactNode
  /** Supporting line under the heading. */
  description?: React.ReactNode
  /** Submit button label. */
  action?: React.ReactNode
  /** Spacing axis: `compact` (16px, default) or `comfortable` (24px). Falls back to the nearest DensityProvider. */
  density?: Density
  /** Called with the form data on a valid submit. Return a promise to drive the spinner. */
  onSubmit?: (data: ContactFormData) => void | Promise<void>
}

export function ContactForm({
  title = "Get in touch",
  description = "Have a question or want to work together? Send us a message and we'll reply within one business day.",
  action = "Send message",
  density,
  onSubmit,
  className,
  ...props
}: ContactFormProps) {
  const slots = contactFormVariants({ density: useDensity(density) })
  const [data, setData] = React.useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = React.useState<"idle" | "loading" | "success">("idle")

  function update<K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setStatus("loading")
    await Promise.resolve(onSubmit?.(data))
    setStatus("success")
  }

  if (status === "success") {
    return (
      <div className={slots.root({ className })} {...props}>
        <div className={slots.success()} role="status">
          <CheckCircle weight="fill" className={`size-12 ${slots.successIcon()}`} />
          <p className={slots.successTitle()}>Message sent</p>
          <p className={slots.successText()}>
            Thanks for reaching out, {data.name || "there"}. We&apos;ll get back to you shortly.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={slots.root({ className })} {...props}>
      <div className={slots.header()}>
        <h3 className={slots.title()}>{title}</h3>
        {description != null && <p className={slots.description()}>{description}</p>}
      </div>

      <form className={slots.form()} onSubmit={handleSubmit}>
        <FieldRow>
          <Field>
            <FieldLabel required>Name</FieldLabel>
            <InputRoot>
              <InputField
                autoComplete="name"
                placeholder="Jane Cooper"
                required
                value={data.name}
                onChange={(event) => update("name", event.target.value)}
              />
            </InputRoot>
          </Field>
          <Field>
            <FieldLabel required>Email</FieldLabel>
            <InputRoot>
              <InputField
                type="email"
                autoComplete="email"
                placeholder="jane@company.com"
                required
                value={data.email}
                onChange={(event) => update("email", event.target.value)}
              />
            </InputRoot>
          </Field>
        </FieldRow>

        <Field>
          <FieldLabel>Subject</FieldLabel>
          <Select value={data.subject} onValueChange={(value) => update("subject", value)}>
            <SelectTrigger>
              <SelectValue placeholder="What's this about?" />
            </SelectTrigger>
            <SelectContent>
              {SUBJECTS.map(({ value, label, icon: Icon }) => (
                <SelectItem key={value} value={value}>
                  {/* Icon + label both land inside SelectItem's ItemText, so wrap them in an
                      inline-flex span so they sit on one row (the native Select country/icon
                      pattern), instead of stacking. Also feeds the spaced trigger value. */}
                  <span className="flex items-center gap-2">
                    <Icon />
                    {label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel required>Message</FieldLabel>
          <TextareaRoot resize="none">
            <TextareaField
              autoResize
              placeholder="Tell us how we can help…"
              required
              maxLength={MESSAGE_MAX}
              value={data.message}
              onChange={(event) => update("message", event.target.value)}
            />
            <TextareaFooter>
              <FieldHint className="text-muted-foreground/70">We&apos;ll only use this to reply.</FieldHint>
              <TextareaCount current={data.message.length} max={MESSAGE_MAX} />
            </TextareaFooter>
          </TextareaRoot>
        </Field>

        <Button type="submit" size="lg" loading={status === "loading"} className="self-start">
          <ArrowUp />
          {action}
        </Button>
      </form>
    </div>
  )
}
