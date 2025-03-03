import { memo } from "react"

const stats = [
  { value: "100+", label: "Tecnologías", sublabel: "enseñadas" },
  { value: "50+", label: "Empresas", sublabel: "aliadas" },
  { value: "1k+", label: "Exploradores", sublabel: "activos" },
  { value: "200+", label: "Mentorías", sublabel: "completadas" },
]

export const StatsSection = memo(function StatsSection() {
  return (
    <section className="py-24 bg-[#0A061E]">
      <div className="container px-4">
        <h2 className="mb-16 text-center text-3xl font-bold text-white md:text-4xl">
          Nuestro viaje intergaláctico ha dejado
          <br />
          huella en el universo tech
        </h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="group relative overflow-hidden rounded-2xl bg-[#13102B] p-8 text-center">
              <div className="relative z-10">
                <p className="text-4xl font-bold text-indigo-400 md:text-5xl">{stat.value}</p>
                <h3 className="mt-2 text-lg font-medium text-white">{stat.label}</h3>
                <p className="text-sm text-gray-400">{stat.sublabel}</p>
              </div>
              <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-gradient-to-br from-indigo-600/20 to-transparent opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

