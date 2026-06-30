import Link from "next/link"
import {
  Megaphone,
  FigmaLogo,
  DeviceMobile,
  ArrowRight,
} from "@phosphor-icons/react/ssr"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Hero as HeroRoot,
  HeroContent,
  HeroEyebrow,
  HeroTitle,
  HeroSubtitle,
  HeroActions,
  HeroFeatures,
  HeroFeature,
  HeroSocialProof,
  HeroRating,
} from "@/components/ui/hero"
import { HeroSocialAvatars } from "@/components/landing/hero-social-avatars"
import { HERO_FEATURES, SOCIAL_PROOF } from "@/components/landing/data"

/** Landing hero. Structure and content mirror the original koalaui.com hero. */
export function Hero() {
  return (
    <HeroRoot>
      <HeroContent>
        <HeroEyebrow asChild>
          <Link href="#changelog">
            <Badge variant="orange" pill>
              <Megaphone />
              Update available
            </Badge>
            <span>Koala UI v11 it&apos;s here!</span>
          </Link>
        </HeroEyebrow>

        <HeroTitle>A Design System built for AI-Powered Products</HeroTitle>

        <HeroSubtitle>
          A Design System for builders of AI assistants, copilots and intelligent tools. Ship
          MVPs fast.
        </HeroSubtitle>

        <HeroActions>
          <Button asChild size="lg">
            <Link href="#pricing">
              Buy now &amp; use forever
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/docs">
              <FigmaLogo />
              Preview Desktop
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/docs">
              <DeviceMobile />
              Preview Mobile
            </Link>
          </Button>
        </HeroActions>

        <HeroFeatures>
          {HERO_FEATURES.map((feature) => (
            <HeroFeature key={feature}>{feature}</HeroFeature>
          ))}
        </HeroFeatures>

        <HeroSocialProof>
          <HeroSocialAvatars />
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <span className="text-sm font-medium text-foreground">
              +{SOCIAL_PROOF.builders} Designers have joined already
            </span>
            <HeroRating>
              <span className="font-medium text-foreground tabular-nums">
                {SOCIAL_PROOF.rating} Ratings
              </span>
            </HeroRating>
          </div>
        </HeroSocialProof>
      </HeroContent>
    </HeroRoot>
  )
}
