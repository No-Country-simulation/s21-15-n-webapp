import { memo } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

const USERS = [
  {
    id: "1",
    name: "Martina Rodríguez",
    role: "Desarrolladora frontend",
    avatar: "/placeholder.svg?height=40&width=40",
    level: 65,
    active: true,
  },
  {
    id: "2",
    name: "Carlos Gómez",
    role: "Diseñador UX/UI",
    avatar: "/placeholder.svg?height=40&width=40",
    level: 60,
    active: true,
  },
  {
    id: "3",
    name: "Lucía Fernández",
    role: "Desarrolladora backend",
    avatar: "/placeholder.svg?height=40&width=40",
    level: 58,
    active: true,
  },
  {
    id: "4",
    name: "Javier López",
    role: "Product Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    level: 55,
    active: false,
  },
  {
    id: "5",
    name: "Ana Martínez",
    role: "Data Scientist",
    avatar: "/placeholder.svg?height=40&width=40",
    level: 52,
    active: true,
  },
  {
    id: "6",
    name: "Pablo Sánchez",
    role: "DevOps Engineer",
    avatar: "/placeholder.svg?height=40&width=40",
    level: 50,
    active: false,
  },
]

export const RankingTable = memo(function RankingTable() {
  return (
    <section className="py-24 bg-background" id="ranking">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white md:text-4xl mb-4">Ranking Galáctico</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Compara tu progreso con otros cadetes y mantén viva la competencia interplanetaria
          </p>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Nombre</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Rol</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-muted-foreground">Activo</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-muted-foreground">Nivel</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">XP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {USERS.map((user) => (
                  <tr key={user.id} className="group hover:bg-white/5">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div className="font-medium text-white">{user.name}</div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">{user.role}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <div className={`h-3 w-3 rounded-full ${user.active ? "bg-green-500" : "bg-red-500"}`}></div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center">
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        Nivel {user.level}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-primary font-medium">
                      {user.level * 100}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
})
