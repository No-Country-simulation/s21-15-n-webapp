import { memo } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const BENEFITS = [
  {
    title: "Para Cadetes (Juniors)",
    description:
      "Iniciá tu entrenamiento intergaláctico. Adquirí habilidades, armá tu portafolio y desbloqueá mentorías exclusivas para navegar el universo tecnológico.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fotograf%C3%ADa%20realista%20y%20profesional%20de%20un%20joven%20profesional%20en%20un%20entorno%20moderno%20de%20coworking%2C%20iluminado%20suavemente.%20Agregar%20un%20overlay%20sutil%20con%20efecto%20de%20nebulosa%20y%20destellos%20de%20estrellas%20en%20tonos%20azul%20y%20morado%20pa-gtv0SkOJNzasGbjTbUXZUUotUHWdHx.png",
    imagePosition: "right",
  },
  {
    title: "Para Espaciales (Startups)",
    description:
      "Descubrí cadetes con talento probado. Identificá a futuros líderes que ya han demostrado su capacidad en cada misión.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%204631-lfZfDPItiQz5lBfGWzcZF5BQj1e5nY.png",
    imagePosition: "left",
  },
  {
    title: "Para Comandantes (Mentores)",
    description:
      "Guiá a la próxima generación de exploradores. Compartí tu experiencia, obtené reconocimiento y accedé a beneficios exclusivos.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%204632-zF0ZO609nmX8Wmxt4m45g7SZg6mno3.png",
    imagePosition: "right",
  },
]

export const Benefits = memo(function Benefits() {
  return (
    <section className="py-24 bg-[#020817]" id="beneficios">
      <div className="container px-4">
        <h2 className="mb-16 text-center text-4xl font-bold text-white">Beneficios</h2>

        <div className="space-y-24">
          {BENEFITS.map((benefit, index) => (
            <div key={benefit.title} className="grid gap-8 md:grid-cols-2 items-center">
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

