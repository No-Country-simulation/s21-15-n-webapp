"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BadgeCheck } from "lucide-react"
import { StarsBackground } from "@/components/ui/stars-background"

// Certificate category data
const CERTIFICATE_CATEGORIES = [
  {
    title: "Desarrollo Frontend",
    description: "Certificaciones en React, Next.js, Angular y más",
    icon: <BadgeCheck className="h-6 w-6 text-primary" />,
    count: 12,
    popular: true,
  },
  {
    title: "Desarrollo Backend",
    description: "Node.js, Python, Java y bases de datos",
    icon: <BadgeCheck className="h-6 w-6 text-primary" />,
    count: 8,
    popular: false,
  },
  {
    title: "Diseño UX/UI",
    description: "Figma, Adobe XD, principios de diseño",
    icon: <BadgeCheck className="h-6 w-6 text-primary" />,
    count: 6,
    popular: true,
  },
  {
    title: "DevOps & Cloud",
    description: "Docker, Kubernetes, AWS, Azure",
    icon: <BadgeCheck className="h-6 w-6 text-primary" />,
    count: 9,
    popular: false,
  },
  {
    title: "Ciencia de Datos",
    description: "Python, R, Machine Learning, Visualización",
    icon: <BadgeCheck className="h-6 w-6 text-primary" />,
    count: 7,
    popular: true,
  },
  {
    title: "Desarrollo Móvil",
    description: "React Native, Flutter, Swift, Kotlin",
    icon: <BadgeCheck className="h-6 w-6 text-primary" />,
    count: 5,
    popular: false,
  },
  {
    title: "Project Manager",
    description: "Metodologías ágiles, Scrum, gestión de proyectos",
    icon: <BadgeCheck className="h-6 w-6 text-primary" />,
    count: 8,
    popular: true,
  },
  {
    title: "Quality Assurance",
    description: "Testing, automatización, control de calidad",
    icon: <BadgeCheck className="h-6 w-6 text-primary" />,
    count: 6,
    popular: false,
  },
  {
    title: "Tech Lead",
    description: "Liderazgo técnico, arquitectura, mentoring",
    icon: <BadgeCheck className="h-6 w-6 text-primary" />,
    count: 4,
    popular: true,
  },
]

export default function CertificatesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <StarsBackground />
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Certificados StartPerks</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Impulsa tu carrera con certificaciones reconocidas en la industria tech. Demuestra tus habilidades y
              destaca en el universo digital.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="glass-card p-4 text-center">
              <p className="text-3xl font-bold text-primary">50+</p>
              <p className="text-sm text-muted-foreground">Certificaciones</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-3xl font-bold text-primary">10k+</p>
              <p className="text-sm text-muted-foreground">Certificados Emitidos</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-3xl font-bold text-primary">98%</p>
              <p className="text-sm text-muted-foreground">Tasa de Validación</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-3xl font-bold text-primary">200+</p>
              <p className="text-sm text-muted-foreground">Empresas Asociadas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16">
        {/* Categories Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Categorías de Certificados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATE_CATEGORIES.map((category) => (
              <Card key={category.title} className="group glass-card overflow-hidden border-primary/20">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      {category.icon}
                    </div>
                    {category.popular && (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">Popular</span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{category.title}</h3>
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-primary">{category.count} certificados</span>
                    <Button variant="ghost" className="text-primary hover:text-primary/80 p-0 h-auto">
                      Ver más →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
