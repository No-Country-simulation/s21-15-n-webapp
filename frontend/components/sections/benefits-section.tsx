export function BenefitsSection() {
  return (
    <section className="py-24 bg-background" id="beneficios">
      <div className="container px-4 mx-auto">
        <h2 className="mb-16 text-center text-3xl font-bold text-white md:text-4xl">Beneficios</h2>

        <div className="space-y-24">
          {/* Para Cadetes (Juniors) */}
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Para Cadetes (Juniors)</h3>
              <p className="text-lg text-muted-foreground">
                Iniciá tu entrenamiento intergaláctico. Adquirí habilidades, armá tu portafolio y desbloqueá mentorías
                exclusivas para navegar el universo tecnológico.
              </p>
            </div>

            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fotograf%C3%ADa%20realista%20y%20profesional%20de%20un%20joven%20profesional%20en%20un%20entorno%20moderno%20de%20coworking%2C%20iluminado%20suavemente.%20Agregar%20un%20overlay%20sutil%20con%20efecto%20de%20nebulosa%20y%20destellos%20de%20estrellas%20en%20tonos%20azul%20y%20morado%20pa-gtv0SkOJNzasGbjTbUXZUUotUHWdHx.png"
                alt="Joven profesional en entorno moderno"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
            </div>
          </div>

          {/* Para Espaciales (Startups) */}
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="md:order-2">
              <h3 className="text-2xl font-bold text-white mb-4">Para Espaciales (Startups)</h3>
              <p className="text-lg text-muted-foreground">
                Descubrí cadetes con talento probado. Identificá a futuros líderes que ya han demostrado su capacidad en
                cada misión.
              </p>
            </div>

            <div className="relative aspect-video overflow-hidden rounded-2xl md:order-1">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%204631-lfZfDPItiQz5lBfGWzcZF5BQj1e5nY.png"
                alt="Equipo trabajando en entorno futurista"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
            </div>
          </div>

          {/* Para Comandantes (Mentores) */}
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Para Comandantes (Mentores)</h3>
              <p className="text-lg text-muted-foreground">
                Guiá a la próxima generación de exploradores. Compartí tu experiencia, obtené reconocimiento y accedé a
                beneficios exclusivos.
              </p>
            </div>

            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%204632-zF0ZO609nmX8Wmxt4m45g7SZg6mno3.png"
                alt="Profesional con traje futurista"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

