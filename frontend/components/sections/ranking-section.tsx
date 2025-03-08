"use client"

import { memo, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UserProfileDialog } from "@/components/ui/user-profile-dialog"

const USERS = [
  {
    id: "1",
    name: "Musharof Chowdhury",
    role: "Desarrollador backend",
    avatar: "/placeholder.svg?height=40&width=40",
    level: 65,
    active: true,
  },
  {
    id: "2",
    name: "Nenifer Lofess",
    role: "Diseñador UX/UI",
    avatar: "/placeholder.svg?height=40&width=40",
    level: 60,
    active: true,
  },
  {
    id: "3",
    name: "Jhon Smith",
    role: "Desarrollador front end",
    avatar: "/placeholder.svg?height=40&width=40",
    level: 58,
    active: true,
  },
  {
    id: "4",
    name: "Sulium Keliym",
    role: "Desarrollador backend",
    avatar: "/placeholder.svg?height=40&width=40",
    level: 55,
    active: true,
  },
  {
    id: "5",
    name: "Alex Semuyel",
    role: "Product manager",
    avatar: "/placeholder.svg?height=40&width=40",
    level: 50,
    active: true,
  },
  {
    id: "6",
    name: "Humil Limition",
    role: "QA tester",
    avatar: "/placeholder.svg?height=40&width=40",
    level: 50,
    active: true,
  },
]

export const RankingSection = memo(function RankingSection() {
  const [selectedUser, setSelectedUser] = useState<(typeof USERS)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleOpenUserProfile = (user: (typeof USERS)[0]) => {
    setSelectedUser(user)
    setIsDialogOpen(true)
  }

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
                  <th className="px-6 py-4 text-center text-sm font-medium text-muted-foreground">Nivel</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-muted-foreground">Lorem</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {USERS.map((user) => (
                  <tr key={user.id} className="group hover:bg-white/5">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium text-white">{user.name}</div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">{user.role}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-center">
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        {user.level}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center text-muted-foreground">Lorem</td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <Button variant="link" className="text-primary" onClick={() => handleOpenUserProfile(user)}>
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
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        user={
          selectedUser
            ? {
                name: selectedUser.name,
                avatar: selectedUser.avatar,
                role: selectedUser.role,
                level: selectedUser.level,
              }
            : null
        }
      />
    </section>
  )
})

