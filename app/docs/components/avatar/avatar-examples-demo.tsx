"use client"

import * as React from "react"
import { DotsThreeVertical, ChatCircle, Heart } from "@phosphor-icons/react"

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarStatus,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

// - Profile card --------------------------------------------------------------

export function ProfileCardDemo() {
  return (
    <Card className="w-64">
      <CardContent className="flex flex-col items-center gap-4 pt-8 pb-6 px-6 text-center">
        <Avatar size="xl">
          <AvatarImage src="https://i.pravatar.cc/160?img=12" alt="Esteban Alonso" />
          <AvatarFallback>EA</AvatarFallback>
          <AvatarStatus variant="online" />
        </Avatar>
        <div className="space-y-1">
          <p className="font-semibold leading-none text-foreground">Esteban Alonso</p>
          <p className="text-sm text-muted-foreground">Product Designer</p>
        </div>
        <Badge variant="secondary" size="sm">Admin</Badge>
        <div className="flex w-full gap-2">
          <Button size="sm" className="flex-1">Follow</Button>
          <Button size="sm" variant="outline" className="flex-1">Message</Button>
        </div>
      </CardContent>
    </Card>
  )
}

// - Team member list ----------------------------------------------------------

const MEMBERS = [
  { img: 12, name: "Esteban Alonso", email: "esteban@koala.ui", role: "Admin"  as const, status: "online"  as const },
  { img: 5,  name: "Marie Dubois",   email: "marie@koala.ui",   role: "Editor" as const, status: "away"    as const },
  { img: 32, name: "Liam Chen",      email: "liam@koala.ui",    role: "Viewer" as const, status: "offline" as const },
]

const ROLE_VARIANT = {
  Admin:  "secondary",
  Editor: "default",
  Viewer: "default",
} as const

export function TeamListDemo() {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Team members</CardTitle>
        <CardAction>
          <Button size="sm" variant="ghost">Invite</Button>
        </CardAction>
      </CardHeader>
      <CardContent className="p-0 pb-1">
        {MEMBERS.map((m) => (
          <div
            key={m.name}
            className="flex items-center gap-3 px-4 py-2.5 border-t border-border first:border-t-0"
          >
            <Avatar size="sm">
              <AvatarImage src={`https://i.pravatar.cc/160?img=${m.img}`} alt={m.name} />
              <AvatarFallback>{initials(m.name)}</AvatarFallback>
              <AvatarStatus variant={m.status} />
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-none truncate">{m.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{m.email}</p>
            </div>
            <Badge variant={ROLE_VARIANT[m.role]} size="sm">{m.role}</Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  iconOnly
                  aria-label={`Actions for ${m.name}`}
                  tooltip={false}
                >
                  <DotsThreeVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View profile</DropdownMenuItem>
                <DropdownMenuItem>Change role</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Remove member</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// - Comment thread ------------------------------------------------------------

const COMMENTS = [
  {
    img: 12,
    name: "Esteban Alonso",
    time: "2m ago",
    text: "The new token system is really clean. Switching themes feels instant now.",
  },
  {
    img: 5,
    name: "Marie Dubois",
    time: "1m ago",
    text: "Agreed - and the shadow scale is exactly what the cards needed.",
  },
  {
    img: 32,
    name: "Liam Chen",
    time: "just now",
    text: "Shipping this to staging today. Will update once QA signs off.",
  },
]

export function CommentThreadDemo() {
  return (
    <Card className="w-80">
      <CardContent className="flex flex-col gap-5 py-4 px-4">
        {COMMENTS.map((c) => (
          <div key={c.name} className="flex gap-3">
            <Avatar size="sm" className="mt-0.5 shrink-0">
              <AvatarImage src={`https://i.pravatar.cc/160?img=${c.img}`} alt={c.name} />
              <AvatarFallback>{initials(c.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-medium">{c.name}</span>
                <span className="text-xs text-muted-foreground tabular-nums">{c.time}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{c.text}</p>
              <div className="mt-2 flex gap-3">
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition duration-fast ease-out">
                  <Heart className="size-3.5" />
                  Like
                </button>
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition duration-fast ease-out">
                  <ChatCircle className="size-3.5" />
                  Reply
                </button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
