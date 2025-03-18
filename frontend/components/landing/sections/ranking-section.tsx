"use client"

import { memo, useState } from "react"
import { LANDING_CONFIG } from "@/config/constants/landing.config"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { UserProfileDialog } from "@/components/common/ui/user-profile-dialog"
import { RankItem, TableTitleItem } from "@/config/types/landing"

export const RankingSection = memo(function RankingSection() {
  const [selectedUser, setSelectedUser] = useState<(typeof LANDING_CONFIG.ranking.items)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleOpenUserProfile = (user: (typeof LANDING_CONFIG.ranking.items)[0]) => {
    setSelectedUser(user)
    setIsDialogOpen(true)
  }

  return (
    <section className="py-24 bg-background" id="ranking">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white md:text-4xl mb-4">{LANDING_CONFIG.ranking.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {LANDING_CONFIG.ranking.description}
          </p>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  {LANDING_CONFIG.ranking.tableTitle.map((title: TableTitleItem) =>
                  {
                    return(
                      <th key={title.id} className={`px-6 py-4 ${title.align} text-xl font-medium text-primary`}>
                        {title.title}
                      </th>
                    )}
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {LANDING_CONFIG.ranking.items.map((user:  RankItem) => (
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
                      <Badge variant="outline" className="bg-primary/20 border-[#3A379E] text-white">
                        {user.level}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-left">
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-2 w-20 overflow-hidden rounded-full bg-primary/20">
                          <div className="h-full bg-primary" style={{ width: `${user.experience/10}%` }} />
                        </div>
                        <span className="text-white">{user.experience}</span>
                      </div>
                    </td>
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
