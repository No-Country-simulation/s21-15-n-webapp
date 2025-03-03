"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { LockIcon } from "lucide-react"
import { memo, useState } from "react"
//import { ExceededAttemptsDialog } from "./exceeded-attempts-dialog"
import { PinInput } from "./pin-input"
import { ExceededAttemptsDialog } from "./exceeded-aminate-dialog"

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
  const MAX_ATTEMPTS = 3

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
          setError(`Invalid PIN. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`)
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
          <CardTitle className="text-xl text-white">Session Locked</CardTitle>
          <CardDescription className="text-gray-400">Enter your PIN to unlock the session</CardDescription>
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
