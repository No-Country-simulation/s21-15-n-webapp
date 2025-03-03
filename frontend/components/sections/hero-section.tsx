"use client"

import { Button } from "@/components/ui/button"
import { memo } from "react"
import { useRandomStars } from "@/hooks/use-random-stars"
import { useNavigation } from "@/hooks/use-navigation"

export const HeroSection = memo(function HeroSection() {
  const stars = useRandomStars(50)
  const { navigateToPage } = useNavigation(50)

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden py-32" id="hero">
      {/* Stars Background */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute inline-flex animate-pulse ${star.color}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `pulse ${star.duration}s infinite`,
            }}
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-full w-full rounded-full bg-primary" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="container relative px-4 text-center">
        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
          Gana{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">experiencia</span>,
          valida tus{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">habilidades</span> y{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">desbloquea</span> tu
          futuro
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-400">
          Regístrate como cadete en StartPerks y comienza tu aventura intergaláctica. Acumula puntos, desbloquea
          mentorías y conquista cada desafío para elevar tu carrera en tecnología
        </p>
        <Button
          size="lg"
          className="mt-10 bg-gradient-to-r from-primary to-accent text-lg text-white hover:from-primary/90 hover:to-accent/90"
          onClick={() => navigateToPage("/register")}
        >
          Únete y empieza a ganar puntos
        </Button>
      </div>
    </section>
  )
})

