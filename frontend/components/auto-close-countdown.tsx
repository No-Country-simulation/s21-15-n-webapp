"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Textos locales para el componente de cuenta regresiva
const COUNTDOWN_TEXT = {
  defaultMessage: "Cerrando en",
  closeButtonText: "Cerrar ahora",
  seconds: "segundos",
}

interface AutoCloseCountdownProps {
  seconds: number
  message?: string
  variant?: "default" | "destructive" | "primary"
  onComplete?: () => void
  showCloseButton?: boolean
  closeButtonText?: string
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

  useEffect(() => {
    // Iniciar cuenta regresiva
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          // Intentar cerrar la ventana del navegador
          window.close()
          // Ejecutar callback si existe
          onComplete?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [onComplete])

  const handleCloseWindow = () => {
    window.close()
    onComplete?.()
  }

  const getTextColorClass = () => {
    switch (variant) {
      case "destructive":
        return "text-destructive"
      case "primary":
        return "text-primary"
      default:
        return "text-foreground"
    }
  }

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

