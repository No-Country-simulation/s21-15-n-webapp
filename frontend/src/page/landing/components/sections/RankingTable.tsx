import { memo, useState } from "react"

import { Button } from "../../../../components/ui/button"
import { UserProfileDialog } from "../common/userProfileDialogo"

interface RankingUser {
  id: string
  name: string
  role: string
  points: number
  avatar: string
  level: string
  rank: string // Agregado rank como requerido
  streaks: Array<{
    date: string
    points: number
    description: string
  }>
}

const users: RankingUser[] = [
  {
    id: "1",
    name: "Richard Hendricks",
    role: "Developer Backend",
    points: 1500,
    avatar: "/placeholder.svg?height=40&width=40",
    level: "Level 5",
    rank: "Senior Developer", // Agregado rank
    streaks: [
      {
        date: "2024-02-24",
        points: 100,
        description: "Completó desafío de código",
      },
      {
        date: "2024-02-23",
        points: 75,
        description: "Participó en mentoría",
      },
      // Add more streaks...
    ],
  },
  // Add more users...
]

export const RankingTable = memo(function RankingTable() {
  const [selectedUser, setSelectedUser] = useState<RankingUser | null>(null)

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 bg-black/50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Nombre</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Rol</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Puntos</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Nivel</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Ver</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {users.map((user) => (
                <tr key={user.id} className="bg-black/30 transition-colors hover:bg-gray-900/50">
                  <td className="whitespace-nowrap px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                      />
                      <span className="font-medium text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-400">{user.role}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <span className="rounded-full bg-purple-600/20 px-2 py-1 text-sm text-purple-400">
                      {user.points} pts
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-400">{user.level}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <Button
                      variant="ghost"
                      className="text-purple-400 hover:text-purple-300"
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

      <UserProfileDialog
        open={!!selectedUser}
        onOpenChange={(open) => !open && setSelectedUser(null)}
        user={selectedUser}
      />
    </>
  )
})
