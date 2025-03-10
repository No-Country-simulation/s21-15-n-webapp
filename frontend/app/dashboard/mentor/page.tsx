"use client"

import { useState, useEffect } from "react"
import { Star, MessageCircle } from "lucide-react"
import { getAllUsers } from "@/config/auth/auth"
import type { User } from "@/config/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MouseReflection } from "@/components/common/effects/mouse-reflection"
import { StarsBackground } from "@/components/common/effects/stars-background"
import { DashboardLayout } from "@/components/dashboard/layout/dashboard-layout"
import { useNameInitials } from "@/hooks/use-name-initials"

export default function MentorDashboard() {
  const [mentees, setMentees] = useState<User[]>([])

  useEffect(() => {
    const users = getAllUsers()
    setMentees(users.filter((user) => user.role === "junior"))
  }, [])

  const Initials = (name: string) => {
    const initialsName = useNameInitials(name)
    return initialsName
  }

  return (
    <DashboardLayout>
      <div className="relative">
        {/* Stars Background */}
        <StarsBackground count={100} colors={["primary", "white", "secondary"]} className="z-1" />

      <div className="z-2 pointer-events-none">
        <MouseReflection />
      </div>

        <div className="space-y-6 p-6">
          <Card className="border-primary/20 bg-black/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">Panel de Mentoria</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              {mentees.map((mentee) => (
                <div
                  key={mentee.email}
                  className="flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 p-4"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={mentee.avatar ?? "/placeholder.svg"} />
                      <AvatarFallback>{Initials(`${mentee.name} ${mentee.lastName}`)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-white">{`${mentee.name} ${mentee.lastName}`}</h3>
                      <p className="text-sm text-gray-400">Nivel {mentee.level}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="border-primary/20 text-primary">
                      <Star className="mr-1 h-3 w-3" />
                      {mentee.experience} XP
                    </Badge>
                    <Button variant="ghost" className="text-primary hover:text-primary/80">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Dar feedback
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-black/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-white">Estadísticas de Mentoria</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Total Mentees</p>
                <p className="text-2xl font-bold text-white">{mentees.length}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Feedback Pendiente</p>
                <p className="text-2xl font-bold text-white">3</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Sesiones Esta Semana</p>
                <p className="text-2xl font-bold text-white">8</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
