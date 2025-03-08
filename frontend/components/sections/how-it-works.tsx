import { memo } from "react"
import { Card } from "@/components/ui/card"
import { Rocket, Target, Award } from "lucide-react"

const FEATURES = [
  {
    icon: <Rocket className="h-8 w-8 text-primary" />,
    title: "Gana puntos de experiencia",
    description: "Completa tareas, colabora con otros y recibe evaluaciones para acumular puntos",
  },
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: "Participa",
    description: "Desafía tus límites completando misiones y acumulando puntos en cada travesía",
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: "Avanza",
    description: "Accede a mentorías exclusivas y conviértete en un explorador galáctico en el universo tech",
  },
]

export const HowItWorks = memo(function HowItWorks() {
  return (
    <section className="py-24 relative" id="como-funciona">
      <div className="container px-4">
        <h2 className="mb-16 text-center text-3xl font-bold text-white md:text-4xl">
          Cómo Funciona
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <Card 
              key={feature.title} 
              className="group glass-card"
            >
              <div className="p-8 relative z-10">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  {feature.icon}
                </div>
                <h3 className="mb-4 text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
              
              {/* Hover effect */}
              <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-gradient-to-br from-primary/20 to-transparent opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}\

