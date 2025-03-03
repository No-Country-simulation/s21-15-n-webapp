"use client"

import { memo } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { UserProfileDialog } from "@/components/ui/user-profile-dialog"
import { useUserModal } from "@/hooks/use-user-modal"

interface RankingUser {
  id: string
  name: string
  email: string
  role: string
  points: number
  avatar: string
  level: number
}

const users: RankingUser[] = [
  {
    id: "1",
    name: "Carlos Rodríguez",
    email: "carlos@example.com",
    role: "Desarrollador backend",
    points: 65,
    avatar: "/placeholder.svg?height=40&width=40",
    level: 65,
  },
  {
    id: "2",
    name: "Ana García",
    email: "ana@example.com",
    role: "Diseñadora UX/UI",
    points: 60,
    avatar: "/placeholder.svg?height=40&width=40",
    level: 60,
  },
  {
    id: "3",
    name: "Miguel Torres",
    email: "miguel@example.com",
    role: "Desarrollador frontend",
    points: 58,
    avatar: "/placeholder.svg?height=40&width=40",
    level: 58,
  },
]

export const RankingTable = memo(function RankingTable() {
  const { selectedUser, isModalOpen, openUserModal, closeUserModal } = useUserModal()

  return (
    <section className="py-24 bg-background" id="ranking">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white md:text-4xl mb-4">Ranking Galáctico</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Compara tu progreso con otros cadetes y mantén viva la competencia interplanetaria
          </p>
        </div>

        <div className="rounded-2xl bg-primary/5 overflow-hidden border border-primary/20">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary/20">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Nombre</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Rol</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Nivel</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-400"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/20">
                {users.map((user) => (
                  <tr key={user.id} className="group">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Image
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
                        <div className="h-2 w-20 overflow-hidden rounded-full bg-primary/20">
                          <div className="h-full bg-primary" style={{ width: `${user.level}%` }} />
                        </div>
                        <span className="text-primary">{user.level}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <Button
                        variant="ghost"
                        className="text-primary hover:text-primary/80 hover:bg-primary/20"
                        onClick={() => openUserModal(user)}
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

      <UserProfileDialog open={isModalOpen} onOpenChange={closeUserModal} user={selectedUser} />
    </section>
  )
})

