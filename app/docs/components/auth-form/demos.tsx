"use client"

import { GameController, PawPrint, Quotes, ShieldCheck } from "@phosphor-icons/react"

import { LoginForm, ProviderForm, SignUpForm } from "@/components/ui/auth-form"
import {
  SplitLayout,
  SplitPane,
  SplitPaneBody,
  SplitMedia,
  SplitMediaOverlay,
} from "@/components/ui/layout"
import { cn } from "@/lib/utils"

/** Sign-in: social providers, email + password, remember, forgot-password link. */
export function LoginFormDemo() {
  return <LoginForm />
}

/** Sign-up: adds a name field, a live password-strength meter, and a terms gate. */
export function SignUpFormDemo() {
  return <SignUpForm />
}

// ── Provider-first ───────────────────────────────────────────────────────────────────────

/** Stacked "Continue with X" buttons over a magic-link email: the password-less OAuth pattern. */
export function ProviderStackDemo() {
  return (
    <ProviderForm
      title="Sign in to Acme"
      description="Use a provider or get a magic link by email."
      showEmail
    />
  )
}

// A rounded app-icon lockup for the community sign-in screen (echoes a game/server logo).
function AppMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-sm ring-1 ring-black/5",
        className,
      )}
    >
      <GameController className="size-7" weight="regular" />
    </span>
  )
}

/**
 * Community sign-in: a single dominant Discord button gated behind a consent checkbox, with a
 * social footer: the OAuth-only screen used by game servers and Discord-native products.
 */
export function CommunityFormDemo() {
  return (
    <CenteredStage minH="min-h-[560px]">
      <AppMark />
      <ProviderForm
        className="w-full"
        title="Want to join Eleven?"
        description="Sign in with Discord to request your whitelist and start your story."
        providers={["discord"]}
        emphasizeFirst
        action="sign-in"
        requireTerms
        termsLabel={
          <>
            I accept the{" "}
            <a href="#" className="font-medium text-brand underline-offset-4 hover:underline">
              terms and conditions
            </a>{" "}
            of Eleven
          </>
        }
        social={[
          { network: "x", href: "#" },
          { network: "discord", href: "#" },
          { network: "youtube", href: "#" },
          { network: "instagram", href: "#" },
        ]}
      />
    </CenteredStage>
  )
}

// ── Community sign-in: split, media collage on the right (the Eleven-style screen) ──────────
export function ProviderSplitDemo() {
  return (
    <SplitLayout className="grid-cols-2 h-[640px] min-h-0">
      <SplitPane>
        <SplitPaneBody width="sm" className="gap-8">
          <ProviderForm
            variant="bare"
            title="Want to join Eleven?"
            description="Sign in with Discord to request your whitelist and start your story."
            providers={["discord"]}
            emphasizeFirst
            action="sign-in"
            requireTerms
            termsLabel={
              <>
                I accept the{" "}
                <a href="#" className="font-medium text-brand underline-offset-4 hover:underline">
                  terms and conditions
                </a>{" "}
                of Eleven
              </>
            }
            social={[
              { network: "x", href: "#" },
              { network: "discord", href: "#" },
              { network: "youtube", href: "#" },
              { network: "instagram", href: "#" },
            ]}
          />
        </SplitPaneBody>
      </SplitPane>

      <SplitMedia className="block">
        {/* A collage of gradient "screenshots" stands in for real game imagery (DS demo convention). */}
        <div className="absolute inset-0 grid grid-rows-3 gap-3 bg-background p-3">
          <div className="rounded-xl bg-gradient-to-br from-indigo-500 via-violet-600 to-purple-700" />
          <div className="rounded-xl bg-gradient-to-tr from-slate-700 via-zinc-600 to-stone-500" />
          <div className="rounded-xl bg-gradient-to-br from-fuchsia-600 via-purple-600 to-amber-500" />
        </div>
      </SplitMedia>
    </SplitLayout>
  )
}

// ── Full-page screens ──────────────────────────────────────────────────────────────────
// Complete auth pages built by dropping an auth block into a page shell. The split screens
// use the bare variant inside a SplitPane; the centered screens keep the bordered card.
// Each demo forces the split grid to two columns and the media pane visible (the real
// `lg:` breakpoints would collapse them on this narrower docs preview), and swaps
// `min-h-svh` for a fixed-height frame.

// The Koala brand lockup, reused across the screens.
function Brand({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2 font-semibold tracking-tight", className)}>
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
        <PawPrint className="size-5" />
      </span>
      <span className="text-lg">Koala</span>
    </span>
  )
}

// ── Sign in: split, media on the right with a testimonial ───────────────────────────────
export function LoginSplitDemo() {
  return (
    <SplitLayout className="grid-cols-2 h-[640px] min-h-0">
      <SplitPane>
        <SplitPaneBody width="sm" className="gap-8">
          <Brand className="justify-center" />
          <LoginForm variant="bare" />
        </SplitPaneBody>
      </SplitPane>

      <SplitMedia className="block">
        {/* A warm gradient "photo" stands in for a real image (DS demo convention). */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-300 via-orange-500 to-rose-600" />
        <SplitMediaOverlay>
          <Quotes className="size-7 opacity-80" />
          <p className="text-lg font-medium text-balance">
            Koala UI let us ship a polished product in days, not months.
          </p>
          <p className="text-sm text-white/70">Mara Okonkwo · Founder, Nimbus</p>
        </SplitMediaOverlay>
      </SplitMedia>
    </SplitLayout>
  )
}

// ── Sign up: split 50/50, branded panel on the left ─────────────────────────────────────
export function SignUpSplitDemo() {
  return (
    <SplitLayout className="grid-cols-2 h-[700px] min-h-0">
      <SplitMedia className="block">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 via-violet-500 to-fuchsia-500" />
        <SplitMediaOverlay className="justify-between">
          <Brand className="text-white" />
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-semibold tracking-tight text-balance">
              Build faster with a design system that ships finished.
            </p>
            <p className="text-sm text-pretty text-white/75">
              Join thousands of teams already building on Koala UI.
            </p>
          </div>
        </SplitMediaOverlay>
      </SplitMedia>

      <SplitPane>
        <SplitPaneBody width="sm">
          <SignUpForm variant="bare" />
        </SplitPaneBody>
      </SplitPane>
    </SplitLayout>
  )
}

// A soft, centered stage with a brand glow: the host surface for the boxed-card screens.
function CenteredStage({
  minH,
  children,
}: {
  minH: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-muted/30 p-6",
        minH,
      )}
    >
      {/* A diffuse brand glow behind the card: pure decoration. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-brand/15 blur-3xl"
      />
      <div className="relative z-10 flex w-full max-w-sm flex-col items-center gap-6">
        {children}
      </div>
    </div>
  )
}

// ── Sign in: centered card on a soft brand backdrop ─────────────────────────────────────
export function LoginCenteredDemo() {
  return (
    <CenteredStage minH="min-h-[560px]">
      <Brand />
      <LoginForm className="w-full" />
    </CenteredStage>
  )
}

// ── Sign up: centered card ──────────────────────────────────────────────────────────────
export function SignUpCenteredDemo() {
  return (
    <CenteredStage minH="min-h-[680px]">
      <span className="flex items-center gap-2 rounded-full bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-xs ring-1 ring-border">
        <ShieldCheck className="size-4 text-success" />
        SOC 2 compliant
      </span>
      <SignUpForm className="w-full" />
    </CenteredStage>
  )
}
