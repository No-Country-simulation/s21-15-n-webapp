"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useRandomStars } from "@/hooks/use-random-stars"
import { LANDING_CONFIG } from "@/config/constants/landing.config"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const router = useRouter()
  const { description, ctaText } = LANDING_CONFIG.hero
  const stars = useRandomStars(100)
  const [starOpacities, setStarOpacities] = useState<{ [key: number]: number }>({})

  // Effect to animate star opacities independently
  useEffect(() => {
    const opacityIntervals: NodeJS.Timeout[] = []

    stars.forEach((star) => {
      // Set initial opacity
      setStarOpacities((prev) => ({
        ...prev,
        [star.id]: star.opacity,
      }))

      // Create interval for each star to change opacity
      const interval = setInterval(() => updateStarOpacity(star), 1000 + Math.random() * 2000) // Random interval between 1-3 seconds

      opacityIntervals.push(interval)
    })

    // Cleanup intervals
    return () => {
      opacityIntervals.forEach((interval) => clearInterval(interval))
    }
  }, [stars])

  const updateStarOpacity = (star: { id: number; opacity: number }) => {
    setStarOpacities((prev) => {
      // Random opacity between 0.1 and the star's max opacity
      const newOpacity = 0.1 + Math.random() * (star.opacity - 0.1)
      return {
        ...prev,
        [star.id]: newOpacity,
      }
    })
  }

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden py-32 bg-background"
      id="inicio"
    >
      {/* Stars Background - Contained within the hero section */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute inline-flex"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: starOpacities[star.id] || star.opacity,
              transition: "opacity 1.5s ease-in-out",
              color: star.color,
            }}
          >
            <span className="relative inline-flex h-full w-full rounded-full bg-primary" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="container relative px-4 text-center justify-center">
        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
          {LANDING_CONFIG.hero.title.section1}<span className="text-gradient-2"> {LANDING_CONFIG.hero.title.section2}</span>{LANDING_CONFIG.hero.title.section3}
          <span className="text-gradient"> {LANDING_CONFIG.hero.title.section4}</span> {LANDING_CONFIG.hero.title.section5}<span className="text-gradient-end"> {LANDING_CONFIG.hero.title.section6}</span>{LANDING_CONFIG.hero.title.section7}
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground text-pretty">{description}</p>
        <Button size="lg" className="btn-magenta mt-10 text-lg" onClick={() => router.push("/register")}>
          {ctaText}
        </Button>
      </div>
    </section>
  )
}
