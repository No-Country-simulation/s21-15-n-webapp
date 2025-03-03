import { memo, useState } from "react"
import { Button } from "../../../../components/ui/button"
import { UserProfileDialog } from "../common/UserProfileDialogo"

interface Streak {
  date: string
  points: number
  description: string
}

interface RankingUser {
  id: string
  name: string
  email: string
  role: string
  points: number
  avatar: string
  rank: string
  streaks: Streak[]
  level: number
}

const users: RankingUser[] = [
  {
    id: "1",
    name: "Musharof Chowdhury",
    email: "musharof@example.com",
    role: "Desarrollador backend",
    points: 65,
    avatar: "/placeholder.svg?height=40&width=40",
    level: 65,
  },
  {
    id: "2",
    name: "Nenifer Lofess",
    email: "lofess.cooper@example.com",
    role: "Diseñador UX/UI",
    points: 60,
    avatar: "/placeholder.svg?height=40&width=40",
    level: 60,
  },
  {
    id: "3",
    name: "Jhon Smith",
    email: "jhon.smith@example.com",
    role: "Desarrollador front end",
    points: 58,
    avatar: "/placeholder.svg?height=40&width=40",
    level: 58,
  },
  // ... más usuarios
]

export const RankingTable = memo(function RankingTable() {
  const [selectedUser, setSelectedUser] = useState<RankingUser | null>(null)

  return (
    <section className="py-24 bg-[#0A061E]" id="ranking">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white md:text-4xl mb-4">Ranking Galáctico</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Compara tu progreso con otros cadetes y mantené viva la competencia interplanetaria
          </p>
        </div>

        <div className="rounded-2xl bg-[#13102B] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Nombre</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Rol</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Nivel</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Lorem</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-400"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {users.map((user) => (
                  <tr key={user.id} className="group">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <div className="font-medium text-white">{user.name}</div>
                          <div className="text-sm text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-400">{user.role}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 overflow-hidden rounded-full bg-gray-800">
                          <div className="h-full bg-indigo-500" style={{ width: `${user.level}%` }} />
                        </div>
                        <span className="text-indigo-400">{user.level}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-400">Lorem</td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <Button
                        variant="ghost"
                        className="text-indigo-400 hover:text-indigo-300"
                        onClick={() => setSelectedUser(user)}
                      >
                        Ver
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <UserProfileDialog
        open={!!selectedUser}
        onOpenChange={(open) => !open && setSelectedUser(null)}
        user={selectedUser}
      />
    </section>
  )
})
