"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Textos locales para el componente de cuenta regresiva
const COUNTDOWN_TEXT = {
  defaultMessage: "Cerrando en",
  closeButtonText: "Cerrar ahora",
  seconds: "segundos",
}

// Clases de texto según el tipo de variante
const TEXT_CLASSES = {
  destructive: "text-destructive",
  link: "text-link",
  outline: "text-outline",
  secondary: "text-secondary",
  ghost: "text-ghost",
  default: "text-foreground",
}

type variantType = "default" | "destructive" | "link" | "outline" | "secondary" | "ghost"

interface AutoCloseCountdownProps {
  readonly seconds: number
  readonly message?: string
  readonly variant?: variantType
  readonly onComplete?: () => void
  readonly showCloseButton?: boolean
  readonly closeButtonText?: string
}

export function AutoCloseCountdown({
  seconds,
  message = COUNTDOWN_TEXT.defaultMessage,
  variant = "default",
  onComplete,
  showCloseButton = true,
  closeButtonText = COUNTDOWN_TEXT.closeButtonText,
}: AutoCloseCountdownProps) {
  const [countdown, setCountdown] = useState(seconds)

  const handleCloseWindow = useCallback(() => {
    if (window.opener) {
      window.close()
    } else {
      alert("Por favor, cierre esta ventana manualmente.")
    }
    onComplete?.()
  }, [onComplete])

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleCloseWindow()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [handleCloseWindow])

  const getTextColorClass = useCallback(() => {
    return TEXT_CLASSES[variant] ?? TEXT_CLASSES.default
  }, [variant])

  return (
    <div className="space-y-4">
      <p className="text-center text-muted-foreground">
        {message} <span className={cn("font-bold", getTextColorClass())}>{countdown}</span> {COUNTDOWN_TEXT.seconds}.
      </p>

      {showCloseButton && (
        <Button variant={variant === "default" ? "default" : variant} className="w-full" onClick={handleCloseWindow}>
          {closeButtonText}
        </Button>
      )}
    </div>
  )
}
