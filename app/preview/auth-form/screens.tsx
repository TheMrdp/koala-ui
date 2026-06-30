"use client"

import { GameController } from "@phosphor-icons/react"

import { ProviderForm, type AuthProvider, type SocialLink } from "@/components/ui/auth-form"
import { SplitLayout, SplitPane, SplitPaneBody, SplitMedia } from "@/components/ui/layout"
import { cn } from "@/lib/utils"

/**
 * Full-viewport auth screens for the "open in new tab" preview route. Unlike the docs demos
 * (which force a fixed-height, two-column frame for the narrow preview pane), these use the real
 * responsive layout (`min-h-svh`, and the SplitLayout's own `lg:` breakpoints) so the screens
 * read exactly as they would in a shipped app.
 */

// A rounded app-icon lockup for the community sign-in screen (echoes a game/server logo).
function AppMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-sm ring-1 ring-black/5",
        className,
      )}
    >
      <GameController className="size-7" />
    </span>
  )
}

// The Eleven-style community form props, shared by the centered and split screens.
const elevenProps = {
  title: "Want to join Eleven?",
  description: "Sign in with Discord to request your whitelist and start your story.",
  providers: ["discord"] as AuthProvider[],
  emphasizeFirst: true,
  action: "sign-in" as const,
  requireTerms: true,
  termsLabel: (
    <>
      I accept the{" "}
      <a href="#" className="font-medium text-brand underline-offset-4 hover:underline">
        terms and conditions
      </a>{" "}
      of Eleven
    </>
  ),
  social: [
    { network: "x", href: "#" },
    { network: "discord", href: "#" },
    { network: "youtube", href: "#" },
    { network: "instagram", href: "#" },
  ] as SocialLink[],
}

// A soft, centered stage with a diffuse brand glow: the host surface for the boxed screens.
function CenteredStage({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative grid min-h-svh place-items-center overflow-hidden bg-muted/30 p-6">
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

/** Stacked "Continue with X" providers over a magic-link email, centered full page. */
export function ProviderStackScreen() {
  return (
    <CenteredStage>
      <ProviderForm
        className="w-full"
        title="Sign in to Acme"
        description="Use a provider or get a magic link by email."
        showEmail
      />
    </CenteredStage>
  )
}

/** Single dominant Discord button gated behind a consent checkbox, with a social footer. */
export function CommunityScreen() {
  return (
    <CenteredStage>
      <AppMark />
      <ProviderForm className="w-full" {...elevenProps} />
    </CenteredStage>
  )
}

/** The same gated community block, bare inside a SplitLayout with a media collage. */
export function CommunitySplitScreen() {
  return (
    <SplitLayout>
      <SplitPane>
        <SplitPaneBody width="sm" className="gap-8">
          <ProviderForm variant="bare" {...elevenProps} />
        </SplitPaneBody>
      </SplitPane>

      <SplitMedia className="block" aria-hidden>
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
