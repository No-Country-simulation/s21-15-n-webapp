import { memo } from "react"
import { LANDING_CONFIG } from "@/lib/config/landing.config"

export const StatsSection = memo(function StatsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4">
        <h2 className="mb-16 text-center text-3xl font-bold text-white md:text-4xl">
          Nuestro viaje intergaláctico ha dejado huella en el universo tech
        </h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {LANDING_CONFIG.stats.items.map((stat) => (
            <div key={stat.label} className="group relative overflow-hidden rounded-2xl glass-card p-8 text-center">
              <div className="relative z-10">
                <p className="text-4xl font-bold text-primary md:text-5xl">{stat.value}</p>
                <h3 className="mt-2 text-lg font-medium text-white">{stat.label}</h3>
                <p className="text-sm text-muted-foreground">{stat.sublabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

