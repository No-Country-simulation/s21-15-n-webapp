import { Button } from "../../../../components/ui/button"
import { memo } from "react"
import { useRandomStars } from "../../../../hooks"


export const HeroSection = memo(function HeroSection() {
  const stars = useRandomStars(50)

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden py-32">
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
      <div className="container relative px-4 text-center">
        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
          Ganá{" "}
          <span className="bg-gradient-to-r from-violet-500 to-violet-300 bg-clip-text text-transparent">
            experiencia
          </span>
          , validá tus{" "}
          <span className="bg-gradient-to-r from-fuchsia-500 to-pink-400 bg-clip-text text-transparent">
            habilidades
          </span>{" "}
          y{" "}
          <span className="bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">desbloqueá</span>{" "}
          tu futuro
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-400">
          Registrate como cadete en StartPerks y comienza tu aventura intergaláctica. Acumulá puntos, desbloqueá
          mentorías y conquista cada desafío para elevar tu carrera en tecnología
        </p>
        <Button
          size="lg"
          className="mt-10 bg-gradient-to-r from-fuchsia-600 to-blue-600 text-lg text-white hover:from-fuchsia-500 hover:to-blue-500"
        >
          Únete y empieza a ganar puntos
        </Button>
      </div>
    </section>
  )
})
