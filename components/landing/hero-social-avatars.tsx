"use client"

import { AvatarRoot, AvatarFallback } from "@/components/ui/avatar"
import { AvatarGroup } from "@/components/ui/avatar-group"
import { Tooltip } from "@/components/ui/tooltip"

// Fallback avatars always ride the colored `color` variant (soft bg + strong initials), never
// the neutral muted chip. Colors are stride-mixed so neighbours never share a hue and the row
// reads warm/cool, the same balance the logo walls keep.
const FACES = [
  { initials: "AR", name: "Ana Ruiz", color: "brand" },
  { initials: "PN", name: "Pedro Núñez", color: "purple" },
  { initials: "TB", name: "Tom Becker", color: "teal" },
  { initials: "ML", name: "María López", color: "orange" },
  { initials: "DO", name: "Diego Ortega", color: "pink" },
  { initials: "JS", name: "Julia Santos", color: "brand" },
] as const

/**
 * The hero's social-proof avatar stack with a tooltip per face. Lives in its own "use client"
 * file so the interactive Tooltip and the Avatar parts it wraps are composed inside a client
 * boundary. A standalone Tooltip whose trigger element is created in a Server Component and
 * passed across the RSC boundary resolves to an undefined element type on the client (it clones
 * the trigger), so this cluster must be built client-side. See docs/ARCHITECTURE.md.
 */
export function HeroSocialAvatars() {
  return (
    <AvatarGroup size="sm">
      {FACES.map(({ initials, name, color }) => (
        <Tooltip key={initials} content={name}>
          <AvatarRoot size="sm" color={color}>
            <AvatarFallback>{initials}</AvatarFallback>
          </AvatarRoot>
        </Tooltip>
      ))}
    </AvatarGroup>
  )
}
