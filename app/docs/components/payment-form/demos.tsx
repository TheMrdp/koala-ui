"use client"

import { PaymentForm } from "@/components/ui/payment-form"

/** Card checkout with an order total, brand-aware masking, and a billing country. */
export function PaymentFormDemo() {
  return <PaymentForm amount="$49.00" />
}
