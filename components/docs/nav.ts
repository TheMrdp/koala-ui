import {
  House,
  Stack,
  Compass,
  Palette,
  TextAa,
  Ruler,
  Rows,
  BoundingBox,
  Wind,
  Shapes,
  UserCircle,
  Tag,
  Path,
  CursorClick,
  SquaresFour,
  Cards,
  CheckSquare,
  AppWindow,
  ListDashes,
  Tray,
  CaretUpDown,
  Browsers,
  Table as TableIcon,
  ChatTeardrop,
  BellSimple,
  Textbox,
  IdentificationCard,
  Password,
  ShieldCheck,
  Pulse,
  Warning,
  Devices,
  Keyboard,
  CaretCircleDown,
  ListNumbers,
  PencilSimpleLine,
  PlayCircle,
  TextT,
  Slideshow,
  SidebarSimple,
  Sidebar as SidebarIcon,
  ToggleRight,
  Steps,
  CalendarDots,
  Smiley,
  PictureInPicture,
  RadioButton,
  TextAlignLeft,
  Sliders,
  Minus,
  SquareHalf,
} from "@phosphor-icons/react/ssr"
// NOTE: PRO marketing sections/pages live in the private koala-ui-pro repo and are
// not part of this public docs nav. See registry.json (tier: "pro").
import type { Icon } from "@phosphor-icons/react"

/**
 * Docs navigation tree — single source of truth for the sidebar and (later) for
 * "previous/next" links. Add a component by dropping an entry under "Components"
 * and creating the matching `app/docs/...` route.
 */
export interface NavItem {
  title: string
  href: string
  /** Phosphor icon rendered before the label in the sidebar. */
  icon: Icon
  /** Marks work-in-progress entries with a muted "Soon" badge. */
  soon?: boolean
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const docsNav: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs", icon: House },
      { title: "Architecture", href: "/docs/architecture", icon: Stack },
      { title: "Patterns", href: "/docs/patterns", icon: Compass },
    ],
  },
  {
    title: "Foundations",
    items: [
      { title: "Colors", href: "/docs/foundations/colors", icon: Palette },
      { title: "Typography", href: "/docs/foundations/typography", icon: TextAa },
      { title: "Spacing & Layout", href: "/docs/foundations/spacing", icon: Ruler },
      { title: "Breakpoints", href: "/docs/foundations/breakpoints", icon: Devices },
      { title: "Density", href: "/docs/foundations/density", icon: Rows },
      { title: "Radius & Shadows", href: "/docs/foundations/surfaces", icon: BoundingBox },
      { title: "Motion", href: "/docs/foundations/motion", icon: Wind },
      { title: "Icons", href: "/docs/foundations/icons", icon: Shapes },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Accordion", href: "/docs/components/accordion", icon: CaretCircleDown },
      { title: "Alert", href: "/docs/components/alert", icon: Warning },
      { title: "Avatar", href: "/docs/components/avatar", icon: UserCircle },
      { title: "Badge", href: "/docs/components/badge", icon: Tag },
      { title: "Breadcrumb", href: "/docs/components/breadcrumb", icon: Path },
      { title: "Button", href: "/docs/components/button", icon: CursorClick },
      { title: "Button Group", href: "/docs/components/button-group", icon: SquaresFour },
      { title: "Card", href: "/docs/components/card", icon: Cards },
      { title: "Carousel", href: "/docs/components/carousel", icon: Slideshow },
      { title: "Checkbox", href: "/docs/components/checkbox", icon: CheckSquare },
      { title: "Data Table", href: "/docs/components/data-table", icon: TableIcon },
      { title: "Date Picker", href: "/docs/components/date-picker", icon: CalendarDots },
      { title: "Dialog", href: "/docs/components/dialog", icon: AppWindow },
      { title: "Divider", href: "/docs/components/divider", icon: Minus },
      { title: "Drawer", href: "/docs/components/drawer", icon: SquareHalf },
      { title: "Dropdown Menu", href: "/docs/components/dropdown-menu", icon: ListDashes },
      { title: "Emoji Picker", href: "/docs/components/emoji-picker", icon: Smiley },
      { title: "Empty State", href: "/docs/components/empty-state", icon: Tray },
      { title: "Field", href: "/docs/components/field", icon: IdentificationCard },
      { title: "Input", href: "/docs/components/input", icon: Textbox },
      { title: "Kbd", href: "/docs/components/kbd", icon: Keyboard },
      { title: "Label", href: "/docs/components/label", icon: TextT },
      { title: "Layout", href: "/docs/components/layout", icon: SidebarIcon },
      { title: "OTP Input", href: "/docs/components/otp-input", icon: Password },
      { title: "Pagination", href: "/docs/components/pagination", icon: ListNumbers },
      { title: "Password Strength", href: "/docs/components/password-strength", icon: ShieldCheck },
      { title: "Popover", href: "/docs/components/popover", icon: PictureInPicture },
      { title: "Radio Group", href: "/docs/components/radio-group", icon: RadioButton },
      { title: "Rich Text Editor", href: "/docs/components/rich-text-editor", icon: PencilSimpleLine },
      { title: "Select", href: "/docs/components/select", icon: CaretUpDown },
      { title: "Sidebar", href: "/docs/components/sidebar", icon: SidebarSimple },
      { title: "Skeleton", href: "/docs/components/skeleton", icon: Pulse },
      { title: "Slider", href: "/docs/components/slider", icon: Sliders },
      { title: "Stepper", href: "/docs/components/stepper", icon: Steps },
      { title: "Switch", href: "/docs/components/switch", icon: ToggleRight },
      { title: "Tabs", href: "/docs/components/tabs", icon: Browsers },
      { title: "Textarea", href: "/docs/components/textarea", icon: TextAlignLeft },
      { title: "Toast", href: "/docs/components/toast", icon: BellSimple },
      { title: "Tooltip", href: "/docs/components/tooltip", icon: ChatTeardrop },
      { title: "Video Player", href: "/docs/components/video-player", icon: PlayCircle },
    ],
  },
]
