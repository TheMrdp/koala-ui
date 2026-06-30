"use client"

import * as React from "react"
import {
  House,
  PencilSimpleLine,
  UsersThree,
  Tag,
  Briefcase,
  ArrowRight,
  MagnifyingGlassPlus,
} from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Gallery,
  GalleryHeader,
  GalleryTitle,
  GalleryDescription,
  GalleryMasonry,
  GalleryItem,
  GalleryImage,
} from "@/components/ui/gallery"
import {
  SectionHeader,
  SectionHeaderText,
  SectionHeaderHeading,
  SectionHeaderDescription,
  SectionHeaderActions,
} from "@/components/ui/section-header"
import { Lightbox, LightboxTrigger, type LightboxImage } from "@/components/ui/lightbox"

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`

const TABS = [
  {
    value: "home",
    label: "Home",
    icon: <House />,
    previews: [
      { src: img("1486312338219-ce68d2c6f44d"), alt: "Landing page concept on a laptop" },
      { src: img("1498050108023-c5249f4df085"), alt: "Code-forward product homepage" },
      { src: img("1467232004584-a241de8bcf5d"), alt: "Minimal hero layout workspace" },
      { src: img("1499951360447-b19be8fe80f5"), alt: "Bright marketing homepage mockup" },
      { src: img("1517694712202-14dd9538aa97"), alt: "Product homepage on a laptop screen" },
      { src: img("1504384308090-c894fdcc538d"), alt: "Designer workspace with a homepage draft" },
      { src: img("1488590528505-98d2b5aba04b"), alt: "Laptop showing a landing page" },
      { src: img("1461749280684-dccba630e2f6"), alt: "Homepage layout in a code editor" },
      { src: img("1497215728101-856f4ea42174"), alt: "Laptop and notebook on a desk" },
      { src: img("1519222970733-f546218fa6d7"), alt: "Bright workspace with a laptop" },
      { src: img("1486946255434-2466348c2166"), alt: "Laptop on a wooden desk" },
      { src: img("1517502884422-41eaead166d4"), alt: "Designer reviewing a layout" },
    ],
  },
  {
    value: "blog",
    label: "Blog article",
    icon: <PencilSimpleLine />,
    previews: [
      { src: img("1455390582262-044cdead277a"), alt: "Long-form article writing setup" },
      { src: img("1481277542470-605612bd2d61"), alt: "Editorial reading layout" },
      { src: img("1503676260728-1c00da094a0b"), alt: "Focused writing desk" },
      { src: img("1432888622747-4eb9a8efeb07"), alt: "Blog draft on a laptop" },
      { src: img("1483058712412-4245e9b90334"), alt: "Open notebook beside a laptop" },
      { src: img("1486406146926-c627a92ad1ab"), alt: "Writer's desk with a coffee" },
      { src: img("1499750310107-5fef28a66643"), alt: "Notebook and pen for drafting" },
      { src: img("1531297484001-80022131f5a1"), alt: "Minimal writing workspace" },
      { src: img("1542652694-40abf526446e"), alt: "Reading and note-taking setup" },
      { src: img("1521898284481-a5ec348cb555"), alt: "Coffee and a notebook for writing" },
      { src: img("1542222024-c39e2281f121"), alt: "Quiet desk for drafting articles" },
      { src: img("1556745753-b2904692b3cd"), alt: "Laptop open to a writing app" },
    ],
  },
  {
    value: "about",
    label: "About",
    icon: <UsersThree />,
    previews: [
      { src: img("1522202176988-66273c2fd55f"), alt: "Team collaborating in an office" },
      { src: img("1556761175-5973dc0f32e7"), alt: "Company team portrait" },
      { src: img("1551434678-e076c223a692"), alt: "Founders working together" },
      { src: img("1531403009284-440f080d1e12"), alt: "Modern studio workspace" },
      { src: img("1497366216548-37526070297c"), alt: "Team meeting around a table" },
      { src: img("1517077304055-6e89abbf09b0"), alt: "Colleagues collaborating at a desk" },
      { src: img("1522071820081-009f0129c71c"), alt: "Team brainstorming session" },
      { src: img("1600880292203-757bb62b4baf"), alt: "Coworkers reviewing work together" },
      { src: img("1556157382-97eda2d62296"), alt: "Team working together at a table" },
      { src: img("1524758631624-e2822e304c36"), alt: "Coworkers in a bright office" },
      { src: img("1559136555-9303baea8ebd"), alt: "Open office with the team" },
      { src: img("1531973576160-7125cd663d86"), alt: "Colleagues collaborating" },
    ],
  },
  {
    value: "pricing",
    label: "Pricing",
    icon: <Tag />,
    previews: [
      { src: img("1460925895917-afdab827c52f"), alt: "Analytics dashboard layout" },
      { src: img("1454165804606-c3d57bc86b40"), alt: "Plan comparison metrics" },
      { src: img("1543286386-713bdd548da4"), alt: "Revenue charts mockup" },
      { src: img("1579621970563-ebec7560ff3e"), alt: "Pricing tier graphs" },
      { src: img("1542751371-adc38448a05e"), alt: "Dashboard metrics on a screen" },
      { src: img("1542435503-956c469947f6"), alt: "Plan comparison on a laptop" },
      { src: img("1573164713988-8665fc963095"), alt: "Business charts on a monitor" },
      { src: img("1521737604893-d14cc237f11d"), alt: "Reviewing revenue metrics together" },
      { src: img("1593720213428-28a5b9e94613"), alt: "Charts and metrics on a screen" },
      { src: img("1542744094-3a31f272c490"), alt: "Analytics review on a laptop" },
      { src: img("1497032205916-ac775f0649ae"), alt: "Reporting dashboard at a desk" },
      { src: img("1517502166878-35c93a0072f0"), alt: "Business planning with charts" },
    ],
  },
  {
    value: "careers",
    label: "Careers",
    icon: <Briefcase />,
    previews: [
      { src: img("1497032628192-86f99bcd76bc"), alt: "Open office careers page" },
      { src: img("1517245386807-bb43f82c33c4"), alt: "Hiring desk setup" },
      { src: img("1519389950473-47ba0277781c"), alt: "Team working at their laptops" },
      { src: img("1542744173-8e7e53415bb0"), alt: "Whiteboard planning session" },
      { src: img("1515378791036-0648a3ef77b2"), alt: "Developer focused at a desk" },
      { src: img("1521791136064-7986c2920216"), alt: "Team collaborating in the office" },
      { src: img("1552664730-d307ca884978"), alt: "Whiteboard planning with the team" },
      { src: img("1531482615713-2afd69097998"), alt: "Open-plan office workspace" },
      { src: img("1498409785966-ab341407de6e"), alt: "Office hallway and workspace" },
      { src: img("1434030216411-0b793f4b4173"), alt: "Designer working on a laptop" },
      { src: img("1521737711867-e3b97375f902"), alt: "Team member at a standing desk" },
      { src: img("1556761175-4b46a572b786"), alt: "Hiring conversation in the office" },
    ],
  },
]

/** Tabbed concepts wall: tabs switch the category, each revealing a full-bleed fake-masonry. */
export function GalleryDemo() {
  return (
    <Gallery className="rounded-lg">
      <Tabs defaultValue="home">
        <GalleryHeader>
          {/* Lede comes from the canonical SectionHeader (every marketing section leads with one);
              GalleryHeader stays only as the band's centered gutter + tab-rail home. */}
          <SectionHeader align="center">
            <SectionHeaderText>
              <SectionHeaderHeading>
                Create Multiple Concepts in a Matter of Seconds
              </SectionHeaderHeading>
              <SectionHeaderDescription>
                Cover virtually any marketing project with our pre-designed sections and templates
                for marketing landing page design.
              </SectionHeaderDescription>
            </SectionHeaderText>
          </SectionHeader>
          {/* The Tabs recipe pins its list with `self-start`; inside the centered GalleryHeader
              column that pushes the rail left, so re-center it to sit under the lede. */}
          <TabsList className="mt-5 flex-wrap justify-center gap-1.5 self-center">
            {TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="gap-1.5">
                {tab.icon}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </GalleryHeader>

        {TABS.map((tab) => {
          const images: LightboxImage[] = tab.previews.map((p) => ({
            src: p.src,
            alt: p.alt,
          }))
          return (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="data-[state=active]:animate-in data-[state=active]:fade-in-0"
            >
              <Lightbox images={images}>
                <GalleryMasonry>
                  {tab.previews.map((preview, i) => (
                    <LightboxTrigger key={preview.src} index={i} asChild>
                      <GalleryItem action="See image">
                        <GalleryImage src={preview.src} alt={preview.alt} />
                      </GalleryItem>
                    </LightboxTrigger>
                  ))}
                </GalleryMasonry>
              </Lightbox>
            </TabsContent>
          )
        })}
      </Tabs>
    </Gallery>
  )
}

/**
 * Tabbed concepts wall with chrome: variant 2's badge eyebrow and bottom CTA wrapped around the
 * variant-1 tabbed fake-masonry (no marquee). The masonry drops its own bottom padding so the
 * shared CTA owns the trailing space below whichever tab is active.
 */
export function GalleryTabbedDemo() {
  return (
    // No `rounded-lg` here (unlike variant 1): this variant renders `bleed` in the registry, so it
    // spans the full preview width like the marquee variant and shouldn't round its band corners.
    <Gallery>
      <Tabs defaultValue="home">
        <GalleryHeader>
          {/* Lede comes from the canonical SectionHeader (every marketing section leads with one);
              GalleryHeader stays only as the band's centered gutter + tab-rail home. */}
          <SectionHeader align="center">
            <SectionHeaderText>
              <Badge variant="purple" dot pill>
                Gallery section
              </Badge>
              <SectionHeaderHeading>
                Create Multiple Concepts in a Matter of Seconds
              </SectionHeaderHeading>
              <SectionHeaderDescription>
                Cover virtually any marketing project with our pre-designed sections and templates.
                Switch categories with the tabs, then click any frame to open it full-screen.
              </SectionHeaderDescription>
            </SectionHeaderText>
          </SectionHeader>
          {/* The Tabs recipe pins its list with `self-start`; inside the centered GalleryHeader
              column that pushes the rail left, so re-center it to sit under the lede. */}
          <TabsList className="mt-5 flex-wrap justify-center gap-1.5 self-center">
            {TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="gap-1.5">
                {tab.icon}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </GalleryHeader>

        {TABS.map((tab) => {
          const images: LightboxImage[] = tab.previews.map((p) => ({
            src: p.src,
            alt: p.alt,
          }))
          return (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="data-[state=active]:animate-in data-[state=active]:fade-in-0"
            >
              <Lightbox images={images}>
                {/* Device-width band: the masonry bleeds to 120vw inside it, and a horizontal mask
                    on THIS wrapper (not the masonry, whose own edges sit off-screen) dissolves the
                    tiles into the background at both visible edges. So when the wall spills past the
                    frame it fades out smoothly instead of hard-clipping at the device edge. */}
                <div className="relative w-full fade-x [--fade-size:6%]">
                  <GalleryMasonry
                    className={cn(
                      // Drop the masonry's own bottom padding so the shared CTA owns the space below.
                      "pb-0 sm:pb-0",
                      // Add a fifth column at xl so the wall reads denser the wider it gets.
                      "xl:columns-5",
                      // Bleed like variant 2: a band wider than the frame (120vw), centered so its
                      // outer columns spill ~10vw off each side past BOTH edges; the wrapper's mask
                      // then fades that spill out. Variant 1 stays inside the gutter.
                      "relative left-1/2 w-[120vw] max-w-none -translate-x-1/2 px-0",
                    )}
                  >
                    {tab.previews.map((preview, i) => (
                      <LightboxTrigger key={preview.src} index={i} asChild>
                        <GalleryItem action="See image">
                          <GalleryImage src={preview.src} alt={preview.alt} />
                        </GalleryItem>
                      </LightboxTrigger>
                    ))}
                  </GalleryMasonry>
                </div>
              </Lightbox>
            </TabsContent>
          )
        })}
      </Tabs>

      <div className="flex justify-center px-6 pb-20 pt-14 sm:pb-28">
        <Button size="lg" className="rounded-full">
          Browse all templates
        </Button>
      </div>
    </Gallery>
  )
}

type Preview = { src: string; alt: string }

// Flatten the concept previews into two rows of moving frames. Row A drifts left, row B drifts
// right, so the wall reads as a living, two-directional marquee (the Flowbase "team gallery" look).
// Take the first four of each category so the marquee keeps its balanced cross-category mix no
// matter how many photos a tab gains (the tabbed variants can grow their walls without skewing
// this one). This reproduces the original 20-tile, two-row marquee.
const MARQUEE_POOL: Preview[] = TABS.flatMap((t) => t.previews.slice(0, 4))
const MARQUEE_ROWS: Preview[][] = [MARQUEE_POOL.slice(0, 10), MARQUEE_POOL.slice(10, 20)]

/**
 * One marquee track: the tile set is rendered twice so the -50% translate loops with no seam.
 * Hovering the row pauses just that row; the second copy is decorative (aria-hidden, out of tab
 * order) and maps to the same lightbox index as its original. The edge mask fades tiles into the
 * band instead of clipping them hard, and the whole thing holds still under reduced-motion.
 */
function MarqueeRow({
  items,
  baseIndex,
  reverse = false,
}: {
  items: Preview[]
  baseIndex: number
  reverse?: boolean
}) {
  return (
    <div className="group/marquee relative flex overflow-hidden fade-x [--fade-size:3%]">
      <div
        data-slot="marquee-track"
        className={cn(
          "flex w-max shrink-0 animate-marquee items-stretch gap-4 pr-4 [--marquee-duration:64s]",
          "group-hover/marquee:[animation-play-state:paused] motion-reduce:[animation:none]",
          reverse && "[animation-direction:reverse]",
        )}
      >
        {[...items, ...items].map((preview, i) => {
          const duplicate = i >= items.length
          return (
            <LightboxTrigger
              key={`${preview.src}-${i}`}
              index={baseIndex + (i % items.length)}
              asChild
              aria-hidden={duplicate || undefined}
              tabIndex={duplicate ? -1 : undefined}
            >
              <GalleryItem action="See image" className="mb-0 w-80 shrink-0 sm:w-[28rem]">
                <GalleryImage
                  src={preview.src}
                  alt={duplicate ? "" : preview.alt}
                  className="h-56 sm:h-72"
                />
              </GalleryItem>
            </LightboxTrigger>
          )
        })}
      </div>
    </div>
  )
}

/** Two-direction marquee wall: framed previews drift past, each opening a full-screen lightbox. */
export function GalleryMarqueeDemo() {
  const images: LightboxImage[] = MARQUEE_ROWS.flat().map((p) => ({ src: p.src, alt: p.alt }))
  return (
    <Gallery>
      <GalleryHeader>
        {/* Lede comes from the canonical SectionHeader (every marketing section leads with one);
            GalleryHeader stays only as the band's centered gutter. */}
        <SectionHeader align="center">
          <SectionHeaderText>
            <Badge variant="purple" dot pill>
              Gallery section
            </Badge>
            <SectionHeaderHeading>Jambo Team Gallery</SectionHeaderHeading>
            <SectionHeaderDescription>
              A living wall of moments from the team, drifting past in two directions. Hover to
              pause a row, then click any frame to open it full-screen.
            </SectionHeaderDescription>
          </SectionHeaderText>
        </SectionHeader>
      </GalleryHeader>

      <Lightbox images={images}>
        <div className="mt-12 flex w-full flex-col gap-4 overflow-hidden">
          <MarqueeRow items={MARQUEE_ROWS[0]} baseIndex={0} />
          <MarqueeRow items={MARQUEE_ROWS[1]} baseIndex={MARQUEE_ROWS[0].length} reverse />
        </div>
      </Lightbox>

      <div className="flex justify-center px-6 pb-20 pt-14 sm:pb-28">
        <Button size="lg" className="rounded-full">
          Read all FAQs
        </Button>
      </div>
    </Gallery>
  )
}

// ── Ring variant: framed photos orbiting a centered lede (the "Superpower" floating-ring hero) ──
// A small thumbnail for the tile (it renders at ~48-96px) and a crisp one for the full-screen
// lightbox, so the ring loads light while the viewer stays sharp.
const ringThumb = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=400&q=80`
const ringFull = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=80`

type RingTile = {
  id: string
  alt: string
  /** Clock angle in degrees, 0 = top, sweeping clockwise. */
  angle: number
  /** Radius multiplier (~0.85–1.1) for an organic, non-perfect ring. */
  r: number
  /** Each frame's own resting tilt, for the scattered look. */
  tilt: number
  /** Square tile size: light on mobile, larger from `sm` up. */
  size: string
  /** Thin the ring on narrow frames so the centered lede keeps its breathing room. */
  hideOnMobile?: boolean
}

// Evenly distributed around the ellipse (~22.5° apart) so no two frames overlap: the lede is far
// narrower than the ring is wide, so frames clear the headline even at 3 and 9 o'clock. Large
// frames sit every 4th slot so two big ones are never adjacent, the side frames carry a slightly
// larger radius to stay clear of the text, and radius/tilt/size still vary per frame for the
// scattered, hand-arranged feel. On mobile the stage is too narrow to flank the headline, so the
// side frames plus one frame off each cap drop out (eight in all), leaving a clean, non-overlapping
// ring of eight. Angles read clockwise from the top.
const RING: RingTile[] = [
  { id: "1486312338219-ce68d2c6f44d", alt: "Landing page concept on a laptop", angle: 359, r: 1.0, tilt: -8, size: "size-14 sm:size-24" },
  { id: "1517694712202-14dd9538aa97", alt: "Product homepage on a laptop screen", angle: 23, r: 0.98, tilt: 7, size: "size-14 sm:size-20" },
  { id: "1467232004584-a241de8bcf5d", alt: "Minimal hero layout workspace", angle: 44, r: 1.02, tilt: -10, size: "size-12 sm:size-16" },
  { id: "1455390582262-044cdead277a", alt: "Long-form article writing setup", angle: 68, r: 1.04, tilt: 9, size: "size-14 sm:size-20", hideOnMobile: true },
  { id: "1503676260728-1c00da094a0b", alt: "Focused writing desk", angle: 90, r: 1.06, tilt: -6, size: "size-16 sm:size-24", hideOnMobile: true },
  { id: "1481277542470-605612bd2d61", alt: "Editorial reading layout", angle: 113, r: 1.04, tilt: 11, size: "size-14 sm:size-20", hideOnMobile: true },
  { id: "1522202176988-66273c2fd55f", alt: "Team collaborating in an office", angle: 135, r: 1.0, tilt: -7, size: "size-12 sm:size-16" },
  { id: "1556761175-5973dc0f32e7", alt: "Company team portrait", angle: 157, r: 0.98, tilt: 6, size: "size-14 sm:size-20" },
  { id: "1531403009284-440f080d1e12", alt: "Modern studio workspace", angle: 181, r: 1.0, tilt: -9, size: "size-14 sm:size-24" },
  { id: "1460925895917-afdab827c52f", alt: "Analytics dashboard layout", angle: 203, r: 0.98, tilt: 8, size: "size-14 sm:size-20", hideOnMobile: true },
  { id: "1543286386-713bdd548da4", alt: "Revenue charts mockup", angle: 226, r: 1.02, tilt: -5, size: "size-12 sm:size-16" },
  { id: "1579621970563-ebec7560ff3e", alt: "Pricing tier graphs", angle: 248, r: 1.04, tilt: 10, size: "size-14 sm:size-20", hideOnMobile: true },
  { id: "1517245386807-bb43f82c33c4", alt: "Hiring desk setup", angle: 270, r: 1.06, tilt: -7, size: "size-16 sm:size-24", hideOnMobile: true },
  { id: "1519389950473-47ba0277781c", alt: "Team working at their laptops", angle: 293, r: 1.04, tilt: 6, size: "size-14 sm:size-20", hideOnMobile: true },
  { id: "1515378791036-0648a3ef77b2", alt: "Developer focused at a desk", angle: 314, r: 1.0, tilt: -11, size: "size-12 sm:size-16" },
  { id: "1498050108023-c5249f4df085", alt: "Code-forward product homepage", angle: 337, r: 0.98, tilt: 9, size: "size-14 sm:size-20", hideOnMobile: true },
]

// Ellipse radii as a share of the stage box (wider than tall, like the reference). Positioning is
// pure % so the whole ring scales with the stage at every breakpoint.
const RING_RX = 44
const RING_RY = 40

/** Place a frame on the ellipse: % left/top off the stage, centered on that point, then tilted. */
function ringStyle(tile: RingTile, index: number): React.CSSProperties {
  const rad = (tile.angle * Math.PI) / 180
  return {
    left: `${50 + RING_RX * tile.r * Math.sin(rad)}%`,
    top: `${50 - RING_RY * tile.r * Math.cos(rad)}%`,
    // `translate`/`rotate` are standalone props (not `transform`), so they sit alongside the
    // entrance keyframe's `transform` without clobbering it (memory: tailwind-v4 transform gotcha).
    translate: "-50% -50%",
    rotate: `${tile.tilt}deg`,
    // Stagger the ring assembling in on mount; the longhand beats the animation shorthand's reset.
    animationDelay: `${index * 55}ms`,
  }
}

/**
 * Ring variant: framed previews float in a ring around a centered lede, and the whole ring slowly
 * orbits as the section scrolls through the viewport (the `ring-orbit` scroll-driven utility, pure
 * CSS — no JS, reduced-motion safe). Each frame opens the shared full-screen Lightbox, keeping the
 * family contract. The lede is the canonical SectionHeader, centered and held above the ring.
 */
export function GalleryRingDemo() {
  const images: LightboxImage[] = RING.map((tile) => ({ src: ringFull(tile.id), alt: tile.alt }))
  return (
    <Gallery>
      <Lightbox images={images}>
        <div className="relative mx-auto w-full max-w-[90rem] px-6 py-12 sm:py-16">
          {/* The stage owns an explicit height so the ring has room to spread; the frames read
              their % positions off it, and the band's `overflow-hidden` clips any that spill past
              the edges for the immersive, edge-to-edge feel. The mobile height is taller so the
              top/bottom frames clear the centered headline once the side frames drop out. */}
          <div className="relative mx-auto h-[42rem] w-full sm:h-[42rem] lg:h-[46rem]">
            {/* Orbiting ring layer: `ring-orbit` rotates it with scroll (the sweep is set here, so
                it tunes without touching the utility). It's pointer-transparent so only the frames
                (which re-enable pointer events) are clickable; the gaps fall through to the lede. */}
            <div className="ring-orbit pointer-events-none absolute inset-0 [--ring-orbit-from:-14deg] [--ring-orbit-to:14deg]">
              {RING.map((tile, i) => (
                <LightboxTrigger key={tile.id} index={i} asChild>
                  <GalleryItem
                    action={<MagnifyingGlassPlus />}
                    className={cn(
                      "pointer-events-auto absolute m-0 animate-stagger-in-blur motion-reduce:animate-none",
                      tile.size,
                      tile.hideOnMobile && "hidden sm:block",
                    )}
                    style={ringStyle(tile, i)}
                  >
                    <GalleryImage src={ringThumb(tile.id)} alt={tile.alt} className="h-full" />
                  </GalleryItem>
                </LightboxTrigger>
              ))}
            </div>

            {/* The centered lede sits above the ring and never rotates. The overlay is
                pointer-transparent so a frame behind the empty margins stays clickable; the lede
                column itself re-enables events for the CTA. */}
            <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center px-4">
              <div className="pointer-events-auto w-full max-w-md">
                {/* inView (not mount): this section sits mid-page, so the lede cascades as the
                    reader reaches it rather than finishing off-screen. In the fixed-height preview
                    frame it's already in view, so it still plays on load. */}
                <SectionHeader align="center" stagger staggerBlur staggerTrigger="inView">
                  <SectionHeaderText>
                    <Badge variant="purple" dot pill>
                      Gallery
                    </Badge>
                    <SectionHeaderHeading>
                      Built with Koala, <em className="italic">from every angle.</em>
                    </SectionHeaderHeading>
                    <SectionHeaderDescription>
                      A ring of real interfaces shipped with the system. Scroll to set them orbiting,
                      or click any frame to open it full-screen.
                    </SectionHeaderDescription>
                  </SectionHeaderText>
                  <SectionHeaderActions>
                    <Button size="lg">
                      Explore the gallery
                      <ArrowRight />
                    </Button>
                  </SectionHeaderActions>
                </SectionHeader>
              </div>
            </div>
          </div>
        </div>
      </Lightbox>
    </Gallery>
  )
}

/** Plain gallery without tabs: just a heading and the masonry wall. */
export function GalleryMinimalDemo() {
  const previews = TABS[0].previews.concat(TABS[2].previews)
  return (
    <Gallery className="rounded-lg">
      <GalleryHeader>
        <GalleryTitle>From our customers</GalleryTitle>
        <GalleryDescription>
          A wall of real projects shipped with Koala UI, laid out as a fake masonry.
        </GalleryDescription>
      </GalleryHeader>
      <GalleryMasonry>
        {previews.map((preview) => (
          <GalleryItem key={preview.src}>
            <GalleryImage src={preview.src} alt={preview.alt} />
          </GalleryItem>
        ))}
      </GalleryMasonry>
    </Gallery>
  )
}
