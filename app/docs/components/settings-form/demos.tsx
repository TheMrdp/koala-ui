"use client"

import { SettingsForm } from "@/components/ui/settings-form"

/** Profile editing block with avatar, name row, prefixed username, bio, and a save footer. */
export function SettingsFormDemo() {
  return (
    <SettingsForm
      defaultValues={{
        firstName: "Jane",
        lastName: "Cooper",
        username: "janecooper",
        email: "jane@company.com",
        bio: "Design engineer building delightful interfaces.",
      }}
    />
  )
}
