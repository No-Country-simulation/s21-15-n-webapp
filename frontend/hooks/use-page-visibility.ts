"use client"

import { useState, useEffect, useCallback } from "react"

export interface VisibilityOptions {
  onVisibilityChange?: (isVisible: boolean) => void
  onLock?: () => void
  onUnlock?: () => void
  initialTitle?: string
  lockedTitle?: string
  autoLock?: boolean
  lockTimeout?: number
}

export function usePageVisibility({
  onVisibilityChange,
  onLock,
  onUnlock,
  initialTitle = document.title,
  lockedTitle = "🔒 Página Bloqueada - Regresa para desbloquear",
  autoLock = true,
  lockTimeout = 0,
}: VisibilityOptions = {}) {
  const [isVisible, setIsVisible] = useState(true)
  const [wasHidden, setWasHidden] = useState(false)
  const [isLocked, setIsLocked] = useState(false)

  const handleVisibilityChange = useCallback(() => {
    const newVisibilityState = !document.hidden
    setIsVisible(newVisibilityState)
    onVisibilityChange?.(newVisibilityState)

    if (document.hidden && autoLock) {
      if (lockTimeout > 0) {
        setTimeout(() => {
          setWasHidden(true)
          setIsLocked(true)
          document.title = lockedTitle
          onLock?.()
        }, lockTimeout)
      } else {
        setWasHidden(true)
        setIsLocked(true)
        document.title = lockedTitle
        onLock?.()
      }
    } else {
      document.title = initialTitle
    }
  }, [autoLock, initialTitle, lockedTitle, lockTimeout, onLock, onVisibilityChange])

  const handleUnlock = useCallback(() => {
    setWasHidden(false)
    setIsLocked(false)
    document.title = initialTitle
    onUnlock?.()
  }, [initialTitle, onUnlock])

  const lockPage = useCallback(() => {
    setIsLocked(true)
    setWasHidden(true)
    document.title = lockedTitle
    onLock?.()
  }, [lockedTitle, onLock])

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      document.title = initialTitle
    }
  }, [handleVisibilityChange, initialTitle])

  return {
    isVisible,
    wasHidden,
    isLocked,
    handleUnlock,
    lockPage,
  }
}

