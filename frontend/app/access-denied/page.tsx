"use client"

import { useEffect } from "react"
import { AlertTriangle } from "lucide-react"
import { removeAuthCookie, removeStoredUser } from "@/config/auth/auth"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AutoCloseCountdown } from "@/components/common/navigation/auto-close-countdown"
import { StarsBackground } from "@/components/common/effects/stars-background"
import { MouseReflection } from "@/components/common/effects/mouse-reflection"

// Textos locales para la página de acceso denegado
const ACCESS_DENIED_TEXT = {
  title: "Acceso Denegado",
  description: "No tienes permiso para acceder a esta página. Su sesión ha sido cerrada por seguridad.",
  redirectMessage: "Esta ventana se cerrará automáticamente en",
}

export default function AccessDeniedPage() {
  useEffect(() => {
    // Desloguear al usuario inmediatamente
    removeAuthCookie()
    removeStoredUser()
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      {/* Stars Background */}
      <StarsBackground colors={["destructive", "white"]} />
      {/* Mouse Reflection Effect */}
      <MouseReflection />
      {/*<div className="absolute inset-0 bg-gradient-to-br from-destructive/10 via-background to-background" />*/}
      <Card className="relative w-full max-w-md border-destructive/50 bg-background/60 backdrop-blur-xl">
        <CardHeader className="space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/20">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-center text-2xl font-bold text-destructive">{ACCESS_DENIED_TEXT.title}</CardTitle>
          <CardDescription className="text-center">{ACCESS_DENIED_TEXT.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <AutoCloseCountdown
            seconds={5}
            message={ACCESS_DENIED_TEXT.redirectMessage}
            variant="destructive"
            showCloseButton={false}
          />
        </CardContent>
      </Card>
    </div>
  )
}
