"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useRandomStars } from "@/hooks/use-random-stars"
import { UI_CONFIG } from "@/lib/constants/app-config"
import { ROUTES } from "@/lib/constants/routes"
import { MapPin } from "lucide-react"

// Textos locales para la página 404
const NOT_FOUND_TEXT = {
  title: "Página no encontrada",
  description: "La ruta que estás buscando no existe o ha sido movida.",
  redirectMessage: "Serás redirigido a la página principal en",
}

export default function NotFoundPage() {
  const router = useRouter()
  const stars = useRandomStars(UI_CONFIG.maxStars)
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push(ROUTES.HOME)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

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

      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />

      <Card className="relative w-full max-w-md border-primary/20 bg-background/60 backdrop-blur-xl">
        <CardHeader className="space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
            <MapPin className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-center text-2xl font-bold text-primary">{NOT_FOUND_TEXT.title}</CardTitle>
          <CardDescription className="text-center">{NOT_FOUND_TEXT.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            {NOT_FOUND_TEXT.redirectMessage} <span className="font-bold text-primary">{countdown}</span> segundos.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

