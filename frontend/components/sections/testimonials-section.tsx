"use client"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { LANDING_CONFIG } from "@/lib/config/landing.config"
import Autoplay from "embla-carousel-autoplay"

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-background" id="testimonios">
      <div className="container px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Voces de la Flota</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Descubre cómo StartPerks ha impulsado las carreras de nuestros usuarios
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
              {LANDING_CONFIG.testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="glass-card p-8 text-center h-full">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-6">
                        {/* Círculo de fondo con gradiente */}
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-white/10 to-transparent blur-sm" />
                        {/* Borde del avatar */}
                        <div className="absolute -inset-0.5 rounded-full bg-white/10" />
                        {/* Contenedor del avatar */}
                        <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-white/10">
                          <Image
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>

                      <h3 className="mb-1 text-xl font-semibold text-white">{testimonial.name}</h3>
                      <p className="mb-6 text-sm font-medium text-primary">{testimonial.role}</p>

                      <blockquote className="text-muted-foreground">"{testimonial.quote}"</blockquote>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-primary/20 bg-background/80 text-primary hover:bg-primary/20" />
            <CarouselNext className="border-primary/20 bg-background/80 text-primary hover:bg-primary/20" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}

