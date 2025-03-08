"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BadgeCheck } from "lucide-react"
import Image from "next/image"
import { StarsBackground } from "@/components/ui/stars-background"

// Certificate data
const CERTIFICATES = [
  {
    id: "cert-001",
    title: "Frontend Development Mastery",
    description: "Dominio completo de tecnologías frontend modernas incluyendo React, Next.js y TailwindCSS",
    image: "/placeholder.svg?height=200&width=350",
    level: "Avanzado",
    duration: "120 horas",
    skills: ["React", "Next.js", "TailwindCSS", "TypeScript", "Responsive Design"],
    popular: true,
    category: "Desarrollo Frontend",
  },
  {
    id: "cert-002",
    title: "UX/UI Design Fundamentals",
    description:
      "Fundamentos de diseño de experiencia de usuario e interfaces con enfoque en usabilidad y accesibilidad",
    image: "/placeholder.svg?height=200&width=350",
    level: "Intermedio",
    duration: "80 horas",
    skills: ["Figma", "Adobe XD", "Wireframing", "Prototyping", "User Research"],
    popular: false,
    category: "Diseño UX/UI",
  },
  {
    id: "cert-003",
    title: "Backend Development with Node.js",
    description: "Desarrollo de APIs y servicios backend escalables utilizando Node.js y bases de datos modernas",
    image: "/placeholder.svg?height=200&width=350",
    level: "Intermedio",
    duration: "100 horas",
    skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "API Design", "Authentication"],
    popular: true,
    category: "Desarrollo Backend",
  },
  {
    id: "cert-004",
    title: "DevOps & Cloud Engineering",
    description: "Implementación de prácticas DevOps y despliegue de aplicaciones en entornos cloud",
    image: "/placeholder.svg?height=200&width=350",
    level: "Avanzado",
    duration: "150 horas",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Infrastructure as Code"],
    popular: false,
    category: "DevOps & Cloud",
  },
  {
    id: "cert-005",
    title: "Data Science Fundamentals",
    description: "Fundamentos de ciencia de datos, análisis y visualización con Python",
    image: "/placeholder.svg?height=200&width=350",
    level: "Principiante",
    duration: "90 horas",
    skills: ["Python", "Pandas", "NumPy", "Data Visualization", "Statistics"],
    popular: false,
    category: "Ciencia de Datos",
  },
  {
    id: "cert-006",
    title: "Mobile App Development",
    description: "Desarrollo de aplicaciones móviles multiplataforma con React Native",
    image: "/placeholder.svg?height=200&width=350",
    level: "Intermedio",
    duration: "110 horas",
    skills: ["React Native", "JavaScript", "Mobile UI/UX", "App Store Deployment"],
    popular: true,
    category: "Desarrollo Móvil",
  },
]

// Categories for filtering
const CATEGORIES = [
  "Todos",
  "Desarrollo Frontend",
  "Desarrollo Backend",
  "Diseño UX/UI",
  "DevOps & Cloud",
  "Ciencia de Datos",
  "Desarrollo Móvil",
]

export default function ExploreCertificatesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Stars Background */}
      <StarsBackground />
      <main className="container mx-auto px-4 pt-4 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Explorar Certificados</h1>
          <p className="text-muted-foreground">Descubre todos los certificados disponibles en StartPerks</p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={category === "Todos" ? "default" : "outline"}
              className={category === "Todos" ? "bg-primary text-white" : "border-primary/20 text-white"}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Certificates Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATES.map((cert) => (
            <Card key={cert.id} className="group glass-card overflow-hidden border-primary/20">
              <div className="relative h-48">
                <Image
                  src={cert.image || "/placeholder.svg"}
                  alt={cert.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                {cert.popular && <Badge className="absolute top-3 right-3 bg-primary text-white">Popular</Badge>}
                <div className="absolute bottom-3 left-3 flex items-center">
                  <BadgeCheck className="h-5 w-5 text-primary mr-2" />
                  <span className="text-white font-medium">{cert.level}</span>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="mb-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {cert.category}
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{cert.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{cert.description}</p>
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="text-primary font-medium">Duración:</span> {cert.duration}
                  </p>
                </div>
                <div className="mb-4 flex flex-wrap gap-2">
                  {cert.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="outline" className="bg-primary/10 text-primary">
                      {skill}
                    </Badge>
                  ))}
                  {cert.skills.length > 3 && (
                    <Badge variant="outline" className="bg-primary/5">
                      +{cert.skills.length - 3}
                    </Badge>
                  )}
                </div>
                <Button className="w-full btn-magenta">Ver Detalles</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

