"use client"

import * as React from "react"
import { CheckCircle, CreditCard, Lock } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldRow } from "@/components/ui/field"
import {
  InputRoot,
  InputField,
  InputPrefix,
  InputSuffix,
  CountrySelect,
} from "@/components/ui/input"
import { useDensity, type Density } from "@/lib/density"
import { tv } from "@/lib/tv"

/**
 * PaymentForm: a complete card-checkout block: an order total, a brand-aware card number field,
 * expiry + CVC, cardholder name, and a searchable billing-country picker (CountrySelect). The card
 * number, expiry, and CVC are masked as you type; the brand is detected live and shown in the
 * field. It owns its own state and submit flow. Wire `onSubmit` to your payment provider (Stripe
 * et al.). See docs/ARCHITECTURE.md §2.
 *
 * The card root declares `--surface: var(--card)` so nested controls blend with the panel (the
 * --surface contract). Never render a real card number unmasked. This is presentation only.
 */
export const paymentFormVariants = tv({
  slots: {
    root: "flex w-full max-w-md flex-col rounded-2xl border border-border bg-card text-card-foreground shadow-xs [--surface:var(--card)]",
    header: "flex flex-col gap-1.5",
    title: "font-semibold tracking-tight text-foreground text-balance",
    description: "text-sm text-pretty text-muted-foreground",
    // Order total row: a quiet inset panel so the amount reads as a summary, not a field.
    summary: "flex items-center justify-between rounded-xl bg-muted px-4 py-3",
    summaryLabel: "text-sm text-muted-foreground",
    summaryAmount: "text-xl font-semibold tabular-nums text-foreground",
    form: "flex flex-col gap-4",
    brand: "select-none text-xs font-medium uppercase tracking-wide text-muted-foreground",
    secure: "flex items-center justify-center gap-1.5 text-xs text-muted-foreground",
    success: "flex flex-col items-center gap-3 text-center animate-in fade-in-0 zoom-in-95 duration-base ease-out",
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

// ─── Masking + brand detection ────────────────────────────────────────────────

/** Group a raw card number into 4-digit blocks (max 19 digits). */
function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 19)
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim()
}

/** Insert the `MM/YY` slash and clamp to 4 digits. */
function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

/** Best-effort brand from the leading digits: purely cosmetic. */
function detectBrand(value: string): string | null {
  const d = value.replace(/\D/g, "")
  if (/^4/.test(d)) return "Visa"
  if (/^(5[1-5]|2[2-7])/.test(d)) return "Mastercard"
  if (/^3[47]/.test(d)) return "Amex"
  if (/^(6011|65|64[4-9])/.test(d)) return "Discover"
  return null
}

// ─── PaymentForm ──────────────────────────────────────────────────────────────

export interface PaymentFormData {
  cardNumber: string
  expiry: string
  cvc: string
  name: string
  country: string
}

export interface PaymentFormProps extends Omit<React.ComponentProps<"div">, "onSubmit" | "title"> {
  /** Heading above the form. */
  title?: React.ReactNode
  /** Supporting line under the heading. */
  description?: React.ReactNode
  /** Order total, formatted for display (e.g. `"$49.00"`). Shows a summary row when set. */
  amount?: string
  /** Default billing country (ISO2). */
  defaultCountry?: string
  /** Spacing axis: `compact` (16px, default) or `comfortable` (24px). Falls back to the nearest DensityProvider. */
  density?: Density
  /** Called with the (masked) form data on submit. Return a promise to drive the spinner. */
  onSubmit?: (data: PaymentFormData) => void | Promise<void>
}

export function PaymentForm({
  title = "Payment details",
  description = "Enter your card to complete the purchase. Your details are encrypted end to end.",
  amount,
  defaultCountry = "US",
  density,
  onSubmit,
  className,
  ...props
}: PaymentFormProps) {
  const slots = paymentFormVariants({ density: useDensity(density) })
  const [data, setData] = React.useState<PaymentFormData>({
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: "",
    country: defaultCountry,
  })
  const [status, setStatus] = React.useState<"idle" | "loading" | "success">("idle")
  const brand = detectBrand(data.cardNumber)

  function update<K extends keyof PaymentFormData>(key: K, value: PaymentFormData[K]) {
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
          <CheckCircle weight="fill" className="size-12 text-success" />
          <p className={slots.successTitle()}>Payment successful</p>
          <p className={slots.successText()}>
            {amount ? `We charged ${amount}. ` : ""}A receipt is on its way to your inbox.
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

      {amount != null && (
        <div className={slots.summary()}>
          <span className={slots.summaryLabel()}>Total due</span>
          <span className={slots.summaryAmount()}>{amount}</span>
        </div>
      )}

      <form className={slots.form()} onSubmit={handleSubmit}>
        <Field>
          <FieldLabel required>Card number</FieldLabel>
          <InputRoot>
            <InputPrefix>
              <CreditCard />
            </InputPrefix>
            <InputField
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 1234 1234 1234"
              required
              className="tabular-nums"
              value={data.cardNumber}
              onChange={(event) => update("cardNumber", formatCardNumber(event.target.value))}
            />
            {brand && (
              <InputSuffix>
                <span className={slots.brand()}>{brand}</span>
              </InputSuffix>
            )}
          </InputRoot>
        </Field>

        <FieldRow>
          <Field>
            <FieldLabel required>Expiry</FieldLabel>
            <InputRoot>
              <InputField
                inputMode="numeric"
                autoComplete="cc-exp"
                placeholder="MM/YY"
                required
                className="tabular-nums"
                value={data.expiry}
                onChange={(event) => update("expiry", formatExpiry(event.target.value))}
              />
            </InputRoot>
          </Field>
          <Field>
            <FieldLabel required>CVC</FieldLabel>
            <InputRoot>
              <InputField
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="123"
                required
                maxLength={4}
                className="tabular-nums"
                value={data.cvc}
                onChange={(event) => update("cvc", event.target.value.replace(/\D/g, "").slice(0, 4))}
              />
            </InputRoot>
          </Field>
        </FieldRow>

        <Field>
          <FieldLabel required>Cardholder name</FieldLabel>
          <InputRoot>
            <InputField
              autoComplete="cc-name"
              placeholder="Jane Cooper"
              required
              value={data.name}
              onChange={(event) => update("name", event.target.value)}
            />
          </InputRoot>
        </Field>

        <Field>
          <FieldLabel required>Billing country</FieldLabel>
          <CountrySelect
            value={data.country}
            onValueChange={(value) => update("country", value)}
          />
        </Field>

        <Button type="submit" size="lg" loading={status === "loading"} className="mt-1 w-full">
          {amount ? `Pay ${amount}` : "Pay now"}
        </Button>

        <p className={slots.secure()}>
          <Lock weight="fill" className="size-3.5" />
          Payments are secure and encrypted
        </p>
      </form>
    </div>
  )
}
