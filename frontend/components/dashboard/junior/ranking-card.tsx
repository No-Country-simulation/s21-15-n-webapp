import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Textos locales para el componente
const RANKING_TEXT = {
  rankingGalactico: "Ranking galáctico",
}

// Datos de ranking
const RANKING_DATA = [
  {
    id: 1,
    name: "Sofía Hernández",
    role: "Diseñador UX/UI",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 5000,
  },
  {
    id: 2,
    name: "José Pérez",
    role: "Product designer",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 4000,
  },
  {
    id: 3,
    name: "Hecto Martínez",
    role: "Diseñador gráfico",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 4000,
  },
]

export function RankingCard() {
  return (
    <Card className="border-primary/20 bg-[#0a0b1e] h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-white">{RANKING_TEXT.rankingGalactico}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {RANKING_DATA.map((user, index) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-900/30 text-indigo-400 text-xs font-medium">
                {index + 1}
              </div>
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-indigo-900/30 text-indigo-400">{user.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-sm font-medium text-white">{user.name}</h3>
                <p className="text-xs text-gray-400">{user.role}</p>
              </div>
            </div>
            <span className="text-indigo-400 font-medium">{user.points.toLocaleString()}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

