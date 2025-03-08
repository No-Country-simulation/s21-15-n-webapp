"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { LockIcon } from "lucide-react"
import { memo, useState } from "react"
import { PinInput } from "./pin-input"
import { ExceededAttemptsDialog } from "./exceeded-attempts-dialog"
import { AUTH_CONFIG } from "@/lib/constants/app-config"

// Textos locales para el overlay de bloqueo
const LOCK_OVERLAY_TEXT = {
  title: "Sesión Bloqueada",
  description: "Ingresa tu PIN para desbloquear la sesión",
  invalidPin: "PIN inválido",
  attemptsRemaining: "intentos restantes",
}

interface LockOverlayProps {
  onUnlock: () => void
  pinRequired?: boolean
  correctPin?: string
}

export const LockOverlay = memo(function LockOverlay({
  onUnlock,
  pinRequired = false,
  correctPin = "",
}: LockOverlayProps) {
  const [error, setError] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [showExceededDialog, setShowExceededDialog] = useState(false)
  const MAX_ATTEMPTS = AUTH_CONFIG.maxLoginAttempts

  const handlePinComplete = (pin: string) => {
    if (pinRequired && correctPin) {
      if (pin === correctPin) {
        setError("")
        onUnlock()
      } else {
        const newAttempts = attempts + 1
        setAttempts(newAttempts)

        if (newAttempts >= MAX_ATTEMPTS) {
          setShowExceededDialog(true)
        } else {
          setError(
            `${LOCK_OVERLAY_TEXT.invalidPin}. ${MAX_ATTEMPTS - newAttempts} ${LOCK_OVERLAY_TEXT.attemptsRemaining}.`,
          )
        }
      }
    } else {
      onUnlock()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <Card className="w-full max-w-md bg-black/30 border-primary/20">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
            <LockIcon className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl text-white">{LOCK_OVERLAY_TEXT.title}</CardTitle>
          <CardDescription className="text-gray-400">{LOCK_OVERLAY_TEXT.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <PinInput onComplete={handlePinComplete} onClear={() => setError("")} />
          {error && <p className="text-sm text-center text-destructive">{error}</p>}
        </CardContent>
      </Card>

      <ExceededAttemptsDialog isOpen={showExceededDialog} onClose={() => setShowExceededDialog(false)} />
    </div>
  )
})

