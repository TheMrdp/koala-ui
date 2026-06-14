"use client"

import * as React from "react"

import {
  Alert,
  AlertIcon,
  AlertContent,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

const ALERTS = [
  { id: "success", variant: "success", title: "Deployment successful", description: "Your application is live on production." },
  { id: "info", variant: "info", title: "New update available", description: "Version 2.4.0 introduces improved performance." },
  { id: "warning", variant: "warning", title: "Storage almost full", description: "You have used 90% of your allocated storage." },
  { id: "destructive", variant: "destructive", title: "Payment failed", description: "Your card was declined. Please update your details." },
] as const

/** Interactive demo for the dismissible alert. */
export function DismissibleDemo() {
  const [dismissed, setDismissed] = React.useState<string[]>([])
  const visible = ALERTS.filter((a) => !dismissed.includes(a.id))

  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      {visible.map((alert) => (
        <Alert
          key={alert.id}
          variant={alert.variant}
          onDismiss={() => setDismissed((d) => [...d, alert.id])}
        >
          <AlertIcon />
          <AlertContent>
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription>{alert.description}</AlertDescription>
          </AlertContent>
        </Alert>
      ))}
      {dismissed.length > 0 && (
        <Button
          size="sm"
          variant="outline"
          className="self-center"
          onClick={() => setDismissed([])}
        >
          Reset
        </Button>
      )}
    </div>
  )
}
