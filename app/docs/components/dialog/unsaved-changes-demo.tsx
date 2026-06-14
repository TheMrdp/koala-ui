"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { InputRoot, InputField, InputLabel, InputHint } from "@/components/ui/input"

// No DS Textarea yet, so this mirrors InputRoot's tokens (border-input, rounded-md, brand
// focus ring) so the multi-line field sits flush with the Input fields beside it.
const TEXTAREA_CLASS =
  "w-full resize-none rounded-md border border-input bg-[var(--surface,var(--background))] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-[border-color,box-shadow] duration-fast ease-out focus:border-brand focus:[box-shadow:0_0_0_3px_var(--ring-brand)]"

/** Shows how to intercept close attempts when the form has unsaved content. */
export function UnsavedChangesDemo() {
  const [open, setOpen] = React.useState(false)
  const [discardOpen, setDiscardOpen] = React.useState(false)
  const titleRef = React.useRef<HTMLInputElement>(null)
  const [title, setTitle] = React.useState("")
  const [body, setBody] = React.useState("")

  const isDirty = title.trim().length > 0 || body.trim().length > 0

  function attemptClose() {
    if (isDirty) {
      setDiscardOpen(true)
    } else {
      setOpen(false)
    }
  }

  function confirmDiscard() {
    setDiscardOpen(false)
    setOpen(false)
    setTitle("")
    setBody("")
  }

  function save() {
    setOpen(false)
    setTitle("")
    setBody("")
  }

  return (
    <>
      {/* Main dialog */}
      <Dialog open={open} onOpenChange={(next) => (next ? setOpen(true) : attemptClose())}>
        <DialogTrigger asChild>
          <Button variant="outline">New post</Button>
        </DialogTrigger>
        <DialogContent
          size="md"
          onOpenAutoFocus={(e) => {
            e.preventDefault()
            titleRef.current?.focus()
          }}
          onInteractOutside={(e) => {
            e.preventDefault()
            attemptClose()
          }}
          onEscapeKeyDown={(e) => {
            e.preventDefault()
            attemptClose()
          }}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              New post
              {isDirty && (
                <span className="size-1.5 rounded-full bg-primary inline-block" />
              )}
            </DialogTitle>
            <DialogDescription>
              Closing without saving will discard your changes.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <InputRoot>
              <InputField
                ref={titleRef}
                placeholder="Post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputRoot>
            <textarea
              className={TEXTAREA_CLASS}
              placeholder="Write something…"
              rows={5}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={attemptClose}>
              Cancel
            </Button>
            <Button onClick={save}>Publish</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Discard-changes confirmation */}
      <Dialog open={discardOpen} onOpenChange={setDiscardOpen}>
        <DialogContent
          size="sm"
          showClose={false}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Discard changes?</DialogTitle>
            <DialogDescription>
              You have unsaved content. Closing now will permanently lose your
              changes.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDiscardOpen(false)}>
              Keep editing
            </Button>
            <Button variant="destructive" onClick={confirmDiscard}>
              Discard changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

/** A realistic form layout: labelled inputs inside a dialog body. */
export function FormDialogDemo() {
  const [open, setOpen] = React.useState(false)
  const nameRef = React.useRef<HTMLInputElement>(null)
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [nameError, setNameError] = React.useState("")
  const [emailError, setEmailError] = React.useState("")

  function handleSubmit() {
    let valid = true

    if (!name.trim()) {
      setNameError("Name is required.")
      valid = false
    } else {
      setNameError("")
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    if (!email.trim()) {
      setEmailError("Email is required.")
      valid = false
    } else if (!emailOk) {
      setEmailError("Enter a valid email address.")
      valid = false
    } else {
      setEmailError("")
    }

    if (valid) {
      setOpen(false)
      setName("")
      setEmail("")
    }
  }

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      setName("")
      setEmail("")
      setNameError("")
      setEmailError("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Invite member</Button>
      </DialogTrigger>
      <DialogContent
        size="sm"
        onOpenAutoFocus={(e) => {
          // Land focus on the first field instead of the dialog container.
          e.preventDefault()
          nameRef.current?.focus()
        }}
      >
        <DialogHeader>
          <DialogTitle>Invite team member</DialogTitle>
          <DialogDescription>
            Enter the details below. An invitation will be sent by email.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-1.5">
            <InputLabel htmlFor="invite-name">Full name</InputLabel>
            <InputRoot hasError={!!nameError}>
              <InputField
                ref={nameRef}
                id="invite-name"
                placeholder="Alex Johnson"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (nameError) setNameError("")
                }}
              />
            </InputRoot>
            {nameError && <InputHint hasError>{nameError}</InputHint>}
          </div>

          <div className="grid gap-1.5">
            <InputLabel htmlFor="invite-email">Email address</InputLabel>
            <InputRoot hasError={!!emailError}>
              <InputField
                id="invite-email"
                type="email"
                placeholder="alex@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (emailError) setEmailError("")
                }}
              />
            </InputRoot>
            {emailError && <InputHint hasError>{emailError}</InputHint>}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => handleOpenChange(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Send invite</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
