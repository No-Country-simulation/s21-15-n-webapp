import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MonitorPlay } from "lucide-react"

// Textos locales para el componente
const EXP_TEXT = {
  ganaMasExp: "Gana mas exp",
  completaElQuizDiario: "Completa el quiz diario",
  xp: "XP",
  completar: "Completar",
}

export function ExpCard() {
  // En un caso real, estos datos vendrían de una API o del estado del usuario
  const dailyXP = 30

  return (
    <Card className="border-primary/20 bg-[#0a0b1e] h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-white">{EXP_TEXT.ganaMasExp}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center h-[calc(100%-60px)]">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-900/30">
            <MonitorPlay className="h-8 w-8 text-indigo-400" />
          </div>
          <h3 className="text-sm font-medium text-white">{EXP_TEXT.completaElQuizDiario}</h3>
          <p className="text-xs text-gray-400">
            +{dailyXP} {EXP_TEXT.xp}
          </p>
          <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">{EXP_TEXT.completar}</Button>
        </div>
      </CardContent>
    </Card>
  )
}

