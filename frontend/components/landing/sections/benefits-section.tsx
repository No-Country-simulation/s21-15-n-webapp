import { memo } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Benefit } from "@/config/types/landing"

const BENEFITS: Benefit[] = [
  {
    id: "1",
    title: "Para Cadetes (Juniors)",
    description:
      "Inicia tu entrenamiento intergalactico. Adquirí habilidades, arma tu portafolio y desbloquea mentorias exclusivas para navegar el universo tecnologico.",
    image:
      "/bene1.png",
    imagePosition: "right",
  },
  {
    id: "2",
    title: "Para Espaciales (Startups)",
    description:
      "Descubri cadetes con talento probado. Identifica a futuros lideres que ya han demostrado su capacidad en cada misión.",
    image:
      "/bene2.png",
    imagePosition: "left",
  },
  {
    id: "3",
    title: "Para Comandantes (Mentores)",
    description:
      "Guia a la próxima generación de exploradores. Compartí tu experiencia, obtene reconocimiento y accede a beneficios exclusivos.",
    image:
      "/bene3.png",
    imagePosition: "right",
  },
]

export const BenefitsSection = memo(function Benefits() {
  return (
    <section className="py-24 bg-backgraund" id="beneficios">
      <div className="container px-4">
        <h2 className="mb-16 text-center text-4xl font-bold text-white">Beneficios</h2>

        <div className="space-y-24">
          {BENEFITS.map((benefit: Benefit) => (
            <div key={benefit.id} className="grid gap-8 md:grid-cols-2 items-center">
              <div className={cn("space-y-4", benefit.imagePosition === "right" ? "md:order-1" : "md:order-2")}>
                <h3 className="text-2xl font-bold text-white">{benefit.title}</h3>
                <p className="text-lg text-gray-300">{benefit.description}</p>
              </div>

              <div
                className={cn(
                  "relative aspect-[16/9] overflow-hidden rounded-2xl",
                  benefit.imagePosition === "right" ? "md:order-2" : "md:order-1",
                )}
              >
                <Image
                  src={benefit.image || "/placeholder.svg"}
                  alt={benefit.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})
