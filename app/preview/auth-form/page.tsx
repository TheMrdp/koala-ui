import { notFound } from "next/navigation"

import { ProviderStackScreen, CommunityScreen, CommunitySplitScreen } from "./screens"

export const metadata = { title: "Authentication preview" }

// Screen keys → full-screen components, keyed by the `?screen=` query param. Built here in the
// server module (not the "use client" screens file) so the lookup runs on the server. A registry
// exported from a client module would arrive as a client-reference proxy and index to undefined.
const AUTH_SCREENS: Record<string, () => React.ReactNode> = {
  "provider-stack": ProviderStackScreen,
  community: CommunityScreen,
  "community-split": CommunitySplitScreen,
}

/**
 * Full-screen preview route for the auth blocks: the target of the "open in new tab" button on
 * the docs page. Pick a screen with `?screen=<key>`. It renders outside the docs chrome, so the
 * screen fills the whole viewport.
 */
export default async function AuthFormPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ screen?: string }>
}) {
  const { screen } = await searchParams
  const Screen = screen ? AUTH_SCREENS[screen] : undefined

  if (!Screen) notFound()

  return <Screen />
}
