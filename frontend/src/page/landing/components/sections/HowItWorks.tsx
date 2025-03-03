import { memo } from "react"
import { Card, CardContent } from "../../../../components/ui/card"
import { Rocket, Target, Award } from "lucide-react"

const features = [
  {
    icon: <Rocket className="h-8 w-8 text-indigo-400" />,
    title: "Gana puntos de experiencia",
    description: "Completa tareas, colabora con otros y recibe evaluaciones para acumular puntos",
  },
  {
    icon: <Target className="h-8 w-8 text-fuchsia-400" />,
    title: "Participa",
    description: "Desafía tus límites completando misiones y acumulando puntos en cada travesía",
  },
  {
    icon: <Award className="h-8 w-8 text-violet-400" />,
    title: "Avanza",
    description: "Accede a mentorías exclusivas y conviértete en un explorador galáctico en el universo tech",
  },
]

export const HowItWorks = memo(function HowItWorks() {
  return (
    <section className="py-24 bg-[#0A061E]" id="como-funciona">
      <div className="container px-4">
        <h2 className="mb-16 text-center text-3xl font-bold text-white md:text-4xl">Cómo Funciona</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="group relative overflow-hidden border-none bg-[#13102B] shadow-lg">
              <CardContent className="p-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1E1B3F]">
                  {feature.icon}
                </div>
                <h3 className="mb-4 text-xl font-semibold text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
                <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-gradient-to-br from-indigo-600/20 to-transparent opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
})
