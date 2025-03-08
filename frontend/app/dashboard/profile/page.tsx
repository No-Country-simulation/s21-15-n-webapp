"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileTabs } from "@/components/profile/profile-tabs"
import { useRandomStars } from "@/hooks/use-random-stars"

export default function ProfilePage() {
  const stars = useRandomStars(50)

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

      <div className="container mx-auto max-w-4xl py-8">
        <Card className="border-primary/20 bg-background/60 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Perfil de Usuario</CardTitle>
          </CardHeader>
          <CardContent>
            <ProfileTabs />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

