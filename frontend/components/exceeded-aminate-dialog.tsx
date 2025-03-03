"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertCircle } from "lucide-react"

interface ExceededAttemptsDialogProps {
  readonly isOpen: boolean
  readonly onClose: () => void
}

export function ExceededAttemptsDialog({ isOpen, onClose }: ExceededAttemptsDialogProps) {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (isOpen) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            window.close()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background/95 backdrop-blur-sm border-destructive/20">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/20 text-destructive">
            <AlertCircle className="h-6 w-6" />
          </div>
          <DialogTitle className="text-center text-xl font-semibold">Maximum Attempts Exceeded</DialogTitle>
          <DialogDescription className="text-center">
            For security reasons, the browser will close in {countdown} seconds.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
