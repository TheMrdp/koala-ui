"use client"

import * as React from "react"

export type ToastVariant = "default" | "success" | "warning" | "destructive" | "info"

export interface ToastData {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: ToastVariant
  /** Auto-dismiss delay in ms. Default: 5000. Pass Infinity to persist. */
  duration?: number
  action?: { label: string; onClick: () => void }
  /** Internal — false triggers the exit animation before removal. */
  open: boolean
}

type Listener = () => void
const listeners = new Set<Listener>()
let _state: ToastData[] = []
const EMPTY: ToastData[] = []

function emit() {
  listeners.forEach(fn => fn())
}

export function addToast(data: Omit<ToastData, "id" | "open">): string {
  const id = crypto.randomUUID()
  _state = [{ ...data, id, open: true }, ..._state]
  emit()
  return id
}

/** Triggers exit animation (open → false), then removes after 300 ms. */
export function startDismiss(id: string): void {
  // Avoid double-dismissing an already-closing toast.
  if (!_state.find(t => t.id === id && t.open)) return
  _state = _state.map(t => (t.id === id ? { ...t, open: false } : t))
  emit()
  setTimeout(() => {
    _state = _state.filter(t => t.id !== id)
    emit()
  }, 300)
}

export function useToastStore(): ToastData[] {
  return React.useSyncExternalStore(
    cb => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => _state,
    () => EMPTY,
  )
}

export function useToast() {
  return {
    toast: (data: Omit<ToastData, "id" | "open"> | string) =>
      addToast(typeof data === "string" ? { title: data } : data),
    dismiss: startDismiss,
  }
}

/** Imperative API for use outside React components. */
export const toast = Object.assign(
  (data: Omit<ToastData, "id" | "open"> | string) =>
    addToast(typeof data === "string" ? { title: data } : data),
  {
    success: (title: string, opts?: Partial<Omit<ToastData, "id" | "open" | "title" | "variant">>) =>
      addToast({ title, variant: "success", ...opts }),
    warning: (title: string, opts?: Partial<Omit<ToastData, "id" | "open" | "title" | "variant">>) =>
      addToast({ title, variant: "warning", ...opts }),
    error: (title: string, opts?: Partial<Omit<ToastData, "id" | "open" | "title" | "variant">>) =>
      addToast({ title, variant: "destructive", ...opts }),
    info: (title: string, opts?: Partial<Omit<ToastData, "id" | "open" | "title" | "variant">>) =>
      addToast({ title, variant: "info", ...opts }),
  },
)
