"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useRandomStars } from "@/hooks/use-random-stars"
import { getAllUsers } from "@/lib/utils/auth"
import { useState, useEffect } from "react"
import type { User } from "@/lib/types"
import { Star, MessageCircle } from "lucide-react"

export default function MentorDashboard() {
  const [mentees, setMentees] = useState<User[]>([])
  const stars = useRandomStars(50)

  useEffect(() => {
    const users = getAllUsers()
    setMentees(users.filter((user) => user.role === "junior"))
  }, [])

  return (
    <div className="relative">
      {/* Stars Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute inline-flex animate-pulse ${star.color}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `pulse ${star.duration}s infinite`,
            }}
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-full w-full rounded-full bg-primary" />
          </div>
        ))}
      </div>

      <div className="space-y-6 p-6">
        <Card className="border-primary/20 bg-black/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Panel de Mentoría</CardTitle>
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
                    <AvatarFallback>{mentee.fullName.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-white">{mentee.fullName}</h3>
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
            <CardTitle className="text-lg font-medium text-white">Estadisticas de Mentoria</CardTitle>
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
  )
}
