import { memo } from "react"

interface BenefitCardProps {
  title: string
  description: string
  image: string
}

const BenefitCard = memo(function BenefitCard({ title, description, image }: BenefitCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-800 bg-black/50 p-6">
      <div className="relative z-10">
        <h3 className="mb-3 text-xl font-semibold text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
      <div className="relative mt-6 aspect-video overflow-hidden rounded-lg">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-gradient-to-br from-purple-600/20 to-transparent opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
    </div>
  )
})

const benefits = [
  {
    title: "Para Juniors",
    description: "Gana experiencia práctica y créditos. Cada simulación es una oportunidad para aprender y crecer.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Para Startups",
    description:
      "Encuentra talento validado y listo para integrar equipos. Los juniors con más puntos destacan por sus competencias y habilidades.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Para Mentores",
    description:
      "Obtené reconocimiento y acceso a incentivos exclusivos. Comparte tu experiencia y ayuda a formar a la próxima generación de profesionales.",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export const Benefits = memo(function Benefits() {
  return (
    <section className="py-20" id="beneficios">
      <div className="container px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">Beneficios</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <BenefitCard key={benefit.title} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  )
})
