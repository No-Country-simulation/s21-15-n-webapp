import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import type { User } from "@/lib/types"

// Textos locales para el componente
const ADVENTURE_TEXT = {
  tuAventuraEspacial: "Tu aventura espacial",
  verMas: "Ver mas",
  xp: "XP",
}

interface AdventureCardProps {
  user: User
}

export function AdventureCard({ user }: AdventureCardProps) {
  // En un caso real, estos datos vendrían de una API o del estado del usuario
  const currentXP = 66
  const maxXP = 100
  const progressPercentage = (currentXP / maxXP) * 100

  return (
    <Card className="border-primary/20 bg-[#0a0b1e]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium text-white">{ADVENTURE_TEXT.tuAventuraEspacial}</CardTitle>
        <Button variant="link" className="text-indigo-400 p-0 h-auto">
          {ADVENTURE_TEXT.verMas}
        </Button>
      </CardHeader>
      <CardContent>
        {/* Barra de progreso */}
        <div className="mb-6">
          <Progress value={progressPercentage} className="h-2 bg-indigo-900/30" indicatorClassName="bg-indigo-500" />
          <div className="mt-1 text-xs text-gray-400 text-right">
            {currentXP}/{maxXP} {ADVENTURE_TEXT.xp}
          </div>
        </div>

        {/* Mapa de aventura */}
        <div className="relative h-48 w-full">
          <div className="absolute inset-0 flex items-center justify-between px-8">
            {/* Planetas */}
            {[1, 2, 3, 4, 5].map((planet) => (
              <div key={planet} className="relative">
                <Image
                  src="/placeholder.svg?height=60&width=60"
                  alt={`Planeta ${planet}`}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                {/* Línea conectora entre planetas */}
                {planet < 5 && (
                  <div className="absolute top-1/2 left-full h-0.5 w-16 bg-gradient-to-r from-indigo-500 to-transparent" />
                )}
                {/* Estrellas decorativas */}
                <div className="absolute -top-4 -right-2 h-2 w-2 rounded-full bg-yellow-400" />
                <div className="absolute -bottom-2 -left-1 h-1 w-1 rounded-full bg-indigo-400" />
              </div>
            ))}
          </div>

          {/* Estrellas de fondo */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-white"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.7 + 0.3,
                }}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

