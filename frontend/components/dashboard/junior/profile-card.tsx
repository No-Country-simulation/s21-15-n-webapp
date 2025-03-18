import { BadgeIcon, ThumbsUpIcon, MessageSquareIcon, ShirtIcon, AwardIcon, TrophyIcon } from "lucide-react"
import { useNameInitials } from "@/hooks/use-name-initials"
import type { User } from "@/config/types"
import { StreakCard } from "@/components/dashboard/junior/streak-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// Importar el hook useAvatarMock

// Textos locales para el componente
const PROFILE_TEXT = {
  insignias: "Insignias",
  verMas: "Ver más",
  nivel: "Nivel",
}

// Iconos de insignias
const BADGES = [
  {id: "1", icon: <BadgeIcon className="h-6 w-6 text-indigo-400" />, color: "bg-indigo-900/30" },
  {id: "2", icon: <ThumbsUpIcon className="h-6 w-6 text-blue-400" />, color: "bg-blue-900/30" },
  {id: "3", icon: <MessageSquareIcon className="h-6 w-6 text-purple-400" />, color: "bg-purple-900/30" },
  {id: "4", icon: <ShirtIcon className="h-6 w-6 text-green-400" />, color: "bg-green-900/30" },
  {id: "5", icon: <AwardIcon className="h-6 w-6 text-yellow-400" />, color: "bg-yellow-900/30" },
  {id: "6", icon: <TrophyIcon className="h-6 w-6 text-orange-400" />, color: "bg-orange-900/30" },
]

interface ProfileCardProps {
 readonly user: User
}

export function ProfileCard({ user }: ProfileCardProps) {
  // Dentro de la función ProfileCard, añadir:

  const Initials = (name: string) => {
    const initialsName = useNameInitials(name)
    return initialsName
  }

  return (
    <Card className="border-primary/20 bg-[#0a0b1e] overflow-hidden">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Perfil del usuario */}
          <div className="p-6 border-r border-primary/20">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-16 w-16 border-2 border-primary/30">
                {/* Modificar la línea del AvatarImage para usar el avatarMock cuando no hay avatar: */}
                <AvatarImage src="https://res.cloudinary.com/dcdevcd/image/upload/v1741673288/dc%20dev/Avata-info-10-removebg-preview_kxxlui.png" alt={`${user.name} ${user.lastName}`} />
                <AvatarFallback className="bg-primary/20 text-primary">
                  {Initials(`DAVID CAYCEDO`)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold text-white">DAVID CAYCEDO</h2>
                <p className="text-sm text-gray-400">
                  {PROFILE_TEXT.nivel} {user.level || 3}
                </p>
              </div>
            </div>

            {/* Insignias */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-medium text-white">{PROFILE_TEXT.insignias}</h3>
                <Button variant="link" className="text-indigo-400 p-0 h-auto">
                  {PROFILE_TEXT.verMas}
                </Button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {BADGES.map((badge) => (
                  <div
                    key={badge.id}
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${badge.color} transition-transform hover:scale-110`}
                  >
                    {badge.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Racha */}
          <StreakCard />
        </div>
      </CardContent>
    </Card>
  )
}
