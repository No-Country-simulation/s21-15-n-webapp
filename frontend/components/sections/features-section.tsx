"use client"

import { Card } from "@/components/ui/card"
import { LANDING_CONFIG } from "@/lib/config/landing.config"
import { Rocket, Target, Award } from "lucide-react"

export function FeaturesSection() {
  // Función para obtener el ícono correcto basado en el nombre
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Rocket":
        return <Rocket className="h-8 w-8 text-primary" />
      case "Target":
        return <Target className="h-8 w-8 text-primary" />
      case "Award":
        return <Award className="h-8 w-8 text-primary" />
      default:
        return <Rocket className="h-8 w-8 text-primary" />
    }
  }

  return (
    <section className="py-24 relative bg-background" id="como-funciona">
      <div className="container px-4">
        <h2 className="mb-16 text-center text-3xl font-bold text-white md:text-4xl">Cómo Funciona</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {LANDING_CONFIG.features.map((feature) => (
            <Card key={feature.title} className="group glass-card">
              <div className="p-8 relative z-10">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  {getIcon(feature.icon)}
                </div>
                <h3 className="mb-4 text-xl font-semibold text-white">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>

              {/* Hover effect */}
              <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-gradient-to-br from-primary/20 to-transparent opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

