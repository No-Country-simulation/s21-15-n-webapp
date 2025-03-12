import { memo } from "react"
import { LANDING_CONFIG } from "@/config/constants/landing.config"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Rocket, Sparkles } from "lucide-react"

export const StellarConquestsSection = memo(function ConquistasSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Rocket":
        return <Rocket className="h-6 w-6 text-primary" />
      case "Star":
        return <Star className="h-6 w-6 text-primary" />
      case "Sparkles":
        return <Sparkles className="h-6 w-6 text-primary" />
      default:
        return <Rocket className="h-6 w-6 text-primary" />
    }
  }
  return (
    <section className="py-20 bg-background" id="conquistas">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">{LANDING_CONFIG.stellarConquests.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{LANDING_CONFIG.stellarConquests.description}</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {LANDING_CONFIG.stellarConquests.items.map((conquista) => (
            <Card key={conquista.id} className="group glass-card">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                  {getIcon(conquista.icon)}
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
