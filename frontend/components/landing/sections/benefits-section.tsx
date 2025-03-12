import { memo } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { BenefitItem } from "@/config/types/landing"
import { LANDING_CONFIG } from "@/config/constants/landing.config"

export const BenefitsSection = memo(function Benefits() {
  return (
    <section className="py-24 bg-background" id="beneficios">
      <div className="container px-4">
        <h2 className="mb-16 text-center text-4xl font-bold text-white">{LANDING_CONFIG.benefits.title}</h2>

        <div className="space-y-24">
          {LANDING_CONFIG.benefits.items.map((benefit: BenefitItem) => (
            <div key={benefit.id} className="grid gap-8 md:grid-cols-2 items-center">
              <div className={cn("space-y-4", benefit.imagePosition === "right" ? "md:order-1" : "md:order-2")}>
                <h3 className="text-2xl font-bold text-white">{benefit.title}</h3>
                <p className="text-lg text-gray-300">{benefit.description}</p>
              </div>

              <div
                className={cn(
                  "relative aspect-[16/9] overflow-hidden rounded-2xl",
                  benefit.imagePosition === "right" ? "md:order-2" : "md:order-1",
                )}
              >
                <Image
                loading = 'lazy'
                  src={benefit.image || "/placeholder.svg"}
                  alt={benefit.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})
