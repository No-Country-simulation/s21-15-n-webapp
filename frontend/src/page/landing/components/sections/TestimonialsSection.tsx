
import { memo } from "react"
import { Card, CardContent } from "../../../../components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../../../components/ui/carousel"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  avatar: string
  quote: string
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Luciano Martínez",
    role: "Frontend Developer",
    company: "TechCorp",
    avatar: "/placeholder.svg?height=100&width=100",
    quote: "StartPerks me ayudó a validar mis habilidades y conseguir mi primer trabajo en tecnología.",
  },
  {
    id: "2",
    name: "Jorge González",
    role: "Backend Developer",
    company: "InnovaSoft",
    avatar: "/placeholder.svg?height=100&width=100",
    quote: "La plataforma me permitió crecer profesionalmente y conectar con grandes mentores.",
  },
  {
    id: "3",
    name: "Ana Silva",
    role: "Full Stack Developer",
    company: "DevStudio",
    avatar: "/placeholder.svg?height=100&width=100",
    quote: "Las simulaciones laborales me prepararon para enfrentar desafíos reales en mi carrera.",
  },
  {
    id: "1",
    name: "Luciano Martínez",
    role: "Frontend Developer",
    company: "TechCorp",
    avatar: "/placeholder.svg?height=100&width=100",
    quote: "StartPerks me ayudó a validar mis habilidades y conseguir mi primer trabajo en tecnología.",
  },
  {
    id: "2",
    name: "Jorge González",
    role: "Backend Developer",
    company: "InnovaSoft",
    avatar: "/placeholder.svg?height=100&width=100",
    quote: "La plataforma me permitió crecer profesionalmente y conectar con grandes mentores.",
  },
  {
    id: "3",
    name: "Ana Silva",
    role: "Full Stack Developer",
    company: "DevStudio",
    avatar: "/placeholder.svg?height=100&width=100",
    quote: "Las simulaciones laborales me prepararon para enfrentar desafíos reales en mi carrera.",
  },
]

export const TestimonialsSection = memo(function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])

  return (
    <section className="py-24" id="testimonios">
      <div className="container px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Voces de la Flota</h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            Descubrí las historias de éxito de quienes ya están navegando en el universo tech
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="border-none bg-[#13102B]">
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center gap-4">
                        <img
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                        <div>
                          <h3 className="font-medium text-white">{testimonial.name}</h3>
                          <p className="text-sm text-gray-400">
                            {testimonial.role} @ {testimonial.company}
                          </p>
                        </div>
                      </div>
                      <blockquote className="text-gray-400">"{testimonial.quote}"</blockquote>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  )
})
