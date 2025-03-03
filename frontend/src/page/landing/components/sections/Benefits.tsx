import { memo } from "react"
import { cn } from "../../../../lib/utils"

interface BenefitProps {
  title: string
  description: string
  image: string
  imagePosition?: "left" | "right"
}

const benefits: BenefitProps[] = [
  {
    title: "Para Cadetes (Juniors)",
    description:
      "Iniciá tu entrenamiento intergaláctico. Adquirí habilidades, armá tu portafolio y desbloqueá mentorías exclusivas para navegar el universo tecnológico.",
    image: "/placeholder.svg?height=400&width=600",
    imagePosition: "right",
  },
  {
    title: "Para Espaciales (Startups)",
    description:
      "Descubrí cadetes con talento probado. Identificá a futuros líderes que ya han demostrado su capacidad en cada misión.",
    image: "/placeholder.svg?height=400&width=600",
    imagePosition: "left",
  },
  {
    title: "Para Comandantes (Mentores)",
    description:
      "Guiá a la próxima generación de exploradores. Compartí tu experiencia, obtené reconocimiento y accedé a beneficios exclusivos.",
    image: "/placeholder.svg?height=400&width=600",
    imagePosition: "right",
  },
]

const BenefitCard = memo(function BenefitCard({ title, description, image, imagePosition = "right" }: BenefitProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-background p-8">
      <div
        className={cn(
          "grid gap-8",
          imagePosition === "right" ? "md:grid-cols-[1fr,1.5fr]" : "md:grid-cols-[1.5fr,1fr]",
        )}
      >
        <div
          className={cn(
            "flex flex-col justify-center space-y-4",
            imagePosition === "right" ? "md:order-1" : "md:order-2",
          )}
        >
          <h3 className="text-2xl font-bold text-white md:text-3xl">{title}</h3>
          <p className="text-lg text-gray-400">{description}</p>
        </div>

        <div
          className={cn(
            "relative aspect-[4/3] overflow-hidden rounded-xl",
            imagePosition === "right" ? "md:order-2" : "md:order-1",
          )}
        >
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-transparent" />
        </div>
      </div>

      <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-gradient-to-br from-cyan-500/20 to-transparent opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  )
})

export const Benefits = memo(function Benefits() {
  return (
    <section className="py-24" id="beneficios">
      <div className="container px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Beneficios</h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            Descubrí las ventajas de formar parte de nuestra comunidad galáctica
          </p>
        </div>

        <div className="space-y-8">
          {benefits.map((benefit) => (
            <BenefitCard key={benefit.title} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  )
})
