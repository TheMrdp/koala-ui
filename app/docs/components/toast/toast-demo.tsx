"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

export function ToastDemo() {
  return (
    <Button onClick={() => toast("Your changes have been saved.")}>
      Show toast
    </Button>
  )
}

export function ToastVariantsDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast("Changes saved successfully.")}>
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.success("File uploaded.", { description: "profile-photo.png is ready." })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.warning("Storage almost full.", {
            description: "You have 200 MB remaining.",
          })
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.error("Upload failed.", {
            description: "The server returned a 413 error.",
          })
        }
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.info("New version available.", {
            description: "Refresh the page to get v2.4.0.",
          })
        }
      >
        Info
      </Button>
    </div>
  )
}

export function ToastWithActionDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast({
          title: "Email sent.",
          description: "Your message was delivered to alex@example.com.",
          action: {
            label: "Undo",
            onClick: () => toast("Send undone."),
          },
        })
      }
    >
      Send email
    </Button>
  )
}

export function ToastStackDemo() {
  let count = 0
  return (
    <Button
      variant="outline"
      onClick={() => {
        const messages = [
          { title: "Build passed", variant: "success" as const },
          { title: "Deploy queued", description: "Estimated time: 2 min." },
          { title: "Preview ready", description: "Branch: feature/dashboard", variant: "info" as const },
          { title: "Tests running…", description: "12 / 48 passed" },
        ]
        const item = messages[count % messages.length]
        count++
        toast(item)
      }}
    >
      Fire toast (hover to expand stack)
    </Button>
  )
}

export function ToastPersistDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast({
          title: "Syncing in background.",
          description: "This won't dismiss automatically.",
          duration: Infinity,
        })
      }
    >
      Persistent toast
    </Button>
  )
}
