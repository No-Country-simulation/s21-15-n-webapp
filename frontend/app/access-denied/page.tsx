"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import { removeAuthCookie, removeStoredUser } from "@/lib/utils/auth"
import { useRandomStars } from "@/hooks/use-random-stars"
import { UI_CONFIG } from "@/lib/constants/app-config"
import { AutoCloseCountdown } from "@/components/auto-close-countdown"

// Textos locales para la página de acceso denegado
const ACCESS_DENIED_TEXT = {
  title: "Acceso Denegado",
  description: "No tienes permiso para acceder a esta página. Su sesión ha sido cerrada por seguridad.",
  redirectMessage: "Esta ventana se cerrará automáticamente en",
}

export default function AccessDeniedPage() {
  const stars = useRandomStars(UI_CONFIG.maxStars)

  useEffect(() => {
    removeAuthCookie()
    removeStoredUser()
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      {/* Stars Background */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute inline-flex animate-pulse ${star.color}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `pulse ${star.duration}s infinite`,
            }}
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-full w-full rounded-full bg-primary" />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 via-background to-background" />

      <Card className="relative w-full max-w-md border-destructive/20 bg-background/60 backdrop-blur-xl">
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
