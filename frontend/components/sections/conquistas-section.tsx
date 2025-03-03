
import { memo, ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Rocket, Star, Sparkles } from "lucide-react"

interface ConquistaCard {
  icon: ReactNode
  title: string
  description: string
}

const conquistas: ConquistaCard[] = [
  {
    icon: <Star className="h-6 w-6 text-purple-400" />,
    title: "Explorador Cósmico",
    description: "Desbloqueá insignias especiales al completar misiones y desafíos en diferentes tecnologías",
  },
  {
    icon: <Rocket className="h-6 w-6 text-pink-400" />,
    title: "Piloto Intergaláctico",
    description: "Alcanzá nuevos niveles y rangos que demuestran tu experiencia en el universo tech",
  },
  {
    icon: <Sparkles className="h-6 w-6 text-indigo-400" />,
    title: "Y mucho más",
    description: "Descubrí todas las sorpresas y recompensas que te esperan en tu viaje",
  },
]

export const ConquistasSection = memo(function ConquistasSection() {
  return (
    <section className="py-20" id="conquistas">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Tus Conquistas Estelares</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Cada insignia que vas a conseguir, demuestra tu progreso y genera nuevas oportunidades
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {conquistas.map((conquista) => (
            <Card
              key={conquista.title}
              className="group relative overflow-hidden border-purple-900/20 bg-purple-900/10 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-900/20">
                  {conquista.icon}
                </div>
                <h3 className="text-xl font-medium text-white mb-2">{conquista.title}</h3>
                <p className="text-gray-400">{conquista.description}</p>
                <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-gradient-to-br from-purple-600/20 to-transparent opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
})
