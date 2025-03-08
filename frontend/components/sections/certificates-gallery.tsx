"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Award } from "lucide-react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"

const CERTIFICATES = [
  {
    title: "Frontend Development",
    issuer: "StartPerks Academy",
    date: "2024",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "UX/UI Design",
    issuer: "StartPerks Academy",
    date: "2024",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Backend Development",
    issuer: "StartPerks Academy",
    date: "2024",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export function CertificatesGallery() {
  return (
    <Card className="border-primary/20 bg-[#0A061E] h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-medium text-white">
          <Award className="h-5 w-5 text-primary" />
          Certificaciones
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-[calc(100%-60px)]">
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {CERTIFICATES.map((cert, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-xl">
                    <Image src={cert.image || "/placeholder.svg"} alt={cert.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-lg font-semibold">{cert.title}</h3>
                      <p className="text-sm text-gray-300">{cert.issuer}</p>
                      <p className="text-xs text-gray-400">{cert.date}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </CardContent>
    </Card>
  )
}

