"use client"

import * as React from "react"
import {
  Sparkle,
  Plus,
  PencilSimpleLine,
  ClockCounterClockwise,
  ArrowsInSimple,
  ArrowsOutSimple,
  X,
} from "@phosphor-icons/react"

import {
  AIPanel,
  AIPanelHeader,
  AIPanelHeading,
  AIPanelTitle,
  AIPanelDescription,
  AIPanelActions,
  AIPanelAction,
  AIPanelExpandToggle,
  AIPanelBody,
  AIPanelFooter,
  type AIPanelView,
} from "@/components/ui/ai-panel"
import {
  Conversation,
  Message,
  MessageAvatar,
  MessageBody,
  MessageContent,
  MessageTyping,
} from "@/components/ui/chat"
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputButton,
  PromptInputSubmit,
  PromptInputSuggestions,
  PromptInputSuggestion,
} from "@/components/ui/prompt-input"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  DrawerTitle,
} from "@/components/ui/drawer"
import { AvatarRoot, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

// Koala brand mark, saved locally in /public (256×256). Used as the assistant's avatar.
const KOALA_LOGO = "/koala-logo.webp"
import { Button } from "@/components/ui/button"

/** Assistant identity in a Message turn: MessageAvatar reads the Message role context. */
function KoalaAvatar() {
  return <MessageAvatar name="Koala" src={KOALA_LOGO} />
}

/** Assistant identity in the panel header: a plain Avatar (no Message context here). */
function HeaderAvatar() {
  return (
    <AvatarRoot size="sm">
      <AvatarImage src={KOALA_LOGO} alt="Koala" />
      <AvatarFallback className="bg-muted text-foreground">
        <Sparkle className="size-4" />
      </AvatarFallback>
    </AvatarRoot>
  )
}

type ChatMessage = { id: number; role: "user" | "assistant"; text: string }

const SEED: ChatMessage[] = [
  { id: 1, role: "user", text: "What changed in the latest release?" },
  {
    id: 2,
    role: "assistant",
    text: "Three things landed: a faster build, dark-mode fixes, and the new Prompt Input. Want the full changelog?",
  },
]

/** A tiny fake chat: appends the user turn, then an assistant reply after a beat. */
function useFakeChat() {
  const [messages, setMessages] = React.useState<ChatMessage[]>(SEED)
  const [loading, setLoading] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const idRef = React.useRef(100)

  // Cleanup-only effect (no state set in the body), safe under the repo's strict hooks lint.
  React.useEffect(() => () => clearTimeout(timer.current), [])

  function send(text: string) {
    idRef.current += 1
    setMessages((m) => [...m, { id: idRef.current, role: "user", text }])
    setLoading(true)
    timer.current = setTimeout(() => {
      idRef.current += 1
      setMessages((m) => [
        ...m,
        { id: idRef.current, role: "assistant", text: "On it. Here's a quick take on that." },
      ])
      setLoading(false)
    }, 1600)
  }

  return { messages, loading, send }
}

/** The shared panel: header · conversation · composer. `trailing` slots an extra header action. */
function AssistantPanel({
  view,
  trailing,
}: {
  view?: AIPanelView
  trailing?: React.ReactNode
}) {
  const { messages, loading, send } = useFakeChat()
  return (
    <AIPanel view={view}>
      <AIPanelHeader>
        <HeaderAvatar />
        <AIPanelHeading>
          <AIPanelTitle>Koala Assistant</AIPanelTitle>
          <AIPanelDescription>Always here to help</AIPanelDescription>
        </AIPanelHeading>
        <AIPanelActions>
          <AIPanelAction aria-label="History">
            <ClockCounterClockwise />
          </AIPanelAction>
          <AIPanelAction aria-label="New chat">
            <PencilSimpleLine />
          </AIPanelAction>
          {trailing}
        </AIPanelActions>
      </AIPanelHeader>

      <AIPanelBody>
        <Conversation>
          {messages.map((m) => (
            <Message key={m.id} role={m.role}>
              {m.role === "assistant" && <KoalaAvatar />}
              <MessageBody>
                <MessageContent>{m.text}</MessageContent>
              </MessageBody>
            </Message>
          ))}
          {loading && (
            <Message role="assistant">
              <KoalaAvatar />
              <MessageBody>
                <MessageContent>
                  <MessageTyping />
                </MessageContent>
              </MessageBody>
            </Message>
          )}
        </Conversation>
      </AIPanelBody>

      <AIPanelFooter>
        <PromptInput size="sm" loading={loading} onSubmit={send}>
          <PromptInputTextarea placeholder="Reply to Koala…" />
          <PromptInputToolbar>
            <PromptInputButton iconOnly aria-label="Add photos & files">
              <Plus />
            </PromptInputButton>
            <PromptInputSubmit />
          </PromptInputToolbar>
        </PromptInput>
      </AIPanelFooter>
    </AIPanel>
  )
}

export function AIPanelDemo() {
  return (
    <div className="h-[34rem] w-full max-w-md overflow-hidden rounded-xl border border-border shadow-lg">
      <AssistantPanel />
    </div>
  )
}

/**
 * The assistant as an overlay drawer that can minimize into a floating window. The host owns a
 * single `mode` (closed · drawer · floating): the drawer header offers "Minimize to window"
 * (pop out, keeping the conversation alive), and the floating window offers "Expand to drawer"
 * to dock back. An overlay is never a dead end: there's always a way out to a window.
 */
export function OverlayDemo() {
  const [mode, setMode] = React.useState<"closed" | "drawer" | "floating">("closed")
  return (
    <>
      <Drawer open={mode === "drawer"} onOpenChange={(open) => setMode(open ? "drawer" : "closed")}>
        <DrawerTrigger asChild>
          <Button variant="outline">
            <Sparkle /> Ask Koala
          </Button>
        </DrawerTrigger>
        <DrawerContent side="right" size="md" showClose={false} swipeToClose={false} className="p-0">
          {/* Radix Dialog needs a title for screen readers; the visible one lives in the panel. */}
          <DrawerTitle className="sr-only">Koala Assistant</DrawerTitle>
          <AssistantPanel
            trailing={
              <>
                <AIPanelAction aria-label="Minimize to window" onClick={() => setMode("floating")}>
                  <ArrowsInSimple />
                </AIPanelAction>
                <AIPanelAction asChild aria-label="Close">
                  <DrawerClose>
                    <X />
                  </DrawerClose>
                </AIPanelAction>
              </>
            }
          />
        </DrawerContent>
      </Drawer>

      {mode === "floating" && (
        <AssistantPanel
          view="floating"
          trailing={
            <>
              <AIPanelAction aria-label="Expand to drawer" onClick={() => setMode("drawer")}>
                <ArrowsOutSimple />
              </AIPanelAction>
              <AIPanelAction aria-label="Close" onClick={() => setMode("closed")}>
                <X />
              </AIPanelAction>
            </>
          }
        />
      )}
    </>
  )
}

export function EmptyDemo() {
  const [value, setValue] = React.useState("")
  const starters = ["Summarize my day", "Draft a standup update", "Find a doc"]
  return (
    <div className="h-[34rem] w-full max-w-md overflow-hidden rounded-xl border border-border shadow-lg">
      <AIPanel>
        <AIPanelHeader>
          <HeaderAvatar />
          <AIPanelHeading>
            <AIPanelTitle>Koala Assistant</AIPanelTitle>
            <AIPanelDescription>Always here to help</AIPanelDescription>
          </AIPanelHeading>
          <AIPanelActions>
            <AIPanelAction aria-label="History">
              <ClockCounterClockwise />
            </AIPanelAction>
          </AIPanelActions>
        </AIPanelHeader>

        <AIPanelBody className="flex flex-col items-center justify-center gap-5 text-center">
          <AvatarRoot size="lg">
            <AvatarImage src={KOALA_LOGO} alt="Koala" />
            <AvatarFallback className="bg-muted text-foreground">
              <Sparkle className="size-6" />
            </AvatarFallback>
          </AvatarRoot>
          <div className="flex flex-col gap-1">
            <p className="text-base font-semibold">How can I help?</p>
            <p className="text-pretty text-sm text-muted-foreground">
              Ask about your workspace, draft content, or summarize a thread.
            </p>
          </div>
          <PromptInputSuggestions className="justify-center">
            {starters.map((s) => (
              <PromptInputSuggestion key={s} onClick={() => setValue(s)}>
                <Sparkle className="text-brand" /> {s}
              </PromptInputSuggestion>
            ))}
          </PromptInputSuggestions>
        </AIPanelBody>

        <AIPanelFooter>
          <PromptInput size="sm" value={value} onValueChange={setValue} onSubmit={() => setValue("")}>
            <PromptInputTextarea placeholder="Ask anything…" />
            <PromptInputToolbar>
              <PromptInputButton iconOnly aria-label="Add photos & files">
                <Plus />
              </PromptInputButton>
              <PromptInputSubmit />
            </PromptInputToolbar>
          </PromptInput>
        </AIPanelFooter>
      </AIPanel>
    </div>
  )
}

/**
 * Notion/Edge-style window modes. A launcher opens the assistant as a split-screen rail; the
 * header toggle pops it out to a floating window and back; close returns to the launcher. The
 * panel manages its own `view`; the host only owns whether it's open.
 */
export function WindowModesDemo() {
  const { messages, loading, send } = useFakeChat()
  const [open, setOpen] = React.useState(false)
  const [view, setView] = React.useState<AIPanelView>("split")
  return (
    <div className="relative flex h-[26rem] w-full items-center justify-center rounded-xl border border-dashed border-border bg-muted/20">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="max-w-xs text-pretty text-sm text-muted-foreground">
          Your app content lives here. Open the assistant as a split rail, then pop it out to a
          floating window.
        </p>
        {!open && (
          <Button
            variant="outline"
            onClick={() => {
              setOpen(true)
              setView("split")
            }}
          >
            <Sparkle /> Ask Koala
          </Button>
        )}
      </div>

      {open && (
        <AIPanel view={view} onViewChange={setView}>
          <AIPanelHeader>
            <HeaderAvatar />
            <AIPanelHeading>
              <AIPanelTitle>Koala Assistant</AIPanelTitle>
              <AIPanelDescription>
                {view === "split" ? "Split screen" : "Floating window"}
              </AIPanelDescription>
            </AIPanelHeading>
            <AIPanelActions>
              <AIPanelExpandToggle />
              <AIPanelAction aria-label="Close" onClick={() => setOpen(false)}>
                <X />
              </AIPanelAction>
            </AIPanelActions>
          </AIPanelHeader>

          <AIPanelBody>
            <Conversation>
              {messages.map((m) => (
                <Message key={m.id} role={m.role}>
                  {m.role === "assistant" && <KoalaAvatar />}
                  <MessageBody>
                    <MessageContent>{m.text}</MessageContent>
                  </MessageBody>
                </Message>
              ))}
              {loading && (
                <Message role="assistant">
                  <KoalaAvatar />
                  <MessageBody>
                    <MessageContent>
                      <MessageTyping />
                    </MessageContent>
                  </MessageBody>
                </Message>
              )}
            </Conversation>
          </AIPanelBody>

          <AIPanelFooter>
            <PromptInput size="sm" loading={loading} onSubmit={send}>
              <PromptInputTextarea placeholder="Reply to Koala…" />
              <PromptInputToolbar>
                <PromptInputButton iconOnly aria-label="Add photos & files">
                  <Plus />
                </PromptInputButton>
                <PromptInputSubmit />
              </PromptInputToolbar>
            </PromptInput>
          </AIPanelFooter>
        </AIPanel>
      )}
    </div>
  )
}
