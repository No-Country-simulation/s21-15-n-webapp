import { memo } from "react"

export const HowItWorks = memo(function HowItWorks() {
  return (
    <section className="py-20" id="como-funciona">
      <div className="container px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">Cómo Funciona</h2>
        <div className="grid gap-12 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <p className="text-lg text-gray-400">
              El sistema de puntos y logros recompensa tus esfuerzos de forma divertida. Al completar tareas o alcanzar
              objetivos, ganarás puntos que puedes acumular para desbloquear premios y niveles. Es una forma emocionante
              de motivarte y mostrar tu progreso.
            </p>
          </div>
            <div className="relative aspect-video overflow-hidden rounded-lg border border-gray-800">
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="Cómo funciona StartPerks"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
        </div>
      </div>
    </section>
  )
})
