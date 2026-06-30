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
import { Field, FieldLabel, FieldHint, FieldRow } from "@/components/ui/field"
import { InputRoot, InputField, PasswordInput } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import ES from "country-flag-icons/react/3x2/ES"
import FR from "country-flag-icons/react/3x2/FR"
import DE from "country-flag-icons/react/3x2/DE"
import GB from "country-flag-icons/react/3x2/GB"
import { CircleFlag } from "@/components/docs/circle-flag"

/**
 * A registration form inside a Dialog, composed with Field. Demonstrates two things:
 * the Field auto-wiring (id / htmlFor / aria-describedby) works through Radix's Portal
 * (React context flows by component tree, not DOM tree), and `<Field hasError>` cascades to
 * the control + hint with nothing wired by hand.
 */
export function FieldDialogDemo() {
  const [open, setOpen] = React.useState(false)
  const firstRef = React.useRef<HTMLInputElement>(null)
  const [email, setEmail] = React.useState("")
  const [emailError, setEmailError] = React.useState("")

  function handleSubmit() {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    if (!ok) {
      setEmailError(
        email.trim() ? "Enter a valid email address." : "Email is required.",
      )
      return
    }
    setEmailError("")
    handleOpenChange(false)
  }

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      setEmail("")
      setEmailError("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Create account</Button>
      </DialogTrigger>
      <DialogContent
        size="md"
        onOpenAutoFocus={(e) => {
          // Land focus on the first field rather than the dialog container.
          e.preventDefault()
          firstRef.current?.focus()
        }}
      >
        <DialogHeader>
          <DialogTitle>Create your account</DialogTitle>
          <DialogDescription>
            It takes less than a minute. Fields marked with an asterisk are
            required.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          <FieldRow>
            <Field required>
              <FieldLabel>First name</FieldLabel>
              <InputRoot>
                <InputField ref={firstRef} placeholder="Ada" />
              </InputRoot>
            </Field>
            <Field required>
              <FieldLabel>Last name</FieldLabel>
              <InputRoot>
                <InputField placeholder="Lovelace" />
              </InputRoot>
            </Field>
          </FieldRow>

          <Field required hasError={!!emailError}>
            <FieldLabel>Email</FieldLabel>
            <InputRoot>
              <InputField
                type="email"
                placeholder="ada@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (emailError) setEmailError("")
                }}
              />
            </InputRoot>
            {emailError ? (
              <FieldHint>{emailError}</FieldHint>
            ) : (
              <FieldHint>We&apos;ll send a confirmation link here.</FieldHint>
            )}
          </Field>

          <Field required>
            <FieldLabel>Country</FieldLabel>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">
                  <span className="flex items-center gap-2">
                    <CircleFlag flag={FR} />
                    France
                  </span>
                </SelectItem>
                <SelectItem value="de">
                  <span className="flex items-center gap-2">
                    <CircleFlag flag={DE} />
                    Germany
                  </span>
                </SelectItem>
                <SelectItem value="es">
                  <span className="flex items-center gap-2">
                    <CircleFlag flag={ES} />
                    Spain
                  </span>
                </SelectItem>
                <SelectItem value="uk">
                  <span className="flex items-center gap-2">
                    <CircleFlag flag={GB} />
                    United Kingdom
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field required>
            <FieldLabel>Password</FieldLabel>
            <PasswordInput placeholder="Create a password" />
            <FieldHint>At least 8 characters.</FieldHint>
          </Field>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
