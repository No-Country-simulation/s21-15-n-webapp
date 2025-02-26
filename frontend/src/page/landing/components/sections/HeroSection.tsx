
import { memo } from "react"
import { useRandomStars } from "../../../../hooks"
import { Button } from "../../../../components/ui/button"


export const HeroSection = memo(function HeroSection() {
  const stars = useRandomStars(30)

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden py-20 text-center">
      {/* Stars Background */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute inline-flex animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `pulse ${star.duration}s infinite`,
            }}
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
            <span className="relative inline-flex h-full w-full rounded-full bg-purple-500" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="container relative px-4">
        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white md:text-6xl">
          Únete a StartPerks y{" "}
          <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            transforma
          </span>
          <br />
          tu{" "}
          <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">carrera</span>{" "}
          en{" "}
          <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            tecnología
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
          Participa en simulaciones laborales, gana puntos y desbloquea mentorías exclusivas para impulsar tu
          crecimiento profesional
        </p>
        <Button
          size="lg"
          className="mt-8 bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-500 hover:to-purple-400"
        >
          Crear y empezar a ganar puntos
        </Button>
      </div>
    </section>
  )
})
