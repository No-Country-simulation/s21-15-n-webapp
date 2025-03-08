"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertCircle } from "lucide-react"
import { AutoCloseCountdown } from "./auto-close-countdown"

// Textos locales para el diálogo de intentos excedidos
const EXCEEDED_ATTEMPTS_TEXT = {
  title: "Máximo de Intentos Excedidos",
  description: "Por razones de seguridad, el navegador se cerrará en",
}

interface ExceededAttemptsDialogProps {
  isOpen: boolean
  onClose: () => void
  seconds?: number
  title?: string
  description?: string
}

export function ExceededAttemptsDialog({
  isOpen,
  onClose,
  seconds = 5,
  title = EXCEEDED_ATTEMPTS_TEXT.title,
  description = EXCEEDED_ATTEMPTS_TEXT.description,
}: ExceededAttemptsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background/95 backdrop-blur-sm border-destructive/20">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/20 text-destructive">
            <AlertCircle className="h-6 w-6" />
          </div>
          <DialogTitle className="text-center text-xl font-semibold">{title}</DialogTitle>
          <DialogDescription className="text-center">
            <AutoCloseCountdown seconds={seconds} message={description} variant="destructive" showCloseButton={false} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

