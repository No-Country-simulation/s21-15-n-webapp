import { memo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Rocket, Sparkles } from "lucide-react"

const CONQUISTAS = [
  {
    icon: <Star className="h-6 w-6 text-primary" />,
    title: "Explorador Cósmico",
    description: "Desbloqueá insignias especiales al completar misiones y desafíos en diferentes tecnologías",
  },
  {
    icon: <Rocket className="h-6 w-6 text-primary" />,
    title: "Piloto Intergaláctico",
    description: "Alcanzá nuevos niveles y rangos que demuestran tu experiencia en el universo tech",
  },
  {
    icon: <Sparkles className="h-6 w-6 text-primary" />,
    title: "Y mucho más",
    description: "Descubrí todas las sorpresas y recompensas que te esperan en tu viaje",
  },
]

export const ConquistasSection = memo(function ConquistasSection() {
  return (
    <section className="py-20 bg-background" id="conquistas">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Tus Conquistas Estelares</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cada insignia que vas a conseguir, demuestra tu progreso y genera nuevas oportunidades
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {CONQUISTAS.map((conquista) => (
            <Card key={conquista.title} className="group glass-card">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                  {conquista.icon}
                </div>
                <h3 className="text-xl font-medium text-white mb-2">{conquista.title}</h3>
                <p className="text-muted-foreground">{conquista.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
})

